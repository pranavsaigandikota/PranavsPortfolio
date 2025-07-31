import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span> Hello, I'm </span>
          </motion.div>
          <motion.h1
            className="glitch"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            Pranavsai Gandikota
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            {" "}
            About Me:
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>

I'm currently pursuing a degree in Computer Science at UCF and am interested in software engineering, AI, and being part of the latest tech. I enjoy building fun and creative apps and games, and I look forward to making a positive impact wherever I can.   <br /><br />I have previously worked in VR research for Human Computer Interaction and fine-tuning of AI models. I also have previous web development experience with some of my projects found below. I have had the chance to lead multiple collaborative projects, hackathons and help in research teams, which I enjoy taking part in.<br /><br />Academics aside, I am also the Diwali and Banquet director at the largest Indian club at UCF (Indian Student Association), and am an active member of the badminton club and KnightHacks. I am always eager for the next challenge and opportunity to learn.
           </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a
              href="#projects"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {" "}
              View My Work
            </motion.a>
            <motion.a
  href="https://drive.google.com/file/d/1vzCYhZYYPTHPoqV0iQLqnx2Yi95O8zcd/view?usp=sharing"
  className="cta-secondary"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  target="_blank"
  rel="noopener noreferrer"
>
  Resume
</motion.a>

          </motion.div>
          <motion.div className="social-links" variants={staggerContainer}>
            <motion.a href="https://github.com/pranavsaigandikota" target="_blank">
              <i className="fab fa-github"> </i>
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/pranavsaig" target="_blank">
              <i className="fab fa-linkedin"> </i>
            </motion.a>
            <motion.a href="https://pranavsaigandikota.wixsite.com/filmasticpg" target="_blank">
              <i className="fab fa-fa-solid fa-diagram-project"> </i>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="typescript"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
              {`const aboutMe: DeveloperProfile = {
  codename: "Pranavsai Gandikota",
  origin: "Orlando, FL",
  role: "Aspiring Software Engineer & AI Enthusiast",
  stack: {
    languages: ["C", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    frameworks: ["React", "Next.js", "TailwindCSS", "Supabase", "Angular", "Unity"],
  },
  traits: [
    "problem solver",
    "team player",
    "AI explorer",
    "VR researcher",
    "creative coder",
  ],
  missionStatement:
    "Building impactful tech that solves real problems and pushes boundaries",
  availability: "Available for internships and part-time roles",
};
`}
            </SyntaxHighlighter>
          </div>

          <motion.div
            className="floating-card"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon"> 💻 </span>
              <span className="card-text">
                {" "}
                Scroll down for more awesome projects of mine!
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
