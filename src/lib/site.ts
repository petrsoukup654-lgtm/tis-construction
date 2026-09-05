/**
 * Jediný zdroj pravdy pro obsah webu.
 * Texty vychází z wireframu "TIS Homepage Wireframe.dc.html",
 * reference a fotografie jsou převzaté z tis-cr.eu.
 *
 * TODO(obsah): ověřit DIČ — IČ je 05613566, plátcovství DPH nepotvrzeno.
 * TODO(obsah): ověřit e-mail, až bude v provozu doména tis-construction.cz.
 */

export const site = {
  name: "TIS Construction s.r.o.",
  shortName: "TIS Construction",
  tagline: "Strojní a stavební realizace",
  description:
    "Dopravní systémy pro sypké materiály, ocelové konstrukce a kompletní stavební práce. Od projektu po předání. Chrudim, od roku 1997.",
  url: "https://tis-construction.cz",
  locale: "cs_CZ",
  founded: 1997,
} as const;

export const contact = {
  email: "info@tis-cr.eu",
  phone: "+420 739 065 563",
  phoneHref: "tel:+420739065563",
  street: "K Májovu 1309",
  /** Městská část — patří do zobrazené adresy, ne do addressLocality. */
  district: "Chrudim IV",
  postalCode: "537 01",
  city: "Chrudim",
  ico: "05613566",
  /** Doplnit, až bude potvrzené plátcovství DPH. */
  dic: null as string | null,
} as const;

/** Adresa v jednom řádku — ať se tvar nerozchází mezi patičkou a kontaktem. */
export const addressLine = `${contact.street}, ${contact.district}, ${contact.postalCode}`;

/**
 * Kam chodí poptávky z formuláře. Záměrně oddělené od veřejného
 * kontaktního e-mailu — ten zůstává na webu, tohle je interní adresát.
 * Lze přebít proměnnou POPTAVKA_TO.
 */
export const inquiry = {
  email: "tomasimlauf@tis-cr.eu",
} as const;


export type Person = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

/** Kontaktní osoby na stránce Kontakt. */
export const people: Person[] = [
  {
    name: "Ing. Tomáš Imlauf",
    role: "Jednatel společnosti",
    phone: "+420 739 065 563",
    email: "tomasimlauf@tis-cr.eu",
  },
  {
    name: "Ing. Ladislav Forman",
    role: "Vedoucí projekce",
    phone: "+420 732 498 124",
    email: "forman@tis-cr.eu",
  },
  {
    name: "Jiří Holík",
    role: "Řízení staveb",
    phone: "+420 724 706 103",
    email: "jiriholik@tis-cr.eu",
  },
];

/** Telefon zapsaný pro odkaz tel: — bez mezer. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

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
  { value: "25+", label: "zkušeností" },
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
  /** Cesty do /public/photos; dokud chybí, vykreslí se zástupný blok. */
  photo?: string;
  heroPhoto?: string;
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
    photoLabel: "Jeřáb usazuje ocelovou konstrukci dopravníkového mostu",
    heroPhotoLabel: "Zastřešený pásový dopravník s obslužnou lávkou",
    photo: "/photos/ref-ocelove-konstrukce.webp",
    heroPhoto: "/photos/ref-technologicka-doprava.webp",
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
    photoLabel: "Dokončená ocelová hala v Havlíčkově Brodě",
    heroPhotoLabel: "Letecký pohled na dokončenou zemědělskou stáj",
    photo: "/photos/ref-hala-havlickuv-brod.webp",
    heroPhoto: "/photos/ref-staj-mlady-skot.webp",
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
  /** Volitelný — u části realizací není rok uvedený. */
  year?: string;
  category: ReferenceCategory;
  /** Krátký štítek nad názvem, např. "SUŠÁRNA" nebo "REKONSTRUKCE" */
  tag: string;
  title: string;
  photo?: string;
  /** Popis fotografie pro alt text */
  alt?: string;
};

/**
 * Skutečné realizace převzaté z tis-cr.eu (stránky Strojní a Stavební činnosti).
 * Fotografie leží v /public/photos.
 */
