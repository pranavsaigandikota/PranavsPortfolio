import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Full code string
const codeString = `const aboutMe: DeveloperProfile = {
  codename: "Pranavsai Gandikota",
  origin: "Orlando, FL",
  role: "Software Engineer & AI Enthusiast",
  stack: {
    // (More skills adding)
    languages: ["C", "Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    frameworks: ["React.js", "Spring Boot", "Next.js", "TailwindCSS", "Supabase", "Unity", ...],
    ai: ["GPT", "Gemini", "LLaMA", "OpenCV", "TensorFlow", "HuggingFace", ...],
  },
  traits: [
    "Curious learner",
    "Problem solver",
    "Initiative leader",
    "Adaptable thinker",
    "Calm & persistent",
  ],
  missionStatement: "Building impactful tech that solves real problems and shipping reliable code",
  // ... and tackling any problems encountered (calmly).
  availability: "Available for internships and part-time roles",
  contact: "pranavsaigandikota@gmail.com | pr337157@ucf.edu",
  funFact: "I love playing the piano and watching movies."
};
`;

// Typewriter component with mistakes
const TypewriterCode = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [i, setI] = useState(0);
  const [mistake, setMistake] = useState(false);
  const [wrongWord, setWrongWord] = useState("");

  useEffect(() => {
    if (i >= codeString.length) return;

    const timeout = setTimeout(() => {
      // Randomly insert a wrong word
      if (!mistake && Math.random() < 0.03 && displayedCode.length > 10) {
        const sampleMistakes = ["cont", "DevProfile", "codne", "recat", "Stack"];
        const word = sampleMistakes[Math.floor(Math.random() * sampleMistakes.length)];
        setWrongWord(word);
        setDisplayedCode((prev) => prev + word);
        setMistake(true);
      } else if (mistake) {
        // Delete wrong word character by character
        if (wrongWord.length > 0) {
          setDisplayedCode((prev) => prev.slice(0, -1));
          setWrongWord((prev) => prev.slice(0, -1));
        } else {
          setMistake(false);
        }
      } else {
        // Normal typing
        setDisplayedCode((prev) => prev + codeString.charAt(i));
        setI(i + 1);
      }
    }, 20);

    return () => clearTimeout(timeout);
  }, [displayedCode, i, mistake, wrongWord]);

  return (
    <SyntaxHighlighter
      language="typescript"
      customStyle={{
        margin: 0,
        padding: "1rem",
        minHeight: "100%",
        background: "transparent",
        marginBottom: 50,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "0.9rem",
        color: "#fdfbf7",
      }}
      style={vscDarkPlus}
    >
      {displayedCode}
    </SyntaxHighlighter>
  );
};

// Motion variants
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
  const navigate = useNavigate();

  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">
        {/* Hero Text Content */}
        <motion.div
          className="hero-content"
          style={{ paddingTop: '2rem' }}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span>Hello, I&apos;m</span>
          </motion.div>
          <motion.h1
            className="glitch"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            Pranavsai Gandikota
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            About Me:
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            I&apos;m Pranav, a Computer Science junior at UCF who enjoys building software that connects the dots between applications, infrastructure, and AI.
            <br />
            <br />
            Most recently, I worked as a Software Engineering Intern on Ford&apos;s Order Fulfillment team, where I migrated legacy batch workloads to Spring Boot on Google Cloud Run, built event driven automation for cloud infrastructure, and developed an AI agent to help resolve compliance issues during a large scale repository migration.
            <br />
            <br />
            At UCF, I&apos;m the CS Technical Chair for SASE, where I lead the development team, and a Project Director for AI at UCF, where I help create opportunities for students to build and showcase AI projects. I previously worked as a researcher in UCF&apos;s ISUE Lab, where I fine tuned LLaMA with QLoRA for a text to 3D generation pipeline.
            <br />
            <br />
            Outside of work and research, I&apos;m constantly building. I&apos;ve worked on a full stack inventory platform using Spring AI, a real time video chat platform deployed on GCP, and several other applications that have taken me from an idea to a working product.
            <br />
            <br />
            What ties everything together is my curiosity about how systems work end to end. I like going beyond the part I&apos;m assigned understanding the infrastructure behind an application, the data flowing through it, and ultimately why the system matters to the people and business using it. I&apos;m especially drawn to cloud infrastructure, automation, AI, and systems that work with data at scale.
          </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <motion.a
              href="#projects"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1gjZDcvajl7hJfUozTfaWkfw-m-TJXfAk/view?usp=sharing"
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </motion.a>
            <motion.a
              href="/flix"
              onClick={(e) => {
                e.preventDefault();
                navigate("/flix");
              }}
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderColor: '#e50914', color: '#e50914' }}
            >
              pranavsaig.dev/flix
            </motion.a>
          </motion.div>

          <motion.div className="social-links" variants={staggerContainer}>
            <motion.a href="https://github.com/pranavsaigandikota" target="_blank">
              <i className="fab fa-github"> </i>
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/pranavsaig" target="_blank">
              <i className="fab fa-linkedin"> </i>
            </motion.a>
            <motion.a
              href="https://pranavsaigandikota.wixsite.com/filmasticpg"
              target="_blank"
            >
              <i className="fab fa-fa-solid fa-diagram-project"> </i>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Code Section */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="retro-window">
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
               <div className="w-3 h-3 rounded-full bg-white/20"></div>
             </div>
             
            </div>
            <div className="p-4 bg-transparent">
              <TypewriterCode />
            </div>
          </div>


        </motion.div>
      </div>
    </motion.section>
  );
};
