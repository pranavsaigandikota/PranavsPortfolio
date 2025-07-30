import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const styles = {
  section: {
    padding: "6rem 5%",
    backgroundColor: "var(--background)",
    color: "var(--text-color)",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "3rem",
    textAlign: "center",
  },
  skillCategory: {
    marginBottom: "2rem",
  },
  categoryTitle: {
    fontWeight: "700",
    fontSize: "1.3rem",
    marginBottom: "0.8rem",
    color: "var(--accent-color)",
  },
  skillList: {
    listStyle: "none",
    paddingLeft: 0,
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: "0.8rem",
  },
  skillItem: {
    backgroundColor: "var(--card-bg)",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    color: "var(--text-color)",
  },
};

export const Skills = () => {
  return (
    <motion.section
      id="skills"
      style={styles.section}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        style={styles.heading}
        variants={fadeInUp}
      >
        Skills
      </motion.h2>

      <motion.div style={styles.skillCategory} variants={fadeInUp}>
        <h3 style={styles.categoryTitle}>Programming Languages</h3>
        <ul style={styles.skillList}>
          <li style={styles.skillItem}>C (Intermediate)</li>
          <li style={styles.skillItem}>HTML (Intermediate)</li>
          <li style={styles.skillItem}>CSS (Intermediate)</li>
          <li style={styles.skillItem}>C# (Intermediate)</li>
          <li style={styles.skillItem}>Python (Beginner)</li>
          <li style={styles.skillItem}>JavaScript (Beginner)</li>
          <li style={styles.skillItem}>SQL / MySQL (Beginner)</li>
        </ul>
      </motion.div>

      <motion.div style={styles.skillCategory} variants={fadeInUp}>
        <h3 style={styles.categoryTitle}>Frameworks & Libraries</h3>
        <ul style={styles.skillList}>
          <li style={styles.skillItem}>ReactJS</li>
          <li style={styles.skillItem}>React Native</li>
          <li style={styles.skillItem}>Angular</li>
          <li style={styles.skillItem}>.NET</li>
          <li style={styles.skillItem}>Bootstrap</li>
        </ul>
      </motion.div>

      <motion.div style={styles.skillCategory} variants={fadeInUp}>
        <h3 style={styles.categoryTitle}>Game Development & 3D</h3>
        <ul style={styles.skillList}>
          <li style={styles.skillItem}>Unity (C#)</li>
          <li style={styles.skillItem}>Asset Creation (SketchFab)</li>
        </ul>
      </motion.div>

      <motion.div style={styles.skillCategory} variants={fadeInUp}>
        <h3 style={styles.categoryTitle}>AI & Machine Learning</h3>
        <ul style={styles.skillList}>
          <li style={styles.skillItem}>OpenCV (Computer Vision)</li>
          <li style={styles.skillItem}>LLaMA (Large Language Models)</li>
          <li style={styles.skillItem}>QLORA Fine-Tuning</li>
        </ul>
      </motion.div>

      <motion.div style={styles.skillCategory} variants={fadeInUp}>
        <h3 style={styles.categoryTitle}>Development Tools & Practices</h3>
        <ul style={styles.skillList}>
          <li style={styles.skillItem}>Full-stack Development Lifecycle</li>
          <li style={styles.skillItem}>Database Design & Integration</li>
          <li style={styles.skillItem}>UI/UX Design & Implementation</li>
          <li style={styles.skillItem}>VR & Human-Computer Interaction</li>
        </ul>
      </motion.div>

      <motion.div style={styles.skillCategory} variants={fadeInUp}>
        <h3 style={styles.categoryTitle}>Languages (Human)</h3>
        <ul style={styles.skillList}>
          <li style={styles.skillItem}>English (Fluent)</li>
          <li style={styles.skillItem}>Telugu (Fluent)</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};
