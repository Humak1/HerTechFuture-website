import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Work with HerTech Future: run a workshop, speak to our members, or support the society.",
  alternates: { canonical: "/partners" },
};

const offers = [
  {
    title: "Run a workshop",
    description:
      "Bring a session to our members. Practical and hands-on works best -- our most valued events have been the ones people left with something they could use.",
  },
  {
    title: "Speak at an event",
    description:
      "Tell our members what your work actually looks like day to day. Early-career engineers and researchers are as valuable here as senior leaders.",
  },
  {
    title: "Support the society",
    description:
      "Help fund the programme, or offer members access to your own events, mentoring or early-careers pipeline.",
  },
] as const;

export default function PartnersPage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl">Partner with us</h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted">
          We are a growing community of women in tech at Manchester Met, and we are
          straightforward to work with.
        </p>
      </Container>

      <Section title="What we can do together">
        <ul className="grid gap-4 sm:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.title}>
              <Card className="h-full">
                <h2 className="text-lg">{offer.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {offer.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Who we have worked with">
        <div className="max-w-prose space-y-5 text-fg-muted">
          <p>
            <strong className="text-fg">Hurdle Community</strong> &mdash; Nathaniel,
            its founder, ran a Secure the Job workshop on building an intentional job
            search rather than firing off applications.
          </p>
          <p>
            <strong className="text-fg">Amani Sheik Ibrahim</strong> &mdash; led Tech
            For Tomorrow, an interactive session on eco-innovation and the digital
            side of environmental progress.
          </p>
        </div>
      </Section>

      <Section>
        <Card className="text-center">
          <h2 className="text-2xl sm:text-3xl">Get in touch</h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Email us and tell us what you have in mind. We reply.
          </p>
          <div className="mt-8 flex justify-center">
            {/*
              A `mailto:` link, not a contact form. A form would mean receiving
              and storing messages, which means processing personal data --
              exactly what this site is designed not to do.
            */}
            <Button href={`mailto:${siteConfig.links.email}`}>
              {siteConfig.links.email}
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
