const GOLD = "#C9A84C";

/** Adresse postale complète sur une seule chaîne (sans nom du commerce). */
export const DISTILLERY_ADDRESS_ONE_LINE = {
  magog: "120 rue des Pins, Magog, QC J1X 1W7",
  quebec: "1800 chem. Saint-Louis, Québec, QC G1S",
} as const;

type Slug = keyof typeof DISTILLERY_ADDRESS_ONE_LINE;

export function DistilleryPhotoAddressBlock({
  slug,
  className = "",
}: {
  slug: Slug;
  className?: string;
}) {
  const line = DISTILLERY_ADDRESS_ONE_LINE[slug];

  return (
    <div className={`text-center ${className}`}>
      <address
        className="not-italic mx-auto max-w-[min(100%,42rem)] font-body text-[0.8125rem] font-light leading-snug sm:text-[0.9375rem]"
        style={{ color: GOLD }}
      >
        {line}
      </address>
    </div>
  );
}
