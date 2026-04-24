import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectModal } from "./ProjectModal";
import { AnimatedTitle } from "./AnimatedTitle";

// Import images directly to ensure they work
import revisionImg from "../assets/ProjectsPics/revisionainpage.jpg";
import freedomImg from "../assets/ProjectsPics/freedomlanding.png";
import visionImg from "../assets/ProjectsPics/visionmain.jpg";
import satchelImg from "../assets/ProjectsPics/SatchyCover.png";
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

// Directional scatter for cards
const cardScatterPatterns = [
  { x: -180, y: 60,  rotate: -14, scale: 0.8 },
  { x:  180, y: 80,  rotate:  14, scale: 0.8 },
  { x: -100, y: 140, rotate: -10, scale: 0.85 },
  { x:  100, y: 130, rotate:  10, scale: 0.85 },
  { x: -160, y: -40, rotate:  16, scale: 0.8 },
  { x:  160, y: -40, rotate: -16, scale: 0.8 },
];
const cardScatter = (i) => cardScatterPatterns[i % cardScatterPatterns.length];

import replotMapImg from "../assets/ProjectsPics/replotmap.png";
import sentinelImg from "../assets/ProjectsPics/SentinelDemo.png";
import uknightImg from "../assets/ProjectsPics/UknightDemo.png";

