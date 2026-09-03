/**
 * Jednoduchý sliding-window limiter držený v paměti instance.
 *
 * Na Vercelu žije paměť jen v rámci jedné teplé instance, takže tohle není
 * neprůstřelná ochrana — při rozjetí na víc instancí se limity počítají zvlášť.
 * Pro provoz webu velikosti TIS to ale spolehlivě utne opakované odesílání
 * z jedné adresy, a nevyžaduje to žádnou externí službu.
 */

type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

/** Aby paměť nerostla donekonečna, občas vyhodíme expirované záznamy. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, hit] of buckets) {
    if (hit.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** Za kolik sekund smí zkusit znovu. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const hit = buckets.get(key);

  if (!hit || hit.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  hit.count += 1;

  if (hit.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((hit.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

/** Klientská IP z hlaviček, které před aplikaci staví Vercel. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
