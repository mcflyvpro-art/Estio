# DESIGN.md · Estio, site public

Ce fichier fait foi pour tout le site public : l'accueil, les pages annexes, l'en-tête
et le pied de page. L'outil (`/app`) garde son propre système (`src/design/tokens.css`).
Un choix absent d'ici est d'abord ajouté ici, puis appliqué.

Valeurs : `src/design/site.css`. Composants : `src/components/site/`.

---

## 1. Direction

**Un dossier bien tenu : papier clair, encre graphite, et le bleu du stylo qui annote.
Le produit fait lui-même la démonstration, avec ses vrais calculs.**

Le visiteur est un primo-investisseur. Il a peur de se tromper. Le site doit le calmer
et lui montrer, pas l'éblouir.

Références retenues :

- **linear.app** : le produit est montré tel quel, en grand, sans décor autour.
- **La presse écrite** : filets fins, titres à empattements, légendes sous les figures.
  C'est ce qui donne un air sérieux et lisible.
- **Le stylo bille bleu** : on annote une annonce, on signe une offre. C'est le bleu
  d'Estio.
- **Le logo Estio** : un immeuble plein parmi des immeubles en contour. C'est le bien
  qu'on achète parmi ceux qu'on a regardés.

Écartés, parce que les générateurs les produisent par défaut : le noir avec un néon et
des effets (speedy.io, l'ancienne version), le crème avec des empattements et un orange
terre cuite, le blanc avec du violet.

---

## 2. Couleurs

Une principale, un accent, des neutres. Aucun dégradé. Aucune couleur écrite en dur
dans un composant : tout passe par les jetons.

| Rôle | Jeton | Valeur | Usage |
|---|---|---|---|
| **Principale** | `--encre` | `#17191C` | texte, logo, immeuble « retenu » |
| **Accent** | `--bleu` | `#23408E` | bouton principal, lien, focus, annotations d'Estio |
| Accent au survol | `--bleu-fonce` | `#1A3170` | survol du bouton et des liens |
| Voile d'accent | `--bleu-voile` | `#E9EDF6` | fond d'une annotation, d'un choix actif |
| Fond | `--papier` | `#FAFAF7` | fond de page |
| Retrait | `--retrait` | `#F1F0EC` | sections en retrait, pied de page |
| Feuille | `--feuille` | `#FFFFFF` | cartes, aperçus du produit, champs |
| Filet | `--filet` | `#DEDCD5` | séparations |
| Texte secondaire | `--encre-2` | `#474B52` | chapôs, paragraphes |
| Texte tertiaire | `--encre-3` | `#63676E` | légendes, bordure des champs |

Contrastes mesurés (WCAG 2.1) : encre 16,8:1 sur papier, encre-2 8,4:1, encre-3 5,4:1,
bleu 9,2:1, blanc sur bleu 9,6:1, bleu sur voile 8,2:1. Tout texte dépasse 4,5:1.

**Le verdict** (dans les aperçus du produit uniquement, jamais dans l'interface du site) :

| Verdict | Valeur |
|---|---|
| Bon dossier | `#28794D` |
| À creuser | `#8F621E` |
| Peu favorable | `#BB4139` |

Règles :

1. **La couleur ne fait jamais deux métiers.** Le bleu désigne une action ou une
   annotation. Il ne dit jamais si un bien est bon. Les trois feux ne servent qu'au
   verdict.
2. **Aucune ombre portée.** La profondeur vient des filets et du fond en retrait.
3. Les bordures de champs de formulaire sont en `--encre-3` (5,7:1), jamais en filet
   clair : un champ doit se voir.

---

## 3. Typographie

Deux polices, pas une de plus.

- **Newsreader** (Production Type, fonderie parisienne) : titres et chapôs. Graisses
  400 et 500. Pas d'italique décoratif.
- **Atkinson Hyperlegible Next** (Braille Institute) : texte courant, interface, et
  **tous les chiffres**. Elle a été dessinée pour qu'aucun caractère ne se confonde
  avec un autre. Graisses 400 et 600. Chiffres tabulaires (`tnum`) partout où des
  montants s'alignent.

| Rôle | Classe | Police | Taille | Interligne | Graisse |
|---|---|---|---|---|---|
| Titre principal | `.s-h1` | Newsreader | 40 → 76 px | 1,04 | 400 |
| Titre de section | `.s-h2` | Newsreader | 32 → 52 px | 1,08 | 400 |
| Titre de bloc | `.s-h3` | Newsreader | 24 px | 1,2 | 500 |
| Chapô | `.s-lead` | Newsreader | 20 → 22 px | 1,45 | 400 |
| Texte | `.s-body` | Atkinson | 17 px | 1,6 | 400 |
| Interface, bouton | (utilitaires) | Atkinson | 16 px | 1,3 | 600 |
| Légende | `.s-small` | Atkinson | 14 px | 1,45 | 400 |
| Mention | `.s-fine` | Atkinson | 13 px | 1,45 | 400 |

Rien sous 13 px. Casse de phrase partout, jamais de capitales interlettrées.
Mesure de lecture : 34 em maximum pour un paragraphe.

---

## 4. Formes et espacements

- **Un seul rayon : 6 px** (`rounded-site`). Boutons, cartes, champs, badges, images,
  cadres. Seule exception : ce qui est rond par nature (pastille de 8 px, poignée de
  curseur), en `rounded-full`.
- Filets de 1 px.
- **Grille** : 12 colonnes, contenu de 1200 px au plus, gouttière de page de 24 px
  (mobile) et 48 px (dès 1024 px), écart de colonnes de 24 px.
- **Espacements** : multiples de 8 px (4 px pour les réglages fins) : 8, 16, 24, 32,
  48, 64, 96, 128. Une section : 96 px en haut et en bas sur mobile, 128 px sur
  ordinateur.

**Boutons** : deux styles, pas un de plus.

| Style | Aspect | Hauteur |
|---|---|---|
| Principal | fond bleu, texte blanc, 16 px en 600 | 48 px (40 px dans l'en-tête) |
| Secondaire | bordure `--encre-3`, texte encre, fond transparent | idem |

Un seul bouton principal visible par écran. Un lien de texte est bleu et souligné.

---

## 5. Motif

**L'immeuble du logo.** En contour : une annonce vue. Plein : celle qu'on achète.
Il sert au mur de l'accueil, au favicon et au suivi de recherche. On n'ajoute aucune
autre illustration.

---

## 6. Icônes

Un seul jeu : `src/components/ui/Icon.tsx` (maison, sans dépendance). Grille de 24,
trait de 1,5 px, bouts arrondis, couleur héritée. Tailles 16 et 20 px uniquement.
Une icône ajoutée suit la même grammaire. Pas de bibliothèque d'icônes, pas d'emoji.

---

## 7. Mouvement

Autorisé, et rien d'autre :

| Geste | Durée |
|---|---|
| Changement de couleur au survol | 150 ms |
| Appui sur un bouton : il descend de 1 px | immédiat |
| Recalcul dans une démonstration : les barres glissent, les chiffres changent sans compteur | 250 ms |
| Ouverture du menu mobile et d'une réponse de la FAQ | 200 ms |
| Accueil : les annotations d'Estio apparaissent une à une sur l'annonce, au chargement | 200 ms chacune, 120 ms d'écart |

Interdit : écran de chargement, défilement lissé, parallaxe, section épinglée,
apparition au défilement, flou animé, compteur qui défile, bandeau défilant, effet 3D,
bouton magnétique, curseur personnalisé.

Avec « réduire les animations », tout mouvement est coupé et rien ne disparaît.

---

## 8. Textes

- **Vouvoiement**, partout.
- **20 mots au plus par phrase.** Une idée par phrase.
- Un mot concret plutôt qu'un concept. Un chiffre est toujours suivi de ce qu'il veut
  dire.
- Tout exemple est marqué **« Exemple fictif »**.
- Pas de tiret long ni de tiret moyen comme ponctuation. Pas de point d'exclamation.
- Pas de série de trois adjectifs, pas de slogan en « X, pas Y ».

Mots à ne jamais utiliser sur le site : révolutionner, booster, libérer, transformer
(votre…), solution tout-en-un, simple et puissant, en quelques clics, intelligent,
propulsé par l'IA, découvrez, plongez, écosystème, sans effort, insight, pipeline,
CRM, scraping, agrégateur, déterministe, N1, N2, N3.

Traductions obligatoires :

| Jargon | Sur le site |
|---|---|
| cash-flow | ce qu'il vous reste chaque mois |
| rendement net-net | rendement après impôt |
| TRI | rentabilité totale |
| scraping | copier les sites d'annonces |
| pipeline | votre recherche, votre suivi |

---

## 9. Images et preuves

- Aucune photo de banque d'images, aucune image générée, aucun visage.
- Les visuels sont des aperçus du produit construits en HTML, avec le vrai moteur de
  calcul quand il y a des chiffres, et marqués « Exemple fictif ».
- Aucun avis, chiffre de clients, logo ou mention presse tant qu'il n'est pas réel et
  vérifiable.
