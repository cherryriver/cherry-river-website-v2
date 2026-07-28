"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import type {
  BoutiqueProduct,
  BoutiqueCategory,
} from "@/content/boutique-catalog";
import {
  BOUTIQUE_FILTERS,
  BOUTIQUE_FILTER_LABELS,
} from "@/content/boutique-catalog";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface Props {
  products: BoutiqueProduct[];
  exclusives: BoutiqueProduct[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + " $";
}

const LOCATION_LABELS: Record<string, string> = {
  magog: "Magog",
  quebec: "Québec",
  both: "Magog & Québec",
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function BoutiqueClient({ products, exclusives }: Props) {
  const [activeFilter, setActiveFilter] = useState<BoutiqueCategory | "all">(
    "all"
  );
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("commande") === "succes") {
        setOrderSuccess(true);
        window.history.replaceState({}, "", "/boutique");
      }
    }
  }, []);
  const [fadeState, setFadeState] = useState<"visible" | "fading">("visible");
  const [displayedFilter, setDisplayedFilter] = useState<
    BoutiqueCategory | "all"
  >("all");
  const filterBarRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = useCallback(
    (filter: BoutiqueCategory | "all") => {
      if (filter === activeFilter) return;
      setFadeState("fading");
      setActiveFilter(filter);
      setTimeout(() => {
        setDisplayedFilter(filter);
        setFadeState("visible");
      }, 250);
    },
    [activeFilter]
  );

  const filteredProducts = useMemo(() => {
    if (displayedFilter === "all") return products;
    return products.filter((p) => p.boutiqueCategory === displayedFilter);
  }, [displayedFilter, products]);

  /* Scroll arrows for mobile filter bar */
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-cream)" }}>
      {orderSuccess && (
        <div
          className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 font-body text-sm"
          style={{ background: "var(--bg-dark)", color: "var(--color-accent-gold)", borderBottom: "1px solid rgba(201,168,76,0.3)" }}
        >
          <span>✓ Commande reçue — merci pour votre achat.</span>
          <button onClick={() => setOrderSuccess(false)} style={{ color: "var(--text-dark-muted)" }}>✕</button>
        </div>
      )}
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-44"
        style={{ background: "var(--bg-black)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, var(--color-accent-gold) 0%, transparent 50%)",
          }}
        />
        <div
          className="relative mx-auto w-full px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Boutique en ligne
            </p>
            <h1
              className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Magasinez
              <br />
              <em className="font-light">Cherry River</em>
            </h1>
            <p
              className="mt-6 max-w-[45ch] font-body text-[1rem] font-light leading-relaxed sm:text-[1.0625rem]"
              style={{ color: "var(--text-light-secondary)" }}
            >
              Spiritueux artisanaux, cocktails prêts-à-boire et accessoires de
              mixologie — livrés partout au Québec.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Sticky Filter Bar ───────────────────────────────── */}
      <div
        ref={filterBarRef}
        className="sticky top-[62px] z-40 border-b sm:top-[72px]"
        style={{
          background: "rgba(245,240,232,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border-light)",
        }}
      >
        <div
          className="relative mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* Left fade */}
          {canScrollLeft && (
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 sm:hidden"
              style={{
                background:
                  "linear-gradient(to right, rgba(245,240,232,0.95), transparent)",
              }}
            />
          )}
          {/* Right fade */}
          {canScrollRight && (
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 sm:hidden"
              style={{
                background:
                  "linear-gradient(to left, rgba(245,240,232,0.95), transparent)",
              }}
            />
          )}

          <div
            ref={scrollContainerRef}
            className="-mx-2 flex gap-1 overflow-x-auto py-3 scrollbar-none sm:gap-2 sm:py-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <FilterChip
              label="Tous"
              isActive={activeFilter === "all"}
              onClick={() => handleFilterChange("all")}
              count={products.length}
            />
            {BOUTIQUE_FILTERS.map((cat) => (
              <FilterChip
                key={cat}
                label={BOUTIQUE_FILTER_LABELS[cat]}
                isActive={activeFilter === cat}
                onClick={() => handleFilterChange(cat)}
                count={
                  products.filter((p) => p.boutiqueCategory === cat).length
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Product Grid ────────────────────────────────────── */}
      <section
        className="py-12 sm:py-20"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div
            className="grid grid-cols-2 gap-4 transition-opacity duration-250 ease-in-out sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
            style={{ opacity: fadeState === "fading" ? 0 : 1 }}
          >
            {filteredProducts.map((product, idx) => (
              <AnimateOnScroll key={product.slug} delay={idx * 0.04}>
                <ProductCard product={product} />
              </AnimateOnScroll>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p
                className="font-body text-sm"
                style={{ color: "var(--text-dark-muted)" }}
              >
                Aucun produit dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Exclusivités Distillerie ────────────────────────── */}
      <section style={{ background: "var(--bg-dark)" }} className="py-16 sm:py-24">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <div className="mb-10 sm:mb-14">
              <p
                className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "var(--color-accent-gold)" }}
              >
                Sur place uniquement
              </p>
              <h2
                className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-light)",
                }}
              >
                Exclusivités boutique
              </h2>
              <p
                className="mt-4 max-w-[55ch] font-body text-[0.9375rem] font-light leading-relaxed"
                style={{ color: "var(--text-light-secondary)" }}
              >
                Ces produits sont uniquement disponibles dans nos distilleries
                de Magog et Québec — Sillery. Une raison de plus pour nous
                visiter.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {exclusives.map((product, idx) => (
              <AnimateOnScroll key={product.slug} delay={idx * 0.06}>
                <ExclusiveCard product={product} />
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="mt-12 flex flex-col items-center gap-3 text-center sm:mt-16 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                href="/distilleries/magog"
                className="inline-block w-full border px-8 py-3.5 font-body text-[0.7rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5 sm:w-auto"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  color: "var(--color-accent-gold)",
                }}
              >
                Visiter Magog
              </Link>
              <Link
                href="/distilleries/quebec"
                className="inline-block w-full border px-8 py-3.5 font-body text-[0.7rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5 sm:w-auto"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  color: "var(--color-accent-gold)",
                }}
              >
                Visiter Québec
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Delivery Info ───────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <div className="mb-10 text-center sm:mb-14">
              <p
                className="mb-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "var(--color-accent-gold)" }}
              >
                Livraison & services
              </p>
              <h2
                className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-light"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-dark)" }}
              >
                À votre service
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                title: "Livraison Québec",
                text: "Livraison rapide partout au Québec. Gratuite dès 75 $.",
              },
              {
                title: "Cueillette en distillerie",
                text: "Ramassez votre commande à Magog ou Québec — Sillery.",
              },
              {
                title: "Coffrets cadeaux",
                text: "Emballage cadeau disponible pour toutes les commandes.",
              },
            ].map((item, idx) => (
              <AnimateOnScroll key={item.title} delay={idx * 0.08}>
                <div
                  className="rounded-sm border p-6 text-center sm:p-8"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  <div
                    className="mx-auto mb-4 h-px w-8"
                    style={{ background: "var(--color-accent-gold)", opacity: 0.4 }}
                  />
                  <h3
                    className="font-heading text-base font-normal sm:text-lg"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 font-body text-[0.8125rem] font-light leading-relaxed"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  {item.text}
                </p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

/* ─── Filter Chip ──────────────────────────────────────────────── */

function FilterChip({
  label,
  isActive,
  onClick,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-body text-[0.7rem] font-normal uppercase tracking-[0.15em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-[0.72rem]"
      style={{
        borderColor: isActive
          ? "var(--color-accent-gold)"
          : "var(--border-light)",
        background: isActive ? "var(--text-dark)" : "transparent",
        color: isActive ? "var(--bg-cream)" : "var(--text-dark-secondary)",
      }}
    >
      {label}
      <span
        className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 font-body text-[0.55rem]"
        style={{
          background: isActive
            ? "var(--color-accent-gold)"
            : "rgba(0,0,0,0.06)",
          color: isActive ? "var(--text-dark)" : "var(--text-dark-muted)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

/* ─── Product Card ─────────────────────────────────────────────── */

function ProductCard({ product }: { product: BoutiqueProduct }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <article className="group flex flex-col">
      {/* Image */}
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm border border-[var(--border-light)]">
        {product.image ? (
          <>
            {product.productPageSlug ? (
              <Link href={`/produits/${product.productPageSlug}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={280}
                  height={373}
                  className="h-auto max-h-[82%] w-auto max-w-[75%] object-contain transition-transform duration-700 group-hover:scale-[1.03] group-hover:-translate-y-1"
                />
              </Link>
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                width={280}
                height={373}
                className="h-auto max-h-[82%] w-auto max-w-[75%] object-contain transition-transform duration-700 group-hover:scale-[1.03] group-hover:-translate-y-1"
              />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="font-body text-[0.65rem] uppercase tracking-widest"
              style={{ color: "var(--text-dark-muted)" }}
            >
              Photo à venir
            </span>
          </div>
        )}

        {/* Badges (top-left stack) */}
        <div className="absolute left-2 top-2 flex flex-col gap-1 sm:left-3 sm:top-3">
          {product.isBestseller && (
            <span
              className="rounded-full px-2.5 py-0.5 font-body text-[0.55rem] font-normal uppercase tracking-wider text-white"
              style={{ background: "var(--color-accent-cherry)" }}
            >
              Populaire
            </span>
          )}
          {product.isNew && (
            <span
              className="rounded-full px-2.5 py-0.5 font-body text-[0.55rem] font-normal uppercase tracking-wider"
              style={{
                background: "var(--color-accent-gold)",
                color: "var(--text-dark)",
              }}
            >
              Nouveau
            </span>
          )}
          {product.badge && (
            <span
              className="rounded-full px-2.5 py-0.5 font-body text-[0.55rem] font-normal uppercase tracking-wider"
              style={{
                background: "var(--text-dark)",
                color: "var(--bg-cream)",
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* SAQ badge (top-right) */}
        {product.saqAvailable && (
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
            <span
              className="rounded-full border px-2 py-0.5 font-body text-[0.5rem] font-normal uppercase tracking-wider sm:text-[0.55rem]"
              style={{
                borderColor: "var(--border-light)",
                color: "var(--text-dark-secondary)",
                background: "rgba(245,240,232,0.9)",
              }}
            >
              SAQ
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col sm:mt-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-heading text-[0.95rem] font-normal leading-snug sm:text-base"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-dark)",
            }}
          >
            {product.productPageSlug ? (
              <Link
                href={`/produits/${product.productPageSlug}`}
                className="transition-opacity hover:opacity-70"
              >
                {product.name}
              </Link>
            ) : (
              product.name
            )}
          </h3>
        </div>

        {/* Volume + ABV */}
        {(product.volume || product.abv) && (
          <p
            className="mt-0.5 font-body text-[0.65rem] uppercase tracking-[0.15em]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            {[product.volume, product.abv].filter(Boolean).join(" · ")}
          </p>
        )}

        <p
          className="mt-1.5 line-clamp-2 font-body text-[0.78rem] font-light leading-relaxed sm:text-[0.8125rem]"
          style={{ color: "var(--text-dark-secondary)" }}
        >
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span
              className="font-heading text-lg font-normal sm:text-xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-dark)",
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span
                className="font-body text-[0.75rem] line-through"
                style={{ color: "var(--text-dark-muted)" }}
              >
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {product.boutiqueCategory === "spiritueux" ? (
            product.saqUrl ? (
              <a
                href={product.saqUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center border py-2.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-80 sm:py-3 sm:text-[0.68rem]"
                style={{ borderColor: "#8B1A1A", color: "#8B1A1A" }}
              >
                Acheter à la SAQ
              </a>
            ) : (
              <span
                className="mt-3 flex w-full items-center justify-center gap-2 border py-2.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.18em]"
                style={{ borderColor: "rgba(139,26,26,0.3)", color: "#8B1A1A" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B1A1A] opacity-60" />
                Disponible à la SAQ
              </span>
            )
          ) : (
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-3 flex w-full items-center justify-center border py-2.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-80 disabled:opacity-50 sm:py-3 sm:text-[0.68rem]"
              style={{ borderColor: "var(--text-dark)", color: "var(--text-dark)" }}
            >
              {loading ? "Redirection…" : "Acheter en ligne"}
            </button>
          )}

          {product.boutiqueCategory !== "spiritueux" && product.saqAvailable && product.saqUrl && (
            <a
              href={product.saqUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-1.5 py-1.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em] underline transition-opacity hover:opacity-70"
              style={{ color: "var(--text-dark-muted)" }}
            >
              Disponible à la SAQ
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="opacity-50"
              >
                <path
                  d="M3 1h6v6M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Exclusive Card ───────────────────────────────────────────── */

function ExclusiveCard({ product }: { product: BoutiqueProduct }) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-sm"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Image or placeholder */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={260}
            height={346}
            className="h-auto max-h-[80%] w-auto max-w-[70%] object-contain"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <span
              className="font-heading text-[2.5rem] font-light opacity-10 sm:text-[3rem]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              CR
            </span>
          </div>
        )}

        {/* Location badge */}
        {product.exclusiveLocation && (
          <div className="absolute right-2 top-2 flex flex-col gap-1 sm:right-3 sm:top-3">
            {(product.exclusiveLocation === "magog" ||
              product.exclusiveLocation === "both") && (
              <span
                className="rounded-full px-2.5 py-0.5 font-body text-[0.5rem] font-normal uppercase tracking-wider sm:text-[0.55rem]"
                style={{
                  background: "var(--color-accent-gold)",
                  color: "var(--text-dark)",
                }}
              >
                Magog
              </span>
            )}
            {(product.exclusiveLocation === "quebec" ||
              product.exclusiveLocation === "both") && (
              <span
                className="rounded-full px-2.5 py-0.5 font-body text-[0.5rem] font-normal uppercase tracking-wider sm:text-[0.55rem]"
                style={{
                  background: "var(--color-accent-gold)",
                  color: "var(--text-dark)",
                }}
              >
                Québec
              </span>
            )}
          </div>
        )}

        {product.isNew && (
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
            <span
              className="rounded-full px-2.5 py-0.5 font-body text-[0.55rem] font-normal uppercase tracking-wider"
              style={{
                background: "var(--color-accent-cherry)",
                color: "#fff",
              }}
            >
              Nouveau
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3
          className="font-heading text-[0.95rem] font-normal leading-snug sm:text-base"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-light)",
          }}
        >
          {product.name}
        </h3>
        {(product.volume || product.abv) && (
          <p
            className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.15em]"
            style={{ color: "var(--text-light-muted)" }}
          >
            {[product.volume, product.abv].filter(Boolean).join(" · ")}
          </p>
        )}
        <p
          className="mt-2 line-clamp-2 font-body text-[0.78rem] font-light leading-relaxed sm:text-[0.8125rem]"
          style={{ color: "var(--text-light-secondary)" }}
        >
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <span
            className="font-heading text-lg font-normal"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-light)",
            }}
          >
            {formatPrice(product.price)}
          </span>

          <p
            className="mt-2 font-body text-[0.6rem] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-light-muted)" }}
          >
            Disponible en distillerie ·{" "}
            {LOCATION_LABELS[product.exclusiveLocation || "both"]}
          </p>
        </div>
      </div>
    </article>
  );
}
