"use client";

/**
 * "Le voyage d'une bouteille" — the Cherry River production line as a real
 * layered animation (the closeknit/Lottie technique): every machine is its
 * own sprite (Nano Banana, one consistent style, chroma-keyed) and every
 * motion is programmatic GSAP — conveyor wheels spin, berries arc into the
 * funnel, a cherry rides the overhead pipe, bottles step down the belt, get
 * filled, labelled and packed. Plays continuously; no scroll choreography.
 */

import { useEffect, useRef, useState } from "react";

const S = "/assets/voyage/sprites";

const CAPTIONS = [
  { key: "terroir", eyebrow: "01 · Le terroir", text: "Petits fruits et botaniques du Québec, cueillis à la main" },
  { key: "alambic", eyebrow: "02 · L'alambic", text: "Distillé lentement dans notre alambic de cuivre, en petits lots" },
  { key: "infusion", eyebrow: "03 · L'infusion", text: "Les fruits infusent — la couleur vient du vrai fruit, jamais d'additifs" },
  { key: "etiquette", eyebrow: "04 · L'embouteillage", text: "Embouteillé et étiqueté sur place, une bouteille à la fois" },
  { key: "boutique", eyebrow: "05 · La boutique", text: "Prête pour la boutique, une bouteille à la fois" },
];

const CYCLE = 12; // seconds for one full bottle journey + caption cycle

