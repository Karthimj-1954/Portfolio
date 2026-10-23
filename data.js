/**
 * Karthik Mohan J (KJ NEXUS) - Portfolio Data Source of Truth
 * All content strictly verified against actual GitHub repositories & credentials.
 */

const personalInfo = {
  name: "Karthik Mohan J",
  monogram: "KJ",
  brand: "KJ NEXUS",
  role: "Full-Stack Developer",
  location: "Thiruvananthapuram, Kerala, India",
  email: "karthikmohanj@gmail.com",
  github: "https://github.com/Karthimj-1954",
  githubUsername: "Karthimj-1954",
  linkedin: "https://www.linkedin.com/in/karthikmohanj1954/",
  avatarUrl: "public/character.png",
  availability: "Open to Opportunities",
  tagline: "I build responsive web applications and practical digital solutions, combining clean frontend experiences with API integration, authentication, and data-driven functionality.",
  about: "I'm Karthik Mohan J, a developer with a background in Electrical and Computer Engineering and hands-on experience in frontend development, API integration, and full-stack application projects. I enjoy building practical applications with clean interfaces, reusable components, and maintainable code.",
  education: {
    degree: "Bachelor of Technology — Electrical and Computer Engineering",
    institution: "Mar Baselios College of Engineering and Technology",
    university: "APJ Abdul Kalam Technological University (KTU)",
    period: "2022 – 2026",
    location: "Thiruvananthapuram, Kerala",
    highlights: [
      "Core focus on Full-Stack Web Technologies, Distributed Systems & Applied ML",
      "Hands-on embedded systems and IoT hardware prototyping",
      "Active team lead in collaborative engineering projects"
    ]
  }
};

const typingRoles = [
  "Full-Stack Developer",
  "Frontend Developer",
  "React.js Developer",
  "Software Engineer"
];


const aboutCards = [
  {
    icon: "monitor",
    title: "Pixel Perfect",
    description: "Responsive, polished interfaces crafted with precision spacing, fluid layouts, and accessibility."
  },
  {
    icon: "code-2",
    title: "Clean Code",
    description: "Maintainable, modular architecture with reusable components and predictable state."
  },
  {
    icon: "zap",
    title: "Fast Performance",
    description: "Efficient rendering, high-frame-rate interactions, and optimized asset pipelines."
  },
  {
    icon: "user-check",
    title: "User Focused",
    description: "Accessible, intuitive user experiences that turn complex engineering into practical products."
  }
];

const services = [
  {
    icon: "palette",
    title: "UI/UX Implementation",
    description: "Translate visual designs into responsive, accessible interfaces with attention to typography, spacing, and micro-interactions."
  },
  {
    icon: "layout",
    title: "Frontend Development",
    description: "Build modern web interfaces using React.js, Next.js, and modern TypeScript with clean component architecture."
  },
  {
    icon: "layers",
    title: "Full-Stack Applications",
    description: "Develop end-to-end features connecting frontend and backend systems with Node.js, Express.js, and MongoDB."
  },
  {
    icon: "gauge",
    title: "API Integration & Performance",
    description: "Integrate RESTful APIs, manage secure authentication workflows, and optimize rendering performance and data flow."
  }
];

