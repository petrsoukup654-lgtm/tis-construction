/**
 * Jediný zdroj pravdy pro obsah webu.
 * Texty a čísla jsou převzaté z wireframu "TIS Homepage Wireframe.dc.html".
 *
 * TODO(obsah): telefon je ve wireframu placeholder — doplnit skutečné číslo.
 */

export const site = {
  name: "TIS – CR s.r.o.",
  shortName: "TIS Construction",
  tagline: "Strojní a stavební realizace",
  description:
    "Dopravní systémy pro sypké materiály, ocelové konstrukce a kompletní stavební práce. Od projektu po předání. Chrudim, od roku 1997.",
  url: "https://www.tis-cr.eu",
  locale: "cs_CZ",
  founded: 1997,
} as const;

export const contact = {
  email: "info@tis-cr.eu",
  /** TODO(obsah): ve wireframu placeholder +420 000 000 000 */
  phone: "+420 000 000 000",
  phoneHref: "tel:+420000000000",
  street: "Štěpánkova 142",
  postalCode: "537 01",
  city: "Chrudim",
  ico: "25260103",
  dic: "CZ25260103",
} as const;

export type NavItem = { href: string; label: string };

export const nav: NavItem[] = [
  { href: "/", label: "Úvod" },
  { href: "/strojni-cinnosti", label: "Strojní činnosti" },
  { href: "/stavebni-cinnosti", label: "Stavební činnosti" },
  { href: "/reference", label: "Reference" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

/** Nav v hlavičce desktopu je podle wireframu kratší — Reference jsou jen v mobilním menu. */
export const desktopNav: NavItem[] = nav.filter(
  (item) => item.href !== "/reference",
);

export const stats = [
  { value: "25+", label: "let na trhu" },
  { value: "2", label: "divize" },
  { value: "40+", label: "realizací od 2015" },
  { value: "ČR", label: "celá republika" },
] as const;

export type ReferenceCategory = "Strojní" | "Stavební";

export type Division = {
  slug: string;
  number: string;
  href: string;
  title: string;
  /** Kategorie, pod kterou spadají realizace této divize */
  category: ReferenceCategory;
  /** Krátký text na homepage */
  summary: string;
  /** Delší text do hero podstránky */
  intro: string;
  /** Odrážky na kartě homepage */
  bullets: string[];
  /** Pruh "Rozsah služeb" na podstránce */
  scope: string[];
  photoLabel: string;
  heroPhotoLabel: string;
  activitiesEyebrow: string;
  activitiesTitle: string;
  activities: { number: string; title: string; text: string }[];
  processEyebrow: string;
  processTitle: string;
  processLead: string;
  process: { number: string; title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

export const divisions: Division[] = [
  {
    slug: "strojni-cinnosti",
    number: "Divize 01",
    href: "/strojni-cinnosti",
    title: "Strojní činnosti",
    category: "Strojní",
    summary:
      "Tradiční český dodavatel dopravních systémů pro přepravu sypkých materiálů. Komplexní dodávky technologických celků od projektu po realizaci.",
    intro:
      "Tradiční český dodavatel dopravních systémů pro přepravu sypkých materiálů. Zajišťujeme kompletní dodávku technologického celku — projekt, výrobu, montáž i následný servis.",
    bullets: [
      "Inženýrská, projekční a konstrukční činnost",
      "Výroba a montáž ocelových konstrukcí",
      "Dálková pásová doprava",
      "Technologická doprava a náhradní díly",
    ],
    scope: ["Projekce", "Výroba", "Montáž", "Servis", "Náhradní díly"],
    photoLabel: "Foto — ocelová konstrukce",
    heroPhotoLabel: "Foto — dálková pásová doprava",
    activitiesEyebrow: "01 — Co dodáváme",
    activitiesTitle: "Přehled činností",
    activities: [
      {
        number: "01",
        title: "Inženýrská, projekční a konstrukční činnost",
        text: "Návrh technologie, výrobní dokumentace, statické posouzení a inženýring vedoucí k předání díla.",
      },
      {
        number: "02",
        title: "Výroba a montáž ocelových konstrukcí",
        text: "Vlastní výroba svařovaných konstrukcí včetně povrchové úpravy, dopravy na stavbu a montáže.",
      },
      {
        number: "03",
        title: "Dálková pásová doprava",
        text: "Pásové dopravníky, přesypy a zauhlovací trasy pro přepravu sypkých materiálů na dlouhé vzdálenosti.",
      },
      {
        number: "04",
        title: "Technologická doprava a náhradní díly",
        text: "Skladovací a dávkovací zařízení, redlery, šnekové dopravníky a dodávky náhradních dílů.",
      },
    ],
    processEyebrow: "02 — Jak pracujeme",
    processTitle: "Od poptávky po předání",
    processLead:
      "Jeden dodavatel za celou zakázku — nemusíte koordinovat projektanta, výrobu a montážní firmu zvlášť.",
    process: [
      {
        number: "01",
        title: "Poptávka a konzultace",
        text: "Prohlídka provozu, technické zadání, orientační rozpočet.",
      },
      {
        number: "02",
        title: "Projekt a dokumentace",
        text: "Konstrukční návrh, statika, výrobní výkresy.",
      },
      {
        number: "03",
        title: "Výroba",
        text: "Svařování, obrábění, povrchová úprava, kontrola kvality.",
      },
      {
        number: "04",
        title: "Montáž, zkoušky, servis",
        text: "Montáž na místě, uvedení do provozu a záruční i pozáruční servis.",
      },
    ],
    ctaTitle: "Potřebujete dopravní systém na míru?",
    ctaText: "Pošlete zadání — do dvou pracovních dnů se ozveme s návrhem řešení.",
    ctaButton: "Poptat strojní řešení",
  },
  {
    slug: "stavebni-cinnosti",
    number: "Divize 02",
    href: "/stavebni-cinnosti",
    title: "Stavební činnosti",
    category: "Stavební",
    summary:
      "Kompletní stavební práce včetně všech profesí při výstavbě i rekonstrukcích — od průmyslových celků až po rodinné domy.",
    intro:
      "Kompletní stavební práce včetně všech profesí — při nové výstavbě i rekonstrukcích. Od průmyslových a zemědělských celků až po rodinné domy.",
    bullets: [
      "Průmyslové a zemědělské stavby",
      "Stavby občanské vybavenosti",
      "Rodinné domy a rekonstrukce",
      "Generální dodávky staveb",
    ],
    scope: [
      "Generální dodávka",
      "Hrubá stavba",
      "Profese",
      "Rekonstrukce",
      "Dokončovací práce",
    ],
    photoLabel: "Foto — stavba / hala",
    heroPhotoLabel: "Foto — stavba haly",
    activitiesEyebrow: "01 — Co stavíme",
    activitiesTitle: "Typy staveb",
    activities: [
      {
        number: "01",
        title: "Průmyslové stavby",
        text: "Výrobní a skladové haly, přístavby provozů, základy pod technologie a zpevněné plochy.",
      },
      {
        number: "02",
        title: "Zemědělské stavby",
        text: "Seníky, sklady zrnin, stáje a přípravné plochy — často v návaznosti na naši strojní divizi.",
      },
      {
        number: "03",
        title: "Stavby občanské vybavenosti",
        text: "Objekty pro obce a firmy — administrativa, ubytování, rekonstrukce veřejných budov.",
      },
      {
        number: "04",
        title: "Rodinné domy a rekonstrukce",
        text: "Novostavby na klíč i celkové rekonstrukce včetně všech řemesel a dokončovacích prací.",
      },
    ],
    processEyebrow: "02 — Průběh stavby",
    processTitle: "Jedna smlouva, jedna odpovědnost",
    processLead:
      "Zajišťujeme i profese — elektro, ZTI, topení, podlahy. Investor komunikuje s jedním stavbyvedoucím.",
    process: [
      {
        number: "01",
        title: "Prohlídka a rozpočet",
        text: "Návštěva pozemku, položkový rozpočet, termínový plán.",
      },
      {
        number: "02",
        title: "Příprava a povolení",
        text: "Projektová dokumentace a inženýring při povolování stavby.",
      },
      {
        number: "03",
        title: "Realizace",
        text: "Hrubá stavba, profese, dokončovací práce — vlastní stavbyvedoucí.",
      },
      {
        number: "04",
        title: "Předání a záruka",
        text: "Kolaudace, předání dokumentace, záruční servis.",
      },
    ],
    ctaTitle: "Plánujete stavbu nebo rekonstrukci?",
    ctaText: "Pošlete zadání — do dvou pracovních dnů se ozveme s návrhem řešení.",
    ctaButton: "Poptat stavbu",
  },
];

export function getDivision(slug: string): Division | undefined {
  return divisions.find((division) => division.slug === slug);
}

export type Reference = {
  slug: string;
  year: string;
  category: ReferenceCategory;
  /** Krátký štítek nad názvem, např. "SUŠÁRNA" nebo "REKONSTRUKCE" */
  tag: string;
  title: string;
};

/** TODO(obsah): doplnit skutečný seznam realizací a fotografie. */
export const references: Reference[] = [
  {
    slug: "rekonstrukce-hotelu-kraskov",
    year: "2022",
    category: "Stavební",
    tag: "Rekonstrukce",
    title: "Rekonstrukce hotelu Kraskov",
  },
  {
    slug: "ocelova-hala-havlickuv-brod",
    year: "2019",
    category: "Stavební",
    tag: "Hala",
    title: "Ocelová hala Havlíčkův Brod",
  },
  {
    slug: "susarna-zrnin-kocbere",
    year: "2020",
    category: "Strojní",
    tag: "Sušárna",
    title: "Sušárna zrnin Kocbeře",
  },
  {
    slug: "zauhlovaci-trasa-teplarny",
    year: "2018",
    category: "Strojní",
    tag: "Dopravníky",
    title: "Zauhlovací trasa teplárny",
  },
  {
    slug: "ocelova-konstrukce-zasobniku",
    year: "2021",
    category: "Strojní",
    tag: "OK",
    title: "Ocelová konstrukce zásobníku",
  },
  {
    slug: "rodinny-dum-chrudim",
    year: "2023",
    category: "Stavební",
    tag: "RD",
    title: "Rodinný dům Chrudim",
  },
];

export const about = {
  eyebrow: "O firmě",
  title: "Zkušenost z průmyslu i ze stavby",
  text: "Více než 25 let dodáváme systémy a ocelové konstrukce pro energetiku, stavebnictví, dřevozpracující i zemědělský průmysl. Vlastní projekce, výroba i montáž znamenají jednu odpovědnost za celou zakázku.",
} as const;
