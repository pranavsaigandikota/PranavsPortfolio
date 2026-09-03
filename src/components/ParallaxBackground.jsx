import { useEffect, useRef } from "react";

const ICONS = [
  { id: "note1", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 30 L15 10 L32 7 L32 17" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="30" r="4" fill="currentColor"/><circle cx="28" cy="17" r="4" fill="currentColor"/></svg>`, color: "#33ff00", size: 36 },
  { id: "clef", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4 C20 4 12 10 12 18 C12 24 16 27 20 27 C24 27 28 24 28 20 C28 16 25 13 20 13 C15 13 12 16 12 20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/><line x1="20" y1="4" x2="20" y2="38" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="17" cy="36" rx="4" ry="2.5" fill="currentColor"/></svg>`, color: "#00ffcc", size: 38 },
  { id: "vinyl", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="17" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="20" r="10" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>`, color: "#ff33aa", size: 44 },
  { id: "headphones", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 22 C8 13 13 7 20 7 C27 7 32 13 32 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="4" y="20" width="8" height="12" rx="3" stroke="currentColor" stroke-width="2.2" fill="none"/><rect x="28" y="20" width="8" height="12" rx="3" stroke="currentColor" stroke-width="2.2" fill="none"/></svg>`, color: "#33ff00", size: 38 },
  { id: "piano", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="32" height="22" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="11" y1="10" x2="11" y2="32" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="10" x2="18" y2="32" stroke="currentColor" stroke-width="1.5"/><line x1="25" y1="10" x2="25" y2="32" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="10" width="5" height="13" rx="1" fill="currentColor"/><rect x="22" y="10" width="5" height="13" rx="1" fill="currentColor"/></svg>`, color: "#00ffcc", size: 40 },
  { id: "clapper", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="14" width="32" height="22" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/><rect x="4" y="7" width="32" height="8" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="7" x2="10" y2="15" stroke="currentColor" stroke-width="2"/><line x1="20" y1="7" x2="18" y2="15" stroke="currentColor" stroke-width="2"/><line x1="28" y1="7" x2="26" y2="15" stroke="currentColor" stroke-width="2"/></svg>`, color: "#00ffcc", size: 40 },
  { id: "reel", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="16" stroke="currentColor" stroke-width="2.2"/><circle cx="20" cy="20" r="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="20" cy="9" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="20" cy="31" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="9" cy="20" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="31" cy="20" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`, color: "#ff33aa", size: 42 },
  { id: "camera", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="34" height="22" rx="3" stroke="currentColor" stroke-width="2.2" fill="none"/><circle cx="20" cy="22" r="7" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="20" cy="22" r="3" fill="currentColor"/><path d="M14 11 L16 7 L24 7 L26 11" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="31" cy="16" r="2" fill="currentColor"/></svg>`, color: "#33ff00", size: 38 },
  { id: "terminal", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="34" height="30" rx="3" stroke="currentColor" stroke-width="2.2" fill="none"/><line x1="3" y1="12" x2="37" y2="12" stroke="currentColor" stroke-width="2"/><path d="M10 20 L16 25 L10 30" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/><line x1="19" y1="30" x2="29" y2="30" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`, color: "#00ffcc", size: 40 },
  { id: "circuit", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="20" y1="3" x2="20" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="20" y1="28" x2="20" y2="37" stroke="currentColor" stroke-width="1.8"/><line x1="3" y1="20" x2="12" y2="20" stroke="currentColor" stroke-width="1.8"/><line x1="28" y1="20" x2="37" y2="20" stroke="currentColor" stroke-width="1.8"/><circle cx="3" cy="20" r="1.5" fill="currentColor"/><circle cx="37" cy="20" r="1.5" fill="currentColor"/><line x1="14" y1="6" x2="14" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="26" y1="6" x2="26" y2="12" stroke="currentColor" stroke-width="1.8"/></svg>`, color: "#ff33aa", size: 42 },
  { id: "gamepad", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 16 Q5 28 12 30 Q16 32 20 30 Q24 32 28 30 Q35 28 34 16 Q33 10 28 10 L12 10 Q7 10 6 16Z" stroke="currentColor" stroke-width="2.2" fill="none"/><line x1="12" y1="18" x2="12" y2="24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="27" cy="18" r="1.5" fill="currentColor"/><circle cx="30" cy="21" r="1.5" fill="currentColor"/><circle cx="27" cy="24" r="1.5" fill="currentColor"/><circle cx="24" cy="21" r="1.5" fill="currentColor"/></svg>`, color: "#33ff00", size: 38 },
  { id: "pixelstar", svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="20,4 24,16 38,16 27,24 31,38 20,30 9,38 13,24 2,16 16,16" stroke="currentColor" stroke-width="2" fill="none"/></svg>`, color: "#00ffcc", size: 34 },
];

const rand = (seed) => { const x = Math.sin(seed) * 10000; return x - Math.floor(x); };

// Pre-compute all particle data once
const PARTICLES = ICONS.flatMap((icon, iconIdx) =>
  Array.from({ length: 3 }, (_, i) => {
    const s = iconIdx * 31 + i * 17;
    return {
      key: `${icon.id}-${i}`,
      color: icon.color,
      size: icon.size,
      svgHtml: icon.svg,
      left: ((iconIdx * 3 + i) / (ICONS.length * 3)) * 100 + rand(s + 1) * 4 - 2,
      baseTop: rand(s + 2) * 300,
      driftRate: (rand(s + 3) - 0.5) * 8,
      rotRate: (rand(s + 4) - 0.5) * 15,
      opacity: 0.08 + rand(s + 5) * 0.11,
      scale: 0.7 + rand(s + 6) * 0.9,
    };
  })
);

export const ParallaxBackground = () => {
  const refs = useRef([]);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return; // skip if already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const vh = window.innerHeight || 900;
        const scrollVh = (scrollY / vh) * 100;

        refs.current.forEach((el, idx) => {
          if (!el) return;
          const p = PARTICLES[idx];
          const topVh = p.baseTop + (scrollVh * p.driftRate) / 100;
          const wrapped = ((topVh % 300) + 300) % 300;
          const rotate = (scrollY / 1000) * p.rotRate * 360;

          if (wrapped < -10 || wrapped > 110) {
            el.style.display = "none";
          } else {
            el.style.display = "block";
            // Only touch transform and top — both GPU-composited
            el.style.top = `${wrapped}vh`;
            el.style.transform = `rotate(${rotate}deg)`;
          }
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {PARTICLES.map((p, idx) => (
        <div
          key={p.key}
          ref={(el) => { refs.current[idx] = el; }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.baseTop}vh`,
            width: p.size * p.scale,
            height: p.size * p.scale,
            color: p.color,
            opacity: p.opacity,
            filter: `drop-shadow(0 0 4px ${p.color}33)`,
            willChange: "transform, top",
          }}
          dangerouslySetInnerHTML={{ __html: p.svgHtml }}
        />
      ))}
    </div>
  );
};
