import Link from "next/link";

import { formatEventDate, formatEventTime, toDateTimeAttribute } from "@/lib/events";
import type { Event } from "@/lib/schemas";

type Props = {
  events: Event[];
};

/**
 * The events archive as a timeline rather than a grid.
 *
 * A spine runs down the centre on wide screens and alternates the entries
 * either side of it; below 860px it moves to the left edge and everything
 * stacks, because an alternating layout on a phone is just two columns of
 * ragged text.
 *
 * The markers are positioned with `calc` off the spine rather than magic
 * numbers, so moving the spine moves them with it.
 */
export function EventTimeline({ events }: Props) {
  return (
    <ol className="relative grid list-none gap-[clamp(30px,5vw,54px)] p-0">
      {/* The spine itself. Decorative — the dates carry the ordering. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-[linear-gradient(var(--color-blush),var(--color-border))] lg:left-1/2 lg:-translate-x-1/2"
      />

      {events.map((event, i) => (
        <li
          key={event.slug}
          data-reveal
          style={{ ["--d" as string]: `${i * 90}ms` }}
          className={[
            "relative pl-10 lg:w-1/2 lg:pl-0",
            i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:ml-[50%] lg:pl-12",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className={[
              "absolute top-2 h-3.5 w-3.5 rounded-full border-[1.6px] border-accent bg-ink",
              "left-px",
              i % 2 === 0 ? "lg:right-[-7px] lg:left-auto" : "lg:left-[-7px]",
            ].join(" ")}
          />

          <time
            dateTime={toDateTimeAttribute(event)}
            className="block text-[.72rem] tracking-[.26em] text-fg-muted uppercase"
          >
            {formatEventDate(event)} &middot; {formatEventTime(event)}
          </time>

          <h3 className="mt-3 text-[clamp(1.32rem,2.6vw,1.7rem)]">
            <Link href={`/events/${event.slug}`} className="transition-colors hover:text-accent-strong">
              {event.title}
            </Link>
          </h3>

          <p className={["mt-3 max-w-[42ch] text-[.97rem] text-fg-muted", i % 2 === 0 ? "lg:ml-auto" : ""].join(" ")}>
            {event.summary}
          </p>

          <p className="mt-2.5 text-[.86rem] text-fg-subtle">{event.location}</p>
        </li>
      ))}
    </ol>
  );
}
