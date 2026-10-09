import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, Menu, X, Trophy, BriefcaseBusiness, Sparkles, Download, Play, MapPin, Sun, Moon } from 'lucide-react';
import projectMedia from './data/projects.json';
import { projectsData, experiences as originalHistory, skillsData, achievements, codeString } from './data/portfolioContent';
import { selectEditorialPhotos } from './data/editorialPhotos';
import { OriginalAboutCopy } from './components/OriginalAboutCopy';
import animations from './data/animations.json';
import videoPreviews from './data/videoPreviews.json';
import exodusPdf from './Research Papers/Exodus Winning First Paper.pdf';
import stylusPdf from './Research Papers/Research Final Paper Stylus.pdf';
import cyberPdf from './Research Papers/MOVEit_Attack_Pranavsai_G_new (1).pdf';
import { SkillPhysicsField } from './components/SkillPhysicsField';
import { CardArrow, EditorialAccent, CompactCode } from './components/SamuraiDetails';
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
const nssPosterForResearch = originalHistory.find(item => item.organisation === 'National Space Society').images[1];
const paperData = [
  { title: 'Exodus Paper', description: 'Winning research paper on sustainable space settlement design and logistics.', imageSrc: nssPosterForResearch, label: 'First Prize (NSS Space Settlement)', color: '#facc15', link: exodusPdf },
  { title: 'Stylus Paper', description: 'Academic paper chosen by professor for submission to the UCF Stylus.', imageSrc: '/history/ucf.jpg', label: 'UCF Stylus Submission', color: '#a855f7', link: stylusPdf },
  { title: 'Cyber Sec Paper', description: 'Analysis of cyber security vulnerabilities, attack vectors, and mitigation.', imageSrc: '/projects/SentinelDemo.png', label: 'MOVEit Attack Analysis', color: '#3b82f6', link: cyberPdf },
];
const nssExperience = originalHistory.find(item=>item.organisation==='National Space Society');
const candidPhotos = [
  {image:'/editorial/photos/research-in-action.webp',title:'IN THE FIELD.',caption:'Testing ideas with real people. A VR demonstration at UCF’s ISUE Lab.',alt:'Pranav assisting a VR demonstration at the ISUE Lab',position:'64% center'},
  {image:nssExperience.images[1],title:'IDEAS IN MOTION.',caption:'Explaining the thinking behind Exodus at the International Space Development Conference.',alt:'Pranav explaining his Exodus research poster to a conference attendee',position:'60% center'},
  {image:'/editorial/photos/diwali-on-stage.webp',title:'TAKING THE STAGE.',caption:'Bringing the event to life. Hosting Diwali with the UCF Indian Student Association.',alt:'Pranav and a co-host presenting on stage at UCF Diwali',position:'65% center'},
];

function CandidGallery() {
  return <div className="ed-candid-gallery" aria-labelledby="ed-candid-heading"><header><span className="sp-eyebrow">THE CONTACT SHEET / OFF THE CLOCK</span><h2 id="ed-candid-heading">Life between<br /><em>the lines.</em></h2></header><div className="ed-candid-grid">{candidPhotos.map((photo,index)=><figure className="ed-candid-frame" key={photo.title}><a href={photo.image} target="_blank" rel="noreferrer" aria-label={`View full photo: ${photo.title}`}><img src={photo.image} alt={photo.alt} style={{objectPosition:photo.position}} loading="lazy" decoding="async"/></a><figcaption><span className="ed-photo-index">FRAME 0{index+1}</span><h3>{photo.title}</h3><p>{photo.caption}</p></figcaption></figure>)}</div></div>;
}

function Tag({ children, color = '#e96758' }) {
  return <span className="sp-tag" style={{ '--tag-color': color }}>{children}</span>;
}
Tag.propTypes = { children: PropTypes.node.isRequired, color: PropTypes.string };

function SectionHeading({ number, eyebrow, title, description }) {
  return <div className="sp-section-heading"><div><span className="sp-eyebrow"><span>{number} /</span> {eyebrow}</span><h1>{title}<span>.</span></h1></div>{description && <p>{description}</p>}<EditorialAccent kind={number === "06" ? "film" : number === "01" ? "music" : "code"} /></div>;
}
SectionHeading.propTypes = { number: PropTypes.string, eyebrow: PropTypes.string, title: PropTypes.string, description: PropTypes.string };

