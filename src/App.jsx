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

        <TornPaperDivider color="#0a0a0a" accentColor="#33ff00" />
        <ExperienceExpandable />

        <TornPaperDivider flip color="#050505" accentColor="#00ffcc" />
        <Projects />

        <TornPaperDivider color="#0a0a0a" accentColor="#ff33aa" />
        <Skills />

        <TornPaperDivider flip color="#050505" accentColor="#33ff00" />
        <Achievements />

        <TornPaperDivider color="#0a0a0a" accentColor="#facc15" />
        <ResearchPapers />

        {/* <MajorAssignments /> */}
        {/* <Contact /> */}

        <TornPaperDivider color="#000000" accentColor="#00ffcc" />

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>Made with love by Pranavsai Gandikota</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