export function FableVoyageBouteille() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) return;

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(scene);

        // ---- perpetual motions (independent loops) ----
        // conveyor wheels spin
        gsap.to(q(".vb-wheel"), { rotation: 360, duration: 2.2, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

        // steam puffs above the still
        q(".vb-puff").forEach((el, i) => {
          gsap.fromTo(el,
            { y: 0, scale: 0.5, opacity: 0 },
            { y: "-5.2vw", scale: 1.15, opacity: 0.7, duration: 3.2, ease: "power1.out", repeat: -1, delay: i * 1.1,
              keyframes: [
                { opacity: 0.7, duration: 0.6 },
                { opacity: 0, duration: 2.6 },
              ] }
          );
        });

        // berries hop from crate into the funnel (arc = up then down)
        q(".vb-berry").forEach((el, i) => {
          const tl = gsap.timeline({ repeat: -1, delay: i * 1.3, repeatDelay: 2.2 });
          tl.set(el, { x: 0, y: 0, opacity: 0 })
            .to(el, { opacity: 1, duration: 0.12 })
            .to(el, { x: "3.2vw", duration: 0.55, ease: "none" }, 0)
            .to(el, { y: "-2.6vw", duration: 0.28, ease: "power2.out" }, 0)
            .to(el, { y: "0.6vw", duration: 0.3, ease: "power2.in" }, 0.28)
            .to(el, { opacity: 0, duration: 0.12 }, 0.52);
        });

        // cherry rides the overhead pipe
        gsap.fromTo(q(".vb-pipe-cherry"), { left: "-2%" }, { left: "101%", duration: 9, ease: "none", repeat: -1 });

        // drips from the swan neck into the jar
        q(".vb-drip").forEach((el, i) => {
          gsap.fromTo(el,
            { y: 0, opacity: 0 },
            { y: "2.6vw", opacity: 1, duration: 1.1, ease: "power1.in", repeat: -1, delay: i * 0.55,
              keyframes: [{ opacity: 1, duration: 0.8 }, { opacity: 0, duration: 0.3 }] }
          );
        });

        // jar liquid gentle sway
        gsap.to(q(".vb-jar"), { rotation: 1.2, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 90%" });

        // ---- the bottle's journey (master cycle, synced with captions) ----
        const master = gsap.timeline({ repeat: -1, onUpdate: () => {
          const p = master.progress();
          setActive(Math.min(CAPTIONS.length - 1, Math.floor(p * CAPTIONS.length)));
        } });

        const bottle = q(".vb-bottle")[0];
        const full = q(".vb-bottle .vb-full")[0];
        const stream = q(".vb-stream")[0];
        const press = q(".vb-labeler")[0];
        const boxTop = q(".vb-boxtop")[0];

        master
          // enter the belt
          .set(bottle, { left: "44%", opacity: 0 })
          .set(full, { opacity: 0 })
          .to(bottle, { opacity: 1, duration: 0.3 }, 0.2)
          // step to the filler
          .to(bottle, { left: "49.2%", duration: 1.1, ease: "power1.inOut" }, 0.5)
          // fill: pink stream on, empty→full crossfade
          .to(stream, { opacity: 1, duration: 0.15 }, 1.8)
          .to(full, { opacity: 1, duration: 1.4, ease: "none" }, 1.9)
          .to(stream, { opacity: 0, duration: 0.15 }, 3.4)
          // step to the labeller
          .to(bottle, { left: "62.5%", duration: 1.6, ease: "power1.inOut" }, 4.1)
          // press taps down
          .to(press, { y: "0.7vw", duration: 0.18, ease: "power2.in" }, 6.0)
          .to(press, { y: 0, duration: 0.3, ease: "power2.out" }, 6.2)
          .fromTo(bottle, { scaleY: 1 }, { scaleY: 0.94, duration: 0.14, yoyo: true, repeat: 1, transformOrigin: "50% 100%" }, 6.05)
          // continue to the end of the belt
          .to(bottle, { left: "72.5%", duration: 1.5, ease: "power1.inOut" }, 6.9)
          // hop off into the boxes
          .to(bottle, { left: "79%", duration: 0.7, ease: "power1.in" }, 8.6)
          .to(bottle, { y: "1.4vw", duration: 0.45, ease: "power2.in" }, 8.85)
          .to(bottle, { opacity: 0, duration: 0.25 }, 9.15)
          .set(bottle, { y: 0 })
          // the box stack takes it with a satisfying squash
          .fromTo(boxTop, { scaleY: 1 }, { scaleY: 0.88, duration: 0.16, yoyo: true, repeat: 1, transformOrigin: "50% 100%", ease: "power2.out" }, 9.2)
          // breathe until the cycle restarts
          .to({}, { duration: CYCLE - 9.6 });

        master.duration(CYCLE);
      }, scene);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="savoir-faire"
      aria-label="Le voyage d'une bouteille — notre processus"
      style={{ position: "relative", padding: "clamp(70px,10vh,130px) 0 clamp(60px,8vh,100px)", overflow: "hidden", background: "#f6efe0" }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "clamp(28px,4vh,48px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "14px" }}>Notre savoir-faire</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: 0, fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(28px,3.6vw,54px)", lineHeight: 1.02, color: "#2a201a" }}>
          Le voyage d&apos;une <em style={{ fontStyle: "italic", color: "#a86a2c" }}>bouteille</em>
        </h2>
      </div>

      {/* THE SCENE — layered sprites, all motion programmatic */}
      <div data-reveal data-reveal-delay="160" style={{ display: "grid", placeItems: "center", padding: "0 clamp(8px,1.5vw,24px)" }}>
        <div
          ref={sceneRef}
          style={{ position: "relative", width: "min(1680px, 100%)", aspectRatio: "21/9", overflow: "hidden" }}
        >
          {/* wall + floor */}
          <div style={{ position: "absolute", inset: 0, background: "#faf4e6", border: "1px solid rgba(138,106,68,0.25)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "11%", background: "#8a6a44" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: "11%", height: "0.5%", background: "#6d5335" }} />

          {/* overhead pipe */}
          <div style={{ position: "absolute", left: 0, right: 0, top: "5%", height: "4.5%", background: "#efe6d2", borderTop: "1px solid rgba(138,106,68,0.35)", borderBottom: "1px solid rgba(138,106,68,0.35)", borderRadius: "999px" }} />
          <div className="vb-pipe-cherry" style={{ position: "absolute", top: "6.1%", left: "-2%", width: "1.3%", aspectRatio: "1", borderRadius: "50%", background: "#a02338", border: "1px solid #6d1626", willChange: "left" }} />

          {/* window */}
          <img src={`${S}/window.png`} alt="" style={{ position: "absolute", right: "8%", top: "12%", height: "34%", width: "auto" }} />

          {/* stage 1 — crate + berries + funnel */}
          <img src={`${S}/crate.png`} alt="" style={{ position: "absolute", left: "3.5%", bottom: "11%", height: "13%", width: "auto" }} />
          {["#a02338", "#4a4a7a", "#c04a5e"].map((c, i) => (
            <div key={i} className="vb-berry" style={{ position: "absolute", left: "7.5%", bottom: "24%", width: "0.9%", aspectRatio: "1", borderRadius: "50%", background: c, opacity: 0, willChange: "transform" }} />
          ))}
          <img src={`${S}/funnel.png`} alt="" style={{ position: "absolute", left: "11%", bottom: "11%", height: "20%", width: "auto" }} />

          {/* stage 2 — still + steam */}
          <img src={`${S}/still.png`} alt="" style={{ position: "absolute", left: "17.5%", bottom: "11%", height: "34%", width: "auto" }} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="vb-puff" style={{ position: "absolute", left: `${21.2 + i * 1}%`, bottom: "45%", width: "2.2%", aspectRatio: "1", borderRadius: "50%", background: "rgba(255,250,240,0.85)", filter: "blur(1px)", opacity: 0, willChange: "transform, opacity" }} />
          ))}

          {/* drips into the jar */}
          {[0, 1].map((i) => (
            <div key={i} className="vb-drip" style={{ position: "absolute", left: "34.6%", bottom: "37%", width: "0.5%", aspectRatio: "1/1.6", borderRadius: "50%", background: "#e2899b", opacity: 0, willChange: "transform, opacity" }} />
          ))}
          {/* stage 3 — jar */}
          <img src={`${S}/jar.png`} alt="" className="vb-jar" style={{ position: "absolute", left: "31.5%", bottom: "11%", height: "20%", width: "auto", willChange: "transform" }} />

          {/* stage 4 — belt + wheels + nozzle + labeller */}
          <img src={`${S}/belt.png`} alt="" style={{ position: "absolute", left: "40%", bottom: "11%", width: "34%", height: "13%", objectFit: "fill" }} />
          {[0, 1, 2].map((i) => (
            <img key={i} src={`${S}/wheel.png`} alt="" className="vb-wheel" style={{ position: "absolute", left: `${46 + i * 8.2}%`, bottom: "19.4%", height: "4.2%", width: "auto", willChange: "transform" }} />
          ))}
          <div style={{ position: "absolute", left: "50.1%", top: "9.5%", width: "0.35%", height: "52.5%", background: "#c9bfae" }} />
          <img src={`${S}/nozzle.png`} alt="" style={{ position: "absolute", left: "49.1%", bottom: "27.5%", height: "10.5%", width: "auto" }} />
          <div className="vb-stream" style={{ position: "absolute", left: "50.15%", bottom: "25%", width: "0.45%", height: "3%", background: "#e2899b", opacity: 0 }} />
          <img src={`${S}/labeler.png`} alt="" className="vb-labeler" style={{ position: "absolute", left: "60.5%", bottom: "23%", height: "14%", width: "auto", willChange: "transform" }} />

          {/* the travelling bottle (empty + full stacked) */}
          <div className="vb-bottle" style={{ position: "absolute", left: "44%", bottom: "23.4%", height: "11%", aspectRatio: "0.45", opacity: 0, willChange: "transform, left, opacity" }}>
            <img src={`${S}/bottle-empty.png`} alt="" style={{ position: "absolute", inset: 0, height: "100%", width: "100%", objectFit: "contain" }} />
            <img src={`${S}/bottle-full.png`} alt="" className="vb-full" style={{ position: "absolute", inset: 0, height: "100%", width: "100%", objectFit: "contain", opacity: 0 }} />
          </div>

          {/* stage 5 — boxes */}
          <img src={`${S}/box.png`} alt="" style={{ position: "absolute", left: "79.5%", bottom: "11%", height: "13%", width: "auto" }} />
          <img src={`${S}/box.png`} alt="" style={{ position: "absolute", left: "85.8%", bottom: "11%", height: "13%", width: "auto" }} />
          <img src={`${S}/box.png`} alt="" className="vb-boxtop" style={{ position: "absolute", left: "82.6%", bottom: "23.4%", height: "13%", width: "auto", willChange: "transform" }} />
        </div>
      </div>

      {/* Captions — cycle with the journey */}
      <div style={{ display: "grid", placeItems: "center", padding: "clamp(20px,3vh,36px) 24px 0" }}>
        <div style={{ position: "relative", width: "min(640px, 92vw)", height: "86px" }}>
          {CAPTIONS.map((c, i) => (
            <div
              key={c.key}
              style={{
                position: "absolute", inset: 0, textAlign: "center",
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(12px)",
                transition: "opacity .6s ease, transform .6s ease",
              }}
            >
              <div style={{ fontSize: "11px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#a86a2c", fontWeight: 600, marginBottom: "10px" }}>{c.eyebrow}</div>
              <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(17px,1.7vw,24px)", lineHeight: 1.3, color: "#2a201a" }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
