"use client";

/* Ported 1:1 from cherry-river-live-source/src/boutique.html (Fable build). */

import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useFableBehaviors } from "@/components/fable/useFableBehaviors";
import CATALOG from "@/lib/fable/catalog.js";
import { useCart } from "@/components/fable/FableCart";
import { ACCESSORY_PRICES, TAKEAWAY_ITEMS } from "@/lib/fable/shop-items";
import { useSearchParams } from "next/navigation";

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const STYLES = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4ede0; }
  @keyframes crb-grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-4%,-4%)} 30%{transform:translate(3%,-2%)} 50%{transform:translate(-2%,4%)} 70%{transform:translate(4%,2%)} 90%{transform:translate(-3%,3%)} }
  ::selection { background: #8e2436; color: #f4efe6; }
  [data-crb-root] a { color: inherit; text-decoration: none; }
  [data-crb-root] .crb-card:target { outline: 2px solid #a86a2c; outline-offset: 4px; }
  @media (max-width: 860px) { [data-cursor-dot],[data-cursor-ring] { display: none !important; } [data-crb-root] [data-nav-links] { display: none !important; } }


      [data-crb-root] .crb-navlink{position:relative;opacity:.82;transition:opacity .4s;}
      [data-crb-root] .crb-navlink:hover{opacity:1;}
      [data-crb-root] .crb-navlink::after{content:'';position:absolute;left:0;right:0;bottom:-6px;height:1px;background:#e7d3ad;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1);}
      [data-crb-root] .crb-navlink:hover::after{transform:scaleX(1);}
      [data-crb-root] .crb-footlink{transition:color .35s;}
      [data-crb-root] .crb-footlink:hover{color:#e7d3ad;}
      [data-crb-root] .crb-card:hover .crb-tile{transform:translateY(-6px);box-shadow:0 22px 40px rgba(60,45,30,0.14);}
    `;

const GROUPS = [
  { key: "all", label: "Tout" },
  { key: "Shaker", label: "Shakers" },
  { key: "Doseur", label: "Doseurs" },
  { key: "Verrerie", label: "Verrerie" },
  { key: "Outils", label: "Outils" },
  { key: "Glace", label: "Glace" },
  { key: "Accessoires", label: "Extras" },
];

const CHIP_BASE: CSSProperties = { appearance: "none", cursor: "pointer", fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "12.5px", letterSpacing: "0.06em", padding: "9px 18px", borderRadius: "100px", transition: "background .25s,color .25s,border-color .25s" };
const CHIP_ON: CSSProperties = { ...CHIP_BASE, background: "#241c14", color: "#f4efe6", border: "1px solid #241c14" };
const CHIP_OFF: CSSProperties = { ...CHIP_BASE, background: "transparent", color: "rgba(42,32,26,0.7)", border: "1px solid rgba(42,32,26,0.2)" };

export function FableBoutique() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const { add, clear } = useCart();
  const params = useSearchParams();
  const success = params.get("commande") === "succes";
  const clearedRef = useRef(false);
  useEffect(() => {
    if (success && !clearedRef.current) { clearedRef.current = true; clear(); }
  }, [success, clear]);
  useFableBehaviors(rootRef, [filter], { solidNav: true });

  const vals = useMemo(() => {
    const sub = CATALOG.boutique.subcategories[0];
    const items = (sub.items || []).map((it) => ({ slug: it.slug, label: it.label, house: it.house, thumb: CATALOG.accessoryThumb(it.slug), anchor: "item-" + it.slug }));
    const visible = filter === "all" ? items : items.filter((i) => i.house === filter);
    const filters = GROUPS.map((g) => ({ key: g.key, label: g.label, style: g.key === filter ? CHIP_ON : CHIP_OFF, onClick: () => setFilter(g.key) }));
    return { items: visible, filters, countLabel: visible.length + (visible.length > 1 ? " articles" : " article") };
  }, [filter]);

  return (
    <div ref={rootRef} data-crb-root style={{ position: "relative", background: "#f4ede0", color: "#2a201a", fontFamily: "'Hanken Grotesk',sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
<div aria-hidden="true" data-grain style={{ position: "fixed", inset: "-50%", zIndex: "9000", pointerEvents: "none", opacity: "0.05", mixBlendMode: "overlay", backgroundImage: GRAIN, animation: "crb-grain 8s steps(6) infinite" }}></div>

  <div data-cursor-ring style={{ position: "fixed", top: "0", left: "0", zIndex: "9999", width: "38px", height: "38px", border: "1px solid rgba(42,32,26,0.4)", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", transition: "width .35s cubic-bezier(.16,1,.3,1),height .35s cubic-bezier(.16,1,.3,1),background .35s,border-color .35s", mixBlendMode: "difference" }}></div>
  <div data-cursor-dot style={{ position: "fixed", top: "0", left: "0", zIndex: "9999", width: "5px", height: "5px", background: "#2a201a", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", mixBlendMode: "difference" }}></div>

  {/* NAV */}
  <nav data-nav style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "8000", color: "#f4efe6", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px clamp(20px,4vw,56px)", background: "rgba(36,28,20,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
    <a href="/" data-magnetic style={{ display: "inline-block" }}>
      <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "30px", width: "auto", display: "block" }} />
    </a>
    <div data-nav-links style={{ display: "flex", alignItems: "center", gap: "clamp(18px,2.2vw,36px)", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "500" }}>
      <button type="button" data-produits-trigger className="crb-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Produits <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
      <button type="button" data-boutique-trigger className="crb-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "#e7d3ad", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Boutique <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
      <a href="/recettes" className="crb-navlink">Recettes</a>
      <a href="/distilleries" className="crb-navlink">Distilleries</a>
      <a href="/la-maison" className="crb-navlink">La Maison</a>
    </div>
    <a href="/experiences" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: "600", padding: "11px 22px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px" }}>Réserver une visite</a>
  </nav>

  <main id="main-content">

  {success && (
    <div style={{ margin: "96px clamp(20px,4vw,56px) -40px", padding: "18px 24px", borderRadius: "6px", background: "#2e4632", color: "#eaf3ea", display: "flex", alignItems: "center", gap: "12px", fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "14px" }}>
      <span style={{ fontSize: "18px" }}>✦</span>
      Merci ! Votre commande a été reçue — vous recevrez une confirmation par courriel.
    </div>
  )}

  {/* HERO */}
  <header style={{ padding: "clamp(120px,17vh,180px) clamp(20px,4vw,56px) clamp(30px,5vh,50px)" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: "600", marginBottom: "22px" }}>Boutique · Accessoires</div>
      <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 22px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: "600", fontSize: "clamp(44px,7.5vw,120px)", lineHeight: "0.94", letterSpacing: "-0.02em", maxWidth: "16ch" }}>L'attirail du <span style={{ fontStyle: "italic", fontWeight: "500", color: "#a86a2c" }}>barman</span></h1>
      <p data-reveal data-reveal-delay="170" style={{ margin: "0", maxWidth: "56ch", fontSize: "clamp(16px,1.3vw,19px)", lineHeight: "1.6", color: "rgba(42,32,26,0.72)" }}>Shakers, doseurs, verrerie et outils gravés Cherry River. Tout ce qu'il faut pour préparer nos cocktails signature à la maison, avec le même soin qu'au bar.</p>
    </div>
  </header>

  {/* FILTER BAR */}
  <div data-reveal style={{ position: "sticky", top: "74px", zIndex: "100", background: "rgba(244,237,224,0.86)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px solid rgba(42,32,26,0.08)", borderBottom: "1px solid rgba(42,32,26,0.08)", padding: "14px clamp(20px,4vw,56px)" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      {vals.filters.map((f, fIdx) => (<Fragment key={fIdx}>
        <button type="button" onClick={f.onClick} style={f.style}>{f.label}</button>
      </Fragment>))}
      <span style={{ marginLeft: "auto", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b5f54" }}>{vals.countLabel}</span>
    </div>
  </div>

  {/* GRID */}
  <section style={{ padding: "clamp(36px,6vh,64px) clamp(20px,4vw,56px) clamp(60px,10vh,120px)", flex: "1" }}>
    <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(232px,1fr))", gap: "clamp(16px,2vw,30px)" }}>
      {vals.items.map((it, itIdx) => (<Fragment key={itIdx}>
        <div className="crb-card" id={it.anchor} style={{ scrollMarginTop: "120px" }}>
          <div className="crb-tile" style={{ position: "relative", aspectRatio: "1/1", borderRadius: "6px", background: "linear-gradient(180deg,#fbf7ef 0%,#f0e7d6 100%)", border: "1px solid rgba(42,32,26,0.07)", overflow: "hidden", transition: "transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s cubic-bezier(.16,1,.3,1)", boxShadow: "0 1px 2px rgba(60,45,30,0.05)" }}>
            <div style={{ position: "absolute", left: "50%", bottom: "15%", transform: "translateX(-50%)", width: "56%", height: "8%", background: "radial-gradient(ellipse at center, rgba(90,66,40,0.18), rgba(90,66,40,0) 70%)", filter: "blur(3px)" }}></div>
            <img src={it.thumb} alt={it.label} loading="lazy" style={{ position: "absolute", inset: "0", margin: "auto", maxWidth: "74%", maxHeight: "74%", width: "auto", height: "auto", objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(60,45,30,0.12))" }} />
          </div>
          <div style={{ padding: "16px 4px 0" }}>
            <div style={{ fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6d4a1f", fontWeight: "600", marginBottom: "7px" }}>{it.house}</div>
            <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "18px", lineHeight: "1.15", color: "#2a201a" }}>{it.label}</div>
            <div style={{ marginTop: "6px", fontSize: "12.5px", color: "#6b5f54" }}>Gravure Cherry River</div>
            {ACCESSORY_PRICES[it.house] ? (
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "16px", color: "#2a201a" }}>{ACCESSORY_PRICES[it.house].toFixed(2)} $</span>
                <button
                  type="button"
                  onClick={() => add({ slug: it.slug, name: it.label + " — Gravure Cherry River", price: ACCESSORY_PRICES[it.house], image: it.thumb })}
                  style={{ appearance: "none", cursor: "pointer", padding: "9px 18px", borderRadius: "100px", border: "1px solid #241c14", background: "transparent", color: "#241c14", fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, transition: "background .25s,color .25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#241c14"; e.currentTarget.style.color = "#f4efe6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#241c14"; }}
                >
                  Ajouter
                </button>
              </div>
            ) : (
              <div style={{ marginTop: "12px", fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9b8d7c" }}>Prix en boutique</div>
            )}
          </div>
        </div>
      </Fragment>))}
    </div>
  </section>

  {/* À EMPORTER — sans alcool & sirops (produits en vente) */}
  <section style={{ padding: "clamp(56px,9vh,110px) clamp(20px,4vw,56px)", background: "#efe6d7" }}>
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ fontSize: "12px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "14px" }}>Boutique · À emporter</div>
      <h2 style={{ margin: "0 0 8px", fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(30px,4vw,56px)", lineHeight: 1.02, color: "#2a201a" }}>
        Sans alcool <em style={{ fontStyle: "italic", color: "#a86a2c" }}>&amp; sirops</em>
      </h2>
      <p style={{ margin: "0 0 40px", maxWidth: "56ch", fontSize: "15px", lineHeight: 1.6, color: "#6b5f54" }}>
        Mocktails pétillants et sirops artisanaux, embouteillés à Magog. Cueillette en boutique ou livraison au Québec.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "clamp(18px,2.4vw,32px)" }}>
        {TAKEAWAY_ITEMS.map((p) => (
          <div key={p.slug} className="crb-card">
            <div className="crb-tile" style={{ position: "relative", aspectRatio: "1/1", borderRadius: "6px", background: "linear-gradient(180deg,#fbf7ef 0%,#f0e7d6 100%)", border: "1px solid rgba(42,32,26,0.07)", overflow: "hidden", boxShadow: "0 1px 2px rgba(60,45,30,0.05)" }}>
              {p.image ? (
                <img src={p.image} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, margin: "auto", maxWidth: "70%", maxHeight: "78%", width: "auto", height: "auto", objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(60,45,30,0.12))" }} />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "15px", color: "#9b8d7c", padding: "16px", textAlign: "center" }}>{p.name}</div>
              )}
            </div>
            <div style={{ padding: "16px 4px 0" }}>
              <div style={{ fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6d4a1f", fontWeight: 600, marginBottom: "7px" }}>{p.volume || "Cherry River"}</div>
              <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "17px", lineHeight: 1.15, color: "#2a201a" }}>{p.name}</div>
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "16px", color: "#2a201a" }}>{p.price.toFixed(2)} $</span>
                <button
                  type="button"
                  onClick={() => add({ slug: p.slug, name: p.name, price: p.price, image: p.image })}
                  style={{ appearance: "none", cursor: "pointer", padding: "9px 18px", borderRadius: "100px", border: "1px solid #241c14", background: "transparent", color: "#241c14", fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, transition: "background .25s,color .25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#241c14"; e.currentTarget.style.color = "#f4efe6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#241c14"; }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

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
          <a href="/produits" className="crb-footlink">Produits</a>
          <a href="/boutique" className="crb-footlink">Boutique</a>
          <a href="/recettes" className="crb-footlink">Recettes</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c9489", marginBottom: "6px" }}>La Maison</div>
          <a href="/" className="crb-footlink">Notre histoire</a>
          <a href="/distilleries" className="crb-footlink">Distilleries</a>
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
