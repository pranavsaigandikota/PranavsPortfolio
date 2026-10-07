import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POOL, createPoolBalls, shootCue, stepPool, ballsMoving } from '../src/components/poolPhysics.js';
const groups=[{genre:'Languages',themeColor:'#3b82f6',items:[{title:'JavaScript'},{title:'Python'}]}];

test('cue shots travel opposite the pull with limited power',()=>{
  const cue=createPoolBalls(groups)[0];
  assert.equal(shootCue(cue,{x:0,y:0}),false);
  shootCue(cue,{x:-100,y:0});assert.equal(cue.vx,20);assert.equal(Math.abs(cue.vy),0);
});
test('equal pool balls exchange momentum on contact',()=>{
  const balls=createPoolBalls(groups).slice(0,2);
  Object.assign(balls[0],{x:0,y:0,vx:4});Object.assign(balls[1],{x:.79,y:0});
  stepPool(balls,1/120);assert.ok(balls[1].vx>3.5);assert.ok(balls[0].vx<.5);
});
test('pocketing collects the actual skill and category exactly once',()=>{
  const balls=createPoolBalls(groups);Object.assign(balls[1],{x:0,y:4.4,vy:3});
  const collected=[];for(let i=0;i<100;i++) stepPool(balls,1/120,ball=>collected.push(ball));
  assert.equal(collected.length,1);assert.equal(collected[0].title,'JavaScript');assert.equal(collected[0].category,'Languages');assert.equal(balls[1].pocketed,true);
});
test('a scratched cue returns only after remaining balls stop',()=>{
  const balls=createPoolBalls(groups);Object.assign(balls[0],{x:0,y:4.5});balls[1].vx=2;
  stepPool(balls,1/120);assert.equal(balls[0].pocketed,true);
  for(let i=0;i<1000;i++) stepPool(balls,1/120);
  assert.equal(balls[0].pocketed,false);assert.equal(balls[0].x,-6);assert.equal(ballsMoving(balls),false);
});
test('a full rack remains bounded and eventually settles after a break',()=>{
  const rack=[{...groups[0],items:Array.from({length:40},(_,i)=>({title:'Skill '+i}))}];
  const balls=createPoolBalls(rack);shootCue(balls[0],{x:-4,y:0});
  for(let i=0;i<8000;i++) stepPool(balls,1/120);
  assert.equal(ballsMoving(balls),false);
  assert.ok(balls.some(ball=>!ball.cue&&ball.pocketed),'A full-power break should collect skills.');
  for(const ball of balls){assert.ok(Number.isFinite(ball.x)&&Number.isFinite(ball.y));if(!ball.pocketed){assert.ok(Math.abs(ball.x)<=POOL.railX);assert.ok(Math.abs(ball.y)<=POOL.railY);}}
});