export const references: Reference[] = [
  // --- Stavební ---
  {
    slug: "rekonstrukce-hotelu-kraskov",
    category: "Stavební",
    tag: "Rekonstrukce",
    title: "Kompletní rekonstrukce hotelu Kraskov",
    photo: "/photos/ref-hotel-kraskov.webp",
    alt: "Zrekonstruovaná budova hotelu Kraskov s upraveným předprostorem",
  },
  {
    slug: "administrativni-budova-posivalka",
    category: "Stavební",
    tag: "Administrativa",
    title: "Administrativní budova Pošívalka u Chroustovic",
    photo: "/photos/ref-administrativni-budova-posivalka.webp",
    alt: "Novostavba administrativní budovy",
  },
  {
    slug: "chatky-kraskov",
    category: "Stavební",
    tag: "Rekonstrukce",
    title: "Rekonstrukce deseti chatek u hotelu Kraskov",
    photo: "/photos/ref-chatky-kraskov.webp",
    alt: "Zrekonstruované rekreační chatky",
  },
  {
    slug: "wellness-chrudim",
    year: "2019",
    category: "Stavební",
    tag: "Wellness",
    title: "Rozšíření sauny o wellness prvky, Chrudim",
    photo: "/photos/ref-wellness-chrudim.webp",
    alt: "Nové wellness prostory městské sauny",
  },
  {
    slug: "autosalon-pardubice",
    year: "2015–2016",
    category: "Stavební",
    tag: "Autosalon",
    title: "Výstavba autosalonu AUTO IN Pardubice",
    photo: "/photos/ref-autosalon-pardubice.webp",
    alt: "Dokončený autosalon s prosklenou showroomovou částí",
  },
  {
    slug: "prejezd-slatinany",
    year: "2015",
    category: "Stavební",
    tag: "Infrastruktura",
    title: "Renovace železničního přejezdu Slatiňany",
    photo: "/photos/ref-prejezd-slatinany.webp",
    alt: "Zrenovovaný železniční přejezd",
  },
  {
    slug: "ocelova-hala-havlickuv-brod",
    year: "2019",
    category: "Stavební",
    tag: "Hala",
    title: "Výstavba ocelové haly v Havlíčkově Brodě",
    photo: "/photos/ref-hala-havlickuv-brod.webp",
    alt: "Dokončená ocelová hala s šedým opláštěním a řadou vrat",
  },
  {
    slug: "hala-stoky",
    year: "2019",
    category: "Stavební",
    tag: "Hala",
    title: "Výstavba haly Štoky",
    photo: "/photos/ref-hala-stoky.webp",
    alt: "Novostavba průmyslové haly",
  },
  {
    slug: "staj-pro-mlady-skot",
    category: "Stavební",
    tag: "Zemědělská stavba",
    title: "Výstavba stáje pro mladý skot",
    photo: "/photos/ref-staj-mlady-skot.webp",
    alt: "Letecký pohled na dokončenou zemědělskou stáj",
  },

  // --- Strojní ---
  {
    slug: "dalkova-pasova-doprava",
    category: "Strojní",
    tag: "Pásová doprava",
    title: "Dálková pásová doprava",
    photo: "/photos/ref-pasova-doprava.webp",
    alt: "Zakladač a pásové dopravníky na povrchovém dole",
  },
  {
    slug: "montaz-pasove-dopravy",
    category: "Strojní",
    tag: "Montáž",
    title: "Montáž dálkové pásové dopravy",
    photo: "/photos/ref-vyroba-dopravniku.webp",
    alt: "Rozestavěné trasy pásových dopravníků s válečkovými stolicemi",
  },
  {
    slug: "technologicka-doprava",
    category: "Strojní",
    tag: "Technologická doprava",
    title: "Technologická doprava",
    photo: "/photos/ref-technologicka-doprava.webp",
    alt: "Zastřešený pásový dopravník s obslužnou lávkou",
  },
  {
    slug: "ocelove-konstrukce",
    category: "Strojní",
    tag: "Ocelové konstrukce",
    title: "Dodávka a montáž ocelových konstrukcí",
    photo: "/photos/ref-ocelove-konstrukce.webp",
    alt: "Jeřáb usazuje příhradovou ocelovou konstrukci dopravníkového mostu",
  },
  {
    slug: "zemedelska-technologie",
    category: "Strojní",
    tag: "Zemědělství",
    title: "Technologie pro zemědělský průmysl",
    photo: "/photos/ref-zemedelska-technologie.webp",
    alt: "Technologie pro skladování a dopravu zrnin",
  },
  {
    slug: "nahradni-dily",
    category: "Strojní",
    tag: "Náhradní díly",
    title: "Dodávka náhradních dílů",
    photo: "/photos/ref-nahradni-dily.webp",
    alt: "Pojezdová kola, podvozky a díly brzd hlavních pohonů",
  },
  {
    slug: "oprava-strechy-vresova",
    category: "Strojní",
    tag: "Ocelové konstrukce",
    title: "Oprava střechy generátorovny Vřesová",
    photo: "/photos/ref-oprava-strechy-vresova.webp",
    alt: "Oprava zastřešení průmyslové generátorovny",
  },
];

/**
 * Realizace vybrané na homepage — dvě strojní a jedna stavební.
 *
 * Vybíráme jmenovitě podle slugů, ne prvních N z pole: pořadí v `references`
 * se řídí kategoriemi, takže `slice` by ukázal tři stavební. Vybrané kusy
 * navíc schválně nepoužívají fotky, které homepage má jinde (hero a karty
 * divizí), aby se na jedné stránce neopakovaly.
 */
const featuredSlugs = [
  "dalkova-pasova-doprava",
  "technologicka-doprava",
  "rekonstrukce-hotelu-kraskov",
] as const;

export const featuredReferences: Reference[] = featuredSlugs.map((slug) => {
  const found = references.find((reference) => reference.slug === slug);
  // Překlep ve slugu má shodit build, ne tiše zmizet z homepage.
  if (!found) throw new Error(`Neznámá realizace na homepage: ${slug}`);
  return found;
});

export const about = {
  eyebrow: "O firmě",
  title: "Zkušenost z průmyslu i ze stavby",
  text: "Více než 25 let dodáváme systémy a ocelové konstrukce pro energetiku, stavebnictví, dřevozpracující i zemědělský průmysl. Vlastní projekce, výroba i montáž znamenají jednu odpovědnost za celou zakázku.",
} as const;
