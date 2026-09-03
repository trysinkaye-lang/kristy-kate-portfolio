"use client";

import { useState, type PointerEvent } from "react";
import {
  Boxes,
  Database,
  HeartHandshake,
  Layers3,
  MonitorSmartphone,
  Sparkles,
  Workflow,
} from "lucide-react";

const focusAreas = [
  {
    key: "build",
    label: "What I build",
    icon: MonitorSmartphone,
    title: "Systems that make complicated work feel manageable.",
    copy: "I build information systems, web applications, and offline-first desktop tools where data, workflow, validation, and interface design all need to work together.",
    points: ["Information systems", "Offline-first applications", "Web applications", "Operational dashboards"],
  },
  {
    key: "process",
    label: "How I work",
    icon: Workflow,
    title: "I design the workflow before decorating the screen.",
    copy: "I map requirements, data relationships, edge cases, and user tasks first. That structure becomes the basis for both the application architecture and the UI.",
    points: ["Requirements analysis", "Data modeling", "Interface hierarchy", "Iterative testing"],
  },
  {
    key: "care",
    label: "What I value",
    icon: HeartHandshake,
    title: "Clarity, reliability, and respect for the person using the system.",
    copy: "Good software should reduce uncertainty. I care about readable interfaces, useful validation, predictable behavior, and systems people can trust during real work.",
    points: ["Usability", "Data integrity", "Accessibility", "Maintainability"],
  },
] as const;

type FocusKey = (typeof focusAreas)[number]["key"];

export function AboutFocusPanel() {
  const [activeKey, setActiveKey] = useState<FocusKey>("build");
  const active = focusAreas.find((item) => item.key === activeKey) ?? focusAreas[0];
  const ActiveIcon = active.icon;

  const moveSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="about-focus-shell" onPointerMove={moveSpotlight}>
      <span className="about-focus-spotlight" aria-hidden="true" />

      <div className="about-focus-tabs" role="tablist" aria-label="About Kristy Kate">
        {focusAreas.map(({ key, label, icon: Icon }) => {
          const selected = key === activeKey;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`about-focus-tab ${selected ? "is-active" : ""}`}
              onClick={() => setActiveKey(key)}
            >
              <span className="about-focus-tab-icon"><Icon size={17} strokeWidth={1.8} /></span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="about-focus-content" role="tabpanel" key={active.key}>
        <div className="about-focus-emblem" aria-hidden="true">
          <ActiveIcon size={30} strokeWidth={1.5} />
          <Sparkles className="about-focus-spark" size={14} />
        </div>

        <div>
          <p className="about-focus-kicker">{active.label}</p>
          <h2>{active.title}</h2>
          <p className="about-focus-copy">{active.copy}</p>

          <div className="about-focus-points">
            {active.points.map((point, index) => (
              <span key={point}>
                {index === 0 ? <Layers3 size={14} /> : index === 1 ? <Database size={14} /> : <Boxes size={14} />}
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
