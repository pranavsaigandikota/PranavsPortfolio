import { Code, Layers, Database, Cpu, Terminal, Trophy, Star, Award } from 'lucide-react';
import revisionImg from "../assets/ProjectsPics/revisionainpage.jpg";

import freedomImg from "../assets/optimized/freedomlanding.webp";

import visionImg from "../assets/ProjectsPics/visionmain.jpg";

import satchelImg from "../assets/optimized/SatchyCover.webp";

import tacoImg from "../assets/ProjectsPics/Taco.jpg"; // Assuming this is for Jumblehot or similar if not specified, but user said "Taco project pics". I'll use it for Jumblehot for now or add a new one if needed. Actually, user said "I put freedom finances revision and taco project pics". I will use tacoImg for "Jumblehot" as a placeholder or maybe "Taco" is a new project? I'll stick to the existing list but update images.

import jennysImg from "../assets/optimized/jennys-playtime.webp";

import jumblehotImg from "../assets/optimized/jumblehot.webp";

import humanotoneImg from "../assets/optimized/humanotone.webp";

import exodusImg from "../assets/optimized/exodus.webp";

import roboticsImg from "../assets/optimized/robotic-animatronics.webp";

import moreProjectsImg from "../assets/optimized/more-projects.webp";

import replotMapImg from "../assets/optimized/replotmap.webp";

import sentinelImg from "../assets/optimized/SentinelDemo.webp";

import uknightImg from "../assets/optimized/UknightDemo.webp";

import paradiseImg from "../assets/optimized/paradise.webp";

import isueLab from "../assets/ExperiencesPics/ISUELAB.png";

import isueUserStudy from "../assets/ExperiencesPics/ISUELABUSERSTUDY.jpeg";

import isueProcGen from "../assets/ExperiencesPics/ISUEProceduralGenerationUnity.jpeg";

import isueRoomGen from "../assets/ExperiencesPics/ISUERoomgeneration.jpeg";

import isueWhisper from "../assets/optimized/ISUEWhisperAI.webp";

import siGroup from "../assets/ExperiencesPics/SIGroup.jpeg";

import siGroupFunny from "../assets/optimized/SIGroupFunny.webp";

import knightHacks from "../assets/optimized/knighhacksgroup.webp";

import diwaliBackdrop from "../assets/ExperiencesPics/DiwaliBackdrop.jpeg";

import diwaliBoard from "../assets/ExperiencesPics/DiwaliBoard.jpeg";

import diwaliCrowd from "../assets/ExperiencesPics/DiwaliCrowd.jpeg";

import diwaliFood from "../assets/ExperiencesPics/DiwaliFood.jpeg";

import diwaliSpeech from "../assets/ExperiencesPics/DiwaliSpeechTalking.jpeg";

import culturalSec from "../assets/optimized/CulturalSecretary.webp";

import nssMeeting from "../assets/ExperiencesPics/NSSMeeting.jpeg";

import nssPoster from "../assets/ExperiencesPics/NSSPresentationPoster.jpeg";

import nssSpeech from "../assets/ExperiencesPics/NSSSpaceSettlementSpeech.jpeg";

import nssStandalone from "../assets/optimized/NSSSpaceStandalone.webp";

import nssNewspaper from "../assets/ExperiencesPics/NSSonNewspaper.jpeg";

import bnyImg from "../assets/ExperiencesPics/BNY.jpg";

import perplexityImg from "../assets/ExperiencesPics/perplexity.png";

import ucfCecsImg from "../assets/ExperiencesPics/UCFCECS.png";

import fordImg from "../assets/optimized/Ford.webp";

import saseImg from "../assets/ExperiencesPics/saselogo.png";

