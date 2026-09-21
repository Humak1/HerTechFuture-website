import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const secondaryLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

export function SiteFooter() {
  // Computed at build time. The site rebuilds on every push, so this stays
  // current without any client-side JavaScript.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg">
              <span className="text-accent">{siteConfig.shortName}</span>{" "}
              &mdash; {siteConfig.tagline}
            </p>

            {/*
              The independence line. This site is the society's own, not an
              official university page, and membership genuinely is handled by
              the Students' Union. Saying so plainly, in the footer of every
              page, keeps the relationship unambiguous and costs one sentence.
            */}
            <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
              {siteConfig.name} is a student society at{" "}
              {siteConfig.university.name}. Official membership is handled by
              the{" "}
              <a
                href={siteConfig.links.union}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-fg-muted"
              >
                Students&rsquo; Union
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors hover:text-fg"
            >
              Instagram
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              {siteConfig.links.email}
            </a>
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-fg-subtle">
          &copy; {year} {siteConfig.name}. Built by{" "}
          <a
            href="https://www.linkedin.com/in/huma-k-878392216/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-accent"
          >
            Huma Kiyani
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}
