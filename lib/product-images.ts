/**
 * Map product slugs to scraped image filenames in /public/assets/images/scraped/products/
 * Used until PhotoRoom-processed images replace. Do not overwrite site-content.json.
 */
const SCRAPED_PRODUCTS_BASE = "/assets/images/scraped/products";

export const productImageBySlug: Record<string, string> = {
  "vodka-cerise": "15_vodka-cerises-cherry-river-1_carousel_800x1067.png",
  "vodka-erable": "16_vodka-erable-cherry-river_carousel_800x1067.png",
  "vodka-original-premium": "17_vodka-original-premium-cherry-river_carousel_800x1067.png",
  "rhum-epice": "14_rhum-epice-cherry-river_carousel_800x1067.png",
  "rhum-ambre": "13_rhum-ambre-cherry-river_carousel_800x1067.png",
  "bourbon-whiskey": "Bourbon-whiskey-cherry-river.png",
  "liqueur-amaretto": "09_liqueur-amaretto-cherry-river_carousel_800x1067.png",
  "liqueur-de-cafe": "10_liqueur-cafe-cherry-river_carousel_800x1067.png",
  "liqueur-dorange": "11_liqueur-orange-cherry-river_carousel_800x1067.png",
  "liqueur-de-vanille": "12_liqueur-vanille-cherry-river_carousel_800x1067.png",
  "creme-alcoolisee-coaticook": "12_liqueur-vanille-cherry-river_carousel_800x1067.png", // placeholder until PhotoRoom
  "gin-pamplemousse-rose": "07_gin-pamplemousse-rose-750ml-fruits_carousel_800x1067.png",
  "gin-litchi-tangerine": "06_gin-litchi-tangerine-750ml-fruits_carousel_800x1067.png",
  "gin-lime-gingembre": "05_gin-lime-gingembre-750ml-fruits_carousel_800x1067.png",
  "gin-framboise-lime": "04_gin-framboise-lime-750ml-fruits_carousel_800x1067.png",
  "gin-floral": "03_gin-floral-750ml-fleurs_carousel_800x1067.png",
  "dry-gin": "02_dry-gin-cherry-river-750ml-scaled_carousel_800x1067.png",
  "gin-petits-fruits-basilic": "08_gin-petits-fruits-basilic-750ml-fruits_carousel_800x1067.png",
  "tequila-silver": "tequila-silver-cherry-river.png",
};

export function getScrapedProductImage(slug: string): string {
  const filename = productImageBySlug[slug];
  if (filename) return `${SCRAPED_PRODUCTS_BASE}/${filename}`;
  return `${SCRAPED_PRODUCTS_BASE}/02_dry-gin-cherry-river-750ml-scaled_carousel_800x1067.png`; // fallback
}
