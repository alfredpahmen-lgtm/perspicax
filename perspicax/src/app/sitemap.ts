import type { MetadataRoute } from "next";
import { HOME_LINK, NAV_LINKS, SITE } from "@/lib/nav";

/**
 * Every route, listed. Nothing on this site is gated, so the sitemap is simply
 * the menu — there is no page a crawler can reach only by going through
 * another one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [HOME_LINK, ...NAV_LINKS].map((link) => ({
    url: new URL(link.href, SITE.url).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
