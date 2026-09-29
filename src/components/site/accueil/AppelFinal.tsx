import Link from "next/link";
import { BoutonLien } from "@/components/site/Bouton";
import { GRAND_IMMEUBLE_PLEIN, MARK } from "@/components/site/Logo";
import { IconArrowRight } from "@/components/ui/Icon";

/**
 * Clôture. Une phrase, un bouton, et la rangée d'immeubles qui reprend le logo :
 * plusieurs contours, un seul plein.
 */
export function AppelFinal() {
  return (
    <section className="border-t border-filet">
      <div className="s-container s-section grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="s-h2 text-encre">
            Commencez par l&apos;annonce que vous regardez en ce moment.
          </h2>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <BoutonLien href="/inscription" apres={<IconArrowRight size={16} />}>
              Créer un compte gratuit
            </BoutonLien>
            <p className="s-small text-encre-2">
              Gratuit pour commencer.{" "}
              <Link href="/tarifs" className="s-link">
                Voir les formules
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-end justify-start gap-2 lg:col-span-5 lg:justify-end" aria-hidden>
          {Array.from({ length: 9 }, (_, i) => (
            <svg key={i} viewBox="430 356 112 256" className="h-10 w-auto sm:h-12" focusable="false">
              <path
                d={i === 6 ? GRAND_IMMEUBLE_PLEIN : MARK[1]}
                className={i === 6 ? "fill-encre" : i === 2 ? "fill-encre-3" : "fill-filet"}
              />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}
