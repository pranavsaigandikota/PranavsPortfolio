export const POOL = { width: 22, height: 11, railX: 10.1, railY: 4.6, pocketRadius: .66 };
export const pockets = [[-10.1,4.6],[0,4.78],[10.1,4.6],[-10.1,-4.6],[0,-4.78],[10.1,-4.6]];
export function createPoolBalls(groups) {
  const skills = groups.flatMap((group, categoryIndex) => group.items.map(item => ({ title:item.title, color:group.themeColor, category:group.genre, categoryIndex })));
  return [ { title:'Cue ball', radius:.4, x:-6, y:0, vx:0, vy:0, cue:true, pocketed:false },
    ...skills.map((skill,index) => ({ ...skill, radius:.4, x:1.2 + Math.floor(index/8)*1.05, y:(index%8-3.5)*1.02, vx:0, vy:0, pocketed:false })) ];
}
export const ballsMoving = balls => balls.some(ball => !ball.pocketed && Math.hypot(ball.vx,ball.vy) > .04);
export function shootCue(cue, pull) {
  const distance = Math.hypot(pull.x,pull.y);
  if (distance < .1) return false;
  const power = Math.min(distance * 5, 20);
  cue.vx = -pull.x / distance * power;
  cue.vy = -pull.y / distance * power;
  return true;
}
export function stepPool(balls, dt, onPocket = () => {}) {
  balls.forEach(ball => {
    if (ball.pocketed) return;
    ball.x += ball.vx * dt; ball.y += ball.vy * dt;
    const speed = Math.hypot(ball.vx,ball.vy);
    const friction = speed ? Math.max(0,speed-.4*dt)/speed : 0;
    ball.vx *= friction; ball.vy *= friction;
    if (speed < .025) ball.vx = ball.vy = 0;
    if (pockets.some(([x,y]) => Math.hypot(ball.x-x,ball.y-y) < POOL.pocketRadius)) {
      ball.pocketed = true; ball.vx = ball.vy = 0;
      onPocket(ball); return;
    }
    if (Math.abs(ball.x) > POOL.railX-ball.radius) {
      ball.x = Math.sign(ball.x)*(POOL.railX-ball.radius); ball.vx *= -.86;
    }
    if (Math.abs(ball.y) > POOL.railY-ball.radius) {
      ball.y = Math.sign(ball.y)*(POOL.railY-ball.radius); ball.vy *= -.86;
    }
  });
  for (let i=0;i<balls.length;i++) for(let j=i+1;j<balls.length;j++) {
    const a=balls[i], b=balls[j];
    if(a.pocketed || b.pocketed) continue;
    const dx=b.x-a.x, dy=b.y-a.y, distance=Math.hypot(dx,dy), minimum=a.radius+b.radius;
    if(distance>=minimum) continue;
    const nx=distance>.00001 ? dx/distance : 1, ny=distance>.00001 ? dy/distance : 0;
    const overlap=(minimum-distance)/2;
    a.x-=nx*overlap; a.y-=ny*overlap; b.x+=nx*overlap; b.y+=ny*overlap;
    const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
    if(relative<0) {
      const impulse=-relative*.96;
      a.vx-=impulse*nx; a.vy-=impulse*ny; b.vx+=impulse*nx; b.vy+=impulse*ny;
    }
  }
  const cue=balls[0];
  if(cue.pocketed && !ballsMoving(balls)) {
    cue.pocketed=false; cue.x=-6; cue.y=0;
    // Place a scratched cue in a clear spot instead of overlapping another ball.
    for(let y=0;y<8;y++) {
      if(!balls.slice(1).some(ball=>!ball.pocketed && Math.hypot(ball.x-cue.x,ball.y-cue.y)<ball.radius+cue.radius+.1)) break;
      cue.y=(y%2 ? -1 : 1)*(Math.floor(y/2)+1)*.8;
    }
  }
}
