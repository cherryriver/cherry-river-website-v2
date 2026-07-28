"use client";

import { useRef, useState } from "react";
import { FableEntryHero } from "@/components/fable/FableEntryHero";
import { FableBottle3D } from "@/components/fable/FableBottle3D";
import { FableGalerie } from "@/components/fable/FableGalerie";

const OCCASIONS = [
  { key: "apero", label: "L'apéro entre amis", slug: "berries", eyebrow: "Le gin signature", nameMain: "Gin Petits Fruits", nameAccent: "& Basilic", line: "Fruité, frais, fait pour être partagé — le signature de la maison." },
  { key: "soiree", label: "Une soirée mixologie", slug: "vodka-averse", eyebrow: "La toile blanche", nameMain: "Vodka", nameAccent: "Premium", line: "Une base pure et nette qui laisse briller vos cocktails." },
  { key: "cadeau", label: "Un cadeau à offrir", slug: "boreal", eyebrow: "Signé Opémiska", nameMain: "Gin", nameAccent: "Boréal", line: "Épinette et forêt boréale, la bouteille qui fait de l'effet." },
  { key: "zero", label: "Sans alcool ce soir", slug: "gin-sans-berries", eyebrow: "0 % d'alcool", nameMain: "Gin 0 %", nameAccent: "Petits Fruits", line: "Toute l'expérience du gin signature, sans une goutte d'alcool." },
];

const SAVEURS = [
  { slug: "berries", num: "01", main: "Petits Fruits", accent: "& Basilic", note: "Le gin signature" },
  { slug: "pamplemousse", num: "02", main: "Pamplemousse", accent: "Rose", note: "Vif & solaire" },
  { slug: "framboiselime", num: "03", main: "Framboise", accent: "& Lime", note: "Fruité & acidulé" },
  { slug: "limegingembre", num: "04", main: "Lime", accent: "& Gingembre", note: "Frais & épicé" },
  { slug: "boreal", num: "05", main: "Boréal", accent: "· Opémiska", note: "Épinette & forêt" },
];

/* Ported 1:1 from cherry-river-live-source/src/index.html (Fable build).
   Do not restyle — this IS the approved live design. */

