// Génère les images fixes du site public à partir du logo et des polices du site :
//   src/app/icon.svg            favicon vectoriel (clair et sombre)
//   src/app/apple-icon.png      180 × 180, écran d'accueil iOS
//   src/app/opengraph-image.png 1200 × 630, image de partage
//   src/app/favicon.ico         16, 32 et 48 px, pour les navigateurs sans SVG
//
// Usage :
//   POLICES=/chemin/vers/dossier node scripts/generer-visuels-site.mjs
// Le dossier POLICES contient newsreader.woff2 et schibsted.woff2 (versions
// variables, sous-ensemble latin, téléchargées depuis Google Fonts).
// CHROMIUM peut pointer vers un exécutable Chromium si Playwright n'a pas le sien.
//
// Les chiffres de l'image de partage viennent du moteur de l'outil appliqué au
// bien d'exemple de l'accueil (trois pièces à 245 000 €, réglages par défaut).
// Si ces valeurs changent, relancer ce script.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const RACINE = resolve(import.meta.dirname, "..");
const POLICES = process.env.POLICES;
if (!POLICES) throw new Error("Variable POLICES manquante (dossier des polices).");

// Les tracés du logo, lus dans le composant pour ne jamais diverger.
const logoSrc = readFileSync(resolve(RACINE, "src/components/site/Logo.tsx"), "utf8");
const bloc = (nom) => [...logoSrc.split(`const ${nom} = [`)[1].split("];")[0].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const MARK = bloc("MARK");
const WORD = bloc("WORD");

const ENCRE = "#17191c";
const PAPIER = "#fafaf7";

const chemins = (liste) => liste.map((d) => `<path d="${d}"/>`).join("");

// 1. Favicon vectoriel : carré, suit le thème clair ou sombre du navigateur.
writeFileSync(
  resolve(RACINE, "src/app/icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="287 342 284 284"><style>path{fill:${ENCRE}}@media (prefers-color-scheme:dark){path{fill:${PAPIER}}}</style>${chemins(MARK)}</svg>\n`,
);

// Polices intégrées en données : une page chargée par setContent ne peut pas lire file://.
const police = (f) => `data:font/woff2;base64,${readFileSync(resolve(POLICES, f)).toString("base64")}`;
const polices = `
@font-face{font-family:"Newsreader";src:url("${police("newsreader.woff2")}") format("woff2");font-weight:200 800}
@font-face{font-family:"Schibsted";src:url("${police("schibsted.woff2")}") format("woff2");font-weight:400 900}`;

// `arrondi` : fond papier aux coins arrondis, coins transparents. Sert au .ico,
// dont Turbopack exige des PNG en RGBA (une image entièrement opaque sort en RGB).
// L'icône Apple reste carrée et opaque : iOS arrondit lui-même.
const pictogramme = (taille, fond, arrondi = false) => `<!doctype html><html><head><style>
html,body{margin:0;width:${taille}px;height:${taille}px;background:${arrondi ? "transparent" : fond}}
.fond{width:100%;height:100%;background:${fond};border-radius:${arrondi ? "22%" : "0"}}
svg{display:block;width:100%;height:100%}</style></head><body><div class="fond">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="251 306 356 356" fill="${ENCRE}">${chemins(MARK)}</svg>
</div></body></html>`;

const partage = `<!doctype html><html><head><style>${polices}
html,body{margin:0;width:1200px;height:630px;background:${PAPIER};color:${ENCRE};font-family:"Schibsted",sans-serif;overflow:hidden}
.gauche{position:absolute;left:80px;top:64px;width:580px}
.logo{display:block;height:40px}
.insecable{white-space:nowrap}
h1{margin:64px 0 0;font-family:"Newsreader",serif;font-weight:400;font-size:66px;line-height:1.04;letter-spacing:-0.018em;font-optical-sizing:auto}
.chapo{margin:28px 0 0;font-family:"Newsreader",serif;font-size:26px;line-height:1.4;color:#474b52}
.carte{position:absolute;left:720px;top:168px;width:400px;box-sizing:border-box;padding:32px;background:#fff;border:1px solid #dedcd5;border-radius:6px}
.qui{margin:0;font-size:20px;font-weight:600;color:#23408e}
.verdict{margin:14px 0 0;font-family:"Newsreader",serif;font-size:46px;line-height:1.1;color:#bb4139}
.score{margin:6px 0 0;font-size:20px;color:#63676e;font-variant-numeric:tabular-nums}
.phrase{margin:22px 0 0;font-size:24px;line-height:1.35}
.tag{display:inline-block;margin-top:24px;padding:3px 10px;border:1px solid #dedcd5;border-radius:6px;font-size:17px;color:#63676e}
</style></head><body>
<div class="gauche">
<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="316 356 936 256" fill="${ENCRE}">${chemins([...MARK, ...WORD])}</svg>
<h1>Cet appartement <span class="insecable">est-il</span> un bon investissement&#8239;?</h1>
<p class="chapo">Estio calcule la mensualité, le loyer du secteur et ce qu’il vous restera chaque mois.</p>
</div>
<div class="carte">
  <p class="qui">La réponse d’Estio</p>
  <p class="verdict">Peu favorable</p>
  <p class="score">19 sur 100</p>
  <p class="phrase">Il vous faudra ajouter environ 812&#8239;€ par mois.</p>
  <span class="tag">Exemple fictif</span>
</div>
</body></html>`;

const navigateur = await chromium.launch(
  process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM, args: ["--no-sandbox"] } : {},
);

async function rendre(html, largeur, hauteur, sortie) {
  const page = await navigateur.newPage({ viewport: { width: largeur, height: hauteur } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // omitBackground : PNG en RGBA, seul format accepté dans un .ico par Turbopack.
  const png = await page.screenshot({ path: sortie, omitBackground: true });
  await page.close();
  return png;
}

await rendre(partage, 1200, 630, resolve(RACINE, "src/app/opengraph-image.png"));
await rendre(pictogramme(180, PAPIER), 180, 180, resolve(RACINE, "src/app/apple-icon.png"));

// favicon.ico : un en-tête, une entrée par taille, puis les PNG tels quels.
const tailles = [16, 32, 48];
const images = [];
for (const t of tailles) images.push(await rendre(pictogramme(t, PAPIER, true), t, t));
await navigateur.close();

const entete = Buffer.alloc(6);
entete.writeUInt16LE(0, 0);
entete.writeUInt16LE(1, 2);
entete.writeUInt16LE(images.length, 4);
let decalage = 6 + 16 * images.length;
const entrees = images.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(tailles[i], 0);
  e.writeUInt8(tailles[i], 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(decalage, 12);
  decalage += png.length;
  return e;
});
writeFileSync(resolve(RACINE, "src/app/favicon.ico"), Buffer.concat([entete, ...entrees, ...images]));
console.log("Images générées : icon.svg, apple-icon.png, opengraph-image.png, favicon.ico.");
