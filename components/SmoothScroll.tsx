"use client";

/**
 * Lenis smooth scrolling — site-wide inertia/lerp on wheel scrolling.
 * Native scroll events keep firing, so GSAP ScrollTrigger pins (hero,
 * galerie) and the reveal/parallax handlers stay in sync for free.
 * Touch is left native (mobile untouched); prefers-reduced-motion = off.
 */

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let rafId = 0;
    let disposed = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
      });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
