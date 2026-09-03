"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, desktopNav, nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Otevřené menu překrývá celou obrazovku — pod ním se nemá scrollovat.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-tone="dark"
      className="sticky top-0 z-50 border-b border-border bg-surface"
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-5 md:h-[84px] md:px-12">
        <Link href="/" aria-label={`${contact.city} — TIS Construction, úvodní stránka`}>
          <Image
            src="/brand/tis-logo-dark.png"
            alt="TIS Construction"
            width={420}
            height={140}
            priority
            className="h-10 w-auto md:h-[52px]"
          />
        </Link>

        <div className="hidden items-center gap-[30px] lg:flex">
          <nav aria-label="Hlavní navigace">
            <ul className="flex gap-[26px]">
              {desktopNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`btn-label border-b-2 pb-[3px] text-[0.96875rem] transition-colors ${
                      isActive(item.href)
                        ? "border-accent text-ink"
                        : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/kontakt#poptavka"
            className="btn-label bg-accent px-5 py-3 text-[0.90625rem] text-on-accent transition-colors hover:bg-accent-hover"
          >
            Poptávka
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-ink transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-ink transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-ink transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          data-tone="dark"
          className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-bg lg:hidden"
        >
          <nav aria-label="Hlavní navigace">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`h-card block px-5 py-5 text-[1.375rem] ${
                      isActive(item.href) ? "text-accent-quiet" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-5 py-8">
            <Link
              href="/kontakt#poptavka"
              onClick={() => setOpen(false)}
              className="btn-label flex items-center justify-center bg-accent px-6 py-4 text-[0.9375rem] text-on-accent"
            >
              Nezávazná poptávka
            </Link>
            <address className="mt-6 text-[0.90625rem] not-italic leading-8 text-body">
              <a href={`mailto:${contact.email}`} className="hover:text-ink">
                {contact.email}
              </a>
              <br />
              <a href={contact.phoneHref} className="hover:text-ink">
                {contact.phone}
              </a>
              <br />
              {contact.street}, {contact.city}
            </address>
          </div>
        </div>
      )}
    </header>
  );
}
