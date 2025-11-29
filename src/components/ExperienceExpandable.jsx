import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceModal } from "./ExperienceModal";

// Import Images
import isueLab from "../assets/ExperiencesPics/ISUELAB.png";
import isueUserStudy from "../assets/ExperiencesPics/ISUELABUSERSTUDY.jpeg";
import isueProcGen from "../assets/ExperiencesPics/ISUEProceduralGenerationUnity.jpeg";
import isueRoomGen from "../assets/ExperiencesPics/ISUERoomgeneration.jpeg";
import isueWhisper from "../assets/ExperiencesPics/ISUEWhisperAI.jpeg";

import siGroup from "../assets/ExperiencesPics/SIGroup.jpeg";
import siGroupFunny from "../assets/ExperiencesPics/SIGroupFunny.png";
import knightHacks from "../assets/ExperiencesPics/KnightHacks.png";
import diwaliBackdrop from "../assets/ExperiencesPics/DiwaliBackdrop.jpeg";
import diwaliBoard from "../assets/ExperiencesPics/DiwaliBoard.jpeg";
import diwaliCrowd from "../assets/ExperiencesPics/DiwaliCrowd.jpeg";
import diwaliFood from "../assets/ExperiencesPics/DiwaliFood.jpeg";
import diwaliSpeech from "../assets/ExperiencesPics/DiwaliSpeechTalking.jpeg";
import culturalSec from "../assets/ExperiencesPics/CulturalSecretary.png";
import nssAward from "../assets/ExperiencesPics/NSSAwardrecieval.jpeg";
import nssNews from "../assets/ExperiencesPics/NSSLocalNewsTV.png";
import nssMeeting from "../assets/ExperiencesPics/NSSMeeting.jpeg";
import nssPoster from "../assets/ExperiencesPics/NSSPresentationPoster.jpeg";
import nssSpeech from "../assets/ExperiencesPics/NSSSpaceSettlementSpeech.jpeg";
import nssStandalone from "../assets/ExperiencesPics/NSSSpaceStandalone.jpeg";
import nssNewspaper from "../assets/ExperiencesPics/NSSonNewspaper.jpeg";
import nssPress from "../assets/ExperiencesPics/NssPressmeet.jpeg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const experiences = [
  {
    role: "Research Assistant",
    organisation: "University of Central Florida | ISUE Lab",
    startDate: "Sep 2024",
    endDate: "Present",
    type: "Work",
    themeColor: "#3b82f6", // Blue
    images: [isueLab, isueUserStudy, isueProcGen, isueRoomGen, isueWhisper],
    experiences: [
      "Assisted PhD researcher in improving pipeline for selective text-to-3D generation.",
      "Conducted user studies for VR Sensor Awareness project.",
      "Implemented QLORA fine-tuning for LLM optimization.",
    ],
  },
  {
    role: "SI Leader – Computer Science I",
    organisation: "University of Central Florida | SARC",
    startDate: "Aug 2025",
    endDate: "Present",
    type: "Work",
    themeColor: "#3b82f6", // Blue
    images: [siGroup, siGroupFunny],
    experiences: [
      "Lead weekly SI sessions for students in COP 3502C (CS1).",
      "Develop interactive coding exercises and review materials.",
      "Foster a collaborative learning environment.",
    ],
  },
  {
    role: "Web Design & 3D Animation",
    organisation: "KnightHacks, UCF",
    startDate: "Sep 2025",
    endDate: "Present",
    type: "Club",
    themeColor: "#f59e0b", // Amber
    images: [knightHacks],
    experiences: [
      "Designing the official KnightHacks website UI/UX.",
      "Creating 3D animations for UCF’s largest software org.",
    ],
  },
  {
    role: "Diwali and Banquet Director",
    organisation: "Indian Student Association UCF",
    startDate: "Jun 2025",
    endDate: "Present",
    type: "Leadership",
    themeColor: "#ec4899", // Pink
    images: [diwaliBackdrop, diwaliSpeech, diwaliCrowd, diwaliBoard, diwaliFood],
    experiences: [
      "Organizing and hosting Diwali and Banquet events.",
      "Coordinating with other clubs and planning logistics.",
    ],
  },
  {
    role: "Cultural Secretary",
    organisation: "Ithaka International School",
    startDate: "Jun 2022",
    endDate: "Apr 2023",
    type: "Leadership",
    themeColor: "#10b981", // Emerald
    images: [culturalSec],
    experiences: [
      "Initiated and led science/tech fairs and cultural festivals.",
      "Showcased leadership and collaboration skills.",
    ],
  },
  {
    role: "NSS Space Settlement Research/Presenter",
    organisation: "National Space Society",
    startDate: "Dec 2022",
    endDate: "Feb 2023",
    type: "Research",
    themeColor: "#8b5cf6", // Violet
    images: [nssAward, nssSpeech, nssPoster, nssStandalone, nssNews, nssMeeting, nssNewspaper, nssPress],
    experiences: [
      "First Place Winner for 'Exodus' space settlement design.",
      "Presented at ISDC Conference 2022 in Arlington, Virginia.",
    ],
  },
];

const CardImageCarousel = ({ images, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
    </div>
  );
};

const ExperienceExpandable = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (exp) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <motion.section
      id="experience"
      className="projects py-20 px-5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
      >
        My Experience
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={staggerContainer}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="project-card cursor-pointer group relative"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onClick={() => openModal(exp)}
            style={{
              "--theme-color": exp.themeColor,
            }}
          >
            {/* Image Container */}
            <div
              className="project-image-container relative overflow-hidden h-48 w-full"
              style={{
                backgroundColor: `${exp.themeColor}10`,
                borderBottom: `1px solid ${exp.themeColor}20`
              }}
            >
              {/* Carousel Background */}
              {exp.images && exp.images.length > 0 ? (
                <CardImageCarousel images={exp.images} />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="project-overlay pointer-events-none">
                <span>Click for Details</span>
              </div>
            </div>

            <div className="project-content">
              <div className="flex justify-between items-start mb-2">
                <h3
                  className="project-title text-lg"
                  style={{ color: "white" }}
                >
                  {exp.role}
                </h3>
              </div>

              <p className="text-[var(--accent-color)] text-sm font-bold mb-3">
                {exp.organisation}
              </p>

              <ul className="list-disc pl-5 space-y-2 mb-4 flex-1 text-[var(--light-text)] text-sm">
                {exp.experiences.slice(0, 2).map((point, i) => (
                  <li key={i} className="pl-1">
                    <span className="line-clamp-2">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="project-tech mt-auto">
                <span className="tech-tag" style={{ borderColor: exp.themeColor, color: exp.themeColor }}>
                  {exp.type}
                </span>
                <span className="tech-tag">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ExperienceModal
        experience={selectedExperience}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.section>
  );
};

export default ExperienceExpandable;
