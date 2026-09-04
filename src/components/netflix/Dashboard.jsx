import React, { useState } from 'react';
import { NetflixNavbar } from './NetflixNavbar';
import { HeroBanner } from './HeroBanner';
import { ContentRow } from './ContentRow';
import { PreviewModal } from './PreviewModal';
import { SkillsBubbles } from './SkillsBubbles';

// Import Data
import projectsData from '../../data/projects.json';
import historyData from '../../data/history.json';
import skillsData from '../../data/skills.json';
import animationsData from '../../data/animations.json';

export const Dashboard = ({ profile }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Format history as episodes first so we can use them in trending
  const historyEpisodes = historyData.map((item, index) => ({
    ...item,
    title: item.role,
    experiences: item.experiences
  }));

  // Top 3 experiences (Ford, NextGen, TA) for Trending Now
  const trendingItems = historyEpisodes.slice(0, 3);
  // Separate Projects into Hackathons and Normal Projects
  const hackathonProjects = projectsData.filter(project => project.event);
  const normalProjects = projectsData.filter(project => !project.event);
  
  // Separate the rest into Clubs, Achievements, vs Work Experience
  const restExperiences = historyEpisodes.slice(3);
  const clubExperiences = restExperiences.filter(exp => exp.type === 'Club');
  const achievements = restExperiences.filter(exp => exp.type === 'Achievement');
  const remainingExperiences = restExperiences.filter(exp => exp.type !== 'Club' && exp.type !== 'Achievement');
  


  // Removed skillsGenres since skillsData is now categorized directly

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const aboutMeData = {
    title: "About Pranav",
    videoUrl: "/coding pranav animation.mp4",
    description: "I'm Pranav, a Computer Science junior at UCF who enjoys building software that connects the dots between applications, infrastructure, and AI.",
    fullDescription: [
      "Most recently, I worked as a Software Engineering Intern on Ford's Order Fulfillment team, where I migrated legacy batch workloads to Spring Boot on Google Cloud Run, built event driven automation for cloud infrastructure, and developed an AI agent to help resolve compliance issues during a large scale repository migration.",
      "At UCF, I'm the CS Technical Chair for SASE, where I lead the development team, and a Project Director for AI at UCF, where I help create opportunities for students to build and showcase AI projects. I previously worked as a researcher in UCF's ISUE Lab, where I fine tuned LLaMA with QLoRA for a text to 3D generation pipeline.",
      "Outside of work and research, I'm constantly building. I've worked on a full stack inventory platform using Spring AI, a real time video chat platform deployed on GCP, and several other applications that have taken me from an idea to a working product.",
      "What ties everything together is my curiosity about how systems work end to end. I like going beyond the part I'm assigned understanding the infrastructure behind an application, the data flowing through it, and ultimately why the system matters to the people and business using it. I'm especially drawn to cloud infrastructure, automation, AI, and systems that work with data at scale."
    ],
    skills: ["Cloud Architecture", "System Design", "Automation", "AI/ML", "Full Stack Development"]
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden font-sans pb-24">
      <NetflixNavbar />
      
      {/* Passing the aboutMeData as the "hero" item if More Info is clicked */}
      <HeroBanner 
        onMoreInfo={() => handleSelect(aboutMeData)} 
        isModalOpen={!!selectedItem} 
      />

      <div className="relative z-20 -mt-12 md:-mt-20 space-y-8 md:space-y-12">
        <ContentRow 
          id="trending"
          title="Trending Now" 
          items={trendingItems} 
          isLargeRow={true} 
          onSelect={handleSelect} 
        />
        
        <ContentRow 
          id="hackathons"
          title="Hackathons" 
          items={hackathonProjects} 
          onSelect={handleSelect} 
        />

        <ContentRow 
          id="projects"
          title="Apps, Games and More" 
          items={normalProjects} 
          onSelect={handleSelect} 
        />

        <ContentRow 
          id="experience"
          title="Work Experience (Episodes)" 
          items={remainingExperiences} 
          onSelect={handleSelect} 
        />

        <ContentRow 
          id="clubs"
          title="Clubs & Leadership" 
          items={clubExperiences} 
          onSelect={handleSelect} 
        />

        {achievements.length > 0 && (
          <ContentRow 
            id="achievements"
            title="Honors & Awards" 
            items={achievements} 
            onSelect={handleSelect} 
          />
        )}

        {/* Skills Section presented as genre bubbles */}
        <div id="skills">
          <SkillsBubbles />
        </div>

        <ContentRow 
          id="animations"
          title="My Animations" 
          items={animationsData} 
          onSelect={handleSelect} 
        />

        {/* Copyright Notice */}
        <footer className="w-full text-center py-8 px-4 mt-8 border-t border-gray-800 text-[#808080] text-xs max-w-4xl mx-auto">
          <p>
            Everything above is owned by the respective movies and companies. I do not own any of these properties, and this was purely created for inspiration as a movie-themed portfolio site.
          </p>
        </footer>
      </div>

      <PreviewModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={closeModal} 
        allItems={[...historyEpisodes, ...projectsData, ...animationsData]}
        onSelect={handleSelect}
      />
    </div>
  );
};
