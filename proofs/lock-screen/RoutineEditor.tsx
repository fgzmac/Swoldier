import { useEffect, useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { editPlan, moveEntry, newEntry, newPlan, toPlan, validName } from './routineModel';
import type { EditEntry, EditPlan, Exercise, Library, Plan } from './routineModel';
export type RoutineModule = {
  routineLibrary(): Promise<string>;
  createRoutineExercise(name: string): Promise<string>;
  saveRoutine(json: string): Promise<string>;
};
export default function RoutineEditor({ native, close }: { native: RoutineModule | null; close(): void }) {
  const [library, setLibrary] = useState<Library>({ exercises: [], routines: [] });
  const [draft, setDraft] = useState<EditPlan | null>(null);
  const [dirty, setDirty] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [choosing, setChoosing] = useState(false);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('');
  const lock = useRef(false);
  const alive = useRef(true);
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
    if (busy) return;
    if (!dirty) { action(); return; }
    Alert.alert('Discard unsaved routine edits?', 'Your last saved routine stays unchanged.', [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard edits', style: 'destructive', onPress: action },
    ]);
  }
  function open(plan: EditPlan) { setDraft(plan); setDirty(false); setMessage(''); setChoosing(false); setExerciseName(''); }
  function change(next: EditPlan) { setDraft(next); setDirty(true); setMessage('Unsaved routine edits'); }
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
    let name: string;
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
  return <ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
    <Text accessibilityRole="header" style={styles.heading}>Routine editor</Text>
    <Button title="Back to fictional workout" disabled={busy} onPress={() => leave(close)} />
    {!available ? <Text>This editor needs a native build with routine storage. The current installed preview does not include it.</Text> : <>
      <Text>Save your plan here. Start Workout still uses the fictional proof.</Text>
      <Button title="Create routine" disabled={busy} onPress={() => leave(() => open(newPlan()))} />
      <Text accessibilityRole="header">Saved routines</Text>
      {!library.routines.length && <Text>No saved routines yet.</Text>}
      {library.routines.map(plan => <Button key={plan.id} title={`Open ${plan.name}`} disabled={busy}
        onPress={() => leave(() => open(editPlan(plan)))} />)}
      {draft && <View style={styles.section}>
        <Text>Routine name</Text>
        <TextInput accessibilityLabel="Routine name" style={styles.input} value={draft.name} editable={!busy}
          onChangeText={name => change({ ...draft, name })} />
        <Text>Pounds and reps may stay blank; zero is a value. Rest seconds are required only when Track rest is on. New exercises have three blank planned sets.</Text>
        {draft.exercises.map((entry, index) => {
          const name = library.exercises.find(e => e.id === entry.exerciseID)?.name ?? 'Unknown exercise';
          return <View style={styles.exercise} key={entry.exerciseID}>
            <Text accessibilityRole="header">{index + 1}. {name}</Text>
            <View style={styles.row}>
              <Button title="Move up" accessibilityLabel={`Move ${name} up`} disabled={busy || index === 0}
                onPress={() => change(moveEntry(draft, index, -1))} />
              <Button title="Move down" accessibilityLabel={`Move ${name} down`} disabled={busy || index === draft.exercises.length - 1}
                onPress={() => change(moveEntry(draft, index, 1))} />
            </View>
            <Button title="Remove from routine" accessibilityLabel={`Remove ${name} from routine`} disabled={busy}
              onPress={() => Alert.alert('Remove from this routine?', 'The saved exercise identity and workout history are kept.', [
                { text: 'Cancel', style: 'cancel' }, { text: 'Remove', style: 'destructive', onPress: () => change({ ...draft, exercises: draft.exercises.filter((_, i) => i !== index) }) },
              ])} />
            <View style={styles.row}>
              <Text>Track rest</Text>
              <Switch accessibilityLabel={`Track rest for ${name}`} disabled={busy} value={entry.trackRest}
                onValueChange={trackRest => entryChange(index, { ...entry, trackRest })} />
            </View>
            <Text>{entry.trackRest ? 'Rest seconds (required)' : 'Rest seconds (remembered, not used)'}</Text>
            <TextInput accessibilityLabel={`${name} rest seconds`} style={styles.input} keyboardType="number-pad"
              value={entry.restSeconds} editable={!busy && entry.trackRest} onChangeText={restSeconds => entryChange(index, { ...entry, restSeconds })} />
            {!entry.trackRest && <Text>Rest tracking is off. Your entered duration is kept for when you turn it on again.</Text>}
            {entry.sets.map((set, n) => <View key={n} style={styles.section}>
              <Text>Planned set {n + 1}</Text>
              <View style={styles.row}>
                <View style={styles.field}><Text>Pounds</Text><TextInput accessibilityLabel={`${name} set ${n + 1} pounds`}
                  style={styles.input} keyboardType="decimal-pad" value={set.pounds} editable={!busy}
                  onChangeText={pounds => entryChange(index, { ...entry, sets: entry.sets.map((s, i) => i === n ? { ...s, pounds } : s) })} /></View>
                <View style={styles.field}><Text>Reps</Text><TextInput accessibilityLabel={`${name} set ${n + 1} reps`}
                  style={styles.input} keyboardType="number-pad" value={set.reps} editable={!busy}
                  onChangeText={reps => entryChange(index, { ...entry, sets: entry.sets.map((s, i) => i === n ? { ...s, reps } : s) })} /></View>
              </View>
              <Button title={`Remove set ${n + 1}`} disabled={busy || entry.sets.length === 1}
                onPress={() => entryChange(index, { ...entry, sets: entry.sets.filter((_, i) => i !== n) })} />
            </View>)}
            <Button title="Add planned set" disabled={busy || entry.sets.length >= 20}
              onPress={() => entryChange(index, { ...entry, sets: [...entry.sets, { pounds: '', reps: '' }] })} />
          </View>;
        })}
        <Button title="Add exercise" disabled={busy || draft.exercises.length >= 30} onPress={() => setChoosing(!choosing)} />
        {choosing && <View style={styles.section}>
          <Text>New exercise name</Text>
          <TextInput accessibilityLabel="New exercise name" style={styles.input} value={exerciseName} editable={!busy} onChangeText={setExerciseName} />
          <Button title="Save exercise name and add" disabled={busy} onPress={() => void createExercise()} />
          <Text>Saved exercise names stay available even if you discard routine edits.</Text>
          <Text accessibilityRole="header">Reuse an exercise</Text>
          {library.exercises.filter(e => !draft.exercises.some(entry => entry.exerciseID === e.id)).map(e =>
            <Button key={e.id} title={`Use ${e.name}`} disabled={busy} onPress={() => add(e)} />)}
        </View>}
        <Button title="Save routine" disabled={busy} onPress={() => void save()} />
      </View>}
    </>}
    {!!message && <Text accessibilityRole="alert">{message}</Text>}
  </ScrollView>;
}
const styles = StyleSheet.create({
  page: { padding: 20, gap: 12 }, heading: { fontSize: 24, fontWeight: '700' },
  section: { gap: 8 }, exercise: { borderTopWidth: 1, borderColor: '#aaa', paddingTop: 12, gap: 8 },
  row: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' }, field: { flex: 1, minWidth: 100 },
  input: { borderWidth: 1, borderColor: '#777', borderRadius: 4, padding: 10, minHeight: 44, color: '#111' },
});
