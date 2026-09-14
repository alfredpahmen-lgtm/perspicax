import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import CaseStudyCard from "@/components/CaseStudyCard";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "A closer look at how specific books found their readers.",
};

const CASE_STUDIES = [
  {
    tag: "Literary fiction",
    title: "From 40 reviews to 210 in six weeks.",
    body: "A debut novel with strong early word of mouth had stalled at forty reviews and no clear audience beyond the author's own circle. We placed it with readers already discussing quiet, character-driven fiction. Within six weeks it had two hundred and ten reviews, none of them solicited with payment.",
    stats: [
      { value: "40 → 210", label: "Reviews" },
      { value: "94%", label: "Match rate" },
      { value: "6 wks", label: "Time to result" },
    ],
  },
  {
    tag: "Narrative nonfiction",
    title: "A backlist title, read again.",
    body: "Three years past publication, the book had gone quiet — good reviews, no new readers. We reintroduced it to readers working through the same subject from other directions. It re-entered active discussion and held it for the rest of the quarter.",
    stats: [
      { value: "18 → 96", label: "Reviews" },
      { value: "88%", label: "Match rate" },
      { value: "1 qtr", label: "Sustained" },
    ],
  },
  {
    tag: "Speculative fiction",
    title: "The right hundred readers, not the wrong thousand.",
    body: "Ad spend had reached a wide audience and the wrong one — impressions without reads. We narrowed the placement to a small, specific reader set instead. Fewer people saw the book; far more of them finished it and wrote about it.",
    stats: [
      { value: "11 → 74", label: "Reviews" },
      { value: "96%", label: "Match rate" },
      { value: "0", label: "Paid reviews" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-bg font-sans text-text">
      <Header currentPath="/case-studies" />

      <section className="relative px-6 pb-11 pt-10 sm:px-11 sm:pb-16 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_68%_at_14%_0%,rgba(59,130,246,0.08)_0%,rgba(11,14,26,0)_60%)]"
        />
        <div className="relative mx-auto flex max-w-[760px] flex-col gap-6">
          <RevealOnScroll>
            <h1 className="type-h1 m-0">Proof, not promises.</h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={60}>
            <p className="m-0 max-w-[46ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.8] text-muted">
              A closer look at how specific books found their readers.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 pb-18 sm:px-11 sm:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 sm:gap-12">
          {CASE_STUDIES.map((cs, i) => (
            <RevealOnScroll key={cs.title} delayMs={i * 60}>
              <CaseStudyCard {...cs} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
