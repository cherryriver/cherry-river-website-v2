"use client";

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export function ManifestoSection() {
  return (
    <section
      className="relative overflow-hidden px-[var(--content-margin-x)] py-[var(--section-gap-cinematic)]"
      style={{ background: "#090909" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <AnimateOnScroll>
          <p
            className="mb-8 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
            style={{ color: "#C9A84C" }}
          >
            Notre philosophie
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <blockquote
            className="font-heading font-light italic leading-[1.35] tracking-wide"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)",
              color: "#f0ebe4",
            }}
          >
            &laquo;&thinsp;Nous créons des boissons qui racontent une histoire
            — celle des saisons, du terroir québécois et de l&apos;excellence
            artisanale.&thinsp;&raquo;
          </blockquote>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div className="mx-auto mt-12 flex items-center justify-center gap-6">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "#2a2520" }} aria-hidden />
            <p
              className="font-body text-[0.7rem] font-normal uppercase tracking-[0.2em]"
              style={{ color: "#6b6258" }}
            >
              Cherry River, Magog
            </p>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "#2a2520" }} aria-hidden />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
