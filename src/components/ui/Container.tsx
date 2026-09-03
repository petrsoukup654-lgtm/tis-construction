import type { ReactNode } from "react";

/** Mřížka podle design systému: max-width 1280, okraj 48 px (mobil 20 px). */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-12 ${className}`}>
      {children}
    </div>
  );
}
