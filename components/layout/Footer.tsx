import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  "Distilleries": [
    { label: "Magog", href: "/distilleries/magog" },
    { label: "Québec — Sillery", href: "/distilleries/quebec" },
  ],
  "Explorer": [
    { label: "Produits", href: "/produits" },
    { label: "Cocktail Culture", href: "/cocktail-culture" },
    { label: "Expériences", href: "/experiences" },
    { label: "Boutique", href: "/boutique" },
  ],
  "La Maison": [
    { label: "Notre histoire", href: "/la-maison" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="px-[var(--content-margin-x)] pb-10 pt-14 sm:pt-20" style={{ background: "#111111" }}>
      <div
        className="mx-auto mb-10 h-px sm:mb-16"
        style={{ maxWidth: "var(--content-max-width)", background: "rgba(201,168,76,0.15)" }}
        aria-hidden
      />

      <div
        className="mx-auto grid gap-8 sm:gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        <div>
          <Image
            src="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png"
            alt="Logo Cherry River — Distillerie artisanale"
            width={200}
            height={40}
            className="h-auto w-[160px]"
          />
          <p className="mt-6 max-w-xs font-body text-[0.85rem] font-light leading-relaxed" style={{ color: "#a89f94" }}>
            Boissons modernes élaborées au Québec. Deux distilleries, un univers de créations artisanales.
          </p>
          <p className="mt-6 font-body text-[0.7rem] font-light" style={{ color: "#6b6258" }}>
            Magog & Québec — Sillery
          </p>
        </div>

        <nav aria-label="Liens du pied de page" className="contents">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 font-body text-[0.7rem] font-normal uppercase tracking-[0.25em] sm:mb-6" style={{ color: "#C9A84C" }}>
                {heading}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-body text-[0.85rem] font-light transition-colors duration-300 hover:text-[#f0ebe4]"
                      style={{ color: "#a89f94" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div
        className="mx-auto mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:mt-20 md:flex-row"
        style={{ maxWidth: "var(--content-max-width)", borderColor: "rgba(201,168,76,0.15)" }}
      >
        <p className="font-body text-[0.7rem] font-light" style={{ color: "#6b6258" }}>
          © {new Date().getFullYear()} Distillerie Cherry River (9426-5964 Québec inc.)
        </p>
        <p className="font-body text-[0.65rem] font-light" style={{ color: "#6b6258" }}>
          La consommation d&apos;alcool est réservée aux personnes majeures.
        </p>
      </div>
    </footer>
  );
}
