"use client";

/**
 * Fable design chrome — grain, custom cursor, nav (+ mega-menus), footer,
 * and every page behavior from the live static build, ported verbatim.
 * Source of truth: cherry-river-live-source/src (dpl_AXVS5rcCiNwcsjtvnFQRZq5M2aN2).
 */

import { useRef } from "react";
import { useFableBehaviors } from "@/components/fable/useFableBehaviors";

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const HOVER_STYLES = `
  [data-cr-root] a { color: inherit; text-decoration: none; }
  [data-cr-root] .cr-navlink{position:relative;opacity:.82;transition:opacity .4s;}
  [data-cr-root] .cr-navlink:hover{opacity:1;}
  [data-cr-root] .cr-navlink::after{content:'';position:absolute;left:0;right:0;bottom:-6px;height:1px;background:#a86a2c;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1);}
  [data-cr-root] .cr-navlink:hover::after{transform:scaleX(1);}
  [data-cr-root] .cr-prod a:hover .cr-pname{color:#a86a2c;transform:translateX(14px);}
  [data-cr-root] .cr-prod a:hover .cr-arrow{opacity:1;transform:translateX(0);}
  [data-cr-root] .cr-prod a:hover .cr-num{color:#8e2436;}
  [data-cr-root] .cr-loc:hover .cr-loc-img{transform:scale(1.06);}
  [data-cr-root] .cr-loc:hover .cr-loc-cta span{transform:translateX(6px);}
  [data-cr-root] .cr-brand:hover{background:rgba(244,239,230,0.03);}
  [data-cr-root] .cr-footlink{transition:color .35s;}
  [data-cr-root] .cr-footlink:hover{color:#a86a2c;}
  [data-cr-root] input::placeholder{color:rgba(42,32,26,0.42);}
  [data-cr-root] input:focus{border-color:rgba(231,211,173,0.6);}
  @media (max-width:980px){[data-cr-root] .cr-index-grid{grid-template-columns:1fr!important;} [data-cr-root] .cr-prod-stage{display:none!important;} [data-cr-root] .cr-loc-grid{grid-template-columns:1fr!important;} [data-cr-root] .cr-brand-grid{grid-template-columns:1fr 1fr!important;} [data-cr-root] .cr-foot-grid{grid-template-columns:1fr 1fr!important;}}
  @media (max-width:860px){[data-cr-root] [data-nav]{padding:16px clamp(16px,4vw,24px)!important; gap:10px;} [data-cr-root] [data-nav-links]{gap:12px!important; font-size:10px!important; letter-spacing:0.1em!important; flex-wrap:wrap;} [data-cr-root] [data-nav] > a[data-nav-cta]{font-size:10px!important; padding:10px 14px!important; white-space:nowrap;}}
  @media (max-width:560px){[data-cr-root] .cr-brand-grid{grid-template-columns:1fr!important;} [data-cr-root] .cr-foot-grid{grid-template-columns:1fr!important;} [data-cr-root] [data-nav-links] a[data-nav-anchor]{display:none;}}
  @media (max-width:860px){[data-cursor-dot],[data-cursor-ring]{display:none!important;}}
  @keyframes cr-slowzoom { from { transform: scale(1.02); } to { transform: scale(1.16); } }
  @keyframes cr-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes cr-linein { from { transform: translateY(110%); } to { transform: translateY(0); } }
  @keyframes cr-fadeup { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes cr-scrollcue { 0% { transform: translateY(0); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(14px); opacity: 0; } }
  @keyframes cr-grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-4%,-4%)} 30%{transform:translate(3%,-2%)} 50%{transform:translate(-2%,4%)} 70%{transform:translate(4%,2%)} 90%{transform:translate(-3%,3%)} }
  [data-cr-root] ::selection { background: #8e2436; color: #f4efe6; }
`;

