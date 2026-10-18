import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { editorialExperienceArchive, renderExperienceDetails } from '../.prerender/entry-server.js';

test('every experience detail contains its entire gallery, personal introduction, and metric styling',()=>{
  for(const experience of editorialExperienceArchive){
    const html=renderExperienceDetails(experience.organisation);
    for(const image of experience.images){
      assert.ok(html.includes(image), `${experience.organisation}: ${image}`);
      if(image.startsWith('/')) assert.ok(existsSync(new URL('../dist'+decodeURIComponent(image),import.meta.url)),image);
    }
    assert.ok(html.includes('ed-experience-note'),experience.organisation);
    if(experience.images.length>1) assert.ok(html.includes('Photos from this experience'),experience.organisation);
  }
  const ford=renderExperienceDetails('Ford Motor Company');
  assert.ok(ford.includes('ed-metric'));
  assert.ok(ford.includes('bill%20ford.png'));
  assert.ok(ford.includes('full-stack internal applications'));
  const research=renderExperienceDetails('ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF');
  assert.ok(research.includes('SIGGRAPH'));
  assert.ok(research.includes('VR Sensor Awareness'));
});
