import { EventTimeline } from "@/components/features/event-timeline";
import { Hero } from "@/components/features/hero";
import { Manifesto } from "@/components/features/manifesto";
import { PillarCarousel } from "@/components/features/pillar-carousel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";
import { siteConfig } from "@/lib/site";

/**
 * The home page.
 *
 * A Server Component, like every section it renders. The whole page is
 * generated as HTML at build time; the only JavaScript that reaches the
 * browser is the motion runtime mounted in the layout.
 */
export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const recent = [...upcoming, ...past].slice(0, 3);

  return (
    <>
      <Hero />
      <Manifesto />

      <section id="offer" className="py-[clamp(56px,8vw,104px)]">
        <Container>
          <div className="mb-[clamp(36px,5vw,62px)] max-w-[40ch]">
            <p className="eyebrow" data-reveal>
              What we do
            </p>
            <h2 className="mt-3.5 text-[clamp(2rem,4.6vw,3.1rem)]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              Five things we hold ourselves to
            </h2>
            <p className="mt-4 text-fg-muted" data-reveal style={{ ["--d" as string]: "160ms" }}>
              Not a mission statement nobody reads. These are the promises the committee
              gets judged on each term.
            </p>
          </div>
        </Container>

        {/* Outside the Container on purpose: the track runs edge to edge. */}
        <PillarCarousel />
      </section>

      <Section
        id="events"
        title="Everything we&rsquo;ve run"
        lead="Tickets are handled by the Students&rsquo; Union, so we never hold your details."
      >
        <EventTimeline events={recent} />

        <div className="mt-12 flex justify-center">
          <Button href="/events" variant="secondary">
            The full archive
          </Button>
        </div>
      </Section>

      <section className="mt-[clamp(50px,8vw,96px)] bg-accent py-[clamp(62px,9vw,110px)] text-accent-ink">
        <Container>
          <p className="eyebrow text-blush">Membership</p>
          <h2 className="mt-3.5 text-[clamp(2.1rem,5.4vw,3.6rem)] text-accent-ink">
            Cheaper than a meal deal
          </h2>
          <p className="mt-5 max-w-[44ch] text-[#F0DAD9]">
            And it causes one hundred per cent fewer crumbs. One year, every event,
            the whole community.
          </p>

          <p className="mt-7 font-display text-[clamp(3.4rem,11vw,7rem)] leading-none text-blush">
            &pound;3
            <span className="mt-3 block font-sans text-[.8rem] tracking-[.28em] text-[#E7C9C8] uppercase">
              per year &middot; via the Students&rsquo; Union
            </span>
          </p>

          <div className="mt-9">
            <Button href={siteConfig.links.union} external className="border-blush bg-blush text-accent hover:bg-ink">
              Become a member
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
