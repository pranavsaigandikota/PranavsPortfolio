import { motion } from "framer-motion";
import { Code, Layers, Box, Cpu, Terminal, MessageCircle } from "lucide-react";

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
    skills: ["C", "Python", "Java", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
    themeColor: "#3b82f6", // Blue
    icon: <Code size={32} />,
    description: "Core languages for systems, web, and data.",
  },
  {
    category: "Frameworks / Libraries",
    skills: ["React", "React Native", "TailwindCSS", "Supabase", "Appwrite"],
    themeColor: "#8b5cf6", // Violet
    icon: <Layers size={32} />,
    description: "Modern tools for building scalable applications.",
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
      "Hugging Face",
      "OpenCV",
      "Mediapipe",
    ],
    themeColor: "#10b981", // Emerald
    icon: <Cpu size={32} />,
    description: "Advanced AI models and machine learning libraries.",
  },
  {
    category: "Tools",
    skills: [
      "Git/GitHub",
      "Conda",
      "Expo",
      "NativeWind",
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
  {
    category: "Soft Skills",
    skills: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Time Management",
    ],
    themeColor: "#ef4444", // Red
    icon: <MessageCircle size={32} />,
    description: "Interpersonal skills that drive team success.",
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
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            {/* Abstract Background */}
            <div
              className="absolute inset-0 z-0 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, #1e1b4b 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, #312e81 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 60%),
                  linear-gradient(45deg, #0f172a 0%, #172554 100%)
                `,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
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
