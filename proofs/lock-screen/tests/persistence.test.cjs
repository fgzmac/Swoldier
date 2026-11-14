const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { mkdtempSync, realpathSync, rmSync } = require('node:fs');
const { join, dirname, basename } = require('node:path');
const { tmpdir } = require('node:os');
const { DatabaseSync } = require('node:sqlite');
const { test } = require('node:test');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const sql = require('../native/ProofSQL.json');
// Installed v2-v4 fixture writers, not the production creation path.
const legacyStartSession = "INSERT INTO proof_session_v2 (slot,session_id) VALUES (1,:sessionID)";
const legacyStartSets = "WITH fixture(n,p,r) AS (VALUES(1,40,8),(2,50,8),(3,45,10)) INSERT INTO proof_sets_v2(session_id,set_id,ordinal,planned_pounds,planned_reps,pounds,reps) SELECT :sessionID,:sessionID || ':set:' || n,n,p,r,p,r FROM fixture";

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
  if (db.prepare('PRAGMA user_version').get().user_version >= 5) return;
  transaction(db, () => {
    const version = db.prepare('PRAGMA user_version').get().user_version;
    if (version >= 5) return;
    if (version < 2) {
      const cols = new Set(db.prepare('PRAGMA table_info(proof_set)').all().map(r => r.name));
      for (const m of sql.migrations) if (!cols.has(m.column)) db.exec(m.statement);
      for (const text of [...sql.schemaV2, ...sql.importLegacy]) db.exec(text);
    }
    if (version < 3) for (const text of sql.migrationsV3) db.exec(text);
    if (version < 4) for (const text of sql.migrationsV4) db.exec(text);
    for (const text of sql.migrationsV5) db.exec(text);
    db.exec('PRAGMA user_version = 5');
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
  const allSets = all(db, sql.readSets, params);
  const sets = allSets.filter(s => s.exercise_id === session.active_exercise_id);
  const exercises = all(db, sql.readExercises, params);
  const current = sets.find(s => !s.completed) ?? sets.at(-1);
  const rest = all(db, sql.readRest, params)[0] ?? null;
  // Positional projection deliberately follows Swift's separate snapshot mapping.
  const values = rest ? Object.values(rest) : [];
  return { sessionID: session.session_id, setID: current.set_id, restID: session.active_rest_id,
    sets, allSets, exercises, exerciseID:session.active_exercise_id, finishedAt:session.finished_at,
    recordCount: allSets.filter(s => s.completed).length, plannedSetsRecorded: sets.every(s => s.completed),
    deadline: values[0] ?? null, skippedAt: values[1] ?? null,
    restState: values[2] ?? 'not_started', remaining: values[3] ?? 0,
    continuedAt: values[4] ?? null, restSetID: values[5] ?? null, undoneAt: values[6] ?? null, awaitingContinue: rest !== null && values[4] == null };
}
function start(db, sessionID = randomUUID()) {
  return transaction(db, () => {
    if(run(db, sql.startSession, { sessionID })===1) {
      run(db,sql.startExercises,{sessionID});run(db, sql.startSets, { sessionID });
    }
    return readInternal(db);
  });
}
function act(db, ids, action, now = 1000, delta = 0) {
  return transaction(db, () => {
    const p = { ...ids, now, delta, newRestID: randomUUID(), newSetID: randomUUID() };
    if (action === 'complete') {
      run(db, sql.countCompleteRequest, p);
      if (run(db, sql.complete, p) === 1) {
        assert.equal(run(db, sql.createRest, p), 1); assert.equal(run(db, sql.advanceRest, p), 1);
      }
    } else if(action==='nextExercise') {
      if(run(db,sql.finishExercise,p)===1) assert.equal(run(db,sql.advanceExercise,p),1);
    } else if(action==='finishWorkout') {
      if(run(db,sql.finishLastExercise,p)===1) assert.equal(run(db,sql.finishWorkout,p),1);
    } else if (action === 'undo') {
      if (run(db, sql.undo, p) === 1) assert.equal(run(db, sql.markUndone, p), 1);
    } else { run(db, sql[action === 'skip' ? 'continueRest' : action], p); }
    return readInternal(db, now);
  });
}
function reset(db) { transaction(db, () => sql.reset.forEach(q => db.exec(q))); }
function ids(s) { return { sessionID: s.sessionID, setID: s.setID, restID: s.restID }; }
function undoIDs(s) { return { ...ids(s), setID: s.restSetID }; }
function current(s) { return s.sets.find(r => !r.completed) ?? s.sets.at(-1); }
function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'swoldier-three-'));
  const path = join(dir, 'proof.sqlite3'); const db = open(path);
  t.after(() => { db.close(); removeFixture(dir); });
  return { db, path, dir, initial: start(db) };
}
function finishActive(db, state, now=2000) {
  let s=state;
  while(!s.plannedSetsRecorded) {
    if(s.awaitingContinue) s=act(db,ids(s),'continueRest',now);
    s=act(db,ids(s),'complete',now); now+=30;
  }
  return s;
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
  try { act(db, workerData.ids, workerData.action ?? 'complete', workerData.now ?? 1000); parentPort.postMessage('done'); }
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
    for(const action of ['complete','skip','continueRest','undo','weight','reps'])act(db,ids(previous),action,1001,1);
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
      reader.exec('BEGIN');reader.prepare('SELECT * FROM proof_sets_v5').all();
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
    db.prepare('UPDATE proof_sets_v5 SET pounds=198,reps=29 WHERE set_id=?').run(target.setID);
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
      run(old,legacyStartSession,{sessionID:'installed'});run(old,legacyStartSets,{sessionID:'installed'});
      old.exec("UPDATE proof_sets_v2 SET pounds=41,reps=9,completed=1,completion_attempts=6 WHERE ordinal=1; UPDATE proof_sets_v2 SET pounds=55,reps=7 WHERE ordinal=2");
      old.prepare('INSERT INTO proof_rests_v2 VALUES(?,?,?,?,?)').run('installed','installed:set:1:rest','installed:set:1',deadline,skipped);
      old.exec("UPDATE proof_session_v2 SET active_rest_id='installed:set:1:rest'; PRAGMA user_version=2");
      const oldSets=old.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all();old.close();
      const db=open(path);t.after(()=>{db.close();removeFixture(dir);});
      let s=read(db,1000);assert.equal(s.deadline,deadline);assert.equal(s.skippedAt,skipped);
      assert.equal(s.continuedAt,skipped);assert.equal(s.awaitingContinue,skipped==null);
      assert.deepEqual(db.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all(),oldSets);
      assert.equal(db.prepare('PRAGMA user_version').get().user_version,5);
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

  for (const when of [1005,1020,1050]) test('Undo at '+when+' restores entered values without changing rest or other drafts', t => {
    const {db,path,initial}=fixture(t);
    act(db,ids(initial),'weight',999,5);act(db,ids(initial),'reps',999,1);
    let saved=act(db,ids(initial),'complete',1000);
    saved=act(db,ids(saved),'weight',1001,5); // Pre-existing later draft edit, preserved by Undo.
    const target=undoIDs(saved),before=read(db,when);
    const restored=act(db,target,'undo',when);
    assert.equal(restored.recordCount,0);assert.equal(restored.setID,initial.setID);
    assert.deepEqual(restored.sets[0],{...before.sets[0],completed:0});
    assert.deepEqual(restored.sets.slice(1),before.sets.slice(1));
    assert.deepEqual([restored.restID,restored.restSetID,restored.deadline,restored.skippedAt,restored.continuedAt,restored.restState,restored.remaining],
      [before.restID,before.restSetID,before.deadline,before.skippedAt,before.continuedAt,before.restState,before.remaining]);
    assert.equal(restored.undoneAt,when);assert.equal(restored.awaitingContinue,true);
    const reopen=open(path);try {assert.deepEqual(read(reopen,when),restored);}finally{reopen.close();}
    const duplicate=act(db,target,'undo',when+1);
    assert.equal(duplicate.undoneAt,when);assert.equal(duplicate.deadline,restored.deadline);
    assert.deepEqual(duplicate.sets,restored.sets);assert.equal(duplicate.continuedAt,null);
    const oldContinue=act(db,ids(saved),'continueRest',when);assert.equal(oldContinue.awaitingContinue,true);
    const continued=act(db,ids(restored),'continueRest',when);
    assert.equal(continued.setID,initial.setID);assert.equal(continued.awaitingContinue,false);
    assert.equal(continued.skippedAt,when < 1020 ? when:null);
    assert.equal(continued.deadline,1020);assert.deepEqual(continued.sets,restored.sets);
    const reopenAfter=open(path);try{assert.deepEqual(read(reopenAfter,when),continued);}finally{reopenAfter.close();}
  });
  test('re-completion gets a fresh rest ID; old Undo and Complete cannot affect it', t => {
    const {db,initial}=fixture(t);
    const first=act(db,ids(initial),'complete',1000),oldUndo=undoIDs(first);
    let s=act(db,oldUndo,'undo',1001);
    s=act(db,ids(s),'complete',1002);assert.equal(s.recordCount,0);assert.equal(s.deadline,1020);
    s=act(db,ids(s),'continueRest',1021);
    s=act(db,ids(s),'reps',1022,1);const recomplete=ids(s);
    s=act(db,recomplete,'complete',1023);const second=s;
    assert.notEqual(s.restID,first.restID);assert.equal(s.deadline,1043);
    assert.equal(s.recordCount,1);assert.equal(s.undoneAt,null);assert.equal(s.continuedAt,null);
    assert.deepEqual([s.sets[0].pounds,s.sets[0].reps,s.sets[0].planned_reps],[40,9,8]);
    assert.deepEqual(act(db,oldUndo,'undo',1023),second);
    assert.deepEqual(act(db,ids(first),'continueRest',1023),second);
    s=act(db,recomplete,'complete',1024);
    assert.equal(s.recordCount,1);assert.equal(s.deadline,1043);assert.equal(s.restID,second.restID);
    assert.equal(s.sets[0].completion_attempts,second.sets[0].completion_attempts+1);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM proof_rests_v2').get().n,1);
    assert.equal(act(db,undoIDs(second),'undo',1025).recordCount,0); // Only this new completion can now be undone.
  });
  test('Undo rejects other sessions/sets/rests and already acknowledged rest', t => {
    const {db,initial}=fixture(t);const saved=act(db,ids(initial),'complete');const target=undoIDs(saved);
    for(const wrong of [{...target,sessionID:'old'},{...target,restID:'old'},ids(saved)]) {
      assert.deepEqual(act(db,wrong,'undo',1000),saved);
    }
    const dismissed=act(db,ids(saved),'continueRest',1000);
    assert.deepEqual(act(db,target,'undo',1001),dismissed);
    const next=act(db,ids(dismissed),'complete',1002);
    assert.deepEqual(act(db,target,'undo',1002),next);
  });
  test('final-set Undo preserves earlier actuals and later returns the final draft, not finished state', t => {
    const {db,initial}=fixture(t);let s=initial;
    for(let n=0;n<3;n++) {
      if(n) s=act(db,ids(s),'continueRest',1000+n*30);
      s=act(db,ids(s),'complete',1000+n*30);
    }
    const saved=s,earlier=s.sets.slice(0,2);
    s=act(db,undoIDs(saved),'undo',1090);
    assert.equal(s.plannedSetsRecorded,false);assert.equal(s.recordCount,2);assert.equal(current(s).ordinal,3);
    assert.equal(s.deadline,1080);assert.equal(s.awaitingContinue,true);assert.equal(s.remaining,0);
    assert.deepEqual(s.sets.slice(0,2),earlier);assert.equal(s.sets.length,3);
    s=act(db,ids(s),'continueRest',1091);assert.equal(s.plannedSetsRecorded,false);assert.equal(current(s).ordinal,3);
    s=act(db,ids(s),'reps',1092,1);s=act(db,ids(s),'complete',1093);
    assert.equal(s.recordCount,3);assert.equal(s.deadline,1113);assert.notEqual(s.restID,saved.restID);
    assert.deepEqual(s.sets.slice(0,2),earlier);assert.equal(s.sets[2].reps,11);
    assert.equal(s.sets.length,3);assert.equal('finished' in s,false);
    assert.deepEqual(act(db,undoIDs(saved),'undo',1093),s);
  });
  test('Undo marker failure rolls the completed record back; exact retry remains safe', t => {
    const {db,initial}=fixture(t);const saved=act(db,ids(initial),'complete');const target=undoIDs(saved);
    db.exec("CREATE TRIGGER fail_undo BEFORE UPDATE OF undone_at ON proof_rests_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>act(db,target,'undo',1003),/injected/);assert.deepEqual(read(db),saved);
    db.exec('DROP TRIGGER fail_undo');const restored=act(db,target,'undo',1003);
    assert.equal(restored.recordCount,0);assert.equal(restored.undoneAt,1003);assert.equal(restored.deadline,1020);
    assert.equal(restored.sets[0].completion_attempts,1);
  });
  test('Undo COMMIT failure rolls back both writes before success; retry commits once', t => {
    const {db,path,initial}=fixture(t);const saved=act(db,ids(initial),'complete');const target=undoIDs(saved);
    const reader=open(path);
    try {
      reader.exec('BEGIN');reader.prepare('SELECT * FROM proof_sets_v5').all();db.exec('PRAGMA busy_timeout=10');
      assert.throws(()=>act(db,target,'undo',1003),/locked/);reader.exec('ROLLBACK');
      assert.deepEqual(read(db),saved);const undone=act(db,target,'undo',1004);
      assert.equal(undone.recordCount,0);assert.equal(undone.undoneAt,1004);assert.equal(undone.deadline,1020);
    } finally{reader.close();}
  });
  test('failed re-completion rest replacement preserves restored draft and acknowledged old deadline', t => {
    const {db,initial}=fixture(t);let s=act(db,ids(initial),'complete');s=act(db,undoIDs(s),'undo',1001);
    s=act(db,ids(s),'continueRest',1002);const before=s;
    db.exec("CREATE TRIGGER fail_replace BEFORE UPDATE OF rest_id ON proof_rests_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>act(db,ids(before),'complete',1003),/injected/);assert.deepEqual(read(db,1002),before);
    db.exec('DROP TRIGGER fail_replace');s=act(db,ids(before),'complete',1004);
    assert.equal(s.recordCount,1);assert.equal(s.deadline,1024);assert.notEqual(s.restID,before.restID);
    assert.equal(s.sets[0].completion_attempts,before.sets[0].completion_attempts+1);
  });
  for(const [label,deadline,skipped,continued] of [
    ['active',1020,null,null],['expired',980,null,null],['skipped',1020,990,990],['dismissed',980,null,990]
  ]) test('v3 '+label+' migration adds Undo metadata without altering installed data', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-v4-'));const path=join(dir,'proof.sqlite3');
    const old=new DatabaseSync(path);old.exec(sql.schema);sql.schemaV2.forEach(q=>old.exec(q));sql.migrationsV3.forEach(q=>old.exec(q));
    run(old,legacyStartSession,{sessionID:'installed'});run(old,legacyStartSets,{sessionID:'installed'});
    old.exec("UPDATE proof_sets_v2 SET pounds=45,reps=9,completed=1,completion_attempts=6 WHERE ordinal=1; UPDATE proof_sets_v2 SET pounds=55,reps=7 WHERE ordinal=2");
    old.prepare('INSERT INTO proof_rests_v2 VALUES(?,?,?,?,?,?)').run('installed','installed:set:1:rest','installed:set:1',deadline,skipped,continued);
    old.exec("UPDATE proof_session_v2 SET active_rest_id='installed:set:1:rest'; PRAGMA user_version=3");
    const oldSets=old.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all();old.close();
    const db=open(path);t.after(()=>{db.close();removeFixture(dir);});const s=read(db);
    assert.equal(s.undoneAt,null);assert.equal(s.restSetID,'installed:set:1');assert.equal(s.restID,'installed:set:1:rest');
    assert.deepEqual([s.deadline,s.skippedAt,s.continuedAt],[deadline,skipped,continued]);
    assert.deepEqual(db.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all(),oldSets);
    assert.equal(db.prepare('PRAGMA user_version').get().user_version,5);migrate(db);assert.deepEqual(read(db),s);
    const undone=act(db,undoIDs(s),'undo');
    if(continued==null) {
      assert.equal(undone.recordCount,0);assert.equal(undone.deadline,deadline);
      let again=act(db,ids(undone),'continueRest');again=act(db,ids(again),'complete',1001);
      assert.equal(again.recordCount,1);assert.notEqual(again.restID,s.restID);assert.equal(again.deadline,1021);
    } else assert.deepEqual(undone,s);
  });
  test('v4 migration COMMIT failure leaves version and schema intact; retry succeeds', t => {
    const dir=mkdtempSync(join(tmpdir(),'swoldier-v4-fail-'));const path=join(dir,'proof.sqlite3');
    const db=new DatabaseSync(path);db.exec(sql.schema);sql.schemaV2.forEach(q=>db.exec(q));sql.migrationsV3.forEach(q=>db.exec(q));db.exec('PRAGMA user_version=3');
    const reader=new DatabaseSync(path);t.after(()=>{reader.close();db.close();removeFixture(dir);});
    reader.exec('BEGIN');reader.prepare('SELECT * FROM proof_rests_v2').all();db.exec('PRAGMA busy_timeout=10');
    assert.throws(()=>migrate(db),/locked/);reader.exec('ROLLBACK');
    assert.equal(db.prepare('PRAGMA user_version').get().user_version,3);
    assert.equal(db.prepare('PRAGMA table_info(proof_rests_v2)').all().some(c=>c.name==='undone_at'),false);
    migrate(db);assert.equal(db.prepare('PRAGMA user_version').get().user_version,5);
    assert.equal(db.prepare('PRAGMA table_info(proof_rests_v2)').all().some(c=>c.name==='undone_at'),true);
  });

  test('overlapping Undo requests commit one restoration and no Complete counts', async t => {
    const {db,path,initial}=fixture(t);const saved=act(db,ids(initial),'complete');
    await Promise.all([1,2].map(() => new Promise((resolve,reject)=>{
      const w=new Worker(__filename,{workerData:{path,ids:undoIDs(saved),action:'undo',now:1004}});
      w.once('error',reject);w.once('exit',code=>code?reject(Error('Worker failed')):resolve());
    })));
    const restored=read(db,1004);assert.equal(restored.recordCount,0);assert.equal(restored.undoneAt,1004);
    assert.equal(restored.deadline,1020);assert.equal(restored.continuedAt,null);
    assert.equal(restored.sets[0].completion_attempts,1);assert.deepEqual(restored.sets.slice(1),saved.sets.slice(1));
  });

  test('undone rest edits persist without Continue and preserve rest, plans and later drafts', t => {
    const {db,path,initial}=fixture(t);
    let saved=act(db,ids(initial),'complete',1000);
    saved=act(db,ids(saved),'weight',1001,5); // Retain an independently edited later draft.
    const undone=act(db,undoIDs(saved),'undo',1002);
    let edited=act(db,ids(undone),'weight',1003,5);
    edited=act(db,ids(edited),'reps',1004,1);
    assert.deepEqual(edited.sets[0],{...undone.sets[0],pounds:45,reps:9});
    assert.deepEqual(edited.sets.slice(1),saved.sets.slice(1));
    for(const k of ['restID','deadline','continuedAt','skippedAt','undoneAt','recordCount']) assert.equal(edited[k],undone[k]);
    const reopened=open(path);
    try {migrate(reopened);assert.deepEqual(read(reopened,1004),edited);}finally{reopened.close();}
    const continued=act(db,ids(edited),'continueRest',1005);
    assert.deepEqual(continued.sets,edited.sets);assert.equal(continued.deadline,1020);
    assert.equal(continued.skippedAt,1005);assert.equal(continued.continuedAt,1005);
    const savedAgain=act(db,ids(continued),'complete',1006);
    assert.equal(savedAgain.recordCount,1);assert.equal(savedAgain.deadline,1026);
    assert.deepEqual([savedAgain.sets[0].pounds,savedAgain.sets[0].reps,savedAgain.sets[0].planned_pounds,savedAgain.sets[0].planned_reps],[45,9,40,8]);
  });
  for(const when of [1019.999,1020,1020.001]) test('undone Complete checks saved deadline at '+when+' without Continue', t => {
    const {db,initial}=fixture(t);
    const saved=act(db,ids(initial),'complete',1000);
    let draft=act(db,undoIDs(saved),'undo',1001);
    draft=act(db,ids(draft),'reps',1002,1);
    const result=act(db,ids(draft),'complete',when);
    assert.equal(result.sets[0].completion_attempts,2);
    assert.deepEqual(result.sets.slice(1),draft.sets.slice(1));
    if(when<1020) {
      assert.equal(result.recordCount,0);assert.equal(result.restID,draft.restID);
      assert.equal(result.deadline,1020);assert.equal(result.continuedAt,null);
      assert.equal(result.undoneAt,1001);assert.equal(result.sets[0].reps,9);
    } else {
      assert.equal(result.recordCount,1);assert.notEqual(result.restID,draft.restID);
      assert.equal(result.deadline,when+20);assert.equal(result.continuedAt,null);
      assert.equal(result.skippedAt,null);assert.equal(result.undoneAt,null);
      assert.deepEqual([result.sets[0].pounds,result.sets[0].reps,result.sets[0].planned_reps],[40,9,8]);
      assert.equal(db.prepare('SELECT COUNT(*) AS n FROM proof_rests_v2').get().n,1);
    }
  });
  test('expired undone draft survives reopening; old exact actions cannot affect its re-completion', t => {
    const {db,path,initial}=fixture(t);const first=act(db,ids(initial),'complete',1000);
    let draft=act(db,undoIDs(first),'undo',1001);draft=act(db,ids(draft),'weight',1002,5);
    const original=ids(draft),reopen=open(path);let second;
    try {
      const restored=read(reopen,1030);assert.equal(restored.continuedAt,null);assert.equal(restored.deadline,1020);
      assert.deepEqual(restored.sets,draft.sets);
      second=act(reopen,original,'complete',1030);
    }finally{reopen.close();}
    for(const action of ['undo','continueRest','skip','weight','reps']) {
      assert.deepEqual(act(db,original,action,1030,1),second);
    }
    const repeated=act(db,original,'complete',1030);
    assert.deepEqual(repeated,{...second,sets:second.sets.map((r,i)=>i ? r : {...r,completion_attempts:r.completion_attempts+1}),allSets:second.allSets.map((r,i)=>i ? r : {...r,completion_attempts:r.completion_attempts+1})});
    // Even after Undo of the newer completion, an older retry cannot save that draft.
    const newerDraft=act(db,undoIDs(second),'undo',1031);
    const oldRetry=act(db,original,'complete',1100);
    assert.equal(oldRetry.recordCount,0);assert.equal(oldRetry.restID,newerDraft.restID);
    assert.equal(oldRetry.deadline,1050);assert.equal(oldRetry.continuedAt,null);
    assert.equal(oldRetry.sets[0].pounds,45);
    assert.equal(act(db,ids(newerDraft),'complete',1100).recordCount,1);
  });
  test('final undone draft can be edited and re-completed after expiry without Continue', t => {
    const {db,initial}=fixture(t);let s=initial;
    for(let n=0;n<3;n++) {
      if(n) s=act(db,ids(s),'continueRest',1000+n*30);
      s=act(db,ids(s),'complete',1000+n*30);
    }
    const saved=s,earlier=s.sets.slice(0,2);
    s=act(db,undoIDs(s),'undo',1070);s=act(db,ids(s),'reps',1071,1);
    assert.equal(s.plannedSetsRecorded,false);assert.equal(s.continuedAt,null);assert.equal(s.deadline,1080);
    s=act(db,ids(s),'complete',1080);
    assert.equal(s.recordCount,3);assert.equal(s.sets.length,3);assert.equal(s.plannedSetsRecorded,true);
    assert.deepEqual(s.sets.slice(0,2),earlier);
    assert.deepEqual([s.sets[2].pounds,s.sets[2].reps,s.sets[2].planned_reps],[45,11,10]);
    assert.equal(s.deadline,1100);assert.notEqual(s.restID,saved.restID);
    assert.equal(s.awaitingContinue,true);assert.equal('finished' in s,false);
  });
  test('expired unacknowledged re-completion failure preserves draft for exact retry', t => {
    const {db,initial}=fixture(t);let s=act(db,ids(initial),'complete');
    s=act(db,undoIDs(s),'undo',1001);s=act(db,ids(s),'reps',1002,1);
    const before=read(db,1020),target=ids(before);
    db.exec("CREATE TRIGGER fail_recomplete BEFORE UPDATE OF rest_id ON proof_rests_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>act(db,target,'complete',1020),/injected/);
    assert.deepEqual(read(db,1020),before);
    db.exec('DROP TRIGGER fail_recomplete');const retried=act(db,target,'complete',1021);
    assert.equal(retried.recordCount,1);assert.equal(retried.sets[0].reps,9);
    assert.equal(retried.sets[0].completion_attempts,2);assert.equal(retried.deadline,1041);
  });

  test('fresh fixture has exactly two distinct exercises; ordinary start never appends',t=>{
    const {db,path,initial}=fixture(t);
    assert.equal(initial.exercises.length,2);assert.equal(initial.allSets.length,5);
    const second=initial.allSets.filter(r=>r.exercise_id!==initial.exerciseID);
    assert.deepEqual(second.map(r=>[r.pounds,r.reps]),[[15,12],[20,10]]);
    assert.deepEqual(start(db),initial);const reopen=open(path);
    try{assert.deepEqual(start(reopen),initial);}finally{reopen.close();}
  });
  test('all final actions require every set completed and final Continue, even after expiry',t=>{
    const {db,initial}=fixture(t);
    for(const action of ['addSet','nextExercise','finishWorkout'])assert.deepEqual(act(db,ids(initial),action,1000),initial);
    const pending=finishActive(db,initial);const expired=read(db,2200);
    for(const action of ['addSet','nextExercise','finishWorkout'])assert.deepEqual(act(db,ids(pending),action,2200),expired);
    assert.equal(expired.finishedAt,null);assert.equal(expired.exercises[0].finished_at,null);
    const ready=act(db,ids(pending),'continueRest',2200);
    assert.deepEqual(act(db,ids(ready),'finishWorkout',2200),ready); // Exercise B still exists.
    for(const bad of [{...ids(ready),sessionID:'old'},{...ids(ready),setID:initial.setID},{...ids(ready),restID:'none'}])
      for(const action of ['addSet','nextExercise','finishWorkout'])assert.deepEqual(act(db,bad,action,2200),ready);
  });
  test('Add Set copies current exercise last actual values, not plans, without rest or completion',t=>{
    const {db,initial}=fixture(t);let s=initial;
    for(let n=0;n<2;n++){s=act(db,ids(s),'complete',2000+n*30);s=act(db,ids(s),'continueRest',2001+n*30);}
    s=act(db,ids(s),'weight',2060,5);s=act(db,ids(s),'reps',2061,1);
    s=act(db,ids(s),'complete',2062);s=act(db,ids(s),'continueRest',2063);const before=s,old=ids(s);
    s=act(db,old,'addSet',2064);
    assert.equal(s.sets.length,4);assert.equal(s.recordCount,3);assert.equal(s.finishedAt,null);
    assert.deepEqual(s.sets.slice(0,3),before.sets);assert.deepEqual(s.allSets.filter(r=>r.exercise_id!==s.exerciseID),before.allSets.filter(r=>r.exercise_id!==s.exerciseID));
    assert.deepEqual([current(s).pounds,current(s).reps,current(s).planned_pounds,current(s).planned_reps,current(s).completed,current(s).is_added,current(s).completion_attempts],[50,11,null,null,0,1,0]);
    for(const k of ['restID','deadline','skippedAt','continuedAt'])assert.equal(s[k],before[k]);
    for(const action of ['addSet','nextExercise','finishWorkout'])assert.deepEqual(act(db,old,action,2064),s);
    s=act(db,ids(s),'complete',2065);assert.notEqual(s.restID,before.restID);
    s=act(db,ids(s),'continueRest',2066);const secondReady=s;
    assert.deepEqual(act(db,old,'addSet',2066),secondReady);
    s=act(db,ids(s),'addSet',2067);assert.equal(s.sets.length,5);
    assert.deepEqual([current(s).pounds,current(s).reps],[50,11]);assert.equal(s.sets.filter(r=>!r.is_added).length,3);
  });
  test('added draft Undo preserves values/deadline and can re-complete at expiry without Continue',t=>{
    const {db,path,initial}=fixture(t);let s=finishActive(db,initial);
    s=act(db,ids(s),'continueRest',2200);s=act(db,ids(s),'addSet',2201);s=act(db,ids(s),'reps',2202,1);
    const draft=s;s=act(db,ids(s),'complete',2203);const saved=s,old=undoIDs(s);
    s=act(db,old,'undo',2204);assert.equal(current(s).set_id,draft.setID);assert.equal(current(s).reps,11);
    assert.equal(s.recordCount,3);assert.equal(s.deadline,2223);assert.equal(s.continuedAt,null);
    s=act(db,ids(s),'complete',2205);assert.equal(s.recordCount,3);
    s=act(db,ids(s),'weight',2206,5);const reopen=open(path);
    try{assert.deepEqual(read(reopen,2206),s);}finally{reopen.close();}
    s=act(db,ids(s),'complete',2223);assert.equal(s.recordCount,4);assert.notEqual(s.restID,saved.restID);
    assert.deepEqual([s.sets[3].pounds,s.sets[3].reps,s.sets[3].is_added,s.sets[3].planned_reps],[50,11,1,null]);
    assert.deepEqual(act(db,old,'undo',2223),s);assert.deepEqual(s.sets.slice(0,3),draft.sets.slice(0,3));
  });
  test('Next Exercise commits once, restores independent defaults and freezes previous exercise history',t=>{
    const {db,path,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);
    const old=ids(s),records=s.sets;s=act(db,old,'nextExercise',2201);
    assert.notEqual(s.exerciseID,initial.exerciseID);assert.equal(s.restID,'none');assert.equal(s.deadline,null);
    assert.deepEqual([current(s).pounds,current(s).reps],[15,12]);assert.equal(s.exercises[0].finished_at,2201);
    assert.deepEqual(s.allSets.filter(r=>r.exercise_id===initial.exerciseID),records);assert.equal(s.recordCount,3);
    for(const action of ['nextExercise','addSet','finishWorkout','undo','complete','continueRest','weight','reps'])assert.deepEqual(act(db,old,action,2201,1),s);
    const reopened=open(path);try{assert.deepEqual(read(reopened,2201),s);}finally{reopened.close();}
    s=act(db,ids(s),'complete',2202);assert.equal(s.deadline,2222);
    assert.deepEqual([current(s).pounds,current(s).reps],[20,10]);assert.equal(s.recordCount,4);
  });
  test('final exercise Add Set copies its own actuals and Finish Workout preserves all records once',t=>{
    const {db,path,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);s=act(db,ids(s),'nextExercise',2201);
    s=finishActive(db,s,2300);assert.equal(s.recordCount,5);assert.equal(s.finishedAt,null);
    const expired=read(db,2400);assert.deepEqual(act(db,ids(s),'finishWorkout',2400),expired);
    s=act(db,ids(s),'continueRest',2400);assert.deepEqual(act(db,ids(s),'nextExercise',2400),s);
    s=act(db,ids(s),'addSet',2401);assert.deepEqual([current(s).pounds,current(s).reps],[20,10]);
    s=act(db,ids(s),'complete',2402);s=act(db,ids(s),'continueRest',2403);
    const before=s,target=ids(s);s=act(db,target,'finishWorkout',2404);
    assert.equal(s.finishedAt,2404);assert.equal(s.exercises[1].finished_at,2404);assert.equal(s.recordCount,6);
    assert.deepEqual(s.allSets,before.allSets);assert.equal(s.deadline,before.deadline);
    for(const action of ['finishWorkout','nextExercise','addSet','undo','complete','continueRest','weight','reps'])assert.deepEqual(act(db,target,action,2404,1),s);
    const reopen=open(path);try{assert.deepEqual(read(reopen,2404),s);assert.deepEqual(start(reopen),s);}finally{reopen.close();}
  });
  for(const winner of ['addSet','nextExercise'])test('competing Add/Next: '+winner+' wins without a partial second transition',t=>{
    const {db,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);const target=ids(s);
    const won=act(db,target,winner,2201);const lost=act(db,target,winner==='addSet'?'nextExercise':'addSet',2201);
    assert.deepEqual(lost,won);
  });
  test('concurrent Add Set delivery creates just one draft',async t=>{
    const {db,path,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);
    await Promise.all([1,2].map(()=>new Promise((resolve,reject)=>{
      const w=new Worker(__filename,{workerData:{path,ids:ids(s),action:'addSet',now:2201}});
      w.once('error',reject);w.once('exit',code=>code?reject(Error('Worker failed')):resolve());
    })));
    const result=read(db,2201);assert.equal(result.sets.length,4);assert.equal(result.recordCount,3);assert.equal(result.sets.filter(r=>!r.completed).length,1);
  });
  for(const action of ['nextExercise','finishWorkout'])test(action+' second-write failure rolls back exercise finish; exact retry succeeds',t=>{
    const {db,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);
    if(action==='finishWorkout'){s=act(db,ids(s),'nextExercise',2201);s=finishActive(db,s,2300);s=act(db,ids(s),'continueRest',2400);}
    const before=read(db,2500),target=ids(s),column=action==='nextExercise'?'active_exercise_id':'finished_at';
    db.exec(`CREATE TRIGGER fail_transition BEFORE UPDATE OF ${column} ON proof_session_v2 BEGIN SELECT RAISE(ABORT,'injected'); END`);
    assert.throws(()=>act(db,target,action,2500),/injected/);assert.deepEqual(read(db,2500),before);
    db.exec('DROP TRIGGER fail_transition');const retry=act(db,target,action,2501);
    assert.equal(retry.exercises.find(e=>e.exercise_id===before.exerciseID).finished_at,2501);
  });
  test('Add Set COMMIT failure exposes no draft and exact retry appends once',t=>{
    const {db,path,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);
    const reader=open(path);try{
      reader.exec('BEGIN');reader.prepare('SELECT * FROM proof_sets_v5').all();db.exec('PRAGMA busy_timeout=10');
      assert.throws(()=>act(db,ids(s),'addSet',2201),/locked/);reader.exec('ROLLBACK');assert.deepEqual(read(db,2200),s);
      const retry=act(db,ids(s),'addSet',2201);assert.equal(retry.sets.length,4);assert.equal(retry.recordCount,3);
    }finally{reader.close();}
  });
  for(const [label,skipped,continued,undone] of [['active',null,null,null],['expired',null,null,null],['skipped',1001,1001,null],['undone',null,null,1001]])test('installed v4 '+label+' remains one exercise with exact records/rest, even after start',t=>{
    const dir=mkdtempSync(join(tmpdir(),'swoldier-v5-')),path=join(dir,'proof.sqlite3');
    const old=new DatabaseSync(path);old.exec(sql.schema);sql.schemaV2.forEach(q=>old.exec(q));sql.migrationsV3.forEach(q=>old.exec(q));sql.migrationsV4.forEach(q=>old.exec(q));
    run(old,legacyStartSession,{sessionID:'installed'});run(old,legacyStartSets,{sessionID:'installed'});
    old.exec(`UPDATE proof_sets_v2 SET pounds=55,reps=11,completed=${undone==null?1:0},completion_attempts=7 WHERE ordinal=1`);
    old.prepare('INSERT INTO proof_rests_v2 VALUES(?,?,?,?,?,?,?)').run('installed','original-rest','installed:set:1',label==='expired'?980:1020,skipped,continued,undone);
    old.exec("UPDATE proof_session_v2 SET active_rest_id='original-rest'; PRAGMA user_version=4");
    const rows=old.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all();old.close();
    const db=open(path);t.after(()=>{db.close();removeFixture(dir);});let s=read(db,1000);
    assert.equal(s.exercises.length,1);assert.equal(s.allSets.length,3);assert.equal(s.restID,'original-rest');
    assert.deepEqual([s.deadline,s.skippedAt,s.continuedAt,s.undoneAt],[label==='expired'?980:1020,skipped,continued,undone]);
    const copied=db.prepare('SELECT * FROM proof_sets_v5 ORDER BY ordinal').all();
    for(let i=0;i<rows.length;i++)for(const [k,v] of Object.entries(rows[i]))assert.equal(copied[i][k],v);
    assert.deepEqual(db.prepare('SELECT * FROM proof_sets_v2 ORDER BY ordinal').all(),rows);
    assert.deepEqual(start(db),s);migrate(db);assert.deepEqual(read(db),s);
    s=finishActive(db,s,2000);s=act(db,ids(s),'continueRest',2200);
    assert.deepEqual(act(db,ids(s),'nextExercise',2200),s);assert.equal(act(db,ids(s),'finishWorkout',2201).finishedAt,2201);
    reset(db);assert.equal(start(db).exercises.length,2);
  });
  test('v5 migration failure rolls back copied table and metadata; retry preserves v4 rows',t=>{
    const dir=mkdtempSync(join(tmpdir(),'swoldier-v5-rollback-')),path=join(dir,'proof.sqlite3');const db=new DatabaseSync(path);
    t.after(()=>{db.close();removeFixture(dir);});db.exec(sql.schema);sql.schemaV2.forEach(q=>db.exec(q));sql.migrationsV3.forEach(q=>db.exec(q));sql.migrationsV4.forEach(q=>db.exec(q));
    run(db,legacyStartSession,{sessionID:'installed'});run(db,legacyStartSets,{sessionID:'installed'});
    db.exec("PRAGMA user_version=4; CREATE TRIGGER fail_v5 BEFORE UPDATE ON proof_session_v2 BEGIN SELECT RAISE(ABORT,'injected'); END");
    assert.throws(()=>migrate(db),/injected/);assert.equal(db.prepare('PRAGMA user_version').get().user_version,4);
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE name='proof_sets_v5'").get().n,0);
    assert.equal(db.prepare('PRAGMA table_info(proof_session_v2)').all().some(c=>c.name==='active_exercise_id'),false);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM proof_sets_v2').get().n,3);
    db.exec('DROP TRIGGER fail_v5');migrate(db);assert.equal(read(db).exercises.length,1);
  });

  for(const winner of ['addSet','finishWorkout'])test('final Add/Finish competition: '+winner+' serializes safely',t=>{
    const {db,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);s=act(db,ids(s),'nextExercise',2201);
    s=finishActive(db,s,2300);s=act(db,ids(s),'continueRest',2400);const target=ids(s);
    const won=act(db,target,winner,2401);
    assert.deepEqual(act(db,target,winner==='addSet'?'finishWorkout':'addSet',2401),won);
  });
  test('concurrent Next Exercise cannot skip or finish the next exercise',async t=>{
    const {db,path,initial}=fixture(t);let s=finishActive(db,initial);s=act(db,ids(s),'continueRest',2200);
    await Promise.all([1,2].map(()=>new Promise((resolve,reject)=>{
      const w=new Worker(__filename,{workerData:{path,ids:ids(s),action:'nextExercise',now:2201}});
      w.once('error',reject);w.once('exit',code=>code?reject(Error('Worker failed')):resolve());
    })));
    const result=read(db,2201);assert.equal(result.exerciseID,result.exercises[1].exercise_id);
    assert.equal(result.exercises[0].finished_at,2201);assert.equal(result.exercises[1].finished_at,null);
    assert.equal(result.finishedAt,null);assert.equal(result.recordCount,3);assert.deepEqual([current(result).pounds,current(result).reps],[15,12]);
  });

}
