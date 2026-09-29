import type { Metadata } from "next";
import { metaPage } from "@/components/site/meta";
import { PageIntro } from "@/components/site/PageIntro";
import { BoutonLien } from "@/components/site/Bouton";
import { IconArrowRight } from "@/components/ui/Icon";
import { STATUS_COLUMNS, type PropertyStatus } from "@/lib/pipeline-types";
import { fr } from "@/components/site/typo";

export const metadata: Metadata = metaPage(
  "Comment ça marche",
  "Ouvrez un projet, ajoutez vos annonces par capture, lisez le calcul, suivez chaque bien jusqu'à l'offre et choisissez entre vos finalistes.",
);

const ETAPES = [
  {
    titre: "Ouvrez un projet",
    texte:
      "Un projet, c'est un achat. Par exemple : « deux pièces à louer, 150 000 € au plus ». Il rassemble les annonces que vous suivez, vos notes et vos critères. Quand l'offre est signée, vous l'archivez.",
  },
  {
    titre: "Ajoutez vos annonces",
    texte:
      "Capture d'écran, PDF d'agence, photo d'une fiche papier, message de l'agent. Estio lit le prix, la surface, les charges et l'adresse, puis vous montre ce qu'il a compris. Vous corrigez avant d'enregistrer.",
  },
  {
    titre: "Lisez le calcul",
    texte:
      "À partir de l'adresse, Estio retrouve le loyer et les prix de vente du secteur. Il calcule la mensualité, les frais et ce qu'il vous restera chaque mois. Le résultat tient en un mot et une phrase : bon dossier, à creuser ou peu favorable.",
  },
  {
    titre: "Réglez vos hypothèses",
    texte:
      "Apport, taux, durée du prêt, régime fiscal. Chaque réglage recalcule tout, tout de suite. Vous voyez ce qui rend une annonce intéressante, ou ce qui la rend impossible.",
  },
  {
    titre: "Choisissez entre vos finalistes",
    texte:
      "Placez deux ou trois annonces côte à côte. Dites ce qui compte pour vous : les revenus, la sécurité ou la valeur à long terme. Estio indique laquelle y répond le mieux, critère par critère.",
  },
];

const ETAPES_SUIVI: Record<PropertyStatus, string> = {
  analyser: "L'annonce vient d'arriver. Elle attend votre premier regard.",
  analyse: "Vous avez lu le calcul. Elle mérite d'être suivie.",
  visite: "Une visite est prévue ou faite. Vos notes de visite y sont rangées.",
  nego: "Vous discutez le prix. Votre prix maximum reste sous vos yeux.",
  ecarte: "Vous l'avez écartée, avec la raison. Vous ne l'étudierez pas deux fois.",
  offre: "Vous avez fait une offre. C'est l'aboutissement de la recherche.",
};

const TROIS_SORTES = [
  {
    titre: "Ce que vous saisissez",
    texte:
      "Une dizaine d'informations sur le bien : adresse, prix, surface, charges, diagnostic énergétique. Souvent lues directement dans votre capture. C'est la seule chose qu'Estio conserve.",
  },
  {
    titre: "Ce qu'Estio retrouve",
    texte:
      "Tout ce que l'adresse permet de connaître : loyers et prix de vente du secteur, logements vacants, risques. Rien à saisir. C'est recalculé à chaque ouverture, avec les données du jour.",
  },
  {
    titre: "Ce que vous réglez",
    texte:
      "Votre apport, votre taux, la durée du prêt, votre régime fiscal. C'est ce qui fait que deux personnes n'obtiennent pas le même résultat sur la même annonce.",
  },
];

export default function CommentCaMarche() {
  return (
    <>
      <PageIntro
        titre="Du repérage à l'offre, dans un seul outil."
        chapo="Estio suit toute votre recherche : les annonces que vous regardez, celles que vous visitez, celles que vous écartez, et celle sur laquelle vous faites une offre."
      />

      <section className="s-container pb-24">
        <ol className="border-t border-encre">
          {ETAPES.map((e, i) => (
            <li
              key={e.titre}
              className="grid gap-4 border-b border-filet py-10 md:grid-cols-12 md:gap-8"
            >
              <span className="s-num font-serif text-[44px] leading-none text-encre-3 md:col-span-1">
                {i + 1}
              </span>
              <h2 className="s-h3 text-encre md:col-span-4">{e.titre}</h2>
              <p className="s-body max-w-[34em] md:col-span-7">{fr(e.texte)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-filet bg-retrait">
        <div className="s-container s-section">
          <h2 className="s-h2 max-w-[18em] text-encre">Les étapes de votre recherche</h2>
          <p className="s-lead mt-6 max-w-[34em]">
            Ce sont celles d&apos;un vrai achat immobilier. Une étape dit où en est une annonce,
            pas si elle est bonne.
          </p>
          <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {STATUS_COLUMNS.map((col) => (
              <div key={col.key} className="border-t border-encre pt-4">
                <dt className="text-[18px] font-semibold text-encre">{col.label}</dt>
                <dd className="s-body mt-2">{fr(ETAPES_SUIVI[col.key])}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-filet">
        <div className="s-container s-section">
          <h2 className="s-h2 max-w-[18em] text-encre">
            Pourquoi une analyse Estio ne se périme pas.
          </h2>
          <p className="s-lead mt-6 max-w-[34em]">
            Estio ne garde pas le résultat d&apos;un calcul. Il garde le bien, et refait le
            calcul chaque fois que vous l&apos;ouvrez. Une annonce rouverte trois mois plus tard
            tient compte des données du jour.
          </p>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {TROIS_SORTES.map((t) => (
              <div key={t.titre} className="border-t border-encre pt-5">
                <h3 className="s-h3 text-encre">{t.titre}</h3>
                <p className="s-body mt-3">{fr(t.texte)}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <BoutonLien href="/inscription" apres={<IconArrowRight size={16} />}>
              Créer un compte gratuit
            </BoutonLien>
          </div>
        </div>
      </section>
    </>
  );
}