export const projectsData = [
  {
    title: "UCF SASE Official Website",
    imageSrc: saseImg,
    imageFit: "contain",
    shortDescription: "A QR check-in system replacing manual attendance tracking for over 200 UCF SASE members.",
    fullDescription: [
      "Led the web team as CS Tech Chair to build the official UCF SASE website and replace manual attendance tracking with a Next.js and Supabase QR check-in system.",
      "Implemented row-level security policies and duplicate-check-in protection for over 200 members. Development began in July 2026 and continues today."
    ],
    skills: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    themeColor: "#2563eb",
  },
  {
    title: "Paradise",
    event: "SHELLHACKS 2026: 3rd Best Overall",
    featuredAward: true,
    imageSrc: paradiseImg,
    shortDescription: "Touch-only navigation for DeafBlind users, translating live video and location cues into Joy-Con haptics.",
    fullDescription: [
      'Won 3rd Best Overall at ShellHacks 2026 among over 290 projects and 1,400 hackers.',
      'Built touch-only navigation for DeafBlind users by streaming phone video over WebRTC to a laptop perception pipeline and converting object, obstacle, GPS, and compass cues into Joy-Con haptics.',
      'Kept obstacle guidance responsive by running Depth Anything V2 separately from slower object detection, estimating approximate metric distances at 80 ms per frame with a RANSAC floor-plane fit.',
    ],
    skills: ["JavaScript", "Node.js", "WebGPU", "WebRTC", "WebHID", "Computer Vision", "YOLO", "GPS", "Haptics", "ONNX Runtime", "Depth Anything V2"],
    demo: "https://www.youtube.com/watch?v=BVIRTrum1OM",
    source: "https://devpost.com/software/paradise-n0i7of",
    themeColor: "#00a86b",
  },
  {
    title: "uKnight",
    imageSrc: uknightImg,
    shortDescription: "Anonymous university video chat, built by a six-member team and used by 72 verified students in its first three weeks.",
    fullDescription: [
      'Led a six-member team building an anonymous university video-chat platform; deployed the Spring Boot and WebSocket backend on GCP Cloud Run for WebRTC signaling, reaching 72 verified users in three weeks.',
      'Moved matchmaking and session state to a distributed Redis sorted set, using an atomic Lua operation to prevent double-matches and stale-session pruning to support multiple backend instances.',
    ],
    skills: ["React", "Spring Boot", "WebRTC", "PostgreSQL", "Redis", "GCP", "WebSockets", "OAuth", "Next.js", "Docker", "Lua"],
    demo: "https://uknight.net",
    source: "https://github.com/uKnight-Co/uKnight",
    themeColor: "#FFD700",
  },
  {
    title: "Sentinel",
    event: "Hacklytics 2026: Golden Byte",
    imageSrc: sentinelImg,
    shortDescription: "Web Extension for Real-Time Misinformative Content Detection.",
    fullDescription: [
      "Built a Chrome extension acting as a real-time trust and safety layer for social media, automatically analyzing images and videos for AI-generation artifacts.",
      "Injected side note badges onto X (Twitter) feeds via MutationObserver, parsing DOM and intercepting GraphQL API responses.",
      "Implemented a backend running local ML models (CLIP, SDXL-detector, GAN-face detector) with FastAPI and Actian VectorAI DB for fast KNN similarity search.",
      "Integrated Sphinx Reasoning SDK to provide natural language explanations of AI detection risk levels."
    ],
    skills: ["JavaScript", "React", "Chrome Extension", "Python", "FastAPI", "Actian VectorAI", "Hugging Face", "Sphinx AI"],
    demo: "https://devpost.com/software/sentinel-w2ehfs",
    source: "https://github.com/AlphaKnight1701-A/Sentinel",
    themeColor: "#000000",
  },
  {
    title: "RePlot",
    event: "SwampHacks 2026",
    imageSrc: replotMapImg,
    shortDescription: "AI-powered urban planning tool identifying underutilized land for sustainable development.",
    fullDescription: [
      "AI-Powered Site Discovery: Uses Google Gemini to scan cities and identify underused land.",
      "Smart Exclusions: Automatically skips sensitive areas like schools and parks.",
      "The RePlot Impact Engine: Combines AI pattern recognition with scientific models to validate sites.",
      "Sustainability Analysis: Estimates carbon reduction, urban cooling, and biodiversity impact.",
      "Interactive Mapping: Live maps with high-resolution satellite imagery and boundary highlighting."
    ],
    skills: ["React", "FastAPI", "Python", "Google Gemini", "Mapbox GL"],
    demo: "https://devpost.com/software/replot",
    source: "https://github.com/Yimo-Liu-13196/SwampHacks",
    themeColor: "#2E7D32",
  },
  {
    title: "Satchel",
    imageSrc: satchelImg,
    shortDescription: "AI-powered full-stack inventory platform with smart parsing and chatbot assistance.",
    fullDescription: [
      "Built a full-stack inventory platform with Spring Boot (RESTful CRUD APIs) and React for managing different kinds of inventory. Support to form group inventories for combined management.",
      "Integrated Spring AI with GPT to parse shopping bills/lists, auto-add inventory items, and power an inventory-aware chatbot for assistance and planning.",
      "Secured inventory access using Spring Security and Auth0, and deployed via multi-stage Docker builds and CI/CD on Render."
    ],
    skills: ["Spring Boot", "PostgreSQL", "React", "Spring Data JPA", "Spring AI", "Spring Security", "OAuth 2.0", "Auth0", "Docker", "GPT"],
    demo: "https://satchel-frontend-one.vercel.app/",
    source: "https://github.com/pranavsaigandikota/Satchel",
    themeColor: "#864212",
  },
  {
    title: "ReVision",
    event: "ShellHacks 2025",
    imageSrc: revisionImg,
    shortDescription: "Real-time AI tutor for whiteboard problem solving using Gemini Vision.",
    fullDescription: [
      "Developed a real-time AI tutor that watches over and gives guidance suggestions while you solve problems on a whiteboard from uploaded question sets.",
      "Worked on implementing Supabase and connecting Gemini Vision with Google Vision OCR for real-time whiteboard recognition."
    ],
    skills: ["Google Gemini", "Google Vision", "React", "Flask", "Supabase"],
    demo: "https://revision-bay.vercel.app/",
    source: "https://github.com/KaziAmin110/Revision/tree/main",
    themeColor: "#cc0007", // Dark red
  },
  {
    title: "TACO",
    event: "KnightHacks 2025",
    imageSrc: tacoImg,
    shortDescription: "Voice-controlled robotic arm using computer vision to organize objects.",
    fullDescription: "TACO (Technically Autonomous Coordinated Organizer) is a voice-controlled robotic arm built with LEGO Mindstorms. It uses Computer Vision (YOLOv8) to detect objects and ElevenLabs API for voice interaction, executing commands to pick and place items autonomously.",
    skills: ["Python", "OpenCV", "YOLOv8", "ElevenLabs API", "PyBricks", "Flask", "LEGO Mindstorms"],
    demo: "https://devpost.com/software/taco-j9ma8r",
    source: "https://github.com/AlphaKnight1701-A/TACO",
    themeColor: "#facc15", // Yellow
  },
  {
    title: "Freedom Finances",
    event: "ShellHacks 2024",
    imageSrc: freedomImg,
    shortDescription: "Debt management app analyzing bank statements for personalized recommendations.",
    fullDescription: [
      "Designed and implemented the frontend for a debt management website which uses GPT-3.5 and the Plaid API to analyze bank statements and deliver personalized debt management recommendations."
    ],
    skills: ["ReactJS", "Bootstrap", "Figma"],
    demo: "https://devpost.com/software/freedom-finances",
    source: "https://github.com/colemaring/Freedom-Finanaces",
    themeColor: "#001fcf", // Blue
  },
  {
    title: "Vision",
    event: "KnightHacks VII 2024",
    imageSrc: visionImg,
    shortDescription: "Hands-free drawing app using eye tracking and voice commands.",
    fullDescription: [
      "Created application enabling users with limited mobility to draw on a virtual canvas hands-free using eye tracking (MediaPipe + OpenCV) and voice commands (SpeechRecognition)."
    ],
    skills: ["Python", "OpenCV", "MediaPipe", "SpeechRecognition"],
    demo: "https://devpost.com/software/vision-q7yp45",
    source: "https://github.com/pranavsaigandikota/Vision",
    themeColor: "#3cafd1", // Light teal-blue
  },
  {
    title: "Jenny’s Playtime",
    imageSrc: jennysImg,
    shortDescription: "Story-driven horror survival game with AI bots.",
    fullDescription: "Developed Jenny’s Playtime, a story-driven horror survival game featuring AI bots, published on Itch.io.",
    skills: ["C#", "Unity", "Game Development", "AI Bots"],
    demo: "https://filmasticpg.itch.io/jennys-playtime",
    source: "https://filmasticpg.itch.io/jennys-playtime",
    themeColor: "#b30000", // Red
  },
  {
    title: "Jumblehot",
    imageSrc: jumblehotImg,
    shortDescription: "Endless jumping game published on the Amazon Appstore.",
    fullDescription: "Created and published Jumblehot, an endless jumping game released on the Amazon Appstore.",
    skills: ["C#", "Unity", "Mobile Development", "Game Design"],
    demo: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    source: "https://www.amazon.com/FilmasticPG-Jumblehot/dp/B08DDD14JD",
    themeColor: "#ff6600", // Orange
  },
  {
    title: "NextFlix",
    imageSrc: "https://github.com/pranavsaigandikota/NextFlix/raw/main/assets/banner.png", // Trying to link directly if possible, or use a placeholder
    shortDescription: "Mobile movie discovery app with trailers and watchlist.",
    fullDescription: [
      "Developed a mobile movie discovery app with browsing, trailers, and personalized watchlist features.",
      "Integrated TMDB API for real-time movie data and Appwrite for secure authentication and database storage."
    ],
    skills: ["React Native", "Expo", "Appwrite", "TMDB API", "NativeWind"],
    demo: "",
    source: "https://github.com/pranavsaigandikota/NextFlix/",
    themeColor: "#f54a33", // Bright red-orange
  },
  {
    title: "Humanotone",
    imageSrc: humanotoneImg,
    shortDescription: "Turn facial expressions and gestures into music in your browser.",
    fullDescription: "Browser-based instrument that turns facial expressions and hand gestures into music. Built with React, TensorFlow.js, and Mediapipe, with Tone.js handling sound generation.",
    skills: ["React", "TensorFlow.js", "Mediapipe", "Tone.js", "Webcam Input", "Real-Time Interaction"],
    demo: "https://pranavsaigandikota.github.io/Humanotone/",
    source: "https://github.com/pranavsaigandikota/Humanotone/",
    themeColor: "#07a102", // Green
  },
  {
    title: "Exodus",
    imageSrc: exodusImg,
    shortDescription: "Authored a 50-page research paper on sustainable space habitation.",
    fullDescription: [
      <>Authored a <strong>50</strong>-page research paper on sustainable space habitation.</>,
      <>Won <strong>1st</strong> place among <strong>17,000+</strong> students (<strong>3,000+</strong> entries) from <strong>22</strong> countries in NSS Space Settlement Contest.</>,
      <>Presented the research paper to industry leaders at the International Space Development Conference <strong>2022</strong>.</>
    ],
    skills: ["Research", "Blender"],
    demo: "https://www.youtube.com/watch?v=GYl_ZlsiQ1c",
    source: "https://drive.google.com/file/d/1SmqbU08lu2u-oHAElzyCyP6lZpyM0h15/view",
    themeColor: "#7b00ff", // Purple
  },
  {
    title: "Robotic Animatronics",
    imageSrc: roboticsImg,
    shortDescription: "Custom-built animatronic heads with remote control operation.",
    fullDescription: "Created animatronic heads as a hobby, learning the skills of designing, building, and programming robots to operate with a remote control.",
    skills: ["Design", "Building", "Programming", "Robotics"],
    demo: "https://filmasticpg.wixsite.com/mysteriousunloaded",
    source: "https://filmasticpg.wixsite.com/mysteriousunloaded/post/the-mantis-update-a-new-look-and-enhanced-control",
    themeColor: "#808080",
  },
  {
    title: "More of My Projects",
    imageSrc: moreProjectsImg,
    shortDescription: "Explore my complete portfolio of animations, research, and more.",
    fullDescription: "To view all my projects, including 3D animations, research papers, robots, music, and more, click below!",
    skills: [],
    demo: "https://pranavsaigandikota.wixsite.com/filmasticpg",
    source: "",
    themeColor: "#ff66b2",
  },
];

