/**
 * The ribbon that runs down the left margin and inks itself in as you
 * scroll, drawn from the bow motif in the brand banner.
 *
 * This is a Server Component: it renders static SVG and nothing more. The
 * scroll position is fed in by the motion runtime, which sets a `--progress`
 * custom property on <html>; the stroke offset is calculated from that in
 * CSS. Markup stays on the server, only the listener ships to the browser.
 */
export function Ribbon() {
  return (
    <svg className="ribbon" viewBox="0 0 60 1000" preserveAspectRatio="none" aria-hidden="true">
      <path d="M30 0 C 6 120, 54 210, 30 330 S 4 520, 30 640 S 56 800, 30 1000" />
    </svg>
  );
}
