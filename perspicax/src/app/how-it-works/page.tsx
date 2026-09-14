import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Three steps, start to finish: submit your book, match it with readers already inside an active community, and hear back from real ones.",
};

const STEPS = [
  {
    n: "01",
    title: "Submit",
    body: "Share your book. We look at what it is, who it's for, and where it belongs.",
    detail:
      "No form letter back. We read what you send and tell you plainly whether we think we can place it well — including when we can't.",
  },
  {
    n: "02",
    title: "Match",
    body: "Your book reaches readers already inside an active, engaged community — not cold outreach, not ads.",
    detail:
      "The match is the work. A hundred readers who were already looking for your kind of book will do more than a thousand who weren't.",
  },
  {
    n: "03",
    title: "Hear back",
    body: "Real reads. Real reviews. Real reactions — visible, verifiable, yours to keep.",
    detail:
      "Everything that comes back is traceable to a person who chose to read it. Nothing is bought, and nothing disappears if you stop working with us.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell currentPath="/how-it-works">
      <section className="relative px-6 pb-14 pt-10 sm:px-11 sm:pb-20 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_12%_0%,rgba(59,130,246,0.07)_0%,rgba(253,252,250,0)_62%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col gap-6">
          <RevealOnScroll>
            <h1 className="type-h1 m-0 max-w-[16ch]">Three steps, start to finish.</h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={60}>
            <p className="m-0 max-w-[52ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.8] text-muted">
              No dashboards to learn, no campaign to manage. You send us the book; we do
              the part that takes judgement.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-11 sm:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col">
          {STEPS.map((step, i) => (
            <RevealOnScroll
              key={step.n}
              delayMs={i * 60}
              className={`hairline grid grid-cols-1 gap-5 border-t py-10 sm:grid-cols-[auto_minmax(0,22ch)_minmax(0,1fr)] sm:gap-12 sm:py-14 ${
                i === STEPS.length - 1 ? "border-b" : ""
              }`}
            >
              {/* Numerals sit tighter than the body text they label — display-scale
                  Playfair reads loose at default tracking. */}
              <div className="font-serif text-[clamp(2.125rem,3.4vw,2.875rem)] leading-none tracking-[-0.01em] text-teal-ink">
                {step.n}
              </div>
              <h2 className="type-h3 m-0">{step.title}</h2>
              <div className="flex flex-col gap-4">
                <p className="m-0 max-w-[48ch] text-pretty text-[0.9375rem] leading-[1.8]">
                  {step.body}
                </p>
                <p className="m-0 max-w-[48ch] text-pretty text-[0.875rem] leading-[1.8] text-muted">
                  {step.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
