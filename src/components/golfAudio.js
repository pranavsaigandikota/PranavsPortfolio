export const GOLF_MUTE_KEY='samurai-golf-muted-v1';
export function golfSoundEnabled(storage) {
  try {return (storage||window.localStorage).getItem(GOLF_MUTE_KEY)!=='true';}catch{return true;}
}

export function createGolfAudio(host,enabled=true) {
  const music=document.createElement('audio');
  music.src='/game-audio/local-forecast-elevator.mp3';
  music.loop=true;music.preload='none';music.volume=.16;music.hidden=true;
  music.dataset.golfMusic='true';host.appendChild(music);
  const names=['shot','bank','boost','overdrive','portal','echo','shatter','pickup','finish','locked'];
  const effects=new Map(names.map(name=>{const clip=new Audio(`/game-audio/${name}.ogg`);clip.preload='none';return [name,clip];}));
  const active=new Set(),lastPlayed=new Map();
  let activated=false,visible=false,destroyed=false;
  const sync=()=>{
    if(enabled&&activated&&visible&&!document.hidden&&!destroyed) music.play().catch(()=>{});
    else music.pause();
  };
  const stopEffects=()=>{active.forEach(clip=>{clip.pause();clip.removeAttribute('src');});active.clear();};
  document.addEventListener('visibilitychange',sync);
  return {
    activate(){activated=true;sync();},
    setVisible(value){visible=value;sync();if(!value) stopEffects();},
    setEnabled(value){enabled=value;if(!enabled) stopEffects();else activated=true;sync();},
    play(name){
      if(!enabled||!activated||!visible||document.hidden||destroyed||!effects.has(name)) return;
      const now=performance.now();if(now-(lastPlayed.get(name)||-Infinity)<(name==='bank'?110:65)) return;
      lastPlayed.set(name,now);if(active.size>=10){const oldest=active.values().next().value;oldest.pause();active.delete(oldest);}
      const clip=effects.get(name).cloneNode();clip.volume=name==='finish'?.4:.24;
      active.add(clip);clip.addEventListener('ended',()=>active.delete(clip),{once:true});clip.addEventListener('error',()=>active.delete(clip),{once:true});clip.play().catch(()=>active.delete(clip));
    },
    destroy(){destroyed=true;music.pause();stopEffects();music.removeAttribute('src');music.load();music.remove();document.removeEventListener('visibilitychange',sync);},
  };
}
