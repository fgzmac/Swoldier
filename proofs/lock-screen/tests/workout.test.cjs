const {test}=require('node:test');const assert=require('node:assert/strict');
const {setLink,setForLink,weekDays,localDay}=require('../workoutModel.ts');
const {numberField}=require('../routineModel.ts');
test('exact-set links retain session/set identity and reject other surfaces',()=>{
 assert.deepEqual(setLink('swoldier-proof://set?session=old%3Asession&set=exact%3A2'),{sessionID:'old:session',setID:'exact:2'});
 for(const url of ['https://example.org/set?session=a&set=b','swoldier-proof://other?session=a&set=b','swoldier-proof://set?session=a','not a url'])assert.equal(setLink(url),null);
});
test('calendar weeks use local dates and Monday boundary, including month/year rollover',()=>{
 assert.deepEqual(weekDays(0,new Date(2027,0,3,22)).map(localDay),['2026-12-28','2026-12-29','2026-12-30','2026-12-31','2027-01-01','2027-01-02','2027-01-03']);
 assert.equal(localDay(weekDays(1,new Date(2027,0,3))[0]),'2027-01-04');
});
test('exact-editor validation keeps blanks, zeros and decimals distinct and rejects invalid actuals',()=>{
 assert.equal(numberField('','Pounds',2000,true),null);assert.equal(numberField('0','Pounds',2000,true),0);assert.equal(numberField('42.5','Pounds',2000,true),42.5);
 for(const input of ['1.234','-1','Infinity','2001','abc'])assert.throws(()=>numberField(input,'Pounds',2000,true));
 assert.throws(()=>numberField('','Reps',1000,false,true));assert.equal(numberField('0','Reps',1000,false,true),0);
 assert.throws(()=>numberField('1.5','Reps',1000));assert.throws(()=>numberField('11','RIR',10));
});

