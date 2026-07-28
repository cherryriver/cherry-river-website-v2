"use client";

/* La Maison — Fable design language. Vision, ligne du temps, distinctions
   et les cinq maisons. Contenu repris du site existant (LaMaisonPageClient)
   + brand-content.json. */

const SERIF = "'Familjen Grotesk',sans-serif";

const STYLES = `
  [data-cr-root] .cr-lm-pillars{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(42,32,26,0.14);}
  [data-cr-root] .cr-lm-timeline{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(28px,3vw,48px);}
  [data-cr-root] .cr-lm-awards{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(244,239,230,0.14);}
  [data-cr-root] .cr-brand-grid{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid rgba(244,239,230,0.12);}
  [data-cr-root] .cr-brand:hover{background:rgba(244,239,230,0.03);}
  @media (max-width:980px){
    [data-cr-root] .cr-lm-pillars{grid-template-columns:1fr 1fr!important;}
    [data-cr-root] .cr-lm-timeline{grid-template-columns:1fr 1fr!important;}
    [data-cr-root] .cr-lm-awards{grid-template-columns:1fr 1fr!important;}
    [data-cr-root] .cr-brand-grid{grid-template-columns:1fr 1fr!important;}
  }
  @media (max-width:560px){
    [data-cr-root] .cr-lm-timeline{grid-template-columns:1fr!important;}
    [data-cr-root] .cr-brand-grid{grid-template-columns:1fr!important;}
  }
`;

const PILLARS = [
  { title: "La distillerie", text: "Deux lieux historiques, héritage et savoir-faire" },
  { title: "La culture cocktail", text: "Art de vivre, mixologie, créations saisonnières" },
  { title: "Les expériences", text: "Moments uniques au cœur des distilleries" },
  { title: "L'héritage québécois", text: "Identité ancrée dans la culture et les paysages" },
];

const TIMELINE = [
  { year: "1875", eyebrow: "Origine", title: "Une église anglicane prend racine à Magog", description: "L'édifice patrimonial qui deviendra notre première distillerie est érigé au cœur des Cantons-de-l'Est. Plus de 150 ans plus tard, ses murs de pierre porteront nos alambics." },
  { year: "2018", eyebrow: "Renaissance", title: "Cherry River fait renaître l'édifice", description: "Acquisition et transformation de l'église anglicane en distillerie artisanale. Les premiers alambics de cuivre s'installent sous les voûtes patrimoniales." },
  { year: "2022", eyebrow: "Expansion", title: "Mémorial Hall, Sillery", description: "Une seconde maison patrimoniale ouvre ses portes à Québec — bar, distillerie boutique et salle de dégustation dans un Mémorial Hall historique." },
  { year: "2024", eyebrow: "Reconnaissance", title: "Forbes Gold", description: "Notre Raspberry & Lime Gin (93/100) et notre Spiced Rum (92/100) reçoivent la distinction Gold du panel Forbes." },
];

const AWARDS = [
  { source: "Forbes", title: "Raspberry & Lime Gin", detail: "Gold — 93/100", year: "2024" },
  { source: "Forbes", title: "Spiced Rum", detail: "Gold — 92/100", year: "2024" },
  { source: "SAQ", title: "Distribution provinciale", detail: "Réseau de la Société des alcools du Québec", year: "" },
  { source: "Costco", title: "Partenaire national", detail: "Distribution à l'échelle canadienne", year: "" },
];

const BRANDS = [
  { logo: "/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png", alt: "Cherry River", text: "L'âme québécoise des spiritueux modernes", h: 46 },
  { logo: "/assets/brands/opemiska/Logo_Opemiska_Blanc.png", alt: "Opemiska", text: "Gin boréal, distillé en patience", h: 46 },
  { logo: "/assets/brands/averse/Logo Averse_Blanc.png", alt: "Averse", text: "Vodka pure, ligne nordique", h: 42 },
  { logo: "/assets/brands/alister/Logo Alister_White.png", alt: "House of Alister", text: "Spiritueux d'auteur, minutie classique", h: 46 },
  { logo: "/assets/brands/thirst/Logo_The thirst is real_White.png", alt: "The Thirst is Real", text: "Prêt à servir, sans compromis", h: 60 },
];

