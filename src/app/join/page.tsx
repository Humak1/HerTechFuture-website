import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pillars } from "@/content/pillars";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Membership of HerTech Future is GBP 3 for the year, through the Manchester Met Students' Union.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl">Join us</h1>
        <p className="mt-6 max-w-2xl text-lg text-fg-muted">
          &pound;3 for the year. Cheaper than a meal deal, and it causes 100% fewer
          crumbs.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {/*
            Membership is bought on the Students' Union site, never here.
            Taking payment ourselves would pull in PCI-DSS obligations, refunds
            and charity finance rules -- all of it avoided by linking out.
          */}
          <Button href={siteConfig.links.union} external>
            Become a member
          </Button>
          <Button href={siteConfig.links.whatsapp} external variant="secondary">
            Join the WhatsApp group
          </Button>
        </div>
      </Container>

      <Section title="What you get">
        <ul className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <Card className="h-full">
                <h2 className="text-lg">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {pillar.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How it works">
        <ol className="max-w-prose space-y-4 text-fg-muted">
          <li>
            <strong className="text-fg">1.</strong> Buy membership on the
            Students&rsquo; Union website. They handle the payment and the member list
            &mdash; this site never sees your details.
          </li>
          <li>
            <strong className="text-fg">2.</strong> Join the WhatsApp group. That is
            where the day-to-day happens.
          </li>
          <li>
            <strong className="text-fg">3.</strong> Come to something. Any event, even
            if you know nobody. Especially if you know nobody.
          </li>
        </ol>
      </Section>
    </>
  );
}
