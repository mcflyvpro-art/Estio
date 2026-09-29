import type { Metadata } from "next";

/**
 * Métadonnées d'une page du site : titre, description, et les mêmes pour le
 * partage (Open Graph). Sans cela, une page hériterait des champs de partage de
 * la mise en page racine, sans son propre titre. L'image de partage vient du
 * fichier `app/opengraph-image.png`.
 */
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
    },
    twitter: { card: "summary_large_image", title: titrePartage, description },
  };
}
