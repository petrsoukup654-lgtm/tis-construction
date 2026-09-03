import type { Metadata } from "next";
import { about, contact, divisions, site, stats } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Blocks";
import { Photo } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "O nás",
  description: about.text,
};

export default function ONasPage() {
  return (
    <>
      <div data-tone="dark" className="bg-bg">
        <Breadcrumbs current="O nás" />
        <Container className="py-14 md:py-16">
          <p className="eyebrow text-accent-quiet">{about.eyebrow}</p>
          <h1 className="h-hero mt-4 max-w-[720px] text-[2.25rem] text-white sm:text-[3rem]">
            {about.title}
          </h1>
          <p className="mt-5 max-w-[620px] text-[1.09375rem] leading-[1.65] text-body">
            {about.text}
          </p>
        </Container>
      </div>

      <div className="border-b border-border bg-surface">
        <Container className="grid grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6">
              <p className="h-card text-[2.375rem] leading-none text-accent">
                {stat.value}
              </p>
              <p className="label-mono mt-1 text-muted">{stat.label}</p>
            </div>
          ))}
        </Container>
      </div>

      <section className="bg-bg">
        <Container className="grid items-start gap-12 py-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">Jak fungujeme</p>
            <h2 className="h-section mt-2.5 text-[2rem] text-ink">
              Jedna odpovědnost za celou zakázku
            </h2>
            <p className="prose-body mt-4 text-[1.03125rem]">
              Vlastní projekce, výroba i montáž znamenají, že investor
              nekoordinuje projektanta, výrobu a montážní firmu zvlášť.
              Od {site.founded} působíme po celé České republice se sídlem
              v {contact.city}i.
            </p>
            <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              {divisions.map((division) => (
                <li key={division.slug} className="flex gap-3 text-[0.96875rem]">
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  <span>
                    <strong className="font-semibold">{division.title}</strong>{" "}
                    <span className="text-body">{division.summary}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button href="/kontakt#poptavka" className="mt-8">
              Nezávazná poptávka
            </Button>
          </div>
          <Photo
            src="/photos/ref-vyroba-dopravniku.webp"
            alt="Montáž rozsáhlé trasy pásové dopravy"
            ratio="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="border border-border"
          />
        </Container>
      </section>
    </>
  );
}
