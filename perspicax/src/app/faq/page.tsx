import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions, answered plainly. No fine print — just what you'd actually want to know.",
};

const FAQS = [
  {
    q: "How does Perspicax find readers for my book?",
    a: "We review your book, genre, and audience, then match it with readers inside our community who are already interested in that kind of story — not cold outreach, not paid promotion.",
  },
  {
    q: "How much does this cost?",
    a: "Every book is different, so we scope it after reviewing yours. Reach out and we'll tell you exactly what fits — no generic packages forced on books that don't need them.",
  },
  {
    q: "Are the reviews real?",
    a: "Yes. Every review comes from a real reader who chose to read your book. We don't use bots, and we don't buy engagement.",
  },
  {
    q: "How long does it take to see results?",
    a: "It depends on the book and the match — but you'll hear from us with a clear next step shortly after you submit, not silence.",
  },
  {
    q: "What genres do you work with?",
    a: "[Placeholder — to be confirmed]",
  },
  {
    q: "Do you guarantee reviews or sales?",
    a: "No — and we'd be cautious of anyone who does. We guarantee real readers see your book. What they say and do from there is genuine.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your book title, a link (Amazon/Goodreads), and your main goal. That's it to start the conversation.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-bg font-sans text-text">
      <Header currentPath="/faq" />

      <section className="relative px-6 pb-10 pt-10 sm:px-11 sm:pb-14 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_66%_at_16%_0%,rgba(59,130,246,0.08)_0%,rgba(11,14,26,0)_60%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col gap-6">
          <RevealOnScroll>
            <h1 className="type-h1 m-0 max-w-[18ch]">Questions, answered plainly.</h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={60}>
            <p className="m-0 max-w-[46ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.8] text-muted">
              No fine print. Just what you&apos;d actually want to know.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-11 sm:pb-32">
        <RevealOnScroll className="mx-auto block max-w-3xl">
          <FaqAccordion items={FAQS} />
        </RevealOnScroll>
      </section>

      <Footer />
    </div>
  );
}
