import test from 'node:test';
import assert from 'node:assert/strict';
import {GOLF,generateCourse,createGolfBall,slingGolf,stepGolf,golfMoving} from '../src/components/golfPhysics.js';
import {GOLF_SAVE_KEY,loadGolfProgress,saveGolfProgress} from '../src/components/golfProgress.js';
const empty=()=>({start:{x:2,y:5},hole:{x:19,y:8},walls:[],bumpers:[],boosts:[],portals:[],sand:[],tokens:[]});
test('courses are reproducible for retry, varied by seed, and have reachable divider gaps',()=>{
  assert.deepEqual(generateCourse(15),generateCourse(15));assert.notDeepEqual(generateCourse(15),generateCourse(16));
  for(let seed=0;seed<200;seed++){
    const course=generateCourse(seed,1+seed%12);
    for(let index=1;index<course.route.length;index++){
      const a=course.route[index-1],b=course.route[index];
      for(let step=0;step<=100;step++){const x=a.x+(b.x-a.x)*step/100,y=a.y+(b.y-a.y)*step/100;
        assert.ok(!course.walls.some(w=>x>w.x-GOLF.radius&&x<w.x+w.w+GOLF.radius&&y>w.y-GOLF.radius&&y<w.y+w.h+GOLF.radius),`Blocked route on seed ${seed}`);
      }
    }
  }
});
test('slingshot points opposite the drag, caps power, and prevents shooting a moving ball',()=>{
  const ball=createGolfBall(empty());assert.equal(slingGolf(ball,{x:-10,y:0}),true);assert.equal(ball.vx,24);assert.equal(slingGolf(ball,{x:2,y:0}),false);
});
test('walls reflect incoming momentum and keep the ball outside the obstacle',()=>{
  const course=empty();course.walls=[{x:5,y:2,w:.4,h:6}];const ball=createGolfBall(course);ball.x=4.72;ball.vx=5;stepGolf(ball,course,1/120);assert.ok(ball.x<=4.7);assert.ok(ball.vx<0);
});
test('boosters launch toward their arrow and portals preserve speed without immediately bouncing back',()=>{
  const course=empty();course.boosts=[{x:2,y:4,w:2,h:2,angle:Math.PI/2}];const ball=createGolfBall(course);ball.x=2.5;ball.vx=2;const events=[];stepGolf(ball,course,1/120,e=>events.push(e.type));assert.ok(ball.vy>=10);assert.equal(events.filter(e=>e==='boost').length,1);
  course.boosts=[];course.portals=[{x:3,y:5},{x:17,y:5}];ball.x=3;ball.y=5;ball.vx=4;ball.vy=0;stepGolf(ball,course,1/120,e=>events.push(e.type));assert.equal(ball.x,17);const speed=ball.vx;stepGolf(ball,course,1/120);assert.ok(ball.x>17);assert.ok(ball.vx<speed);assert.equal(events.filter(e=>e==='portal').length,1);
});
test('sand slows the ball, bumpers kick it outward, and skill pickups only fire once',()=>{
  const course=empty(),a=createGolfBall(course),b=createGolfBall(course);a.vx=b.vx=5;stepGolf(a,course,.1);course.sand=[{x:1,y:1,w:4,h:8}];stepGolf(b,course,.1);assert.ok(b.vx<a.vx);
  course.bumpers=[{x:3,y:5,r:.5}];b.x=2.4;b.y=5;b.vx=2;const events=[];stepGolf(b,course,1/120,e=>events.push(e.type));assert.ok(b.vx<=-7);assert.ok(events.includes('bumper'));
  course.bumpers=[];course.tokens=[{x:b.x,y:b.y}];stepGolf(b,course,1/120,e=>events.push(e.type));stepGolf(b,course,1/120,e=>events.push(e.type));assert.equal(events.filter(e=>e==='skill').length,1);
});
test('a controlled putt sinks once, while a fast ball can overshoot',()=>{
  const course=empty(),ball=createGolfBall(course);ball.x=course.hole.x-.3;ball.y=course.hole.y;ball.vx=1;const events=[];stepGolf(ball,course,1/120,e=>events.push(e.type));assert.equal(ball.sunk,true);stepGolf(ball,course,1/120,e=>events.push(e.type));assert.equal(events.filter(e=>e==='hole').length,1);
  const fast=createGolfBall(course);fast.x=course.hole.x-.3;fast.y=course.hole.y;fast.vx=12;stepGolf(fast,course,1/120);assert.equal(fast.sunk,false);
});
test('generated courses keep high-power shots finite and inside the boundary',()=>{
  for(let seed=0;seed<40;seed++){const course=generateCourse(seed,1+seed%12),ball=createGolfBall(course);slingGolf(ball,{x:-3,y:(seed%7-3)/2});for(let tick=0;tick<2400;tick++){stepGolf(ball,course,1/120);assert.ok(Number.isFinite(ball.x+ball.y+ball.vx+ball.vy));assert.ok(ball.x>=1.3&&ball.x<=20.7&&ball.y>=1.3&&ball.y<=9.7);}assert.equal(typeof golfMoving(ball),'boolean');}
});
test('fast shots shatter interior walls once while outer rails remain solid',()=>{
  const course=empty();course.walls=[{x:5,y:2,w:.4,h:6}];const ball=createGolfBall(course);ball.x=4.65;ball.vx=24;const events=[];
  stepGolf(ball,course,1/120,e=>events.push(e.type));assert.equal(course.walls[0].broken,true);assert.ok(ball.vx>0);assert.equal(ball.stats.breaks,1);
  for(let i=0;i<200;i++) stepGolf(ball,course,1/120,e=>events.push(e.type));assert.equal(events.filter(type=>type==='shatter').length,1);assert.ok(events.includes('wall'));assert.ok(ball.x<=20.7);
});
test('boost chains always give control back after a bounded shot duration',()=>{
  const course=empty();course.boosts=[{x:1,y:1,w:20,h:9,angle:0}];const ball=createGolfBall(course);slingGolf(ball,{x:-3,y:0});for(let tick=0;tick<2400;tick++) stepGolf(ball,course,1/120);assert.equal(golfMoving(ball),false);
});
test('difficulty begins open and introduces more obstacles and narrower gaps',()=>{
  const beginner=generateCourse(123,1),mid=generateCourse(123,4),extreme=generateCourse(123,10);
  assert.equal(beginner.walls.length,0);assert.equal(beginner.bumpers.length,0);assert.equal(beginner.portals.length,0);assert.ok(mid.walls.length>0);assert.ok(extreme.walls.length>mid.walls.length);assert.ok(extreme.bumpers.length>mid.bumpers.length);assert.ok(extreme.sand.length>mid.sand.length);
});
test('progress round-trips course, ball, score and rewards; corrupt or unavailable storage is safe',()=>{
  const map=new Map(),storage={getItem:key=>map.get(key),setItem:(key,value)=>map.set(key,value)},titles=new Set(['React','Python']);
  const course=generateCourse(42,3),snapshot={level:3,seed:42,skill:'React',pickups:['Python','React','Python'],ball:createGolfBall(course),score:1450,levelScore:400,strokes:2,combo:3,collected:['Python'],history:[],walls:course.walls.map(()=>false),tokens:course.tokens.map(()=>false)};
  assert.equal(saveGolfProgress(storage,snapshot),true);const loaded=loadGolfProgress(storage,titles);assert.equal(loaded.level,3);assert.equal(loaded.seed,42);assert.equal(loaded.score,1450);assert.equal(loaded.ball.x,snapshot.ball.x);assert.deepEqual(loaded.collected,['Python']);
  storage.setItem(GOLF_SAVE_KEY,'invalid json');assert.equal(loadGolfProgress(storage,titles),null);saveGolfProgress(storage,{...snapshot,ball:{...snapshot.ball,x:100}});assert.equal(loadGolfProgress(storage,titles),null);
  assert.equal(saveGolfProgress({setItem:()=>{throw new Error('quota');}},snapshot),false);assert.equal(loadGolfProgress({getItem:()=>{throw new Error('blocked');}},titles),null);
});
