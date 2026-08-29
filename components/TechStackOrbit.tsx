"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Atom,
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Github,
  MonitorCog,
  Package,
  Palette,
  PenTool,
  ServerCog,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
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

const techMeta: Record<string, { tag: string; icon: LucideIcon }> = {
  HTML: { tag: "Markup", icon: FileCode2 },
  CSS: { tag: "Styling", icon: Palette },
  JavaScript: { tag: "Language", icon: Braces },
  TypeScript: { tag: "Language", icon: Code2 },
  React: { tag: "UI Framework", icon: Atom },
  Vite: { tag: "Build Tool", icon: Zap },
  "Tailwind CSS": { tag: "Styling", icon: Palette },
  PHP: { tag: "Backend", icon: Code2 },
  "Node.js": { tag: "Runtime", icon: ServerCog },
  "REST APIs": { tag: "Integration", icon: Braces },
  PostgreSQL: { tag: "Database", icon: Database },
  SQLite: { tag: "Database", icon: Database },
  MySQL: { tag: "Database", icon: Database },
  Tauri: { tag: "Desktop Framework", icon: MonitorCog },
  Rust: { tag: "Language", icon: Wrench },
  "PHP Desktop": { tag: "Desktop Runtime", icon: MonitorCog },
  Git: { tag: "Version Control", icon: GitBranch },
  GitHub: { tag: "Repository", icon: Github },
  "VS Code": { tag: "Editor", icon: Code2 },
  npm: { tag: "Package Manager", icon: Package },
  "GitHub Actions": { tag: "Automation", icon: Github },
  Figma: { tag: "Interface Design", icon: PenTool },
  Canva: { tag: "Visual Design", icon: Palette },
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
            const meta = techMeta[item] ?? { tag: "Technology", icon: Code2 };
            const TechIcon = meta.icon;
            const featured = index === 0 || item === "React" || (items.length <= 3 && index === 0);

            return (
              <article
                className={`tech-card ${featured ? "is-featured" : ""}`}
                key={item}
                style={{ "--tech-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <div className="tech-card-topline">
                  <span className="tech-card-mark" aria-hidden="true">
                    <TechIcon size={20} strokeWidth={1.8} />
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
