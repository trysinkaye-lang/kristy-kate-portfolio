import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/[.08]">
      <div className="portfolio-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div><p className="v2-kicker">Kristy Kate Taylor</p><p className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Software, systems, and interfaces designed with purpose.</p></div>
          <div className="flex flex-wrap gap-3 lg:justify-end"><a className="footer-link" href={`mailto:${site.email}`}><Mail size={15} /> Email</a><a className="footer-link" href={site.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><Link className="footer-link" href="/contact">Contact <ArrowUpRight size={15} /></Link></div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[.08] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Kristy Kate Taylor</span><span>Designed and built with Next.js</span></div>
      </div>
    </footer>
  );
}
