export const GOLF = { width:22, height:11, radius:.3, bounds:{ left:1, right:21, top:1, bottom:10 } };
export function seededRandom(seed) {
  let value=seed>>>0;
  return ()=>{value+=0x6D2B79F5;let t=value;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
export function generateCourse(seed,level=1) {
  const random=seededRandom(seed),range=(a,b)=>a+(b-a)*random();
  const start={x:2.4,y:range(3,8)},hole={x:19.5,y:range(2,9)};
  const difficulty=Math.max(1,level),count=difficulty===1?0:difficulty===2?1:difficulty<5?2:3;
  const positions=count===0?[]:count===1?[range(8.5,11.5)]:count===2?[range(6.5,8),range(12.8,14.4)]:[range(5.8,6.8),range(10.2,11.2),range(14.6,15.6)];
  const dividers=positions.map(x=>({x,y:range(3.3,7.7)}));
  const walls=[];
  const gap=Math.max(1.15,2.3-difficulty*.13);
  // Each divider has a generous, connected opening, so every generated hole is playable.
  dividers.forEach(({x,y})=>{
    walls.push({x,y:1,w:.38,h:y-gap-1},{x,y:y+gap,w:.38,h:10-y-gap});
  });
  const boosts=dividers.map(({x,y},index)=>{const next=dividers[index+1],target=next?{x:next.x+.5,y:next.y}:hole;return {x:x+.9,y:y-.55,w:1.3,h:1.1,angle:Math.atan2(target.y-y,target.x-(x+1.55))};});
  if(difficulty===1){start.y=range(4.6,6.4);hole.y=range(4.6,6.4);boosts.push({x:9,y:2,w:1.3,h:1.1,angle:Math.atan2(hole.y-2.55,hole.x-9.65)});}
  const bumperCount=difficulty===1?0:Math.min(6,1+Math.floor((difficulty-2)/2));
  boosts.forEach((boost,index)=>{boost.kind=difficulty>=3&&seededRandom((seed^Math.imul(index+1,0x9e3779b9))>>>0)()<.25?'overdrive':'boost';});
  const bumpers=Array.from({length:bumperCount},(_,index)=>({x:index===0?range(4.2,5.4):index===1?range(16,17):range(3.5,18),y:index%2?range(7.8,9):range(2,3.2),r:range(.45,.68)}));
  return { seed,level:difficulty,start,hole,par:difficulty===1?3:4+Math.floor(count/2),walls,
    bumpers,
    boosts,
    echoes:difficulty<4?[]:[{x:dividers[0].x+2.5,y:dividers[0].y>5.5?2.4:8.6}],
    sand:difficulty<4?[]:[{x:range(9,12),y:dividers[0].y>5.5?2:7.2,w:range(1.5,2.4),h:1.6},...(difficulty>=7?[{x:15.4,y:hole.y>5.5?3.2:6.8,w:1.8,h:1.4}]:[])],
    portals:difficulty<3?[]:[{x:4.7,y:start.y>5.5?8.1:2.8},{x:17.7,y:hole.y>5.5?7.8:3.2}],
    tokens:[...(count?dividers.map(({x,y})=>({x:x-.9,y})):[{x:8.5,y:start.y}]),{x:18.4,y:hole.y}],
    route:[start,...dividers.map(({x,y})=>({x:x+.5,y})),hole],
  };
}
export const createGolfBall = course => ({...course.start,vx:0,vy:0,r:GOLF.radius,sunk:false,boostCooldown:0,portalCooldown:0,bumperCooldown:0,shotTime:0,stats:{banks:0,boosts:0,warps:0,breaks:0,maxSpeed:0}});
export const golfMoving = ball => !ball.sunk&&Math.hypot(ball.vx,ball.vy)>.035;
export function slingGolf(ball,pull) {
  const distance=Math.hypot(pull.x,pull.y);if(ball.sunk||distance<.08||golfMoving(ball)) return false;
  const power=Math.min(distance*7.4,24);ball.vx=-pull.x/distance*power;ball.vy=-pull.y/distance*power;ball.shotTime=0;ball.usedBoosts=[];ball.usedEcho=false;ball.stats={banks:0,boosts:0,warps:0,breaks:0,maxSpeed:power};return true;
}
const inside=(ball,rect)=>ball.x>rect.x&&ball.x<rect.x+rect.w&&ball.y>rect.y&&ball.y<rect.y+rect.h;
function wallCollision(ball,rect) {
  const x=Math.max(rect.x,Math.min(ball.x,rect.x+rect.w)),y=Math.max(rect.y,Math.min(ball.y,rect.y+rect.h));
  const dx=ball.x-x,dy=ball.y-y,d=Math.hypot(dx,dy);
  if(d>=ball.r) return false;
  let nx,ny,overlap;
  if(d>.0001){nx=dx/d;ny=dy/d;overlap=ball.r-d;}
  else {const distances=[ball.x-rect.x,rect.x+rect.w-ball.x,ball.y-rect.y,rect.y+rect.h-ball.y];const edge=distances.indexOf(Math.min(...distances));[nx,ny]=[[-1,0],[1,0],[0,-1],[0,1]][edge];overlap=distances[edge]+ball.r;}
  ball.x+=nx*overlap;ball.y+=ny*overlap;const dot=ball.vx*nx+ball.vy*ny;
  if(dot<0){ball.vx-=1.78*dot*nx;ball.vy-=1.78*dot*ny;return true;}return false;
}
export function stepGolf(ball,course,dt,onEvent=()=>{}) {
  if(ball.sunk) return;
  ['boostCooldown','portalCooldown','bumperCooldown'].forEach(key=>ball[key]=Math.max(0,ball[key]-dt));
  ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;
  const speed=Math.hypot(ball.vx,ball.vy),sand=course.sand.some(rect=>inside(ball,rect));
  ball.stats.maxSpeed=Math.max(ball.stats.maxSpeed,speed);if(speed>.035) ball.shotTime+=dt;
  const next=Math.max(0,speed-(sand?5.2:1.35)*dt);
  if(next<.035){ball.vx=0;ball.vy=0;}else{ball.vx*=next/speed;ball.vy*=next/speed;}
  const {left,right,top,bottom}=GOLF.bounds;
  if(ball.x<left+ball.r||ball.x>right-ball.r){ball.x=Math.max(left+ball.r,Math.min(right-ball.r,ball.x));ball.vx*=-.86;ball.stats.banks++;onEvent({type:'wall',x:ball.x,y:ball.y});}
  if(ball.y<top+ball.r||ball.y>bottom-ball.r){ball.y=Math.max(top+ball.r,Math.min(bottom-ball.r,ball.y));ball.vy*=-.86;ball.stats.banks++;onEvent({type:'wall',x:ball.x,y:ball.y});}
  course.walls.forEach(rect=>{
    if(rect.broken) return;
    const nearX=Math.max(rect.x,Math.min(ball.x,rect.x+rect.w)),nearY=Math.max(rect.y,Math.min(ball.y,rect.y+rect.h));
    if(Math.hypot(ball.x-nearX,ball.y-nearY)<ball.r&&Math.hypot(ball.vx,ball.vy)>12){rect.broken=true;ball.vx*=.86;ball.vy*=.86;ball.stats.breaks++;onEvent({type:'shatter',x:ball.x,y:ball.y});}
    else if(wallCollision(ball,rect)){ball.stats.banks++;onEvent({type:'wall',x:ball.x,y:ball.y});}
  });
  course.bumpers.forEach(bumper=>{
    const dx=ball.x-bumper.x,dy=ball.y-bumper.y,d=Math.hypot(dx,dy),radius=ball.r+bumper.r;
    if(d<radius){const nx=d>.001?dx/d:1,ny=d>.001?dy/d:0;ball.x=bumper.x+nx*(radius+.01);ball.y=bumper.y+ny*(radius+.01);
      if(ball.bumperCooldown===0){const power=Math.max(10,Math.min(26,Math.hypot(ball.vx,ball.vy)+3));ball.vx=nx*power;ball.vy=ny*power;ball.bumperCooldown=.18;onEvent({type:'bumper',x:bumper.x,y:bumper.y});}
    }
  });
  if(ball.boostCooldown===0&&golfMoving(ball)) course.boosts.forEach((boost,index)=>{
    if(inside(ball,boost)&&ball.boostCooldown===0&&!ball.usedBoosts?.includes(index)){const level=course.level||1,overdrive=boost.kind!=='boost';const cap=overdrive?Math.min(42,22+level*1.5):18,minimum=overdrive?Math.min(32,16+level):8;const power=overdrive?Math.min(cap,Math.max(minimum,Math.hypot(ball.vx,ball.vy)*1.65)):Math.min(42,Math.max(Math.hypot(ball.vx,ball.vy),Math.min(cap,Math.max(minimum,Math.hypot(ball.vx,ball.vy)*1.2))));const target=course.route?.find(point=>point.x>boost.x+boost.w+ball.r)||course.hole;const angle=course.route?Math.atan2(target.y-ball.y,target.x-ball.x):boost.angle;ball.vx=Math.cos(angle)*power;ball.vy=Math.sin(angle)*power;ball.usedBoosts=[...(ball.usedBoosts||[]),index];ball.boostCooldown=.9;ball.stats.boosts++;onEvent({type:'boost',kind:overdrive?'overdrive':'boost',x:ball.x,y:ball.y});}
  });
  if(!ball.usedEcho&&golfMoving(ball)) course.echoes?.forEach(echo=>{if(Math.hypot(ball.x-echo.x,ball.y-echo.y)<.7){ball.usedEcho=true;onEvent({type:'echo',x:ball.x,y:ball.y});}});
  if(ball.portalCooldown===0&&golfMoving(ball)) course.portals.forEach((portal,index)=>{
    if(Math.hypot(ball.x-portal.x,ball.y-portal.y)<.62&&ball.portalCooldown===0){const target=course.portals[1-index];ball.x=target.x;ball.y=target.y;ball.portalCooldown=1.3;ball.stats.warps++;onEvent({type:'portal',x:target.x,y:target.y});}
  });
  course.tokens.forEach((token,index)=>{if(!token.collected&&Math.hypot(ball.x-token.x,ball.y-token.y)<.7){token.collected=true;onEvent({type:'skill',index,x:token.x,y:token.y});}});
  const distance=Math.hypot(ball.x-course.hole.x,ball.y-course.hole.y);
  const unlocked=course.tokens.every(token=>token.collected);
  if(unlocked&&distance<.78&&Math.hypot(ball.vx,ball.vy)<5){ball.vx*=Math.max(0,1-6*dt);ball.vy*=Math.max(0,1-6*dt);ball.x+=(course.hole.x-ball.x)*8*dt;ball.y+=(course.hole.y-ball.y)*8*dt;}
  if(distance<=.4+ball.r){
    if(unlocked){ball.sunk=true;ball.x=course.hole.x;ball.y=course.hole.y;ball.vx=ball.vy=0;onEvent({type:'hole',x:ball.x,y:ball.y});}
    else {const nx=distance>.001?(ball.x-course.hole.x)/distance:-1,ny=distance>.001?(ball.y-course.hole.y)/distance:0;ball.x=course.hole.x+nx*(.4+ball.r+.01);ball.y=course.hole.y+ny*(.4+ball.r+.01);const dot=ball.vx*nx+ball.vy*ny;if(dot<0){ball.vx-=1.8*dot*nx;ball.vy-=1.8*dot*ny;onEvent({type:'locked',x:ball.x,y:ball.y});}}
  }
  // A bumper can push the ball toward a rail; constrain its whole radius after every interaction.
  ball.x=Math.max(left+ball.r,Math.min(right-ball.r,ball.x));
  ball.y=Math.max(top+ball.r,Math.min(bottom-ball.r,ball.y));
  // Boost chains are exciting, but every shot must eventually hand control back.
  if(ball.shotTime>16&&!ball.sunk){ball.vx=0;ball.vy=0;ball.boostCooldown=1;ball.portalCooldown=1;}
}
