"use client";

import Image from "next/image";
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface VideoProduct {
  tag: string;
  category: string;
}

interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailMq: string;
  duration: number | null;
  viewCount: number | null;
  products: VideoProduct[];
  primaryTag: string;
  primaryCategory: string;
}

interface Props {
  videos: Video[];
}

/* ------------------------------------------------------------------ */
/*  Product chips - each Cherry River product with its bottle image     */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  { id: "all", label: "Tous", image: null, matchTags: [] as string[] },
  { id: "gin-berries", label: "Gin Petits Fruits", image: "/assets/products/CR_Gin_Berries_750mL.png", matchTags: ["Gin Petits Fruits & Basilic", "Gin"] },
  { id: "gin-pamplemousse", label: "Gin Pamplemousse", image: "/assets/products/CR_Gin_Pamplemousse_750mL.png", matchTags: ["Gin Pamplemousse", "Gin"] },
  { id: "gin-framboise", label: "Gin Framboise", image: "/assets/products/CR_Gin_FramboiseLime_750mL.png", matchTags: ["Gin Framboise & Lime", "Gin"] },
  { id: "gin-lime", label: "Gin Lime", image: "/assets/products/CR_Gin_Lime_750mL.png", matchTags: ["Gin Lime", "Gin"] },
  { id: "vodka-averse", label: "Vodka Averse", image: "/assets/products/Averse_Vodka_Premium_750mL.png", matchTags: ["Vodka Averse Premium", "Vodka"] },
  { id: "vodka-erable", label: "Vodka Érable", image: "/assets/products/CR_Vodka_Erable_750mL.png", matchTags: ["Vodka Érable", "Vodka"] },
  { id: "rhum-ambre", label: "Rhum Ambré", image: "/assets/products/CR_RhumAmbre_750mL.png", matchTags: ["Rhum"] },
  { id: "rhum-epice", label: "Rhum Épicé", image: "/assets/products/CR_RhumEpice.png", matchTags: ["Rhum"] },
  { id: "tequila", label: "Tequila Silver", image: "/assets/products/CR_TequilaSilver_750mL.png", matchTags: ["Tequila Silver", "Tequila"] },
  { id: "cafe", label: "Liqueur Café", image: "/assets/products/Coaticook_Vanille_750mL.png", matchTags: ["Liqueur de Café"] },
  { id: "amaretto", label: "Amaretto", image: null, matchTags: ["Liqueur Amaretto"] },
  { id: "opemiska", label: "Opemiska Boréal", image: "/assets/products/Ope_Gin_Boreal_750mL.png", matchTags: ["Gin Boréal Opemiska"] },
  { id: "mocktail", label: "Mocktails", image: "/assets/products/cans-na/CR_Mojito_355mL_SANS_ALCOOL_FRAN.png", matchTags: ["Mocktail"] },
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getDifficulty(duration: number | null): { label: string; dots: number } {
  if (!duration) return { label: "Facile", dots: 1 };
  if (duration < 180) return { label: "Facile", dots: 1 };
  if (duration < 300) return { label: "Moyen", dots: 2 };
  return { label: "Avancé", dots: 3 };
}

interface ParsedRecipe {
  ingredients: string[];
  steps: string[];
  raw: string | null;
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

    if (NOISE_RE.test(line) || URL_RE.test(line) || SEPARATOR_RE.test(line)) {
      continue;
    }

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
        if (isStepLine(line)) {
          steps.push(cleanLine(line));
        }
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
  if (QUANTITY_START_RE.test(line) && line.length < 80 && !/[.!?]$/.test(line)) return true;
  return false;
}

