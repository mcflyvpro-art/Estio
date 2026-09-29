"use client";

import { useId, useState } from "react";
import { Etiquette } from "@/components/site/Etiquette";
import { formatSimple } from "@/components/site/accueil/moteur";
import { verdictFromScore } from "@/lib/verdict";
import { cx } from "@/lib/cx";
import { fr } from "@/components/site/typo";

/**
 * LA COMPARAISON · deux finalistes, une priorité, un gagnant qui change.
 *
 * Le calcul est une moyenne pondérée, affichée critère par critère : on voit
 * pourquoi l'un passe devant. Les notes des deux appartements sont posées pour
 * l'exemple, et c'est écrit sous la démonstration.
 *
 * Les pondérations sont celles des quatre profils prévus pour l'outil
 * (CLAUDE.md, « Le score personnalisé »), qui se normalisent à 100 %.
 */

const CRITERES = [
  { cle: "revenus", label: "Revenus" },
  { cle: "securite", label: "Sécurité" },
  { cle: "valeur", label: "Valeur à long terme" },
] as const;

type Critere = (typeof CRITERES)[number]["cle"];
type Poids = Record<Critere, number>;

const PRIORITES: {
  cle: string;
  label: string;
  poids: Poids;
  phrase: (gagnant: string, autre: string) => string;
}[] = [
  {
    cle: "revenus",
    label: "Des revenus dès maintenant",
    poids: { revenus: 55, securite: 20, valeur: 25 },
    phrase: (g, a) =>
      `${g} passe devant. Il vous laisse de l'argent chaque mois dès la première année, alors que ${a} vous demande d'attendre.`,
  },
  {
    cle: "equilibre",
    label: "Un peu de tout",
    poids: { revenus: 34, securite: 33, valeur: 33 },
    phrase: (g, a) =>
      `${g} passe devant, de peu. À cet écart, ${a} reste dans la course. Visitez les deux\u00a0: la visite tranchera ce que les chiffres ne tranchent pas.`,
  },
  {
    cle: "valeur",
    label: "La valeur à long terme",
    poids: { revenus: 25, securite: 25, valeur: 50 },
    phrase: (g, a) =>
      `${g} passe nettement devant, grâce à sa note de valeur à long terme. ${a} rapporte plus chaque mois, mais vous avez fait passer ce critère après.`,
  },
  {
    cle: "securite",
    label: "Le moins de risques",
    poids: { revenus: 20, securite: 55, valeur: 25 },
    phrase: (g, a) =>
      `${g} passe devant\u00a0: c'est le dossier le plus sûr des deux. ${a} rapporte davantage, mais demandera plus de surveillance.`,
  },
];

const FINALISTES = [
  {
    id: "a",
    nom: "Appartement A",
    detail: "Deux pièces de 45 m²",
    prix: 139_000,
    notes: { revenus: 88, securite: 58, valeur: 42 } as Poids,
  },
  {
    id: "b",
    nom: "Appartement B",
    detail: "Trois pièces de 64 m²",
    prix: 214_000,
    notes: { revenus: 49, securite: 70, valeur: 78 } as Poids,
  },
];

function total(notes: Poids, poids: Poids): number {
  return Math.round(CRITERES.reduce((s, c) => s + (notes[c.cle] * poids[c.cle]) / 100, 0));
}

