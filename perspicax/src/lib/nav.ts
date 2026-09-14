export type NavLink = {
  label: string;
  href: string;
};

// Unified across every page so navigation is consistent and complete site-wide:
// anchor links land on the homepage sections, page links go to their own routes.
export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "For authors", href: "/#authors" },
  { label: "Readers", href: "/#readers" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const SITE = {
  name: "Perspicax",
  tagline: "Author visibility, quietly done.",
  description:
    "Perspicax connects books with real, engaged readers — quiet, honest author visibility without inflated numbers or empty guarantees.",
  url: "https://perspicax.example.com",
};
