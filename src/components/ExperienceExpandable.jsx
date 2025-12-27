import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceModal } from "./ExperienceModal";
// Import Images
import PropTypes from "prop-types";
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
// import nssAward from "../assets/ExperiencesPics/NSSAwardrecieval.jpeg";
// import nssNews from "../assets/ExperiencesPics/NSSLocalNewsTV.png";
import nssMeeting from "../assets/ExperiencesPics/NSSMeeting.jpeg";
import nssPoster from "../assets/ExperiencesPics/NSSPresentationPoster.jpeg";
import nssSpeech from "../assets/ExperiencesPics/NSSSpaceSettlementSpeech.jpeg";
import nssStandalone from "../assets/ExperiencesPics/NSSSpaceStandalone.jpeg";
import nssNewspaper from "../assets/ExperiencesPics/NSSonNewspaper.jpeg";
// import nssPress from "../assets/ExperiencesPics/NssPressmeet.jpeg";
import bnyImg from "../assets/ExperiencesPics/BNY.jpg";
import perplexityImg from "../assets/ExperiencesPics/perplexity.png";

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
    role: "Undergraduate Research Assistant",
    organisation: "ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF",
    startDate: "Sep. 2024",
    endDate: "Dec. 2025",
    type: "Work",
    themeColor: "#3b82f6", // Blue
    images: [isueLab, isueUserStudy, isueProcGen, isueRoomGen, isueWhisper],
    experiences: [
      "Contributed in streamlining a user-driven text-to-3D generation pipeline.",
      "Co-authored related works in SIGGRAPH paper submission for 3D Scene Generation from natural language.",
      "Implemented QLORA fine-tuning of Llama and weighted use of models for optimization of survey LLM.",
      "Conducted user studies for the VR Sensor Awareness project.",
    ],
  },
  {
    role: "Supplemental Instruction (SI) Leader - Computer Science 1",
    organisation: "Student Academic Resource Center (SARC), UCF",
    startDate: "Aug. 2025",
    endDate: "Dec. 2025",
    type: "Work",
    themeColor: "#3b82f6", // Blue
    images: [siGroup, siGroupFunny],
    experiences: [
      "Holding collaborative study sessions for students enrolled in Computer Science I in support to Dr. Arup Guha's classes.",
      "Facilitated both in-person and online sessions (via Zoom) to support diverse learning needs.",
      "Designing and holding engaging review materials, practice problems, and interactive activities to reinforce course concepts.",
      "Encouraging active participation and peer-to-peer learning to strengthen student understanding and problem-solving skills.",
      "Supporting students in preparing for exams and assignments by breaking down complex topics into approachable steps.",
    ],
  },
  {
    role: "Web Design and 3D Animation - KnightHacks",
    organisation: "KnightHacks, University of Central Florida",
    startDate: "Sep. 2025",
    endDate: "Present",
    type: "Club",
    themeColor: "#f59e0b", // Amber
    images: [knightHacks],
    experiences: [
      "Designing and developing the official KnightHacks website UI/UX.",
      "Creating 3D animations, graphics, and visual assets to enhance the hackathon’s branding and user experience.",
      "Helping in Dev Sprints and other tasks behind KnightHacks.",
      "Contact: pranavsaig@knighthacks.org",
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
      "Leading the planning and execution of Diwali and Banquet events for UCF’s largest Indian student organization.",
      "Coordinating with multiple teams and clubs to deliver engaging experiences for the campus community with turnouts up-to almost 300+ attendees.",
      "Contributed innovative ideas and guided team members to ensure successful event execution.",
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
    images: [nssSpeech, nssPoster, nssStandalone, nssMeeting, nssNewspaper],
    experiences: [
      "First Place Winner for 'Exodus' space settlement design.",
      "Presented at ISDC Conference 2022 in Arlington, Virginia.",
    ],
  },
  {
    role: "Knights Shadow",
    organisation: "BNY",
    startDate: "Dec 2025",
    endDate: "Dec 2025",
    type: "Shadowing",
    themeColor: "#EFB008", // Gold
    images: [bnyImg],
    experiences: [
      "Shadowed industry professionals at BNY Mellon, gaining first-hand exposure to the daily operations and technical challenges of a global financial services company.",
      "Networked with software engineering managers and technical leads to understand the software development lifecycle (SDLC) within the fintech sector.",
      "Acquired insights into enterprise-scale application workflows, identifying key skills and technologies required for success in financial software engineering.",
    ],
  },
  {
    role: "Campus Partner | Perplexity",
    organisation: "Perplexity",
    startDate: "Sep 2025",
    endDate: "Dec 2025",
    type: "Part-time",
    themeColor: "#22d3ee", // Cyan
    images: [perplexityImg],
    experiences: [
      "Promoting Perplexity AI on campus by driving student adoption, referrals, and engagement with Comet and Perplexity Pro.",
      "Gaining hands-on experience in marketing, outreach, and community building.",
      "Connecting students to smarter ways to study and research.",
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
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full absolute inset-0"
        >
          <img
            src={images[index]}
            alt="Experience"
            className="project-image-img w-full h-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

CardImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
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
    // setSelectedExperience(null); 
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
            className="project-card group relative"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
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
                borderBottom: `4px solid ${exp.themeColor}`
              }}
            >
              {/* Carousel Background */}
              {exp.images && exp.images.length > 0 ? (
                <CardImageCarousel 
                  images={exp.images} 
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 font-mono">
                  [NO IMAGE]
                </div>
              )}

              <div className="project-overlay pointer-events-none">
                <span className="font-mono uppercase">[ Click for Details ]</span>
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

              <p className="project-description-preview" style={{ color: exp.themeColor, fontWeight: "bold", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                {exp.organisation}
              </p>

              <ul className="list-none space-y-2 mb-4 flex-1 text-[var(--light-text)] text-sm font-mono">
                {exp.experiences.slice(0, 2).map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: exp.themeColor }}>{">"}</span>
                    <span className="line-clamp-2">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="project-tech mt-auto">
                <span className="tech-tag" style={{ border: `2px solid ${exp.themeColor}`, color: "#000", background: exp.themeColor }}>
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
