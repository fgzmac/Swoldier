const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { mkdtempSync, realpathSync, rmSync } = require('node:fs');
const { join, dirname, basename } = require('node:path');
const { tmpdir } = require('node:os');
const { DatabaseSync } = require('node:sqlite');
const { test } = require('node:test');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const sql = require('../native/ProofSQL.json');

function removeFixture(dir) {
  const target = realpathSync(dir);
  assert.equal(dirname(target), realpathSync(tmpdir()));
  assert.ok(basename(target).startsWith('swoldier-'));
  rmSync(target, { recursive: true });
}

// Production SQL; JS migration/transaction/publication wrapper, NOT Swift execution.
function statement(db, text, params = {}) {
  const parameters = text.replace(/'(?:''|[^'])*'/g, ''); // Ignore colons inside SQL string literals.
  const names = [...new Set([...parameters.matchAll(/:([a-zA-Z][a-zA-Z0-9]*)/g)].map(m => m[1]))];
  const selected = Object.fromEntries(names.map(n => {
    if (!(n in params)) throw Error('Missing parameter ' + n);
    return [n, params[n]];
  }));
  return { stmt: db.prepare(text), selected };
}
function run(db, text, params) {
  const { stmt, selected } = statement(db, text, params);
  return stmt.run(selected).changes;
}
function all(db, text, params) {
  const { stmt, selected } = statement(db, text, params);
  return stmt.all(selected).map(r => ({ ...r }));
}
function transaction(db, fn, immediate = true) {
  db.exec(immediate ? 'BEGIN IMMEDIATE' : 'BEGIN');
  try { const result = fn(); db.exec('COMMIT'); return result; }
  catch (e) { db.exec('ROLLBACK'); throw e; }
}
function migrate(db) {
  if (db.prepare('PRAGMA user_version').get().user_version >= 3) return;
  transaction(db, () => {
    const version = db.prepare('PRAGMA user_version').get().user_version;
    if (version >= 3) return;
    if (version < 2) {
      const cols = new Set(db.prepare('PRAGMA table_info(proof_set)').all().map(r => r.name));
      for (const m of sql.migrations) if (!cols.has(m.column)) db.exec(m.statement);
      for (const text of [...sql.schemaV2, ...sql.importLegacy]) db.exec(text);
    }
    for (const text of sql.migrationsV3) db.exec(text);
    db.exec('PRAGMA user_version = 3');
  });
}
function open(path) {
  const db = new DatabaseSync(path);
  db.exec('PRAGMA busy_timeout = 2000; PRAGMA synchronous = FULL');
  db.exec(sql.schema); migrate(db); return db;
}
function read(db, now = 1000) {
  return transaction(db, () => readInternal(db, now), false);
}
function readInternal(db, now = 1000) {
  const session = all(db, sql.readSession)[0];
  if (!session) return null;
  const params = { sessionID: session.session_id, restID: session.active_rest_id, now };
  const sets = all(db, sql.readSets, params);
  const current = sets.find(s => !s.completed) ?? sets.at(-1);
  const rest = all(db, sql.readRest, params)[0] ?? null;
  // Positional projection deliberately follows Swift's separate snapshot mapping.
  const values = rest ? Object.values(rest) : [];
  return { sessionID: session.session_id, setID: current.set_id, restID: session.active_rest_id,
    sets, recordCount: sets.filter(s => s.completed).length, plannedSetsRecorded: sets.every(s => s.completed),
    deadline: values[0] ?? null, skippedAt: values[1] ?? null,
    restState: values[2] ?? 'not_started', remaining: values[3] ?? 0,
    continuedAt: values[4] ?? null, awaitingContinue: rest !== null && values[4] == null };
}
function start(db, sessionID = randomUUID()) {
  return transaction(db, () => {
    run(db, sql.startSession, { sessionID }); run(db, sql.startSets, { sessionID });
    return readInternal(db);
  });
}
function act(db, ids, action, now = 1000, delta = 0) {
  return transaction(db, () => {
    const p = { ...ids, now, delta, newRestID: ids.setID + ':rest' };
    if (action === 'complete') {
      run(db, sql.countCompleteRequest, p);
      if (run(db, sql.complete, p) === 1) {
        run(db, sql.createRest, p); assert.equal(run(db, sql.advanceRest, p), 1);
      }
    } else { run(db, sql[action === 'skip' ? 'continueRest' : action], p); }
    return readInternal(db, now);
  });
}
function reset(db) { transaction(db, () => sql.reset.forEach(q => db.exec(q))); }
function ids(s) { return { sessionID: s.sessionID, setID: s.setID, restID: s.restID }; }
function current(s) { return s.sets.find(r => !r.completed) ?? s.sets.at(-1); }
function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'swoldier-three-'));
  const path = join(dir, 'proof.sqlite3'); const db = open(path);
  t.after(() => { db.close(); removeFixture(dir); });
  return { db, path, dir, initial: start(db) };
}
function legacy(path, completed, rest = null, skipped = null) {
  const db = new DatabaseSync(path); db.exec(sql.schema);
  const setID = randomUUID(), sessionID = randomUUID();
  db.prepare('INSERT INTO proof_set VALUES(1,?,?,40,9,?,6)').run(sessionID, setID, completed);
  if (rest !== null) {
    sql.migrations.forEach(m => db.exec(m.statement));
    db.prepare('UPDATE proof_set SET rest_deadline=?,rest_skipped_at=?').run(rest, skipped);
  }
  db.close(); return { sessionID, setID };
}

