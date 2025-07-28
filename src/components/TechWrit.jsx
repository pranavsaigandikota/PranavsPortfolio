const assignmentsData = [
  {
    title: "Project #1: Instructions",
    description: "Instructions on setting up Full Stack Development Environment",
    fileUrl: "src/assets/projects/proj 1.pdf",
  },
  {
    title: "Project #2: Resume, Cover Letter, & Position Analysis",
    description: "My current Resume, Cover Letter, and Position Analysis for a job I applied to.",
    fileUrl: "src/assets/projects/proj 2.pdf",
  },
  {
    title: "Project #3: Proposal",
    description: "Proposal for a research project I am working on.",
    fileUrl: "src/assets/projects/proj 3.pdf",
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
};

const MajorAssignments = () => {
  return (
    <section id="major-assignments" className="projects" style={{ paddingBottom: "40px" }}>
      <h2 className="text-2xl font-bold mb-6">Technical Writing - Major Assignments</h2>

      <div className="project-grid">
        {assignmentsData.map(({ title, description, fileUrl }, index) => (
          <div key={index} className="project-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <a
              href={fileUrl}
              download
              style={buttonStyle}
              className="btn-demo"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MajorAssignments;
