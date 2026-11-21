import {Text,midnight} from './Midnight';
import {useState,useEffect,useRef} from 'react';
import {View,TextInput,Pressable,type ButtonProps} from 'react-native';
import type {Plan} from './routineModel';
import {type Snapshot,type GoalPeriod,periodCompletions,goalPeriodRange,localDay} from './workoutModel';
export type OrganizerAPI={organizer(key:string):Promise<string>;saveOrganizer(key:string,v:number,json:string):Promise<void>;newRoutineStartRequest():Promise<string>};
export function Action({title,onPress,disabled,color,accessibilityLabel}:ButtonProps){return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel??title} accessibilityState={{disabled:!!disabled}} disabled={disabled} onPress={onPress} style={({pressed})=>({borderWidth:1.5,borderRadius:9,borderColor:'#3A4961',backgroundColor:pressed?'#354963':'#273246',minHeight:44,padding:8,justifyContent:'center',alignItems:'center',opacity:disabled ? 0.5 : 1})}><Text style={{color:color??'#F1F4FA',fontWeight:'600'}}>{title}</Text></Pressable>}
const box={padding:12,gap:8,borderWidth:2,borderColor:'#3A4961',borderRadius:12,backgroundColor:'#273246'};
function useSection<T>(api:OrganizerAPI,key:string,initial:T){
 const [value,V]=useState(initial),[rev,R]=useState(-1),[error,E]=useState(''),[busy,B]=useState(false);const lock=useRef(false);
 async function load(){const rows:string[][]=JSON.parse(await api.organizer(key));V(rows.length?JSON.parse(rows[0][1]):initial);R(rows.length?Number(rows[0][0]):0);E('');}
 useEffect(()=>{void load().catch(e=>E(String(e)));},[]);
 async function save(next:T){if(lock.current||rev<0)return false;lock.current=true;B(true);try{await api.saveOrganizer(key,rev,JSON.stringify(next));V(next);R(rev+1);return true;}catch(e){R(-1);E(String(e));return false;}finally{lock.current=false;B(false)}}
 return {value,save,busy:busy||rev<0,feedback:error?<View><Text accessibilityRole="alert">{error}</Text><Action title="Reload saved data" onPress={()=>void load().catch(e=>E(String(e)))}/></View>:null};
}
const blank={title:'',type:'Metric',unit:'',target:'',baseline:'',current:'',due:'',notes:''};
type Goal=typeof blank & {id:string;archived:boolean};
type Check={goal:string;date:string;value:string;unit:string};
type Scan={date:string;source:string;fat:string;rmr:string;lean:string;provider?:'bodyspec-demo';resultID?:string};
const demoScans:Scan[]=[
 {provider:'bodyspec-demo',resultID:'sample-a',source:'BodySpec (fictional)',date:'2026-11-18',fat:'23.4',lean:'120.5',rmr:'1512'},
 {provider:'bodyspec-demo',resultID:'sample-b',source:'BodySpec (fictional)',date:'2026-11-18',fat:'23.1',lean:'121',rmr:''},
];
const scanFields={
 date:'Measurement date (YYYY-MM-DD)',source:'Measurement source',fat:'Body fat (%)',
 lean:'Lean mass (lb)',rmr:'Estimated RMR (kcal/day)',
} as const;
const scanKeys=['date','source','fat','lean','rmr'] as const;
type Journal={targets?:Partial<Record<GoalPeriod,number>>;goals:Goal[];checks:Check[];scans:Scan[]};
const dateOK=(s:string)=>/^\d{4}-\d\d-\d\d$/.test(s)&&localDay(new Date(s+'T12:00:00'))===s;
const numeric=(s:string)=>/^\d+(\.\d+)?$/.test(s)&&Number.isFinite(Number(s));
function field(label:string,value:string,change:(v:string)=>void){return <View key={label}><Text>{label}</Text><TextInput accessibilityLabel={label} value={value} onChangeText={change} style={{color:midnight.text,minHeight:44,borderWidth:1,borderRadius:8,padding:9}}/></View>}
function PeriodButton({title,selected,onPress,disabled}:{title:GoalPeriod;selected:boolean;onPress:()=>void;disabled:boolean}){
 return <Pressable accessibilityRole="tab" accessibilityState={{selected,disabled}} disabled={disabled} onPress={onPress}
   style={{flexGrow:1,flexBasis:82,minHeight:44,paddingHorizontal:6,alignItems:'center',justifyContent:'center',borderRadius:8,backgroundColor:selected?'#405879':'transparent'}}>
   <Text style={{color:selected?midnight.text:midnight.muted,fontWeight:'600'}}>{title}</Text>
 </Pressable>;
}
export function Tracker({api,workouts,day}:{api:OrganizerAPI;workouts:Snapshot[];day:string}){
 const {value:j,save,busy,feedback}=useSection<Journal>(api,'accountability',{goals:[],checks:[],scans:[]});
 const [open,O]=useState(false),[form,F]=useState<Goal|null>(null),[check,C]=useState<Check|null>(null),[scan,S]=useState<Scan|null>(null),[error,E]=useState('');
 const importing=scan?.provider==='bodyspec-demo';
 const alreadyImported=importing && j.scans.some(saved=>saved.provider===scan.provider && saved.resultID===scan.resultID);
 function clear(){F(null);C(null);S(null);E('');}
 async function submit(){let next:Journal;
 if(form){if(!form.title.trim()||!form.target.trim()||(form.due&&!dateOK(form.due))||(form.type==='Metric'&&(!form.unit.trim()||![form.target,form.baseline,form.current].every(v=>!v||numeric(v))))){E('Enter a title, target or habit criterion, valid metric values and unit, and a valid date if used.');return;}
 next={...j,goals:[...j.goals.filter(g=>g.id!==form.id),form]};}
 else if(check){if(!dateOK(check.date)||!check.value.trim()||(j.goals.find(g=>g.id===check.goal)?.type==='Metric'&&!numeric(check.value))){E('Enter a valid date and observed result.');return;}next={...j,checks:[...j.checks,check]};}
 else if(scan){if(alreadyImported)return;
 if(!dateOK(scan.date)||!scan.source.trim()||![scan.fat,scan.rmr,scan.lean].some(Boolean)||![scan.fat,scan.rmr,scan.lean].every(s=>!s||numeric(s))||Number(scan.fat)>100){E('Enter a date, source and at least one valid measurement (body fat 0–100%).');return;}next={...j,scans:[...j.scans,scan]};}else return;
 if(await save(next))clear();}
 const [period,periodTo]=useState<GoalPeriod>('Weekly'),[editing,setEditing]=useState(false),[input,setInput]=useState(''),[targetError,setTargetError]=useState('');
 const {start,end}=goalPeriodRange(period,day);
 const formatDate=(d:Date)=>d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
 const range=formatDate(start)+' – '+formatDate(new Date(end.getTime()-1));
 const goal=j.targets?.[period],count=periodCompletions(workouts,period,day);
 async function setTarget(remove=false){
   const targets={...j.targets}; const number=Number(input.trim());
   if(remove)delete targets[period];
   else if(/^\d+$/.test(input.trim())&&Number.isSafeInteger(number)&&number>=1)targets[period]=number;
   else {setTargetError('Enter a whole number of at least 1.');return;}
   if(await save({...j,targets})){setEditing(false);setTargetError('');}
 }
 return <View style={{paddingHorizontal:5,gap:9}}><Text style={{fontSize:20,fontWeight:'700'}}>Workout goals</Text>
 <View accessibilityRole="tablist" style={{flexDirection:'row',flexWrap:'wrap',padding:3,gap:3,borderRadius:10,backgroundColor:midnight.surface}}>{(['Weekly','Monthly','Yearly'] as const).map(p=><PeriodButton key={p} title={p} selected={p===period} disabled={busy} onPress={()=>{periodTo(p);setEditing(false);setTargetError('')}}/>)}</View>
 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
 <Text style={{fontSize:19,fontWeight:'700'}}>{goal?count+' / '+goal+' workouts'+(count>=goal?' · ✓ Goal met':''):count+' completed workouts'}</Text><Text style={{color:midnight.muted,fontSize:13}}>{range}</Text></View>
 {goal!=null&&<View accessible={false} style={{height:5,backgroundColor:midnight.divider,borderRadius:3}}><View style={{width:`${Math.min(100,100*count/goal)}%`,height:5,backgroundColor:midnight.selected,borderRadius:3}}/></View>}
 {editing?<>{field(period+' workout target',input,setInput)}{!!targetError&&<Text>{targetError}</Text>}<Action title="Save goal" disabled={busy} onPress={()=>void setTarget()}/>{goal!=null&&<Action title="Remove goal" disabled={busy} onPress={()=>void setTarget(true)}/>}<Action title="Cancel" onPress={()=>setEditing(false)}/></>:<Action title={goal?'Edit target':'Set goal'} disabled={busy} onPress={()=>{setInput(goal?.toString()??'');setEditing(true)}}/>}
 {feedback}<Action title={(open?'▾':'▸')+' Accountability · '+j.goals.filter(g=>!g.archived).length+' active goals'} onPress={()=>O(!open)}/>{open&&<>
 {j.goals.map(g=><View key={g.id} style={box}><Text style={{fontWeight:'700'}}>{g.title}{g.archived?' · Archived':''}</Text><Text>{g.type==='Habit'?'Criterion':'Target'} · {g.target} {g.unit} {g.due}</Text>{!!g.baseline&&<Text>Baseline · {g.baseline} {g.unit}</Text>}{!!g.current&&<Text>Initial observation · {g.current} {g.unit}</Text>}{!!g.notes&&<Text>{g.notes}</Text>}
 {j.checks.filter(c=>c.goal===g.id).sort((a,b)=>a.date.localeCompare(b.date)).map((c,n)=><Text key={n}>{c.date} · {c.value} {c.unit}</Text>)}
 {!g.archived&&!form&&!check&&!scan&&<><Action title="Check in" disabled={busy} onPress={()=>C({goal:g.id,date:localDay(new Date()),value:'',unit:g.unit})}/><Action title="Edit goal" disabled={busy} onPress={()=>F({...g})}/><Action title="Archive goal" disabled={busy} onPress={()=>void save({...j,goals:j.goals.map(x=>x.id===g.id?{...x,archived:true}:x)})}/></>}</View>)}
 {j.scans.map((s,n)=><View key={n} style={box}><Text>{s.date} · {s.source}</Text>{!!s.fat&&<Text>Body fat · {s.fat}%</Text>}{!!s.rmr&&<Text>Estimated RMR · {s.rmr} kcal/day</Text>}{!!s.lean&&<Text>Lean mass · {s.lean} lb</Text>}</View>)}
 {!form&&!scan&&!check&&<><Action title="Add goal" disabled={busy} onPress={()=>void api.newRoutineStartRequest().then(id=>F({...blank,id,archived:false})).catch(e=>E(String(e)))}/><Action title="Record scan" disabled={busy} onPress={()=>S({date:localDay(new Date()),source:'',fat:'',rmr:'',lean:''})}/>
 <Action title="Import fictional BodySpec scan" disabled={busy} onPress={()=>S(demoScans[0])}/></>}
 {form&&<>{['Metric','Habit'].map(t=><Action key={t} title={t} disabled={t===form.type} onPress={()=>F({...form,type:t,unit:''})}/>)}{(['title',...(form.type==='Metric'?['unit']:[]),'target','baseline','current','due','notes'] as (keyof typeof blank)[]).map(k=>field(({title:'Goal title',target:form.type==='Habit'?'Habit criterion':'Target value',unit:'Unit',baseline:'Baseline (optional)',current:'Current value (optional)',due:'Target date (YYYY-MM-DD, optional)',notes:'Notes (optional)',type:'Type'})[k],form[k],v=>F({...form,[k]:v})))}</>}
 {check&&<>{field('Check-in date (YYYY-MM-DD)',check.date,date=>C({...check,date}))}{field('Observed result',check.value,value=>C({...check,value}))}</>}
 {importing&&<View style={box}>
   <Text style={{fontWeight:'700'}}>Preview fictional BodySpec scan</Text>
   <View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>
     {demoScans.map((sample,i)=><Action key={sample.resultID} title={`Sample ${i+1}`}
       disabled={busy||sample.resultID===scan.resultID} onPress={()=>S(sample)}/>)}
   </View>
   {scanKeys.map(key=><View key={key}><Text style={{color:midnight.muted}}>{scanFields[key]}</Text>
     <Text>{scan[key]}</Text></View>)}
   {alreadyImported&&<Text>This scan is already in your journal.</Text>}
 </View>}
 {scan&&!importing&&scanKeys.map(key=>field(scanFields[key],scan[key],value=>S({...scan,[key]:value})))}
 {(form||check||scan)&&<>
   <Action title={importing?'Save scan':'Save'} disabled={busy||alreadyImported} onPress={()=>void submit()}/>
   <Action title="Cancel" disabled={busy} onPress={clear}/>
 </>}
 {!!error&&<Text accessibilityRole="alert">{error}</Text>}</>}</View>
}
type Group={id:string;name:string;members:string[]};
export function Groups({api,plans,render}:{api:OrganizerAPI;plans:Plan[];render:(p:Plan)=>React.ReactNode}){
 const {value:groups,save,busy,feedback}=useSection<Group[]>(api,'groups',[]);const [manage,M]=useState(false),[open,O]=useState<Record<string,boolean>>({}),[edit,E]=useState<string|null>(null),[name,N]=useState(''),[move,V]=useState(''),[error,X]=useState('');
 function swap<T>(arr:T[],n:number,d:number){const a=[...arr];[a[n],a[n+d]]=[a[n+d],a[n]];return a;}
 async function rename(){if(!name.trim()){X('Enter a group name');return;}try{const id=edit||await api.newRoutineStartRequest();if(await save(edit?groups.map(g=>g.id===edit?{...g,name:name.trim()}:g):[...groups,{id,name:name.trim(),members:[]}])){E(null);X('')}}catch(e){X(String(e))}}
 const used=new Set(groups.flatMap(g=>g.members));const all=[...groups,{id:'ungrouped',name:'Main list',members:plans.filter(p=>!used.has(p.id!)).map(p=>p.id!)}];
 return <View style={{gap:8}}><Action title={manage?'Done organizing':'Organize routines'} onPress={()=>M(!manage)}/>{manage&&<Action title="Create group" disabled={busy} onPress={()=>{E('');N('')}}/>}
 {manage&&edit!==null&&<>{field('Group name',name,N)}<Action title="Save group" disabled={busy} onPress={()=>void rename()}/><Action title="Cancel" onPress={()=>E(null)}/></>}
 {all.map((g,index)=>{const members=g.members.filter(id=>plans.some(p=>p.id===id));return <View key={g.id} style={g.id==='ungrouped'?{gap:8}:box}>{g.id!=='ungrouped'&&<Action title={(open[g.id]?'▾ ':'▸ ')+g.name+' · '+members.length} onPress={()=>O({...open,[g.id]:!open[g.id]})}/>}
 {manage&&g.id!=='ungrouped'&&<><Action title="Rename" onPress={()=>{E(g.id);N(g.name)}}/>{[-1,1].map(d=><Action key={d} title={d<0?'Group up':'Group down'} disabled={busy||index+d<0||index+d>=groups.length} onPress={()=>void save(swap(groups,index,d))}/>)}<Action title="Remove group · keep routines" disabled={busy} onPress={()=>void save(groups.filter(x=>x.id!==g.id))}/></>}
 {(g.id==='ungrouped'||open[g.id])&&members.map((id,n)=><View key={id}>{render(plans.find(p=>p.id===id)!)}{manage&&<><Action title="Move routine" disabled={busy} onPress={()=>V(move===id?'':id)}/>{g.id!=='ungrouped'&&[-1,1].map(d=><Action key={d} title={d<0?'Earlier':'Later'} disabled={busy||n+d<0||n+d>=members.length} onPress={()=>void save(groups.map(x=>x.id===g.id?{...x,members:swap(members,n,d)}:x))}/>)}{move===id&&all.filter(x=>x.id!==g.id).map(dest=><Action key={dest.id} title={'To '+dest.name} disabled={busy} onPress={()=>void save(groups.map(x=>({...x,members:[...x.members.filter(r=>r!==id),...(dest.id===x.id?[id]:[])]}))).then(ok=>{if(ok)V('')})}/>)}</>}</View>)}</View>})}{!!error&&<Text>{error}</Text>}{feedback}</View>
}
