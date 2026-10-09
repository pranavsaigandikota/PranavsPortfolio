import { build } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// A separate SSR bundle resolves the same hashed media URLs as the client build.
await build({build:{ssr:'src/entry-server.jsx',outDir:'.prerender',emptyOutDir:true,copyPublicDir:false},logLevel:'warn'});
const {renderPortfolio,editorialPages}=await import(pathToFileURL(resolve('.prerender/entry-server.js')).href);
const source=await readFile('dist/index.html','utf8');
if(!source.includes('<div id="root"></div>')) throw new Error('Expected the fresh client build before pre-rendering.');
for(const page of editorialPages){
  const {html,text,structuredData}=renderPortfolio(page.id);
  const json=JSON.stringify(structuredData).replace(/</g,'\\u003c');
  const title=page.id==='home'?'Pranavsai Gandikota — Software Engineer':`${page.label} — Pranavsai Gandikota`;
  const url='https://pranavsaig.dev'+page.path;
  const output=source.replace('<div id="root"></div>',`<div id="root">${html}</div>`).replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/<link rel="canonical"[^>]*\/>/,`<link rel="canonical" href="${url}" />`).replace('</head>',`<script type="application/ld+json">${json}</script>\n</head>`);
  const directory=page.id==='home'?'dist':`dist/${page.id}`;
  await mkdir(directory,{recursive:true});
  await writeFile(`${directory}/index.html`,output);
  if(page.id==='home') await writeFile('dist/portfolio.txt',text+'\n');
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${editorialPages.map(page=>`<url><loc>https://pranavsaig.dev${page.path}</loc></url>`).join('')}</urlset>`);
console.log(`Pre-rendered ${editorialPages.length} editorial pages, structured data, sitemap, and text edition.`);
