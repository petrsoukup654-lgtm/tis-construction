# TIS Construction

Web společnosti **TIS Construction s.r.o.**, Chrudim.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS 4
- Hosting: [Vercel](https://vercel.com)

## Vývoj

```bash
npm install
npm run dev
```

Web běží na [http://localhost:3000](http://localhost:3000).

| Příkaz | Popis |
| --- | --- |
| `npm run dev` | Vývojový server |
| `npm run build` | Produkční build |
| `npm run start` | Spuštění produkčního buildu |
| `npm run lint` | ESLint |

## Struktura

```
src/
  app/            stránky (App Router), API route poptávky, sitemap, robots
  components/     Header, Footer, DivisionPage, Blocks, ContactForm
    ui/           Container, Button, Section, Photo
  lib/site.ts     veškerý obsah webu na jednom místě
design/           zdrojový návrh z Claude Design (není součástí aplikace)
public/brand/     logo a brandové soubory
public/photos/    fotografie realizací
```

Obsah se needituje v komponentách — všechny texty, kontakty, divize
a reference jsou v [`src/lib/site.ts`](src/lib/site.ts).

## Design systém

Barvy i typografie vychází z `design/TIS Design System.dc.html`.

- **Světlá varianta** je výchozí režim webu.
- **Tmavá varianta** ("průmyslový režim") se nasazuje po sekcích —
  hero, divizní podstránky, patička. Zapíná se atributem `data-tone="dark"`,
  který překlopí sémantické tokeny `--c-*` v [`globals.css`](src/app/globals.css).

Pravidla návrhu, která kód dodržuje: radius 0, žádné stíny, hierarchii dělá
1px linka a 3px modrý pruh nahoře, modrá jen pro akce a akcenty, nadpisy vždy
verzálkami a condensed, běžný text nikdy verzálkami.

### Odchylky od návrhu

| Co | Proč |
| --- | --- |
| Sekundární text ve světlé variantě je `#646C77` místo `#717984` | Původní ocelová dává na světlém pozadí kontrast 4,07:1, tedy pod WCAG AA. Nový odstín má 4,9:1 a je vizuálně prakticky totožný. Původní hodnota zůstává jako `--c-steel`. |
| Hlavička je tmavá na všech stránkách | Wireframe má na světlé homepage bílou hlavičku a na tmavých podstránkách tmavou. Jednotná tmavá hlavička navazuje na tmavý hero a nemění barvu při přechodu mezi stránkami. |
| Reference mají vlastní stránku `/reference` | Wireframe na ni odkazuje tlačítkem „Všechny realizace“, ale samotnou stránku nezobrazuje. |

## Fotografie

Všechny fotografie jsou **skutečné snímky realizací** převzaté z [tis-cr.eu](https://www.tis-cr.eu)
(stránky Strojní a Stavební činnosti) v originálním rozlišení 1500–1920 px. Leží
v `public/photos/` a vykresluje je komponenta `Photo`.

`Photo` bez `src` spadne zpět na šrafovaný zástupný blok z wireframu — díky tomu
jde přidávat nové realizace postupně, aniž by se rozbil layout.

## Poptávkový formulář

Formulář posílá `POST /api/poptavka`. Odesílání běží přes [Resend](https://resend.com)
přímo přes REST API, takže projekt nepotřebuje žádnou další závislost.

Nastav ve Vercelu (a lokálně v `.env.local`) proměnné z [`.env.example`](.env.example):

```
RESEND_API_KEY=...
POPTAVKA_FROM=web@tis-cr.eu     # musí být ověřená doména v Resendu
POPTAVKA_TO=info@tis-cr.eu
```

**Dokud proměnné nejsou nastavené, formulář uživateli vrátí hlášku s e-mailovým
kontaktem** místo tichého selhání.

## Analytika

Vercel Analytics a Speed Insights jsou zapojené v `src/app/layout.tsx`. Obojí je
cookieless, takže web zatím nepotřebuje cookie lištu. Sběr dat se zapíná
v nastavení projektu na Vercelu.

## Co ještě chybí

- [ ] Ověřit DIČ — IČ je `05613566`, plátcovství DPH nepotvrzeno (zatím se nezobrazuje)
- [ ] Ověřit e-mail po nasazení domény `tis-construction.cz` (teď `info@tis-cr.eu`)
- [ ] Roky u části realizací (hotel Kraskov, Pošívalka, chatky, stáj)
- [ ] Nastavit `RESEND_API_KEY` a `POPTAVKA_FROM` ve Vercelu

## Nasazení

Push do větve `main` nasadí produkci na Vercelu. Pull requesty dostávají
preview deployment.