// Executes the production editor's transpiled JS with a minimal hook/element harness.
// This checks buffer/target/leave-guard logic, not React Native rendering or Swift.
function editorHarness(component='SetEditor',exportName='default'){
 const fs=require('node:fs'),ts=require('typescript'),vm=require('node:vm'),{createRequire}=require('node:module'),path=require('node:path');
 const filename=path.resolve(__dirname,'../'+component+'.tsx'),localRequire=createRequire(filename),slots=[],alerts=[],effects=[];let cursor=0;
 const effect=(fn,deps)=>{const n=cursor++,old=slots[n];if(!old||deps.some((v,i)=>v!==old[i]))effects.push(fn);slots[n]=deps;};
 const hooks={useEffect:effect,useRef(value){const n=cursor++;return slots[n]??(slots[n]={current:value});},useState(value){const n=cursor++;if(!(n in slots))slots[n]=value;return[slots[n],next=>{slots[n]=typeof next==='function'?next(slots[n]):next;}];},useLayoutEffect:effect};
 const element=(type,props,key)=>({type,props:props??{},key});const rn={AppState:{addEventListener:()=>({remove(){}})},Alert:{alert(...args){alerts.push(args);}},StyleSheet:{create:value=>value}};
 for(const name of ['Button','Pressable','ScrollView','Switch','Text','TextInput','View'])rn[name]=name;
 const compiled=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 const module={exports:{}};vm.runInNewContext(compiled,{module,exports:module.exports,require:name=>name==='./Midnight'?{Text:'Text',midnight:{text:'#F1F4FA'}}:name==='./Organizer'?{Action:'Button',Groups:'Groups'}:name==='react'?hooks:name==='react-native'?rn:name==='react/jsx-runtime'?{jsx:element,jsxs:element}:localRequire(['./routineModel','./workoutModel'].includes(name)?name+'.ts':name),console});
 return {alerts,render(props){cursor=0;const tree=module.exports[exportName](props);effects.splice(0).forEach(fn=>fn());return tree;}};
}
function descendants(tree){if(!tree||typeof tree!=='object')return[];return[tree,...[tree.props?.children].flat(Infinity).flatMap(descendants)];}
function editorProps(setID='a'){
 const set={setID,exerciseID:'exercise',number:1,pounds:40,reps:8,rir:null,completed:false,editRevision:0};const writes=[];
 return {set,snapshot:{sessionID:'session',actionToken:'legacy',exercises:[{exerciseID:'exercise',name:'Fictional',sourceExerciseID:'saved'}]},native:{newRoutineStartRequest:async()=> '00000000-0000-4000-8000-000000000001',editWorkoutSet:async json=>{writes.push(JSON.parse(json));return{};}},saved(){},close(){},writes};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
test('mounted exact editor never applies its existing buffer to a replacement target prop',async()=>{
 const harness=editorHarness(),a=editorProps('a'),b={...a,set:{...a.set,setID:'b',pounds:90}};
 let tree=harness.render(a);descendants(tree).find(n=>n.type==='TextInput'&&n.props.accessibilityLabel==='Pounds').props.onChangeText('77.5');
 tree=harness.render(b);descendants(tree).find(n=>n.type==='Button'&&n.props.title==='Save changes').props.onPress();await flush();
 assert.equal(a.writes.length,1);assert.equal(a.writes[0].setID,'a');assert.equal(a.writes[0].pounds,77.5);
 // A genuinely remounted editor starts from B's values, as App's unique key requests.
 const fresh=editorHarness();tree=fresh.render(b);assert.equal(descendants(tree).find(n=>n.type==='TextInput'&&n.props.accessibilityLabel==='Pounds').props.value,'90');
});
test('link navigation requires confirmation before discarding dirty exact edits and refuses while saving',async()=>{
 const h=editorHarness(),p=editorProps();let guard,moved=0;p.registerLeave=g=>{guard=g;};
 let tree=h.render(p);guard(()=>moved++);assert.equal(moved,1);
 descendants(tree).find(n=>n.type==='TextInput'&&n.props.accessibilityLabel==='Reps').props.onChangeText('12');tree=h.render(p);
 guard(()=>moved++);assert.equal(moved,1);assert.match(h.alerts.at(-1)[0],/Leave these set edits/);
 const choices=h.alerts.at(-1)[2];assert.equal(choices[0].text,'Keep editing');choices[1].onPress();assert.equal(moved,2);
 let release;p.native.editWorkoutSet=()=>new Promise(resolve=>{release=resolve;});
 descendants(tree).find(n=>n.type==='Button'&&n.props.title==='Save changes').props.onPress();await flush();guard(()=>moved++);assert.equal(moved,2);
 release({});await flush();
});
test('exact editor failure keeps values and reuses only the original action payload',async()=>{
 const h=editorHarness(),p=editorProps();let calls=[],attempt=0;p.native.editWorkoutSet=async payload=>{calls.push(payload);if(!attempt++)throw Error('injected failure');return{};};
 let tree=h.render(p);descendants(tree).find(n=>n.type==='TextInput'&&n.props.accessibilityLabel==='Pounds').props.onChangeText('0');tree=h.render(p);
 const press=()=>descendants(tree).find(n=>n.type==='Button'&&n.props.title==='Save changes').props.onPress();press();await flush();tree=h.render(p);
 assert.equal(descendants(tree).find(n=>n.type==='TextInput'&&n.props.accessibilityLabel==='Pounds').props.value,'0');press();await flush();assert.equal(calls.length,2);assert.equal(calls[0],calls[1]);
});

test('stale exact-set link never substitutes the new workout, another set or a skipped draft',()=>{
 const a={sessionID:'old',setID:'set-a'},b={sessionID:'new',sets:[{setID:'set-a',skippedAt:null},{setID:'set-b',skippedAt:null}]};
 assert.throws(()=>setForLink(b,a),/older workout/);assert.throws(()=>setForLink(null,a),/older workout/);
 assert.throws(()=>setForLink(b,{sessionID:'new',setID:'missing'}),/older workout/);
 assert.equal(setForLink(b,{sessionID:'new',setID:'set-b'}).set,b.sets[1]);
 b.sets[1].skippedAt=100;assert.throws(()=>setForLink(b,{sessionID:'new',setID:'set-b'}),/Undo this skip/);
});

test('routine leave guard protects unsaved values and refuses navigation during an in-flight save',async()=>{
 const h=editorHarness('RoutineEditor');let guard,moved=0,release;
 const p={native:{routineLibrary:async()=>JSON.stringify({routines:[],exercises:[]}),saveRoutine:json=>new Promise(resolve=>{release=()=>resolve(JSON.stringify({...JSON.parse(json),id:'routine',revision:1}));})},close(){},registerLeave:g=>{guard=g;}};
 let tree=h.render(p);await flush();tree=h.render(p);
 const create=descendants(tree).find(n=>n.type==='Pressable'&&descendants(n).some(x=>x.props?.children==='＋ New routine'));create.props.onPress();tree=h.render(p);
 descendants(tree).find(n=>n.type==='TextInput'&&n.props.accessibilityLabel==='Routine name').props.onChangeText('Fictional unsaved');tree=h.render(p);
 guard(()=>moved++);assert.equal(moved,0);assert.match(h.alerts.at(-1)[0],/Discard unsaved routine edits/);
 const save=descendants(tree).find(n=>n.type==='Pressable'&&descendants(n).some(x=>x.props?.children==='Save routine'));save.props.onPress();
 // Before a busy-state rerender, the synchronous lock must still block navigation.
 const alerts=h.alerts.length;guard(()=>moved++);assert.equal(moved,0);assert.equal(h.alerts.length,alerts);release();await flush();
});
test('exercise controls hide the seconds and target inputs while retaining dirty values and ownership after moving',async()=>{
 const h=editorHarness('RoutineEditor'), exercises=['First','Fictional long name for a seated exercise with a very long variation'].map((name,i)=>({id:String(i),name}));
 const plan={id:'routine',revision:1,name:'Fictional',exercises:exercises.map(e=>({exerciseID:e.id,trackRest:true,restSeconds:60,restSecondsInput:'60',sets:[{pounds:0,reps:null}]}))};
 const props={native:{routineLibrary:async()=>JSON.stringify({routines:[plan],exercises})},close(){}};
 const render=()=>descendants(h.render(props)),findLabel=(nodes,label)=>nodes.find(n=>n.props.accessibilityLabel===label);
 render();await flush();let tree=render();const library=tree.find(n=>n.type==='Groups').props.render(plan);findLabel(descendants(library),'Open Fictional').props.onPress();
 const name=exercises[1].name,rest=name+' rest seconds',toggle='Track rest for '+name;
 findLabel(render(),rest).props.onChangeText('090');findLabel(render(),toggle).props.onValueChange(false);assert.equal(findLabel(render(),rest),undefined);
 findLabel(render(),toggle).props.onValueChange(true);assert.equal(findLabel(render(),rest).props.value,'090');
 const card=()=>render().find(n=>n.type==='View'&&n.key==='1'),btn=t=>descendants(card()).find(n=>n.props.title===t);
 btn('▸ Set targets · Optional').props.onPress();findLabel(render(),name+' set 1 pounds').props.onChangeText('42.50');btn('▾ Set targets · Optional').props.onPress();assert.equal(findLabel(render(),name+' set 1 pounds'),undefined);
 btn('Move').props.onPress();btn('Move to Top').props.onPress();btn('▸ Set targets · Optional').props.onPress();
 assert.equal(findLabel(render(),name+' set 1 pounds').props.value,'42.50');assert.equal(findLabel(render(),rest).props.value,'090');assert.equal(plan.exercises[1].sets[0].pounds,0);
});


test('goal counts use half-open local periods, skip unfinished and count a session once',()=>{
 const {periodCompletions}=require('../workoutModel.ts');
 const completed=(id,date)=>({sessionID:id,workoutFinished:true,finishedAt:+new Date(date)/1000});
 const last=completed('last','2026-12-31T23:59:59');
 const workouts=[last,last,completed('first','2027-01-01T00:00:00'),completed('sunday','2027-01-03T23:59:59'),
   completed('monday','2027-01-04T00:00:00'),{...last,sessionID:'active',workoutFinished:false}];
 assert.equal(periodCompletions(workouts,'Weekly','2027-01-03'),3);
 assert.equal(periodCompletions(workouts,'Weekly','2027-01-04'),1);
 assert.equal(periodCompletions(workouts,'Monthly','2026-12-31'),1);
 assert.equal(periodCompletions(workouts,'Yearly','2027-01-01'),3);
});

function organizerFixture(value){
 let version=1;
 return {value,async organizer(){return JSON.stringify([[version,JSON.stringify(this.value)]]);},
   async saveOrganizer(key,revision,json){assert.equal(revision,version++);this.value=JSON.parse(json);}};
}
function actions(tree){return descendants(tree).filter(n=>typeof n.props.title==='string');}
test('workout target editing preserves other periods and legacy accountability entries',async()=>{
 const api=organizerFixture({goals:[],checks:[],scans:[{date:'2025-01-01'}]});
 const h=editorHarness('Organizer','Tracker'),props={api,day:'2026-11-20',workouts:[]};
 const render=()=>h.render(props),press=title=>actions(render()).find(n=>n.props.title===title).props.onPress();
 render();await flush();
 for(const [period,value] of [['Weekly','3'],['Monthly','12'],['Yearly','140']]){
   press(period);press('Set goal');
   descendants(render()).find(n=>n.props.accessibilityLabel===period+' workout target').props.onChangeText(value);
   press('Save goal');await flush();
 }
 assert.deepEqual(api.value.targets,{Weekly:3,Monthly:12,Yearly:140});
 press('Monthly');press('Edit target');press('Remove goal');await flush();
 assert.deepEqual(api.value.targets,{Weekly:3,Yearly:140});assert.deepEqual(api.value.scans,[{date:'2025-01-01'}]);
});

test('BodySpec demo preview cancels cleanly and reopens one journal entry per result ID', async t=>{
 const {DatabaseSync}=require('node:sqlite');
 const {mkdtempSync,rmSync}=require('node:fs');
 const {join}=require('node:path');
 const sql=require('../native/RoutineSQL.json');
 const dir=mkdtempSync(join(require('node:os').tmpdir(),'scan-test-'));
 const filename=join(dir,'journal.sqlite');
 let db=new DatabaseSync(filename);
 t.after(()=>{db.close();rmSync(dir,{recursive:true,force:true});});
 sql.schema.forEach(statement=>db.exec(statement));
 const api={
   async organizer(key){
     const row=db.prepare('SELECT revision,document FROM organizer_sections WHERE section=?').get(key);
     return JSON.stringify(row?[[row.revision,row.document]]:[]);
   },
   async saveOrganizer(section,rev,doc){
     assert.equal(db.prepare(sql.organizerSave).run({section,rev,doc}).changes,1);
   },
 };
 const manual={date:'2026-11-18',source:'BodySpec (fictional)',fat:'23.4',lean:'120.5',rmr:'1512'};
 const original={scans:[manual],goals:[],checks:[],targets:{Weekly:3}};
 await api.saveOrganizer('accountability',0,JSON.stringify(original));
 const read=async()=>{const [[rev,doc]]=JSON.parse(await api.organizer('accountability'));return {rev,journal:JSON.parse(doc)};};
 const props={api,day:manual.date,workouts:[]};
 let harness;
 const render=()=>harness.render(props);
 const button=title=>actions(render()).find(node=>node.props.title===title).props;
 const press=async title=>{const action=button(title);assert.ok(!action.disabled,title);action.onPress();await flush();};
 async function mount(){
   harness=editorHarness('Organizer','Tracker');render();await flush();
   await press('▸ Accountability · 0 active goals');
 }
 const open='Import fictional BodySpec scan';
 await mount();await press(open);
 const preview=descendants(render()).filter(node=>node.type==='View');
 for(const [label,value] of [['Measurement date (YYYY-MM-DD)',manual.date],['Measurement source',manual.source],
   ['Body fat (%)',manual.fat],['Lean mass (lb)',manual.lean],['Estimated RMR (kcal/day)',manual.rmr]]){
   assert.ok(preview.some(row=>row.props.children?.[0]?.props?.children===label && row.props.children[1].props.children===value),label);
 }
 await press('Cancel');assert.deepEqual(await read(),{rev:1,journal:original});
 await press(open);await press('Save scan');
 db.close();db=new DatabaseSync(filename);await mount();
 const first={...manual,provider:'bodyspec-demo',resultID:'sample-a'};
 assert.deepEqual(await read(),{rev:2,journal:{...original,scans:[manual,first]}});
 await press(open);assert.equal(button('Save scan').disabled,true);
 await press('Sample 2');
 assert.ok(descendants(render()).some(row=>row.props.children?.[0]?.props?.children==='Estimated RMR (kcal/day)' && row.props.children[1].props.children===''));
 await press('Save scan');
 const second={...first,resultID:'sample-b',fat:'23.1',lean:'121',rmr:''};
 assert.deepEqual(await read(),{rev:3,journal:{...original,scans:[manual,first,second]}});
});

test('standalone routine rows survive category collapse, membership moves and removal',async()=>{
 const api=organizerFixture([{id:'group',name:'Strength',members:['a']}]);
 const h=editorHarness('Organizer','Groups'),props={api,plans:['b','a'].map(id=>({id})),render:p=>({type:'routine',props:{id:p.id}})};
 const render=()=>h.render(props),rows=()=>descendants(render()).filter(n=>n.type==='routine').map(n=>n.props.id);
 const press=match=>actions(render()).find(n=>n.props.title.includes(match)).props.onPress();
 render();await flush();assert.deepEqual(rows(),['b']);press('Strength');assert.deepEqual(rows(),['a','b']);
 press('Organize routines');press('Move routine');press('To Main list');await flush();assert.deepEqual(rows(),['b','a']);
 press('Move routine');press('To Strength');await flush();assert.deepEqual(rows(),['b','a']);
 press('Strength ·');assert.deepEqual(rows(),['a']);press('Remove group');await flush();assert.deepEqual(rows(),['b','a']);
});

test('Today and Calendar toggle the same date entry and preserve its ID and goal',async()=>{
 const day=localDay(new Date()),entry={id:'entry',kind:'water',name:'Cup',slot:'Morning',oz:8,children:[{id:'cup',label:'Cup',checked:false}]};
 let agenda={goal:40,items:[entry]},version=1;
 const native={calendarDays:async()=>JSON.stringify([[day,version,JSON.stringify(agenda)]]),
   routineLibrary:async()=>JSON.stringify({routines:[],exercises:[]}),
   saveCalendarDay:async(d,rev,json)=>{assert.equal(d,day);assert.equal(rev,version++);agenda=JSON.parse(json);}};
 for(const today of [day,undefined]){
   const h=editorHarness('WeekPlanner'),props={today,native,workouts:[]};
   h.render(props);await flush();
   const row=descendants(h.render(props)).find(n=>n.props.accessibilityRole==='checkbox');
   assert.equal(row.props.accessibilityState.checked,today===undefined);
   row.props.onPress();await flush();
   assert.equal(agenda.items[0].id,'entry');assert.equal(agenda.goal,40);
 }
 assert.equal(agenda.items[0].children[0].checked,false);
});

test('routine Resume uses the active session for that routine without issuing Start',async()=>{
 const h=editorHarness('RoutineEditor'),plan={id:'routine',revision:2,name:'Fictional',exercises:[]};
 const resumes=[],props={native:{routineLibrary:async()=>JSON.stringify({routines:[plan],exercises:[]})},
   onResume:id=>resumes.push(id),workouts:[{sessionID:'other',routineID:'other'},{sessionID:'old',routineID:'routine',workoutFinished:true},{sessionID:'active',routineID:'routine',workoutFinished:false}]};
 h.render(props);await flush();
 const group=descendants(h.render(props)).find(n=>n.type==='Groups');
 actions(group.props.render(plan)).find(n=>n.props.title==='Resume workout').props.onPress();
 assert.deepEqual(resumes,['active']);
});

test('month cells show dated tasks, retain order within slots, announce overflow and select the right local date',()=>{
 const make=(id,name,kind,slot,checked=false)=>({id,name,kind,slot,children:[{checked}]});
 const entries=[make('w','Water · 8 oz','water','Night',true),make('r','Circuit','routine','Morning'),
   make('s','Morning stack','supplements','Morning',false),make('r2','Mobility','routine','Afternoon')];
 const selected=[], props={date:new Date(2024,1,1),days:{'2024-02-29':{agenda:{items:entries},rev:3}},
   workouts:[{startRequestID:'r',workoutFinished:true}],selectDay:d=>selected.push(localDay(d)),busy:false};
 const tree=editorHarness('WeekPlanner','MonthGrid').render(props);
 const buttons=descendants(tree).filter(n=>n.type==='Pressable');
 assert.equal(buttons.length,29);
 const leap=buttons[28];assert.match(leap.props.accessibilityLabel,/Circuit, completed.*Morning stack.*Mobility.*Water · 8 oz, completed/);
 const text=descendants(leap).filter(n=>n.type==='Text').map(n=>[n.props.children].flat().join(''));
 assert.deepEqual(text,['29','✓ Circuit','Morning stack','Mobility','+1']);
 assert.equal(buttons[0].props.accessibilityState.selected,true);
 assert.equal(descendants(buttons[0]).filter(n=>n.type==='Text').length,1);
 leap.props.onPress();assert.deepEqual(selected,['2024-02-29']);
 assert.deepEqual(entries.map(i=>i.id),['w','r','s','r2']);
 const six=editorHarness('WeekPlanner','MonthGrid').render({...props,date:new Date(2026,7,31)});
 assert.equal(six.props.children[1].length,6);
 assert.equal(descendants(six).filter(n=>n.type==='Pressable').length,31);
});
