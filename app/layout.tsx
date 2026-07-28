import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  Cormorant_Garamond,
  DM_Mono,
  DM_Sans,
  Figtree,
  Inter_Tight,
  Raleway,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FableMobileNav } from "@/components/fable/FableMobileNav";
import { LegacyChromeGate } from "@/components/fable/LegacyChromeGate";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { isBackgroundVariant, VARIANT } from "@/lib/design-variants";
import { organizationJsonLd } from "@/lib/seo";

const fontVariants = ["brandon", "classic", "raleway", "dm-sans", "founders"] as const;

type FontVariant = (typeof fontVariants)[number];

function getFontVariant(value: string | undefined): FontVariant {
  return fontVariants.includes(value as FontVariant) ? (value as FontVariant) : "brandon";
}

function getLightTheme(value: string | undefined) {
  return isBackgroundVariant(value) ? value : VARIANT.background;
}

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const brandonGrotesque = localFont({
  src: [
    { path: "../public/fonts/BrandonGrotesque-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/BrandonGrotesque-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-brandon",
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const fontVariantConfig: Record<
  FontVariant,
  {
    className: string;
    display: string;
    body: string;
    displayWeight: number;
    bodyWeight: number;
    displayTracking: string;
  }
> = {
  brandon: {
    className: `${brandonGrotesque.variable} ${figtree.variable}`,
    display: "var(--font-brandon)",
    body: "var(--font-figtree)",
    displayWeight: 700,
    bodyWeight: 400,
    displayTracking: "-0.02em",
  },
  classic: {
    className: `${cormorant.variable} ${dmMono.variable}`,
    display: "var(--font-cormorant)",
    body: "var(--font-dm-mono)",
    displayWeight: 300,
    bodyWeight: 300,
    displayTracking: "normal",
  },
  raleway: {
    className: `${cormorant.variable} ${raleway.variable}`,
    display: "var(--font-cormorant)",
    body: "var(--font-raleway)",
    displayWeight: 300,
    bodyWeight: 300,
    displayTracking: "normal",
  },
  "dm-sans": {
    className: dmSans.variable,
    display: "var(--font-dm-sans)",
    body: "var(--font-dm-sans)",
    displayWeight: 500,
    bodyWeight: 300,
    displayTracking: "normal",
  },
  founders: {
    className: interTight.variable,
    display: "'Founders Grotesk', var(--font-inter-tight)",
    body: "'Founders Grotesk', var(--font-inter-tight)",
    displayWeight: 500,
    bodyWeight: 300,
    displayTracking: "-0.03em",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cherryriver.ca"),
  title: {
    default: "Cherry River — Distillerie artisanale | Distillerie Magog & Québec",
    template: "%s",
  },
  description:
    "Distillerie artisanale à Magog et Québec. Gins, rhums, vodkas, cocktails prêts-à-boire et mocktails. Visites guidées et ateliers mixologie.",
  keywords: [
    "Cherry River",
    "Cherry River distillerie",
    "distillerie Cherry River",
    "distillerie artisanale",
    "distillerie artisanale Québec",
    "distillerie Magog",
    "distillerie Québec",
    "distillerie Québec visite",
    "distillerie Cantons-de-l'Est",
    "spiritueux Cantons-de-l'Est",
    "alcool artisanal Cantons-de-l'Est",
    "gin artisanal québécois",
    "gin artisanal Québec",
    "gin québécois",
    "gin Cantons-de-l'Est",
    "meilleur gin Québec",
    "rhum québécois",
    "vodka québécoise",
    "cocktail prêt à boire",
    "cocktails prêts-à-boire",
    "cocktail prêt à boire Québec",
    "canette cocktail Québec",
    "RTD Québec",
    "spiritueux québécois",
    "mocktails sans alcool",
    "visite distillerie Magog",
    "visite distillerie Québec",
    "visite guidée distillerie",
    "réserver visite distillerie Magog",
    "atelier mixologie Québec",
    "atelier mixologie Magog",
    "dégustation spiritueux",
    "dégustation gin Magog",
    "Opemiska gin boréal",
    "Averse vodka",
    "acheter gin Québec",
    "SAQ Cherry River",
    "recette cocktail gin",
    "événement corporatif distillerie",
  ],
  authors: [{ name: "Distillerie Cherry River", url: "https://cherryriver.ca" }],
  creator: "Distillerie Cherry River",
  publisher: "Distillerie Cherry River",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    languages: {
      "fr-CA": "https://cherryriver.ca",
      "en-CA": "https://cherryriver.ca/en",
      "x-default": "https://cherryriver.ca",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    alternateLocale: "en_CA",
    siteName: "Cherry River — Distillerie",
    images: [
      {
        url: "/assets/logos/cherry_river_logo.png",
        width: 1200,
        height: 630,
        alt: "Cherry River — Distillerie artisanale, Magog & Québec",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/logos/cherry_river_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "GOOGLE_VERIFICATION_CODE",
    // yandex: "YANDEX_VERIFICATION_CODE",
  },
  other: {
    "theme-color": "#090909",
    "msapplication-TileColor": "#090909",
    "apple-mobile-web-app-title": "Cherry River",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const backgroundCookie = cookieStore.get("cr-bg")?.value;
  const background = isBackgroundVariant(backgroundCookie)
    ? backgroundCookie
    : VARIANT.background;
  const fontVariant = getFontVariant(process.env.NEXT_PUBLIC_FONT_VARIANT);
  const lightTheme = getLightTheme(process.env.NEXT_PUBLIC_LIGHT_THEME);
  const fontConfig = fontVariantConfig[fontVariant];

  return (
    <html
      lang="fr"
      data-font-variant={fontVariant}
      data-light-theme={lightTheme}
      data-bg={background}
      className={fontConfig.className}
      style={
        {
          "--font-display": fontConfig.display,
          "--font-body": fontConfig.body,
          "--font-display-weight": fontConfig.displayWeight,
          "--font-body-weight": fontConfig.bodyWeight,
          "--font-display-tracking": fontConfig.displayTracking,
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        {/* Preload hero video poster for faster LCP */}
        <link
          rel="preload"
          href="/assets/brands/cherry-river/Instagram_Cherry_River_Barils.jpg"
          as="image"
        />
        {/* Preload hero logo (LCP candidate) */}
        <link
          rel="preload"
          href="/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png"
          as="image"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-body" suppressHydrationWarning>
        <SmoothScroll />
        <FableMobileNav />
        <JsonLd data={organizationJsonLd} />
        <LegacyChromeGate>
          <NavigationWrapper />
        </LegacyChromeGate>
        <main className="flex-1">{children}</main>
        <LegacyChromeGate>
          <Footer />
        </LegacyChromeGate>
      </body>
    </html>
  );
}
