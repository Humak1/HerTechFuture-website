import { events } from "@/content/events";
import type { Event } from "@/lib/schemas";

/**
 * QUERY LAYER
 * -----------
 * Pages ask questions of this module -- "what is coming up?", "what have we
 * run?" -- and never touch the raw array themselves.
 *
 * The payoff: when the events eventually move out of a TypeScript file and
 * into Markdown files or a CMS, only this module changes. Every page that
 * consumes it carries on working untouched. That is the whole point of putting
 * a seam between where data lives and where it is displayed.
 */

/**
 * Combine an event's date and start time into a real Date object.
 *
 * The "Z" suffix pins the value to UTC. Without it, the string would be parsed
 * in whatever timezone the build machine happens to be in -- which for a
 * Vercel build is not the UK, and would quietly shift events by an hour during
 * British Summer Time. Timezone bugs are the single most common source of
 * "why is this event showing on the wrong day".
 */
function toDateTime(event: Event): Date {
  return new Date(`${event.date}T${event.startTime}:00Z`);
}

/** Newest first. Used for the past-events archive. */
function byDateDescending(a: Event, b: Event): number {
  return toDateTime(b).getTime() - toDateTime(a).getTime();
}

/** Soonest first. Used for upcoming events. */
function byDateAscending(a: Event, b: Event): number {
  return toDateTime(a).getTime() - toDateTime(b).getTime();
}

/**
 * Everything still to come, soonest first.
 *
 * Note the caveat: because every page is generated at build time, "now" means
 * "the moment the site was last built". An event does not silently move from
 * upcoming to past on its own -- it moves when the site next rebuilds. In
 * practice you rebuild whenever you push, which is often enough. If that ever
 * stops being true, add a daily scheduled rebuild.
 */
export function getUpcomingEvents(now: Date = new Date()): Event[] {
  return events.filter((event) => toDateTime(event) >= now).sort(byDateAscending);
}

/** Everything already run, newest first. */
export function getPastEvents(now: Date = new Date()): Event[] {
  return events.filter((event) => toDateTime(event) < now).sort(byDateDescending);
}

/**
 * Find one event by its slug.
 *
 * Returns `undefined` rather than throwing when nothing matches, so the page
 * can decide what to do -- which in our case is render a proper 404 rather
 * than crash with a 500.
 */
export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

/** Every slug, for Next.js to pre-render one page per event at build time. */
export function getAllEventSlugs(): string[] {
  return events.map((event) => event.slug);
}

/**
 * Format an event's date for display, e.g. "7 November 2025".
 *
 * `en-GB` is explicit so the build machine's locale cannot turn this into the
 * American ordering. Same class of bug as the timezone note above.
 */
export function formatEventDate(event: Event): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDateTime(event));
}

/** "11:00 - 13:00", with a proper en dash. */
export function formatEventTime(event: Event): string {
  return `${event.startTime}–${event.endTime}`;
}

/** The machine-readable value for <time dateTime="...">, which helps screen readers and search engines. */
export function toDateTimeAttribute(event: Event): string {
  return toDateTime(event).toISOString();
}
