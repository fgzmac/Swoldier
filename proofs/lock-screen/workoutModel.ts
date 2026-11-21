import type { RoutineModule } from './RoutineEditor';
export type WorkoutSet={setID:string;number:number;exerciseID:string;isAdded:boolean;plannedPounds:number|null;plannedReps:number|null;pounds:number|null;reps:number|null;rir?:number|null;completed:boolean;completionAttempts:number;skippedAt?:number|null;skipToken?:string|null;editRevision?:number};
export type Snapshot={startRequestID?:string|null;sessionID:string;routineID:string|null;routineName:string|null;routineRevision:number|null;actionToken?:string;startedAt?:number|null;setID:string;restID:string;exerciseID:string;exerciseName:string;exerciseNumber:number;exerciseCount:number;setNumber:number;setCount:number;sets:WorkoutSet[];exercises:{exerciseID:string;name:string;sourceExerciseID?:string|null;number:number;finishedAt:number|null}[];workoutFinished:boolean;finishedAt:number|null;recordCount:number;completionAttempts:number;restState:string;restDeadline:number|null;restContinuedAt:number|null;awaitingContinue:boolean;restUndoneAt:number|null;undoSkipToken?:string|null};
export type ProofModule=RoutineModule & {calendarDays():Promise<string>;saveCalendarDay(day:string,revision:number,document:string):Promise<void>;start():Promise<Snapshot>;resumeWorkout(sessionID:string):Promise<Snapshot>;read():Promise<Snapshot|null>;reset():Promise<void>;editWorkoutSet(json:string):Promise<Snapshot>;deleteCompletedWorkout(sessionID:string):Promise<void>;workoutHistory():Promise<Snapshot[]>;routineSchedule():Promise<string>;assignRoutineDay(day:string,id:string|null):Promise<void>};
export function localDay(date:Date):string{return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function weekDays(offset=0,now=new Date()):Date[]{const start=new Date(now.getFullYear(),now.getMonth(),now.getDate());start.setDate(start.getDate()-((start.getDay()+6)%7)+offset*7);return Array.from({length:7},(_,i)=>new Date(start.getFullYear(),start.getMonth(),start.getDate()+i));}
export function setLink(url:string):{sessionID:string;setID:string}|null{try{const parsed=new URL(url);if(parsed.protocol!=='swoldier-proof:'||parsed.hostname!=='set')return null;const sessionID=parsed.searchParams.get('session'),setID=parsed.searchParams.get('set');return sessionID&&setID?{sessionID,setID}:null;}catch{return null;}}

export function setForLink(snapshot:Snapshot|null,target:{sessionID:string;setID:string}):{snapshot:Snapshot;set:WorkoutSet}{
 const set=snapshot?.sets.find(s=>s.setID===target.setID);
 if(!snapshot||snapshot.sessionID!==target.sessionID||!set)throw Error('This link belongs to an older workout. Open its summary instead.');
 if(set.skippedAt!=null)throw Error('Undo this skip on the Lock Screen before editing.');
 return {snapshot,set};
}

type Slot="Any time"|"Morning"|"Afternoon"|"Night";
type Child={id:string;label:string;checked:boolean};
export type Item={id:string;kind:'routine'|'supplements'|'water';name:string;slot:Slot;children:Child[];routineID?:string;oz?:number};
export type Agenda={goal:number|null;items:Item[]};
export function calendarProgress(agenda:Agenda,workouts:Snapshot[]){
 const waters=agenda.items.filter(i=>i.kind==='water');
 const sum=(items:Item[])=>items.reduce((s,i)=>s+Math.round((i.oz??0)*100),0)/100;
 const total=sum(waters.filter(i=>i.children[0].checked)),goal=agenda.goal??sum(waters),waterDone=waters.length>0&&total>=goal;
 const session=(i:Item)=>workouts.find(w=>w.startRequestID===i.id);
 const complete=(i:Item)=>i.kind==='routine'?!!session(i)?.workoutFinished:i.kind==='water'?waterDone:i.children.length>0&&i.children.every(c=>c.checked);
 const done=agenda.items.length>0&&agenda.items.every(complete);
 return {waters,total,goal,waterDone,session,complete,done};
}

export const dailyQuotes=[
 "Make room for one useful step today.","A small session still counts.","Build a routine you can return to.","Give today's effort your attention.","Progress can be quiet and still matter.","Keep the next step simple.","Your pace can change; your goal can stay.","Show up for the habits you want to keep.","Recovery is part of making progress.","Let consistency grow one day at a time."
];
export function quoteForDay(day:string){const ordinal=Math.floor(Date.parse(day+'T00:00:00Z')/86400000);return dailyQuotes[(ordinal%dailyQuotes.length+dailyQuotes.length)%dailyQuotes.length];}

export type GoalPeriod='Weekly'|'Monthly'|'Yearly';
export function goalPeriodRange(period:GoalPeriod,day:string){
 const start=new Date(day+'T00:00:00');
 if(period==='Weekly')start.setDate(start.getDate()-(start.getDay()+6)%7);
 else if(period==='Monthly')start.setDate(1);
 else start.setMonth(0,1);
 const end=new Date(start);
 if(period==='Weekly')end.setDate(end.getDate()+7);
 else if(period==='Monthly')end.setMonth(end.getMonth()+1);
 else end.setFullYear(end.getFullYear()+1);
 return {start,end};
}
export function periodCompletions(workouts:Snapshot[],period:GoalPeriod,day:string){
 const {start,end}=goalPeriodRange(period,day);
 return new Set(workouts.filter(w=>w.workoutFinished&&w.finishedAt!=null&&w.finishedAt*1000>=+start&&w.finishedAt*1000<+end).map(w=>w.sessionID)).size;
}
