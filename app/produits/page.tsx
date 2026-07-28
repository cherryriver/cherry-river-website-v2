import type { Metadata } from "next";
import { Suspense } from "react";
import { FableProduits } from "@/components/fable/FableProduits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nos créations — Cherry River | Gins, rhums, vodkas & prêts-à-boire",
  description:
    "Découvrez les créations Cherry River : gins signatures, rhums, vodkas, tequila, liqueurs, crèmes et prêts-à-boire élaborés à Magog, Québec.",
  path: "/produits",
});

export default function ProduitsPage() {
  return (
    <Suspense>
      <FableProduits />
    </Suspense>
  );
}
