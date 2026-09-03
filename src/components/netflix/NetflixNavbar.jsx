import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export const NetflixNavbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100; // Account for fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${
        isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        <img 
          src="/pranavsai netflix logo style.png" 
          alt="Pranavsai" 
          className="h-8 md:h-10 object-contain cursor-pointer"
        />
        <ul className="hidden md:flex gap-4 text-sm font-medium text-[#E5E5E5]">
          <li onClick={() => scrollToSection('home')} className="cursor-pointer hover:text-gray-300 transition-colors font-bold text-white">Home</li>
          <li onClick={() => scrollToSection('hackathons')} className="cursor-pointer hover:text-gray-300 transition-colors">Hackathons</li>
          <li onClick={() => scrollToSection('achievements')} className="cursor-pointer hover:text-gray-300 transition-colors">Achievements</li>
          <li onClick={() => scrollToSection('projects')} className="cursor-pointer hover:text-gray-300 transition-colors">Projects</li>
          <li onClick={() => scrollToSection('experience')} className="cursor-pointer hover:text-gray-300 transition-colors">Experience</li>
          <li onClick={() => scrollToSection('clubs')} className="cursor-pointer hover:text-gray-300 transition-colors">Clubs</li>
          <li onClick={() => scrollToSection('skills')} className="cursor-pointer hover:text-gray-300 transition-colors">Skills</li>
        </ul>
      </div>
      
      <div className="flex items-center gap-6 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-gray-300 transition-colors">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <div className="w-8 h-8 rounded-md overflow-hidden cursor-pointer">
          {/* We can pass the active profile avatar here later if needed */}
          <img src="/avatars/recruiter.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.nav>
  );
};
