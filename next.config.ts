import type { NextConfig } from "next";

/**
 * Content Security Policy (CSP).
 *
 * A CSP tells the browser which sources it is allowed to load code, styles,
 * images and fonts from. It is the single most effective defence against
 * cross-site scripting: even if an attacker managed to inject a <script> tag
 * into a page, the browser would refuse to execute it because it does not come
 * from an allowed source.
 *
 * Each directive is explained inline below.
 */
const contentSecurityPolicy = [
  // Default fallback for any resource type not listed explicitly: same origin only.
  "default-src 'self'",

  // Scripts. 'unsafe-inline' is here because Next.js inlines a small bootstrap
  // script for hydration and route prefetching.
  //
  // Honest trade-off: 'unsafe-inline' weakens the XSS protection a CSP gives you.
  // For this site the residual risk is low -- there are no forms, no user input,
  // no third-party scripts, and every page is statically generated from content
  // in this repository, so there is no path by which attacker-controlled text
  // reaches the page. The stricter alternative is a nonce-based CSP generated in
  // `middleware.ts`, but that forces every page to render dynamically, which
  // gives up static generation. Revisit this the moment the site accepts input.
  "script-src 'self' 'unsafe-inline'",

  // Styles. Next.js and Tailwind inject a small amount of inline CSS.
  // Inline styles are far less dangerous than inline scripts.
  "style-src 'self' 'unsafe-inline'",

  // Images: our own, plus data: URIs (used for tiny inline SVGs) and blob:
  // (used by the Next.js image optimiser).
  "img-src 'self' data: blob:",

  // Fonts served from our own origin. next/font self-hosts Google Fonts at
  // build time, so no external font host is needed -- which is also faster
  // and avoids leaking visitors' IP addresses to a third party.
  "font-src 'self' data:",

  // Block <object>, <embed> and <applet> outright. Nothing legitimate uses them.
  "object-src 'none'",

  // Stop a hijacked page from rewriting the base URL that relative links resolve against.
  "base-uri 'self'",

  // Forms may only submit back to this origin. We have no forms, so this is belt and braces.
  "form-action 'self'",

  // Nobody may embed this site in an <iframe>. Defeats clickjacking.
  "frame-ancestors 'none'",

  // Silently upgrade any stray http:// sub-resource to https://.
  "upgrade-insecure-requests",
].join("; ");

/**
 * Security response headers, applied to every route.
 *
 * You can verify these after deploying at https://securityheaders.com --
 * this set should score an A.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    // HSTS: after the first visit, the browser refuses to talk to this domain
    // over plain http for two years. `preload` makes it eligible for the
    // browser-baked-in list. Only ever set this once you are certain the site
    // and every subdomain will always be served over https -- it is hard to undo.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Stops the browser guessing a file's type from its contents. Prevents an
    // uploaded ".txt" being sniffed and executed as JavaScript.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Send the full URL as the referrer within our own site, but only the bare
    // origin when linking out. Other sites do not need our full paths.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Explicitly decline browser capabilities this site has no business using.
    // If the site is ever compromised, it still cannot ask for the camera.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    // Legacy header, superseded by frame-ancestors above, but still honoured
    // by some older browsers. Cheap to keep.
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
  // Fail the production build if there are any TypeScript errors. This is the
  // default, written out explicitly so nobody is tempted to flip it to `true`
  // to make a red build go away.
  //
  // There is deliberately no matching `eslint` key: as of Next.js 16,
  // `next build` no longer runs the linter. Linting is a separate step --
  // `npm run lint` locally, and its own step in the CI workflow.
  typescript: { ignoreBuildErrors: false },

  // Remove the `X-Powered-By: Next.js` header. Telling attackers exactly what
  // you run is free reconnaissance for them.
  poweredByHeader: false,

  async headers() {
    return [
      {
        // ":path*" matches every route on the site.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
