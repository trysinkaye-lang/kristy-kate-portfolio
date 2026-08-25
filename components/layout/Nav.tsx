"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { site } from "@/data/site";

const links = [
  ["Home", "#home"], ["About", "#about"], ["Projects", "#projects"], ["Designs", "#designs"],
  ["Skills", "#skills"], ["Experience", "#experience"], ["Resume", "#resume"], ["Contact", "#contact"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("#home");
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

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
      { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLink = (label: string, href: string, mobile = false) => (
    <a
      key={href}
      href={href}
      onClick={() => mobile && setOpen(false)}
      aria-current={active === href ? "page" : undefined}
      className={
        mobile
          ? `block rounded-xl px-4 py-3 transition ${active === href ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/5"}`
          : `rounded-full px-3 py-2 text-sm transition ${active === href ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`
      }
    >
      {label}
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl" aria-label="Main navigation">
        <a href="#home" className="font-semibold tracking-tight text-white">KT<span className="text-cyan-400">.</span></a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => navLink(label, href))}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="icon-button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {mounted && resolvedTheme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a href={`mailto:${site.email}`} className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 sm:inline-flex">
            Let&apos;s Work Together
          </a>
          <button
            className="icon-button lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-xl shadow-black/20 lg:hidden">
          {links.map(([label, href]) => navLink(label, href, true))}
        </div>
      )}
    </header>
  );
}