function isStepLine(line: string): boolean {
  if (NOISE_RE.test(line) || URL_RE.test(line) || SEPARATOR_RE.test(line)) return false;
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

function videoHasStructuredRecipe(video: Video): boolean {
  return parseRecipe(video.description).ingredients.length > 0;
}

/** Famille de spiritueux de base pour le repli (aucune suggestion hors de ces liens). */
function getSpiritBaseFamily(primaryTag: string): string {
  const t = primaryTag.toLowerCase();
  if (t.includes("vodka")) return "vodka";
  if (t.includes("gin")) return "gin";
  if (t.includes("rhum") || t.includes("rum")) return "rhum";
  if (t.includes("tequila")) return "tequila";
  if (t.includes("bourbon") || t.includes("whiskey") || t.includes("whisky")) return "whisky";
  if (t.includes("liqueur") || t.includes("amaretto") || t.includes("café") || t.includes("cafe"))
    return "liqueur";
  if (t.includes("mocktail") || t.includes("limonade")) return "mocktail";
  if (t.includes("cocktail")) return "cocktail";
  return "other";
}

/** Même produit / spiritueux principal : tag principal identique ou étiquette produit en commun. */
function sharesPrincipalSpiritOrProduct(a: Video, b: Video): boolean {
  const pa = a.primaryTag.toLowerCase().trim();
  const pb = b.primaryTag.toLowerCase().trim();
  if (pa && pb && pa === pb) return true;
  const setA = new Set(a.products.map((p) => p.tag.toLowerCase()));
  return b.products.some((p) => setA.has(p.tag.toLowerCase()));
}

/**
 * Suggestions (max 8) : uniquement d'autres vidéos avec recette structurée.
 * 1) Même produit / spiritueux principal (primaryTag ou tag produit commun).
 * 2) Sinon même famille de base (gin -> gin, vodka -> vodka, etc.).
 * Jamais de suggestions sans lien ; si aucun match, liste vide.
 */
function getSuggestedRecipeVideos(current: Video, allVideos: Video[]): Video[] {
  const candidates = allVideos.filter(
    (v) => v.videoId !== current.videoId && videoHasStructuredRecipe(v),
  );
  const tierSameProduct = candidates.filter((v) => sharesPrincipalSpiritOrProduct(v, current));
  if (tierSameProduct.length > 0) return tierSameProduct.slice(0, 8);

  const fam = getSpiritBaseFamily(current.primaryTag);
  if (fam === "other") return [];
  const tierSameFamily = candidates.filter((v) => getSpiritBaseFamily(v.primaryTag) === fam);
  return tierSameFamily.slice(0, 8);
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function CocktailCultureClient({ videos }: Props) {
  const [activeProduct, setActiveProduct] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [fadeState, setFadeState] = useState<"visible" | "fading">("visible");
  const [displayedProduct, setDisplayedProduct] = useState("all");
  const playerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollBy = useCallback((dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  }, []);

  const filtered = useMemo(() => {
    const product = PRODUCTS.find((p) => p.id === displayedProduct);
    if (!product || product.id === "all") return videos;
    return videos.filter((v) =>
      v.products.some((vp) =>
        product.matchTags.some(
          (mt) => vp.tag === mt || vp.tag.toLowerCase().includes(mt.toLowerCase())
        )
      )
    );
  }, [videos, displayedProduct]);

  const selectProduct = useCallback(
    (id: string) => {
      if (id === activeProduct) return;
      setActiveProduct(id);
      setFadeState("fading");
      setTimeout(() => {
        setDisplayedProduct(id);
        setFadeState("visible");
      }, 250);
    },
    [activeProduct]
  );

  const openVideo = useCallback((video: Video) => {
    setSelectedVideo(video);
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const closeVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeVideo]);

  const activeInfo = PRODUCTS.find((p) => p.id === activeProduct);
  const videoCount = useMemo(() => {
    if (activeProduct === "all") return videos.length;
    const product = PRODUCTS.find((p) => p.id === activeProduct);
    if (!product) return 0;
    return videos.filter((v) =>
      v.products.some((vp) =>
        product.matchTags.some(
          (mt) => vp.tag === mt || vp.tag.toLowerCase().includes(mt.toLowerCase())
        )
      )
    ).length;
  }, [videos, activeProduct]);

  const selectedParsedRecipe = useMemo(
    () => (selectedVideo ? parseRecipe(selectedVideo.description) : null),
    [selectedVideo],
  );
  const selectedHasStructuredRecipe =
    selectedParsedRecipe !== null && selectedParsedRecipe.ingredients.length > 0;

  const suggestedRecipeVideos = useMemo(() => {
    if (!selectedVideo || !selectedHasStructuredRecipe) return [];
    return getSuggestedRecipeVideos(selectedVideo, videos);
  }, [selectedVideo, selectedHasStructuredRecipe, videos]);

  return (
    <div style={{ background: "#1C1C1C" }}>
      {/* ============ HERO ============ */}
      <section className="relative px-[var(--content-margin-x)] pb-8 pt-28 sm:pt-40" style={{ background: "#090909" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
          <p
            className="mb-5 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
            style={{ color: "#C9A84C" }}
          >
            Cocktail Culture
          </p>
          <h1
            className="font-heading font-light"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.1,
              color: "#f0ebe4",
              maxWidth: "18ch",
            }}
          >
            L&apos;art de la mixologie Cherry River
          </h1>
          <p className="mt-6 max-w-lg font-body text-[0.95rem] font-light leading-relaxed" style={{ color: "#a89f94" }}>
            {videos.length} recettes vidéo — sélectionnez un produit pour
            découvrir ses cocktails signatures.
          </p>
        </div>
      </section>

      {/* ============ PRODUCT SELECTOR — horizontal scroll ============ */}
      <section
        className="sticky top-[62px] z-30 sm:top-[72px]"
        style={{ background: "#090909", borderBottom: "0.5px solid #2a2520" }}
      >
        <div className="relative mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
          {/* Fade edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, #090909 0%, transparent 100%)",
              opacity: canScrollLeft ? 1 : 0,
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to left, #090909 0%, transparent 100%)",
              opacity: canScrollRight ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {/* Scroll arrows — desktop */}
          {canScrollLeft && (
            <button
              onClick={() => scrollBy(-1)}
              className="absolute left-1 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full md:flex"
              style={{
                width: 44,
                height: 44,
                background: "rgba(201,168,76,0.15)",
                border: "0.5px solid rgba(201,168,76,0.3)",
              }}
              aria-label="Défiler à gauche"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollBy(1)}
              className="absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full md:flex"
              style={{
                width: 44,
                height: 44,
                background: "rgba(201,168,76,0.15)",
                border: "0.5px solid rgba(201,168,76,0.3)",
              }}
              aria-label="Défiler à droite"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto px-[var(--content-margin-x)] py-4 md:gap-3"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {PRODUCTS.map((product) => {
              const isActive = activeProduct === product.id;
              return (
                <button
                  key={product.id}
                  onClick={() => selectProduct(product.id)}
                  className="group flex flex-shrink-0 items-center gap-2 rounded-none border px-3 py-2 transition-all duration-400 sm:gap-3 sm:px-4 sm:py-2.5 md:px-5 md:py-3"
                  style={{
                    borderColor: isActive ? "#C9A84C" : "#2a2520",
                    background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                    minWidth: product.image ? "auto" : "80px",
                  }}
                >
                  {/* Mini bottle image */}
                  {product.image && (
                    <div
                      className="relative flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ width: 18, height: 38 }}
                    >
                      <Image
                        src={product.image}
                        alt={product.label}
                        width={18}
                        height={38}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  )}
                  {/* Label */}
                  <span
                    className="whitespace-nowrap font-body text-[0.55rem] font-normal uppercase tracking-[0.1em] transition-colors duration-300 sm:text-[0.65rem] sm:tracking-[0.12em]"
                    style={{ color: isActive ? "#C9A84C" : "#a89f94" }}
                  >
                    {product.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active product summary */}
          <div className="flex items-center gap-3 px-[var(--content-margin-x)] pb-4">
            <div className="h-px flex-1" style={{ background: "#2a2520" }} />
            <p className="font-body text-[0.6rem] font-normal uppercase tracking-[0.2em]" style={{ color: "#6b6258" }}>
              {activeInfo?.label ?? "Tous"} — {videoCount} recette{videoCount !== 1 ? "s" : ""}
            </p>
            <div className="h-px flex-1" style={{ background: "#2a2520" }} />
          </div>
        </div>
      </section>

      {/* ============ VIDEO PLAYER ============ */}
      {selectedVideo && (
        <section ref={playerRef} className="px-[var(--content-margin-x)] py-8 sm:py-12" style={{ background: "#090909" }}>
          <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
            <button
              onClick={closeVideo}
              className="mb-6 flex items-center gap-2 font-body text-[0.7rem] font-normal uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#C9A84C]"
              style={{ color: "#6b6258" }}
            >
              ← Retour aux recettes
            </button>

            <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {!selectedHasStructuredRecipe ? (
              <h2
                className="mx-auto mt-8 max-w-3xl text-center font-heading text-2xl font-light text-balance sm:mt-10 md:text-3xl"
                style={{ fontFamily: "var(--font-display)", color: "#f0ebe4" }}
              >
                {selectedVideo.title}
              </h2>
            ) : (
              <>
                <h2
                  className="mt-6 font-heading text-2xl font-light sm:mt-8 md:text-3xl"
                  style={{ fontFamily: "var(--font-display)", color: "#f0ebe4" }}
                >
                  {selectedVideo.title}
                </h2>

                <div
                  className="mt-6 flex max-w-3xl flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8"
                  aria-label="Produit et niveau"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {selectedVideo.products.map((p) => (
                      <span
                        key={p.tag}
                        className="border px-3 py-1 font-body text-[0.55rem] font-normal uppercase tracking-[0.2em]"
                        style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
                      >
                        {p.tag}
                      </span>
                    ))}
                  </div>
                  {selectedVideo.duration && (
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b6258" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span className="font-body text-[0.75rem] font-light" style={{ color: "#a89f94" }}>
                        {formatDuration(selectedVideo.duration)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[0.75rem] font-light" style={{ color: "#a89f94" }}>
                      {getDifficulty(selectedVideo.duration).label}
                    </span>
                    <span className="flex gap-0.5" aria-hidden="true">
                      {[1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background: d <= getDifficulty(selectedVideo.duration).dots ? "#C9A84C" : "#2a2520",
                          }}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                {selectedParsedRecipe && (
                  <div className="mt-10 max-w-3xl sm:mt-12">
                    <p
                      className="mb-3 font-body text-[0.55rem] font-normal uppercase tracking-[0.3em]"
                      style={{ color: "#6b6258" }}
                    >
                      Ingrédients
                    </p>
                    <ul className="space-y-2.5">
                      {selectedParsedRecipe.ingredients.map((line, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-body text-[0.82rem] font-light leading-relaxed"
                          style={{ color: "#f0ebe4" }}
                        >
                          <span
                            className="mt-[7px] block h-1 w-1 flex-shrink-0 rounded-full"
                            style={{ background: "#C9A84C" }}
                          />
                          {line}
                        </li>
                      ))}
                    </ul>

                    {selectedParsedRecipe.steps.length > 0 && (
                      <div className="mt-10 border-t pt-10 sm:mt-12 sm:pt-12" style={{ borderColor: "#2a2520" }}>
                        <p
                          className="mb-3 font-body text-[0.55rem] font-normal uppercase tracking-[0.3em]"
                          style={{ color: "#6b6258" }}
                        >
                          Préparation
                        </p>
                        <ol className="space-y-3">
                          {selectedParsedRecipe.steps.map((step, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 font-body text-[0.82rem] font-light leading-relaxed"
                              style={{ color: "#f0ebe4" }}
                            >
                              <span
                                className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center font-body text-[0.6rem] font-normal"
                                style={{ color: "#C9A84C", border: "0.5px solid #2a2520" }}
                              >
                                {i + 1}
                              </span>
                              <span className="flex-1">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}

                {suggestedRecipeVideos.length > 0 && (
                  <div className="mt-14 border-t pt-12 sm:mt-16 sm:pt-14" style={{ borderColor: "#2a2520" }}>
                    <p
                      className="mb-8 font-body text-[0.65rem] font-normal uppercase tracking-[0.3em]"
                      style={{ color: "#C9A84C" }}
                    >
                      Recettes suggérées
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                      {suggestedRecipeVideos.map((video) => {
                        const diff = getDifficulty(video.duration);
                        return (
                          <button
                            key={video.videoId}
                            type="button"
                            onClick={() => openVideo(video)}
                            className="group flex w-full flex-col text-left"
                          >
                            <div className="relative aspect-video w-full overflow-hidden">
                              <Image
                                src={video.thumbnailMq}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {video.products.slice(0, 2).map((p) => (
                                <span
                                  key={p.tag}
                                  className="font-body text-[0.55rem] font-normal uppercase tracking-[0.18em]"
                                  style={{ color: "#C9A84C" }}
                                >
                                  {p.tag}
                                </span>
                              ))}
                            </div>
                            <h3
                              className="mt-1 line-clamp-2 min-h-[2.5rem] font-heading text-base font-normal leading-snug transition-colors duration-300 group-hover:text-[#C9A84C]"
                              style={{ fontFamily: "var(--font-display)", color: "#f0ebe4" }}
                            >
                              {video.title}
                            </h3>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="font-body text-[0.6rem] font-light" style={{ color: "#6b6258" }}>
                                {diff.label}
                              </span>
                              <span className="flex gap-0.5">
                                {[1, 2, 3].map((d) => (
                                  <span
                                    key={d}
                                    className="inline-block h-1 w-1 rounded-full"
                                    style={{ background: d <= diff.dots ? "#C9A84C" : "#2a2520" }}
                                  />
                                ))}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* ============ VIDEO GRID with fade ============ */}
      <section className="px-[var(--content-margin-x)] py-16" style={{ background: "#1C1C1C" }}>
        <div
          className="mx-auto transition-all duration-300"
          style={{
            maxWidth: "var(--content-max-width)",
            opacity: fadeState === "visible" ? 1 : 0,
            transform: fadeState === "visible" ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-heading text-xl font-light italic" style={{ fontFamily: "var(--font-display)", color: "#6b6258" }}>
                Aucune recette pour ce produit — bientôt disponible.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {filtered.map((video) => {
                const diff = getDifficulty(video.duration);
                return (
                  <button
                    key={video.videoId}
                    onClick={() => openVideo(video)}
                    className="group flex w-full flex-col text-left"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={video.thumbnailMq}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/20">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100"
                          style={{ background: "rgba(201,168,76,0.9)" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#090909">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {video.duration && (
                        <span
                          className="absolute bottom-2 right-2 px-2 py-0.5 font-body text-[0.65rem]"
                          style={{ background: "rgba(0,0,0,0.8)", color: "#f0ebe4" }}
                        >
                          {formatDuration(video.duration)}
                        </span>
                      )}
                    </div>

                    {/* Card info */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {video.products.slice(0, 2).map((p) => (
                            <span
                              key={p.tag}
                              className="font-body text-[0.55rem] font-normal uppercase tracking-[0.18em]"
                              style={{ color: "#C9A84C" }}
                            >
                              {p.tag}
                            </span>
                          ))}
                        </div>
                        {/* Difficulty dots */}
                        <div className="flex items-center gap-1.5">
                          <span className="font-body text-[0.55rem] font-normal uppercase tracking-[0.1em]" style={{ color: "#6b6258" }}>
                            {diff.label}
                          </span>
                          <span className="flex gap-0.5">
                            {[1, 2, 3].map((d) => (
                              <span
                                key={d}
                                className="inline-block h-1 w-1 rounded-full"
                                style={{ background: d <= diff.dots ? "#C9A84C" : "#2a2520" }}
                              />
                            ))}
                          </span>
                        </div>
                      </div>

                      <h3
                        className="mt-2 line-clamp-2 min-h-[2.8rem] font-heading text-lg font-normal leading-tight transition-colors duration-300 group-hover:text-[#C9A84C]"
                        style={{ fontFamily: "var(--font-display)", color: "#f0ebe4" }}
                      >
                        {video.title}
                      </h3>

                      {/* Prep time + CTA */}
                      <div className="mt-3 flex items-center justify-between">
                        {video.duration && (
                          <span className="flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b6258" strokeWidth="1.5">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                            <span className="font-body text-[0.65rem] font-light" style={{ color: "#6b6258" }}>
                              {formatDuration(video.duration)}
                            </span>
                          </span>
                        )}
                        <span
                          className="font-body text-[0.65rem] font-normal uppercase tracking-[0.12em] transition-colors duration-300 group-hover:text-[#C9A84C]"
                          style={{ color: "#6b6258" }}
                        >
                          Voir la recette →
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Hide scrollbar globally for this component */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
