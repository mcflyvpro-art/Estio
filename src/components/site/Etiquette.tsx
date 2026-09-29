import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Petite étiquette filaire. Sert surtout à marquer un exemple : aucun aperçu du
 * produit n'est présenté sans dire qu'il est fictif (DESIGN.md §8).
 */
export function Etiquette({
  children = "Exemple fictif",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "s-fine inline-flex items-center rounded-site border border-filet bg-feuille px-2 py-0.5 text-encre-3",
        className,
      )}
    >
      {children}
    </span>
  );
}
