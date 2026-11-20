import { useLayoutEffect, useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { numberField } from './routineModel';
import type { ProofModule, Snapshot, WorkoutSet } from './workoutModel';
export default function SetEditor({native,snapshot,set,close,saved,registerLeave}:{native:ProofModule;snapshot:Snapshot;set:WorkoutSet;close():void;saved(value:Snapshot):void;registerLeave?(guard:(action:()=>void)=>void):void}){
 // One mounted editor owns one original target, revision and input buffer.
 // App remounts it for an explicitly accepted new link; prop changes cannot retarget a save.
 const original=useRef({snapshot,set}).current;snapshot=original.snapshot;set=original.set;
 const [pounds,P]=useState(set.pounds==null?'':String(set.pounds)),[reps,R]=useState(set.reps==null?'':String(set.reps)),[rir,I]=useState(set.rir==null?'':String(set.rir));
 const [busy,B]=useState(false),[error,E]=useState('');const lock=useRef(false);const retry=useRef<{values:string;payload:string}|null>(null);
 useLayoutEffect(()=>{registerLeave?.(action=>{
  if(lock.current){E('Wait for this save to finish before opening another set.');return;}
  const dirty=pounds!==(set.pounds==null?'':String(set.pounds))||reps!==(set.reps==null?'':String(set.reps))||rir!==(set.rir==null?'':String(set.rir));
  if(!dirty){action();return;}
  Alert.alert('Leave these set edits?','Unsaved values will be discarded. Saved records and routine targets stay unchanged.',[{text:'Keep editing',style:'cancel'},{text:'Discard edits and open',style:'destructive',onPress:action}]);
 });},[pounds,reps,rir,busy]);
 const repInput=useRef<TextInput>(null);
 async function save(){if(lock.current)return;lock.current=true;B(true);E('');try{
  if(set.completed&&!reps.trim()){E('Enter reps');repInput.current?.focus();return;}
  const fixture=snapshot.exercises.find(e=>e.exerciseID===set.exerciseID)?.sourceExerciseID==null;
  const values={pounds:numberField(pounds,'Pounds',fixture?200:2000,true),reps:numberField(reps,'Reps',fixture?30:1000,false,set.completed),rir:numberField(rir,'RIR',10)};const key=JSON.stringify(values);
  if(!retry.current||retry.current.values!==key){const requestID=await native.newRoutineStartRequest();retry.current={values:key,payload:JSON.stringify({...values,sessionID:snapshot.sessionID,setID:set.setID,actionToken:snapshot.actionToken??'legacy',revision:set.editRevision??0,requestID})};}
  const result=await native.editWorkoutSet(retry.current.payload);saved(result);
 }catch(e){E(e instanceof Error?e.message:'Could not save. Your edits remain here.');}finally{lock.current=false;B(false);}}
 return <ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
 <Text style={styles.heading}>Edit Set</Text><Text>{snapshot.exercises.find(e=>e.exerciseID===set.exerciseID)?.name} · Set {set.number}</Text>
 <Text>Only this workout’s entered values change. Routine targets and rest stay unchanged.</Text>
 <View style={styles.card}>{([['Pounds',pounds,P,'decimal-pad'],['Reps',reps,R,'number-pad'],['RIR (optional)',rir,I,'number-pad']] as const).map(([label,value,change,keyboardType])=><View key={label}><Text>{label}</Text>{label==='Reps'&&error==='Enter reps'&&!reps.trim()&&<Text>Enter reps</Text>}<TextInput ref={label==='Reps'?repInput:undefined} accessibilityLabel={label} style={[styles.input,label==='Reps'&&error==='Enter reps'&&!reps.trim()&&{borderColor:'#a21f30',borderWidth:2}]} value={value} onChangeText={v=>{change(v);if(label==='Reps'&&v.trim()&&error==='Enter reps')E('')}} keyboardType={keyboardType} editable={!busy}/></View>)}</View>
 {!!error&&<Text accessibilityRole="alert">{error}</Text>}
 <Button title="Save changes" disabled={busy} onPress={()=>set.completed?Alert.alert('Correct this recorded set?','This deliberately updates its actual values. The routine and other sets stay unchanged.',[{text:'Cancel',style:'cancel'},{text:'Save correction',onPress:()=>void save()}]):void save()}/>
 <Button title="Cancel / reopen fresh values" disabled={busy} onPress={()=>Alert.alert('Leave editor?','Unsaved edits on this screen will be discarded.',[{text:'Stay',style:'cancel'},{text:'Leave',onPress:close}])}/>
 </ScrollView>;
}
const styles=StyleSheet.create({page:{padding:20,gap:18},heading:{fontSize:25,fontWeight:'700'},card:{padding:18,gap:16,backgroundColor:'#fff',borderWidth:2,borderColor:'#627569',borderRadius:16},input:{borderWidth:1,borderColor:'#9caac0',borderRadius:8,minHeight:48,padding:12,color:'#18251d'}});
