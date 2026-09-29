import { fr } from "@/components/site/typo";

/**
 * D'OÙ VIENNENT LES CHIFFRES · ce qui tient lieu de preuve.
 *
 * Pas d'avis inventés, pas de compteur de clients : Estio n'en a pas encore.
 * À la place, ce qu'on peut vérifier soi-même : les sources publiques, leur
 * précision réelle, et ce qu'Estio s'interdit.
 */

const SOURCES = [
  {
    affiche: "Prix de vente réels du secteur",
    source: "Demandes de valeurs foncières (DVF), Direction générale des Finances publiques",
    precision: "Commune ou quartier",
  },
  {
    affiche: "Loyer estimé du secteur",
    source: "Carte des loyers, publiée par l'État",
    precision: "Commune",
  },
  {
    affiche: "Logements vacants, population",
    source: "INSEE",
    precision: "Commune ou quartier",
  },
  {
    affiche: "Risques naturels et technologiques",
    source: "Géorisques",
    precision: "Adresse ou commune, selon le risque",
  },
  {
    affiche: "Performance énergétique",
    source: "Base des diagnostics de l'ADEME",
    precision: "Logement ou immeuble",
  },
  {
    affiche: "Adresse et position sur la carte",
    source: "Base adresse nationale",
    precision: "Adresse",
  },
];

const ENGAGEMENTS = [
  {
    titre: "Aucun chiffre n'est calculé par une IA.",
    texte:
      "Une IA lit votre capture pour remplir la fiche, et vous vérifiez ce qu'elle a lu. Les calculs suivent des formules fixes, les mêmes pour tout le monde.",
  },
  {
    titre: "Estio ne copie pas les sites d'annonces.",
    texte:
      "Vous ajoutez les annonces que vous regardez déjà. Estio n'en récupère aucune sur les portails\u00a0: leurs conditions d'utilisation l'interdisent.",
  },
  {
    titre: "L'approximatif est signalé.",
    texte:
      "Le loyer du secteur est une moyenne de la commune ou du quartier, pas de votre immeuble. Estio l'indique à côté du chiffre.",
  },
  {
    titre: "Estio ne remplace pas un conseiller.",
    texte:
      "C'est un outil pour vous aider à décider. Avant de signer, faites vérifier les chiffres qui comptent par un professionnel.",
  },
];

export function Sources() {
  return (
    <section id="sources" className="border-t border-filet bg-retrait">
      <div className="s-container s-section">
        <div className="max-w-[40em]">
          <h2 className="s-h2 text-encre">D&apos;où viennent les chiffres.</h2>
          <p className="s-lead mt-6">
            De données publiques, que tout le monde peut consulter. Estio les rassemble et
            fait les calculs. Il ne les modifie pas et ne les revend pas.
          </p>
        </div>

        {/* Écran large : un vrai tableau. */}
        <table className="mt-12 hidden w-full border-collapse text-left md:table">
          <caption className="sr-only">Les sources publiques utilisées par Estio</caption>
          <thead>
            <tr className="border-b-2 border-encre">
              <th scope="col" className="s-small py-3 pr-6 font-semibold text-encre">
                Ce qu&apos;Estio affiche
              </th>
              <th scope="col" className="s-small py-3 pr-6 font-semibold text-encre">
                Source publique
              </th>
              <th scope="col" className="s-small py-3 font-semibold text-encre">
                Précision
              </th>
            </tr>
          </thead>
          <tbody>
            {SOURCES.map((s) => (
              <tr key={s.affiche} className="border-b border-filet">
                <th scope="row" className="py-4 pr-6 align-top text-[17px] font-semibold text-encre">
                  {s.affiche}
                </th>
                <td className="py-4 pr-6 align-top text-[17px] text-encre-2">{s.source}</td>
                <td className="py-4 align-top text-[17px] text-encre-2">{s.precision}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile : une liste lisible, sans tableau à faire défiler. */}
        <ul className="mt-10 border-t-2 border-encre md:hidden">
          {SOURCES.map((s) => (
            <li key={s.affiche} className="border-b border-filet py-4">
              <p className="text-[17px] font-semibold text-encre">{s.affiche}</p>
              <p className="s-small mt-1 text-encre-2">{s.source}</p>
              <p className="s-small text-encre-3">Précision&nbsp;: {s.precision.toLowerCase()}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {ENGAGEMENTS.map((e) => (
            <div key={e.titre} className="border-t border-encre pt-5">
              <h3 className="s-h3 text-encre">{e.titre}</h3>
              <p className="s-body mt-3 max-w-[34em]">{fr(e.texte)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
