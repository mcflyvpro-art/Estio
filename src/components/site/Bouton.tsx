import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Les deux boutons du site, et aucun autre (DESIGN.md §4).
 *
 * Principal : fond bleu, un seul visible par écran. Secondaire : filaire.
 * Le seul mouvement est l'appui : le bouton descend d'un pixel.
 */

type Variante = "principal" | "secondaire";
type Taille = "normal" | "compact";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-site font-texte text-[16px] " +
  "font-semibold leading-none whitespace-nowrap select-none " +
  "transition-colors duration-150 active:translate-y-px";

const VARIANTES: Record<Variante, string> = {
  principal: "bg-bleu text-feuille hover:bg-bleu-fonce",
  secondaire: "border border-encre-3 text-encre hover:bg-retrait",
};

const TAILLES: Record<Taille, string> = {
  normal: "h-12 px-5",
  compact: "h-10 px-4",
};

type Commun = {
  variante?: Variante;
  taille?: Taille;
  children: ReactNode;
  className?: string;
  /** Icône après le libellé, typiquement une flèche. */
  apres?: ReactNode;
};

export function BoutonLien({
  href,
  variante = "principal",
  taille = "normal",
  apres,
  children,
  className,
  ...rest
}: Commun & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cx(BASE, VARIANTES[variante], TAILLES[taille], className)}
      {...rest}
    >
      {children}
      {apres}
    </Link>
  );
}

export function Bouton({
  variante = "principal",
  taille = "normal",
  apres,
  children,
  className,
  type = "button",
  ...rest
}: Commun & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cx(
        BASE,
        VARIANTES[variante],
        TAILLES[taille],
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {children}
      {apres}
    </button>
  );
}
