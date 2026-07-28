/**
 * Lifestyle image mapping by product subcategory.
 * Returns 3 images for the mosaic + 1 for the editorial section.
 * Falls back to general Cherry River photos when no category match.
 *
 * All curated photos: /assets/lifestyle/curated/
 */

type LifestyleSet = {
  mosaic: [string, string, string];
  editorial: string;
};

const C = "/assets/lifestyle/curated";

const GIN_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/gin-petits-fruits-basilic.png`,
    `${C}/gin-glacons-marbre.png`,
    `${C}/gin-pamplemousse-piscine.png`,
  ],
  editorial: `${C}/mixologie-gin-framboise-ginger.png`,
};

const VODKA_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/cocktail-cosmopolitan-marbre.png`,
    `${C}/cocktails-blancs-cuir.png`,
    `${C}/cocktail-orange-grenade.png`,
  ],
  editorial: `${C}/cocktails-martini-bleuets.png`,
};

const RHUM_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/rhum-epice-cafe-1.png`,
    `${C}/rhum-epice-canape.png`,
    `${C}/rhum-ambre-tiki-tropical.png`,
  ],
  editorial: `${C}/rhum-epice-cafe-2.png`,
};

const TEQUILA_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/cocktail-bar-rose-lime.png`,
    `${C}/cocktail-bar-rose-close.png`,
    `${C}/cocktail-bar-romarin.png`,
  ],
  editorial: `${C}/cocktail-orange-grenade.png`,
};

const LIQUEUR_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/cocktails-pamplemousse-editorial.png`,
    `${C}/cocktails-petits-fruits.png`,
    `${C}/cocktails-terrasse-livre.png`,
  ],
  editorial: `${C}/cocktails-martini-bleuets.png`,
};

const BOURBON_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/mixologie-opemiska-whisky.png`,
    `${C}/cocktail-bar-romarin.png`,
    `${C}/cocktails-blancs-cuir.png`,
  ],
  editorial: `${C}/mixologie-opemiska-whisky.png`,
};

const COLLABORATION_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/opemiska-gin-boreal-lifestyle.png`,
    `${C}/mixologie-opemiska-whisky.png`,
    `${C}/rhum-ambre-tiki-tropical.png`,
  ],
  editorial: `${C}/opemiska-gin-boreal-lifestyle.png`,
};

const CANETTE_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/canette-vodka-piscine-main.png`,
    `${C}/canette-gin-limonade-main.png`,
    `${C}/canette-vodka-darts.png`,
  ],
  editorial: `${C}/canettes-boites-4pack.png`,
};

const GENERAL_PHOTOS: LifestyleSet = {
  mosaic: [
    `${C}/gin-glacons-marbre.png`,
    `${C}/cocktail-bar-rose-lime.png`,
    `${C}/rhum-ambre-tiki-tropical.png`,
  ],
  editorial: `${C}/mixologie-gin-framboise-ginger.png`,
};

const SUBCATEGORY_MAP: Record<string, LifestyleSet> = {
  gin: GIN_PHOTOS,
  vodka: VODKA_PHOTOS,
  rhum: RHUM_PHOTOS,
  bourbon: BOURBON_PHOTOS,
  tequila: TEQUILA_PHOTOS,
  liqueur: LIQUEUR_PHOTOS,
  collaboration: COLLABORATION_PHOTOS,
  canette: CANETTE_PHOTOS,
  rtd: CANETTE_PHOTOS,
  mocktail: CANETTE_PHOTOS,
};

export function getLifestyleImages(subcategory: string | null | undefined): LifestyleSet {
  if (!subcategory) return GENERAL_PHOTOS;
  return SUBCATEGORY_MAP[subcategory.toLowerCase()] ?? GENERAL_PHOTOS;
}
