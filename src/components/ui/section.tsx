import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  /** Optional heading rendered above the content. */
  title?: string;
  /** Optional supporting line under the heading. */
  lead?: string;
  /**
   * Which heading level to render. Defaults to h2.
   *
   * This matters for accessibility: a screen reader user navigates a page by
   * jumping between headings, so the levels must descend in order without
   * skipping. Exactly one h1 per page, and never pick a level because of how
   * big it looks -- size is what CSS is for.
   */
  as?: "h2" | "h3";
  /** An id so the section can be linked to directly, e.g. /#events. */
  id?: string;
  className?: string;
};

export function Section({
  children,
  title,
  lead,
  as: Heading = "h2",
  id,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {title ? (
          <div className="mb-10 max-w-2xl">
            <Heading className="text-3xl sm:text-4xl">{title}</Heading>
            {lead ? <p className="mt-4 text-lg text-fg-muted">{lead}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
