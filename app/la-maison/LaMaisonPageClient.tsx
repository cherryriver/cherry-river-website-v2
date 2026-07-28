"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BRANDS = [
  {
    name: "Cherry River",
    tagline: "Spiritueux artisanaux, cocktails prêts-à-boire et mixers — la gamme signature.",
    logo: "/assets/brands/cherry-river/CherryRiver_Logo_Noir.png",
    href: "/produits",
    logoBg: "light" as const,
  },
  {
    name: "Averse",
    tagline: "La gamme premium grand format — vodka, gin, rhum et liqueurs pour la restauration.",
    logo: "/assets/brands/averse/Logo Averse_Noir.png",
    href: "/produits/vodka-averse-premium",
    logoBg: "light" as const,
  },
  {
    name: "Opemiska",
    tagline: "Gins nordiques inspirés de la forêt boréale — botaniques sauvages du Québec.",
    logo: "/assets/brands/opemiska/Logo_Opemiska_Couleur.png",
    href: "/produits/opemiska-gin-boreal",
    logoBg: "dark" as const,
  },
  {
    name: "Alister MacKenzie",
    tagline: "Hommage au légendaire architecte de golf — un whisky de caractère.",
    logo: "/assets/brands/alister/Logo Alister_Black.png",
    href: "/produits",
    logoBg: "light" as const,
  },
  {
    name: "The Thirst is Real",
    tagline: "En partenariat avec NeNe Leakes — une gamme audacieuse et festive.",
    logo: "/assets/brands/thirst/Logo_The thirst is real_Color.png",
    href: "/produits",
    logoBg: "photo" as const,
  },
];

const AWARDS = [
  {
    source: "Forbes",
    title: "Raspberry & Lime Gin",
    detail: "Gold — 93/100",
    year: "2024",
  },
  {
    source: "Forbes",
    title: "Spiced Rum",
    detail: "Gold — 92/100",
    year: "2024",
  },
  {
    source: "SAQ",
    title: "Distribution provinciale",
    detail: "Réseau de la Société des alcools du Québec",
    year: "",
  },
  {
    source: "Costco",
    title: "Partenaire national",
    detail: "Distribution à l'échelle canadienne",
    year: "",
  },
];

