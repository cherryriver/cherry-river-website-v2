"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const EXPERIENCES = [
  { title: "Visites guidées", text: "De la matière première à l'embouteillage — parcourez l'histoire et le savoir-faire.", duration: "60–90 min" },
  { title: "Ateliers mixologie", text: "Sessions interactives avec nos experts. Créez vos propres cocktails signatures.", duration: "2 h" },
  { title: "Dégustations", text: "Parcours sensoriels commentés à travers notre gamme complète de spiritueux.", duration: "45 min" },
  { title: "Événements privés", text: "Corporatif, célébrations, lancements — un cadre unique pour des moments d'exception.", duration: "Sur mesure" },
];

export function ExperiencesSection() {
  return (
    <section
      className="relative overflow-hidden px-[var(--content-margin-x)] py-[var(--section-gap-intimate)]"
      style={{ background: "var(--bg-light)" }}
      aria-labelledby="experiences-heading"
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
        <div className="grid gap-6 md:grid-cols-[7fr_5fr] md:items-end md:gap-12">
          <div>
            <AnimateOnScroll direction="up" distance={24} duration={1}>
              <p
                className="mb-5 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "#C9A84C" }}
              >
                Expériences
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll direction="up" distance={32} duration={1.1} delay={0.15}>
              <h2
                id="experiences-heading"
                className="font-heading font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.15,
                  maxWidth: "16ch",
                  color: "#1a1a1a",
                }}
              >
                Moments uniques au cœur des distilleries
              </h2>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll direction="up" distance={24} duration={1} delay={0.3}>
            <p
              className="max-w-md font-body text-[0.95rem] font-light leading-relaxed md:text-right"
              style={{ color: "#6b6258", marginLeft: "auto" }}
            >
              Visites guidées, ateliers et dégustations — chaque visite est une
              invitation à découvrir l&apos;artisanat derrière nos créations.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="mt-10 space-y-0 sm:mt-20">
          {EXPERIENCES.map((exp, i) => (
            <AnimateOnScroll
              key={exp.title}
              direction="up"
              distance={28}
              duration={1}
              delay={0.15 + i * 0.12}
            >
              <div
                className="group grid grid-cols-[1fr] items-baseline gap-4 border-b py-8 transition-colors duration-500 sm:grid-cols-[1fr_2fr_auto] sm:gap-8 sm:py-10"
                style={{ borderColor: "rgba(201,168,76,0.2)" }}
              >
                <h3
                  className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-light"
                  style={{ fontFamily: "var(--font-display)", color: "#1a1a1a" }}
                >
                  {exp.title}
                </h3>
                <p
                  className="max-w-md font-body text-[0.85rem] font-light leading-relaxed"
                  style={{ color: "#6b6258" }}
                >
                  {exp.text}
                </p>
                <span
                  className="font-body text-[0.6rem] font-normal uppercase tracking-[0.2em]"
                  style={{ color: "#a89f94" }}
                >
                  {exp.duration}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll direction="up" distance={24} duration={1} delay={0.4}>
          <div className="mt-10 text-center sm:mt-16">
            <Link
              href="/experiences"
              className="inline-flex w-full items-center justify-center border px-8 py-3.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#1a1a1a] hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-[0.7rem]"
              style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
            >
              Réserver une expérience
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
