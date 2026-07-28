import type { Metadata } from "next";
import type { Product } from "@/content/products-catalog";
import type { Experience, Distillery } from "@/content/experiences-data";

const SITE_URL = "https://cherryriver.ca";
const SITE_NAME = "Cherry River — Distillerie";
const DEFAULT_OG_IMAGE = "/assets/lifestyle/Photo distillerie Magog/DSC_0838.JPG";
const LOCALE = "fr_CA";

export function buildMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${page.path}`;
  const enPath = page.path === "/" ? "/en" : `/en${page.path}`;
  const image = page.ogImage || DEFAULT_OG_IMAGE;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: page.title,
    description: page.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        "fr-CA": url,
        "en-CA": `${SITE_URL}${enPath}`,
        "x-default": url,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: LOCALE,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [imageUrl],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Distillerie Cherry River",
  alternateName: [
    "Cherry River",
    "Cherry River Distillerie",
    "Distillerie Québec Cherry River",
    "Cherry River Distillery",
    "Cherry River Spirits",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logos/cherry_river_logo.png`,
  description:
    "Spiritueux artisanaux des Cantons-de-l'Est — gin artisanal, rhum, vodka et cocktails élaborés à Magog et Québec. Visites guidées, dégustations et ateliers mixologie.",
  foundingDate: "2020",
  founders: [
    {
      "@type": "Person",
      name: "Francis Delage",
      jobTitle: "Président & Directeur technique",
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "120 rue des Pins",
      addressLocality: "Magog",
      addressRegion: "QC",
      postalCode: "J1X 1W7",
      addressCountry: "CA",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "1800 chemin Saint-Louis",
      addressLocality: "Québec",
      addressRegion: "QC",
      postalCode: "G1S",
      addressCountry: "CA",
    },
  ],
  sameAs: [
    "https://www.instagram.com/cherryriver.ca/",
    "https://www.facebook.com/distilleriecherryriver/",
    "https://www.tiktok.com/@cherryriver.ca",
    "https://www.youtube.com/@distilleriecherryriver",
  ],
  brand: [
    { "@type": "Brand", name: "Cherry River" },
    { "@type": "Brand", name: "Averse" },
    { "@type": "Brand", name: "Opemiska" },
    { "@type": "Brand", name: "Alister MacKenzie" },
    { "@type": "Brand", name: "The Thirst is Real" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@cherryriver.ca",
    contactType: "customer service",
    availableLanguage: ["French", "English"],
  },
};

export function buildLocalBusinessJsonLd(location: "magog" | "quebec") {
  const common = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Distillery"],
    parentOrganization: {
      "@type": "Organization",
      name: "Distillerie Cherry River",
      url: SITE_URL,
    },
    priceRange: "$$",
    servesCuisine: "Cocktails & Spiritueux",
    currenciesAccepted: "CAD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/cherryriver.ca/",
      "https://www.facebook.com/distilleriecherryriver/",
    ],
  };

  if (location === "magog") {
    return {
      ...common,
      "@id": `${SITE_URL}/distilleries/magog`,
      name: "Distillerie Cherry River — Magog",
      description:
        "Visite de distillerie à Magog — ancienne église anglicane de 1882, Cantons-de-l'Est. Visites guidées, dégustations de gin artisanal et bar à cocktails. Réservation en ligne.",
      url: `${SITE_URL}/distilleries`,
      telephone: "+1-819-XXX-XXXX",
      image: `${SITE_URL}/assets/lifestyle/Photo distillerie Magog/distillerie-magog-exterieur.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "120 rue des Pins",
        addressLocality: "Magog",
        addressRegion: "QC",
        postalCode: "J1X 1W7",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.267,
        longitude: -72.147,
      },
      hasMap: "https://www.google.com/maps/place/120+Rue+des+Pins,+Magog,+QC+J1X+1W7",
    };
  }

  return {
    ...common,
    "@id": `${SITE_URL}/distilleries/quebec`,
    name: "Distillerie Cherry River — Québec (Sillery)",
    description:
      "Distillerie artisanale à Québec, dans le Mémorial Hall historique de Sillery. Spiritueux artisanaux, cocktails, boutique, visites guidées et événements privés au cœur de la Capitale-Nationale.",
    url: `${SITE_URL}/distilleries`,
    telephone: "+1-418-XXX-XXXX",
    image: `${SITE_URL}/assets/lifestyle/Photos Québec boutique/distillerie-quebec-exterieur.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1800 chemin Saint-Louis",
      addressLocality: "Québec",
      addressRegion: "QC",
      postalCode: "G1S",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.779,
      longitude: -71.247,
    },
    hasMap: "https://www.google.com/maps/place/1800+Chemin+Saint-Louis,+Québec,+QC+G1S",
  };
}

