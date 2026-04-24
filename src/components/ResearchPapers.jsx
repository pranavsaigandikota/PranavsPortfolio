import { motion } from "framer-motion";
import { Rocket, BookOpen, Shield } from "lucide-react";
import { AnimatedTitle } from "./AnimatedTitle";

// Import PDFs directly from the folder
import exodusPdf from "../Research Papers/Exodus Winning First Paper.pdf";
import stylusPdf from "../Research Papers/Research Final Paper Stylus.pdf";
import cyberPdf from "../Research Papers/MOVEit_Attack_Pranavsai_G_new (1).pdf";

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
  { x:    0, y: 140, rotate:  -8, scale: 0.85 },
];
const cardScatter = (i) => cardScatterPatterns[i % cardScatterPatterns.length];

export const ResearchPapers = () => {
  const papers = [
    {
      title: "Exodus Paper",
      subtitle: "First Prize (NSS Space Settlement)",
      icon: <Rocket size={32} />,
      borderColor: "#facc15", // Yellow
      description: "Winning research paper on sustainable space settlement design and logistics.",
      link: exodusPdf,
    },
    {
      title: "Stylus Paper",
      subtitle: "UCF Stylus Submission",
      icon: <BookOpen size={32} />,
      borderColor: "#a855f7", // Purple
      description: "Academic paper chosen by professor for submission to the UCF Stylus.",
      link: stylusPdf,
    },
    {
      title: "Cyber Sec Paper",
      subtitle: "MOVEit Attack Analysis",
      icon: <Shield size={32} />,
      borderColor: "#3b82f6", // Blue
      description: "Analysis of cyber security vulnerabilities, attack vectors, and mitigation.",
      link: cyberPdf,
    },
  ];

  return (
    <motion.section
      id="research"
      className="projects py-20 px-5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        variants={fadeInUp}
        style={{ overflow: "visible" }}
      >
        <AnimatedTitle>My Research Papers</AnimatedTitle>
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={staggerContainer}
      >
        {papers.map((item, i) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="project-card group relative overflow-hidden flex flex-col cursor-pointer"
            initial={{ ...cardScatter(i), opacity: 0 }}
            whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ type: "spring", damping: 18, stiffness: 75, delay: i * 0.1 }}
            style={{
              "--theme-color": item.borderColor,
              display: "block"
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Retro Background Pattern */}
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />

            <div className="project-content relative z-10 bg-black/40 backdrop-blur-sm flex-grow flex flex-col p-6 h-full">
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

              <p className="project-description-preview mb-4 text-sm mt-auto">
                {item.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-semibold" style={{ color: "var(--theme-color)" }}>
                <span>Click to read full paper</span>
                <span>&rarr;</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};
