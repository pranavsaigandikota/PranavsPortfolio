import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, X, Trophy, BriefcaseBusiness, Sparkles, Download, Play, Sun, Moon } from 'lucide-react';
import projectMedia from './data/projects.json';
import { projectsData, experiences as originalHistory, skillsData, achievements } from './data/portfolioContent';
import { selectEditorialPhotos, experiencePhotoCaption } from './data/editorialPhotos';
import { MetricText } from './components/MetricText';
import { OriginalAboutCopy } from './components/OriginalAboutCopy';
import animations from './data/animations.json';
import videoPreviews from './data/videoPreviews.json';
import exodusPdf from './Research Papers/Exodus Winning First Paper.pdf';
import stylusPdf from './Research Papers/Research Final Paper Stylus.pdf';
import cyberPdf from './Research Papers/MOVEit_Attack_Pranavsai_G_new (1).pdf';
import { SkillPhysicsField } from './components/SkillPhysicsField';
import { CardArrow, EditorialAccent } from './components/SamuraiDetails';
import { lowPowerDevice, usePageVisible, usePreviewSlot } from './components/sitePerformance';
import './SamuraiPortfolio.css';
import './EditorialPortfolio.css';
import { editorialPages } from './data/editorialPages';

const navigation = editorialPages;
const history = selectEditorialPhotos(originalHistory);
// The existing site is the source of truth; media comes from its video archive.
const projects = projectsData.map(project => ({ ...project, description: project.shortDescription, videoUrl: project.title === 'Paradise' ? '/videos/paradise.mp4' : projectMedia.find(media => media.title === project.title || (project.title === 'Exodus' && media.title === 'Exodus Space Settlement'))?.videoUrl }));
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
  { title: 'Exodus Paper', description: 'Winning research paper on sustainable space settlement design and logistics.', imageSrc: "/projects/exodus-settlement.png", label: 'First Prize (NSS Space Settlement)', color: '#facc15', link: exodusPdf },
  { title: 'Stylus Paper', description: 'Academic paper chosen by professor for submission to the UCF Stylus.', imageSrc: '/history/ucf.jpg', label: 'UCF Stylus Submission', color: '#a855f7', link: stylusPdf },
  { title: 'Cyber Sec Paper', description: 'Analysis of cyber security vulnerabilities, attack vectors, and mitigation.', imageSrc: '/projects/SentinelDemo.png', label: 'MOVEit Attack Analysis', color: '#3b82f6', link: cyberPdf },
];
const nssExperience = originalHistory.find(item=>item.organisation==='National Space Society');
const candidPhotos = [
  {image:'/editorial/photos/research-in-action-color.webp',title:'IN THE FIELD.',caption:'Testing ideas with real people. A VR demonstration at UCF’s ISUE Lab.',alt:'Pranav assisting a VR demonstration at the ISUE Lab',position:'64% center'},
  {image:'/editorial/photos/paradise-shellhacks-win.webp',title:'BUILT. SHIPPED. WON.',caption:'Paradise. 3rd Best Overall at ShellHacks 2026, built for DeafBlind accessibility.',alt:'The Paradise team at ShellHacks holding certificates alongside event organizers',position:'center',fit:'contain'},
  {image:'/editorial/photos/diwali-on-stage-color.webp',title:'TAKING THE STAGE.',caption:'Planned and spoke at Diwali for 250+ attendees. Diwali and Banquet brought together 300+ attendees combined.',alt:'Pranav and a co-host presenting on stage at UCF Diwali',position:'65% center'},
];

function CandidGallery() {
  const captions = ['Research in practice', 'Paradise at ShellHacks', 'Diwali at UCF'];
  return <div className="ed-home-photo-strip">{candidPhotos.map((photo,index)=><figure key={photo.image}><a href={photo.image} target="_blank" rel="noreferrer" aria-label={`View photo: ${captions[index]}`}><img src={photo.image} alt={photo.alt} style={{objectPosition:photo.position,objectFit:photo.fit}} loading="lazy" decoding="async"/></a><figcaption><h3>{captions[index]}</h3><p><MetricText>{photo.caption}</MetricText></p></figcaption></figure>)}</div>;
}

function Tag({ children, color = '#e96758' }) {
  return <span className="sp-tag" style={{ '--tag-color': color }}>{children}</span>;
}
Tag.propTypes = { children: PropTypes.node.isRequired, color: PropTypes.string };

