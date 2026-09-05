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

## Favicon

Ikona je zjednodušená značka z loga — ozubené kolo se siluetou staveb, bílá
a ocelová na firemní navy. Detaily z loga (perspektivní zkosení budov, kolo
otevřené vpravo) se v 16 px slijí, proto je kresba záměrně střídmější.

Generuje ji [`scripts/make-favicon.py`](scripts/make-favicon.py) do
`src/app/icon.svg`, `favicon.ico` (16–256 px) a `apple-icon.png`. SVG i rastr
vznikají ze stejných čísel, takže se nemůžou rozejít. Next si soubory zapojí
sám přes konvenci App Routeru — v `metadata` se ikony neuvádějí.

```bash
python scripts/make-favicon.py
```

## Poptávkový formulář

Formulář posílá `POST /api/poptavka`. Odesílání běží přes [Resend](https://resend.com)
přímo přes REST API, takže projekt nepotřebuje žádnou další závislost.

Poptávky chodí na **tomasimlauf@tis-cr.eu** (`inquiry.email` v `src/lib/site.ts`,
přebít lze proměnnou `POPTAVKA_TO`). Veřejný kontaktní e-mail na webu zůstává
`info@tis-cr.eu` — jsou to schválně dvě různé adresy.

Nastav ve Vercelu (a lokálně v `.env.local`) proměnné z [`.env.example`](.env.example):

```
RESEND_API_KEY=...
POPTAVKA_FROM=web@tis-construction.cz   # musí být ověřená doména v Resendu
POPTAVKA_TO=tomasimlauf@tis-cr.eu
```

**Dokud proměnné nejsou nastavené, formulář uživateli vrátí hlášku s e-mailovým
kontaktem** místo tichého selhání.

### Ochrana proti spamu

Vrstvy se vyhodnocují v tomto pořadí; žádná nevyžaduje externí službu.

| # | Vrstva | Co dělá |
| --- | --- | --- |
| 1 | Kontrola originu | Požadavek musí přijít z vlastní domény, ne z cizí stránky nebo skriptu → `403` |
| 2 | Strop požadavků | 20 požadavků / 10 min na IP → `429`. Volný schválně, aby oprava překlepu nikoho nezablokovala |
| 3 | Honeypot | Skryté pole `zprava_kontrola`. Název je neutrální schválně — pole jménem `website` umí vyplnit autofill prohlížeče |
| 4 | Časová past | Odeslání dřív než 2,5 s po zobrazení formuláře |
| 5 | Validace kontaktu | Musí jít o e-mail nebo telefon o 9–15 číslicích → `400` |
| 6 | Strukturální heuristiky | Skóre za odkazy, BBCode/HTML odkazy, převahu nelatinkového písma, extrémně dlouhá slova |
| 7 | Strop odeslání | 3 zprávy / 10 min a 12 / den na IP → `429` |

Vrstvy 3, 4 a 6 vracejí **`200 OK`, ale zprávu zahodí** — robot se nemá dozvědět,
že ho past odhalila. Každý záchyt se loguje do konzole Vercelu, takže jde ověřit,
jestli filtr nechytá i legitimní poptávky.

Dvě věci k vědomí:

- Limity se drží **v paměti instance**. Na Vercelu to znamená, že při rozjetí na
  víc instancí se počítají zvlášť. Pro provoz tohoto webu to stačí; při skutečném
  útoku je potřeba sdílený stav (Upstash Redis) nebo WAF.
- Proti cílenému spamu heuristiky nestačí. Dalším krokem je
  [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) — je zdarma,
  bez klikacích hádanek, a napojí se jako osmá vrstva ve stejném route handleru.

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
