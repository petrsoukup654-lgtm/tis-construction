import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div data-tone="dark" className="bg-bg">
      <Container className="py-24 md:py-32">
        <p className="eyebrow text-accent-quiet">Chyba 404</p>
        <h1 className="h-hero mt-4 text-[2.5rem] text-white sm:text-[3.25rem]">
          Stránka nenalezena
        </h1>
        <p className="mt-5 max-w-[460px] text-[1.09375rem] leading-[1.6] text-body">
          Odkaz už neplatí nebo byl překlep v adrese.
        </p>
        <Button href="/" className="mt-8">
          Zpět na úvod
        </Button>
      </Container>
    </div>
  );
}
