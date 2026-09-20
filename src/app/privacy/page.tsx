import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "This website collects no personal data and sets no cookies.",
  alternates: { canonical: "/privacy" },
};

/**
 * This page is short because the site genuinely does very little.
 *
 * If you ever add a form, an analytics script, an embedded video or a login,
 * this page stops being true -- update it in the same commit as the change,
 * not afterwards.
 */
export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-prose">
        <h1 className="text-4xl sm:text-5xl">Privacy</h1>

        <div className="mt-8 space-y-5 text-fg-muted">
          <p>
            This website does not collect personal data. There are no accounts, no
            forms, no sign-ups and no newsletter.
          </p>
          <p>
            It sets no cookies and runs no analytics or tracking scripts of any kind,
            which is why you have not been shown a cookie banner. Fonts are served
            from this domain rather than from a third party, so no request about your
            visit goes anywhere else.
          </p>

          <h2 className="pt-4 text-2xl">Links to other sites</h2>
          <p>
            Buying membership, booking event tickets and joining the WhatsApp group
            all happen on other websites &mdash; the Manchester Met Students&rsquo;
            Union, Instagram and WhatsApp. Once you follow one of those links, that
            organisation&rsquo;s own privacy policy applies, and any details you give
            them are held by them, not by us.
          </p>

          <h2 className="pt-4 text-2xl">Hosting</h2>
          <p>
            The site is served by Vercel, which keeps standard server logs including
            IP addresses for security and abuse prevention. We do not access or
            analyse these.
          </p>

          <h2 className="pt-4 text-2xl">People named on this site</h2>
          <p>
            Committee members are named with their consent. If you appear on this site
            and would like to be removed, email{" "}
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="text-accent-strong underline underline-offset-4"
            >
              {siteConfig.links.email}
            </a>{" "}
            and we will take it down.
          </p>

          <h2 className="pt-4 text-2xl">Contact</h2>
          <p>
            Questions about this page:{" "}
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="text-accent-strong underline underline-offset-4"
            >
              {siteConfig.links.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
