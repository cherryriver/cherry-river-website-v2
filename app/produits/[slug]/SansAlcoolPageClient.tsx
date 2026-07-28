"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Product } from "@/content/products-catalog";

const BG = "#FAFAF8";
const DARK = "#090909";
const TEXT = "#1A1A1A";
const TEXT_BODY = "#6B6258";
const TEXT_LIGHT = "#A89F94";
const GOLD = "#C9A84C";

const CANS_NA = [
  { slug: "amaretto-sour-sans-alcool", name: "Amaretto Sour", image: "/assets/products/cans-na/CR_AmarettoSour_355mL_SANS_ALCOOL_FRAN.png", color: "#E8D5B0" },
  { slug: "cosmopolitan-sans-alcool", name: "Cosmopolitan", image: "/assets/products/cans-na/CR_Cosmo_355mL_SANS_ALCOOL_FRAN.png", color: "#FFB3C6" },
  { slug: "margarita-sans-alcool", name: "Margarita", image: "/assets/products/cans-na/CR_Margarita_355mL_SANS_ALCOOL_FRAN.png", color: "#D4F5A0" },
  { slug: "melon-eau-lime-sans-alcool", name: "Melon, Eau & Lime", image: "/assets/products/cans-na/CR_MelonEauLime_355mL_SANS_ALCOOL_FRAN.png", color: "#D4F5A0" },
  { slug: "mojito-sans-alcool", name: "Mojito", image: "/assets/products/cans-na/CR_Mojito_355mL_SANS_ALCOOL_FRAN.png", color: "#B8F0C8" },
  { slug: "orange-sanguine-sans-alcool", name: "Orange Sanguine", image: "/assets/products/cans-na/CR_OrangeSanguine_355mL_SANS_ALCOOL_FRAN.png", color: "#FF6B35" },
  { slug: "paloma-sans-alcool", name: "Paloma", image: "/assets/products/cans-na/CR_MocktailPaloma_355mL_SANS_ALCOOL_FRAN.png", color: "#FFB3C6" },
  { slug: "petits-fruits-sans-alcool", name: "Petits Fruits", image: "/assets/products/cans-na/CR_MocktailPetitsFruits_355mL_SANS_ALCOOL_FRAN.png", color: "#FFB3C6" },
  { slug: "sangria-rouge-sans-alcool", name: "Sangria Rouge", image: "/assets/products/cans-na/CR_SangriaRouge_355mL_SANS_ALCOOL_FRAN.png", color: "#E8D5B0" },
  { slug: "limonade-non-petillante", name: "Limonade Non-Pétillante", image: "/assets/products/cans-na/Limonade_Non-petillante_Fran.png", color: "#F5E642" },
];

const COFFRETS = [
  { name: "Mixologie Apéro", image: "/assets/products/cans-na/CR_MixologieAPERO_6x355mL_SANS_ALCOOL_FRAN.png" },
  { name: "Mixologie Léger", image: "/assets/products/cans-na/CR_MixologieLEGER_6x355mL_SANS_ALCOOL_FRAN.png" },
  { name: "Mixologie Mixo", image: "/assets/products/cans-na/CR_MixologieMIXO_6x355mL_SANS_ALCOOL_FRAN.png" },
];

const TITLE_WORDS = ["NOS", "CRÉATIONS", "SANS", "ALCOOL"];

interface Props {
  products: Product[];
}

/* ── Staggered title ── */
function StaggerTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <h1
      ref={ref}
      className="flex flex-wrap gap-x-4 gap-y-1"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: "clamp(2.8rem, 8vw, 5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
      }}
    >
      {TITLE_WORDS.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ color: TEXT, display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

/* ── Can card ── */
function CanCard({ can, index }: { can: (typeof CANS_NA)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/produits/${can.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        prefetch
      >
        {/* Card container — colored bg unique per can */}
        <div
          className="relative mx-auto flex items-center justify-center overflow-hidden"
          style={{
            aspectRatio: "3/5",
            background: `linear-gradient(160deg, ${can.color}18 0%, ${can.color}08 50%, ${DARK} 100%)`,
            maxWidth: 300,
            borderRadius: 4,
          }}
        >
          {/* Colored ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 60%, ${can.color}25 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0.4,
            }}
            aria-hidden
          />

          {/* Can — floating + hover scale/rotate + gold glow */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="relative z-10"
            style={{
              filter: hovered
                ? `drop-shadow(0 20px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 20px rgba(201,168,76,0.4))`
                : "drop-shadow(0 15px 30px rgba(0,0,0,0.6))",
              transition: "filter 0.4s ease",
              height: "80%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src={can.image}
              alt={can.name}
              width={160}
              height={320}
              className="h-auto w-[110px] object-contain sm:w-[130px] lg:w-[140px]"
            />
          </motion.div>

          {/* Gold line hover indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: GOLD }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* Label — name slides up on hover */}
        <div className="mt-4 overflow-hidden text-center">
          <motion.h3
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "1.05rem",
              color: TEXT,
              lineHeight: 1.3,
            }}
          >
            {can.name}
          </motion.h3>
          <motion.p
            animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1"
            style={{
              fontFamily: "var(--font-body), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: TEXT_LIGHT,
            }}
          >
            355 ml · Sans alcool
          </motion.p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Coffret card ── */
function CoffretCard({ coffret, index }: { coffret: (typeof COFFRETS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: "4/3", background: DARK, borderRadius: 4 }}
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={coffret.image}
            alt={coffret.name}
            width={320}
            height={240}
            className="h-auto w-[260px] object-contain sm:w-[300px]"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))" }}
          />
        </motion.div>
      </div>
      <h3
        className="mt-4 text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "1.1rem",
          color: TEXT,
        }}
      >
        {coffret.name}
      </h3>
      <p
        className="mt-1 text-center"
        style={{
          fontFamily: "var(--font-body), monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: TEXT_LIGHT,
        }}
      >
        6 × 355 ml · Coffret
      </p>
    </motion.div>
  );
}

