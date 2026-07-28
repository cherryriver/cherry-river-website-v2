// Ported verbatim from produits.html's DCLogic renderVals() (Fable build).
import { crLogo, opeLogo, averseLogo, order, catOf, categoryMeta, products } from "./products-data.js";

// Images lifestyle par produit/famille (curated/, vérifiées visuellement).
// 3 slots: [univers, notes/service, bar]. Règle: jamais une bouteille d'un
// AUTRE produit visible à l'image.
const CUR = "/assets/lifestyle/curated/";
const LIFESTYLE_DEFAULT = [CUR + "cocktails-pamplemousse-editorial.png", CUR + "gin-petits-fruits-basilic.png", CUR + "cocktail-bar-romarin.png"];
const LIFESTYLE_BY_CAT = {
  gins: LIFESTYLE_DEFAULT,
  "gin-sans": [CUR + "cocktails-petits-fruits.png", CUR + "cocktails-terrasse-livre.png", CUR + "cocktail-bar-romarin.png"],
  vodkas: [CUR + "cocktail-cosmopolitan-marbre.png", CUR + "cocktails-blancs-cuir.png", CUR + "cocktail-bar-rose-close.png"],
  rhums: [CUR + "rhum-ambre-tiki-tropical.png", CUR + "rhum-epice-canape.png", CUR + "cocktail-orange-grenade.png"],
  whiskys: [CUR + "cocktail-bar-romarin.png", CUR + "cocktails-terrasse-livre.png", CUR + "cocktail-orange-grenade.png"],
  tequilas: [CUR + "cocktail-orange-grenade.png", CUR + "cocktail-bar-rose-close.png", CUR + "cocktails-terrasse-livre.png"],
  cremes: [CUR + "cocktails-blancs-cuir.png", CUR + "cocktails-terrasse-livre.png", CUR + "cocktail-cosmopolitan-marbre.png"],
  liqueurs: [CUR + "cocktail-orange-grenade.png", CUR + "cocktails-blancs-cuir.png", CUR + "cocktails-terrasse-livre.png"],
  // pas de canettes en défaut: le crop portrait peut mettre en avant la
  // mauvaise saveur (le tricolore centre = Vodka Cosmo)
  "rtd-alcool": [CUR + "cocktails-terrasse-livre.png", CUR + "cocktail-bar-rose-close.png", CUR + "cocktail-orange-grenade.png"],
  "rtd-sans": [CUR + "cocktails-terrasse-livre.png", CUR + "cocktails-petits-fruits.png", CUR + "cocktail-orange-grenade.png"],
};
const LIFESTYLE_OVERRIDES = {
  berries: [CUR + "cocktails-petits-fruits.png", CUR + "gin-petits-fruits-basilic.png", CUR + "cocktail-bar-romarin.png"],
  framboiselime: [CUR + "mixologie-gin-framboise-ginger.png", CUR + "gin-glacons-marbre.png", CUR + "cocktail-bar-rose-close.png"],
  limegingembre: [CUR + "gin-glacons-marbre.png", CUR + "mixologie-gin-framboise-ginger.png", CUR + "cocktail-bar-romarin.png"],
  pamplemousse: [CUR + "cocktails-pamplemousse-editorial.png", CUR + "gin-pamplemousse-piscine.png", CUR + "cocktail-bar-rose-close.png"],
  boreal: [CUR + "opemiska-gin-boreal-lifestyle.png", CUR + "cocktails-martini-bleuets.png", CUR + "mixologie-opemiska-whisky.png"],
  bleuets: [CUR + "cocktails-martini-bleuets.png", CUR + "opemiska-gin-boreal-lifestyle.png", CUR + "mixologie-opemiska-whisky.png"],
  fraise: [CUR + "cocktails-petits-fruits.png", CUR + "opemiska-gin-boreal-lifestyle.png", CUR + "cocktail-bar-rose-close.png"],
  "liqueur-whisky": [CUR + "mixologie-opemiska-whisky.png", CUR + "opemiska-gin-boreal-lifestyle.png", CUR + "cocktail-bar-romarin.png"],
  "rhum-epice": [CUR + "rhum-epice-canape.png", CUR + "rhum-epice-cafe-1.png", CUR + "rhum-ambre-tiki-tropical.png"],
  "rhum-ambre": [CUR + "rhum-ambre-tiki-tropical.png", CUR + "rhum-epice-canape.png", CUR + "cocktail-orange-grenade.png"],
  "rtd-ginlimon": [CUR + "canette-gin-limonade-main.png", CUR + "canette-gin-limonade-boite.png", CUR + "cocktails-terrasse-livre.png"],
  "rtd-cosmo": [CUR + "canettes-rtd-tricolore.png", CUR + "cocktail-cosmopolitan-marbre.png", CUR + "canette-vodka-piscine-bord.png"],
};
function lifestyleFor(slug, cat) {
  return LIFESTYLE_OVERRIDES[slug] || LIFESTYLE_BY_CAT[cat] || LIFESTYLE_DEFAULT;
}

