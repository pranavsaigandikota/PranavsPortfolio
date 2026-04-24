import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import ExperienceExpandable from "./components/ExperienceExpandable";
import { Achievements } from "./components/Achievements";
import { Skills } from "./components/Skills";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { TornPaperDivider } from "./components/TornPaperDivider";
import { ResearchPapers } from "./components/ResearchPapers";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    // 🔽 Smooth scroll to #section after animations have loaded
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 600); // Delay for animations to mount (adjust if needed)
      }
    };

    scrollToHash();
  }, []);

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`} style={{ position: "relative" }}>
      {/* Floating background icons — fixed, behind all content */}
      <ParallaxBackground />

      {/* Main content above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />

        <TornPaperDivider color="#1f1917" accentColor="#d4a373" />
        <ExperienceExpandable />

        <TornPaperDivider flip color="#1f1917" accentColor="#d4a373" />
        <Projects />

        <TornPaperDivider color="#1f1917" accentColor="#d4a373" />
        <Skills />

        <TornPaperDivider flip color="#1f1917" accentColor="#d4a373" />
        <Achievements />

        <TornPaperDivider color="#1f1917" accentColor="#d4a373" />
        <ResearchPapers />

        {/* <MajorAssignments /> */}
        {/* <Contact /> */}

        <TornPaperDivider color="#1f1917" accentColor="#d4a373" />

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-flex', color: '#4ade80', filter: 'drop-shadow(0 0 6px #4ade80)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.span>
            by Pranavsai Gandikota
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
