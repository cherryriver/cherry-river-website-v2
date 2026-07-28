"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { ProductHeroAnimation } from "@/components/ProductHeroAnimation";
import { getLifestyleImages } from "@/lib/lifestyle-images";
import type { Product } from "@/content/products-catalog";

// Romeo's Gin-inspired product card animation: bottle slides up (60px) with
// progressive golden drop-shadow build, label staggers in 400ms after.
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function buildBottleVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "drop-shadow(0 0 0 rgba(201,168,76,0))",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "drop-shadow(0 24px 48px rgba(201,168,76,0.18))",
    },
  };
}

function buildLabelVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };
}

/* ------------------------------------------------------------------ */
/*  Onglets produit - contenu par subcategory                           */
/* ------------------------------------------------------------------ */

type TabId = "produit" | "notes" | "servir";

const TABS: { id: TabId; label: string }[] = [
  { id: "produit", label: "Le produit" },
  { id: "notes", label: "Notes de dégustation" },
  { id: "servir", label: "Comment le servir" },
];

const TASTING_NOTES: Record<string, string> = {
  gin: "Nez de genièvre et de baies sauvages. En bouche, une fraîcheur herbacée avec des notes de basilic frais et d'agrumes. Finale longue et équilibrée, légèrement épicée.",
  vodka: "Nez délicat, pur et cristallin. En bouche, une texture soyeuse avec des notes subtiles de céréales et une pointe de douceur. Finale nette et rafraîchissante.",
  rhum: "Nez chaleureux de canne à sucre et de vanille. En bouche, des notes de caramel, de fruits tropicaux et d'épices douces. Finale ronde et enveloppante.",
  bourbon: "Nez de chêne grillé et de vanille. En bouche, des saveurs de caramel, de maïs sucré et une touche fumée. Finale longue avec des notes de miel et d'épices.",
  tequila: "Nez d'agave cuit avec des notes herbacées. En bouche, une complexité de terre, d'agrumes et de poivre blanc. Finale vive et minérale.",
  liqueur: "Nez gourmand et parfumé. En bouche, un équilibre entre douceur et caractère, avec des arômes intenses et une texture veloutée. Finale élégante et persistante.",
};

const SERVING_SUGGESTIONS: Record<string, string> = {
  gin: "En cocktail classique : 2 oz de gin, 1 oz de sirop simple, ¾ oz de jus de citron frais. Servir dans un verre coupé avec un zeste de citron. Excellent aussi en Gin & Tonic avec une garniture d'herbes fraîches.",
  vodka: "Servir très frais, pur ou sur glace. Se prête magnifiquement aux cocktails : Martini, Moscow Mule, ou Cosmopolitan. Pour une dégustation, laisser tempérer légèrement pour révéler toute la complexité.",
  rhum: "Pur sur glace pour apprécier la richesse. En cocktail : Daiquiri, Mojito ou Punch tropical. Quelques gouttes d'eau libèrent les arômes les plus subtils.",
  bourbon: "Pur, sur un gros glaçon. En cocktail : Old Fashioned avec un trait de sirop d'érable et un zeste d'orange. Le bourbon s'accorde aussi remarquablement avec un Whiskey Sour.",
  tequila: "Pur à température ambiante pour une dégustation. En cocktail : Margarita classique, Paloma ou Tequila Sunrise. Accompagner d'une tranche d'orange et d'une pincée de sel fumé.",
  liqueur: "Seule sur glace en digestif. En cocktail : ajouter ½ oz à vos créations pour une touche de complexité. Se marie parfaitement avec le café, le chocolat ou les desserts.",
};

