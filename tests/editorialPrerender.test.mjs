import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorialPages } from '../src/data/editorialPages.js';

// Run after npm run build: verify the deployed output, without executing JavaScript.
const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const visibleText=html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const text=readFileSync(new URL('../dist/portfolio.txt',import.meta.url),'utf8');
const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const pages=editorialPages.map(page=>({...page,html:readFileSync(new URL(`../dist/${page.id==='home'?'':page.id+'/'}index.html`,import.meta.url),'utf8')}));

test('the portfolio is readable without a client runtime',()=>{
  for(const page of pages){
    assert.ok(page.html.includes(`id="${page.id}"`),page.id);
    assert.ok(page.html.includes('data-theme="dark"'));
    assert.ok(!page.html.includes('<div id="root"></div>'));
    assert.ok(page.html.includes('href="/Pranavsai_Gandikota_SWE.pdf"'));
    assert.equal((page.html.match(/<h1[ >]/g)||[]).length,1);
    assert.ok(page.html.includes(`rel="canonical" href="https://pranavsaig.dev${page.path}"`));
  }
  for(const page of pages.filter(item=>item.id!=='home')) assert.ok(html.includes(`href="${page.path}"`));
  assert.ok(html.includes('PRANAVSAI'));
  assert.ok(html.includes('I build cloud systems, full-stack applications, and'));
  assert.ok(!html.includes('id="skills"'));
  assert.ok(pages.find(page=>page.id==='experience').html.includes('Ford Motor Company'));
  assert.ok(pages.find(page=>page.id==='projects').html.includes('Paradise'));
  assert.ok(pages.find(page=>page.id==='skills').html.includes('PyTorch'));
});

test('the text edition and structured data include complete projects and skills',()=>{
  assert.equal(data.name,'Pranavsai Gandikota');
  assert.equal(data.knowsAbout.length,40);
  assert.equal(data.subjectOf.length,17);
  for(const skill of data.knowsAbout) assert.ok(text.includes(skill),skill);
  for(const project of data.subjectOf){assert.ok(text.includes(project.name),project.name);assert.ok(project.description);assert.ok(!project.description.includes('undefined'));}
  assert.ok(text.includes('May 2026 — August 2026'));
  assert.ok(text.includes('Developed Jenny’s Playtime'));
  assert.ok(!text.includes('[object Object]'));
  assert.ok(!text.includes('&#x27;'));
});

test('pre-rendered media and document URLs point to shipped files',()=>{
  const urls=new Set(pages.flatMap(page=>[...page.html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)].map(match=>match[1])));
  for(const url of urls){
    if(url==='/flix') continue;
    assert.ok(existsSync(new URL('../dist'+decodeURIComponent(url),import.meta.url)),url);
  }
});

test('the Hobbies page preserves the video archive and legacy URLs',()=>{
    assert.equal(editorialPages.filter(item=>['hobbies','animations','films'].includes(item.id)).length,1);
    assert.ok(!html.includes('href="/films"'));
    const page=pages.find(item=>item.id==='hobbies').html;
    assert.equal((page.match(/class="ed-collage-tile /g)||[]).length,6);
    assert.ok(!page.includes('<h3'));
    assert.equal((page.match(/aria-label="Watch /g)||[]).length,6);
    const alias=readFileSync(new URL('../dist/films/index.html',import.meta.url),'utf8');
    assert.equal(alias,page);
    assert.equal(readFileSync(new URL('../dist/animations/index.html',import.meta.url),'utf8'),page);
    assert.ok(page.includes('>My Animations</h1>'));
    assert.ok(html.includes('href="/hobbies"'));
});

test('home separates the collage from the portrait and reflects current impact',()=>{
  const hero=html.split('id="home"')[1].split('</section>')[0];
  assert.ok(hero.includes('pranav-suit-transparent-v4.png'));
  assert.ok(hero.includes('About me.'));
  assert.ok(!hero.includes('pranav-suit-cutout'));
  assert.ok(html.includes('ed-home-story'));
  assert.ok(html.includes('ed-home-biography'));
  assert.ok(!html.includes('My background and work'));
  assert.ok(visibleText.includes('143 tests'));
  assert.ok(visibleText.includes('166 students'));
  assert.ok(html.includes('Research in practice'));
  assert.ok(html.includes('Testing ideas with real people.'));
  assert.ok(html.includes('pranav-suit-transparent-v4.png'));
  assert.ok(html.includes('230+'));
  assert.ok(!html.includes('220+'));
  assert.ok(!html.includes('same mind'));
  assert.ok(text.includes('250+ attendees'));
  assert.ok(text.includes('300+ attendees across the two events combined'));
});

test('flat navigation starts with the About homepage and keeps awards and papers in relevant pages',()=>{
  const nav=html.match(/<nav id="sp-navigation"[\s\S]*?<\/nav>/)[0];
  assert.ok(nav.indexOf('>About Me</a>') < nav.indexOf('>Experience</a>'));
  for(const path of ['experience','projects','skills','hobbies']) assert.ok(nav.includes(`href="/${path}"`));
  assert.ok(nav.includes('>Hobbies</a>'));
  assert.ok(!nav.includes('<details'));
  assert.ok(!nav.includes('>More<'));
  for(const path of ['about','research','awards']) assert.ok(!nav.includes(`href="/${path}"`));
  assert.ok(!editorialPages.some(page=>['about','research','awards'].includes(page.id)));
  const experience=pages.find(page=>page.id==='experience').html;
  const projects=pages.find(page=>page.id==='projects').html;
  const skills=pages.find(page=>page.id==='skills').html;
  const animations=pages.find(page=>page.id==='hobbies').html;
  assert.ok(experience.includes('id="awards"'));
  assert.ok(projects.includes('id="research"'));
  for(const title of ['Exodus Paper','Stylus Paper','Cyber Sec Paper']) assert.ok(projects.includes(title));
  assert.ok(projects.includes('Atomic') || projects.includes('atomic Lua'));
  assert.ok(projects.includes('Integrated TMDB API'));
  assert.ok(skills.includes('Play golf'));
  assert.ok(!animations.includes('PICTURE THIS.'));
  assert.ok(animations.includes('During COVID-19, I got into Blender'));
  for(const [alias,target] of [['about','/#home'],['research','/projects#research'],['awards','/experience#awards']]){
    const redirect=readFileSync(new URL(`../dist/${alias}/index.html`,import.meta.url),'utf8');
    assert.ok(redirect.includes(`url=${target}`));
  }
});

test('homepage biography pairs every paragraph with a relevant photo and emphasizes metrics',()=>{
  const biography=html.split('class="ed-home-biography"')[1].split('class="ed-about-impact')[0];
  assert.equal((biography.match(/class="ed-biography-block"/g)||[]).length,4);
  assert.ok(biography.includes('bill%20ford.png'));
  assert.ok(biography.includes('sase-group.webp'));
  assert.ok(biography.includes('>92%</strong>'));
  assert.ok(biography.includes('class="ed-metric"'));
  const cssPath=html.match(/href="(\/assets\/[^" ]+\.css)"/)[1];
  const css=readFileSync(new URL('../dist'+cssPath,import.meta.url),'utf8');
  assert.ok(css.includes('--ed-metric:'));
});
