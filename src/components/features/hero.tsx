import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

/** Positions for the ambient sparkles, taken from the brand artwork. */
const sparkles = [
  { top: "14%", left: "6%", size: 14, delay: "0s" },
  { top: "8%", right: "16%", size: 22, delay: ".9s" },
  { top: "46%", right: "8%", size: 12, delay: "1.7s" },
  { bottom: "16%", left: "22%", size: 10, delay: "2.4s" },
] as const;

const STAR = "M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z";

/**
 * The hero.
 *
 * A Server Component: this renders to plain HTML and ships no JavaScript.
 * The choreography — words punching in, the wash lifting, the pen drawing
 * the underline — is entirely CSS, switched on by the `motion` class that
 * the runtime adds. If JavaScript never runs, every element here is
 * present, readable and correctly positioned.
 */
export function Hero() {
  return (
    <section className="relative py-[clamp(72px,12vw,150px)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {sparkles.map((s, i) => (
          <svg
            key={i}
            className="sparkle"
            viewBox="0 0 24 24"
            style={{
              top: "top" in s ? s.top : undefined,
              bottom: "bottom" in s ? s.bottom : undefined,
              left: "left" in s ? s.left : undefined,
              right: "right" in s ? s.right : undefined,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
          >
            <path d={STAR} />
          </svg>
        ))}
      </div>

      <Container className="relative z-10 flex flex-col items-center gap-[clamp(26px,3.4vw,40px)] text-center">
        {/* The mark sits between two hairlines that fade outward, echoing
            the symmetry of the brand banner rather than hugging a corner. */}
        <div className="flex w-[min(560px,100%)] items-center gap-[clamp(18px,4vw,40px)]">
          <span
            className="h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--color-blush))]"
            aria-hidden="true"
          />
          <Image
            src="/htf-mark.png"
            alt="Her Tech Future"
            width={128}
            height={141}
            priority
            className="mark block w-[clamp(92px,11vw,128px)] flex-none"
          />
          <span
            className="h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--color-blush))]"
            aria-hidden="true"
          />
        </div>

        <div className="hero-wash" aria-hidden="true" />

        <h1 className="hero-title relative z-[4] max-w-[15ch] text-[clamp(2.6rem,7vw,5.4rem)]">
          The future of tech{" "}
          <em className="relative text-accent-strong not-italic">
            is hers
            <span className="hero-pen" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 21l1.4-4.2L16.1 5.1a2 2 0 0 1 2.8 0l.9.9a2 2 0 0 1 0 2.8L8.1 20.5 3 21z" />
                <path d="M14.6 6.6l2.8 2.8" />
              </svg>
            </span>
          </em>
        </h1>

        <p className="hero-lede max-w-[52ch] text-[clamp(1.05rem,2.1vw,1.3rem)] text-fg">
          A society for women in tech who are done waiting to be picked.
          Workshops, industry rooms, and people who will tell you the truth
          about the job market.
        </p>

        <div className="hero-actions flex flex-wrap justify-center gap-3.5">
          <Button href="/join">Join the society</Button>
          <Button href="/events" variant="secondary">
            See what we run
          </Button>
        </div>

        <p className="sr-only">{siteConfig.tagline}</p>
      </Container>
    </section>
  );
}
