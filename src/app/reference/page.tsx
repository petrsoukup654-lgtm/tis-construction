import type { Metadata } from "next";
import { references } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, ReferenceGrid } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Vybrané strojní a stavební realizace TIS Construction — dopravní systémy, ocelové konstrukce, haly a rekonstrukce.",
};

export default function ReferencePage() {
  const strojni = references.filter((item) => item.category === "Strojní");
  const stavebni = references.filter((item) => item.category === "Stavební");

  return (
    <>
      <div data-tone="dark" className="bg-bg">
        <Breadcrumbs current="Reference" />
        <Container className="py-14 md:py-16">
          <p className="eyebrow text-accent-quiet">Vybrané realizace</p>
          <h1 className="h-hero mt-4 text-[2.5rem] text-white sm:text-[3.25rem]">
            Reference
          </h1>
          <p className="mt-5 max-w-[560px] text-[1.09375rem] leading-[1.6] text-body">
            Průřez zakázkami obou divizí — od dopravních systémů a ocelových
            konstrukcí až po haly, rekonstrukce a rodinné domy.
          </p>
        </Container>
      </div>

      <section className="bg-bg">
        <Container className="py-16">
          <h2 className="h-section text-[1.75rem] text-ink">Strojní zakázky</h2>
          <div className="mt-7">
            <ReferenceGrid references={strojni} />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface">
        <Container className="py-16">
          <h2 className="h-section text-[1.75rem] text-ink">Stavební zakázky</h2>
          <div className="mt-7">
            <ReferenceGrid references={stavebni} />
          </div>
        </Container>
      </section>

      <section className="bg-bg">
        <Container className="flex flex-wrap items-center justify-between gap-8 py-14">
          <div>
            <h2 className="h-card text-[2rem] text-ink">
              Chcete podobnou realizaci?
            </h2>
            <p className="prose-body mt-2 text-[1rem]">
              Pošlete zadání — do dvou pracovních dnů se ozveme s návrhem řešení.
            </p>
          </div>
          <Button href="/kontakt#poptavka">Nezávazná poptávka</Button>
        </Container>
      </section>
    </>
  );
}