/* ── Main page ── */
export function SansAlcoolPageClient({ products }: Props) {
  return (
    <main className="min-h-screen" style={{ background: BG }}>
      {/* ── Hero header with staggered title ── */}
      <div className="mx-auto px-6 pt-36 sm:px-10 sm:pt-44 lg:px-20 lg:pt-48" style={{ maxWidth: 1200 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-body), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          Collection sans alcool
        </motion.p>

        <div className="mt-4">
          <StaggerTitle />
        </div>

        <motion.p
          className="mt-6 max-w-[52ch]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-body), monospace",
            fontWeight: 300,
            fontSize: "0.9rem",
            lineHeight: 1.8,
            color: TEXT_BODY,
          }}
        >
          Toute la complexité d&apos;un cocktail Cherry River — sans une goutte d&apos;alcool.
          Élaborés avec les mêmes botaniques, la même exigence.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ width: 40, height: 1, background: GOLD, transformOrigin: "left" }}
          aria-hidden
        />
      </div>

      {/* ── Premium animated cans grid ── */}
      <section className="mx-auto px-6 pb-20 pt-16 sm:px-10 sm:pt-20 lg:px-20" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {CANS_NA.map((can, i) => (
            <CanCard key={can.slug} can={can} index={i} />
          ))}
        </div>
      </section>

      {/* ── Gin sans alcool — feature section ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: DARK }}
      >
        <div className="mx-auto flex flex-col items-center gap-12 px-6 py-24 sm:px-10 lg:flex-row lg:gap-20 lg:px-20 lg:py-32" style={{ maxWidth: 1200 }}>
          <motion.div
            className="relative shrink-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/assets/products/CR_Gin_Berries_SANS_ALCOOL_750mL.png"
              alt="Gin Petits Fruits Sans Alcool"
              width={200}
              height={400}
              className="h-auto w-[160px] sm:w-[200px]"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
                WebkitBoxReflect: "below 0px linear-gradient(transparent 50%, rgba(255,255,255,0.08))",
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              style={{
                fontFamily: "var(--font-body), monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Spiritueux sans alcool
            </p>
            <h2
              className="mt-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                lineHeight: 1.1,
                color: "#f0ebe4",
              }}
            >
              Gin Petits Fruits
            </h2>
            <p
              className="mt-6 max-w-[44ch]"
              style={{
                fontFamily: "var(--font-body), monospace",
                fontWeight: 300,
                fontSize: "0.85rem",
                lineHeight: 1.9,
                color: "rgba(240,235,228,0.65)",
              }}
            >
              Les mêmes botaniques que notre Gin Petits Fruits classique — genièvre, baies sauvages,
              agrumes — distillés et désalcoolisés pour une expérience fidèle. 0.0% alcool.
            </p>
            <Link
              href="/produits/gin-sans-alcool"
              className="mt-8 inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--font-body), monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
                textDecoration: "none",
              }}
              prefetch
            >
              Découvrir
              <span style={{ display: "inline-block", width: 24, height: 1, background: GOLD }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Coffrets ── */}
      <section className="mx-auto px-6 pb-28 pt-20 sm:px-10 sm:pt-24 lg:px-20" style={{ maxWidth: 1200 }}>
        <motion.p
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-body), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          Coffrets découverte
        </motion.p>
        <motion.h2
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: TEXT,
            lineHeight: 1.1,
          }}
        >
          L&apos;art du mocktail en coffret
        </motion.h2>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {COFFRETS.map((c, i) => (
            <CoffretCard key={c.name} coffret={c} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
