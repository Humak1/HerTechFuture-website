import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Small pill label: "Upcoming", a capacity, a category. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/40 bg-accent/10",
        "px-3 py-1 text-xs font-semibold tracking-wide text-accent-strong uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
