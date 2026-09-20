import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { committee } from "@/content/committee";

export const metadata: Metadata = {
  title: "Committee",
  description: "The team behind HerTech Future. Empowering women in tech, led by women in tech.",
  alternates: { canonical: "/committee" },
};

export default function CommitteePage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl">Committee</h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted">
          Empowering women in tech, led by women in tech.
        </p>
      </Container>

      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committee.map((member) => (
            <li key={member.name}>
              <Card className="h-full">
                <h2 className="text-lg">{member.name}</h2>
                <p className="mt-1 text-sm font-medium text-accent-strong">
                  {member.role}
                </p>
                {member.blurb ? (
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {member.blurb}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>

        {/*
          No email addresses here. Publishing a committee member's address puts
          it in front of every scraper on the internet; the society address in
          the footer is the right route in.
        */}
        <p className="mt-10 max-w-prose text-sm text-fg-subtle">
          Committee members are listed with their consent. To get in touch, use the
          society email in the footer rather than contacting anyone individually.
        </p>
      </Section>
    </>
  );
}
