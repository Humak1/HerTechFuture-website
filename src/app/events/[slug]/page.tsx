import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  formatEventDate,
  formatEventTime,
  getAllEventSlugs,
  getEventBySlug,
  toDateTimeAttribute,
} from "@/lib/events";

/**
 * A DYNAMIC ROUTE
 * ---------------
 * The folder name `[slug]` makes this one file serve every event page:
 * /events/social-circle, /events/tech-for-tomorrow, and so on.
 *
 * In Next.js 15 and later, `params` arrives as a Promise and must be awaited.
 * That is why both functions below are `async`. If you see the error
 * "params should be awaited", this is what it means.
 */
type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Tells Next.js, at build time, exactly which slugs exist.
 *
 * The result is one static HTML file per event, generated during the build and
 * served straight from the CDN. No server work happens when a visitor arrives,
 * which is both faster and cheaper than rendering on demand.
 */
export function generateStaticParams(): { slug: string }[] {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

/** Per-event <title> and description, so shared links preview properly. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { title: event.title, description: event.summary },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  /*
   * A slug that does not exist renders the 404 page with a real 404 status
   * code, rather than throwing. This matters for search engines, and it is the
   * reason `getEventBySlug` returns `undefined` instead of throwing itself --
   * the page is the layer that knows what to do about a miss.
   */
  if (!event) {
    notFound();
  }

  const isUpcoming = new Date(`${event.date}T${event.startTime}:00Z`) >= new Date();

  return (
    <Container className="py-16 sm:py-24">
      <article className="max-w-prose">
        {isUpcoming ? (
          <div className="mb-6">
            <Badge>Upcoming</Badge>
          </div>
        ) : null}

        <time
          dateTime={toDateTimeAttribute(event)}
          className="text-sm font-medium text-accent-strong"
        >
          {formatEventDate(event)} &middot; {formatEventTime(event)}
        </time>

        <h1 className="mt-4 text-4xl sm:text-5xl">{event.title}</h1>

        {/*
          A definition list is the semantically correct element for
          label/value pairs. A screen reader announces "Location: Business
          School 3.14" as a pair, which a pile of <div>s would not.
        */}
        <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wide text-fg-subtle uppercase">
              Location
            </dt>
            <dd className="mt-1 text-fg-muted">{event.location}</dd>
          </div>

          {event.host ? (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-fg-subtle uppercase">
                Led by
              </dt>
              <dd className="mt-1 text-fg-muted">{event.host}</dd>
            </div>
          ) : null}

          {event.capacity ? (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-fg-subtle uppercase">
                Capacity
              </dt>
              <dd className="mt-1 text-fg-muted">{event.capacity} places</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-fg-muted">
          {event.body.map((paragraph, index) => (
            // The paragraph text is stable and unique within an event, so it
            // is a safer key than the array index.
            <p key={`${event.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>

        {event.ticketUrl ? (
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={event.ticketUrl} external>
              {isUpcoming ? "Get a ticket" : "View on the Union site"}
            </Button>
            <Button href="/events" variant="secondary">
              All events
            </Button>
          </div>
        ) : null}
      </article>
    </Container>
  );
}
