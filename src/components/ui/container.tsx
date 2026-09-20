import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Centres content and caps its width.
 *
 * Every page uses this, which is exactly why it exists: the maximum width and
 * the side gutter are decided in one place. Change `max-w-5xl` here and the
 * whole site re-aligns together instead of drifting page by page.
 *
 * `px-5` guarantees text never touches the edge of a phone screen.
 */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-5xl px-5", className)}>{children}</div>;
}