export const experiences = [
  {
    role: "Software Engineering Intern",
    organisation: "Ford Motor Company",
    startDate: "May 2026",
    endDate: "August 2026",
    type: "Internship",
    themeColor: "#3b82f6", // Ford Blue (Brighter)
    images: [fordImg],
    experiences: [
      'Cut processing time by 92% (45 to 3.5 minutes) by migrating six Java Struts batch jobs to Java 21 and Spring Boot on GCP Cloud Run, moving data-heavy work into PostgreSQL stored procedures.',
      'Automated scheduled fixed-width file generation and SFTP delivery to GECHUB for QAD processing; validated over 200,000 records against legacy outputs without disrupting downstream processes.',
      'Added 143 automated tests with over 90% coverage and resolved 31 critical SonarQube findings, including SQL injection and credential-logging risks, before release through Tekton CI/CD.',
      'Built automated secret refresh using Secret Manager, Pub/Sub, Cloud Functions, and Spring Actuator, reloading affected GOaLS services in under two minutes without restarts; provisioned infrastructure with Terraform.',
    ],
    imageFit: "contain",
  },
  {
    role: "Software Engineering Intern",
    organisation: "NextGen Federal",
    startDate: "May 2026",
    endDate: "Present",
    type: "Internship",
    themeColor: "#0f766e",
    images: ["/history/nextgenlogo.jpg"],
    experiences: [
      "Contributing to full-stack development and software engineering initiatives."
    ],
    imageFit: "contain",
  },
  {
    role: "Computer Science Tech Chair",
    organisation: "SASE (UCF)",
    startDate: "Jun 2026",
    endDate: "Present",
    type: "Part-time",
    themeColor: "#2563eb",
    images: [saseImg],
    experiences: [
      'Led the web team as CS Tech Chair to replace manual attendance tracking with a Next.js and Supabase QR check-in system for over 200 members, with row-level security policies and duplicate-check-in protection.',
      'Lead frontend and backend developers maintaining the official UCF SASE website and facilitate technical, project-based computer science workshops for members.',
    ],
    imageFit: "contain",
  },
  {
    role: "Teaching Assistant - Object-Oriented Programming with Java",
    organisation: "CECS, UCF",
    startDate: "Jan. 2026",
    endDate: "May 2026",
    type: "Work",
    themeColor: "#FFC904", // UCF Gold
    images: [ucfCecsImg],
    experiences: [
      'Graded assignments and exams for correctness and algorithmic efficiency, and held weekly office hours supporting 166 students on Java OOP design, programming, and debugging.',
    ],
    imageFit: "contain",
  },
  {
    role: "Supplemental Instruction (SI) Leader - Computer Science 1",
    organisation: "Student Academic Resource Center (SARC), UCF",
    startDate: "Aug. 2025",
    endDate: "Dec. 2025",
    type: "Work",
    themeColor: "#3b82f6", // Blue
    images: [siGroup, siGroupFunny],
    experiences: [
      "Holding collaborative study sessions for students enrolled in Computer Science I in support to Dr. Arup Guha's classes.",
      "Facilitated both in-person and online sessions (via Zoom) to support diverse learning needs.",
      "Designing and holding engaging review materials, practice problems, and interactive activities to reinforce course concepts.",
      "Encouraging active participation and peer-to-peer learning to strengthen student understanding and problem-solving skills.",
      "Supporting students in preparing for exams and assignments by breaking down complex topics into approachable steps.",
    ],
  },
  {
    role: "Undergraduate Research Assistant",
    organisation: "ISUE Lab (AI/ML - VR and Human Computer Interaction), UCF",
    startDate: "Sep. 2024",
    endDate: "Dec. 2025",
    type: "Research",
    themeColor: "#8b5cf6", // Purple
    images: [isueLab, isueUserStudy, isueProcGen, isueRoomGen, isueWhisper],
    experiences: [
      'Fine-tuned three Llama 3.1 8B adapters on 1,820 NASA-TLX and SUS examples using PyTorch, CUDA, Hugging Face Transformers, and QLoRA with 4-bit quantization.',
      'Built a Python text-to-3D workflow spanning scene extraction, Stable Diffusion 3.5, human review, and TRELLIS; processed 135 images across 30 scene directories and metadata for 48 objects.',
      'Orchestrated long-running GPU jobs with subprocesses, thread-safe queues, watchdog timers, and isolated Conda environments while keeping the review interface responsive.',
    ],
  },
  {
    role: "Web Design and 3D Animation",
    organisation: "KnightHacks, UCF",
    startDate: "Sep. 2025",
    endDate: "Present",
    type: "Club",
    themeColor: "#f59e0b", // Amber
    images: [knightHacks],
    experiences: [
      "Designing and developing the official KnightHacks website UI/UX.",
      "Creating 3D animations, graphics, and visual assets to enhance the hackathon’s branding and user experience.",
      "Helping in Dev Sprints and other tasks behind KnightHacks.",
      "Contact: pranavsaig@knighthacks.org",
    ],
  },
  {
    role: "Diwali and Banquet Director",
    organisation: "Indian Student Association UCF",
    startDate: "Jun 2025",
    endDate: "May 2026",
    type: "Leadership",
    themeColor: "#ec4899", // Pink
    images: [diwaliBackdrop, diwaliSpeech, diwaliCrowd, diwaliBoard, diwaliFood],
    experiences: [
      "Leading the planning and execution of Diwali and Banquet events for UCF’s largest Indian student organization.",
      "Coordinating with multiple teams and clubs to deliver engaging experiences for the campus community with turnouts up-to almost 300+ attendees.",
      "Contributed innovative ideas and guided team members to ensure successful event execution.",
    ],
  },
  {
    role: "Cultural Secretary",
    organisation: "Ithaka International School",
    startDate: "Jun 2022",
    endDate: "Apr 2023",
    type: "Leadership",
    themeColor: "#10b981", // Emerald
    images: [culturalSec],
    experiences: [
      "Initiated and led science/tech fairs and cultural festivals.",
      "Showcased leadership and collaboration skills.",
    ],
  },
  {
    role: "NSS Space Settlement Research/Presenter",
    organisation: "National Space Society",
    startDate: "Dec 2022",
    endDate: "Feb 2023",
    type: "Research",
    themeColor: "#8b5cf6", // Violet
    images: [nssSpeech, nssPoster, nssStandalone, nssMeeting, nssNewspaper],
    experiences: [
      <>Authored a <strong>50</strong>-page research paper on sustainable space habitation.</>,
      <>First Place Winner among <strong>17,000+</strong> students (<strong>3,000+</strong> entries) from <strong>22</strong> countries for &apos;Exodus&apos; space settlement design.</>,
      <>Presented the research paper to industry leaders at the International Space Development Conference <strong>2022</strong>.</>,
    ],
  },
  {
    role: "Knights Shadow",
    organisation: "BNY",
    startDate: "Dec 2025",
    endDate: "Dec 2025",
    type: "Shadowing",
    themeColor: "#EFB008", // Gold
    images: [bnyImg],
    experiences: [
      "Shadowed industry professionals at BNY Mellon, gaining first-hand exposure to the daily operations and technical challenges of a global financial services company.",
      "Networked with software engineering managers and technical leads to understand the software development lifecycle (SDLC) within the fintech sector.",
      "Acquired insights into enterprise-scale application workflows, identifying key skills and technologies required for success in financial software engineering.",
    ],
  },
  {
    role: "Campus Partner | Perplexity",
    organisation: "Perplexity",
    startDate: "Sep 2025",
    endDate: "Dec 2025",
    type: "Part-time",
    themeColor: "#22d3ee", // Cyan
    images: [perplexityImg],
    experiences: [
      "Promoting Perplexity AI on campus by driving student adoption, referrals, and engagement with Comet and Perplexity Pro.",
      "Gaining hands-on experience in marketing, outreach, and community building.",
      "Connecting students to smarter ways to study and research.",
    ],
  },
];

