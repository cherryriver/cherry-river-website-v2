"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/content/products-catalog";
import { getCatalogProductImage } from "@/lib/produits-shelves";

gsap.registerPlugin(ScrollTrigger);

const BG = "#FAFAF8";
const WHITE = "#FAFAF8";
const TEXT = "#1A1A1A";
const TEXT_BODY = "#6B6258";
const TEXT_LIGHT = "#A89F94";
const GOLD = "#C9A84C";

interface Props {
  title: string;
  subtitle: string;
  products: Product[];
  heroImage?: string;
  heroLogo?: string;
}

export function CategoriePageClient({ title, subtitle, products, heroImage, heroLogo }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = [titleRef.current, subtitleRef.current].filter(Boolean) as Element[];
    const cards = gridRef.current ? Array.from(gridRef.current.querySelectorAll("[data-card]")) : [];

    if (prefersReduced) {
      gsap.set([...els, ...cards], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([...els, ...cards], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (titleRef.current) {
        tl.fromTo(titleRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1 }, 0.1);
      }
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
      }

      // ScrollTrigger batch for cards — reveal on scroll
      if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 40, scale: 0.98 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: "expo.out" },
            );
          },
          start: "top 88%",
          once: true,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen" style={{ background: BG }} suppressHydrationWarning>
      {/* ── Immersive hero (Opemiska / collaborations) ── */}
      {heroImage && (
        <section className="relative flex items-center justify-center overflow-hidden" style={{ height: "70vh", minHeight: 420 }}>
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.25) brightness(0.45)", objectPosition: "center 30%" }}
            priority
          />
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)" }} aria-hidden />
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {heroLogo && (
              <Image
                src={heroLogo}
                alt={`${title} — Logo`}
                width={240}
                height={80}
                className="mb-8 h-auto w-[180px] sm:w-[220px] lg:w-[260px]"
                style={{ opacity: 0.92 }}
                priority
              />
            )}
            <p
              className="max-w-[44ch] font-body text-[0.85rem] font-light leading-relaxed tracking-wide sm:text-[0.95rem]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {subtitle}
            </p>
            <div className="mt-6 h-px w-12" style={{ background: GOLD, opacity: 0.5 }} aria-hidden />
            <p
              className="mt-5 font-body text-[0.6rem] font-normal uppercase tracking-[0.3em]"
              style={{ color: "rgba(201,168,76,0.6)" }}
            >
              Cherry River × Les 2Frères
            </p>
          </div>
        </section>
      )}

      {/* Header spacer — ensures clear separation from fixed nav */}
      <div className={heroImage ? "mx-auto px-6 pt-16 sm:px-10 sm:pt-20 lg:px-20 lg:pt-24" : "mx-auto px-6 pt-36 sm:px-10 sm:pt-44 lg:px-20 lg:pt-48"} style={{ maxWidth: 1200 }} suppressHydrationWarning>
        <p
          className="mb-4 font-body text-[0.6rem] font-normal uppercase tracking-[0.3em]"
          style={{ color: GOLD }}
        >
          Nos produits
        </p>
        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            color: TEXT,
            fontSize: "clamp(2.8rem, 8vw, 5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-5 max-w-[52ch]"
          style={{ fontFamily: "var(--font-body), monospace", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8, color: TEXT_BODY }}
        >
          {subtitle}
        </p>
        <div className="mt-8" style={{ width: 40, height: 1, background: GOLD }} aria-hidden="true" />
      </div>

      <div className="mx-auto px-6 pb-28 pt-12 sm:px-10 sm:pt-16 lg:px-20" style={{ maxWidth: 1200 }}>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20"
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="py-20 text-center" style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontStyle: "italic", color: TEXT_LIGHT }}>
            Aucun produit dans cette catégorie.
          </p>
        )}
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const src = getCatalogProductImage(product);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (sweepRef.current) {
      gsap.fromTo(sweepRef.current, { x: "-100%" }, { x: "200%", duration: 0.8, ease: "power2.inOut" });
    }
  }

  return (
    <Link
      ref={cardRef}
      href={`/produits/${product.slug}`}
      className="group block"
      data-card
      onMouseEnter={handleMouseEnter}
      prefetch
    >
      <div
        className="relative mx-auto flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2.5 group-hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)]"
        style={{ aspectRatio: "3/4", background: WHITE, maxWidth: 340 }}
      >
        <Image
          src={src}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-contain object-center p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05] sm:p-8"
        />
        {/* Light sweep on hover */}
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 55%, transparent 70%)",
            transform: "translateX(-100%)",
          }}
          aria-hidden="true"
        />
        {/* Soft glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 60px rgba(201,168,76,0.04)" }}
          aria-hidden="true"
        />
        {/* Floor shadow */}
        <div
          className="pointer-events-none absolute bottom-3 left-[15%] right-[15%] h-5 rounded-[50%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 text-center">
        <h3
          className="font-heading text-[1.05rem] font-normal leading-snug transition-colors duration-300 group-hover:text-[#8B1A1A] sm:text-lg"
          style={{ fontFamily: "var(--font-display)", color: TEXT }}
        >
          {product.name}
        </h3>
        {product.tagline && (
          <p className="mt-1.5 font-body text-[0.7rem] font-light leading-relaxed" style={{ color: TEXT_BODY }}>
            {product.tagline}
          </p>
        )}
        <p className="mt-2 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em]" style={{ color: TEXT_LIGHT }}>
          {[product.volume, product.abv].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
