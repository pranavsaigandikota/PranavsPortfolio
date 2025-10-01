import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // animate children one after another
    },
  },
};

const fadeInSpring = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // physics-based animation
      stiffness: 120, // spring stiffness
      damping: 20,    // bounce damping
      mass: 0.5,      // mass of the element
    },
  },
};

export const Skills = () => {
  const skillsData = [
    {
      title: "Programming Languages",
      items: ["C", "HTML", "CSS", "C#", "Python", "Java", "JavaScript", "SQL / MySQL"],
    },
    {
      title: "Frameworks & Libraries",
      items: ["ReactJS", "React Native", "Angular", ".NET", "Bootstrap"],
    },
    {
      title: "Game Development & 3D",
      items: ["Unity (C#)", "Asset Creation (SketchFab)", "3D Modeling/Animating (Blender)", "AR/VR Development"],
    },
    {
      title: "AI & Machine Learning",
      items: ["OpenCV (Computer Vision)", "LLaMA (Large Language Models)", "QLORA Fine-Tuning"],
    },
    {
      title: "Development Tools & Practices",
      items: ["Full-stack Development Lifecycle", "Database Design & Integration", "UI/UX Design & Implementation", "VR & Human-Computer Interaction"],
    },
    {
      title: "Languages (Human)",
      items: ["English (Fluent)", "Telugu (Fluent)"],
    },
  ];

  return (
    <motion.section
      id="skills"
      style={{
        padding: "6rem 5%",
        backgroundColor: "var(--background)",
        color: "var(--text-color)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <motion.h2
        style={{ fontSize: "2.5rem", marginBottom: "3rem", textAlign: "center" }}
        variants={fadeInSpring}
      >
        Skills
      </motion.h2>

      {skillsData.map((category, idx) => (
        <motion.div
          key={idx}
          style={{ marginBottom: "2rem" }}
          variants={fadeInSpring}
        >
          <h3 style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.8rem", color: "var(--accent-color)" }}>
            {category.title}
          </h3>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
            {category.items.map((item, i) => (
              <motion.li
                key={i}
                style={{
                  backgroundColor: "var(--card-bg)",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  color: "var(--text-color)",
                }}
                variants={fadeInSpring}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.section>
  );
};
