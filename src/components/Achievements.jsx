import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Achievements = () => {
  const achievements = [
    {
      title: "NSS Space Settlement Contest",
      subtitle: "First Prize (Dec 2022 – Feb 2023)",
      points: [
        "Developed a 50-page research document on sustainability.",
        "Presented oral and poster presentations at ISDC.",
      ],
      icon: <Trophy size={32} />,
      borderColor: "#facc15", // Yellow
      description: "International recognition for space settlement design excellence."
    },
    {
      title: "President’s Honor Roll",
      subtitle: "Fall 2024 & Spring 2025",
      points: ["Recognized for outstanding academic performance."],
      icon: <Star size={32} />,
      borderColor: "#60a5fa", // Blue
      description: "Awarded for maintaining a 4.0 GPA in consecutive semesters."
    },
    {
      title: "Honor Society & SCLA Honor",
      subtitle: "Leadership Recognition",
      points: ["Awarded for academic excellence and leadership."],
      icon: <Award size={32} />,
      borderColor: "#4ade80", // Green
      description: "Recognition for leadership contributions and academic success."
    },
  ];

  return (
    <motion.section
      id="achievements"
      className="projects py-20 px-5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        variants={fadeInUp}
      >
        My Achievements
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={staggerContainer}
      >
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="project-card flex flex-col p-10"
            style={{
              "--theme-color": item.borderColor,
            }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg border"
                style={{
                  borderColor: item.borderColor,
                  color: item.borderColor,
                  backgroundColor: `${item.borderColor}10`,
                  boxShadow: `0 0 20px ${item.borderColor}20`
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className="project-title text-lg leading-tight"
                  style={{ color: "white" }}
                >
                  {item.title}
                </h3>
                <span className="text-xs text-gray-400">{item.subtitle}</span>
              </div>
            </div>

            <p className="project-description-preview mb-4 text-sm">
              {item.description}
            </p>

            <ul className="space-y-2 mt-auto list-disc pl-5 marker:text-[var(--theme-color)]">
              {item.points.map((point, idx) => (
                <li key={idx} className="text-[var(--light-text)] text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
