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
    slug: "co-designs-website",
    title: "C.O. Designs Architecture Website",
    shortTitle: "C.O. DESIGNS",
    category: ["Web", "Website Design", "UI/UX"],
    status: "Currently in development",
    overview: "An architecture portfolio website for presenting residential work and design concepts through a restrained visual system and interactive architectural storytelling.",
    problem: "Architecture work needs a digital presentation that communicates spatial thinking and project progression without turning the website into a generic image gallery.",
    solution: "The website combines editorial typography, a minimal dark interface, responsive layouts, and an interactive architectural experience that supports the project story.",
    role: "Website Designer & Developer",
    technologies: ["React", "TypeScript", "Three.js", "React Three Fiber", "GSAP"],
    highlights: ["Architecture portfolio", "Interactive 3D", "Responsive design"],
    impact: [
      "Shows a distinct visual direction tailored to an architecture practice.",
      "Uses interaction to support architectural storytelling instead of adding motion without purpose.",
      "Demonstrates responsive website design alongside creative front-end development."
    ],
    features: ["Architecture project portfolio", "Interactive 3D scene", "Responsive layout", "Project storytelling", "Minimal dark interface"],
    challenges: ["Keeping 3D performant", "Balancing visual impact with clarity", "Maintaining usability across devices"],
    lessons: ["3D should serve the project story", "Architecture websites benefit from strong spacing and restraint", "Responsive behavior must be designed from the start"],
    image: "https://raw.githubusercontent.com/trysinkaye-lang/co-designs-website/main/public/images/co-designs/contemporary-home.webp",
    imageWidth: 1600,
    imageHeight: 900,
    live: "https://co-designs-website.vercel.app/"
  },
  {
    slug: "marci-metzger-redesign",
    title: "Marci Metzger Real Estate Website Redesign",
    shortTitle: "MARCI METZGER",
    category: ["Web", "Website Design", "UI/UX"],
    status: "Deployed redesign",
    overview: "A complete redesign of a real estate website focused on clearer positioning, stronger visual hierarchy, improved content flow, responsive presentation, and a more professional browsing experience.",
    problem: "The website needed a more contemporary presentation that could communicate the realtor brand clearly while making listings, services, and calls to action easier to understand.",
    solution: "The redesign uses an editorial real-estate visual direction, stronger hierarchy, responsive sections, refined navigation, and clearer conversion paths across the homepage experience.",
    role: "Website Designer & Developer",
    technologies: ["React", "TypeScript", "Vite", "CSS", "GSAP"],
    highlights: ["Full website redesign", "Responsive UI", "Real-estate experience"],
    impact: [
      "Reframed the website around a clearer visual identity and more deliberate content hierarchy.",
      "Improved how services, property content, and calls to action are presented across screen sizes.",
      "Expanded my website portfolio into a client-style real-estate redesign project."
    ],
    features: ["Editorial hero", "Responsive navigation", "Property content", "Service sections", "Contact flows", "Responsive redesign"],
    challenges: ["Maintaining clarity across dense real-estate content", "Balancing brand visuals with conversion goals", "Keeping the redesign consistent across responsive breakpoints"],
    lessons: ["Hierarchy matters more than adding visual effects", "A redesign should clarify the business message", "Responsive composition must be validated across real viewport sizes"],
    image: "https://raw.githubusercontent.com/trysinkaye-lang/marci-metzger-redesign/main/public/images/hero.jpg",
    imageWidth: 1600,
    imageHeight: 900,
    live: "https://marci-metzger-redesign-2026.vercel.app/"
  },
  {
    slug: "lacomus-revamp",
    title: "Lacomus Website Revamp",
    shortTitle: "LACOMUS",
    category: ["Web", "Website Design", "UI/UX"],
    status: "Currently in development",
    overview: "An ongoing website redesign and development project focused on transforming Lacomus into a more premium, editorial, product-driven web experience with stronger visual storytelling and interaction design.",
    problem: "The brand needs a digital presentation that gives its perfume products more visual presence while keeping product discovery, readability, and responsive behavior clear.",
    solution: "The revamp uses an editorial dark visual system, product-first composition, responsive layouts, and carefully controlled interactions to create a more distinctive premium experience.",
    role: "Website Designer & Developer",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    highlights: ["Website redesign", "Responsive UI", "Product storytelling"],
    impact: [
      "Expands my portfolio from information systems into consumer-facing website design and development.",
      "Explores product storytelling through stronger typography, layout rhythm, motion, and premium visual direction.",
      "The public preview is intentionally marked as work in progress while the experience continues to evolve."
    ],
    features: ["Editorial product layout", "Responsive website", "Product storytelling", "Interaction design", "Premium dark visual direction"],
    challenges: ["Balancing premium presentation with usability", "Keeping product visuals consistent across screen sizes", "Designing motion that supports rather than distracts from the product"],
    lessons: ["Premium design depends on restraint and hierarchy", "Motion should clarify the story", "A work-in-progress can still demonstrate design thinking when status is transparent"],
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HqpkL4qwLWJklalLjBpcIwd3mK/3a2421a2-54a6-4574-9e9d-d883afdd3644.png",
    imageWidth: 1600,
    imageHeight: 900,
    live: "https://lacomus-revamp.vercel.app/"
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

export const projectCategories = ["All", "Web", "Website Design", "Desktop", "Information Systems", "Full Stack", "UI/UX", "Business Systems"];
