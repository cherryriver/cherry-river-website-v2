"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { Experience, Distillery } from "@/content/experiences-data";
import { AVAILABLE_TIMES } from "@/content/experiences-data";

interface Props {
  experience: Experience;
  distilleries: Distillery[];
  onClose: () => void;
}

type Step = "details" | "confirm";

/* ------------------------------------------------------------------ */
/*  Calendar helpers                                                   */
/* ------------------------------------------------------------------ */

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const WEEKDAY_HEADERS = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BookingModal({ experience, distilleries, onClose }: Props) {
  const [step, setStep] = useState<Step>("details");

  /* Form state */
  const [location, setLocation] = useState<"magog" | "quebec">(
    experience.locations[0]
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* Calendar state */
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const canProceed =
    selectedDate !== null &&
    selectedTime !== null &&
    name.trim().length > 0 &&
    email.trim().length > 0;

  const totalPrice = experience.priceFrom
    ? experience.priceFrom * groupSize
    : null;

  const handleCheckout = useCallback(() => {
    /* In production, this would POST to /api/checkout which creates a
       Stripe Checkout Session with the booking details embedded as metadata.
       For now, we redirect to Stripe's test checkout. */
    const params = new URLSearchParams({
      experience: experience.id,
      location,
      date: selectedDate?.toISOString().split("T")[0] || "",
      time: selectedTime || "",
      guests: groupSize.toString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });

    /* Placeholder: redirect to a Stripe Payment Link or API route */
    window.location.href = `/api/checkout?${params.toString()}`;
  }, [
    experience.id,
    location,
    selectedDate,
    selectedTime,
    groupSize,
    name,
    email,
    phone,
  ]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 mx-4 flex max-h-[92vh] w-full max-w-[640px] flex-col overflow-hidden rounded-sm"
        style={{ background: "var(--bg-cream)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-6 py-4 sm:px-8 sm:py-5"
          style={{ borderColor: "var(--border-light)" }}
        >
          <div>
            <p
              className="font-body text-[0.6rem] font-normal uppercase tracking-[0.25em]"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Réservation
            </p>
            <h2
              className="mt-1 font-heading text-xl font-normal sm:text-2xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-dark)",
              }}
            >
              {experience.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5"
            style={{ color: "var(--text-dark-muted)" }}
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
          {step === "details" && (
            <div className="space-y-7">
              {/* Location selector */}
              {experience.locations.length > 1 && (
                <fieldset>
                  <legend
                    className="mb-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    Distillerie
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {experience.locations.map((loc) => {
                      const d = distilleries.find((dd) => dd.id === loc);
                      const isActive = location === loc;
                      return (
                        <button
                          key={loc}
                          onClick={() => setLocation(loc)}
                          className="rounded-sm border p-3 text-left transition-all duration-200 sm:p-4"
                          style={{
                            borderColor: isActive
                              ? "var(--color-accent-gold)"
                              : "var(--border-light)",
                            background: isActive
                              ? "rgba(201,168,76,0.06)"
                              : "transparent",
                          }}
                        >
                          <p
                            className="font-body text-[0.75rem] font-normal"
                            style={{
                              color: isActive
                                ? "var(--text-dark)"
                                : "var(--text-dark-secondary)",
                            }}
                          >
                            {d?.shortName || loc}
                          </p>
                          <p
                            className="mt-0.5 font-body text-[0.65rem] font-light"
                            style={{ color: "var(--text-dark-muted)" }}
                          >
                            {d?.address}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {/* Calendar */}
              <fieldset>
                <legend
                  className="mb-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  Date
                </legend>
                <div
                  className="rounded-sm border p-4"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  {/* Month nav */}
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      onClick={prevMonth}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                      style={{ color: "var(--text-dark-secondary)" }}
                      aria-label="Mois précédent"
                    >
                      ‹
                    </button>
                    <span
                      className="font-body text-[0.8rem] font-normal"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {MONTH_NAMES[viewMonth]} {viewYear}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                      style={{ color: "var(--text-dark-secondary)" }}
                      aria-label="Mois suivant"
                    >
                      ›
                    </button>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1">
                    {WEEKDAY_HEADERS.map((d) => (
                      <div
                        key={d}
                        className="py-1 text-center font-body text-[0.6rem] font-normal uppercase tracking-wider"
                        style={{ color: "var(--text-dark-muted)" }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells before first day */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const date = new Date(viewYear, viewMonth, day);
                      const past = isBeforeToday(date);
                      const selected =
                        selectedDate !== null && isSameDay(date, selectedDate);
                      const isToday = isSameDay(date, today);

                      return (
                        <button
                          key={day}
                          disabled={past}
                          onClick={() => setSelectedDate(date)}
                          className="relative flex h-9 items-center justify-center rounded-sm font-body text-[0.75rem] transition-all duration-200 sm:h-10"
                          style={{
                            color: past
                              ? "var(--text-dark-muted)"
                              : selected
                                ? "var(--text-dark)"
                                : "var(--text-dark-secondary)",
                            background: selected
                              ? "var(--color-accent-gold)"
                              : "transparent",
                            opacity: past ? 0.35 : 1,
                            cursor: past ? "default" : "pointer",
                            fontWeight: selected ? 500 : 300,
                          }}
                        >
                          {day}
                          {isToday && !selected && (
                            <span
                              className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full"
                              style={{
                                background: "var(--color-accent-gold)",
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </fieldset>

              {/* Time selector */}
              <fieldset>
                <legend
                  className="mb-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  Heure
                </legend>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TIMES.map((t) => {
                    const isActive = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="rounded-sm border px-3.5 py-2 font-body text-[0.72rem] transition-all duration-200"
                        style={{
                          borderColor: isActive
                            ? "var(--color-accent-gold)"
                            : "var(--border-light)",
                          background: isActive
                            ? "rgba(201,168,76,0.06)"
                            : "transparent",
                          color: isActive
                            ? "var(--text-dark)"
                            : "var(--text-dark-secondary)",
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Group size */}
              <fieldset>
                <legend
                  className="mb-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  Nombre de personnes
                </legend>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGroupSize((g) => Math.max(1, g - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-sm border font-body text-lg transition-colors hover:bg-black/5"
                    style={{
                      borderColor: "var(--border-light)",
                      color: "var(--text-dark-secondary)",
                    }}
                  >
                    −
                  </button>
                  <span
                    className="min-w-[3rem] text-center font-heading text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {groupSize}
                  </span>
                  <button
                    onClick={() =>
                      setGroupSize((g) =>
                        Math.min(experience.maxGuests, g + 1)
                      )
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-sm border font-body text-lg transition-colors hover:bg-black/5"
                    style={{
                      borderColor: "var(--border-light)",
                      color: "var(--text-dark-secondary)",
                    }}
                  >
                    +
                  </button>
                  <span
                    className="font-body text-[0.7rem] font-light"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    max {experience.maxGuests}
                  </span>
                </div>
              </fieldset>

              {/* Contact info */}
              <fieldset className="space-y-3">
                <legend
                  className="mb-3 font-body text-[0.65rem] font-normal uppercase tracking-[0.2em]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  Vos coordonnées
                </legend>
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border px-4 py-3 font-body text-[0.8125rem] font-light outline-none transition-colors focus:border-[var(--color-accent-gold)]"
                  style={{
                    borderColor: "var(--border-light)",
                    color: "var(--text-dark)",
                    background: "transparent",
                  }}
                />
                <input
                  type="email"
                  placeholder="Courriel"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border px-4 py-3 font-body text-[0.8125rem] font-light outline-none transition-colors focus:border-[var(--color-accent-gold)]"
                  style={{
                    borderColor: "var(--border-light)",
                    color: "var(--text-dark)",
                    background: "transparent",
                  }}
                />
                <input
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-sm border px-4 py-3 font-body text-[0.8125rem] font-light outline-none transition-colors focus:border-[var(--color-accent-gold)]"
                  style={{
                    borderColor: "var(--border-light)",
                    color: "var(--text-dark)",
                    background: "transparent",
                  }}
                />
              </fieldset>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-5">
              <SummaryRow label="Expérience" value={experience.title} />
              <SummaryRow
                label="Distillerie"
                value={
                  distilleries.find((d) => d.id === location)?.shortName || ""
                }
              />
              <SummaryRow
                label="Date"
                value={
                  selectedDate
                    ? selectedDate.toLocaleDateString("fr-CA", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""
                }
              />
              <SummaryRow label="Heure" value={selectedTime || ""} />
              <SummaryRow
                label="Personnes"
                value={groupSize.toString()}
              />
              <SummaryRow label="Nom" value={name} />
              <SummaryRow label="Courriel" value={email} />
              {phone && <SummaryRow label="Téléphone" value={phone} />}

              <div
                className="mt-6 rounded-sm border p-4"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  background: "rgba(201,168,76,0.04)",
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-body text-[0.7rem] font-normal uppercase tracking-[0.15em]"
                    style={{ color: "var(--text-dark-secondary)" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-heading text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {totalPrice
                      ? `${totalPrice.toFixed(2).replace(".", ",")} $`
                      : "Sur mesure"}
                  </span>
                </div>
                {totalPrice && (
                  <p
                    className="mt-1 text-right font-body text-[0.65rem] font-light"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    {experience.priceFrom}$ × {groupSize} personne
                    {groupSize > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <p
                className="mt-4 font-body text-[0.7rem] font-light leading-relaxed"
                style={{ color: "var(--text-dark-muted)" }}
              >
                En cliquant « Payer », vous serez redirigé vers Stripe pour
                compléter votre paiement de façon sécurisée. Un courriel de
                confirmation vous sera envoyé.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="border-t px-6 py-4 sm:px-8 sm:py-5"
          style={{
            borderColor: "var(--border-light)",
            background: "rgba(0,0,0,0.02)",
          }}
        >
          {step === "details" && (
            <div className="flex items-center justify-between">
              {totalPrice && (
                <div>
                  <span
                    className="font-heading text-xl font-light"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {totalPrice.toFixed(2).replace(".", ",")} $
                  </span>
                  <span
                    className="ml-2 font-body text-[0.65rem] font-light"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    total
                  </span>
                </div>
              )}
              <button
                onClick={() => setStep("confirm")}
                disabled={!canProceed}
                className="ml-auto px-8 py-3 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  background: canProceed
                    ? "var(--color-accent-gold)"
                    : "var(--border-light)",
                  color: canProceed
                    ? "var(--text-dark)"
                    : "var(--text-dark-muted)",
                  cursor: canProceed ? "pointer" : "not-allowed",
                }}
              >
                Continuer
              </button>
            </div>
          )}

          {step === "confirm" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("details")}
                className="px-6 py-3 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
                style={{ color: "var(--text-dark-secondary)" }}
              >
                Modifier
              </button>
              <button
                onClick={handleCheckout}
                className="ml-auto flex items-center gap-2 px-8 py-3 font-body text-[0.68rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90"
                style={{
                  background: "var(--color-accent-gold)",
                  color: "var(--text-dark)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M12 2a5 5 0 015 5v3H7V7a5 5 0 015-5zm-7 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
                    fill="currentColor"
                  />
                </svg>
                Payer avec Stripe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Summary Row                                                        */
/* ------------------------------------------------------------------ */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span
        className="shrink-0 font-body text-[0.65rem] font-normal uppercase tracking-[0.15em]"
        style={{ color: "var(--text-dark-muted)" }}
      >
        {label}
      </span>
      <span
        className="text-right font-body text-[0.8125rem] font-light"
        style={{ color: "var(--text-dark)" }}
      >
        {value}
      </span>
    </div>
  );
}