const projectsData = [
  {
    title: "uKnight",
    imageSrc: uknightImg,
    shortDescription: "College platform where you randomly match with people in your college on chat or video.",
    fullDescription: [
      "Created an omegle-style platform allowing college students to securely meet and socialize via randomized chat and video matching, verified through college OAuth.",
      "Engineered real-time matching queues using Redis and handled real-time communication via WebSockets and WebRTC peer connections.",
      "Developed a full-stack application using a Spring Boot backend and React frontend, deployed on Google Cloud Platform."
    ],
    skills: ["React", "Spring Boot", "WebRTC", "PostgreSQL", "Redis", "GCP", "WebSockets", "OAuth"],
    demo: "https://uknight.net",
    source: "https://github.com/uKnight-Co/uKnight",
    themeColor: "#FFD700",
  },
  {
    title: "Sentinel",
    event: "Hacklytics 2026: Golden Byte",
    imageSrc: sentinelImg,
    shortDescription: "Web Extension for Real-Time Misinformative Content Detection.",
    fullDescription: [
      "Built a Chrome extension acting as a real-time trust and safety layer for social media, automatically analyzing images and videos for AI-generation artifacts.",
      "Injected side note badges onto X (Twitter) feeds via MutationObserver, parsing DOM and intercepting GraphQL API responses.",
      "Implemented a backend running local ML models (CLIP, SDXL-detector, GAN-face detector) with FastAPI and Actian VectorAI DB for fast KNN similarity search.",
      "Integrated Sphinx Reasoning SDK to provide natural language explanations of AI detection risk levels."
    ],
    skills: ["JavaScript", "React", "Chrome Extension", "Python", "FastAPI", "Actian VectorAI", "Hugging Face", "Sphinx AI"],
    demo: "https://devpost.com/software/sentinel-w2ehfs",
    source: "https://github.com/AlphaKnight1701-A/Sentinel",
    themeColor: "#000000",
  },
  {
    title: "RePlot",
    event: "SwampHacks 2026",
    imageSrc: replotMapImg,
    shortDescription: "AI-powered urban planning tool identifying underutilized land for sustainable development.",
    fullDescription: [
      "AI-Powered Site Discovery: Uses Google Gemini to scan cities and identify underused land.",
      "Smart Exclusions: Automatically skips sensitive areas like schools and parks.",
      "The RePlot Impact Engine: Combines AI pattern recognition with scientific models to validate sites.",
      "Sustainability Analysis: Estimates carbon reduction, urban cooling, and biodiversity impact.",
      "Interactive Mapping: Live maps with high-resolution satellite imagery and boundary highlighting."
    ],
    skills: ["React", "FastAPI", "Python", "Google Gemini", "Mapbox GL"],
    demo: "https://devpost.com/software/replot",
    source: "https://github.com/Yimo-Liu-13196/SwampHacks",
    themeColor: "#2E7D32", 
  },
  {
    title: "Satchel",
    imageSrc: satchelImg,
    shortDescription: "AI-powered full-stack inventory platform with smart parsing and chatbot assistance.",
    fullDescription: [
      "Built a full-stack inventory platform with Spring Boot (RESTful CRUD APIs) and React for managing different kinds of inventory. Support to form group inventories for combined management.",
      "Integrated Spring AI with GPT to parse shopping bills/lists, auto-add inventory items, and power an inventory-aware chatbot for assistance and planning.",
      "Secured inventory access using Spring Security and Auth0, and deployed via multi-stage Docker builds and CI/CD on Render."
    ],
    skills: ["Spring Boot", "PostgreSQL", "React", "Spring Data JPA", "Spring AI", "Spring Security", "OAuth 2.0", "Auth0", "Docker", "GPT"],
    demo: "https://satchel-frontend-one.vercel.app/",
    source: "https://github.com/pranavsaigandikota/Satchel",
    themeColor: "#864212",
  },
  {
    title: "ReVision",
    event: "ShellHacks 2025",
    imageSrc: revisionImg,
    shortDescription: "Real-time AI tutor for whiteboard problem solving using Gemini Vision.",
    fullDescription: [
      "Developed a real-time AI tutor that watches over and gives guidance suggestions while you solve problems on a whiteboard from uploaded question sets.",
      "Worked on implementing Supabase and connecting Gemini Vision with Google Vision OCR for real-time whiteboard recognition."
    ],
    skills: ["Google Gemini", "Google Vision", "React", "Flask", "Supabase"],
    demo: "https://revision-bay.vercel.app/",
    source: "https://github.com/KaziAmin110/Revision/tree/main",
    themeColor: "#cc0007", // Dark red
  },
  {
    title: "TACO",
    event: "KnightHacks 2025",
    imageSrc: tacoImg,
    shortDescription: "Voice-controlled robotic arm using computer vision to organize objects.",
    fullDescription: "TACO (Technically Autonomous Coordinated Organizer) is a voice-controlled robotic arm built with LEGO Mindstorms. It uses Computer Vision (YOLOv8) to detect objects and ElevenLabs API for voice interaction, executing commands to pick and place items autonomously.",
    skills: ["Python", "OpenCV", "YOLOv8", "ElevenLabs API", "PyBricks", "Flask", "LEGO Mindstorms"],
    demo: "https://devpost.com/software/taco-j9ma8r",
    source: "https://github.com/AlphaKnight1701-A/TACO",
    themeColor: "#facc15", // Yellow
  },
  {
    title: "Freedom Finances",
    event: "ShellHacks 2024",
    imageSrc: freedomImg,
    shortDescription: "Debt management app analyzing bank statements for personalized recommendations.",
    fullDescription: [
      "Designed and implemented the frontend for a debt management website which uses GPT-3.5 and the Plaid API to analyze bank statements and deliver personalized debt management recommendations."
    ],
    skills: ["ReactJS", "Bootstrap", "Figma"],
    demo: "https://devpost.com/software/freedom-finances",
    source: "https://github.com/colemaring/Freedom-Finanaces",
    themeColor: "#001fcf", // Blue
  },
  {
    title: "Vision",
    event: "KnightHacks VII 2024",
    imageSrc: visionImg,
    shortDescription: "Hands-free drawing app using eye tracking and voice commands.",
    fullDescription: [
      "Created application enabling users with limited mobility to draw on a virtual canvas hands-free using eye tracking (MediaPipe + OpenCV) and voice commands (SpeechRecognition)."
    ],
    skills: ["Python", "OpenCV", "MediaPipe", "SpeechRecognition"],
    demo: "https://devpost.com/software/vision-q7yp45",
    source: "https://github.com/pranavsaigandikota/Vision",
    themeColor: "#3cafd1", // Light teal-blue
  },
  {
    title: "Jenny’s Playtime",
    imageSrc: jennysImg,
    shortDescription: "Story-driven horror survival game with AI bots.",
    fullDescription: "Developed Jenny’s Playtime, a story-driven horror survival game featuring AI bots, published on Itch.io.",
    skills: ["C#", "Unity", "Game Development", "AI Bots"],
    demo: "https://filmasticpg.itch.io/jennys-playtime",
    source: "https://filmasticpg.itch.io/jennys-playtime",
    themeColor: "#b30000", // Red
  },
  {
    title: "Jumblehot",
    imageSrc: jumblehotImg,
    shortDescription: "Endless jumping game published on the Amazon Appstore.",
    fullDescription: "Created and published Jumblehot, an endless jumping game released on the Amazon Appstore.",
    skills: ["C#", "Unity", "Mobile Development", "Game Design"],
    demo: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    source: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    themeColor: "#ff6600", // Orange
  },
  {
    title: "NextFlix",
    imageSrc: "https://github.com/pranavsaigandikota/NextFlix/raw/main/assets/banner.png", // Trying to link directly if possible, or use a placeholder
    shortDescription: "Mobile movie discovery app with trailers and watchlist.",
    fullDescription: [
      "Developed a mobile movie discovery app with browsing, trailers, and personalized watchlist features.",
      "Integrated TMDB API for real-time movie data and Appwrite for secure authentication and database storage."
    ],
    skills: ["React Native", "Expo", "Appwrite", "TMDB API", "NativeWind"],
    demo: "",
    source: "https://github.com/pranavsaigandikota/NextFlix/",
    themeColor: "#f54a33", // Bright red-orange
  },
  {
    title: "Humanotone",
    imageSrc: humanotoneImg,
    shortDescription: "Turn facial expressions and gestures into music in your browser.",
    fullDescription: "Browser-based instrument that turns facial expressions and hand gestures into music. Built with React, TensorFlow.js, and Mediapipe, with Tone.js handling sound generation.",
    skills: ["React", "TensorFlow.js", "Mediapipe", "Tone.js", "Webcam Input", "Real-Time Interaction"],
    demo: "https://pranavsaigandikota.github.io/Humanotone/",
    source: "https://github.com/pranavsaigandikota/Humanotone/",
    themeColor: "#07a102", // Green
  },
  {
    title: "Exodus",
    imageSrc: exodusImg,
    shortDescription: "Authored a 50-page research paper on sustainable space habitation.",
    fullDescription: [
      <>Authored a <strong>50</strong>-page research paper on sustainable space habitation.</>,
      <>Won <strong>1st</strong> place among <strong>17,000+</strong> students (<strong>3,000+</strong> entries) from <strong>22</strong> countries in NSS Space Settlement Contest.</>,
      <>Presented the research paper to industry leaders at the International Space Development Conference <strong>2022</strong>.</>
    ],
    skills: ["Research", "Blender"],
    demo: "https://www.youtube.com/watch?v=GYl_ZlsiQ1c",
    source: "https://drive.google.com/file/d/1SmqbU08lu2u-oHAElzyCyP6lZpyM0h15/view",
    themeColor: "#7b00ff", // Purple
  },
  {
    title: "Robotic Animatronics",
    imageSrc: roboticsImg,
    shortDescription: "Custom-built animatronic heads with remote control operation.",
    fullDescription: "Created animatronic heads as a hobby, learning the skills of designing, building, and programming robots to operate with a remote control.",
    skills: ["Design", "Building", "Programming", "Robotics"],
    demo: "https://filmasticpg.wixsite.com/mysteriousunloaded",
    source: "https://filmasticpg.wixsite.com/mysteriousunloaded/post/the-mantis-update-a-new-look-and-enhanced-control",
    themeColor: "#808080",
  },
  {
    title: "More of My Projects",
    imageSrc: moreProjectsImg,
    shortDescription: "Explore my complete portfolio of animations, research, and more.",
    fullDescription: "To view all my projects, including 3D animations, research papers, robots, music, and more, click below!",
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
      <div className="section-title-wrap">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <AnimatedTitle className="section-title-big">My Projects</AnimatedTitle>
        </motion.h2>
      </div>

      <motion.div
        className="project-grid sm:grid-cols-1"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ ...cardScatter(index), opacity: 0 }}
            whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ type: "spring", damping: 18, stiffness: 75, delay: (index % 4) * 0.09 }}
            whileHover={{ scale: 1.02 }}
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
              {project.event && (
                <div style={{ 
                  fontSize: "1.1rem", 
                  opacity: 0.8, 
                  marginBottom: "0.5rem",
                  marginTop: "-0.25rem",
                  fontFamily: '"VT323", monospace' // Ensure consistent font
                }}>
                  {project.event}
                </div>
              )}
              <p className="project-description-preview">{project.shortDescription}</p>

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
