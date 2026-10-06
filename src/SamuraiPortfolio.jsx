import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, Menu, X, Trophy, BriefcaseBusiness, Sparkles, Download, Play, MapPin } from 'lucide-react';
import projectMedia from './data/projects.json';
import { projectsData, experiences as history, skillsData, achievements, codeString } from './data/portfolioContent';
import { OriginalAboutCopy } from './components/OriginalAboutCopy';
import animations from './data/animations.json';
import exodusPdf from './Research Papers/Exodus Winning First Paper.pdf';
import stylusPdf from './Research Papers/Research Final Paper Stylus.pdf';
import cyberPdf from './Research Papers/MOVEit_Attack_Pranavsai_G_new (1).pdf';
import { SkillPhysicsField } from './components/SkillPhysicsField';
import { CardArrow, SamuraiAccent, CompactCode } from './components/SamuraiDetails';
import './SamuraiPortfolio.css';

const navigation = [['home', 'Home'], ['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['research', 'Research'], ['animations', 'Animations']];
// The existing site is the source of truth; media comes from its video archive.
const projects = projectsData.map(project => ({ ...project, description: project.shortDescription, videoUrl: projectMedia.find(media => media.title === project.title || (project.title === 'Exodus' && media.title === 'Exodus Space Settlement'))?.videoUrl }));
const skills = skillsData.map(group => ({ genre: group.category, items: group.skills.map(title => ({ title })), themeColor: group.themeColor, description: group.description, icon: group.icon }));
const projectColor = project => project.themeColor === '#000000' ? '#aeb5c0' : project.themeColor;
const categories = ['All projects', 'AI & ML', 'Full stack', 'Games & robotics', 'Research'];
const projectCategory = (project) => {
  if (['Exodus', 'Exodus Space Settlement'].includes(project.title)) return 'Research';
  if (['TACO', 'Robotic Animatronics', 'Jenny’s Playtime', 'Jumblehot'].includes(project.title)) return 'Games & robotics';
  if (['Paradise', 'Sentinel', 'RePlot', 'ReVision', 'Vision', 'Humanotone'].includes(project.title)) return 'AI & ML';
  return 'Full stack';
};
const paperData = [
  { title: 'Exodus Paper', description: 'Winning research paper on sustainable space settlement design and logistics.', imageSrc: '/projects/exodus.png', label: 'First Prize (NSS Space Settlement)', color: '#facc15', link: exodusPdf },
  { title: 'Stylus Paper', description: 'Academic paper chosen by professor for submission to the UCF Stylus.', imageSrc: '/history/ucf.jpg', label: 'UCF Stylus Submission', color: '#a855f7', link: stylusPdf },
  { title: 'Cyber Sec Paper', description: 'Analysis of cyber security vulnerabilities, attack vectors, and mitigation.', imageSrc: '/projects/SentinelDemo.png', label: 'MOVEit Attack Analysis', color: '#3b82f6', link: cyberPdf },
];

function Tag({ children, color = '#e96758' }) {
  return <span className="sp-tag" style={{ '--tag-color': color }}>{children}</span>;
}
Tag.propTypes = { children: PropTypes.node.isRequired, color: PropTypes.string };

function SectionHeading({ number, eyebrow, title, description }) {
  return <div className="sp-section-heading"><div><span className="sp-eyebrow"><span>{number} /</span> {eyebrow}</span><h2>{title}<span>.</span></h2></div>{description && <p>{description}</p>}<SamuraiAccent kind={number === "01" || number === "04" ? "bonsai" : number === "03" || number === "06" ? "crane" : "torii"} /></div>;
}
SectionHeading.propTypes = { number: PropTypes.string, eyebrow: PropTypes.string, title: PropTypes.string, description: PropTypes.string };

function MediaPreview({ item, playing, controls = false }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const external = item.videoUrl?.includes('youtube.com');
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && visible) video.play().catch(() => {});
    else video.pause();
  }, [playing, visible]);
  const embedUrl = external ? item.videoUrl.replace('controls=0', `controls=${controls ? 1 : 0}`) : null;
  return <div ref={frameRef} className={`sp-media-preview ${playing ? '' : 'sp-media-paused'}`}>
    <img className="sp-media-poster" src={item.imageSrc} alt={item.title} loading="lazy" onError={event => { if (item.title === 'NextFlix') event.currentTarget.src = '/posters/nextflix_poster.jpg'; }} />
    {item.videoUrl && external && visible && playing && <iframe src={embedUrl} title={`${item.title} video preview`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen={controls} tabIndex={controls ? 0 : -1} className={controls ? 'sp-video-controls' : ''} />}
    {item.videoUrl && !external && visible && !failed && <video ref={videoRef} src={item.videoUrl} poster={item.imageSrc} autoPlay={playing && visible} loop muted playsInline controls={controls} preload="none" onError={() => setFailed(true)} aria-label={`${item.title} video preview`} />}
    {item.videoUrl && playing && !controls && <img className="sp-media-inset" src={item.imageSrc} alt={`${item.title} original image`} loading="lazy" />}
  </div>;
}
MediaPreview.propTypes = { item: PropTypes.object.isRequired, playing: PropTypes.bool.isRequired, controls: PropTypes.bool };

