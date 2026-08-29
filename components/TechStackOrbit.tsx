"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  MonitorCog,
  Palette,
  ServerCog,
  Sparkles,
  Wrench,
} from "lucide-react";
import { stack } from "@/data/site";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import "./TechStackOrbit.css";

const categories = Object.keys(stack) as Array<keyof typeof stack>;

const categoryMeta: Record<keyof typeof stack, { description: string; capabilities: string[]; icon: React.ReactNode }> = {
  Frontend: {
    description: "Building responsive, accessible and interactive interfaces for modern web applications.",
    capabilities: ["UI Engineering", "Responsive Design", "Web Applications"],
    icon: <Code2 size={19} strokeWidth={1.7} />,
  },
  Backend: {
    description: "Creating application logic, API layers and server-side workflows that power digital products.",
    capabilities: ["API Development", "Application Logic", "Integrations"],
    icon: <ServerCog size={19} strokeWidth={1.7} />,
  },
  Database: {
    description: "Designing dependable data structures for transactional systems, reporting and long-term growth.",
    capabilities: ["Data Modeling", "SQL", "System Data"],
    icon: <Database size={19} strokeWidth={1.7} />,
  },
  "Desktop / Applications": {
    description: "Developing desktop and application experiences for operational, offline and hybrid workflows.",
    capabilities: ["Desktop Apps", "Offline Workflows", "Native Systems"],
    icon: <MonitorCog size={19} strokeWidth={1.7} />,
  },
  "Development Tools": {
    description: "The tools I rely on to build, version, validate and ship software with a reliable workflow.",
    capabilities: ["Version Control", "Build Workflow", "Automation"],
    icon: <Wrench size={19} strokeWidth={1.7} />,
  },
  "Design Tools": {
    description: "Tools used to translate ideas into polished interfaces, visual systems and digital communication.",
    capabilities: ["Interface Design", "Prototyping", "Visual Design"],
    icon: <Palette size={19} strokeWidth={1.7} />,
  },
};

type TechMeta = {
  tag: string;
  logo?: string;
  fallback?: React.ReactNode;
};

const techMeta: Record<string, TechMeta> = {
  HTML: { tag: "Markup", logo: "https://cdn.simpleicons.org/html5/E34F26" },
  CSS: { tag: "Styling", logo: "https://cdn.simpleicons.org/css/663399" },
  JavaScript: { tag: "Language", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  TypeScript: { tag: "Language", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  React: { tag: "UI Framework", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  Vite: { tag: "Build Tool", logo: "https://cdn.simpleicons.org/vite/646CFF" },
  "Tailwind CSS": { tag: "Styling", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  PHP: { tag: "Backend", logo: "https://cdn.simpleicons.org/php/777BB4" },
  "Node.js": { tag: "Runtime", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  "REST APIs": { tag: "Integration", fallback: <Braces size={20} strokeWidth={1.8} /> },
  PostgreSQL: { tag: "Database", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  SQLite: { tag: "Database", logo: "https://cdn.simpleicons.org/sqlite/003B57" },
  MySQL: { tag: "Database", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
  Tauri: { tag: "Desktop Framework", logo: "https://cdn.simpleicons.org/tauri/24C8D8" },
  Rust: { tag: "Language", logo: "https://cdn.simpleicons.org/rust/DEA584" },
  "PHP Desktop": { tag: "Desktop Runtime", logo: "https://cdn.simpleicons.org/php/777BB4" },
  Git: { tag: "Version Control", logo: "https://cdn.simpleicons.org/git/F05032" },
  GitHub: { tag: "Repository", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
  "VS Code": { tag: "Editor", logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
  npm: { tag: "Package Manager", logo: "https://cdn.simpleicons.org/npm/CB3837" },
  "GitHub Actions": { tag: "Automation", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
  Figma: { tag: "Interface Design", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  Canva: { tag: "Visual Design", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
};

export function TechStackOrbit() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof stack>(categories[0]);

  const items = useMemo(
    () => stack[activeCategory].filter((item) => !item.includes("replace with")),
    [activeCategory],
  );

  const capabilities = useMemo(
    () => ["Web Applications", "System Design", "REST APIs", "Database Design", "UI / UX", "Desktop Apps", "Deployment"],
    [],
  );

  const selectedMeta = categoryMeta[activeCategory];

  return (
    <div className="mt-12 tech-showcase-wrap">
      <div className="tech-showcase-tabs" role="tablist" aria-label="Technology categories">
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`tech-showcase-tab ${activeCategory === category ? "is-active" : ""}`}
          >
            <span className="tech-showcase-tab-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="tech-showcase-tab-label">{category}</span>
          </button>
        ))}
      </div>

      <section className="tech-showcase-panel" aria-live="polite">
        <div className="tech-showcase-ambient" aria-hidden="true" />
        <div className="tech-showcase-watermark" aria-hidden="true">
          {String(categories.indexOf(activeCategory) + 1).padStart(2, "0")}
        </div>

        <div className="tech-showcase-copy">
          <div className="tech-showcase-kicker-row">
            <span className="tech-showcase-icon">{selectedMeta.icon}</span>
            <p className="tech-showcase-kicker">Selected category</p>
          </div>

          <h3>{activeCategory}</h3>
          <p className="tech-showcase-description">{selectedMeta.description}</p>

          <div className="tech-showcase-meta">
            <strong>{String(items.length).padStart(2, "0")}</strong>
            <span>technologies</span>
          </div>

          <div className="tech-showcase-capabilities">
            {selectedMeta.capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </div>

        <div className="tech-showcase-bento" key={activeCategory}>
          {items.map((item, index) => {
            const meta = techMeta[item] ?? { tag: "Technology", fallback: <Code2 size={20} strokeWidth={1.8} /> };
            const featured = index === 0 || item === "React" || (items.length <= 3 && index === 0);

            return (
              <article
                className={`tech-card ${featured ? "is-featured" : ""}`}
                key={item}
                style={{ "--tech-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <div className="tech-card-topline">
                  <span className="tech-card-mark" aria-hidden="true">
                    {meta.logo ? (
                      <img src={meta.logo} alt="" width={24} height={24} loading="lazy" style={{ display: "block", objectFit: "contain" }} />
                    ) : (
                      meta.fallback
                    )}
                  </span>
                  <ArrowUpRight className="tech-card-arrow" size={17} strokeWidth={1.7} />
                </div>
                <div className="tech-card-copy">
                  <span>{meta.tag}</span>
                  <h4>{item}</h4>
                </div>
                <div className="tech-card-sheen" aria-hidden="true" />
              </article>
            );
          })}

          <div className="tech-bento-note" aria-hidden="true">
            <Sparkles size={18} strokeWidth={1.6} />
            <span>Built around practical, production-focused workflows.</span>
          </div>
        </div>
      </section>

      <div className="tech-showcase-marquee" aria-label="Development capabilities">
        <div className="tech-showcase-marquee-label"><Braces size={15} />Capabilities</div>
        <ScrollVelocityLite items={capabilities} />
      </div>
    </div>
  );
}
