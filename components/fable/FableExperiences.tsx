"use client";

/* Expériences — Fable design language (cream #f4ede0, burgundy #8e2436, copper #a86a2c).
   Booking = détails par courriel (backend réservation hors scope — voir quote séparée). */

import { useMemo, useState } from "react";
import { EXPERIENCES, DISTILLERIES, AVAILABLE_TIMES, type Experience } from "@/content/experiences-data";

const EASE = "cubic-bezier(.16,1,.3,1)";
const SERIF = "'Familjen Grotesk',sans-serif";

const STYLES = `
  [data-cr-root] .cr-exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(36px,5vw,90px);align-items:center;}
  [data-cr-root] .cr-exp-img{transition:transform 1.2s ${EASE};}
  [data-cr-root] .cr-exp-row:hover .cr-exp-img{transform:scale(1.045);}
  [data-cr-root] .cr-exp-cta{transition:background .45s,color .45s,border-color .45s;}
  [data-cr-root] .cr-exp-cta:hover{background:#8e2436;color:#f4efe6;border-color:#8e2436;}
  [data-cr-root] .cr-time-chip{transition:background .3s,color .3s,border-color .3s;}
  [data-cr-root] .cr-time-chip:hover{border-color:#8e2436;}
  [data-cr-root] .cr-loc-card .cr-loc-photo{transition:transform 1.2s ${EASE};}
  [data-cr-root] .cr-loc-card:hover .cr-loc-photo{transform:scale(1.05);}
  @media (max-width:980px){[data-cr-root] .cr-exp-grid{grid-template-columns:1fr!important;} [data-cr-root] .cr-exp-grid.cr-flip .cr-exp-media{order:-1;} [data-cr-root] .cr-locs-grid{grid-template-columns:1fr!important;}}
`;

