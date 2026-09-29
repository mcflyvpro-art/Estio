/**
 * Adresse publique du site, pour les liens absolus (image de partage, plan du
 * site, robots). Le domaine estio.immo n'est pas encore acquis : on prend
 * l'adresse déclarée (NEXT_PUBLIC_SITE_URL), sinon celle de production fournie
 * par Vercel, sinon le serveur local.
 */
export const ADRESSE_SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
