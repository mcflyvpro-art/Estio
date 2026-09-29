import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/PageIntro";
import { fr } from "@/components/site/typo";
import { IconPlus } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "D'où viennent les chiffres, ce que fait l'IA et ce qu'elle ne fait pas, ce qui est gratuit, ce qui reste approximatif : les réponses franches sur Estio.",
};

/**
 * Les réponses disent aussi ce qui désavantage le produit : précision
 * imparfaite, lecture de capture faillible, aucune garantie de revente.
 *
 * Éléments natifs <details> : ouverture au clavier, lecteurs d'écran et
 * recherche dans la page fonctionnent sans une ligne de JavaScript.
 */
const QUESTIONS = [
  {
    q: "D'où viennent les chiffres ?",
    r: "De données publiques que tout le monde peut consulter : les ventes enregistrées par les notaires (DVF), la carte des loyers de l'État, l'INSEE, Géorisques, les diagnostics de l'ADEME et la Base adresse nationale. Estio les rassemble et fait les calculs. Il ne les modifie pas et ne les revend pas.",
  },
  {
    q: "Une IA calcule-t-elle mes chiffres ?",
    r: "Non. Une IA sert à deux choses : lire votre capture pour remplir la fiche du bien, et rédiger une comparaison en français. Tous les montants et pourcentages viennent de formules fixes, les mêmes pour tout le monde, dont le détail est affiché.",
  },
  {
    q: "Estio copie-t-il les annonces des sites immobiliers ?",
    r: "Non, jamais. Les conditions d'utilisation des portails l'interdisent. Vous ajoutez vous-même les annonces que vous regardez, par une capture d'écran ou un document.",
  },
  {
    q: "Et une annonce qui n'est sur aucun site ?",
    r: "Elle s'ajoute de la même façon. PDF d'agence, message d'un agent, photo d'une fiche papier, bien trouvé par le bouche-à-oreille : tout ce que vous pouvez photographier peut devenir une fiche.",
  },
  {
    q: "La lecture de ma capture peut-elle se tromper ?",
    r: "Oui. C'est pourquoi Estio vous montre toujours ce qu'il a lu avant d'enregistrer. Vous corrigez ce qui ne va pas. Les photos floues ou de travers sont les plus difficiles à lire.",
  },
  {
    q: "Qu'est-ce qui est gratuit ?",
    r: "Le verdict de chaque annonce, sans limite et sans crédit à dépenser. Les formules payantes ajoutent la précision : loyer du secteur exact, détail du verdict, rendement après impôt, hypothèses réglables en direct.",
  },
  {
    q: "Estio fonctionne-t-il partout en France ?",
    r: "Oui, dans la limite des données publiques disponibles. Elles sont plus riches en ville qu'à la campagne, où les ventes sont moins nombreuses.",
  },
  {
    q: "Les données sont-elles précises à l'immeuble près ?",
    r: "Non. Les loyers, les prix de vente et les logements vacants sont connus à l'échelle de la commune ou du quartier. Deux appartements de la même rue partagent donc les mêmes données de secteur. Ce qui les distingue, ce sont leurs caractéristiques et vos hypothèses.",
  },
  {
    q: "La valeur de revente est-elle garantie ?",
    r: "Non. Les projections de revente sont des scénarios construits sur des hypothèses que vous choisissez : prudente, centrale ou dynamique. Personne ne peut prédire un marché immobilier.",
  },
  {
    q: "Mes données restent-elles privées ?",
    r: "Vos projets, vos annonces et vos notes ne sont visibles que par vous. Aucune donnée personnelle n'est revendue. Le détail est dans la politique de confidentialité.",
  },
  {
    q: "Estio remplace-t-il un conseiller ?",
    r: "Non. C'est un outil pour vous aider à décider, pas un conseil en investissement. Avant de signer, faites vérifier les chiffres qui comptent par un professionnel.",
  },
];

export default function Faq() {
  return (
    <>
      <PageIntro
        titre="Vos questions, nos réponses franches."
        chapo="Y compris quand la réponse ne nous avantage pas. Vous saurez ce que fait Estio, et ce qu'il ne sait pas faire."
      />

      <section className="s-container pb-24">
        <div className="max-w-[52rem] border-t border-encre">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group border-b border-filet">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-[19px] font-semibold leading-snug text-encre">{fr(item.q)}</span>
                <IconPlus
                  size={20}
                  className="mt-1 shrink-0 text-encre-2 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="s-body max-w-[40em] pb-6">{fr(item.r)}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 max-w-[52rem] rounded-site border border-filet bg-feuille p-6">
          <h2 className="s-h3 text-encre">Votre question n&apos;est pas là&#8239;?</h2>
          <p className="s-body mt-2">Écrivez-nous. Les questions qui reviennent finissent sur cette page.</p>
          <Link href="/contact" className="s-link mt-4 inline-block text-[16px]">
            Nous écrire
          </Link>
        </div>
      </section>
    </>
  );
}
