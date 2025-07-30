import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import ExperienceExpandable from "./components/ExperienceExpandable";
import MajorAssignments from "./components/TechWrit";
import { Achievements } from "./components/Achievements";
import { Skills } from "./components/Skills";
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
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <Navbar />
      <Hero />
      <ExperienceExpandable />
      <Projects />
      <Skills />
      <Achievements />
      <MajorAssignments />
      <Contact />

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>2025 Pranavsai Gandikota Portfolio</p>
      </motion.footer>
    </div>
  );
}

export default App;
