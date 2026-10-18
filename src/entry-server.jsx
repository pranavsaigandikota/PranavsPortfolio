import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SamuraiPortfolio, DetailDialog } from './SamuraiPortfolio';
import { projectsData, experiences, skillsData, achievements } from './data/portfolioContent';
import { OriginalAboutCopy } from './components/OriginalAboutCopy';
import { selectEditorialPhotos } from './data/editorialPhotos';
import { editorialPages } from './data/editorialPages';
import animations from './data/animations.json';
export { editorialPages };
export const editorialExperienceArchive = selectEditorialPhotos(experiences);
export function renderExperienceDetails(organisation) {
  const item = editorialExperienceArchive.find(experience => experience.organisation === organisation);
  if (!item) throw new Error(`Unknown experience: ${organisation}`);
  return renderToStaticMarkup(<DetailDialog item={item} onClose={() => {}}/>);
}

const plain = value => (typeof value==='string' ? value : renderToStaticMarkup(value)).replace(/<br\s*\/?\s*>/gi,' ').replace(/<\/(?:p|h[1-6]|article|div)>/gi,' ').replace(/<[^>]+>/g,'').replace(/&#x([0-9a-f]+);/gi,(_,code)=>String.fromCodePoint(parseInt(code,16))).replace(/&#(\d+);/g,(_,code)=>String.fromCodePoint(Number(code))).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\s+/g,' ').trim();
const paragraphs = value => (Array.isArray(value) ? value : value ? [value] : []).map(plain);
export function renderPortfolio(page = 'home') {
  const current=editorialPages.find(item=>item.id===page);
  const html=renderToString(<StaticRouter location={current.path}><SamuraiPortfolio page={page}/></StaticRouter>);
  const text=[
    'PRANAVSAI GANDIKOTA — SOFTWARE ENGINEER / APPLIED AI',
    'Orlando, Florida | B.S. Computer Science, University of Central Florida | GPA 3.99 | Graduation May 2028',
    'Email: pranavsaigandikota@gmail.com',
    'GitHub: https://github.com/pranavsaigandikota',
    'LinkedIn: https://www.linkedin.com/in/pranavsaig',
    'Resume: https://pranavsaig.dev/Pranavsai_Gandikota_SWE.pdf',
    '\nABOUT\n'+plain(<OriginalAboutCopy />),
    '\nEXPERIENCE',
    ...editorialExperienceArchive.map(item=>`${item.organisation} | ${item.role} | ${item.startDate} — ${item.endDate}\n${[item.personalNote, ...item.experiences].filter(Boolean).map(plain).join('\n')}`),
    '\nPROJECTS',
    ...projectsData.map(item=>`${item.title}${item.event?' | '+item.event:''}\n${item.shortDescription}\n${paragraphs(item.fullDescription).join('\n')}\nTechnologies: ${item.skills.join(', ')}${item.demo?'\nDemo: '+item.demo:''}${item.source?'\nSource: '+item.source:''}`),
    '\nSKILLS',...skillsData.map(group=>`${group.category}: ${group.skills.join(', ')}`),
    '\nACHIEVEMENTS',...achievements.map(item=>`${item.title} | ${item.subtitle}\n${item.description}\n${item.points.map(plain).join('\n')}`),
    '\nANIMATIONS',...animations.filter(item=>item.type!=='Link').map(item=>`${item.title}\n${item.description}\nhttps://pranavsaig.dev${item.videoUrl}`),
    '\nAnimations: https://www.youtube.com/@earthlytomcat11',
    '\nTHE MANTIS\nA robot animatronic head I designed, built, and programmed, with controller support to operate its movements.\nVideo: https://pranavsaig.dev/videos/the-mantis.mp4\nOther creations: https://filmasticpg.wixsite.com/mysteriousunloaded',
  ].join('\n\n');
  const structuredData={
    '@context':'https://schema.org','@type':'Person',name:'Pranavsai Gandikota',url:'https://pranavsaig.dev/',
    jobTitle:'Software Engineer',description:'Software engineer building cloud systems, full-stack applications, and applied AI.',
    email:'mailto:pranavsaigandikota@gmail.com',sameAs:['https://github.com/pranavsaigandikota','https://www.linkedin.com/in/pranavsaig'],
    knowsAbout:skillsData.flatMap(group=>group.skills),
    subjectOf:projectsData.map(item=>({'@type':'CreativeWork',name:item.title,description:[item.shortDescription,...paragraphs(item.fullDescription)].join(' '),url:item.source||item.demo||'https://pranavsaig.dev/projects/'})),
  };
  return {html,text,structuredData};
}
