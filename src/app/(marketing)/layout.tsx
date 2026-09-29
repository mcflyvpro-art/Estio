import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/**
 * Le site public. Ses règles sont dans DESIGN.md, ses valeurs dans
 * `design/site.css`.
 *
 * Les deux polices ne sont chargées qu'ici : l'outil n'en télécharge aucune.
 * Newsreader porte les titres, Schibsted Grotesk porte le texte et tous les
 * chiffres.
 *
 * `data-theme="light"` : le site reste clair même si l'outil a été réglé en
 * sombre. `.site` doit rester un enfant direct de <body> (voir site.css).
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="light"
      className={`site ${newsreader.variable} ${schibsted.variable} flex min-h-screen flex-col`}
    >
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
