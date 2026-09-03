import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PreviewModal = ({ item, isOpen, onClose, allItems = [], onSelect }) => {
  const [isMuted, setIsMuted] = useState(item?.title === "About Pranav");
  const [expandedImage, setExpandedImage] = useState(null);

  // Update mute state if a different item is selected while modal is open
  useEffect(() => {
    setIsMuted(item?.title === "About Pranav");
  }, [item]);

  if (!isOpen || !item) return null;

  const image = item.images ? item.images[0] : (item.imageSrc || '/placeholder.png');
  const title = item.title || item.role;
  const description = item.description || item.experiences?.[0];
  const fullDescription = item.fullDescription || item.experiences;
  const skills = item.skills || [];
  
  // Calculate a fake "match" based on title length or just random to look like Netflix
  const matchPercentage = Math.min(99, 85 + (title.length % 15));

  // Extract a release year
  let releaseYear = "";
  if (item.startDate) {
    const match = item.startDate.match(/\d{4}/);
    if (match) releaseYear = match[0];
  } else if (item.event) {
    const match = item.event.match(/\d{4}/);
    if (match) releaseYear = match[0];
  } else {
    releaseYear = "2025"; // default fallback for projects without years
  }

  // Get 3 random suggested items that are not the current item
  const suggestedItems = [...allItems]
    .filter(i => (i.title || i.role) !== title)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Next/Prev Navigation logic
  const currentIndex = allItems.findIndex(i => (i.title || i.role) === title);
  const hasNext = currentIndex !== -1 && currentIndex < allItems.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = (e) => {
    e.stopPropagation();
    if (hasNext && onSelect) {
      document.querySelector('.overflow-y-scroll').scrollTo({ top: 0, behavior: 'smooth' });
      onSelect(allItems[currentIndex + 1]);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (hasPrev && onSelect) {
      document.querySelector('.overflow-y-scroll').scrollTo({ top: 0, behavior: 'smooth' });
      onSelect(allItems[currentIndex - 1]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-center overflow-y-scroll bg-black/80 pt-10 pb-20 scrollbar-hide"
        onClick={onClose}
      >
        {/* Navigation Arrows */}
        {hasPrev && (
          <button 
            className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 z-[150] text-white hover:scale-125 transition-transform opacity-70 hover:opacity-100"
            onClick={handlePrev}
          >
            <svg className="w-12 h-12 md:w-16 md:h-16 drop-shadow-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        
        {hasNext && (
          <button 
            className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-[150] text-white hover:scale-125 transition-transform opacity-70 hover:opacity-100"
            onClick={handleNext}
          >
            <svg className="w-12 h-12 md:w-16 md:h-16 drop-shadow-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl mx-4 my-auto h-max"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Header Image or Video */}
          <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
            {item.videoUrl ? (
              <>
                <video
                  src={item.videoUrl}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                ></video>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                  className="absolute bottom-8 right-8 z-50 w-10 h-10 bg-black/50 border border-gray-400 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  )}
                </button>
              </>
            ) : (
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
            
            {/* Title & Actions overlay */}
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md tracking-tight">
                {title}
              </h2>
              
              <div className="flex gap-4">
                {(item.demo || item.source) && (
                  <a 
                    href={item.demo || item.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-white/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                    {item.demo ? 'Live Demo' : 'View Source'}
                  </a>
                )}
                {item.demo && item.source && (
                  <a 
                    href={item.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#2a2a2a] text-white px-8 py-2 rounded font-bold hover:bg-[#404040] border border-gray-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 flex flex-col md:flex-row gap-8 text-[#E5E5E5]">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6 font-semibold">
                <span className="text-[#46d369]">{matchPercentage}% Match</span>
                <span className="text-gray-400 border border-gray-400 px-1 text-sm rounded-sm">{releaseYear}</span>
                <span className="text-white text-sm bg-[#333] px-2 py-0.5 rounded">HD</span>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 font-medium">
                {description}
              </p>

              {Array.isArray(fullDescription) && (
                <ul className="space-y-2 mb-6">
                  {fullDescription.map((desc, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-[#E50914] mt-1">•</span>
                      <span className="text-sm text-gray-300 leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col gap-6 text-sm">
              {skills.length > 0 && (
                <div>
                  <span className="text-[#777] block mb-1">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill, i) => (
                      <span key={i} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        {skill}{i < skills.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {item.organisation && (
                <div>
                  <span className="text-[#777] block mb-1">Organization:</span>
                  <span className="text-white">{item.organisation}</span>
                </div>
              )}

              {item.startDate && (
                <div>
                  <span className="text-[#777] block mb-1">Duration:</span>
                  <span className="text-white">{item.startDate} to {item.endDate}</span>
                </div>
              )}
            </div>
          </div>
          {/* Photo Gallery (if multiple images exist) */}
          {item.images && item.images.length > 1 && (
            <div className="px-8 pb-10">
              <h3 className="text-xl font-bold text-white mb-4 tracking-wide">Behind the Scenes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.images.slice(1).map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-video rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer bg-[#222]"
                    onClick={() => setExpandedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${title} snapshot ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This (Suggested) */}
          {suggestedItems.length > 0 && (
            <div className="px-8 pb-10">
              <h3 className="text-xl font-bold text-white mb-4 tracking-wide">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {suggestedItems.map((suggested, idx) => {
                  const suggestedImage = suggested.images ? suggested.images[0] : (suggested.imageSrc || '/placeholder.png');
                  const suggestedTitle = suggested.title || suggested.role;
                  const suggestedDesc = suggested.description || (suggested.experiences ? suggested.experiences[0] : '');
                  // Netflix "match" is usually just a high random number
                  const suggestedMatch = Math.min(99, 85 + (suggestedTitle.length % 15));
                  
                  return (
                    <div 
                      key={idx} 
                      className="bg-[#2f2f2f] rounded-md overflow-hidden cursor-pointer hover:bg-[#404040] transition-colors duration-300"
                      onClick={() => {
                        // Scroll modal back to top smoothly when selecting a new item
                        document.querySelector('.overflow-y-scroll').scrollTo({ top: 0, behavior: 'smooth' });
                        if (onSelect) onSelect(suggested);
                      }}
                    >
                      <div className="relative aspect-video">
                        <img src={suggestedImage} alt={suggestedTitle} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 text-white text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: suggested.themeColor || '#E50914' }}>
                          {suggested.type || 'Project'}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-bold text-sm line-clamp-1">{suggestedTitle}</h4>
                        </div>
                        <div className="text-[#46d369] text-xs font-bold mb-2">{suggestedMatch}% Match</div>
                        <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">{suggestedDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </motion.div>
      </motion.div>

      {/* Lightbox Overlay */}
      {expandedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <img 
            src={expandedImage} 
            alt="Expanded view" 
            className="max-w-[95vw] max-h-[95vh] object-contain rounded shadow-2xl"
          />
          <button 
            className="absolute top-6 right-6 text-white hover:scale-110 transition-transform bg-black/50 p-2 rounded-full"
            onClick={() => setExpandedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