function ExperienceImages({ item }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (item.images.length < 2) return;
    const timer = setInterval(() => setIndex(previous => (previous + 1) % item.images.length), 3500);
    return () => clearInterval(timer);
  }, [item.images]);
  return <span className="sp-experience-images"><img src={item.images[index]} alt={`${item.organisation} photo ${index + 1}`} loading="lazy" style={{ objectFit: item.imageFit || 'contain' }} />{item.images.length > 1 && <span className="sp-image-counter">{index + 1} / {item.images.length}</span>}</span>;
}
ExperienceImages.propTypes = { item: PropTypes.object.isRequired };

function CompanyLogo({ organisation }) {
  const logos = {
    'Ford Motor Company': '/history/Ford.jpg',
    'NextGen Federal': '/history/nextgenlogo.jpg',
    'SASE (UCF)': '/history/saselogo.png',
    'CECS, UCF': '/history/ucf.png',
    'Student Academic Resource Center (SARC), UCF': '/history/ucf.png',
    'ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF': '/history/ucf.png',
    'KnightHacks, UCF': '/history/KnightHacks.png',
    'Indian Student Association UCF': '/history/ucf.png',
    'Ithaka International School': '/history/ithaka.png',
    'National Space Society': '/history/nss.png',
    BNY: '/company-logos/bny.png', Perplexity: '/history/perplexity.png',
  };
  const logo = logos[organisation];
  if (!logo) return null;
  return <span className={`sp-company-logo ${organisation === 'KnightHacks, UCF' ? 'sp-knighthacks-logo' : organisation === 'Ford Motor Company' ? 'sp-ford-logo' : ''}`}><img src={logo} alt={`${organisation} logo`} loading="lazy" /></span>;
}
CompanyLogo.propTypes = { organisation: PropTypes.string.isRequired };

function DetailDialog({ item, onClose }) {
  const dialogRef = useRef(null);
  const experience = Boolean(item.organisation);
  const video = Boolean(item.videoUrl && item.type?.startsWith('Animation'));
  const title = item.title || item.organisation;
  const color = experience ? item.themeColor : projectColor(item);
  useEffect(() => {
    const focusedElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      focusedElement?.focus();
    };
  }, []);
  return <dialog ref={dialogRef} className="sp-dialog" aria-labelledby="sp-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <button className="sp-dialog-close" onClick={onClose} aria-label="Close details" autoFocus><X size={22} /></button>
    {video ? <video className="sp-dialog-media" src={item.videoUrl} controls autoPlay playsInline /> : <img className="sp-dialog-media" src={experience ? item.images[0] : item.imageSrc} alt={title} onError={event => { if (item.title === 'NextFlix') event.currentTarget.src = '/posters/nextflix_poster.jpg'; }} />}
    <div className="sp-dialog-body"><Tag color={color}>{experience ? item.type : video ? 'Creative work' : projectCategory(item)}</Tag><h2 id="sp-dialog-title">{title}</h2>
      {experience && <p className="sp-dialog-role">{item.role} · {item.startDate} — {item.endDate}</p>}
      {item.event && <p className="sp-award"><Trophy size={17} /> {item.event}</p>}
      {(Array.isArray(item.fullDescription) ? item.fullDescription : item.fullDescription ? [item.fullDescription] : item.experiences || [item.description]).map((text, index) => <p key={index}>{text}</p>)}
      <div className="sp-tech">{item.skills?.map((skill) => <span key={skill}>{skill}</span>)}</div>
      {item.videoUrl && !video && <div className="sp-detail-video"><MediaPreview item={item} playing controls /></div>}
      {experience && item.images.length > 1 && <div className="sp-gallery">{item.images.map((image, index) => <a href={image} key={image} target="_blank" rel="noreferrer"><img src={image} alt={`${title} experience photo ${index + 1}`} loading="lazy" /></a>)}</div>}
      <div className="sp-dialog-links">{item.demo && <a className="sp-button" href={item.demo} target="_blank" rel="noreferrer">View demo <ArrowUpRight size={16} /></a>}{item.source && <a className="sp-button sp-button-outline" href={item.source} target="_blank" rel="noreferrer">{item.source.includes('github.com') ? 'Source code' : 'Project page'} <ArrowUpRight size={16} /></a>}</div>
    </div>
  </dialog>;
}
DetailDialog.propTypes = { item: PropTypes.object.isRequired, onClose: PropTypes.func.isRequired };

