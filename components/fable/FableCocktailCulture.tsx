"use client";

/* Cocktail Culture — Fable design language. Bibliothèque vidéo complète
   (content/cocktail-videos.json, 35 tutoriels) avec filtre par spiritueux,
   philosophie cocktail (brand-content.json) et lightbox YouTube.
   Distinct de /recettes (vitrine signée) : ici, toute la chaîne. */

import { useMemo, useState } from "react";
import videosData from "@/content/cocktail-videos.json";

const SERIF = "'Familjen Grotesk',sans-serif";

const STYLES = `
  [data-cr-root] .cr-cc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:clamp(20px,2.6vw,38px);}
  [data-cr-root] .cr-cc-card{animation:cr-cc-in .7s cubic-bezier(.16,1,.3,1) both;}
  @keyframes cr-cc-in{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
  [data-cr-root] .cr-cc-card .cr-cc-thumb{transition:box-shadow .5s;}
  [data-cr-root] .cr-cc-card:hover .cr-cc-thumb{box-shadow:0 26px 54px rgba(60,45,30,0.2);}
  [data-cr-root] .cr-cc-card:hover .cr-cc-play{transform:translate(-50%,-50%) scale(1.12);background:#f4efe6;}
  [data-cr-root] .cr-cc-chip{transition:background .3s,color .3s,border-color .3s;}
  [data-cr-root] .cr-cc-chip:hover{border-color:#8e2436;}
  [data-cr-root] .cr-cc-philo{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,3vw,44px);}
  @media (max-width:980px){[data-cr-root] .cr-cc-philo{grid-template-columns:1fr!important;}}
  @media (prefers-reduced-motion:reduce){[data-cr-root] .cr-cc-card{animation:none;}}
`;

const PHILOSOPHY = [
  { title: "Saisons & terroir", text: "Ingrédients locaux sélectionnés au fil des saisons" },
  { title: "Équilibre & précision", text: "Travail minutieux d'assemblage et calibration" },
  { title: "Beauté & sensation", text: "L'esthétique du cocktail aussi importante que le goût" },
];

interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnailMq?: string;
  primaryTag?: string;
  primaryCategory?: string;
}

function spiritOf(v: Video): string {
  const t = (v.primaryTag || "").toLowerCase();
  if (t.includes("gin")) return "Gin";
  if (t.includes("vodka")) return "Vodka";
  if (t.includes("rhum") || t.includes("rum")) return "Rhum";
  if (t.includes("tequila")) return "Tequila";
  if (t.includes("liqueur") || t.includes("amaretto") || t.includes("café")) return "Liqueurs";
  if (t.includes("mocktail") || v.primaryCategory === "mocktail") return "Sans alcool";
  return "Classiques";
}

const FILTERS = ["Tous", "Gin", "Vodka", "Rhum", "Tequila", "Liqueurs", "Sans alcool", "Classiques"];

