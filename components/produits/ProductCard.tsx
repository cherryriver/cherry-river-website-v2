import Image from "next/image";
import Link from "next/link";
import { getScrapedProductImage } from "@/lib/product-images";

type Product = {
  slug: string;
  name: string;
  description?: string;
  tagline?: string;
  category?: string;
  isNew?: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  const href = `/produits/${product.slug}`;
  const imgSrc = getScrapedProductImage(product.slug);

  return (
    <article>
      <Link href={href} className="group block">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden"
          style={{ background: "#F2EDE4" }}
        >
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.isNew && (
            <span
              className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 font-body text-[0.5rem] font-normal uppercase tracking-[0.2em]"
              style={{ background: "#8B1A1A", color: "#fff" }}
            >
              Nouveau
            </span>
          )}
        </div>
        <div className="mt-4">
          <h3
            className="font-heading text-[1.05rem] font-normal leading-snug transition-colors duration-400 group-hover:text-[#8B1A1A] sm:text-lg"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            {product.name}
          </h3>
          {(product.tagline || product.description) && (
            <p
              className="mt-1 font-body text-[0.8rem] font-light leading-relaxed line-clamp-2"
              style={{ color: "#A89F94" }}
            >
              {product.tagline || product.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
