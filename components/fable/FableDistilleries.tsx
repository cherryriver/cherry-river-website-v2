"use client";

/* Distilleries — Fable design language. Deux lieux patrimoniaux en récit
   éditorial : Magog (église anglicane, 1875) et Québec — Sillery (Mémorial Hall).
   Photos réelles uniquement (dossiers Magog + Québec boutique). */

const SERIF = "'Familjen Grotesk',sans-serif";

const STYLES = `
  [data-cr-root] .cr-dst-grid{display:grid;grid-template-columns:1.15fr 1fr;gap:clamp(36px,5vw,90px);align-items:center;}
  [data-cr-root] .cr-dst-grid.cr-flip{grid-template-columns:1fr 1.15fr;}
  [data-cr-root] .cr-dst-photo{transition:transform 1.2s cubic-bezier(.16,1,.3,1);}
  [data-cr-root] .cr-dst-tile:hover .cr-dst-photo{transform:scale(1.05);}
  [data-cr-root] .cr-dst-cta{transition:background .45s,color .45s,border-color .45s;}
  [data-cr-root] .cr-dst-cta:hover{background:#8e2436;color:#f4efe6;border-color:#8e2436;}
  [data-cr-root] .cr-dst-gallery{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:clamp(10px,1.4vw,20px);}
  @media (max-width:980px){
    [data-cr-root] .cr-dst-grid,[data-cr-root] .cr-dst-grid.cr-flip{grid-template-columns:1fr!important;}
    [data-cr-root] .cr-dst-grid.cr-flip .cr-dst-media{order:-1;}
    [data-cr-root] .cr-dst-gallery{grid-template-columns:1fr 1fr!important;}
  }
`;

const MAGOG_GALLERY = [
  { src: "/assets/lifestyle/Photo distillerie Magog/MD-14.jpg", alt: "Boutique sous les voûtes de l'église anglicane, Magog", tall: true },
  { src: "/assets/lifestyle/Photo distillerie Magog/DSC_0834.JPG", alt: "Porte gothique de l'ancienne église anglicane, Magog" },
  { src: "/assets/lifestyle/Photo distillerie Magog/DSC_0835.JPG", alt: "Bar de dégustation rétroéclairé, distillerie Magog" },
];

