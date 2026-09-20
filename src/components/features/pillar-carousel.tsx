import { Card } from "@/components/ui/card";
import { pillars } from "@/content/pillars";

/**
 * A short label naming what each promise actually is. Keyed by pillar title
 * so it stays attached to the right one if the order ever changes.
 *
 * These earn their place by adding information; they are not decoration.
 */
const tags: Record<string, string> = {
  "Workshops & events": "Learning",
  Mentorship: "Growth",
  "Networking & community": "People",
  "Safe spaces": "Belonging",
  "Your voice matters": "Voice",
};

const CIRCUIT = (
  <svg
    className="pointer-events-none absolute -top-4 -right-3 w-32 opacity-45"
    viewBox="0 0 200 140"
    aria-hidden="true"
  >
    <g fill="none" stroke="var(--color-blush)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M196 10h-40a10 10 0 0 0-10 10v18a10 10 0 0 1-10 10h-30" />
      <path d="M196 46h-24a10 10 0 0 0-10 10v16a10 10 0 0 1-10 10h-42" />
    </g>
    <circle cx="106" cy="48" r="4.5" fill="var(--color-blush)" />
    <circle cx="110" cy="82" r="4" fill="var(--color-blush)" />
  </svg>
);

function PillarCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <Card
      interactive
      tinted={index % 2 === 1}
      className="flex w-[clamp(268px,32vw,380px)] flex-none flex-col gap-3"
    >
      {index % 4 === 0 ? CIRCUIT : null}
      <span className="text-[.64rem] font-medium tracking-[.28em] text-fg-muted uppercase opacity-75">
        {tags[title] ?? "HTF"}
      </span>
      <h3 className="text-[clamp(1.28rem,2vw,1.55rem)]">{title}</h3>
      <p className="text-[.95rem] leading-relaxed text-fg-muted">{description}</p>
    </Card>
  );
}

/**
 * The five promises on a continuous loop.
 *
 * The track renders the set twice and slides exactly -50%: the instant the
 * animation completes, the second copy is sitting where the first began, so
 * the loop restarts with no visible seam. The duplicate set is aria-hidden,
 * so a screen reader hears five promises rather than ten.
 *
 * Hovering or tabbing into the track pauses it. A carousel you cannot stop
 * is a carousel nobody reads.
 */
export function PillarCarousel() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {pillars.map((pillar, i) => (
          <PillarCard key={pillar.title} index={i} title={pillar.title} description={pillar.description} />
        ))}
        <div className="contents" aria-hidden="true">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={`${pillar.title}-clone`}
              index={i}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