if (!isMainThread) {
  const db = open(workerData.path);
  try { act(db, workerData.ids, 'complete'); parentPort.postMessage('done'); }
  finally { db.close(); }
} else {
  test('three independent planned defaults and stable identities survive reopening/start', t => {
    const { db, path, initial } = fixture(t);
    assert.deepEqual(initial.sets.map(s => [s.planned_pounds,s.planned_reps,s.pounds,s.reps]), [[40,8,40,8],[50,8,50,8],[45,10,45,10]]);
    assert.equal(new Set(initial.sets.map(s => s.set_id)).size, 3);
    assert.deepEqual(start(db), initial);
    const reopened = open(path); try { assert.deepEqual(read(reopened), initial); } finally { reopened.close(); }
  });
  test('first completion freezes 40 x 9, starts rest and immediately selects planned 50 x 8', t => {
    const { db, initial } = fixture(t);
    act(db, ids(initial), 'reps', 1000, 1);
    const s = act(db, ids(initial), 'complete');
    assert.equal(s.recordCount, 1); assert.equal(s.deadline, 1020);
    assert.deepEqual([s.sets[0].pounds,s.sets[0].reps,s.sets[0].planned_reps], [40,9,8]);
    assert.deepEqual([current(s).ordinal,current(s).pounds,current(s).reps], [2,50,8]);
  });
  test('draft edits during rest persist without changing plan, recorded set, or deadline', t => {
    const { db, initial, path } = fixture(t);
    let s = act(db, ids(initial), 'complete'); const original = { ...s.sets[0] };
    s = act(db, ids(s), 'weight', 1004, 5); s = act(db, ids(s), 'reps', 1005, -1);
    const reopened = open(path);
    try {
      s = read(reopened, 1008);
      assert.deepEqual(s.sets[0], original); assert.equal(s.deadline,1020); assert.equal(s.remaining,12);
      assert.deepEqual([current(s).pounds,current(s).reps,current(s).planned_pounds,current(s).planned_reps],[55,7,50,8]);
    } finally { reopened.close(); }
  });
  test('native SQL gate rejects early and forged-rest completion; expiry plus Continue allows unchanged action IDs', t => {
    const { db, initial } = fixture(t);
    let s = act(db, ids(initial), 'complete'); const next = ids(s);
    s = act(db, next, 'complete', 1005); assert.equal(s.recordCount,1); assert.equal(s.deadline,1020);
    s = act(db, { ...next, restID: 'none' }, 'complete', 1050); assert.equal(s.recordCount,1);
    s = act(db, next, 'complete', 1020); assert.equal(s.recordCount,1);
    s = act(db, next, 'continueRest', 1020);
    s = act(db, next, 'complete', 1020); assert.equal(s.recordCount,2); assert.equal(s.deadline,1040);
    assert.equal(current(s).ordinal,3);
  });
  test('Skip never completes; repeated/stale/expired Skip cannot cancel a later rest', t => {
    const { db, initial } = fixture(t);
    let s = act(db, ids(initial), 'complete'); const oldSkip = ids(s);
    s = act(db, oldSkip, 'skip', 1003); assert.equal(s.recordCount,1); assert.equal(current(s).ordinal,2);
    s = act(db, oldSkip, 'skip', 1004); assert.equal(s.skippedAt,1003);
    s = act(db, oldSkip, 'complete', 1005); const later = ids(s);
    s = act(db, oldSkip, 'skip', 1006); assert.equal(s.restState,'running'); assert.equal(s.skippedAt,null);
    s = act(db, later, 'skip', 1025); assert.equal(s.restState,'expired'); assert.equal(s.skippedAt,null);
  });
  test('overlapping duplicate Complete saves only its explicit set and never the next draft', async t => {
    const { db, path, initial } = fixture(t);
    await Promise.all([1,2].map(() => new Promise((resolve,reject) => {
      const w = new Worker(__filename,{workerData:{path,ids:ids(initial)}});
      w.once('error',reject);w.once('exit',code => code ? reject(Error('Worker failed')) : resolve());
    })));
    let s = read(db); assert.equal(s.recordCount,1); assert.equal(s.sets[0].completion_attempts,2);
    assert.equal(current(s).ordinal,2); assert.equal(s.deadline,1020);
    s = act(db, ids(initial), 'complete', 1100); assert.equal(s.recordCount,1); assert.equal(s.deadline,1020);
  });
  test('exactly three distinct actual records; no fourth set or implicit finish', t => {
    const { db, initial } = fixture(t); let s;
    act(db, ids(initial), 'reps', 1000, 1); s=act(db,ids(initial),'complete');
    s=act(db,ids(s),'weight',1001,5); s=act(db,ids(s),'reps',1002,-1);
    s=act(db,ids(s),'skip',1003); s=act(db,ids(s),'complete',1004);
    s=act(db,ids(s),'reps',1005,1); s=act(db,ids(s),'continueRest',1024); s=act(db,ids(s),'complete',1024);
    assert.equal(s.plannedSetsRecorded,true);assert.equal(s.recordCount,3);assert.equal(s.sets.length,3);
    assert.deepEqual(s.sets.map(r=>[r.pounds,r.reps]),[[40,9],[55,7],[45,11]]);
    s=act(db,ids(s),'complete',1100);assert.equal(s.recordCount,3);assert.equal(s.deadline,1044);
    s=act(db,ids(s),'weight',1101,5);assert.equal(s.sets[2].pounds,45);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM proof_rests_v2').get().n,3);
    assert.equal('finished' in s,false);
  });
  test('reset clears only fictional proof tables; old session actions cannot mutate replacement', t => {
    const { db, initial } = fixture(t); const previous=act(db,ids(initial),'complete');
    db.exec('CREATE TABLE unrelated(value TEXT); INSERT INTO unrelated VALUES(\'keep\')');
    reset(db);assert.equal(read(db),null);const fresh=start(db);
    for(const action of ['complete','skip','continueRest','weight','reps'])act(db,ids(previous),action,1001,1);
    assert.deepEqual(read(db),fresh);assert.equal(db.prepare('SELECT value FROM unrelated').get().value,'keep');
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM proof_set').get().n,0);
  });
  test('failed rest insertion rolls completion/counter back and remains retryable', t => {
    const { db, initial } = fixture(t);
    db.exec("CREATE TRIGGER fail_rest BEFORE INSERT ON proof_rests_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>act(db,ids(initial),'complete'),/injected/);assert.deepEqual(read(db),initial);
    db.exec('DROP TRIGGER fail_rest');const s=act(db,ids(initial),'complete',1004);
    assert.equal(s.recordCount,1);assert.equal(s.deadline,1024);assert.equal(s.sets[0].completion_attempts,1);
  });
  test('failed commit rolls entire completion back before publication; retry succeeds', t => {
    const { db, path, initial } = fixture(t); const reader=open(path);
    try {
      reader.exec('BEGIN');reader.prepare('SELECT * FROM proof_sets_v2').all();
      db.exec('PRAGMA busy_timeout=10');assert.throws(()=>act(db,ids(initial),'complete'),/locked/);
      reader.exec('ROLLBACK');assert.deepEqual(read(db),initial);
      assert.equal(act(db,ids(initial),'complete').recordCount,1);
    } finally { reader.close(); }
  });
  test('Skip save failure preserves deadline and can be retried/reopened', t => {
    const { db, path, initial } = fixture(t);let s=act(db,ids(initial),'complete');const rest=ids(s);
    db.exec("CREATE TRIGGER fail_skip BEFORE UPDATE OF skipped_at ON proof_rests_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>act(db,rest,'skip',1003),/injected/);assert.equal(read(db).skippedAt,null);
    db.exec('DROP TRIGGER fail_skip');act(db,rest,'skip',1004);const reopened=open(path);
    try{s=read(reopened,1100);assert.equal(s.restState,'skipped');assert.equal(s.skippedAt,1004);assert.equal(s.deadline,1020);}finally{reopened.close();}
  });
  test('fixture limits and invalid deltas cannot edit recorded sets or routine defaults', t => {
    const { db, initial } = fixture(t);const target=ids(initial);
    db.prepare('UPDATE proof_sets_v2 SET pounds=198,reps=29 WHERE ordinal=1').run();
    act(db,target,'weight',1000,5);act(db,target,'reps',1000,1);
    let s=act(db,target,'reps',1000,2);assert.deepEqual([current(s).pounds,current(s).reps],[200,30]);
    for(let n=0;n<45;n++)act(db,target,'weight',1000,-5);
    for(let n=0;n<35;n++)act(db,target,'reps',1000,-1);
    s=act(db,target,'complete');act(db,target,'weight',1001,5);
    s=read(db);assert.deepEqual([s.sets[0].pounds,s.sets[0].reps,s.sets[0].planned_pounds,s.sets[0].planned_reps],[0,0,40,8]);
  });
  for(const completed of [0,1])test('legacy '+(completed?'completed record':'draft')+' migrates once without retroactive rest', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-migrate-'));const path=join(dir,'proof.sqlite3');
    const original=legacy(path,completed);const db=open(path);t.after(()=>{db.close();removeFixture(dir);});
    let s=read(db);assert.equal(s.sessionID,original.sessionID);assert.equal(s.sets[0].set_id,original.setID);
    assert.deepEqual([s.sets[0].pounds,s.sets[0].reps,s.sets[0].completed,s.sets[0].completion_attempts],[40,9,completed,6]);
    assert.equal(s.deadline,null);assert.equal(current(s).ordinal,completed?2:1);
    assert.deepEqual(s.sets.slice(1).map(r=>[r.pounds,r.reps]),[[50,8],[45,10]]);
    migrate(db);assert.deepEqual(read(db),s);
    assert.equal(db.prepare('SELECT completion_attempts FROM proof_set').get().completion_attempts,6);
    reset(db);const fresh=start(db);migrate(db);assert.deepEqual(read(db),fresh);
  });
  for(const skipped of [null,1005])test('migration preserves installed '+(skipped?'skipped':'active')+' rest and completed values', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-migrate-rest-'));const path=join(dir,'proof.sqlite3');legacy(path,1,1020,skipped);
    const db=open(path);t.after(()=>{db.close();removeFixture(dir);});const s=read(db,1007);
    assert.equal(s.deadline,1020);assert.equal(s.skippedAt,skipped);assert.equal(s.remaining,skipped?0:13);
    assert.equal(s.recordCount,1);assert.equal(current(s).ordinal,2);assert.equal(s.restState,skipped?'skipped':'running');
  });
  test('failed migration rolls back version/import; later retry preserves original', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-migrate-fail-'));const path=join(dir,'proof.sqlite3');legacy(path,1);
    const db=new DatabaseSync(path);t.after(()=>{db.close();removeFixture(dir);});sql.schemaV2.forEach(q=>db.exec(q));
    db.exec("CREATE TRIGGER fail_import BEFORE INSERT ON proof_sets_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>migrate(db),/injected/);assert.equal(db.prepare('PRAGMA user_version').get().user_version,0);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM proof_session_v2').get().n,0);
    assert.equal(db.prepare('SELECT reps FROM proof_set').get().reps,9);
    db.exec('DROP TRIGGER fail_import');migrate(db);assert.equal(read(db).recordCount,1);
  });
  test('partial legacy rest migration retains an expired deadline without backfilling a new rest', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-partial-'));const path=join(dir,'proof.sqlite3');legacy(path,1);
    const partial=new DatabaseSync(path);partial.exec(sql.migrations[0].statement);
    partial.prepare('UPDATE proof_set SET rest_deadline=980').run();partial.close();
    const db=open(path);t.after(()=>{db.close();removeFixture(dir);});const s=read(db,1000);
    assert.equal(s.recordCount,1);assert.equal(s.deadline,980);assert.equal(s.skippedAt,null);
    assert.equal(s.restState,'expired');assert.equal(s.remaining,0);assert.equal(current(s).ordinal,2);
  });
  test('future-set IDs and stale edits/Complete cannot target the current next draft', t => {
    const { db, initial }=fixture(t);const old=ids(initial);
    const future={...old,setID:initial.sets[2].set_id};
    assert.equal(act(db,future,'complete').recordCount,0);
    let s=act(db,old,'complete');const next={...current(s)};
    act(db,old,'reps',1001,1);act(db,old,'weight',1001,5);s=act(db,old,'complete',1100);
    assert.equal(s.recordCount,1);assert.deepEqual(current(s),next);assert.equal(s.deadline,1020);
  });
  for (const when of [1005, 1020, 1050]) test('Continue at '+when+' persists acknowledgement separately from elapsed rest', t => {
    const {db,path,initial}=fixture(t);
    let before=act(db,ids(initial),'complete');
    before=act(db,ids(before),'reps',1001,2); // Existing draft edits must survive.
    const reopenBefore=open(path);
    try {
      const pending=read(reopenBefore,when);
      assert.equal(pending.awaitingContinue,true);
      assert.equal(pending.restState,when < 1020 ? 'running':'expired');
    } finally { reopenBefore.close(); }
    const after=act(db,ids(before),'continueRest',when);
    assert.equal(after.continuedAt,when); assert.equal(after.awaitingContinue,false);
    assert.equal(after.skippedAt,when < 1020 ? when:null);
    assert.equal(after.restState,when < 1020 ? 'skipped':'expired');
    assert.equal(after.deadline,1020); assert.equal(after.remaining,0);
    assert.deepEqual(after.sets,before.sets); assert.equal(after.recordCount,1);
    assert.deepEqual(act(db,ids(before),'continueRest',when+1),after);
    const reopenAfter=open(path);
    try { assert.deepEqual(read(reopenAfter,when+50),after); migrate(reopenAfter); assert.deepEqual(read(reopenAfter,when+50),after); }
    finally { reopenAfter.close(); }
  });
  test('stale or forged Continue cannot dismiss a later rest or mutate sets/counts', t => {
    const {db,initial}=fixture(t);
    const first=act(db,ids(initial),'complete'); const old=ids(first);
    act(db,old,'continueRest',1001);
    const second=act(db,old,'complete',1002);
    for (const wrong of [old,{...ids(second),sessionID:'old'}, {...ids(second),setID:first.setID}]) {
      const result=act(db,wrong,'continueRest',1003);
      assert.equal(result.continuedAt,null); assert.equal(result.skippedAt,null);
      assert.equal(result.deadline,1022); assert.equal(result.awaitingContinue,true);
      assert.deepEqual(result.sets,second.sets);
    }
  });
  test('Continue COMMIT failure rolls acknowledgement and early skip back; retry succeeds', t => {
    const {db,path,initial}=fixture(t);const pending=act(db,ids(initial),'complete');
    const reader=open(path);
    try {
      reader.exec('BEGIN');reader.prepare('SELECT * FROM proof_rests_v2').all();
      db.exec('PRAGMA busy_timeout=10');
      assert.throws(()=>act(db,ids(pending),'continueRest',1003),/locked/);
      reader.exec('ROLLBACK');assert.deepEqual(read(db),pending);
      const retried=act(db,ids(pending),'continueRest',1004);
      assert.equal(retried.continuedAt,1004);assert.equal(retried.skippedAt,1004);
      assert.deepEqual(retried.sets,pending.sets);
    } finally {reader.close();}
  });
  test('final rest requires Continue even at zero; acknowledgement never creates a fourth set', t => {
    const {db,initial,path}=fixture(t);let s=initial;
    for(let n=0;n<3;n++) {
      if(n) s=act(db,ids(s),'continueRest',1000+n*30);
      s=act(db,ids(s),'complete',1000+n*30);
    }
    const allSaved=s.sets;
    assert.equal(s.plannedSetsRecorded,true);assert.equal(s.awaitingContinue,true);
    const reopened=open(path);
    try {s=read(reopened,1100);assert.equal(s.restState,'expired');assert.equal(s.awaitingContinue,true);}finally{reopened.close();}
    s=act(db,ids(s),'continueRest',1100);
    assert.equal(s.awaitingContinue,false);assert.equal(s.skippedAt,null);
    assert.equal(s.plannedSetsRecorded,true);assert.equal(s.recordCount,3);
    assert.deepEqual(s.sets,allSaved);assert.equal('finished' in s,false);
    assert.deepEqual(act(db,ids(s),'continueRest',1200),s);
  });
  for(const [label,deadline,skipped] of [['active',1020,null],['expired',980,null],['skipped',1020,990]]) {
    test('installed v2 '+label+' migration preserves all rows; only skipped is acknowledged', t => {
      const dir=mkdtempSync(join(tmpdir(),'swoldier-v2-'));const path=join(dir,'proof.sqlite3');
      const old=new DatabaseSync(path);old.exec(sql.schema);sql.schemaV2.forEach(q=>old.exec(q));
      run(old,sql.startSession,{sessionID:'installed'});run(old,sql.startSets,{sessionID:'installed'});
      old.exec("UPDATE proof_sets_v2 SET pounds=41,reps=9,completed=1,completion_attempts=6 WHERE ordinal=1; UPDATE proof_sets_v2 SET pounds=55,reps=7 WHERE ordinal=2");
      old.prepare('INSERT INTO proof_rests_v2 VALUES(?,?,?,?,?)').run('installed','installed:set:1:rest','installed:set:1',deadline,skipped);
      old.exec("UPDATE proof_session_v2 SET active_rest_id='installed:set:1:rest'; PRAGMA user_version=2");
      const oldSets=old.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all();old.close();
      const db=open(path);t.after(()=>{db.close();removeFixture(dir);});
      let s=read(db,1000);assert.equal(s.deadline,deadline);assert.equal(s.skippedAt,skipped);
      assert.equal(s.continuedAt,skipped);assert.equal(s.awaitingContinue,skipped==null);
      assert.deepEqual(db.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all(),oldSets);
      assert.equal(db.prepare('PRAGMA user_version').get().user_version,3);
      migrate(db);assert.deepEqual(read(db,1000),s);
    });
  }
  test('v3 migration failure rolls back additive column/backfill, preserving installed v2 data', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-v3-fail-'));const path=join(dir,'proof.sqlite3');
    const db=new DatabaseSync(path);t.after(()=>{db.close();removeFixture(dir);});
    db.exec(sql.schema);sql.schemaV2.forEach(q=>db.exec(q));
    db.exec("INSERT INTO proof_rests_v2 VALUES('old','rest','set',1020,1005); PRAGMA user_version=2; CREATE TRIGGER fail_ack BEFORE UPDATE ON proof_rests_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>migrate(db),/injected/);
    assert.equal(db.prepare('PRAGMA user_version').get().user_version,2);
    assert.equal(db.prepare('PRAGMA table_info(proof_rests_v2)').all().some(c=>c.name==='continued_at'),false);
    assert.equal(db.prepare('SELECT skipped_at FROM proof_rests_v2').get().skipped_at,1005);
    db.exec('DROP TRIGGER fail_ack');migrate(db);
    assert.equal(db.prepare('SELECT continued_at FROM proof_rests_v2').get().continued_at,1005);
  });

}
