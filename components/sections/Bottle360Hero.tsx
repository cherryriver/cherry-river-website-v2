"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const SCRUB_TRACK_VH = 220; // scroll distance (in vh) over which the bottle completes its turn

export function Bottle360Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let rafId = 0;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Entrance — staggered editorial reveal
        gsap.fromTo(
          contentRef.current!.querySelectorAll("[data-reveal]"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.2 }
        );
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.35 }
        );

        // Scroll-scrubbed rotation — scroll drives video time while section is pinned
        let targetTime = 0;
        let currentTime = 0;
        let scrubbing = false;

        const ambient = () => {
          // gentle idle rotation before the user scrolls
          if (!scrubbing && video.paused) {
            video.playbackRate = 0.55;
            video.play().catch(() => {});
          }
        };

        video.addEventListener("loadedmetadata", ambient, { once: true });
        if (video.readyState >= 1) ambient();

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${SCRUB_TRACK_VH}%`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            if (!video.duration) return;
            if (self.progress > 0.002) {
              if (!scrubbing) {
                scrubbing = true;
                video.pause();
                currentTime = video.currentTime;
              }
              // leave a small tail so the loop seam never shows mid-scrub
              targetTime = self.progress * (video.duration - 0.15);
            } else if (scrubbing) {
              scrubbing = false;
              ambient();
            }
          },
        });

        const smoothSeek = () => {
          if (scrubbing && video.duration) {
            currentTime += (targetTime - currentTime) * 0.14;
            if (Math.abs(video.currentTime - currentTime) > 1 / 48) {
              video.currentTime = currentTime;
            }
          }
          rafId = requestAnimationFrame(smoothSeek);
        };
        rafId = requestAnimationFrame(smoothSeek);
      }, section);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
      style={{ background: "#FAFAF8" }}
      aria-label="Accueil Cherry River"
    >
      {/* faint gold hairline grounding the composition */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(201,168,76,0.35)" }}
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-12 md:gap-6 md:px-20 md:py-0">
        {/* Editorial copy — left */}
        <div ref={contentRef} className="order-2 md:order-1 md:col-span-6 lg:col-span-5">
          <p
            data-reveal
            className="font-body text-[0.62rem] uppercase tracking-[0.42em]"
            style={{ color: "#C9A84C" }}
          >
            Distillerie artisanale — Magog &amp; Québec
          </p>

          <h1
            data-reveal
            className={`${cormorant.className} mt-7 font-light leading-[1.05]`}
            style={{ fontSize: "clamp(2.6rem, 5.2vw, 4.6rem)", color: "#1A1A1A" }}
          >
            Boissons modernes
            <br />
            <em className="font-normal" style={{ color: "#6B6258" }}>
              élaborées au Québec
            </em>
          </h1>

          <div data-reveal className="mt-8 h-px w-16" style={{ background: "#C9A84C", opacity: 0.6 }} aria-hidden />

          <p
            data-reveal
            className="mt-8 max-w-md font-body font-light"
            style={{ fontSize: "0.92rem", lineHeight: 1.9, color: "#6B6258", letterSpacing: "0.04em" }}
          >
            Un seul créateur. Tout l&apos;univers du cocktail.
          </p>

          <div data-reveal className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-5">
            <Link
              href="/produits"
              className="btn-tactile inline-flex items-center justify-center border px-9 py-4 font-body text-[0.65rem] uppercase tracking-[0.24em] transition-all duration-500 ease-premium hover:bg-[#1A1A1A] hover:text-[#FAFAF8]"
              style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}
            >
              Découvrir nos créations
            </Link>
            <Link
              href="/experiences"
              className="btn-tactile inline-flex items-center justify-center border px-9 py-4 font-body text-[0.65rem] uppercase tracking-[0.24em] transition-all duration-500 ease-premium hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#090909]"
              style={{ borderColor: "rgba(26,26,26,0.25)", color: "#6B6258" }}
            >
              Réserver une visite
            </Link>
          </div>

          <p
            data-reveal
            className="mt-14 hidden font-body text-[0.6rem] uppercase tracking-[0.32em] md:block"
            style={{ color: "#A89F94" }}
          >
            Défiler pour tourner la bouteille
          </p>
        </div>

        {/* Dark accent panel — the rotating bottle */}
        <div ref={panelRef} className="order-1 md:order-2 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden sm:max-w-[360px] md:max-w-[440px] lg:max-w-[500px]"
            style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.35)" }}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/hero/bottle-360-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/assets/hero/bottle-360-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/assets/hero/bottle-360.mp4" type="video/mp4" />
            </video>
            {/* gold keyline inset — quiet, premium */}
            <div
              className="pointer-events-none absolute inset-3 border"
              style={{ borderColor: "rgba(201,168,76,0.28)" }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
