import { Github, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <main id="main-content" className="portfolio-v2 grid min-h-screen place-items-center px-5 pb-20 pt-32">
      <div className="contact-page-card w-full max-w-5xl rounded-[2.5rem] border border-white/[.08] p-8 sm:p-12 lg:p-16">
        <p className="v2-kicker">Contact</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.05em] text-white sm:text-6xl lg:text-7xl">Let’s build something useful together.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-500">I’m open to software development, information systems, web projects, UI/UX design, and professional opportunities.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <a className="contact-option rounded-2xl border border-white/[.08] p-5" href={`mailto:${site.email}`}><Mail size={20} /><span className="mt-6 block text-xs uppercase tracking-[.16em] text-zinc-600">Email</span><strong className="mt-2 block text-sm text-white">{site.email}</strong></a>
          <a className="contact-option rounded-2xl border border-white/[.08] p-5" href={site.github} target="_blank" rel="noreferrer"><Github size={20} /><span className="mt-6 block text-xs uppercase tracking-[.16em] text-zinc-600">GitHub</span><strong className="mt-2 block text-sm text-white">@trysinkaye-lang</strong></a>
          <div className="contact-option rounded-2xl border border-white/[.08] p-5"><MapPin size={20} /><span className="mt-6 block text-xs uppercase tracking-[.16em] text-zinc-600">Location</span><strong className="mt-2 block text-sm text-white">Philippines</strong></div>
        </div>
      </div>
    </main>
  );
}
