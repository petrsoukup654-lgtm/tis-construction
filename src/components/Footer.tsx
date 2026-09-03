import Image from "next/image";
import Link from "next/link";
import { contact, divisions, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer data-tone="dark" className="bg-bg text-ink">
      <Container className="py-11">
        <div className="grid gap-9 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/tis-logo-dark.png"
              alt="TIS Construction"
              width={420}
              height={140}
              className="h-[46px] w-auto"
            />
            <address className="mt-4 text-[0.90625rem] not-italic leading-[1.7] text-muted">
              {contact.street}, {contact.postalCode} {contact.city}
              <br />
              IČ {contact.ico}
              {contact.dic ? ` · DIČ ${contact.dic}` : ""}
            </address>
          </div>

          <div>
            <h2 className="label-mono mb-2 text-accent-quiet">Služby</h2>
            <ul className="text-[0.90625rem] leading-8 text-body">
              {divisions.map((division) => (
                <li key={division.slug}>
                  <Link href={division.href} className="hover:text-ink">
                    {division.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/reference" className="hover:text-ink">
                  Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="label-mono mb-2 text-accent-quiet">Kontakt</h2>
            <ul className="text-[0.90625rem] leading-8 text-body">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-ink">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="hover:text-ink">
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="label-mono mt-10 border-t border-border pt-6 text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
