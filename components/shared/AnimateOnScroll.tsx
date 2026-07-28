"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface Props {
  children: ReactNode;
  className?: string;
  /** Délai avant l'animation, en secondes. */
  delay?: number;
  /** Seuil d'intersection (0–1). */
  threshold?: number;
  /** Direction d'entrée — d'où l'élément vient. Default: "up". */
  direction?: Direction;
  /** Distance de translation, en pixels. Default: 30. */
  distance?: number;
  /** Durée de la transition, en secondes. Default: 0.8. */
  duration?: number;
  /** Courbe d'easing CSS (ex: cubic-bezier(...)). Default: out-quart. */
  easing?: string;
  /** Rotation initiale, en degrés (revient à 0). Default: 0. */
  rotate?: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  direction = "up",
  distance = 30,
  duration = 0.8,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  rotate = 0,
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
      { threshold, rootMargin: "50px" }
    );

    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(() => observer.observe(el));
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  // Calcule la translation initiale selon la direction (l'élément vient DE cette direction)
  let tx = 0;
  let ty = 0;
  switch (direction) {
    case "up":
      ty = distance;
      break;
    case "down":
      ty = -distance;
      break;
    case "left":
      tx = -distance;
      break;
    case "right":
      tx = distance;
      break;
  }

  const style: CSSProperties & Record<string, string | number> = {
    transitionDelay: `${delay}s`,
    "--anim-tx": `${tx}px`,
    "--anim-ty": `${ty}px`,
    "--anim-rotate": `${rotate}deg`,
    "--anim-duration": `${duration}s`,
    "--anim-easing": easing,
  };

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
