import type { Metadata } from "next";
import { Jost, Prata } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * Prata is a high-contrast Didone, chosen because it is the closest widely
 * available match to the society's wordmark. Jost is a geometric sans that
 * suits the wide-tracked uppercase labels in the brand artwork.
 *
 * next/font downloads both at BUILD time and serves them from our own
 * domain: no render-blocking request to Google, no layout shift as the
 * font swaps in, and no visitor IP addresses handed to a third party —
 * which is also why this site needs no cookie banner.
 */
const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-prata",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
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
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${jost.variable} ${prata.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <SiteHeader />

        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <SiteFooter />

        {/* Mounted last: it reads the DOM the rest of the page produced. */}
        <MotionRuntime />
      </body>
    </html>
  );
}
