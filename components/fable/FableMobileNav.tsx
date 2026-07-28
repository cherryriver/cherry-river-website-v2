"use client";

/**
 * Navigation mobile (≤860px) — partout sur le site.
 * Barre: hamburger à gauche · logo centré · CTA à droite.
 * Tiroir plein écran: liens Familjen en grand, entrée en cascade.
 * Les navs desktop ([data-nav] des pages Fable) sont masquées à cette taille.
 */

import { useEffect, useState } from "react";

const LINKS = [
  { href: "/produits", label: "Produits" },
  { href: "/boutique", label: "Boutique" },
  { href: "/recettes", label: "Recettes" },
  { href: "/distilleries", label: "Distilleries" },
  { href: "/experiences", label: "Expériences" },
  { href: "/la-maison", label: "La Maison" },
  { href: "/contact", label: "Contact" },
];

export function FableMobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cr-mnav { display: none; }
        @media (max-width: 860px) {
          [data-nav] { display: none !important; }
          .cr-mnav { display: flex; }
        }
        .cr-mnav-link { opacity: 0; transform: translateY(18px); transition: opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1); }
        .cr-mnav-drawer.on .cr-mnav-link { opacity: 1; transform: none; }
        .cr-mnav-burger span { display: block; width: 22px; height: 2px; background: #f4efe6; border-radius: 1px; transition: transform .35s cubic-bezier(.16,1,.3,1), opacity .3s ease; }
        .cr-mnav-burger.on span:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
        .cr-mnav-burger.on span:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }
      ` }} />

      {/* Barre mobile */}
      <div className="cr-mnav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9600, alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 16px", background: "rgba(36,28,20,0.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#f4efe6" }}>
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={"cr-mnav-burger" + (open ? " on" : "")}
          style={{ appearance: "none", background: "transparent", border: 0, cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "10px 8px", margin: "-6px 0" }}
        >
          <span /><span />
        </button>
        <a href="/" aria-label="Cherry River — accueil" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <img src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png" alt="Cherry River" style={{ height: "28px", width: "auto", display: "block" }} />
        </a>
        <a href="/experiences" style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, padding: "9px 14px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", whiteSpace: "nowrap" }}>Réserver</a>
      </div>

      {/* Tiroir plein écran */}
      <div
        className={"cr-mnav-drawer" + (open ? " on" : "")}
        aria-hidden={!open}
        style={{ position: "fixed", inset: 0, zIndex: 9500, background: "#241c14", color: "#f4efe6", display: "flex", flexDirection: "column", justifyContent: "center", padding: "90px 28px 40px", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .45s ease" }}
      >
        <nav aria-label="Navigation mobile" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              className="cr-mnav-link"
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(30px,8.4vw,42px)", lineHeight: 1.25, color: "#f4efe6", transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s", display: "flex", alignItems: "baseline", gap: "14px" }}
            >
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#a86a2c", minWidth: "22px" }}>{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="cr-mnav-link" style={{ marginTop: "36px", transitionDelay: open ? "0.5s" : "0s" }}>
          <a href="/experiences" onClick={() => setOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 30px", background: "#8e2436", color: "#f4efe6", borderRadius: "100px", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Réserver une visite</a>
        </div>
        <div className="cr-mnav-link" style={{ marginTop: "40px", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,239,230,0.45)", transitionDelay: open ? "0.56s" : "0s" }}>
          Magog · Québec — Sillery
        </div>
      </div>
    </>
  );
}
