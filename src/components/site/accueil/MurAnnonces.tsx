import { GRAND_IMMEUBLE_PLEIN, MARK } from "@/components/site/Logo";

/**
 * LE MUR · le motif du logo, à l'échelle d'une recherche entière.
 *
 * Chaque immeuble est une annonce. La plupart sont vues puis écartées, quelques
 * unes sont retenues, une seule est pleine : celle qui reçoit l'offre. C'est le
 * dessin exact du logo (un immeuble plein parmi des immeubles en contour),
 * répété.
 *
 * Aucun nombre n'est affiché : le mur illustre, il ne prétend pas mesurer.
 * Un seul SVG, un symbole réutilisé : le poids reste celui d'un dessin.
 */

const COLONNES = 24;
const RANGEES = 9;
const CELLULE_L = 18;
const CELLULE_H = 38;

/** Position de l'annonce achetée, choisie pour tomber hors du centre. */
const ACHETEE = 5 * COLONNES + 16;

/** Tirage déterministe : le même mur à chaque visite, au serveur comme au navigateur. */
function hasard(i: number): number {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Etat = "ecartee" | "retenue" | "achetee";

const ETATS: Etat[] = Array.from({ length: COLONNES * RANGEES }, (_, i) =>
  i === ACHETEE ? "achetee" : hasard(i) > 0.92 ? "retenue" : "ecartee",
);

export function MurAnnonces() {
  return (
    <section className="border-t border-filet">
      <div className="s-container s-section grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="s-h2 text-encre">
            Vous regarderez des dizaines d&apos;annonces. Vous n&apos;en achèterez qu&apos;une.
          </h2>
          <p className="s-body mt-6 max-w-[34em]">
            Estio garde la trace de chacune&nbsp;: son prix, ce que vous en pensiez, et
            pourquoi vous l&apos;avez écartée. Le jour où vous hésitez entre les deux
            dernières, tout est là.
          </p>
        </div>

        <figure className="lg:col-span-7">
          <svg
            viewBox={`0 0 ${COLONNES * CELLULE_L} ${RANGEES * CELLULE_H}`}
            className="block h-auto w-full"
            role="img"
            aria-label="Illustration : environ deux cents immeubles dessinés en contour, quelques uns plus foncés, un seul plein."
          >
            <defs>
              <symbol id="mur-contour" viewBox="430 356 112 256">
                <path d={MARK[1]} />
              </symbol>
              <symbol id="mur-plein" viewBox="430 356 112 256">
                <path d={GRAND_IMMEUBLE_PLEIN} />
              </symbol>
            </defs>
            {ETATS.map((etat, i) => {
              const x = (i % COLONNES) * CELLULE_L + 4;
              const y = Math.floor(i / COLONNES) * CELLULE_H + 7;
              return (
                <use
                  key={i}
                  href={etat === "achetee" ? "#mur-plein" : "#mur-contour"}
                  x={x}
                  y={y}
                  width={10}
                  height={24}
                  className={
                    etat === "ecartee"
                      ? "fill-filet"
                      : etat === "retenue"
                        ? "fill-encre-3"
                        : "fill-encre"
                  }
                />
              );
            })}
          </svg>

          <figcaption className="s-small mt-6 flex flex-wrap gap-x-6 gap-y-2 text-encre-2">
            <Legende etat="ecartee">Vue, puis écartée</Legende>
            <Legende etat="retenue">Retenue</Legende>
            <Legende etat="achetee">Celle qui reçoit votre offre</Legende>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Legende({ etat, children }: { etat: Etat; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="430 356 112 256" className="h-5 w-auto" aria-hidden focusable="false">
        <path
          d={etat === "achetee" ? GRAND_IMMEUBLE_PLEIN : MARK[1]}
          className={
            etat === "ecartee" ? "fill-filet" : etat === "retenue" ? "fill-encre-3" : "fill-encre"
          }
        />
      </svg>
      {children}
    </span>
  );
}