function SectionHeading({ number, eyebrow, title, description }) {
  return <div className="sp-section-heading"><div><span className="sp-eyebrow"><span>{number} /</span> {eyebrow}</span><h1>{title}<span>.</span></h1></div>{description && <p>{description}</p>}<EditorialAccent kind={number === "06" ? "film" : number === "01" ? "music" : "code"} /></div>;
}
SectionHeading.propTypes = { number: PropTypes.string, eyebrow: PropTypes.string, title: PropTypes.string, description: PropTypes.string };

function CreativeIssue({playing,onSelect,onTogglePlaying}) {
  const works = animations.filter(item=>item.type!=='Link');
  const lead = works.find(item=>item.id==='W7XTPXalTzU');
  const tiles = [lead,...works.filter(item=>item!==lead)];
  return <section id="hobbies" className="ed-creative-issue sp-container ed-film-issue ed-hobbies-issue" aria-labelledby="ed-creative-title">
    <header className="ed-animation-intro"><h1 id="ed-creative-title">My Animations</h1><p>During COVID-19, I got into Blender and used my time to learn game development and animation. I loved figuring out how to turn ideas into scenes, characters, and games, and I still enjoy building new things in my free time. Here are a few things I built along the way.</p></header>
    <div className="ed-video-collage">{tiles.map((video,index)=><button className={`ed-collage-tile ed-collage-tile-${index+1}`} key={video.id} onClick={()=>onSelect(video)} aria-label={`Watch ${video.title}`}><MemoMediaPreview item={video} playing={playing}/><span className="ed-collage-play" aria-hidden="true"><Play size={20}/></span></button>)}</div>
    <div className="ed-creative-bottomline"><span>FILM / ANIMATION / MUSIC / EXPERIMENTS</span><button onClick={onTogglePlaying} aria-pressed={playing}>{playing?'Pause previews':'Play previews'}</button><a href="https://www.youtube.com/@earthlytomcat11" target="_blank" rel="noreferrer" className="sp-text-link">The complete archive <ArrowUpRight size={16}/></a></div>
    <section className="ed-mantis" aria-labelledby="ed-mantis-title"><div className="ed-mantis-copy"><h2 id="ed-mantis-title">The Mantis</h2><p>I also got into robotics, despite a whole game franchise about why you probably shouldn&apos;t build animatronics. The Mantis is a robot animatronic head I designed, built, and programmed, with controller support to operate its movements.</p><a className="sp-text-link" href="https://filmasticpg.wixsite.com/mysteriousunloaded" target="_blank" rel="noreferrer">Explore my other creations <ArrowUpRight size={17}/></a></div><figure><video autoPlay muted loop controls playsInline preload="metadata" aria-label="The Mantis controller-operated animatronic head demonstration"><source src="/videos/the-mantis.mp4" type="video/mp4"/>Your browser does not support embedded video. <a href="/videos/the-mantis.mp4">Download The Mantis video</a>.</video><figcaption>The Mantis / Controller-operated animatronics</figcaption></figure></section>
  </section>;
}
CreativeIssue.propTypes={playing:PropTypes.bool.isRequired,onSelect:PropTypes.func.isRequired,onTogglePlaying:PropTypes.func.isRequired};

