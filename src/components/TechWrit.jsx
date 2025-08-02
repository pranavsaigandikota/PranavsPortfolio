import { motion } from "framer-motion";

const assignmentsData = [
  {
    title: "Proj #1: Instructions",
    description: "Instructions on setting up Full Stack Development Environment using Angular 2+, Node.js, and SQL Server with Bootstrap styling. This guide is aimed at those who are beginning web development or are switching to Angular and want a simple quick guide to setting up all the required tools and connect the back and front ends.",
    fileUrl: "https://drive.google.com/file/d/1gn9sceRnB_Wv95NszQxjzWIMn_drEh5x/view?usp=sharing",
  },
  {
    title: "Proj #2: Resume, Cover Letter, & Position Analysis",
    description: "My current Resume, Cover Letter, and Position Analysis for the Supplemental Instruction Leader - UCF position I applied to. The cover letter shows an example of my technical writing skills, and the position analysis shows my ability to analyze job requirements and match them with my skills.",
    extraFiles: [
      {
        label: "Resume",
        url: "https://drive.google.com/file/d/1vzCYhZYYPTHPoqV0iQLqnx2Yi95O8zcd/view?usp=sharing",
      },
      {
        label: "Cover Letter",
        url: "https://drive.google.com/file/d/1llYsNsLSxOY3PuyNjTpwtdI-2Omo98VN/view?usp=sharing",
      },
      {
        label: "Position Analysis",
        url: "https://drive.google.com/file/d/1lSV8OSZmaPVnzJA_Xb1GmbvlZK4xjond/view?usp=sharing",
      },
    ],
  },
  {
    title: "Proj #3: Research Proposal",
    description: "This is a research project proposal for a study that investigates how generative AI feedback compares to human feedback in terms of improving a college student’s writing skills throughout a semester. This study investigates which feedback type, AI compared to human, gives better writing results, how the students satisfaction and confidence in their writing ability is affected, and how many of the suggestions human vs AI, the students are more likely to implement.",
    fileUrl: "https://drive.google.com/file/d/1WwFKML240-8Tcf6I37ZYGHdU0PO_nDJG/view?usp=sharing",
  },
];

const buttonStyle = {
  padding: "6px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#ff66b2",
  borderRadius: "20px",
  fontWeight: "600",
  fontSize: "14px",
  backdropFilter: "blur(8px)",
  border: "1.25px solid rgba(255, 102, 178, 0.4)",
  boxShadow: "0 2px 6px rgba(255, 102, 178, 0.15)",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease-in-out",
  marginRight: "8px",
  marginTop: "10px",
};

const MajorAssignments = () => {
  return (
    <section id="major-assignments" className="projects" style={{ paddingBottom: "40px" }}>
      <h2 className="text-2xl font-bold mb-6">Technical Writing - Major Assignments</h2>

      <div className="project-grid">
        {assignmentsData.map(({ title, description, fileUrl, extraFiles }, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3>{title}</h3>
            <p>{description}</p>

            {extraFiles ? (
              extraFiles.map(({ label, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-demo"
                  style={buttonStyle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.a>
              ))
            ) : (
              <motion.a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-demo"
                style={buttonStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
      <br></br>
      <motion.div
        id ="assessdp"
        className="project-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: assignmentsData.length * 0.1 }}
        >
        <h3>Assessment of Digital Portfolio</h3>
        <p>While making this website, there were many things I learnt going from content to visual appeal. When it comes to the progress of the site, I would like to note that it is still under development and I look forward to adding more links and more styling to make the site more visually appealing. I will also be adding more sections to the site. <br /><br />As for navigation, I feel satisfied with the way it is currently formatted and find the fonts and text color choices easy to read. Having made this website through react and vite instead of wix or another provider, I have been able to have more freedom in styling and component arrangement with some experience on making a site. I also was able to learn more on what to actually include in a personal portfolio with the help of my technical writing course. <br /><br />Aspects of making this site that were difficult or confusing might be getting certain text to format a certain way on the front end which took a bit extra effort. Some reasources that helped me in this was Youtube for tutorials, ChatGPT for debugging and sites such as aceternity.com for UI elements that were creative and visually appealing.</p>
            </motion.div>
    </section>
  );
};

export default MajorAssignments;
