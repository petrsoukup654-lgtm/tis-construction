import Link from "next/link";
import { about, contact, divisions, featuredReferences, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Photo, SectionHeading } from "@/components/ui/Section";
import { ReferenceGrid, StatBar } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      {/* HERO — průmyslový režim */}
      <section data-tone="dark" className="bg-bg">
        <div className="mx-auto grid w-full max-w-[1280px] lg:grid-cols-[.86fr_1.14fr]">
          <div className="px-5 py-14 md:px-12 md:py-16">
            <p className="eyebrow text-accent-quiet">
              {contact.city} · od {site.founded}
            </p>
            <h1 className="h-hero mt-5 text-[2.75rem] text-white sm:text-[3.5rem] lg:text-[3.875rem]">
              Strojní
              <br />
              a stavební
              <br />
              realizace
            </h1>
            <p className="mt-5 max-w-[420px] text-[1.09375rem] leading-[1.6] text-body">
              Dopravní systémy pro sypké materiály, ocelové konstrukce
              a kompletní stavební práce. Od projektu po předání.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/kontakt#poptavka">Nezávazná poptávka</Button>
              <Button href="/reference" variant="outline" className="text-white">
                Naše realizace
              </Button>
            </div>
          </div>
          <Photo
            src="/photos/hero-montaz-dopravniku.webp"
            alt="Jeřáb usazuje obloukový dopravníkový most na ocelové podpěry"
            ratio="hero-photo"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            blend
          />
        </div>
      </section>

      <StatBar />

      {/* DIVIZE */}
      <section className="bg-bg">
        <Container className="pt-16 md:pt-[4.5rem]">
          <SectionHeading eyebrow="Co děláme" title="Dvě divize, jeden dodavatel" />
        </Container>
        <Container className="grid gap-6 pb-16 pt-8 md:grid-cols-2 md:pb-[4.5rem]">
          {divisions.map((division) => (
            <article
              key={division.slug}
              className="border border-t-[3px] border-border border-t-accent bg-surface"
            >
              <Photo
                src={division.photo}
                alt={division.photoLabel}
                ratio="h-[180px]"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="border-b border-border"
              />
              <div className="px-6 pb-7 pt-7">
                <p className="label-mono tracking-[0.18em] text-accent">
                  {division.number}
                </p>
                <h3 className="h-card mt-2 text-[1.875rem] text-ink">
                  <Link href={division.href} className="hover:text-accent">
                    {division.title}
                  </Link>
                </h3>
                <p className="prose-body mt-3 text-[0.96875rem] leading-[1.6]">
                  {division.summary}
                </p>
                <ul className="list-square mt-5 flex flex-col gap-2.5 border-t border-hairline pt-5 text-[0.9375rem] text-ink">
                  {division.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Button
                  href={division.href}
                  variant="quiet"
                  className="mt-6 inline-block"
                >
                  Detail divize →
                </Button>
              </div>
            </article>
          ))}
        </Container>
      </section>

      {/* REFERENCE */}
      <section className="border-y border-border bg-surface">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Vybrané realizace"
            title="Reference"
            action={
              <Button href="/reference" variant="quiet">
                Všechny realizace →
              </Button>
            }
            className="mb-7"
          />
          <ReferenceGrid references={featuredReferences} />
        </Container>
      </section>

      {/* O FIRMĚ + POPTÁVKA */}
      <section className="bg-bg">
        <Container className="grid items-start gap-14 py-16 md:py-[4.25rem] lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">{about.eyebrow}</p>
            <h2 className="h-section mt-2.5 text-[2rem] text-ink md:text-[2.25rem]">
              {about.title}
            </h2>
            <p className="prose-body mt-4 text-[1.03125rem] leading-[1.65]">
              {about.text}
            </p>
            <Button href="/o-nas" variant="quiet" className="mt-6 inline-block">
              Více o firmě →
            </Button>
          </div>

          <div data-tone="dark" className="bg-[#15202f] px-8 py-9">
            <h2 className="h-card text-[1.75rem] text-white">Máte poptávku?</h2>
            <p className="mt-2.5 text-[0.96875rem] leading-[1.6] text-body">
              Ozvěte se — do dvou pracovních dnů se vám vrátíme s návrhem řešení.
            </p>
            <div className="mt-6">
              <ContactForm id="poptavka" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
