import { NextResponse } from "next/server";
import { contact, site } from "@/lib/site";

/**
 * Příjem poptávkového formuláře.
 *
 * Odesílání běží přes Resend (https://resend.com) čistě přes REST API,
 * takže projekt nepotřebuje žádnou další závislost. Nastav v prostředí:
 *   RESEND_API_KEY   — API klíč
 *   POPTAVKA_FROM    — ověřená odesílací adresa, např. "web@tis-cr.eu"
 *   POPTAVKA_TO      — kam poptávky chodí (výchozí: info@tis-cr.eu)
 */

const MAX_LENGTH = 5000;

type Payload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  /** Honeypot — skryté pole, které lidé nevyplňují. */
  website?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Neplatný požadavek." },
      { status: 400 },
    );
  }

  // Robot vyplnil skryté pole — tvářme se, že je vše v pořádku.
  if (asTrimmedString(payload.website)) {
    return NextResponse.json({ ok: true });
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

  if (name.length > MAX_LENGTH || from.length > MAX_LENGTH || message.length > MAX_LENGTH) {
    return NextResponse.json(
      { error: "Zpráva je příliš dlouhá." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.POPTAVKA_FROM;

  if (!apiKey || !sender) {
    // Odesílání zatím není nastavené — ať to uživatel pozná a má náhradní cestu.
    console.error(
      "Poptávkový formulář: chybí RESEND_API_KEY nebo POPTAVKA_FROM.",
    );
    return NextResponse.json(
      {
        error: `Formulář zatím není propojený s e-mailem. Napište nám prosím přímo na ${contact.email}.`,
      },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [process.env.POPTAVKA_TO ?? contact.email],
      reply_to: from.includes("@") ? from : undefined,
      subject: `Poptávka z webu — ${name}`,
      text: [
        `Jméno a firma: ${name}`,
        `Kontakt: ${from}`,
        "",
        "Popis zakázky:",
        message,
        "",
        `Odesláno z ${site.url}`,
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
        error: `Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište na ${contact.email}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
