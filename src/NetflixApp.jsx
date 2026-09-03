import React, { useState } from 'react';
import { IntroAnimation } from './components/netflix/IntroAnimation';
import { Dashboard } from './components/netflix/Dashboard';

export const NetflixApp = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return <Dashboard />;
}
