import type { CSSProperties } from "react";
import Link from "next/link";
import { BoutonLien } from "@/components/site/Bouton";
import { AnnonceAnnotee } from "@/components/site/accueil/AnnonceAnnotee";
import {
  BIENS_EXEMPLE,
  HYPOTHESES_PAR_DEFAUT,
  analyser,
  phraseReste,
} from "@/components/site/accueil/moteur";
import { IconArrowRight } from "@/components/ui/Icon";

/**
 * Haut de page. Le titre pose la question que le visiteur se pose déjà devant
 * une annonce. La réponse est à côté : l'annonce annotée, puis le verdict
 * calculé par le vrai moteur, avec les réglages par défaut de l'outil.
 */
export function Hero() {
  const a = analyser(BIENS_EXEMPLE[0], HYPOTHESES_PAR_DEFAUT);

  return (
    <section className="s-container pb-24 pt-14 lg:pb-32 lg:pt-20">
      <div className="grid gap-14 xl:grid-cols-12 xl:gap-8">
        <div className="max-w-[40rem] xl:col-span-5 xl:pt-6">
          <h1 className="s-h1 text-encre">
            Cet appartement <span className="whitespace-nowrap">est-il</span> un bon
            investissement&#8239;?
          </h1>

          <p className="s-lead mt-7 max-w-[34em]">
            Ajoutez la capture d&apos;écran d&apos;une annonce. Estio calcule la
            mensualité, le loyer du secteur et ce qu&apos;il vous restera chaque mois.
            Puis il vous répond en une phrase.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BoutonLien href="/inscription" apres={<IconArrowRight size={16} />}>
              Créer un compte gratuit
            </BoutonLien>
            <BoutonLien href="#calcul" variante="secondaire">
              Voir le calcul en détail
            </BoutonLien>
          </div>

          <p className="s-small mt-6 max-w-[34em] text-encre-3">
            Pour les particuliers qui préparent un premier achat à louer.
          </p>
        </div>

        <div className="xl:col-span-7">
          <AnnonceAnnotee />

          {/* La réponse d'Estio */}
          <div
            className="s-annotation mt-6 rounded-site border border-filet bg-feuille p-5 sm:p-6"
            style={{ "--i": 3 } as CSSProperties}
          >
            <p className="s-small font-semibold text-bleu">La réponse d&apos;Estio</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="font-serif text-[30px] leading-tight" style={{ color: a.verdict.color }}>
                {a.verdict.label}
              </p>
              <p className="s-small s-num text-encre-3">{a.score}&nbsp;sur&nbsp;100</p>
            </div>
            <p className="mt-3 text-[17px] leading-snug text-encre">{phraseReste(a.reste)}</p>
            <p className="s-small mt-1 text-encre-2">{a.verdict.advice}</p>
            <Link href="#calcul" className="s-link s-small mt-4 inline-block">
              Voir comment Estio arrive à ce résultat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
