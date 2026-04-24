export const TornPaperDivider = ({ flip = false, color = "#1c1715", accentColor = "#f59e0b" }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "80px", overflow: "hidden", transform: flip ? "scaleY(-1)" : "none", marginTop: flip ? "-2px" : "0", marginBottom: flip ? "0" : "-2px", zIndex: 2, pointerEvents: "none" }}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <filter id={`wave-glow-${accentColor.replace("#","")}`}>
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path fill={color} d="M0,0 L0,40 Q360,80 720,40 T1440,40 L1440,0 Z" />
        <path
          d="M0,40 Q360,80 720,40 T1440,40"
          fill="none" stroke={accentColor} strokeWidth="1.5"
          filter={`url(#wave-glow-${accentColor.replace("#","")})`} opacity="0.5"
        />
      </svg>
    </div>
  );
};

TornPaperDivider.propTypes = {
  flip: (props, propName) => { if (props[propName] !== undefined && typeof props[propName] !== "boolean") return new Error(`${propName} must be a boolean`); },
  color: (props, propName) => { if (props[propName] !== undefined && typeof props[propName] !== "string") return new Error(`${propName} must be a string`); },
  accentColor: (props, propName) => { if (props[propName] !== undefined && typeof props[propName] !== "string") return new Error(`${propName} must be a string`); },
};
