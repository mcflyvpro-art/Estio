"use client";

import { useEffect } from "react";
import { POLICES_SITE } from "@/app/polices-site";
import { Bouton, BoutonLien } from "@/components/site/Bouton";

/**
 * Erreur inattendue sur une page publique (l'outil a la sienne, dans
 * `(app)/error.tsx`). On dit ce qui s'est passé, sans culpabiliser, et on propose
 * deux gestes : réessayer ou revenir à l'accueil. L'identifiant technique est
 * affiché pour pouvoir être transmis tel quel.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div data-theme="light" className={`site ${POLICES_SITE} flex min-h-screen flex-col`}>
      <main className="s-container s-section flex-1">
        <h1 className="s-h1 max-w-[14em] text-encre">Une erreur est survenue.</h1>
        <p className="s-lead mt-6 max-w-[34em]">
          La page n&apos;a pas pu s&apos;afficher. Vos données ne sont pas touchées&nbsp;:
          rien n&apos;a été enregistré à moitié.
        </p>
        {error.digest && (
          <p className="s-small mt-6 text-encre-3">
            Référence de l&apos;erreur&nbsp;: <span className="s-num">{error.digest}</span>
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <Bouton onClick={reset}>Réessayer</Bouton>
          <BoutonLien href="/" variante="secondaire">
            Retour à l&apos;accueil
          </BoutonLien>
        </div>
      </main>
    </div>
  );
}
