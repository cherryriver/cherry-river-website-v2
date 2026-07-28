import type { Metadata } from "next";
import { FableChrome } from "@/components/fable/FableChrome";
import { FableLaMaison } from "@/components/fable/FableLaMaison";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cherry River — La Maison | Distillerie Magog & Québec",
  description:
    "L'histoire de la Distillerie Cherry River à Magog. Nos marques : Cherry River, Averse, Opemiska et Alister MacKenzie.",
  path: "/la-maison",
  ogImage: "/assets/lifestyle/Photo distillerie Magog/DSC_0862.JPG",
});

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "La Maison Cherry River",
  description:
    "L'histoire et la vision de la Distillerie Cherry River. Spiritueux artisanaux des Cantons-de-l'Est, distillés à Magog et Québec depuis une église anglicane de 1882.",
  url: "https://cherryriver.ca/la-maison",
  mainEntity: {
    "@type": "Organization",
    name: "Distillerie Cherry River",
    url: "https://cherryriver.ca",
    foundingDate: "2020",
    foundingLocation: {
      "@type": "Place",
      name: "Magog, Cantons-de-l'Est, Québec",
    },
    brand: [
      { "@type": "Brand", name: "Cherry River" },
      { "@type": "Brand", name: "Averse" },
      { "@type": "Brand", name: "Opemiska" },
      { "@type": "Brand", name: "Alister MacKenzie" },
      { "@type": "Brand", name: "The Thirst is Real" },
    ],
  },
};

export default function LaMaisonPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "La Maison", path: "/la-maison" }])} />
      <JsonLd data={aboutPageJsonLd} />
      <FableChrome>
        <FableLaMaison />
      </FableChrome>
    </>
  );
}
