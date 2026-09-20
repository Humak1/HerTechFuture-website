/**
 * Joins CSS class names, dropping anything falsy.
 *
 * This exists so components can do conditional classes readably:
 *
 *   cn("rounded-xl p-4", isActive && "bg-accent", className)
 *
 * without producing `"rounded-xl p-4 false undefined"` in the DOM.
 *
 * Larger projects reach for `clsx` + `tailwind-merge` to also resolve
 * conflicting Tailwind classes. Eight lines of our own is the right call here:
 * one less dependency to audit and keep patched, and we do not have the
 * class-conflict problem those libraries solve.
 */
export type ClassValue = string | number | null | undefined | false;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
