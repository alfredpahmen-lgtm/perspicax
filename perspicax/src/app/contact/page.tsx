import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your book. A few details help us understand where it belongs.",
};

export default function ContactPage() {
  return (
    <div className="bg-bg font-sans text-text">
      <Header currentPath="/contact" />

      <section className="relative px-6 pb-20 pt-10 sm:px-11 sm:pb-24 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_82%_6%,rgba(59,130,246,0.08)_0%,rgba(11,14,26,0)_62%)]"
        />
        <div className="relative mx-auto flex max-w-[620px] flex-col gap-10 sm:gap-16">
          <div className="flex flex-col gap-5">
            <RevealOnScroll>
              <h1 className="m-0 max-w-[16ch] text-pretty font-serif text-[clamp(36px,5.6vw,72px)] font-normal leading-[1.08] tracking-[-0.015em]">
                Tell us about your book.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delayMs={60}>
              <p className="m-0 max-w-[46ch] text-pretty text-[clamp(15px,1.2vw,16.5px)] leading-[1.8] text-muted">
                A few details help us understand where it belongs.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delayMs={120} className="relative">
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
