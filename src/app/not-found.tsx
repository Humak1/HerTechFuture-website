import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * The 404 page.
 *
 * Next.js renders this automatically for any unmatched URL, and whenever a
 * page calls `notFound()` -- which is what the event page does for a slug that
 * does not exist. It is served with a real 404 status code, so search engines
 * do not index it.
 */
export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This page doesn&rsquo;t exist</h1>
      <p className="mx-auto mt-6 max-w-md text-fg-muted">
        The link may be out of date, or the page may have moved. The events archive is
        probably what you are after.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/events" variant="secondary">
          See events
        </Button>
      </div>
    </Container>
  );
}
