import { requireOptionalNativeModule } from 'expo';
import { useEffect, useRef, useState } from 'react';
import { Alert, AppState, Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Snapshot = {
  pounds: number;
  reps: number;
  completed: boolean;
  completionAttempts: number;
  recordCount: number;
};

type ProofModule = {
  start(): Promise<Snapshot>;
  read(): Promise<Snapshot | null>;
  reset(): Promise<void>;
};

const proof = Platform.OS === 'ios' ? requireOptionalNativeModule<ProofModule>('LockScreenProof') : null;

export default function App() {
  const [saved, setSaved] = useState<Snapshot | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>Workout proof</Text>
        {proof ? (
          <>
            <Text>{saved
              ? (saved.completed ? 'Saved set: ' : 'Draft: ') + saved.pounds + ' lb × ' + saved.reps + ' reps'
              : 'No session started.'}</Text>
            <Text>Saved records: {saved?.recordCount ?? 0}</Text>
            <Text>Complete requests received: {saved?.completionAttempts ?? 0}</Text>
            <Button
              title={saved && !saved.completed ? 'Show Live Activity' : 'Start fictional set'}
              onPress={() => void act('start')}
              disabled={busy || saved?.completed === true}
            />
            <Button title="Reset proof data" disabled={busy || !saved} onPress={() => {
              Alert.alert('Reset fictional data?', 'This removes the proof set and ends its Live Activity.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', style: 'destructive', onPress: () => void act('reset') },
              ]);
            }} />
          </>
        ) : <Text>Install the signed iPhone proof to use the Live Activity.</Text>}
        {!!message && <Text accessibilityRole="alert">{message}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 14 },
  title: { fontSize: 28, fontWeight: '700' },
});
