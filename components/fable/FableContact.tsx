"use client";

/* Contact — Fable design language. Le formulaire compose un courriel (mailto)
   au lieu de POSTer vers /api/contact, qui n'existe pas (livraison de courriel
   côté serveur = décision fournisseur en attente). */

import { useState } from "react";

const SERIF = "'Familjen Grotesk',sans-serif";

const STYLES = `
  [data-cr-root] .cr-ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,3vw,44px);}
  [data-cr-root] .cr-ct-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,90px);align-items:start;}
  [data-cr-root] .cr-ct-input{width:100%;padding:14px 18px;background:rgba(244,239,230,0.05);border:1px solid rgba(244,239,230,0.22);border-radius:3px;color:#f4efe6;font-family:inherit;font-size:15px;outline:none;transition:border-color .35s;}
  [data-cr-root] .cr-ct-input:focus{border-color:rgba(231,211,173,0.65);}
  [data-cr-root] .cr-ct-input::placeholder{color:rgba(244,239,230,0.4);}
  [data-cr-root] .cr-b2b:hover{background:rgba(244,239,230,0.05);}
  @media (max-width:980px){[data-cr-root] .cr-ct-grid{grid-template-columns:1fr!important;} [data-cr-root] .cr-ct-form-grid{grid-template-columns:1fr!important;}}
`;

const LOCATIONS = [
  {
    id: "magog",
    region: "Cantons-de-l'Est",
    name: "Distillerie Cherry River — Magog",
    address: "120 rue des Pins, Magog, QC J1X 1W7",
    hours: "Mardi — Dimanche, 11h à 18h",
    mapsUrl: "https://www.google.com/maps/place/120+Rue+des+Pins,+Magog,+QC+J1X+1W7",
    embedSrc: "https://maps.google.com/maps?q=120+Rue+des+Pins,+Magog,+QC+J1X+1W7&output=embed&hl=fr",
  },
  {
    id: "quebec",
    region: "Capitale-Nationale",
    name: "Distillerie Cherry River — Québec",
    address: "1800 chem. Saint-Louis, Québec, QC G1S",
    hours: "Mardi — Dimanche, 11h à 18h",
    mapsUrl: "https://www.google.com/maps/place/1800+Chemin+Saint-Louis,+Québec,+QC+G1S",
    embedSrc: "https://maps.google.com/maps?q=1800+chemin+Saint-Louis,+Quebec,+QC+G1S&output=embed&hl=fr",
  },
];

const B2B = [
  { region: "Canada", detail: "SAQ · Vente privée · Distilleries", contact: "info@cherryriver.ca", href: "mailto:info@cherryriver.ca" },
  { region: "États-Unis", detail: "Distribution nationale", contact: "cherryriverspirits.com", href: "https://cherryriverspirits.com" },
  { region: "Export / International", detail: "LCBO · Marchés internationaux", contact: "info@cherryriver.ca", href: "mailto:info@cherryriver.ca" },
];

const SUBJECTS = ["Réservation & visites", "Événement privé ou corporatif", "Distribution & B2B", "Médias & partenariats", "Autre demande"];