export function FableCocktailCulture() {
  const [filter, setFilter] = useState("Tous");
  const [active, setActive] = useState<string | null>(null);

  const videos = useMemo(() => (videosData.videos as Video[]).map((v) => ({ ...v, spirit: spiritOf(v) })), []);
  const shown = filter === "Tous" ? videos : videos.filter((v) => v.spirit === filter);

  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <header style={{ padding: "clamp(120px,17vh,180px) clamp(20px,4vw,56px) clamp(30px,5vh,54px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "24px" }}>Cocktail Culture</div>
          <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 22px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(44px,7.5vw,120px)", lineHeight: 0.94, letterSpacing: "-0.02em" }}>
            L&apos;art du <span style={{ fontStyle: "italic", fontWeight: 500, color: "#a86a2c" }}>cocktail</span>
          </h1>
          <p data-reveal data-reveal-delay="170" style={{ margin: "0 auto", maxWidth: "54ch", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.6, color: "rgba(42,32,26,0.72)" }}>
            Toute notre bibliothèque de tutoriels — histoires, techniques et recettes pas à pas, avec les spiritueux Cherry River.
          </p>
        </div>
      </header>

      {/* PHILOSOPHIE STRIP */}
      <section style={{ padding: "clamp(30px,5vh,60px) clamp(20px,4vw,56px) clamp(50px,8vh,80px)" }}>
        <div className="cr-cc-philo" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {PHILOSOPHY.map((p, i) => (
            <div key={p.title} data-reveal data-reveal-delay={String(i * 90)} style={{ borderTop: "1px solid rgba(42,32,26,0.25)", paddingTop: "20px" }}>
              <div style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.7vw,24px)", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>
                <span style={{ color: "#8e2436", marginRight: "10px", fontSize: "13px" }}>✦</span>{p.title}
              </div>
              <div style={{ fontSize: "14px", lineHeight: 1.55, color: "rgba(42,32,26,0.62)" }}>{p.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ padding: "0 clamp(20px,4vw,56px) clamp(28px,4vh,44px)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const on = filter === f;
            const count = f === "Tous" ? videos.length : videos.filter((v) => v.spirit === f).length;
            if (count === 0) return null;
            return (
              <button key={f} type="button" onClick={() => setFilter(f)} className="cr-cc-chip" style={{ appearance: "none", cursor: "pointer", font: "inherit", fontSize: "12.5px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, padding: "10px 18px", borderRadius: "100px", border: `1px solid ${on ? "#8e2436" : "rgba(42,32,26,0.25)"}`, background: on ? "#8e2436" : "transparent", color: on ? "#f4efe6" : "#2a201a" }}>
                {f} <span style={{ opacity: 0.55, marginLeft: "4px" }}>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* VIDEO LIBRARY */}
      <section style={{ padding: "0 clamp(20px,4vw,56px) clamp(60px,10vh,120px)" }}>
        <div className="cr-cc-grid" style={{ maxWidth: "1320px", margin: "0 auto" }}>
          {shown.map((v, i) => (
            <button key={v.videoId} type="button" onClick={() => setActive(v.videoId)} className="cr-cc-card" style={{ animationDelay: `${Math.min(i, 8) * 55}ms`, appearance: "none", textAlign: "left", border: 0, padding: 0, background: "transparent", cursor: "pointer", font: "inherit", color: "inherit", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="cr-cc-thumb" style={{ position: "relative", aspectRatio: "16/9", borderRadius: "3px", overflow: "hidden", backgroundColor: "#241c14", backgroundImage: `url('https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg')`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 18px 40px rgba(60,45,30,0.12)" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(36,28,20,0.5), rgba(36,28,20,0) 55%)" }}></div>
                <div className="cr-cc-play" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "64px", height: "64px", borderRadius: "50%", background: "rgba(244,239,230,0.92)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .5s cubic-bezier(.16,1,.3,1), background .5s" }}>
                  <span style={{ display: "block", width: 0, height: 0, marginLeft: "4px", borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "18px solid #8e2436" }}></span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600 }}>{v.spirit}</span>
                <span style={{ fontFamily: SERIF, fontSize: "clamp(19px,1.6vw,24px)", fontWeight: 600, lineHeight: 1.16, letterSpacing: "-0.01em" }}>{v.title}</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ maxWidth: "1320px", margin: "clamp(40px,7vh,70px) auto 0", textAlign: "center" }}>
          <a href="https://www.youtube.com/@distilleriecherryriver" target="_blank" rel="noopener" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 30px", border: "1px solid rgba(42,32,26,0.35)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
            Toutes nos vidéos sur YouTube →
          </a>
        </div>
      </section>

      {/* CTA vers les recettes signées */}
      <section style={{ padding: "clamp(70px,11vh,140px) clamp(20px,4vw,56px)", textAlign: "center", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "24px" }}>Nos créations</div>
        <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 auto 18px", maxWidth: "20ch", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.6vw,64px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
          Les recettes signées <span style={{ fontStyle: "italic", color: "#a86a2c" }}>Cherry River</span>
        </h2>
        <p data-reveal data-reveal-delay="170" style={{ margin: "0 auto 36px", maxWidth: "46ch", fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.6, color: "rgba(244,239,230,0.7)" }}>
          Nos cocktails maison, expliqués pas à pas — la sélection officielle de la distillerie.
        </p>
        <a data-reveal data-reveal-delay="230" href="/recettes" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "16px 34px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
          Voir nos recettes
        </a>
      </section>

      {/* LIGHTBOX */}
      {active && (
        <div onClick={() => setActive(null)} style={{ position: "fixed", inset: 0, zIndex: 9500, background: "rgba(20,15,10,0.86)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(20px,4vw,64px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(1000px,100%)", aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${active}?autoplay=1&rel=0`}
              title="Tutoriel Cherry River"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, borderRadius: "5px", background: "#000", boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}
            ></iframe>
            <button type="button" onClick={() => setActive(null)} aria-label="Fermer" style={{ position: "absolute", top: "-50px", right: 0, appearance: "none", background: "transparent", border: 0, color: "#f4efe6", fontSize: "28px", lineHeight: 1, cursor: "pointer", opacity: 0.85 }}>✕</button>
          </div>
        </div>
      )}
    </main>
  );
}
