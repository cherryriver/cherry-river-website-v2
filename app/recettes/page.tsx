import type { Metadata } from "next";
import { FableRecettes } from "@/components/fable/FableRecettes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Recettes — Cocktail Culture | Cherry River",
  description:
    "Recettes de cocktails signées Cherry River : classiques revisités, techniques de mixologie et créations de saison en vidéo.",
  path: "/recettes",
});

export default function RecettesPage() {
  return <FableRecettes />;
}
