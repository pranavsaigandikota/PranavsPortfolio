import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpRight } from 'lucide-react';
import { usePageVisible } from './sitePerformance';

export function CardArrow() {
  return <span className="sp-card-arrow" aria-hidden="true"><ArrowUpRight className="sp-arrow-default" size={22} /></span>;
}

export function EditorialAccent({ kind = 'code' }) {
  return <svg className="ed-section-art" viewBox="0 0 100 80" fill="none" aria-hidden="true">
    {kind==='code'&&<><path d="m30 24-18 16 18 16m40-32 18 16-18 16M58 13 42 67" stroke="currentColor" strokeWidth="3"/><circle cx="50" cy="40" r="35" stroke="currentColor" strokeDasharray="2 5"/></>}
    {kind==='music'&&<><circle cx="50" cy="40" r="33" stroke="currentColor" strokeWidth="2"/><circle cx="50" cy="40" r="23" stroke="currentColor"/><circle cx="50" cy="40" r="12" stroke="currentColor"/><circle cx="50" cy="40" r="3" fill="currentColor"/><path d="M77 11 90 4v42l-8 5" stroke="currentColor" strokeWidth="3"/></>}
    {kind==='film'&&<><rect x="8" y="17" width="84" height="47" stroke="currentColor" strokeWidth="2"/><path d="M8 28h84M8 53h84M28 28v25m44-25v25M17 18v9m18-9v9m18-9v9m18-9v9m12-9v9M17 54v9m18-9v9m18-9v9m18-9v9m12-9v9" stroke="currentColor" strokeWidth="2"/><path d="m44 34 14 7-14 7Z" fill="currentColor"/></>}
  </svg>;
}
EditorialAccent.propTypes = { kind: PropTypes.oneOf(['code','music','film']) };

export function CompactCode({ text }) {
  const hostRef=useRef(null),pageVisible=usePageVisible();
  const [visible,setVisible]=useState(false);
  const [count, setCount] = useState(typeof window==='undefined'?text.length:0);
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));observer.observe(hostRef.current);return()=>observer.disconnect();},[]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(text.length); return; }
    if(!visible||!pageVisible) return;
    const timer = setInterval(() => setCount(previous => {
      const next = Math.min(previous + 8, text.length);
      if (next === text.length) clearInterval(timer);
      return next;
    }), 32);
    return () => clearInterval(timer);
  }, [text,visible,pageVisible]);
  return <pre ref={hostRef} className="sp-compact-code"><code>{text.slice(0, count)}<span className="sp-code-cursor" aria-hidden="true">▍</span></code></pre>;
}
CompactCode.propTypes = { text: PropTypes.string.isRequired };