export function FableLaMaison() {
  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <header style={{ position: "relative", color: "#f4efe6", minHeight: "78vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img data-parallax="0.14" src="/assets/lifestyle/Photo%20distillerie%20Magog/MD-7.jpg" alt="Mur de niches éclairées — créations Cherry River" style={{ position: "absolute", inset: "-10% 0", width: "100%", height: "120%", objectFit: "cover", willChange: "transform" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,15,10,0.9) 0%, rgba(20,15,10,0.35) 55%, rgba(20,15,10,0.45) 100%)" }}></div>
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "clamp(140px,20vh,220px) clamp(20px,4vw,56px) clamp(56px,9vh,100px)", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "24px" }}>La Maison</div>
          <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(42px,7vw,110px)", lineHeight: 0.94, letterSpacing: "-0.02em", maxWidth: "16ch" }}>
            Bien plus qu&apos;une <span style={{ fontStyle: "italic", fontWeight: 500, color: "#a86a2c" }}>distillerie</span>
          </h1>
          <p data-reveal data-reveal-delay="170" style={{ margin: 0, maxWidth: "54ch", fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.6, color: "rgba(244,239,230,0.8)" }}>
            Une maison de boissons modernes — distillation, mixologie, design et hospitalité, ancrés dans le terroir québécois.
          </p>
        </div>
      </header>

      {/* VISION + PILIERS */}
      <section style={{ padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "30px" }}>Notre vision</div>
          <blockquote data-reveal data-reveal-delay="110" style={{ margin: "0 0 clamp(48px,8vh,90px)", maxWidth: "24ch", fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px,4vw,58px)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>
            Chaque page de notre histoire porte la signature d&apos;une marque <span style={{ fontStyle: "italic", color: "#a86a2c" }}>authentiquement québécoise</span>, résolument moderne.
          </blockquote>
          <div className="cr-lm-pillars">
            {PILLARS.map((p, i) => (
              <div key={p.title} data-reveal data-reveal-delay={String(i * 80)} style={{ padding: "clamp(26px,3.4vh,44px) clamp(16px,1.8vw,28px)", borderBottom: "1px solid rgba(42,32,26,0.14)", borderRight: "1px solid rgba(42,32,26,0.14)" }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(30px,3vw,44px)", fontWeight: 600, color: "#8e2436", lineHeight: 1, marginBottom: "16px" }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.7vw,24px)", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>{p.title}</div>
                <div style={{ fontSize: "14px", lineHeight: 1.55, color: "rgba(42,32,26,0.62)" }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGNE DU TEMPS */}
      <section style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "22px" }}>Notre histoire</div>
          <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 clamp(40px,7vh,72px)", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px,5vw,72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
            D&apos;une église aux <span style={{ fontStyle: "italic", color: "#a86a2c" }}>grandes tables</span>
          </h2>
          <div className="cr-lm-timeline">
            {TIMELINE.map((t, i) => (
              <div key={t.year} data-reveal data-reveal-delay={String(i * 90)} style={{ borderTop: "1px solid rgba(42,32,26,0.3)", paddingTop: "22px" }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(38px,3.6vw,54px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "14px" }}>{t.year}</div>
                <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "12px" }}>{t.eyebrow}</div>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(17px,1.6vw,22px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "10px" }}>{t.title}</div>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "rgba(42,32,26,0.65)" }}>{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTINCTIONS + MAISONS — dark block */}
      <section style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "22px" }}>Distinctions & distribution</div>
          <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 clamp(36px,6vh,64px)", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px,5vw,72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
            Reconnus <span style={{ fontStyle: "italic", color: "#a86a2c" }}>ici et ailleurs</span>
          </h2>
          <div className="cr-lm-awards" style={{ marginBottom: "clamp(60px,10vh,110px)" }}>
            {AWARDS.map((a, i) => (
              <div key={a.title} data-reveal data-reveal-delay={String(i * 80)} style={{ padding: "clamp(24px,3vh,40px) clamp(16px,1.8vw,28px)", borderBottom: "1px solid rgba(244,239,230,0.14)", borderRight: "1px solid rgba(244,239,230,0.14)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600 }}>{a.source}</span>
                  {a.year && <span style={{ fontSize: "12px", color: "rgba(244,239,230,0.45)" }}>{a.year}</span>}
                </div>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.7vw,24px)", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>{a.title}</div>
                <div style={{ fontSize: "13.5px", lineHeight: 1.5, color: "rgba(244,239,230,0.6)" }}>{a.detail}</div>
              </div>
            ))}
          </div>

          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "22px" }}>Cinq maisons, une signature</div>
          <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 clamp(36px,6vh,64px)", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px,5vw,72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
            Nos <span style={{ fontStyle: "italic", color: "#a86a2c" }}>maisons</span>
          </h2>
          <div className="cr-brand-grid">
            {BRANDS.map((b, i) => (
              <div key={b.alt} className="cr-brand" data-reveal data-reveal-delay={String(i * 80)} style={{ padding: "clamp(34px,4vh,56px) 22px", borderBottom: "1px solid rgba(244,239,230,0.12)", borderRight: i < BRANDS.length - 1 ? "1px solid rgba(244,239,230,0.12)" : undefined, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", minHeight: "240px", justifyContent: "center", transition: "background .5s" }}>
                <img src={encodeURI(b.logo)} alt={b.alt} style={{ height: `${b.h}px`, width: "auto", objectFit: "contain", opacity: 0.92 }} />
                <span style={{ fontSize: "12px", letterSpacing: "0.04em", lineHeight: 1.5, color: "rgba(244,239,230,0.6)", maxWidth: "22ch" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(70px,11vh,140px) clamp(20px,4vw,56px)", textAlign: "center", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "24px" }}>Venez nous voir</div>
        <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 auto 36px", maxWidth: "20ch", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.6vw,64px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
          L&apos;histoire se déguste <span style={{ fontStyle: "italic", color: "#a86a2c" }}>sur place</span>
        </h2>
        <div data-reveal data-reveal-delay="180" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/experiences" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "16px 34px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
            Réserver une visite
          </a>
          <a href="/produits" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "16px 34px", border: "1px solid rgba(42,32,26,0.35)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
            Découvrir nos créations
          </a>
        </div>
      </section>
    </main>
  );
}
