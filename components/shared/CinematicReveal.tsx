"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * Cinematic section reveal — used between major narrative sections
 * on the homepage for a slower, more dramatic entrance with subtle
 * blur defocus (1.2s, cubic-bezier(0.16, 1, 0.3, 1)).
 *
 * Distinct from AnimateOnScroll, which is used for individual content
 * blocks within sections (faster, lighter animation).
 */
export function CinematicReveal({
  children,
  className = "",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "80px" }
    );

    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(() => observer.observe(el));
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`section-cinematic-enter ${className}`}>
      {children}
    </div>
  );
}
