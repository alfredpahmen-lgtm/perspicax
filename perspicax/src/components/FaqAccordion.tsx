"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.q} className="hairline border-t last:border-b">
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="pressable-row flex w-full items-center justify-between gap-6 rounded-lg px-2 py-6 text-left text-[clamp(0.9375rem,1.4vw,1.0625rem)] font-medium text-text hover:text-muted sm:py-7"
            >
              <span className="max-w-[48ch] text-pretty leading-relaxed">{item.q}</span>
              {/* The mark rotates rather than swapping glyphs, so open and close
                  run along the same path. */}
              <span
                className="relative h-[13px] w-[13px] flex-none transition-transform duration-[260ms] ease-[var(--ease-out)]"
                style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                <span className="absolute left-0 top-1/2 h-px w-[13px] -translate-y-1/2 bg-teal-ink" />
                <span
                  className="absolute left-1/2 top-0 h-[13px] w-px -translate-x-1/2 bg-teal-ink transition-opacity duration-[260ms] ease-[var(--ease-out)]"
                  style={{ opacity: isOpen ? 0 : 1 }}
                />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-[260ms] ease-[var(--ease-out)]"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="min-h-0">
                <p className="m-0 max-w-[62ch] text-pretty px-2 pb-7 text-[0.9rem] leading-[1.85] text-muted sm:pb-8">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
