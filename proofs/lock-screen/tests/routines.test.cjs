const { test } = require('node:test');
const assert = require('node:assert/strict');
const { DatabaseSync } = require('node:sqlite');
const { randomUUID, createHash } = require('node:crypto');
const { mkdtempSync, rmSync, readFileSync, realpathSync } = require('node:fs');
const { join, dirname, basename } = require('node:path');
const { tmpdir } = require('node:os');
const model = require('../routineModel.ts'); // Executes production TypeScript through Node's type stripping.
const sql = require('../native/RoutineSQL.json');
const workoutSQL = require('../native/ProofSQL.json');
test('only the typed unfinished-workout outcome becomes a friendly Start notice',()=>{
  const refusal={startRejection:'workout_unfinished'};const before=structuredClone(refusal);
  const message=model.routineStartNotice(refusal);
  assert.match(message,/already in progress/);assert.match(message,/resume/);
  assert.doesNotMatch(message,/UnexpectedException|ExpoModulesCore|\.swift|workout_unfinished/);assert.deepEqual(refusal,before);
  const snapshot={sessionID:'saved-session',routineRevision:3,pounds:null,reps:0};
  assert.equal(model.routineStartNotice(snapshot),null);assert.deepEqual(snapshot,{sessionID:'saved-session',routineRevision:3,pounds:null,reps:0});
  assert.throws(()=>model.routineStartNotice({startRejection:'storage_failed'}),/storage_failed/);
  assert.throws(()=>model.routineStartNotice({startRejection:null}),/Unrecognized/);
  // No matching arbitrary message/stack text: unrelated exceptions keep the editor catch path.
  assert.equal(model.routineStartNotice(new Error('UnexpectedException: A workout is unfinished.')),null);
});
test('name contract uses Unicode code points, ECMAScript trim and C0/C1 rejection',()=>{
  const combined='e\u0301';
  assert.equal(model.validName(combined.repeat(40)),combined.repeat(40));
  assert.throws(()=>model.validName(combined.repeat(41)),/name/);
  assert.equal(model.validName('\u{1f4aa}'.repeat(80)),'\u{1f4aa}'.repeat(80));
  assert.throws(()=>model.validName('\u{1f4aa}'.repeat(81)),/name/);
  for(const edge of ['\t','\n','\u00a0','\u1680','\u2000','\u2028','\u2029','\u202f','\u205f','\u3000','\ufeff'])
    assert.equal(model.validName(edge+'Press'+edge),'Press');
  for(const bad of ['\u0085Press','Press\u0000','Pr\u009fess','\ud800','\udfff'])
    assert.throws(()=>model.validName(bad),/name/);
  assert.equal(model.validName('Fictional \u{1f3cb}\u200d\u2640\ufe0f'),'Fictional \u{1f3cb}\u200d\u2640\ufe0f');
});
test('invalid edited name leaves the saved routine and unsaved model unchanged',t=>{
  const {db}=fixture(t);const e=exercise(db,'Fictional A');const saved=save(db,model.toPlan(draft('Original',e.id)));
  const edited=model.editPlan(saved);edited.name='e\u0301'.repeat(41);edited.exercises[0].sets[0].pounds='123';
  const before=structuredClone(edited);
  assert.throws(()=>save(db,model.toPlan(edited)),/name/);
  assert.deepEqual(list(db),[saved]);assert.deepEqual(edited,before);
});
// Production SQL with a separate JS transaction/native-validation wrapper. NOT Swift execution.
function run(db, query, params = {}) {
  const parameters = query.replace(/'(?:''|[^'])*'/g, '');
  const names = [...new Set([...parameters.matchAll(/:([a-zA-Z]+)/g)].map(m => m[1]))];
  return db.prepare(query).run(Object.fromEntries(names.map(n => [n, params[n]]))).changes;
}
function tx(db, fn) { db.exec('BEGIN IMMEDIATE'); try { const r = fn(); db.exec('COMMIT'); return r; } catch(e) { db.exec('ROLLBACK'); throw e; } }
function open(path) { const db = new DatabaseSync(path); db.exec('PRAGMA synchronous=FULL; PRAGMA busy_timeout=10'); tx(db, () => sql.schema.forEach(q => db.exec(q))); return db; }
function exercise(db, name) {
  return tx(db, () => { name=model.validName(name); run(db,sql.insertExercise,{id:randomUUID(),name}); return { ...db.prepare(sql.exerciseByName).get({name}) }; });
}
function save(db, plan) {
  return tx(db, () => {
    for(const e of plan.exercises) assert.ok(db.prepare(sql.exerciseExists).get({id:e.exerciseID}), 'unknown exercise');
    const stored={...plan,id:plan.id??randomUUID(),revision:plan.revision+1};
    const changes=run(db,plan.id?sql.updateRoutine:sql.insertRoutine,{id:stored.id,name:stored.name,document:JSON.stringify(stored),revision:plan.revision});
    assert.equal(changes,1,'revision conflict');return stored;
  });
}
function list(db) { return db.prepare(sql.routines).all().map(r => JSON.parse(r.document)); }
function draft(name, id, rest='60') { return {...model.newPlan(),name,exercises:[{...model.newEntry(id),restSeconds:rest}]}; }
function fixture(t) {
  const dir=mkdtempSync(join(tmpdir(),'swoldier-routines-'));const path=join(dir,'RoutinePlans.sqlite3');const db=open(path);
  t.after(()=>{db.close();const target=realpathSync(dir);assert.equal(dirname(target),realpathSync(tmpdir()));assert.ok(basename(target).startsWith('swoldier-routines-'));rmSync(target,{recursive:true});});
  return {db,path,dir};
}
test('new entries have three independent blank sets and no guessed rest',()=>{
  const e=model.newEntry('id');assert.equal(e.trackRest,true);assert.equal(e.restSeconds,'');assert.equal(e.sets.length,3);assert.notEqual(e.sets[0],e.sets[1]);
  assert.throws(()=>model.toPlan({...model.newPlan(),name:'Routine',exercises:[e]}),/rest seconds/);
});

