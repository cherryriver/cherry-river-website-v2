"use client";

/**
 * "L'entrée" — scroll-driven church fly-through hero.
 * Scroll scrubs a continuous steadicam video: exterior approach → through the
 * door → inside the nave (Seedance 2.0, first frame = real hero-magog frame,
 * last frame = real interior photo). Text choreography rides the same timeline.
 * Copy and visual language are the approved Fable design — evolved, not redesigned.
 */

import { useEffect, useRef } from "react";

const TRACK = 320; // % of viewport height the pin lasts

export function FableEntryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const thresholdRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const realInteriorRef = useRef<HTMLImageElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const filmWrapRef = useRef<HTMLDivElement>(null); // idle breathing + mouse drift
  const barTopRef = useRef<HTMLDivElement>(null);
  const barBotRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const goldlineRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const railLabelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // static poster + intro copy, no pin

    let rafId = 0;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let cleanupExtra: (() => void) | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        video.pause();

        let targetTime = 0;
        let currentTime = 0;
        let railStage = -1;

        // --- Idle life: slow breathing zoom + gentle mouse drift (before the journey) ---
        const wrap = filmWrapRef.current!;
        let idle = true;
        const breathe = gsap.fromTo(wrap, { scale: 1.03 }, { scale: 1.1, duration: 11, yoyo: true, repeat: -1, ease: "sine.inOut" });
        let mx = 0, my = 0;
        const drift = gsap.quickTo(wrap, "x", { duration: 1.2, ease: "power2.out" });
        const driftY = gsap.quickTo(wrap, "y", { duration: 1.2, ease: "power2.out" });
        const onMouse = (e: MouseEvent) => {
          if (!idle) return;
          mx = (e.clientX / window.innerWidth - 0.5) * 18;
          my = (e.clientY / window.innerHeight - 0.5) * 10;
          drift(mx); driftY(my);
        };
        window.addEventListener("mousemove", onMouse);
        const endIdle = () => {
          if (!idle) return;
          idle = false;
          breathe.kill();
          gsap.to(wrap, { scale: 1, x: 0, y: 0, duration: 0.9, ease: "power2.out", overwrite: "auto" });
        };

        // --- Gold hairline under the italic word (draws in after load) ---
        if (goldlineRef.current) {
          gsap.fromTo(goldlineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: 1.5 });
        }

        // --- Dust motes in the light (visible during the interior reveal) ---
        const canvas = dustRef.current!;
        const dctx = canvas.getContext("2d")!;
        const motes = Array.from({ length: 42 }, (_, i) => ({
          x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.6,
          vx: (Math.random() - 0.5) * 0.00012, vy: -0.00004 - Math.random() * 0.00012,
          tw: Math.random() * Math.PI * 2, sp: 0.4 + Math.random() * 0.8,
        }));
        let dustAlpha = 0;
        const sizeCanvas = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        sizeCanvas();
        window.addEventListener("resize", sizeCanvas);
        const drawDust = (t: number) => {
          dctx.clearRect(0, 0, canvas.width, canvas.height);
          if (dustAlpha <= 0.01) return;
          for (const m of motes) {
            m.x += m.vx; m.y += m.vy;
            if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
            if (m.x < -0.02) m.x = 1.02; if (m.x > 1.02) m.x = -0.02;
            const glow = (Math.sin(t * 0.001 * m.sp + m.tw) + 1) / 2;
            dctx.beginPath();
            dctx.arc(m.x * canvas.width, m.y * canvas.height, m.r, 0, Math.PI * 2);
            dctx.fillStyle = `rgba(232, 215, 180, ${dustAlpha * (0.16 + glow * 0.3)})`;
            dctx.fill();
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${TRACK}%`,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (video.duration) targetTime = p * (video.duration - 0.06);
              if (p > 0.01) endIdle(); else if (!idle) { idle = true; breathe.restart(true); }
              if (railFillRef.current) railFillRef.current.style.height = (p * 100).toFixed(1) + "%";
              dustAlpha = p > 0.55 ? Math.min(1, (p - 0.55) / 0.15) * (p > 0.94 ? Math.max(0, (1 - p) / 0.06) : 1) : 0;
              // God-rays breathe in with the dust, slightly softer
              if (raysRef.current) raysRef.current.style.opacity = (dustAlpha * 0.85).toFixed(3);
              // Active journey stage lights up on the rail
              const stage = p < 0.34 ? 0 : p < 0.7 ? 1 : 2;
              if (stage !== railStage && railLabelsRef.current) {
                railStage = stage;
                Array.from(railLabelsRef.current.children).forEach((el, i) => {
                  const s = (el as HTMLElement).style;
                  s.color = i === stage ? "#d8c4a0" : "rgba(244,239,230,0.4)";
                  s.letterSpacing = i === stage ? "0.42em" : "0.3em";
                });
              }
            },
          },
        });

        // Text choreography along the journey
        tl.to(introRef.current, { opacity: 0, y: -40, duration: 0.14 }, 0.14) // fade as we approach
          // cinematic letterbox during the travel, released on arrival
          .to([barTopRef.current, barBotRef.current], { height: "6.5vh", duration: 0.12, ease: "power2.inOut" }, 0.14)
          .to([barTopRef.current, barBotRef.current], { height: 0, duration: 0.1, ease: "power2.inOut" }, 0.84)
          .fromTo(railRef.current, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.05)
          .to(railRef.current, { opacity: 0, duration: 0.06 }, 0.9)
          .to(cueRef.current, { opacity: 0, duration: 0.08 }, 0.1)
          .fromTo(thresholdRef.current, { opacity: 0, y: 24, scale: 0.955 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out" }, 0.42) // in the doorway dark
          .to(thresholdRef.current, { opacity: 0, y: -24, scale: 1.02, duration: 0.1, ease: "power2.in" }, 0.58)
          .fromTo(realInteriorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.14 }, 0.8) // settle onto the real photo (real bottles)
          .fromTo(arrivalRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.12 }, 0.84); // inside

        // Smooth scrub — lerp toward scroll target so seeks never stutter
        const smoothSeek = (t: number) => {
          if (video.duration) {
            // Lenis already lerps the scroll itself — keep the video lerp
            // snappier so the two smoothings don't stack into lag; the
            // all-intra encode makes every seek instant.
            currentTime += (targetTime - currentTime) * 0.18;
            if (Math.abs(video.currentTime - currentTime) > 1 / 60) {
              video.currentTime = currentTime;
            }
          }
          drawDust(t);
          rafId = requestAnimationFrame(smoothSeek);
        };
        rafId = requestAnimationFrame(smoothSeek);

        cleanupExtra = () => {
          window.removeEventListener("mousemove", onMouse);
          window.removeEventListener("resize", sizeCanvas);
        };
      }, section);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cleanupExtra?.();
      ctx?.revert();
    };
  }, []);

  return (
    <header
      ref={sectionRef}
      id="top"
      data-entry-hero
      style={{ position: "relative", color: "#f4efe6", height: "100svh", minHeight: "640px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) { .cr-entry-rail { display: none !important; } }
        @media (max-width: 640px) { .cr-eyebrow-rule { display: none !important; } .cr-entry-cue { display: none !important; } }
        @media (max-width: 767px) { .cr-arrival-sub { white-space: normal !important; max-width: 34ch; } }
        @keyframes cr-goldsweep { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @media (prefers-reduced-motion: reduce) { [data-goldsweep] { animation: none !important; } }
      ` }} />
      {/* Scroll-scrubbed fly-through */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <div ref={filmWrapRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/assets/hero/church-entry-poster.jpg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/assets/hero/church-entry-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/assets/hero/church-entry.mp4" type="video/mp4" />
        </video>
        {/* Real interior photo (real Cherry River bottles) — fades in over the
            generated video at journey's end so the resting state is 100% real. */}
        <img
          ref={realInteriorRef}
          src="/assets/hero/church-interior-real.jpg"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0 }}
        />
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.12) 32%, rgba(10,9,8,0.35) 64%, rgba(10,9,8,0.96) 100%)" }} />
      {/* left scrim — keeps the copy readable over the bright sky frames */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.28) 34%, rgba(10,9,8,0) 62%)" }} />

      {/* Cinematic vignette — pulls the eye to center, adds depth to the film */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(120% 92% at 50% 42%, rgba(10,9,8,0) 52%, rgba(10,9,8,0.38) 100%)" }} />

      {/* God-rays — soft light shafts through the nave, fade in with the dust */}
      <div ref={raysRef} aria-hidden="true" style={{ position: "absolute", inset: "-4%", zIndex: 1, pointerEvents: "none", opacity: 0, filter: "blur(7px)", mixBlendMode: "screen", background: "linear-gradient(112deg, transparent 38%, rgba(236,215,175,0.22) 46%, transparent 54%), linear-gradient(104deg, transparent 58%, rgba(236,215,175,0.13) 66%, transparent 74%), linear-gradient(120deg, transparent 20%, rgba(236,215,175,0.09) 27%, transparent 34%)" }} />

      {/* Dust motes in the light (interior reveal) */}
      <canvas ref={dustRef} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, width: "100%", height: "100%", pointerEvents: "none" }} />

      {/* Cinematic letterbox bars — gold hairline on the inner edge */}
      <div ref={barTopRef} aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, zIndex: 3, background: "#0a0908", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 8%, rgba(168,106,44,0.6) 50%, transparent 92%)" }} />
      </div>
      <div ref={barBotRef} aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 0, zIndex: 3, background: "#0a0908", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 8%, rgba(168,106,44,0.6) 50%, transparent 92%)" }} />
      </div>

      {/* Journey progress rail */}
      <div ref={railRef} aria-hidden="true" className="cr-entry-rail" style={{ position: "absolute", right: "clamp(18px,3vw,44px)", top: "50%", transform: "translateY(-50%)", zIndex: 2, display: "flex", alignItems: "center", gap: "14px", opacity: 0 }}>
        <div ref={railLabelsRef} style={{ display: "flex", flexDirection: "column", gap: "56px", fontSize: "9px", textAlign: "right" }}>
          <span style={{ letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(244,239,230,0.4)", transition: "color 0.6s ease, letter-spacing 0.6s ease" }}>Extérieur</span>
          <span style={{ letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(244,239,230,0.4)", transition: "color 0.6s ease, letter-spacing 0.6s ease" }}>Le seuil</span>
          <span style={{ letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(244,239,230,0.4)", transition: "color 0.6s ease, letter-spacing 0.6s ease" }}>La nef</span>
        </div>
        <div style={{ position: "relative", width: "1px", height: "190px", background: "rgba(244,239,230,0.18)" }}>
          <div ref={railFillRef} style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "0%", background: "linear-gradient(180deg, rgba(168,106,44,0.5), #a86a2c)", boxShadow: "0 0 8px rgba(168,106,44,0.55)" }} />
          {[0, 50, 100].map((t) => (
            <div key={t} style={{ position: "absolute", top: `${t}%`, left: "50%", transform: "translate(-50%,-50%)", width: "5px", height: "5px", borderRadius: "50%", border: "1px solid rgba(216,196,160,0.55)", background: "#0a0908" }} />
          ))}
        </div>
      </div>

      {/* Scene 1 — approved hero copy (fades as the approach begins) */}
      <div ref={introRef} style={{ position: "relative", zIndex: 2, padding: "0 clamp(20px,4vw,56px) clamp(48px,7vh,90px)" }}>
        <div style={{ overflow: "hidden" }}>
          <div data-hero-line style={{ display: "inline-flex", alignItems: "center", gap: "16px", fontSize: "12px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#e8d7b4", fontWeight: 600, marginBottom: "clamp(20px,3vh,34px)", transform: "translateY(110%)", textShadow: "0 1px 4px rgba(10,9,8,0.7), 0 2px 18px rgba(10,9,8,0.8)" }}>
            <span aria-hidden="true" className="cr-eyebrow-rule" style={{ width: "42px", height: "1px", background: "linear-gradient(90deg, #a86a2c, rgba(168,106,44,0))" }} />
            Distillerie artisanale · Magog &amp; Québec
          </div>
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, lineHeight: 0.92, letterSpacing: "-0.01em", fontSize: "clamp(48px,9.4vw,176px)", maxWidth: "14ch", textShadow: "0 3px 34px rgba(10,9,8,0.55)" }}>
          <span style={{ display: "block", overflow: "hidden" }}><span data-hero-line style={{ display: "block", transform: "translateY(110%)" }}>L&apos;univers du</span></span>
          <span style={{ display: "block", overflow: "hidden" }}><span data-hero-line style={{ display: "block", transform: "translateY(110%)", fontStyle: "italic" }}><span data-goldsweep style={{ backgroundImage: "linear-gradient(100deg, #a86a2c 0%, #a86a2c 30%, #dfb476 50%, #a86a2c 70%, #a86a2c 100%)", backgroundSize: "240% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", animation: "cr-goldsweep 8s ease-in-out infinite" }}>cocktail,</span><div ref={goldlineRef} aria-hidden="true" style={{ height: "4px", width: "96%", marginTop: "0.06em", borderRadius: "2px", background: "linear-gradient(90deg,#e8c088,#c07f3a 55%,rgba(168,106,44,0))", boxShadow: "0 0 14px rgba(217,160,91,0.55)", transform: "scaleX(0)", transformOrigin: "left" }} /></span></span>
          <span style={{ display: "block", overflow: "hidden" }}><span data-hero-line style={{ display: "block", transform: "translateY(110%)" }}>distillé ici.</span></span>
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "28px", marginTop: "clamp(28px,4vh,48px)" }}>
          <div style={{ overflow: "hidden" }}>
            <p data-hero-line style={{ margin: 0, maxWidth: "34ch", fontSize: "clamp(15px,1.25vw,18px)", lineHeight: 1.5, color: "rgba(244,239,230,0.8)", transform: "translateY(110%)" }}>
              Un seul créateur, cinq maisons. Des boissons modernes nées du terroir québécois et de l&apos;excellence artisanale.
            </p>
          </div>
          <div data-hero-cta style={{ display: "flex", gap: "14px", opacity: 0 }}>
            <a href="/produits" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 30px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Découvrir nos produits</a>
            <a href="#visite" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 30px", border: "1px solid rgba(244,239,230,0.32)", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Réserver une visite</a>
          </div>
        </div>
      </div>

      {/* Scene 2 — the threshold (appears in the doorway darkness) */}
      <div ref={thresholdRef} style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0, pointerEvents: "none", padding: "0 24px" }}>
        <div aria-hidden="true" style={{ width: "1px", height: "52px", background: "linear-gradient(180deg, rgba(168,106,44,0), #a86a2c)", marginBottom: "26px" }} />
        <div style={{ fontSize: "12px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "18px" }}>
          Magog — Ancienne église anglicane
        </div>
        <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,64px)", lineHeight: 1.05 }}>
          Édifice de plus de <em style={{ fontStyle: "italic", color: "#a86a2c" }}>150 ans</em>
        </div>
        <div aria-hidden="true" style={{ width: "1px", height: "52px", background: "linear-gradient(180deg, #a86a2c, rgba(168,106,44,0))", marginTop: "26px" }} />
      </div>

      {/* Scene 3 — arrival inside (CTAs return) */}
      <div ref={arrivalRef} style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0, padding: "0 24px" }}>
        {/* Warm candle-glow pooled behind the welcome */}
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(84vw, 1100px)", height: "62vh", background: "radial-gradient(closest-side, rgba(168,106,44,0.24), rgba(168,106,44,0.07) 55%, transparent 75%)", filter: "blur(12px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "16px", fontSize: "12px", letterSpacing: "0.42em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "clamp(18px,2.6vh,28px)" }}>
          <span aria-hidden="true" className="cr-eyebrow-rule" style={{ width: "34px", height: "1px", background: "linear-gradient(90deg, rgba(168,106,44,0), #a86a2c)" }} />
          Distillerie Cherry River
          <span aria-hidden="true" className="cr-eyebrow-rule" style={{ width: "34px", height: "1px", background: "linear-gradient(90deg, #a86a2c, rgba(168,106,44,0))" }} />
        </div>
        <div style={{ position: "relative", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, lineHeight: 0.96, letterSpacing: "-0.02em", marginBottom: "clamp(24px,3.4vh,38px)" }}>
          <span style={{ display: "block", fontSize: "clamp(46px,6.6vw,116px)", textShadow: "0 4px 40px rgba(10,9,8,0.55)" }}>Bienvenue</span>
          <span style={{ display: "block", fontSize: "clamp(50px,7.2vw,128px)", fontStyle: "italic", color: "#a86a2c", textShadow: "0 0 70px rgba(168,106,44,0.45)" }}>chez nous.</span>
        </div>
        <p className="cr-arrival-sub" style={{ position: "relative", margin: "0 0 clamp(26px,3.6vh,40px)", fontSize: "clamp(15px,1.2vw,19px)", lineHeight: 1.6, color: "rgba(244,239,230,0.82)", whiteSpace: "nowrap" }}>
          Bien plus qu&apos;une distillerie, une maison de boissons modernes.
        </p>
        <div style={{ position: "relative", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/produits" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "19px 40px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, boxShadow: "0 14px 40px rgba(142,36,54,0.4)" }}>Découvrir nos produits</a>
          <a href="#visite" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "19px 40px", border: "1px solid rgba(244,239,230,0.45)", borderRadius: "100px", fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, backdropFilter: "blur(8px)", background: "rgba(10,9,8,0.25)" }}>Réserver une visite</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className="cr-entry-cue" style={{ position: "absolute", zIndex: 2, bottom: "26px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)" }}>Défiler</span>
        <div style={{ position: "relative", width: "1px", height: "46px", background: "rgba(244,239,230,0.2)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "14px", background: "#a86a2c", animation: "cr-scrollcue 2.2s cubic-bezier(.7,0,.3,1) infinite" }} />
        </div>
      </div>
    </header>
  );
}
