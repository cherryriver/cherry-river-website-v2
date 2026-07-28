"use client";

import Image from "next/image";
import Link from "next/link";
import { DistilleryPhotoAddressBlock } from "@/components/distilleries/DistilleryPhotoAddressBlock";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const INTRO =
  "Découvrez nos distilleries, dégustez nos créations et plongez dans l’univers Cherry River. Choisissez votre destination et réservez votre expérience.";

const LOCATIONS = [
  {
    slug: "magog",
    name: "Distillerie Boutique Magog",
    description:
      "Une immersion complète au cœur de notre savoir-faire, dans un lieu chargé d’histoire.",
    image: "/assets/locations/distillerie-boutique-magog-exterieur.png",
    imageAlt:
      "Distillerie Cherry River à Magog — façade de l’ancienne église anglicane blanche, clocher et enseigne en bois Cherry River Distillerie",
    href: "/experiences",
  },
  {
    slug: "quebec",
    name: "Distillerie Boutique Québec",
    description:
      "Une expérience intime et raffinée au cœur de la ville, entre dégustation et découverte.",
    image: "/assets/locations/distillerie-boutique-quebec-exterieur.png",
    imageAlt:
      "Distillerie Cherry River à Québec — façade en pierre et colombages du Mémorial Hall, allée pavée et bannières Cherry River vers l’entrée",
    href: "/experiences",
  },
] as const;

export function DistilleriesSection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="distilleries-heading"
    >
      {/* Full-bleed lifestyle photo background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/lifestyle/Photo distillerie Magog/distillerie-magog-exterieur.png"
          alt="Distillerie Cherry River — extérieur Magog"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(250,247,242,0.93) 0%, rgba(250,247,242,0.90) 50%, rgba(250,247,242,0.95) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 px-[var(--content-margin-x)] py-[var(--section-gap-standard)]">
      <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
        <AnimateOnScroll>
          <h2
            id="distilleries-heading"
            className="font-heading font-light leading-[1.12]"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            <span
              className="mb-4 block font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "#C9A84C" }}
            >
              Les distilleries
            </span>
            <span className="block max-w-[22ch] text-[clamp(2rem,4.5vw,3.25rem)]">
              Deux adresses, une même exigence
            </span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p
            className="mt-6 max-w-[42rem] font-body text-[1rem] font-light leading-[1.85] sm:mt-8 sm:text-[1.0625rem] sm:leading-[1.9]"
            style={{ color: "#6B6258" }}
          >
            {INTRO}
          </p>
        </AnimateOnScroll>

        <div className="mt-14 grid gap-14 sm:mt-16 md:grid-cols-2 md:gap-12 lg:gap-16">
          {LOCATIONS.map((loc, i) => (
            <AnimateOnScroll key={loc.slug} delay={0.12 + i * 0.1}>
              <article className="flex flex-col border border-[#C9A84C]/20" style={{ background: "#FAFAF8" }}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={loc.image}
                    alt={loc.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3
                  className="px-6 pt-8 text-center font-heading text-[clamp(1.5rem,3.2vw,2rem)] font-light leading-[1.2] tracking-tight sm:px-8 sm:pt-10"
                  style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                >
                  {loc.name}
                </h3>
                <DistilleryPhotoAddressBlock
                  slug={loc.slug}
                  className="mt-4 px-4 sm:mt-5 sm:px-6"
                />
                <Link
                  href={loc.href}
                  className="group flex flex-col px-6 pb-8 pt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1A1A1A] sm:px-8 sm:pb-10 sm:pt-8"
                >
                  <p
                    className="mx-auto max-w-md text-center font-body text-[0.9375rem] font-light leading-[1.85] transition-opacity duration-500 group-hover:opacity-90"
                    style={{ color: "#6B6258" }}
                  >
                    {loc.description}
                  </p>
                  <span
                    className="mx-auto mt-8 inline-flex w-full max-w-md items-center justify-center px-8 py-3.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.22em] transition-opacity duration-500 ease-out group-hover:opacity-90 sm:px-10 sm:py-4 sm:text-[0.7rem]"
                    style={{ background: "#1A1A1A", color: "#FAF7F2" }}
                  >
                    Planifier votre visite
                  </span>
                </Link>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