const TIMELINE = [
  {
    year: "1875",
    eyebrow: "Origine",
    title: "Une église anglicane prend racine à Magog",
    description:
      "L'édifice patrimonial qui deviendra notre première distillerie est érigé au cœur des Cantons-de-l'Est. Plus de 150 ans plus tard, ses murs de pierre porteront nos alambics.",
  },
  {
    year: "2018",
    eyebrow: "Renaissance",
    title: "Cherry River fait renaître l'édifice",
    description:
      "Acquisition et transformation de l'église anglicane en distillerie artisanale. Les premiers alambics de cuivre s'installent sous les voûtes patrimoniales.",
  },
  {
    year: "2022",
    eyebrow: "Expansion",
    title: "Mémorial Hall, Sillery",
    description:
      "Une seconde maison patrimoniale ouvre ses portes à Québec — bar, distillerie boutique et salle de dégustation dans un Mémorial Hall historique.",
  },
  {
    year: "2024",
    eyebrow: "Reconnaissance",
    title: "Forbes Gold",
    description:
      "Notre Raspberry & Lime Gin (93/100) et notre Spiced Rum (92/100) reçoivent la distinction Gold du panel Forbes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LaMaisonPageClient() {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pb-16 sm:min-h-[75vh] sm:pb-24">
        <Image
          src="/assets/lifestyle/Photo distillerie Magog/DSC_7908.jpg"
          alt="Distillerie Cherry River — Magog"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(0,0,0,0.45)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
          }}
        />

        <div
          className="relative z-10 mx-auto w-full px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              La Maison
            </p>
            <h1
              className="max-w-[16ch] font-heading text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Pierre, cuivre,
              <br />
              <em className="font-light">Cantons-de-l&apos;Est</em>
            </h1>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Notre Histoire ──────────────────────────────────── */}
      <section
        className="py-20 sm:py-32"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <div className="flex flex-col justify-center">
              {/* Stagger 200ms : eyebrow → H2 → séparateur → 3 paragraphes */}
              <AnimateOnScroll direction="up" distance={20} delay={0} duration={0.7}>
                <p
                  className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                  style={{ color: "var(--color-accent-gold)" }}
                >
                  Notre histoire
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" distance={28} delay={0.2} duration={0.9}>
                <h2
                  className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark)",
                  }}
                >
                  Une église anglicane. Des alambics de cuivre.
                </h2>
              </AnimateOnScroll>

              <AnimateOnScroll direction="left" distance={48} delay={0.4} duration={0.8}>
                <div
                  className="mt-6 h-px w-12"
                  style={{
                    background: "var(--color-accent-gold)",
                    opacity: 0.4,
                  }}
                />
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" distance={24} delay={0.6} duration={0.8}>
                <p
                  className="mt-6 font-body text-[1rem] font-light leading-[2] sm:text-[1.0625rem]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Créer les meilleures boissons possible, avec les meilleurs
                  ingrédients possible. Forgés par la nature des
                  Cantons-de-l&apos;Est, ancrés dans le patrimoine québécois.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" distance={24} delay={0.8} duration={0.8}>
                <p
                  className="mt-4 font-body text-[1rem] font-light leading-[2] sm:text-[1.0625rem]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  D&apos;une ancienne église anglicane de Magog à un Mémorial
                  Hall historique de Sillery — nous avons donné une seconde
                  vie à deux lieux patrimoniaux pour y installer nos alambics,
                  notre bar et notre vision.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" distance={24} delay={1.0} duration={0.8}>
                <p
                  className="mt-4 font-body text-[1rem] font-light leading-[2] sm:text-[1.0625rem]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Aujourd&apos;hui, Cherry River est bien plus qu&apos;une
                  distillerie — c&apos;est une maison de boissons modernes,
                  une destination et un art de vivre.
                </p>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll direction="right" distance={48} delay={0.3} duration={1.0}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/assets/lifestyle/Photo distillerie Magog/DSC_0813.JPG"
                  alt="Église anglicane de Magog — Distillerie Cherry River"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Notre Philosophie ───────────────────────────────── */}
      <section style={{ background: "var(--bg-black)" }} className="py-20 sm:py-32">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p
                className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "var(--color-accent-gold)" }}
              >
                Notre philosophie
              </p>
              <h2
                className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light italic"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-light)",
                }}
              >
                &ldquo;Un seul créateur.
                <br />
                Tout l&apos;univers du cocktail.&rdquo;
              </h2>

              <div
                className="mx-auto mt-8 h-px w-16"
                style={{
                  background: "var(--color-accent-gold)",
                  opacity: 0.3,
                }}
              />

              <p
                className="mt-8 font-body text-[1rem] font-light leading-[2] sm:text-[1.0625rem]"
                style={{ color: "var(--text-light-secondary)" }}
              >
                Du spiritueux artisanal au tonic maison, du sirop à la canette
                prête à boire — nous contrôlons chaque étape. Aucun compromis.
                Nulle part dans la chaîne.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Timeline narrative */}
          <div className="mx-auto mt-20 max-w-2xl sm:mt-28">
            <div className="relative">
              {/* Vertical golden line */}
              <div
                className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[11px]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, var(--color-accent-gold) 12%, var(--color-accent-gold) 88%, transparent 100%)",
                  opacity: 0.3,
                }}
                aria-hidden
              />

              <ol className="space-y-16 sm:space-y-20">
                {TIMELINE.map((milestone, index) => (
                  <li key={milestone.year}>
                    <AnimateOnScroll
                      direction="up"
                      distance={28}
                      delay={0.1 + index * 0.15}
                      duration={0.9}
                    >
                      <div className="relative pl-10 sm:pl-16">
                        {/* Marker dot */}
                        <span
                          className="absolute left-1 top-[10px] block h-2 w-2 rounded-full sm:left-2"
                          style={{
                            background: "var(--color-accent-gold)",
                            boxShadow: "0 0 0 4px var(--bg-black)",
                          }}
                          aria-hidden
                        />

                        {/* Year */}
                        <span
                          className="block font-heading font-light leading-none"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-accent-gold)",
                            fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)",
                          }}
                        >
                          {milestone.year}
                        </span>

                        {/* Eyebrow */}
                        <p
                          className="mt-4 font-body text-[0.6rem] font-normal uppercase tracking-[0.35em]"
                          style={{
                            color: "var(--color-accent-gold)",
                            opacity: 0.65,
                          }}
                        >
                          {milestone.eyebrow}
                        </p>

                        {/* Headline */}
                        <h3
                          className="mt-3 font-heading text-[1.125rem] font-light italic leading-[1.35] sm:text-[1.3125rem]"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--text-light)",
                          }}
                        >
                          {milestone.title}
                        </h3>

                        {/* Body */}
                        <p
                          className="mt-3 font-body text-[0.9375rem] font-light leading-[1.8]"
                          style={{ color: "var(--text-light-muted)" }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </AnimateOnScroll>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ─── L'Artisan ───────────────────────────────────────── */}
      <section
        className="py-20 sm:py-32"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Photo */}
            <AnimateOnScroll>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/assets/lifestyle/Photo distillerie Magog/MD-91.jpg"
                  alt="Frédéric Delage — Maître Distillateur, Cherry River"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </AnimateOnScroll>

            {/* Bio */}
            <AnimateOnScroll delay={0.15}>
              <div className="flex flex-col justify-center">
                <p
                  className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                  style={{ color: "var(--color-accent-gold)" }}
                >
                  L&apos;artisan
                </p>
                <h2
                  className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark)",
                  }}
                >
                  Frédéric Delage
                </h2>
                <p
                  className="mt-1 font-heading text-[clamp(1rem,2vw,1.25rem)] font-light italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark-secondary)",
                  }}
                >
                  Maître Distillateur
                </p>

                <div
                  className="mt-6 h-px w-12"
                  style={{
                    background: "var(--color-accent-gold)",
                    opacity: 0.4,
                  }}
                />

                <p
                  className="mt-6 font-heading text-[clamp(1.1rem,2.5vw,1.5rem)] font-light italic leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark)",
                  }}
                >
                  &ldquo;Distillé à la main. Magog, Québec.&rdquo;
                </p>

                <p
                  className="mt-6 font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Passionné par le terroir québécois et l&apos;innovation en
                  distillation, Frédéric a fondé Cherry River avec une conviction :
                  chaque spiritueux doit raconter une histoire — celle de ses
                  ingrédients, de son territoire et de la main qui l&apos;a créé.
                </p>
                <p
                  className="mt-4 font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Formé en distillation artisanale, il supervise personnellement
                  chaque lot — de la sélection des botaniques à l&apos;assemblage
                  final. Son approche allie les techniques traditionnelles
                  européennes à l&apos;audace et la créativité québécoise.
                </p>
                <p
                  className="mt-4 font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Le résultat : une gamme de plus de 30 créations reconnues —
                  des gins primés par Forbes aux liqueurs exclusives, en passant
                  par des cocktails prêts-à-boire qui redéfinissent la catégorie.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Nos Marques ─────────────────────────────────────── */}
      <section style={{ background: "var(--bg-dark)" }} className="py-20 sm:py-28">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Nos marques
            </p>
            <h2
              className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Un univers, cinq signatures
            </h2>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {BRANDS.map((brand, idx) => (
              <AnimateOnScroll key={brand.name} delay={idx * 0.07}>
                <BrandCard brand={brand} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reconnaissances ─────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <div className="text-center">
              <p
                className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "var(--color-accent-gold)" }}
              >
                Reconnaissances
              </p>
              <h2
                className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-dark)",
                }}
              >
                La qualité reconnue
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-4 sm:gap-5">
            {AWARDS.map((award, idx) => {
              // Bento asymétrique :
              //   idx 0 → Forbes Gold 93   = 2 cols × 2 rows (grande cellule)
              //   idx 1 → Forbes Spiced 92 = 2 cols × 1 row  (cellule moyenne)
              //   idx 2 → SAQ              = 1 col  × 1 row  (compacte)
              //   idx 3 → Costco           = 1 col  × 1 row  (compacte)
              const isLarge = idx === 0;
              const isMedium = idx === 1;

              const gridSpan = isLarge
                ? "sm:col-span-2 sm:row-span-2"
                : isMedium
                  ? "sm:col-span-2"
                  : "sm:col-span-1";

              // Détecte le préfixe "Gold" pour activer le badge rouge cerise
              const goldMatch = /^(Gold)\s*(.*)$/.exec(award.detail);

              return (
                <AnimateOnScroll
                  key={award.title}
                  delay={idx * 0.08}
                  direction="up"
                  distance={28}
                  duration={0.85}
                  className={gridSpan}
                >
                  <div
                    className={`flex h-full flex-col justify-between rounded-sm border transition-colors duration-500 hover:border-[color:var(--color-accent-gold)] ${
                      isLarge ? "p-8 sm:p-12" : "p-6 sm:p-7"
                    }`}
                    style={{
                      borderColor: "var(--border-light)",
                      background: isLarge
                        ? "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0) 100%)"
                        : "transparent",
                    }}
                  >
                    {/* En-tête : source (small-caps) + année */}
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className={`font-body font-normal tracking-[0.25em] ${
                          isLarge ? "text-[0.7rem]" : "text-[0.6rem]"
                        }`}
                        style={{
                          color: "var(--color-accent-gold)",
                          fontVariant: "small-caps",
                          fontFeatureSettings: '"smcp"',
                        }}
                      >
                        {award.source}
                      </span>
                      {award.year && (
                        <span
                          className={`font-body font-light ${
                            isLarge ? "text-[0.7rem]" : "text-[0.6rem]"
                          }`}
                          style={{ color: "var(--text-dark-muted)" }}
                        >
                          {award.year}
                        </span>
                      )}
                    </div>

                    {/* Bloc titre + détail (poussé vers le bas pour la grande cellule) */}
                    <div className={isLarge ? "mt-auto pt-12 sm:pt-16" : "mt-3"}>
                      <h3
                        className={`font-heading font-light ${
                          isLarge
                            ? "text-3xl sm:text-4xl lg:text-[2.5rem]"
                            : "text-lg sm:text-xl"
                        }`}
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text-dark)",
                          lineHeight: isLarge ? 1.1 : 1.25,
                        }}
                      >
                        {award.title}
                      </h3>
                      <p
                        className={`mt-2 font-body font-light ${
                          isLarge ? "text-base sm:text-lg" : "text-[0.8125rem]"
                        }`}
                        style={{ color: "var(--text-dark-secondary)" }}
                      >
                        {goldMatch ? (
                          <>
                            <span
                              className="font-medium"
                              style={{
                                color: "var(--color-accent-cherry)",
                                letterSpacing: "0.02em",
                              }}
                            >
                              {goldMatch[1]}
                            </span>{" "}
                            {goldMatch[2]}
                          </>
                        ) : (
                          award.detail
                        )}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-black)" }} className="py-16 sm:py-24">
        <div
          className="mx-auto px-[var(--content-margin-x)] text-center"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              À découvrir
            </p>
            <h2
              className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Plongez dans l&apos;univers
            </h2>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                href="/distilleries"
                className="inline-flex w-full items-center justify-center border px-10 py-4 font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] hover:text-[var(--text-dark)] sm:w-auto"
                style={{
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "var(--text-light)",
                }}
              >
                Visiter nos distilleries
              </Link>
              <Link
                href="/produits"
                className="inline-flex w-full items-center justify-center border px-10 py-4 font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] hover:text-[var(--text-dark)] sm:w-auto"
                style={{
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "var(--text-light)",
                }}
              >
                Découvrir nos produits
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  Brand Card                                                         */
/* ================================================================== */

