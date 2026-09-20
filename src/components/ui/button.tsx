import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

/**
 * Style lookup keyed by variant.
 *
 * A plain object beats an if/else chain here: adding a "ghost" variant later
 * means adding one line, and TypeScript will immediately flag every place that
 * needs to know about it. `satisfies` checks the shape without widening the
 * type, so `Record<Variant, string>` stays enforced.
 */
const variantStyles = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-strong focus-visible:bg-accent-strong",
  secondary:
    "border border-border bg-surface text-fg hover:bg-surface-2 hover:border-fg-subtle",
} satisfies Record<Variant, string>;

const baseStyles = [
  "inline-flex items-center justify-center gap-2",
  "rounded-full px-6 py-3",
  "text-sm font-semibold",
  // `transition-colors` only, never `transition-all` -- animating layout
  // properties is what makes a page feel janky on a mid-range phone.
  "transition-colors duration-200",
  // 44px minimum touch target. WCAG 2.2 "Target Size" asks for 24px; 44px is
  // Apple's guidance and is what actually feels right under a thumb.
  "min-h-11",
].join(" ");

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/**
 * A link that looks like a button, or a real button.
 *
 * The distinction is not cosmetic. A control that navigates somewhere must be
 * an <a> -- so it can be opened in a new tab, copied, and announced as a link
 * by a screen reader. A control that performs an action must be a <button>.
 * Getting this wrong is one of the most common accessibility failures on the
 * web, so the component makes the right thing the easy thing.
 *
 * The union type below means TypeScript will not let you pass both `href` and
 * `onClick`, or neither.
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
    // `rel="noopener noreferrer"` on external links stops the destination page
    // getting a handle on our window via `window.opener`, and stops us leaking
    // the referring URL. Modern browsers imply `noopener` for target="_blank",
    // but stating it costs nothing and covers older ones.
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }

    // next/link for internal navigation: it prefetches the destination and
    // swaps the page without a full reload.
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
