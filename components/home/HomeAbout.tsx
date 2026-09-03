import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function HomeAbout() {
  return (
    <section
      className="home-flow-section home-about"
      aria-labelledby="home-about-title"
    >
      <div className="portfolio-shell home-about-grid">
        <div>
          <p className="v2-kicker">About</p>
          <h2 id="home-about-title" className="v2-heading mt-4">
            Building practical systems around real workflows.
          </h2>
        </div>

        <div className="home-about-copy">
          <p>
            I’m a software developer and UI/UX designer with a Bachelor of
            Science in Information Technology. I focus on information systems,
            offline-first applications, usable interfaces, and reliable data
            workflows.
          </p>
          <p>
            My work combines requirements analysis, database design,
            application development, and interface design so complex tools feel
            organized and practical for the people using them.
          </p>
          <Link href="/about" className="v2-button mt-8">
            More About Me <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