function ContentsIssue() {
  const teasers = ['Meet the engineer behind the work.','Cloud systems. Real results.','From an idea to a working product.','Play through the stack.','A closer look at the research.','A collage of film and animation.','The work, recognized.'];
  return <section className="ed-contents sp-container" aria-labelledby="ed-contents-title"><div className="ed-contents-heading"><span className="sp-eyebrow">INSIDE THIS ISSUE</span><h2 id="ed-contents-title">A few sides<br />of the same mind<span>.</span></h2></div><div className="ed-contents-grid">{editorialPages.slice(1).map((item,index)=><Link key={item.id} className={`ed-contents-entry ed-contents-${item.id}`} to={item.path}><span className="ed-page-number">0{index+1}</span><div><h3>{item.label}</h3><p>{teasers[index]}</p></div><ArrowUpRight size={21}/></Link>)}</div></section>;
}

function CreativeIssue({playing,onSelect,onTogglePlaying}) {
  const works = animations.filter(item=>item.type!=='Link');
  const lead = works.find(item=>item.id==='W7XTPXalTzU');
  const tiles = [lead,...works.filter(item=>item!==lead)];
  return <section id="animations" className="ed-creative-issue sp-container ed-film-issue" aria-labelledby="ed-creative-title">
    <div className="ed-creative-topline"><span>FILMASTICPG / THE CREATIVE ISSUE</span><span>CODE MEETS CREATIVITY</span></div>
    <header className="ed-creative-masthead"><span className="ed-creative-kicker">FILM & ANIMATION</span><h1 id="ed-creative-title">FILM</h1><span className="ed-creative-side">A DIFFERENT LENS</span></header>
    <div className="ed-video-collage">{tiles.map((video,index)=><button className={`ed-collage-tile ed-collage-tile-${index+1}`} key={video.id} onClick={()=>onSelect(video)} aria-label={`Watch ${video.title}`}><MemoMediaPreview item={video} playing={playing}/><span className="ed-collage-play" aria-hidden="true"><Play size={20}/></span></button>)}<span className="ed-collage-word" aria-hidden="true" data-parallax>PICTURE THIS.</span></div>
    <div className="ed-creative-bottomline"><span>IMAGINED. DIRECTED. CREATED.</span><button onClick={onTogglePlaying} aria-pressed={playing}>{playing?'Pause previews':'Play previews'}</button><a href="https://www.youtube.com/@earthlytomcat11" target="_blank" rel="noreferrer" className="sp-text-link">The complete archive <ArrowUpRight size={16}/></a></div>
  </section>;
}
CreativeIssue.propTypes={playing:PropTypes.bool.isRequired,onSelect:PropTypes.func.isRequired,onTogglePlaying:PropTypes.func.isRequired};

