import type { MetadataRoute } from "next";
import { ADRESSE_SITE } from "@/lib/adresse-site";

/** Les pages du site public. L'outil, réservé aux comptes, n'y figure pas. */
const PAGES = [
  "",
  "/comment-ca-marche",
  "/tarifs",
  "/faq",
  "/a-propos",
  "/contact",
  "/inscription",
  "/connexion",
  "/mentions-legales",
  "/confidentialite",
  "/cgu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((chemin) => ({ url: `${ADRESSE_SITE}${chemin}` }));
}
