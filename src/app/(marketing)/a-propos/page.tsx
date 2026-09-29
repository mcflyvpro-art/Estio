import type { Metadata } from "next";
import { metaPage } from "@/components/site/meta";
import { PageIntro } from "@/components/site/PageIntro";
import { BoutonLien } from "@/components/site/Bouton";
import { fr } from "@/components/site/typo";
import { IconArrowRight } from "@/components/ui/Icon";

export const metadata: Metadata = metaPage(
  "À propos",
  "Pourquoi Estio existe, les principes qui guident sa construction, et ce que nous refusons de faire.",
);

const CONVICTIONS = [
  {
    titre: "Le plus dur n'est pas de chercher. C'est de choisir.",
    texte:
      "Il existe de très bons sites d'annonces et beaucoup de calculettes de rentabilité. Il manquait l'outil qui se souvient des vingt annonces que vous suivez, de celles que vous avez écartées et pourquoi, de l'agent à relancer. Aujourd'hui, tout cela vit dans un tableur, des notes et des dizaines d'onglets. Estio le rassemble.",
  },
  {
    titre: "Estio garde le bien, pas le résultat.",
    texte:
      "Un calcul vieillit : les taux bougent, le marché bouge, votre situation aussi. Le bien, lui, ne change pas. Estio conserve donc le bien et refait le calcul chaque fois que vous l'ouvrez. Rouvrir une annonce trois mois plus tard ne vous donne jamais un résultat périmé.",
  },
  {
    titre: "Aucun chiffre ne sort d'une IA.",
    texte:
      "L'IA lit vos documents pour remplir la fiche d'un bien, et rédige une comparaison en français. Elle ne calcule rien. Rendement, mensualité, impôt, plus-value : tout vient de formules fixes, dont le détail est affiché.",
  },
  {
    titre: "Le classement dépend de vos priorités.",
    texte:
      "Il n'existe pas de meilleur bien dans l'absolu. Tout dépend de ce que vous cherchez : des revenus tout de suite, de la sécurité, de la valeur à long terme. Vous choisissez, et Estio montre le détail, critère par critère.",
  },
  {
    titre: "Les limites sont écrites là où on lit le chiffre.",
    texte:
      "Les données publiques sont inégales. Le loyer du secteur est une moyenne de la commune, pas de votre immeuble. La lecture d'une capture peut se tromper. Une projection de revente est un scénario. Estio le dit à côté du chiffre concerné, pas dans une note en bas de page.",
  },
];

const REFUS = [
  "Copier les annonces des sites immobiliers.",
  "Vendre des données publiques.",
  "Faire payer le fait de savoir si une annonce vaut le coup.",
  "Promettre une valeur de revente.",
  "Se présenter comme un conseil en investissement.",
];

export default function APropos() {
  return (
    <>
      <PageIntro
        titre="Entre l'annonce et l'offre, il manquait un outil."
        chapo="Entre la première annonce repérée et l'offre signée, il se passe souvent des mois et des dizaines de décisions. Estio est fait pour ce moment-là."
      />

      <section className="s-container pb-24">
        <ol className="border-t border-encre">
          {CONVICTIONS.map((c, i) => (
            <li key={c.titre} className="grid gap-4 border-b border-filet py-10 md:grid-cols-12 md:gap-8">
              <span className="s-num font-serif text-[44px] leading-none text-encre-3 md:col-span-1">
                {i + 1}
              </span>
              <h2 className="s-h3 text-encre md:col-span-4">{c.titre}</h2>
              <p className="s-body max-w-[34em] md:col-span-7">{fr(c.texte)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-filet bg-retrait">
        <div className="s-container s-section">
          <h2 className="s-h2 max-w-[18em] text-encre">Ce que nous ne ferons pas.</h2>
          <ul className="mt-10 max-w-[44rem] border-t border-encre">
            {REFUS.map((r) => (
              <li key={r} className="border-b border-filet py-4 text-[19px] text-encre">
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <BoutonLien href="/inscription" apres={<IconArrowRight size={16} />}>
              Créer un compte gratuit
            </BoutonLien>
          </div>
        </div>
      </section>
    </>
  );
}
