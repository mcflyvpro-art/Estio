import Link from "next/link";
import { EstioLogo } from "@/components/site/Logo";
import { PIED_DE_PAGE } from "@/components/site/nav";

/**
 * Pied de page. On y cherche un lien : il n'y a que des liens, et la mention qui
 * dit ce qu'Estio n'est pas.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-filet bg-retrait">
      <div className="s-container">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div>
            <Link href="/" className="inline-block text-encre" aria-label="Estio, accueil">
              <EstioLogo className="h-7 w-auto" aria-hidden />
            </Link>
            <p className="s-small mt-4 max-w-[28ch] text-encre-2">
              Estio aide les particuliers à choisir leur premier investissement locatif.
            </p>
          </div>

          {PIED_DE_PAGE.map((groupe) => (
            <nav key={groupe.titre} aria-label={groupe.titre}>
              <h2 className="s-small font-semibold text-encre">{groupe.titre}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {groupe.liens.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="s-small text-encre-2 transition-colors duration-150 hover:text-encre hover:underline hover:underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-filet py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <p className="s-fine s-num text-encre-3">© 2026 Estio</p>
          <p className="s-fine max-w-2xl text-encre-3 sm:text-right">
            Estio est un outil d&apos;aide à la décision. Il ne fournit pas de conseil en
            investissement. Les projections reposent sur des hypothèses et ne sont jamais
            garanties.
          </p>
        </div>
      </div>
    </footer>
  );
}
