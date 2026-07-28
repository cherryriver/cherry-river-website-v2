"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { DistilleryPhotoAddressBlock } from "@/components/distilleries/DistilleryPhotoAddressBlock";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

/* ------------------------------------------------------------------ */
/*  Photo gallery data                                                 */
/* ------------------------------------------------------------------ */

const MAGOG_GALLERY = [
  { src: "/assets/lifestyle/Photo distillerie Magog/DSC_0813.JPG", alt: "Distillerie Cherry River — Magog, ancienne église anglicane" },
  { src: "/assets/lifestyle/Photo distillerie Magog/MD-14.jpg", alt: "Intérieur de la distillerie Magog — alambics en cuivre" },
  { src: "/assets/lifestyle/Photo distillerie Magog/DSC_0829.JPG", alt: "Nef de l'église transformée en salle de distillation, Magog" },
  { src: "/assets/lifestyle/Photo distillerie Magog/MD-91.jpg", alt: "Bar de dégustation de la distillerie Cherry River à Magog" },
  { src: "/assets/lifestyle/Photo distillerie Magog/DSC_0838.JPG", alt: "Vitraux et voûtes de l'église anglicane, distillerie Magog" },
  { src: "/assets/lifestyle/Photo distillerie Magog/DSC_7908.jpg", alt: "Vue d'ensemble de la distillerie Cherry River, Magog" },
];

