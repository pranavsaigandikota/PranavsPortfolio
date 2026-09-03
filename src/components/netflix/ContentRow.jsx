import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';

export const ContentRow = ({ id, title, items, isLargeRow = false, onSelect }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleScroll = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div id={id} className="relative flex flex-col mt-4 md:mt-8 px-4 md:px-12 group">
      <h2 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-4 px-2 hover:text-[#E5E5E5] transition-colors cursor-pointer inline-block">
        {title} <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-[#4ade80]">Explore All &gt;</span>
      </h2>
      
      <div className="relative h-full">
        {/* Left Arrow */}
        <div 
          className={`absolute top-0 bottom-0 left-0 w-12 bg-black/50 z-20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 ${!isMoved && 'hidden'}`}
          onClick={() => handleScroll('left')}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        {/* Row Container */}
        <div 
          ref={rowRef}
          className="flex gap-2 overflow-x-scroll scrollbar-hide py-4 px-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item, index) => (
            <div key={index} style={{ scrollSnapAlign: 'start' }}>
              <MovieCard 
                item={item} 
                isLarge={isLargeRow} 
                index={index} 
                onSelect={onSelect} 
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-12 bg-black/50 z-20 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          onClick={() => handleScroll('right')}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
