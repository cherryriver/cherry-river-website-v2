export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  durationMinutes: number;
  priceLabel: string;
  priceFrom: number | null;
  image: string;
  includes: string[];
  locations: ("magog" | "quebec")[];
  maxGuests: number;
  stripeLink?: string;
  isContactOnly?: boolean;
}

export interface Distillery {
  id: "magog" | "quebec";
  name: string;
  shortName: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  fullAddress: string;
  description: string;
  highlights: string[];
  image: string;
  mapUrl: string;
}

export const DISTILLERIES: Distillery[] = [
  {
    id: "magog",
    name: "Distillerie Cherry River — Magog",
    shortName: "Magog",
    address: "120 rue des Pins",
    city: "Magog",
    postalCode: "J1X 1W7",
    province: "QC",
    fullAddress: "120 rue des Pins, Magog, QC J1X 1W7",
    description:
      "Ancienne église anglicane de plus de 150 ans reconvertie en distillerie artisanale. Architecture néo-gothique, voûtes de pierre, vitraux et alambics en cuivre au cœur de la nef.",
    highlights: [
      "Église anglicane patrimoniale",
      "Alambics en cuivre artisanaux",
      "Bar de dégustation sur place",
      "Terrasse estivale",
    ],
    image: "/assets/lifestyle/Photo distillerie Magog/DSC_0813.JPG",
    mapUrl:
      "https://www.google.com/maps/place/120+Rue+des+Pins,+Magog,+QC+J1X+1W7",
  },
  {
    id: "quebec",
    name: "Distillerie Cherry River — Québec",
    shortName: "Québec — Sillery",
    address: "1800 chem. Saint-Louis",
    city: "Québec",
    postalCode: "G1S",
    province: "QC",
    fullAddress: "1800 chem. Saint-Louis, Québec, QC G1S",
    description:
      "Mémorial Hall historique dans le quartier de Sillery. Distillerie boutique urbaine et bar à cocktails sophistiqué — la mixologie élevée au rang d'art de vivre.",
    highlights: [
      "Mémorial Hall historique",
      "Bar à cocktails sophistiqué",
      "Ateliers de mixologie",
      "Boutique et dégustations",
    ],
    image: "/assets/lifestyle/Photos_Quebec_boutique/1000021149 (1).jpg",
    mapUrl:
      "https://www.google.com/maps/place/1800+Chemin+Saint-Louis,+Québec,+QC+G1S",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "visite-guidee",
    title: "Visite guidée",
    subtitle: "Découvrez notre savoir-faire",
    description:
      "Visite guidée de la distillerie à Magog et Québec. Parcourez l'histoire de nos lieux patrimoniaux et découvrez chaque étape de la distillation — de la matière première à l'embouteillage. Un voyage sensoriel à travers les arômes, les alambics en cuivre et les secrets de nos maîtres-distillateurs.",
    duration: "45 min",
    durationMinutes: 45,
    priceLabel: "dès 18$ / personne",
    priceFrom: 18,
    image: "/assets/lifestyle/Photo distillerie Magog/MD-30.jpg",
    includes: [
      "Visite commentée de la distillerie",
      "Histoire du lieu patrimonial",
      "Explication du processus de distillation",
      "Dégustation de 3 spiritueux",
    ],
    locations: ["magog", "quebec"],
    maxGuests: 20,
  },
  {
    id: "atelier-mixologie",
    title: "Atelier mixologie",
    subtitle: "Créez vos propres cocktails",
    description:
      "Apprenez les techniques des meilleurs bartenders dans un atelier interactif et convivial. Vous repartirez avec les recettes, les gestes et la confiance pour impressionner vos invités.",
    duration: "90 min",
    durationMinutes: 90,
    priceLabel: "dès 45$ / personne",
    priceFrom: 45,
    image: "/assets/lifestyle/Photo distillerie Magog/MD-18.jpg",
    includes: [
      "Accueil avec cocktail signature",
      "Cours de techniques de base",
      "Création de 3 cocktails",
      "Recettes à emporter",
    ],
    locations: ["magog", "quebec"],
    maxGuests: 12,
  },
  {
    id: "5a7-degustation",
    title: "5 à 7 dégustation",
    subtitle: "Parcours sensoriel guidé",
    description:
      "Un moment privilégié pour explorer notre gamme complète de spiritueux. Notre sommelier vous guide à travers les saveurs et les histoires derrière chaque création Cherry River.",
    duration: "60 min",
    durationMinutes: 60,
    priceLabel: "dès 25$ / personne",
    priceFrom: 25,
    image: "/assets/lifestyle/Photo distillerie Magog/DSC_0835.JPG",
    includes: [
      "Dégustation guidée de 5 spiritueux",
      "Accompagnements gastronomiques",
      "Notes de dégustation",
      "Remise de 10% en boutique",
    ],
    locations: ["magog", "quebec"],
    maxGuests: 15,
  },
  {
    id: "evenement-corporatif",
    title: "Événement corporatif",
    subtitle: "Une expérience sur mesure",
    description:
      "Privatisez nos espaces patrimoniaux pour un événement d'exception. Team building, lancement de produit, célébration — nous créons un moment unique adapté à vos besoins.",
    duration: "Sur mesure",
    durationMinutes: 0,
    priceLabel: "Nous contacter",
    priceFrom: null,
    image: "/assets/lifestyle/Photo distillerie Magog/IMG_5102.JPG",
    includes: [
      "Espace privatisé",
      "Cocktails et spiritueux",
      "Service personnalisé",
      "Options restauration",
    ],
    locations: ["magog", "quebec"],
    maxGuests: 80,
    isContactOnly: true,
  },
];

export const AVAILABLE_TIMES = [
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];
