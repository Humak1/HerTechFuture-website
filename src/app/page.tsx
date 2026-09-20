import { EventCard } from "@/components/features/event-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pillars } from "@/content/pillars";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";
import { siteConfig } from "@/lib/site";

/**
 * The home page.
 *
 * This is a React Server Component -- the default in the App Router. It runs
 * on the server at build time, reads the content, and ships plain HTML. No
 * component code for this page ends up in the browser bundle at all, which is
 * why a site like this can load in well under a second on a phone.
 */
export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  // Show the next event if there is one, otherwise the most recent.
  const featured = upcoming[0] ?? past[0];

  return (
    <>
      {/* Hero */}
      <Container className="py-20 sm:py-28">
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">
          {siteConfig.university.shortName}
        </p>

        {/* Exactly one h1 per page, and it says what the page is. */}
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-7xl">
          The future of tech{" "}
          <span className="text-accent">is hers</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-fg-muted sm:text-xl">
          {siteConfig.name} is where women in tech find their people &mdash; a space to
          learn, grow and hype each other up. From first steps to big dreams.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/join">Join the society</Button>
          <Button href="/events" variant="secondary">
            See what we run
          </Button>
        </div>
      </Container>

      {/* Featured event. Rendered only if one exists -- never show an empty shell. */}
      {featured ? (
        <Section title={upcoming.length > 0 ? "Next up" : "Most recently"}>
          <div className="max-w-2xl">
            <EventCard event={featured} upcoming={upcoming.length > 0} />
          </div>
        </Section>
      ) : null}

      {/* What we offer */}
      <Section
        title="What we offer"
        lead="Five things the society exists to do, and holds itself to."
      >
        {/*
          `map` over data rather than writing five near-identical blocks.
          `key` must be stable and unique -- React uses it to match elements
          between renders. An array index works only while nothing reorders;
          the title is the honest choice here.
        */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <Card className="h-full">
                <h3 className="text-lg">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {pillar.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Closing call to action */}
      <Section>
        <Card className="text-center">
          <h2 className="text-2xl sm:text-3xl">Open to everyone who wants in</h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Women and those who identify as women studying a computing-related degree
            &mdash; and anyone interested in technology who wants to be part of it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={siteConfig.links.union} external>
              Join via the Students&rsquo; Union
            </Button>
            <Button href={siteConfig.links.instagram} external variant="secondary">
              Follow on Instagram
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
