import { experienceStories } from './experienceStories.js';

// Pick a cover image while retaining every original image for the detail gallery.
export const editorialPhotoSelection = {
  'Student Academic Resource Center (SARC), UCF': { indices: [0], position: 'center 38%' },
  'ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF': { images: ['/editorial/photos/research-in-action-color.webp'], position: '64% center' },
  'KnightHacks, UCF': { indices: [0], position: 'center 58%' },
  'Indian Student Association UCF': { images: ['/editorial/photos/diwali-on-stage-color.webp'], position: '60% center' },
  'Ithaka International School': { indices: [0], position: 'center 42%' },
  'National Space Society': { indices: [0, 1, 4], position: 'center 25%' },
  'BNY': { indices: [0], position: 'center', fit: 'contain' },
};

const additionalPhotos = {
  'Ford Motor Company': ['/history/bill%20ford.png', '/history/goals.jpeg'],
  'Student Academic Resource Center (SARC), UCF': ['/history/SIGroupZoomed.png'],
  'KnightHacks, UCF': ['/history/Knighthacks%20lenny.png'],
  'National Space Society': ['/history/NSSAwardrecieval.jpeg', '/history/NSSLocalNewsTV.png', '/history/NssPressmeet.jpeg'],
};

export function selectEditorialPhotos(experiences) {
  return experiences.map(item => {
    const selection = editorialPhotoSelection[item.organisation];
    const story = experienceStories[item.organisation];
    const cover = selection?.images || selection?.indices?.map(index => item.images[index]) || [];
    return {
      ...item,
      images: [...new Set([...cover, ...item.images, ...(additionalPhotos[item.organisation] || [])])],
      experiences: [...item.experiences, ...(story?.restoredDetails || [])],
      personalNote: story?.personalNote,
      imageFit: selection?.fit || (selection ? 'cover' : item.imageFit),
      photoPosition: selection?.position,
      documentary: Boolean(selection),
    };
  });
}

export function experiencePhotoCaption(image, organisation) {
  const path = decodeURIComponent(image).toLowerCase();
  const captions = [
    ['bill ford', 'With Bill Ford during my Ford internship'],
    ['goals', 'With colleagues at Ford'],
    ['ford', 'During my Ford internship'],
    ['sase-group', 'The UCF SASE community'],
    ['saselogo', 'Society of Asian Scientists and Engineers'],
    ['research-in-action', 'Assisting a VR demonstration at the ISUE Lab'],
    ['isuelabuserstudy', 'Conducting a user study in the ISUE Lab'],
    ['isueprocedural', 'Procedural generation experiments in Unity'],
    ['isueroomgeneration', 'Room generation research'],
    ['isuewhisper', 'Whisper AI research work'],
    ['isuelab', 'At the ISUE Lab, UCF'],
    ['diwali-on-stage', 'Presenting Diwali at UCF'],
    ['diwalispeech', 'Speaking on stage at Diwali'],
    ['diwalicrowd', 'The community at Diwali'],
    ['diwaliboard', 'The team behind Diwali'],
    ['diwalibackdrop', 'The Diwali stage and event backdrop'],
    ['diwalifood', 'Food and hospitality at Diwali'],
    ['sigroup', 'With students from our study sessions'],
    ['nssaward', 'Receiving recognition for Exodus'],
    ['nssspacesettlementspeech', 'Presenting my Exodus proposal at ISDC'],
    ['nsspresentationposter', 'Discussing the Exodus research poster'],
    ['nssspacestandalone', 'My Exodus space-settlement proposal'],
    ['nssmeeting', 'Conversations at the conference'],
    ['nssonnewspaper', 'Newspaper coverage of Exodus'],
    ['nsslocalnewstv', 'Local television coverage of Exodus'],
    ['nsspressmeet', 'Speaking with the press about Exodus'],
    ['knighhacksgroup', 'With the KnightHacks team'],
    ['lenny', 'Behind the scenes at KnightHacks'],
  ];
  return captions.find(([part]) => path.includes(part))?.[1] || organisation;
}
