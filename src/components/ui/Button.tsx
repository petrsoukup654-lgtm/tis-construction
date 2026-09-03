import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "quiet";

const base =
  "btn-label inline-flex items-center justify-center text-[0.9375rem] transition-colors";

const variants: Record<Variant, string> = {
  // Pravidlo 03 — modrá jen pro akce, čísla a akcenty.
  primary:
    "bg-accent text-on-accent px-6 py-[0.8125rem] hover:bg-accent-hover",
  outline:
    "border-[1.5px] border-outline text-ink px-6 py-[0.71875rem] hover:border-accent hover:text-accent",
  quiet:
    "text-accent-quiet border-b-2 border-accent pb-0.5 hover:text-accent",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: Variant; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "className" | "children"
>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** Stejný vzhled, ale jako skutečné <button> — pro odeslání formuláře. */
export function SubmitButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: Variant; children: ReactNode; className?: string } & Omit<
  ComponentProps<"button">,
  "className" | "children"
>) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
