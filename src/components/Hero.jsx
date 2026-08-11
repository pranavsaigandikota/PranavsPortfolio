import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";

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
            I&apos;m <strong>Pranav</strong>, a <strong>Computer Science junior at UCF</strong>. I just finished a software engineering internship at <strong>Ford</strong> on the Order Fulfillment team, working on cloud migration and automation. I moved legacy batch workloads to <strong>Spring Boot on Cloud Run</strong>, built an event-driven secret rotation platform on <strong>Google Cloud</strong>, and shipped an AI agent that resolved compliance issues during a large repo migration.
            <br />
            <br />
            On campus, I&apos;m the <strong>CS Technical Chair for SASE</strong> (dev team lead) and <strong>Project Director for AI at UCF</strong>, where I create opportunities for students to showcase their AI development work. Before that I researched at UCF&apos;s ISUE Lab, fine-tuning <strong>LLaMA with QLoRA</strong> for a text-to-3D pipeline.
            <br />
            <br />
            Outside of that I build constantly: a <strong>full-stack inventory app with Spring AI</strong>, a <strong>video chat platform on GCP</strong>, and a recent <strong>full-stack web application built with React and Tailwind</strong>.
            <br />
            <br />
            What ties it together is that I like understanding systems end to end, not just the part I&apos;m assigned, and I care about why the work matters to the business. <strong>Large datasets</strong>, <strong>cloud infrastructure</strong>, and <strong>automation</strong> are where I do my best work.
          </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer}>
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
