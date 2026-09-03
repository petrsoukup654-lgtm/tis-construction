/**
 * Heuristiky proti spamu v poptávkovém formuláři.
 *
 * Záměrně nepoužíváme seznam zakázaných slov — u české stavební firmy by
 * odfiltroval i legitimní poptávky. Místo toho sledujeme strukturální znaky,
 * které skutečná poptávka prakticky nemá: odkazy, BBCode, cizí písmo.
 */

const URL_PATTERN = /(https?:\/\/|www\.)/gi;
const MARKUP_PATTERN = /(\[url[=\]]|<a\s|\[link[=\]]|\{link\})/i;
const LATIN_LIKE = /[\p{Script=Latin}\p{Script=Common}\p{Script=Inherited}]/u;

export type SpamVerdict = {
  spam: boolean;
  score: number;
  reasons: string[];
};

/** Podíl znaků, které nepatří do latinky (bez mezer a interpunkce). */
function foreignScriptRatio(text: string): number {
  const letters = [...text].filter((ch) => /\p{L}/u.test(ch));
  if (letters.length < 12) return 0;
  const foreign = letters.filter((ch) => !LATIN_LIKE.test(ch)).length;
  return foreign / letters.length;
}

/** Nejdelší souvislý řetězec bez mezery — dlouhý blok bývá vložený odkaz. */
function longestWord(text: string): number {
  return text
    .split(/\s+/)
    .reduce((max, word) => Math.max(max, word.length), 0);
}

export function classify({
  name,
  contact,
  message,
}: {
  name: string;
  contact: string;
  message: string;
}): SpamVerdict {
  const all = `${name} ${contact} ${message}`;
  const reasons: string[] = [];
  let score = 0;

  const urls = all.match(URL_PATTERN)?.length ?? 0;
  if (urls >= 3) {
    score += 3;
    reasons.push(`odkazů: ${urls}`);
  } else if (urls === 2) {
    score += 1;
    reasons.push("dva odkazy");
  }

  if (MARKUP_PATTERN.test(all)) {
    score += 3;
    reasons.push("BBCode nebo HTML odkaz");
  }

  const foreign = foreignScriptRatio(message);
  if (foreign > 0.5) {
    score += 3;
    reasons.push(`nelatinkové písmo: ${Math.round(foreign * 100)} %`);
  }

  if (longestWord(all) > 60) {
    score += 2;
    reasons.push("neúměrně dlouhé slovo");
  }

  // Jméno tvořené jen odkazem nebo číslicemi.
  if (name.length > 0 && !/\p{L}/u.test(name)) {
    score += 2;
    reasons.push("jméno bez písmen");
  }

  // Zpráva o dvou slovech nenese poptávku, ale bot ji rád pošle.
  if (message.split(/\s+/).filter(Boolean).length < 3) {
    score += 1;
    reasons.push("příliš krátká zpráva");
  }

  return { spam: score >= 3, score, reasons };
}

/** Kontakt musí vypadat jako e-mail nebo jako telefonní číslo. */
export function looksLikeContact(value: string): boolean {
  const email = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;
  const digits = value.replace(/[\s()/.+-]/g, "");
  const phone = /^\d{9,15}$/;
  return email.test(value) || phone.test(digits);
}

/** Do předmětu e-mailu nesmí prosáknout konec řádku. */
export function singleLine(value: string, max = 120): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, max);
}
