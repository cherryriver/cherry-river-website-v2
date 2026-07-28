"use client";

import Image from "next/image";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

type Brand = {
  src: string;
  alt: string;
  width: number;
  height: number;
  tagline: string;
  area: string;
  size: "xl" | "lg" | "md";
};

const BRANDS: Brand[] = [
  {
    src: "/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png",
    alt: "Cherry River",
    width: 300,
    height: 84,
    tagline: "L'âme québécoise des spiritueux modernes",
    area: "cherry",
    size: "xl",
  },
  {
    src: "/assets/brands/opemiska/Logo_Opemiska_Blanc.png",
    alt: "Opemiska",
    width: 220,
    height: 72,
    tagline: "Gin boréal, distillé en patience",
    area: "opemiska",
    size: "lg",
  },
  {
    src: "/assets/brands/averse/Logo Averse_Blanc.png",
    alt: "Averse",
    width: 220,
    height: 72,
    tagline: "Vodka pure, ligne nordique",
    area: "averse",
    size: "lg",
  },
  {
    src: "/assets/brands/alister/Logo Alister_White.png",
    alt: "House of Alister",
    width: 200,
    height: 60,
    tagline: "Spiritueux d'auteur, minutie classique",
    area: "alister",
    size: "md",
  },
  {
    src: "/assets/brands/thirst/Logo_The thirst is real_White.png",
    alt: "The Thirst is Real",
    width: 200,
    height: 60,
    tagline: "Prêt-à-boire, sans compromis",
    area: "thirst",
    size: "md",
  },
];

export function BrandsMarquee() {
  return (
    <section
      className="px-[var(--content-margin-x)] py-20 sm:py-28"
      style={{ background: "#090909" }}
      aria-label="Nos marques"
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
        <AnimateOnScroll>
          <p
            className="mb-3 text-center font-body text-[0.7rem] font-normal uppercase tracking-[0.4em]"
            style={{ color: "#a89f94" }}
          >
            Cinq maisons, une signature
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <h2
            className="mx-auto mb-16 max-w-2xl text-center font-display font-light italic leading-[1.1] sm:mb-20"
            style={{
              color: "#fafaf8",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Nos marques
          </h2>
        </AnimateOnScroll>

        {/* Bento grid : Cherry River (2×2) + Opemiska/Averse (1×2 vertical) + Alister/Thirst (2×1 horizontal) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-3">
          {BRANDS.map((brand, index) => (
            <BrandCell key={brand.alt} brand={brand} delay={0.15 + index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCell({ brand, delay }: { brand: Brand; delay: number }) {
  const layoutClasses = {
    cherry: "col-span-2 lg:col-span-2 lg:row-span-2",
    opemiska: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2",
    averse: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2",
    alister: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
    thirst: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  } as const;

  const minHeights = {
    xl: "min-h-[200px] sm:min-h-[280px] lg:min-h-[420px]",
    lg: "min-h-[180px] sm:min-h-[220px] lg:min-h-[420px]",
    md: "min-h-[160px] sm:min-h-[180px] lg:min-h-[200px]",
  };

  const logoMaxHeights = {
    xl: "max-h-[80px] sm:max-h-[100px] lg:max-h-[120px]",
    lg: "max-h-[64px] sm:max-h-[80px] lg:max-h-[100px]",
    md: "max-h-[52px] sm:max-h-[60px] lg:max-h-[76px]",
  };

  return (
    <AnimateOnScroll delay={delay}>
      <div
        className={`group relative flex h-full flex-col items-center justify-center overflow-hidden border border-[#1f1d1a] p-6 transition-colors duration-700 hover:border-[#2c2926] sm:p-8 ${layoutClasses[brand.area as keyof typeof layoutClasses]} ${minHeights[brand.size]}`}
        style={{ background: "#0d0c0a" }}
      >
        {/* Logo */}
        <div className="flex flex-1 items-center justify-center opacity-85 transition-opacity duration-700 group-hover:opacity-100">
          {brand.src ? (
            <Image
              src={brand.src}
              alt={brand.alt}
              width={brand.width}
              height={brand.height}
              className={`w-auto object-contain ${logoMaxHeights[brand.size]}`}
            />
          ) : (
            <span
              className="text-center font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "#fafaf8" }}
            >
              {brand.alt}
            </span>
          )}
        </div>

        {/* Tagline */}
        <p
          className="mt-6 text-center font-body text-[0.7rem] font-light uppercase leading-relaxed tracking-[0.25em] opacity-0 transition-opacity duration-700 group-hover:opacity-100 sm:text-[0.75rem]"
          style={{ color: "#a89f94" }}
        >
          {brand.tagline}
        </p>

        {/* Trait doré 1px qui apparaît au hover (depuis le centre) */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 h-px w-0 origin-center -translate-x-1/2 transition-all duration-700 ease-out group-hover:w-12"
          style={{ background: "var(--color-accent-gold, #C9A84C)" }}
        />
      </div>
    </AnimateOnScroll>
  );
}
