import type { CSSProperties, ReactNode } from "react";
import { Etiquette } from "@/components/site/Etiquette";
import { BIENS_EXEMPLE, formatSimple } from "@/components/site/accueil/moteur";

/**
 * L'ANNONCE ANNOTÉE · la démonstration du haut de page.
 *
 * À gauche, une capture d'annonce comme le visiteur en a des dizaines dans son
 * téléphone. À droite, ce qu'Estio en tire, relié à la ligne lue par un trait
 * bleu : le bleu du stylo qui annote (DESIGN.md §1).
 *
 * Tous les chiffres sont dérivés du bien d'exemple du moteur : le prix au m²,
 * les charges ramenées au mois et le verdict qui suit tombent juste.
 *
 * Deux mises en page pour un même contenu : traits de rappel sur écran large,
 * numéros de renvoi sur mobile, où la place manque pour tirer un trait.
 */

const BIEN = BIENS_EXEMPLE[0];
const PRIX_M2 = Math.round(BIEN.prix / BIEN.surface);
const CHARGES_MOIS = Math.round(BIEN.chargesCoproMensuelles + BIEN.taxeFonciere / 12);

type Note = { chiffre: string; texte: string };
type Ligne = { cle: string; contenu: ReactNode; note?: Note };

const LIGNES: Ligne[] = [
  { cle: "photo", contenu: <Facade /> },
  {
    cle: "titre",
    contenu: (
      <span className="text-[17px] font-semibold text-encre">
        Appartement {BIEN.pieces} pièces, {BIEN.surface}&nbsp;m²
      </span>
    ),
  },
  {
    cle: "prix",
    contenu: (
      <span className="s-num text-[26px] font-semibold leading-none text-encre">
        {formatSimple(BIEN.prix)}&nbsp;€
      </span>
    ),
    note: {
      chiffre: `${formatSimple(PRIX_M2)} € le m²`,
      texte: "Le prix affiché, divisé par la surface.",
    },
  },
  {
    cle: "lieu",
    contenu: <span className="s-small text-encre-2">Quartier de la gare, {BIEN.etage}</span>,
    note: {
      chiffre: `${formatSimple(BIEN.loyer)} € de loyer par mois`,
      texte: "Le loyer estimé du secteur, trouvé à partir de l'adresse.",
    },
  },
  {
    cle: "charges",
    contenu: (
      <span className="s-small block text-encre-2">
        Charges&nbsp;: {BIEN.chargesCoproMensuelles}&nbsp;€ par mois
        <br />
        Taxe foncière&nbsp;: {formatSimple(BIEN.taxeFonciere)}&nbsp;€ par an
      </span>
    ),
    note: {
      chiffre: `${CHARGES_MOIS} € de frais par mois`,
      texte: "Charges et taxe foncière, ramenées au mois.",
    },
  },
  {
    cle: "dpe",
    contenu: (
      <span className="s-fine text-encre-3">
        Diagnostic énergétique&nbsp;: {BIEN.dpe}. Publiée il y a 2&nbsp;jours.
      </span>
    ),
  },
];

const ANNOTEES = LIGNES.filter((l) => l.note);

/** Rang d'apparition d'une annotation, lu par `.s-annotation` (site.css). */
const rangApparition = (i: number) => ({ "--i": i }) as CSSProperties;

