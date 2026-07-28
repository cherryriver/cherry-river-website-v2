interface CrCatalogItem { slug: string; label: string; house: string; }
interface CrCatalogSub { key: string; label: string; status: string; blurb?: string; items?: CrCatalogItem[]; }
interface CrCatalog {
  accueil: string;
  produits: { label: string; href: string; subcategories: CrCatalogSub[] };
  boutique: { label: string; href: string; subcategories: CrCatalogSub[] };
  boutiqueHref: string;
  productHref(slug: string): string;
  bottleThumb(slug: string): string;
  accessoryThumb(slug: string): string;
  mountMenu(trigger: HTMLElement): void;
  mountBoutiqueMenu(trigger: HTMLElement): void;
}
declare const CATALOG: CrCatalog;
export default CATALOG;
