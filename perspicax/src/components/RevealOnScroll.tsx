"use client";

import { useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  /** Optional stagger delay in ms, kept small so the site still reads as one quiet fade. */
  delayMs?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Fades children in the first time they cross into the viewport.
 * Standard fade convention: opacity only, ease-out, ~200ms. No slide, no bounce.
 */
export default function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // No IntersectionObserver support (very old browser): show content immediately
  // rather than leaving it invisible forever.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`fade-in ${visible ? "is-visible" : ""} ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
