import type { Metadata } from "next";

import { EventCard } from "@/components/features/event-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, industry sessions and socials run by HerTech Future at Manchester Metropolitan University.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl">Events</h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted">
          Everything we have run, and everything coming up. Tickets are handled by the
          Students&rsquo; Union.
        </p>
      </Container>

      <Section title="Upcoming">
        {/*
          Empty states matter. A visitor who sees nothing cannot tell whether the
          society is dormant or the page is broken, so say which, and give them
          somewhere to go.
        */}
        {upcoming.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((event) => (
              <li key={event.slug}>
                <EventCard event={event} upcoming />
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-prose text-fg-muted">
            Nothing scheduled right now. Next term&rsquo;s programme goes up here first
            &mdash; follow us on Instagram and you will not miss it.
          </p>
        )}
      </Section>

      <Section title="Past events" lead="The archive. Every session we have run.">
        <ul className="grid gap-4 sm:grid-cols-2">
          {past.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
