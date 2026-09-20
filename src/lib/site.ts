/**
 * Single source of truth for everything about the site that is not page content:
 * its name, its canonical URL, and every external link.
 *
 * Why this file exists: the WhatsApp invite link and the Students' Union join
 * URL each appear on several pages. If they lived inline in the JSX, changing
 * one would mean hunting through the codebase and inevitably missing a copy.
 * Here, it is one edit.
 */

export const siteConfig = {
  name: "HerTech Future",
  shortName: "HTF",
  tagline: "The future of tech is hers",

  description:
    "HerTech Future is the women in tech society at Manchester Metropolitan University. Workshops, industry events, networking and a community for women and those who identify as women in tech.",

  /**
   * The canonical origin, with no trailing slash.
   *
   * Read from an environment variable so that preview deployments describe
   * themselves correctly, falling back to production. This is a *public* value
   * (hence the NEXT_PUBLIC_ prefix, which is what allows it into the browser
   * bundle) -- never put a secret behind that prefix.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hertechfuture.co.uk",

  /** Where the society actually lives on the internet. */
  links: {
    instagram: "https://www.instagram.com/mmu_htf/",
    whatsapp: "https://chat.whatsapp.com/KZv4Kga9QIp2N1IrJ3mnnM",
    union: "https://www.theunionmmu.org/groups/hertech-future",
    email: "hello@hertechfuture.co.uk",
  },

  /** The university we are a society of. Stated as fact, not as endorsement. */
  university: {
    name: "Manchester Metropolitan University",
    shortName: "Manchester Met",
  },
} as const;

/**
 * `as const` above freezes this object and makes every value a literal type,
 * so `siteConfig.name` has the type `"HerTech Future"` rather than `string`.
 * That means a typo in a property name is a compile error, not a blank space
 * on the live site.
 */
export type SiteConfig = typeof siteConfig;

/** Build an absolute URL from a site-relative path. Used for metadata and the sitemap. */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalised}`;
}
