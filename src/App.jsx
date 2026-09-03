import React, { useState } from 'react';
import { IntroAnimation } from './components/netflix/IntroAnimation';
import { ProfileSelection } from './components/netflix/ProfileSelection';
import { Dashboard } from './components/netflix/Dashboard';

function App() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeProfile, setActiveProfile] = useState(null);

  if (!hasInteracted) {
    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center cursor-pointer text-white/50 hover:text-white transition-colors"
        onClick={() => setHasInteracted(true)}
      >
        <p className="text-xl tracking-widest uppercase font-light">Click to Enter</p>
      </div>
    );
  }

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  if (!activeProfile) {
    return <ProfileSelection onSelectProfile={setActiveProfile} />;
  }

  return <Dashboard profile={activeProfile} />;
}

export default App;
