/**
 * Sellable items for the Fable boutique.
 * All data verbatim from content/boutique-catalog.ts (WooCommerce-derived
 * source of truth — real names, prices and image paths).
 * Engraved-accessory VARIANTS in the main grid inherit the price of their
 * base product (Shaker Boston 34.99 / Jigger 18.99) — flagged for Francis
 * to confirm before launch. Unpriced accessories are display-only.
 */

export interface ShopItem {
  slug: string;
  name: string;
  price: number;
  image: string | null;
  volume?: string;
}

// Prices by Fable accessory category (base products in boutique-catalog):
export const ACCESSORY_PRICES: Record<string, number> = {
  Shaker: 34.99,
  Doseur: 18.99,
};

// À emporter — sans alcool & sirops
export const TAKEAWAY_ITEMS: ShopItem[] = [
  { slug: "b-gin-sans-alcool", name: "Gin Petits Fruits Sans Alcool", price: 29.99, image: "/assets/products/CR_Gin_Berries_SANS_ALCOOL_750mL.png", volume: "750 ml" },
  { slug: "b-amaretto-sour-sa", name: "Amaretto Sour Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_AmarettoSour_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-cosmo-sa", name: "Cosmopolitan Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_Cosmo_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-margarita-sa", name: "Margarita Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_Margarita_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-melon-eau-lime-sa", name: "Melon, Eau & Lime Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_MelonEauLime_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-mojito-sa", name: "Mojito Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_Mojito_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-orange-sanguine-sa", name: "Orange Sanguine Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_OrangeSanguine_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-sangria-rouge-sa", name: "Sangria Rouge Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_SangriaRouge_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-paloma-sa", name: "Mocktail Paloma Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_MocktailPaloma_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-petits-fruits-sa", name: "Mocktail Petits Fruits Sans Alcool", price: 3.49, image: "/assets/products/cans-na/CR_MocktailPetitsFruits_355mL_SANS_ALCOOL_FRAN.png", volume: "355 ml" },
  { slug: "b-sirop-simple", name: "Sirop Simple Cherry River", price: 12.99, image: null, volume: "500 ml" },
  { slug: "b-sirop-gingembre", name: "Sirop de Gingembre", price: 14.99, image: null, volume: "500 ml" },
  { slug: "b-coffret-decouverte", name: "Coffret Découverte Gin", price: 49.99, image: null },
];
