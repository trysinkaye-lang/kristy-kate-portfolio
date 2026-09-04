"use client";

import { useEffect, useRef, useState } from "react";

type SplitTextLiteProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function SplitTextLite({ text, className = "", delay = 45 }: SplitTextLiteProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={rootRef} className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="split-word" aria-hidden="true">
          {word.split("").map((letter, letterIndex) => {
            const index = text.split(" ").slice(0, wordIndex).join("").length + wordIndex + letterIndex;
            return (
              <span
                key={`${letter}-${letterIndex}`}
                className={`split-letter ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${index * delay}ms` }}
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < text.split(" ").length - 1 ? <span aria-hidden="true">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
