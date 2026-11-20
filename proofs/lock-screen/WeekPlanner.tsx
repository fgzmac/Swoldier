import {Text,midnight} from './Midnight';
import {Action} from './Organizer';
import {useEffect,useRef,useState} from 'react';
import {Button,Pressable,AppState,ScrollView,StyleSheet,TextInput,View} from 'react-native';
import type {Library} from './routineModel';
import {calendarProgress,localDay} from './workoutModel';
import type {ProofModule,Snapshot} from './workoutModel';

const displaySlot=(s:Slot)=>s==='Night'?'Evening':s;
const slots=['Any time','Morning','Afternoon','Night'] as const;
type Slot=typeof slots[number];
import type {Item,Agenda} from './workoutModel';
type Stored={rev:number;agenda:Agenda};
const empty:Agenda={goal:null,items:[]};
const ounces=(s:string)=>/^\d+(\.\d{1,2})?$/.test(s.trim())&&Number.isSafeInteger(Math.round(Number(s)*100))&&Number(s)>0;
function Card({title,done,children,initiallyOpen=false}:{initiallyOpen?:boolean;title:string;done?:boolean;children:React.ReactNode}){
 const [open,set]=useState(initiallyOpen);
 return <View style={[styles.entry,done&&styles.complete]}><Pressable accessibilityRole="button" accessibilityState={{expanded:open}} onPress={()=>set(!open)} style={styles.touch}><Text style={styles.bold}>{open?'▾':'▸'} {title}{done?' · ✓ Completed':''}</Text></Pressable>{open&&children}</View>;
}
export default function WeekPlanner({native,workouts,onStart,onResume,today}:{today?:string;native:ProofModule;workouts:Snapshot[];onStart:()=>void;onResume:(sessionID:string)=>void}){
 const [selectedDate,select]=useState(new Date()),[days,D]=useState<Record<string,Stored>>({}),[library,L]=useState<Library>({exercises:[],routines:[]});
 const [ready,loaded]=useState(false),[busy,B]=useState(false),[error,E]=useState('');const lock=useRef(false);
 async function load(){const raw:string[][]=JSON.parse(await native.calendarDays());D(Object.fromEntries(raw.map(([d,v,j])=>[d,{rev:Number(v),agenda:JSON.parse(j)}])));L(JSON.parse(await native.routineLibrary()));loaded(true);}
 useEffect(()=>{const reload=()=>void load().catch(e=>E(String(e)));reload();const sub=AppState.addEventListener('change',s=>{if(s==='active')reload()});return()=>sub.remove()},[]);
 const date=today?new Date(today+'T12:00:00'):selectedDate;
 const day=localDay(date),stored=days[day],agenda=stored?.agenda??empty;
 async function run(action:()=>Promise<void>){if(lock.current)return;lock.current=true;B(true);E('');try{await action();}catch(e){E(String(e));try{await load();}catch{loaded(false);}}finally{lock.current=false;B(false);}}
 async function save(next:Agenda){await native.saveCalendarDay(day,stored?.rev??0,JSON.stringify(next));await load();}
 const patch=(item:Item)=>save({...agenda,items:agenda.items.map(i=>i.id===item.id?item:i)});
 const {waters,total,goal,waterDone,session,complete,done}=calendarProgress(agenda,workouts);
 function controls(i:Item){return <View key={i.id} style={styles.stack}>
 {i.kind==='routine'&&session(i)&&!session(i)?.workoutFinished?<Pressable accessibilityRole="button" style={({pressed})=>({padding:14,backgroundColor:pressed?'#1E4CAC':'#245BCD'})} onPress={()=>onResume(session(i)!.sessionID)}><Text style={{color:'#F1F4FA'}}>Resume workout</Text></Pressable>:i.kind==='routine'?<Action title={session(i)?.workoutFinished?'Workout completed':session(i)?'Resume workout':'Start scheduled workout'} disabled={busy||!!session(i)?.workoutFinished||(!session(i)&&!library.routines.some(p=>p.id===i.routineID))} onPress={()=>void run(async()=>{if(!session(i)){const plan=library.routines.find(p=>p.id===i.routineID)!;const result=await native.startRoutine(plan.id!,plan.revision,i.id);if((result as any)?.startRejection)throw Error('Resume or finish the active workout in Today.');}onStart();})}/>:i.children.map(c=><Pressable key={c.id} accessibilityRole="checkbox" accessibilityState={{checked:c.checked}} disabled={busy} onPress={()=>void run(()=>patch({...i,children:i.children.map(x=>x.id===c.id?{...x,checked:!c.checked}:x)}))} style={styles.touch}><Text style={{textDecorationLine:c.checked?'line-through':'none'}}>{c.checked?'☑':'☐'} {c.label}{i.kind==='water'?' · '+displaySlot(i.slot):''}</Text></Pressable>)}
 <Action title="Options" accessibilityLabel={"Options for "+i.name} onPress={()=>options(menu===i.id?null:i.id)}/>{menu===i.id&&<><Text>Time slot · {displaySlot(i.slot)}</Text><View style={styles.row}>{slots.filter(s=>s!==i.slot).map(s=><Action key={s} title={displaySlot(s)} disabled={busy} onPress={()=>void run(()=>patch({...i,slot:s}))}/>)}</View>
 {!session(i)&&<Action title="Remove from date" disabled={busy} onPress={()=>void run(()=>save({...agenda,items:agenda.items.filter(x=>x.id!==i.id)}))}/>}</>}</View>}
 const [menu,options]=useState<string|null>(null);
 const [adding,addTo]=useState<string|null>(null);
 const firstSlot=slots.find(slot=>agenda.items.some(i=>i.slot===slot&&!(waterDone&&i.kind==='water')));
 const year=date.getFullYear(),month=date.getMonth(),count=new Date(year,month+1,0).getDate(),offset=new Date(year,month,1).getDay();
 const Container=today?View:ScrollView;
 return <Container {...(today?{}:{automaticallyAdjustKeyboardInsets:true,keyboardShouldPersistTaps:"handled" as const,contentContainerStyle:styles.page})}>{!today&&<><Text style={styles.heading}>Calendar</Text><Text style={styles.bold}>{date.toLocaleDateString(undefined,{month:'long',year:'numeric'})}</Text>
 <View style={styles.row}>{['Previous month','Today','Next month'].map((s,n)=><Action key={s} accessibilityLabel={s} title={n===0?"‹":n===2?"›":"Today"} disabled={busy} onPress={()=>select(n===1?new Date():new Date(year,month+n-1,1))}/>)}</View>
 <View style={styles.grid}>{['Su','Mo','Tu','We','Th','Fr','Sa'].map(s=><Text key={s} style={styles.cell}>{s}</Text>)}{Array.from({length:offset},(_,n)=><View key={'pad'+n} style={styles.cell}/>)}{Array.from({length:count},(_,n)=><Pressable key={n} disabled={busy} accessibilityRole="button" accessibilityState={{selected:n+1===date.getDate()}} style={[styles.cell,n+1===date.getDate()&&styles.selected]} onPress={()=>select(new Date(year,month,n+1))}><Text style={{color:n+1===date.getDate()?midnight.background:midnight.text}}>{n+1}</Text>{!!days[localDay(new Date(year,month,n+1))]?.agenda.items.length&&<View accessibilityLabel="Scheduled entries" style={{width:5,height:5,borderRadius:3,backgroundColor:n+1===date.getDate()?midnight.background:midnight.selected}}/>}</Pressable>)}</View></>}
 <View style={[styles.card,done&&styles.complete]}><View style={styles.row}><Text style={styles.heading}>Agenda</Text><Action title={adding===day?"Close add menu":"+ Add to date"} onPress={()=>addTo(adding===day?null:day)}/></View><Text style={styles.bold}>{date.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'})}{done?' · ✓ Completed':''}</Text>
 {!agenda.items.length&&<Text>No items scheduled</Text>}
 <View style={{flexDirection:'row',gap:8}}>
 {(today||waters.length>0)&&<View style={styles.metric}><Text style={styles.caption}>Water</Text><Text style={styles.bold}>{total} / {goal||"—"} oz{waterDone?' ✓':''}</Text></View>}
 {(today||agenda.items.some(i=>i.kind==='supplements'))&&<View style={styles.metric}><Text style={styles.caption}>Supplement groups</Text><Text style={styles.bold}>{agenda.items.filter(i=>i.kind==='supplements'&&complete(i)).length} / {agenda.items.filter(i=>i.kind==='supplements').length}</Text></View>}
 </View>
 {slots.map(slot=>{const items=agenda.items.filter(i=>i.slot===slot&&!(waterDone&&i.kind==='water'));return items.length>0&&<Card key={day+slot} initiallyOpen={slot===firstSlot} title={slot==='Night'?'Evening':slot}>{items.map(i=>i.kind==='routine'?<View key={i.id} style={styles.entry}><Text style={styles.bold}>{i.name}</Text>{controls(i)}</View>:<Card key={i.id} title={i.name+(i.kind==='supplements'?' · '+i.children.filter(c=>c.checked).length+'/'+i.children.length:'')} done={i.kind==='water'?i.children[0].checked:complete(i)}>{controls(i)}</Card>)}</Card>})}
 {waterDone&&<Card title={'Water · '+total+'/'+goal+' oz'} done>{waters.map(controls)}</Card>}</View>
 {!!error&&<Text accessibilityRole="alert">{error}</Text>}
 {ready?(adding===day&&<Add key={day} {...{native,library,agenda,save,run,busy}}/>):<Action title="Load calendar" onPress={()=>void run(load)}/>}</Container>;
}
type AddProps={native:ProofModule;library:Library;agenda:Agenda;save:(a:Agenda)=>Promise<void>;run:(f:()=>Promise<void>)=>Promise<void>;busy:boolean};
function Add({native,library,agenda,save,run,busy}:AddProps){
 const [goalAttempt,GA]=useState(false);
 const [mode,M]=useState<Item['kind']|null>(null),[slot,S]=useState<Slot>('Any time'),[routine,R]=useState(''),[name,N]=useState(''),[lines,L]=useState(''),[qty,Q]=useState(''),[goal,G]=useState(agenda.goal?.toString()??''),[attempt,A]=useState(false);
 const refs=useRef<Record<string,TextInput|null>>({});
 const problem=(key:string)=>key==='group'&&!name.trim()?'Enter a group name':key==='entries'&&!lines.trim()?'Enter a supplement':key==='oz'&&!ounces(qty)?'Enter a positive amount in oz':key==='goal'&&goal.trim()&&!ounces(goal)?'Enter a positive goal or leave blank':'';
 function field(key:string,label:string,value:string,change:(v:string)=>void,numeric=false){const msg=attempt&&(!goalAttempt||key==="goal")&&problem(key);return <View><Text>{label}</Text><TextInput ref={r=>{refs.current[key]=r}} accessibilityLabel={label} style={[styles.input,!!msg&&styles.invalid]} editable={!busy} keyboardType={numeric?'decimal-pad':'default'} multiline={key==='entries'} value={value} onChangeText={change}/>{!!msg&&<Text accessibilityRole="alert">{msg}</Text>}</View>}
 function submit(goalOnly=false){A(true);GA(goalOnly);const keys=mode==='supplements'?['group','entries']:mode==='water'?(goalOnly?['goal']:['oz','goal']):[];const invalid=keys.find(k=>problem(k));if(invalid){refs.current[invalid]?.focus();return;}if(mode==='routine'&&!routine)return;
 void run(async()=>{const nextGoal=mode==='water'?(goal.trim()?Number(goal):null):agenda.goal;if(goalOnly){await save({...agenda,goal:nextGoal});A(false);return;}
 const id=await native.newRoutineStartRequest(), labels=mode==='supplements'?lines.split('\n').map(x=>x.trim()).filter(Boolean):mode==='water'?[qty+' oz']:[];
 const item:Item={id,kind:mode!,name:mode==='water'?'Water · '+qty+' oz':mode==='supplements'?name.trim():library.routines.find(p=>p.id===routine)!.name,slot,children:labels.map((label,n)=>({id:id+'-'+n,label,checked:false})),...(mode==='water'?{oz:Number(qty)}:mode==='routine'?{routineID:routine}:{})};
 await save({goal:nextGoal,items:[...agenda.items,item]});M(null);N('');L('');Q('');A(false);});}
 return <View style={styles.card}><Text style={styles.bold}>Add to date</Text><View style={styles.row}>{(['routine','supplements','water'] as const).map(k=><Action key={k} title={'Add '+k} disabled={busy} onPress={()=>{M(k);A(false)}}/>)}</View>
 {mode&&<><Text>Time slot · {displaySlot(slot)}</Text><View style={styles.row}>{slots.map(s=><Action key={s} title={displaySlot(s)} disabled={busy||slot===s} onPress={()=>S(s)}/>)}</View>
 {mode==='routine'?<View style={attempt&&!routine&&styles.invalid}>{library.routines.map(p=><Action key={p.id} title={(routine===p.id?'✓ ':'')+p.name} onPress={()=>R(p.id!)}/>)}{attempt&&!routine&&<Text>Select a saved routine</Text>}</View>:mode==='supplements'?<>{field('group','Group name',name,N)}{field('entries','Supplements · one per line, with optional amount, unit and notes',lines,L)}</>:<>{field('oz','Portion (oz)',qty,Q,true)}{field('goal','Daily goal (oz) · blank uses planned total',goal,G,true)}<Action title="Save goal only" disabled={busy} onPress={()=>submit(true)}/></>}
 <Action title="Add to calendar" disabled={busy} onPress={()=>submit()}/></>}</View>
}
const styles=StyleSheet.create({metric:{flex:1,backgroundColor:midnight.background,padding:10,borderRadius:9,gap:4},caption:{color:midnight.muted},selected:{backgroundColor:midnight.selected,borderRadius:10},entry:{borderTopWidth:1,borderColor:midnight.divider,paddingVertical:8,gap:6},page:{padding:18,gap:14},stack:{gap:8},heading:{fontSize:27,fontWeight:'700'},bold:{fontSize:17,fontWeight:'600'},card:{backgroundColor:'#273246',padding:14,gap:10,borderWidth:1,borderColor:'#3A4961',borderRadius:14},complete:{backgroundColor:'#254D47'},touch:{minHeight:44,justifyContent:'center'},row:{flexDirection:'row',flexWrap:'wrap'},grid:{flexDirection:'row',flexWrap:'wrap'},cell:{width:'14.28%',minHeight:36,alignItems:'center',justifyContent:'center',textAlign:'center'},input:{color:midnight.text,borderWidth:1,borderColor:'#85968c',borderRadius:7,padding:10,minHeight:44},invalid:{borderWidth:1,borderColor:'#FFB4AD'}});
