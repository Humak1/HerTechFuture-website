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

    /* ---- split the headline into words -------------------------------
       Walking text nodes rather than rewriting innerHTML keeps the markup
       and the accessible name intact: a screen reader still hears one
       sentence, not a list of fragments. */
    const title = document.querySelector(".hero-title");
    if (title) {
      let index = 0;
      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      const textNodes: Node[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      for (const node of textNodes) {
        const value = node.nodeValue ?? "";
        if (!value.trim()) continue;

        const frag = document.createDocumentFragment();
        for (const part of value.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const span = document.createElement("span");
          span.className = "wd";
          span.style.setProperty("--i", String(index++));
          span.textContent = part;
          frag.appendChild(span);
        }
        node.parentNode?.replaceChild(frag, node);
      }
    }

    /* ---- buttons lean toward the pointer ---------------------------- */
    const buttons = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const onMove = (event: PointerEvent) => {
      const btn = event.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      btn.style.transform = `translate(${x * 7}px, ${y * 5}px)`;
    };
    const onLeave = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.transform = "";
    };
    buttons.forEach((btn) => {
      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", onLeave);
    });

    /* ---- sparkle trail ----------------------------------------------
       Pointer devices only. It adds nothing on touch, where there is no
       cursor to trail. Throttled, or it snows. */
    const STAR = "M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z";
    let last = 0;
    const onTrail = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("class", "trail");
      svg.style.left = `${event.clientX - 6 + (Math.random() * 14 - 7)}px`;
      svg.style.top = `${event.clientY - 6 + (Math.random() * 14 - 7)}px`;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", STAR);
      svg.appendChild(path);
      document.body.appendChild(svg);
      window.setTimeout(() => svg.remove(), 1100);
    };

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) document.addEventListener("pointermove", onTrail, { passive: true });

    /* ---- teardown ----------------------------------------------------
       React runs effects twice in development Strict Mode, so without this
       every listener would be attached twice and the trail would double. */
    return () => {
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      io?.disconnect();
      buttons.forEach((btn) => {
        btn.removeEventListener("pointermove", onMove);
        btn.removeEventListener("pointerleave", onLeave);
      });
      if (fine) document.removeEventListener("pointermove", onTrail);
    };
  }, []);

  return null;
}
