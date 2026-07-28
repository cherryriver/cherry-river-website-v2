"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const SPIRITS = [
  { src: "/assets/products/CR_Gin_Berries_750mL.png", name: "Gin Petits Fruits\n& Basilic", tagline: "Genièvre, baies & basilic frais", category: "Spiritueux", slug: "gin-petits-fruits-basilic" },
  { src: "/assets/products/Averse_Vodka_Premium_750mL.png", name: "Vodka Averse\nPremium", tagline: "Pureté cristalline, distillée cinq fois", category: "Spiritueux", slug: "vodka-averse-premium" },
  { src: "/assets/products/CR_RhumAmbre_750mL.png", name: "Rhum Ambré", tagline: "Notes de caramel & vanille bourbon", category: "Spiritueux", slug: "rhum-ambre" },
  { src: "/assets/products/CR_TequilaSilver_750mL.png", name: "Tequila Silver", tagline: "100% agave, douceur vive", category: "Spiritueux", slug: "tequila-silver" },
  { src: "/assets/products/Ope_Gin_Boreal_750mL.png", name: "Gin Boréal\nOpemiska", tagline: "Épinette noire & forêt boréale", category: "Spiritueux", slug: "gin-boreal-opemiska" },
];

const CANS = [
  { src: "/assets/products/cans/CherryRiver_GinLimon_355mL_FRAN.png", name: "Gin Limonade", tagline: "Pétillant & citronné", category: "Prêt-à-boire", slug: "gin-limonade" },
  { src: "/assets/products/cans/CherryRiver_OrangeSang_355mL_FRAN.png", name: "Orange Sanguine", tagline: "Fruité & vibrant", category: "Prêt-à-boire", slug: "orange-sanguine-framboises" },
  { src: "/assets/products/cans-na/Limonade_Non-petillante_Fran.png", name: "Limonade Vodka", tagline: "Citron vert & fraîcheur", category: "Prêt-à-boire", slug: "limonade-vodka-citron-vert" },
];

const USPS = [
  "Distillé à Magog",
  "Ingrédients naturels",
  "Terroir québécois",
  "Fait à la main",
  "Petits lots",
  "Cantons-de-l'Est",
  "Sans additifs",
  "Distillé à Magog",
  "Ingrédients naturels",
  "Terroir québécois",
  "Fait à la main",
  "Petits lots",
];

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

