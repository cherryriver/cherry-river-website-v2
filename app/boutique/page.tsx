import type { Metadata } from "next";
import { Suspense } from "react";
import { FableBoutique } from "@/components/fable/FableBoutique";
import { CartProvider, CartUI } from "@/components/fable/FableCart";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Boutique — L'attirail du barman | Cherry River",
  description:
    "Shakers, doseurs, verrerie et outils gravés Cherry River, mocktails sans alcool et sirops artisanaux. Commande en ligne, cueillette à Magog ou livraison au Québec.",
  path: "/boutique",
});

export default function BoutiquePage() {
  return (
    <CartProvider>
      <Suspense>
        <FableBoutique />
      </Suspense>
      <CartUI />
    </CartProvider>
  );
}
