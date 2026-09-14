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
 *
 * Initial state is always `false`, on the server and on the client alike — any
 * environment check during render (`typeof IntersectionObserver`, `typeof
 * window`) resolves differently in the two passes and makes hydration mismatch
 * on the class attribute. Every environment-dependent decision happens below,
 * in the effect, which only ever runs on the client after mount.
 */
export default function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Last-resort guard: every browser in this project's support matrix ships
    // IntersectionObserver, but if it were ever missing, revealing directly on
    // the node keeps content from being stranded invisible — and does it
    // without a second render pass.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

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
