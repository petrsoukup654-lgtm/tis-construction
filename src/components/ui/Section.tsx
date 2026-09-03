import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Sekce s volitelným průmyslovým (tmavým) režimem.
 * data-tone="dark" překlopí sémantické barevné tokeny uvnitř bloku.
 */
export function Section({
  tone = "light",
  as: Tag = "section",
  className = "",
  children,
  ...rest
}: {
  tone?: "light" | "dark";
  as?: "section" | "div" | "header" | "footer";
  className?: string;
  children: ReactNode;
} & { id?: string }) {
  return (
    <Tag
      data-tone={tone === "dark" ? "dark" : undefined}
      className={`bg-bg text-ink ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Nadpis sekce s eyebrow — opakuje se na všech stránkách. */
export function SectionHeading({
  eyebrow,
  title,
  action,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-4 ${className}`}
    >
      <div>
        <p className="eyebrow text-accent-quiet">{eyebrow}</p>
        <h2 className="h-section mt-2.5 text-[2rem] text-ink md:text-[2.625rem]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

/** Zástupný blok za fotografii — šrafování podle wireframu. */
export function PhotoPlaceholder({
  label,
  ratio = "aspect-[16/9]",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`photo-placeholder label-mono flex items-center justify-center border border-border text-center text-muted ${ratio} ${className}`}
    >
      {label}
    </div>
  );
}

/**
 * Fotografie s plynulým přechodem na zástupný blok.
 * Dokud slot nemá `src`, vykreslí se šrafování z wireframu — díky tomu
 * jde web nasadit i s neúplnou fotobankou.
 */
export function Photo({
  src,
  alt,
  ratio = "aspect-[16/9]",
  className = "",
  sizes = "100vw",
  priority = false,
  blend = false,
  objectPosition = "object-center",
}: {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Průmyslové ztmavení, aby fotka splynula s tmavým hero panelem. */
  blend?: boolean;
  objectPosition?: string;
}) {
  if (!src) {
    return <PhotoPlaceholder label={alt} ratio={ratio} className={className} />;
  }

  return (
    <div
      className={`relative overflow-hidden ${ratio} ${
        blend ? "photo-blend" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${objectPosition}`}
      />
    </div>
  );
}
