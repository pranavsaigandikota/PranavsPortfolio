import './RecruiterHome.css';
import exodusPaper from '../Research Papers/Exodus Winning First Paper.pdf';
import stylusPaper from '../Research Papers/Research Final Paper Stylus.pdf';
import securityPaper from '../Research Papers/MOVEit_Attack_Pranavsai_G_new (1).pdf';

const work = [
  {
    title: 'Ford Motor Company', role: 'Software Engineering Intern | May-Aug 2026', metric: '92% less processing time',
    description: <>Modernized <strong>six batch processes</strong> with Java 21, Spring Boot, and PostgreSQL, cutting runtime from <strong>45 to 3.5 minutes</strong>.</>,
    evidence: ['Validated 200,000+ records against legacy outputs.', 'Added 143 tests with over 90% coverage.'],
    tools: 'Java | Spring Boot | PostgreSQL | GCP',
  },
  {
    title: 'UCF SASE', role: 'CS Tech Chair | Event platform', metric: '230+ registered members',
    description: <>Led development of a member and event platform. Built <strong>QR check-ins, attendance tracking, and the PostgreSQL schema</strong>; the team delivered registration and admin tools.</>,
    tools: 'Next.js | TypeScript | Supabase | PostgreSQL',
  },
  {
    title: 'uKnight', role: 'Team Lead | University video chat', metric: '6-person team',
    description: <>Led development of university video chat on Cloud Run. Used <strong>Redis queues and atomic Lua operations</strong> to prevent double-matches across backend instances.</>,
    tools: 'Spring Boot | WebRTC | Redis | Lua | GCP', links: [['Code', 'https://github.com/uKnight-Co/uKnight'], ['Website', 'https://uknight.net']],
  },
  {
    title: 'Paradise', role: 'DeafBlind navigation prototype', metric: '3rd of 290+ projects',
    description: <>Built a <strong>vision-to-haptics navigation prototype</strong> for DeafBlind users. Separated depth estimation from object detection for responsive guidance. Our team placed 3rd Best Overall at ShellHacks 2026.</>,
    tools: 'WebRTC | YOLO | Depth Anything V2 | ONNX Runtime', links: [['Project', 'https://devpost.com/software/paradise-n0i7of']],
  },
  {
    title: 'ISUE Lab, UCF', role: 'Research Assistant | Applied AI', metric: '1,820 study examples',
    description: <>Fine-tuned <strong>three Llama 3.1 adapters</strong> with QLoRA to predict cognitive load and usability from VR responses. Also built a Python text-to-3D pipeline.</>,
    tools: 'Python | PyTorch | Llama 3.1 | QLoRA',
  },
];

export function RecruiterHome() {
  return <div className="portfolio">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="#home" className="site-name">Pranav</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#skills">Skills</a><a href="#contact">Contact</a><a className="resume-link" href="/Pranavsai_Gandikota_SWE.pdf" download>Resume <span className="sr-only">PDF download</span></a></nav></header>
    <main id="main">
      <section id="home" className="intro" aria-labelledby="name"><div><h1 id="name">Pranavsai Gandikota</h1><p className="intro-role">Software engineer</p><p>Former Ford software engineering intern. Computer Science at UCF. I build backend systems, web applications, and applied AI tools.</p><p className="muted intro-meta">Orlando, FL | Graduating May 2028</p><div className="intro-links"><a href="mailto:pranavsaigandikota@gmail.com">Email</a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer">GitHub</a></div></div><img className="portrait" src="/editorial/pranav-suit-original-v3.png" width="1053" height="1494" alt="Pranav in a navy suit"/></section>
      <section id="work" aria-labelledby="work-title"><h2 id="work-title">Selected work</h2><div className="work-list">{work.map(item=><article key={item.title} className="work-item"><div className="work-heading"><div><h3>{item.title}</h3><p className="work-role">{item.role}</p></div><span className="work-metric">{item.metric}</span></div><p className="work-description">{item.description}</p>{item.evidence && <ul className="work-evidence">{item.evidence.map(point=><li key={point}>{point}</li>)}</ul>}<div className="work-bottom"><p className="work-tools">{item.tools}</p>{item.links && <div className="work-links">{item.links.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{label} &nearr;<span className="sr-only"> for {item.title}</span></a>)}</div>}</div></article>)}<div className="work-archive"><a href="/portfolio.txt">Full experience, projects, skills, and achievements (text) &nearr;</a><details><summary>Research papers</summary><ul><li><a href={exodusPaper}>Exodus: space settlement research (PDF)</a></li><li><a href={stylusPaper}>Stylus paper (PDF)</a></li><li><a href={securityPaper}>MOVEit security analysis (PDF)</a></li></ul></details></div></div></section>
      <section id="skills" aria-labelledby="skills-title"><h2 id="skills-title">Skills</h2><dl className="skills-list"><div><dt>Languages</dt><dd>Java, Python, TypeScript, JavaScript, SQL</dd></div><div><dt>Backend & data</dt><dd>Spring Boot, PostgreSQL, Redis, Supabase</dd></div><div><dt>Web & cloud</dt><dd>React, Next.js, WebRTC, GCP Cloud Run, Pub/Sub</dd></div><div><dt>Applied AI</dt><dd>PyTorch, QLoRA, Hugging Face Transformers, ONNX Runtime</dd></div></dl></section>
      <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title">Contact</h2><div className="contact-links"><a href="mailto:pranavsaigandikota@gmail.com">pranavsaigandikota@gmail.com</a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer">LinkedIn &nearr;</a><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer">GitHub &nearr;</a></div></section>
    </main>
    <footer className="site-footer">Pranavsai Gandikota</footer>
  </div>;
}