function BookingPanel({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const [location, setLocation] = useState<"magog" | "quebec">(exp.locations[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const locName = DISTILLERIES.find((d) => d.id === location)?.shortName ?? location;
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const mailto = useMemo(() => {
    const subject = `Réservation — ${exp.title} (${locName})`;
    const body = [
      `Bonjour,`,
      ``,
      `J'aimerais réserver l'expérience suivante :`,
      ``,
      `Expérience : ${exp.title}`,
      `Distillerie : ${locName}`,
      `Date souhaitée : ${date || "à confirmer"}`,
      `Heure souhaitée : ${time || "à confirmer"}`,
      `Nombre de personnes : ${guests}`,
      ``,
      `Merci de me confirmer la disponibilité.`,
    ].join("\n");
    return `mailto:info@cherryriver.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [exp.title, locName, date, time, guests]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9500, background: "rgba(20,15,10,0.72)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,48px)", overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(560px,100%)", maxHeight: "92vh", overflowY: "auto", background: "#f4ede0", color: "#2a201a", borderRadius: "4px", padding: "clamp(28px,4vw,44px)", boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}>
        <button type="button" onClick={onClose} aria-label="Fermer" style={{ position: "absolute", top: "18px", right: "20px", appearance: "none", background: "transparent", border: 0, fontSize: "22px", lineHeight: 1, cursor: "pointer", color: "rgba(42,32,26,0.6)" }}>✕</button>

        <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "14px" }}>Réservation</div>
        <h3 style={{ margin: "0 0 6px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(24px,3vw,32px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}>{exp.title}</h3>
        <p style={{ margin: "0 0 26px", fontSize: "14px", color: "rgba(42,32,26,0.62)" }}>{exp.duration} · {exp.priceLabel} · max {exp.maxGuests} personnes</p>

        {/* Lieu */}
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,32,26,0.55)", fontWeight: 600, marginBottom: "10px" }}>Distillerie</div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "22px", flexWrap: "wrap" }}>
          {exp.locations.map((loc) => {
            const d = DISTILLERIES.find((x) => x.id === loc)!;
            const on = location === loc;
            return (
              <button key={loc} type="button" onClick={() => setLocation(loc)} className="cr-time-chip" style={{ appearance: "none", cursor: "pointer", font: "inherit", fontSize: "13px", letterSpacing: "0.06em", padding: "10px 18px", borderRadius: "100px", border: `1px solid ${on ? "#8e2436" : "rgba(42,32,26,0.25)"}`, background: on ? "#8e2436" : "transparent", color: on ? "#f4efe6" : "#2a201a" }}>
                {d.shortName}
              </button>
            );
          })}
        </div>

        {/* Date */}
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,32,26,0.55)", fontWeight: 600, marginBottom: "10px" }}>Date souhaitée</div>
        <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", padding: "13px 16px", marginBottom: "22px", background: "rgba(42,32,26,0.04)", border: "1px solid rgba(42,32,26,0.2)", borderRadius: "3px", color: "#2a201a", fontFamily: "inherit", fontSize: "15px", outline: "none" }} />

        {/* Heure */}
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,32,26,0.55)", fontWeight: 600, marginBottom: "10px" }}>Heure souhaitée</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
          {AVAILABLE_TIMES.map((t) => {
            const on = time === t;
            return (
              <button key={t} type="button" onClick={() => setTime(on ? "" : t)} className="cr-time-chip" style={{ appearance: "none", cursor: "pointer", font: "inherit", fontSize: "13px", padding: "9px 14px", borderRadius: "100px", border: `1px solid ${on ? "#8e2436" : "rgba(42,32,26,0.25)"}`, background: on ? "#8e2436" : "transparent", color: on ? "#f4efe6" : "#2a201a" }}>
                {t}
              </button>
            );
          })}
        </div>

        {/* Personnes */}
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,32,26,0.55)", fontWeight: 600, marginBottom: "10px" }}>Personnes</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0", border: "1px solid rgba(42,32,26,0.25)", borderRadius: "100px", marginBottom: "28px" }}>
          <button type="button" aria-label="Moins" onClick={() => setGuests((g) => Math.max(1, g - 1))} style={{ appearance: "none", background: "transparent", border: 0, cursor: "pointer", font: "inherit", fontSize: "18px", padding: "10px 18px", color: "#8e2436" }}>−</button>
          <span style={{ minWidth: "36px", textAlign: "center", fontFamily: SERIF, fontSize: "17px", fontWeight: 600 }}>{guests}</span>
          <button type="button" aria-label="Plus" onClick={() => setGuests((g) => Math.min(exp.maxGuests, g + 1))} style={{ appearance: "none", background: "transparent", border: 0, cursor: "pointer", font: "inherit", fontSize: "18px", padding: "10px 18px", color: "#8e2436" }}>+</button>
        </div>

        <a href={mailto} style={{ display: "block", textAlign: "center", padding: "16px 28px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
          Envoyer ma demande
        </a>
        <p style={{ margin: "14px 0 0", textAlign: "center", fontSize: "12.5px", lineHeight: 1.5, color: "rgba(42,32,26,0.55)" }}>
          Votre demande s&apos;ouvre dans votre courriel — nous confirmons la disponibilité sous 24&nbsp;h. Ou écrivez-nous&nbsp;: <a href="mailto:info@cherryriver.ca" style={{ color: "#8e2436" }}>info@cherryriver.ca</a>
        </p>
      </div>
    </div>
  );
}

export function FableExperiences() {
  const [booking, setBooking] = useState<Experience | null>(null);

  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO — dark, full-bleed church interior */}
      <header style={{ position: "relative", color: "#f4efe6", minHeight: "72vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img data-parallax="0.14" src="/assets/lifestyle/Photo%20distillerie%20Magog/MD-14.jpg" alt="Intérieur de l'église anglicane — boutique et vitraux, distillerie Cherry River, Magog" style={{ position: "absolute", inset: "-10% 0", width: "100%", height: "120%", objectFit: "cover", willChange: "transform" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,15,10,0.88) 0%, rgba(20,15,10,0.35) 55%, rgba(20,15,10,0.45) 100%)" }}></div>
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "clamp(140px,20vh,220px) clamp(20px,4vw,56px) clamp(56px,9vh,100px)", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d8c4a0", fontWeight: 600, marginBottom: "24px" }}>Expériences</div>
          <h1 data-reveal data-reveal-delay="90" style={{ margin: "0 0 20px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(42px,7vw,110px)", lineHeight: 0.94, letterSpacing: "-0.02em", maxWidth: "14ch" }}>
            Vivez la <span style={{ fontStyle: "italic", fontWeight: 500, color: "#a86a2c" }}>distillerie</span>
          </h1>
          <p data-reveal data-reveal-delay="170" style={{ margin: 0, maxWidth: "52ch", fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.6, color: "rgba(244,239,230,0.8)" }}>
            Visites guidées, ateliers de mixologie, dégustations et événements privés — dans deux lieux patrimoniaux, à Magog et à Québec.
          </p>
        </div>
      </header>

      {/* EXPÉRIENCES — alternating editorial rows */}
      <section style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(80px,13vh,160px)" }}>
          {EXPERIENCES.map((exp, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={exp.id} className={`cr-exp-row cr-exp-grid${flip ? " cr-flip" : ""}`}>
                {!flip && (
                  <div data-reveal className="cr-exp-media" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "3px", boxShadow: "0 24px 60px rgba(60,45,30,0.16)" }}>
                    <img className="cr-exp-img" src={encodeURI(exp.image)} alt={exp.title} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div>
                  <div data-reveal style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "22px" }}>
                    <span>{exp.duration}</span>
                    <span style={{ color: "rgba(42,32,26,0.3)" }}>✦</span>
                    <span>{exp.priceLabel}</span>
                    <span style={{ color: "rgba(42,32,26,0.3)" }}>✦</span>
                    <span>max {exp.maxGuests} pers.</span>
                  </div>
                  <h2 data-reveal data-reveal-delay="80" style={{ margin: "0 0 8px", fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(30px,4vw,56px)", lineHeight: 1.02, letterSpacing: "-0.015em" }}>{exp.title}</h2>
                  <div data-reveal data-reveal-delay="130" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(17px,1.6vw,22px)", color: "#a86a2c", marginBottom: "22px" }}>{exp.subtitle}</div>
                  <p data-reveal data-reveal-delay="180" style={{ margin: "0 0 28px", maxWidth: "52ch", fontSize: "clamp(15px,1.15vw,17px)", lineHeight: 1.65, color: "rgba(42,32,26,0.72)" }}>{exp.description}</p>
                  <ul data-reveal data-reveal-delay="230" style={{ margin: "0 0 34px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {exp.includes.map((inc) => (
                      <li key={inc} style={{ display: "flex", alignItems: "baseline", gap: "12px", fontSize: "14.5px", color: "rgba(42,32,26,0.75)" }}>
                        <span style={{ color: "#8e2436", fontSize: "11px" }}>✦</span> {inc}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal data-reveal-delay="280" style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
                    {exp.isContactOnly ? (
                      <a href={`mailto:info@cherryriver.ca?subject=${encodeURIComponent(`Demande — ${exp.title}`)}`} data-magnetic className="cr-exp-cta" style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 30px", border: "1px solid rgba(42,32,26,0.35)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
                        Nous contacter
                      </a>
                    ) : (
                      <button type="button" onClick={() => setBooking(exp)} data-magnetic className="cr-exp-cta" style={{ appearance: "none", background: "transparent", font: "inherit", color: "inherit", display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 30px", border: "1px solid rgba(42,32,26,0.35)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
                        Réserver
                      </button>
                    )}
                    <span style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(42,32,26,0.5)" }}>
                      {exp.locations.map((l) => DISTILLERIES.find((d) => d.id === l)?.shortName).join(" · ")}
                    </span>
                  </div>
                </div>
                {flip && (
                  <div data-reveal className="cr-exp-media" style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "3px", boxShadow: "0 24px 60px rgba(60,45,30,0.16)" }}>
                    <img className="cr-exp-img" src={encodeURI(exp.image)} alt={exp.title} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* NOS LIEUX */}
      <section style={{ padding: "clamp(70px,11vh,150px) clamp(20px,4vw,56px)", background: "#efe6d7", borderTop: "1px solid rgba(42,32,26,0.1)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "22px" }}>Deux lieux patrimoniaux</div>
          <h2 data-reveal data-reveal-delay="90" style={{ margin: "0 0 clamp(36px,6vh,64px)", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px,5vw,72px)", lineHeight: 0.98, letterSpacing: "-0.01em" }}>
            Où nous <span style={{ fontStyle: "italic", color: "#a86a2c" }}>trouver</span>
          </h2>
          <div className="cr-locs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,44px)" }}>
            {DISTILLERIES.map((d, i) => (
              <a key={d.id} href={`/distilleries#${d.id}`} data-reveal data-reveal-delay={String(i * 100)} className="cr-loc-card" style={{ display: "block" }}>
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", borderRadius: "3px", marginBottom: "20px" }}>
                  <img className="cr-loc-photo" src={encodeURI(d.image)} alt={d.name} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(36,28,20,0.45), rgba(36,28,20,0) 50%)" }}></div>
                </div>
                <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8e2436", fontWeight: 600, marginBottom: "8px" }}>{d.shortName}</div>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(20px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "6px" }}>{d.name}</div>
                <div style={{ fontSize: "14px", color: "rgba(42,32,26,0.62)" }}>{d.fullAddress}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {booking && <BookingPanel exp={booking} onClose={() => setBooking(null)} />}
    </main>
  );
}
