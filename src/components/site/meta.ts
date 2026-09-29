import type { Metadata } from "next";

/**
 * Métadonnées d'une page du site : titre, description, et les mêmes pour le
 * partage (Open Graph). Sans cela, une page hériterait des champs de partage de
 * la mise en page racine, sans son propre titre.
 *
 * L'image est un fichier ordinaire de `public/`, déclaré ici pour toutes les
 * pages. (La convention `app/opengraph-image.png` la faisait disparaître de
 * l'accueil dès qu'une page définissait son propre bloc `openGraph`.)
 */
const IMAGE_PARTAGE = {
  url: "/image-partage.png",
  width: 1200,
  height: 630,
  alt: "La question « Cet appartement est-il un bon investissement ? » et la réponse d'Estio sur un exemple fictif.",
};

export function metaPage(
  titre: string,
  description: string,
  { absolu = false }: { absolu?: boolean } = {},
): Metadata {
  const titrePartage = absolu ? titre : `${titre} · Estio`;
  return {
    title: absolu ? { absolute: titre } : titre,
    description,
    openGraph: {
      title: titrePartage,
      description,
      siteName: "Estio",
      locale: "fr_FR",
      type: "website",
      images: [IMAGE_PARTAGE],
    },
    twitter: { card: "summary_large_image", title: titrePartage, description, images: [IMAGE_PARTAGE] },
  };
}
