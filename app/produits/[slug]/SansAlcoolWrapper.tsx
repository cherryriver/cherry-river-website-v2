"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/content/products-catalog";

const SansAlcoolPageClient = dynamic(
  () => import("./SansAlcoolPageClient").then((m) => m.SansAlcoolPageClient),
  {
    ssr: false,
    loading: () => (
      <main style={{ minHeight: "100vh", background: "#FAFAF8" }} />
    ),
  }
);

interface Props {
  products: Product[];
}

export function SansAlcoolWrapper({ products }: Props) {
  return <SansAlcoolPageClient products={products} />;
}
