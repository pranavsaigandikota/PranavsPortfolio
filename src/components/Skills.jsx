import { motion } from "framer-motion";
import { Code, Layers, Database, Cpu, Terminal } from "lucide-react";
import { AnimatedTitle } from "./AnimatedTitle";


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

const cardScatterPatterns = [
  { x: -180, y: 60,  rotate: -14, scale: 0.8 },
  { x:  180, y: 80,  rotate:  14, scale: 0.8 },
  { x: -100, y: 140, rotate: -10, scale: 0.85 },
  { x:  100, y: 130, rotate:  10, scale: 0.85 },
  { x: -160, y: -40, rotate:  16, scale: 0.8 },
  { x:  160, y: -40, rotate: -16, scale: 0.8 },
];
const cardScatter = (i) => cardScatterPatterns[i % cardScatterPatterns.length];

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
      <div className="section-title-wrap">
        <motion.h2 className="" variants={fadeInUp}>
          <AnimatedTitle className="section-title-big">My Skills</AnimatedTitle>
        </motion.h2>
      </div>

      <motion.div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", width: "100%", maxWidth: "1400px", margin: "0 auto" }}
        variants={staggerContainer}
      >
        {skillsData.map((skillGroup, index) => (
          <motion.div
            key={index}
            className="project-card group relative overflow-hidden flex flex-col w-full"
            style={{ 
              flex: "1 1 300px", 
              maxWidth: "400px",
              "--theme-color": skillGroup.themeColor,
            }}
            initial={{ ...cardScatter(index), opacity: 0 }}
            whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ type: "spring", damping: 18, stiffness: 75, delay: (index % 3) * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-content flex flex-col items-center text-center h-full">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div
                  className="p-3 rounded-full border-2"
                  style={{
                    borderColor: skillGroup.themeColor,
                    color: skillGroup.themeColor,
                    backgroundColor: `${skillGroup.themeColor}15`
                  }}
                >
                  {skillGroup.icon}
                </div>
                <h3
                  className="project-title text-2xl font-extrabold"
                  style={{ color: "var(--secondary-color)", marginBottom: 0 }}
                >
                  {skillGroup.category}
                </h3>
              </div>

              <p className="project-description-preview font-semibold text-lg mb-6">
                {skillGroup.description}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-auto w-full">
                {skillGroup.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    className="tech-tag"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    style={{
                      border: `2px solid ${skillGroup.themeColor}`,
                      color: skillGroup.themeColor,
                      background: `${skillGroup.themeColor}10`
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
