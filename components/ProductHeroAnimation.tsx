"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/content/products-catalog";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  product: Product;
  categoryLabel: string;
}

export function ProductHeroAnimation({ product, categoryLabel }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  const hasImage = !!product.image;

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allEls = [
      glowRef, bottleRef, shadowRef, categoryRef, titleRef,
      taglineRef, dividerRef, descRef, chipsRef, ctaRef,
    ];

    if (prefersReduced) {
      allEls.forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1, y: 0, scale: 1, scaleX: 1, filter: "blur(0px)" });
        if (ref.current?.children?.length) gsap.set(ref.current.children, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* ── ENTRY TIMELINE ── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.2 });

      // Background glow pulse
      if (glowRef.current) {
        tl.fromTo(glowRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 2 }, 0);
      }

      // Bottle: fade + rise + scale + initial blur sharpening
      if (bottleRef.current) {
        tl.fromTo(
          bottleRef.current,
          { opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
          0.1,
        );
      }

      // Light sweep across bottle
      if (lightSweepRef.current) {
        tl.fromTo(
          lightSweepRef.current,
          { x: "-100%" },
          { x: "200%", duration: 1.8, ease: "power2.inOut" },
          0.6,
        );
      }

      // Shadow appears
      if (shadowRef.current) {
        tl.fromTo(shadowRef.current, { opacity: 0, scaleX: 0.4 }, { opacity: 0.6, scaleX: 1, duration: 1.2 }, 0.5);
      }

      // Category label
      if (categoryRef.current) {
        tl.fromTo(categoryRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.35);
      }

      // Title — word-by-word stagger
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        if (words.length > 0) {
          tl.fromTo(words, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 0.45);
        } else {
          tl.fromTo(titleRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.45);
        }
      }

      // Tagline
      if (taglineRef.current) {
        tl.fromTo(taglineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.6);
      }

      // Divider
      if (dividerRef.current) {
        tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.out" }, 0.55);
      }

      // Description
      if (descRef.current) {
        tl.fromTo(descRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.65);
      }

      // Chips stagger
      if (chipsRef.current?.children?.length) {
        tl.fromTo(chipsRef.current.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.75);
      }

      // CTA stagger
      if (ctaRef.current?.children?.length) {
        tl.fromTo(ctaRef.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.85);
      }

      /* ── FLOATING EFFECT (after entry) ── */
      if (bottleRef.current) {
        gsap.to(bottleRef.current, {
          y: -8,
          rotation: 0.5,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.8,
        });
      }

      /* ── LOOPING LIGHT SWEEP ── */
      if (lightSweepRef.current) {
        gsap.fromTo(
          lightSweepRef.current,
          { x: "-100%" },
          { x: "200%", duration: 4, ease: "power1.inOut", repeat: -1, repeatDelay: 5, delay: 3 },
        );
      }

      /* ── SCROLL INTERACTION ── */
      if (bottleRef.current && sectionRef.current) {
        // Bottle: scale up + rotation + depth on scroll
        gsap.to(bottleRef.current, {
          scale: 1.15,
          rotation: 3,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Parallax: background moves slower
      if (bgLayerRef.current && sectionRef.current) {
        gsap.to(bgLayerRef.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // Grain noise subtle opacity pulse
      if (grainRef.current) {
        gsap.to(grainRef.current, {
          opacity: 0.03,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = product.name.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #090909 0%, #090909 60%, var(--bg-light) 100%)" }}
    >
      {/* Noise grain texture overlay */}
      <div
        ref={grainRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* Background parallax layer */}
      <div
        ref={bgLayerRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-[2] mx-auto px-[var(--content-margin-x)]"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <div className="grid gap-10 pb-24 pt-8 sm:gap-16 lg:grid-cols-[5fr_7fr] lg:pb-32 lg:pt-14">
          {/* ─── BOTTLE ─── */}
          <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[500px] items-center justify-center">
            {/* Radial glow */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-[5%] rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)",
                opacity: 0,
              }}
              aria-hidden="true"
            />

            {hasImage ? (
              <div
                ref={bottleRef}
                className="relative z-10 flex h-full w-full items-center justify-center"
                style={{ opacity: 0, willChange: "transform, opacity, filter" }}
              >
                <Image
                  src={product.image!}
                  alt={product.name}
                  width={500}
                  height={660}
                  className="h-auto max-h-[92%] w-auto max-w-[78%] object-contain"
                  priority
                />
                {/* Light sweep overlay */}
                <div
                  ref={lightSweepRef}
                  className="pointer-events-none absolute inset-0 z-20"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)",
                    transform: "translateX(-100%)",
                    willChange: "transform",
                  }}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div
                ref={bottleRef}
                className="flex h-full w-full flex-col items-center justify-center rounded-sm border"
                style={{ borderColor: "rgba(201,168,76,0.2)", background: "rgba(var(--bg-light-rgb),0.03)", opacity: 0 }}
              >
                <span className="font-heading text-[4rem] font-light" style={{ fontFamily: "var(--font-display)", color: "#E8E0D5" }}>CR</span>
                <p className="mt-2 font-body text-[0.6rem] uppercase tracking-[0.25em]" style={{ color: "#A89F94" }}>Photo à venir</p>
              </div>
            )}

            {/* Floor shadow */}
            <div
              ref={shadowRef}
              className="pointer-events-none absolute bottom-[3%] left-[10%] right-[10%] h-10 rounded-[50%]"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)",
                opacity: 0,
                transformOrigin: "center",
              }}
              aria-hidden="true"
            />
          </div>

          {/* ─── INFO ─── */}
          <div className="flex flex-col justify-center">
            <p
              ref={categoryRef}
              className="mb-4 font-body text-[0.55rem] font-normal uppercase tracking-[0.4em]"
              style={{ color: "#C9A84C", opacity: 0 }}
            >
              {categoryLabel}
              {product.subcategory && ` · ${product.subcategory}`}
            </p>

            {/* Title: word-by-word animation */}
            <h1
              ref={titleRef}
              className="font-heading font-light leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                color: "var(--bg-light)",
                opacity: titleWords.length > 1 ? 1 : 0,
              }}
            >
              {titleWords.length > 1
                ? titleWords.map((word, i) => (
                    <span key={i} data-word className="inline-block" style={{ opacity: 0, marginRight: "0.3em" }}>
                      {word}
                    </span>
                  ))
                : product.name}
            </h1>

            {product.tagline && (
              <p
                ref={taglineRef}
                className="mt-4 font-heading font-light italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1rem, 2vw, 1.3rem)",
                  color: "#A89F94",
                  opacity: 0,
                }}
              >
                {product.tagline}
              </p>
            )}

            <div
              ref={dividerRef}
              className="my-8 h-px"
              style={{ background: "rgba(201,168,76,0.3)", transformOrigin: "left", transform: "scaleX(0)" }}
              aria-hidden="true"
            />

            <p
              ref={descRef}
              className="max-w-[48ch] font-body text-[1rem] font-light leading-[1.9]"
              style={{ color: "#A89F94", opacity: 0 }}
            >
              {product.description}
            </p>

            <div ref={chipsRef} className="mt-8 flex flex-wrap items-center gap-3">
              {product.abv && (
                <span className="rounded-full border px-4 py-1.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em]" style={{ borderColor: "rgba(201,168,76,0.25)", color: "#A89F94", opacity: 0 }}>
                  {product.abv} alc.
                </span>
              )}
              {product.volume && (
                <span className="rounded-full border px-4 py-1.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em]" style={{ borderColor: "rgba(201,168,76,0.25)", color: "#A89F94", opacity: 0 }}>
                  {product.volume}
                </span>
              )}
              {product.isFeatured && (
                <span className="rounded-full border px-4 py-1.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em]" style={{ borderColor: "#C9A84C", color: "#C9A84C", opacity: 0 }}>
                  Vedette
                </span>
              )}
            </div>

            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
              {product.saqUrl && (
                <a
                  href={product.saqUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-85"
                  style={{ background: "#8B1A1A", color: "#fff", opacity: 0 }}
                >
                  Acheter à la SAQ
                </a>
              )}
              <button
                className="inline-flex items-center justify-center border px-8 py-3.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                style={{ borderColor: "rgba(201,168,76,0.25)", color: "#A89F94", background: "transparent", opacity: 0 }}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
