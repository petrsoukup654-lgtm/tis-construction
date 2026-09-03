# TIS Construction

Web společnosti TIS Construction.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS 4
- Hosting: [Vercel](https://vercel.com)

## Vývoj

```bash
npm install
npm run dev
```

Web běží na [http://localhost:3000](http://localhost:3000).

## Skripty

| Příkaz | Popis |
| --- | --- |
| `npm run dev` | Vývojový server |
| `npm run build` | Produkční build |
| `npm run start` | Spuštění produkčního buildu |
| `npm run lint` | ESLint |

## Nasazení

Každý push do větve `main` nasadí produkci na Vercelu. Pull requesty dostávají preview deployment.
