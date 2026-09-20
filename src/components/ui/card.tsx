import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  /** Adds a hover treatment. Only use on cards that are themselves a link. */
  interactive?: boolean;
  className?: string;
};

/**
 * The standard raised panel: event cards, committee cards, pillar cards.
 *
 * Deliberately has no opinion about its contents -- it handles the border,
 * the radius, the background and the hover state, and nothing else. A
 * component that tried to also lay out a title, a date and a button would only
 * fit the first thing it was written for.
 */
export function Card({ children, interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-surface p-6",
        interactive && "transition-colors duration-200 hover:border-accent/60 hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
