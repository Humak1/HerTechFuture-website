import Image from "next/image";
import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { committee } from "@/content/committee";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Committee",
  description:
    "The team behind HerTech Future. Empowering women in tech, led by women in tech.",
  alternates: { canonical: "/committee" },
};

export default function CommitteePage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <p className="eyebrow">The team</p>
        <h1 className="mt-4 text-4xl sm:text-6xl">Committee</h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted">
          Empowering women in tech, led by women in tech.
        </p>
      </Container>

      <Section>
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {committee.map((member, i) => (
            <li
              key={member.name}
              data-reveal
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <Card
                interactive
                tinted={i % 2 === 1}
                className="flex h-full flex-col items-center gap-5 text-center"
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt=""
                    width={160}
                    height={160}
                    className="size-40 rounded-full"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-40 items-center justify-center rounded-full border border-blush bg-blush-soft font-display text-5xl text-accent"
                  >
                    {member.name.charAt(0)}
                  </span>
                )}

                <h2 className="font-display text-2xl tracking-[.12em] uppercase">
                  {member.name}
                </h2>

                {/* A definition list, because these are label/value pairs —
                    a screen reader announces "Role: Chair" as a pair, which
                    a pile of divs would never convey. */}
                <dl className="space-y-1.5 text-[.95rem] leading-relaxed">
                  <div>
                    <dt className="inline font-medium text-accent">Role: </dt>
                    <dd className="inline text-fg-muted">{member.role}</dd>
                  </div>
                  {member.studying ? (
                    <div>
                      <dt className="inline font-medium text-accent">
                        Studying:{" "}
                      </dt>
                      <dd className="inline text-fg-muted">
                        {member.studying}
                      </dd>
                    </div>
                  ) : null}
                  {member.funFact ? (
                    <div>
                      <dt className="inline font-medium text-accent">
                        Fun fact:{" "}
                      </dt>
                      <dd className="inline text-fg-muted">{member.funFact}</dd>
                    </div>
                  ) : null}
                </dl>

                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-[.72rem] font-medium tracking-[.16em] text-accent uppercase transition-colors hover:bg-accent hover:text-accent-ink"
                  >
                    <span className="sr-only">{member.name} on </span>
                    LinkedIn
                  </a>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-prose text-sm text-fg-subtle">
          Committee members are listed with their consent. To get in touch, use{" "}
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="underline underline-offset-4"
          >
            {siteConfig.links.email}
          </a>{" "}
          rather than contacting anyone individually.
        </p>
      </Section>
    </>
  );
}
