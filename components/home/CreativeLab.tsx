const experiments = [
  { index: "001", title: "WebGL", detail: "Three.js · visual experiments" },
  { index: "002", title: "Motion", detail: "GSAP · scroll interaction" },
  { index: "003", title: "AI", detail: "Higgsfield · prompt to visual" },
  { index: "004", title: "Interfaces", detail: "UI systems · prototypes" },
];

export function CreativeLab() {
  return (
    <section className="home-flow-section home-lab" aria-labelledby="home-lab-title">
      <div className="portfolio-shell">
        <div className="home-lab-heading">
          <p className="v2-kicker">Lab / 2026</p>
          <h2 id="home-lab-title" className="v2-heading mt-4">Experiment. Learn. Build.</h2>
          <p className="home-section-lede mt-5">
            A small creative-development playground for motion, WebGL, AI-assisted visuals, and interface ideas that can later become useful product experiences.
          </p>
        </div>

        <div className="home-lab-grid">
          {experiments.map((item) => (
            <article className="home-lab-card" key={item.index}>
              <span className="home-lab-index">{item.index}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <span className="home-lab-mark" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
