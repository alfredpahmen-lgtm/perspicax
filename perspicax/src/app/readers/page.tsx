import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Readers",
  description:
    "An active, established community of readers who read, discuss, and review because they want to — not because they're paid to.",
};

const PRINCIPLES = [
  {
    title: "They were already reading",
    body: "Nobody is recruited to read your book. The community exists because these people read anyway; your book enters a conversation that was already happening.",
  },
  {
    title: "They choose the book",
    body: "Readers pick what appeals to them from what we surface. A book nobody picks up tells us the match was wrong — and we would rather know that than manufacture a number.",
  },
  {
    title: "They owe you nothing",
    body: "No reader is obliged to finish, rate, or review. That is exactly why the ones who do are worth having.",
  },
];

export default function ReadersPage() {
  return (
    <PageShell currentPath="/readers">
      <section className="relative px-6 pb-14 pt-10 sm:px-11 sm:pb-20 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_78%_0%,rgba(139,92,246,0.08)_0%,rgba(253,252,250,0)_64%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col gap-7">
          <RevealOnScroll>
            <h1 className="type-h1 m-0 max-w-[18ch]">
              A community that was already reading.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={60}>
            <p className="m-0 max-w-[58ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.85] text-muted">
              Perspicax works with an active, established community of readers — people who
              read, discuss, and review because they want to, not because they&apos;re paid
              to. Your book reaches them the way any book reaches a reader who was already
              looking for something new.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delayMs={120}>
            <span className="card-surface hairline inline-flex items-center rounded-full border px-4 py-[0.4375rem] text-[0.72rem] tracking-[0.04em] text-muted">
              Real readers. No bots. No bought engagement.
            </span>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-11 sm:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-9 sm:gap-14">
          <RevealOnScroll>
            <h2 className="type-h2 m-0 max-w-[18ch]">How the community works.</h2>
          </RevealOnScroll>
          <div className="flex flex-col">
            {PRINCIPLES.map((p, i) => (
              <RevealOnScroll
                key={p.title}
                delayMs={i * 60}
                className={`hairline grid grid-cols-1 gap-3 border-t py-8 sm:grid-cols-[auto_minmax(0,26ch)_minmax(0,1fr)] sm:gap-10 sm:py-10 ${
                  i === PRINCIPLES.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="min-w-[2.5ch] font-serif text-[clamp(1.25rem,2vw,1.625rem)] leading-none tracking-[-0.01em] text-teal-ink">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="m-0 font-serif text-[clamp(1.1875rem,2vw,1.5rem)] font-normal leading-[1.3] tracking-[-0.008em]">
                  {p.title}
                </h3>
                <p className="m-0 max-w-[52ch] text-pretty text-[0.9rem] leading-[1.8] text-muted">
                  {p.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
