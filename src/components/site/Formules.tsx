"use client";

import { Fragment, useId, useState } from "react";
import { BoutonLien } from "@/components/site/Bouton";
import { IconArrowRight, IconCheck, IconMinus } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * Les trois formules. Tarifs indicatifs (CLAUDE.md, « Modèle économique »).
 *
 * Seule la formule gratuite a un bouton : les paiements ne sont pas ouverts,
 * on ne propose donc pas d'acheter ce qu'on ne peut pas encore vendre.
 */

type Formule = {
  cle: string;
  nom: string;
  prix: { mois: number; an: number };
  pour: string;
  resume: string;
  points: { label: string; inclus: boolean }[];
};

const FORMULES: Formule[] = [
  {
    cle: "free",
    nom: "Free",
    prix: { mois: 0, an: 0 },
    pour: "Pour essayer",
    resume: "Un projet et trois annonces, pour juger l'outil sur pièces.",
    points: [
      { label: "1 projet, 3 annonces", inclus: true },
      { label: "Le verdict de chaque annonce, sans limite", inclus: true },
      { label: "5 captures lues par mois", inclus: true },
      { label: "Comparaison de 2 annonces", inclus: true },
      { label: "Loyer et prix du secteur précis", inclus: false },
      { label: "Hypothèses réglables en direct", inclus: false },
    ],
  },
  {
    cle: "pro",
    nom: "Pro",
    prix: { mois: 24, an: 240 },
    pour: "Pour une recherche active",
    resume: "L'outil complet, pendant les mois où vous cherchez vraiment.",
    points: [
      { label: "5 projets, 25 annonces chacun", inclus: true },
      { label: "Loyer et prix du secteur précis", inclus: true },
      { label: "Rendement après impôt et rentabilité totale", inclus: true },
      { label: "Hypothèses réglables en direct", inclus: true },
      { label: "100 captures lues par mois", inclus: true },
      { label: "Export PDF et dossier pour la banque", inclus: true },
    ],
  },
  {
    cle: "expert",
    nom: "Expert",
    prix: { mois: 59, an: 590 },
    pour: "Pour les conseillers et les chasseurs",
    resume: "Pour ceux dont le métier est de recommander un bien à un client.",
    points: [
      { label: "Projets et annonces sans limite", inclus: true },
      { label: "Tout ce que contient Pro", inclus: true },
      { label: "Captures sans limite", inclus: true },
      { label: "Alertes de prix et de taux en temps réel", inclus: true },
      { label: "Comparaison sans limite", inclus: true },
      { label: "Rapport à votre marque", inclus: true },
    ],
  },
];

type Case = string | boolean;

const DETAIL: { rubrique: string; lignes: { label: string; valeurs: [Case, Case, Case] }[] }[] = [
  {
    rubrique: "Place",
    lignes: [
      { label: "Projets en même temps", valeurs: ["1", "5", "Sans limite"] },
      { label: "Annonces par projet", valeurs: ["3", "25", "Sans limite"] },
      { label: "Captures lues par mois", valeurs: ["5", "100", "Sans limite"] },
    ],
  },
  {
    rubrique: "Analyse",
    lignes: [
      { label: "Verdict de chaque annonce", valeurs: [true, true, true] },
      { label: "Loyer et prix du secteur précis", valeurs: [false, true, true] },
      { label: "Détail du verdict, critère par critère", valeurs: [false, true, true] },
      { label: "Rendement après impôt et rentabilité totale", valeurs: [false, true, true] },
      { label: "Hypothèses réglables en direct", valeurs: [false, true, true] },
      { label: "Comparaison des six régimes fiscaux", valeurs: [false, true, true] },
    ],
  },
  {
    rubrique: "Décision",
    lignes: [
      { label: "Annonces côte à côte", valeurs: ["2", "3", "Sans limite"] },
      { label: "Priorités de comparaison", valeurs: ["Un peu de tout", "Toutes", "Toutes"] },
      { label: "Réponse rédigée en français", valeurs: [false, true, true] },
    ],
  },
  {
    rubrique: "Suivi",
    lignes: [
      { label: "Alertes de prix et de taux", valeurs: [false, "Chaque semaine", "En temps réel"] },
      { label: "Export PDF et dossier pour la banque", valeurs: [false, true, true] },
      { label: "Rapport à votre marque", valeurs: [false, false, true] },
    ],
  },
];

