import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const HeroBanner = ({ onMoreInfo, isModalOpen }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const fadeInterval = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isReversing = false;
    let reverseInterval;

    const handleEnded = () => {
      isReversing = true;
      video.pause();

      clearInterval(reverseInterval);
      reverseInterval = setInterval(() => {
        if (video.currentTime <= 0.1) {
          clearInterval(reverseInterval);
          isReversing = false;
          video.play();
        } else {
          video.currentTime -= 0.05;
        }
      }, 50);
    };

    video.addEventListener('ended', handleEnded);
    video.play().catch(e => console.log('Autoplay prevented:', e));

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearInterval(reverseInterval);
    };
  }, []);

  const fadeAudio = (targetVolume, shouldPause = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    // If muting manually, don't play or change volume, just respect mute state
    if (audio.muted) return;

    if (!shouldPause && audio.paused) {
      audio.play().catch(e => console.log("Play prevented on intersection", e));
    }

    fadeInterval.current = setInterval(() => {
      let currentVol = audio.volume;
      if (currentVol < targetVolume) {
        currentVol = Math.min(currentVol + 0.05, targetVolume);
      } else if (currentVol > targetVolume) {
        currentVol = Math.max(currentVol - 0.05, targetVolume);
      }

      audio.volume = currentVol;

      if (currentVol === targetVolume) {
        clearInterval(fadeInterval.current);
        if (shouldPause) {
          audio.pause();
        }
      }
    }, 100); // adjust volume every 100ms
  };

  // Audio Intersection Observer
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // Base volume

    // Attempt autoplay on mount
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented by browser.", error);
        setIsMuted(true);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // triggers when at least 50% is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, []);

  // Handle play/pause logic based on modal state and intersection
  useEffect(() => {
    if (isModalOpen || !isIntersecting) {
      // Fade out and pause
      fadeAudio(0, true);
    } else if (!isModalOpen && isIntersecting) {
      // Fade in and play
      fadeAudio(0.5, false);
    }
  }, [isModalOpen, isIntersecting]);


  // Sync isMuted state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && audioRef.current.paused && isIntersecting && !isModalOpen) {
        audioRef.current.play().catch(e => console.log('Play prevented:', e));
        audioRef.current.volume = 0.5;
      }
    }
  }, [isMuted, isIntersecting, isModalOpen]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div ref={containerRef} className="relative h-[80vh] w-full bg-[#141414]">
      <audio ref={audioRef} src="/background-music.mp3" loop />

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/coding pranav animation.mp4"
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent w-[60%]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Mute Button positioned similarly to Netflix */}
      <div className="absolute bottom-24 right-12 z-20">
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-white/50 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-4 md:px-12 pb-24 w-full md:w-[50%] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto"
        >
          {/* Logo or Title */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#E50914] font-black text-2xl tracking-tighter">PG</span>
            <span className="text-gray-300 font-semibold tracking-widest text-sm">ORIGINAL SERIES</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg tracking-tight leading-tight">
            Pranavsai Gandikota
          </h1>

          <p className="text-white text-lg md:text-xl max-w-xl mb-8 drop-shadow-md font-medium">
            Explore a software engineer's journey through AI, cloud architecture, automation, and immersive web experiences. Binge the latest projects and career milestones below.
          </p>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-white/80 transition-colors font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              Play
            </button>
            <button
              onClick={onMoreInfo}
              className="flex items-center gap-2 bg-[#6d6d6eb3] hover:bg-[#6d6d6e] text-white px-6 md:px-8 py-2 md:py-3 rounded transition-colors font-bold text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
