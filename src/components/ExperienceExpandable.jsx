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
    organisation: "University of Central Florida | ISUE Lab",
    startDate: "September 2024",
    endDate: "Present",
    experiences: [
      "Assisted PhD researcher in improving pipeline for selective text-to-3D generation and creating a GUI.",
      "Conducted user studies for VR Sensor Awareness project.",
      "Authored related works in SIGGRAPH paper submission for 3D Scene Generation from natural language.",
      "Implemented QLORA fine-tuning and weighted use of models for optimization of LLM.",
      "Worked on improving previously made survey LLM to enhance efficiency and implement it in VR.",

    ],
    imageSrc: "/history/ucf.png",
  },
  
  {
    role: "Supplemental Instruction (SI) Leader – Computer Science I",
    organisation: "University of Central Florida | SARC",
    startDate: "August 2025",
    endDate: "Present",
    experiences: [
      "Lead weekly SI sessions for students in COP 3502C (CS1) under Dr. Arup Guha.",
      "Develop interactive coding exercises, problem-solving activities, and review materials to reinforce C programming concepts, recursion, memory management, and topics of data structures and algorithms.",
      "Foster a collaborative learning environment by encouraging group discussions and peer-to-peer interactions.",
      "Collaborate with faculty and fellow SI leaders to assess student needs and adapt instructional strategies for maximum impact."
    ],
    imageSrc: "/history/ucf.png",
  },
  {
  role: "Web Design and 3D Animation - Design Team",
  organisation: "KnightHacks, University of Central Florida",
  startDate: "September 2025",
  endDate: "Present",
  experiences: [
    "Designing the official KnightHacks website UI/UX.",
    "Creating 3D animations for UCF’s largest software development organization with 500+ members."
  ],
  imageSrc: "/history/knighthacks.png",
},

  {
    role: "Diwali and Banquet Director – Indian Student Association UCF",
    organisation: "University of Central Florida",
    startDate: "June 2025",
    endDate: "Present",
    experiences: [
      "Responsible for organizing and hosting the Diwali and Banquet events with a team, including planning, coordinating with other clubs, and presenting the events for the college community.",
      "Contributed creative ideas and collaborated with team members to support club events."
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
      "Presented oral and poster presentations to industry professionals at ISDC Conference 2022 in Arlington, Virginia.",
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
