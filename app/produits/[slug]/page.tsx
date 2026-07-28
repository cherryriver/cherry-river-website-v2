import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS_CATALOG, getProductBySlug, getAllSlugs, CATEGORY_LABELS } from "@/content/products-catalog";
import { getShelfForProduct, type ShelfId } from "@/lib/produits-shelves";
import cocktailVideos from "@/content/cocktail-videos.json";
import { ProductPageClient } from "./ProductPageClient";
import { CategorieWrapper } from "./CategorieWrapper";
import { SansAlcoolWrapper } from "./SansAlcoolWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, buildProductJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

/* ── Category routes ── */
const CATEGORY_ROUTES: Record<string, { title: string; subtitle: string; shelves: ShelfId[]; heroImage?: string; heroLogo?: string }> = {
  tous: {
    title: "Tous nos produits",
    subtitle: "Spiritueux artisanaux du Québec — distillés à Magog, pensés pour la mixologie et la dégustation.",
    shelves: ["gins", "vodkas", "tequila", "rhums", "whisky", "liqueurs", "collaborations", "canettes", "sans-alcool"],
  },
  gins: {
    title: "Nos Gins",
    subtitle: "Genièvre, baies canadiennes et botaniques — chaque gin raconte une histoire du terroir québécois.",
    shelves: ["gins"],
  },
  vodkas: {
    title: "Nos Vodkas",
    subtitle: "Pureté et finesse — distillées avec précision pour une expérience cristalline.",
    shelves: ["vodkas"],
  },
  tequila: {
    title: "Tequila",
    subtitle: "L'agave rencontre le savoir-faire québécois — caractère vif et minéral.",
    shelves: ["tequila"],
  },
  rhums: {
    title: "Nos Rhums",
    subtitle: "Chaleur des Caraïbes, savoir-faire québécois — ambré, épicé, authentique.",
    shelves: ["rhums"],
  },
  whisky: {
    title: "Whisky",
    subtitle: "Chêne grillé, vanille et caramel — le caractère d'un bourbon artisanal.",
    shelves: ["whisky"],
  },
  liqueurs: {
    title: "Nos Liqueurs",
    subtitle: "Arômes gourmands et élégants — parfaites en cocktail ou en digestif.",
    shelves: ["liqueurs"],
  },
  collaborations: {
    title: "Opemiska",
    subtitle: "Spiritueux boréaux créés avec Les 2Frères — l'esprit de la forêt québécoise.",
    shelves: ["collaborations"],
    heroImage: "/assets/brands/opemiska/Instagram_Opemiska_Brume01.jpg",
    heroLogo: "/assets/brands/opemiska/Logo_Opemiska_Blanc.png",
  },
  "sans-alcool": {
    title: "Sans Alcool",
    subtitle: "Toute la saveur, zéro alcool — mocktails et spiritueux sans compromis.",
    shelves: ["sans-alcool"],
  },
  canettes: {
    title: "Prêt-à-boire",
    subtitle: "Cocktails en canette, élaborés au Québec — prêts à déguster, partout, en tout temps.",
    shelves: ["canettes"],
  },
};

function isCategory(slug: string): boolean {
  return slug in CATEGORY_ROUTES;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const productSlugs = getAllSlugs().map((slug) => ({ slug }));
  const categorySlugs = Object.keys(CATEGORY_ROUTES).map((slug) => ({ slug }));
  return [...categorySlugs, ...productSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (isCategory(slug)) {
    const cat = CATEGORY_ROUTES[slug];
    return buildMetadata({
      title: `Cherry River — ${cat.title} | Distillerie Magog & Québec`,
      description: cat.subtitle,
      path: `/produits/${slug}`,
    });
  }

  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `Cherry River — ${product.name} | Distillerie Magog & Québec`,
    description: product.description,
    path: `/produits/${product.slug}`,
    ogImage: product.image || undefined,
  });
}

function getRelatedVideos(tags: string[], limit = 3) {
  const scored = cocktailVideos.videos.map((v) => {
    let score = 0;
    const desc = (v.description || "").toLowerCase();
    const title = v.title.toLowerCase();
    const primaryTag = (v as { primaryTag?: string }).primaryTag || "";

    for (const tag of tags) {
      const t = tag.toLowerCase();
      if (primaryTag.toLowerCase() === t) score += 10;
      if (title.includes(t)) score += 5;
      if (desc.includes(t)) score += 2;
      if (v.products?.some((p: { tag: string }) => p.tag.toLowerCase() === t)) score += 8;
    }
    return { video: v, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.video);
}

export default async function ProductOrCategoryPage({ params }: Props) {
  const { slug } = await params;

  /* ── Category page ── */
  if (isCategory(slug)) {
    const cat = CATEGORY_ROUTES[slug];
    const products = PRODUCTS_CATALOG.filter(
      (p) => p.image && cat.shelves.includes(getShelfForProduct(p)),
    );

    /* Sans-alcool gets a dedicated premium layout */
    if (slug === "sans-alcool") {
      return (
        <>
          <JsonLd data={buildBreadcrumbJsonLd([
            { name: "Produits", path: "/produits" },
            { name: cat.title, path: `/produits/${slug}` },
          ])} />
          <SansAlcoolWrapper products={products} />
        </>
      );
    }

    return (
      <>
        <JsonLd data={buildBreadcrumbJsonLd([
          { name: "Produits", path: "/produits" },
          { name: cat.title, path: `/produits/${slug}` },
        ])} />
        <CategorieWrapper
          title={cat.title}
          subtitle={cat.subtitle}
          products={products}
          heroImage={cat.heroImage}
          heroLogo={cat.heroLogo}
        />
      </>
    );
  }

  /* ── Product page ── */
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const categoryLabel = CATEGORY_LABELS[product.category];
  const relatedVideos = getRelatedVideos(product.videoMatchTags);

  const relatedProducts = PRODUCTS_CATALOG
    .filter((p) => p.slug !== product.slug && p.subcategory === product.subcategory && p.image)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Produits", path: "/produits" },
        { name: product.name, path: `/produits/${product.slug}` },
      ])} />
      <JsonLd data={buildProductJsonLd(product, categoryLabel)} />
      <ProductPageClient
        product={product}
        categoryLabel={categoryLabel}
        relatedVideos={relatedVideos}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
