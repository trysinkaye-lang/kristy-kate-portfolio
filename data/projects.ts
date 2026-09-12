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
  headline?: string;
  year?: number;
  imageAlt?: string;
  imageCaption?: string;
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
  architecture?: { title: string; detail: string }[];
};

const systemProjects: Project[] = [
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
    image: "/media/rbim-dashboard.webp",
    imageWidth: 640,
    imageHeight: 341
  }
];

const websiteProjects: Project[] = [
  {
    slug: "co-designs", title: "C.O. Designs — Architecture portfolio website", shortTitle: "C.O. DESIGNS",
    category: ["Websites", "Creative Development"], status: "In development", role: "Website Designer & Developer",
    overview: "An architecture portfolio that brings the process of building into the browsing experience, alongside the studio’s residential and interior work.",
    problem: "An architecture website needs to communicate space and process while keeping the studio’s work easy to explore on everyday devices.",
    solution: "A scroll-controlled architectural study introduces the practice. An image-led portfolio follows, with clear project categories, studio information, and a responsive editorial layout.",
    technologies: ["React", "TypeScript", "Three.js", "React Three Fiber", "GSAP", "Next.js"],
    highlights: ["Spatial storytelling", "Scroll-controlled construction", "Responsive portfolio"],
    impact: ["The current development preview connects an architectural construction study with the studio’s portfolio.", "Real project imagery gives the residential, wellness, hospitality, and interior work room to lead the page."],
    features: ["Interactive architectural introduction", "Reversible construction stages", "Residential and interior portfolio", "Studio and practice information", "Responsive image composition", "Reduced-motion and WebGL fallbacks"],
    challenges: ["Keeping a spatial introduction readable and navigable", "Balancing WebGL rendering with ordinary page performance", "Maintaining a useful experience when motion or WebGL is unavailable"],
    lessons: ["An interactive scene needs an equally clear HTML explanation", "Native scrolling gives visitors control over the pace", "Architecture photography needs space and consistent captions"],
    image: "/media/co-designs-preview.webp", imageWidth: 1440, imageHeight: 1000,
    imageAlt: "C.O. Designs website with an interactive architectural model",
    imageCaption: "Actual website preview — the completed stage of the interactive architectural study.",
    gallery: [
      { src: "/media/co-designs-interior.webp", alt: "Wellness interior featured in the C.O. Designs website", caption: "The studio’s interior imagery informs the website’s restrained composition.", width: 640, height: 480 },
      { src: "/media/co-designs-residence.webp", alt: "Contemporary residence imagery from the C.O. Designs website", caption: "The studio’s residential imagery, used in the website’s project portfolio. Architecture by C.O. Designs; website by Kristy Kate Taylor.", width: 817, height: 631 }
    ],
    architecture: [
      { title: "One source of progress", detail: "A shared construction-progress store connects scroll position, camera composition, and construction stages without React state updates on every frame." },
      { title: "Render on demand", detail: "React Three Fiber renders scene changes on demand. The scene is loaded separately, while the studio content remains ordinary server-rendered HTML." },
      { title: "Accessible alternatives", detail: "Construction descriptions, chapter navigation, a skip interaction, and a static fallback keep the work understandable beyond the canvas." }
    ],
    live: "https://co-designs-website.vercel.app/", github: "https://github.com/trysinkaye-lang/co-designs-website", headline: "Space, translated to screen."
  },
  {
    slug: "marci-metzger", title: "Marci Metzger — Real-estate website redesign", shortTitle: "MARCI METZGER",
    category: ["Websites", "UI/UX"], status: "Deployed redesign", role: "Website Designer & Developer",
    overview: "A real-estate website redesign shaped around property photography, local context, and a clear path for buyers and sellers.",
    problem: "Property, service, and agent information need a coherent hierarchy without losing the original site’s content or visual material.",
    solution: "A photographic opening, focused buyer and seller sections, a property gallery, and clear contact routes reorganize the experience around visitor intent.",
    technologies: ["React", "TypeScript", "Vite", "CSS", "GSAP"],
    highlights: ["Real-estate redesign", "Photography-led", "Responsive experience"],
    impact: ["A deployed redesign presents the original property imagery and service content in a cohesive editorial layout.", "Buyer and seller pathways clarify the purpose of each section without adding fabricated listings or business results."],
    features: ["Photographic hero", "Buyer and seller pathways", "Property gallery", "Agent and local-area context", "Responsive navigation", "Links to existing listing and contact channels"],
    challenges: ["Preserving source content while improving hierarchy", "Composing wide property photographs for narrow screens", "Balancing architectural motion with a useful static experience"],
    lessons: ["Image selection and crop communicate as much as typography", "Responsive art direction needs a deliberate small-screen composition", "A clear route to existing services matters more than decorative interface controls"],
    image: "/media/marci-preview.webp", imageWidth: 1440, imageHeight: 1000,
    imageAlt: "Marci Metzger website showing the Pahrump Realtor opening", imageCaption: "Actual deployed redesign — property photography, local context, and clear buyer pathways.",
    gallery: [
      { src: "/media/marci-lifestyle.webp", alt: "House keys in buyer-focused imagery from the Marci Metzger project", caption: "Buyer-focused photography from the source website.", width: 1200, height: 648 },
      { src: "/media/marci-landscape.webp", alt: "Pahrump landscape photography from the Marci Metzger redesign", caption: "Original project photography used in the real-estate redesign.", width: 1600, height: 1063 }
    ],
    architecture: [
      { title: "Content separated from layout", detail: "Typed content and gallery records preserve the source copy, destinations, image dimensions, and accessible descriptions independently of the page composition." },
      { title: "A static foundation", detail: "Custom CSS owns the responsive composition. The architectural introduction is loaded conditionally, and motion preferences retain a useful photographic opening." },
      { title: "Honest service boundaries", detail: "The redesign links to existing services. Preview search and contact interfaces are not presented as a newly connected property database or lead-delivery backend." }
    ],
    live: "https://marci-metzger-redesign-2026.vercel.app/", github: "https://github.com/trysinkaye-lang/marci-metzger-redesign", headline: "A sense of place."
  },
  {
    slug: "lacomus", title: "Lacomus — Website revamp", shortTitle: "LACOMUS",
    category: ["Websites", "Brand Experience"], status: "Work in progress", role: "Website Designer & Developer",
    overview: "An ongoing fragrance website revamp for Lacomus, connecting campaign imagery, scent collections, and product storytelling in a considered brand experience.",
    problem: "The revamp needs to give the brand and its products a clear visual hierarchy across desktop and mobile.",
    solution: "The current direction develops product-led editorial layouts, restrained motion, and a consistent responsive interface in Next.js.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    highlights: ["Website revamp", "Product and brand", "Ongoing development"],
    impact: ["A live work-in-progress preview is available for reviewing the current direction. This is an ongoing project, not a completed client production launch."],
    features: ["Fragrance collection pathways", "Product-led presentation", "Campaign imagery and editorial gallery", "Responsive layouts", "Official-store links", "Interaction refinement"],
    challenges: ["Keeping product storytelling clear as the design evolves", "Balancing brand expression with readable mobile layouts"],
    lessons: ["The design and implementation are still being refined; final project learnings will follow the completed work."],
    image: "/media/lacomus-preview.webp", imageWidth: 1440, imageHeight: 1000,
    imageAlt: "Actual Lacomus website development preview", imageCaption: "Current development preview. Design and implementation are ongoing.",
    architecture: [
      { title: "Structured product content", detail: "Typed product records separate fragrance names, descriptions, imagery, and official-store destinations from the presentation. The design can evolve without duplicating product information across the interface." },
      { title: "A clear commerce boundary", detail: "Purchasing links lead to the official Lacomus store. The revamp remains a development project and does not claim to provide a completed payment or order-management backend." },
      { title: "A work in progress", detail: "The live preview and repository show the evolving design. Product presentation, responsive behavior, and the interaction system are still being refined." }
    ],
    gallery: [{ src: "/media/lacomus-product.webp", alt: "Lacomus Pour Homme campaign photography used in the website revamp", caption: "Existing project imagery grounds the product presentation in the actual fragrance brand.", width: 800, height: 1200 }],
    live: "https://lacomus-revamp.vercel.app/", github: "https://github.com/trysinkaye-lang/lacomus-revamp", headline: "The next chapter, in progress."
  }
];

