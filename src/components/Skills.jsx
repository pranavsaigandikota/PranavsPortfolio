import { motion } from "framer-motion";
import { Code, Layers, Database, Cpu, Terminal } from "lucide-react";

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

const skillsData = [
  {
    category: "Languages",
    skills: ["C", "Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
    themeColor: "#3b82f6", // Blue
    icon: <Code size={32} />,
    description: "Core languages for systems, web, and data.",
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React",
      "React Native",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Spring AI",
      "Tailwind CSS",
      "NativeWind",
      "Expo",
    ],
    themeColor: "#8b5cf6", // Violet
    icon: <Layers size={32} />,
    description: "Modern tools for building scalable applications.",
  },
  {
    category: "Databases & Auth",
    skills: ["PostgreSQL", "Supabase", "Render", "OAuth 2.0", "Auth0"],
    themeColor: "#f59e0b", // Amber/Orange
    icon: <Database size={32} />,
    description: "Data persistence and secure authentication.",
  },
  {
    category: "AI / ML",
    skills: [
      "Google Gemini",
      "GPT",
      "LLaMA",
      "PyTorch",
      "TensorFlow.js",
      "Transformers",
      "OpenCV",
    ],
    themeColor: "#10b981", // Emerald
    icon: <Cpu size={32} />,
    description: "Advanced AI models and machine learning libraries.",
  },
  {
    category: "Tools & Practices",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Agile",
      "Unity",
      "Blender",
      "Figma",
      "Canva",
      "Premiere Pro",
    ],
    themeColor: "#ec4899", // Pink
    icon: <Terminal size={32} />,
    description: "Essential tools for development, design, and 3D creation.",
  },
];

export const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="projects py-20 px-5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        variants={fadeInUp}
      >
        My Skills
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={staggerContainer}
      >
        {skillsData.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="project-card group relative overflow-hidden flex flex-col"
            style={{
              "--theme-color": skillGroup.themeColor,
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Retro Background Pattern */}
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(51, 255, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 255, 0, 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />

            <div className="project-content relative z-10 bg-black/40 backdrop-blur-sm flex-grow flex flex-col p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 rounded-lg border"
                  style={{
                    borderColor: skillGroup.themeColor,
                    color: skillGroup.themeColor,
                    backgroundColor: `${skillGroup.themeColor}10`
                  }}
                >
                  {skillGroup.icon}
                </div>
                <h3
                  className="project-title text-xl font-bold"
                  style={{ color: "white" }}
                >
                  {skillGroup.category}
                </h3>
              </div>

              <p className="text-gray-300 text-sm mb-6">
                {skillGroup.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto w-full">
                {skillGroup.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="tech-tag transition-colors duration-300 hover:bg-white/10 whitespace-nowrap"
                    style={{
                      borderColor: `${skillGroup.themeColor}40`,
                      color: "white"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
