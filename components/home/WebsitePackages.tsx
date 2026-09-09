import { ArrowUpRight, Check } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const packages = [
  {
    name: "Basic",
    price: "₱15,000",
    description: "A focused website for individuals, professionals, and small brands that need a clean, credible online presence.",
    features: [
      "Up to 5 pages",
      "Responsive desktop, tablet & mobile design",
      "About, services / expertise and contact sections",
      "Project, product or content showcase",
      "Clean UI and essential interactions",
      "Deployment setup",
    ],
  },
  {
    name: "Professional",
    price: "₱25,000",
    description: "For businesses and personal brands that need a more distinctive website with stronger presentation and interaction.",
    featured: true,
    features: [
      "Up to 7–8 pages",
      "Custom website design",
      "Expanded project, product or content showcase",
      "Responsive animations and interactions",
      "SEO basics",
      "Contact form",
      "Analytics setup",
      "Deployment",
    ],
  },
  {
    name: "Premium",
    price: "₱35,000–₱40,000",
    description: "A fully custom experience for clients who need richer content, advanced interaction, and easier long-term content management.",
    features: [
      "Full custom website design & development",
      "Advanced animations and interactions",
      "Dedicated project, product or content pages",
      "CMS / content management setup",
      "Advanced SEO setup",
      "Analytics integration",
      "Premium UI refinement",
      "Deployment",
    ],
  },
];

export function WebsitePackages() {
  return (
    <section className="home-flow-section home-packages" aria-labelledby="website-packages-title">
      <div className="portfolio-shell">
        <div className="home-packages-heading">
          <div>
            <p className="v2-kicker">Website packages</p>
            <h2 id="website-packages-title" className="v2-heading mt-4">
              Clear options for different website needs.
            </h2>
          </div>
          <div className="home-packages-intro">
            <p>
              Choose a starting package based on the size and complexity of the website. Final scope is confirmed before development begins.
            </p>
            <TrackedLink
              href="/packages"
              eventName="website_package_contact_click"
              eventData={{ source: "packages_intro", destination: "packages_page" }}
              className="project-case-link"
            >
              View full packages & currency options <ArrowUpRight size={16} />
            </TrackedLink>
          </div>
        </div>

        <div className="home-package-grid">
          {packages.map((item) => (
            <article
              className={`home-package-card${item.featured ? " home-package-card-featured" : ""}`}
              key={item.name}
            >
              <div className="home-package-card-top">
                <div>
                  <p className="home-package-name">{item.name}</p>
                  {item.featured ? <span className="home-package-badge">Most flexible</span> : null}
                </div>
                <p className="home-package-price">{item.price}</p>
              </div>

              <p className="home-package-description">{item.description}</p>

              <ul className="home-package-features">
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <TrackedLink
                href="/packages"
                eventName="website_package_contact_click"
                eventData={{ package: item.name.toLowerCase(), source: "packages_home" }}
                className={item.featured ? "v2-button v2-button-primary home-package-cta" : "v2-button home-package-cta"}
              >
                View {item.name} <ArrowUpRight size={15} />
              </TrackedLink>
            </article>
          ))}
        </div>

        <p className="home-package-note">
          Need something outside these packages? Custom website scopes are available for projects with different page counts, integrations, or content requirements.
        </p>
      </div>
    </section>
  );
}
