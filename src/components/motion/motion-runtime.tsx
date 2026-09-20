"use client";

import { useEffect } from "react";

/**
 * THE MOTION RUNTIME
 * ------------------
 * One client component, mounted once in the root layout, that owns every
 * piece of behaviour on the site: scroll reveals, the ribbon's progress,
 * splitting the headline into words, button magnetism and the sparkle
 * trail.
 *
 * Why one component rather than several:
 *
 *  - Everything else in the app stays a Server Component. Only this file's
 *    code is sent to the browser, which is why the site still ships almost
 *    no JavaScript despite all the motion.
 *  - There is exactly one place to look when motion misbehaves.
 *  - It bails out immediately under `prefers-reduced-motion`, so there is
 *    a single, auditable guard rather than one per effect.
 *
 * It renders nothing. Every animation is defined in CSS; this only adds
 * the classes and custom properties that switch them on.
 */
export function MotionRuntime() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- the ribbon -------------------------------------------------
       Runs even under reduced motion: it is a position indicator, not an
       animation, and it only moves because the visitor is scrolling. */
    const ribbonPath = document.querySelector<SVGPathElement>(".ribbon path");
    let onScroll: (() => void) | undefined;

    if (ribbonPath) {
      const root = document.documentElement;
      root.style.setProperty("--len", String(ribbonPath.getTotalLength()));

      let ticking = false;
      const update = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        // Never fully empty — a sliver of ribbon shows from the first frame.
        root.style.setProperty("--progress", String(0.06 + p * 0.94));
        ticking = false;
      };
      onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    if (reduce) {
      return () => {
        if (onScroll) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      };
    }

    document.documentElement.classList.add("motion");

    /* ---- scroll reveals --------------------------------------------- */
    const revealed = Array.from(document.querySelectorAll("[data-reveal]"));
    let io: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );
      revealed.forEach((el) => io?.observe(el));
    } else {
      revealed.forEach((el) => el.classList.add("in"));
    }
  }, []);

  return null;
}
