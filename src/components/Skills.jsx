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
    skills: ["C", "Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    themeColor: "#3b82f6", // Blue
    icon: <Code size={32} />,
    description: "Core programming languages for system and web development."
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React.js", "Next.js", "TailwindCSS", "Node.js", "Express.js", "Three.js"],
    themeColor: "#8b5cf6", // Violet
    icon: <Layers size={32} />,
    description: "Modern tools for building scalable applications."
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Unix/Linux", "Vercel", "Supabase"],
    themeColor: "#ec4899", // Pink
    icon: <Terminal size={32} />,
    description: "Essential development and deployment workflows."
  },
  {
    category: "Game Dev & VR",
    skills: ["Unity", "C#", "Blender", "Oculus SDK", "A-Frame"],
    themeColor: "#f59e0b", // Amber
    icon: <Box size={32} />,
    description: "Creating immersive 3D experiences and games."
  },
  {
    category: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "OpenAI API", "Hugging Face", "LangChain"],
    themeColor: "#10b981", // Emerald
    icon: <Cpu size={32} />,
    description: "Leveraging AI for intelligent solutions."
  },
  {
    category: "Soft Skills",
    skills: ["Leadership", "Communication", "Problem Solving", "Teamwork", "Mentoring"],
    themeColor: "#ef4444", // Red
    icon: <MessageCircle size={32} />,
    description: "Personal attributes that drive professional success."
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
        className="project-grid"
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

              <div className="flex flex-wrap gap-2 mt-auto">
                {skillGroup.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="tech-tag transition-colors duration-300 hover:bg-white/10"
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
    </motion.section >
  );
};