export function AnnonceAnnotee() {
  return (
    <figure aria-label="Exemple fictif : une capture d'annonce annotée par Estio">
      {/* ÉCRAN LARGE : capture, traits de rappel, notes. */}
      <div
        className="hidden md:grid md:grid-cols-[minmax(0,1.05fr)_48px_minmax(0,0.95fr)]"
        style={{ gridTemplateRows: `auto repeat(${LIGNES.length}, auto)` }}
      >
        <div className="col-start-1 row-start-1 mb-3 flex items-center justify-between gap-3">
          <span className="s-small font-semibold text-encre">Votre capture</span>
          <Etiquette />
        </div>
        <span className="col-start-3 row-start-3 mb-1 self-end pl-3 s-small font-semibold text-bleu">
          Ce qu&apos;Estio en tire
        </span>

        {/* Le cadre de la capture, derrière ses lignes. */}
        <div
          aria-hidden
          className="col-start-1 rounded-site border border-filet bg-feuille"
          style={{ gridRow: `2 / ${LIGNES.length + 2}` }}
        />

        {LIGNES.map((l, i) => {
          const rang = i + 2;
          const indexNote = ANNOTEES.indexOf(l);
          return (
            <div key={l.cle} className="contents">
              <div
                className="relative z-10 col-start-1 self-center px-5 py-2"
                style={{
                  gridRow: rang,
                  paddingTop: l.cle === "photo" ? 12 : undefined,
                  paddingBottom: i === LIGNES.length - 1 ? 18 : undefined,
                }}
              >
                {l.contenu}
              </div>

              {l.note && (
                <>
                  <span
                    aria-hidden
                    className="s-annotation relative z-20 col-start-2 h-px self-center bg-bleu"
                    style={{ gridRow: rang, ...rangApparition(indexNote) }}
                  >
                    <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-bleu" />
                  </span>
                  <div
                    className="s-annotation col-start-3 self-center py-2 pl-3"
                    style={{ gridRow: rang, ...rangApparition(indexNote) }}
                  >
                    <p className="text-[18px] font-semibold leading-snug text-encre">
                      {l.note.chiffre}
                    </p>
                    <p className="s-small mt-0.5 text-encre-2">{l.note.texte}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE : numéros de renvoi. */}
      <div className="md:hidden">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="s-small font-semibold text-encre">Votre capture</span>
          <Etiquette />
        </div>
        <div className="rounded-site border border-filet bg-feuille px-4 pb-4 pt-3">
          {LIGNES.map((l) => {
            const n = ANNOTEES.indexOf(l);
            return (
              <div key={l.cle} className="flex items-center justify-between gap-3 py-1.5">
                <div className="min-w-0 flex-1">{l.contenu}</div>
                {n >= 0 && <Renvoi n={n + 1} className="s-annotation" index={n} />}
              </div>
            );
          })}
        </div>

        <p className="mt-6 s-small font-semibold text-bleu">Ce qu&apos;Estio en tire</p>
        <ol className="mt-3 flex flex-col gap-3">
          {ANNOTEES.map((l, n) => (
            <li
              key={l.cle}
              className="s-annotation flex gap-3"
              style={rangApparition(n)}
            >
              <Renvoi n={n + 1} />
              <div>
                <p className="text-[17px] font-semibold leading-snug text-encre">
                  {l.note!.chiffre}
                </p>
                <p className="s-small text-encre-2">{l.note!.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

function Renvoi({ n, className, index }: { n: number; className?: string; index?: number }) {
  return (
    <span
      aria-hidden
      className={`s-num inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bleu text-[13px] font-semibold text-feuille ${className ?? ""}`}
      style={index !== undefined ? rangApparition(index) : undefined}
    >
      {n}
    </span>
  );
}

/**
 * Tient lieu de photo : une élévation de façade au trait, comme sur un plan
 * d'architecte. Aucune photo inventée, aucune image générée.
 */
function Facade() {
  const etages = [0, 1, 2, 3];
  const fenetres = [0, 1, 2, 3];
  return (
    <svg
      viewBox="0 0 400 190"
      className="block h-auto w-full rounded-site bg-retrait"
      aria-hidden
      focusable="false"
    >
      {/* Voisins : silhouettes claires, sans trait. */}
      <g className="fill-filet">
        <path d="M24 190V58h92v132zM284 190V40h96v150z" />
      </g>
      <g className="fill-retrait">
        {[70, 100, 130, 160].map((y) => (
          <path key={`g${y}`} d={`M36 ${y}h14v16H36zM66 ${y}h14v16H66zM94 ${y}h12v16H94z`} />
        ))}
        {[56, 86, 116, 146].map((y) => (
          <path key={`d${y}`} d={`M296 ${y}h16v18h-16zM326 ${y}h16v18h-16zM356 ${y}h14v18h-14z`} />
        ))}
      </g>

      <g className="stroke-encre-3" strokeWidth="1.2">
        {/* L'immeuble de l'annonce */}
        <rect x="126" y="24" width="148" height="166" className="fill-feuille" />
        <path d="M120 24h160M126 30h148" fill="none" />
        {etages.map((e) => (
          <path key={`s${e}`} d={`M126 ${58 + e * 28}h148`} className="stroke-filet" fill="none" />
        ))}
        {etages.map((e) =>
          fenetres.map((f) => (
            <rect
              key={`f${e}-${f}`}
              x={140 + f * 34}
              y={36 + e * 28}
              width="18"
              height="17"
              className="fill-retrait"
            />
          )),
        )}
        {/* Rez-de-chaussée : porte et vitrines */}
        <rect x="186" y="150" width="28" height="40" className="fill-retrait" />
        <rect x="140" y="152" width="32" height="24" className="fill-retrait" />
        <rect x="228" y="152" width="32" height="24" className="fill-retrait" />
      </g>
      <path d="M0 189.5h400" className="stroke-encre-3" strokeWidth="1" />
    </svg>
  );
}
