// Keep the original archive for Flix; the editorial site shows a concise selection.
export const editorialPhotoSelection = {
  'Student Academic Resource Center (SARC), UCF': { indices: [0], position: 'center 38%' },
  'ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF': { images: ['/editorial/photos/research-in-action-color.webp'], position: '64% center' },
  'KnightHacks, UCF': { indices: [0], position: 'center 58%' },
  'Indian Student Association UCF': { images: ['/editorial/photos/diwali-on-stage-color.webp'], position: '60% center' },
  'Ithaka International School': { indices: [0], position: 'center 42%' },
  'National Space Society': { indices: [0, 1, 4], position: 'center 25%' },
  'BNY': { indices: [0], position: 'center', fit: 'contain' },
};

export function selectEditorialPhotos(experiences) {
  return experiences.map(item => {
    const selection = editorialPhotoSelection[item.organisation];
    if (!selection) return item;
    return { ...item, images: selection.images || selection.indices.map(index => item.images[index]), imageFit: selection.fit || 'cover', photoPosition: selection.position, documentary: true };
  });
}
