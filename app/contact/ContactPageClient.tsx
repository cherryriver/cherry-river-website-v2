"use client";

import Link from "next/link";
import { useState, useCallback, type FormEvent } from "react";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SUBJECTS = [
  "Réservation visite",
  "Événement corporatif",
  "Distribution / B2B",
  "Export / International",
  "Médias",
  "Autre",
] as const;

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@cherryriver.ca",
    url: "https://www.instagram.com/cherryriver.ca/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "Distillerie Cherry River",
    url: "https://www.facebook.com/cherryriverdistillerie/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    handle: "@distilleriecherryriver",
    url: "https://www.tiktok.com/@distilleriecherryriver",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    handle: "@distilleriecherryriver",
    url: "https://www.youtube.com/@distilleriecherryriver",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ContactPageClient() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFormState("sending");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject,
            message: message.trim(),
          }),
        });

        if (res.ok) {
          setFormState("sent");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        } else {
          setFormState("error");
        }
      } catch {
        setFormState("error");
      }
    },
    [name, email, subject, message]
  );

  return (
    <div className="min-h-screen">
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-44"
        style={{ background: "var(--bg-black)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, var(--color-accent-gold) 0%, transparent 50%)",
          }}
        />

        <div
          className="relative mx-auto w-full px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Contact
            </p>
            <h1
              className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
              }}
            >
              Parlons
              <br />
              <em className="font-light">cocktails</em>
            </h1>
            <p
              className="mt-6 max-w-[48ch] font-body text-[1rem] font-light leading-relaxed sm:text-[1.0625rem]"
              style={{ color: "var(--text-light-secondary)" }}
            >
              Réservations, événements, distribution ou simple curiosité — on
              adore jaser.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Nos Distilleries + Maps ─────────────────────────── */}
      <section
        className="py-16 sm:py-24"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <p
              className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Nos distilleries
            </p>
            <h2
              className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-dark)",
              }}
            >
              Venez nous voir
            </h2>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-2">
            {/* Magog */}
            <AnimateOnScroll>
              <DistilleryCard
                region="Cantons-de-l'Est"
                name="Distillerie Cherry River — Magog"
                address="120 rue des Pins, Magog, QC J1X 1W7"
                hours="Mardi — Dimanche, 11h à 18h"
                mapsUrl="https://www.google.com/maps/place/120+Rue+des+Pins,+Magog,+QC+J1X+1W7"
                embedSrc="https://maps.google.com/maps?q=120+Rue+des+Pins,+Magog,+QC+J1X+1W7&output=embed&hl=fr"
              />
            </AnimateOnScroll>

            {/* Québec */}
            <AnimateOnScroll delay={0.1}>
              <DistilleryCard
                region="Capitale-Nationale"
                name="Distillerie Cherry River — Québec"
                address="1800 chem. Saint-Louis, Québec, QC G1S"
                hours="Mardi — Dimanche, 11h à 18h"
                mapsUrl="https://www.google.com/maps/place/1800+Chemin+Saint-Louis,+Québec,+QC+G1S"
                embedSrc="https://maps.google.com/maps?q=1800+chemin+Saint-Louis,+Quebec,+QC+G1S&output=embed&hl=fr"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Contact Form ────────────────────────────────────── */}
      <section style={{ background: "var(--bg-dark)" }} className="py-16 sm:py-24">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Left — intro */}
            <AnimateOnScroll>
              <div>
                <p
                  className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                  style={{ color: "var(--color-accent-gold)" }}
                >
                  Nous écrire
                </p>
                <h2
                  className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-light)",
                  }}
                >
                  Envoyez-nous
                  <br />
                  un message
                </h2>
                <p
                  className="mt-5 max-w-[38ch] font-body text-[0.9375rem] font-light leading-relaxed"
                  style={{ color: "var(--text-light-secondary)" }}
                >
                  Que ce soit pour réserver, organiser un événement ou explorer
                  un partenariat — on vous répond dans les 24h.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href="mailto:info@cherryriver.ca"
                    className="flex items-center gap-3 font-body text-[0.8125rem] font-light transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-light-secondary)" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--color-accent-gold)" }}
                    >
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    info@cherryriver.ca
                  </a>
                  <Link
                    href="/experiences"
                    className="flex items-center gap-3 font-body text-[0.8125rem] font-light transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-light-secondary)" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--color-accent-gold)" }}
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 11H7v-1h4.5V7h1v6z" />
                    </svg>
                    Réserver une expérience →
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right — form */}
            <AnimateOnScroll delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    type="text"
                    placeholder="Nom complet"
                    value={name}
                    onChange={setName}
                    required
                  />
                  <InputField
                    type="email"
                    placeholder="Courriel"
                    value={email}
                    onChange={setEmail}
                    required
                  />
                </div>

                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full appearance-none rounded-sm border bg-transparent px-4 py-3.5 font-body text-[0.8125rem] font-light outline-none transition-colors focus:border-[var(--color-accent-gold)]"
                    style={{
                      borderColor: "var(--border-dark)",
                      color: subject
                        ? "var(--text-light)"
                        : "var(--text-light-muted)",
                    }}
                  >
                    <option value="" disabled>
                      Sujet
                    </option>
                    {SUBJECTS.map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ background: "#1C1C1C", color: "#f0ebe4" }}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "var(--text-light-muted)" }}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <textarea
                  placeholder="Votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full resize-none rounded-sm border bg-transparent px-4 py-3.5 font-body text-[0.8125rem] font-light leading-relaxed outline-none transition-colors focus:border-[var(--color-accent-gold)]"
                  style={{
                    borderColor: "var(--border-dark)",
                    color: "var(--text-light)",
                  }}
                />

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="inline-flex items-center justify-center px-8 py-3.5 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                    style={{
                      background: "var(--color-accent-gold)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {formState === "sending" ? "Envoi en cours…" : "Envoyer"}
                  </button>

                  {formState === "sent" && (
                    <span
                      className="font-body text-[0.78rem] font-light"
                      style={{ color: "var(--color-accent-gold)" }}
                    >
                      Message envoyé — merci!
                    </span>
                  )}
                  {formState === "error" && (
                    <span
                      className="font-body text-[0.78rem] font-light"
                      style={{ color: "var(--color-accent-cherry)" }}
                    >
                      Erreur — réessayez ou écrivez à info@cherryriver.ca
                    </span>
                  )}
                </div>
              </form>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Distribution & B2B ──────────────────────────────── */}
      <section
        className="py-16 sm:py-24"
        style={{ background: "var(--bg-cream)" }}
      >
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <AnimateOnScroll>
              <div>
                <p
                  className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                  style={{ color: "var(--color-accent-gold)" }}
                >
                  Distribution & B2B
                </p>
                <h2
                  className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-light"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark)",
                  }}
                >
                  Vous souhaitez distribuer
                  <br />
                  Cherry River?
                </h2>
                <p
                  className="mt-5 max-w-[50ch] font-body text-[0.9375rem] font-light leading-relaxed"
                  style={{ color: "var(--text-dark-secondary)" }}
                >
                  Que vous soyez restaurateur, détaillant, distributeur ou
                  importateur — nous sommes ouverts aux partenariats qui
                  partagent notre vision de la qualité artisanale.
                </p>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 border px-8 py-3.5 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-80"
                  style={{
                    borderColor: "var(--text-dark)",
                    color: "var(--text-dark)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7v4H9v-4h6z" />
                  </svg>
                  Télécharger notre fiche produit
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="space-y-6">
                <B2BCard
                  region="Canada"
                  detail="SAQ · Vente privée · Distilleries"
                  contact="info@cherryriver.ca"
                  href="mailto:info@cherryriver.ca"
                />
                <B2BCard
                  region="États-Unis"
                  detail="Distribution nationale"
                  contact="cherryriverspirits.com"
                  href="https://cherryriverspirits.com"
                />
                <B2BCard
                  region="Export / International"
                  detail="LCBO · Marchés internationaux"
                  contact="info@cherryriver.ca"
                  href="mailto:info@cherryriver.ca"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Social Links ────────────────────────────────────── */}
      <section style={{ background: "var(--bg-black)" }} className="py-16 sm:py-20">
        <div
          className="mx-auto px-[var(--content-margin-x)]"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <AnimateOnScroll>
            <div className="text-center">
              <p
                className="mb-4 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
                style={{ color: "var(--color-accent-gold)" }}
              >
                Suivez-nous
              </p>
              <h2
                className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text-light)",
                }}
              >
                Restez dans l&apos;univers Cherry River
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-sm border p-5 transition-all duration-300 hover:border-[var(--color-accent-gold)] sm:p-6"
                  style={{
                    borderColor: "var(--border-dark)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span
                    className="transition-colors group-hover:text-[var(--color-accent-gold)]"
                    style={{ color: "var(--text-light-secondary)" }}
                  >
                    {s.icon}
                  </span>
                  <span
                    className="font-body text-[0.75rem] font-normal transition-colors group-hover:text-[var(--text-light)]"
                    style={{ color: "var(--text-light-secondary)" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="font-body text-[0.6rem] font-light"
                    style={{ color: "var(--text-light-muted)" }}
                  >
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function DistilleryCard({
  region,
  name,
  address,
  hours,
  mapsUrl,
  embedSrc,
}: {
  region: string;
  name: string;
  address: string;
  hours: string;
  mapsUrl: string;
  embedSrc: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-sm border"
      style={{ borderColor: "var(--border-light)" }}
    >
      {/* Map embed */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8e0d5]">
        <iframe
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Carte — ${name}`}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="p-5 sm:p-6">
        <p
          className="mb-1 font-body text-[0.6rem] font-normal uppercase tracking-[0.25em]"
          style={{ color: "var(--color-accent-gold)" }}
        >
          {region}
        </p>
        <h3
          className="font-heading text-lg font-normal sm:text-xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-dark)",
          }}
        >
          {name}
        </h3>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              style={{ color: "var(--text-dark-muted)" }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
            </svg>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[0.8125rem] font-light underline transition-opacity hover:opacity-70"
              style={{ color: "var(--text-dark-secondary)" }}
            >
              {address}
            </a>
          </div>
          <div className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              style={{ color: "var(--text-dark-muted)" }}
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 11H7v-1h4.5V7h1v6z" />
            </svg>
            <span
              className="font-body text-[0.8125rem] font-light"
              style={{ color: "var(--text-dark-secondary)" }}
            >
              {hours}
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center border py-2.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-80"
            style={{
              borderColor: "var(--text-dark)",
              color: "var(--text-dark)",
            }}
          >
            Itinéraire
          </a>
          <Link
            href="/experiences"
            className="inline-flex flex-1 items-center justify-center py-2.5 font-body text-[0.65rem] font-normal uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--text-dark)",
              color: "var(--bg-cream)",
            }}
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
}

function B2BCard({
  region,
  detail,
  contact,
  href,
}: {
  region: string;
  detail: string;
  contact: string;
  href: string;
}) {
  return (
    <div
      className="rounded-sm border p-5 sm:p-6"
      style={{ borderColor: "var(--border-light)" }}
    >
      <p
        className="font-body text-[0.6rem] font-normal uppercase tracking-[0.25em]"
        style={{ color: "var(--color-accent-gold)" }}
      >
        {region}
      </p>
      <p
        className="mt-2 font-body text-[0.8125rem] font-light"
        style={{ color: "var(--text-dark-secondary)" }}
      >
        {detail}
      </p>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="mt-3 inline-flex items-center gap-1.5 font-body text-[0.78rem] font-light underline transition-opacity hover:opacity-70"
        style={{ color: "var(--text-dark)" }}
      >
        {contact}
        {href.startsWith("http") && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="opacity-40"
          >
            <path
              d="M3 1h6v6M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        )}
      </a>
    </div>
  );
}

function InputField({
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-sm border bg-transparent px-4 py-3.5 font-body text-[0.8125rem] font-light outline-none transition-colors focus:border-[var(--color-accent-gold)]"
      style={{
        borderColor: "var(--border-dark)",
        color: "var(--text-light)",
      }}
    />
  );
}
