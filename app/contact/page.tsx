import { ContactForm } from "@/components/contact/ContactForm";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { site } from "@/data/site";
import { packages, isCurrencyCode } from "@/data/packages";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/contact/contact.module.css";
export const metadata = pageMetadata("Contact", "Contact Kristy Kate Taylor for software development, websites, UI/UX, freelance, contract, and full-time opportunities.", "/contact");
export const dynamic = "force-dynamic";
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string; currency?: string }> }) {
  const query = await searchParams;
  const selectedPackage = packages.find(item => item.name.toLowerCase() === query.package);
  const currency = typeof query.currency === "string" && isCurrencyCode(query.currency) ? query.currency : "PHP";
  const initialSubject = selectedPackage ? `${selectedPackage.name} website package · ${currency}` : "";
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
  return <main id="main-content" tabIndex={-1} className={`shell ${styles.contactPage}`}><header><p className="eyebrow">A good place to begin</p><h1>What are<br />you <span>working on?</span></h1></header>
    <div className={styles.contactGrid}><aside><p>A software project, an information system, a website, or a UI/UX opportunity. Tell me where you want to take it.</p><TrackedLink href={`mailto:${site.email}`} className="text-link" eventName="contact_start" eventData={{ source: "contact_email" }}>{site.email}<span aria-hidden="true">↗</span></TrackedLink><dl><div><dt>Based in</dt><dd>Philippines · GMT+8</dd></div><div><dt>Open to</dt><dd>Freelance, contract<br />& full-time opportunities</dd></div><div><dt>Elsewhere</dt><dd><TrackedLink href={site.github} target="_blank" rel="noreferrer" eventName="github_open" eventData={{ source: "contact" }}>GitHub ↗</TrackedLink></dd></div></dl></aside><ContactForm key={initialSubject} configured={configured} initialSubject={initialSubject} /></div>
  </main>;
}
