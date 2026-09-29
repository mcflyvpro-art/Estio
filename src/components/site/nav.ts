// Source unique de la navigation du site public (en-tête, menu mobile, pied de page).

export type LienNav = { href: string; label: string };

export const NAV_PRINCIPALE: LienNav[] = [
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/tarifs", label: "Formules" },
  { href: "/faq", label: "Questions" },
];

export const PIED_DE_PAGE: { titre: string; liens: LienNav[] }[] = [
  { titre: "Le produit", liens: NAV_PRINCIPALE },
  {
    titre: "Estio",
    liens: [
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    titre: "Votre compte",
    liens: [
      { href: "/connexion", label: "Se connecter" },
      { href: "/inscription", label: "Créer un compte" },
    ],
  },
  {
    titre: "Informations légales",
    liens: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/cgu", label: "Conditions d'utilisation" },
    ],
  },
];
