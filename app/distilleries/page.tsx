import type { Metadata } from "next";
import { FableChrome } from "@/components/fable/FableChrome";
import { FableDistilleries } from "@/components/fable/FableDistilleries";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, buildLocalBusinessJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cherry River — Nos distilleries | Distillerie Magog & Québec",
  description:
    "Deux distilleries artisanales : église anglicane patrimoniale à Magog et Mémorial Hall à Québec. Horaires, adresses et réservation de visite.",
  path: "/distilleries",
  ogImage: "/assets/lifestyle/Photo distillerie Magog/DSC_0813.JPG",
});

export default function DistilleriesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Distilleries", path: "/distilleries" }])} />
      <JsonLd data={buildLocalBusinessJsonLd("magog")} />
      <JsonLd data={buildLocalBusinessJsonLd("quebec")} />
      <FableChrome>
        <FableDistilleries />
      </FableChrome>
    </>
  );
}
