import { NextResponse } from "next/server";
import { inquiry, site } from "@/lib/site";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { classify, looksLikeContact, singleLine } from "@/lib/spam";

/**
 * Příjem poptávkového formuláře.
 *
 * Odesílání běží přes Resend (https://resend.com) čistě přes REST API,
 * takže projekt nepotřebuje žádnou další závislost. Nastav v prostředí:
 *   RESEND_API_KEY   — API klíč
 *   POPTAVKA_FROM    — ověřená odesílací adresa, např. "web@tis-construction.cz"
 *   POPTAVKA_TO      — kam poptávky chodí (výchozí: viz inquiry.email)
 *
 * Ochrana proti spamu je vrstvená — viz komentáře u jednotlivých kroků.
 * Žádná z vrstev nevyžaduje externí službu; pokud by spam přesto procházel,
 * dalším krokem je Cloudflare Turnstile.
 */

const MAX_LENGTH = 5000;
/** Člověk formulář nevyplní za vteřinu, bot ano. */
const MIN_FILL_MS = 2500;

type Payload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  /** Honeypot — skryté pole, které lidé nevyplňují. */
  zprava_kontrola?: unknown;
  /** Jak dlouho měl formulář otevřený, v milisekundách. */
  elapsedMs?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Tichý úspěch — robot se nemá dozvědět, že ho past odhalila. */
function pretendOk() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  // 1. Požadavek musí přijít z našeho webu, ne z cizí stránky nebo skriptu.
  const origin = request.headers.get("origin");
  if (origin) {
    const allowed = new Set([site.url, "http://localhost:3000"]);
    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) allowed.add(`https://${vercelUrl}`);
    if (![...allowed].some((base) => origin === base.replace(/\/$/, ""))) {
      console.warn("Poptávka: cizí origin", origin);
      return NextResponse.json({ error: "Neplatný požadavek." }, { status: 403 });
    }
  }

  // 2. Strop na počet požadavků z jedné IP. Je volný schválně — kdo si opraví
  //    překlep v e-mailu, nesmí kvůli tomu narazit na zeď. Tvrdý limit na
  //    skutečně odeslané zprávy přijde až níž, těsně před odesláním.
  const ip = clientIp(request);
  const requests = rateLimit(`poptavka:req:${ip}`, {
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (!requests.allowed) {
    return NextResponse.json(
      { error: `Příliš mnoho pokusů. Zkuste to prosím později, nebo nám napište na ${inquiry.email}.` },
      { status: 429, headers: { "Retry-After": String(requests.retryAfter) } },
    );
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  // 3. Honeypot — skryté pole vyplní jen automat.
  if (asTrimmedString(payload.zprava_kontrola)) {
    console.warn("Poptávka: honeypot", ip);
    return pretendOk();
  }

  // 4. Časová past — formulář odeslaný okamžitě po načtení není od člověka.
  const elapsed =
    typeof payload.elapsedMs === "number" ? payload.elapsedMs : Number.NaN;
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    console.warn("Poptávka: příliš rychlé odeslání", elapsed, ip);
    return pretendOk();
  }

  const name = asTrimmedString(payload.name);
  const from = asTrimmedString(payload.contact);
  const message = asTrimmedString(payload.message);

  if (!name || !from || !message) {
    return NextResponse.json(
      { error: "Vyplňte prosím jméno, kontakt i popis zakázky." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_LENGTH ||
    from.length > MAX_LENGTH ||
    message.length > MAX_LENGTH
  ) {
    return NextResponse.json({ error: "Zpráva je příliš dlouhá." }, { status: 400 });
  }

  // 5. Kontakt musí být použitelný, jinak poptávka stejně nemá cenu.
  if (!looksLikeContact(from)) {
    return NextResponse.json(
      { error: "Zadejte prosím platný e-mail nebo telefonní číslo." },
      { status: 400 },
    );
  }

  // 6. Strukturální heuristiky — odkazy, BBCode, cizí písmo.
  const verdict = classify({ name, contact: from, message });
  if (verdict.spam) {
    console.warn(
      `Poptávka: vyhodnoceno jako spam (skóre ${verdict.score}) — ${verdict.reasons.join(", ")}`,
      ip,
    );
    return pretendOk();
  }

  // 7. Limit na skutečně odeslané zprávy — sem se dostane jen validní poptávka.
  const sends = rateLimit(`poptavka:send:${ip}`, {
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!sends.allowed) {
    return NextResponse.json(
      {
        error: `Poptávku jste už odeslali. Ozveme se co nejdřív — nebo nám rovnou napište na ${inquiry.email}.`,
      },
      { status: 429, headers: { "Retry-After": String(sends.retryAfter) } },
    );
  }

  const daily = rateLimit(`poptavka:day:${ip}`, {
    limit: 12,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!daily.allowed) {
    return NextResponse.json(
      { error: `Denní limit odeslání je vyčerpán. Napište nám prosím na ${inquiry.email}.` },
      { status: 429, headers: { "Retry-After": String(daily.retryAfter) } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.POPTAVKA_FROM;

  if (!apiKey || !sender) {
    console.error("Poptávkový formulář: chybí RESEND_API_KEY nebo POPTAVKA_FROM.");
    return NextResponse.json(
      {
        error: `Formulář zatím není propojený s e-mailem. Napište nám prosím přímo na ${inquiry.email}.`,
      },
      { status: 503 },
    );
  }

  const isEmail = from.includes("@");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [process.env.POPTAVKA_TO ?? inquiry.email],
      // Odpověď míří rovnou zájemci, ale jen když poslal e-mail.
      ...(isEmail ? { reply_to: from } : {}),
      subject: singleLine(`Poptávka z webu — ${name}`),
      text: [
        `Jméno a firma: ${name}`,
        `Kontakt: ${from}`,
        "",
        "Popis zakázky:",
        message,
        "",
        "—",
        `Odesláno z ${site.url}`,
        `IP: ${ip}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error(
      "Poptávkový formulář: Resend vrátil chybu",
      response.status,
      await response.text().catch(() => ""),
    );
    return NextResponse.json(
      {
        error: `Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na ${inquiry.email}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

/** Formulář se odesílá výhradně POSTem. */
export function GET() {
  return NextResponse.json({ error: "Metoda není povolena." }, { status: 405 });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
