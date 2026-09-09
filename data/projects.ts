export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string[];
  status: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  highlights: string[];
  impact: string[];
  features: string[];
  challenges: string[];
  lessons: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageLabel?: string;
  imageAlt?: string;
  flagship?: boolean;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "rbim",
    title: "Registry of Barangay Inhabitants and Migrants (RBIM)",
    shortTitle: "RBIM",
    category: ["Information Systems", "Full Stack", "Desktop", "UI/UX"],
    status: "Active development",
    overview: "A barangay records and population information system for structured household and individual data, certificates, reports, migration records, and local data management workflows.",
    problem: "Local population records need clear data capture, validation, reporting, and controlled access while remaining practical for day-to-day barangay encoding.",
    solution: "RBIM combines questionnaire-driven data entry, household and individual profiles, certificates, reports, data management, validation, and an offline-first local workflow with ongoing hybrid system development.",
    role: "Software Developer / UI Designer",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "SQLite", "Tauri", "Rust"],
    highlights: ["Q1–Q62 workflow", "7-step questionnaire", "Offline-first"],
    impact: [
      "Structured the current RBIM questionnaire into a seven-step Q1–Q62 encoding workflow with blocking validation before submission.",
      "Supports offline-first desktop records with SQLite while the hybrid architecture adds PostgreSQL-backed municipal visibility.",
      "Brings household, individual, migration, certificate, reporting, and data-management workflows into one operational system."
    ],
    features: ["Household and individual profiles", "Questionnaire workflows", "Certificates", "Reports", "Data validation", "Migration classification", "Offline-first records", "Data management"],
    challenges: ["Designing complex forms without overwhelming encoders", "Maintaining accurate household and individual relationships", "Balancing offline desktop workflows with online municipal visibility"],
    lessons: ["Model operational rules explicitly", "Design validation around real data-entry behavior", "Treat usability and data integrity as one system problem"],
    image: "/media/rbim-dashboard.webp",
    imageWidth: 640,
    imageHeight: 341,
    flagship: true
  },
  {
    slug: "ahdis",
    title: "Adolescent Health and Development Information System (AHDIS)",
    shortTitle: "AHDIS",
    category: ["Information Systems", "Desktop", "UI/UX"],
    status: "Developed / maintained",
    overview: "A desktop information system for adolescent profiles and health-development data, with barangay insights, age distribution, civil status, enrollment, pregnancy history, reports, and import/export workflows.",
    problem: "Program data needs consistent encoding, profile history, age-aware views, and reports that remain clear and usable in an office desktop environment.",
    solution: "AHDIS organizes profile management, local reporting, dashboard analytics, imports and exports, controlled updates, and account-level access in a focused desktop application.",
    role: "Software Developer / UI Designer",
    technologies: ["PHP", "JavaScript", "HTML", "CSS", "SQLite", "PHP Desktop"],
    highlights: ["Ages 10–19 reporting", "Desktop application", "Local analytics"],
    impact: [
      "Separates adolescent reporting for ages 10–19 from older records so dashboards and exports stay aligned with the program scope.",
      "Combines profile management, barangay-level analytics, import/export, reporting, and account settings in one desktop workflow.",
      "Designed for practical office use with local data storage, controlled updates, and clear age-aware reporting behavior."
    ],
    features: ["Adolescent profile management", "Barangay-level insights", "Age distribution reporting", "Civil status and enrollment analytics", "Pregnancy-history tracking", "Import and export workflows", "Reports", "Account settings"],
    challenges: ["Maintaining a desktop-focused stack", "Separating age-specific reporting behavior", "Protecting local data during installation and updates"],
    lessons: ["Small workflow details strongly affect data-entry quality", "Deployment and upgrade safety are part of application design", "Clear UI states reduce operator errors"],
    image: "/media/ahdis-dashboard.webp",
    imageWidth: 480,
    imageHeight: 256
  },
  {
    slug: "lacomus-revamp",
    title: "Lacomus Website Revamp",
    shortTitle: "Lacomus",
    category: ["Website Design", "Web", "Frontend", "UI/UX"],
    status: "Currently in development",
    overview: "An ongoing redesign and development project focused on turning the Lacomus fragrance website into a more premium, editorial, product-led digital experience.",
    problem: "The project explores how fragrance products can be presented with stronger visual storytelling while keeping product information, navigation, and responsive behavior clear and usable.",
    solution: "The in-development direction combines large editorial typography, product-led layouts, responsive Next.js development, and GSAP-driven motion to create a more distinctive browsing experience.",
    role: "Website Designer & Developer",
    technologies: ["Next.js", "React", "TypeScript", "GSAP", "Responsive Design", "Vercel"],
    highlights: ["Website redesign", "Editorial product UI", "In development"],
    impact: [
      "Establishes a premium product-first homepage direction with clearer visual hierarchy and a more deliberate editorial rhythm.",
      "Combines website design and front-end implementation in one workflow using Next.js, React, TypeScript, and GSAP.",
      "The project is still in development, so the live preview is presented as ongoing work rather than a finished client delivery."
    ],
    features: ["Responsive homepage", "Editorial product presentation", "GSAP motion", "Product-focused sections", "Interaction design", "Mobile adaptation"],
    challenges: ["Balancing luxury visual direction with readability", "Keeping motion supportive rather than distracting", "Designing responsive product storytelling across screen sizes"],
    lessons: ["Premium visuals still need clear product hierarchy", "Motion should reinforce pacing and focus", "Showing work in progress requires transparent status and scope"],
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HqpkL4qwLWJklalLjBpcIwd3mK/68b5de49-7a54-416a-8ea5-4406956580ec.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    imageLabel: "Live development preview",
    imageAlt: "Lacomus revamp website development preview",
    live: "https://lacomus-revamp.vercel.app/"
  },
  {
    slug: "co-designs",
    title: "C.O. Designs Architecture Website",
    shortTitle: "C.O. Designs",
    category: ["Website Design", "Web", "Creative Development", "3D"],
    status: "Currently in development",
    overview: "An in-development architecture studio website concept built around a scroll-driven house construction experience and a refined editorial studio presentation.",
    problem: "Architecture portfolios need to communicate both the finished work and the thinking behind it without turning the website into a static gallery or an overly heavy 3D demo.",
    solution: "The current concept uses a reversible construction sequence, editorial project storytelling, responsive layouts, and a performance-aware Three.js scene to let visitors move from plan to completed house through native scrolling.",
    role: "Website Designer & Developer",
    technologies: ["Next.js", "React", "Three.js", "React Three Fiber", "GSAP", "ScrollTrigger"],
    highlights: ["Scroll-driven architecture", "Three.js experience", "In development"],
    impact: [
      "Establishes a clear interactive concept where architectural systems appear progressively from plan to completed house.",
      "Pairs 3D storytelling with accessible HTML descriptions, reduced-motion behavior, and performance-aware rendering decisions.",
      "The current phase is a conceptual prototype; final real project photography, approved studio copy, and production content remain pending."
    ],
    features: ["Scroll-driven construction", "Responsive architecture presentation", "Three.js scene", "Editorial studio sections", "Reduced-motion support", "WebGL fallback"],
    challenges: ["Keeping 3D interaction performant on smaller devices", "Synchronizing construction stages and camera movement", "Separating conceptual visuals from confirmed studio project content"],
    lessons: ["3D should serve the project narrative", "Native scrolling is easier to understand than custom wheel behavior", "Concept content must remain clearly distinguished from verified project work"],
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HqpkL4qwLWJklalLjBpcIwd3mK/eba8d838-3e61-49d1-b0d3-b20489842b48.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    imageLabel: "Concept visual · website in development",
    imageAlt: "Concept visual for the C.O. Designs architecture website"
  },
  {
    slug: "erp-system",
    title: "Enterprise Resource Planning (ERP) System",
    shortTitle: "ERP System",
    category: ["Information Systems", "Business Systems", "UI/UX"],
    status: "Developed",
    overview: "A business management system centered on a unified dashboard for sales, expenses, profit, orders, inventory, employees, purchasing, accounting, reporting, alerts, and recent transactions.",
    problem: "Business operations become difficult to monitor when sales, inventory, purchasing, HR, payroll, accounting, and reporting are handled through separate workflows.",
    solution: "The ERP interface brings key operational modules and business metrics into one system with quick actions, transaction visibility, inventory status, alerts, and reporting views.",
    role: "Software Developer / UI Designer",
    technologies: ["ERP", "Business System", "Dashboard UI"],
    highlights: ["Unified operations", "Dashboard-led workflow", "Cross-module visibility"],
    impact: [
      "Brings sales, inventory, purchasing, HR and payroll, accounting, and reporting into a unified dashboard-led workflow.",
      "Surfaces operational metrics, quick actions, alerts, inventory status, and recent transactions for faster scanning.",
      "Uses consistent cross-module navigation to reduce friction across dense business workflows."
    ],
    features: ["Executive dashboard", "Inventory management", "Sales workflows", "Purchasing workflows", "HR & payroll", "Accounting", "Reports", "Alerts and notifications", "Recent transactions"],
    challenges: ["Designing a dense dashboard without sacrificing scanability", "Keeping cross-module navigation clear", "Presenting operational metrics and exceptions in one view"],
    lessons: ["Dashboards should prioritize decision-making over decoration", "Cross-module consistency matters in business systems", "Alerts and quick actions reduce navigation cost"],
    image: "/media/erp-dashboard.webp",
    imageWidth: 480,
    imageHeight: 270
  },
  {
    slug: "design-systems",
    title: "Interface & Digital Design Work",
    shortTitle: "Design Work",
    category: ["UI/UX", "Web"],
    status: "Portfolio collection",
    overview: "A collection of dashboards, system interfaces, social content, carousel layouts, and branding-oriented digital work developed alongside software projects.",
    problem: "Technical products and campaigns still need clear visual hierarchy, communication, and consistent interaction patterns.",
    solution: "Design work is approached through problem definition, layout, interface logic, visual direction, feedback, and refinement.",
    role: "UI/UX Designer / Digital Designer",
    technologies: ["Figma", "Canva", "Web UI", "Design Systems"],
    highlights: ["Reusable patterns", "Responsive UI", "Visual hierarchy"],
    impact: [
      "Applies consistent hierarchy and reusable interface patterns across dashboards, web interfaces, and digital assets.",
      "Balances expressive visuals with readability so design decisions continue to support the user task.",
      "Translates system requirements and communication goals into clearer layouts, interactions, and visual direction."
    ],
    features: ["Dashboard layouts", "Web interfaces", "Carousel concepts", "Visual hierarchy", "Responsive UI", "Reusable patterns"],
    challenges: ["Keeping visuals expressive without reducing readability", "Translating system requirements into simple interfaces"],
    lessons: ["Design decisions should map back to user tasks", "Consistency creates speed for both users and developers"],
    image: "/media/design-placeholder.svg",
    imageWidth: 1400,
    imageHeight: 900
  }
];

export const projectCategories = ["All", "Website Design", "Web", "Desktop", "Information Systems", "Full Stack", "UI/UX", "Creative Development", "Business Systems"];
