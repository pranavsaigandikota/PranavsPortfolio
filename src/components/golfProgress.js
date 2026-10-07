export const GOLF_SAVE_KEY='samurai-skill-golf-v1';
export function loadGolfProgress(storage,titles) {
  try {
    const saved=JSON.parse(storage.getItem(GOLF_SAVE_KEY));
    if(!saved||saved.version!==1||!Number.isInteger(saved.level)||saved.level<1||saved.level>10000||!Number.isInteger(saved.seed)||saved.seed<0||saved.seed>4294967295) return null;
    if(!titles.has(saved.skill)||!Array.isArray(saved.pickups)||!saved.pickups.every(title=>titles.has(title))) return null;
    if(!Array.isArray(saved.collected)||!saved.collected.every(title=>titles.has(title))) return null;
    const b=saved.ball;
    if(!b||![b.x,b.y,b.vx,b.vy,saved.score,saved.strokes,saved.levelScore,saved.combo].every(Number.isFinite)||b.x<1.3||b.x>20.7||b.y<1.3||b.y>9.7||Math.abs(b.vx)>50||Math.abs(b.vy)>50||saved.score<0||saved.strokes<0||saved.combo<0) return null;
    if(!Array.isArray(saved.walls)||!Array.isArray(saved.tokens)||!saved.walls.every(value=>typeof value==='boolean')||!saved.tokens.every(value=>typeof value==='boolean')) return null;
    saved.history=Array.isArray(saved.history)?saved.history.filter(row=>Number.isInteger(row.level)&&Number.isFinite(row.strokes)&&Number.isFinite(row.score)&&titles.has(row.skill)).slice(0,5):[];
    if(saved.score>1e15||saved.combo>10) return null;
    const stats={};['banks','boosts','warps','breaks','maxSpeed'].forEach(key=>stats[key]=Number.isFinite(b.stats?.[key])?Math.max(0,Math.min(1e5,b.stats[key])):0);
    saved.ball={x:b.x,y:b.y,vx:b.vx,vy:b.vy,sunk:b.sunk===true,shotTime:Number.isFinite(b.shotTime)?Math.max(0,Math.min(16.1,b.shotTime)):0,stats};
    saved.ball.usedEcho=b.usedEcho===true;
    saved.ball.usedBoosts=Array.isArray(b.usedBoosts)?b.usedBoosts.filter(index=>Number.isInteger(index)&&index>=0&&index<10):[];
    ['boostCooldown','portalCooldown','bumperCooldown'].forEach(key=>saved.ball[key]=Number.isFinite(b[key])?Math.max(0,Math.min(2,b[key])):0);
    saved.collected=[...new Set(saved.collected)];return saved;
  }catch{return null;}
}
export function saveGolfProgress(storage,progress) {
  try {storage.setItem(GOLF_SAVE_KEY,JSON.stringify({...progress,version:1}));return true;}catch{return false;}
}
