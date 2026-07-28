"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/content/products-catalog";

const CategoriePageClient = dynamic(
  () => import("./CategoriePageClient").then((m) => m.CategoriePageClient),
  {
    ssr: false,
    loading: () => (
      <main style={{ minHeight: "100vh", background: "#FAFAF8" }} />
    ),
  }
);

interface Props {
  title: string;
  subtitle: string;
  products: Product[];
  heroImage?: string;
  heroLogo?: string;
}

export function CategorieWrapper({ title, subtitle, products, heroImage, heroLogo }: Props) {
  return <CategoriePageClient title={title} subtitle={subtitle} products={products} heroImage={heroImage} heroLogo={heroLogo} />;
}
