import type { ReactNode } from "react";

/**
 * Ouverture des pages annexes : un titre, un chapô, rien d'autre. Pas de
 * surtitre, pas de filet décoratif : le titre dit déjà où l'on est.
 */
export function PageIntro({
  titre,
  chapo,
  children,
}: {
  titre: ReactNode;
  chapo?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="s-container pb-12 pt-16 lg:pb-16 lg:pt-24">
      <h1 className="s-h1 max-w-[16em] text-encre">{titre}</h1>
      {chapo && <p className="s-lead mt-6 max-w-[34em]">{chapo}</p>}
      {children}
    </div>
  );
}
