import { Atom, Boxes, Sparkles, WandSparkles } from "lucide-react";

const experiments = [
  { number: "001", title: "Motion Systems", description: "Scroll choreography, editorial reveals, and interaction pacing with GSAP and ScrollTrigger.", tags: ["GSAP", "ScrollTrigger", "Motion"], icon: WandSparkles },
  { number: "002", title: "3D / WebGL", description: "Architecture and interface experiments where 3D supports the story instead of becoming the whole story.", tags: ["Three.js", "R3F", "WebGL"], icon: Boxes },
  { number: "003", title: "AI Visual Direction", description: "Cinematic concept assets and visual studies created with Higgsfield, then integrated into real web layouts.", tags: ["Higgsfield", "Art Direction", "Web"], icon: Sparkles },
  { number: "004", title: "Interface Prototypes", description: "Small React experiments for navigation, responsive behavior, dashboards, and high-polish interaction details.", tags: ["React", "UI", "Prototype"], icon: Atom },
];

export function CreativeLab() {
  return (
    <section className="home-flow-section home-lab" aria-labelledby="home-lab-title">
      <div className="portfolio-shell">
        <div className="home-lab-heading">
          <div>
            <p className="v2-kicker">Lab / 2026</p>
            <h2 id="home-lab-title" className="v2-heading mt-4">Experiment. Learn. Build.</h2>
          </div>
          <p className="home-section-lede">A quieter space for creative development—where I test motion, 3D, AI-assisted visual direction, and interface ideas before they become part of larger work.</p>
        </div>

        <div className="home-lab-grid">
          {experiments.map((experiment) => {
            const Icon = experiment.icon;
            return (
              <article className="home-lab-card" key={experiment.number}>
                <div className="home-lab-card-top"><span>{experiment.number}</span><Icon size={19} strokeWidth={1.6} aria-hidden="true" /></div>
                <h3>{experiment.title}</h3>
                <p>{experiment.description}</p>
                <div>{experiment.tags.map((tag) => <span className="v2-chip" key={tag}>{tag}</span>)}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