export const skillsData = [
  {
    category: "Languages",
    skills: ["C", "Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
    themeColor: "#3b82f6", // Blue
    icon: <Code size={32} />,
    description: "Core languages for systems, web, and data.",
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React",
      "React Native",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Spring AI",
      "Tailwind CSS",
      "NativeWind",
      "Expo",
    ],
    themeColor: "#8b5cf6", // Violet
    icon: <Layers size={32} />,
    description: "Modern tools for building scalable applications.",
  },
  {
    category: "Databases & Auth",
    skills: ["PostgreSQL", "Supabase", "Render", "OAuth 2.0", "Auth0"],
    themeColor: "#f59e0b", // Amber/Orange
    icon: <Database size={32} />,
    description: "Data persistence and secure authentication.",
  },
  {
    category: "AI / ML",
    skills: [
      "Google Gemini",
      "GPT",
      "LLaMA",
      "PyTorch",
      "TensorFlow.js",
      "Transformers",
      "OpenCV",
    ],
    themeColor: "#10b981", // Emerald
    icon: <Cpu size={32} />,
    description: "Advanced AI models and machine learning libraries.",
  },
  {
    category: "Tools & Practices",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Agile",
      "Unity",
      "Blender",
      "Figma",
      "Canva",
      "Premiere Pro",
    ],
    themeColor: "#ec4899", // Pink
    icon: <Terminal size={32} />,
    description: "Essential tools for development, design, and 3D creation.",
  },
];

