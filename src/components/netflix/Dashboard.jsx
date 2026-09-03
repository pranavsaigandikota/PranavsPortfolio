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
    description: "I'm Pranav, a Computer Science junior at UCF with a deep curiosity for building scalable systems and exploring new technologies.",
    fullDescription: [
      "Most recently, I interned as a Software Engineer at Ford on the Order Fulfillment team, where I focused on cloud migration and automation. I modernized legacy batch workloads by migrating them to Spring Boot on Cloud Run, architected an event-driven secret rotation platform on Google Cloud, and developed an AI agent that seamlessly resolved compliance issues across a massive repo migration.",
      "On campus, I foster a community of builders as the CS Technical Chair for SASE (leading our dev team) and as the Project Director for AI at UCF, creating platforms for students to showcase their innovations.",
      "Previously, I researched at UCF's ISUE Lab, where I explored generative AI by fine-tuning LLaMA models with QLoRA for an innovative text-to-3D pipeline.",
      "I'm constantly building outside the classroom to satisfy my curiosity—whether it's a full-stack inventory application powered by Spring AI, a video chat platform hosted on GCP, or sleek web applications using React and Tailwind.",
      "Ultimately, what drives me is a desire to understand systems end-to-end and see how technology solves real business problems. I thrive when working with large datasets, cloud infrastructure, and automation, and I'm always looking for the next complex challenge to learn from."
    ],
    skills: ["Cloud Architecture", "System Design", "Automation", "AI/ML", "Full-Stack Development"]
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
      </div>

      <PreviewModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={closeModal} 
        allItems={[...historyEpisodes, ...projectsData]}
        onSelect={handleSelect}
      />
    </div>
  );
};
