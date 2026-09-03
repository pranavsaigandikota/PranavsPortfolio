import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
  { id: 'recruiter', name: 'Recruiter Mode', avatar: '/avatars/recruiter.jpg' },
  { id: 'hiring_manager', name: 'Hiring Manager', avatar: '/avatars/hiring_manager.jpg' },
  { id: 'geek', name: 'Deep Tech Geek', avatar: '/avatars/geek.jpg' },
  { id: 'browsing', name: 'Just Browsing', avatar: '/avatars/browsing.jpg' }
];

const playBassSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = 'sine'; // Deep, smooth bass sound
  
  // Frequency drop (pitch envelope for the "hit" effect)
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.8);
  
  // Volume fade (amplitude envelope for a smooth fade out)
  gainNode.gain.setValueAtTime(1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 1);
};

export const ProfileSelection = ({ onSelectProfile }) => {
  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center font-sans">
      <div className="absolute top-0 left-0 p-8">
        <img 
          src="/pranavsai netflix logo style.png" 
          alt="Pranavsai" 
          className="h-12 md:h-16 object-contain"
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-4xl px-4"
      >
        <h1 className="text-white text-3xl md:text-5xl mb-10 font-normal tracking-wide">
          Who's watching?
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex flex-col items-center group cursor-pointer w-28 md:w-36 lg:w-44"
              onClick={() => {
                playBassSound();
                setTimeout(() => {
                  onSelectProfile(profile);
                }, 800); // Wait 800ms to hear the bass drop before transitioning
              }}
            >
              <div className="w-full aspect-square rounded-md overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-xl relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-4 text-[#808080] group-hover:text-white transition-colors duration-300 text-sm md:text-xl font-medium text-center">
                {profile.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 md:mt-24"
        >
          <button className="border border-[#808080] text-[#808080] hover:text-white hover:border-white px-8 py-2 text-sm md:text-xl tracking-widest transition-colors duration-300 uppercase">
            Manage Profiles
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
