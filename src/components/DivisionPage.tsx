import type { Division } from "@/lib/site";
import { contact, references } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Photo, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs, ProcessList, ReferenceGrid, ScopeBar } from "@/components/Blocks";

/**
 * Společná šablona podstránek oborů (wireframe 2a / 2b).
 * Celá stránka běží v průmyslovém režimu, sekce s referencemi je světlá.
 */
export function DivisionPage({ division }: { division: Division }) {
  const divisionReferences = references.filter(
    (reference) => reference.category === division.category,
  );

  return (
    <div data-tone="dark" className="bg-bg">
      <Breadcrumbs current={division.title} />

      {/* HERO */}
      <div className="mx-auto grid w-full max-w-[1280px] lg:grid-cols-[1fr_.85fr]">
        <div className="px-5 py-14 md:px-12 md:py-16">
          <p className="eyebrow text-accent-quiet">{division.number}</p>
          <h1 className="h-hero mt-4 text-[2.5rem] text-white sm:text-[3.25rem] lg:text-[3.625rem]">
            {division.title}
          </h1>
          <p className="mt-5 max-w-[470px] text-[1.09375rem] leading-[1.6] text-body">
            {division.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/kontakt#poptavka">{division.ctaButton}</Button>
            <Button href="/reference" variant="outline" className="text-white">
              Prohlédnout realizace
            </Button>
          </div>
        </div>
        <Photo
          src={division.heroPhoto}
          alt={division.heroPhotoLabel}
          ratio="hero-photo--sub"
          sizes="(max-width: 1024px) 100vw, 44vw"
          priority
          className="border-border lg:border-l"
        />
      </div>

      <ScopeBar items={division.scope} />

      {/* PŘEHLED ČINNOSTÍ */}
      <Container className="pt-16">
        <p className="eyebrow text-accent-quiet">{division.activitiesEyebrow}</p>
        <h2 className="h-section mt-2.5 text-[2rem] text-ink md:text-[2.5rem]">
          {division.activitiesTitle}
        </h2>
      </Container>
      <Container className="grid gap-5 pb-16 pt-8 md:grid-cols-2">
        {division.activities.map((activity) => (
          <article
            key={activity.number}
            className="border border-t-[3px] border-border border-t-accent bg-surface p-6"
          >
            <p className="label-mono tracking-[0.16em] text-accent-quiet">
              {activity.number}
            </p>
            <h3 className="h-card mt-2 text-[1.5rem] text-ink">{activity.title}</h3>
            <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-body">
              {activity.text}
            </p>
          </article>
        ))}
      </Container>

      {/* JAK PRACUJEME */}
      <div className="border-y border-border bg-surface">
        <Container className="grid items-start gap-14 py-16">
          <div className="grid items-start gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-accent-quiet">{division.processEyebrow}</p>
              <h2 className="h-section mt-2.5 text-[2rem] text-ink md:text-[2.25rem]">
                {division.processTitle}
              </h2>
              <p className="mt-3.5 text-[1rem] leading-[1.65] text-body">
                {division.processLead}
              </p>
            </div>
            <ProcessList steps={division.process} />
          </div>
        </Container>
      </div>

      {/* REALIZACE — světlá sekce uvnitř tmavé stránky */}
      {divisionReferences.length > 0 && (
        <section data-tone="light" className="bg-bg">
          <Container className="py-15 md:py-16">
            <SectionHeading
              eyebrow="03 — Realizace"
              title={`${division.category} zakázky`}
              action={
                <Button href="/reference" variant="quiet">
                  Všechny realizace →
                </Button>
              }
              className="mb-6"
            />
            <ReferenceGrid references={divisionReferences.slice(0, 3)} />
          </Container>
        </section>
      )}

      {/* CTA */}
      <Container className="flex flex-wrap items-center justify-between gap-10 border-b border-border py-14">
        <div>
          <h2 className="h-card text-[2.125rem] text-ink">
            {division.ctaTitle}
          </h2>
          <p className="mt-2 text-[1rem] leading-[1.6] text-body">
            {division.ctaText}
          </p>
        </div>
        <div className="flex flex-none flex-wrap gap-3">
          <Button href="/kontakt#poptavka">Nezávazná poptávka</Button>
          <Button
            href={contact.phoneHref}
            variant="outline"
            className="text-white"
          >
            {contact.phone}
          </Button>
        </div>
      </Container>
    </div>
  );
}