function AwardsIssue() {
  return <section id="awards" className="ed-awards-issue sp-container" aria-labelledby="ed-awards-title">
    <div className="ed-awards-heading"><h2 id="ed-awards-title">Awards</h2></div>
    <article className="ed-nss-feature" aria-labelledby="ed-nss-title"><div className="ed-nss-portrait"><img src={nssExperience.images[0]} alt="Pranav presenting Exodus at the ISDC podium" loading="lazy" decoding="async"/><div className="ed-first-seal" aria-hidden="true"><span>1<sup>st</sup></span><Trophy size={25}/><small>FIRST PRIZE / NSS</small></div><span className="ed-nss-photo-note">EXODUS / AT THE INTERNATIONAL SPACE DEVELOPMENT CONFERENCE</span></div><div className="ed-nss-copy"><span className="sp-eyebrow">NSS SPACE SETTLEMENT CONTEST</span><h2 id="ed-nss-title">First place.<br /><em>Beyond Earth.</em></h2><p>Exodus: a 50-page research proposal for sustainable space habitation. First-prize space settlement design, presented through oral and poster presentations at ISDC.</p><div className="ed-nss-facts"><span><strong>50</strong>pages of research</span><span><strong>22</strong>countries represented</span></div><a className="sp-text-link" href={exodusPdf} target="_blank" rel="noreferrer">Read the winning paper <ArrowUpRight size={17}/></a></div></article>
    <article className="ed-award-lead ed-paradise-feature" aria-labelledby="ed-paradise-award-title"><figure className="ed-paradise-photo"><a href="/editorial/photos/paradise-shellhacks-win.webp" target="_blank" rel="noreferrer" aria-label="View the Paradise team at ShellHacks"><img src="/editorial/photos/paradise-shellhacks-win.webp" width="1024" height="684" alt="The Paradise team holding certificates alongside ShellHacks event organizers" loading="lazy" decoding="async"/></a><figcaption>THE TEAM BEHIND PARADISE / SHELLHACKS 2026</figcaption></figure><div className="ed-award-lead-copy"><span className="sp-eyebrow">PARADISE · SHELLHACKS 2026</span><div className="ed-paradise-place" aria-hidden="true">3<sup>rd</sup><Trophy size={25}/></div><h2 id="ed-paradise-award-title">Best Overall.</h2><p>Third place among over 290 projects and 1,400 hackers. A touch-only navigation system built for DeafBlind users.</p><Link className="sp-text-link" to="/projects">Explore the work <ArrowUpRight size={17}/></Link></div></article>
    <div className="ed-awards-grid">{achievements.map((award,index)=><article className="ed-award-ticket" key={award.title}><span className="ed-award-index">0{index+1}</span><span className="ed-award-icon" aria-hidden="true">{award.icon}</span><div><span className="ed-award-date">{award.subtitle}</span><h2>{award.title}</h2><p>{award.description}</p>{award.points.map(point=><p key={point}>{point}</p>)}</div></article>)}</div>
    <div className="ed-award-moments"><header><span className="sp-eyebrow">FIELD NOTES / FROM THE CONFERENCE</span><h2>Ideas, <em>out loud.</em></h2></header><div className="ed-award-moments-grid"><figure><img src={nssExperience.images[0]} alt="Pranav delivering his Exodus research presentation at the ISDC podium" loading="lazy" decoding="async"/><figcaption><span className="ed-photo-index">01 / THE PODIUM</span><h3>FROM PAPER<br />TO PODIUM.</h3><p>Sharing the thinking behind a world beyond our own.</p></figcaption></figure><figure><img src={nssExperience.images[1]} alt="Pranav discussing the Exodus space settlement poster with a conference attendee" loading="lazy" decoding="async"/><figcaption><span className="ed-photo-index">02 / THE CONVERSATION</span><h3>BIG IDEAS.<br />REAL CONVERSATIONS.</h3><p>Taking the research off the page and into the room.</p></figcaption></figure></div></div>
    <div className="ed-press-clipping"><div><span className="sp-eyebrow">FROM THE ARCHIVE / PRESS</span><h2>MADE<br /><em>THE PAPER.</em></h2><p>Coverage of Exodus’s first-prize space settlement design.</p></div><a href={nssExperience.images[4]} target="_blank" rel="noreferrer" aria-label="View the newspaper coverage of Exodus"><img src={nssExperience.images[4]} alt="Newspaper clipping reporting Pranav’s first-prize Exodus space settlement design" loading="lazy" decoding="async"/></a></div>
  </section>;
}

