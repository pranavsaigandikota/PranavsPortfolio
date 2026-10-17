import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorialPages } from '../src/data/editorialPages.js';
const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const text=readFileSync(new URL('../dist/portfolio.txt',import.meta.url),'utf8');
const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('the portfolio is a readable single page with four sections',()=>{
  assert.equal(editorialPages.length,1);
  assert.equal((html.match(/<section /g)||[]).length,4);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  for(const section of ['home','work','skills','contact']) assert.ok(html.includes(`id="${section}"`));
  assert.ok(html.includes('Pranavsai Gandikota'));
  assert.ok(!html.includes('<div id="root"></div>'));
  assert.equal((html.match(/<details>/g)||[]).length,1);
  assert.ok(html.includes('href="/portfolio.txt"'));
  assert.ok(html.includes('Exodus: space settlement research (PDF)'));
  assert.ok(html.includes('200,000+ records'));
  assert.ok(html.includes('143 tests with over 90% coverage'));
  assert.ok(!html.includes('<form'));
  assert.ok(!html.includes('fonts.googleapis.com'));
  assert.ok(!html.includes('sp-marquee'));
  assert.ok(html.includes('rel="canonical" href="https://pranavsaig.dev/"'));
});
test('work and contact are available without navigating to another page',()=>{
  for(const value of ['Ford Motor Company','UCF SASE','uKnight','Paradise','ISUE Lab, UCF','92%','230+','45 to 3.5','1,820']) assert.ok(html.includes(value),value);
  for(const path of ['about','experience','projects','research','hobbies','awards','flix']) assert.ok(!html.includes(`href="/${path}"`));
  for(const section of ['work','skills','contact']) assert.ok(html.includes(`href="#${section}"`));
  assert.ok(html.includes('pranav-suit-original-v3.png'));
  assert.ok(html.includes('href="/Pranavsai_Gandikota_SWE.pdf" download'));
  assert.ok(html.includes('mailto:pranavsaigandikota@gmail.com'));
  assert.ok(html.includes('https://github.com/uKnight-Co/uKnight'));
});
test('the text edition and structured data retain the complete work archive',()=>{
  assert.equal(data.name,'Pranavsai Gandikota');
  assert.equal(data.knowsAbout.length,40);
  assert.equal(data.subjectOf.length,17);
  for(const skill of data.knowsAbout) assert.ok(text.includes(skill),skill);
  for(const project of data.subjectOf){assert.ok(text.includes(project.name));assert.ok(project.description);}
  assert.ok(!text.includes('[object Object]'));
});
test('local media URLs exist and previous pages redirect to the single page',()=>{
  for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) assert.ok(existsSync(new URL('../dist'+decodeURIComponent(match[1]),import.meta.url)),match[1]);
  for(const [path,section] of [['experience','work'],['research','work'],['skills','skills'],['about','home'],['hobbies','contact']]){
    const redirect=readFileSync(new URL(`../dist/${path}/index.html`,import.meta.url),'utf8');
    assert.ok(redirect.includes(`url=/#${section}`));
    assert.ok(!redirect.includes('<h1'));
  }
  const sitemap=readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
  assert.equal((sitemap.match(/<loc>/g)||[]).length,1);
});
