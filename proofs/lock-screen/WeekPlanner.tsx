import {calendarArt,Control,Icon,Text,midnight} from './Midnight';
import {Action} from './Organizer';
import {useEffect,useRef,useState} from 'react';
import {Image,Button,Pressable,AppState,ScrollView,StyleSheet,TextInput,View} from 'react-native';
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
export function AgendaHeading({today, date, completed, adding, disabled, onAdd}: {
 today:boolean;date:Date;completed:boolean;adding:boolean;disabled:boolean;onAdd:()=>void;
}){
 return <View style={styles.splitHeader}>
   <View style={styles.dateCopy}>
     <Text style={today?styles.sectionTitle:styles.eyebrow}>Agenda</Text>
     <Text style={today?styles.caption:styles.sectionTitle}>{date.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'})}{completed?' · ✓ Completed':''}</Text>
   </View>
   <Control pill title={adding?'Close':'+ Add to date'} accessibilityLabel={adding?'Close add menu':'Add to date'} disabled={disabled} onPress={onAdd}/>
 </View>;
}

function Card({title,done,children,initiallyOpen=false}:{initiallyOpen?:boolean;title:string;done?:boolean;children:React.ReactNode}){
 const [open,set]=useState(initiallyOpen);
 return <View style={[styles.entry,done&&styles.complete]}><Pressable accessibilityRole="button" accessibilityState={{expanded:open}} onPress={()=>set(!open)} style={styles.touch}><Text style={styles.bold}>{open?'▾':'▸'} {title}{done?' · ✓ Completed':''}</Text></Pressable>{open&&children}</View>;
}
const chipColors:Record<Item['kind'],string> = {
 routine:'#9BC0FF', supplements:'#96D4BD', water:'#96DDE9',
};
const visibleEntryLimit = 3;

export function MonthGrid({date, days, workouts, selectDay, busy}:{
 date:Date; days:Record<string,Stored>; workouts:Snapshot[]; selectDay:(day:Date)=>void; busy:boolean;
}){
 const year=date.getFullYear(), month=date.getMonth();
 const offset=new Date(year,month,1).getDay(), last=new Date(year,month+1,0).getDate();
 const weeks=Math.ceil((offset+last)/7);
 const finished=new Set(workouts.filter(w=>w.workoutFinished).map(w=>w.startRequestID));
 function cell(number:number){
   if(number<1||number>last)return <View key={number} style={styles.dayCell}/>;
   const cellDate=new Date(year,month,number), key=localDay(cellDate);
   const entries=(days[key]?.agenda.items??[]).slice().sort((a,b)=>slots.indexOf(a.slot)-slots.indexOf(b.slot));
   const selected=number===date.getDate();
   function complete(item:Item){
     return item.kind==='routine'?finished.has(item.id):item.children.length>0&&item.children.every(c=>c.checked);
   }
   const label=[cellDate.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}),
     ...entries.map(item=>item.name+(complete(item)?', completed':''))].join('. ');
   return <Pressable key={key} style={[styles.dayCell,selected&&styles.selectedCell]} disabled={busy}
     accessibilityRole="button" accessibilityLabel={label} accessibilityHint="Opens this day’s agenda"
     accessibilityState={{selected,disabled:busy}} onPress={()=>selectDay(cellDate)}>
     <View style={[styles.dayNumber,selected&&styles.selected]}>
       <Text style={{color:selected?midnight.background:midnight.text,fontWeight:selected?'700':'500'}}>{number}</Text>
     </View>
     {entries.slice(0,visibleEntryLimit).map(item=><View key={item.id} style={[styles.chip,{backgroundColor:chipColors[item.kind]}]}>
       <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipText}>{complete(item)?'✓ ':''}{item.name}</Text>
     </View>)}
     {entries.length>visibleEntryLimit&&<Text style={styles.more}>+{entries.length-visibleEntryLimit}</Text>}
   </Pressable>;
 }
 return <View>
   <View style={styles.weekRow}>{['Su','Mo','Tu','We','Th','Fr','Sa'].map(name=><Text key={name} style={styles.weekday}>{name}</Text>)}</View>
   {Array.from({length:weeks},(_,week)=><View key={week} style={styles.weekRow}>
     {Array.from({length:7},(_,weekday)=>cell(1-offset+week*7+weekday))}
   </View>)}
 </View>;
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
 function entryOptions(i:Item){
   return <Control title="•••" accessibilityLabel={'Options for '+i.name}
     onPress={()=>options(menu===i.id?null:i.id)}/>;
 }
 function controls(i:Item){return <View key={i.id} style={styles.stack}>
 {i.kind==='routine'?<Control primary title={session(i)?.workoutFinished?'✓ Workout completed':session(i)?'Resume workout':'Start workout'}
   disabled={busy||!!session(i)?.workoutFinished||(!session(i)&&!library.routines.some(p=>p.id===i.routineID))}
   onPress={()=>{const active=session(i);if(active){onResume(active.sessionID);return;}
     void run(async()=>{const plan=library.routines.find(p=>p.id===i.routineID)!;
       const result=await native.startRoutine(plan.id!,plan.revision,i.id);
       if((result as any)?.startRejection)throw Error('Resume or finish the active workout in Today.');
       onStart();
     });
   }}/>:i.children.map(c=><Pressable key={c.id} accessibilityRole="checkbox" accessibilityState={{checked:c.checked}} disabled={busy} onPress={()=>void run(()=>patch({...i,children:i.children.map(x=>x.id===c.id?{...x,checked:!c.checked}:x)}))} style={styles.touch}><Text style={{textDecorationLine:c.checked?'line-through':'none'}}>{c.checked?'☑':'☐'} {c.label}{i.kind==='water'?' · '+displaySlot(i.slot):''}</Text></Pressable>)}
 {i.kind!=='routine'&&entryOptions(i)}{menu===i.id&&<><Text>Time slot · {displaySlot(i.slot)}</Text><View style={styles.row}>{slots.filter(s=>s!==i.slot).map(s=><Action key={s} title={displaySlot(s)} disabled={busy} onPress={()=>void run(()=>patch({...i,slot:s}))}/>)}</View>
 {!session(i)&&<Action title="Remove from date" disabled={busy} onPress={()=>void run(()=>save({...agenda,items:agenda.items.filter(x=>x.id!==i.id)}))}/>}</>}</View>}
 const [menu,options]=useState<string|null>(null);
 const [adding,addTo]=useState<string|null>(null);
 const firstSlot=slots.find(slot=>agenda.items.some(i=>i.slot===slot&&!(waterDone&&i.kind==='water')));
 const year=date.getFullYear(),month=date.getMonth();
 const calendarScroll=useRef<ScrollView>(null), agendaTop=useRef(0);
 function openDay(next:Date){
   select(next);
   calendarScroll.current?.scrollTo({y:Math.max(0,agendaTop.current-8),animated:true});
 }
 const Container=today?View:ScrollView;
 return <Container {...(today?{}:{ref:calendarScroll,automaticallyAdjustKeyboardInsets:true,keyboardShouldPersistTaps:"handled" as const,contentContainerStyle:styles.page})}>{!today&&<>
 <View style={styles.hero}>
   <View style={styles.heroCopy}><Text accessibilityRole="header" style={styles.heading}>Calendar</Text>
     <View style={{alignSelf:'flex-start'}}><Control title="Today" disabled={busy} onPress={()=>select(new Date())}/></View>
   </View>
   <Image accessible={false} resizeMode="contain" source={calendarArt} style={styles.heroArt}/>
 </View>
 <View style={styles.month}>
 <View style={styles.splitHeader}><Text style={styles.monthTitle}>{date.toLocaleDateString(undefined,{month:'long',year:'numeric'})}</Text>
   <View style={styles.row}>{[-1,1].map(step=><Control key={step} accessibilityLabel={step<0?'Previous month':'Next month'} title={step<0?'‹':'›'} disabled={busy} onPress={()=>select(new Date(year,month+step,1))}/>)}</View>
 </View>
 <MonthGrid date={date} days={days} workouts={workouts} selectDay={openDay} busy={busy}/>
 </View></>}
 <View onLayout={event=>{agendaTop.current=event.nativeEvent.layout.y;}} style={[styles.card,done&&styles.complete]}><AgendaHeading today={!!today} date={date} completed={done} adding={adding===day}
   disabled={!ready||busy} onAdd={()=>addTo(adding===day?null:day)}/>
 {ready&&adding===day&&<Add key={day} {...{native,library,agenda,save,run,busy}}/>}
 {!agenda.items.length&&<Text>No items scheduled</Text>}
 <View style={{flexDirection:'row',gap:8}}>
 {(today||waters.length>0)&&<View style={styles.metric}><View style={styles.metricLabel}><Icon name="water" size={16}/><Text style={styles.caption}>Water</Text></View><Text style={styles.bold}>{total} / {goal||"—"} oz{waterDone?' ✓':''}</Text></View>}
 {(today||agenda.items.some(i=>i.kind==='supplements'))&&<View style={styles.metric}><View style={styles.metricLabel}><Icon name="supplements" size={16}/><Text style={styles.caption}>Supplement groups</Text></View><Text style={styles.bold}>{agenda.items.filter(i=>i.kind==='supplements'&&complete(i)).length} / {agenda.items.filter(i=>i.kind==='supplements').length}</Text></View>}
 </View>
 {slots.map(slot=>{const items=agenda.items.filter(i=>i.slot===slot&&!(waterDone&&i.kind==='water'));return items.length>0&&<Card key={day+slot} initiallyOpen={slot===firstSlot} title={slot==='Night'?'Evening':slot}>{items.map(i=>i.kind==='routine'?<View key={i.id} style={styles.entry}><View style={styles.itemHeading}><View style={styles.badge}><Icon name="routines"/></View><Text style={[styles.bold,{flex:1}]}>{i.name}</Text>{entryOptions(i)}</View>{controls(i)}</View>:<Card key={i.id} title={i.name+(i.kind==='supplements'?' · '+i.children.filter(c=>c.checked).length+'/'+i.children.length:'')} done={i.kind==='water'?i.children[0].checked:complete(i)}>{controls(i)}</Card>)}</Card>})}
 {waterDone&&<Card title={'Water · '+total+'/'+goal+' oz'} done>{waters.map(controls)}</Card>}</View>
 {!!error&&<Text accessibilityRole="alert">{error}</Text>}
 {!ready&&<Action title="Load calendar" onPress={()=>void run(load)}/>}</Container>;
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
const styles=StyleSheet.create({metric:{flex:1,backgroundColor:midnight.background,padding:10,borderRadius:9,gap:4},caption:{fontSize:13,color:midnight.muted},splitHeader:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',columnGap:16,rowGap:8},
 dateCopy:{flexGrow:1,flexShrink:1,flexBasis:144,gap:3},sectionTitle:{fontSize:21,fontWeight:'700'},eyebrow:{fontSize:12,color:midnight.muted,fontWeight:'600'},
 hero:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12},heroCopy:{flex:1,gap:6},heroArt:{width:'40%',maxWidth:140,aspectRatio:3/2},month:{gap:8},monthTitle:{flexGrow:1,fontSize:18,fontWeight:'700'},
 itemHeading:{flexDirection:'row',alignItems:'center',gap:10},badge:{backgroundColor:'#324563',padding:8,borderRadius:9},metricLabel:{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:5},
 dayNumber:{minWidth:25,minHeight:25,paddingHorizontal:3,alignSelf:'center',alignItems:'center',justifyContent:'center'},selected:{backgroundColor:midnight.selected,borderRadius:16},entry:{borderTopWidth:1,borderColor:midnight.divider,paddingVertical:8,gap:6},page:{padding:18,gap:14},stack:{gap:8},heading:{fontSize:27,fontWeight:'700'},bold:{fontSize:17,fontWeight:'600'},card:{backgroundColor:'#273246',padding:14,gap:10,borderWidth:1,borderColor:'#3A4961',borderRadius:14},complete:{backgroundColor:'#254D47'},touch:{minHeight:44,justifyContent:'center'},row:{flexDirection:'row',flexWrap:'wrap',gap:8},weekRow:{flexDirection:'row'},
 weekday:{flex:1,minWidth:0,textAlign:'center',color:midnight.muted,paddingVertical:5,fontSize:12},
 dayCell:{flex:1,minWidth:0,minHeight:60,gap:2,paddingHorizontal:1,paddingTop:3,paddingBottom:4,borderTopWidth:StyleSheet.hairlineWidth,borderLeftWidth:StyleSheet.hairlineWidth,borderColor:midnight.divider},
 selectedCell:{backgroundColor:'#263248'},chip:{borderRadius:3,paddingHorizontal:2,paddingVertical:1},chipText:{fontSize:11,fontWeight:'600',color:'#132136'},
 more:{fontSize:11,fontWeight:'700',color:midnight.selected,textAlign:'center'},
 input:{color:midnight.text,borderWidth:1,borderColor:'#85968c',borderRadius:7,padding:10,minHeight:44},invalid:{borderWidth:1,borderColor:'#FFB4AD'}});