function MediaPreview({ item, playing, controls = false }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const active=usePreviewSlot(frameRef,playing&&Boolean(item.videoUrl),controls);
  const external = item.videoUrl?.includes('youtube.com');
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && visible) video.play().catch(() => {});
    else video.pause();
  }, [active, visible]);
  const embedUrl = external ? item.videoUrl.replace('controls=0', `controls=${controls ? 1 : 0}`) : null;
  return <div ref={frameRef} className={`sp-media-preview ${playing ? '' : 'sp-media-paused'}`}>
    <img className="sp-media-poster" style={{objectFit:item.imageFit}} src={item.imageSrc} alt={item.title} loading="lazy" decoding="async" onError={event => { if (item.title === 'NextFlix') event.currentTarget.src = '/posters/nextflix_poster.jpg'; }} />
    {item.videoUrl && external && visible && active && <iframe src={embedUrl} title={`${item.title} video preview`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen={controls} tabIndex={controls ? 0 : -1} className={controls ? 'sp-video-controls' : ''} />}
    {item.videoUrl && !external && visible && active && !failed && <video ref={videoRef} src={controls ? item.videoUrl : (videoPreviews[item.videoUrl] || item.videoUrl)} poster={item.imageSrc} autoPlay={active && visible} loop muted playsInline controls={controls} preload="none" onError={() => setFailed(true)} aria-label={`${item.title} video preview`} />}
    {item.videoUrl && playing && !controls && <img className="sp-media-inset" src={item.imageSrc} alt={`${item.title} original image`} loading="lazy" decoding="async" />}
  </div>;
}
MediaPreview.propTypes = { item: PropTypes.object.isRequired, playing: PropTypes.bool.isRequired, controls: PropTypes.bool };

function ExperienceImages({ item }) {
  return <span className={`sp-experience-images ${item.documentary ? 'ed-documentary-media' : ''}`}><img src={item.images[0]} alt={`${item.organisation} photo 1`} loading="lazy" decoding="async" style={{ objectFit: item.imageFit || 'contain', objectPosition: item.photoPosition }} />{item.images.length > 1 && <span className="sp-image-counter">+{item.images.length - 1} photos</span>}</span>;
}
ExperienceImages.propTypes = { item: PropTypes.object.isRequired };

export function DetailDialog({ item, onClose }) {
  const dialogRef = useRef(null);
  const experience = Boolean(item.organisation);
  const video = Boolean(item.videoUrl && /^(Animation|Film)/.test(item.type));
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
  return <dialog ref={dialogRef} className={`sp-dialog ${item.documentary ? "ed-documentary-dialog" : ""}`} aria-labelledby="sp-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <button className="sp-dialog-close" onClick={onClose} aria-label="Close details" autoFocus><X size={22} /></button>
    {video ? <video className="sp-dialog-media" src={item.videoUrl} controls autoPlay playsInline /> : experience ? <figure className="ed-experience-cover"><a href={item.images[0]} target="_blank" rel="noreferrer"><img className="sp-dialog-media" src={item.images[0]} alt={experiencePhotoCaption(item.images[0], title)}/></a><figcaption>{experiencePhotoCaption(item.images[0], title)}</figcaption></figure> : <img className="sp-dialog-media" src={item.imageSrc} alt={title} onError={event => { if (item.title === 'NextFlix') event.currentTarget.src = '/posters/nextflix_poster.jpg'; }} />}
    <div className={`sp-dialog-body ${video ? 'ed-creative-dialog' : ''}`}>{!video && <Tag color={color}>{experience ? item.type : projectCategory(item)}</Tag>}<h2 id="sp-dialog-title" className={video ? 'ed-sr-only' : undefined}>{title}</h2>
      {experience && <p className="sp-dialog-role">{item.role} · {item.startDate} — {item.endDate}</p>}
      {item.event && <p className="sp-award"><Trophy size={17} /> {item.event}</p>}
      {experience && item.personalNote && <p className="ed-experience-note"><MetricText>{item.personalNote}</MetricText></p>}
      {!video && (Array.isArray(item.fullDescription) ? item.fullDescription : item.fullDescription ? [item.fullDescription] : item.experiences || [item.description]).map((text, index) => <p key={index}><MetricText>{text}</MetricText></p>)}
      {!video && <div className="sp-tech">{item.skills?.map((skill) => <span key={skill}>{skill}</span>)}</div>}
      {item.videoUrl && !video && <div className="sp-detail-video"><MemoMediaPreview item={item} playing controls /></div>}
      {experience && item.images.length > 1 && <section className="ed-experience-gallery" aria-labelledby="ed-experience-gallery-title"><h3 id="ed-experience-gallery-title">Photos from this experience <span>({item.images.length})</span></h3><div className="sp-gallery">{item.images.slice(1).map(image => <figure key={image}><a href={image} target="_blank" rel="noreferrer"><img src={image} alt={experiencePhotoCaption(image, title)} loading="lazy" decoding="async" /></a><figcaption>{experiencePhotoCaption(image, title)}</figcaption></figure>)}</div></section>}
      <div className="sp-dialog-links">{item.demo && <a className="sp-button" href={item.demo} target="_blank" rel="noreferrer">View demo <ArrowUpRight size={16} /></a>}{item.source && <a className="sp-button sp-button-outline" href={item.source} target="_blank" rel="noreferrer">{item.source.includes('github.com') ? 'Source code' : 'Project page'} <ArrowUpRight size={16} /></a>}</div>
    </div>
  </dialog>;
}
DetailDialog.propTypes = { item: PropTypes.object.isRequired, onClose: PropTypes.func.isRequired };

