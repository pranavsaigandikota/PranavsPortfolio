import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorialPages } from '../src/data/editorialPages.js';

// Run after npm run build: verify the deployed output, without executing JavaScript.
const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const text=readFileSync(new URL('../dist/portfolio.txt',import.meta.url),'utf8');
const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const pages=editorialPages.map(page=>({...page,html:readFileSync(new URL(`../dist/${page.id==='home'?'':page.id+'/'}index.html`,import.meta.url),'utf8')}));

test('the portfolio is readable without a client runtime',()=>{
  for(const page of pages){
    assert.ok(page.html.includes(`id="${page.id}"`),page.id);
    assert.ok(page.html.includes('data-theme="dark"'));
    assert.ok(!page.html.includes('<div id="root"></div>'));
    assert.ok(page.html.includes('href="/PranavNovemberResume.pdf"'));
    assert.equal((page.html.match(/<h1[ >]/g)||[]).length,1);
    assert.ok(page.html.includes(`rel="canonical" href="https://pranavsaig.dev${page.path}"`));
  }
  for(const page of pages.filter(item=>item.id!=='home')) assert.ok(html.includes(`href="${page.path}"`));
  assert.ok(html.includes('PRANAVSAI'));
  assert.ok(html.includes('AI-powered systems'));
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

test('creative pages present a six-video collage without individual printed titles',()=>{
  for(const id of ['animations','films']){
    const page=pages.find(item=>item.id===id).html;
    assert.equal((page.match(/class="ed-collage-tile /g)||[]).length,6);
    assert.ok(!page.includes('<h3'));
    assert.equal((page.match(/aria-label="Watch /g)||[]).length,6);
  }
});
