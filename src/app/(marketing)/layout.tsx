import type { Viewport } from "next";
import { POLICES_SITE } from "@/app/polices-site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/** Le site est toujours clair : la barre du navigateur mobile aussi. */
export const viewport: Viewport = {
  themeColor: "#fafaf7",
};

/**
 * Le site public. Ses règles sont dans DESIGN.md, ses valeurs dans
 * `design/site.css`, ses polices dans `app/polices-site.ts`.
 *
 * `data-theme="light"` : le site reste clair même si l'outil a été réglé en
 * sombre. `.site` doit rester un enfant direct de <body> (voir site.css).
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="light" className={`site ${POLICES_SITE} flex min-h-screen flex-col`}>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-site focus:bg-feuille focus:px-4 focus:py-2 focus:text-encre"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
