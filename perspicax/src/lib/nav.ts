export type NavLink = {
  label: string;
  href: string;
  /** One line of orientation, shown in the menu and on the "next page" card. */
  blurb: string;
};

/**
 * The site is a flat set of standalone routes — every page is directly
 * reachable, linked from the menu, and present in the sitemap. Nothing is
 * gated behind a previous step.
 *
 * The array order is also the *suggested* reading order: `nextPage()` reads it
 * to build the "next page" prompt at the foot of each page. That is a cue, not
 * a constraint — a visitor can enter anywhere and leave from anywhere.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "/how-it-works", blurb: "Three steps, start to finish." },
  { label: "For authors", href: "/for-authors", blurb: "Numbers you can check." },
  { label: "Readers", href: "/readers", blurb: "The community behind the match." },
  { label: "Case studies", href: "/case-studies", blurb: "Proof, not promises." },
  { label: "About", href: "/about", blurb: "Why Perspicax exists." },
  { label: "FAQ", href: "/faq", blurb: "Questions, answered plainly." },
  { label: "Contact", href: "/contact", blurb: "Tell us about your book." },
];

/** Home is in the menu too, but it isn't part of the suggested reading order. */
export const HOME_LINK: NavLink = {
  label: "Home",
  href: "/",
  blurb: "Author visibility, quietly done.",
};

/**
 * The next page in the suggested order, or null at the end of it.
 * Home hands off to the first real page.
 */
export function nextPage(currentHref: string): NavLink | null {
  if (currentHref === "/") return NAV_LINKS[0];
  const i = NAV_LINKS.findIndex((l) => l.href === currentHref);
  if (i === -1 || i === NAV_LINKS.length - 1) return null;
  return NAV_LINKS[i + 1];
}

export const SITE = {
  name: "Perspicax",
  tagline: "Author visibility, quietly done.",
  description:
    "Perspicax connects books with real, engaged readers — quiet, honest author visibility without inflated numbers or empty guarantees.",
  url: "https://perspicax.example.com",
};
