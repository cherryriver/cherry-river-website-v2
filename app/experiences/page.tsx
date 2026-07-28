import type { Metadata } from "next";
import { EXPERIENCES, DISTILLERIES } from "@/content/experiences-data";
import { FableChrome } from "@/components/fable/FableChrome";
import { FableExperiences } from "@/components/fable/FableExperiences";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, buildExperienceEventsJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cherry River — Expériences & visites guidées | Distillerie Magog & Québec",
  description:
    "Visites guidées dès 18$/personne à Magog et Québec. Ateliers mixologie, dégustations et événements corporatifs. Réservez en ligne.",
  path: "/experiences",
  ogImage: "/assets/lifestyle/Photo distillerie Magog/DSC_0813.JPG",
});

const experienceEvents = buildExperienceEventsJsonLd(EXPERIENCES, DISTILLERIES);

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Expériences", path: "/experiences" }])} />
      {experienceEvents.map((eventData, i) => (
        <JsonLd key={i} data={eventData} />
      ))}
      <FableChrome>
        <FableExperiences />
      </FableChrome>
    </>
  );
}