const QUEBEC_GALLERY = [
  { src: "/assets/lifestyle/curated/gin-petits-fruits-basilic.png", alt: "Distillerie Cherry River — Québec, Mémorial Hall de Sillery" },
  { src: "/assets/lifestyle/curated/cocktails-blancs-cuir.png", alt: "Boutique et espace d'accueil, distillerie Québec — Sillery" },
  { src: "/assets/lifestyle/curated/mixologie-opemiska-whisky.png", alt: "Salle de réception et bar à cocktails, distillerie Québec" },
  { src: "/assets/lifestyle/curated/cocktails-martini-bleuets.png", alt: "Spiritueux Cherry River exposés en boutique, Québec" },
  { src: "/assets/lifestyle/curated/cocktails-pamplemousse-editorial.png", alt: "Intérieur élégant du Mémorial Hall, distillerie Québec" },
  { src: "/assets/lifestyle/curated/gin-pamplemousse-piscine.png", alt: "Ambiance lumineuse de la distillerie Cherry River à Québec" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DistilleriesPageClient() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ─── Hero — Video Background ────────────────────────── */}
      <section
        className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden"
        style={{ background: "#090909" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/assets/brands/cherry-river/Instagram_Cherry_River_Barils.jpg"
        >
          <source
            src="/assets/videos/compressed/distillerie-cherry-river.webm"
            type="video/webm"
          />
          <source
            src="/assets/videos/compressed/distillerie-cherry-river.mp4"
            type="video/mp4"
          />
        </video>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-56"
          style={{
            background:
              "linear-gradient(to top, #090909 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p
            className="mb-5 font-body text-[0.65rem] font-normal uppercase tracking-[0.4em]"
            style={{
              color: "var(--color-accent-gold)",
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }}
          >
            Nos distilleries
          </p>
          <h1
            className="font-heading text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-light)",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(25px)",
              transition: "all 1s ease 0.5s",
            }}
          >
            Deux adresses,
            <br />
            <em className="font-light">une même exigence</em>
          </h1>
          <p
            className="mt-6 max-w-[48ch] font-body text-[1rem] font-light leading-relaxed sm:text-[1.0625rem]"
            style={{
              color: "var(--text-light-secondary)",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s ease 0.8s",
            }}
          >
            Deux lieux patrimoniaux reconvertis en distilleries artisanales —
            où l&apos;histoire rencontre la création.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-12"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 1s ease 1.5s",
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <span
              className="font-body text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.6)" }}
              aria-hidden="true"
            >
              Découvrir
            </span>
            <div
              className="h-8 w-px"
              style={{
                backgroundColor: "rgba(255,255,255,0.25)",
                animation: "scroll-pulse 2.5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ─── Full-bleed facade — Magog ──────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden sm:h-[70vh]">
        <Image
          src="/assets/lifestyle/Photo distillerie Magog/distillerie-magog-exterieur.png"
          alt="Façade de l'ancienne église anglicane — Distillerie Cherry River, Magog"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,9,9,0.6) 0%, rgba(9,9,9,0.1) 60%)" }} aria-hidden />
        <div className="absolute bottom-8 left-0 right-0 z-10 text-center sm:bottom-14">
          <AnimateOnScroll>
            <h2
              className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-light"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-light)" }}
            >
              Distillerie Boutique Magog
            </h2>
            <p className="mt-2 font-body text-[0.7rem] font-light uppercase tracking-[0.3em]" style={{ color: "var(--color-accent-gold)" }}>
              Ancienne église anglicane · 1882
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── MAGOG details — interior photo background ──────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/lifestyle/Photo distillerie Magog/DSC_0838.JPG"
            alt="Intérieur — vitraux et voûtes, distillerie Magog"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.94) 0%, rgba(245,240,232,0.90) 50%, rgba(245,240,232,0.95) 100%)" }} aria-hidden />
        </div>
        <div className="relative z-10 py-20 sm:py-32">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <article className="flex w-full flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                <Image
                  src={MAGOG_GALLERY[0].src}
                  alt={MAGOG_GALLERY[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>

              <h2
                className="mt-8 text-center font-heading text-[clamp(1.65rem,3.5vw,2.125rem)] font-light leading-[1.15] sm:mt-10"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-dark)",
                }}
              >
                Distillerie Boutique Magog
              </h2>

              <DistilleryPhotoAddressBlock slug="magog" className="mt-4 sm:mt-5" />

              <div className="mx-auto mt-8 w-full max-w-2xl sm:mt-10">
                <p
                  className="font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Au cœur des Cantons-de-l&apos;Est, une église anglicane de plus de
                  150 ans abrite aujourd&apos;hui notre distillerie artisanale.
                  Sous les voûtes de pierre et les vitraux centenaires, nos
                  alambics en cuivre transforment les matières premières
                  québécoises en spiritueux d&apos;exception.
                </p>
                <p
                  className="mt-4 font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  L&apos;architecture néo-gothique crée un dialogue unique entre
                  le sacré et le sensuel — un cadre sans pareil pour découvrir
                  l&apos;art de la distillation et déguster nos créations dans
                  un lieu chargé d&apos;histoire.
                </p>

                <ul className="mt-8 space-y-2">
                  {[
                    "Édifice patrimonial de plus de 150 ans",
                    "Alambics en cuivre artisanaux dans la nef",
                    "Bar de dégustation et terrasse estivale",
                    "Visites guidées et ateliers mixologie",
                  ].map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 font-body text-[0.8125rem] font-light"
                      style={{ color: "var(--text-dark-secondary)" }}
                    >
                      <span
                        className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "var(--color-accent-gold)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/experiences"
                className="mt-10 inline-flex w-full items-center justify-center px-10 py-4 font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-90 sm:mt-12 sm:w-auto sm:self-center"
                style={{
                  background: "var(--text-dark)",
                  color: "var(--bg-cream)",
                }}
              >
                Planifier votre visite
              </Link>

              <div className="mt-14 grid w-full grid-cols-2 gap-3 sm:mt-16 sm:gap-4">
                {MAGOG_GALLERY.slice(1, 5).map((photo, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </article>
          </AnimateOnScroll>
        </div>
        </div>
      </section>

      {/* ─── Full-bleed facade — Québec ─────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden sm:h-[70vh]">
        <Image
          src="/assets/lifestyle/curated/cocktails-terrasse-livre.png"
          alt="Façade du Mémorial Hall — Distillerie Cherry River, Québec — Sillery"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,9,9,0.6) 0%, rgba(9,9,9,0.1) 60%)" }} aria-hidden />
        <div className="absolute bottom-8 left-0 right-0 z-10 text-center sm:bottom-14">
          <AnimateOnScroll>
            <h2
              className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-light"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-light)" }}
            >
              Distillerie Boutique Québec
            </h2>
            <p className="mt-2 font-body text-[0.7rem] font-light uppercase tracking-[0.3em]" style={{ color: "var(--color-accent-gold)" }}>
              Mémorial Hall · Sillery
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── QUÉBEC details — interior photo background ──────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/lifestyle/curated/cocktails-petits-fruits.png"
            alt="Intérieur — boutique et accueil, distillerie Québec"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.94) 0%, rgba(245,240,232,0.90) 50%, rgba(245,240,232,0.95) 100%)" }} aria-hidden />
        </div>
        <div className="relative z-10 py-20 sm:py-32">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <article className="flex w-full flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                <Image
                  src={QUEBEC_GALLERY[0].src}
                  alt={QUEBEC_GALLERY[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>

              <h2
                className="mt-8 text-center font-heading text-[clamp(1.65rem,3.5vw,2.125rem)] font-light leading-[1.15] sm:mt-10"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-dark)",
                }}
              >
                Distillerie Boutique Québec
              </h2>

              <DistilleryPhotoAddressBlock slug="quebec" className="mt-4 sm:mt-5" />

              <div className="mx-auto mt-8 w-full max-w-2xl sm:mt-10">
                <p
                  className="font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Au cœur du quartier historique de Sillery, le Mémorial Hall
                  accueille notre deuxième distillerie — un espace boutique
                  urbain où la mixologie est élevée au rang d&apos;art de vivre.
                </p>
                <p
                  className="mt-4 font-body text-[0.9375rem] font-light leading-[1.9]"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Bar à cocktails sophistiqué, ateliers interactifs et
                  dégustations guidées — chaque visite est une invitation à
                  explorer l&apos;univers Cherry River dans un cadre
                  architectural d&apos;exception, entre patrimoine et modernité.
                </p>

                <ul className="mt-8 space-y-2">
                  {[
                    "Mémorial Hall, quartier historique de Sillery",
                    "Bar à cocktails et distillerie boutique",
                    "Ateliers de mixologie interactifs",
                    "Dégustations guidées et événements privés",
                  ].map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 font-body text-[0.8125rem] font-light"
                      style={{ color: "var(--text-dark-secondary)" }}
                    >
                      <span
                        className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "var(--color-accent-gold)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/experiences"
                className="mt-10 inline-flex w-full items-center justify-center px-10 py-4 font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-90 sm:mt-12 sm:w-auto sm:self-center"
                style={{
                  background: "var(--text-dark)",
                  color: "var(--bg-cream)",
                }}
              >
                Planifier votre visite
              </Link>

              <div className="mt-14 grid w-full grid-cols-2 gap-3 sm:mt-16 sm:gap-4">
                {QUEBEC_GALLERY.slice(1, 5).map((photo, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </article>
          </AnimateOnScroll>
        </div>
        </div>
      </section>

      {/* ─── Territory / Context Band ────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Image
          src="/assets/brands/cherry-river/Instagram_Cherry_River_Montagnes.jpg"
          alt="Paysage des Cantons-de-l'Est"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(9,9,9,0.7)" }} aria-hidden />
        <div
          className="relative z-10 mx-auto px-[var(--content-margin-x)] text-center"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-6 font-body text-[0.65rem] font-normal uppercase tracking-[0.4em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Le territoire
            </p>
            <p
              className="mx-auto max-w-[40ch] font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-light italic leading-snug"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              &ldquo;Des lieux chargés d&apos;histoire,
              <br />
              des spiritueux chargés de sens.&rdquo;
            </p>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6">
              {[
                { value: "2", label: "Distilleries" },
                { value: "150+", label: "Ans d'histoire" },
                { value: "30+", label: "Créations" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span
                    className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-light"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-accent-gold)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <p
                    className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-light-muted)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Bottom CTA — photo background ──────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/lifestyle/curated/cocktails-petits-fruits.png"
            alt="Cocktails petits fruits — Cherry River"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.93) 0%, rgba(245,240,232,0.88) 50%, rgba(245,240,232,0.94) 100%)" }} aria-hidden />
        </div>
        <div className="relative z-10 py-16 sm:py-24">
        <div
          className="mx-auto px-[var(--content-margin-x)] text-center"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <h2
              className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-light"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-dark)",
              }}
            >
              Envie de nous visiter?
            </h2>
            <p
              className="mx-auto mt-4 max-w-[45ch] font-body text-[0.9375rem] font-light leading-relaxed"
              style={{ color: "var(--text-dark-secondary)" }}
            >
              Réservez une visite guidée, un atelier de mixologie ou une
              dégustation — dans le lieu de votre choix.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                href="/experiences"
                className="inline-flex w-full items-center justify-center px-10 py-4 font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-all duration-300 hover:opacity-90 sm:w-auto"
                style={{
                  background: "var(--text-dark)",
                  color: "var(--bg-cream)",
                }}
              >
                Réserver une visite
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center border px-10 py-4 font-body text-[0.68rem] font-normal uppercase tracking-[0.22em] transition-all duration-300 hover:opacity-80 sm:w-auto"
                style={{
                  borderColor: "var(--text-dark)",
                  color: "var(--text-dark)",
                }}
              >
                Nous joindre
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
        </div>
      </section>
    </div>
  );
}