export const achievements = [
    {
      title: "Dean’s List",
      subtitle: "2026 · University of Central Florida",
      points: ["B.S. Computer Science · GPA: 3.99 / 4.0"],
      icon: <Award size={32} />,
      borderColor: "#FFC904",
      description: "Recognized for academic achievement at UCF."
    },
    {
      title: "NSS Space Settlement Contest",
      subtitle: "First Prize (Dec 2022 – Feb 2023)",
      points: [
        "Developed a 50-page research document on sustainability.",
        "Presented oral and poster presentations at ISDC.",
      ],
      icon: <Trophy size={32} />,
      borderColor: "#facc15", // Yellow
      description: "International recognition for space settlement design excellence."
    },
    {
      title: "President’s Honor Roll",
      subtitle: "Fall 2024 & Spring 2025",
      points: ["Recognized for outstanding academic performance."],
      icon: <Star size={32} />,
      borderColor: "#60a5fa", // Blue
      description: "Awarded for maintaining a 4.0 GPA in consecutive semesters."
    },
    {
      title: "Honor Society & SCLA Honor",
      subtitle: "Leadership Recognition",
      points: ["Awarded for academic excellence and leadership."],
      icon: <Award size={32} />,
      borderColor: "#4ade80", // Green
      description: "Recognition for leadership contributions and academic success."
    },
  ];

export const codeString = `const pranav = {
  role: "Software Engineer · Applied AI",
  basedIn: "Orlando, FL",
  education: "B.S. CS @ UCF · May 2028",
  gpa: "3.99 / 4.0",
  build: ["Full-stack", "Cloud", "AI"],
  stack: ["React", "Spring Boot", "Python"],
  focus: "Software solutions powered by AI",
  beyondCode: ["Animation", "Piano"],
  contact: "pranavsaigandikota@gmail.com"
};`;
