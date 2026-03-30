export const TornPaperDivider = ({ flip = false, color = "#0a0a0a", accentColor = "#33ff00" }) => {
  const path =
    "M0,0 L0,40 " +
    "L30,18 L60,36 L90,12 L120,32 L155,8 L185,28 L215,6 " +
    "L248,30 L278,10 L310,34 L340,14 L375,38 L405,16 " +
    "L438,34 L468,10 L500,32 L530,8 L560,28 L590,6 " +
    "L620,30 L650,12 L680,36 L710,16 L740,38 L770,10 " +
    "L800,32 L830,8 L860,28 L890,6 L920,26 L950,10 " +
    "L980,34 L1010,14 L1040,38 L1070,16 L1100,36 L1130,12 " +
    "L1160,30 L1190,8 L1220,28 L1250,4 L1280,22 L1280,0 Z";

  return (
    <div style={{ position: "relative", width: "100%", height: "60px", overflow: "hidden", transform: flip ? "scaleY(-1)" : "none", marginTop: flip ? "-2px" : "0", marginBottom: flip ? "0" : "-2px", zIndex: 2, pointerEvents: "none" }}>
      <svg viewBox="0 0 1280 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <filter id={`torn-glow-${accentColor.replace("#","")}`}>
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path d={path} fill={color}/>
        <polyline
          points="0,40 30,18 60,36 90,12 120,32 155,8 185,28 215,6 248,30 278,10 310,34 340,14 375,38 405,16 438,34 468,10 500,32 530,8 560,28 590,6 620,30 650,12 680,36 710,16 740,38 770,10 800,32 830,8 860,28 890,6 920,26 950,10 980,34 1010,14 1040,38 1070,16 1100,36 1130,12 1160,30 1190,8 1220,28 1250,4 1280,22"
          fill="none" stroke={accentColor} strokeWidth="1.5"
          filter={`url(#torn-glow-${accentColor.replace("#","")})`} opacity="0.9"
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
