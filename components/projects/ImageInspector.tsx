"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./projects.module.css";

type ImageInspectorProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: ReactNode;
};

export function ImageInspector({ src, alt, width, height, children }: ImageInspectorProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function close() { dialog.current?.close(); }

  return <>
    <a ref={trigger} href={src} className={styles.inspectTrigger} aria-label={`Inspect ${alt}`} aria-haspopup="dialog" onClick={event => {
      // Modified clicks retain the ordinary image link, as does browsing without JS.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      setOpen(true);
      dialog.current?.showModal();
      closeButton.current?.focus();
    }}>
      {children}
      <span className={styles.inspectHint} aria-hidden="true">Inspect <span>↗</span></span>
    </a>
    <dialog ref={dialog} className={styles.inspector} aria-labelledby={titleId}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onClose={() => { setOpen(false); setActualSize(false); trigger.current?.focus({ preventScroll: true }); }}
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const nodes = dialog.current?.querySelectorAll<HTMLElement>("button, a[href], [tabindex='0']");
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}>
      <div className={styles.inspectorPanel}>
        <div className={styles.inspectorBar}>
          <p id={titleId}>{alt}</p>
          <button ref={closeButton} type="button" onClick={close} aria-label="Close image preview">Close <span aria-hidden="true">×</span></button>
        </div>
        <div className={styles.inspectorViewport} data-actual-size={actualSize} tabIndex={0} role="region" aria-label="Image preview; scroll to explore at actual size">
          {open ? <Image src={src} alt={alt} width={width} height={height} unoptimized style={{ width: actualSize ? width : undefined, maxWidth: actualSize ? "none" : width }} /> : null}
        </div>
        <div className={styles.inspectorBottom}>
          <button type="button" onClick={() => setActualSize(value => !value)} aria-pressed={actualSize}>{actualSize ? "Fit to screen" : "View actual size"}</button>
          <a href={src} target="_blank" rel="noreferrer">Open original <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </dialog>
  </>;
}
