"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { Etiquette } from "@/components/site/Etiquette";
import {
  BIENS_EXEMPLE,
  HYPOTHESES_PAR_DEFAUT,
  analyser,
  formatSigne,
  formatSimple,
  phraseReste,
} from "@/components/site/accueil/moteur";
import { cx } from "@/lib/cx";

/**
 * LE CALCUL, POSÉ · la démonstration jouable.
 *
 * Le résultat est présenté comme une addition sur une feuille : ce qui rentre,
 * ce qui sort, un trait, ce qui reste. Un primo-investisseur comprend une
 * soustraction ; il ne comprend pas « cash-flow net-net ».
 *
 * Chaque ligne vient du vrai moteur de l'outil (voir `moteur.ts`). Les montants
 * sont arrondis à l'euro et le total est la somme des lignes affichées : on peut
 * refaire l'addition à la main, elle tombe juste.
 */

const pct = (v: number, decimales = 0) => `${v.toFixed(decimales).replace(".", ",")} %`;

export function CalculPose() {
  const [bienId, setBienId] = useState(BIENS_EXEMPLE[0].id);
  const [apport, setApport] = useState(HYPOTHESES_PAR_DEFAUT.apportPct);
  const [taux, setTaux] = useState(HYPOTHESES_PAR_DEFAUT.tauxPct);
  const [duree, setDuree] = useState(HYPOTHESES_PAR_DEFAUT.dureeAnnees);
  const nom = useId();

  const bien = BIENS_EXEMPLE.find((b) => b.id === bienId) ?? BIENS_EXEMPLE[0];
  const a = useMemo(
    () => analyser(bien, { apportPct: apport, tauxPct: taux, dureeAnnees: duree }),
    [bien, apport, taux, duree],
  );

  return (
    <section id="calcul" className="border-t border-filet">
      <div className="s-container s-section">
        <div className="max-w-[40em]">
          <h2 className="s-h2 text-encre">Le calcul, posé comme sur une feuille.</h2>
          <p className="s-lead mt-6">
            Pas de boîte noire. Voici ce qu&apos;Estio calcule pour chaque annonce. Changez
            l&apos;apport, le taux ou la durée&nbsp;: tout se recalcule, avec le même moteur
            que dans l&apos;outil.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Les réglages */}
          <div className="lg:col-span-5">
            <fieldset>
              <legend className="text-[16px] font-semibold text-encre">Choisissez une annonce</legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {BIENS_EXEMPLE.map((b) => (
                  <label key={b.id} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={nom}
                      value={b.id}
                      checked={b.id === bienId}
                      onChange={() => setBienId(b.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={cx(
                        "flex h-12 items-center justify-center rounded-site border px-2 text-center text-[15px] font-semibold leading-tight transition-colors duration-150",
                        "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bleu",
                        b.id === bienId
                          ? "border-bleu bg-bleu-voile text-bleu"
                          : "border-encre-3 text-encre hover:bg-retrait",
                      )}
                    >
                      {b.nom}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-filet py-5">
              <div>
                <dt className="s-small text-encre-3">Prix affiché</dt>
                <dd className="text-[17px] font-semibold text-encre">{formatSimple(bien.prix)}&nbsp;€</dd>
              </div>
              <div>
                <dt className="s-small text-encre-3">Surface</dt>
                <dd className="text-[17px] font-semibold text-encre">{bien.surface}&nbsp;m²</dd>
              </div>
              <div>
                <dt className="s-small text-encre-3">Loyer du secteur</dt>
                <dd className="text-[17px] font-semibold text-encre">
                  {formatSimple(bien.loyer)}&nbsp;€ par mois
                </dd>
              </div>
              <div>
                <dt className="s-small text-encre-3">Vous empruntez</dt>
                <dd className="text-[17px] font-semibold text-encre">{formatSimple(a.emprunt)}&nbsp;€</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-7">
              <Reglage
                label="Apport personnel"
                aide="La part du prix que vous payez sans emprunter."
                valeur={apport}
                min={0}
                max={45}
                pas={1}
                format={(v) => pct(v)}
                onChange={setApport}
              />
              <Reglage
                label="Taux du prêt"
                aide="Hors assurance."
                valeur={taux}
                min={2}
                max={6}
                pas={0.05}
                format={(v) => pct(v, 2)}
                onChange={(v) => setTaux(Math.round(v * 100) / 100)}
              />
              <Reglage
                label="Durée du prêt"
                aide="Le nombre d'années sur lesquelles vous remboursez."
                valeur={duree}
                min={10}
                max={25}
                pas={1}
                format={(v) => `${v} ans`}
                onChange={setDuree}
              />
            </div>
          </div>

          {/* La feuille */}
          <div className="lg:col-span-7">
            <div className="rounded-site border border-filet bg-feuille">
              <div className="flex items-center justify-between gap-4 border-b border-filet px-5 py-4 sm:px-6">
                <p className="text-[16px] font-semibold text-encre">{bien.titre}, chaque mois</p>
                <Etiquette />
              </div>

              <table className="w-full border-collapse">
                <caption className="sr-only">
                  Ce qui entre et ce qui sort chaque mois pour cet exemple
                </caption>
                <tbody>
                  {a.lignes.map((l) => (
                    <tr key={l.libelle} className="border-b border-filet">
                      <th scope="row" className="py-3 pl-5 pr-4 text-left font-normal sm:pl-6">
                        <span className="text-[16px] text-encre">{l.libelle}</span>
                        {l.detail && (
                          <span className="s-small block text-encre-3">{l.detail}</span>
                        )}
                      </th>
                      <td className="s-num whitespace-nowrap py-3 pl-4 pr-5 text-right align-top text-[17px] text-encre sm:pr-6">
                        {formatSigne(l.montant)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-encre">
                    <th scope="row" className="py-4 pl-5 pr-4 text-left text-[17px] font-semibold text-encre sm:pl-6">
                      Ce qu&apos;il vous reste
                    </th>
                    <td className="s-num whitespace-nowrap py-4 pl-4 pr-5 text-right text-[28px] font-semibold leading-none text-encre sm:pr-6 sm:text-[32px]">
                      {formatSigne(a.reste)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="border-t border-filet px-5 py-5 sm:px-6">
                <p className="text-[17px] leading-snug text-encre">{phraseReste(a.reste)}</p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="font-serif text-[26px] leading-tight" style={{ color: a.verdict.color }}>
                    {a.verdict.label}
                  </p>
                  <p className="s-small s-num text-encre-3">{a.score}&nbsp;sur&nbsp;100</p>
                </div>
                <p className="s-small mt-1 text-encre-2">{a.verdict.advice}</p>
              </div>
            </div>

            <p className="s-fine mt-4 max-w-[48em] text-encre-3">
              Biens fictifs, loyers donnés pour l&apos;exemple. Hypothèses fixes&nbsp;: frais
              de notaire de 8&nbsp;% du prix, frais de dossier de 1&nbsp;000&nbsp;€, assurance
              de 0,34&nbsp;% du capital par an, location meublée au régime réel, tranche
              d&apos;imposition à 30&nbsp;%. Montants arrondis à l&apos;euro. Dans
              l&apos;outil, chacune de ces hypothèses se règle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reglage({
  label,
  aide,
  valeur,
  min,
  max,
  pas,
  format,
  onChange,
}: {
  label: string;
  aide: string;
  valeur: number;
  min: number;
  max: number;
  pas: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const remplissage = ((valeur - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[16px] font-semibold text-encre">
          {label}
        </label>
        <span className="text-[17px] font-semibold text-encre" aria-hidden>
          {format(valeur)}
        </span>
      </div>
      <p className="s-small text-encre-3">{aide}</p>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={pas}
        value={valeur}
        aria-valuetext={format(valeur)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="s-range mt-2"
        style={{ "--fill": `${remplissage}%` } as CSSProperties}
      />
    </div>
  );
}
