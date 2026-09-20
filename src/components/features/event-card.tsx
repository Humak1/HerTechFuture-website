import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  formatEventDate,
  formatEventTime,
  toDateTimeAttribute,
} from "@/lib/events";
import type { Event } from "@/lib/schemas";

type EventCardProps = {
  event: Event;
  /** Shows an "Upcoming" badge. Set by the page, which knows the context. */
  upcoming?: boolean;
};

/**
 * One event in a list.
 *
 * Note what this component does NOT do: it does not decide whether an event is
 * upcoming. That is the page's job, because the page is the thing that queried
 * for them. A component that re-derives context its parent already knows ends
 * up with two sources of truth that eventually disagree.
 */
export function EventCard({ event, upcoming = false }: EventCardProps) {
  return (
    <Card interactive className="flex flex-col gap-3">
      {upcoming ? (
        <div>
          <Badge>Upcoming</Badge>
        </div>
      ) : null}

      {/*
        <time> with a machine-readable dateTime gives search engines and
        assistive technology an unambiguous value, while humans read the
        formatted text.
      */}
      <time
        dateTime={toDateTimeAttribute(event)}
        className="text-sm font-medium text-accent-strong"
      >
        {formatEventDate(event)} &middot; {formatEventTime(event)}
      </time>

      <h3 className="text-xl">
        {/*
          The whole card is clickable via this link's ::after overlay, but the
          link text itself is the title -- so a screen reader announces
          something meaningful rather than "link, card".
        */}
        <Link
          href={`/events/${event.slug}`}
          className="after:absolute after:inset-0 hover:text-accent-strong"
        >
          {event.title}
        </Link>
      </h3>

      <p className="text-fg-muted">{event.summary}</p>

      <p className="mt-1 text-sm text-fg-subtle">{event.location}</p>
    </Card>
  );
}
