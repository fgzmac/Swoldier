import {Action,Groups,type OrganizerAPI} from "./Organizer";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Keyboard, Alert, Button, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { editPlan, moveEntry, newEntry, newPlan, routineStartNotice, toPlan, validName } from './routineModel';
import type { Snapshot } from './workoutModel';
import type { EditEntry, EditPlan, Exercise, Library, Plan } from './routineModel';
export type RoutineModule = OrganizerAPI & {
  routineLibrary(): Promise<string>;
  createRoutineExercise(name: string): Promise<string>;
  saveRoutine(json: string): Promise<string>;
  deleteRoutine(id: string, revision: number): Promise<void>;
  resolveAndStartRoutine(id: string, revision: number, requestID: string, resolution: string, sessionID: string, token: string): Promise<unknown>;
  newRoutineStartRequest(): Promise<string>;
  startRoutine(id: string, revision: number, requestID: string): Promise<unknown>;
};
export default function RoutineEditor({ native, close, registerLeave, workouts = [] }: { native: RoutineModule | null; close(): void; workouts?: Snapshot[]; registerLeave?(guard: (action:()=>void)=>void): void }) {
  const scroll=useRef<ScrollView>(null);
  const fields=useRef<Record<string,TextInput|null>>({});
  const [attempt,mark]=useState(false),[exerciseAttempt,markExercise]=useState(false),[discard,showDiscard]=useState(false);
  function reveal(message:string){Keyboard.dismiss();AccessibilityInfo.announceForAccessibility(message);requestAnimationFrame(()=>scroll.current?.scrollToEnd({animated:true}));}
  function required(start=false){
    mark(true);
    if(!draft)return false;
    const missing=!draft.name.trim()?'name':draft.exercises.find(e=>e.trackRest&&!e.restSeconds.trim())?.exerciseID;
    if(missing){fields.current[missing]?.focus();return false;}
    if(start&&!draft.exercises.length){setChoosing(true);setMessage("Add an exercise before starting.");return false;}
    return true;
  }
  const [planTargets, setPlanTargets] = useState(false);
  const [moving,setMoving]=useState<string|null>(null);
  const [targets, setTargets] = useState<Record<string, boolean>>({});
  const [unfinished, setUnfinished] = useState<{activeSession:string;resolutionToken:string} | null>(null);
  const [library, setLibrary] = useState<Library>({ exercises: [], routines: [] });
  const [draft, setDraft] = useState<EditPlan | null>(null);
  const [dirty, setDirty] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [choosing, setChoosing] = useState(false);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('');
  const lock = useRef(false);
  const alive = useRef(true);
  const startRequest = useRef<{ id: string; revision: number; token: string } | null>(null);
  const available = native && typeof native.routineLibrary === 'function';
  useEffect(() => {
    alive.current = true;
    if (!available) { setBusy(false); return; }
    lock.current = true;
    native.routineLibrary().then(json => { if (alive.current) setLibrary(JSON.parse(json)); })
      .catch(() => { if (alive.current) setMessage('Could not read saved routines. Close and reopen to retry.'); })
      .finally(() => { lock.current = false; if (alive.current) setBusy(false); });
    return () => { alive.current = false; };
  }, []);
  function leave(action: () => void) {
    if (busy || lock.current) return;
    if (!dirty) { action(); return; }
    Alert.alert('Discard unsaved routine edits?', 'Your last saved routine stays unchanged.', [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard edits', style: 'destructive', onPress: action },
    ]);
  }
  useLayoutEffect(()=>{registerLeave?.(leave);},[dirty,busy]);
  function open(plan: EditPlan) { mark(false);markExercise(false);showDiscard(false); setPlanTargets(false); setTargets({}); setUnfinished(null); setDraft(plan); setDirty(false); setMessage(''); setChoosing(false); setExerciseName(''); }
  function change(next: EditPlan) { setUnfinished(null);showDiscard(false);setDraft(next); setDirty(true); setMessage('Unsaved routine edits'); }
  function entryChange(index: number, entry: EditEntry) {
    if (draft) change({ ...draft, exercises: draft.exercises.map((old, i) => i === index ? entry : old) });
  }
  function add(exercise: Exercise) {
    if (!draft || draft.exercises.some(e => e.exerciseID === exercise.id)) return;
    change({ ...draft, exercises: [...draft.exercises, newEntry(exercise.id)] });
    setChoosing(false); setExerciseName('');
  }
  async function createExercise() {
    if (!native || !draft || lock.current) return;
    markExercise(true);let name: string;
    try { name = validName(exerciseName); } catch (error) { setMessage(String(error)); return; }
    lock.current = true; setBusy(true);
    try {
      const exercise: Exercise = JSON.parse(await native.createRoutineExercise(name));
      setLibrary(old => ({ ...old, exercises: old.exercises.some(e => e.id === exercise.id) ? old.exercises : [...old.exercises, exercise] }));
      if (draft.exercises.some(e => e.exerciseID === exercise.id)) setMessage('That exercise is already in this routine.');
      else add(exercise);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save exercise name. Try again.'); }
    finally { lock.current = false; setBusy(false); }
  }
  async function save() {
    if (!native || !draft || lock.current) return;
    if(!required())return;
    let plan: Plan;
    try { plan = toPlan(draft); } catch (error) { setMessage(error instanceof Error ? error.message : 'Check routine values.'); return; }
    lock.current = true; setBusy(true);
    try {
      const saved: Plan = JSON.parse(await native.saveRoutine(JSON.stringify(plan)));
      setLibrary(old => ({ ...old, routines: [...old.routines.filter(p => p.id !== saved.id), saved] }));
      setDraft(editPlan(saved)); setDirty(false); setMessage('Routine saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save routine. Your edits remain here; retry.'); }
    finally { lock.current = false; setBusy(false); }
  }
  async function startSaved() {
    if (!native || !draft || lock.current) return;
    if(!required(true))return;
    if (dirty || !draft.id) {
      setMessage('Save your routine changes before starting. Unsaved edits have not been used or discarded.');
      return;
    }
    lock.current = true; setBusy(true); setMessage('');
    try {
      if (!startRequest.current || startRequest.current.id !== draft.id || startRequest.current.revision !== draft.revision) {
        startRequest.current = { id: draft.id, revision: draft.revision, token: await native.newRoutineStartRequest() };
      }
      const result = await native.startRoutine(draft.id, draft.revision, startRequest.current.token);
      const notice = routineStartNotice(result);
      if (notice) { setMessage(notice); const active=result as {activeSession:string;resolutionToken:string}; showDiscard(false);setUnfinished(active); return; }
      close();
    } catch (error) {
      // Keep both edits and the request identity: publication may fail after durable Start.
      setMessage(error instanceof Error ? error.message : 'Could not start. Retry uses the same request.');
    } finally { lock.current = false; setBusy(false); }
  }
  async function resolve(resolution: 'finish' | 'discard') {
    if (!native || !draft?.id || !unfinished || !startRequest.current || lock.current || dirty) return;
    lock.current=true; setBusy(true);
    try { await native.resolveAndStartRoutine(draft.id,draft.revision,startRequest.current.token,resolution,unfinished.activeSession,unfinished.resolutionToken);setUnfinished(null);close(); }
    catch(error){setMessage(error instanceof Error?error.message:'Could not resolve the workout. Your data has not been silently replaced.');}
    finally{lock.current=false;setBusy(false);}
  }
  async function removeRoutine(plan: Plan) {
    if(!native || !plan.id || lock.current)return;
    lock.current=true;setBusy(true);
    try{await native.deleteRoutine(plan.id,plan.revision);setLibrary(JSON.parse(await native.routineLibrary()));setDraft(null);setDirty(false);setUnfinished(null);setMessage('Routine deleted. Your workouts are kept.');}
    catch(error){setMessage(error instanceof Error?error.message:'Could not delete routine.');}
    finally{lock.current=false;setBusy(false);}
  }
  return <ScrollView ref={scroll} automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
    <View style={styles.row}><Text style={styles.brand}>SWOLDIER</Text>{draft&&<Action title="Cancel" color="#174f35" disabled={busy} onPress={()=>leave(()=>{setDraft(null);setDirty(false);setUnfinished(null);})}/>}</View>
    <Text accessibilityRole="header" style={styles.heading}>{draft ? (draft.id?'Edit routine':'New routine') : 'Your routines'}</Text>
    {!available ? <Text>A native iPhone build is required for routine storage.</Text> : <>
      {!draft&&<>
      <Text style={styles.subtitle}>Choose your next workout.</Text>
      <Pressable accessibilityRole="button" disabled={busy} style={styles.primary} onPress={()=>open(newPlan())}><Text style={styles.primaryText}>＋ Create routine</Text></Pressable>
      {!library.routines.length && <Text>No saved routines yet. Start with the exercises you want to log.</Text>}
      {native && <Groups api={native} plans={library.routines} render={plan => {
        const sessions=workouts.filter(w=>w.routineID===plan.id), active=sessions.find(w=>!w.workoutFinished);
        const last=sessions.filter(w=>w.finishedAt!=null).sort((a,b)=>b.finishedAt!-a.finishedAt!)[0];
        return <View style={styles.libraryCard} key={plan.id}>
          <Pressable accessibilityRole="button" accessibilityLabel={`Open ${plan.name}`} style={styles.libraryMain} disabled={busy} onPress={()=>open(editPlan(plan))}>
            <Text style={styles.cardTitle}>{plan.name}</Text><Text style={styles.subtitle}>{plan.exercises.length} exercises · {active?'In progress':last?.finishedAt?`Last completed ${new Date(last.finishedAt*1000).toLocaleDateString()}`:'Not started'}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={`Options for ${plan.name}`} style={styles.more} disabled={busy} onPress={()=>Alert.alert(plan.name,'Routine options',[{text:'Cancel',style:'cancel'},{text:'Edit routine',onPress:()=>open(editPlan(plan))},{text:'Delete routine',style:'destructive',onPress:()=>Alert.alert(`Delete ${plan.name}?`,'The routine will leave your library. Calendar entries retain their scheduled names. Previous workouts and the active workout snapshot stay intact.',[{text:'Cancel',style:'cancel'},{text:'Delete routine',style:'destructive',onPress:()=>void removeRoutine(plan)}])}])}><Text style={styles.cardTitle}>•••</Text></Pressable>
        </View>;
      }}/> }
      </>}
      {draft && <View style={styles.section}>
        <Text>Routine name · Required</Text>{attempt&&!draft.name.trim()&&<Text accessibilityRole="alert">Enter a routine name</Text>}
        <TextInput ref={r=>{fields.current.name=r}} accessibilityLabel="Routine name" style={[styles.input,attempt&&!draft.name.trim()&&styles.invalid]} value={draft.name} editable={!busy}
          onChangeText={name => change({ ...draft, name })} />
        <Text style={styles.cardTitle}>How do you want to log?</Text>
        <Pressable accessibilityRole="radio" accessibilityState={{selected:!planTargets}} disabled={busy} style={[styles.choice,!planTargets&&styles.choiceSelected]} onPress={()=>{setPlanTargets(false);setTargets({});}}><Text style={styles.cardTitle}>Fill in as I train</Text><Text>Log as you go. Choose exercises, set counts and rest; targets stay optional.</Text></Pressable>
        <Pressable accessibilityRole="radio" accessibilityState={{selected:planTargets}} disabled={busy} style={[styles.choice,planTargets&&styles.choiceSelected]} onPress={()=>{setPlanTargets(true);setTargets({});}}><Text style={styles.cardTitle}>Plan my sets</Text><Text>Show optional weight and rep targets. Hiding targets never clears them.</Text></Pressable>
        <Text style={styles.cardTitle}>Exercises</Text>
        {draft.exercises.map((entry, index) => {
          const name = library.exercises.find(e => e.id === entry.exerciseID)?.name ?? 'Unknown exercise';
          return <View style={styles.exercise} key={entry.exerciseID}>
            <Text style={styles.subtitle}>Exercise {index+1}</Text><Text accessibilityRole="header" style={{fontSize:22,fontWeight:'700'}}>{name}</Text>
            <Action title="Move" onPress={()=>setMoving(moving===entry.exerciseID?null:entry.exerciseID)}/>
            {moving===entry.exerciseID&&<View style={styles.row}>{[['Move up',index-1],['Move down',index+1],['Move to Top',0],['Move to Bottom',draft.exercises.length-1]].map(([label,pos])=><Action key={label} title={String(label)} disabled={busy||Number(pos)<0||Number(pos)>=draft.exercises.length||Number(pos)===index} onPress={()=>{change(moveEntry(draft,index,Number(pos)-index));setMoving(null)}}/>)}</View>}
            <Action title="Remove exercise" color="#942734" accessibilityLabel={`Remove ${name} from routine`} disabled={busy}
              onPress={() => Alert.alert('Remove from this routine?', 'The saved exercise identity and workout history are kept.', [
                { text: 'Cancel', style: 'cancel' }, { text: 'Remove', style: 'destructive', onPress: () => change({ ...draft, exercises: draft.exercises.filter((_, i) => i !== index) }) },
              ])} />
            <View style={styles.inset}><Text style={styles.cardTitle}>Rest settings</Text><View style={styles.row}>
              <Text>Track rest</Text>
              <Switch accessibilityLabel={`Track rest for ${name}`} disabled={busy} value={entry.trackRest}
                onValueChange={trackRest => entryChange(index, { ...entry, trackRest })} />
            </View>
            {entry.trackRest&&<><Text>Rest seconds · Required</Text>
            {attempt&&entry.trackRest&&!entry.restSeconds.trim()&&<Text accessibilityRole="alert">Enter rest seconds</Text>}<TextInput ref={r=>{fields.current[entry.exerciseID]=r}} accessibilityLabel={`${name} rest seconds`} style={[styles.input,attempt&&entry.trackRest&&!entry.restSeconds.trim()&&styles.invalid]} keyboardType="number-pad"
              value={entry.restSeconds} editable={!busy && entry.trackRest} onChangeText={restSeconds => entryChange(index, { ...entry, restSeconds })} />
            </>}</View>
            <View style={styles.inset}><Text style={styles.cardTitle}>Set settings</Text>
            <Text>{entry.sets.length} sets</Text>
            <Action title={(targets[entry.exerciseID]??planTargets) ? '▾ Set targets · Optional' : '▸ Set targets · Optional'} disabled={busy} onPress={()=>setTargets({...targets,[entry.exerciseID]:!(targets[entry.exerciseID]??planTargets)})}/>
            {<Action title="Remove last set" disabled={busy||entry.sets.length<=1} onPress={()=>entryChange(index,{...entry,sets:entry.sets.slice(0,-1)})}/>}
            {(targets[entry.exerciseID]??planTargets) && entry.sets.map((set, n) => <View key={n} style={styles.section}>
              <Text>Planned set {n + 1}</Text>
              <View style={styles.row}>
                <View style={styles.field}><Text>Weight (lb)</Text><TextInput accessibilityLabel={`${name} set ${n + 1} pounds`}
                  style={styles.input} keyboardType="decimal-pad" value={set.pounds} editable={!busy}
                  onChangeText={pounds => entryChange(index, { ...entry, sets: entry.sets.map((s, i) => i === n ? { ...s, pounds } : s) })} /></View>
                <View style={styles.field}><Text>Reps</Text><TextInput accessibilityLabel={`${name} set ${n + 1} reps`}
                  style={styles.input} keyboardType="number-pad" value={set.reps} editable={!busy}
                  onChangeText={reps => entryChange(index, { ...entry, sets: entry.sets.map((s, i) => i === n ? { ...s, reps } : s) })} /></View>
              </View>
              <Action title={`Remove set ${n + 1}`} disabled={busy || entry.sets.length === 1}
                onPress={() => entryChange(index, { ...entry, sets: entry.sets.filter((_, i) => i !== n) })} />
            </View>)}
            <Action title="Add set" disabled={busy || entry.sets.length >= 20}
              onPress={() => entryChange(index, { ...entry, sets: [...entry.sets, { pounds: '', reps: '' }] })} />
          </View></View>;
        })}
        {message==="Add an exercise before starting."&&!draft.exercises.length&&<Text accessibilityRole="alert" style={styles.invalid}>Add an exercise</Text>}<Action title="Add exercise" disabled={busy || draft.exercises.length >= 30} onPress={() => setChoosing(!choosing)} />
        {choosing && <View style={styles.section}>
          <Text>New exercise name</Text>
          {exerciseAttempt&&!exerciseName.trim()&&<Text>Enter an exercise name</Text>}<TextInput accessibilityLabel="New exercise name" style={[styles.input,exerciseAttempt&&!exerciseName.trim()&&styles.invalid]} value={exerciseName} editable={!busy} onChangeText={setExerciseName} />
          <Action title="Save exercise name and add" disabled={busy} onPress={() => void createExercise()} />
          <Text>Saved exercise names stay available even if you discard routine edits.</Text>
          <Text accessibilityRole="header">Reuse an exercise</Text>
          {library.exercises.filter(e => !draft.exercises.some(entry => entry.exerciseID === e.id)).map(e =>
            <Action key={e.id} title={`Use ${e.name}`} disabled={busy} onPress={() => add(e)} />)}
        </View>}
        <Pressable accessibilityRole="button" disabled={busy} style={styles.primary} onPress={()=>void save()}><Text style={styles.primaryText}>{busy?'Working…':'Save routine'}</Text></Pressable>
        <Button title="Start saved routine" disabled={busy} onPress={() => void startSaved()} />
        {dirty && <Text>Save changes before Start; unsaved edits stay here.</Text>}
      </View>}
    </>}
    {unfinished && <View style={styles.exercise}><Text onLayout={()=>reveal("A workout is still in progress")} style={styles.cardTitle}>A workout is still in progress</Text>
      <Pressable accessibilityRole="button" disabled={busy} style={({pressed})=>({padding:14,borderRadius:10,backgroundColor:pressed?"#aed3ee":"#deefff"})} onPress={()=>leave(close)}><Text style={{color:"#123e64",fontWeight:"700"}}>Resume workout</Text></Pressable>
      <Action title="Finish and keep recorded sets" disabled={busy||dirty} onPress={()=>Alert.alert('Finish current workout?', 'Recorded sets are kept. Unperformed sets are marked skipped, and the selected saved routine starts.',[{text:'Cancel',style:'cancel'},{text:'Finish and start selected',onPress:()=>void resolve('finish')}])}/>
      <Action title="Discard this workout and start selected routine" color="#a42b35" disabled={busy||dirty} onPress={()=>showDiscard(true)}/>
      {discard&&<View onLayout={()=>reveal('Confirm discard')}><Text>Discard this unfinished workout and its recorded sets?</Text><Action title="Cancel" onPress={()=>showDiscard(false)}/><Action title="Discard and start selected" color="#a42b35" disabled={busy||dirty} onPress={()=>void resolve('discard')}/></View>}
      {!discard&&<Action title="Cancel" onPress={()=>setUnfinished(null)}/>}
    </View>}
    {!!message && <Text accessibilityRole="alert">{message}</Text>}
  </ScrollView>;
}
const styles = StyleSheet.create({
  inset:{backgroundColor:"#eff3ee",gap:8,padding:12,borderRadius:9,borderLeftWidth:3,borderColor:"#647e70"},invalid:{borderWidth:2,borderColor:"#a21f30"},brand:{fontWeight:'800',fontSize:17,color:'#18251d'}, subtitle:{color:'#565f59'},
  primary:{backgroundColor:'#174f35',borderRadius:10,minHeight:50,alignItems:'center',justifyContent:'center',padding:12},primaryText:{color:'#fff',fontSize:18,fontWeight:'700'},
  libraryCard:{borderWidth:2,borderColor:'#647568',borderRadius:12,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'},libraryMain:{flex:1,minHeight:82,padding:16,gap:7},more:{minWidth:50,minHeight:50,alignItems:'center',justifyContent:'center'},
  choice:{borderWidth:2,borderColor:'#647568',borderRadius:10,padding:16,gap:6},choiceSelected:{borderColor:'#174f35',borderWidth:2,backgroundColor:'#eff5ef'},
  page: { padding: 20, gap: 18, backgroundColor:'#faf8f3' }, heading: { fontSize: 24, fontWeight: '700' },
  section: { gap: 12 }, cardTitle:{fontSize:18,fontWeight:'700',color:'#18251d'}, exercise: { borderWidth: 2, borderColor: '#627569', borderRadius:16, backgroundColor:'#fff', padding:16, gap:12 },
  row: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' }, field: { flex: 1, minWidth: 100 },
  input: { borderWidth: 1, borderColor: '#777', borderRadius: 4, padding: 10, minHeight: 44, color: '#111' },
});
