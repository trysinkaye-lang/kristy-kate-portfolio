"use client";

import { useMemo, useState } from "react";
import { stack } from "@/data/site";
import { SpotlightCardLite } from "@/components/react-bits/SpotlightCardLite";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import "./TechStackOrbit.css";

const categories = Object.keys(stack) as Array<keyof typeof stack>;

export function TechStackOrbit() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof stack>(categories[0]);

  const items = useMemo(
    () => stack[activeCategory].filter((item) => !item.includes("replace with")),
    [activeCategory],
  );

  const allItems = useMemo(
    () => Object.values(stack).flat().filter((item) => !item.includes("replace with")),
    [],
  );

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
            <span>{String(index + 1).padStart(2, "0")}</span>
            {category}
          </button>
        ))}
      </div>

      <SpotlightCardLite className="tech-showcase-panel">
        <div className="tech-showcase-glow" aria-hidden="true" />

        <div className="tech-showcase-copy">
          <p className="tech-showcase-kicker">Selected category</p>
          <h3>{activeCategory}</h3>
          <p className="tech-showcase-description">
            Tools and technologies I use within this part of my development workflow.
          </p>
          <div className="tech-showcase-meta">
            <span>{String(items.length).padStart(2, "0")}</span>
            <p>technologies</p>
          </div>
        </div>

        <div className="tech-showcase-items" key={activeCategory}>
          {items.map((item, index) => (
            <div
              className="tech-showcase-item"
              key={item}
              style={{ "--tech-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <span className="tech-showcase-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="tech-showcase-name">{item}</span>
            </div>
          ))}
        </div>
      </SpotlightCardLite>

      <div className="tech-showcase-marquee">
        <ScrollVelocityLite items={allItems} />
      </div>
    </div>
  );
}
