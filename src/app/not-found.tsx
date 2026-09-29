import type { Metadata } from "next";
import { POLICES_SITE } from "@/app/polices-site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BoutonLien } from "@/components/site/Bouton";
import { EstioMark } from "@/components/site/Logo";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/**
 * 404. Elle s'affiche hors de la mise en page du site : elle pose donc
 * elle-même l'enveloppe `.site`, les polices, l'en-tête et le pied de page.
 */
export default function NotFound() {
  return (
    <div data-theme="light" className={`site ${POLICES_SITE} flex min-h-screen flex-col`}>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        <section className="s-container s-section">
          <EstioMark className="h-16 w-auto text-encre-3" />
          <h1 className="s-h1 mt-8 max-w-[14em] text-encre">Cette page n&apos;existe pas.</h1>
          <p className="s-lead mt-6 max-w-[34em]">
            Le lien est peut-être cassé, ou la page a changé d&apos;adresse. Rien n&apos;est
            perdu pour autant.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <BoutonLien href="/">Retour à l&apos;accueil</BoutonLien>
            <BoutonLien href="/faq" variante="secondaire">
              Questions fréquentes
            </BoutonLien>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
