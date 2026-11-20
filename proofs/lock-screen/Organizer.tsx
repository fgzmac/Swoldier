import {useState,useEffect,useRef} from 'react';
import {View,Text,TextInput,Pressable,type ButtonProps} from 'react-native';
import type {Plan} from './routineModel';
import {localDay} from './workoutModel';
export type OrganizerAPI={organizer(key:string):Promise<string>;saveOrganizer(key:string,v:number,json:string):Promise<void>;newRoutineStartRequest():Promise<string>};
export function Action({title,onPress,disabled,color,accessibilityLabel}:ButtonProps){return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel??title} accessibilityState={{disabled:!!disabled}} disabled={disabled} onPress={onPress} style={({pressed})=>({borderWidth:1.5,borderRadius:9,borderColor:'#64796b',backgroundColor:pressed?'#cdddcf':'#edf2eb',minHeight:44,padding:8,justifyContent:'center',alignItems:'center',opacity:disabled ? 0.5 : 1})}><Text style={{color:color??'#214935',fontWeight:'600'}}>{title}</Text></Pressable>}
const box={padding:12,gap:8,borderWidth:2,borderColor:'#607566',borderRadius:12,backgroundColor:'#fffdf8'};
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
type Scan={date:string;source:string;fat:string;rmr:string;lean:string};
type Journal={goals:Goal[];checks:Check[];scans:Scan[]};
const dateOK=(s:string)=>/^\d{4}-\d\d-\d\d$/.test(s)&&localDay(new Date(s+'T12:00:00'))===s;
const numeric=(s:string)=>/^\d+(\.\d+)?$/.test(s)&&Number.isFinite(Number(s));
function field(label:string,value:string,change:(v:string)=>void){return <View key={label}><Text>{label}</Text><TextInput accessibilityLabel={label} value={value} onChangeText={change} style={{minHeight:44,borderWidth:1,borderRadius:8,padding:9}}/></View>}
export function Tracker({api}:{api:OrganizerAPI}){
 const {value:j,save,busy,feedback}=useSection<Journal>(api,'accountability',{goals:[],checks:[],scans:[]});
 const [open,O]=useState(false),[form,F]=useState<Goal|null>(null),[check,C]=useState<Check|null>(null),[scan,S]=useState<Scan|null>(null),[error,E]=useState('');
 function clear(){F(null);C(null);S(null);E('');}
 async function submit(){let next:Journal;
 if(form){if(!form.title.trim()||!form.target.trim()||(form.due&&!dateOK(form.due))||(form.type==='Metric'&&(!form.unit.trim()||![form.target,form.baseline,form.current].every(v=>!v||numeric(v))))){E('Enter a title, target or habit criterion, valid metric values and unit, and a valid date if used.');return;}
 next={...j,goals:[...j.goals.filter(g=>g.id!==form.id),form]};}
 else if(check){if(!dateOK(check.date)||!check.value.trim()||(j.goals.find(g=>g.id===check.goal)?.type==='Metric'&&!numeric(check.value))){E('Enter a valid date and observed result.');return;}next={...j,checks:[...j.checks,check]};}
 else if(scan){if(!dateOK(scan.date)||!scan.source.trim()||![scan.fat,scan.rmr,scan.lean].some(Boolean)||![scan.fat,scan.rmr,scan.lean].every(s=>!s||numeric(s))||Number(scan.fat)>100){E('Enter a date, source and at least one valid measurement (body fat 0–100%).');return;}next={...j,scans:[...j.scans,scan]};}else return;
 if(await save(next))clear();}
 return <View style={box}><Action title={(open?'▾':'▸')+' Accountability · '+j.goals.filter(g=>!g.archived).length+' active goals'} onPress={()=>O(!open)}/>{open&&<>
 {j.goals.map(g=><View key={g.id} style={box}><Text style={{fontWeight:'700'}}>{g.title}{g.archived?' · Archived':''}</Text><Text>{g.type==='Habit'?'Criterion':'Target'} · {g.target} {g.unit} {g.due}</Text>{!!g.baseline&&<Text>Baseline · {g.baseline} {g.unit}</Text>}{!!g.current&&<Text>Initial observation · {g.current} {g.unit}</Text>}{!!g.notes&&<Text>{g.notes}</Text>}
 {j.checks.filter(c=>c.goal===g.id).sort((a,b)=>a.date.localeCompare(b.date)).map((c,n)=><Text key={n}>{c.date} · {c.value} {c.unit}</Text>)}
 {!g.archived&&!form&&!check&&!scan&&<><Action title="Check in" disabled={busy} onPress={()=>C({goal:g.id,date:localDay(new Date()),value:'',unit:g.unit})}/><Action title="Edit goal" disabled={busy} onPress={()=>F({...g})}/><Action title="Archive goal" disabled={busy} onPress={()=>void save({...j,goals:j.goals.map(x=>x.id===g.id?{...x,archived:true}:x)})}/></>}</View>)}
 {j.scans.map((s,n)=><View key={n} style={box}><Text>{s.date} · {s.source}</Text>{!!s.fat&&<Text>Body fat · {s.fat}%</Text>}{!!s.rmr&&<Text>Estimated RMR · {s.rmr} kcal/day</Text>}{!!s.lean&&<Text>Lean mass · {s.lean} lb</Text>}</View>)}
 {!form&&!scan&&!check&&<><Action title="Add goal" disabled={busy} onPress={()=>void api.newRoutineStartRequest().then(id=>F({...blank,id,archived:false})).catch(e=>E(String(e)))}/><Action title="Record scan" disabled={busy} onPress={()=>S({date:localDay(new Date()),source:'',fat:'',rmr:'',lean:''})}/></>}
 {form&&<>{['Metric','Habit'].map(t=><Action key={t} title={t} disabled={t===form.type} onPress={()=>F({...form,type:t,unit:''})}/>)}{(['title',...(form.type==='Metric'?['unit']:[]),'target','baseline','current','due','notes'] as (keyof typeof blank)[]).map(k=>field(({title:'Goal title',target:form.type==='Habit'?'Habit criterion':'Target value',unit:'Unit',baseline:'Baseline (optional)',current:'Current value (optional)',due:'Target date (YYYY-MM-DD, optional)',notes:'Notes (optional)',type:'Type'})[k],form[k],v=>F({...form,[k]:v})))}</>}
 {check&&<>{field('Check-in date (YYYY-MM-DD)',check.date,date=>C({...check,date}))}{field('Observed result',check.value,value=>C({...check,value}))}</>}
 {scan&&(['date','source','fat','rmr','lean'] as const).map(k=>field(({date:'Measurement date (YYYY-MM-DD)',source:'Measurement source',fat:'Body fat (%)',rmr:'Estimated RMR (kcal/day)',lean:'Lean mass (lb)'})[k],scan[k],v=>S({...scan,[k]:v})))}
 {(form||check||scan)&&<><Action title="Save" disabled={busy} onPress={()=>void submit()}/><Action title="Cancel" disabled={busy} onPress={clear}/></>}
 {!!error&&<Text accessibilityRole="alert">{error}</Text>}{feedback}</>}</View>
}
type Group={id:string;name:string;members:string[]};
export function Groups({api,plans,render}:{api:OrganizerAPI;plans:Plan[];render:(p:Plan)=>React.ReactNode}){
 const {value:groups,save,busy,feedback}=useSection<Group[]>(api,'groups',[]);const [manage,M]=useState(false),[open,O]=useState<Record<string,boolean>>({}),[edit,E]=useState<string|null>(null),[name,N]=useState(''),[move,V]=useState(''),[error,X]=useState('');
 function swap<T>(arr:T[],n:number,d:number){const a=[...arr];[a[n],a[n+d]]=[a[n+d],a[n]];return a;}
 async function rename(){if(!name.trim()){X('Enter a group name');return;}try{const id=edit||await api.newRoutineStartRequest();if(await save(edit?groups.map(g=>g.id===edit?{...g,name:name.trim()}:g):[...groups,{id,name:name.trim(),members:[]}])){E(null);X('')}}catch(e){X(String(e))}}
 const used=new Set(groups.flatMap(g=>g.members));const all=[...groups,{id:'ungrouped',name:'Ungrouped',members:plans.filter(p=>!used.has(p.id!)).map(p=>p.id!)}];
 return <View style={{gap:8}}><Action title={manage?'Done organizing':'Organize routines'} onPress={()=>M(!manage)}/>{manage&&<Action title="Create group" disabled={busy} onPress={()=>{E('');N('')}}/>}
 {manage&&edit!==null&&<>{field('Group name',name,N)}<Action title="Save group" disabled={busy} onPress={()=>void rename()}/><Action title="Cancel" onPress={()=>E(null)}/></>}
 {all.map((g,index)=>{const members=g.members.filter(id=>plans.some(p=>p.id===id));return <View key={g.id} style={box}><Action title={(open[g.id]?'▾ ':'▸ ')+g.name+' · '+members.length} onPress={()=>O({...open,[g.id]:!open[g.id]})}/>
 {manage&&g.id!=='ungrouped'&&<><Action title="Rename" onPress={()=>{E(g.id);N(g.name)}}/>{[-1,1].map(d=><Action key={d} title={d<0?'Group up':'Group down'} disabled={busy||index+d<0||index+d>=groups.length} onPress={()=>void save(swap(groups,index,d))}/>)}<Action title="Remove group · keep routines" disabled={busy} onPress={()=>void save(groups.filter(x=>x.id!==g.id))}/></>}
 {open[g.id]&&members.map((id,n)=><View key={id}>{render(plans.find(p=>p.id===id)!)}{manage&&<><Action title="Move routine" disabled={busy} onPress={()=>V(move===id?'':id)}/>{g.id!=='ungrouped'&&[-1,1].map(d=><Action key={d} title={d<0?'Earlier':'Later'} disabled={busy||n+d<0||n+d>=members.length} onPress={()=>void save(groups.map(x=>x.id===g.id?{...x,members:swap(members,n,d)}:x))}/>)}{move===id&&all.filter(x=>x.id!==g.id).map(dest=><Action key={dest.id} title={'To '+dest.name} disabled={busy} onPress={()=>void save(groups.map(x=>({...x,members:[...x.members.filter(r=>r!==id),...(dest.id===x.id?[id]:[])]}))).then(ok=>{if(ok)V('')})}/>)}</>}</View>)}</View>})}{!!error&&<Text>{error}</Text>}{feedback}</View>
}