export function Comparaison() {
  const [priorite, setPriorite] = useState(PRIORITES[1]);
  const nom = useId();

  const resultats = FINALISTES.map((f) => ({ ...f, total: total(f.notes, priorite.poids) }));
  const gagnant = resultats[0].total >= resultats[1].total ? resultats[0] : resultats[1];
  const autre = gagnant.id === resultats[0].id ? resultats[1] : resultats[0];
  const ecart = Math.abs(resultats[0].total - resultats[1].total);

  return (
    <section id="comparer" className="border-t border-filet">
      <div className="s-container s-section">
        <div className="max-w-[40em]">
          <h2 className="s-h2 text-encre">
            Deux appartements vous plaisent. Qu&apos;est-ce qui compte pour vous&#8239;?
          </h2>
          <p className="s-lead mt-6">
            Choisissez votre priorité. Le classement change avec elle, et Estio explique
            pourquoi en une phrase.
          </p>
        </div>

        <fieldset className="mt-12">
          <legend className="text-[16px] font-semibold text-encre">Votre priorité</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRIORITES.map((p) => (
              <label key={p.cle} className="cursor-pointer">
                <input
                  type="radio"
                  name={nom}
                  value={p.cle}
                  checked={p.cle === priorite.cle}
                  onChange={() => setPriorite(p)}
                  className="peer sr-only"
                />
                <span
                  className={cx(
                    "inline-flex h-11 items-center rounded-site border px-4 text-[16px] font-semibold transition-colors duration-150",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bleu",
                    p.cle === priorite.cle
                      ? "border-bleu bg-bleu-voile text-bleu"
                      : "border-encre-3 text-encre hover:bg-retrait",
                  )}
                >
                  {p.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <p className="s-small mt-4 text-encre-2">
          Poids de chaque critère&nbsp;:{" "}
          {CRITERES.map((c, i) => (
            <span key={c.cle}>
              {i > 0 && ", "}
              {c.label.toLowerCase()} {priorite.poids[c.cle]}&nbsp;%
            </span>
          ))}
          .
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {resultats.map((f) => {
            const devant = f.id === gagnant.id;
            return (
              <article
                key={f.id}
                className={cx(
                  "rounded-site border bg-feuille p-5 transition-colors duration-150 sm:p-6",
                  devant ? "border-encre outline outline-1 outline-encre" : "border-filet",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="s-h3 text-encre">{f.nom}</h3>
                    <p className="s-small mt-1 text-encre-2">
                      {f.detail}, {formatSimple(f.prix)}&nbsp;€
                    </p>
                  </div>
                  {devant && (
                    <p className="s-fine rounded-site bg-encre px-2 py-1 font-semibold text-feuille">
                      Passe devant
                    </p>
                  )}
                </div>

                <p className="s-num mt-6 flex items-baseline gap-2">
                  <span className="text-[40px] font-semibold leading-none text-encre">{f.total}</span>
                  <span className="s-small text-encre-3">sur 100 avec votre priorité</span>
                </p>

                <ul className="mt-6 flex flex-col gap-3 border-t border-filet pt-5">
                  {CRITERES.map((c) => {
                    const note = f.notes[c.cle];
                    const couleur = verdictFromScore(note).color;
                    return (
                      <li key={c.cle} className="grid grid-cols-[9.5rem_minmax(0,1fr)_2.5rem] items-center gap-3">
                        <span className="s-small text-encre-2">{c.label}</span>
                        <span className="h-2 overflow-hidden rounded-site bg-retrait" aria-hidden>
                          <span
                            className="block h-full rounded-site transition-[width] duration-[250ms] ease-out"
                            style={{ width: `${note}%`, background: couleur }}
                          />
                        </span>
                        <span className="s-num s-small text-right text-encre">{note}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-4 rounded-site border border-filet bg-feuille p-5 sm:p-6" aria-live="polite">
          <p className="s-small font-semibold text-bleu">La réponse d&apos;Estio</p>
          <p className="mt-2 max-w-[44em] font-serif text-[21px] leading-snug text-encre">
            {fr(priorite.phrase(gagnant.nom, autre.nom))}
          </p>
          <p className="s-small mt-3 text-encre-3">
            Écart de {ecart}&nbsp;point{ecart > 1 ? "s" : ""} sur 100.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Etiquette />
          <p className="s-fine text-encre-3">
            Les notes de chaque critère sont posées pour l&apos;exemple. Le classement est une
            moyenne de ces notes, pondérée par votre priorité.
          </p>
        </div>
      </div>
    </section>
  );
}