export function FableHome() {
  const onNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const b = e.currentTarget.querySelector("button");
    if (b) b.textContent = "Merci ✦";
  };
  // 3D tilt cards — perspective follows the cursor, gloss sweep rides along
  const tiltMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg) translateY(-6px) scale(1.015)`;
    const sh = el.querySelector<HTMLElement>(".cr-tilt-shine");
    if (sh) {
      sh.style.opacity = "1";
      sh.style.background = `radial-gradient(620px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(244,239,230,0.24), transparent 46%)`;
    }
  };
  const tiltLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.transform = "";
    const sh = el.querySelector<HTMLElement>(".cr-tilt-shine");
    if (sh) sh.style.opacity = "0";
  };
  // Occasion picker — the site answers "qu'est-ce qu'on célèbre?"
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  // Index des saveurs — floating bottle preview rides the cursor
  const savPrevRef = useRef<HTMLDivElement>(null);
  const savImgRef = useRef<HTMLImageElement>(null);
  const savMove = (e: React.MouseEvent) => {
    const p = savPrevRef.current;
    if (p) { p.style.left = e.clientX + "px"; p.style.top = e.clientY + "px"; }
  };
  const savEnter = (slug: string, alt: string) => {
    const im = savImgRef.current;
    const src = `/assets/thumbs/bottle-${slug}.png`;
    if (im && im.getAttribute("src") !== src) { im.src = src; im.alt = alt; }
    savPrevRef.current?.classList.add("on");
  };
  const savLeave = () => savPrevRef.current?.classList.remove("on");
  return (
    <>
<main id="main-content">

  {/* HERO — "L'entrée" scroll fly-through */}
  <FableEntryHero />

  {/* MARQUEE */}
  <section style={{ borderTop: "1px solid rgba(42,32,26,0.1)", borderBottom: "1px solid rgba(42,32,26,0.1)", overflow: "hidden", padding: "22px 0", background: "#efe6d7" }}>
    <div style={{ display: "flex", width: "max-content", animation: "cr-marquee 38s linear infinite", willChange: "transform" }}>
      <div className="cr-mq" style={{ display: "flex", alignItems: "center", gap: "42px", paddingRight: "42px", fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(22px,2.6vw,40px)", whiteSpace: "nowrap", color: "rgba(42,32,26,0.85)" }}>
        <span>Distillé à Magog</span><span style={{ color: "#8e2436" }}>✦</span><span style={{ fontStyle: "italic" }}>Ingrédients naturels</span><span style={{ color: "#8e2436" }}>✦</span><span>Terroir québécois</span><span style={{ color: "#8e2436" }}>✦</span><span style={{ fontStyle: "italic" }}>Fait à la main</span><span style={{ color: "#8e2436" }}>✦</span><span>Petits lots</span><span style={{ color: "#8e2436" }}>✦</span><span style={{ fontStyle: "italic" }}>Sans additifs</span><span style={{ color: "#8e2436" }}>✦</span>
      </div>
      <div className="cr-mq" aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "42px", paddingRight: "42px", fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(22px,2.6vw,40px)", whiteSpace: "nowrap", color: "rgba(42,32,26,0.85)" }}>
        <span>Distillé à Magog</span><span style={{ color: "#8e2436" }}>✦</span><span style={{ fontStyle: "italic" }}>Ingrédients naturels</span><span style={{ color: "#8e2436" }}>✦</span><span>Terroir québécois</span><span style={{ color: "#8e2436" }}>✦</span><span style={{ fontStyle: "italic" }}>Fait à la main</span><span style={{ color: "#8e2436" }}>✦</span><span>Petits lots</span><span style={{ color: "#8e2436" }}>✦</span><span style={{ fontStyle: "italic" }}>Sans additifs</span><span style={{ color: "#8e2436" }}>✦</span>
      </div>
    </div>
  </section>

  {/* PHILOSOPHIE */}
  <section style={{ position: "relative", padding: "clamp(90px,15vh,200px) clamp(20px,4vw,56px)" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(48px,7vw,110px)", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }} className="cr-philo-grid">
      <div>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "30px" }}>Notre philosophie</div>
        <blockquote data-reveal data-reveal-delay="120" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "400", fontSize: "clamp(28px,4vw,58px)", lineHeight: "1.12", letterSpacing: "-0.01em" }}>
          Nous créons des boissons qui racontent une histoire — celle des <span style={{ fontStyle: "italic", color: "#a86a2c" }}>saisons</span>, du terroir québécois et de l'<span style={{ fontStyle: "italic", color: "#a86a2c" }}>excellence artisanale</span>.
        </blockquote>
        <div data-reveal data-reveal-delay="240" style={{ marginTop: "38px", display: "flex", alignItems: "center", gap: "14px", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(42,32,26,0.6)" }}>
          <span style={{ width: "38px", height: "1px", background: "#8e2436" }}></span> Cherry River, Magog
        </div>
      </div>
      <div data-reveal style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "2px" }}>
        <img data-parallax="0.12" src="/assets/lifestyle/Photo%20distillerie%20Magog/DSC_7875-4.jpg" alt="Intérieur de la distillerie Cherry River à Magog" loading="lazy" decoding="async" style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover", willChange: "transform" }} />
      </div>
    </div>
  </section>

  {/* SAVOIR-FAIRE — "Le voyage d'une bouteille" retiré (en attente de la vidéo
      générée par Huzaifa; remettre <FableVoyageBouteille /> quand elle arrive) */}

  {/* PRODUITS PHARES */}
  <style dangerouslySetInnerHTML={{ __html: `
    .cr-feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
    @media (max-width: 1100px) { .cr-feat-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .cr-feat-grid { grid-template-columns: 1fr; } }
    .cr-feat { display: block; position: relative; padding: 38px 26px 30px; background: #efe6d7; border: 1px solid rgba(42,32,26,0.08); border-radius: 2px; transition: transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s ease, border-color .55s ease; }
    .cr-feat:hover { transform: translateY(-7px); box-shadow: 0 32px 64px rgba(42,32,26,0.16); border-color: rgba(168,106,44,0.4); }
    .cr-feat-bottle { transition: transform .7s cubic-bezier(.16,1,.3,1); }
    .cr-feat:hover .cr-feat-bottle { transform: translateY(-9px) scale(1.045); }
    .cr-feat-arrow { display: inline-block; transition: transform .4s ease; }
    .cr-feat:hover .cr-feat-arrow { transform: translateX(6px); }
    .cr-lieux-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
    @media (max-width: 900px) { .cr-lieux-grid { grid-template-columns: 1fr; } }
    .cr-lieu { position: relative; display: block; overflow: hidden; border-radius: 2px; aspect-ratio: 4/3; color: #f4efe6; }
    .cr-lieu img { transition: transform 1.3s cubic-bezier(.16,1,.3,1); }
    .cr-lieu:hover img { transform: scale(1.06); }
    .cr-lieu-cta { display: inline-flex; align-items: center; gap: 10px; transition: gap .4s ease; }
    .cr-lieu:hover .cr-lieu-cta { gap: 18px; }
    .cr-360-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px,6vw,90px); align-items: center; }
    @media (max-width: 980px) { .cr-360-grid { grid-template-columns: 1fr; } }
    @keyframes cr-spin { to { transform: rotate(360deg); } }
    .cr-tilt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; perspective: 1400px; }
    @media (max-width: 980px) { .cr-tilt-grid { grid-template-columns: 1fr; } }
    .cr-tilt { position: relative; display: block; overflow: hidden; border-radius: 2px; aspect-ratio: 3/4; color: #f4efe6; transform-style: preserve-3d; transition: transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s ease; box-shadow: 0 18px 44px rgba(42,32,26,0.12); }
    .cr-tilt:hover { box-shadow: 0 44px 88px rgba(42,32,26,0.26); }
    @media (max-width: 980px) { .cr-tilt { aspect-ratio: 16/10; } }
    .cr-tilt img.cr-tilt-img { transition: transform 1.2s cubic-bezier(.16,1,.3,1); }
    .cr-tilt:hover img.cr-tilt-img { transform: scale(1.05); }
    .cr-tilt-shine { position: absolute; inset: 0; opacity: 0; transition: opacity .4s ease; pointer-events: none; }
    .cr-tilt-cta { display: inline-flex; align-items: center; gap: 10px; transition: gap .4s ease; }
    .cr-tilt:hover .cr-tilt-cta { gap: 18px; }
    .cr-sav-row { display: flex; align-items: baseline; gap: clamp(16px,2.4vw,40px); padding: clamp(22px,3.2vh,34px) 0; border-bottom: 1px solid rgba(42,32,26,0.12); color: #2a201a; transition: padding-left .5s cubic-bezier(.16,1,.3,1), color .4s ease; position: relative; }
    .cr-sav-row:first-of-type { border-top: 1px solid rgba(42,32,26,0.12); }
    .cr-sav-row:hover { padding-left: clamp(14px,2vw,34px); color: #a86a2c; }
    .cr-sav-row .cr-sav-note, .cr-sav-row .cr-sav-num { transition: color .4s ease; }
    .cr-sav-row:hover .cr-sav-note { color: rgba(168,106,44,0.75); }
    .cr-sav-arrow { margin-left: auto; opacity: 0; transform: translateX(-14px); transition: opacity .4s ease, transform .4s ease; }
    .cr-sav-row:hover .cr-sav-arrow { opacity: 1; transform: translateX(0); }
    .cr-sav-preview { position: fixed; z-index: 60; width: clamp(190px,17vw,250px); pointer-events: none; opacity: 0; transform: translate(-50%, -104%) rotate(-5deg) scale(0.92); transition: opacity .35s ease, transform .45s cubic-bezier(.16,1,.3,1); }
    .cr-sav-preview.on { opacity: 1; transform: translate(-50%, -104%) rotate(-3deg) scale(1); }
    .cr-sav-thumb { display: none; }
    @media (hover: none), (max-width: 860px) {
      .cr-sav-preview { display: none; }
      .cr-sav-thumb { display: block; height: 74px; max-width: 64px; object-fit: contain; margin-left: auto; align-self: center; flex: 0 0 auto; filter: drop-shadow(0 10px 12px rgba(42,32,26,0.3)); }
      .cr-sav-arrow { display: none; }
      .cr-sav-hint { display: none; }
    }
    .cr-pick-chip { padding: 15px 26px; border: 1px solid rgba(42,32,26,0.25); border-radius: 100px; background: transparent; color: #2a201a; font-family: inherit; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; cursor: pointer; transition: background .4s ease, color .4s ease, border-color .4s ease, transform .4s ease; }
    .cr-pick-chip:hover { border-color: #8e2436; transform: translateY(-2px); }
    .cr-pick-chip.on { background: #8e2436; border-color: #8e2436; color: #f4efe6; }
    @keyframes cr-pick-in { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
    @keyframes cr-pick-bottle { from { opacity: 0; transform: translateY(30px) rotate(-3deg); } to { opacity: 1; transform: none; } }
    .cr-pick-card { display: grid; grid-template-columns: minmax(200px, 320px) 1fr; gap: clamp(30px,5vw,80px); align-items: center; }
    .cr-pick-card .cr-pick-copy > * { animation: cr-pick-in .65s cubic-bezier(.16,1,.3,1) both; }
    .cr-pick-card .cr-pick-copy > *:nth-child(2) { animation-delay: .06s; }
    .cr-pick-card .cr-pick-copy > *:nth-child(3) { animation-delay: .12s; }
    .cr-pick-card .cr-pick-copy > *:nth-child(4) { animation-delay: .18s; }
    .cr-pick-card img { animation: cr-pick-bottle .7s cubic-bezier(.16,1,.3,1) both; }
    @media (max-width: 860px) { .cr-pick-card { grid-template-columns: 1fr; text-align: center; } .cr-pick-card img { margin: 0 auto; } }
    @media (prefers-reduced-motion: reduce) { .cr-pick-card .cr-pick-copy > *, .cr-pick-card img { animation: none !important; } }
  ` }} />
  <section id="creations" style={{ position: "relative", padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", marginBottom: "clamp(40px,6vh,70px)" }}>
        <div>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>Nos créations</div>
          <h2 data-reveal data-reveal-delay="100" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(36px,6vw,92px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Les <span style={{ fontStyle: "italic", color: "#a86a2c" }}>phares</span> de la maison</h2>
        </div>
        <a data-reveal data-reveal-delay="200" href="/produits" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 28px", border: "1px solid rgba(42,32,26,0.25)", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "#2a201a", whiteSpace: "nowrap" }}>Tous les produits →</a>
      </div>
      <div className="cr-feat-grid">
        <a className="cr-feat" data-reveal href="/produits?gin=berries">
          <div style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)", fontWeight: 600, marginBottom: "20px" }}>Gin signature</div>
          <div style={{ height: "clamp(210px,24vh,280px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "26px" }}>
            <img className="cr-feat-bottle" src="/assets/thumbs/bottle-berries.png" alt="Gin Petits Fruits & Basilic" loading="lazy" decoding="async" style={{ maxHeight: "100%", width: "auto", filter: "drop-shadow(0 26px 28px rgba(42,32,26,0.28))" }} />
          </div>
          <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(19px,1.6vw,24px)", lineHeight: 1.15, marginBottom: "10px", color: "#2a201a" }}>Gin Petits Fruits <span style={{ fontStyle: "italic", color: "#a86a2c" }}>&amp; Basilic</span></div>
          <div style={{ fontSize: "12.5px", color: "rgba(42,32,26,0.55)", marginBottom: "18px" }}>Distillé &amp; embouteillé à Magog, QC</div>
          <div style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>Découvrir <span className="cr-feat-arrow">→</span></div>
        </a>
        <a className="cr-feat" data-reveal data-reveal-delay="90" href="/produits?gin=boreal">
          <div style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)", fontWeight: 600, marginBottom: "20px" }}>Opémiska</div>
          <div style={{ height: "clamp(210px,24vh,280px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "26px" }}>
            <img className="cr-feat-bottle" src="/assets/thumbs/bottle-boreal.png" alt="Opémiska Gin Boréal" loading="lazy" decoding="async" style={{ maxHeight: "100%", width: "auto", filter: "drop-shadow(0 26px 28px rgba(42,32,26,0.28))" }} />
          </div>
          <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(19px,1.6vw,24px)", lineHeight: 1.15, marginBottom: "10px", color: "#2a201a" }}>Gin <span style={{ fontStyle: "italic", color: "#a86a2c" }}>Boréal</span></div>
          <div style={{ fontSize: "12.5px", color: "rgba(42,32,26,0.55)", marginBottom: "18px" }}>Épinette &amp; forêt boréale · Québec</div>
          <div style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>Découvrir <span className="cr-feat-arrow">→</span></div>
        </a>
        <a className="cr-feat" data-reveal data-reveal-delay="180" href="/produits?gin=vodka-averse">
          <div style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)", fontWeight: 600, marginBottom: "20px" }}>Averse</div>
          <div style={{ height: "clamp(210px,24vh,280px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "26px" }}>
            <img className="cr-feat-bottle" src="/assets/thumbs/bottle-vodka-averse.png" alt="Vodka Averse Premium" loading="lazy" decoding="async" style={{ maxHeight: "100%", width: "auto", filter: "drop-shadow(0 26px 28px rgba(42,32,26,0.28))" }} />
          </div>
          <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(19px,1.6vw,24px)", lineHeight: 1.15, marginBottom: "10px", color: "#2a201a" }}>Vodka <span style={{ fontStyle: "italic", color: "#a86a2c" }}>Premium</span></div>
          <div style={{ fontSize: "12.5px", color: "rgba(42,32,26,0.55)", marginBottom: "18px" }}>Distillée &amp; embouteillée à Magog, QC</div>
          <div style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>Découvrir <span className="cr-feat-arrow">→</span></div>
        </a>
        <a className="cr-feat" data-reveal data-reveal-delay="270" href="/produits?gin=rhum-epice">
          <div style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)", fontWeight: 600, marginBottom: "20px" }}>Rhum</div>
          <div style={{ height: "clamp(210px,24vh,280px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "26px" }}>
            <img className="cr-feat-bottle" src="/assets/thumbs/bottle-rhum-epice.png" alt="Rhum Épicé" loading="lazy" decoding="async" style={{ maxHeight: "100%", width: "auto", filter: "drop-shadow(0 26px 28px rgba(42,32,26,0.28))" }} />
          </div>
          <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(19px,1.6vw,24px)", lineHeight: 1.15, marginBottom: "10px", color: "#2a201a" }}>Rhum <span style={{ fontStyle: "italic", color: "#a86a2c" }}>Épicé</span></div>
          <div style={{ fontSize: "12.5px", color: "rgba(42,32,26,0.55)", marginBottom: "18px" }}>Assemblé &amp; embouteillé à Magog, QC</div>
          <div style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>Découvrir <span className="cr-feat-arrow">→</span></div>
        </a>
      </div>
    </div>
  </section>

  {/* SIGNATURE 360° — Dry Gin en rotation */}
  <section id="signature-360" style={{ position: "relative", background: "#0a0908", color: "#f4efe6", overflow: "hidden", padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
    <div aria-hidden="true" style={{ position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)", width: "60vw", height: "80vh", background: "radial-gradient(closest-side, rgba(168,106,44,0.16), transparent 72%)", filter: "blur(14px)", pointerEvents: "none" }} />
    <div className="cr-360-grid" style={{ position: "relative", maxWidth: "1400px", margin: "0 auto" }}>
      <div>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: "600", marginBottom: "26px" }}>La signature de la maison</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: "0 0 26px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(40px,6.4vw,104px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Dry <span style={{ fontStyle: "italic", color: "#a86a2c" }}>Gin</span></h2>
        <p data-reveal data-reveal-delay="180" style={{ margin: "0 0 30px", maxWidth: "46ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: "1.65", color: "rgba(244,239,230,0.78)" }}>London dry complexe, aux arômes de genièvre, citron amer, coriandre et botaniques sauvages du Québec comme le thé du Labrador.</p>
        <div data-reveal data-reveal-delay="240" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "38px" }}>
          <span style={{ padding: "9px 18px", border: "1px solid rgba(244,239,230,0.22)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(244,239,230,0.75)" }}>40 % alc./vol</span>
          <span style={{ padding: "9px 18px", border: "1px solid rgba(244,239,230,0.22)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(244,239,230,0.75)" }}>750 ml</span>
          <span style={{ padding: "9px 18px", border: "1px solid rgba(168,106,44,0.5)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#d8c4a0" }}>Distillé à Magog</span>
        </div>
        <div data-reveal data-reveal-delay="300" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
          <a href="/produits" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "17px 34px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Tous nos produits</a>
          <a href="https://www.saq.com/fr/14561781" target="_blank" rel="noopener noreferrer" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "17px 34px", border: "1px solid rgba(244,239,230,0.32)", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Voir à la SAQ ↗</a>
        </div>
      </div>
      <div data-reveal data-reveal-delay="150" style={{ position: "relative" }}>
        <FableBottle3D />
      </div>
    </div>
  </section>

  {/* L'INDEX DES SAVEURS — hover = la bouteille suit le curseur */}
  <section id="saveurs" style={{ position: "relative", padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }} onMouseMove={savMove} onMouseLeave={savLeave}>
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", marginBottom: "clamp(36px,5vh,60px)" }}>
        <div>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>L&apos;index des saveurs</div>
          <h2 data-reveal data-reveal-delay="100" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(36px,6vw,92px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Cinq gins, <span style={{ fontStyle: "italic", color: "#a86a2c" }}>cinq humeurs</span></h2>
        </div>
        <div data-reveal data-reveal-delay="200" className="cr-sav-hint" style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)" }}>Survolez — la bouteille suit</div>
      </div>
      <div data-reveal data-reveal-delay="150">
        {SAVEURS.map((s) => (
          <a key={s.slug} className="cr-sav-row" href={`/produits?gin=${s.slug}`} onMouseEnter={() => savEnter(s.slug, `Gin ${s.main} ${s.accent}`)}>
            <span className="cr-sav-num" style={{ fontSize: "13px", letterSpacing: "0.2em", color: "rgba(42,32,26,0.45)", minWidth: "34px" }}>{s.num}</span>
            <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(30px,4.6vw,68px)", lineHeight: 1 }}>
              {s.main} <em style={{ fontStyle: "italic" }}>{s.accent}</em>
            </span>
            <span className="cr-sav-note" style={{ fontSize: "clamp(12px,1vw,14px)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)" }}>{s.note}</span>
            <img className="cr-sav-thumb" src={`/assets/thumbs/bottle-${s.slug}.png`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <span className="cr-sav-arrow" aria-hidden="true" style={{ fontSize: "clamp(24px,2.6vw,40px)", lineHeight: 1 }}>→</span>
          </a>
        ))}
      </div>
    </div>
    {/* floating preview card */}
    <div ref={savPrevRef} className="cr-sav-preview" aria-hidden="true">
      <img ref={savImgRef} src="/assets/thumbs/bottle-berries.png" alt="" style={{ width: "100%", height: "auto", filter: "drop-shadow(0 30px 34px rgba(42,32,26,0.4))" }} />
    </div>
  </section>

  {/* TERROIR (parallax + counters) */}
  <section id="terroir" style={{ position: "relative", color: "#f4efe6", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: "0", zIndex: "0" }}>
      <img data-parallax="0.18" src="/assets/terroir-automne.jpg" alt="Forêt d'automne et lac — territoire Cherry River" loading="lazy" decoding="async" style={{ position: "absolute", inset: "-12% 0", width: "100%", height: "124%", objectFit: "cover", willChange: "transform" }} />
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg,rgba(10,9,8,0.92) 0%,rgba(10,9,8,0.6) 55%,rgba(10,9,8,0.3) 100%)" }}></div>
    </div>
    <div style={{ position: "relative", zIndex: "1", padding: "clamp(70px,12vh,140px) clamp(20px,4vw,56px)", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
      <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: "600", marginBottom: "26px" }}>Notre territoire</div>
      <h2 data-reveal data-reveal-delay="100" style={{ margin: "0 0 28px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(34px,5.4vw,82px)", lineHeight: "0.98", letterSpacing: "-0.01em", maxWidth: "16ch" }}>Enracinés dans les <span style={{ fontStyle: "italic", color: "#a86a2c" }}>Cantons-de-l'Est</span></h2>
      <p data-reveal data-reveal-delay="180" style={{ margin: "0", maxWidth: "54ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: "1.6", color: "rgba(244,239,230,0.78)" }}>Aux pieds du Mont Orford, entre le lac Memphrémagog et les forêts appalachiennes — Cherry River puise dans la nature du Québec l'essence de ses créations.</p>
      <div className="cr-stats" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(40px,7vw,100px)", marginTop: "clamp(48px,7vh,80px)" }}>
        <div data-reveal>
          <div style={{ display: "flex", alignItems: "flex-start" }}><span className="cr-count" data-count="150" data-suffix="" style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(52px,7vw,108px)", lineHeight: "0.9", letterSpacing: "-0.02em" }}>0</span><span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(34px,4vw,64px)", color: "#8e2436" }}>+</span></div>
          <div style={{ marginTop: "14px", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.6)" }}>ans d'histoire</div>
        </div>
        <div data-reveal data-reveal-delay="120">
          <span className="cr-count" data-count="2" style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(52px,7vw,108px)", lineHeight: "0.9", letterSpacing: "-0.02em", display: "block" }}>0</span>
          <div style={{ marginTop: "14px", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.6)" }}>distilleries</div>
        </div>
        <div data-reveal data-reveal-delay="240">
          <div style={{ display: "flex", alignItems: "flex-start" }}><span className="cr-count" data-count="30" style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(52px,7vw,108px)", lineHeight: "0.9", letterSpacing: "-0.02em" }}>0</span><span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(34px,4vw,64px)", color: "#8e2436" }}>+</span></div>
          <div style={{ marginTop: "14px", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.6)" }}>créations</div>
        </div>
      </div>
    </div>
  </section>

  {/* NOS LIEUX — deux distilleries */}
  <section id="lieux" style={{ padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "clamp(40px,6vh,70px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>Deux lieux, une âme</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(36px,6vw,92px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Visitez nos <span style={{ fontStyle: "italic", color: "#a86a2c" }}>distilleries</span></h2>
      </div>
      <div className="cr-lieux-grid">
        <a className="cr-lieu" data-reveal href="/distilleries#magog">
          <img src="/assets/lifestyle/Photo%20distillerie%20Magog/MD-14.jpg" alt="Intérieur de la distillerie Cherry River à Magog — ancienne église anglicane" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,9,8,0.12) 25%, rgba(10,9,8,0.55) 62%, rgba(10,9,8,0.92) 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(24px,3vw,40px)" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "12px" }}>Ancienne église anglicane</div>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(28px,3.2vw,52px)", lineHeight: 1, marginBottom: "16px", textShadow: "0 2px 26px rgba(10,9,8,0.65)", color: "#f4efe6" }}>Magog</div>
            <div className="cr-lieu-cta" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#f4efe6" }}>Planifier une visite <span>→</span></div>
          </div>
        </a>
        <a className="cr-lieu" data-reveal data-reveal-delay="120" href="/distilleries#quebec">
          <img src="/assets/lifestyle/Photos_Quebec_boutique/1000021149%20(1).jpg" alt="Façade du Memorial Hall — distillerie boutique Cherry River à Québec, Sillery" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,9,8,0.12) 25%, rgba(10,9,8,0.55) 62%, rgba(10,9,8,0.92) 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(24px,3vw,40px)" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "12px" }}>Memorial Hall · Distillerie boutique</div>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(28px,3.2vw,52px)", lineHeight: 1, marginBottom: "16px", textShadow: "0 2px 26px rgba(10,9,8,0.65)", color: "#f4efe6" }}>Québec — Sillery</div>
            <div className="cr-lieu-cta" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#f4efe6" }}>Planifier une visite <span>→</span></div>
          </div>
        </a>
      </div>
    </div>
  </section>

  {/* MARQUES */}
  <section id="marques" style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "clamp(40px,6vh,72px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>Cinq maisons, une signature</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(36px,6vw,92px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Nos <span style={{ fontStyle: "italic", color: "#a86a2c" }}>maisons</span></h2>
      </div>
      <div className="cr-brand-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", borderTop: "1px solid rgba(244,239,230,0.12)" }}>
        <div className="cr-brand" data-reveal style={{ padding: "clamp(34px,4vh,56px) 22px", borderBottom: "1px solid rgba(244,239,230,0.12)", borderRight: "1px solid rgba(244,239,230,0.12)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", minHeight: "240px", justifyContent: "center", transition: "background .5s" }}>
          <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "46px", width: "auto", objectFit: "contain", opacity: "0.92" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.04em", lineHeight: "1.5", color: "rgba(244,239,230,0.6)", maxWidth: "22ch" }}>L'âme québécoise des spiritueux modernes</span>
        </div>
        <div className="cr-brand" data-reveal data-reveal-delay="80" style={{ padding: "clamp(34px,4vh,56px) 22px", borderBottom: "1px solid rgba(244,239,230,0.12)", borderRight: "1px solid rgba(244,239,230,0.12)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", minHeight: "240px", justifyContent: "center", transition: "background .5s" }}>
          <img src="/assets/brands/opemiska/Logo_Opemiska_Blanc.png" alt="Opemiska" style={{ height: "46px", width: "auto", objectFit: "contain", opacity: "0.92" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.04em", lineHeight: "1.5", color: "rgba(244,239,230,0.6)", maxWidth: "22ch" }}>Gin boréal, distillé en patience</span>
        </div>
        <div className="cr-brand" data-reveal data-reveal-delay="160" style={{ padding: "clamp(34px,4vh,56px) 22px", borderBottom: "1px solid rgba(244,239,230,0.12)", borderRight: "1px solid rgba(244,239,230,0.12)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", minHeight: "240px", justifyContent: "center", transition: "background .5s" }}>
          <img src="/assets/brands/averse/Logo%20Averse_Blanc.png" alt="Averse" style={{ height: "42px", width: "auto", objectFit: "contain", opacity: "0.92" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.04em", lineHeight: "1.5", color: "rgba(244,239,230,0.6)", maxWidth: "22ch" }}>Vodka pure, ligne nordique</span>
        </div>
        <div className="cr-brand" data-reveal data-reveal-delay="240" style={{ padding: "clamp(34px,4vh,56px) 22px", borderBottom: "1px solid rgba(244,239,230,0.12)", borderRight: "1px solid rgba(244,239,230,0.12)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", minHeight: "240px", justifyContent: "center", transition: "background .5s" }}>
          <img src="/assets/brands/alister/Logo%20Alister_White.png" alt="House of Alister" style={{ height: "46px", width: "auto", objectFit: "contain", opacity: "0.92" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.04em", lineHeight: "1.5", color: "rgba(244,239,230,0.6)", maxWidth: "22ch" }}>Spiritueux d'auteur, minutie classique</span>
        </div>
        <div className="cr-brand" data-reveal data-reveal-delay="320" style={{ padding: "clamp(34px,4vh,56px) 22px", borderBottom: "1px solid rgba(244,239,230,0.12)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", minHeight: "240px", justifyContent: "center", transition: "background .5s" }}>
          <img src="/assets/brands/thirst/Logo_The%20thirst%20is%20real_White.png" alt="The Thirst is Real" style={{ height: "60px", width: "auto", objectFit: "contain", opacity: "0.92" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.04em", lineHeight: "1.5", color: "rgba(244,239,230,0.6)", maxWidth: "22ch" }}>Prêt à servir, sans compromis</span>
        </div>
      </div>
    </div>
  </section>

  {/* L'ART DU COCKTAIL — cartes 3D inclinables */}
  <section id="art-cocktail" style={{ position: "relative", padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ marginBottom: "clamp(40px,6vh,70px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>L&apos;art du cocktail</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(36px,6vw,92px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Prolongez <span style={{ fontStyle: "italic", color: "#a86a2c" }}>l&apos;expérience</span></h2>
      </div>
      <div className="cr-tilt-grid">
        <a className="cr-tilt" data-reveal href="/recettes" onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
          <img className="cr-tilt-img" src="/assets/lifestyle/curated/cocktails-pamplemousse-editorial.png" alt="Cocktail au gin pamplemousse Cherry River" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,9,8,0.1) 30%, rgba(10,9,8,0.55) 65%, rgba(10,9,8,0.92) 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(22px,2.4vw,34px)" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "10px" }}>Recettes en vidéo</div>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(24px,2.2vw,36px)", lineHeight: 1.05, marginBottom: "14px", color: "#f4efe6", textShadow: "0 2px 22px rgba(10,9,8,0.6)" }}>Nos recettes <span style={{ fontStyle: "italic", color: "#a86a2c" }}>signature</span></div>
            <div className="cr-tilt-cta" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#f4efe6" }}>Explorer <span>→</span></div>
          </div>
          <div className="cr-tilt-shine" aria-hidden="true" />
        </a>
        <a className="cr-tilt" data-reveal data-reveal-delay="110" href="/cocktail-culture" onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
          <img className="cr-tilt-img" src="/assets/lifestyle/curated/cocktail-bar-romarin.png" alt="Cocktail signature au romarin au bar Cherry River" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,9,8,0.1) 30%, rgba(10,9,8,0.55) 65%, rgba(10,9,8,0.92) 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(22px,2.4vw,34px)" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "10px" }}>Conseils &amp; techniques</div>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(24px,2.2vw,36px)", lineHeight: 1.05, marginBottom: "14px", color: "#f4efe6", textShadow: "0 2px 22px rgba(10,9,8,0.6)" }}>Cocktail <span style={{ fontStyle: "italic", color: "#a86a2c" }}>culture</span></div>
            <div className="cr-tilt-cta" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#f4efe6" }}>Explorer <span>→</span></div>
          </div>
          <div className="cr-tilt-shine" aria-hidden="true" />
        </a>
        <a className="cr-tilt" data-reveal data-reveal-delay="220" href="/experiences" onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
          <img className="cr-tilt-img" src="/assets/lifestyle/Photo%20distillerie%20Magog/MD-18.jpg" alt="Outils de mixologie à la distillerie Cherry River" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,9,8,0.1) 30%, rgba(10,9,8,0.55) 65%, rgba(10,9,8,0.92) 100%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(22px,2.4vw,34px)" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "10px" }}>Ateliers &amp; dégustations</div>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(24px,2.2vw,36px)", lineHeight: 1.05, marginBottom: "14px", color: "#f4efe6", textShadow: "0 2px 22px rgba(10,9,8,0.6)" }}>Vivez la <span style={{ fontStyle: "italic", color: "#a86a2c" }}>distillerie</span></div>
            <div className="cr-tilt-cta" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#f4efe6" }}>Explorer <span>→</span></div>
          </div>
          <div className="cr-tilt-shine" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>

  {/* EN IMAGES — galerie horizontale épinglée */}
  <FableGalerie />

  {/* LE BON CHOIX — occasion picker interactif */}
  <section id="occasion" style={{ position: "relative", padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vh,56px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>Le bon choix</div>
        <h2 data-reveal data-reveal-delay="100" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(36px,6vw,92px)", lineHeight: "0.95", letterSpacing: "-0.01em" }}>Qu&apos;est-ce qu&apos;on <span style={{ fontStyle: "italic", color: "#a86a2c" }}>célèbre?</span></h2>
      </div>
      <div data-reveal data-reveal-delay="180" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "clamp(44px,7vh,72px)" }}>
        {OCCASIONS.map((o) => (
          <button key={o.key} type="button" className={"cr-pick-chip" + (occasion.key === o.key ? " on" : "")} onClick={() => setOccasion(o)} aria-pressed={occasion.key === o.key}>
            {o.label}
          </button>
        ))}
      </div>
      <div key={occasion.key} className="cr-pick-card">
        <img
          src={`/assets/bottle-${occasion.slug}.png`}
          alt={`${occasion.nameMain} ${occasion.nameAccent}`}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", maxHeight: "44vh", objectFit: "contain", filter: "drop-shadow(0 34px 38px rgba(42,32,26,0.35))" }}
        />
        <div className="cr-pick-copy">
          <div style={{ fontSize: "12px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)", fontWeight: 600, marginBottom: "16px" }}>{occasion.eyebrow}</div>
          <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(32px,4.4vw,64px)", lineHeight: 1, marginBottom: "18px", color: "#2a201a" }}>
            {occasion.nameMain} <em style={{ fontStyle: "italic", color: "#a86a2c" }}>{occasion.nameAccent}</em>
          </div>
          <p style={{ margin: "0 0 28px", maxWidth: "42ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.6, color: "rgba(42,32,26,0.7)" }}>{occasion.line}</p>
          <a href={`/produits?gin=${occasion.slug}`} data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Découvrir cette bouteille</a>
        </div>
      </div>
    </div>
  </section>

  {/* CTA VISITE / NEWSLETTER */}
  <section id="visite" style={{ position: "relative", padding: "clamp(80px,14vh,180px) clamp(20px,4vw,56px)", textAlign: "center", overflow: "hidden", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
    <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "26px" }}>Restez informé</div>
    <h2 data-reveal data-reveal-delay="100" style={{ margin: "0 auto 18px", maxWidth: "18ch", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "500", fontSize: "clamp(34px,5.4vw,80px)", lineHeight: "0.98", letterSpacing: "-0.01em" }}>Recevez nos <span style={{ fontStyle: "italic", color: "#a86a2c" }}>nouvelles créations</span></h2>
    <p data-reveal data-reveal-delay="180" style={{ margin: "0 auto 40px", maxWidth: "48ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: "1.6", color: "rgba(42,32,26,0.7)" }}>Nouvelles recettes, événements exclusifs et offres réservées aux initiés — directement dans votre boîte.</p>
    <form data-reveal data-reveal-delay="240" onSubmit={onNewsletterSubmit} style={{ display: "flex", gap: "10px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
      <input type="email" required placeholder="Adresse courriel" style={{ flex: "1", minWidth: "240px", padding: "16px 22px", background: "rgba(42,32,26,0.04)", border: "1px solid rgba(42,32,26,0.2)", borderRadius: "100px", color: "#2a201a", fontFamily: "inherit", fontSize: "15px", outline: "none" }} />
      <button type="submit" data-magnetic style={{ padding: "16px 32px", background: "#8e2436", color: "#f4efe6", border: "none", borderRadius: "100px", fontFamily: "inherit", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600", cursor: "pointer" }}>S'inscrire</button>
    </form>
  </section>

  </main>

  {/* FOOTER */}
  
    </>
  );
}
