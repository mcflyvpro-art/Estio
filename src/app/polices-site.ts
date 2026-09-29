import { Newsreader, Schibsted_Grotesk } from "next/font/google";

/**
 * Les deux polices du site public (DESIGN.md §3), définies une seule fois.
 *
 * Utilisées par la mise en page de la vitrine, et par la page introuvable et la
 * page d'erreur, qui s'affichent hors de cette mise en page. L'outil ne les
 * charge jamais.
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

/**
 * Classes à poser sur l'enveloppe `.site`, enfant direct de <body>.
 * Exemple : `<div data-theme="light" className={`site ${POLICES_SITE}`}>`.
 */
export const POLICES_SITE = `${newsreader.variable} ${schibsted.variable}`;
