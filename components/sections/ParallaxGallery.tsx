"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const PHOTOS = [
  {
    src: "/assets/lifestyle/curated/cocktail-bar-romarin.png",
    alt: "Cocktail au romarin — Cherry River",
    speed: 0.3,
  },
  {
    src: "/assets/lifestyle/Photo distillerie Magog/DSC_7875-4.jpg",
    alt: "Intérieur de la distillerie Cherry River à Magog",
    speed: 0.15,
  },
  {
    src: "/assets/lifestyle/curated/cocktails-pamplemousse-editorial.png",
    alt: "Cocktail pamplemousse — éditorial Cherry River",
    speed: 0.4,
  },
  {
    src: "/assets/lifestyle/curated/gin-petits-fruits-basilic.png",
    alt: "Gin petits fruits et basilic Cherry River",
    speed: 0.2,
  },
  {
    src: "/assets/brands/cherry-river/Instagram_Cherry_River_Barils.jpg",
    alt: "Barils de vieillissement — distillerie Cherry River",
    speed: 0.35,
  },
];

export function ParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-4"
      style={{ background: "var(--bg-black)" }}
      aria-label="Galerie photographique Cherry River"
    >
      {/* Desktop: asymmetric mosaic with parallax */}
      <div className="hidden md:block">
        <div className="mx-auto grid grid-cols-12 gap-3 px-3" style={{ maxWidth: "100vw" }}>
          {/* Tall left — portrait */}
          <ParallaxImage
            src={PHOTOS[0].src}
            alt={PHOTOS[0].alt}
            className="col-span-4 aspect-[3/4]"
            scrollYProgress={scrollYProgress}
            speed={PHOTOS[0].speed}
          />
          {/* Center column — two stacked */}
          <div className="col-span-4 flex flex-col gap-3">
            <ParallaxImage
              src={PHOTOS[1].src}
              alt={PHOTOS[1].alt}
              className="aspect-[16/9]"
              scrollYProgress={scrollYProgress}
              speed={PHOTOS[1].speed}
            />
            <ParallaxImage
              src={PHOTOS[2].src}
              alt={PHOTOS[2].alt}
              className="aspect-[4/3]"
              scrollYProgress={scrollYProgress}
              speed={PHOTOS[2].speed}
            />
          </div>
          {/* Right column — offset */}
          <div className="col-span-4 flex flex-col gap-3 pt-12">
            <ParallaxImage
              src={PHOTOS[3].src}
              alt={PHOTOS[3].alt}
              className="aspect-[3/4]"
              scrollYProgress={scrollYProgress}
              speed={PHOTOS[3].speed}
            />
            <ParallaxImage
              src={PHOTOS[4].src}
              alt={PHOTOS[4].alt}
              className="aspect-[16/9]"
              scrollYProgress={scrollYProgress}
              speed={PHOTOS[4].speed}
            />
          </div>
        </div>
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 md:hidden" style={{ scrollSnapType: "x mandatory" }}>
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-[3/4] w-[70vw] flex-shrink-0 overflow-hidden"
            style={{ scrollSnapAlign: "center" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="70vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
function ParallaxImage({
  src,
  alt,
  className,
  scrollYProgress,
  speed,
}: {
  src: string;
  alt: string;
  className: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  speed: number;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 70vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

