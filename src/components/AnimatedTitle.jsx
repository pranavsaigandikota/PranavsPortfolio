import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PropTypes from "prop-types";

// Stable seeded random: returns a float in [min, max] for a given seed
const seededRand = (seed, min, max) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  const r = x - Math.floor(x); // 0..1
  return min + r * (max - min);
};

/**
 * AnimatedTitle
 * Each letter starts scattered (random position + rotation) and
 * flies into place when the element scrolls into view.
 * Reverses when scrolled away (once: false).
 */
export const AnimatedTitle = ({ children, className, style, as: Tag = "span" }) => {
  const text = String(children);
  const letters = text.split("");
  const ref = useRef(null);

  // Triggers whenever the element enters/leaves the viewport
  const isInView = useInView(ref, { amount: 0.55, once: false });

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      {letters.map((letter, i) => {
        // Each letter gets a unique but stable scatter offset
        const scatterX = seededRand(i * 3 + 1, -280, 280);
        const scatterY = seededRand(i * 7 + 2, -200, 200);
        const scatterRot = seededRand(i * 13 + 3, -270, 270);
        const scatterScale = seededRand(i * 5 + 4, 0.2, 1.6);

        return (
          <motion.span
            key={i}
            style={{
              display: "inline-block",
              // Preserve spaces
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
            animate={
              isInView
                ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                : {
                    x: scatterX * 0.5,
                    y: scatterY * 0.5,
                    rotate: scatterRot * 0.5,
                    scale: scatterScale,
                    opacity: 0,
                  }
            }
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 140,
              delay: isInView ? i * 0.025 : (letters.length - i) * 0.015,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </Tag>
  );
};

AnimatedTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  as: PropTypes.string,
};
