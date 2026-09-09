import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HomeAbout() {
  return (
    <section className="home-flow-section home-about" aria-labelledby="home-about-title">
      <div className="portfolio-shell home-about-grid">
        <div>
          <p className="v2-kicker">About</p>
          <h2 id="home-about-title" className="v2-heading mt-4">Building practical systems and thoughtful websites around real needs.</h2>
        </div>

        <div className="home-about-copy">
          <p>I’m a website designer and developer, full-stack developer, and Bachelor of Science in Information Technology graduate. I work across websites, information systems, desktop applications, databases, and interface design.</p>
          <p>My approach connects requirements analysis, visual direction, responsive design, application development, and data workflows so the final experience is not only polished—it is understandable and useful for the people using it.</p>
          <Link href="/about" className="v2-button mt-8">More About Me <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
