import { requireOptionalNativeModule } from 'expo';
import { useEffect, useRef, useState } from 'react';
import { Alert, AppState, Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type Snapshot = {
  sessionID: string;
  setID: string;
  restID: string;
  setNumber: number;
  plannedSetsRecorded: boolean;
  sets: {
    setID: string; number: number; plannedPounds: number; plannedReps: number;
    pounds: number; reps: number; completed: boolean; completionAttempts: number;
  }[];
  pounds: number;
  reps: number;
  completed: boolean;
  completionAttempts: number;
  recordCount: number;
  restDeadline: number | null;
  restSkippedAt: number | null;
  restContinuedAt: number | null;
  restSetID: string | null;
  restUndoneAt: number | null;
  awaitingContinue: boolean;
  restState: 'not_started' | 'running' | 'expired' | 'skipped';
  restRemainingSeconds: number;
};

type ProofModule = {
  start(): Promise<Snapshot>;
  read(): Promise<Snapshot | null>;
  reset(): Promise<void>;
  readPublicationDiagnostics(): Promise<PublicationDiagnostic[]>;
};

type PublicationDiagnostic = {
  publicationID: string | null;
  publicationTime: number | null;
  publishedStaleDate: number | null;
  savedRestDeadline: number | null;
  setNumber: number | null;
  saveFailed: boolean;
};

function diagnosticTime(seconds: number | null) {
  return seconds == null ? 'none / unavailable' :
    new Date(seconds * 1000).toISOString() + ' (' + seconds.toFixed(3) + ' s)';
}

const proof = Platform.OS === 'ios' ? requireOptionalNativeModule<ProofModule>('LockScreenProof') : null;

export default function App() {
  const [saved, setSaved] = useState<Snapshot | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [diagnostics, setDiagnostics] = useState<PublicationDiagnostic[] | null>(null);
  const [diagnosticMessage, setDiagnosticMessage] = useState('');
  const [readingDiagnostics, setReadingDiagnostics] = useState(false);
  const operation = useRef(false);
  const revision = useRef(0);

  async function refresh() {
    if (!proof || operation.current) return;
    const request = ++revision.current;
    try {
      const result = await proof.read();
      if (revision.current === request) setSaved(result);
    } catch {
      if (revision.current === request) setMessage('Could not read proof data.');
    }
  }

  useEffect(() => {
    void refresh();
    const listener = AppState.addEventListener('change', state => {
      if (state === 'active') void refresh();
    });
    return () => {
      revision.current++;
      listener.remove();
    };
  }, []);

  // Foreground readout only. Native deadlines and the Live Activity never rely on this polling.
  useEffect(() => {
    if (saved?.restState !== 'running') return;
    const timer = setInterval(() => {
      if (AppState.currentState === 'active') void refresh();
    }, 1000);
    return () => clearInterval(timer);
  }, [saved?.restState, saved?.restDeadline]);

  async function act(action: 'start' | 'reset') {
    if (!proof || operation.current) return;
    operation.current = true;
    revision.current++;
    setBusy(true);
    setMessage('');
    try {
      if (action === 'start') {
        setSaved(await proof.start());
      } else {
        await proof.reset();
        setSaved(null);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not update the proof.');
    } finally {
      operation.current = false;
      setBusy(false);
      void refresh();
    }
  }

  async function inspectPublication() {
    if (!proof || readingDiagnostics) return;
    setReadingDiagnostics(true);
    setDiagnosticMessage('');
    try {
      setDiagnostics(await proof.readPublicationDiagnostics());
    } catch {
      setDiagnostics(null);
      setDiagnosticMessage('Could not read D1 metadata. This requires the D1 native build.');
    } finally {
      setReadingDiagnostics(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>Workout proof</Text>
        <Text accessibilityRole="header">Undo proof — preserve rest and entered values</Text>
        {proof ? (
          <>
            <Text>{saved
              ? (saved.plannedSetsRecorded ? 'Planned sets recorded' :
                'Current draft ' + saved.setNumber + '/3: ' + saved.pounds + ' lb × ' + saved.reps + ' reps')
              : 'No session started.'}</Text>
            {saved?.sets.map(set => (
              <View key={set.setID}>
                <Text>Set {set.number}: {set.completed ? 'Saved' : 'Draft'} {set.pounds} lb × {set.reps}</Text>
                <Text>Plan: {set.plannedPounds} lb × {set.plannedReps}</Text>
              </View>
            ))}
            <Text>Saved records: {saved?.recordCount ?? 0}</Text>
            <Text>Complete requests received: {saved?.completionAttempts ?? 0}</Text>
            <Text>Rest: {saved?.restState === 'running'
              ? saved.restRemainingSeconds + ' seconds remaining'
              : saved?.restState === 'skipped' ? 'Skipped'
              : saved?.restState === 'expired' ? 'Expired (0 seconds)'
              : 'Not started'}</Text>
            {saved && <Text>Rest screen: {saved.awaitingContinue ? 'Awaiting Continue' : 'Dismissed / no rest'}</Text>}
            {saved?.restContinuedAt != null && <Text>Continued at: {saved.restContinuedAt}</Text>}
            {saved?.restUndoneAt != null && <Text>Set returned to draft at: {saved.restUndoneAt}</Text>}
            {saved?.restDeadline != null && <Text>Rest deadline: {saved.restDeadline}</Text>}
            <Button
              title={saved && (!saved.completed || saved.awaitingContinue) ? 'Show Live Activity' : 'Start three-set proof'}
              onPress={() => void act('start')}
              disabled={busy || (saved?.completed === true && !saved.awaitingContinue)}
            />
            <Button title="Reset proof data" disabled={busy || !saved} onPress={() => {
              Alert.alert('Reset fictional data?', 'This removes all fictional proof sets/rest, including migrated proof data, and ends its Live Activity.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', style: 'destructive', onPress: () => void act('reset') },
              ]);
            }} />
          </>
        ) : <Text>Install the signed iPhone proof to use the Live Activity.</Text>}
        {!!message && <Text accessibilityRole="alert">{message}</Text>}
        <View style={styles.diagnostics}>
          <Text accessibilityRole="header">Publication snapshot (manual, legacy D1 support)</Text>
          <Text>Historical D1 evidence is recorded in project documents. Continue no longer uses staleness for layout.</Text>
          <Button title="Read publication diagnostics" onPress={() => void inspectPublication()}
            disabled={!proof || readingDiagnostics} />
          {diagnostics?.length === 0 && <Text>No active Live Activity to inspect.</Text>}
          {diagnostics?.map((item, index) => (
            <View key={index} style={styles.diagnostics}>
              <Text selectable>Publication #{item.publicationID ?? 'unknown (older content)'} · Set {item.setNumber ?? '?'}</Text>
              <Text selectable>Submitted at: {diagnosticTime(item.publicationTime)}</Text>
              <Text selectable>Published staleDate: {diagnosticTime(item.publishedStaleDate)}</Text>
              <Text selectable>Saved deadline in this publication: {diagnosticTime(item.savedRestDeadline)}</Text>
              <Text>Save failure displayed: {item.saveFailed ? 'yes' : 'no'}</Text>
            </View>
          ))}
          {!!diagnosticMessage && <Text accessibilityRole="alert">{diagnosticMessage}</Text>}
          <Text>UTC timestamps, not display times. This reads current ActivityKit content, not fresh database values. The panel stays unchanged until manually read again.</Text>
          <Text>The on-screen stale flag depends on rendering; it cannot independently timestamp an internal system event.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 14 },
  title: { fontSize: 28, fontWeight: '700' },
  diagnostics: { gap: 8 },
});
