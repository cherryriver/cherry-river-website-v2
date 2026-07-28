import type { Metadata } from "next";
import { FableChrome } from "@/components/fable/FableChrome";
import { FableCocktailCulture } from "@/components/fable/FableCocktailCulture";
import videosData from "@/content/cocktail-videos.json";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cherry River — Cocktail Culture | Distillerie Magog & Québec",
  description:
    "Recettes de cocktails en vidéo : cosmopolitan, amaretto sour, espresso martini et plus. Tutoriels mixologie avec les spiritueux Cherry River.",
  path: "/cocktail-culture",
  ogImage: `https://img.youtube.com/vi/${videosData.videos[0]?.videoId}/maxresdefault.jpg`,
});

const videoListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Recettes de cocktails Cherry River",
  description: "Tutoriels vidéo de mixologie avec les spiritueux Cherry River.",
  url: "https://cherryriver.ca/cocktail-culture",
  numberOfItems: videosData.videos.length,
  itemListElement: videosData.videos.slice(0, 20).map(
    (v: { videoId: string; title: string; description: string; thumbnail: string; duration: number }, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: (v.description || "").slice(0, 200),
        thumbnailUrl: v.thumbnail,
        contentUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.videoId}`,
        uploadDate: "2024-01-01",
        duration: v.duration ? `PT${Math.round(v.duration)}S` : undefined,
        publisher: {
          "@type": "Organization",
          name: "Distillerie Cherry River",
          url: "https://cherryriver.ca",
        },
      },
    }),
  ),
};

export default function CocktailCulturePage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Cocktail Culture", path: "/cocktail-culture" }])} />
      <JsonLd data={videoListJsonLd} />
      <FableChrome solidNav>
        <FableCocktailCulture />
      </FableChrome>
    </>
  );
}
