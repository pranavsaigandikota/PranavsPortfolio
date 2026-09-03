import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const IntroAnimation = ({ onComplete }) => {
  useEffect(() => {
    // Attempt to play intro sound
    const audio = new Audio('/netflix-sound.mp3');
    audio.play().catch(e => console.log('Intro audio prevented:', e));
    
    // Complete the intro after the animation finishes
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // 4.5 seconds total
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3.5 }} // Fade out the entire background at the end
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1, 1.2, 5], // Start slightly small, settle, slow zoom, then dramatic zoom in past the camera
          opacity: [0, 1, 1, 0] // Fade in, stay, then fade out during the extreme zoom
        }}
        transition={{ 
          duration: 4, 
          times: [0, 0.1, 0.7, 1], // Timing corresponds to the array values above
          ease: "easeInOut"
        }}
        className="w-64 md:w-96 flex justify-center items-center"
      >
        <img 
          src="/pranavsai netflix logo style.png" 
          alt="Pranavsai" 
          className="w-full object-contain drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
};
