import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * Generates /robots.txt at build time.
 *
 * Allows everything -- we want this site found -- and points crawlers at the
 * sitemap. Note that robots.txt is a request, not a security control: it is a
 * public file, so never list a path here that you are trying to keep private.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
