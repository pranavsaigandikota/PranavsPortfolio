import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RotateCcw, LayoutGrid, Flag, Shuffle, Volume2, VolumeX } from 'lucide-react';
import skillLogos from '../data/skillLogos.json';
import { generateCourse, createGolfBall, golfMoving, slingGolf, stepGolf } from './golfPhysics';
import { createGolfRenderer } from './golfRenderer';
import { loadGolfProgress, saveGolfProgress } from './golfProgress';

const randomSeed=()=>crypto.getRandomValues(new Uint32Array(1))[0];
const shuffled=items=>{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;};
function ScoreTicker({value}) {
  const current=useRef(0),[display,setDisplay]=useState(0);
  useEffect(()=>{let frame;const from=current.current,start=performance.now();const tick=time=>{const progress=Math.min(1,(time-start)/450);current.current=Math.round(from+(value-from)*(1-(1-progress)**3));setDisplay(current.current);if(progress<1) frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);},[value]);
  return <span>{display.toLocaleString()}</span>;
}
ScoreTicker.propTypes={value:PropTypes.number.isRequired};
export function SkillPhysicsField({ groups, children }) {
  const [saved]=useState(()=>{try{return loadGolfProgress(window.localStorage,new Set(groups.flatMap(group=>group.items.map(item=>item.title))));}catch{return null;}});
  const progressRef=useRef(saved),historyRef=useRef(saved?.history||[]);
  const hostRef=useRef(null),apiRef=useRef(null),earnedRef=useRef(new Set(saved?.collected||[])),soundRef=useRef(false),scoreRef=useRef(saved?.score||0),levelRef=useRef(saved?.level||0);
  const [desktop,setDesktop]=useState(false),[cards,setCards]=useState(false),[failed,setFailed]=useState(false);
  const [collected,setCollected]=useState(saved?.collected||[]),[info,setInfo]=useState(null),[power,setPower]=useState(0),[moving,setMoving]=useState(false),[sound,setSound]=useState(false);
  const [message,setMessage]=useState('Pull back from your skill ball, then release to putt.');
  const [score,setScore]=useState(saved?.score||0),[scoreEvent,setScoreEvent]=useState({id:0,points:0,label:saved?'Welcome back. Your run is saved.':'Your first trick shot starts here.'}),[combo,setCombo]=useState(0),[history,setHistory]=useState(saved?.history||[]),[fx,setFx]=useState({speed:0,cinematic:false}),[shake,setShake]=useState(0),[saveStatus,setSaveStatus]=useState('Progress saves in this browser');
  useEffect(()=>{
    const query=window.matchMedia('(min-width: 801px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update=()=>setDesktop(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);
  },[]);
  const enabled=desktop&&!cards&&!failed;
  useEffect(()=>{
    if(!enabled) return;
    const host=hostRef.current,canvas=document.createElement('canvas');let renderer;
    try {renderer=createGolfRenderer(canvas);}catch{setFailed(true);return;}
    canvas.tabIndex=0;canvas.setAttribute('role','application');canvas.setAttribute('aria-label','Skill mini golf. Drag backward from the skill ball and release to putt. Arrow keys aim and adjust power. Space shoots.');host.appendChild(canvas);
    const skills=groups.flatMap(group=>group.items.map(item=>({...item,color:group.themeColor,category:group.genre})));
    let course,ball,skill,pickups,level=levelRef.current,strokes=0,dragging=false,pull={x:0,y:0},angle=0,keyPower=1.3,particles=[],trail=[],flash=0,sinkTime=0,audio,chain=0,levelScore=0,lastFx=0,lastSave=0;
    const camera={zoom:1,x:11,y:5.5};
    let inView=false,frame=0,previous=0,accumulator=0,wasMoving=false,dirty=false;
    const persist=()=>{
      if(!course||!ball) return;
      const checkpoint={level,seed:course.seed,skill:skill.title,pickups:pickups.map(item=>item.title),ball:{...ball,stats:{...ball.stats}},strokes,score:scoreRef.current,levelScore,combo:chain,collected:[...earnedRef.current],history:[...historyRef.current],walls:course.walls.map(wall=>!!wall.broken),tokens:course.tokens.map(token=>!!token.collected)};
      progressRef.current=checkpoint;
      dirty=false;
      try {setSaveStatus(saveGolfProgress(window.localStorage,checkpoint)?'Progress saved in this browser':'Browser storage unavailable · progress lasts this visit');}catch{setSaveStatus('Progress lasts this visit');}
    };
    const collect=reward=>{if(earnedRef.current.has(reward.title)) return false;earnedRef.current.add(reward.title);setCollected([...earnedRef.current]);return true;};
    const award=(points,label,chainHit=false)=>{
      if(chainHit){chain=Math.min(chain+1,10);setCombo(chain);}
      const earned=Math.round(points*(1+Math.max(0,chain-1)*.15));scoreRef.current+=earned;levelScore+=earned;setScore(scoreRef.current);setScoreEvent(old=>({id:old.id+1,points:earned,label}));
    };
    const tone=(frequency,duration=.12)=>{
      if(!soundRef.current) return;
      try {audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.connect(gain);gain.connect(audio.destination);oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,audio.currentTime);oscillator.frequency.exponentialRampToValueAtTime(frequency*1.5,audio.currentTime+duration);gain.gain.setValueAtTime(.045,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);oscillator.start();oscillator.stop(audio.currentTime+duration);}catch{/* Sound remains optional when audio is unavailable. */}
    };
    const burst=(x,y,color,text,count=15)=>{
      for(let i=0;i<count;i++){const direction=Math.random()*Math.PI*2,speed=1+Math.random()*3;particles.push({x,y,vx:Math.cos(direction)*speed,vy:Math.sin(direction)*speed,life:.5+Math.random()*.4,maxLife:.9,size:.035+Math.random()*.045,color});}
      if(text) particles.push({x,y:y-.65,vx:0,vy:-.6,life:1.25,maxLife:1.25,color,text});
    };
    const publish=()=>setInfo({level,strokes,par:course.par,skill,complete:ball.sunk,seed:course.seed,trick:ball.stats.banks+ball.stats.boosts+ball.stats.warps+ball.stats.breaks>0});
    const load=(retry=false,advance=false)=>{
      if(!retry){level=level===0?1:advance?level+1:level;levelRef.current=level;const available=skills.filter(item=>!earnedRef.current.has(item.title));const deck=shuffled(available.length?available:skills);skill=deck[0];course=generateCourse(randomSeed(),level);pickups=course.tokens.map((_,index)=>deck[(index+1)%deck.length]);}
      else course=generateCourse(course.seed,level);
      ball=createGolfBall(course);strokes=0;dragging=false;pull={x:0,y:0};particles=[];trail=[];sinkTime=0;flash=0;angle=Math.atan2(course.route[1].y-ball.y,course.route[1].x-ball.x);wasMoving=false;accumulator=0;chain=0;levelScore=0;camera.zoom=1;camera.x=11;camera.y=5.5;setCombo(0);setFx({speed:0,cinematic:false});
      setPower(0);setMoving(false);setMessage(level===1?'Start simple: a short pull makes a soft putt. Aim for the flag.':'Pull back to putt. Each new hole raises the intensity.');publish();
      host.dataset.seed=String(course.seed);host.dataset.level=String(level);host.dataset.strokes='0';host.dataset.complete='false';host.dataset.moving='false';
      persist();
    };
    const launch=vector=>{if(slingGolf(ball,vector)){dirty=true;strokes++;chain=0;setCombo(0);setMoving(true);publish();tone(260,.09);setMessage('Bank it. Boost it. Smash through. Chase the flag.');host.dataset.strokes=String(strokes);trail=[];}};
    const getPoint=event=>{const rect=canvas.getBoundingClientRect();return {x:((event.clientX-rect.left)/rect.width*22-11)/camera.zoom+camera.x,y:((event.clientY-rect.top)/rect.height*11-5.5)/camera.zoom+camera.y};};
    const down=event=>{
      if(event.button!==0||golfMoving(ball)||ball.sunk) return;const point=getPoint(event);
      if(Math.hypot(point.x-ball.x,point.y-ball.y)>.8){setMessage('Start your drag on the skill ball. Pull backward to build power.');return;}
      dragging=true;pull={x:0,y:0};canvas.focus();canvas.setPointerCapture(event.pointerId);host.style.cursor='grabbing';
    };
    const move=event=>{if(!dragging) return;const point=getPoint(event);pull={x:point.x-ball.x,y:point.y-ball.y};setPower(Math.round(Math.min(1,Math.hypot(pull.x,pull.y)/3.25)*100));};
    const finish=event=>{if(!dragging) return;dragging=false;if(event.type==='pointerup') launch(pull);pull={x:0,y:0};setPower(0);host.style.cursor='crosshair';if(canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);};
    const keyboard=event=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(event.key)) return;event.preventDefault();if(golfMoving(ball)||ball.sunk) return;
      if(event.key==='ArrowLeft') angle-=Math.PI/36;if(event.key==='ArrowRight') angle+=Math.PI/36;
      if(event.key==='ArrowUp') keyPower=Math.min(3.25,keyPower+.25);if(event.key==='ArrowDown') keyPower=Math.max(.25,keyPower-.25);
      if(event.code==='Space'){dragging=false;launch({x:-Math.cos(angle)*keyPower,y:-Math.sin(angle)*keyPower});setPower(0);}
      else {dragging=true;pull={x:-Math.cos(angle)*keyPower,y:-Math.sin(angle)*keyPower};setPower(Math.round(keyPower/3.25*100));setMessage('← → aim · ↑ ↓ power · Space putts');}
    };
    const events=[['pointerdown',down],['pointermove',move],['pointerup',finish],['pointercancel',finish],['lostpointercapture',finish],['keydown',keyboard]];
    events.forEach(([name,handler])=>canvas.addEventListener(name,handler));
    const resizeObserver=new ResizeObserver(()=>renderer.resize(host.clientWidth,host.clientHeight));resizeObserver.observe(host);renderer.resize(host.clientWidth,host.clientHeight);
    const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;previous=0;},{rootMargin:'100px'});observer.observe(host);
    const onEvent=event=>{
      dirty=true;
      const {type,x,y}=event;host.dataset.lastEvent=type;
      if(type==='wall'){burst(x,y,'#d9c5a0',null,4);tone(150,.05);award(10,'Bank shot',true);}
      if(type==='boost'){burst(x,y,'#ffd27d','OVERDRIVE');flash=1;tone(580);award(50,'Boost hit',true);setMessage('Overdrive! High speed can smash interior walls.');}
      if(type==='bumper'){burst(x,y,'#f98da2','BOING');flash=1;tone(380);award(25,'Ninja rebound',true);setMessage('Bumper bounce! Use the rebound to your advantage.');}
      if(type==='portal'){burst(x,y,'#bd9afc','WARP');flash=.5;tone(720,.2);award(75,'Portal trick',true);setMessage('Portal jump. Momentum carries through.');trail=[];}
      if(type==='shatter'){burst(x,y,'#f19a83','WALL SMASH!',35);particles.slice(-36).forEach(p=>{if(!p.text){p.shard=true;p.size*=2;p.vx*=1.6;p.vy*=1.6;}});flash=2;tone(110,.2);award(150,'Wall smash',true);setShake(value=>value+1);setMessage('Wall smashed! The outer rails always keep you in bounds.');}
      if(type==='skill'){const reward=pickups[event.index];if(collect(reward)) award(150,`${reward.title} pickup`);burst(x,y,reward.color,`+ ${reward.title}`);tone(880);setMessage(`${reward.title} added to ${reward.category}.`);}
      if(type==='hole'){
        collect(skill);const trick=ball.stats.banks+ball.stats.boosts+ball.stats.warps+ball.stats.breaks>0;award(1000+Math.max(0,course.par-strokes)*250+(trick?300:0),trick?'Trick-shot finish':'Hole complete');burst(x,y,'#ffcf8b',strokes===1?'HOLE IN ONE!':trick?'TRICK SHOT!':'NICE PUTT!',65);tone(1040,.35);flash=2;setShake(value=>value+1);sinkTime=0;publish();historyRef.current=[{level,strokes,score:levelScore,skill:skill.title},...historyRef.current].slice(0,5);setHistory(historyRef.current);host.dataset.complete='true';setMessage(`${skill.title} collected. Ready for a new course?`);persist();
      }
    };
    const animate=time=>{
      frame=requestAnimationFrame(animate);const dt=previous?Math.min((time-previous)/1000,.04):0;previous=time;if(!inView||document.hidden) return;
      const speed=Math.hypot(ball.vx,ball.vy),nearCup=Math.hypot(ball.x-course.hole.x,ball.y-course.hole.y)<2.2;
      const cinematic=!ball.sunk&&nearCup&&speed>.05&&speed<7;
      accumulator+=dt*(cinematic?.32:1);while(accumulator>=1/120){stepGolf(ball,course,1/120,onEvent);accumulator-=1/120;}
      const targetZoom=cinematic||ball.sunk&&sinkTime<.8?1.35:1;camera.zoom+=(targetZoom-camera.zoom)*Math.min(1,dt*5);
      const halfWidth=11/camera.zoom,halfHeight=5.5/camera.zoom;camera.x=Math.max(halfWidth,Math.min(22-halfWidth,course.hole.x));camera.y=Math.max(halfHeight,Math.min(11-halfHeight,course.hole.y));
      if(time-lastFx>100){lastFx=time;setFx({speed:Math.round(speed),cinematic});host.dataset.cinematic=String(cinematic);host.dataset.speed=String(Math.round(speed));host.dataset.score=String(scoreRef.current);}
      const isMoving=golfMoving(ball);if(isMoving!==wasMoving){wasMoving=isMoving;setMoving(isMoving);if(!isMoving&&!ball.sunk) setMessage('Ball settled. Pull back for your next putt.');if(!isMoving) persist();}
      if(isMoving&&time-lastSave>1000){lastSave=time;persist();}
      if(isMoving){trail.push({x:ball.x,y:ball.y});if(trail.length>30) trail.shift();}else if(trail.length) trail.shift();
      particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;});particles=particles.filter(p=>p.life>0);flash=Math.max(0,flash-dt*3);if(ball.sunk) sinkTime+=dt;
      host.dataset.moving=String(isMoving);host.dataset.collected=String(earnedRef.current.size);
      renderer.draw({course,ball,skill,pickups,pull,dragging,time:time/1000,particles,trail,flash,sinkTime,camera});
    };
    const resume=progressRef.current;
    if(resume){
      course=generateCourse(resume.seed,resume.level);level=resume.level;skill=skills.find(item=>item.title===resume.skill);pickups=course.tokens.map((_,index)=>skills.find(item=>item.title===resume.pickups[index])||skills[index%skills.length]);
      ball={...createGolfBall(course),...resume.ball};strokes=resume.strokes;chain=resume.combo;levelScore=resume.levelScore;course.walls.forEach((wall,index)=>wall.broken=!!resume.walls[index]);course.tokens.forEach((token,index)=>token.collected=!!resume.tokens[index]);angle=Math.atan2(course.hole.y-ball.y,course.hole.x-ball.x);setCombo(chain);setMoving(golfMoving(ball));setMessage('Welcome back. Your course, score, and skills are restored.');publish();host.dataset.seed=String(course.seed);host.dataset.level=String(level);host.dataset.strokes=String(strokes);host.dataset.complete=String(ball.sunk);persist();
    }else load();
    host.dataset.mode='golf';host.dataset.ready='true';apiRef.current={next:()=>load(false,true),reroll:()=>load(),retry:()=>load(true)};frame=requestAnimationFrame(animate);
    const onLeave=()=>{if(dirty||golfMoving(ball)) persist();};window.addEventListener('pagehide',onLeave);
    return()=>{onLeave();cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();events.forEach(([name,handler])=>canvas.removeEventListener(name,handler));window.removeEventListener('pagehide',onLeave);canvas.remove();audio?.close();apiRef.current=null;};
  },[enabled,groups]);
  const total=groups.reduce((sum,group)=>sum+group.items.length,0);
  const toggleSound=()=>{soundRef.current=!soundRef.current;setSound(soundRef.current);};
  return <div className="sp-skills-interactive">
    {desktop&&!failed&&<div className="sp-physics-toolbar"><div><p>{cards?'Your toolkit, organized by discipline.':'Skill golf. Turn up the intensity.'}</p>{!cards&&<span className="sp-pool-meta">Pull back to putt · ← → aim · ↑ ↓ power · Space shoots</span>}</div><div>{!cards&&<><button onClick={()=>apiRef.current?.reroll()}><Shuffle size={14}/> New course</button><button onClick={()=>apiRef.current?.retry()} aria-label="Retry current hole"><RotateCcw size={14}/> Retry</button><button onClick={toggleSound} aria-label={sound?'Mute game sounds':'Enable game sounds'} aria-pressed={sound}>{sound?<Volume2 size={14}/>:<VolumeX size={14}/>}</button></>}<button onClick={()=>setCards(!cards)}><LayoutGrid size={14}/>{cards?'Play golf':'Skill cards'}</button></div></div>}
    {enabled?<>
      <div className={`sp-golf-layout ${shake?(shake%2?'sp-golf-jolt-a':'sp-golf-jolt-b'):''}`}><div className="sp-golf-main">
      <div className="sp-golf-scoreboard"><div className="sp-golf-active">{info&&skillLogos[info.skill.title]&&<img src={skillLogos[info.skill.title]} alt=""/>}<div><span>YOUR SKILL BALL</span><strong style={{color:info?.skill.color}}>{info?.skill.title||'Loading…'}</strong></div></div><div className="sp-golf-score"><span>LEVEL <strong>{info?.level||1}</strong></span><span>PAR <strong>{info?.par||3}</strong></span><span>STROKES <strong>{info?.strokes||0}</strong></span><span>SKILLS <strong>{collected.length}<small> / {total}</small></strong></span></div></div>
      <div ref={hostRef} className="sp-physics-field sp-pool-table sp-golf-course">{!info?.complete&&(fx.cinematic||fx.speed>12)&&<div className={`sp-golf-cinematic ${fx.cinematic?'':'is-fast'}`}>{fx.cinematic?'CUP CAM · SLOW MOTION':'OVERDRIVE'}</div>}{info?.complete&&<div className="sp-golf-finish"><span><Flag size={18}/> {info.strokes===1?'Hole in one':info.trick?'Trick-shot finish':info.strokes<info.par?'Under par':'Hole complete'}</span><h3>{info.skill.title} unlocked.</h3><p>{info.strokes} {info.strokes===1?'stroke':'strokes'} · Par {info.par}</p><button onClick={()=>apiRef.current?.next()}>Next level <Flag size={14}/></button></div>}</div>
      <div className="sp-pool-status"><p aria-live="polite">{message}</p><span>{moving?'IN PLAY':'POWER'} <meter min="0" max="100" value={power} aria-label="Shot power"/></span></div>
      <div className="sp-golf-legend"><span><i className="boost"/> Boost pad</span>{info?.level>=2&&<span><i className="bumper"/> Ninja bumper</span>}{info?.level>=3&&<span><i className="portal"/> Portal pair</span>}{info?.level>=4&&<span><i className="sand"/> Slow sand</span>}<span><i className="pickup"/> Skill pickup</span></div>
      <p className="sp-golf-save-note">{saveStatus} · {info?.level===1?'Warm-up':info?.level<4?'Trick shots':info?.level<7?'Overdrive':'Extreme'} difficulty</p>
      </div><aside className="sp-golf-liveboard" aria-label="Live golf scoreboard"><div className="sp-golf-board-heading"><span className={moving?'is-playing':''}/><h3>Live scoreboard</h3></div><span className="sp-golf-score-caption">TOTAL POINTS</span><div className="sp-golf-total"><ScoreTicker value={score}/></div><div key={scoreEvent.id} className="sp-golf-score-event" aria-live="polite">{scoreEvent.points>0&&<strong>+{scoreEvent.points}</strong>}<span>{scoreEvent.label}</span></div><div className={`sp-golf-combo ${combo>1?'is-active':''}`}><span>TRICK CHAIN</span><strong key={combo}>{combo>1?`${combo}×`:'—'}</strong><p>Bank · boost · warp · smash</p></div><div className="sp-golf-speed"><span>BALL SPEED <strong>{fx.speed}</strong></span><meter min="0" max="30" value={fx.speed} aria-label="Ball speed"/><small>{fx.cinematic?'Slow motion at the cup':fx.speed>12?'Wall-breaking speed':moving?'Shot in play':'Ready to slingshot'}</small></div><div className="sp-golf-recent"><h4>Recent holes</h4>{history.length?history.map((result,index)=><div key={`${result.level}-${index}`}><span><b>#{result.level}</b> {result.strokes} {result.strokes===1?'stroke':'strokes'}</span><strong>+{result.score.toLocaleString()}</strong></div>):<p>Sink a skill ball to post your first result.</p>}</div></aside></div>
      <div className="sp-pool-collections">{groups.map(group=><article key={group.genre} style={{'--skill-color':group.themeColor}}><h3><i/>{group.genre}<span>{group.items.filter(item=>collected.includes(item.title)).length}/{group.items.length}</span></h3><div>{group.items.filter(item=>collected.includes(item.title)).map(item=><div key={item.title} className="sp-collected-skill"><span className="sp-collected-ball">{skillLogos[item.title]&&<img src={skillLogos[item.title]} alt=""/>}</span><span>{item.title}</span></div>)}{!group.items.some(item=>collected.includes(item.title))&&<p className="sp-pool-empty">Pick up skills or sink your skill ball.</p>}</div></article>)}</div>
    </>:children}
  </div>;
}
SkillPhysicsField.propTypes={groups:PropTypes.array.isRequired,children:PropTypes.node.isRequired};
