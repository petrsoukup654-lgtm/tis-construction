import Link from "next/link";
import type { Reference } from "@/lib/site";
import { stats } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/Section";

/** Pruh se čtyřmi čísly pod herem. */
export function StatBar() {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="grid grid-cols-2 md:grid-cols-4 md:px-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-5 py-6 md:px-6 ${
              index < stats.length - 1 ? "md:border-r md:border-hairline" : ""
            } ${index < 2 ? "border-b border-hairline md:border-b-0" : ""} ${
              index % 2 === 0 ? "border-r border-hairline md:border-r" : ""
            } ${index === 0 ? "md:pl-12" : ""}`}
          >
            <p className="h-card text-[2.375rem] leading-none text-accent">
              {stat.value}
            </p>
            <p className="label-mono mt-1 text-muted">{stat.label}</p>
          </div>
        ))}
      </Container>
    </div>
  );
}

/** Číslovaný seznam kroků — "Jak pracujeme" / "Průběh stavby". */
export function ProcessList({
  steps,
}: {
  steps: readonly { number: string; title: string; text: string }[];
}) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li
          key={step.number}
          className={`grid grid-cols-[3.5rem_1fr] gap-5 py-[18px] ${
            index < steps.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <span
            aria-hidden
            className="h-card text-[1.875rem] leading-none text-accent"
          >
            {step.number}
          </span>
          <div>
            <h3 className="h-card text-[1.25rem] font-semibold tracking-[0.03em] text-ink">
              {step.title}
            </h3>
            <p className="mt-1 text-[0.90625rem] leading-[1.6] text-body">
              {step.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Karta jedné realizace. */
export function ReferenceCard({ reference }: { reference: Reference }) {
  return (
    <article>
      <PhotoPlaceholder label="Foto 4:3" ratio="aspect-[4/3]" />
      <p className="label-mono mt-3 text-muted">
        {reference.year} · {reference.tag}
      </p>
      <h3 className="h-card mt-1 text-[1.1875rem] font-semibold text-ink">
        {reference.title}
      </h3>
    </article>
  );
}

export function ReferenceGrid({
  references,
  columns = 3,
}: {
  references: readonly Reference[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      }`}
    >
      {references.map((reference) => (
        <ReferenceCard key={reference.slug} reference={reference} />
      ))}
    </div>
  );
}

/** Drobečková navigace nad herem podstránky. */
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav
      aria-label="Drobečková navigace"
      className="label-mono border-b border-border px-5 py-4 text-muted md:px-12"
    >
      <Link href="/" className="hover:text-ink">
        Úvod
      </Link>
      <span aria-hidden className="px-2">
        /
      </span>
      <span className="text-accent-quiet">{current}</span>
    </nav>
  );
}

/** Pruh "Rozsah služeb" pod herem podstránky. */
export function ScopeBar({ items }: { items: readonly string[] }) {
  return (
    <div className="border-y border-border bg-surface">
      <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5">
        <h2 className="btn-label mr-[18px] border-border py-2 pr-[18px] text-[0.9375rem] text-ink md:border-r">
          Rozsah služeb
        </h2>
        <ul className="label-mono flex flex-wrap items-center gap-x-6 gap-y-2 py-2 text-muted">
          {items.map((item, index) => (
            <li key={item} className={index === 0 ? "text-accent-quiet" : ""}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