export function SpiritsShowcase() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const bottleVariants = buildBottleVariants(prefersReducedMotion);
  const labelVariants = buildLabelVariants(prefersReducedMotion);

  // Timing values (collapse to instant fade if reduced motion).
  const bottleDuration = prefersReducedMotion ? 0.2 : 1.0;
  const labelDuration = prefersReducedMotion ? 0.2 : 0.7;
  const cardStagger = prefersReducedMotion ? 0 : 0.15;
  const labelOffset = prefersReducedMotion ? 0 : 0.4;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FAF7F2" }}
      aria-labelledby="spirits-title"
      data-nav-theme="carousel"
    >

      <div className="relative z-10">
      <div
        className="mx-auto px-[var(--content-margin-x)]"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        {/* ─── Header ─── */}
        <div className="pb-8 pt-[var(--section-gap-pause)] sm:pb-14">
          <AnimateOnScroll direction="up" distance={20} duration={0.8}>
            <p
              className="mb-5 font-body text-[0.6rem] font-normal uppercase tracking-[0.45em]"
              style={{ color: "#8B1A1A" }}
            >
              Nos créations
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up" distance={32} duration={1.1} delay={0.15}>
            <h2
              id="spirits-title"
              className="font-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                color: "#1A1A1A",
                lineHeight: 1.05,
                maxWidth: "18ch",
              }}
            >
              L&apos;art du spiritueux,{" "}
              <em className="font-light" style={{ color: "#6B6258" }}>
                distillé ici
              </em>
            </h2>
          </AnimateOnScroll>
        </div>
      </div>

      {/* ─── Marquee USP band ─── */}
      <div
        className="overflow-hidden border-y py-3"
        style={{ borderColor: "rgba(201,168,76,0.2)" }}
      >
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {USPS.map((usp, i) => (
            <span
              key={i}
              className="mx-6 font-body text-[0.6rem] font-normal uppercase tracking-[0.35em] sm:mx-10"
              style={{ color: "#A89F94" }}
            >
              {usp}
              <span className="ml-6 sm:ml-10" style={{ color: "rgba(201,168,76,0.3)" }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Bottles — large hero cards (Romeo's Gin entry pattern) ─── */}
      <div
        className="mx-auto px-[var(--content-margin-x)] pt-14 sm:pt-24"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-20 md:grid-cols-5">
          {SPIRITS.map((spirit, i) => {
            const isOddLast =
              i === SPIRITS.length - 1 && SPIRITS.length % 2 !== 0;
            return (
              <div
                key={spirit.slug}
                className={
                  isOddLast
                    ? "col-span-2 mx-auto w-1/2 sm:col-span-1 sm:w-full"
                    : ""
                }
              >
                <Link href={`/produits/${spirit.slug}`} className="group block">
                  {/* Bottle — slides up + golden drop-shadow builds */}
                  <motion.div
                    className="relative mx-auto flex items-end justify-center px-2"
                    style={{ aspectRatio: "3/5" }}
                    variants={bottleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: bottleDuration,
                      ease: prefersReducedMotion ? "linear" : EASE_OUT_EXPO,
                      delay: i * cardStagger,
                    }}
                  >
                    <Image
                      src={spirit.src}
                      alt={spirit.name.replace("\n", " ")}
                      width={200}
                      height={500}
                      className="relative z-10 h-auto max-h-[95%] w-auto max-w-[90%] object-contain transition-transform duration-700 ease-out group-hover:-translate-y-3"
                    />
                    {/* Shadow on surface */}
                    <div
                      className="pointer-events-none absolute bottom-0 left-[5%] right-[5%] h-6 rounded-[50%] opacity-60 transition-all duration-700 group-hover:opacity-40"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)",
                      }}
                      aria-hidden="true"
                    />
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
                      delay: i * cardStagger + labelOffset,
                    }}
                  >
                    <p
                      className="font-body text-[0.5rem] font-normal uppercase tracking-[0.3em]"
                      style={{ color: "#A89F94" }}
                    >
                      {spirit.category}
                    </p>
                    <h3
                      className="mt-2 whitespace-pre-line font-heading text-[1rem] font-normal leading-[1.2] transition-colors duration-400 group-hover:text-[#8B1A1A] sm:text-[1.1rem]"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#1A1A1A",
                      }}
                    >
                      {spirit.name}
                    </h3>
                    <p
                      className="mx-auto mt-1.5 max-w-[18ch] font-body text-[0.7rem] font-light leading-relaxed"
                      style={{ color: "#A89F94" }}
                    >
                      {spirit.tagline}
                    </p>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div
        className="mx-auto mt-16 sm:mt-28"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <div className="mx-[var(--content-margin-x)] h-px" style={{ background: "rgba(201,168,76,0.3)" }} aria-hidden="true" />
      </div>

      {/* ─── Cans — horizontal layout with same Romeo's Gin entry ─── */}
      <div
        className="mx-auto px-[var(--content-margin-x)] pt-14 sm:pt-24"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <AnimateOnScroll direction="up" distance={28} duration={1}>
          <div className="mb-10 flex items-end justify-between sm:mb-16">
            <div>
              <p
                className="mb-3 font-body text-[0.6rem] font-normal uppercase tracking-[0.45em]"
                style={{ color: "#8B1A1A" }}
              >
                Prêts-à-boire &amp; Mocktails
              </p>
              <p
                className="max-w-[30ch] font-heading text-[clamp(1.25rem,3vw,2rem)] font-light italic"
                style={{ fontFamily: "var(--font-display)", color: "#6B6258" }}
              >
                Le cocktail parfait, prêt à savourer
              </p>
            </div>
            <Link
              href="/produits"
              className="hidden items-center gap-2 font-body text-[0.6rem] font-normal uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#8B1A1A] sm:flex"
              style={{ color: "#A89F94" }}
            >
              Tout voir
              <span className="inline-block h-px w-5 bg-current transition-all duration-400" />
            </Link>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-wrap items-end justify-center gap-10 sm:gap-16 md:gap-24">
          {CANS.map((can, i) => {
            // Alterne d'où la canette entre : gauche / droite / gauche
            const canInitialX = prefersReducedMotion ? 0 : i % 2 === 0 ? -50 : 50;
            return (
            <Link
              key={can.slug}
              href={`/produits/${can.slug}`}
              className="group flex flex-col items-center"
            >
              {/* Can — slides in alternating from left/right + golden drop-shadow builds */}
              <motion.div
                className="relative flex items-end justify-center"
                style={{
                  width: "clamp(80px, 12vw, 130px)",
                  height: "clamp(200px, 28vw, 320px)",
                }}
                initial={{
                  opacity: 0,
                  x: canInitialX,
                  filter: "drop-shadow(0 0 0 rgba(201,168,76,0))",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "drop-shadow(0 24px 48px rgba(201,168,76,0.18))",
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: bottleDuration,
                  ease: prefersReducedMotion ? "linear" : EASE_OUT_EXPO,
                  delay: i * cardStagger,
                }}
              >
                <Image
                  src={can.src}
                  alt={can.name}
                  width={130}
                  height={300}
                  className="relative z-10 h-auto max-h-full w-auto object-contain transition-transform duration-600 ease-out group-hover:-translate-y-2"
                />
                <div
                  className="pointer-events-none absolute -bottom-1 left-[5%] right-[5%] h-4 rounded-[50%] opacity-50 transition-opacity duration-600 group-hover:opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </motion.div>
              {/* Label — staggers 400ms after can */}
              <motion.div
                className="flex flex-col items-center"
                variants={labelVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: labelDuration,
                  ease: prefersReducedMotion ? "linear" : EASE_OUT_EXPO,
                  delay: i * cardStagger + labelOffset,
                }}
              >
                <p
                  className="mt-5 font-body text-[0.5rem] font-normal uppercase tracking-[0.3em]"
                  style={{ color: "#A89F94" }}
                >
                  {can.category}
                </p>
                <p
                  className="mt-1 text-center font-heading text-[0.95rem] font-normal transition-colors duration-400 group-hover:text-[#8B1A1A] sm:text-[1.05rem]"
                  style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                >
                  {can.name}
                </p>
                <p
                  className="mt-0.5 font-body text-[0.65rem] font-light"
                  style={{ color: "#A89F94" }}
                >
                  {can.tagline}
                </p>
              </motion.div>
            </Link>
            );
          })}
        </div>
      </div>

      {/* ─── CTA ─── */}
      <AnimateOnScroll delay={0.15}>
        <div className="pb-[var(--section-gap-pause)] pt-16 text-center sm:pt-24">
          <Link
            href="/produits"
            className="group inline-flex items-center gap-4 border px-10 py-4 font-body text-[0.6rem] font-normal uppercase tracking-[0.25em] transition-all duration-400 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
            style={{ borderColor: "#A89F94", color: "#6B6258" }}
          >
            Découvrir toute la gamme
            <span className="inline-block h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
          </Link>
        </div>
      </AnimateOnScroll>
      </div>
    </section>
  );
}
