import { Etiquette } from "@/components/site/Etiquette";
import {
  HYPOTHESES_PAR_DEFAUT,
  analyser,
  formatSimple,
  type BienExemple,
} from "@/components/site/accueil/moteur";
import { STATUS_COLUMNS, type PropertyStatus } from "@/lib/pipeline-types";
import { cx } from "@/lib/cx";

/**
 * LE SUIVI · une recherche entière, rangée par étape.
 *
 * Les étapes et leur ordre sont exactement ceux de l'outil (`STATUS_COLUMNS`).
 * Les étapes n'ont pas de couleur : une étape est une position, pas un jugement.
 * Seul le bien qui reçoit l'offre est « plein », comme dans le logo.
 *
 * Le verdict de chaque carte est calculé par le moteur, avec les réglages par
 * défaut de l'outil.
 */

type Carte = {
  statut: PropertyStatus;
  bien: BienExemple;
  note?: string;
};

function bien(
  id: string,
  pieces: number,
  surface: number,
  prix: number,
  loyer: number,
  copro: number,
  taxe: number,
): BienExemple {
  const nom = pieces === 1 ? "Studio" : pieces === 2 ? "Deux pièces" : "Trois pièces";
  return {
    id,
    nom,
    titre: `${nom}, ${surface} m²`,
    prix,
    surface,
    pieces,
    loyer,
    chargesCoproMensuelles: copro,
    taxeFonciere: taxe,
    dpe: "D",
    etage: "",
  };
}

const CARTES: Carte[] = [
  { statut: "analyser", bien: bien("a1", 1, 19, 58_000, 420, 40, 420) },
  { statut: "analyser", bien: bien("a2", 3, 61, 189_000, 820, 120, 950) },
  { statut: "analyse", bien: bien("b1", 2, 38, 99_000, 610, 70, 640) },
  { statut: "analyse", bien: bien("b2", 2, 45, 152_000, 700, 90, 820) },
  { statut: "visite", bien: bien("v1", 1, 22, 62_000, 450, 45, 450), note: "Visite jeudi à 18 h" },
  { statut: "visite", bien: bien("v2", 2, 40, 96_000, 600, 70, 600) },
  {
    statut: "nego",
    bien: bien("n1", 2, 42, 115_000, 690, 80, 700),
    note: "Votre prix maximum : 108 000 €",
  },
  {
    statut: "ecarte",
    bien: bien("e1", 3, 68, 245_000, 890, 110, 980),
    note: "Le loyer ne couvre pas la mensualité",
  },
  { statut: "ecarte", bien: bien("e2", 2, 40, 128_000, 640, 95, 760), note: "Copropriété en procédure" },
  { statut: "ecarte", bien: bien("e3", 1, 18, 71_000, 410, 50, 480), note: "Trop de travaux" },
  { statut: "offre", bien: bien("o1", 1, 24, 56_000, 460, 40, 420), note: "Offre envoyée mardi" },
];

export function Suivi() {
  return (
    <section id="suivi" className="border-t border-filet bg-retrait">
      <div className="s-container s-section">
        <div className="max-w-[40em]">
          <h2 className="s-h2 text-encre">Toute votre recherche au même endroit.</h2>
          <p className="s-lead mt-6">
            Chaque annonce avance d&apos;une étape à l&apos;autre, jusqu&apos;à l&apos;offre.
            Vos notes et votre prix maximum restent attachés au bien. Celles que vous
            écartez gardent leur raison&nbsp;: vous n&apos;étudiez jamais deux fois la même.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <p className="s-small text-encre-3 lg:hidden">Faites glisser pour voir toutes les étapes.</p>
          <Etiquette className="ml-auto" />
        </div>

        <div className="mt-4 overflow-x-auto pb-2" tabIndex={0} aria-label="Tableau de suivi d'exemple">
          <div className="grid min-w-[900px] grid-cols-6 gap-3">
            {STATUS_COLUMNS.map((col) => {
              const cartes = CARTES.filter((c) => c.statut === col.key);
              return (
                <div key={col.key} className="flex flex-col">
                  <div className="mb-3 flex items-baseline justify-between border-b border-encre-3 pb-2">
                    <h3 className="text-[15px] font-semibold text-encre">{col.label}</h3>
                    <span className="s-num s-small text-encre-3">{cartes.length}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {cartes.map((c) => (
                      <CarteBien key={c.bien.id} carte={c} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarteBien({ carte }: { carte: Carte }) {
  const { verdict } = analyser(carte.bien, HYPOTHESES_PAR_DEFAUT);
  const pleine = carte.statut === "offre";

  return (
    <li
      className={cx(
        "rounded-site border p-3",
        pleine ? "border-encre bg-encre text-feuille" : "border-filet bg-feuille text-encre",
      )}
    >
      <p className="text-[15px] font-semibold leading-snug">{carte.bien.titre}</p>
      <p className={cx("s-num s-small", pleine ? "text-feuille" : "text-encre-2")}>
        {formatSimple(carte.bien.prix)}&nbsp;€
      </p>
      <p className="s-fine mt-2 flex items-center gap-1.5">
        <span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: verdict.color }}
        />
        <span style={{ color: pleine ? undefined : verdict.color }}>{verdict.label}</span>
      </p>
      {carte.note && (
        <p
          className={cx(
            "s-fine mt-2 border-t pt-2",
            pleine ? "border-encre-2 text-feuille" : "border-filet text-encre-2",
          )}
        >
          {carte.note}
        </p>
      )}
    </li>
  );
}
