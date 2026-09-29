/**
 * Typographie française pour les textes du site.
 *
 * Espace insécable avant « : » et après « « », fine insécable avant « ; ? ! »
 * et avant « » ». Évite qu'un deux-points ou un point d'interrogation se
 * retrouve seul en début de ligne.
 */
export function fr(texte: string): string {
  return texte
    .replace(/ ([:])/g, " $1")
    .replace(/ ([;?!»])/g, " $1")
    .replace(/« /g, "« ");
}
