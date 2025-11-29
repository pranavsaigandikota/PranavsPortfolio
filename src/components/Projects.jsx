import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectModal } from "./ProjectModal";

// Import images directly to ensure they work
import revisionImg from "../assets/ProjectsPics/revisionainpage.jpg";
import freedomImg from "../assets/ProjectsPics/freedomlanding.png";
import visionImg from "../assets/ProjectsPics/visionmain.jpg";
import tacoImg from "../assets/ProjectsPics/Taco.jpg"; // Assuming this is for Jumblehot or similar if not specified, but user said "Taco project pics". I'll use it for Jumblehot for now or add a new one if needed. Actually, user said "I put freedom finances revision and taco project pics". I will use tacoImg for "Jumblehot" as a placeholder or maybe "Taco" is a new project? I'll stick to the existing list but update images.
// For others, use the generated ones
import jennysImg from "../assets/ProjectsPics/jennys-playtime.png";
import jumblehotImg from "../assets/ProjectsPics/jumblehot.png";
// import nextflixImg from "../assets/ProjectsPics/nextflix.png"; // Removed due to missing file
import humanotoneImg from "../assets/ProjectsPics/humanotone.png";
import exodusImg from "../assets/ProjectsPics/exodus.png";
import roboticsImg from "../assets/ProjectsPics/robotic-animatronics.png";
import moreProjectsImg from "../assets/ProjectsPics/more-projects.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const projectsData = [
  {
    title: "ReVision - ShellHacks 2025",
    imageSrc: revisionImg,
    description:
      "AI-powered study platform that lets users upload lecture slides and instantly get practice quizzes, summaries, and explanations. Leveraged Gemini 2.5 Flash for reasoning, Google Vision API for OCR, and LLMs to adapt content for different learning styles.",
    skills: ["React.js", "Next.js", "OpenAI API", "Gemini 2.5 Flash", "Google Vision", "Node.js", "TailwindCSS"],
    demo: "https://revision-bay.vercel.app/",
    source: "https://github.com/KaziAmin110/Revision/tree/main",
    themeColor: "#cc0007", // Dark red
  },
  {
    title: "TACO - KnightHacks 2025",
    imageSrc: tacoImg,
    description:
      "TACO (Technically Autonomous Coordinated Organizer) is a voice-controlled robotic arm built with LEGO Mindstorms. It uses Computer Vision (YOLOv8) to detect objects and ElevenLabs API for voice interaction, executing commands to pick and place items autonomously.",
    skills: ["Python", "OpenCV", "YOLOv8", "ElevenLabs API", "PyBricks", "Flask", "LEGO Mindstorms"],
    demo: "https://devpost.com/software/taco-j9ma8r",
    source: "https://github.com/AlphaKnight1701-A/TACO",
    themeColor: "#facc15", // Yellow
  },
  {
    title: "Freedom Finances - ShellHacks 2024",
    imageSrc: freedomImg,
    description:
      "Web app that helps users manage debt and improve financial literacy by analyzing banking data using Plaid and GPT-3.5. Learned React from scratch, contributed to UI design, and integrated Appwrite for authentication and storage.",
    skills: ["React.js", "JavaScript", "Plaid API", "Appwrite", "OpenAI", "UI/UX Design"],
    demo: "https://devpost.com/software/freedom-finances",
    source: "https://github.com/colemaring/Freedom-Finanaces",
    themeColor: "#001fcf", // Blue
  },
  {
    title: "Vision - Knight Hacks VII",
    imageSrc: visionImg,
    description:
      "Assistive drawing app that lets users create art using only eye movements and voice commands. Learned real-time eye tracking with OpenCV, voice control, and accessibility design with Pygame. Awarded Honorable Mention at Knight Hacks VII.",
    skills: ["Python", "OpenCV", "Pygame", "Speech Recognition", "Accessibility Design"],
    demo: "https://devpost.com/software/vision-q7yp45",
    source: "https://github.com/pranavsaigandikota/Vision",
    themeColor: "#3cafd1", // Light teal-blue
  },
  {
    title: "Jenny’s Playtime - Horror Survival Game",
    imageSrc: jennysImg,
    description:
      "Developed Jenny’s Playtime, a story-driven horror survival game featuring AI bots, published on Itch.io.",
    skills: ["C#", "Unity", "Game Development", "AI Bots"],
    demo: "https://filmasticpg.itch.io/jennys-playtime",
    source: "https://filmasticpg.itch.io/jennys-playtime",
    themeColor: "#b30000", // Red
  },
  {
    title: "Jumblehot - Endless Jumping Game",
    imageSrc: jumblehotImg,
    description:
      "Created and published Jumblehot, an endless jumping game released on the Amazon Appstore.",
    skills: ["C#", "Unity", "Mobile Development", "Game Design"],
    demo: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    source: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    themeColor: "#ff6600", // Orange
  },
  {
    title: "NextFlix - Movie Discovery & Watchlist App",
    imageSrc: "https://github.com/pranavsaigandikota/NextFlix/raw/main/assets/banner.png", // Trying to link directly if possible, or use a placeholder
    description:
      "Mobile app with React Native and Expo to browse movies, watch trailers, and manage a personal watchlist. Integrated Appwrite for user auth and data storage.",
    skills: ["React Native", "Expo", "Appwrite", "API Integration", "UI/UX Design"],
    demo: "",
    source: "https://github.com/pranavsaigandikota/NextFlix/",
    themeColor: "#f54a33", // Bright red-orange
  },
  {
    title: "Humanotone - Face & Hand Controlled Instrument",
    imageSrc: humanotoneImg,
    description:
      "Browser-based instrument that turns facial expressions and hand gestures into music. Built with React, TensorFlow.js, and Mediapipe, with Tone.js handling sound generation.",
    skills: ["React", "TensorFlow.js", "Mediapipe", "Tone.js", "Webcam Input", "Real-Time Interaction"],
    demo: "https://pranavsaigandikota.github.io/Humanotone/",
    source: "https://github.com/pranavsaigandikota/Humanotone/",
    themeColor: "#07a102", // Green
  },
  {
    title: "Exodus Space Settlement - NSS Competition",
    imageSrc: exodusImg,
    description:
      "Designed a blueprint for a space settlement named 'Exodus,' winning first prize in the NSS Space Settlement Competition and presented at ISDC 2021.",
    skills: ["Research", "Design", "Presentation", "Space Science"],
    demo: "https://www.youtube.com/watch?v=GYl_ZlsiQ1c",
    source: "https://drive.google.com/file/d/1SmqbU08lu2u-oHAElzyCyP6lZpyM0h15/view",
    themeColor: "#7b00ff", // Purple
  },
  {
    title: "Robotic Animatronics",
    imageSrc: roboticsImg,
    description:
      "Created animatronic heads as a hobby, learning the skills of designing, building, and programming robots to operate with a remote control.",
    skills: ["Design", "Building", "Programming", "Robotics"],
    demo: "https://filmasticpg.wixsite.com/mysteriousunloaded",
    source: "https://filmasticpg.wixsite.com/mysteriousunloaded/post/the-mantis-update-a-new-look-and-enhanced-control",
    themeColor: "#ffffff",
  },
  {
    title: "More of My Projects",
    imageSrc: moreProjectsImg,
    description:
      "To view all my projects, including 3D animations, research papers, robots, music, and more, click below!",
    skills: [],
    demo: "https://pranavsaigandikota.wixsite.com/filmasticpg",
    source: "",
    themeColor: "#ff66b2",
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.section
      id="projects"
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
        My Projects
      </motion.h2>

      <motion.div
        className="project-grid sm:grid-cols-1"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onClick={() => setSelectedProject(project)}
            style={{
              "--theme-color": project.themeColor,
            }}
          >
            <div className="project-image-container">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="project-image-img"
                loading="lazy"
              />
              <div className="project-overlay">
                <span>View Details</span>
              </div>
            </div>

            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description-preview">{project.description}</p>

              <div className="project-tech">
                {project.skills.slice(0, 3).map((skill, i) => (
                  <span key={i} className="tech-tag">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && <span className="tech-tag">+{project.skills.length - 3}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
};
