/**
 * "Skip to content" link.
 *
 * A keyboard user landing on a page starts at the top, which means tabbing
 * through every navigation item before reaching the content -- on every single
 * page. This link is the fix: it is visually hidden until it receives focus,
 * at which point it appears as the first thing you can press.
 *
 * It is the cheapest accessibility win there is, and its absence is one of the
 * first things an audit flags. It must be the first focusable element in the
 * document, which is why it sits at the very top of the body in layout.tsx.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-accent-ink"
    >
      Skip to content
    </a>
  );
}
