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
            Building practical systems from workflow to production.
          </h2>
        </div>

        <div className="home-about-copy">
          <p>
            I’m a full-stack software developer and UI/UX designer with a
            Bachelor of Science in Information Technology. I work across web,
            desktop, databases, APIs, and deployment, with a strong focus on
            information systems and offline-first workflows.
          </p>
          <p>
            Recent work includes RBIM Hybrid: an offline-to-online population
            information platform with role-scoped web portals, PostgreSQL-backed
            services, desktop synchronization, validation, reporting, and
            production deployment hardening.
          </p>
          <Link href="/about" className="v2-button mt-8">
            More About Me <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
