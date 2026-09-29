import type { Metadata } from "next";
import { Hero } from "@/components/site/accueil/Hero";
import { MurAnnonces } from "@/components/site/accueil/MurAnnonces";
import { Etapes } from "@/components/site/accueil/Etapes";
import { CalculPose } from "@/components/site/accueil/CalculPose";
import { Suivi } from "@/components/site/accueil/Suivi";
import { Comparaison } from "@/components/site/accueil/Comparaison";
import { Sources } from "@/components/site/accueil/Sources";
import { AppelFinal } from "@/components/site/accueil/AppelFinal";

export const metadata: Metadata = {
  title: { absolute: "Estio · Savoir si une annonce immobilière est un bon investissement" },
  description:
    "Ajoutez la capture d'une annonce. Estio calcule la mensualité, le loyer du secteur et ce qu'il vous restera chaque mois, puis suit toute votre recherche jusqu'à l'offre.",
};

/**
 * L'accueil, dans l'ordre où un primo-investisseur se pose les questions :
 *
 *   1. Cet appartement vaut-il le coup ?        → l'annonce annotée, le verdict
 *   2. Et toutes les autres annonces ?          → le mur, la mémoire de la recherche
 *   3. Comment ça marche ?                      → quatre étapes, sommaire de la suite
 *   4. D'où sort ce verdict ?                   → le calcul posé, jouable
 *   5. Comment je m'organise ?                  → le suivi par étapes
 *   6. Entre les deux derniers, lequel ?        → la comparaison par priorité
 *   7. Est-ce que je peux vous croire ?         → les sources et les engagements
 *   8. Je commence.                             → l'appel final
 *
 * Règles visuelles et de ton : DESIGN.md.
 */
export default function Accueil() {
  return (
    <>
      <Hero />
      <MurAnnonces />
      <Etapes />
      <CalculPose />
      <Suivi />
      <Comparaison />
      <Sources />
      <AppelFinal />
    </>
  );
}
