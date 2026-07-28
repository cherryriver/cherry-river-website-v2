"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const COCKTAILS = [
  { image: "/assets/lifestyle/curated/cocktail-bar-rose-close.png", name: "Gin Sour Rosé", spirit: "Gin Petits Fruits" },
  { image: "/assets/lifestyle/curated/cocktail-bar-romarin.png", name: "Averse Daisy", spirit: "Vodka Averse" },
  { image: "/assets/lifestyle/curated/cocktail-cosmopolitan-marbre.png", name: "Coaticook Martini", spirit: "Crème Coaticook" },
  { image: "/assets/lifestyle/curated/cocktail-orange-grenade.png", name: "Tom Collins Cherry River", spirit: "Gin" },
];

export function CocktailCultureSection() {
  return (
    <section
      className="relative overflow-hidden px-[var(--content-margin-x)] py-[var(--section-gap-standard)]"
      style={{ background: "#1C1C1C" }}
      aria-labelledby="cocktail-heading"
    >
      <div className="relative z-10">
      <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
        <div className="grid gap-6 md:grid-cols-[7fr_5fr] md:items-end md:gap-8">
          <div>
            <AnimateOnScroll>
              <p
                className="mb-5 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "#C9A84C" }}
              >
                Cocktail Culture
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2
                id="cocktail-heading"
                className="font-heading font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.15,
                  maxWidth: "16ch",
                  color: "#f0ebe4",
                }}
              >
                L&apos;art de la mixologie
              </h2>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll delay={0.2}>
            <p
              className="max-w-md font-body text-[0.95rem] font-light leading-relaxed md:text-right"
              style={{ color: "#a89f94", marginLeft: "auto" }}
            >
              Recettes signatures, techniques d&apos;experts et inspirations
              saisonnières — explorez l&apos;univers créatif Cherry River.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 overflow-hidden sm:mt-20 sm:gap-4 md:grid-cols-4 md:gap-6">
          {COCKTAILS.map((cocktail, i) => (
            <AnimateOnScroll
              key={cocktail.name}
              direction="left"
              distance={32}
              delay={0.1 + i * 0.12}
              rotate={-1}
              duration={0.9}
            >
              <Link href="/cocktail-culture" className="group block overflow-hidden">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={cocktail.image}
                    alt={cocktail.name}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                    <p
                      className="font-body text-[0.55rem] font-normal uppercase tracking-[0.2em]"
                      style={{ color: "rgba(201,168,76,0.9)" }}
                    >
                      {cocktail.spirit}
                    </p>
                    <h3
                      className="mt-1 font-heading text-base font-normal md:text-lg"
                      style={{ fontFamily: "var(--font-display)", color: "var(--text-light)" }}
                    >
                      {cocktail.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-16 text-center">
            <Link
              href="/cocktail-culture"
              className="inline-flex items-center gap-3 font-body text-[0.7rem] font-normal uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#C9A84C]"
              style={{ color: "#f0ebe4" }}
            >
              Explorer les recettes
              <span className="inline-block h-px w-8 bg-current transition-all duration-300" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
      </div>
    </section>
  );
}
