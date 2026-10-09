import { build } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// A separate SSR bundle resolves the same hashed media URLs as the client build.
await build({build:{ssr:'src/entry-server.jsx',outDir:'.prerender',emptyOutDir:true,copyPublicDir:false},logLevel:'warn'});
const {renderPortfolio}=await import(pathToFileURL(resolve('.prerender/entry-server.js')).href);
const {html,text,structuredData}=renderPortfolio();
const source=await readFile('dist/index.html','utf8');
const json=JSON.stringify(structuredData).replace(/</g,'\\u003c');
await writeFile('dist/index.html',source.replace('<div id="root"></div>',`<div id="root">${html}</div>`).replace('</head>',`<script type="application/ld+json">${json}</script>\n</head>`));
await mkdir('dist',{recursive:true});
await writeFile('dist/portfolio.txt',text+'\n');
console.log('Pre-rendered portfolio HTML, structured data, and text edition.');
