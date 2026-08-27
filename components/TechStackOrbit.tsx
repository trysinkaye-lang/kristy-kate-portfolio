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
    <div className="mt-12">
      <div className="tech-orbit-shell">
        <div className="tech-orbit-tabs" role="tablist" aria-label="Technology categories">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`tech-orbit-tab ${activeCategory === category ? "is-active" : ""}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {category}
            </button>
          ))}
        </div>

        <SpotlightCardLite className="tech-orbit-stage">
          <div className="tech-orbit-grid" aria-hidden="true" />
          <div className="tech-orbit-ring tech-orbit-ring-one" aria-hidden="true" />
          <div className="tech-orbit-ring tech-orbit-ring-two" aria-hidden="true" />

          <div className="tech-orbit-core">
            <span className="tech-orbit-kicker">Current stack</span>
            <h3>{activeCategory}</h3>
            <p>{items.length} technologies</p>
          </div>

          <div className="tech-orbit-items" key={activeCategory}>
            {items.map((item, index) => {
              const angle = (360 / items.length) * index - 90;
              const radius = items.length > 6 ? 42 : 38;
              return (
                <div
                  key={item}
                  className="tech-orbit-item"
                  style={{
                    "--orbit-angle": `${angle}deg`,
                    "--orbit-radius": `${radius}%`,
                    "--orbit-delay": `${index * 55}ms`,
                  } as React.CSSProperties}
                >
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </SpotlightCardLite>
      </div>

      <div className="mt-7 border-y border-white/[.06] bg-black/20 py-3 backdrop-blur-sm">
        <ScrollVelocityLite items={allItems} />
      </div>
    </div>
  );
}
