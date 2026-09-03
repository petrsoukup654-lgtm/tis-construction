"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { SubmitButton } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border border-border border-l-[3px] border-l-accent bg-surface px-3.5 py-3 text-[0.90625rem] text-ink placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

export function ContactForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/poptavka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          typeof result.error === "string"
            ? result.error
            : `Zprávu se nepodařilo odeslat. Napište nám prosím na ${contact.email}.`,
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError(
        `Zprávu se nepodařilo odeslat. Napište nám prosím na ${contact.email}.`,
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div id={id} className="bg-surface p-8" role="status">
        <h3 className="h-card text-[1.5rem] text-ink">Poptávka odeslána</h3>
        <p className="mt-2.5 text-[0.96875rem] leading-[1.6] text-body">
          Děkujeme. Do dvou pracovních dnů se vám ozveme s návrhem řešení.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="flex flex-col gap-2.5">
      {/* Honeypot — skryté pole pro roboty. */}
      <label className="sr-only" aria-hidden>
        Nevyplňujte
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute h-0 w-0 opacity-0"
        />
      </label>

      <label className="sr-only" htmlFor="poptavka-name">
        Jméno a firma
      </label>
      <input
        id="poptavka-name"
        name="name"
        required
        autoComplete="organization"
        placeholder="Jméno a firma"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor="poptavka-contact">
        E-mail nebo telefon
      </label>
      <input
        id="poptavka-contact"
        name="contact"
        required
        autoComplete="email"
        placeholder="E-mail nebo telefon"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor="poptavka-message">
        Krátký popis zakázky
      </label>
      <textarea
        id="poptavka-message"
        name="message"
        required
        rows={3}
        placeholder="Krátký popis zakázky"
        className={`${fieldClass} resize-y`}
      />

      {status === "error" && (
        <p role="alert" className="text-[0.875rem] leading-[1.5] text-accent-quiet">
          {error}
        </p>
      )}

      <SubmitButton type="submit" disabled={status === "sending"} className="mt-1 w-full">
        {status === "sending" ? "Odesílám…" : "Odeslat poptávku"}
      </SubmitButton>
    </form>
  );
}
