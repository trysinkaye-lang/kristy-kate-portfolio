"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Designs", "#designs"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Resume", "#resume"],
  ["Contact", "#contact"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = links
      .map(([, href]) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -64% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  const navLink = (label: string, href: string, mobile = false) => (
    <a
      key={href}
      href={href}
      onClick={() => mobile && setOpen(false)}
      aria-current={active === href ? "page" : undefined}
      className={
        mobile
          ? `block rounded-xl px-4 py-3 text-sm font-medium transition ${active === href ? "bg-cyan-400/10 text-cyan-200" : "text-slate-200 hover:bg-white/5"}`
          : `rounded-full px-3 py-2 text-sm transition ${active === href ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`
      }
    >
      {label}
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#050914]/88 px-3 py-2.5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-4 sm:py-3" aria-label="Main navigation">
        <a href="#home" className="shrink-0 font-semibold tracking-tight text-white">KT<span className="text-cyan-400">.</span></a>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map(([label, href]) => navLink(label, href))}
        </div>

        <div className="flex items-center gap-2">
          <a href={`mailto:${site.email}`} className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 md:inline-flex">
            Let&apos;s Work Together
          </a>
          <button
            className="icon-button xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-navigation" className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#050914]/98 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl xl:hidden">
          <div className="grid gap-1 sm:grid-cols-2">
            {links.map(([label, href]) => navLink(label, href, true))}
          </div>
          <a href={`mailto:${site.email}`} onClick={() => setOpen(false)} className="mt-2 flex w-full justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 md:hidden">
            Let&apos;s Work Together
          </a>
        </div>
      )}
    </header>
  );
}