function BrandCard({
  brand,
}: {
  brand: (typeof BRANDS)[number];
}) {
  const isPhoto = brand.logoBg === "photo";
  const isDark = brand.logoBg === "dark";

  return (
    <Link
      href={brand.href}
      className="group flex flex-col overflow-hidden rounded-sm transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo area */}
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden px-8"
        style={{
          background: isPhoto
            ? "transparent"
            : isDark
              ? "#0c1a0c"
              : "rgba(255,255,255,0.06)",
        }}
      >
        <Image
          src={brand.logo}
          alt={`Logo ${brand.name}`}
          width={isPhoto ? 400 : 180}
          height={isPhoto ? 250 : 80}
          className={`object-contain transition-transform duration-500 group-hover:scale-[1.03] ${
            isPhoto
              ? "h-full w-full object-cover"
              : "max-h-[60%] max-w-[70%]"
          }`}
          style={
            !isPhoto && !isDark
              ? { filter: "invert(1)", opacity: 0.85 }
              : isDark
                ? { opacity: 0.9 }
                : {}
          }
        />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className="font-heading text-lg font-normal sm:text-xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-light)",
          }}
        >
          {brand.name}
        </h3>
        <p
          className="mt-2 font-body text-[0.8125rem] font-light leading-relaxed"
          style={{ color: "var(--text-light-secondary)" }}
        >
          {brand.tagline}
        </p>
        <span
          className="mt-auto pt-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em] transition-colors group-hover:text-[var(--color-accent-gold)]"
          style={{ color: "var(--text-light-muted)" }}
        >
          Découvrir →
        </span>
      </div>
    </Link>
  );
}
