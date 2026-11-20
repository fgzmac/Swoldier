import {benchArt,Icon,Text,midnight} from './Midnight';
import {Tracker,Action} from "./Organizer";
import {localDay,quoteForDay} from "./workoutModel";
import RoutineEditor from './RoutineEditor';
import SetEditor from './SetEditor';
import WeekPlanner from './WeekPlanner';
import {setLink,setForLink} from './workoutModel';
import type {ProofModule,Snapshot,WorkoutSet} from './workoutModel';
import {requireOptionalNativeModule} from 'expo';
import {useEffect,useRef,useState} from 'react';
import {Image,Alert,AppState,Button,Linking,Platform,Pressable,SafeAreaView,StatusBar,ScrollView,StyleSheet,View} from 'react-native';
const proof=Platform.OS==='ios'?requireOptionalNativeModule<ProofModule>('LockScreenProof'):null;
export default function App(){
 const [tab,T]=useState<'workout'|'routines'|'week'>('workout'),[saved,S]=useState<Snapshot|null>(null),[history,H]=useState<Snapshot[]>([]),[selected,Q]=useState<Snapshot|null>(null);
 const [edit,D]=useState<{key:number;snapshot:Snapshot;set:WorkoutSet}|null>(null),[message,M]=useState(''),[busy,B]=useState(false),[debug,G]=useState(false),[targets,P]=useState(false);
 const routineLeave=useRef<(action:()=>void)=>void>(action=>action());
 const editorLeave=useRef<(action:()=>void)=>void>(action=>action());
 const navigate=useRef<(action:()=>void)=>void>(action=>action());
 const editorKey=useRef(0),linkRequest=useRef(0);
 navigate.current=action=>{if(edit)editorLeave.current(action);else if(tab==='routines')routineLeave.current(action);else action();};
 const lock=useRef(false);const revision=useRef(0);
 async function refresh(){if(!proof||lock.current)return;const token=++revision.current;try{const value=await proof.read();if(token===revision.current)S(value);}catch{M('Could not load the workout. Try again.');}}
 async function refreshHistory(){if(!proof)return;try{H(await proof.workoutHistory());}catch{M('Could not load earlier workouts. Current data has not been removed.');}}
 async function link(url:string){
  const target=setLink(url);if(!target||!proof)return;const request=++linkRequest.current;
  async function inspect(){
   return setForLink(await proof!.read(),target!);
  }
  try{
   await inspect();if(request!==linkRequest.current)return;
   navigate.current(()=>{void (async()=>{
    try{const selected=await inspect();if(request!==linkRequest.current)return;
     revision.current++;S(selected.snapshot);D({key:++editorKey.current,...selected});T('workout');Q(null);M('');
    }catch(error){M(error instanceof Error?error.message:'Could not open that set.');}
   })();});
  }catch(error){if(request===linkRequest.current)M(error instanceof Error?error.message:'Could not open that set.');}
 }

 useEffect(()=>{void refresh();void refreshHistory();void Linking.getInitialURL().then(url=>{if(url)void link(url);});const listener=Linking.addEventListener('url',e=>void link(e.url));const state=AppState.addEventListener('change',s=>{if(s==='active'){void refresh();void refreshHistory();}});return()=>{revision.current++;listener.remove();state.remove();};},[]);
 useEffect(()=>{if(saved?.restState!=='running')return;const timer=setInterval(()=>{if(AppState.currentState==='active')void refresh();},1000);return()=>clearInterval(timer);},[saved?.restState,saved?.restDeadline]);
 async function resume(sessionID:string){
   if(!proof||lock.current)return;
   lock.current=true; B(true); T('workout'); Q(null);
   try {revision.current++; S(await proof.resumeWorkout(sessionID)); M('');}
   catch(e){M(String(e));}
   finally {lock.current=false;B(false);}
 }
 async function fixture(reset=false){if(!proof||lock.current)return;lock.current=true;B(true);try{if(reset){await proof.reset();S(null);}else S(await proof.start());}catch(e){M(String(e));}finally{lock.current=false;B(false);}}
 const [today,setToday]=useState(localDay(new Date())),[past,showPast]=useState(false);
 useEffect(()=>{let alarm:ReturnType<typeof setTimeout>;function sync(){clearTimeout(alarm);const now=new Date();setToday(localDay(now));const next=new Date(now);next.setHours(24,0,0,0);alarm=setTimeout(sync,next.getTime()-now.getTime());}sync();const sub=AppState.addEventListener('change',s=>{if(s==='active')sync()});return()=>{clearTimeout(alarm);sub.remove()};},[]);
 const [expanded,setExpanded]=useState<Record<string,boolean>>({});
 function workoutCard(shown:Snapshot, archived:boolean){
 const open=!!expanded[shown.sessionID];
 const current=shown.sets.find(set=>set.setID===shown.setID);
 return <View key={shown.sessionID} style={[styles.card,!shown.workoutFinished&&styles.activeCard]}><Pressable accessibilityRole="button" accessibilityState={{expanded:open}} onPress={()=>setExpanded(x=>({...x,[shown.sessionID]:!open}))} style={styles.workoutHeader}>
 <View style={styles.workoutCopy}>
   <Text style={styles.eyebrow}>{shown.workoutFinished?'COMPLETED':'IN PROGRESS'}{(shown.finishedAt??shown.startedAt)!=null?'  /  '+new Date((shown.finishedAt??shown.startedAt)!*1000).toLocaleDateString():''}</Text>
   <Text style={styles.title}>{shown.routineName??'Fictional workout'}</Text>
   {!shown.workoutFinished&&<><Text style={styles.exercise}>{shown.exerciseName}</Text><Text style={styles.muted}>Set {shown.setNumber} of {shown.setCount}{current&&!current.completed?` · Draft · ${current.pounds??'—'} lb × ${current.reps??'—'}`:''}</Text></>}
   {(shown.workoutFinished||open)&&<Text style={styles.muted}>{shown.recordCount} recorded · {shown.sets.filter(s=>s.skippedAt!=null).length} skipped</Text>}
 </View>
 {!shown.workoutFinished&&<Image accessible={false} resizeMode="contain" source={benchArt} style={styles.bench}/>}
 </Pressable>
 {!archived&&!shown.workoutFinished&&<Pressable accessibilityRole="button" style={({pressed})=>[styles.resume,pressed&&{opacity:0.85}]} disabled={busy} onPress={()=>void resume(shown.sessionID)}><Text style={{fontWeight:'700'}}>Resume workout</Text><Icon name="right" color={midnight.text}/></Pressable>}
 {open&&<> {shown.exercises.map(exercise=><View key={exercise.exerciseID} style={[styles.card,exercise.exerciseID===shown.exerciseID&&!shown.workoutFinished&&styles.activeCard]}>
 <Text style={styles.title}>{exercise.name}</Text><Text style={styles.muted}>{exercise.finishedAt!=null?'Finished':exercise.exerciseID===shown.exerciseID?'Current exercise':'Upcoming'}</Text>
 {shown.sets.filter(s=>s.exerciseID===exercise.exerciseID).map(set=><View key={set.setID} style={styles.setRow}>
 <Text style={styles.setTitle}>Set {set.number} · {set.skippedAt!=null?'Skipped':set.completed?'Recorded':'Draft'}{set.isAdded?' · Added today':''}</Text>
 {set.skippedAt==null&&<Text style={styles.actual}>{set.pounds??'—'} lb × {set.reps??'—'} · RIR {set.rir??'—'}</Text>}
 {targets&&<Text style={styles.muted}>{set.isAdded?'No routine target':`Target: ${set.plannedPounds??'—'} lb × ${set.plannedReps??'—'}`}</Text>}
 {!archived&&set.skippedAt==null&&<Action title="Edit Set" onPress={()=>{if(saved){linkRequest.current++;D({key:++editorKey.current,snapshot:saved,set});}}}/>}
 </View>)}
 </View>)}<Button title={targets?'Hide routine targets':'Show routine targets'} onPress={()=>P(!targets)}/>
</>}</View>;
 }
 const shown=saved;
 if(edit&&proof)return <SafeAreaView style={styles.screen}><StatusBar barStyle="light-content"/><SetEditor key={edit.key} native={proof} registerLeave={guard=>{editorLeave.current=guard;}} snapshot={edit.snapshot} set={edit.set} close={()=>{linkRequest.current++;D(null);void refresh();}} saved={value=>{linkRequest.current++;revision.current++;S(value);D(null);M('Set updated.');}}/>{!!message&&<Text style={styles.message} accessibilityRole="alert">{message}</Text>}</SafeAreaView>;
 return <SafeAreaView style={styles.screen}><StatusBar barStyle="light-content"/>

 {tab==='routines'?<RoutineEditor onResume={resume} native={proof} workouts={[...history,...(saved?[saved]:[])]} registerLeave={guard=>{routineLeave.current=guard;}} close={()=>{linkRequest.current++;T('workout');void refresh();void refreshHistory();}}/>:tab==='week'&&proof?<WeekPlanner onResume={resume} onStart={()=>{T('workout');void refresh();void refreshHistory();}} native={proof} workouts={[...history,...(saved?[saved]:[])]}/>:<ScrollView contentContainerStyle={styles.page}>
 <Text style={styles.muted}>{new Date(today+"T12:00:00").toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})}</Text><Text style={styles.heading}>Today</Text><Text style={styles.quote}>“{quoteForDay(today)}”</Text>


 {!proof&&<Text>A native iPhone preview is required to save workouts.</Text>}
 {!shown?<View style={styles.card}><Text style={styles.title}>Ready when you are</Text><Text>Create a routine with exercises, set counts and rest, then start it here.</Text><Button title="Choose or create a routine" onPress={()=>T('routines')}/></View>:!shown.workoutFinished&&workoutCard(shown,false)}

 {proof&&<Tracker api={proof} day={today} workouts={[...history,...(saved?[saved]:[])]}/>}
 {proof&&<WeekPlanner onResume={resume} key={today} today={today} native={proof} workouts={[...history,...(saved?[saved]:[])]} onStart={()=>{void refresh();void refreshHistory();}}/>}
 <Action title={(past?'▾':'▸')+' Completed Workouts · '+(history.length+(shown?.workoutFinished?1:0))} onPress={()=>showPast(!past)}/>{past&&<>{shown?.workoutFinished&&workoutCard(shown,false)}{history.map(w=>workoutCard(w,true))}</>}
 <Button title={debug?'Hide proof diagnostics':'Proof diagnostics'} onPress={()=>G(!debug)}/>
 {debug&&<View style={styles.card}><Text>Diagnostics — not workout instructions</Text>{saved&&<><Text>Complete requests: {saved.completionAttempts}</Text><Text>Rest: {saved.restState}; {saved.awaitingContinue?'awaiting Continue':'dismissed'}</Text><Text>Deadline: {saved.restDeadline??'none'}; acknowledged: {saved.restContinuedAt??'none'}</Text><Text>Saved routine revision: {saved.routineRevision??'fixture'}</Text></>}
 <Button title="Show / resume fictional fixture" disabled={busy} onPress={()=>void fixture()}/>
 <Button title="Reset fictional fixture only" disabled={busy} onPress={()=>Alert.alert('Reset fictional fixture?','Only the current fictional fixture is cleared. Saved-routine workouts cannot be reset here.',[{text:'Cancel',style:'cancel'},{text:'Reset fixture',style:'destructive',onPress:()=>void fixture(true)}])}/>
 <Text>RIR means reps in reserve. Blank is unrecorded; zero is meaningful.</Text></View>}
 </ScrollView>}
 <View style={styles.nav}>{(['workout','routines','week'] as const).map(key=><View key={key} style={[styles.navItem,tab===key&&styles.navSelected]}><Pressable accessibilityRole="tab" accessibilityState={{selected:tab===key}} style={styles.navButton} onPress={()=>{const go=()=>{linkRequest.current++;T(key);Q(null);void refresh();void refreshHistory();};if(tab==='routines'&&key!=='routines')routineLeave.current(go);else go();}}><Icon name={key} color={tab===key?midnight.selected:midnight.muted}/><Text style={[styles.navText,{color:tab===key?midnight.selected:midnight.muted}]}>{key==='week'?'Calendar':key==='routines'?'Routines':'Today'}</Text></Pressable></View>)}</View>
 {!!message&&<Text style={styles.message} accessibilityRole="alert" onPress={()=>M('')}>{message}</Text>}
 </SafeAreaView>;
}
const styles=StyleSheet.create({workoutHeader:{flexDirection:'row',alignItems:'center',gap:6},workoutCopy:{flex:1,gap:4},bench:{width:'35%',aspectRatio:145/115},eyebrow:{fontSize:11,letterSpacing:1,color:midnight.selected,fontWeight:'700'},exercise:{fontWeight:'600'},quote:{fontSize:17,fontStyle:'italic',lineHeight:24,color:'#C4D8F4'},resume:{backgroundColor:midnight.primary,minHeight:44,paddingHorizontal:14,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},navButton:{gap:3,minHeight:48,alignItems:'center',justifyContent:'center'},navText:{fontSize:12,fontWeight:'600',color:'#8BBBFF'},screen:{flex:1,backgroundColor:'#1B1F2D'},nav:{flexDirection:'row',gap:8,paddingHorizontal:12,paddingVertical:3,borderTopWidth:1,borderColor:'#3A4961'},navItem:{flex:1,borderTopWidth:2,borderColor:'transparent'},navSelected:{borderTopWidth:2,borderTopColor:midnight.selected},page:{padding:20,gap:18,paddingBottom:40},heading:{fontSize:28,fontWeight:'700',color:'#F1F4FA'},title:{fontSize:20,fontWeight:'600',color:'#F1F4FA'},muted:{color:'#B4C1D3'},card:{backgroundColor:'#273246',borderRadius:16,padding:18,gap:12,borderWidth:2,borderColor:'#3A4961'},activeCard:{backgroundColor:'#222D42',borderColor:'#3A4961',borderWidth:1},setRow:{paddingVertical:12,borderTopWidth:1,borderColor:'#3A4961',gap:6},setTitle:{fontWeight:'600',color:'#F1F4FA'},actual:{fontSize:18,color:'#F1F4FA'},message:{padding:14,color:'#FFB4AD'}});