export function Formules() {
  const [annuel, setAnnuel] = useState(false);
  const nom = useId();

  return (
    <div>
      <fieldset className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <legend className="sr-only">Période de facturation</legend>
        <div className="inline-flex rounded-site border border-encre-3 p-1">
          {[
            { v: false, label: "Au mois" },
            { v: true, label: "À l'année" },
          ].map((o) => (
            <label key={o.label} className="cursor-pointer">
              <input
                type="radio"
                name={nom}
                checked={annuel === o.v}
                onChange={() => setAnnuel(o.v)}
                className="peer sr-only"
              />
              <span
                className={cx(
                  "inline-flex h-10 items-center rounded-site px-4 text-[16px] font-semibold transition-colors duration-150",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bleu",
                  annuel === o.v ? "bg-encre text-feuille" : "text-encre hover:bg-retrait",
                )}
              >
                {o.label}
              </span>
            </label>
          ))}
        </div>
        <p className="s-small text-encre-2">À l&apos;année, deux mois sont offerts.</p>
      </fieldset>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {FORMULES.map((f) => {
          const gratuit = f.prix.mois === 0;
          return (
            <article
              key={f.cle}
              className="flex flex-col rounded-site border border-filet bg-feuille p-6 sm:p-7"
            >
              <p className="s-small text-encre-2">{f.pour}</p>
              <h2 className="s-h3 mt-1 text-encre">{f.nom}</h2>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="s-num text-[44px] font-semibold leading-none text-encre">
                  {gratuit ? "0" : annuel ? f.prix.an : f.prix.mois}&nbsp;€
                </span>
                <span className="s-small text-encre-2">
                  {gratuit ? "sans carte bancaire" : annuel ? "par an" : "par mois"}
                </span>
              </p>
              {!gratuit && annuel && (
                <p className="s-small mt-2 text-encre-3">
                  Soit {Math.round(f.prix.an / 12)}&nbsp;€ par mois.
                </p>
              )}

              <p className="s-body mt-5">{f.resume}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-filet pt-6">
                {f.points.map((p) => (
                  <li key={p.label} className="flex items-start gap-3">
                    <span className={cx("mt-1 shrink-0", p.inclus ? "text-encre" : "text-encre-3")}>
                      {p.inclus ? <IconCheck size={16} /> : <IconMinus size={16} />}
                    </span>
                    <span className={cx("text-[16px]", p.inclus ? "text-encre" : "text-encre-3")}>
                      <span className="sr-only">{p.inclus ? "Inclus : " : "Non inclus : "}</span>
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {gratuit ? (
                  <BoutonLien href="/inscription" className="w-full" apres={<IconArrowRight size={16} />}>
                    Créer un compte gratuit
                  </BoutonLien>
                ) : (
                  <p className="s-small rounded-site bg-retrait px-4 py-3 text-encre-2">
                    Disponible à l&apos;ouverture des paiements.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <h2 className="s-h3 mt-20 text-encre">Le détail, ligne par ligne</h2>
      <p className="s-small mt-2 text-encre-3 md:hidden">Faites glisser le tableau pour voir les trois formules.</p>
      <div className="relative mt-6 overflow-x-auto" tabIndex={0} aria-label="Détail des formules">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-encre">
              <th scope="col" className="s-small py-3 pr-4 font-semibold text-encre">
                Ce qui est compris
              </th>
              {FORMULES.map((f) => (
                <th key={f.cle} scope="col" className="s-small w-40 py-3 text-center font-semibold text-encre">
                  {f.nom}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DETAIL.map((groupe) => (
              <Fragment key={groupe.rubrique}>
                <tr>
                  <th colSpan={4} scope="colgroup" className="pb-2 pt-8 text-[17px] font-semibold text-encre">
                    {groupe.rubrique}
                  </th>
                </tr>
                {groupe.lignes.map((l) => (
                  <tr key={l.label} className="border-b border-filet">
                    <th scope="row" className="py-3 pr-4 text-[16px] font-normal text-encre-2">
                      {l.label}
                    </th>
                    {l.valeurs.map((v, i) => (
                      <td key={i} className="py-3 text-center text-[16px] text-encre">
                        {v === true ? (
                          <>
                            <IconCheck size={16} className="inline-block" />
                            <span className="sr-only">Inclus</span>
                          </>
                        ) : v === false ? (
                          <>
                            <IconMinus size={16} className="inline-block text-encre-3" />
                            <span className="sr-only">Non inclus</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
