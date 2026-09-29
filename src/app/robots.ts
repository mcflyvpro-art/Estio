import type { MetadataRoute } from "next";
import { ADRESSE_SITE } from "@/lib/adresse-site";

/** Le site public s'indexe ; l'outil et l'API, non. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/app", "/api"] },
    sitemap: `${ADRESSE_SITE}/sitemap.xml`,
  };
}
