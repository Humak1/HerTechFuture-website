import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

/**
 * Navigation, defined as data rather than as repeated JSX.
 *
 * Adding a page is one entry here, not a copy-pasted <Link> that has to be
 * kept in step with the footer.
 */
const navigation = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/committee", label: "Committee" },
  { href: "/partners", label: "Partners" },
] as const;

export function SiteHeader() {
  return (
    // <header> and <nav> are landmark elements: screen reader users can jump
    // straight to them. A <div> with a class of "header" gives them nothing.
    <header className="sticky top-0 z-40 border-b border-border bg-ink/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight"
            // Tells assistive tech this link goes home, where the visible
            // "HTF" abbreviation alone would be read letter by letter.
            aria-label={`${siteConfig.name} home`}
          >
            <span className="text-accent">HTF</span>
          </Link>

          <nav aria-label="Main">
            <ul className="flex items-center gap-1 sm:gap-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-full px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  className="ml-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
                >
                  Join
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
