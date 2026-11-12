const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { mkdtempSync, unlinkSync, rmdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { test } = require('node:test');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const sql = require('../native/ProofSQL.json');
const now = 1000;

// Executes production SQL through a JS wrapper; does not execute ProofStore.swift.
function migrate(db) {
  const columns = () => new Set(db.prepare('PRAGMA table_info(proof_set)').all().map(row => row.name));
  if (sql.migrations.every(item => columns().has(item.column))) return;
  db.exec('BEGIN IMMEDIATE');
  try {
    const existing = columns();
    for (const item of sql.migrations) {
      if (!existing.has(item.column)) db.exec(item.statement);
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function complete(db, ids, time = now) {
  return write(db, sql.complete, time, ...ids);
}

function skip(db, ids, time = now) {
  return write(db, sql.skip, time, ...ids);
}

function open(path) {
  const db = new DatabaseSync(path);
  db.exec('PRAGMA busy_timeout = 2000; PRAGMA synchronous = FULL');
  db.exec(sql.schema);
  migrate(db);
  return db;
}

function read(db, time = now) {
  const row = db.prepare(sql.read).get(time);
  return row ? { ...row } : null;
}

function write(db, statement, ...args) {
  db.exec('BEGIN IMMEDIATE');
  try {
    db.prepare(statement).run(...args);
    const snapshot = read(db);
    db.exec('COMMIT');
    return snapshot;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'swoldier-sql-'));
  const path = join(dir, 'proof.sqlite3');
  const db = open(path);
  t.after(() => {
    db.close();
    unlinkSync(path);
    rmdirSync(dir);
  });
  return { db, path, ids: [randomUUID(), randomUUID()] };
}

function completeFromAnotherConnection(path, ids) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: { path, ids } });
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== 0) reject(new Error('Completion worker failed: ' + code));
    });
  });
}

