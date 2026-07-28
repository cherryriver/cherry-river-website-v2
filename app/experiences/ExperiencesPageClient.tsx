"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import type { Experience, Distillery } from "@/content/experiences-data";

const BookingModal = dynamic(
  () => import("./BookingModal").then((m) => m.BookingModal),
  { ssr: false },
);

interface Props {
  experiences: Experience[];
  distilleries: Distillery[];
}

export function ExperiencesPageClient({ experiences, distilleries }: Props) {
  const [bookingExperience, setBookingExperience] = useState<Experience | null>(
    null
  );

  const openBooking = useCallback((exp: Experience) => {
    setBookingExperience(exp);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingExperience(null);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-cream)" }}>
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden pb-16 sm:min-h-[90vh] sm:pb-24">
        <Image
          src="/assets/lifestyle/Photo distillerie Magog/DSC_0813.JPG"
          alt="Expériences Cherry River"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(0,0,0,0.45)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
          }}
          aria-hidden="true"
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
              Expériences
            </p>
            <h1
              className="max-w-[18ch] font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Vivez Cherry River
              <br />
              <em className="font-light">de l&apos;intérieur</em>
            </h1>
            <p
              className="mt-6 max-w-[50ch] font-body text-[1rem] font-light leading-relaxed sm:text-[1.0625rem]"
              style={{ color: "var(--text-light-secondary)" }}
            >
              Visites guidées, ateliers de mixologie, dégustations et événements
              privés — dans deux lieux patrimoniaux d&apos;exception.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Photo grid — events, tastings, workshops ─────── */}
      <section className="overflow-hidden" style={{ background: "var(--bg-black)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { src: "/assets/lifestyle/Photo distillerie Magog/DSC_0829.JPG", alt: "Visite guidée — nef de la distillerie" },
            { src: "/assets/lifestyle/curated/cocktail-bar-romarin.png", alt: "Atelier mixologie — cocktail au romarin" },
            { src: "/assets/lifestyle/Photo distillerie Magog/MD-91.jpg", alt: "Dégustation au bar — distillerie Magog" },
            { src: "/assets/lifestyle/curated/cocktail-cosmopolitan-marbre.png", alt: "Événement privé — cocktails signature" },
          ].map((photo) => (
            <div key={photo.src} className="relative aspect-square overflow-hidden">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-700 hover:scale-[1.05]" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(9,9,9,0.15)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Two Distilleries ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/lifestyle/Photo distillerie Magog/distillerie-magog-exterieur.png" alt="Distillerie Magog — extérieur" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.95) 0%, rgba(245,240,232,0.90) 50%, rgba(245,240,232,0.95) 100%)" }} aria-hidden />
        </div>
        <div className="relative z-10 py-16 sm:py-24">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Nos lieux
            </p>
            <h2
              className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-dark)",
              }}
            >
              Deux distilleries, deux histoires
            </h2>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
            {distilleries.map((d, idx) => (
              <AnimateOnScroll key={d.id} delay={idx * 0.12}>
                <DistilleryCard distillery={d} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ─── Experience Cards — photo background ─────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/lifestyle/curated/cocktails-blancs-cuir.png" alt="Cocktails — ambiance Cherry River" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "rgba(28,28,28,0.92)" }} aria-hidden />
        </div>
        <div className="relative z-10 py-16 sm:py-24">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Réservez votre expérience
            </p>
            <h2
              className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Choisissez votre moment
            </h2>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:gap-8">
            {experiences.map((exp, idx) => (
              <AnimateOnScroll key={exp.id} delay={idx * 0.08}>
                <ExperienceCard
                  experience={exp}
                  onBook={() => openBooking(exp)}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ─── CTA Banner — photo background ─────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/lifestyle/curated/gin-pamplemousse-piscine.png" alt="Gin pamplemousse — Cherry River" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.93) 0%, rgba(245,240,232,0.88) 50%, rgba(245,240,232,0.94) 100%)" }} aria-hidden />
        </div>
        <div className="relative z-10 py-16 sm:py-20">
        <div
          className="mx-auto px-[var(--content-margin-x)] text-center"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="font-heading text-[clamp(1.25rem,3vw,1.75rem)] font-light italic"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-dark-secondary)",
              }}
            >
              &ldquo;Un dialogue entre le sacré et le sensuel&rdquo;
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                href="/contact"
                className="inline-block w-full border px-8 py-3.5 font-body text-[0.7rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80 sm:w-auto"
                style={{
                  borderColor: "var(--text-dark)",
                  color: "var(--text-dark)",
                }}
              >
                Nous contacter
              </Link>
              <Link
                href="/boutique"
                className="inline-block w-full border px-8 py-3.5 font-body text-[0.7rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80 sm:w-auto"
                style={{
                  borderColor: "var(--border-light)",
                  color: "var(--text-dark-secondary)",
                }}
              >
                Visiter la boutique
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
        </div>
      </section>

      {/* ─── Booking Modal ───────────────────────────────────── */}
      {bookingExperience && (
        <BookingModal
          experience={bookingExperience}
          distilleries={distilleries}
          onClose={closeBooking}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function DistilleryCard({ distillery }: { distillery: Distillery }) {
  return (
    <article
      className="group overflow-hidden rounded-sm border"
      style={{ borderColor: "var(--border-light)" }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={distillery.image}
          alt={distillery.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="p-6 sm:p-8">
        <p
          className="mb-2 font-body text-[0.6rem] font-normal uppercase tracking-[0.3em]"
          style={{ color: "var(--color-accent-gold)" }}
        >
          {distillery.shortName}
        </p>
        <h3
          className="font-heading text-xl font-normal sm:text-2xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-dark)",
          }}
        >
          {distillery.name}
        </h3>

        <p
          className="mt-3 font-body text-[0.8125rem] font-light leading-relaxed"
          style={{ color: "var(--text-dark-secondary)" }}
        >
          {distillery.description}
        </p>

        <ul className="mt-5 space-y-1.5">
          {distillery.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 font-body text-[0.78rem] font-light"
              style={{ color: "var(--text-dark-secondary)" }}
            >
              <span
                className="mt-1.5 block h-1 w-1 shrink-0 rounded-full"
                style={{ background: "var(--color-accent-gold)" }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div
          className="mt-6 flex items-center gap-2 border-t pt-5"
          style={{ borderColor: "var(--border-light)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 shrink-0"
            style={{ color: "var(--text-dark-muted)" }}
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
              fill="currentColor"
            />
          </svg>
          <a
            href={distillery.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[0.75rem] font-light underline transition-opacity hover:opacity-70"
            style={{ color: "var(--text-dark-secondary)" }}
          >
            {distillery.fullAddress}
          </a>
        </div>
      </div>
    </article>
  );
}

function ExperienceCard({
  experience,
  onBook,
}: {
  experience: Experience;
  onBook: () => void;
}) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-sm"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" />

        {/* Duration + Price pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 sm:bottom-4 sm:left-4">
          <span
            className="rounded-full px-3 py-1 font-body text-[0.6rem] font-normal uppercase tracking-wider backdrop-blur-sm"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "var(--text-light)",
            }}
          >
            {experience.duration}
          </span>
          <span
            className="rounded-full px-3 py-1 font-body text-[0.6rem] font-normal uppercase tracking-wider backdrop-blur-sm"
            style={{
              background: "rgba(201,168,76,0.15)",
              color: "var(--color-accent-gold)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            {experience.priceLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className="mb-1 font-body text-[0.6rem] font-normal uppercase tracking-[0.25em]"
          style={{ color: "var(--color-accent-gold)" }}
        >
          {experience.subtitle}
        </p>
        <h3
          className="font-heading text-xl font-normal sm:text-2xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-light)",
          }}
        >
          {experience.title}
        </h3>

        <p
          className="mt-3 font-body text-[0.8125rem] font-light leading-relaxed"
          style={{ color: "var(--text-light-secondary)" }}
        >
          {experience.description}
        </p>

        {/* Includes */}
        <ul className="mt-5 space-y-1.5">
          {experience.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-body text-[0.75rem] font-light"
              style={{ color: "var(--text-light-secondary)" }}
            >
              <span
                className="mt-1.5 block h-1 w-1 shrink-0 rounded-full"
                style={{ background: "var(--color-accent-gold)" }}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Location badges */}
        <div className="mt-5 flex items-center gap-2">
          {experience.locations.map((loc) => (
            <span
              key={loc}
              className="rounded-full border px-2.5 py-0.5 font-body text-[0.55rem] font-normal uppercase tracking-wider"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "var(--text-light-muted)",
              }}
            >
              {loc === "magog" ? "Magog" : "Québec"}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6">
          {experience.isContactOnly ? (
            <Link
              href="/contact"
              className="flex w-full items-center justify-center border py-3 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: "var(--color-accent-gold)",
                color: "var(--color-accent-gold)",
              }}
            >
              Nous contacter
            </Link>
          ) : (
            <button
              onClick={onBook}
              className="flex w-full items-center justify-center py-3 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90"
              style={{
                background: "var(--color-accent-gold)",
                color: "var(--text-dark)",
              }}
            >
              Réserver
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
