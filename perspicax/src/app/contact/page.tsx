import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your book. A few details help us understand where it belongs.",
};

export default function ContactPage() {
  return (
    <PageShell currentPath="/contact">

      <section className="relative px-6 pb-20 pt-10 sm:px-11 sm:pb-24 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_82%_6%,rgba(59,130,246,0.08)_0%,rgba(253,252,250,0)_62%)]"
        />
        <div className="relative mx-auto flex max-w-[620px] flex-col gap-10 sm:gap-16">
          <div className="flex flex-col gap-5">
            <RevealOnScroll>
              <h1 className="type-h1 m-0 max-w-[16ch]">Tell us about your book.</h1>
            </RevealOnScroll>
            <RevealOnScroll delayMs={60}>
              <p className="m-0 max-w-[46ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.8] text-muted">
                A few details help us understand where it belongs.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delayMs={120} className="relative">
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>
    </PageShell>
  );
}
