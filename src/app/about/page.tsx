import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pillars } from "@/content/pillars";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Why HerTech Future exists, what it offers, and who it is for.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <h1 className="max-w-3xl text-4xl sm:text-6xl">About {siteConfig.name}</h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted">
          We believe the future of technology is not just bright &mdash; it&rsquo;s female.
        </p>
      </Container>

      <Section title="Our mission">
        {/*
          `max-w-prose` caps the line length at roughly 65 characters. Long
          lines are measurably harder to read: the eye loses its place on the
          return sweep. Typography doing accessibility work.
        */}
        <div className="max-w-prose space-y-5 text-fg-muted">
          <p>
            {siteConfig.name} is dedicated to creating an inclusive and supportive
            community for women and those who identify as women pursuing careers in the
            tech industry. We are here to break down barriers, challenge stereotypes,
            and inspire the next generation of female innovators, leaders and
            change-makers.
          </p>
          <p>
            We empower women by providing resources, networking opportunities and
            programmes that foster personal and professional growth. We are a
            goal-oriented society, committed to helping you meet your goals and grow
            both professionally and personally &mdash; whether you are just starting out
            in tech or looking to move forward in it.
          </p>
        </div>
      </Section>

      <Section title="What we offer">
        <ul className="grid gap-4 sm:grid-cols-2">
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

      <Section title="Why it started">
        <div className="max-w-prose space-y-5 text-fg-muted">
          <p>
            HerTech Future was founded to pay forward the support its founder received
            from the women around her &mdash; the ones who said she belonged in the room
            when she was not sure she did.
          </p>
          <blockquote className="border-l-2 border-accent pl-5 text-lg text-fg italic">
            &ldquo;I wouldn&rsquo;t be where I am today without the help of incredible
            women who encouraged me, even when I was trembling with fear.&rdquo;
          </blockquote>
          <p>
            The society is the result: a blueprint for women taking their first steps
            into tech, and a reminder that no woman should feel like she is walking that
            path alone.
          </p>
        </div>
      </Section>

      <Section title="Who can join">
        <div className="max-w-prose space-y-5 text-fg-muted">
          <p>
            Women and those who identify as women studying a computer science-related
            degree &mdash; and anyone interested in technology who wants to be part of a
            community that takes it seriously. Diverse perspectives drive innovation,
            and everyone can contribute to shaping the future of tech.
          </p>
        </div>
      </Section>
    </>
  );
}
