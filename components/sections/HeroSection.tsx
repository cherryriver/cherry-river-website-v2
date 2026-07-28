"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const GOLD_PARTICLES = Array.from({ length: 24 }, (_, index) => {
  const seed = index + 1;
  const size = 1 + ((seed * 7) % 30) / 10;
  const duration = 4 + ((seed * 11) % 60) / 10;

  return {
    size,
    left: `${(seed * 37) % 100}%`,
    top: `${(seed * 53) % 100}%`,
    duration: `${duration}s`,
    delay: `${((seed * 17) % 50) / 10}s`,
    opacity: 0.3 + ((seed * 13) % 40) / 100,
  };
});

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-black)" }}
      aria-label="Accueil Cherry River"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        poster="/assets/brands/cherry-river/Instagram_Cherry_River_Barils.jpg"
        {...({ fetchPriority: "high" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
      >
        <source src="/assets/videos/compressed/distillerie-cherry-river.webm" type="video/webm" />
        <source src="/assets/videos/compressed/distillerie-cherry-river.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlay — heavier at bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(9,9,9,0.2) 0%, rgba(9,9,9,0.35) 50%, rgba(9,9,9,0.75) 100%)",
        }}
        aria-hidden
      />

      {/* Gold particles */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
        {GOLD_PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              background: "rgba(201,168,76,0.25)",
              animation: `float-gentle ${particle.duration} ease-in-out infinite`,
              animationDelay: particle.delay,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
        aria-hidden
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-48"
        style={{ background: "linear-gradient(to top, var(--bg-black) 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="sr-only">
          Distillerie Cherry River — Spiritueux artisanaux, Magog et Québec
        </h1>
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-16px)",
            filter: loaded ? "blur(0)" : "blur(6px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, filter 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        >
          <Image
            src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png"
            alt="Cherry River — Distillerie artisanale, Magog & Québec"
            width={220}
            height={220}
            className="h-auto w-[160px] md:w-[220px]"
            style={{ filter: "none" }}
            priority
          />
        </div>

        <div
          className="mt-10 h-px w-16 origin-center"
          style={{
            backgroundColor: "var(--color-accent-gold)",
            opacity: loaded ? 0.5 : 0,
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }}
          aria-hidden
        />

        <p
          className="mt-8 font-heading font-light italic tracking-wide"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            color: "var(--text-light)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            filter: loaded ? "blur(0)" : "blur(4px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1s, filter 0.8s cubic-bezier(0.16,1,0.3,1) 1s",
          }}
        >
          Boissons modernes élaborées au Québec
        </p>

        <p
          className="mt-4 max-w-lg font-body font-light tracking-wide"
          style={{
            fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
            color: "var(--text-light-secondary)",
            letterSpacing: "0.08em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            filter: loaded ? "blur(0)" : "blur(4px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 1.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.2s, filter 0.8s cubic-bezier(0.16,1,0.3,1) 1.2s",
          }}
        >
          Un seul créateur. Tout l&apos;univers du cocktail.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-3 sm:mt-14 sm:flex-row sm:gap-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s",
          }}
        >
          <Link
            href="/experiences"
            className="btn-tactile inline-flex w-full items-center justify-center border px-8 py-3.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.22em] backdrop-blur-sm transition-all duration-500 ease-premium hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#090909] sm:w-auto sm:px-10 sm:py-4 sm:text-[0.68rem]"
            style={{ borderColor: "rgba(240,235,228,0.25)", color: "var(--text-light)", backgroundColor: "rgba(240,235,228,0.04)" }}
          >
            Réserver une visite
          </Link>
          <Link
            href="/produits"
            className="btn-tactile inline-flex w-full items-center justify-center border px-8 py-3.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.22em] backdrop-blur-sm transition-all duration-500 ease-premium hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#090909] sm:w-auto sm:px-10 sm:py-4 sm:text-[0.68rem]"
            style={{ borderColor: "rgba(240,235,228,0.25)", color: "var(--text-light)", backgroundColor: "rgba(240,235,228,0.04)" }}
          >
            Découvrir nos créations
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-10" aria-hidden="true">
        <div
          className="flex flex-col items-center gap-3"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 2.5s" }}
        >
          <span
            className="font-body text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: "var(--text-light-muted)" }}
          >
            Défiler
          </span>
          <div
            className="h-8 w-px"
            style={{
              backgroundColor: "rgba(201,168,76,0.25)",
              animation: "scroll-pulse 2.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
