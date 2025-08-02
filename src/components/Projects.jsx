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
  title: "Freedom Finances - ShellHacks 2024",
  imageSrc: "projects/freedom-finances.png",
  description:
    "Created a web app to help users manage debt and improve financial literacy by analyzing banking data using Plaid and GPT-3.5. I learned React from scratch, contributed to UI design, and collaborated on integrating Appwrite for authentication and storage.",
  skills: ["React.js", "JavaScript", "Plaid API", "Appwrite", "OpenAI", "UI/UX Design"],
  demo: "https://freedomfinances.xyz/",
  source: "https://github.com/colemaring/Freedom-Finanaces"
},


{
  title: "Vision - Knight Hacks VII",
  imageSrc: "projects/vision.png",
  description:
    "Built an assistive drawing app that lets users create art using only eye movements and voice commands. I learned how to implement real-time eye tracking with OpenCV, voice control with speech recognition, and design accessible interfaces with Pygame. Worked in a team to integrate multiple Python libraries into a seamless experience.",
  skills: ["Python", "OpenCV", "Pygame", "Speech Recognition", "Accessibility Design"],
  demo: "https://devpost.com/software/vision-q7yp45",
  source: "https://github.com/pranavsaigandikota/Vision"
},

,
  {
    title: "Freelance Game and App Development",
    imageSrc: "projects/freelance-game-dev.png",
    description:
      "Developed and published PC games and mobile apps on platforms like Itch.io, simmer.io, and the Google Play Store. Titles include Jenny’s Playtime, Jumblehot, and Speakly.",
    skills: ["C#", "Unity", "Game Development", "Mobile Development"],
    demo: "https://simmer.io/@FilmasticPG/jenny-s-playtime",
    source: "https://www.youtube.com/@earthlytomcat11",
  },
{
  title: "NextFlix - Movie Discovery & Watchlist App",
  imageSrc: "projects/nextflix.png",
  description:
    "Built a mobile app with React Native and Expo to browse movies, watch trailers, and manage a personal watchlist. Integrated Appwrite for user auth and data storage. Learned API integration, responsive design with NativeWind, and scalable app structure using Expo Router.",
  skills: ["React Native", "Expo", "Appwrite", "API Integration", "UI/UX Design"],
  demo: "",
  source: "https://github.com/pranavsaigandikota/NextFlix/"
},
{
  title: "Humanotone - Face & Hand Controlled Instrument",
  imageSrc: "projects/humanotone.png",
  description:
    "Built a browser-based musical instrument using React and TensorFlow.js that turns facial expressions and hand gestures into music. Users can raise eyebrows to switch tones, open their mouth to control volume, tilt their head to shift pitch, and move their hand like a theremin to play notes. Includes a sound visualizer and octave control for a dynamic, hands-free music experience.",
  skills: ["React", "TensorFlow.js", "Mediapipe", "Tone.js", "Webcam Input"],
  demo: "https://pranavsaigandikota.github.io/Humanotone/",
  source: "https://github.com/pranavsaigandikota/Humanotone/"
}
,

  {
    title: "Exodus Space Settlement - NSS Space Settlement Competition",
    imageSrc: "projects/exodus.png",
    description:
      "Designed and developed a blueprint for a space settlement named 'Exodus,' winning first prize in the National Space Society Space Settlement Competition. Presented at the International Space Development Conference (ISDC) 2021.",
    skills: ["Research", "Design", "Presentation", "Space Science"],
    demo: "https://www.youtube.com/watch?v=GYl_ZlsiQ1c",
    source:
      "https://drive.google.com/file/d/1SmqbU08lu2u-oHAElzyCyP6lZpyM0h15/view",
  },
  {
    title: "Robotic Animatronics",
    imageSrc: "projects/robotic-animatronics.png",
    description:
      "Create animatronic heads as a side hobby, learning the skills of designing, building, and programming robots to operate with a remote control.",
    skills: ["Design", "Building", "Programming", "Robotics"],
    demo: "https://filmasticpg.wixsite.com/mysteriousunloaded",
    source:
      "https://filmasticpg.wixsite.com/mysteriousunloaded/post/the-mantis-update-a-new-look-and-enhanced-control",
  },
];

const buttonStyle = {
  padding: "6px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#ff66b2",
  borderRadius: "20px",
  fontWeight: "500",
  fontSize: "14px",
  backdropFilter: "blur(8px)",
  border: "1.25px solid rgba(255, 102, 178, 0.4)",
  boxShadow: "0 2px 6px rgba(255, 102, 178, 0.15)",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease-in-out",
};

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
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-demo"
                style={buttonStyle}
              >
                Demo
              </a>
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-source"
                style={buttonStyle}
              >
                Source
              </a>
            </div>
          </motion.div>
        ))}

        {/* More of My Projects card */}
        <motion.div
          key="more-projects"
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <h3>More of My Projects</h3>
          <p>
            To view all my projects, including 3D animations, research papers, robot creations, music, and more, click here!
          </p>
          <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }}
            >
            <a
              href="https://pranavsaigandikota.wixsite.com/filmasticpg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-demo"
              style={buttonStyle}
            >
              View More Cool Projects
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
