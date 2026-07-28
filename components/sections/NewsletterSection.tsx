"use client";

import { useState, type FormEvent } from "react";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className="px-[var(--content-margin-x)] py-[var(--section-gap-cinematic)]"
      style={{ background: "#090909" }}
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <AnimateOnScroll>
          <p
            className="mb-5 font-body text-[0.65rem] font-normal uppercase tracking-[0.35em]"
            style={{ color: "#C9A84C" }}
          >
            Restez informé
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h2
            id="newsletter-heading"
            className="font-heading font-light"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.2,
              color: "#f0ebe4",
            }}
          >
            Recevez nos nouvelles créations
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p
            className="mx-auto mt-6 max-w-md font-body text-[0.9rem] font-light leading-relaxed"
            style={{ color: "#a89f94" }}
          >
            Nouvelles recettes, événements exclusifs et offres réservées aux
            initiés — directement dans votre boîte.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          {submitted ? (
            <div className="mt-12" role="status" aria-live="polite">
              <p
                className="font-heading text-lg font-normal italic"
                style={{ fontFamily: "var(--font-display)", color: "#C9A84C" }}
              >
                Merci — bienvenue dans l&apos;univers Cherry River.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 flex max-w-md flex-col gap-4 sm:flex-row sm:gap-0"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse courriel
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse courriel"
                className="flex-1 border-b bg-transparent px-0 py-3 font-body text-sm font-light outline-none transition-colors duration-300 placeholder:text-[#6b6258] focus:border-[#C9A84C]"
                style={{ borderColor: "rgba(201,168,76,0.2)", color: "#f0ebe4" }}
              />
              <button
                type="submit"
                className="w-full border-b px-6 py-3 font-body text-[0.7rem] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C] sm:w-auto"
                style={{ borderColor: "rgba(201,168,76,0.2)", color: "#f0ebe4" }}
              >
                S&apos;inscrire
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
