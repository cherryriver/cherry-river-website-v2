"use client";

/**
 * "En images" — pinned horizontal gallery.
 * Vertical scroll drives a sideways travel through real distillery photographs
 * (GSAP ScrollTrigger scrub). Below 980px / reduced-motion: natural horizontal
 * swipe with scroll-snap instead of the pin.
 * Photos: the eyes-verified real shots (July 13 audit) only.
 */

import { useEffect, useRef } from "react";

const PHOTOS = [
  { src: "/assets/lifestyle/Photo%20distillerie%20Magog/MD-30.jpg", cap: "L'alambic de cuivre — Magog", w: "46vw" },
  { src: "/assets/lifestyle/Photo%20distillerie%20Magog/DSC_0820.JPG", cap: "Le vitrail de la nef — Magog", w: "32vw" },
  { src: "/assets/lifestyle/Photo%20distillerie%20Magog/MD-7.jpg", cap: "La distillerie — Magog", w: "46vw" },
  { src: "/assets/lifestyle/Photos_Quebec_boutique/DSCF9780.jpg", cap: "La boutique — Québec, Sillery", w: "32vw" },
  { src: "/assets/hero/church-interior-real.jpg", cap: "La nef — Magog", w: "52vw" },
];

export function FableGalerie() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 980px)").matches;
    if (reduce || !wide) return; // swipe mode — no pin

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (fillRef.current) fillRef.current.style.width = (self.progress * 100).toFixed(1) + "%";
            },
          },
        });
      }, section);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="en-images" style={{ position: "relative", background: "#0a0908", color: "#f4efe6", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cr-gal-track { display: flex; align-items: center; gap: clamp(18px,2.4vw,36px); padding: 0 clamp(20px,4vw,56px); will-change: transform; }
        .cr-gal-panel { flex: 0 0 auto; }
        .cr-gal-panel figure { margin: 0; }
        .cr-gal-panel img { width: 100%; height: 62vh; object-fit: cover; border-radius: 2px; display: block; }
        @media (max-width: 979px) {
          .cr-gal-wrap { overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
          .cr-gal-panel { scroll-snap-align: center; width: 82vw !important; }
          .cr-gal-panel img { height: 52vh; }
          .cr-gal-progress { display: none; }
        }
      ` }} />
      <div style={{ padding: "clamp(70px,11vh,130px) clamp(20px,4vw,56px) clamp(30px,4vh,50px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "22px" }}>La distillerie</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: 0, fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(36px,6vw,92px)", lineHeight: 0.95, letterSpacing: "-0.01em" }}>
          En <span style={{ fontStyle: "italic", color: "#a86a2c" }}>images</span>
        </h2>
      </div>
      <div className="cr-gal-wrap">
        <div ref={trackRef} className="cr-gal-track">
          {PHOTOS.map((p, i) => (
            <div key={p.src} className="cr-gal-panel" style={{ width: p.w }}>
              <figure>
                <img src={p.src} alt={p.cap} loading="lazy" decoding="async" />
                <figcaption style={{ display: "flex", alignItems: "baseline", gap: "14px", marginTop: "16px", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,239,230,0.65)" }}>
                  <span style={{ color: "#a86a2c" }}>{String(i + 1).padStart(2, "0")}</span> {p.cap}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <div className="cr-gal-progress" style={{ padding: "clamp(34px,5vh,60px) clamp(20px,4vw,56px) clamp(60px,9vh,110px)" }}>
        <div style={{ position: "relative", height: "1px", background: "rgba(244,239,230,0.16)" }}>
          <div ref={fillRef} style={{ position: "absolute", top: 0, left: 0, height: "1px", width: "0%", background: "#a86a2c", boxShadow: "0 0 8px rgba(168,106,44,0.6)" }} />
        </div>
      </div>
    </section>
  );
}
