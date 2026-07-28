"use client";

/**
 * /produits (sans ?gin=) — le catalogue complet.
 * Toutes les créations (43), groupées par famille, dans le langage Fable.
 * Chaque carte mène à la page produit (/produits?gin=slug).
 * Chrome (nav mega-menu + footer) aligné sur FableProduits.
 */

import { useRef } from "react";
import { products, order, catOf } from "@/lib/fable/products-data";
import { useFableBehaviors } from "@/components/fable/useFableBehaviors";

const CATS: Array<[string, string]> = [
  ["gins", "Gins"],
  ["gin-sans", "Gin sans alcool"],
  ["vodkas", "Vodkas"],
  ["rhums", "Rhums"],
  ["whiskys", "Whisky"],
  ["tequilas", "Tequila"],
  ["liqueurs", "Liqueurs"],
  ["cremes", "Crèmes"],
  ["rtd-alcool", "Cocktails prêts-à-boire"],
  ["rtd-sans", "Mocktails sans alcool"],
];

const STYLES = `
  .crc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  @media (max-width: 1180px) { .crc-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 860px) { .crc-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .crc-grid { grid-template-columns: 1fr; } }
  .crc-card { display: block; position: relative; padding: 30px 22px 26px; background: #efe6d7; border: 1px solid rgba(42,32,26,0.08); border-radius: 2px; transition: transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s ease, border-color .5s ease; }
  .crc-card:hover { transform: translateY(-6px); box-shadow: 0 26px 52px rgba(42,32,26,0.15); border-color: rgba(168,106,44,0.4); }
  .crc-bottle { transition: transform .6s cubic-bezier(.16,1,.3,1); }
  .crc-card:hover .crc-bottle { transform: translateY(-7px) scale(1.04); }
  .crc-navlink { color: inherit; opacity: .85; transition: opacity .3s ease; }
  .crc-navlink:hover { opacity: 1; }
`;

export function FableCatalogue() {
  const rootRef = useRef<HTMLDivElement>(null);
  useFableBehaviors(rootRef, [], { solidNav: true });

  const slugsOf = (cat: string) => (order as string[]).filter((s) => (catOf as Record<string, string>)[s] === cat);

  return (
    <div ref={rootRef} style={{ position: "relative", background: "#f4ede0", color: "#2a201a", fontFamily: "'Hanken Grotesk',sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* NAV — même chrome que la page produit */}
      <nav data-nav style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "8000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px clamp(20px,4vw,56px)", transition: "background .6s ease, padding .6s ease, border-color .6s ease", color: "#f4efe6", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(36,28,20,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
        <a href="/" data-magnetic style={{ display: "inline-block" }}>
          <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "30px", width: "auto", display: "block" }} />
        </a>
        <div data-nav-links style={{ display: "flex", alignItems: "center", gap: "clamp(18px,2.2vw,36px)", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "500" }}>
          <button type="button" data-produits-trigger className="crc-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Produits <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
          <button type="button" data-boutique-trigger className="crc-navlink" style={{ appearance: "none", background: "transparent", border: "0", cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: "0" }}>Boutique <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span></button>
          <a href="/recettes" className="crc-navlink">Recettes</a>
          <a href="/distilleries" className="crc-navlink">Distilleries</a>
        </div>
        <a href="/experiences" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: "600", padding: "11px 22px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px" }}>Réserver une visite</a>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <header style={{ position: "relative", padding: "clamp(120px,16vh,170px) clamp(20px,4vw,56px) clamp(30px,5vh,56px)" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b5f54", marginBottom: "clamp(26px,4vh,44px)" }}>
              <a href="/" style={{ color: "inherit" }}>Accueil</a>
              <span style={{ opacity: ".4" }}>/</span>
              <span style={{ color: "#865520" }}>Tous les produits</span>
            </div>
            <div data-reveal data-reveal-delay="80" style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "20px" }}>Le catalogue</div>
            <h1 data-reveal data-reveal-delay="140" style={{ margin: 0, fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.01em", fontSize: "clamp(42px,7vw,110px)" }}>
              Toutes nos <span style={{ fontStyle: "italic", color: "#a86a2c" }}>créations</span>
            </h1>
            <p data-reveal data-reveal-delay="200" style={{ margin: "22px 0 0", maxWidth: "52ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.6, color: "rgba(42,32,26,0.65)" }}>
              {(order as string[]).length} créations distillées, assemblées et embouteillées au Québec, du gin signature aux mocktails sans alcool.
            </p>
          </div>
        </header>

        {/* FAMILLES */}
        {CATS.map(([cat, label]) => {
          const slugs = slugsOf(cat);
          if (!slugs.length) return null;
          return (
            <section key={cat} id={cat} style={{ padding: "clamp(28px,4vh,48px) clamp(20px,4vw,56px)" }}>
              <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                <div data-reveal style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "clamp(20px,3vh,30px)", borderBottom: "1px solid rgba(42,32,26,0.12)", paddingBottom: "14px" }}>
                  <h2 style={{ margin: 0, fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1 }}>{label}</h2>
                  <span style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,32,26,0.45)" }}>{slugs.length} produit{slugs.length > 1 ? "s" : ""}</span>
                </div>
                <div className="crc-grid">
                  {slugs.map((s, i) => {
                    const p = (products as Record<string, { title: string; short: string; caption?: string }>)[s];
                    return (
                      <a key={s} className="crc-card" data-reveal data-reveal-delay={String((i % 4) * 70)} href={`/produits?gin=${s}`}>
                        <div style={{ height: "clamp(170px,20vh,220px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                          <img className="crc-bottle" src={`/assets/thumbs/bottle-${s}.png`} alt={p.title} loading="lazy" decoding="async" style={{ maxHeight: "100%", maxWidth: "80%", width: "auto", objectFit: "contain", filter: "drop-shadow(0 20px 22px rgba(42,32,26,0.25))" }} />
                        </div>
                        <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.15, marginBottom: "8px", color: "#2a201a" }}>{p.title}</div>
                        <div style={{ fontSize: "12.5px", color: "rgba(42,32,26,0.55)", marginBottom: "14px" }}>{p.short}</div>
                        <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>Découvrir →</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* FOOTER — même chrome que la page produit */}
      <footer style={{ marginTop: "clamp(40px,6vh,70px)", padding: "clamp(56px,8vh,90px) clamp(20px,4vw,56px) 40px", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}><a href="/produits" className="crp-footlink">Produits</a><a href="/cocktail-culture" className="crp-footlink">Cocktail Culture</a><a href="/experiences" className="crp-footlink">Expériences</a></div>
          </div>
          <div>
            <div className="crp-foot-h">La Maison</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}><a href="/la-maison" className="crp-footlink">Notre histoire</a><a href="/contact" className="crp-footlink">Contact</a></div>
          </div>
        </div>
        <div style={{ maxWidth: "1440px", margin: "48px auto 0", paddingTop: "24px", borderTop: "1px solid rgba(244,239,230,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", fontSize: "12px", color: "#9c9489" }}>
          <span>© 2026 Distillerie Cherry River (9426-5964 Québec inc.)</span>
          <span>La consommation d&apos;alcool est réservée aux personnes majeures.</span>
        </div>
      </footer>
    </div>
  );
}
