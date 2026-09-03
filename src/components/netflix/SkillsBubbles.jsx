import React, { useState } from 'react';
import skillsData from '../../data/skills.json';

export const SkillsBubbles = () => {
  const [activeGenre, setActiveGenre] = useState('All');

  const genres = ['All', ...skillsData.map(g => g.genre)];

  const displayedSkills = activeGenre === 'All' 
    ? skillsData.flatMap(g => g.items)
    : skillsData.find(g => g.genre === activeGenre)?.items || [];

  return (
    <div className="px-4 md:px-12 py-8 mt-4 mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Explore Skills</h2>
      
      {/* Genre Filter Bubbles */}
      <div className="flex flex-wrap gap-3 mb-8">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
              activeGenre === genre 
                ? 'bg-white text-black scale-105' 
                : 'bg-[#2b2b2b] text-gray-300 hover:bg-[#3d3d3d] hover:text-white border border-transparent'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Skills Bubbles */}
      <div className="flex flex-wrap gap-4">
        {displayedSkills.map((skill, idx) => (
          <div 
            key={`${skill.title}-${idx}`}
            className="group relative cursor-default transform hover:z-10"
          >
            {/* Neon Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-40 group-hover:opacity-100 rounded-full blur-md md:blur-lg transition-opacity duration-300`}></div>
            
            <div className="relative px-6 py-3 bg-[#111111] border border-zinc-600/50 group-hover:border-white/80 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black">
              <span className="text-gray-100 font-bold tracking-wide text-sm md:text-base group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                {skill.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
