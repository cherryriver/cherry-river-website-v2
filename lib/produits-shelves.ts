import type { Product } from "@/content/products-catalog";
import { getScrapedProductImage } from "@/lib/product-images";

export type ShelfId =
  | "gins"
  | "vodkas"
  | "tequila"
  | "rhums"
  | "whisky"
  | "liqueurs"
  | "collaborations"
  | "canettes"
  | "sans-alcool";

export const SHELF_DISPLAY_ORDER: ShelfId[] = [
  "gins",
  "vodkas",
  "tequila",
  "rhums",
  "whisky",
  "liqueurs",
  "collaborations",
  "canettes",
  "sans-alcool",
];

const SHELF_LABELS: Record<ShelfId, string> = {
  gins: "Gins",
  vodkas: "Vodkas",
  tequila: "Tequila",
  rhums: "Rhums",
  whisky: "Whisky",
  liqueurs: "Liqueurs",
  collaborations: "Collaborations",
  canettes: "Canettes",
  "sans-alcool": "Sans alcool",
};

const SHELF_MATCH_PRIORITY: ShelfId[] = [
  "collaborations",
  "sans-alcool",
  "canettes",
  "gins",
  "vodkas",
  "tequila",
  "rhums",
  "whisky",
  "liqueurs",
];

function shelfTest(id: ShelfId, p: Product): boolean {
  switch (id) {
    case "collaborations":
      return p.category === "collaboration" || p.category === "opemiska";
    case "sans-alcool":
      return p.category === "mocktail";
    case "canettes":
      return p.category === "rtd";
    case "gins":
      if (p.category === "mocktail" || p.category === "collaboration" || p.category === "opemiska") return false;
      return p.subcategory === "gin";
    case "vodkas":
      return p.subcategory === "vodka" && p.category !== "collaboration";
    case "tequila":
      return p.subcategory === "tequila";
    case "rhums":
      return p.subcategory === "rhum";
    case "whisky":
      return p.subcategory === "bourbon";
    case "liqueurs":
      return p.category === "liqueur";
    default:
      return false;
  }
}

export function getShelfForProduct(p: Product): ShelfId {
  for (const id of SHELF_MATCH_PRIORITY) {
    if (shelfTest(id, p)) return id;
  }
  return "liqueurs";
}

export function groupProductsByShelf(products: Product[]): Map<ShelfId, Product[]> {
  const map = new Map<ShelfId, Product[]>();
  for (const id of SHELF_DISPLAY_ORDER) {
    map.set(id, []);
  }
  for (const p of products) {
    const id = getShelfForProduct(p);
    map.get(id)!.push(p);
  }
  return map;
}

export function getShelvesForNav(): { id: ShelfId; label: string }[] {
  return SHELF_DISPLAY_ORDER.map((id) => ({ id, label: SHELF_LABELS[id] }));
}

const SLUG_IMAGE_ALIASES: Record<string, string> = {
  "vodka-averse-premium": "vodka-original-premium",
  "liqueur-cafe": "liqueur-de-cafe",
  "liqueur-orange": "liqueur-dorange",
  "liqueur-vanille": "liqueur-de-vanille",
  "creme-coaticook": "liqueur-de-vanille",
};

export function getCatalogProductImage(p: Product): string {
  if (p.image) return p.image;
  const slug = SLUG_IMAGE_ALIASES[p.slug] ?? p.slug;
  return getScrapedProductImage(slug);
}

export function getProductBrandBadge(p: Product): string {
  if (p.category === "collaboration" || p.category === "opemiska") {
    const hay = `${p.name} ${p.slug}`.toLowerCase();
    if (hay.includes("opemiska")) return "Opemiska";
    if (hay.includes("thirst") || hay.includes("tropical")) return "The Thirst is Real";
    if (hay.includes("coaticook")) return "Coaticook";
    if (hay.includes("alister") || hay.includes("mackenzie")) return "Alister MacKenzie";
  }
  const hay = `${p.name} ${p.slug}`.toLowerCase();
  if (hay.includes("averse")) return "Averse";
  return "Cherry River";
}
