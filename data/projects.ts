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
  features: string[];
  challenges: string[];
  lessons: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
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
    features: ["Household and individual profiles", "Questionnaire workflows", "Certificates", "Reports", "Data validation", "Migration classification", "Offline-first records", "Data management"],
    challenges: ["Designing complex forms without overwhelming encoders", "Maintaining accurate household and individual relationships", "Balancing offline desktop workflows with online municipal visibility"],
    lessons: ["Model operational rules explicitly", "Design validation around real data-entry behavior", "Treat usability and data integrity as one system problem"],
    image: "/media/rbim-dashboard.webp",
    imageWidth: 640,
    imageHeight: 341
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
    features: ["Adolescent profile management", "Barangay-level insights", "Age distribution reporting", "Civil status and enrollment analytics", "Pregnancy-history tracking", "Import and export workflows", "Reports", "Account settings"],
    challenges: ["Maintaining a desktop-focused stack", "Separating age-specific reporting behavior", "Protecting local data during installation and updates"],
    lessons: ["Small workflow details strongly affect data-entry quality", "Deployment and upgrade safety are part of application design", "Clear UI states reduce operator errors"],
    image: "/media/ahdis-dashboard.webp",
    imageWidth: 480,
    imageHeight: 256
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
    features: ["Dashboard layouts", "Web interfaces", "Carousel concepts", "Visual hierarchy", "Responsive UI", "Reusable patterns"],
    challenges: ["Keeping visuals expressive without reducing readability", "Translating system requirements into simple interfaces"],
    lessons: ["Design decisions should map back to user tasks", "Consistency creates speed for both users and developers"],
    image: "/media/design-placeholder.svg",
    imageWidth: 1400,
    imageHeight: 900
  }
];

export const projectCategories = ["All", "Web", "Desktop", "Information Systems", "Full Stack", "UI/UX", "Business Systems"];
