"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-t border-muted/16 last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(15px,1.4vw,17px)] font-medium text-text transition-colors duration-300 hover:text-muted sm:py-7"
            >
              <span className="max-w-[48ch] text-pretty leading-relaxed">{item.q}</span>
              <span className="relative h-[13px] w-[13px] flex-none">
                <span className="absolute left-0 top-1/2 h-px w-[13px] -translate-y-1/2 bg-teal" />
                <span
                  className="absolute left-1/2 top-0 h-[13px] w-px -translate-x-1/2 bg-teal transition-opacity duration-300"
                  style={{ opacity: isOpen ? 0 : 1 }}
                />
              </span>
            </button>
            <div
              className="overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out grid"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="min-h-0">
                <p className="m-0 max-w-[62ch] text-pretty pb-7 text-[14.5px] leading-[1.85] text-muted sm:pb-8">
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