test('optional rest keeps entered duration through toggle, save and reopen',t=>{
  const {db,path}=fixture(t);const e=exercise(db,'Optional rest A');
  let edited=draft('Toggle',e.id,' 090 ');const initial=save(db,model.toPlan(edited));
  edited=model.editPlan(initial);edited.exercises[0].trackRest=false;
  const disabled=save(db,model.toPlan(edited));
  assert.equal(disabled.exercises[0].restSeconds,null);
  const reopened=open(path);try{edited=model.editPlan(list(reopened)[0]);}finally{reopened.close();}
  assert.equal(edited.exercises[0].trackRest,false);assert.equal(edited.exercises[0].restSeconds,' 090 ');
  edited.exercises[0].trackRest=true;const enabled=save(db,model.toPlan(edited));
  assert.equal(enabled.exercises[0].restSeconds,90);assert.equal(enabled.exercises[0].restSecondsInput,' 090 ');
  assert.deepEqual(enabled.exercises[0].sets,initial.exercises[0].sets);
});

test('disabled rest accepts blank or invalid duration text; enabled validation preserves edits and saved plan',t=>{
  const {db}=fixture(t);const e=exercise(db,'Optional rest B');
  let current=save(db,model.toPlan(draft('Invalid rest',e.id)));
  for(const value of ['', '-1','1.5','3601','1e2','abc']){
    let d=model.editPlan(current);d.exercises[0].trackRest=false;d.exercises[0].restSeconds=value;
    current=save(db,model.toPlan(d));d=model.editPlan(list(db)[0]);
    assert.equal(d.exercises[0].restSeconds,value);assert.equal(current.exercises[0].restSeconds,null);
    d.exercises[0].trackRest=true;const before=structuredClone(d);
    assert.throws(()=>save(db,model.toPlan(d)),/rest seconds/);
    assert.deepEqual(d,before);assert.deepEqual(list(db),[current]);
  }
  const zero=model.editPlan(current);zero.exercises[0].trackRest=true;zero.exercises[0].restSeconds='0';
  const saved=save(db,model.toPlan(zero));assert.equal(saved.exercises[0].restSeconds,0);assert.equal(saved.exercises[0].trackRest,true);
});

test('rest preference belongs to routine membership and follows reorder/removal without changing another routine',t=>{
  const {db}=fixture(t);const a=exercise(db,'Shared rest A'),b=exercise(db,'Rest B');
  const other=save(db,model.toPlan(draft('Other',a.id,'120')));
  let d=draft('Independent',a.id,'45');d.exercises[0].trackRest=false;
  d.exercises.push({...model.newEntry(b.id),restSeconds:'20'});d=model.moveEntry(d,0,1);
  let stored=save(db,model.toPlan(d));assert.equal(stored.exercises[1].exerciseID,a.id);assert.equal(stored.exercises[1].trackRest,false);
  d=model.editPlan(stored);d.exercises=d.exercises.filter(e=>e.exerciseID!==b.id);
  stored=save(db,model.toPlan(d));assert.equal(stored.exercises[0].restSecondsInput,'45');
  assert.deepEqual(list(db).find(p=>p.id===other.id),other);assert.equal(exercise(db,'Shared rest A').id,a.id);
});

