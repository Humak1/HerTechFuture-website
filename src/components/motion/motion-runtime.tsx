"use client";

import { useEffect } from "react";

/**
 * THE MOTION RUNTIME
 * ------------------
 * One client component, mounted once in the root layout, that owns every
 * piece of behaviour on the site.
 *
 * One file rather than several: everything else stays a Server Component,
 * so this is the only JavaScript that reaches the browser; there is one
 * place to look when motion misbehaves; and the reduced-motion guard is a
 * single auditable check rather than one per effect.
 *
 * It renders nothing. Every animation lives in CSS — this only adds the
 * classes and custom properties that switch them on.
 */
export function MotionRuntime() {
  useEffect(() => {
    // Behaviour is added here one capability at a time.
  }, []);

  return null;
}
