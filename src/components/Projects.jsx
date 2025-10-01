import { motion } from "framer-motion";

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
    imageSrc: "projects/revision.png",
    videoSrc: "projects/revision.mp4",
    description:
      "AI-powered study platform that lets users upload lecture slides and instantly get practice quizzes, summaries, and explanations. Leveraged Gemini 2.5 Flash for reasoning, Google Vision API for OCR, and LLMs to adapt content for different learning styles.",
    skills: ["React.js", "Next.js", "OpenAI API", "Gemini 2.5 Flash", "Google Vision", "Node.js", "TailwindCSS"],
    demo: "https://revision-bay.vercel.app/",
    source: "https://github.com/KaziAmin110/Revision/tree/main",
    themeColor: "#cc0007", // Dark red
  },
  {
    title: "Freedom Finances - ShellHacks 2024",
    imageSrc: "projects/freedom-finances.png",
    videoSrc: "projects/freedom-finances.mp4",
    description:
      "Web app that helps users manage debt and improve financial literacy by analyzing banking data using Plaid and GPT-3.5. Learned React from scratch, contributed to UI design, and integrated Appwrite for authentication and storage.",
    skills: ["React.js", "JavaScript", "Plaid API", "Appwrite", "OpenAI", "UI/UX Design"],
    demo: "https://devpost.com/software/freedom-finances",
    source: "https://github.com/colemaring/Freedom-Finanaces",
    themeColor: "#001fcf", // Blue
  },
  {
    title: "Vision - Knight Hacks VII",
    imageSrc: "projects/vision.png",
    videoSrc: "projects/vision.mp4",
    description:
      "Assistive drawing app that lets users create art using only eye movements and voice commands. Learned real-time eye tracking with OpenCV, voice control, and accessibility design with Pygame. Awarded Honorable Mention at Knight Hacks VII.",
    skills: ["Python", "OpenCV", "Pygame", "Speech Recognition", "Accessibility Design"],
    demo: "https://devpost.com/software/vision-q7yp45",
    source: "https://github.com/pranavsaigandikota/Vision",
    themeColor: "#3cafd1", // Light teal-blue
  },
  {
    title: "Jenny’s Playtime - Horror Survival Game",
    imageSrc: "projects/jennys-playtime.png",
    videoSrc: "projects/jennys-playtime.mp4",
    description:
      "Developed Jenny’s Playtime, a story-driven horror survival game featuring AI bots, published on Itch.io.",
    skills: ["C#", "Unity", "Game Development", "AI Bots"],
    demo: "https://filmasticpg.itch.io/jennys-playtime",
    source: "https://filmasticpg.itch.io/jennys-playtime",
    themeColor: "#b30000", // Red
  },
  {
    title: "Jumblehot - Endless Jumping Game",
    imageSrc: "projects/jumblehot.png",
    videoSrc: "projects/jumblehot.mp4",
    description:
      "Created and published Jumblehot, an endless jumping game released on the Amazon Appstore.",
    skills: ["C#", "Unity", "Mobile Development", "Game Design"],
    demo: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    source: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    themeColor: "#ff6600", // Orange
  },
  {
    title: "NextFlix - Movie Discovery & Watchlist App",
    imageSrc: "projects/nextflix.png",
    videoSrc: "projects/nextflix.mp4",
    description:
      "Mobile app with React Native and Expo to browse movies, watch trailers, and manage a personal watchlist. Integrated Appwrite for user auth and data storage.",
    skills: ["React Native", "Expo", "Appwrite", "API Integration", "UI/UX Design"],
    demo: "",
    source: "https://github.com/pranavsaigandikota/NextFlix/",
    themeColor: "#f54a33", // Bright red-orange
  },
  {
    title: "Humanotone - Face & Hand Controlled Instrument",
    imageSrc: "projects/humanotone.png",
    videoSrc: "projects/humanotone.mp4",
    description:
      "Browser-based instrument that turns facial expressions and hand gestures into music. Built with React, TensorFlow.js, and Mediapipe, with Tone.js handling sound generation.",
    skills: ["React", "TensorFlow.js", "Mediapipe", "Tone.js", "Webcam Input", "Real-Time Interaction"],
    demo: "https://pranavsaigandikota.github.io/Humanotone/",
    source: "https://github.com/pranavsaigandikota/Humanotone/",
    themeColor: "#07a102", // Green
  },
  {
    title: "Exodus Space Settlement - NSS Competition",
    imageSrc: "projects/exodus.png",
    videoSrc: "projects/exodus.mp4",
    description:
      "Designed a blueprint for a space settlement named 'Exodus,' winning first prize in the NSS Space Settlement Competition and presented at ISDC 2021.",
    skills: ["Research", "Design", "Presentation", "Space Science"],
    demo: "https://www.youtube.com/watch?v=GYl_ZlsiQ1c",
    source: "https://drive.google.com/file/d/1SmqbU08lu2u-oHAElzyCyP6lZpyM0h15/view",
    themeColor: "#7b00ff", // Purple
  },
  {
    title: "Robotic Animatronics",
    imageSrc: "projects/robotic-animatronics.png",
    videoSrc: "projects/robotics.mp4",
    description:
      "Created animatronic heads as a hobby, learning the skills of designing, building, and programming robots to operate with a remote control.",
    skills: ["Design", "Building", "Programming", "Robotics"],
    demo: "https://filmasticpg.wixsite.com/mysteriousunloaded",
    source: "https://filmasticpg.wixsite.com/mysteriousunloaded/post/the-mantis-update-a-new-look-and-enhanced-control",
    themeColor: "#ffffff",
  },
  {
    title: "More of My Projects",
    imageSrc: "projects/more-projects.png",
    videoSrc: "projects/more-projects.mp4",
    description:
      "To view all my projects, including 3D animations, research papers, robots, music, and more, click below!",
    skills: [],
    demo: "https://pranavsaigandikota.wixsite.com/filmasticpg",
    source: "",
    themeColor: "#ff66b2",
  },
];

export const Projects = () => {
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
        className="project-grid"
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
            style={{
              border: `1.5px solid ${project.themeColor}`,
              boxShadow: `0 4px 12px ${project.themeColor}40`,
              borderRadius: "16px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.02)",
            }}
          >
            {/* Video Demo */}
            {project.videoSrc && (
              <video
                src={project.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "10px",
                  border: `1px solid ${project.themeColor}`,
                }}
              />
            )}
            <h3 style={{ color: project.themeColor }}>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tech" style={{ marginBottom: "12px" }}>
              {project.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    margin: "4px",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor: `${project.themeColor}20`,
                    color: project.themeColor,
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "6px 16px",
                    backgroundColor: `${project.themeColor}20`,
                    color: project.themeColor,
                    borderRadius: "20px",
                    fontWeight: "500",
                    fontSize: "14px",
                    border: `1.25px solid ${project.themeColor}`,
                    boxShadow: `0 2px 6px ${project.themeColor}40`,
                    textDecoration: "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Demo
                </a>
              )}
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "6px 16px",
                    backgroundColor: `${project.themeColor}20`,
                    color: project.themeColor,
                    borderRadius: "20px",
                    fontWeight: "500",
                    fontSize: "14px",
                    border: `1.25px solid ${project.themeColor}`,
                    boxShadow: `0 2px 6px ${project.themeColor}40`,
                    textDecoration: "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Source
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
