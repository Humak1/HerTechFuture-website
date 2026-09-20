import { Container } from "@/components/ui/container";

/**
 * A single line, given a whole band of the page.
 *
 * The bow line art is lifted from the brand banner and sits behind the
 * quote at low opacity. It is hidden below 700px: at phone width it would
 * either crowd the text or shrink to an unreadable squiggle.
 */
export function Manifesto() {
  return (
    <section
      id="story"
      className="relative my-[clamp(40px,7vw,80px)] bg-blush-soft py-[clamp(56px,8vw,96px)]"
    >
      <svg
        className="absolute top-1/2 right-[4%] hidden w-[clamp(90px,16vw,200px)] -translate-y-1/2 opacity-80 sm:block"
        viewBox="0 0 200 120"
        aria-hidden="true"
      >
        <path
          d="M100 60c-20-34-62-42-72-18-8 20 22 30 48 26 22-3 44-12 52-26 9-16 38-20 46-2 9 20-18 32-46 28-24-3-48-14-58-30"
          fill="none"
          stroke="var(--color-blush)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      <Container>
        <p className="eyebrow" data-reveal>
          Why it exists
        </p>

        <blockquote
          className="mt-5 max-w-[22ch] font-display text-[clamp(1.7rem,4.4vw,3rem)] leading-tight text-accent"
          data-reveal
          style={{ ["--d" as string]: "120ms" }}
        >
          No woman should feel like she&rsquo;s walking this path alone.
        </blockquote>

        <cite
          className="mt-6 block text-[.74rem] tracking-[.3em] text-fg-muted uppercase not-italic"
          data-reveal
          style={{ ["--d" as string]: "240ms" }}
        >
          Huma &mdash; founder &amp; chair
        </cite>
      </Container>
    </section>
  );
}
