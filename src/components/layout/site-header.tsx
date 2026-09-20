import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/committee", label: "Committee" },
  { href: "/partners", label: "Partners" },
] as const;

export function SiteHeader() {
  return (
    // `top` uses the safe-area inset rather than 0, so the bar clears the
    // notch when the site is installed to a phone home screen.
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-border bg-ink/85 backdrop-blur-md">
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-[1.02rem] tracking-[.16em] text-accent"
            aria-label={`${siteConfig.name} home`}
          >
            {/* The emblem alone, without the HTF letters, so the wordmark
                beside it is not saying the same thing twice. */}
            <Image
              src="/htf-emblem.png"
              alt=""
              width={30}
              height={30}
              priority
              className="h-[30px] w-auto"
            />
            HTF
          </Link>

          <nav aria-label="Main">
            <ul className="flex items-center gap-1 sm:gap-2">
              {navigation.map((item) => (
                <li key={item.href} className="hidden sm:block">
                  <Link
                    href={item.href}
                    className="block rounded-full px-3 py-2 text-[.84rem] tracking-[.12em] text-fg-muted uppercase transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  className="ml-1 block rounded-full bg-accent px-5 py-2 text-[.84rem] tracking-[.12em] text-accent-ink uppercase transition-colors hover:bg-accent-strong"
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