const featuredTechStack = [
  { name: "HTML5", icon: "html5", category: "markup", color: "#E34F26" },
  { name: "CSS3", icon: "css3", category: "styling", color: "#1572B6" },
  { name: "JavaScript", icon: "javascript", category: "language", color: "#F7DF1E" },
  { name: "TypeScript", icon: "typescript", category: "language", color: "#3178C6" },
  { name: "React", icon: "react", category: "frontend", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs", category: "frontend", color: "#FFFFFF" },
  { name: "Node.js", icon: "nodejs", category: "backend", color: "#339933" },
  { name: "Express.js", icon: "express", category: "backend", color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: "tailwind", category: "styling", color: "#06B6D4" },
  { name: "Git", icon: "git", category: "tools", color: "#F05032" },
  { name: "Python", icon: "python", category: "backend", color: "#3776AB" },
  { name: "MongoDB", icon: "mongodb", category: "database", color: "#47A248" }
];


const experiences = [
  {
    id: "hexvault",
    company: "Hexvault",
    role: "Frontend Developer Intern & Team Lead",
    period: "2026 – Present",
    type: "Internship & Leadership",
    summary: "Led frontend development and code coordination for client-facing and internal SaaS applications.",
    details: [
      "Developed responsive application interfaces using React.js, TypeScript, and Tailwind CSS.",
      "Contributed significantly to Dine.Hex Table Manager, a QR-based restaurant management platform.",
      "Architected reusable UI components, application workflows, state management, and API integration.",
      "Collaborated on frontend task coordination, guided sprint reviews, and maintained clean Git/GitHub workflows."
    ],
    skills: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs", "Team Leadership", "Git/GitHub"]
  },
  {
    id: "unified-mentor",
    company: "Unified Mentor",
    role: "Frontend Development Intern",
    period: "June 2026 – August 2026",
    type: "Internship",
    summary: "Built production-grade frontend interfaces and modular components across various client initiatives.",
    details: [
      "Developed responsive web interfaces and reusable frontend components adhering to strict design specs.",
      "Delivered practical frontend development tasks across diverse user-facing web projects.",
      "Utilized Git and GitHub for version control, issue tracking, peer debugging, and code maintenance."
    ],
    skills: ["JavaScript", "React.js", "CSS3 / HTML5", "Component Architecture", "Version Control"]
  }
];

const skillCategories = [
  {
    category: "Frontend",
    description: "Building responsive, modern, high-performance user interfaces",
    skills: [
      { name: "React.js", level: "Practical" },
      { name: "Next.js", level: "Practical" },
      { name: "JavaScript (ES6+)", level: "Practical" },
      { name: "TypeScript", level: "Practical" },
      { name: "HTML5", level: "Practical" },
      { name: "CSS3", level: "Practical" },
      { name: "Tailwind CSS", level: "Practical" },
      { name: "Bootstrap", level: "Practical" },
      { name: "Shadcn UI", level: "Practical" }
    ]
  },
  {
    category: "Backend & APIs",
    description: "Server logic, REST communication, and role authorization",
    skills: [
      { name: "Node.js", level: "Project Work" },
      { name: "Express.js", level: "Project Work" },
      { name: "REST API Integration", level: "Practical" },
      { name: "Django", level: "Basic Knowledge" },
      { name: "Auth & Role Workflows", level: "Practical" },
      { name: "JWT Token Handling", level: "Practical" }
    ]
  },
  {
    category: "Database & Tools",
    description: "Data stores, devtooling, and continuous collaboration",
    skills: [
      { name: "MongoDB", level: "Practical" },
      { name: "Firebase", level: "Practical" },
      { name: "Git", level: "Practical" },
      { name: "GitHub", level: "Practical" },
      { name: "Vite", level: "Practical" }
    ]
  },
  {
    category: "Data & Machine Learning",
    description: "Sensor data analytics, model evaluation, and industrial algorithms",
    skills: [
      { name: "Python", level: "Practical" },
      { name: "Pandas & NumPy", level: "Practical" },
      { name: "Scikit-learn", level: "Practical" },
      { name: "Gradient Boosting", level: "Practical" },
      { name: "Random Forest", level: "Practical" },
      { name: "Neural Networks", level: "Practical" },
      { name: "Data Preprocessing", level: "Practical" }
    ]
  }
];

const projects = [
  {
    id: "metricfit",
    title: "MetricFit — Premium Fitness & Gym Management Ecosystem",
    formerly: "Formerly KAFitHub",
    category: "fullstack",
    categoryLabel: "Flagship Full-Stack",
    featured: true,
    isHeroProject: true,
    accentColor: "#D2F535", // Volt Lime
    image: "public/metricfit_preview.webp",
    shortDesc: "An end-to-end fitness management ecosystem combining a Next.js web portal, cross-platform mobile application, and dedicated REST API. Built to connect trainers and clients through session scheduling, workout tracking, verified reviews, membership pricing, and centralized administration.",
    longDesc: "MetricFit (formerly KAFitHub) is a comprehensive full-stack fitness management ecosystem designed for fitness centers, independent personal trainers, and gym members. It connects trainer discovery, client onboarding, training session scheduling, workout tracking, reviews, membership pricing, profile management, and administrative oversight through a shared database-backed ecosystem across web and mobile platforms.",
    applications: [
      {
        name: "Web Portal",
        stack: "Next.js 16, React 19, Tailwind CSS 4",
        details: "Server-rendered pages, Next.js API routes, React Hook Form, Zod schema validation, and Sonner notifications."
      },
      {
        name: "Cross-Platform Mobile App",
        stack: "React Native, Expo SDK 57, Expo Router, TypeScript",
        details: "Native mobile experience with React Native Reanimated, AsyncStorage persistent workout state, native image selection & crop, and floating pill navigation."
      },
      {
        name: "Dedicated REST API",
        stack: "Node.js 22 LTS, Express.js 5, Mongoose 9, MongoDB Atlas",
        details: "Centralized REST endpoints with bcrypt password hashing, cryptographically generated bearer tokens, SHA-256 session hashing, rate limiting, Nodemailer, and Cloudinary."
      }
    ],
    features: {
      client: [
        "Browse trainers by city, specialization, certifications, and training mode",
        "Explore public trainer profiles, qualifications, work experience, ratings, and reviews",
        "Schedule training sessions and manage active bookings",
        "Manage fitness goals, membership information, and assigned trainers",
        "Submit verified trainer reviews with one-review-per-trainer integrity",
        "Explore gym membership packages with city-based pricing adjustments"
      ],
      trainer: [
        "Maintain trainer profiles, biographies, certifications, experience, and profile images",
        "Manage client rosters with Active, On Hold, and Inactive filters",
        "Review upcoming sessions and manage booking statuses",
        "Conduct workout sessions with countdown timers, rest tracking, and exercise-set logging",
        "Record repetitions and weights for individual exercise sets",
        "Share review links through WhatsApp or SMS, copy links, or collect reviews in-app",
        "Synchronize trainer profile images with Cloudinary"
      ],
      admin: [
        "Review and manage trainer verification workflows",
        "Oversee client accounts and trainer assignments",
        "Monitor platform activity, membership statistics, and city-level distributions",
        "Manage global settings, including trainer phone-number visibility",
        "Inspect available service-health and platform metrics"
      ],
      mobile: [
        "Dedicated trainer home dashboard with session schedules and activity summaries",
        "Live trainer discovery, filtering, and search",
        "Client roster management and detailed client views",
        "Interactive workout logging with timers and exercise inputs",
        "Persistent workout state across app backgrounding via AsyncStorage",
        "Native image selection, square cropping, and Cloudinary uploads",
        "Password-reset deep links using metricfit:// URL scheme",
        "Floating, pill-shaped navigation with animated active states"
      ]
    },
    databaseModels: [
      { name: "Trainer", desc: "Credentials, qualifications, biography, experience, location, and aggregate review statistics." },
      { name: "Client", desc: "Account details, fitness goals, training preferences, membership tier, and trainer assignment." },
      { name: "Session", desc: "Trainer/client relationship, schedule, duration, workout type, and booking confirmation status." },
      { name: "Review", desc: "Verified client feedback, 1-to-5 star ratings, and review integrity constraint." },
      { name: "Settings", desc: "Global platform configuration, contact visibility, and platform-wide parameters." }
    ],
    pricingEngine: {
      baseFee: 800,
      plans: [
        { name: "Monthly", price: 999, duration: "1 month" },
        { name: "Quarterly", price: 2700, duration: "3 months" },
        { name: "Half-Yearly", price: 5100, duration: "6 months" },
        { name: "Yearly", price: 9600, duration: "12 months" }
      ],
      cityMultipliers: [
        { city: "Kochi", mult: 1.15 },
        { city: "Kozhikode", mult: 1.05 },
        { city: "Thrissur", mult: 1.05 },
        { city: "Thiruvananthapuram", mult: 1.00 },
        { city: "Palakkad", mult: 0.90 }
      ]
    },
    deployment: [
      { service: "Vercel", role: "Next.js web portal hosting" },
      { service: "AWS Lightsail & Nginx", role: "Dedicated mobile REST API with PM2 process manager" },
      { service: "GitHub Actions", role: "Continuous deployment automation pipeline" },
      { service: "Expo EAS", role: "Android mobile application production builds" },
      { service: "MongoDB Atlas", role: "Cloud-hosted persistent database cluster" },
      { service: "Cloudinary CDN", role: "Global media storage and image optimization" }
    ],
    highlights: [
      "Three interconnected apps: Next.js 16 Web Portal, Expo SDK 57 Mobile App, and Express.js 5 REST API",
      "Shared persistent database architecture powered by MongoDB Atlas & Mongoose 9",
      "Interactive workout logger with active timers, rest intervals, and set/rep tracking",
      "City-adjusted membership pricing engine with dynamic multipliers",
      "Cloudinary media integration with native square image cropping on mobile"
    ],
    tech: ["Next.js 16", "React Native", "Expo SDK 57", "Express.js 5", "MongoDB Atlas", "Mongoose 9", "Tailwind CSS 4", "Cloudinary"],
    githubUrl: null,
    liveUrl: null,
    metrics: "Web + Mobile + API • MongoDB Atlas • Expo SDK 57"
  },
  {
    id: "kasasync",
    title: "KasaSync — Property Management System",
    category: "fullstack",
    categoryLabel: "Full Stack",
    featured: true,
    isHeroProject: false,
    accentColor: "#F59E0B",
    shortDesc: "A comprehensive property management application for organizing rental units, tenant bookings, and maintenance tickets.",
    longDesc: "KasaSync simplifies residential property management. Landlords and property managers can track property occupancy, handle tenant requests, oversee lease agreements, and resolve maintenance tickets.",
    highlights: [
      "Multi-property portfolio overview with occupancy status",
      "Tenant onboarding, lease tracking, and booking schedules",
      "Maintenance request management pipeline with priority flags",
      "Role-based workflows separating owners and resident portals",
      "Fully responsive desktop and mobile web interface"
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: null,
    liveUrl: "https://kasa-sync.vercel.app/",
    metrics: "Property Portals • Maintenance Pipeline"
  },
  {
    id: "sports-finder-hub",
    title: "Sports Finder Hub — Local Game Community",
    category: "frontend",
    categoryLabel: "Frontend / Geospatial",
    featured: true,
    isHeroProject: false,
    accentColor: "#3B82F6",
    shortDesc: "A location-aware web application helping sports lovers discover nearby partners for football, badminton, chess, and cricket.",
    longDesc: "Sports Finder Hub bridges local community athletes. Users can find players near them, post open game invitations, review skill-level ratings, and coordinate matches with interactive map integration.",
    highlights: [
      "Interactive map-based player and turf discovery using React Leaflet",
      "Play request generation, invitations, and match confirmation",
      "User profile customization with preferred games and skill tiers",
      "Match history tracking and community administration views",
      "Live production deployment on Vercel with Firebase integration"
    ],
    tech: ["React.js", "Firebase", "Tailwind CSS", "React Leaflet", "Vercel"],
    githubUrl: "https://github.com/Karthimj-1954/Sports-Finder-Hub",
    liveUrl: "https://sports-finder-hub.vercel.app",
    metrics: "Live on Vercel • Geospatial Leaflet Map"
  },
  {
    id: "cnc-anomaly-detection",
    title: "CNC Machine Anomaly Detection (IIoT)",
    category: "ml",
    categoryLabel: "Machine Learning / IIoT",
    featured: true,
    isHeroProject: false,
    accentColor: "#EC4899",
    shortDesc: "Industrial IoT predictive maintenance system using machine learning to detect abnormal CNC machine operations in real time.",
    longDesc: "An applied machine learning system tackling unplanned manufacturing downtime. Evaluated multiple classification architectures on sensor streams conforming to the MTConnect industrial standard.",
    highlights: [
      "Processed 94,476 operational sensor records from industrial CNC machines",
      "Engineered feature preprocessing, outlier removal, and time-series scaling",
      "Comparative benchmark across Gradient Boosting, Random Forest, and Neural Networks",
      "Predictive maintenance early-warning alerts for anomalous vibration and temperature",
      "Industrial dashboard architecture for shop-floor operators"
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Gradient Boosting", "Random Forest", "MTConnect"],
    githubUrl: "https://github.com/Karthimj-1954/Industrial-IoT-with-an-ML-based-solution-for-CNC-and-Metal-Manufacturing-Machines",
    liveUrl: null,
    metrics: "94,476 Records • Gradient Boosting • MTConnect"
  },
  {
    id: "smart-rgb-temperature",
    title: "Smart RGB Industrial Temperature Monitor",
    category: "iot",
    categoryLabel: "Embedded / IoT",
    featured: false,
    isHeroProject: false,
    accentColor: "#F97316",
    shortDesc: "An Arduino-based temperature monitoring and adaptive cooling system with real-time LCD readouts and RGB visual safety alarms.",
    longDesc: "A hardware-embedded safety monitor for equipment enclosures. Interfaced a DHT11 temperature/humidity sensor with dynamic microcontroller logic to trigger multi-stage cooling and audible warning thresholds.",
    highlights: [
      "Real-time sensor telemetry with DHT11 temperature and humidity probe",
      "Direct 16x2 LCD metric display with automated refresh cycles",
      "Color-coded RGB visual alerts corresponding to safety tolerance zones",
      "Piezo buzzer acoustic alarms during critical over-temperature events",
      "Adaptive relay triggers for cooling fans and ventilation"
    ],
    tech: ["C++", "Arduino", "DHT11 Sensor", "Embedded C", "Hardware Prototyping"],
    githubUrl: "https://github.com/Karthimj-1954/Smart-RGB-Based-Temperature-Monitoring-and-Adaptive-Cooling-System-for-Industrial-Safety",
    liveUrl: null,
    metrics: "Arduino • DHT11 • Adaptive Cooling"
  },
  {
    id: "note-flow",
    title: "Note-Flow — Productivity & Notes",
    category: "frontend",
    categoryLabel: "Frontend",
    featured: false,
    isHeroProject: false,
    accentColor: "#8B5CF6",
    shortDesc: "A streamlined, responsive note-taking application designed for rapid markdown capture and intuitive task organization.",
    longDesc: "Note-Flow offers a distraction-free environment for developers and students to record notes, filter tags, and maintain organized daily task lists.",
    highlights: [
      "Instant search, filtering, and tagged collections",
      "Responsive layout optimized for rapid keyboard input",
      "Clean dark/light visual contrast with persistence",
      "Live deployment on Vercel"
    ],
    tech: ["JavaScript", "React.js", "CSS3", "Vercel"],
    githubUrl: "https://github.com/Karthimj-1954/Note-Flow",
    liveUrl: "https://note-flow-xi-eight.vercel.app",
    metrics: "Live on Vercel • Instant Tagging"
  },
  {
    id: "gully-cricket-scoreboard",
    title: "Gully Cricket ScoreBoard",
    category: "frontend",
    categoryLabel: "Frontend",
    featured: false,
    isHeroProject: false,
    accentColor: "#06B6D4",
    shortDesc: "An interactive match scorecard dashboard and gully cricket scoring web application tracking overs, runs, and wickets.",
    longDesc: "A real-time score tracking web application with interactive controls for local cricket tournaments, calculating run rates, extras, fall of wickets, and final match summaries.",
    highlights: [
      "Live ball-by-ball score input and strike rotation",
      "Real-time run rate and required run rate calculations",
      "Match summary viewer and exportable scorecard",
      "Optimized for quick touch interactions on mobile"
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "GitHub Pages"],
    githubUrl: "https://github.com/Karthimj-1954/Gully-Cricket-ScoreBoard",
    liveUrl: null,
    metrics: "Ball-by-Ball Tracking • Mobile Scorecard"
  }
];

// Dual compatibility: attach to window for direct file:// or standard script usage
if (typeof window !== 'undefined') {
  window.portfolioData = {
    personalInfo,
    typingRoles,
    aboutCards,
    highlights: aboutCards,
    services,
    featuredTechStack,
    experiences,
    skillCategories,
    projects
  };
}