test('legacy routine documents read without rewrite and retain tracking/duration on editing',t=>{
  const {db,path}=fixture(t);const e=exercise(db,'Legacy rest');
  const legacy=save(db,{revision:0,name:'Legacy',exercises:[{exerciseID:e.id,restSeconds:0,sets:[{pounds:null,reps:0}]}]});
  const before=db.prepare(sql.routines).get().document;
  const reopened=open(path);let d;try{d=model.editPlan(list(reopened)[0]);}finally{reopened.close();}
  assert.equal(d.exercises[0].trackRest,true);assert.equal(d.exercises[0].restSeconds,'0');
  assert.equal(db.prepare(sql.routines).get().document,before);
  const saved=save(db,model.toPlan(d));assert.equal(saved.id,legacy.id);assert.equal(saved.revision,2);
  assert.equal(saved.exercises[0].exerciseID,e.id);assert.equal(saved.exercises[0].restSeconds,0);
  assert.deepEqual(saved.exercises[0].sets,legacy.exercises[0].sets);
});

test('stale optional-rest save cannot overwrite newer settings',t=>{
  const {db}=fixture(t);const e=exercise(db,'Conflict rest');const first=save(db,model.toPlan(draft('Conflict',e.id,'60')));
  const stale=model.editPlan(first);stale.exercises[0].trackRest=false;
  const fresh=model.editPlan(first);fresh.exercises[0].restSeconds='180';const saved=save(db,model.toPlan(fresh));
  assert.throws(()=>save(db,model.toPlan(stale)),/revision conflict/);assert.deepEqual(list(db),[saved]);
  assert.equal(stale.exercises[0].restSeconds,'60');assert.equal(stale.exercises[0].trackRest,false);
});
test('save/reopen preserves blank versus zero and decimal pounds',t=>{
  const {db,path}=fixture(t);const e=exercise(db,'Fictional press');const d=draft('Morning',e.id,'0');
  d.exercises[0].sets=[{pounds:'',reps:''},{pounds:'0',reps:'0'},{pounds:'42.25',reps:'8'}];
  const saved=save(db,model.toPlan(d));const reopened=open(path);try{assert.deepEqual(list(reopened),[saved]);}finally{reopened.close();}
  assert.deepEqual(saved.exercises[0].sets,[{pounds:null,reps:null},{pounds:0,reps:0},{pounds:42.25,reps:8}]);
  assert.deepEqual(model.editPlan(saved).exercises[0].sets,d.exercises[0].sets);
});
test('reusing a manual name keeps identity but gives each routine independent settings',t=>{
  const {db}=fixture(t);const e=exercise(db,'Fictional Press');assert.equal(exercise(db,' fictional press ').id,e.id);
  const a=save(db,model.toPlan(draft('A',e.id,'180')));const b=save(db,model.toPlan(draft('B',e.id,'90')));
  const edit=model.editPlan(a);edit.exercises[0].sets[0]={pounds:'100',reps:'5'};edit.exercises[0].restSeconds='120';
  const updated=save(db,model.toPlan(edit));assert.equal(updated.revision,2);assert.deepEqual(list(db).find(p=>p.id===b.id),b);
  assert.equal(a.exercises[0].sets[0].pounds,null);assert.equal(b.exercises[0].restSeconds,90);
});
test('reorder, remove exercise and add/remove planned sets survive reopen without deleting identities',t=>{
  const {db,path}=fixture(t);const a=exercise(db,'A'),b=exercise(db,'B');
  let d=draft('Order',a.id);d.exercises.push({...model.newEntry(b.id),restSeconds:'45'});
  d=model.moveEntry(d,1,-1);d.exercises[0].sets.push({pounds:'10',reps:'12'});d.exercises[1].sets.splice(1,1);
  let saved=save(db,model.toPlan(d));const re=open(path);try{assert.deepEqual(list(re)[0],saved);}finally{re.close();}
  assert.deepEqual(saved.exercises.map(e=>e.exerciseID),[b.id,a.id]);assert.deepEqual(saved.exercises.map(e=>e.sets.length),[4,2]);
  d=model.editPlan(saved);d.exercises=d.exercises.filter(e=>e.exerciseID!==b.id);saved=save(db,model.toPlan(d));
  assert.equal(db.prepare(sql.exercises).all().length,2);assert.equal(exercise(db,'B').id,b.id);assert.equal(saved.exercises.length,1);
});
test('rename and empty named routine can be saved; blank name is rejected',t=>{
  const {db}=fixture(t);let p=save(db,model.toPlan({...model.newPlan(),name:' Empty '}));assert.equal(p.name,'Empty');
  p=save(db,{...p,name:'Renamed'});assert.equal(list(db)[0].name,'Renamed');assert.throws(()=>model.toPlan(model.newPlan()),/name/);
});
test('provisional validation rejects negative/nonfinite/fractional reps, unknown rest and duplicate entries',()=>{
  const good=draft('Test','id');
  for(const field of ['pounds','reps'])for(const value of ['-1','NaN','Infinity','1e2','abc']){
    const d=structuredClone(good);d.exercises[0].sets[0][field]=value;assert.throws(()=>model.toPlan(d));
  }
  for(const [field,value] of [['pounds','2001'],['pounds','1.234'],['reps','1001'],['reps','1.5']]){
    const d=structuredClone(good);d.exercises[0].sets[0][field]=value;assert.throws(()=>model.toPlan(d));
  }
  for(const rest of ['', '-1','3601','1.5']){const d=structuredClone(good);d.exercises[0].restSeconds=rest;assert.throws(()=>model.toPlan(d));}
  const duplicate=structuredClone(good);duplicate.exercises.push({...duplicate.exercises[0]});assert.throws(()=>model.toPlan(duplicate));
  const noSets=structuredClone(good);noSets.exercises[0].sets=[];assert.throws(()=>model.toPlan(noSets));
});
test('stale routine revision cannot overwrite a newer plan',t=>{
  const {db}=fixture(t);const e=exercise(db,'A');const first=save(db,model.toPlan(draft('Routine',e.id)));
  const updated=save(db,{...first,name:'New name'});assert.throws(()=>save(db,{...first,name:'Old retry'}),/revision conflict/);assert.deepEqual(list(db),[updated]);
});
test('failed update rolls back name, revision, ordering and values; original revision can retry',t=>{
  const {db}=fixture(t);const e=exercise(db,'A');const original=save(db,model.toPlan(draft('Original',e.id)));
  db.exec("CREATE TRIGGER fail_save BEFORE UPDATE ON routine_plans BEGIN SELECT RAISE(ABORT,'injected'); END");
  const change={...original,name:'Edited'};assert.throws(()=>save(db,change),/injected/);assert.deepEqual(list(db),[original]);
  db.exec('DROP TRIGGER fail_save');assert.equal(save(db,change).revision,2);
});
test('COMMIT failure publishes no changed routine and leaves retry possible',t=>{
  const {db,path}=fixture(t);const p=save(db,model.toPlan({...model.newPlan(),name:'Original'}));const reader=open(path);
  try{reader.exec('BEGIN');reader.prepare(sql.routines).all();assert.throws(()=>save(db,{...p,name:'Edited'}),/locked/);reader.exec('ROLLBACK');assert.deepEqual(list(db),[p]);assert.equal(save(db,{...p,name:'Edited'}).revision,2);}finally{reader.close();}
});
test('unknown exercise and duplicate routine name leave saved plans intact',t=>{
  const {db}=fixture(t);assert.throws(()=>save(db,model.toPlan(draft('Missing','unknown'))),/unknown exercise/);assert.equal(list(db).length,0);
  const original=save(db,model.toPlan({...model.newPlan(),name:'Same'}));assert.throws(()=>save(db,model.toPlan({...model.newPlan(),name:'same'})),/UNIQUE/);assert.deepEqual(list(db),[original]);
});
test('routine operations leave a populated installed workout database byte-for-byte unchanged',t=>{
  const {db,dir}=fixture(t);const path=join(dir,'LockScreenProof.sqlite3');const workout=new DatabaseSync(path);
  workout.exec(workoutSQL.schema);[...workoutSQL.schemaV2,...workoutSQL.migrationsV3,...workoutSQL.migrationsV4,...workoutSQL.migrationsV5,...workoutSQL.migrationsV6].forEach(q=>workout.exec(q));
  const p={sessionID:'fixture',setID:'fixture:exercise:1:set:1',restID:'none',newRestID:'saved-rest',now:1000};
  for(const name of ['startSession','startExercises','startSets','registerFixture','countCompleteRequest','complete','createRest','advanceRest'])run(workout,workoutSQL[name],p);
  workout.close();const hash=()=>createHash('sha256').update(readFileSync(path)).digest('hex');const before=hash();
  const e=exercise(db,'Saved name');let plan=save(db,model.toPlan(draft('Plan',e.id)));plan=save(db,{...plan,exercises:[]});list(db);
  assert.equal(hash(),before);assert.equal(plan.exercises.length,0);assert.equal(db.prepare(sql.exercises).all().length,1);
});
