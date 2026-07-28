import type { Metadata } from "next";
import { FableChrome } from "@/components/fable/FableChrome";
import { FableContact } from "@/components/fable/FableContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, buildLocalBusinessJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cherry River — Contact | Distillerie Magog & Québec",
  description:
    "Contactez la Distillerie Cherry River : réservations, événements corporatifs et distribution. Nos adresses à Magog et Québec.",
  path: "/contact",
  ogImage: "/assets/lifestyle/Photo distillerie Magog/MD-14.jpg",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <JsonLd data={buildLocalBusinessJsonLd("magog")} />
      <JsonLd data={buildLocalBusinessJsonLd("quebec")} />
      <FableChrome solidNav>
        <FableContact />
      </FableChrome>
    </>
  );
}
