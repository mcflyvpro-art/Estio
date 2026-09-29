"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { EstioLogo } from "@/components/site/Logo";
import { BoutonLien } from "@/components/site/Bouton";
import { NAV_PRINCIPALE } from "@/components/site/nav";
import { IconClose } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * En-tête du site public.
 *
 * Trois liens visibles sur ordinateur, pas de menu caché derrière une icône
 * quand la place existe. Sur mobile, un bouton « Menu » écrit en toutes lettres
 * ouvre la même liste sous l'en-tête. L'en-tête reste en place au défilement :
 * il ne disparaît pas, il ne change pas de couleur.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const menuId = useId();

  // Échap ferme le menu mobile.
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  const surConnexion = pathname === "/connexion";
  const surInscription = pathname === "/inscription";
  const fermer = () => setOuvert(false);

  return (
    <header className="sticky top-0 z-50 border-b border-filet bg-papier">
      <div className="s-container flex h-16 items-center gap-8">
        <Link href="/" onClick={fermer} className="shrink-0 text-encre" aria-label="Estio, accueil">
          <EstioLogo className="h-7 w-auto" title="Estio" aria-hidden />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_PRINCIPALE.map((l) => {
              const actif = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={actif ? "page" : undefined}
                    className={cx(
                      "text-[16px] underline-offset-[6px] transition-colors duration-150",
                      actif
                        ? "text-encre underline decoration-bleu decoration-2"
                        : "text-encre-2 hover:text-encre",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {!surConnexion && (
            <Link
              href="/connexion"
              className="text-[16px] text-encre-2 transition-colors duration-150 hover:text-encre"
            >
              Se connecter
            </Link>
          )}
          {!surInscription && (
            <BoutonLien href="/inscription" taille="compact">
              Créer un compte
            </BoutonLien>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-controls={menuId}
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-site border border-encre-3 px-4 text-[16px] font-semibold text-encre lg:hidden"
        >
          {ouvert ? (
            <>
              Fermer <IconClose size={16} />
            </>
          ) : (
            "Menu"
          )}
        </button>
      </div>

      {/* Menu mobile : la même liste, sous l'en-tête. */}
      <div
        id={menuId}
        hidden={!ouvert}
        className="border-t border-filet bg-papier lg:hidden"
      >
        <nav aria-label="Menu" className="s-container py-4">
          <ul className="flex flex-col">
            {NAV_PRINCIPALE.map((l) => (
              <li key={l.href} className="border-b border-filet">
                <Link
                  href={l.href}
                  onClick={fermer}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="block py-4 font-serif text-[22px] text-encre"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-filet">
              <Link href="/connexion" onClick={fermer} className="block py-4 text-[17px] text-encre-2">
                Se connecter
              </Link>
            </li>
          </ul>
          <BoutonLien href="/inscription" onClick={fermer} className="mt-6 w-full">
            Créer un compte gratuit
          </BoutonLien>
        </nav>
      </div>
    </header>
  );
}
