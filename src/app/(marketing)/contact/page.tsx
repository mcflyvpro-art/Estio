import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { FormulaireContact } from "@/components/site/FormulaireContact";
import { fr } from "@/components/site/typo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Un chiffre qui vous semble faux, une question, un usage professionnel : écrivez à l'équipe d'Estio.",
};

/**
 * L'adresse de contact vient de l'environnement (`NEXT_PUBLIC_CONTACT_EMAIL`).
 * Tant qu'elle n'est pas renseignée, la page le dit : on n'affiche pas une
 * adresse qui n'existe pas, et on ne simule pas un envoi.
 */
const DESTINATAIRE = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

const RAISONS = [
  {
    titre: "Un chiffre qui vous semble faux",
    texte:
      "C'est le message le plus utile. La qualité des données est le vrai défi d'Estio. Donnez-nous l'adresse du bien et le chiffre qui vous étonne.",
  },
  {
    titre: "Un usage professionnel",
    texte:
      "Conseiller en patrimoine, chasseur immobilier : la formule Expert se construit avec vous. Dites-nous ce qui vous manque.",
  },
  {
    titre: "La presse",
    texte: "Précisez le média et votre date limite.",
  },
];

export default function Contact() {
  return (
    <>
      <PageIntro
        titre="Écrivez-nous."
        chapo="Les compliments font plaisir. Les objections font avancer le produit : un chiffre douteux, une étape qui manque, une règle fiscale à revoir."
      />

      <section className="s-container pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <ul className="border-t border-encre">
              {RAISONS.map((r) => (
                <li key={r.titre} className="border-b border-filet py-6">
                  <h2 className="text-[19px] font-semibold text-encre">{r.titre}</h2>
                  <p className="s-body mt-2">{fr(r.texte)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            {DESTINATAIRE ? (
              <FormulaireContact destinataire={DESTINATAIRE} />
            ) : (
              <div className="rounded-site border border-filet bg-feuille p-6 sm:p-8">
                <h2 className="s-h3 text-encre">L&apos;adresse de contact arrive.</h2>
                <p className="s-body mt-3 max-w-[34em]">
                  Estio est en construction et son adresse e-mail n&apos;est pas encore
                  ouverte. Plutôt qu&apos;un formulaire qui ne mènerait nulle part, nous
                  publierons ici une adresse qui répond, dès qu&apos;elle existera.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
