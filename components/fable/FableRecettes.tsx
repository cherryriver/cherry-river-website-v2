"use client";

/* Ported 1:1 from cherry-river-live-source/src/recettes.html (Fable build). */

import { Fragment, useMemo, useRef, useState } from "react";
import { useFableBehaviors } from "@/components/fable/useFableBehaviors";
import { rawVideos } from "@/lib/fable/recettes-videos.js";

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const STYLES = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4ede0; }
  @keyframes crr-grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-4%,-4%)} 30%{transform:translate(3%,-2%)} 50%{transform:translate(-2%,4%)} 70%{transform:translate(4%,2%)} 90%{transform:translate(-3%,3%)} }
  ::selection { background: #8e2436; color: #f4efe6; }
  [data-crr-root] a { color: inherit; text-decoration: none; }
  @media (max-width: 860px) { [data-cursor-dot],[data-cursor-ring] { display: none !important; } }


      [data-crr-root] .crr-navlink{position:relative;opacity:.82;transition:opacity .4s;}
      [data-crr-root] .crr-navlink:hover{opacity:1;}
      [data-crr-root] .crr-navlink::after{content:'';position:absolute;left:0;right:0;bottom:-6px;height:1px;background:#e7d3ad;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1);}
      [data-crr-root] .crr-navlink:hover::after{transform:scaleX(1);}
      [data-crr-root] .crr-footlink{transition:color .35s;}
      [data-crr-root] .crr-footlink:hover{color:#e7d3ad;}
      [data-crr-root] .crr-card .crr-thumb{transition:box-shadow .5s;}
      [data-crr-root] .crr-card:hover .crr-thumb{box-shadow:0 26px 54px rgba(60,45,30,0.2);}
      [data-crr-root] .crr-card:hover .crr-play{transform:translate(-50%,-50%) scale(1.12);background:#f4efe6;}
      [data-crr-root] a.crr-card:hover .crr-play{transform:scale(1.12);}
      @media (max-width:860px){[data-crr-root] [data-nav-links]{display:none!important;}}
    `;

export function FableRecettes() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  useFableBehaviors(rootRef, [], { solidNav: true });

  const rv = useMemo(() => {
    const videos = rawVideos.map((w) => ({
      id: w.id, title: w.title, spirit: w.spirit, desc: w.desc,
      thumbCss: "url('https://img.youtube.com/vi/" + w.id + "/hqdefault.jpg')",
      open: () => setActive(w.id),
    }));
    return {
      videos,
      lightbox: !!active,
      activeSrc: active ? "https://www.youtube-nocookie.com/embed/" + active + "?autoplay=1&rel=0" : "",
      closeVideo: () => setActive(null),
      stop: (e: React.MouseEvent) => { e.stopPropagation(); },
    };
  }, [active]);

  return (
    <div ref={rootRef} data-crr-root style={{ position: "relative", background: "#f4ede0", color: "#2a201a", fontFamily: "'Hanken Grotesk',sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
<div aria-hidden="true" style={{ position: "fixed", inset: "-50%", zIndex: "9000", pointerEvents: "none", opacity: "0.05", mixBlendMode: "overlay", backgroundImage: GRAIN, animation: "crr-grain 8s steps(6) infinite" }}></div>

  <div data-cursor-ring style={{ position: "fixed", top: "0", left: "0", zIndex: "9999", width: "38px", height: "38px", border: "1px solid rgba(42,32,26,0.4)", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", transition: "width .35s cubic-bezier(.16,1,.3,1),height .35s cubic-bezier(.16,1,.3,1),background .35s,border-color .35s", mixBlendMode: "difference" }}></div>
  <div data-cursor-dot style={{ position: "fixed", top: "0", left: "0", zIndex: "9999", width: "5px", height: "5px", background: "#2a201a", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", mixBlendMode: "difference" }}></div>

  {/* NAV */}
  <nav data-nav style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "8000", color: "#f4efe6", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px clamp(20px,4vw,56px)", background: "rgba(36,28,20,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
    <a href="/" data-magnetic style={{ display: "inline-block" }}>
      <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "30px", width: "auto", display: "block" }} />
    </a>
    <div data-nav-links style={{ display: "flex", alignItems: "center", gap: "clamp(18px,2.2vw,36px)", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "500" }}>
      <button type="button" data-produits-trigger className="crr-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Produits <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
      <button type="button" data-boutique-trigger className="crr-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Boutique <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
      <a href="#recettes" className="crr-navlink" style={{ color: "#e7d3ad" }}>Recettes</a>
      <a href="/distilleries" className="crr-navlink">Distilleries</a>
      <a href="/la-maison" className="crr-navlink">La Maison</a>
    </div>
    <a href="/experiences" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: "600", padding: "11px 22px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px" }}>Réserver une visite</a>
  </nav>

  <main id="main-content">

  {/* HERO */}
  <header id="recettes" style={{ padding: "clamp(120px,17vh,180px) clamp(20px,4vw,56px) clamp(40px,6vh,64px)" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
      <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "24px" }}>Cocktail Culture</div>
      <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 22px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(44px,7.5vw,120px)", lineHeight: "0.94", letterSpacing: "-0.02em" }}>Nos <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>recettes</span></h1>
      <p data-reveal data-reveal-delay="170" style={{ margin: "0 auto", maxWidth: "52ch", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: "1.6", color: "rgba(42,32,26,0.72)" }}>Des cocktails signés Cherry River, expliqués pas à pas en vidéo. Parcourez toutes nos réalisations et recréez-les chez vous.</p>
    </div>
  </header>

  {/* VIDEO GALLERY */}
  <section style={{ padding: "0 clamp(20px,4vw,56px) clamp(60px,10vh,120px)" }}>
    <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "clamp(20px,2.6vw,38px)" }}>
      {rv.videos.map((v, vIdx) => (<Fragment key={vIdx}>
        <button type="button" data-reveal onClick={v.open} className="crr-card" style={{ appearance: "none", textAlign: "left", border: "0", padding: "0", background: "transparent", cursor: "pointer", font: "inherit", color: "inherit", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="crr-thumb" style={{ position: "relative", aspectRatio: "16/9", borderRadius: "3px", overflow: "hidden", backgroundColor: "#241c14", backgroundImage: v.thumbCss, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 18px 40px rgba(60,45,30,0.12)" }}>
            <div style={{ position: "absolute", inset: "0", background: "linear-gradient(to top, rgba(36,28,20,0.5), rgba(36,28,20,0) 55%)" }}></div>
            <div className="crr-play" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "64px", height: "64px", borderRadius: "50%", background: "rgba(244,239,230,0.92)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .5s cubic-bezier(.16,1,.3,1), background .5s" }}>
              <span style={{ display: "block", width: "0", height: "0", marginLeft: "4px", borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "18px solid #8e2436" }}></span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600" }}>{v.spirit}</span>
            <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(20px,1.7vw,26px)", fontWeight: "600", lineHeight: "1.14", letterSpacing: "-0.01em" }}>{v.title}</span>
            <span style={{ fontSize: "14px", lineHeight: "1.5", color: "rgba(42,32,26,0.6)" }}>{v.desc}</span>
          </div>
        </button>
      </Fragment>))}
      <a data-reveal href="https://www.youtube.com/@distilleriecherryriver" target="_blank" rel="noopener" className="crr-card" style={{ display: "flex", flexDirection: "column", gap: "16px", textDecoration: "none" }}>
        <div className="crr-thumb" style={{ position: "relative", aspectRatio: "16/9", borderRadius: "3px", overflow: "hidden", background: "#241c14", color: "#f4efe6", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="crr-play" style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(231,211,173,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }}>
            <span style={{ display: "block", width: "0", height: "0", marginLeft: "4px", borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "18px solid #e7d3ad" }}></span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600" }}>La chaîne</span>
          <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(20px,1.7vw,26px)", fontWeight: "600", lineHeight: "1.14", letterSpacing: "-0.01em" }}>Voir la chaîne →</span>
          <span style={{ fontSize: "14px", lineHeight: "1.5", color: "rgba(42,32,26,0.6)" }}>Toutes nos vidéos, et les nouveautés, sur YouTube.</span>
        </div>
      </a>
    </div>
  </section>

  {/* LIGHTBOX */}
  {rv.lightbox && (<>
    <div onClick={rv.closeVideo} style={{ position: "fixed", inset: "0", zIndex: "9500", background: "rgba(20,15,10,0.86)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(20px,4vw,64px)" }}>
      <div onClick={rv.stop} style={{ position: "relative", width: "min(1000px,100%)", aspectRatio: "16/9" }}>
        <iframe src={rv.activeSrc} title="Recette Cherry River" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen style={{ position: "absolute", inset: "0", width: "100%", height: "100%", border: "0", borderRadius: "5px", background: "#000", boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}></iframe>
        <button type="button" onClick={rv.closeVideo} aria-label="Fermer" style={{ position: "absolute", top: "-50px", right: "0", appearance: "none", background: "transparent", border: "0", color: "#f4efe6", fontSize: "28px", lineHeight: "1", cursor: "pointer", opacity: "0.85" }}>✕</button>
      </div>
    </div>
  </>)}

  </main>

  {/* FOOTER */}
  <footer style={{ padding: "clamp(48px,7vh,80px) clamp(20px,4vw,56px) 36px", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
      <div>
        <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "30px", width: "auto", marginBottom: "18px" }} />
        <p style={{ margin: "0", maxWidth: "38ch", fontSize: "14px", lineHeight: "1.6", color: "rgba(244,239,230,0.55)" }}>Boissons modernes élaborées au Québec. Deux distilleries, un univers de créations artisanales.</p>
      </div>
      <div style={{ display: "flex", gap: "clamp(30px,5vw,70px)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c9489", marginBottom: "6px" }}>Explorer</div>
          <a href="/#creations" className="crr-footlink">Produits</a>
          <a href="#recettes" className="crr-footlink">Recettes</a>
          <a href="/distilleries" className="crr-footlink">Distilleries</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c9489", marginBottom: "6px" }}>La Maison</div>
          <a href="/" className="crr-footlink">Notre histoire</a>
          <a href="https://www.youtube.com/@distilleriecherryriver" target="_blank" rel="noopener" className="crr-footlink">YouTube</a>
        </div>
      </div>
    </div>
    <div style={{ maxWidth: "1440px", margin: "40px auto 0", paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", fontSize: "12px", color: "#9c9489" }}>
      <span>© 2026 Distillerie Cherry River (9426-5964 Québec inc.)</span>
      <span>La consommation d'alcool est réservée aux personnes majeures.</span>
    </div>
  </footer>
    </div>
  );
}
