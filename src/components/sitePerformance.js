import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

export function lowPowerDevice() {
  return navigator.hardwareConcurrency<=4||navigator.deviceMemory<=4||navigator.connection?.saveData===true;
}
export function usePageVisible() {
  const [visible,setVisible]=useState(!document.hidden);
  useEffect(()=>{const update=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
  return visible;
}
const candidates=new Map(),listeners=new Set();let allowed=new Set();
const publish=()=>{
  const next=new Set([...candidates].sort((a,b)=>b[1]-a[1]).slice(0,lowPowerDevice()?1:2).map(([id])=>id));
  if(next.size===allowed.size&&[...next].every(id=>allowed.has(id))) return;
  allowed=next;listeners.forEach(listener=>listener());
};
const subscribe=listener=>{listeners.add(listener);return()=>listeners.delete(listener);};
export function usePreviewSlot(ref,wanted,controls=false) {
  const id=useId(),score=useRef(0),pageVisible=usePageVisible();
  const active=useSyncExternalStore(subscribe,()=>allowed.has(id),()=>false);
  useEffect(()=>{
    const target=ref.current;if(!target) return;
    const observer=new IntersectionObserver(([entry])=>{
      score.current=entry.isIntersecting?entry.intersectionRatio:0;
      if(score.current&&wanted&&pageVisible&&!controls) candidates.set(id,score.current);else candidates.delete(id);
      publish();
    },{threshold:[0,.25,.5,.75,1]});observer.observe(target);
    return()=>{observer.disconnect();candidates.delete(id);publish();};
  },[ref,id,wanted,pageVisible,controls]);
  return pageVisible&&wanted&&(controls||active);
}
