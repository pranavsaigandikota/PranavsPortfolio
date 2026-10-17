import './RecruiterHome.css';
import exodusPaper from '../Research Papers/Exodus Winning First Paper.pdf';
import stylusPaper from '../Research Papers/Research Final Paper Stylus.pdf';
import securityPaper from '../Research Papers/MOVEit_Attack_Pranavsai_G_new (1).pdf';

const work = [
  {
    title: 'Ford Motor Company', role: 'Software Engineering Intern | May-Aug 2026', metric: '92% less processing time',
    description: <>Migrated <strong>six batch processes</strong> to Java 21 and Spring Boot on GCP. Moving data-heavy work into PostgreSQL stored procedures reduced processing time from <strong>45 to 3.5 minutes</strong>. Built event-driven secret refresh with Pub/Sub and Secret Manager. Validated <strong>200,000+ records</strong> and added <strong>143 tests with over 90% coverage</strong>.</>,
    tools: 'Java | Spring Boot | PostgreSQL | GCP',
  },
  {
    title: 'UCF SASE', role: 'CS Tech Chair | Event platform', metric: '230+ registered members',
    description: <>Led the team building event registration, membership, QR check-ins, forms, email engagement, and admin analytics. Designed the PostgreSQL schema and attendance system for a platform serving <strong>230+ registered members</strong>.</>,
    tools: 'Next.js | TypeScript | Supabase | PostgreSQL',
  },
  {
    title: 'uKnight', role: 'Team Lead | University video chat', metric: '6-person team',
    description: <>Led a <strong>six-person team</strong> building WebRTC video chat. Deployed Spring Boot and WebSocket signaling on Cloud Run. Used a Redis sorted-set queue and atomic Lua operations to prevent double-matches across backend instances.</>,
    tools: 'Spring Boot | WebRTC | Redis | Lua | GCP', links: [['Code', 'https://github.com/uKnight-Co/uKnight'], ['Website', 'https://uknight.net']],
  },
  {
    title: 'Paradise', role: 'DeafBlind navigation prototype', metric: '3rd of 290+ projects',
    description: <>Built a phone-to-laptop vision pipeline that converts visual and location cues into Joy-Con haptics. Separated depth estimation from object detection to keep obstacle guidance responsive. Our team placed <strong>3rd Best Overall among 290+ projects</strong> at ShellHacks 2026.</>,
    tools: 'WebRTC | YOLO | Depth Anything V2 | ONNX Runtime', links: [['Project', 'https://devpost.com/software/paradise-n0i7of']],
  },
  {
    title: 'ISUE Lab, UCF', role: 'Research Assistant | Applied AI', metric: '1,820 study examples',
    description: <>Fine-tuned <strong>three Llama 3.1 8B adapters</strong> with QLoRA on <strong>1,820 study examples</strong> to predict cognitive load and usability scores from VR responses. Built a Python text-to-3D pipeline with scene extraction, Stable Diffusion 3.5, human review, and TRELLIS.</>,
    tools: 'Python | PyTorch | Llama 3.1 | QLoRA',
  },
];

export function RecruiterHome() {
  return <div className="portfolio">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="#home" className="site-name">Pranav</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#skills">Skills</a><a href="#contact">Contact</a><a className="resume-link" href="/Pranavsai_Gandikota_SWE.pdf" download>Resume <span className="sr-only">PDF download</span></a></nav></header>
    <main id="main">
      <section id="home" className="intro" aria-labelledby="name"><div><h1 id="name">Pranavsai Gandikota</h1><p className="intro-role">Software engineer</p><p>I build backend systems, web applications, and applied AI tools. Previously a software engineering intern at Ford; studying Computer Science at UCF.</p><p className="muted intro-meta">Orlando, FL | Graduating May 2028</p></div><img className="portrait" src="/editorial/pranav-suit-original-v3.png" width="1053" height="1494" alt="Pranav in a navy suit"/></section>
      <section id="work" aria-labelledby="work-title"><h2 id="work-title">Selected work</h2><div className="work-list">{work.map(item=><article key={item.title} className="work-item"><div className="work-heading"><div><h3>{item.title}</h3><p className="work-role">{item.role}</p></div><span className="work-metric">{item.metric}</span></div><p className="work-description">{item.description}</p><div className="work-bottom"><p className="work-tools">{item.tools}</p>{item.links && <div className="work-links">{item.links.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{label} &nearr;<span className="sr-only"> for {item.title}</span></a>)}</div>}</div></article>)}<div className="work-archive"><a href="/portfolio.txt">Full experience, projects, skills, and achievements (text) &nearr;</a><details><summary>Research papers</summary><ul><li><a href={exodusPaper}>Exodus: space settlement research (PDF)</a></li><li><a href={stylusPaper}>Stylus paper (PDF)</a></li><li><a href={securityPaper}>MOVEit security analysis (PDF)</a></li></ul></details></div></div></section>
      <section id="skills" aria-labelledby="skills-title"><h2 id="skills-title">Skills</h2><dl className="skills-list"><div><dt>Languages</dt><dd>Java, Python, TypeScript, JavaScript, SQL</dd></div><div><dt>Backend & data</dt><dd>Spring Boot, PostgreSQL, Redis, Supabase</dd></div><div><dt>Web & cloud</dt><dd>React, Next.js, WebRTC, GCP Cloud Run, Pub/Sub</dd></div><div><dt>Applied AI</dt><dd>PyTorch, QLoRA, Hugging Face Transformers, ONNX Runtime</dd></div></dl></section>
      <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title">Contact</h2><div className="contact-links"><a href="mailto:pranavsaigandikota@gmail.com">pranavsaigandikota@gmail.com</a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer">LinkedIn &nearr;</a><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer">GitHub &nearr;</a></div></section>
    </main>
    <footer className="site-footer">Pranavsai Gandikota</footer>
  </div>;
}
