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
    overview: "An information-system project centered on structured resident, household, migration, reporting, and LGU workflows.",
    problem: "Local population records need clear data capture, validation, reporting, and controlled access across operational levels.",
    solution: "The system organizes questionnaire-driven data entry, household and individual profiles, reports, role-aware workflows, and a municipal dashboard experience.",
    role: "Software Developer / UI Designer",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "SQLite", "Tauri", "Rust"],
    features: ["Questionnaire workflows", "Household and individual profiles", "Role-based access", "Dashboard and reporting", "Data validation", "Migration classification", "Offline/online system work"],
    challenges: ["Designing complex forms without overwhelming encoders", "Keeping data access scoped by geographic role", "Balancing offline desktop workflows with online municipal visibility"],
    lessons: ["Model complex operational rules explicitly", "Design validation around real data-entry behavior", "Treat usability and data integrity as one system problem"],
    image: "/media/rbim-placeholder.svg"
  },
  {
    slug: "ahdis",
    title: "Adolescent Health and Development Information System (AHDIS)",
    shortTitle: "AHDIS",
    category: ["Information Systems", "Desktop", "UI/UX"],
    status: "Developed / maintained",
    overview: "A desktop information system used to manage adolescent health and development records, profile updates, reporting, and local data workflows.",
    problem: "Program data needs consistent encoding, profile history, age-aware views, and reports that remain usable in an office desktop environment.",
    solution: "A desktop-focused workflow combines profile management, controlled updates, reporting, inactivity locking, and targeted data views.",
    role: "Software Developer / UI Designer",
    technologies: ["PHP", "JavaScript", "HTML", "CSS", "SQLite", "PHP Desktop"],
    features: ["Profile management", "Update history", "Reports and export", "Age-based data views", "Inactivity lock", "Local database workflow"],
    challenges: ["Maintaining a legacy-style desktop stack", "Separating age-specific reporting behavior", "Protecting local data during installation and updates"],
    lessons: ["Small workflow details strongly affect data-entry quality", "Deployment and upgrade safety are part of application design", "Clear UI states reduce operator errors"],
    image: "/media/ahdis-placeholder.svg"
  },
  {
    slug: "design-systems",
    title: "Interface & Digital Design Work",
    shortTitle: "Design Systems",
    category: ["UI/UX", "Web"],
    status: "Portfolio collection",
    overview: "A collection area for dashboards, system interfaces, social content, carousel layouts, and branding-oriented digital work.",
    problem: "Technical products and campaigns still need clear visual hierarchy, communication, and consistent interaction patterns.",
    solution: "Design work is approached through problem definition, layout, interface logic, visual direction, feedback, and refinement.",
    role: "UI/UX Designer / Digital Designer",
    technologies: ["Figma", "Canva", "Web UI", "Design Systems"],
    features: ["Dashboard layouts", "Web interfaces", "Carousel concepts", "Visual hierarchy", "Responsive UI", "Reusable patterns"],
    challenges: ["Keeping visuals expressive without reducing readability", "Translating system requirements into simple interfaces"],
    lessons: ["Design decisions should map back to user tasks", "Consistency creates speed for both users and developers"],
    image: "/media/design-placeholder.svg"
  }
];

export const projectCategories = ["All", "Web", "Desktop", "Information Systems", "Full Stack", "UI/UX"];
