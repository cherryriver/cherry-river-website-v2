"use client";

import Image from "next/image";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export function TerritorySplitSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="territory-heading">
      <div className="grid md:grid-cols-2">
        {/* Left — full-bleed photo (slides in from left) */}
        <AnimateOnScroll direction="left" distance={40} className="relative aspect-[4/3] sm:aspect-[4/5] md:aspect-auto md:min-h-[600px]">
          <Image
            src="/assets/brands/cherry-river/Instagram_Cherry_River_MontOrford.jpg"
            alt="Mont Orford — territoire Cherry River"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AnimateOnScroll>

        {/* Right — text on dark (slides in from right with stagger 100ms) */}
        <div
          className="flex flex-col justify-center px-[var(--content-margin-x)] py-[var(--section-gap-standard)] md:px-16 lg:px-24"
          style={{ background: "#090909" }}
        >
          <AnimateOnScroll direction="right" distance={40}>
            <p
              className="mb-5 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "#C9A84C" }}
            >
              Notre territoire
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right" distance={40} delay={0.1}>
            <h2
              id="territory-heading"
              className="font-heading font-light"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                maxWidth: "14ch",
                color: "#f0ebe4",
              }}
            >
              Enracinés dans les Cantons-de-l&apos;Est
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right" distance={40} delay={0.2}>
            <p
              className="mt-8 max-w-md font-body text-[0.95rem] font-light leading-[1.9]"
              style={{ color: "#a89f94" }}
            >
              Aux pieds du Mont Orford, entre le lac Memphrémagog et les forêts
              appalachiennes — Cherry River puise dans la nature du Québec
              l&apos;essence de ses créations. Chaque bouteille porte la
              signature de ce terroir unique.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up" distance={30} delay={0.3}>
            <div className="mt-10 flex items-center gap-5 sm:gap-8">
              <div>
                <p
                  className="font-heading text-[2rem] font-light sm:text-[2.5rem]"
                  style={{ fontFamily: "var(--font-display)", color: "#f0ebe4", lineHeight: 1 }}
                >
                  150+
                </p>
                <p className="mt-2 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em] sm:text-[0.65rem] sm:tracking-[0.2em]" style={{ color: "#a89f94" }}>
                  ans d&apos;histoire
                </p>
              </div>
              <div className="h-10 w-px sm:h-12" style={{ background: "rgba(201,168,76,0.2)" }} aria-hidden />
              <div>
                <p
                  className="font-heading text-[2rem] font-light sm:text-[2.5rem]"
                  style={{ fontFamily: "var(--font-display)", color: "#f0ebe4", lineHeight: 1 }}
                >
                  2
                </p>
                <p className="mt-2 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em] sm:text-[0.65rem] sm:tracking-[0.2em]" style={{ color: "#a89f94" }}>
                  distilleries
                </p>
              </div>
              <div className="h-10 w-px sm:h-12" style={{ background: "rgba(201,168,76,0.2)" }} aria-hidden />
              <div>
                <p
                  className="font-heading text-[2rem] font-light sm:text-[2.5rem]"
                  style={{ fontFamily: "var(--font-display)", color: "#f0ebe4", lineHeight: 1 }}
                >
                  30+
                </p>
                <p className="mt-2 font-body text-[0.6rem] font-normal uppercase tracking-[0.15em] sm:text-[0.65rem] sm:tracking-[0.2em]" style={{ color: "#a89f94" }}>
                  créations
                </p>
              </div>
            </div>
          </AnimateOnScroll>
          </div>
        </div>
    </section>
  );
}
