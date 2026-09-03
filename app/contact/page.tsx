import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <main id="main-content" className="portfolio-v2 contact-page contact-classic editorial-page relative min-h-screen overflow-hidden pb-24 pt-36">
      <div className="contact-orb contact-orb-one" aria-hidden="true" />
      <div className="contact-orb contact-orb-two" aria-hidden="true" />

      <div className="contact-classic-shell portfolio-shell relative z-10">
        <div className="contact-classic-hero grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
          <div className="contact-classic-heading">
            <h1 className="text-[clamp(4rem,9vw,8rem)] font-semibold leading-[.84] tracking-[-.07em] text-white">
              Let’s make<br />
              something<br />
              <span className="contact-outline-text">useful.</span>
            </h1>
          </div>

          <div className="contact-classic-copy pb-2">
            <p className="max-w-xl text-xl leading-9 text-zinc-400">
              Have a software project, information system, website, or UI/UX opportunity? Tell me what you’re building.
            </p>
            <a className="contact-email-link mt-9 inline-flex items-center gap-3 text-xl font-semibold text-white" href={`mailto:${site.email}`}>
              {site.email}<ArrowUpRight size={20} />
            </a>
          </div>
        </div>

        <div className="contact-classic-options mt-20 grid gap-4 md:grid-cols-3">
          <a className="contact-option group rounded-[1.7rem] border border-white/[.09] p-6" href={`mailto:${site.email}`}>
            <div className="flex items-start justify-between"><Mail size={22} /><ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} /></div>
            <span className="mt-14 block text-xs uppercase tracking-[.18em] text-zinc-600">Email</span>
            <strong className="mt-2 block text-sm text-white">{site.email}</strong>
          </a>
          <a className="contact-option group rounded-[1.7rem] border border-white/[.09] p-6" href={site.github} target="_blank" rel="noreferrer">
            <div className="flex items-start justify-between"><Github size={22} /><ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} /></div>
            <span className="mt-14 block text-xs uppercase tracking-[.18em] text-zinc-600">GitHub</span>
            <strong className="mt-2 block text-sm text-white">@trysinkaye-lang</strong>
          </a>
          <div className="contact-option rounded-[1.7rem] border border-white/[.09] p-6">
            <MapPin size={22} />
            <span className="mt-14 block text-xs uppercase tracking-[.18em] text-zinc-600">Based in</span>
            <strong className="mt-2 block text-sm text-white">Philippines · GMT+8</strong>
          </div>
        </div>
      </div>
    </main>
  );
}
