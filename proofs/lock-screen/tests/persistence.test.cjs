const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { mkdtempSync, unlinkSync, rmdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { test } = require('node:test');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const sql = require('../native/ProofSQL.json');

function open(path) {
  const db = new DatabaseSync(path);
  db.exec('PRAGMA busy_timeout = 2000; PRAGMA synchronous = FULL');
  db.exec(sql.schema);
  return db;
}

function read(db) {
  const row = db.prepare(sql.read).get();
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
    attempts = write(db, sql.complete, ...workerData.ids).completion_attempts;
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
    write(db, sql.complete, ...ids);
    assert.equal(write(db, sql.reset), null);
    const next = [randomUUID(), randomUUID()];
    const draft = write(db, sql.start, ...next);
    assert.deepEqual(write(db, sql.increment, ...ids), draft);
    assert.deepEqual(write(db, sql.complete, ...ids), draft);
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
      assert.throws(() => write(db, sql.complete, ...ids), /database is locked/);
      reader.exec('ROLLBACK');
    } finally {
      reader.close();
    }
    assert.equal(read(db).completed, 0);
    assert.equal(read(db).completion_attempts, 0);
    assert.equal(write(db, sql.complete, ...ids).completed, 1);
  });
}
