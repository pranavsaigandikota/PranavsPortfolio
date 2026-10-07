import { useEffect, useState } from 'react';

export function lowPowerDevice() {
  return navigator.hardwareConcurrency<=4||navigator.deviceMemory<=4||navigator.connection?.saveData===true;
}
export function usePageVisible() {
  const [visible,setVisible]=useState(!document.hidden);
  useEffect(()=>{const update=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
  return visible;
}
// Every visible preview autoplays; offscreen and hidden-tab media stays paused.
export function usePreviewSlot(ref,wanted) {
  const pageVisible=usePageVisible();
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const target=ref.current;if(!target) return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'80px'});
    observer.observe(target);
    return()=>observer.disconnect();
  },[ref]);
  return pageVisible&&wanted&&visible;
}