function getTabContent(product: Product, tab: TabId): string {
  const sub = product.subcategory ?? "gin";
  switch (tab) {
    case "produit":
      return product.description;
    case "notes":
      return TASTING_NOTES[sub] ?? TASTING_NOTES.gin;
    case "servir":
      return SERVING_SUGGESTIONS[sub] ?? SERVING_SUGGESTIONS.gin;
  }
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface VideoSuggestion {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailMq: string;
  duration: number | null;
}

interface Props {
  product: Product;
  categoryLabel: string;
  relatedVideos: VideoSuggestion[];
  relatedProducts: Product[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const MEASURE_RE =
  /\b(\d+\.?\d*)\s*(oz|ml|cl|dash|dashes|barspoon|part|parts|tasse|cup|cuillère|teaspoon|tbsp|tsp)\b/i;
const QUANTITY_START_RE = /^\d+[\s./\-]/;
const SECTION_HEADER_RE =
  /^(🔸\s*)?(ingr[eé]dients?|recette|recipe|instructions?|preparation|préparation|method|étapes?|steps?)\s*[:：]?\s*$/i;
const NOISE_RE =
  /^(#|abonne|subscribe|visitez|like|comment|liker|chaîne|n'oubliez|bonne dégustation|santé|cheers|à votre|share|partag)/i;
const URL_RE = /https?:\/\//;
const SEPARATOR_RE = /^[_\-=]{3,}$/;

interface ParsedRecipe {
  ingredients: string[];
  steps: string[];
  raw: string | null;
}

function parseRecipe(description: string): ParsedRecipe {
  if (!description) return { ingredients: [], steps: [], raw: null };

  const rawLines = description.split("\n");
  const ingredients: string[] = [];
  const steps: string[] = [];

  let phase: "scan" | "ingredients" | "steps" = "scan";
  let foundRecipeBlock = false;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (!line) continue;
    if (NOISE_RE.test(line) || URL_RE.test(line) || SEPARATOR_RE.test(line))
      continue;

    if (SECTION_HEADER_RE.test(line)) {
      const lower = line.toLowerCase();
      if (
        lower.includes("instruction") ||
        lower.includes("preparation") ||
        lower.includes("préparation") ||
        lower.includes("method") ||
        lower.includes("étape") ||
        lower.includes("step")
      ) {
        phase = "steps";
      } else {
        phase = "ingredients";
      }
      foundRecipeBlock = true;
      continue;
    }

    if (phase === "scan") {
      if (isIngredientLine(line)) {
        phase = "ingredients";
        foundRecipeBlock = true;
        ingredients.push(cleanLine(line));
      }
      continue;
    }

    if (phase === "ingredients") {
      if (isIngredientLine(line)) {
        ingredients.push(cleanLine(line));
      } else if (line.length < 15 && !MEASURE_RE.test(line)) {
        continue;
      } else {
        phase = "steps";
        if (isStepLine(line)) steps.push(cleanLine(line));
      }
      continue;
    }

    if (phase === "steps") {
      if (isStepLine(line)) {
        steps.push(cleanLine(line));
      } else if (isIngredientLine(line)) {
        break;
      } else if (line.length > 200) {
        break;
      }
    }
  }

  if (!foundRecipeBlock) {
    return { ingredients: [], steps: [], raw: description };
  }
  return {
    ingredients: ingredients.slice(0, 20),
    steps: steps.slice(0, 15),
    raw: null,
  };
}

function isIngredientLine(line: string): boolean {
  if (line.length > 150) return false;
  if (MEASURE_RE.test(line)) return true;
  if (QUANTITY_START_RE.test(line) && line.length < 80 && !/[.!?]$/.test(line))
    return true;
  return false;
}

function isStepLine(line: string): boolean {
  if (NOISE_RE.test(line) || URL_RE.test(line) || SEPARATOR_RE.test(line))
    return false;
  if (line.startsWith("*") && line.endsWith("*")) return false;
  if (line.length < 10) return false;
  if (line.length > 300) return false;
  return true;
}

function cleanLine(line: string): string {
  return line
    .replace(/^\d+\)\s*/, "")
    .replace(/^[-•*]\s*/, "")
    .trim();
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ProductPageClient({
  product,
  categoryLabel,
  relatedVideos,
  relatedProducts,
}: Props) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("produit");

  // Framer Motion setup for "Vous aimerez aussi" cards (Romeo's Gin pattern)
  const prefersReducedMotion = useReducedMotion() ?? false;
  const bottleVariants = buildBottleVariants(prefersReducedMotion);
  const labelVariants = buildLabelVariants(prefersReducedMotion);
  const bottleDuration = prefersReducedMotion ? 0.2 : 1.0;
  const labelDuration = prefersReducedMotion ? 0.2 : 0.7;
  const cardStagger = prefersReducedMotion ? 0 : 0.15;
  const labelOffset = prefersReducedMotion ? 0 : 0.4;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      {/* Breadcrumb — dark strip */}
      <div style={{ background: "#090909" }}>
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div className="pt-28 pb-4 sm:pt-32 sm:pb-5">
            <nav className="flex items-center gap-2 font-body text-[0.65rem] uppercase tracking-[0.2em]">
              <Link
                href="/produits"
                className="transition-colors hover:text-[#C9A84C]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Produits
              </Link>
              <span style={{ color: "#C9A84C" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{(product.subcategory || categoryLabel).toUpperCase()}</span>
              <span style={{ color: "#C9A84C" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{product.name.toUpperCase()}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Product */}
      <ProductHeroAnimation product={product} categoryLabel={categoryLabel} />

      {/* Product Details + Tabs */}
      <section style={{ background: "#FAFAF8" }}>
        <div
          className="mx-auto px-[var(--content-margin-x)] py-20 sm:py-28"
          style={{ maxWidth: 800 }}
        >
          {/* Product name centered */}
          <AnimateOnScroll>
            <div className="text-center">
              <h2
                className="font-heading font-light leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "#1A1A1A",
                }}
              >
                {product.name}
              </h2>
              {product.tagline && (
                <p
                  className="mt-3 font-heading font-light italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                    color: "#A89F94",
                  }}
                >
                  {product.tagline}
                </p>
              )}

              {/* Gold separator */}
              <div
                className="mx-auto my-8"
                style={{ width: 40, height: 1, background: "#C9A84C" }}
                aria-hidden="true"
              />

              {/* Specs row */}
              <div className="flex items-center justify-center gap-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em]" style={{ color: "#6B6258" }}>
                {product.volume && <span>{product.volume}</span>}
                {product.volume && product.abv && <span style={{ color: "#C9A84C" }}>·</span>}
                {product.abv && <span>{product.abv} alc/vol</span>}
                {(product.volume || product.abv) && <span style={{ color: "#C9A84C" }}>·</span>}
                <span>{categoryLabel}</span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Tabs */}
          <AnimateOnScroll delay={0.1}>
            <div className="mt-14">
              {/* Tab headers */}
              <div
                className="flex items-center justify-center gap-0"
                style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative px-5 py-3 transition-colors duration-300 sm:px-7"
                      style={{
                        fontFamily: "var(--font-body), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 400,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: isActive ? "#1A1A1A" : "#A89F94",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {tab.label}
                      <span
                        className="absolute inset-x-2 -bottom-[1px] h-[2px] transition-transform duration-300 sm:inset-x-4"
                        style={{
                          background: "#C9A84C",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "center",
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div className="pt-10">
                <p
                  className="font-body text-[0.95rem] font-light leading-[2]"
                  style={{ color: "#333333" }}
                >
                  {getTabContent(product, activeTab)}
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* CTA buttons */}
          <AnimateOnScroll delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              {product.saqUrl ? (
                <a
                  href={product.saqUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-85"
                  style={{ background: "#8B1A1A", color: "#fff" }}
                >
                  Acheter à la SAQ
                </a>
              ) : (["spiritueux", "liqueur", "opemiska", "collaboration", "rtd"].includes(product.category)) ? (
                <span
                  className="inline-flex items-center gap-2 border px-6 py-3 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em]"
                  style={{ borderColor: "rgba(139,26,26,0.3)", color: "#8B1A1A" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8B1A1A] opacity-70" />
                  Disponible à la SAQ
                </span>
              ) : null}
              <button
                className="inline-flex items-center justify-center border px-8 py-3.5 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                style={{
                  borderColor: "rgba(201,168,76,0.2)",
                  color: "#6B6258",
                  background: "transparent",
                }}
              >
                Ajouter au panier
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SECTION 1 - Lifestyle Mosaic */}
      <LifestyleMosaic subcategory={product.subcategory} />

      {/* SECTION 2 - Éditoriale */}
      <EditorialSection product={product} />

      {/* SECTION 3 - Inspirez-vous */}
      {relatedVideos.length > 0 && (
        <section style={{ background: "#FAFAF8" }}>
          <div
            className="mx-auto px-[var(--content-margin-x)] py-24 sm:py-36"
            style={{ maxWidth: "var(--content-max-width)" }}
          >
            <AnimateOnScroll>
              <div className="text-center">
                <p
                  className="font-body text-[0.55rem] font-normal uppercase tracking-[0.45em]"
                  style={{ color: "#C9A84C" }}
                >
                  Cocktails avec ce produit
                </p>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#1A1A1A",
                  }}
                >
                  Inspirez-vous
                </h2>
                <div
                  className="mx-auto mt-6"
                  style={{ width: 40, height: 1, background: "#C9A84C" }}
                  aria-hidden="true"
                />
              </div>
            </AnimateOnScroll>

            <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
              {relatedVideos.map((video, idx) => (
                <AnimateOnScroll key={video.videoId} delay={idx * 0.1}>
                  <CocktailVideoCard
                    video={video}
                    isPlaying={playingVideoId === video.videoId}
                    onPlay={() =>
                      setPlayingVideoId(
                        playingVideoId === video.videoId ? null : video.videoId,
                      )
                    }
                  />
                </AnimateOnScroll>
              ))}
            </div>

            {playingVideoId && (
              <AnimateOnScroll>
                <div className="mt-12 sm:mt-16">
                  <EmbeddedPlayer
                    video={relatedVideos.find((v) => v.videoId === playingVideoId)!}
                    onClose={() => setPlayingVideoId(null)}
                  />
                </div>
              </AnimateOnScroll>
            )}

            <div className="mt-14 text-center sm:mt-20">
              <Link
                href="/cocktail-culture"
                className="group inline-flex items-center gap-3 border px-10 py-4 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em] transition-all duration-500 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                style={{ borderColor: "rgba(201,168,76,0.2)", color: "#6B6258" }}
              >
                Voir tous nos cocktails
                <span className="inline-block h-px w-5 bg-current transition-all duration-500 group-hover:w-9" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4 - Vous aimerez aussi */}
      {relatedProducts.length > 0 && (
        <section style={{ background: "#FAFAF8" }}>
          <div
            className="mx-auto px-[var(--content-margin-x)] py-24 sm:py-36"
            style={{ maxWidth: "var(--content-max-width)" }}
          >
            <AnimateOnScroll>
              <div className="text-center">
                <p
                  className="font-body text-[0.55rem] font-normal uppercase tracking-[0.45em]"
                  style={{ color: "#C9A84C" }}
                >
                  Même famille
                </p>
                <h2
                  className="mt-4 font-heading font-light"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#1A1A1A",
                  }}
                >
                  Vous aimerez aussi
                </h2>
                <div
                  className="mx-auto mt-6"
                  style={{ width: 40, height: 1, background: "#C9A84C" }}
                  aria-hidden="true"
                />
              </div>
            </AnimateOnScroll>

            <div className="mt-14 grid grid-cols-1 gap-y-12 sm:mt-20 sm:grid-cols-3 sm:gap-x-10">
              {relatedProducts.map((rp, idx) => (
                <Link key={rp.slug} href={`/produits/${rp.slug}`} className="group block">
                  {/* Bottle — slides up + golden drop-shadow builds */}
                  <motion.div
                    className="relative mx-auto flex aspect-[3/4] max-w-[280px] items-center justify-center overflow-hidden"
                    style={{ background: "#FAFAF8" }}
                    variants={bottleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: bottleDuration,
                      ease: prefersReducedMotion ? "linear" : EASE_OUT_EXPO,
                      delay: idx * cardStagger,
                    }}
                  >
                    {rp.image && (
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        sizes="(max-width: 640px) 80vw, 28vw"
                        className="object-contain p-8 transition-transform duration-700 ease-out group-hover:-translate-y-2"
                      />
                    )}
                  </motion.div>
                  {/* Label — staggers 400ms after bottle */}
                  <motion.div
                    className="mt-5 text-center"
                    variants={labelVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: labelDuration,
                      ease: prefersReducedMotion ? "linear" : EASE_OUT_EXPO,
                      delay: idx * cardStagger + labelOffset,
                    }}
                  >
                    <h3
                      className="font-heading text-lg font-normal transition-colors duration-400 group-hover:text-[#8B1A1A]"
                      style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                    >
                      {rp.name}
                    </h3>
                    {rp.tagline && (
                      <p className="mt-1.5 font-body text-[0.7rem] font-light" style={{ color: "#6B6258" }}>
                        {rp.tagline}
                      </p>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Belvedere-style sections                                           */
/* ------------------------------------------------------------------ */

function LifestyleMosaic({ subcategory }: { subcategory: string | null | undefined }) {
  const { mosaic } = getLifestyleImages(subcategory);

  return (
    <section style={{ background: "#FAFAF8" }}>
      <div className="mx-auto px-[var(--content-margin-x)] py-2 sm:py-4" style={{ maxWidth: "var(--content-max-width)" }}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {mosaic.map((src, i) => (
            <AnimateOnScroll key={src} delay={i * 0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialSection({ product }: { product: Product }) {
  const { editorial } = getLifestyleImages(product.subcategory);
  const tagline = product.tagline || product.name;

  return (
    <section style={{ background: "#FAFAF8" }}>
      <div
        className="mx-auto px-[var(--content-margin-x)] py-24 sm:py-36"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Left - Impact phrase */}
          <AnimateOnScroll>
            <div>
              <p
                className="mb-5 font-body text-[0.55rem] font-normal uppercase tracking-[0.45em]"
                style={{ color: "#C9A84C" }}
              >
                L&apos;art du spiritueux
              </p>
              <h2
                className="font-heading font-light leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                  color: "#1A1A1A",
                }}
              >
                {tagline}
              </h2>
              <div
                className="my-8"
                style={{ width: 40, height: 1, background: "#C9A84C" }}
                aria-hidden="true"
              />
              <p
                className="max-w-[42ch] font-body text-[0.9rem] font-light leading-[1.9]"
                style={{ color: "#6B6258" }}
              >
                {product.description}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Right - Lifestyle photo */}
          <AnimateOnScroll delay={0.15}>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={editorial}
                alt={`${product.name} - ambiance`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CocktailVideoCard({
  video,
  isPlaying,
  onPlay,
}: {
  video: VideoSuggestion;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const recipe = parseRecipe(video.description);
  const hasRecipe = recipe.ingredients.length > 0;
  const duration = formatDuration(video.duration);

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-sm transition-all duration-300"
      style={{
        background: "#FAFAF8",
        border: isPlaying
          ? "1px solid #C9A84C"
          : "1px solid rgba(201,168,76,0.2)",
      }}
      onClick={onPlay}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" className="ml-0.5 h-5 w-5">
              <path d="M8 5v14l11-7L8 5z" fill="#1a1a1a" />
            </svg>
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 font-body text-[0.65rem] text-white/90">
            {duration}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h3
          className="font-heading text-base font-normal leading-snug sm:text-lg"
          style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
        >
          {video.title}
        </h3>
        {hasRecipe && (
          <p
            className="mt-2 font-body text-[0.6rem] uppercase tracking-[0.15em]"
            style={{ color: "#C9A84C" }}
          >
            {recipe.ingredients.length} ingrédient{recipe.ingredients.length > 1 ? "s" : ""}
            {recipe.steps.length > 0 && ` · ${recipe.steps.length} étape${recipe.steps.length > 1 ? "s" : ""}`}
          </p>
        )}
      </div>
    </article>
  );
}

function EmbeddedPlayer({
  video,
  onClose,
}: {
  video: VideoSuggestion;
  onClose: () => void;
}) {
  const recipe = parseRecipe(video.description);

  return (
    <div
      className="overflow-hidden rounded-sm"
      style={{
        background: "#FAFAF8",
        border: "1px solid rgba(201,168,76,0.2)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-3 sm:px-8 sm:py-4" style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
        <h3
          className="font-heading text-lg font-normal sm:text-xl"
          style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
        >
          {video.title}
        </h3>
        <button
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5"
          style={{ color: "#6b6258" }}
          aria-label="Fermer"
        >
          ×
        </button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[7fr_5fr]">
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div
          className="overflow-y-auto p-5 sm:p-8"
          style={{
            borderLeft: "1px solid rgba(201,168,76,0.2)",
            maxHeight: "500px",
          }}
        >
          {recipe.ingredients.length > 0 ? (
            <>
              <p
                className="mb-3 font-body text-[0.5rem] font-normal uppercase tracking-[0.3em]"
                style={{ color: "#C9A84C" }}
              >
                Ingrédients
              </p>
              <ul className="space-y-1.5">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="font-body text-[0.85rem] font-light leading-relaxed"
                    style={{ color: "#333333" }}
                  >
                    <span style={{ color: "#C9A84C" }}>·</span>{" "}
                    {ing}
                  </li>
                ))}
              </ul>
              {recipe.steps.length > 0 && (
                <>
                  <p
                    className="mb-3 mt-6 font-body text-[0.5rem] font-normal uppercase tracking-[0.3em]"
                    style={{ color: "#C9A84C" }}
                  >
                    Préparation
                  </p>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li
                        key={i}
                        className="font-body text-[0.85rem] font-light leading-relaxed"
                        style={{ color: "#333333" }}
                      >
                        <span
                          className="mr-2 font-heading text-sm"
                          style={{ fontFamily: "var(--font-display)", color: "#C9A84C" }}
                        >
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </>
          ) : recipe.raw ? (
            <p
              className="whitespace-pre-line font-body text-[0.85rem] font-light leading-relaxed"
              style={{ color: "#333333" }}
            >
              {recipe.raw.slice(0, 600)}
            </p>
          ) : (
            <p className="font-body text-sm" style={{ color: "#6b6258" }}>
              Recette non disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