export function FableContact() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Bonjour,\n\n${message}\n\n— ${name || ""}`;
    window.location.href = `mailto:info@cherryriver.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <header style={{ padding: "clamp(140px,19vh,200px) clamp(20px,4vw,56px) clamp(40px,6vh,70px)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "24px" }}>Contact</div>
          <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(42px,7vw,110px)", lineHeight: 0.94, letterSpacing: "-0.02em" }}>
            Parlons-<span style={{ fontStyle: "italic", fontWeight: 500, color: "#a86a2c" }}>en</span>
          </h1>
          <p data-reveal data-reveal-delay="170" style={{ margin: 0, maxWidth: "52ch", fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.6, color: "rgba(42,32,26,0.72)" }}>
            Réservations, événements, distribution — écrivez-nous à{" "}
            <a href="mailto:info@cherryriver.ca" style={{ color: "#8e2436", borderBottom: "1px solid rgba(142,36,54,0.4)" }}>info@cherryriver.ca</a>{" "}
            ou passez nous voir.
          </p>
        </div>
      </header>

      {/* NOS ADRESSES */}
      <section style={{ padding: "clamp(30px,5vh,60px) clamp(20px,4vw,56px) clamp(70px,11vh,140px)" }}>
        <div className="cr-ct-grid" style={{ maxWidth: "1320px", margin: "0 auto" }}>
          {LOCATIONS.map((loc, i) => (
            <div key={loc.id} data-reveal data-reveal-delay={String(i * 100)} style={{ border: "1px solid rgba(42,32,26,0.14)", borderRadius: "3px", overflow: "hidden", background: "#efe6d7" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", background: "#e4dbcb" }}>
                <iframe
                  src={loc.embedSrc}
                  title={`Carte — ${loc.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, filter: "sepia(0.22) saturate(0.85)" }}
                />
              </div>
              <div style={{ padding: "clamp(24px,3vw,36px)" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "10px" }}>{loc.region}</div>
                <h2 style={{ margin: "0 0 18px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(20px,2vw,28px)", letterSpacing: "-0.01em" }}>{loc.name}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "14.5px", color: "rgba(42,32,26,0.72)" }}>
                  <span>{loc.address}</span>
                  <span>{loc.hours}</span>
                </div>
                <a href={loc.mapsUrl} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "22px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#8e2436" }}>
                  Itinéraire →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + B2B — dark editorial block */}
      <section style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", background: "#241c14", color: "#f4efe6", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="cr-ct-form-grid" style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div>
            <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "22px" }}>Écrivez-nous</div>
            <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px,4.6vw,66px)", lineHeight: 0.98, letterSpacing: "-0.01em", maxWidth: "14ch" }}>
              Une question, un <span style={{ fontStyle: "italic", color: "#a86a2c" }}>projet</span>&nbsp;?
            </h2>
            <p data-reveal data-reveal-delay="170" style={{ margin: "0 0 30px", maxWidth: "46ch", fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.65, color: "rgba(244,239,230,0.72)" }}>
              Remplissez le formulaire — votre courriel s&apos;ouvre prérempli, prêt à envoyer. Nous répondons sous 24&nbsp;h ouvrables.
            </p>
            <div data-reveal data-reveal-delay="230" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {B2B.map((b) => (
                <a key={b.region} href={b.href} target={b.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="cr-b2b" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "18px", padding: "18px 20px", border: "1px solid rgba(244,239,230,0.16)", borderRadius: "3px", transition: "background .4s" }}>
                  <span>
                    <span style={{ display: "block", fontFamily: SERIF, fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>{b.region}</span>
                    <span style={{ fontSize: "13px", color: "rgba(244,239,230,0.55)" }}>{b.detail}</span>
                  </span>
                  <span style={{ fontSize: "13px", color: "#e7d3ad", whiteSpace: "nowrap" }}>{b.contact}</span>
                </a>
              ))}
            </div>
          </div>

          <form data-reveal data-reveal-delay="140" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)", fontWeight: 600 }}>Votre nom</label>
            <input className="cr-ct-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Prénom et nom" />
            <label style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)", fontWeight: 600, marginTop: "8px" }}>Sujet</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {SUBJECTS.map((s) => {
                const on = subject === s;
                return (
                  <button key={s} type="button" onClick={() => setSubject(s)} style={{ appearance: "none", cursor: "pointer", font: "inherit", fontSize: "12.5px", padding: "9px 15px", borderRadius: "100px", border: `1px solid ${on ? "#e7d3ad" : "rgba(244,239,230,0.25)"}`, background: on ? "rgba(231,211,173,0.14)" : "transparent", color: on ? "#e7d3ad" : "rgba(244,239,230,0.8)", transition: "all .3s" }}>
                    {s}
                  </button>
                );
              })}
            </div>
            <label style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)", fontWeight: 600, marginTop: "8px" }}>Message</label>
            <textarea className="cr-ct-input" required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Votre message" style={{ resize: "vertical" }} />
            <button type="submit" data-magnetic style={{ alignSelf: "flex-start", marginTop: "10px", padding: "16px 34px", background: "#8e2436", color: "#f4efe6", border: "none", borderRadius: "100px", fontFamily: "inherit", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
              Ouvrir mon courriel
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
