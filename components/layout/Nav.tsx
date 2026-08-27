"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Design", "#designs"],
  ["Contact", "#contact"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#projects");

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[#05070b]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="#home" className="shrink-0 text-sm font-semibold tracking-tight text-white sm:text-base">
          Kristy Kate Taylor
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition ${active === href ? "text-white" : "text-slate-400 hover:text-white"}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={`mailto:${site.email}`} className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 sm:inline-flex">
            Contact
          </a>
          <button
            className="icon-button lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/6 bg-[#05070b] px-5 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
