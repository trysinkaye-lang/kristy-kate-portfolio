"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import { TechLogo } from "@/components/ui/TechLogo";
import "./interactive-tool-grid.css";

const tools = [
  { name: "React", category: "Frontend", detail: "Reusable, responsive interfaces and application dashboards." },
  { name: "TypeScript", category: "Language", detail: "Safer application logic with clear, maintainable data types." },
  { name: "Tailwind CSS", category: "Styling", detail: "Fast, consistent interface styling across screen sizes." },
  { name: "Node.js", category: "Runtime", detail: "APIs, integrations and server-side application workflows." },
  { name: "PostgreSQL", category: "Database", detail: "Reliable relational data for online and multi-user systems." },
  { name: "SQLite", category: "Database", detail: "Local-first storage for offline and desktop applications." },
  { name: "Rust", category: "Language", detail: "Secure, high-performance native application functionality." },
  { name: "Tauri", category: "Desktop", detail: "Lightweight desktop applications powered by web technologies." },
  { name: "PHP", category: "Backend", detail: "Practical web systems, forms and server-side business logic." },
  { name: "Figma", category: "Design", detail: "Interface design, prototypes and organized design systems." },
  { name: "GitHub", category: "Workflow", detail: "Version control, collaboration and dependable code history." },
  { name: "Vercel", category: "Deployment", detail: "Fast previews and production deployment for modern web apps." },
] as const;

type Tool = (typeof tools)[number];

export function InteractiveToolGrid() {
  const [selected, setSelected] = useState<Tool>(tools[0]);

  const moveSpotlight = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="interactive-tool-grid-wrap">
      <div className="interactive-tool-grid" aria-label="Technology stack">
        {tools.map((tool, index) => {
          const active = selected.name === tool.name;
          return (
            <button
              aria-pressed={active}
              className={`interactive-tool-card ${active ? "is-selected" : ""}`}
              key={tool.name}
              onClick={() => setSelected(tool)}
              onPointerMove={moveSpotlight}
              style={{ "--item-delay": `${index * 35}ms` } as CSSProperties}
              type="button"
            >
              <span className="interactive-tool-card-glow" aria-hidden="true" />
              <span className="interactive-tool-icon"><TechLogo name={tool.name} size={34} /></span>
              <span className="interactive-tool-name">{tool.name}</span>
              <span className="interactive-tool-category">{tool.category}</span>
            </button>
          );
        })}
      </div>

      <div className="interactive-tool-detail" aria-live="polite">
        <span className="interactive-tool-detail-icon"><TechLogo name={selected.name} size={24} /></span>
        <div>
          <p><strong>{selected.name}</strong><span>{selected.category}</span></p>
          <p>{selected.detail}</p>
        </div>
        <span className="interactive-tool-hint">Select any tool</span>
      </div>
    </div>
  );
}
