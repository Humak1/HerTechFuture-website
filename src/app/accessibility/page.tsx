import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "How this site is built to be usable by everyone, and how to tell us when it is not.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-prose">
        <h1 className="text-4xl sm:text-5xl">Accessibility</h1>

        <div className="mt-8 space-y-5 text-fg-muted">
          <p>
            A society about including people that tech has historically excluded should
            not run a website that excludes people. We aim to meet{" "}
            <a
              href="https://www.w3.org/TR/WCAG22/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-strong underline underline-offset-4"
            >
              WCAG 2.2 level AA
            </a>
            .
          </p>

          <h2 className="pt-4 text-2xl">What we have done</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Text contrast of at least 4.5:1 against its background throughout.</li>
            <li>
              Every control reachable and operable by keyboard, with a clearly visible
              focus ring.
            </li>
            <li>A &ldquo;skip to content&rdquo; link as the first thing you can focus.</li>
            <li>Headings in a logical order, one level at a time, one h1 per page.</li>
            <li>Semantic HTML throughout, so assistive technology gets real structure.</li>
            <li>Animation and smooth scrolling disabled for anyone who has asked their device to reduce motion.</li>
            <li>Touch targets at least 44 pixels.</li>
            <li>Line lengths capped for readability.</li>
          </ul>

          <h2 className="pt-4 text-2xl">Known limitations</h2>
          <p>
            This site is maintained by students alongside a degree. We test with
            Lighthouse and axe DevTools and by navigating without a mouse, but we have
            not had it audited professionally.
          </p>

          <h2 className="pt-4 text-2xl">Tell us</h2>
          <p>
            If something here is hard or impossible to use, email{" "}
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="text-accent-strong underline underline-offset-4"
            >
              {siteConfig.links.email}
            </a>
            . Tell us the page and what happened, and we will fix it.
          </p>
        </div>
      </div>
    </Container>
  );
}
