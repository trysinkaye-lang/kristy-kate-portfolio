import type { LucideIcon } from "lucide-react";
import { AppWindow, Atom, Braces, Code2, Database, FileCode, Frame, Layers3, Monitor, Network, PenTool, Server, Sparkles, Wrench } from "lucide-react";
import { stack } from "@/data/site";

const capabilityGroups: Array<{ label: string; icon: LucideIcon; items: string[] }> = [
  { label: "Website Design", icon: PenTool, items: stack["Website Design"] },
  { label: "Frontend", icon: Code2, items: stack.Frontend.filter((item) => ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "GSAP"].includes(item)) },
  { label: "Backend", icon: Server, items: stack.Backend },
  { label: "Database", icon: Database, items: stack.Database },
  { label: "Application / Desktop", icon: AppWindow, items: stack["Desktop / Applications"] },
  { label: "Creative Development", icon: Sparkles, items: stack["Creative Development"] },
];

const technologyIcons: Record<string, LucideIcon> = {
  "UI/UX Design": PenTool,
  "Responsive Design": Monitor,
  "Interaction Design": Frame,
  "Design Systems": Layers3,
  Figma: PenTool,
  JavaScript: Braces,
  TypeScript: FileCode,
  React: Atom,
  "Next.js": Layers3,
  "Tailwind CSS": Code2,
  GSAP: Sparkles,
  PHP: FileCode,
  "Node.js": Server,
  "REST APIs": Network,
  PostgreSQL: Database,
  SQLite: Database,
  MySQL: Database,
  Tauri: AppWindow,
  Rust: Wrench,
  "PHP Desktop": Monitor,
  "Three.js": Sparkles,
  "React Three Fiber": Layers3,
  WebGL: Sparkles,
  Higgsfield: Sparkles,
};

export function HomeCapabilities() {
  return (
    <section className="home-flow-section home-capabilities" aria-labelledby="home-capabilities-title">
      <div className="portfolio-shell">
        <div className="home-capabilities-header">
          <div className="home-capabilities-copy">
            <p className="v2-kicker">Design + development</p>
            <h2 id="home-capabilities-title" className="v2-heading mt-4">The stack behind my strongest work.</h2>
            <p className="home-section-lede mt-5">Website design, front-end craft, full-stack systems, databases, desktop applications, and creative development are part of the same toolkit—not separate identities.</p>
          </div>
        </div>

        <div className="home-capability-grid">
          {capabilityGroups.map((group, index) => {
            const GroupIcon = group.icon;
            return (
              <article className="home-capability-card" key={group.label}>
                <div className="home-capability-card-top">
                  <span className="home-capability-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="home-capability-icon" aria-hidden="true"><GroupIcon size={22} strokeWidth={1.7} /></span>
                </div>
                <h3>{group.label}</h3>
                <div className="home-capability-items">
                  {group.items.map((item) => {
                    const TechnologyIcon = technologyIcons[item] ?? Code2;
                    return <span className="v2-chip home-tech-chip" key={item}><TechnologyIcon className="home-tech-chip-icon" size={14} strokeWidth={1.9} aria-hidden="true" />{item}</span>;
                  })}
                </div>
                <span className="home-capability-meta">{group.items.length} capabilities</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