export function buildProductJsonLd(product: Product, categoryLabel: string) {
  const imageUrl = product.image
    ? `${SITE_URL}${product.image}`
    : `${SITE_URL}/assets/logos/cherry_river_logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/produits/${product.slug}`,
    name: product.name,
    description: product.description,
    image: imageUrl,
    url: `${SITE_URL}/produits/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Cherry River",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Distillerie Cherry River",
      url: SITE_URL,
    },
    category: categoryLabel,
    ...(product.volume && {
      weight: {
        "@type": "QuantitativeValue",
        value: parseInt(product.volume),
        unitCode: "MLT",
        unitText: "ml",
      },
    }),
    ...(product.abv && {
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Alcool par volume",
        value: product.abv,
      },
    }),
    countryOfOrigin: {
      "@type": "Country",
      name: "Canada",
    },
    ...(product.saqUrl && {
      offers: {
        "@type": "Offer",
        url: product.saqUrl,
        availability: "https://schema.org/InStock",
        priceCurrency: "CAD",
        seller: {
          "@type": "Organization",
          name: "SAQ — Société des alcools du Québec",
        },
      },
    }),
  };
}

export function buildProductListJsonLd(
  products: Product[],
  categoryLabels: Record<string, string>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produits Cherry River",
    description: "L'ensemble des spiritueux, liqueurs, cocktails prêts-à-boire et mocktails de la Distillerie Cherry River.",
    url: `${SITE_URL}/produits`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${SITE_URL}/produits/${product.slug}`,
        name: product.name,
        description: product.description,
        url: `${SITE_URL}/produits/${product.slug}`,
        image: product.image
          ? `${SITE_URL}${product.image}`
          : `${SITE_URL}/assets/logos/cherry_river_logo.png`,
        brand: {
          "@type": "Brand",
          name: "Cherry River",
        },
        category: categoryLabels[product.category] || product.category,
      },
    })),
  };
}

function buildLocationRef(distillery: Distillery) {
  return {
    "@type": "Place",
    name: distillery.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: distillery.address,
      addressLocality: distillery.city,
      addressRegion: distillery.province,
      postalCode: distillery.postalCode,
      addressCountry: "CA",
    },
  };
}

export function buildExperienceEventsJsonLd(
  experiences: Experience[],
  distilleries: Distillery[]
) {
  const distilleriesMap = new Map(distilleries.map((d) => [d.id, d]));

  return experiences.map((exp) => {
    const locations = exp.locations
      .map((locId) => distilleriesMap.get(locId))
      .filter(Boolean) as Distillery[];

    const primaryLocation = locations[0];

    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "@id": `${SITE_URL}/experiences#${exp.id}`,
      name: `${exp.title} — Distillerie Cherry River`,
      description: exp.description,
      url: `${SITE_URL}/experiences`,
      image: exp.image.startsWith("http") ? exp.image : `${SITE_URL}${exp.image}`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      organizer: {
        "@type": "Organization",
        name: "Distillerie Cherry River",
        url: SITE_URL,
      },
      location: locations.length === 1
        ? buildLocationRef(primaryLocation)
        : locations.map(buildLocationRef),
      ...(exp.durationMinutes > 0 && {
        duration: `PT${exp.durationMinutes}M`,
      }),
      ...(exp.priceFrom !== null
        ? {
            offers: {
              "@type": "Offer",
              url: exp.stripeLink || `${SITE_URL}/experiences`,
              priceCurrency: "CAD",
              price: exp.priceFrom,
              availability: "https://schema.org/InStock",
              validFrom: "2025-01-01",
            },
          }
        : {
            isAccessibleForFree: false,
          }),
      maximumAttendeeCapacity: exp.maxGuests,
      inLanguage: ["fr", "en"],
    };
  });
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}
