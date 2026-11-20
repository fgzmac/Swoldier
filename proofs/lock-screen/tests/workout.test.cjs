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
function editorHarness(component='SetEditor'){
 const fs=require('node:fs'),ts=require('typescript'),vm=require('node:vm'),{createRequire}=require('node:module'),path=require('node:path');
 const filename=path.resolve(__dirname,'../'+component+'.tsx'),localRequire=createRequire(filename),slots=[],alerts=[],effects=[];let cursor=0;
 const effect=(fn,deps)=>{const n=cursor++,old=slots[n];if(!old||deps.some((v,i)=>v!==old[i]))effects.push(fn);slots[n]=deps;};
 const hooks={useEffect:effect,useRef(value){const n=cursor++;return slots[n]??(slots[n]={current:value});},useState(value){const n=cursor++;if(!(n in slots))slots[n]=value;return[slots[n],next=>{slots[n]=typeof next==='function'?next(slots[n]):next;}];},useLayoutEffect:effect};
 const element=(type,props,key)=>({type,props:props??{},key});const rn={Alert:{alert(...args){alerts.push(args);}},StyleSheet:{create:value=>value}};
 for(const name of ['Button','Pressable','ScrollView','Switch','Text','TextInput','View'])rn[name]=name;
 const compiled=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 const module={exports:{}};vm.runInNewContext(compiled,{module,exports:module.exports,require:name=>name==='./Organizer'?{Action:'Button',Groups:'Groups'}:name==='react'?hooks:name==='react-native'?rn:name==='react/jsx-runtime'?{jsx:element,jsxs:element}:localRequire(name==='./routineModel'?'./routineModel.ts':name),console});
 return {alerts,render(props){cursor=0;const tree=module.exports.default(props);effects.splice(0).forEach(fn=>fn());return tree;}};
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
 const create=descendants(tree).find(n=>n.type==='Pressable'&&descendants(n).some(x=>x.props?.children==='＋ Create routine'));create.props.onPress();tree=h.render(p);
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
