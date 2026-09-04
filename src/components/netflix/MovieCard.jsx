import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const MovieCard = ({ item, isLarge = false, onSelect, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hoverTimeout = useRef(null);

  // If the item has multiple images (e.g. from history or projects), cycle through them on hover
  const images = item.images || (item.imageSrc ? [item.imageSrc] : []);
  const [imgError, setImgError] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    let timeout;
    if (isHovered) {
      setShowTitle(true);
      timeout = setTimeout(() => {
        setShowTitle(false);
      }, 5000);
    } else {
      setShowTitle(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds on hover
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleHoverStart = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 400); // 400ms delay to prevent accidental triggering when moving mouse fast
  };

  const handleHoverEnd = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <motion.div
      layout
      className={`relative flex-shrink-0 cursor-pointer group transition-all duration-500 transform ${
        isLarge ? 'w-56 md:w-72 lg:w-80' : 
        (isHovered && item.videoUrl ? 'w-[426.67px] md:w-[597.33px] lg:w-[682.67px]' : 'w-40 md:w-56 lg:w-64')
      }`}
      style={{
        aspectRatio: isLarge || (isHovered && item.videoUrl) ? '16/9' : '2/3'
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={() => {
        handleHoverEnd(); // Ensure hover state resets on click
        if (item.type === 'Link' && item.url) {
          window.open(item.url, '_blank', 'noopener,noreferrer');
        } else {
          onSelect(item);
        }
      }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
    >
      {/* Background Image or Video Container */}
      <div className="absolute inset-0 w-full h-full rounded-md overflow-hidden bg-[#141414] shadow-2xl">
        {isHovered && item.videoUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {item.videoUrl.includes('youtube.com') ? (
              <iframe
                src={item.videoUrl}
                title={item.title || item.role}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover scale-[1.35] pointer-events-none"
              ></iframe>
            ) : (
              <video
                src={item.videoUrl}
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              ></video>
            )}
          </motion.div>
        ) : images.length > 0 && !imgError ? (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentImageIndex]}
            alt={item.title || item.role}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center p-4 bg-gradient-to-br ${item.color || 'from-gray-700 to-gray-900'}`}>
            <h3 className="text-white font-bold text-center text-lg md:text-xl drop-shadow-md">
              {item.title || item.role}
            </h3>
          </div>
        )}
      </div>

      {/* Number badge for large/trending row */}
      {isLarge && (
        <div className="absolute -left-2 md:-left-4 bottom-0 text-[80px] md:text-[120px] font-black text-black leading-none drop-shadow-[-2px_0_1px_rgba(255,255,255,0.8)] opacity-100 z-10 pointer-events-none" style={{WebkitTextStroke: '2px #555'}}>
          {index + 1}
        </div>
      )}
      
      {/* Clean Title Overlay */}
      {item.type !== 'Animation' && (
        <div 
          className={`absolute bottom-0 left-0 w-full p-2 md:p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-md z-20 pointer-events-none transition-opacity duration-500 ${showTitle || item.type === 'Achievement' ? 'opacity-100' : 'opacity-0'}`}
        >
          <h3 className="text-white font-bold text-xs md:text-sm drop-shadow-md truncate text-center px-1">
            {item.title || item.role}
          </h3>
        </div>
      )}
    </motion.div>
  );
};