function AwardsIssue() {
  return <section id="awards" className="ed-awards-issue sp-container" aria-labelledby="ed-awards-title">
    <div className="ed-awards-heading"><span className="sp-eyebrow">THE HONORS EDITION / RECOGNITION</span><h1 id="ed-awards-title">The work.<br /><em>The recognition.</em></h1><span className="ed-awards-outline" aria-hidden="true" data-parallax>HONORS</span></div>
    <article className="ed-nss-feature" aria-labelledby="ed-nss-title"><div className="ed-nss-portrait"><img src="/history/NSSAwardrecieval.jpeg" alt="Pranav holding his NSS conference certificate alongside two conference representatives" loading="lazy" decoding="async"/><div className="ed-first-seal" aria-hidden="true"><span>1<sup>st</sup></span><Trophy size={25}/><small>FIRST PRIZE / NSS</small></div><span className="ed-nss-photo-note">EXODUS / AT THE INTERNATIONAL SPACE DEVELOPMENT CONFERENCE</span></div><div className="ed-nss-copy"><span className="sp-eyebrow">NSS SPACE SETTLEMENT CONTEST</span><h2 id="ed-nss-title">First place.<br /><em>Beyond Earth.</em></h2><p>Exodus: a 50-page research proposal for sustainable space habitation. First-prize space settlement design, presented through oral and poster presentations at ISDC.</p><div className="ed-nss-facts"><span><strong>50</strong>pages of research</span><span><strong>22</strong>countries represented</span></div><a className="sp-text-link" href={exodusPdf} target="_blank" rel="noreferrer">Read the winning paper <ArrowUpRight size={17}/></a></div></article>
    <div className="ed-award-lead"><div className="ed-award-medal" aria-hidden="true" data-parallax><span>3<sup>rd</sup></span><Trophy size={48}/><span className="ed-medal-ring">SHELLHACKS / 2026</span></div><div className="ed-award-lead-copy"><span className="sp-eyebrow">PARADISE · SHELLHACKS 2026</span><h2>Best Overall.</h2><p>Third place among over 290 projects and 1,400 hackers. A touch-only navigation system built for DeafBlind users.</p><Link className="sp-text-link" to="/projects">Explore the work <ArrowUpRight size={17}/></Link></div></div>
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

function DetailDialog({ item, onClose }) {
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
  return <dialog ref={dialogRef} className="sp-dialog" aria-labelledby="sp-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
    <button className="sp-dialog-close" onClick={onClose} aria-label="Close details" autoFocus><X size={22} /></button>
    {video ? <video className="sp-dialog-media" src={item.videoUrl} controls autoPlay playsInline /> : <img className="sp-dialog-media" src={experience ? item.images[0] : item.imageSrc} alt={title} onError={event => { if (item.title === 'NextFlix') event.currentTarget.src = '/posters/nextflix_poster.jpg'; }} />}
    <div className={`sp-dialog-body ${video ? 'ed-creative-dialog' : ''}`}>{!video && <Tag color={color}>{experience ? item.type : projectCategory(item)}</Tag>}<h2 id="sp-dialog-title" className={video ? 'ed-sr-only' : undefined}>{title}</h2>
      {experience && <p className="sp-dialog-role">{item.role} · {item.startDate} — {item.endDate}</p>}
      {item.event && <p className="sp-award"><Trophy size={17} /> {item.event}</p>}
      {!video && (Array.isArray(item.fullDescription) ? item.fullDescription : item.fullDescription ? [item.fullDescription] : item.experiences || [item.description]).map((text, index) => <p key={index}>{text}</p>)}
      {!video && <div className="sp-tech">{item.skills?.map((skill) => <span key={skill}>{skill}</span>)}</div>}
      {item.videoUrl && !video && <div className="sp-detail-video"><MemoMediaPreview item={item} playing controls /></div>}
      {experience && item.images.length > 1 && <div className="sp-gallery">{item.images.slice(1).map((image, index) => <a href={image} key={image} target="_blank" rel="noreferrer"><img src={image} alt={`${title} experience photo ${index + 2}`} loading="lazy" decoding="async" /></a>)}</div>}
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
  const [menuOpen, setMenuOpen] = useState(false);
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
    setSelected(null); setMenuOpen(false); window.scrollTo({top:0,behavior:'instant'});
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
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return <div ref={rootRef} data-theme={theme} className={`samurai-portfolio editorial-portfolio ed-page-${page} ${lowPower?'sp-low-power':''} ${!pageVisible?'sp-page-hidden':''}`}>
    <a className="sp-skip" href="#main">Skip to content</a>
    <header className="sp-header"><div className="sp-nav-wrap"><Link className="sp-brand" to="/" aria-label="Pranavsai Gandikota home"><span className="sp-brand-mark">P<span>G</span></span><span className="sp-full-name">PRANAVSAI GANDIKOTA</span></Link>
      <nav id="sp-navigation" className={menuOpen ? 'sp-nav sp-nav-open' : 'sp-nav'} aria-label="Main navigation">{navigation.map(({id, path, label}) => <Link key={id} to={path} aria-current={page === id ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>)}<Link className="sp-flix-link" to="/flix">Flix</Link><a className="ed-mobile-resume" href="/PranavNovemberResume.pdf" target="_blank" rel="noreferrer" onClick={()=>setMenuOpen(false)}>Resume <ArrowUpRight size={16}/></a></nav>
      <a className="sp-nav-resume" href="/PranavNovemberResume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>
      <button className="ed-theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <button className="sp-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="sp-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div></header>
    <main id="main">
      {page === 'home' && (<section id="home" className="sp-hero sp-container">
        <div className="ed-issue-strip"><span>THE INDEPENDENT PORTFOLIO</span><span>ORLANDO, FL · UCF</span><span>VOL. 01 / 2026</span></div>
        <h1 className="ed-masthead">PRANAVSAI <span>GANDIKOTA</span></h1>
        <div className="sp-hero-content"><span className="sp-eyebrow">SOFTWARE ENGINEER · APPLIED AI</span><p className="sp-hero-description">I’m a software engineer building <em>AI-powered systems</em> at the intersection of full-stack engineering and creative problem-solving.</p>
          <div className="sp-hero-actions"><a href="/projects" className="sp-button">Explore the work <ArrowUpRight size={18} /></a><a href="/PranavNovemberResume.pdf" target="_blank" rel="noreferrer" className="sp-button sp-button-outline">Read my resume <Download size={18} /></a></div>
          <div className="sp-hero-socials"><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /><span>GitHub</span></a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /><span>LinkedIn</span></a><a href="https://pranavsaigandikota.wixsite.com/filmasticpg" target="_blank" rel="noreferrer" aria-label="FilmasticPG creative portfolio"><Sparkles size={19} /><span>Film</span></a><a href="mailto:pranavsaigandikota@gmail.com" aria-label="Email Pranav"><Mail size={19} /><span>Email</span></a><p><MapPin size={13} /> Orlando, Florida · UCF</p></div>
        </div><figure className="sp-hero-art" data-parallax><span className="ed-art-orbit" aria-hidden="true"/><span className="ed-art-word" aria-hidden="true">CREATE.</span><img src="/editorial/creative-mind.webp" width="1024" height="1536" alt="Black-and-white collage of a classical bust, computer, piano keys, camera and film reel" /><figcaption><span>FIG. 01 — THE CREATIVE MIND</span><span>CODE / MUSIC / FILM</span></figcaption></figure>
        <div className="ed-cover-note"><span>THE ENGINEERING ISSUE</span><p>Human curiosity.<br />Technical precision.</p></div>
        <div className="ed-proof-strip"><a href="/projects"><strong>72</strong><span>Verified uKnight users<br />in the first three weeks</span></a><a href="/projects"><strong>3<span>rd</span></strong><span>Best Overall<br />ShellHacks 2026 · Paradise</span></a><a href="/about"><strong>3.99</strong><span>GPA · Computer Science<br />University of Central Florida</span></a></div>
      </section>)}
      {page === 'home' && <div className="sp-marquee" aria-label="Areas of focus"><div><span>FULL-STACK ENGINEERING</span><i>✦</i><span>ARTIFICIAL INTELLIGENCE</span><i>✦</i><span>CLOUD & AUTOMATION</span><i>✦</i><span>CREATIVE TECHNOLOGY</span><i>✦</i></div></div>}
      {page === 'home' && <ContentsIssue />}
      {page === 'about' && (<section id="about" className="sp-section sp-container"><SectionHeading number="01" eyebrow="THE PERSON BEHIND THE CODE" title="About Me" />
        <div className="sp-about-layout"><div className="sp-about-copy"><OriginalAboutCopy /><a className="sp-text-link" href="/PranavNovemberResume.pdf" target="_blank" rel="noreferrer">The full story, on paper <Download size={16} /></a></div>
          <div className="sp-about-notes sp-about-code"><span className="sp-eyebrow">ABOUT ME / DeveloperProfile</span><CompactCode text={codeString} /></div></div><CandidGallery />
      </section>)}
      {page === 'experience' && (<section id="experience" className="sp-section sp-container"><SectionHeading number="02" eyebrow="WHERE I’VE MADE AN IMPACT" title="My Experience" />
        <article className="sp-feature sp-ford-feature"><div className="sp-feature-image"><MemoExperienceImages item={ford} /><span className="sp-image-label"><BriefcaseBusiness size={14} /> FORD MOTOR COMPANY</span></div><div className="sp-feature-copy"><Tag color={ford.themeColor}>Internship · Ford Motor Company</Tag><h3 className="sp-company-heading">Ford Motor Company</h3><p className="sp-feature-subtitle">Software Engineering Intern</p><span className="sp-date">{ford.startDate} — {ford.endDate}</span><p>{ford.experiences[0]}</p><div className="sp-tech">{['Java 21', 'Spring Boot', 'Google Cloud', 'PostgreSQL'].map((skill) => <span key={skill}>{skill}</span>)}</div><button className="sp-text-link" onClick={() => setSelected(ford)}>Inside the experience <ArrowUpRight size={18} /></button></div></article>
        <div className="sp-experience-grid">{remainingExperience.slice(0, allExperience ? remainingExperience.length : 4).map((item) => <button className="sp-experience-card" key={`${item.organisation}-${item.role}`} onClick={() => setSelected(item)} style={{ '--card-accent': item.themeColor }}><MemoExperienceImages item={item} /><div><Tag color={item.themeColor}>{item.type}</Tag><h3 className="sp-company-heading">{item.organisation}</h3><p>{item.role}</p><p className="sp-experience-description">{item.experiences[0]}</p><span className="sp-date">{item.startDate} — {item.endDate}</span></div><CardArrow /></button>)}</div>
        <div className="sp-show-more"><button className="sp-button sp-button-outline" onClick={() => setAllExperience(!allExperience)}>{allExperience ? 'Show fewer experiences' : `Explore all ${history.length} experiences`} <ArrowDown size={16} /></button></div>
      </section>)}
      {page === 'projects' && (<section id="projects" className="sp-section sp-container"><SectionHeading number="03" eyebrow="IDEAS TURNED INTO REALITY" title="My Projects" />
        <article className="sp-feature sp-project-feature"><div className="sp-feature-image"><MemoMediaPreview item={paradise} playing={playing&&!selected} /><span className="sp-image-label"><Sparkles size={14} /> PARADISE</span><div className="sp-image-award"><Trophy size={19} /><span>3rd Best Overall<small>SHELLHACKS 2026</small></span></div></div><div className="sp-feature-copy"><Tag color={projectColor(paradise)}>SHELLHACKS 2026: 3rd Best Overall</Tag><h3>Paradise<span>↗</span></h3><p>{paradise.description}</p><div className="sp-tech">{paradise.skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}</div><button className="sp-text-link" onClick={() => setSelected(paradise)}>Explore the project <ArrowUpRight size={18} /></button></div></article>
        <div className="sp-media-toolbar"><span>Images & video previews</span><button onClick={() => setPlaying(!playing)} aria-pressed={playing}>{playing ? "Pause video previews" : "Play video previews"}</button></div><div className="sp-filter-row"><div className="sp-filters" aria-label="Filter projects">{categories.map((category) => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setAllProjects(true); }}>{category}</button>)}</div><span className="sp-count">{remainingProjects.length} projects</span></div>
        <div className="sp-card-grid">{remainingProjects.slice(0, allProjects ? remainingProjects.length : 6).map((project) => <button className="sp-card sp-project-card" key={project.title} onClick={() => setSelected(project)} style={{ '--card-accent': projectColor(project) }}><div className="sp-card-image"><MemoMediaPreview item={project} playing={playing&&!selected} /><Tag color={projectColor(project)}>{projectCategory(project)}</Tag><CardArrow /></div><div className="sp-card-body">{project.event && <span className="sp-card-event">{project.event}</span>}<h3>{project.title}</h3><p>{project.description}</p><div className="sp-tech">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div></div></button>)}</div>
        {remainingProjects.length > 6 && <div className="sp-show-more"><button className="sp-button sp-button-outline" onClick={() => setAllProjects(!allProjects)}>{allProjects ? 'Show fewer projects' : `View all ${remainingProjects.length} projects`} <ArrowDown size={16} /></button></div>}
      </section>)}
      {page === 'skills' && (<section id="skills" className="sp-section sp-container"><SectionHeading number="04" eyebrow="TOOLS OF THE TRADE" title="My Skills" /><SkillPhysicsField groups={skills}><div className="sp-skills-grid">{skills.map((group, index) => <article className="sp-skill-card" key={group.genre}><span className="sp-skill-number">0{index + 1}</span><span className="sp-original-icon" style={{ color: group.themeColor }}>{group.icon}</span><h3>{group.genre}</h3><p>{group.description}</p><div className="sp-tech">{group.items.map((skill) => <span key={skill.title}>{skill.title}</span>)}</div></article>)}</div></SkillPhysicsField></section>)}
      {page === 'research' && (<section id="research" className="sp-section sp-container"><SectionHeading number="05" eyebrow="BEYOND THE BUILD" title="My Research" /><div className="sp-card-grid">{paperData.map((paper) => <a className="sp-card" key={paper.title} href={paper.link} target="_blank" rel="noreferrer" style={{ '--card-accent': paper.color }}><div className="sp-card-image"><img src={paper.imageSrc} alt={paper.title} loading="lazy" decoding="async" /><Tag color={paper.color}>{paper.label}</Tag><CardArrow /></div><div className="sp-card-body"><h3>{paper.title}</h3><p>{paper.description}</p><span className="sp-text-link">Read the paper <ArrowUpRight size={16} /></span></div></a>)}</div></section>)}
      {page === 'animations' && <CreativeIssue playing={playing && !selected} onSelect={setSelected} onTogglePlaying={() => setPlaying(!playing)} />}
      {page === 'awards' && <AwardsIssue />}

    </main>
    <footer className="sp-footer sp-container"><a className="sp-brand" href="/"><span className="sp-brand-mark">P<span>G</span></span><span>PRANAVSAI GANDIKOTA</span></a><p>Made with ♥ by Pranavsai Gandikota · © {new Date().getFullYear()}</p><div><a href="https://github.com/pranavsaigandikota" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/pranavsaig" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="/portfolio.txt">Text edition</a><a href="#main">Back to top ↑</a></div></footer>
    {selected && <DetailDialog item={selected} onClose={() => setSelected(null)} />}
  </div>;
}
SamuraiPortfolio.propTypes = { page: PropTypes.oneOf(editorialPages.map(item=>item.id)) };
