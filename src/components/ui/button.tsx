import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const variantStyles = {
  primary: "bg-accent text-accent-ink border-accent hover:bg-accent-strong",
  secondary: "bg-transparent text-accent border-accent hover:bg-blush-soft",
} satisfies Record<Variant, string>;

const baseStyles = [
  "inline-flex items-center justify-center gap-2",
  "rounded-full border px-7",
  // Wide-tracked uppercase, echoing the tagline in the brand banner.
  "text-[.82rem] font-medium tracking-[.16em] uppercase",
  "transition-colors duration-300",
  // 48px minimum touch target — comfortably above the WCAG 2.2 floor and
  // what actually feels right under a thumb.
  "min-h-12",
  // The motion runtime writes a transform here on pointermove, so the
  // browser is told to expect it.
  "will-change-transform",
].join(" ");

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/**
 * A link that looks like a button, or a real button.
 *
 * The distinction is not cosmetic. A control that navigates must be an <a>,
 * so it can be opened in a new tab, copied, and announced as a link. A
 * control that performs an action must be a <button>. The union type below
 * means TypeScript will not let you pass both `href` and `onClick`, or
 * neither — the correct thing is the only thing that compiles.
 */
type ButtonProps = CommonProps &
  (
    | { href: string; external?: boolean; onClick?: never }
    | { href?: never; external?: never; onClick: () => void }
  );

export function Button({
  children,
  variant = "primary",
  className,
  href,
  external,
  onClick,
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    // rel="noopener noreferrer" stops the destination getting a handle on
    // our window, and stops us leaking the referring URL.
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
