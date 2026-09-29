import Link from "next/link";

/**
 * Comment ça marche. Quatre étapes, celles de l'outil, dans l'ordre où on les
 * vit. Les trois dernières renvoient à leur démonstration plus bas : cette
 * section sert aussi de sommaire à la page.
 */

const ETAPES = [
  {
    titre: "Ajoutez l'annonce",
    texte:
      "Capture d'écran, PDF d'agence, photo d'une fiche papier ou message de l'agent. Estio en lit le prix, la surface et l'adresse. Vous vérifiez avant d'enregistrer.",
  },
  {
    titre: "Lisez la réponse",
    texte:
      "Bon dossier, à creuser ou peu favorable. Chaque réponse vient avec le calcul complet et une phrase qui dit quoi faire.",
    lien: { href: "#calcul", label: "Voir le calcul" },
  },
  {
    titre: "Suivez votre recherche",
    texte:
      "Chaque annonce avance d'étape en étape, jusqu'à l'offre. Vos notes, votre prix maximum et vos raisons d'écarter restent attachés au bien.",
    lien: { href: "#suivi", label: "Voir le suivi" },
  },
  {
    titre: "Choisissez entre vos finalistes",
    texte:
      "Dites ce qui compte pour vous. Estio vous indique lequel y répond le mieux, et explique pourquoi.",
    lien: { href: "#comparer", label: "Voir la comparaison" },
  },
];

export function Etapes() {
  return (
    <section id="comment" className="border-t border-filet bg-retrait">
      <div className="s-container s-section">
        <h2 className="s-h2 max-w-[18em] text-encre">Comment ça marche</h2>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="border-t border-encre pt-6">
              <span className="s-num font-serif text-[44px] leading-none text-encre-3">
                {i + 1}
              </span>
              <h3 className="s-h3 mt-5 text-encre">{e.titre}</h3>
              <p className="s-body mt-3">{e.texte}</p>
              {e.lien && (
                <Link href={e.lien.href} className="s-link s-small mt-4 inline-block">
                  {e.lien.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