export function buildProductVals(slugParam) {
  const slug = products[slugParam] ? slugParam : "berries";
  const p = products[slug];
  const cat = catOf[slug] || "gins";
  const m = categoryMeta[cat] || categoryMeta.gins;
  const inCat = order.filter((s) => catOf[s] === cat);
  const collection = inCat.map((s) => ({
    href: "/produits?gin=" + s,
    label: products[s].pill,
    active: s === slug ? "true" : "false",
  }));
  let sibs = inCat.filter((s) => s !== slug);
  if (sibs.length < 3) sibs = sibs.concat(order.filter((s) => s !== slug && sibs.indexOf(s) < 0)).slice(0, 3);
  else sibs = sibs.slice(0, 3);
  const relatedNoun = inCat.length > 1 ? m.relatedNoun : "créations";
  const related = sibs.map((s, i) => {
    const q = products[s];
    return { href: "/produits?gin=" + s, name: q.title, note: q.short, img: "/assets/thumbs/bottle-" + s + ".png", delay: i * 100 };
  });
  const botanicals = p.bots.map((name, i) => ({ num: ("0" + (i + 1)).slice(-2), name, delay: i * 55 }));
  const logos = { cr: crLogo, ope: opeLogo, averse: averseLogo };
  const factAbv = p.abv || "40 % vol.";
  const chips = p.chips || [factAbv.replace(" vol.", " alc./vol"), "750 ml", "Petits lots", "Sans additifs"];
  return {
    brand: p.brand,
    brandLogo: logos[p.house] || crLogo,
    eyebrow: p.eyebrow,
    nameMain: p.nameMain,
    nameAccent: p.nameAccent,
    nameFull: p.title,
    description: p.description,
    factType: m.factType,
    factAbv,
    factFormat: p.format || m.format || "750 ml",
    factProcess: p.process || m.factProcess,
    origine: p.origine,
    chips,
    bottleImg: "/assets/bottle-" + slug + ".png",
    bottleAlt: "Bouteille " + p.title,
    lifestyle: lifestyleFor(slug, cat),
    caption: p.caption,
    notesNez: p.notes.nez,
    notesBouche: p.notes.bouche,
    notesFinale: p.notes.finale,
    listNav: m.listNav,
    listLabel: m.listLabel,
    listHeadMain: m.listHeadMain,
    listHeadAccent: m.listHeadAccent,
    botIntro: p.botIntro,
    botanicals,
    collection,
    collectionLabel: m.collectionLabel,
    craftText: m.craftText,
    serveMeta: p.serve.meta,
    serveName: p.serve.name,
    serveNameAccent: p.serve.nameAccent,
    serveIngredients: p.serve.ing,
    serveSteps: p.serve.steps,
    related,
    relatedNoun,
  };
}
