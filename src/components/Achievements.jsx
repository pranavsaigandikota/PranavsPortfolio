import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 80,
    },
  }),
};

export const Achievements = () => {
  const achievements = [
    {
      title: "National Space Society Space Settlement Contest",
      subtitle: "First Prize (Dec 2022 – Feb 2023)",
      points: [
        "Developed a 50-page research document on sustainability, space habitation, and resource management.",
        "Presented oral and poster presentations at ISDC.",
      ],
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "President’s Honor Roll",
      subtitle: "Fall 2024 & Spring 2025",
      points: ["Recognized for outstanding academic performance in consecutive semesters."],
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Honor Society & SCLA Honor",
      subtitle: "Leadership Recognition",
      points: ["Awarded for academic excellence and leadership contributions."],
      color: "from-green-400 to-teal-500",
    },
  ];

  return (
    <motion.section
      id="achievements"
      className="projects py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Achievements
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-6">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeInUp}
            className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${item.color} text-white`}
            whileHover={{
              scale: 1.05,
              rotateX: 3,
              rotateY: -3,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.97 }}
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm italic opacity-90 mb-3">{item.subtitle}</p>
            <ul className="space-y-2 text-base leading-relaxed">
              {item.points.map((point, idx) => (
                <li key={idx}>
                  <span className="font-bold">★</span> {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
