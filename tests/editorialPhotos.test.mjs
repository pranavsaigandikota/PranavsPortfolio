import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectEditorialPhotos, experiencePhotoCaption } from '../src/data/editorialPhotos.js';

test('editorial covers never remove archived experience photos or descriptions', () => {
  const organisations = [
    'ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF',
    'Indian Student Association UCF',
    'National Space Society',
    'Student Academic Resource Center (SARC), UCF',
    'Ford Motor Company',
    'SASE (UCF)',
  ];
  const archive = organisations.map(organisation => ({
    organisation,
    images: Array.from({ length: 5 }, (_, index) => `/archive/${organisation}/${index}.jpg`),
    experiences: ['My original detailed description.', 'An additional contribution.'],
  }));
  const selected = selectEditorialPhotos(archive);
  for (const [index, experience] of selected.entries()) {
    for (const photo of archive[index].images) assert.ok(experience.images.includes(photo), photo);
    for (const paragraph of archive[index].experiences) assert.ok(experience.experiences.includes(paragraph));
    assert.equal(experience.images.length, new Set(experience.images).size);
    assert.ok(experience.personalNote);
  }
  assert.deepEqual(archive[0].experiences, ['My original detailed description.', 'An additional contribution.']);
});

test('experience captions identify the relevant person and activity', () => {
  assert.match(experiencePhotoCaption('/history/bill%20ford.png', 'Ford'), /Bill Ford/);
  assert.match(experiencePhotoCaption('/history/sase-group.webp', 'SASE'), /SASE community/);
  assert.match(experiencePhotoCaption('/assets/ISUELABUSERSTUDY-abc.jpeg', 'UCF'), /user study/);
});
