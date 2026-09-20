import type { MetadataRoute } from "next";

import { events } from "@/content/events";
import { absoluteUrl } from "@/lib/site";

/**
 * Generates /sitemap.xml at build time.
 *
 * A sitemap lists every page so search engines can find them all without
 * having to discover each one by following links. Because it is generated
 * from the same content the pages are, it can never fall out of step -- which
 * is the entire argument for generating it rather than hand-writing the XML.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/events",
    "/committee",
    "/partners",
    "/join",
    "/privacy",
    "/accessibility",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteUrl(`/events/${event.slug}`),
    lastModified: new Date(event.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...eventEntries];
}
