import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RevealOnScroll from "@/components/RevealOnScroll";
import StatCard from "@/components/StatCard";
import PillLink from "@/components/PillLink";

export const metadata: Metadata = {
  title: "For Authors",
  description:
    "Numbers you can check, not numbers you have to trust — every figure traceable to a real reader, a real review, a real reaction.",
};

const STATS = [
  { value: "2,400+", label: "Authors placed with real readers" },
  { value: "91%", label: "Reader match rate" },
  { value: "340+", label: "Verified reviews generated this month" },
];

const COMMITMENTS = [
  {
    title: "No bought reviews",
    body: "Not discounted, not incentivised, not swapped. Every review is written by someone who chose to read the book.",
  },
  {
    title: "No inflated reach",
    body: "We report readers, not impressions. A number here means a person, and you can follow it back to one.",
  },
  {
    title: "No lock-in",
    body: "The reviews and reader relationships are yours. If you stop working with us, none of it goes away.",
  },
];

export default function ForAuthorsPage() {
  return (
    <PageShell currentPath="/for-authors">
      <section className="relative px-6 pb-14 pt-10 sm:px-11 sm:pb-20 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_68%_at_14%_0%,rgba(20,184,166,0.08)_0%,rgba(253,252,250,0)_60%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col gap-6">
          <RevealOnScroll>
            <h1 className="type-h1 m-0 max-w-[20ch]">
              Numbers you can check. Not numbers you have to trust.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={60}>
            <p className="m-0 max-w-[58ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.8] text-muted">
              Every number here is something an author can trace back to a real reader, a
              real review, a real reaction — not a dashboard metric.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-11 sm:pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delayMs={i * 60}>
              <StatCard value={stat.value} label={stat.label} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-11 sm:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-9 sm:gap-14">
          <RevealOnScroll>
            <h2 className="type-h2 m-0 max-w-[16ch]">What we won&apos;t do.</h2>
          </RevealOnScroll>
          <div className="flex flex-col">
            {COMMITMENTS.map((c, i) => (
              <RevealOnScroll
                key={c.title}
                delayMs={i * 60}
                className={`hairline grid grid-cols-1 gap-3 border-t py-8 sm:grid-cols-[minmax(0,24ch)_minmax(0,1fr)] sm:gap-12 sm:py-10 ${
                  i === COMMITMENTS.length - 1 ? "border-b" : ""
                }`}
              >
                <h3 className="m-0 font-serif text-[clamp(1.1875rem,2vw,1.5rem)] font-normal leading-[1.3] tracking-[-0.008em]">
                  {c.title}
                </h3>
                <p className="m-0 max-w-[52ch] text-pretty text-[0.9rem] leading-[1.8] text-muted">
                  {c.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-11 sm:pb-28">
        <RevealOnScroll className="mx-auto flex max-w-6xl flex-col items-start gap-6">
          <p className="type-h3 m-0 max-w-[20ch]">See what that looked like in practice.</p>
          <PillLink href="/case-studies" variant="ghost">
            Read the case studies
          </PillLink>
        </RevealOnScroll>
      </section>
    </PageShell>
  );
}