if (!isMainThread) {
  const db = open(workerData.path);
  let attempts;
  try {
    attempts = complete(db, workerData.ids).completion_attempts;
  } finally {
    db.close();
  }
  parentPort.postMessage(attempts);
} else {
  test('a draft edit survives closing and reopening SQLite; overlapping completes leave one saved row', async t => {
    const { db, path, ids } = fixture(t);
    const draft = write(db, sql.start, ...ids);
    assert.equal(draft.pounds, 40);
    assert.equal(draft.reps, 8);
    assert.equal(draft.completed, 0);

    const writer = open(path);
    try { write(writer, sql.increment, ...ids); } finally { writer.close(); }
    assert.equal(read(db).reps, 9);

    const attempts = await Promise.all([
      completeFromAnotherConnection(path, ids),
      completeFromAnotherConnection(path, ids),
    ]);
    assert.deepEqual(attempts.sort(), [1, 2]);

    const reopened = open(path);
    try {
      assert.deepEqual(read(reopened), {
        session_id: ids[0], set_id: ids[1], pounds: 40, reps: 9, completed: 1, completion_attempts: 2,
        rest_deadline: 1020, rest_skipped_at: null, rest_state: 'running', rest_remaining_seconds: 20,
      });
      assert.equal(reopened.prepare('SELECT COUNT(*) AS count FROM proof_set WHERE completed = 1').get().count, 1);
      assert.equal(write(reopened, sql.increment, ...ids).reps, 9);
      assert.equal(write(reopened, sql.start, randomUUID(), randomUUID()).session_id, ids[0]);
    } finally {
      reopened.close();
    }
  });

  test('reset clears the row, and actions from an old Live Activity cannot change its replacement', t => {
    const { db, ids } = fixture(t);
    write(db, sql.start, ...ids);
    complete(db, ids);
    assert.equal(write(db, sql.reset), null);
    const next = [randomUUID(), randomUUID()];
    const draft = write(db, sql.start, ...next);
    assert.deepEqual(write(db, sql.increment, ...ids), draft);
    assert.deepEqual(complete(db, ids), draft);
  });

  test('a blocked commit rolls back the completion and leaves the draft retryable', t => {
    const { db, path, ids } = fixture(t);
    write(db, sql.start, ...ids);
    write(db, sql.increment, ...ids);
    db.exec('PRAGMA busy_timeout = 0');
    const reader = open(path);
    try {
      reader.exec('BEGIN');
      assert.equal(read(reader).reps, 9); // Retain a read lock through the attempted commit.
      assert.throws(() => complete(db, ids), /database is locked/);
      reader.exec('ROLLBACK');
    } finally {
      reader.close();
    }
    assert.equal(read(db).completed, 0);
    assert.equal(read(db).rest_deadline, null);
    assert.equal(read(db).completion_attempts, 0);
    assert.equal(complete(db, ids).completed, 1);
  });
  test('completion saves one 20-second deadline; duplicate completion never restarts running, expired, or skipped rest', t => {
    const { db, path, ids } = fixture(t);
    write(db, sql.start, ...ids);
    complete(db, ids, 1000);
    assert.equal(read(db, 1000).rest_deadline, 1020);
    assert.equal(read(db, 1007).rest_remaining_seconds, 13);
    complete(db, ids, 1008);
    assert.equal(read(db, 1008).rest_remaining_seconds, 12);
    assert.equal(read(db, 1008).rest_deadline, 1020);

    const reopened = open(path);
    try {
      assert.equal(read(reopened, 1019).rest_state, 'running');
      for (const time of [1020, 1021, 9999]) {
        assert.equal(read(reopened, time).rest_state, 'expired');
        assert.equal(read(reopened, time).rest_remaining_seconds, 0);
      }
      complete(reopened, ids, 1100);
      assert.equal(read(reopened, 1100).rest_deadline, 1020);
      assert.equal(read(reopened, 1100).rest_state, 'expired');
      assert.equal(read(reopened, 1100).completed, 1);
    } finally { reopened.close(); }
  });

  test('Skip is durable and repeatable; expiry and stale identity reject a late Skip; reset removes rest', t => {
    const { db, path, ids } = fixture(t);
    write(db, sql.start, ...ids);
    skip(db, ids, 999);
    assert.equal(read(db).rest_skipped_at, null);
    complete(db, ids, 1000);
    skip(db, ids, 1005);
    skip(db, ids, 1007);
    complete(db, ids, 1008);
    const reopened = open(path);
    try {
      const saved = read(reopened, 1200);
      assert.equal(saved.rest_state, 'skipped');
      assert.equal(saved.rest_skipped_at, 1005);
      assert.equal(saved.rest_deadline, 1020);
      assert.equal(saved.rest_remaining_seconds, 0);
      assert.equal(saved.completion_attempts, 2);

      write(reopened, sql.reset);
      assert.equal(read(reopened), null);
      const next = [randomUUID(), randomUUID()];
      write(reopened, sql.start, ...next);
      complete(reopened, next, 2000);
      skip(reopened, ids, 2001); // Old card must not touch the new set.
      assert.equal(read(reopened, 2001).rest_skipped_at, null);
      skip(reopened, next, 2020);
      skip(reopened, next, 2021);
      assert.equal(read(reopened, 2021).rest_state, 'expired');
      assert.equal(read(reopened, 2021).rest_skipped_at, null);
    } finally { reopened.close(); }
  });

  test('failed Skip leaves rest running and can be retried without changing the deadline', t => {
    const { db, ids } = fixture(t);
    write(db, sql.start, ...ids);
    complete(db, ids, 1000);
    db.exec("CREATE TRIGGER reject_skip BEFORE UPDATE OF rest_skipped_at ON proof_set BEGIN SELECT RAISE(ABORT, 'injected write failure'); END");
    assert.throws(() => skip(db, ids, 1004), /injected write failure/);
    assert.equal(read(db, 1005).rest_state, 'running');
    assert.equal(read(db).rest_skipped_at, null);
    db.exec('DROP TRIGGER reject_skip');
    skip(db, ids, 1006);
    assert.equal(read(db).rest_skipped_at, 1006);
    assert.equal(read(db).rest_deadline, 1020);
  });

  for (const completed of [0, 1]) {
    test('installed legacy database migrates without rewriting ' + (completed ? 'completed history' : 'the draft'), t => {
      const dir = mkdtempSync(join(tmpdir(), 'swoldier-legacy-'));
      const path = join(dir, 'proof.sqlite3');
      const ids = [randomUUID(), randomUUID()];
      const legacy = new DatabaseSync(path);
      legacy.exec(sql.schema); // Unchanged published schema with no rest columns.
      legacy.prepare('INSERT INTO proof_set VALUES (1, ?, ?, 40, 9, ?, 2)').run(...ids, completed);
      legacy.close();
      const db = open(path);
      t.after(() => { db.close(); unlinkSync(path); rmdirSync(dir); });
      migrate(db); // Repeated opening/migration must be idempotent.
      assert.deepEqual(read(db), {
        session_id: ids[0], set_id: ids[1], pounds: 40, reps: 9,
        completed, completion_attempts: 2, rest_deadline: null,
        rest_skipped_at: null, rest_state: 'not_started', rest_remaining_seconds: 0,
      });
      complete(db, ids, 1000);
      assert.equal(read(db).rest_deadline, completed ? null : 1020);
    });
  }

  test('an interrupted partial migration adds only the missing column and preserves its saved deadline', t => {
    const db = new DatabaseSync(':memory:');
    t.after(() => db.close());
    db.exec(sql.schema);
    db.exec(sql.migrations[0].statement);
    const ids = [randomUUID(), randomUUID()];
    db.prepare('INSERT INTO proof_set (slot, session_id, set_id, completed, rest_deadline) VALUES (1, ?, ?, 1, 1020)').run(...ids);
    migrate(db);
    migrate(db);
    assert.equal(read(db, 1005).rest_deadline, 1020);
    assert.equal(read(db, 1005).rest_skipped_at, null);
    assert.equal(read(db, 1005).rest_state, 'running');
    assert.equal(read(db, 1005).rest_remaining_seconds, 15);
  });

}
