import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  /** Soft blush fill instead of the default near-white. */
  tinted?: boolean;
  interactive?: boolean;
  className?: string;
};

/**
 * The standard panel.
 *
 * Hairline borders rather than shadows, deliberately: borders make a group
 * of cards read as one ruled sheet, where shadows make them read as several
 * objects floating at different heights. For a page of equal-weight
 * content, the first is what you want.
 */
export function Card({ children, tinted = false, interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border p-7 sm:p-8",
        tinted ? "border-[#EFD8D6] bg-blush-soft" : "border-border bg-surface",
        interactive &&
          "transition-[border-color,transform,background] duration-[400ms] hover:-translate-y-1 hover:border-blush hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
