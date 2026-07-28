"use client";

/* Ported 1:1 from cherry-river-live-source/src/produits.html (Fable build). */

import { Fragment, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useFableBehaviors } from "@/components/fable/useFableBehaviors";
import { buildProductVals } from "@/lib/fable/product-vals.js";
import { FableCatalogue } from "@/components/fable/FableCatalogue";

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const STYLES = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4ede0; }
  @keyframes crp-float { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-14px); } }
  @keyframes crp-grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-4%,-4%)} 30%{transform:translate(3%,-2%)} 50%{transform:translate(-2%,4%)} 70%{transform:translate(4%,2%)} 90%{transform:translate(-3%,3%)} }
  ::selection { background: #8e2436; color: #f4efe6; }
  [data-crp-root] a { color: inherit; text-decoration: none; }
  @media (max-width: 860px) { [data-cursor-dot],[data-cursor-ring] { display: none !important; } }


      [data-crp-root] .crp-navlink{position:relative;opacity:.82;transition:opacity .4s;}
      [data-crp-root] .crp-navlink:hover{opacity:1;}
      [data-crp-root] .crp-navlink::after{content:'';position:absolute;left:0;right:0;bottom:-6px;height:1px;background:#a86a2c;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1);}
      [data-crp-root] .crp-navlink:hover::after{transform:scaleX(1);}
      [data-crp-root] .crp-crumb{transition:color .35s;}
      [data-crp-root] .crp-crumb:hover{color:#a86a2c;}
      [data-crp-root] .crp-coll{position:relative;font-family:'Familjen Grotesk',sans-serif;font-size:clamp(15px,1.4vw,19px);color:#6b5f54;transition:color .35s;padding:6px 0;white-space:nowrap;}
      [data-crp-root] .crp-coll:hover{color:#2a201a;}
      [data-crp-root] .crp-coll[data-active="true"]{color:#865520;}
      [data-crp-root] .crp-coll[data-active="true"]::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:#865520;}
      [data-crp-root] .crp-chip{display:inline-flex;align-items:center;padding:9px 18px;border:1px solid rgba(42,32,26,0.28);border-radius:100px;font-size:12.5px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(42,32,26,0.82);font-weight:500;}
      [data-crp-root] .crp-fact-l{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b5f54;margin-bottom:12px;}
      [data-crp-root] .crp-fact-v{font-family:'Familjen Grotesk',sans-serif;font-size:clamp(16px,1.4vw,22px);font-weight:500;letter-spacing:-0.01em;}
      [data-crp-root] .crp-bot{display:flex;align-items:baseline;gap:14px;padding:16px 0;border-bottom:1px solid rgba(42,32,26,0.14);}
      [data-crp-root] .crp-bot-n{font-size:11px;color:#8e2436;font-variant-numeric:tabular-nums;font-weight:600;letter-spacing:0.1em;}
      [data-crp-root] .crp-bot-name{font-family:'Familjen Grotesk',sans-serif;font-size:clamp(17px,1.5vw,22px);}
      [data-crp-root] .crp-ing{display:flex;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid rgba(42,32,26,0.12);font-size:15px;color:rgba(42,32,26,0.82);}
      [data-crp-root] .crp-ing-q{color:#6d4a1f;white-space:nowrap;font-variant-numeric:tabular-nums;}
      [data-crp-root] .crp-step{position:relative;counter-increment:step;padding-left:38px;font-size:14px;line-height:1.55;color:rgba(42,32,26,0.72);}
      [data-crp-root] .crp-step::before{content:counter(step,decimal-leading-zero);position:absolute;left:0;top:0;font-family:'Familjen Grotesk',sans-serif;font-size:12px;color:#8e2436;font-weight:600;letter-spacing:0.08em;}
      [data-crp-root] .crp-rel:hover .crp-rel-img{transform:scale(1.06) translateY(-4px);}
      [data-crp-root] .crp-rel:hover .crp-rel-a{transform:translateX(6px);}
      [data-crp-root] .crp-foot-h{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#9c9489;margin-bottom:18px;}
      [data-crp-root] .crp-footlink{transition:color .35s;}
      [data-crp-root] .crp-footlink:hover{color:#a86a2c;}
      [data-crp-root] input::placeholder{color:rgba(42,32,26,0.45);}
      [data-crp-root] input:focus{border-color:rgba(231,211,173,0.6);}
      @media (max-width:980px){
        [data-crp-root] .crp-hero-grid{grid-template-columns:1fr!important;gap:40px!important;}
        [data-crp-root] .crp-profil-grid{grid-template-columns:1fr!important;}
        [data-crp-root] .crp-bot-grid{grid-template-columns:1fr!important;}
        [data-crp-root] .crp-serve-grid{grid-template-columns:1fr!important;}
        [data-crp-root] .crp-rel-grid{grid-template-columns:1fr 1fr!important;}
        [data-crp-root] .crp-foot-grid{grid-template-columns:1fr 1fr!important;}
        [data-crp-root] .crp-facts{grid-template-columns:1fr 1fr 1fr!important;}
      }
      @media (max-width:860px){[data-crp-root] [data-nav-links]{display:none!important;}}
      @media (max-width:600px){
        [data-crp-root] .crp-notes{grid-template-columns:1fr!important;}
        [data-crp-root] .crp-rel-grid{grid-template-columns:1fr!important;}
        [data-crp-root] .crp-foot-grid{grid-template-columns:1fr!important;}
        [data-crp-root] .crp-facts{grid-template-columns:1fr 1fr!important;}
        [data-crp-root] .crp-bot-list{grid-template-columns:1fr!important;}
      }
    `;

export function FableProduits() {
  const params = useSearchParams();
  const gin = params.get("gin");
  // Sans ?gin= : le catalogue complet; avec : la fiche produit
  if (!gin) return <FableCatalogue />;
  return <FableProduitDetail slug={gin} />;
}

function FableProduitDetail({ slug }: { slug: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const v = buildProductVals(slug);
  useFableBehaviors(rootRef, [slug], { solidNav: true });
  return (
    <div key={slug} ref={rootRef} data-crp-root style={{ position: "relative", background: "#f4ede0", color: "#2a201a", fontFamily: "'Hanken Grotesk',sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
<div aria-hidden="true" style={{ position: "fixed", inset: "-50%", zIndex: "9000", pointerEvents: "none", opacity: "0.05", mixBlendMode: "overlay", backgroundImage: GRAIN, animation: "crp-grain 8s steps(6) infinite" }}></div>

  <div data-cursor-ring style={{ position: "fixed", top: "0", left: "0", zIndex: "9999", width: "38px", height: "38px", border: "1px solid rgba(244,239,230,0.5)", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", transition: "width .35s cubic-bezier(.16,1,.3,1),height .35s cubic-bezier(.16,1,.3,1),background .35s,border-color .35s", mixBlendMode: "difference" }}></div>
  <div data-cursor-dot style={{ position: "fixed", top: "0", left: "0", zIndex: "9999", width: "5px", height: "5px", background: "#f4efe6", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", mixBlendMode: "difference" }}></div>

  {/* NAV */}
  <nav data-nav style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "8000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px clamp(20px,4vw,56px)", transition: "background .6s ease, padding .6s ease, border-color .6s ease", color: "#f4efe6", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(36,28,20,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
    <a href="/" data-magnetic style={{ display: "inline-block" }}>
      <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "30px", width: "auto", display: "block" }} />
    </a>
    <div data-nav-links style={{ display: "flex", alignItems: "center", gap: "clamp(18px,2.2vw,36px)", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "500" }}>
      <button type="button" data-produits-trigger className="crp-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Produits <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
      <button type="button" data-boutique-trigger className="crp-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Boutique <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
      <a href="#profil" className="crp-navlink">Dégustation</a>
      <a href="/recettes" className="crp-navlink">Recettes</a>
    </div>
    <a href="#acheter" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: "600", padding: "11px 22px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px" }}>Se procurer</a>
  </nav>

  <main id="main-content">

  {/* HERO */}
  <header id="acheter" style={{ position: "relative", padding: "clamp(104px,14vh,150px) clamp(20px,4vw,56px) clamp(40px,6vh,72px)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div data-reveal style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b5f54", marginBottom: "clamp(30px,6vh,62px)" }}>
        <a href="/" className="crp-crumb">Accueil</a>
        <span style={{ opacity: ".4" }}>/</span>
        <a href="/#creations" className="crp-crumb">Créations</a>
        <span style={{ opacity: ".4" }}>/</span>
        <span style={{ color: "#865520" }}>{v.nameFull}</span>
      </div>

      <div className="crp-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 0.92fr", gap: "clamp(36px,5vw,86px)", alignItems: "center" }}>
        <div>
          <div data-reveal style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "clamp(22px,3.4vh,36px)" }}>
            <img src={v.brandLogo} alt={v.brand} style={{ height: "22px", width: "auto", opacity: "0.72", filter: "invert(1)" }} />
            <span style={{ width: "1px", height: "20px", background: "rgba(42,32,26,0.25)" }}></span>
            <span style={{ fontSize: "12px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#6d4a1f", fontWeight: "600" }}>{v.eyebrow}</span>
          </div>
          <h1 data-reveal data-reveal-delay="80" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", lineHeight: "0.94", letterSpacing: "-0.02em", fontSize: "clamp(42px,6.4vw,100px)" }}>
            {v.nameMain}<br /><span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>{v.nameAccent}</span>
          </h1>
          <p data-reveal data-reveal-delay="160" style={{ margin: "clamp(22px,3.2vh,34px) 0 0", maxWidth: "44ch", fontSize: "clamp(16px,1.25vw,19px)", lineHeight: "1.6", color: "rgba(42,32,26,0.78)" }}>{v.description}</p>

          <div data-reveal data-reveal-delay="220" style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "clamp(28px,4vh,40px) 0 clamp(30px,4vh,42px)" }}>
            {v.chips.map((chip: string, chipIdx: number) => (<Fragment key={chipIdx}><span className="crp-chip">{chip}</span></Fragment>))}
          </div>

          <div data-reveal data-reveal-delay="280" style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
            <a href="#" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "17px 34px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>Trouver à la SAQ</a>
            <a href="/experiences" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "17px 30px", border: "1px solid rgba(42,32,26,0.32)", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>Visiter la distillerie</a>
          </div>
        </div>

        <div data-reveal data-reveal-delay="140" style={{ position: "relative", height: "clamp(440px,74vh,760px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div aria-hidden="true" style={{ position: "absolute", width: "86%", height: "86%", borderRadius: "50%", background: "radial-gradient(circle at 50% 42%, rgba(231,211,173,0.10) 0%, rgba(231,211,173,0) 68%)", filter: "blur(12px)" }}></div>
          <div aria-hidden="true" style={{ position: "absolute", bottom: "8.5%", left: "50%", transform: "translateX(-50%)", width: "42%", height: "22px", borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(60,45,30,0.22) 0%, rgba(60,45,30,0) 70%)", filter: "blur(4px)" }}></div>
          <div style={{ position: "relative", height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", animation: "crp-float 7s ease-in-out infinite" }}>
            <img src={v.bottleImg} alt={v.bottleAlt} style={{ height: "100%", width: "auto", maxWidth: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", bottom: "2%", left: "50%", transform: "translateX(-50%)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(42,32,26,0.4)", whiteSpace: "nowrap" }}>{v.caption}</div>
        </div>
      </div>
    </div>
  </header>

  {/* COLLECTION SWITCHER */}
  <section style={{ borderTop: "1px solid rgba(42,32,26,0.1)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "18px clamp(20px,4vw,56px)", display: "flex", alignItems: "center", gap: "clamp(20px,3vw,44px)", flexWrap: "wrap" }}>
      <span style={{ fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#6b5f54", whiteSpace: "nowrap" }}>{v.collectionLabel}</span>
      <div className="crp-coll-row" style={{ display: "flex", alignItems: "center", gap: "clamp(16px,2.4vw,34px)", flexWrap: "wrap" }}>
        {v.collection.map((c, cIdx) => (<Fragment key={cIdx}>
          <a href={c.href} className="crp-coll" data-active={c.active}>{c.label}</a>
        </Fragment>))}
      </div>
    </div>
  </section>

  {/* AT-A-GLANCE BAR */}
  <section style={{ borderTop: "1px solid rgba(42,32,26,0.1)", borderBottom: "1px solid rgba(42,32,26,0.1)" }}>
    <div className="crp-facts" style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
      <div className="crp-fact" data-reveal style={{ padding: "clamp(26px,3.6vh,40px) clamp(18px,2vw,30px)", borderRight: "1px solid rgba(42,32,26,0.1)" }}>
        <div className="crp-fact-l">Type</div><div className="crp-fact-v">{v.factType}</div>
      </div>
      <div className="crp-fact" data-reveal data-reveal-delay="70" style={{ padding: "clamp(26px,3.6vh,40px) clamp(18px,2vw,30px)", borderRight: "1px solid rgba(42,32,26,0.1)" }}>
        <div className="crp-fact-l">Alcool</div><div className="crp-fact-v">{v.factAbv}</div>
      </div>
      <div className="crp-fact" data-reveal data-reveal-delay="140" style={{ padding: "clamp(26px,3.6vh,40px) clamp(18px,2vw,30px)", borderRight: "1px solid rgba(42,32,26,0.1)" }}>
        <div className="crp-fact-l">Format</div><div className="crp-fact-v">{v.factFormat}</div>
      </div>
      <div className="crp-fact" data-reveal data-reveal-delay="210" style={{ padding: "clamp(26px,3.6vh,40px) clamp(18px,2vw,30px)", borderRight: "1px solid rgba(42,32,26,0.1)" }}>
        <div className="crp-fact-l">Distillation</div><div className="crp-fact-v">{v.factProcess}</div>
      </div>
      <div className="crp-fact" data-reveal data-reveal-delay="280" style={{ padding: "clamp(26px,3.6vh,40px) clamp(18px,2vw,30px)" }}>
        <div className="crp-fact-l">Origine</div><div className="crp-fact-v">{v.origine}</div>
      </div>
    </div>
  </section>

  {/* TASTING PROFILE */}
  <section id="profil" style={{ padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "clamp(40px,6vw,96px)", alignItems: "center" }} className="crp-profil-grid">
      <div data-reveal style={{ position: "relative", aspectRatio: "3/4", borderRadius: "2px", overflow: "hidden" }}>
        <img data-parallax="0.12" src={v.lifestyle[0]} alt={`En cocktail — ${v.nameFull}`} style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover", willChange: "transform" }} />
      </div>
      <div>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "24px" }}>Profil de dégustation</div>
        <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 clamp(34px,5vh,56px)", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(32px,4.6vw,66px)", lineHeight: "1", letterSpacing: "-0.02em" }}>Le profil, <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>en trois temps</span></h2>
        <div className="crp-notes" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,3vw,44px)" }}>
          <div data-reveal style={{ borderTop: "1px solid rgba(42,32,26,0.16)", paddingTop: "22px" }}>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6d4a1f", marginBottom: "14px" }}>Le nez</div>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "rgba(42,32,26,0.72)" }}>{v.notesNez}</p>
          </div>
          <div data-reveal data-reveal-delay="90" style={{ borderTop: "1px solid rgba(42,32,26,0.16)", paddingTop: "22px" }}>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6d4a1f", marginBottom: "14px" }}>La bouche</div>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "rgba(42,32,26,0.72)" }}>{v.notesBouche}</p>
          </div>
          <div data-reveal data-reveal-delay="180" style={{ borderTop: "1px solid rgba(42,32,26,0.16)", paddingTop: "22px" }}>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6d4a1f", marginBottom: "14px" }}>La finale</div>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "rgba(42,32,26,0.72)" }}>{v.notesFinale}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* BOTANIQUES */}
  <section id="botaniques" style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(40px,6vw,90px)", alignItems: "center" }} className="crp-bot-grid">
      <div>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "24px" }}>{v.listLabel}</div>
        <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 clamp(24px,3.4vh,38px)", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(32px,4.6vw,66px)", lineHeight: "1", letterSpacing: "-0.02em" }}>{v.listHeadMain}<br /><span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>{v.listHeadAccent}</span></h2>
        <p data-reveal data-reveal-delay="150" style={{ margin: "0 0 clamp(30px,4vh,44px)", maxWidth: "46ch", fontSize: "16px", lineHeight: "1.6", color: "rgba(42,32,26,0.72)" }}>{v.botIntro}</p>
        <div className="crp-bot-list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 clamp(24px,3vw,48px)" }}>
          {v.botanicals.map((b: { num: string; name: string; delay?: string }, bIdx: number) => (<Fragment key={bIdx}>
            <div className="crp-bot" data-reveal data-reveal-delay={b.delay}><span className="crp-bot-n">{b.num}</span><span className="crp-bot-name">{b.name}</span></div>
          </Fragment>))}
        </div>
      </div>
      <div data-reveal data-reveal-delay="120" style={{ position: "relative", aspectRatio: "4/5", borderRadius: "2px", overflow: "hidden" }}>
        <img data-parallax="0.1" src={v.lifestyle[1]} alt={`L'univers de ${v.nameFull}`} style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover", willChange: "transform" }} />
      </div>
    </div>
  </section>

  {/* SIGNATURE SERVE */}
  <section id="service" style={{ padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "clamp(44px,6vh,72px)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>L'art de servir</div>
        <h2 data-reveal data-reveal-delay="90" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(34px,5.2vw,80px)", lineHeight: "0.98", letterSpacing: "-0.02em" }}>Le cocktail <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>signature</span></h2>
      </div>
      <div className="crp-serve-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,56px)", alignItems: "stretch" }}>
        <div data-reveal style={{ position: "relative", borderRadius: "2px", overflow: "hidden", minHeight: "clamp(360px,52vh,600px)" }}>
          <img data-parallax="0.08" src={v.lifestyle[2]} alt={`Au bar — ${v.nameFull}`} style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover", willChange: "transform" }} />
        </div>
        <div data-reveal data-reveal-delay="120" style={{ background: "#fbf7ef", border: "1px solid rgba(42,32,26,0.12)", borderRadius: "2px", padding: "clamp(30px,4vw,60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6d4a1f", marginBottom: "16px" }}>{v.serveMeta}</div>
          <h3 style={{ margin: "0 0 26px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(28px,3.2vw,46px)", lineHeight: "1" }}>{v.serveName} <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>{v.serveNameAccent}</span></h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "30px" }}>
            {v.serveIngredients.map((ing: { name: string; q: string }, ingIdx: number) => (<Fragment key={ingIdx}>
              <div className="crp-ing"><span>{ing.name}</span><span className="crp-ing-q">{ing.q}</span></div>
            </Fragment>))}
          </div>
          <ol style={{ margin: "0", padding: "0", listStyle: "none", counterReset: "step", display: "flex", flexDirection: "column", gap: "14px" }}>
            {v.serveSteps.map((s: string, sIdx: number) => (<Fragment key={sIdx}>
              <li className="crp-step">{s}</li>
            </Fragment>))}
          </ol>
        </div>
      </div>
    </div>
  </section>

  {/* DISTILLATION BAND */}
  <section style={{ position: "relative", color: "#f4efe6", minHeight: "72vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: "0", zIndex: "0" }}>
      <img data-parallax="0.16" src="/assets/lifestyle/Photo%20distillerie%20Magog/MD-30.jpg" alt="L'alambic de cuivre à la distillerie Cherry River, Magog" style={{ position: "absolute", inset: "-12% 0", width: "100%", height: "124%", objectFit: "cover", willChange: "transform" }} />
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg,rgba(10,9,8,0.94) 0%,rgba(10,9,8,0.7) 48%,rgba(10,9,8,0.28) 100%)" }}></div>
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(10,9,8,0.55) 0%,rgba(10,9,8,0) 22%,rgba(10,9,8,0) 72%,rgba(10,9,8,0.6) 100%)" }}></div>
    </div>
    <div style={{ position: "relative", zIndex: "1", padding: "clamp(64px,11vh,130px) clamp(20px,4vw,56px)", maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
      <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: "14px", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: "600", marginBottom: "24px" }}>
        <span aria-hidden="true" style={{ width: "38px", height: "1px", background: "linear-gradient(90deg,#a86a2c,rgba(168,106,44,0))" }}></span>
        Le savoir-faire
      </div>
      <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 26px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(30px,4.4vw,64px)", lineHeight: "1.02", letterSpacing: "-0.02em", maxWidth: "18ch" }}>Distillé en <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c", whiteSpace: "nowrap" }}>petits lots,</span> sans compromis</h2>
      <p data-reveal data-reveal-delay="170" style={{ margin: "0 0 34px", maxWidth: "52ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: "1.6", color: "rgba(244,239,230,0.82)" }}>{v.craftText}</p>
      <div data-reveal data-reveal-delay="240" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <span style={{ padding: "9px 18px", border: "1px solid rgba(168,106,44,0.5)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#d8c4a0" }}>{v.factProcess}</span>
        <span style={{ padding: "9px 18px", border: "1px solid rgba(244,239,230,0.25)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(244,239,230,0.75)" }}>Petits lots</span>
        <span style={{ padding: "9px 18px", border: "1px solid rgba(244,239,230,0.25)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(244,239,230,0.75)" }}>{v.origine}</span>
      </div>
      <div data-reveal data-reveal-delay="300" style={{ marginTop: "clamp(36px,6vh,56px)", display: "flex", alignItems: "center", gap: "14px", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.5)" }}>
        <span aria-hidden="true" style={{ width: "26px", height: "1px", background: "rgba(244,239,230,0.35)" }}></span>
        La distillerie, Magog
      </div>
    </div>
  </section>

  {/* AUTRES GINS */}
  <section id="autres" style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "clamp(38px,5vh,64px)" }}>
        <div>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>À découvrir aussi</div>
          <h2 data-reveal data-reveal-delay="90" style={{ margin: "0", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(32px,5vw,76px)", lineHeight: "0.96", letterSpacing: "-0.02em" }}>Autres <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>{v.relatedNoun}</span></h2>
        </div>
        <a href="/#creations" data-magnetic data-reveal style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "600", padding: "14px 26px", border: "1px solid rgba(42,32,26,0.3)", borderRadius: "100px" }}>Toute la gamme →</a>
      </div>
      <div className="crp-rel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,34px)" }}>
        {v.related.map((r, rIdx) => (<Fragment key={rIdx}>
          <a href={r.href} className="crp-rel" data-reveal data-reveal-delay={r.delay}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "2px", overflow: "hidden", background: "#efe6d7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div aria-hidden="true" style={{ position: "absolute", bottom: "13%", left: "50%", transform: "translateX(-50%)", width: "50%", height: "15px", borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(60,45,30,0.18) 0%, rgba(60,45,30,0) 72%)", filter: "blur(3px)" }}></div>
              <img className="crp-rel-img" src={r.img} alt={r.name} style={{ position: "relative", height: "82%", width: "auto", maxWidth: "70%", objectFit: "contain", transition: "transform 1.1s cubic-bezier(.16,1,.3,1)" }} />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginTop: "20px" }}>
              <span><span style={{ display: "block", fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "clamp(20px,1.7vw,26px)" }}>{r.name}</span><span style={{ display: "block", marginTop: "6px", fontSize: "13px", color: "rgba(42,32,26,0.5)" }}>{r.note}</span></span>
              <span className="crp-rel-a" style={{ color: "#8e2436", transition: "transform .4s" }}>→</span>
            </div>
          </a>
        </Fragment>))}
      </div>
    </div>
  </section>

  {/* NEWSLETTER */}
  <section style={{ position: "relative", padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)", textAlign: "center", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
    <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "24px" }}>Restez informé</div>
    <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 auto 18px", maxWidth: "18ch", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(32px,5vw,74px)", lineHeight: "0.98", letterSpacing: "-0.02em" }}>Recevez nos <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>nouvelles créations</span></h2>
    <p data-reveal data-reveal-delay="170" style={{ margin: "0 auto 38px", maxWidth: "48ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: "1.6", color: "rgba(42,32,26,0.7)" }}>Nouvelles recettes, éditions limitées et offres réservées aux initiés — directement dans votre boîte.</p>
    <form data-reveal data-reveal-delay="240" onSubmit={(e) => { e.preventDefault(); const b = e.currentTarget.querySelector("button"); if (b) b.textContent = "Merci ✦"; }} style={{ display: "flex", gap: "10px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
      <input type="email" required placeholder="Adresse courriel" style={{ flex: "1", minWidth: "240px", padding: "16px 22px", background: "rgba(42,32,26,0.04)", border: "1px solid rgba(42,32,26,0.2)", borderRadius: "100px", color: "#f4efe6", fontFamily: "inherit", fontSize: "15px", outline: "none" }} />
      <button type="submit" data-magnetic style={{ padding: "16px 32px", background: "#8e2436", color: "#f4efe6", border: "none", borderRadius: "100px", fontFamily: "inherit", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600", cursor: "pointer" }}>S'inscrire</button>
    </form>
  </section>

  </main>

  {/* FOOTER */}
  <footer style={{ padding: "clamp(56px,8vh,90px) clamp(20px,4vw,56px) 40px", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "40px" }} className="crp-foot-grid">
      <div>
        <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "30px", width: "auto", marginBottom: "22px" }} />
        <p style={{ margin: "0", maxWidth: "38ch", fontSize: "14px", lineHeight: "1.6", color: "rgba(244,239,230,0.55)" }}>Boissons modernes élaborées au Québec. Deux distilleries, un univers de créations artisanales.</p>
        <p style={{ margin: "18px 0 0", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9c9489" }}>Magog &amp; Québec — Sillery</p>
      </div>
      <div>
        <div className="crp-foot-h">Distilleries</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}><a href="/distilleries#magog" className="crp-footlink">Magog</a><a href="/distilleries#quebec" className="crp-footlink">Québec — Sillery</a></div>
      </div>
      <div>
        <div className="crp-foot-h">Explorer</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}><a href="/#creations" className="crp-footlink">Produits</a><a href="/cocktail-culture" className="crp-footlink">Cocktail Culture</a><a href="/experiences" className="crp-footlink">Expériences</a></div>
      </div>
      <div>
        <div className="crp-foot-h">La Maison</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}><a href="/" className="crp-footlink">Notre histoire</a><a href="#" className="crp-footlink">Contact</a></div>
      </div>
    </div>
    <div style={{ maxWidth: "1440px", margin: "48px auto 0", paddingTop: "24px", borderTop: "1px solid rgba(244,239,230,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", fontSize: "12px", color: "#9c9489" }}>
      <span>© 2026 Distillerie Cherry River (9426-5964 Québec inc.)</span>
      <span>La consommation d'alcool est réservée aux personnes majeures.</span>
    </div>
  </footer>
    </div>
  );
}
