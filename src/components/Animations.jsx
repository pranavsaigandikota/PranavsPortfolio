import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import animationsData from '../data/animations.json';
import { AnimatedTitle } from './AnimatedTitle';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const Animations = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Only display actual videos in the grid, ignore the 'Link' type from the JSON
  const videos = animationsData.filter(video => video.type !== 'Link');

  return (
    <motion.section
      id="animations"
      className="projects py-20 px-5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="section-title-wrap">
        <motion.h2 variants={fadeInUp}>
          <AnimatedTitle className="section-title-big">My Animations</AnimatedTitle>
        </motion.h2>
      </div>

      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="relative w-full overflow-hidden border-2 border-[#1f1917] group aspect-video cursor-pointer hover:border-[var(--primary-color)] transition-colors duration-300"
              style={{ flex: "1 1 300px", maxWidth: "400px" }}
              onClick={() => setSelectedVideo(video)}
            >
              {video.videoUrl.includes('youtube.com') ? (
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  loading="lazy"
                ></iframe>
              ) : (
                <video
                  src={video.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                ></video>
              )}
              
              {/* Play Button Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sleek See More Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <a 
            href="https://www.youtube.com/@earthlytomcat11" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lg md:text-xl font-light tracking-[0.2em] text-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-colors uppercase"
          >
            See More
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent clicking the video from closing modal
            >
              {selectedVideo.videoUrl.includes('youtube.com') ? (
                <iframe
                  src={selectedVideo.videoUrl.replace('mute=1', 'mute=0')}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                ></video>
              )}
            </div>
            
            <button 
              className="absolute top-6 right-6 text-white hover:scale-110 transition-transform bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedVideo(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="absolute bottom-6 text-white text-xl font-bold tracking-wider drop-shadow-md">
              {selectedVideo.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