export function FableDistilleries() {
  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO — dark, church facade */}
      <header style={{ position: "relative", color: "#f4efe6", minHeight: "78vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img data-parallax="0.14" src="/assets/lifestyle/Photo%20distillerie%20Magog/IMG_5102.JPG" alt="Intérieur de l'ancienne église anglicane — Distillerie Cherry River, Magog" style={{ position: "absolute", inset: "-10% 0", width: "100%", height: "120%", objectFit: "cover", willChange: "transform" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,15,10,0.9) 0%, rgba(20,15,10,0.3) 55%, rgba(20,15,10,0.45) 100%)" }}></div>
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "clamp(140px,20vh,220px) clamp(20px,4vw,56px) clamp(56px,9vh,100px)", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "24px" }}>Nos distilleries</div>
          <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(42px,7vw,110px)", lineHeight: 0.94, letterSpacing: "-0.02em", maxWidth: "15ch" }}>
            Deux lieux <span style={{ fontStyle: "italic", fontWeight: 500, color: "#a86a2c" }}>patrimoniaux</span>
          </h1>
          <p data-reveal data-reveal-delay="170" style={{ margin: 0, maxWidth: "54ch", fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.6, color: "rgba(244,239,230,0.8)" }}>
            Une église anglicane de plus de 150 ans à Magog. Un Mémorial Hall historique à Québec — Sillery. Deux maisons, une même signature.
          </p>
        </div>
      </header>

      {/* ═══ MAGOG ═══ */}
      <section id="magog" style={{ padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px) clamp(50px,8vh,90px)" }}>
        <div className="cr-dst-grid" style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "22px" }}>
              <span style={{ width: "34px", height: "1px", background: "#8e2436" }}></span> Ancienne église anglicane · 150+ ans
            </div>
            <h2 data-reveal data-reveal-delay="80" style={{ margin: "0 0 22px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(34px,4.8vw,68px)", lineHeight: 0.98, letterSpacing: "-0.015em" }}>Magog</h2>
            <p data-reveal data-reveal-delay="150" style={{ margin: "0 0 20px", maxWidth: "52ch", fontSize: "clamp(15px,1.15vw,17.5px)", lineHeight: 1.68, color: "rgba(42,32,26,0.75)" }}>
              Au cœur des Cantons-de-l&apos;Est, une église anglicane de plus de 150 ans abrite nos alambics de cuivre. Architecture néo-gothique, voûtes de pierre, vitraux — un dialogue entre le sacré et le sensuel.
            </p>
            <p data-reveal data-reveal-delay="200" style={{ margin: "0 0 30px", maxWidth: "52ch", fontSize: "clamp(15px,1.15vw,17.5px)", lineHeight: 1.68, color: "rgba(42,32,26,0.75)" }}>
              C&apos;est ici que tout commence : distillation en petits lots, dégustations sous la nef et terrasse estivale aux pieds du Mont Orford.
            </p>
            <ul data-reveal data-reveal-delay="250" style={{ margin: "0 0 34px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Église anglicane patrimoniale", "Alambics en cuivre artisanaux", "Bar de dégustation sur place", "Terrasse estivale"].map((h) => (
                <li key={h} style={{ display: "flex", alignItems: "baseline", gap: "12px", fontSize: "14.5px", color: "rgba(42,32,26,0.75)" }}>
                  <span style={{ color: "#8e2436", fontSize: "11px" }}>✦</span> {h}
                </li>
              ))}
            </ul>
            <div data-reveal data-reveal-delay="300" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <a href="/experiences" data-magnetic className="cr-dst-cta" style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 30px", border: "1px solid rgba(42,32,26,0.35)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
                Réserver une visite
              </a>
              <a href="https://www.google.com/maps/place/120+Rue+des+Pins,+Magog,+QC+J1X+1W7" target="_blank" rel="noopener" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>
                120 rue des Pins, Magog →
              </a>
            </div>
          </div>
          <div data-reveal className="cr-dst-media cr-dst-tile" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "3px", boxShadow: "0 24px 60px rgba(60,45,30,0.16)" }}>
            <img className="cr-dst-photo" src="/assets/lifestyle/Photo%20distillerie%20Magog/DSC_0820.JPG" alt="Vitrail gothique dans la nef de l'église anglicane, distillerie Magog" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* MAGOG GALLERY STRIP */}
      <section style={{ padding: "0 clamp(20px,4vw,56px) clamp(80px,13vh,170px)" }}>
        <div className="cr-dst-gallery" style={{ maxWidth: "1320px", margin: "0 auto" }}>
          {MAGOG_GALLERY.map((g, i) => (
            <div key={g.src} data-reveal data-reveal-delay={String(i * 90)} className="cr-dst-tile" style={{ position: "relative", aspectRatio: g.tall ? "4/3" : "1/1", overflow: "hidden", borderRadius: "3px" }}>
              <img className="cr-dst-photo" src={encodeURI(g.src)} alt={g.alt} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ QUÉBEC — SILLERY ═══ (dark editorial) */}
      <section id="quebec" style={{ padding: "clamp(80px,13vh,170px) clamp(20px,4vw,56px)", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="cr-dst-grid cr-flip" style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal className="cr-dst-media cr-dst-tile" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "3px", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
            <img className="cr-dst-photo" src="/assets/lifestyle/Photos_Quebec_boutique/DSCF9780.jpg" alt="Mur de niches éclairées — Distillerie Cherry River, Québec — Sillery" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "22px" }}>
              <span style={{ width: "34px", height: "1px", background: "#a86a2c" }}></span> Mémorial Hall · Sillery
            </div>
            <h2 data-reveal data-reveal-delay="80" style={{ margin: "0 0 22px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(34px,4.8vw,68px)", lineHeight: 0.98, letterSpacing: "-0.015em" }}>Québec</h2>
            <p data-reveal data-reveal-delay="150" style={{ margin: "0 0 20px", maxWidth: "52ch", fontSize: "clamp(15px,1.15vw,17.5px)", lineHeight: 1.68, color: "rgba(244,239,230,0.78)" }}>
              Au cœur du quartier historique de Sillery, le Mémorial Hall accueille notre distillerie boutique urbaine et son bar à cocktails — la mixologie élevée au rang d&apos;art de vivre.
            </p>
            <ul data-reveal data-reveal-delay="220" style={{ margin: "0 0 34px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Mémorial Hall historique", "Bar à cocktails sophistiqué", "Ateliers de mixologie", "Boutique et dégustations"].map((h) => (
                <li key={h} style={{ display: "flex", alignItems: "baseline", gap: "12px", fontSize: "14.5px", color: "rgba(244,239,230,0.78)" }}>
                  <span style={{ color: "#a86a2c", fontSize: "11px" }}>✦</span> {h}
                </li>
              ))}
            </ul>
            <div data-reveal data-reveal-delay="280" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <a href="/experiences" data-magnetic style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 30px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
                Réserver une visite
              </a>
              <a href="https://www.google.com/maps/place/1800+Chemin+Saint-Louis,+Québec,+QC+G1S" target="_blank" rel="noopener" style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#e7d3ad" }}>
                1800 chem. Saint-Louis →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — heures + contact */}
      <section style={{ padding: "clamp(70px,11vh,140px) clamp(20px,4vw,56px)", textAlign: "center", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
        <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "24px" }}>Heures d&apos;ouverture</div>
        <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 auto 16px", maxWidth: "20ch", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.6vw,64px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
          Mardi — Dimanche, <span style={{ fontStyle: "italic", color: "#a86a2c" }}>11h à 18h</span>
        </h2>
        <p data-reveal data-reveal-delay="170" style={{ margin: "0 auto 36px", maxWidth: "46ch", fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.6, color: "rgba(42,32,26,0.7)" }}>
          Dans nos deux distilleries. Pour les groupes et événements privés, écrivez-nous.
        </p>
        <a data-reveal data-reveal-delay="230" href="/contact" data-magnetic className="cr-dst-cta" style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "16px 34px", border: "1px solid rgba(42,32,26,0.35)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
          Nous contacter
        </a>
      </section>
    </main>
  );
}