export function FableChrome({ home = false, solidNav = false, children }: { home?: boolean; solidNav?: boolean; children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const anchor = (hash: string) => (home ? hash : `/${hash}`);

  useFableBehaviors(rootRef, [], { solidNav });

  return (
    <div
      ref={rootRef}
      data-cr-root
      style={{
        position: "relative",
        background: "#f4ede0",
        color: "#2a201a",
        fontFamily: "'Hanken Grotesk',sans-serif",
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Same Google Fonts delivery as the live Fable build — inline styles
          reference the literal family names, so next/font's hashed names can't be used. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: HOVER_STYLES }} />

      {/* grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "-50%",
          zIndex: 9000,
          pointerEvents: "none",
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage: GRAIN_SVG,
          animation: "cr-grain 8s steps(6) infinite",
        }}
      />

      {/* custom cursor */}
      <div
        data-cursor-ring
        style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, width: "38px", height: "38px", border: "1px solid rgba(244,239,230,0.5)", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", transition: "width .35s cubic-bezier(.16,1,.3,1),height .35s cubic-bezier(.16,1,.3,1),background .35s,border-color .35s", mixBlendMode: "difference" }}
      />
      <div
        data-cursor-dot
        style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, width: "5px", height: "5px", background: "#f4efe6", borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", mixBlendMode: "difference" }}
      />

      {/* NAV */}
      <nav
        data-nav
        style={
          solidNav
            ? { position: "fixed", top: 0, left: 0, right: 0, zIndex: 8000, color: "#f4efe6", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px clamp(20px,4vw,56px)", background: "rgba(36,28,20,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }
            : { position: "fixed", top: 0, left: 0, right: 0, zIndex: 8000, color: "#f4efe6", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px clamp(20px,4vw,56px)", transition: "background .6s ease, padding .6s ease, border-color .6s ease", borderBottom: "1px solid rgba(244,239,230,0)" }
        }
      >
        <a href={home ? "#top" : "/"} data-magnetic style={{ display: "inline-block" }}>
          <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" width={120} height={34} style={{ height: "34px", width: "auto", display: "block" }} />
        </a>
        <div data-nav-links style={{ display: "flex", alignItems: "center", gap: "clamp(20px,2.4vw,40px)", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>
          <button type="button" data-produits-trigger className="cr-navlink" style={{ appearance: "none", background: "transparent", border: 0, cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: 0 }}>
            Produits <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span>
          </button>
          <button type="button" data-boutique-trigger className="cr-navlink" style={{ appearance: "none", background: "transparent", border: 0, cursor: "pointer", font: "inherit", color: "inherit", letterSpacing: "inherit", textTransform: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", padding: 0 }}>
            Boutique <span data-caret style={{ display: "inline-block", fontSize: "9px", transition: "transform .3s ease" }}>▼</span>
          </button>
          <a href="/recettes" className="cr-navlink">Recettes</a>
          <a href="/distilleries" className="cr-navlink" data-nav-anchor>Distilleries</a>
          <a href="/experiences" className="cr-navlink" data-nav-anchor>Expériences</a>
          <a href="/la-maison" className="cr-navlink" data-nav-anchor>La Maison</a>
        </div>
        <a href="/experiences" data-magnetic data-nav-cta style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, padding: "12px 22px", border: "1px solid rgba(244,239,230,0.32)", borderRadius: "100px" }}>
          Réserver une visite
        </a>
      </nav>

      {children}

      {/* FOOTER */}
      <footer style={{ padding: "clamp(56px,8vh,90px) clamp(20px,4vw,56px) 40px", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "40px" }} className="cr-foot-grid">
          <div>
            <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "32px", width: "auto", marginBottom: "22px" }} />
            <p style={{ margin: 0, maxWidth: "38ch", fontSize: "14px", lineHeight: 1.6, color: "rgba(244,239,230,0.55)" }}>Boissons modernes élaborées au Québec. Deux distilleries, un univers de créations artisanales.</p>
            <p style={{ margin: "18px 0 0", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9c9489" }}>Magog &amp; Québec — Sillery</p>
          </div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c9489", marginBottom: "18px" }}>Distilleries</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}>
              <a href="/distilleries#magog" className="cr-footlink">Magog</a>
              <a href="/distilleries#quebec" className="cr-footlink">Québec — Sillery</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c9489", marginBottom: "18px" }}>Explorer</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}>
              <a href="/produits" className="cr-footlink">Produits</a>
              <a href="/cocktail-culture" className="cr-footlink">Cocktail Culture</a>
              <a href="/experiences" className="cr-footlink">Expériences</a>
              <a href="/boutique" className="cr-footlink">Boutique</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9c9489", marginBottom: "18px" }}>La Maison</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14px", color: "rgba(244,239,230,0.72)" }}>
              <a href="/la-maison" className="cr-footlink">Notre histoire</a>
              <a href="/contact" className="cr-footlink">Contact</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1400px", margin: "48px auto 0", paddingTop: "24px", borderTop: "1px solid rgba(244,239,230,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", fontSize: "12px", color: "#9c9489" }}>
          <span>© 2026 Distillerie Cherry River (9426-5964 Québec inc.)</span>
          <span>La consommation d&apos;alcool est réservée aux personnes majeures.</span>
        </div>
      </footer>
    </div>
  );
}
