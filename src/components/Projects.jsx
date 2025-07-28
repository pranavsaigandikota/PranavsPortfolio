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
    title: "Freedom Finances - Shell Hacks 2024",
    imageSrc: "projects/freedom-finances.png",
    description:
      "Developed a debt management website aimed particularly at underrepresented communities, interpreting bank statements to offer personalized debt management suggestions. Contributed to user experience and interface (UX/UI) design.",
    skills: ["HTML", "CSS", "ReactJS", "JavaScript"],
    demo: "https://freedomfinances.xyz/",
    source: "https://github.com/colemaring/Freedom-Finanaces",
  },
  {
    title: "Vision - Knight Hacks VII",
    imageSrc: "projects/vision.png",
    description:
      "Built a Python app that empowers users with limited mobility to draw on a virtual canvas using eye tracking and voice commands. Integrated multiple Python libraries into the project.",
    skills: ["Python", "OpenCV", "Speech Recognition"],
    demo: "https://devpost.com/software/vision-q7yp45",
    source: "https://github.com/pranavsaigandikota/Vision",
  },
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
      </motion.div>
    </motion.section>
  );
};
