import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const inlineScript = path => readFileSync(new URL(path, import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const fallback = inlineScript('../public/404.html');
const restore = inlineScript('../index.html');

test('direct Flix visits preserve query strings and anchors through the Pages fallback', () => {
  let redirect;
  const route = '/flix?category=AI%20%26%20ML#projects';
  runInNewContext(fallback, { window: { location: { pathname: '/flix', search: '?category=AI%20%26%20ML', hash: '#projects', replace: value => { redirect = value; } } } });
  let restored;
  runInNewContext(restore, { URLSearchParams, window: { location: { search: new URL(redirect, 'https://pranavsaig.dev').search }, history: { replaceState: (_state, _title, value) => { restored = value; } } } });
  assert.equal(restored, route);
});

test('the trailing-slash Flix route also redirects', () => {
  let redirect;
  runInNewContext(fallback, { window: { location: { pathname: '/flix/', search: '', hash: '', replace: value => { redirect = value; } } } });
  assert.equal(redirect, '/?__portfolio_route=%2Fflix%2F');
});

test('missing assets and unknown paths do not redirect into Flix', () => {
  for (const pathname of ['/missing', '/assets/missing.js', '/flix-other']) {
    runInNewContext(fallback, { window: { location: { pathname, replace: () => assert.fail('Unexpected redirect') } } });
  }
});

test('restoration rejects external destinations and unrelated routes', () => {
  for (const route of ['https://example.com/flix', '//example.com/flix', '/flix-other', '/']) {
    runInNewContext(restore, { URLSearchParams, window: { location: { search: '?__portfolio_route=' + encodeURIComponent(route) }, history: { replaceState: () => assert.fail('Unexpected route restoration') } } });
  }
});

test('each editorial page survives a fallback and preserves query strings',()=>{
  for(const page of ['about','experience','projects','skills','research','animations','films','awards']){
    let redirect,restored;
    runInNewContext(fallback,{window:{location:{pathname:`/${page}`,search:'?from=cover',hash:'',replace:value=>{redirect=value;}}}});
    runInNewContext(restore,{URLSearchParams,window:{location:{search:new URL(redirect,'https://pranavsaig.dev').search},history:{replaceState:(_state,_title,value)=>{restored=value;}}}});
    assert.equal(restored,`/${page}?from=cover`);
  }
});

test('old section bookmarks resolve to their new pages',()=>{
  for(const [hash,route] of [['#experience','/experience'],['#skills','/skills'],['#achievements','/awards']]){
    let restored;
    runInNewContext(restore,{URLSearchParams,window:{location:{pathname:'/',search:'',hash},history:{replaceState:(_state,_title,value)=>{restored=value;}}}});
    assert.equal(restored,route);
  }
});