const MemoMediaPreview=memo(MediaPreview);
const MemoExperienceImages=memo(ExperienceImages);

export function SamuraiPortfolio({ page = 'home' }) {
  const rootRef = useRef(null);
  const lowPower=lowPowerDevice(),pageVisible=usePageVisible();
  const [filter, setFilter] = useState('All projects');
  const [allProjects, setAllProjects] = useState(true);
  const [allExperience, setAllExperience] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    try { return window.localStorage.getItem('portfolio-editorial-theme') === 'light' ? 'light' : 'dark'; }
    catch { return 'dark'; }
  });
  useEffect(() => {
    try { window.localStorage.setItem('portfolio-editorial-theme', theme); } catch { /* The toggle also works without browser storage. */ }
  }, [theme]);
  const paradise = projects.find((project) => project.title === 'Paradise');
  const ford = history.find((item) => item.organisation === 'Ford Motor Company');
  const remainingProjects = projects.filter((project) => project !== paradise && (filter === 'All projects' || projectCategory(project) === filter));
  const remainingExperience = history.filter((item) => item !== ford);
  useEffect(() => {
    setSelected(null); const anchor = document.getElementById(window.location.hash.slice(1));
    if (anchor) anchor.scrollIntoView({behavior:'instant'}); else window.scrollTo({top:0,behavior:'instant'});
    const current=editorialPages.find(item=>item.id===page);
    document.title=`${page==='home'?'Pranavsai Gandikota — Software Engineer':current.label+' — Pranavsai Gandikota'}`;
    const canonical=document.querySelector('link[rel="canonical"]');
    if(canonical) canonical.href='https://pranavsaig.dev'+current.path;
  }, [page]);
  useEffect(() => {
    if(lowPower || !pageVisible || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const layers=[...rootRef.current.querySelectorAll('[data-parallax]')];
    if(!layers.length) return;
    let frame=0;
    const update=()=>{frame=0;layers.forEach(layer=>{const rect=layer.getBoundingClientRect();layer.style.setProperty('--ed-parallax-y',`${Math.max(-28,Math.min(28,(window.innerHeight/2-rect.top-rect.height/2)*.04))}px`);});};
    const scroll=()=>{if(!frame) frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);layers.forEach(layer=>layer.style.removeProperty('--ed-parallax-y'));};
  },[page,lowPower,pageVisible]);

  return <div ref={rootRef} data-theme={theme} className={`samurai-portfolio editorial-portfolio ed-page-${page} ${lowPower?'sp-low-power':''} ${!pageVisible?'sp-page-hidden':''}`}>
    <a className="sp-skip" href="#main">Skip to content</a>
    <header className="sp-header"><div className="sp-nav-wrap"><Link className="sp-brand" to="/" aria-label="Pranavsai Gandikota home"><span className="sp-brand-mark">P<span>G</span></span><span className="sp-full-name">PRANAVSAI GANDIKOTA</span></Link>
      <nav id="sp-navigation" className="sp-nav ed-flat-nav" aria-label="Main navigation">{navigation.map(({id, path, label}) => <Link key={id} to={path} aria-current={page === id ? 'page' : undefined}>{label}</Link>)}<Link className="sp-flix-link" to="/flix">Flix</Link></nav>
      <a className="sp-nav-resume" href="/Pranavsai_Gandikota_SWE.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>
      <button className="ed-theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
    </div></header>
    <main id="main">
      {page === 'home' && <>
        <section id="home" className="ed-about-home sp-container" aria-labelledby="ed-home-name"><h1 id="ed-home-name" className="ed-home-name">PRANAVSAI <span>GANDIKOTA</span></h1><div className="ed-about-home-copy"><span className="sp-eyebrow">SOFTWARE ENGINEER / APPLIED AI</span><h2 id="ed-about-title">About me.</h2><p><MetricText>I&apos;m Pranav, a Computer Science junior at the University of Central Florida, graduating in May 2028 with a <strong>3.99 GPA</strong>. I build cloud systems, full-stack applications, and applied AI tools, with a focus on the people using them.</MetricText></p><p>My work has taken me from cloud services at Ford to applied AI research, accessible technology, and platforms for the UCF community.</p><div className="sp-hero-actions"><Link className="sp-button" to="/experience">My experience <ArrowUpRight size={18}/></Link><a className="sp-button sp-button-outline" href="/Pranavsai_Gandikota_SWE.pdf" target="_blank" rel="noreferrer">Read my resume <Download size={18}/></a></div><div className="sp-hero-socials"><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a><a href="mailto:pranavsaigandikota@gmail.com"><Mail size={18}/> Email</a></div></div><figure className="ed-about-home-portrait"><span className="ed-about-disc" aria-hidden="true"/><img src="/editorial/pranav-suit-transparent-v4.png" width="1053" height="1494" alt="Pranav smiling in a navy suit, with the photo background removed" fetchPriority="high"/></figure><div className="ed-home-story"><OriginalAboutCopy/></div></section>
        <div className="ed-about-impact sp-container" aria-label="Selected results"><Link to="/experience"><strong>92%</strong><span>Less processing time at Ford</span></Link><Link to="/projects"><strong>230+</strong><span>Members on the SASE platform</span></Link><Link to="/projects"><strong>3rd</strong><span>Best Overall at ShellHacks 2026</span></Link></div>
        <section className="ed-home-moments sp-container" aria-label="Moments behind the work"><CandidGallery/></section>
      </>}
      {page === 'experience' && (<section id="experience" className="sp-section sp-container"><SectionHeading number="02" eyebrow="WHERE I’VE MADE AN IMPACT" title="My Experience" />
        <article className="sp-feature sp-ford-feature"><div className="sp-feature-image"><MemoExperienceImages item={ford} /><span className="sp-image-label"><BriefcaseBusiness size={14} /> FORD MOTOR COMPANY</span></div><div className="sp-feature-copy"><Tag color={ford.themeColor}>Internship · Ford Motor Company</Tag><h3 className="sp-company-heading">Ford Motor Company</h3><p className="sp-feature-subtitle">Software Engineering Intern</p><span className="sp-date">{ford.startDate} — {ford.endDate}</span><p><MetricText>{ford.experiences[0]}</MetricText></p><div className="sp-tech">{['Java 21', 'Spring Boot', 'Google Cloud', 'PostgreSQL'].map((skill) => <span key={skill}>{skill}</span>)}</div><button className="sp-text-link" onClick={() => setSelected(ford)}>Inside the experience <ArrowUpRight size={18} /></button></div></article>
        <div className="sp-experience-grid">{remainingExperience.slice(0, allExperience ? remainingExperience.length : 4).map((item) => <button className="sp-experience-card" key={`${item.organisation}-${item.role}`} onClick={() => setSelected(item)} style={{ '--card-accent': item.themeColor }}><MemoExperienceImages item={item} /><div><Tag color={item.themeColor}>{item.type}</Tag><h3 className="sp-company-heading">{item.organisation}</h3><p>{item.role}</p><p className="sp-experience-description"><MetricText>{item.experiences[0]}</MetricText></p><span className="sp-date">{item.startDate} — {item.endDate}</span></div><CardArrow /></button>)}</div>
        <div className="sp-show-more"><button className="sp-button sp-button-outline" onClick={() => setAllExperience(!allExperience)}>{allExperience ? 'Show fewer experiences' : `Explore all ${history.length} experiences`} <ArrowDown size={16} /></button></div>
      </section>)}
      {page === 'experience' && <AwardsIssue />}
      {page === 'projects' && (<section id="projects" className="sp-section sp-container"><SectionHeading number="03" eyebrow="IDEAS TURNED INTO REALITY" title="My Projects" />
        <article className="sp-feature sp-project-feature"><div className="sp-feature-image"><MemoMediaPreview item={paradise} playing={playing&&!selected} /><span className="sp-image-label"><Sparkles size={14} /> PARADISE</span><div className="sp-image-award"><Trophy size={19} /><span>3rd Best Overall<small>SHELLHACKS 2026</small></span></div></div><div className="sp-feature-copy"><Tag color={projectColor(paradise)}>SHELLHACKS 2026: 3rd Best Overall</Tag><h3>Paradise<span>↗</span></h3><div className="ed-project-description">{(Array.isArray(paradise.fullDescription) ? paradise.fullDescription : [paradise.description]).map((paragraph,index)=><p key={index}><MetricText>{paragraph}</MetricText></p>)}</div><div className="sp-tech">{paradise.skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}</div><button className="sp-text-link" onClick={() => setSelected(paradise)}>Explore the project <ArrowUpRight size={18} /></button></div></article>
        <div className="sp-media-toolbar"><span>Images & video previews</span><button onClick={() => setPlaying(!playing)} aria-pressed={playing}>{playing ? "Pause video previews" : "Play video previews"}</button></div><div className="sp-filter-row"><div className="sp-filters" aria-label="Filter projects">{categories.map((category) => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setAllProjects(true); }}>{category}</button>)}</div><span className="sp-count">{remainingProjects.length} projects</span></div>
        <div className="sp-card-grid">{remainingProjects.slice(0, allProjects ? remainingProjects.length : 6).map((project) => <button className="sp-card sp-project-card" key={project.title} onClick={() => setSelected(project)} style={{ '--card-accent': projectColor(project) }}><div className="sp-card-image"><MemoMediaPreview item={project} playing={playing&&!selected} /><Tag color={projectColor(project)}>{projectCategory(project)}</Tag><CardArrow /></div><div className="sp-card-body">{project.event && <span className="sp-card-event">{project.event}</span>}<h3>{project.title}</h3><div className="ed-project-description">{(Array.isArray(project.fullDescription) ? project.fullDescription : [project.fullDescription || project.description]).map((paragraph,index)=><p key={index}><MetricText>{paragraph}</MetricText></p>)}</div><div className="sp-tech">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div></div></button>)}</div>
        {remainingProjects.length > 6 && <div className="sp-show-more"><button className="sp-button sp-button-outline" onClick={() => setAllProjects(!allProjects)}>{allProjects ? 'Show fewer projects' : `View all ${remainingProjects.length} projects`} <ArrowDown size={16} /></button></div>}
      </section>)}
      {page === 'projects' && (<section id="research" className="ed-embedded-section sp-container" aria-labelledby="ed-research-title"><h2 id="ed-research-title">Research papers</h2><div className="sp-card-grid">{paperData.map((paper) => <a className="sp-card" key={paper.title} href={paper.link} target="_blank" rel="noreferrer" style={{ '--card-accent': paper.color }}><div className="sp-card-image"><img src={paper.imageSrc} alt={paper.title} loading="lazy" decoding="async" /><Tag color={paper.color}>{paper.label}</Tag><CardArrow /></div><div className="sp-card-body"><h3>{paper.title}</h3><p>{paper.description}</p><span className="sp-text-link">Read the paper <ArrowUpRight size={16} /></span></div></a>)}</div></section>)}
      {page === 'skills' && (<section id="skills" className="sp-section sp-container"><SectionHeading number="04" eyebrow="TOOLS OF THE TRADE" title="My Skills" /><SkillPhysicsField groups={skills}><div className="sp-skills-grid">{skills.map((group, index) => <article className="sp-skill-card" key={group.genre}><span className="sp-skill-number">0{index + 1}</span><span className="sp-original-icon" style={{ color: group.themeColor }}>{group.icon}</span><h3>{group.genre}</h3><p>{group.description}</p><div className="sp-tech">{group.items.map((skill) => <span key={skill.title}>{skill.title}</span>)}</div></article>)}</div></SkillPhysicsField></section>)}
      {page === 'hobbies' && <CreativeIssue playing={playing && !selected} onSelect={setSelected} onTogglePlaying={() => setPlaying(!playing)} />}

    </main>
    <footer className="sp-footer sp-container"><a className="sp-brand" href="/"><span className="sp-brand-mark">P<span>G</span></span><span>PRANAVSAI GANDIKOTA</span></a><p>Made with ♥ by Pranavsai Gandikota · © {new Date().getFullYear()}</p><div><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="/portfolio.txt">Text edition</a><a href="#main">Back to top ↑</a></div></footer>
    {selected && <DetailDialog item={selected} onClose={() => setSelected(null)} />}
  </div>;
}
SamuraiPortfolio.propTypes = { page: PropTypes.oneOf(editorialPages.map(item=>item.id)) };