export function SamuraiPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [filter, setFilter] = useState('All projects');
  const [allProjects, setAllProjects] = useState(true);
  const [allExperience, setAllExperience] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState(null);
  const paradise = projects.find((project) => project.title === 'Paradise');
  const ford = history.find((item) => item.organisation === 'Ford Motor Company');
  const remainingProjects = projects.filter((project) => project !== paradise && (filter === 'All projects' || projectCategory(project) === filter));
  const remainingExperience = history.filter((item) => item !== ford);
  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      let current = 'home';
      navigation.forEach(([id]) => {
        if (document.getElementById(id)?.getBoundingClientRect().top <= 150) current = id;
      });
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateActiveSection); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView();
    updateActiveSection();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return <div className="samurai-portfolio">
    <a className="sp-skip" href="#main">Skip to content</a>
    <div className="sp-embers" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ '--x': `${(index * 47 + 13) % 100}%`, '--drift': `${(index % 2 ? 1 : -1) * (20 + index * 3)}px`, '--duration': `${12 + index % 8}s`, '--delay': `${-index * 1.7}s`, '--size': `${2 + index % 3}px` }} />)}</div>
    <header className="sp-header"><div className="sp-nav-wrap"><a className="sp-brand" href="#home" aria-label="Pranavsai Gandikota home"><span className="sp-brand-mark">P<span>G</span></span><span className="sp-full-name">Pranavsai Gandikota<span className="sp-brand-dot">.</span></span></a>
      <nav id="sp-navigation" className={menuOpen ? 'sp-nav sp-nav-open' : 'sp-nav'} aria-label="Main navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}<Link className="sp-flix-link" to="/flix">Flix</Link></nav>
      <a className="sp-nav-resume" href="/Pranav latest resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>
      <button className="sp-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="sp-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div></header>
    <main id="main">
      <section id="home" className="sp-hero sp-container">
        <div className="sp-hero-content"><span className="sp-eyebrow"><span className="sp-status-dot" /> SOFTWARE ENGINEER · APPLIED AI</span><p className="sp-hero-intro">Hello, I’m</p><h1>Pranavsai<br /><span>Gandikota<span className="sp-period">.</span></span></h1><p className="sp-hero-description">Building software solutions powered by AI, shaped around real problems.</p>
          <div className="sp-hero-actions"><a href="#projects" className="sp-button">View My Work <ArrowUpRight size={18} /></a><a href="/Pranav latest resume.pdf" target="_blank" rel="noreferrer" className="sp-button sp-button-outline">Resume <Download size={18} /></a></div>
          <div className="sp-hero-socials"><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a><a href="https://pranavsaigandikota.wixsite.com/filmasticpg" target="_blank" rel="noreferrer" aria-label="FilmasticPG creative portfolio"><Sparkles size={19} /></a><a href="mailto:pranavsaigandikota@gmail.com" aria-label="Email Pranav"><Mail size={19} /></a><span /><p><MapPin size={13} /> Orlando, Florida · UCF</p></div>
        </div><div className="sp-hero-art" aria-hidden="true"><span className="sp-art-caption">THE WAY OF THE BUILDER</span><img src="/samurai.svg" alt="" /><div className="sp-art-seal">創<br />造</div><p>Purpose. Precision. Persistence.</p></div>
        <a href="#about" className="sp-scroll"><ArrowDown size={15} /><span>SCROLL TO EXPLORE</span></a><span className="sp-hero-index">PORTFOLIO / 2026</span>
      </section>
      <div className="sp-marquee" aria-label="Areas of focus"><div><span>FULL-STACK ENGINEERING</span><i>✦</i><span>ARTIFICIAL INTELLIGENCE</span><i>✦</i><span>CLOUD & AUTOMATION</span><i>✦</i><span>CREATIVE TECHNOLOGY</span><i>✦</i></div></div>
      <section id="about" className="sp-section sp-container"><SectionHeading number="01" eyebrow="THE PERSON BEHIND THE CODE" title="About Me" />
        <div className="sp-about-layout"><div className="sp-about-copy"><OriginalAboutCopy /><a className="sp-text-link" href="/Pranav latest resume.pdf" target="_blank" rel="noreferrer">The full story, on paper <Download size={16} /></a></div>
          <div className="sp-about-notes sp-about-code"><span className="sp-eyebrow">ABOUT ME / DeveloperProfile</span><CompactCode text={codeString} /></div></div>
      </section>
      <section id="experience" className="sp-section sp-container"><SectionHeading number="02" eyebrow="WHERE I’VE MADE AN IMPACT" title="My Experience" />
        <article className="sp-feature sp-ford-feature"><div className="sp-feature-image"><ExperienceImages item={ford} /><span className="sp-image-label"><BriefcaseBusiness size={14} /> FORD MOTOR COMPANY</span></div><div className="sp-feature-copy"><Tag color={ford.themeColor}>Internship · Ford Motor Company</Tag><h3 className="sp-company-heading"><CompanyLogo organisation={ford.organisation} />Ford Motor Company</h3><p className="sp-feature-subtitle">Software Engineering Intern</p><span className="sp-date">{ford.startDate} — {ford.endDate}</span><p>{ford.experiences[0]}</p><div className="sp-tech">{['Spring Boot', 'React', 'Google Cloud', 'CI/CD'].map((skill) => <span key={skill}>{skill}</span>)}</div><button className="sp-text-link" onClick={() => setSelected(ford)}>Inside the experience <ArrowUpRight size={18} /></button></div></article>
        <div className="sp-experience-grid">{remainingExperience.slice(0, allExperience ? remainingExperience.length : 4).map((item) => <button className="sp-experience-card" key={`${item.organisation}-${item.role}`} onClick={() => setSelected(item)} style={{ '--card-accent': item.themeColor }}><ExperienceImages item={item} /><div><Tag color={item.themeColor}>{item.type}</Tag><h3 className="sp-company-heading"><CompanyLogo organisation={item.organisation} />{item.organisation}</h3><p>{item.role}</p><p className="sp-experience-description">{item.experiences[0]}</p><span className="sp-date">{item.startDate} — {item.endDate}</span></div><CardArrow /></button>)}</div>
        <div className="sp-show-more"><button className="sp-button sp-button-outline" onClick={() => setAllExperience(!allExperience)}>{allExperience ? 'Show fewer experiences' : `Explore all ${history.length} experiences`} <ArrowDown size={16} /></button></div>
      </section>
      <section id="projects" className="sp-section sp-container"><SectionHeading number="03" eyebrow="IDEAS TURNED INTO REALITY" title="My Projects" />
        <article className="sp-feature sp-project-feature"><div className="sp-feature-image"><MediaPreview item={paradise} playing={playing} /><span className="sp-slice" aria-hidden="true" /><span className="sp-image-label"><Sparkles size={14} /> PARADISE</span><div className="sp-image-award"><Trophy size={19} /><span>3rd Best Overall<small>SHELLHACKS 2026</small></span></div></div><div className="sp-feature-copy"><Tag color={projectColor(paradise)}>SHELLHACKS 2026: 3rd Best Overall</Tag><h3>Paradise<span>↗</span></h3><p>{paradise.description}</p><div className="sp-tech">{paradise.skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}</div><button className="sp-text-link" onClick={() => setSelected(paradise)}>Explore the project <ArrowUpRight size={18} /></button></div></article>
        <div className="sp-media-toolbar"><span>Images & video previews</span><button onClick={() => setPlaying(!playing)} aria-pressed={playing}>{playing ? "Pause video previews" : "Play video previews"}</button></div><div className="sp-filter-row"><div className="sp-filters" aria-label="Filter projects">{categories.map((category) => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setAllProjects(true); }}>{category}</button>)}</div><span className="sp-count">{remainingProjects.length} projects</span></div>
        <div className="sp-card-grid">{remainingProjects.slice(0, allProjects ? remainingProjects.length : 6).map((project) => <button className="sp-card sp-project-card" key={project.title} onClick={() => setSelected(project)} style={{ '--card-accent': projectColor(project) }}><div className="sp-card-image"><MediaPreview item={project} playing={playing} /><span className="sp-slice" aria-hidden="true" /><Tag color={projectColor(project)}>{projectCategory(project)}</Tag><CardArrow /></div><div className="sp-card-body">{project.event && <span className="sp-card-event">{project.event}</span>}<h3>{project.title}</h3><p>{project.description}</p><div className="sp-tech">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div></div></button>)}</div>
        {remainingProjects.length > 6 && <div className="sp-show-more"><button className="sp-button sp-button-outline" onClick={() => setAllProjects(!allProjects)}>{allProjects ? 'Show fewer projects' : `View all ${remainingProjects.length} projects`} <ArrowDown size={16} /></button></div>}
      </section>
      <section id="skills" className="sp-section sp-container"><SectionHeading number="04" eyebrow="TOOLS OF THE TRADE" title="My Skills" /><SkillPhysicsField groups={skills}><div className="sp-skills-grid">{skills.map((group, index) => <article className="sp-skill-card" key={group.genre}><span className="sp-skill-number">0{index + 1}</span><span className="sp-original-icon" style={{ color: group.themeColor }}>{group.icon}</span><h3>{group.genre}</h3><p>{group.description}</p><div className="sp-tech">{group.items.map((skill) => <span key={skill.title}>{skill.title}</span>)}</div></article>)}</div></SkillPhysicsField></section>
      <section id="research" className="sp-section sp-container"><SectionHeading number="05" eyebrow="BEYOND THE BUILD" title="My Research" /><div className="sp-card-grid">{paperData.map((paper) => <a className="sp-card" key={paper.title} href={paper.link} target="_blank" rel="noreferrer" style={{ '--card-accent': paper.color }}><div className="sp-card-image"><img src={paper.imageSrc} alt={paper.title} loading="lazy" /><Tag color={paper.color}>{paper.label}</Tag><CardArrow /></div><div className="sp-card-body"><h3>{paper.title}</h3><p>{paper.description}</p><span className="sp-text-link">Read the paper <ArrowUpRight size={16} /></span></div></a>)}</div><div id="achievements" className="sp-achievements"><h2>My Achievements</h2>{achievements.map((achievement) => <article key={achievement.title}><span className="sp-original-icon" style={{ color: achievement.borderColor }}>{achievement.icon}</span><div><h3>{achievement.title}</h3><Tag color={achievement.borderColor}>{achievement.subtitle}</Tag><p>{achievement.description}</p>{achievement.points.map(point => <p key={point}>{point}</p>)}</div></article>)}</div></section>
      <section id="animations" className="sp-section sp-container"><SectionHeading number="06" eyebrow="A DIFFERENT KIND OF CRAFT" title="My Animations" /><div className="sp-card-grid">{animations.filter((video) => video.type !== 'Link').map((video) => <button className="sp-card sp-creative-card" key={video.id} onClick={() => setSelected(video)} style={{ '--card-accent': '#e99b76' }}><div className="sp-card-image"><MediaPreview item={video} playing={playing} /><span className="sp-play"><Play size={22} /></span></div><div className="sp-card-body"><h3>{video.title}</h3></div></button>)}</div><div className="sp-show-more"><a className="sp-text-link" href="https://www.youtube.com/@earthlytomcat11" target="_blank" rel="noreferrer">See More <ArrowUpRight size={17} /></a></div></section>

    </main>
    <footer className="sp-footer sp-container"><a className="sp-brand" href="#home"><span className="sp-brand-mark">P<span>G</span></span><span>PRANAV.</span></a><p>Made with ♥ by Pranavsai Gandikota · © {new Date().getFullYear()}</p><div><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="#home">Back to top ↑</a></div></footer>
    {selected && <DetailDialog item={selected} onClose={() => setSelected(null)} />}
  </div>;
}
