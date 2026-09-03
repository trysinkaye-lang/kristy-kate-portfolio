import { stack } from "@/data/site";

const capabilityGroups = [
  {
    label: "Frontend",
    items: stack.Frontend.filter((item) =>
      ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS"].includes(item),
    ),
  },
  {
    label: "Backend",
    items: stack.Backend,
  },
  {
    label: "Database",
    items: stack.Database,
  },
  {
    label: "Application / Desktop",
    items: stack["Desktop / Applications"],
  },
  {
    label: "Tools",
    items: [
      ...stack["Development Tools"].filter((item) =>
        ["Git", "GitHub", "VS Code"].includes(item),
      ),
      ...stack["Design Tools"].filter((item) => item === "Figma"),
    ],
  },
];

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
          {capabilityGroups.map((group, index) => (
            <article className="home-capability-card" key={group.label}>
              <span className="home-capability-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.label}</h3>
              <div className="home-capability-items">
                {group.items.map((item) => (
                  <span className="v2-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <span className="home-capability-meta">
                {group.items.length} technologies
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
