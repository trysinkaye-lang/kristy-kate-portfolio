import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Mail, MapPin, Sparkles } from "lucide-react";
import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <main id="main-content" className="portfolio-v2 contact-page editorial-page relative min-h-screen overflow-hidden pb-24 pt-36">
      <div className="contact-orb contact-orb-one" aria-hidden="true" /><div className="contact-orb contact-orb-two" aria-hidden="true" />
      <div className="portfolio-shell relative z-10">
        <Link href="/" className="page-back-link inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"><ArrowLeft size={16} /> Back home</Link>

        <header className="page-hero page-hero-panel page-hero-split contact-hero mt-10">
          <div className="page-hero-heading">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[.1] bg-white/[.035] px-4 py-2 text-xs text-zinc-300"><Sparkles size={14} /> Available for opportunities</div>
            <h1 className="page-title mt-6 text-white">Let’s make <span className="page-title-accent">something useful.</span></h1>
          </div>
          <div className="page-intro self-end">
            <p className="max-w-xl text-xl leading-9 text-zinc-400">Have a software project, information system, website, or UI/UX opportunity? Tell me what you’re building.</p>
            <a className="contact-email-link mt-9 inline-flex items-center gap-3 text-xl font-semibold text-white" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={20} /></a>
          </div>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <a className="contact-option editorial-card group rounded-[1.7rem] border border-white/[.09] p-6" href={`mailto:${site.email}`}><div className="flex items-start justify-between"><Mail size={22} /><ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} /></div><span className="mt-14 block text-xs uppercase tracking-[.18em] text-zinc-600">Email</span><strong className="mt-2 block text-sm text-white">{site.email}</strong></a>
          <a className="contact-option editorial-card group rounded-[1.7rem] border border-white/[.09] p-6" href={site.github} target="_blank" rel="noreferrer"><div className="flex items-start justify-between"><Github size={22} /><ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} /></div><span className="mt-14 block text-xs uppercase tracking-[.18em] text-zinc-600">GitHub</span><strong className="mt-2 block text-sm text-white">@trysinkaye-lang</strong></a>
          <div className="contact-option editorial-card rounded-[1.7rem] border border-white/[.09] p-6"><MapPin size={22} /><span className="mt-14 block text-xs uppercase tracking-[.18em] text-zinc-600">Based in</span><strong className="mt-2 block text-sm text-white">Philippines · GMT+8</strong></div>
        </div>
      </div>
    </main>
  );
}
