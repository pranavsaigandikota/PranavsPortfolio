import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const Achievements = () => {
  return (
    <motion.section
      id="achievements"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Achievements
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          id="achievement-card"
          className="project-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>National Space Society Space Settlement Contest 2022 (First Prize)</h3>
          <p>
            December 2022 – February 2023<br />
            • Developed a 50-page research document on sustainability, space habitation, and resource management.<br />
            • Presented oral and poster presentations to industry professionals at the 2022 International Space Development Conference (ISDC).
          </p>
          <h3>President’s Honor Roll</h3>
          <p>
            • Awarded for outstanding academic performance in Fall 2024 and Spring 2025.
          </p>
          <h3>Honor Society and SCLA Honor</h3>
          <p>
            • Given for outstanding academic performance and leadership.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
