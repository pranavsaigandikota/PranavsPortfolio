import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

// Run after npm run build: verify the deployed output, without executing JavaScript.
const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const text=readFileSync(new URL('../dist/portfolio.txt',import.meta.url),'utf8');
const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('the portfolio is readable without a client runtime',()=>{
  for(const id of ['home','about','experience','projects','skills','research','animations']) assert.ok(html.includes(`id="${id}"`),id);
  for(const phrase of ['Ford Motor Company','Paradise','3.99','92%','JavaScript','PyTorch']) assert.ok(html.includes(phrase),phrase);
  assert.ok(!html.includes('<div id="root"></div>'));
  assert.ok(html.includes('href="/PranavNovemberResume.pdf"'));
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
  const urls=new Set([...html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)].map(match=>match[1]));
  for(const url of urls){
    if(url==='/flix') continue;
    assert.ok(existsSync(new URL('../dist'+decodeURIComponent(url),import.meta.url)),url);
  }
});
