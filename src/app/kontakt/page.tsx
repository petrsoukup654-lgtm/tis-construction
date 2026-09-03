import type { Metadata } from "next";
import { contact, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `${site.name}, ${contact.street}, ${contact.postalCode} ${contact.city}. Napište nám na ${contact.email} nebo pošlete nezávaznou poptávku.`,
};

export default function KontaktPage() {
  return (
    <>
      <div data-tone="dark" className="bg-bg">
        <Breadcrumbs current="Kontakt" />
        <Container className="py-14 md:py-16">
          <p className="eyebrow text-accent-quiet">Ozvěte se</p>
          <h1 className="h-hero mt-4 text-[2.5rem] text-white sm:text-[3.25rem]">
            Kontakt
          </h1>
          <p className="mt-5 max-w-[520px] text-[1.09375rem] leading-[1.6] text-body">
            Pošlete zadání — do dvou pracovních dnů se vám vrátíme s návrhem
            řešení.
          </p>
        </Container>
      </div>

      <section className="bg-bg">
        <Container className="grid items-start gap-12 py-16 lg:grid-cols-2">
          <div>
            <h2 className="h-section text-[1.75rem] text-ink">Sídlo firmy</h2>
            <dl className="mt-6 flex flex-col gap-5 border-t border-border pt-6">
              <div>
                <dt className="label-mono text-muted">Adresa</dt>
                <dd className="mt-1 text-[1rem]">
                  {site.name}
                  <br />
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-muted">E-mail</dt>
                <dd className="mt-1 text-[1rem]">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-accent hover:underline"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-muted">Telefon</dt>
                <dd className="mt-1 text-[1rem]">
                  <a
                    href={contact.phoneHref}
                    className="text-accent hover:underline"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-muted">Fakturační údaje</dt>
                <dd className="mt-1 text-[1rem]">
                  IČ {contact.ico}
                  {contact.dic ? (
                    <>
                      <br />
                      DIČ {contact.dic}
                    </>
                  ) : null}
                </dd>
              </div>
            </dl>
          </div>

          <div
            data-tone="dark"
            className="bg-[#15202f] px-8 py-9"
            id="poptavka"
          >
            <h2 className="h-card text-[1.75rem] text-white">
              Nezávazná poptávka
            </h2>
            <p className="mt-2.5 text-[0.96875rem] leading-[1.6] text-body">
              Stačí pár vět o tom, co potřebujete. Ozveme se s návrhem řešení.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
