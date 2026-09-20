import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * next/font downloads these at BUILD time and serves them from our own domain.
 * Three consequences, all good: no render-blocking request to Google, no
 * layout shift as the font swaps in, and no visitor IP addresses handed to a
 * third party -- which is also why this site needs no cookie banner.
 *
 * `variable` exposes each font as a CSS custom property, which globals.css
 * then maps onto --font-sans and --font-display.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

/**
 * Sitewide metadata. Page-level files export their own `metadata` to override
 * the title and description; anything they do not set is inherited from here.
 */
export const metadata: Metadata = {
  // Required for Next.js to turn relative URLs in Open Graph tags into
  // absolute ones. Without it, link previews silently break.
  metadataBase: new URL(siteConfig.url),

  title: {
    // "%s" is replaced by each page's own title.
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,

  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },

  // Tells search engines which URL is the real one, so a preview deployment
  // never competes with production in search results.
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `lang="en-GB"` is not decoration: it tells a screen reader which
    // pronunciation rules to use. Getting it wrong makes a page unlistenable.
    <html lang="en-GB" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <SiteHeader />

        {/*
          One <main> per page, with the id the skip link targets.
          `tabIndex={-1}` lets the skip link move focus here programmatically
          without adding <main> to the normal tab order.
        */}
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