const enhancements: Record<string, Partial<Project>> = {
  rbim: {
    headline: "A working system for community records.",
    architecture: [
      { title: "Interface & workflows", detail: "React and TypeScript organize household records, individual profiles, and the seven-step Q1–Q62 questionnaire. Blocking validation makes required data and relationships explicit before submission." },
      { title: "Desktop & local storage", detail: "Tauri and Rust provide the desktop boundary. SQLite supports the offline-first record workflow when an internet connection is unavailable." },
      { title: "Hybrid development", detail: "PostgreSQL-backed municipal visibility is part of the ongoing hybrid architecture. Local record handling and municipal reporting have distinct responsibilities; hybrid development remains active." }
    ]
  },
  ahdis: {
    headline: "Information that stays in scope.",
    architecture: [
      { title: "Local application", detail: "PHP Desktop packages the PHP, JavaScript, HTML, and CSS interface for office use, with SQLite providing local storage." },
      { title: "Age-aware reporting", detail: "Reporting distinguishes adolescents aged 10–19 from older records. The same program scope needs to remain consistent across analytics and exports." },
      { title: "Data continuity", detail: "Import/export, controlled updates, and installation behavior must preserve local records. Deployment and data safety are treated as part of the user workflow." }
    ]
  },
  "erp-system": { headline: "One view of the operation." },
  "design-systems": {
    shortTitle: "INTERFACE & DIGITAL DESIGN WORK", image: "/media/rbim-dashboard.webp", imageWidth: 640, imageHeight: 341,
    imageAlt: "RBIM dashboard interface design by Kristy Kate Taylor", imageCaption: "A selection of actual interface work from the software projects.",
    headline: "Interfaces, studied in detail.",
    gallery: [
      { src: "/media/ahdis-dashboard.webp", alt: "AHDIS analytics and dashboard interface", caption: "AHDIS — arranging reporting views around program scope.", width: 480, height: 256 },
      { src: "/media/erp-dashboard.webp", alt: "ERP business dashboard interface", caption: "ERP — prioritizing operational information and cross-module navigation.", width: 480, height: 270 }
    ]
  }
};

export const projectOrder = ["rbim", "co-designs", "ahdis", "marci-metzger", "lacomus", "erp-system", "design-systems"] as const;
const allProjects = [...systemProjects, ...websiteProjects];
export const projects: Project[] = projectOrder.map(slug => {
  const project = allProjects.find(item => item.slug === slug);
  if (!project) throw new Error(`Missing project: ${slug}`);
  return { ...project, ...enhancements[slug] };
});

export function getProject(slug: typeof projectOrder[number]): Project {
  return projects[projectOrder.indexOf(slug)];
}
