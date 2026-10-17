import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';
const inlineScript=path=>readFileSync(new URL(path,import.meta.url),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const fallback=inlineScript('../public/404.html');
const restore=inlineScript('../index.html');
const origin='https://pranavsaig.dev';
function restoreRoute(url){
  let restored;
  const parsed=new URL(url,origin);
  runInNewContext(restore,{URL,URLSearchParams,window:{location:parsed,history:{replaceState:(_state,_title,value)=>{restored=value;}}}});
  return restored;
}
test('former page URLs resolve to sections on the single page',()=>{
  for(const [page,section] of [['about','home'],['experience','work'],['projects','work'],['research','work'],['skills','skills'],['awards','work'],['hobbies','contact'],['films','contact'],['animations','contact'],['flix','home']]){
    let redirect;
    runInNewContext(fallback,{window:{location:{pathname:`/${page}`,search:'?from=bookmark',hash:'',replace:value=>{redirect=value;}}}});
    assert.equal(restoreRoute(redirect),`/?from=bookmark#${section}`);
    assert.equal(restoreRoute(`/${page}/?from=bookmark`),`/?from=bookmark#${section}`);
  }
});
test('existing section bookmarks stay on the single page',()=>{
  for(const [old,target] of [['experience','work'],['research','work'],['case-studies','work'],['toolkit','skills'],['connect','contact']]) assert.equal(restoreRoute(`/#${old}`),`/#${target}`);
  for(const section of ['home','work','skills','contact']) assert.ok(!restoreRoute(`/#${section}`)||restoreRoute(`/#${section}`)===`/#${section}`);
});
test('unrelated URLs and external route parameters cannot trigger restoration',()=>{
  for(const route of ['https://example.com/flix','//example.com/flix','/flix-other','/']) assert.equal(restoreRoute('/?__portfolio_route='+encodeURIComponent(route)),undefined);
  for(const pathname of ['/missing','/assets/missing.js','/flix-other']) runInNewContext(fallback,{window:{location:{pathname,replace:()=>assert.fail('Unexpected redirect')}}});
});
