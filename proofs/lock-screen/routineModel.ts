export type Exercise = { id: string; name: string };
export type PlanSet = { pounds?: number | null; reps?: number | null };
export type PlanEntry = { exerciseID: string; trackRest?: boolean; restSeconds?: number | null; restSecondsInput?: string; sets: PlanSet[] };
export type Plan = { id?: string | null; revision: number; name: string; exercises: PlanEntry[] };
export type Library = { exercises: Exercise[]; routines: Plan[] };
export type EditSet = { pounds: string; reps: string };
export type EditEntry = { exerciseID: string; trackRest: boolean; restSeconds: string; sets: EditSet[] };
export type EditPlan = { id?: string | null; revision: number; name: string; exercises: EditEntry[] };
export const newPlan = (): EditPlan => ({ revision: 0, name: '', exercises: [] });
export const newEntry = (exerciseID: string): EditEntry => ({
  exerciseID, trackRest: true, restSeconds: '', sets: Array.from({ length: 3 }, () => ({ pounds: '', reps: '' })),
});
export function editPlan(plan: Plan): EditPlan {
  return { ...plan, exercises: plan.exercises.map(entry => ({ ...entry,
    trackRest: entry.trackRest ?? true, // Old saved entries always tracked rest.
    restSeconds: entry.restSecondsInput ?? (entry.restSeconds == null ? '' : String(entry.restSeconds)),
    sets: entry.sets.map(set => ({ pounds: set.pounds == null ? '' : String(set.pounds), reps: set.reps == null ? '' : String(set.reps) })),
  })) };
}
export function moveEntry(plan: EditPlan, index: number, delta: number): EditPlan {
  const target = index + delta;
  if (target < 0 || target >= plan.exercises.length) return plan;
  const exercises = [...plan.exercises];
  if(index<0||index>=exercises.length||target===index)return plan;
  exercises.splice(target,0,exercises.splice(index,1)[0]);
  return { ...plan, exercises };
}
export function validName(value: string): string {
  const name = value.trim();
  const points = Array.from(name);
  // Swift/JSON cannot represent lone UTF-16 surrogates; reject them before saving.
  const malformed = points.some(point => { const code = point.codePointAt(0)!; return code >= 0xd800 && code <= 0xdfff; });
  if (!name || points.length > 80 || malformed || /[\u0000-\u001f\u007f-\u009f]/.test(name)) throw Error('Enter a name of 1–80 characters without line breaks.');
  return name;
}
// Only this explicit native outcome is an expected Start refusal. Do not sanitize
// arbitrary exception messages or silently treat an unknown rejection as success.
export function routineStartNotice(result: unknown): string | null {
  if (typeof result === 'object' && result !== null && 'startRejection' in result) {
    if (result.startRejection === 'workout_unfinished') {
      return 'A workout is already in progress. Go back to resume it. Your workout has not changed.';
    }
    throw Error(`Unrecognized Start rejection: ${String(result.startRejection)}`);
  }
  return null;
}
export function numberField(value: string, label: string, max: number, decimal = false, required = false): number | null {
  const text = value.trim();
  if (!text && !required) return null;
  const format = decimal ? /^\d+(\.\d{1,2})?$/ : /^\d+$/;
  if (!format.test(text) || !Number.isFinite(Number(text)) || Number(text) > max) {
    throw Error(`${label}: ${required ? 'enter' : 'leave blank or enter'} ${decimal ? 'a number with up to two decimals' : 'a whole number'} from 0 to ${max}.`);
  }
  return Number(text);
}
export function toPlan(draft: EditPlan): Plan {
  if (draft.exercises.length > 30) throw Error('Use at most 30 exercises.');
  const seen = new Set<string>();
  return { id: draft.id, revision: draft.revision, name: validName(draft.name), exercises: draft.exercises.map((entry, index) => {
    if (seen.has(entry.exerciseID)) throw Error('Use each exercise once per routine in this proof.');
    seen.add(entry.exerciseID);
    if (typeof entry.trackRest !== 'boolean') throw Error('Choose whether to track rest.');
    if (entry.sets.length < 1 || entry.sets.length > 20) throw Error('Use 1–20 planned sets per exercise.');
    return { exerciseID: entry.exerciseID, trackRest: entry.trackRest,
      // Keep raw text across off/on and save/reopen; disabled text is not a duration.
      restSecondsInput: entry.restSeconds,
      restSeconds: entry.trackRest ? numberField(entry.restSeconds, `Exercise ${index + 1} rest seconds`, 3600, false, true)! : null,
      sets: entry.sets.map((set, n) => ({
        pounds: numberField(set.pounds, `Exercise ${index + 1}, set ${n + 1} pounds`, 2000, true),
        reps: numberField(set.reps, `Exercise ${index + 1}, set ${n + 1} reps`, 1000),
      })),
    };
  }) };
}
