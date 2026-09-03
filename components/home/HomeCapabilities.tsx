import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Atom,
  Braces,
  Code2,
  Database,
  FileCode,
  GitBranch,
  Github,
  Layers3,
  Monitor,
  Network,
  PenTool,
  Server,
  Settings,
  Terminal,
  Wrench,
} from "lucide-react";
import { stack } from "@/data/site";

const capabilityGroups: Array<{
  label: string;
  icon: LucideIcon;
  items: string[];
}> = [
  {
    label: "Frontend",
    icon: Code2,
    items: stack.Frontend.filter((item) =>
      ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS"].includes(item),
    ),
  },
  {
    label: "Backend",
    icon: Server,
    items: stack.Backend,
  },
  {
    label: "Database",
    icon: Database,
    items: stack.Database,
  },
  {
    label: "Application / Desktop",
    icon: AppWindow,
    items: stack["Desktop / Applications"],
  },
  {
    label: "Tools",
    icon: Wrench,
    items: [
      ...stack["Development Tools"].filter((item) =>
        ["Git", "GitHub", "VS Code"].includes(item),
      ),
      ...stack["Design Tools"].filter((item) => item === "Figma"),
    ],
  },
];

const technologyIcons: Record<string, LucideIcon> = {
  JavaScript: Braces,
  TypeScript: FileCode,
  React: Atom,
  "Next.js": Layers3,
  "Tailwind CSS": Code2,
  PHP: FileCode,
  "Node.js": Server,
  "REST APIs": Network,
  PostgreSQL: Database,
  SQLite: Database,
  MySQL: Database,
  Tauri: AppWindow,
  Rust: Settings,
  "PHP Desktop": Monitor,
  Git: GitBranch,
  GitHub: Github,
  "VS Code": Terminal,
  Figma: PenTool,
};

export function HomeCapabilities() {
  return (
    <section
      className="home-flow-section home-capabilities"
      aria-labelledby="home-capabilities-title"
    >
      <div className="portfolio-shell">
        <div className="home-capabilities-header">
          <div className="home-capabilities-copy">
            <p className="v2-kicker">Technical capabilities</p>
            <h2 id="home-capabilities-title" className="v2-heading mt-4">
              The stack behind my strongest systems.
            </h2>
            <p className="home-section-lede mt-5">
              Focused on the technologies I use across information systems,
              web applications, databases, and desktop/offline-first software.
            </p>
          </div>
        </div>

        <div className="home-capability-grid">
          {capabilityGroups.map((group, index) => {
            const GroupIcon = group.icon;

            return (
              <article className="home-capability-card" key={group.label}>
                <div className="home-capability-card-top">
                  <span className="home-capability-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="home-capability-icon" aria-hidden="true">
                    <GroupIcon size={22} strokeWidth={1.7} />
                  </span>
                </div>

                <h3>{group.label}</h3>

                <div className="home-capability-items">
                  {group.items.map((item) => {
                    const TechnologyIcon = technologyIcons[item] ?? Code2;

                    return (
                      <span className="v2-chip home-tech-chip" key={item}>
                        <TechnologyIcon
                          className="home-tech-chip-icon"
                          size={14}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                        {item}
                      </span>
                    );
                  })}
                </div>

                <span className="home-capability-meta">
                  {group.items.length} technologies
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
