import type { Metadata } from "next";
import { metaPage } from "@/components/site/meta";
import { PageIntro } from "@/components/site/PageIntro";
import { Formules } from "@/components/site/Formules";
import { fr } from "@/components/site/typo";

export const metadata: Metadata = metaPage(
  "Formules",
  "Free, Pro et Expert. Savoir si une annonce vaut le coup reste gratuit. Les formules payantes ajoutent la précision et le suivi. Tarifs indicatifs.",
);

const PRINCIPES = [
  {
    titre: "Pas de compteur sur le verdict.",
    texte:
      "Vous regarderez beaucoup d'annonces. Savoir si l'une d'elles vaut le coup ne consomme aucun crédit, quelle que soit votre formule.",
  },
  {
    titre: "Les données publiques ne sont jamais vendues.",
    texte:
      "Elles sont ouvertes à tous. Ce que vous payez, c'est le calcul, la comparaison et le suivi de votre recherche.",
  },
  {
    titre: "Vous payez le temps de votre recherche.",
    texte:
      "Une recherche dure quelques mois. Vous arrêtez l'abonnement quand votre offre est acceptée, et vous revenez pour le prochain achat.",
  },
];

export default function Tarifs() {
  return (
    <>
      <PageIntro
        titre="Gratuit pour commencer."
        chapo="Savoir si une annonce vaut le coup ne coûte rien. Les formules payantes ajoutent la précision et le suivi, pendant les mois où vous cherchez vraiment."
      />

      <section className="s-container pb-24">
        <Formules />
        <p className="s-small mt-8 max-w-[44em] text-encre-3">
          Tarifs indicatifs et non contractuels. La grille définitive sera fixée avant
          l&apos;ouverture des paiements.
        </p>
      </section>

      <section className="border-t border-filet bg-retrait">
        <div className="s-container s-section">
          <h2 className="s-h2 max-w-[18em] text-encre">Ce que nous avons décidé.</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {PRINCIPES.map((p) => (
              <div key={p.titre} className="border-t border-encre pt-5">
                <h3 className="s-h3 text-encre">{p.titre}</h3>
                <p className="s-body mt-3">{fr(p.texte)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
