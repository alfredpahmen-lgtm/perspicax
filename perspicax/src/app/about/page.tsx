import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "About",
  description: "Why Perspicax exists — real readers over inflated metrics, fit over volume, quiet honest outreach over noise.",
};

const BELIEFS = [
  "Real readers over inflated metrics.",
  "Fit over volume.",
  "Quiet, honest outreach over noise.",
];

export default function AboutPage() {
  return (
    <div className="bg-bg font-sans text-text">
      <Header currentPath="/about" />

      <section className="relative px-6 pb-14 pt-10 sm:px-11 sm:pb-20 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_68%_at_14%_0%,rgba(139,92,246,0.08)_0%,rgba(11,14,26,0)_60%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col gap-8">
          <RevealOnScroll>
            <h1 className="m-0 max-w-[16ch] text-pretty font-serif text-[clamp(36px,5.6vw,76px)] font-normal leading-[1.08] tracking-[-0.015em]">
              Why Perspicax exists.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={60}>
            <p className="m-0 max-w-[58ch] text-pretty text-[clamp(15px,1.2vw,16.5px)] leading-[1.85] text-muted">
              Most authors don&apos;t need louder marketing. They need the right readers — people
              who were already looking for something like their book, and simply hadn&apos;t
              found it yet. Perspicax exists to close that gap: quietly, honestly, without
              inflated numbers or empty guarantees.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-11 sm:pb-32">
        <div className="mx-auto flex max-w-4xl flex-col gap-9 sm:gap-14">
          <RevealOnScroll>
            <h2 className="m-0 font-serif text-[clamp(24px,2.6vw,34px)] font-normal leading-[1.2]">
              What we believe
            </h2>
          </RevealOnScroll>
          <div className="flex flex-col">
            {BELIEFS.map((belief, i) => (
              <RevealOnScroll
                key={belief}
                delayMs={i * 60}
                className={`flex items-baseline gap-6 border-t border-muted/16 py-7 sm:gap-11 sm:py-9 ${
                  i === BELIEFS.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="min-w-[2.5ch] font-serif text-[clamp(20px,2vw,26px)] leading-none text-teal">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="m-0 max-w-[46ch] text-pretty font-serif text-[clamp(19px,2vw,26px)] font-normal leading-[1.4]">
                  {belief}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
