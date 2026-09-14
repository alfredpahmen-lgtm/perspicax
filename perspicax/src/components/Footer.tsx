import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/nav";
import PillLink from "./PillLink";
import RevealOnScroll from "./RevealOnScroll";

export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 sm:px-11 sm:pt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 sm:gap-20">
        <RevealOnScroll className="flex flex-col items-start gap-7">
          <p className="max-w-[18ch] text-pretty font-serif text-[clamp(26px,3.2vw,40px)] leading-[1.18]">
            Your book is already written. Let it be read.
          </p>
          <PillLink href="/contact">Find your readers</PillLink>
        </RevealOnScroll>

        <div className="h-px bg-gradient-to-r from-muted/16 via-muted/10 to-transparent" />

        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex flex-col gap-2.5">
            <div className="font-serif text-xl tracking-[0.06em]">{SITE.name}</div>
            <div className="text-[13px] text-muted">{SITE.tagline}</div>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted hover:text-text transition-colors duration-300">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-[11.5px] tracking-[0.03em] text-muted/80">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
