"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./layout.module.css";

const links = [["Work", "/projects"], ["About", "/about"], ["Services", "/#services"], ["Contact", "/contact"]] as const;
const subscribe = () => () => {};
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  return <button type="button" disabled={!mounted} className={styles.theme} aria-label={dark ? "Use light mode" : "Use dark mode"} onClick={() => setTheme(dark ? "light" : "dark")}><span aria-hidden="true">{dark ? "◑" : "◐"}</span><span className="sr-only">Color theme</span></button>;
}
export function Nav() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function close() { dialog.current?.close(); setOpen(false); trigger.current?.focus(); }
  function show() { dialog.current?.showModal(); setOpen(true); closeButton.current?.focus(); }
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (query.matches) { dialog.current?.close(); setOpen(false); } };
    query.addEventListener("change", onResize);
    return () => { document.body.style.overflow = previous; query.removeEventListener("change", onResize); };
  }, [open]);

  return <header className={styles.header}>
    <div className={`shell ${styles.bar}`}>
      <Link className={styles.brand} href="/" aria-label="Kristy Kate Taylor — home">Kristy Kate<span className={styles.brandMark} aria-hidden="true"> / </span></Link>
      <nav className={styles.desktop} aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={label} href={href} aria-current={pathname === href || (href === "/projects" && pathname.startsWith("/projects/")) ? "page" : undefined}>{label}</Link>)}
        <ThemeToggle />
      </nav>
      <button ref={trigger} type="button" className={styles.menuButton} aria-controls="mobile-navigation" aria-expanded={open} aria-label="Open navigation" onClick={show}>Menu <span aria-hidden="true">＋</span></button>
    </div>
    <dialog ref={dialog} id="mobile-navigation" className={styles.dialog} aria-label="Navigation" onCancel={close} onClose={() => setOpen(false)} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const nodes = dialog.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!nodes?.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
      <div className={styles.dialogTop}><span>Kristy Kate Taylor</span><button ref={closeButton} type="button" onClick={close} aria-label="Close navigation">Close ×</button></div>
      <nav aria-label="Mobile navigation">{links.map(([label, href], index) => <Link href={href} key={href} onClick={close} aria-current={pathname === href || (href === "/projects" && pathname.startsWith("/projects/")) ? "page" : undefined}><span aria-hidden="true">0{index + 1}</span>{label}</Link>)}</nav>
      <div className={styles.dialogBottom}><p>Design & engineering<br /><span className="caption">Based in the Philippines</span></p><ThemeToggle /></div>
    </dialog>
    <noscript><nav className={`shell ${styles.noScriptNav}`} aria-label="Page navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav></noscript>
  </header>;
}
