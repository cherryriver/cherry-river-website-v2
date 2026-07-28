import type { Metadata } from "next";
import { FableChrome } from "@/components/fable/FableChrome";
import { FableHome } from "@/components/fable/FableHome";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cherry River — Distillerie artisanale à Magog & Québec",
  description:
    "Distillerie artisanale à Magog et Québec. Gins, rhums, vodkas, cocktails prêts-à-boire et mocktails. Visites guidées et ateliers mixologie.",
  path: "/",
  ogImage: "/assets/lifestyle/Photo distillerie Magog/DSC_0838.JPG",
});

export default function HomePage() {
  return (
    <FableChrome home>
      <FableHome />
    </FableChrome>
  );
}
