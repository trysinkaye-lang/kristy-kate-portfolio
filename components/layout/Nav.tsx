"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      wasOpenRef.current = true;
      window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
      wasOpenRef.current = false;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = sidebarRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("theme-transitioning");
    void root.offsetWidth;
    root.classList.add("theme-transitioning");

    const applyTheme = () => setTheme(nextTheme);
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && doc.startViewTransition) {
      const transition = doc.startViewTransition(applyTheme);
      transition.finished.finally(() => root.classList.remove("theme-transitioning"));
      return;
    }

    applyTheme();
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 620);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-50 px-4">
        <nav className="floating-nav mx-auto hidden h-14 w-fit items-center rounded-full p-1.5 sm:flex" aria-label="Main navigation">
          <div className="flex items-center">
            {links.slice(0, 3).map(([label, href]) => <a key={href} href={href} className={`floating-nav-link ${pathname === href || (href !== "/" && pathname.startsWith(href)) ? "is-home" : ""}`}>{label}</a>)}
          </div>
          <a href="/contact" className={`floating-contact inline-flex ${pathname.startsWith('/contact') ? 'is-home' : ''}`}>Contact</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={mounted ? (isDark ? "Use light mode" : "Use dark mode") : "Toggle color theme"}
          >
            {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
          </button>
        </nav>

        <div className="mobile-nav-trigger mx-auto flex w-full max-w-[calc(100vw-2rem)] items-center justify-between sm:hidden">
          <a href="/" className="mobile-brand" aria-label="Go to home">KT</a>
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation sidebar"
            aria-expanded={open}
            aria-controls="mobile-navigation-panel"
          >
            <Menu size={21} />
          </button>
        </div>
      </header>

      <div className={`mobile-sidebar-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        ref={sidebarRef}
        id="mobile-navigation-panel"
        className={`mobile-sidebar ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label="Mobile navigation panel"
        aria-modal={open ? "true" : undefined}
        role={open ? "dialog" : undefined}
        tabIndex={-1}
      >
        <div className="mobile-sidebar-head">
          <div>
            <p className="mobile-sidebar-eyebrow">Portfolio</p>
            <strong>Kristy Kate</strong>
          </div>
          <button ref={closeButtonRef} type="button" className="mobile-sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation sidebar"><X size={20} /></button>
        </div>

        <nav className="mobile-sidebar-links" aria-label="Mobile navigation">
          {links.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return <a key={href} href={href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}><span>{label}</span><span aria-hidden="true">↗</span></a>;
          })}
        </nav>

        <div className="mobile-sidebar-footer">
          <button
            type="button"
            className="mobile-theme-row"
            onClick={toggleTheme}
            aria-label={mounted ? (isDark ? "Use light mode" : "Use dark mode") : "Toggle color theme"}
          >
            <span>{mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"}</span>
            {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
          </button>
        </div>
      </aside>
    </>
  );
}
