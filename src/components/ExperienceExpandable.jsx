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

const experiences = [
  {
    role: "Research Assistant (VR and Human Computer Interaction Lab)",
    organisation: "University of Central Florida",
    startDate: "September 2024",
    endDate: "Present",
    experiences: [
      "Assisted PhD researcher in conducting user studies for VR Sensor Awareness project.",
      "4th authored in SIGGRAPH paper submission for 3D Scene Generation from natural language.",
      "Implemented QLORA fine tuning and weighted use of models for optimization of survey LLM.",
      "Working on improving previously made survey LLM and implementing it in VR.",
    ],
    imageSrc: "/history/ucf.png",
  },
  {
    role: "Diwali and Banquet Director – Indian Student Association UCF",
    organisation: "University of Central Florida",
    startDate: "June 2025",
    endDate: "Present",
    experiences: [
      "Responsible for organizing and maintaining the structure of the event operations for smooth execution.",
    ],
    imageSrc: "/history/ucf.png",
  },
  {
    role: "Cultural Secretary (Student Government)",
    organisation: "Ithaka International School, Nellore, India",
    startDate: "June 2022",
    endDate: "April 2023",
    experiences: [
      "Initiated and led science/tech fairs, cultural festivals, and sports competitions for all students.",
      "Showcased leadership skills, collaboration, and teamwork with the student government.",
    ],
    imageSrc: "/history/ithaka.png",
  },
  {
    role: "NSS Space Settlement First Place Winner",
    organisation: "National Space Society",
    startDate: "December 2022",
    endDate: "February 2023",
    experiences: [
      "Developed a comprehensive 50-page research document on sustainability, space habitation, and resource management.",
      "Presented oral and poster presentations to industry professionals at ISDC Conference 2023 in Arlington, Virginia.",
    ],
    imageSrc: "/history/nss.png",
  },
];

const ExperienceExpandable = () => {
  return (
    <motion.section
      id="experienceexpandable"
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
        My Experiences
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            {/* Image placeholder (optional): */}
            {/* <img src={exp.imageSrc} alt={`${exp.organisation} logo`} className="experience-logo" /> */}

            <h3 className="text-lg font-semibold">{exp.role}</h3>
<p className="italic text-sm text-gray-600 mt-2 mb-3 leading-snug">
              {exp.organisation} | {exp.startDate} – {exp.endDate}
                          <ul>
              {exp.experiences.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            </p>


          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ExperienceExpandable;
