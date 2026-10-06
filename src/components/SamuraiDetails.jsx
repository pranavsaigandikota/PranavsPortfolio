import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpRight } from 'lucide-react';

export function CardArrow() {
  return <span className="sp-card-arrow" aria-hidden="true"><ArrowUpRight className="sp-arrow-default" size={19} /><svg className="sp-ninja-star" viewBox="0 0 32 32" fill="currentColor"><path fillRule="evenodd" d="m16 1 4.7 10.3L31 8l-4.3 12.7L31 31l-14.8-4.5L4 31l4-14.2L1 5l12.2 3.8L16 1Zm0 11a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg></span>;
}

export function SamuraiAccent({ kind = 'torii' }) {
  return <svg className={`sp-small-art sp-small-art-${kind}`} viewBox="0 0 120 90" fill="none" aria-hidden="true">
    {kind === 'torii' && <><circle cx="64" cy="40" r="29" fill="#dc3941" opacity=".16" /><path d="M18 22q42 9 84 0l-5 8H23ZM20 35h80v5H20Z" fill="#b95048" /><path d="m35 29-3 47h8l4-47Zm41 0 4 47h8l-3-47Z" fill="#716264" /><path d="M13 77h96" stroke="#644448" /><path d="m10 80 8-11 8 10m68 0 8-14 9 15" stroke="#79524c" /></>}
    {kind === 'bonsai' && <><circle cx="66" cy="38" r="28" fill="#be343f" opacity=".12" /><path d="M56 69q13-17 7-39m-3 19-19-10m23-3 18-11" stroke="#a17b68" strokeWidth="4" /><path d="M24 38q-6-15 13-14 4-16 22-7 11-16 26-3 23-1 23 15-14 12-37 6-15 14-30 6Z" fill="#425149" /><path d="M34 70h51l-7 13H42Z" fill="#91675b" /><path d="M27 69h66" stroke="#bd8270" strokeWidth="3" /></>}
    {kind === 'crane' && <><circle cx="76" cy="34" r="22" fill="#d14448" opacity=".15" /><path d="m17 48 38-27-9 26 36 5-26 9-13 14-2-16Z" fill="#c6b7ab" /><path d="m46 47 28-35-9 37" fill="#817d7d" /><path d="m78 52 20-17-3-8 12 10-24 24" fill="#d4b7ab" /><path d="m21 79 38-3m15 0h22" stroke="#795557" /></>}
  </svg>;
}
SamuraiAccent.propTypes = { kind: PropTypes.oneOf(['torii', 'bonsai', 'crane']) };

export function CompactCode({ text }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(text.length); return; }
    const timer = setInterval(() => setCount(previous => {
      const next = Math.min(previous + 5, text.length);
      if (next === text.length) clearInterval(timer);
      return next;
    }), 18);
    return () => clearInterval(timer);
  }, [text]);
  return <pre className="sp-compact-code"><code>{text.slice(0, count)}<span className="sp-code-cursor" aria-hidden="true">▍</span></code></pre>;
}
CompactCode.propTypes = { text: PropTypes.string.isRequired };
