import { computeInvestmentMetrics } from "@/lib/calc/metrics";
import { computeScoreSur100 } from "@/lib/calc/scoring";
import { verdictFromScore, type Verdict } from "@/lib/verdict";
import type { PropertyRow, PropertyScenarioRow } from "@/lib/property-detail-types";

/**
 * Les démonstrations de l'accueil font tourner le VRAI moteur de calcul de
 * l'outil (`lib/calc/metrics.ts`), pas une formule réécrite pour l'occasion.
 * Ce qu'on affiche ici est donc exactement ce que la fiche d'un bien afficherait
 * avec les mêmes chiffres et les mêmes hypothèses.
 *
 * Les biens sont fictifs. Leur loyer est donné pour l'exemple : dans l'outil,
 * il vient des données de marché de l'adresse.
 */

export type BienExemple = {
  id: string;
  /** Nom court, affiché sur les onglets. */
  nom: string;
  titre: string;
  prix: number;
  surface: number;
  pieces: number;
  loyer: number;
  chargesCoproMensuelles: number;
  taxeFonciere: number;
  dpe: string;
  etage: string;
};

export type Hypotheses = {
  apportPct: number;
  tauxPct: number;
  dureeAnnees: number;
};

/** Valeurs par défaut d'un scénario neuf dans l'outil (migration Supabase). */
export const HYPOTHESES_PAR_DEFAUT: Hypotheses = {
  apportPct: 10,
  tauxPct: 3.85,
  dureeAnnees: 20,
};

export const BIENS_EXEMPLE: BienExemple[] = [
  {
    id: "t3",
    nom: "Trois pièces",
    titre: "Trois pièces de 68 m²",
    prix: 245_000,
    surface: 68,
    pieces: 3,
    loyer: 890,
    chargesCoproMensuelles: 110,
    taxeFonciere: 980,
    dpe: "D",
    etage: "3e étage sans ascenseur",
  },
  {
    id: "t2",
    nom: "Deux pièces",
    titre: "Deux pièces de 42 m²",
    prix: 115_000,
    surface: 42,
    pieces: 2,
    loyer: 690,
    chargesCoproMensuelles: 80,
    taxeFonciere: 700,
    dpe: "C",
    etage: "4e étage avec ascenseur",
  },
  {
    id: "studio",
    nom: "Studio",
    titre: "Studio de 22 m²",
    prix: 62_000,
    surface: 22,
    pieces: 1,
    loyer: 450,
    chargesCoproMensuelles: 45,
    taxeFonciere: 450,
    dpe: "D",
    etage: "1er étage",
  },
];

function versLigneBien(bien: BienExemple): PropertyRow {
  return {
    add_source: "manual",
    address: null,
    address_extra: null,
    asking_price: bien.prix,
    bedrooms: Math.max(0, bien.pieces - 1),
    board_position: 0,
    city: null,
    condition: null,
    contact_id: null,
    created_at: "",
    discard_reason: null,
    dpe_letter: bien.dpe,
    dpe_value: null,
    estimated_rent: bien.loyer,
    exposure: null,
    floor: null,
    floors_total: null,
    furnished: true,
    ges_letter: null,
    has_balcony: null,
    has_cave: null,
    has_elevator: null,
    has_parking: null,
    has_terrace: null,
    id: bien.id,
    insee_code: null,
    lat: null,
    listed_since_days: null,
    lots_count: null,
    lng: null,
    max_price: null,
    monthly_copro_charges: bien.chargesCoproMensuelles,
    outdoor_area: null,
    postal_code: null,
    project_id: "exemple",
    property_tax: bien.taxeFonciere,
    property_type: "appartement",
    rooms: bien.pieces,
    status: "analyser",
    surface_carrez: bien.surface,
    updated_at: "",
    user_id: "exemple",
    voted_works: 0,
    works_estimate: 0,
    year_built: null,
  };
}

/** Scénario neuf de l'outil, dont on ne change que l'apport, le taux et la durée. */
function versLigneScenario(bien: BienExemple, h: Hypotheses): PropertyScenarioRow {
  return {
    apport_pct: h.apportPct,
    broker_fees: 0,
    created_at: "",
    deferral_months: 0,
    dossier_fees: 1000,
    duration_years: h.dureeAnnees,
    gli: false,
    guarantee_fees: 0,
    guarantee_type: "caution",
    horizon_years: 15,
    id: `scenario-${bien.id}`,
    insurance_on_initial: true,
    insurance_rate: 0.34,
    interest_rate: h.tauxPct,
    loan_type: "amortissable",
    management_fees_pct: 0,
    market_scenario: "central",
    notary_fees_pct: 8,
    pno: true,
    property_id: bien.id,
    tax_regime: "lmnp_reel",
    tmi_pct: 30,
    updated_at: "",
    user_id: "exemple",
    vacancy_pct: 0,
    works_provision: 0,
  };
}

export type LigneCalcul = { libelle: string; detail?: string; montant: number };

export type Analyse = {
  /** Lignes de l'addition, arrondies à l'euro. */
  lignes: LigneCalcul[];
  /** Somme des lignes arrondies : l'addition affichée tombe juste. */
  reste: number;
  mensualite: number;
  emprunt: number;
  score: number;
  verdict: Verdict;
  rendementBrutPct: number | null;
};

export function analyser(bien: BienExemple, h: Hypotheses): Analyse {
  const m = computeInvestmentMetrics(versLigneBien(bien), versLigneScenario(bien, h));
  const { scoreSur100 } = computeScoreSur100({
    rendementNetNetPct: m.rendementNetNetPct,
    cashOnCashPct: m.cashOnCashPct,
    triPct: m.tri,
  });

  const lignes: LigneCalcul[] = [
    { libelle: "Loyer", detail: "encaissé chaque mois", montant: Math.round(bien.loyer) },
    {
      libelle: "Mensualité du prêt",
      detail: `${formatSimple(Math.round(m.costs.loanPrincipal))} € empruntés`,
      montant: -Math.round(m.monthlyPayment),
    },
    { libelle: "Assurance du prêt", montant: -Math.round(m.monthlyInsurance) },
    { libelle: "Charges de copropriété", montant: -Math.round(bien.chargesCoproMensuelles) },
    { libelle: "Taxe foncière", detail: "ramenée au mois", montant: -Math.round(bien.taxeFonciere / 12) },
    {
      libelle: "Impôt sur les loyers",
      detail: "location meublée, régime réel",
      montant: -Math.round(m.currentTax.annualTax / 12),
    },
  ];

  return {
    lignes,
    reste: lignes.reduce((s, l) => s + l.montant, 0),
    mensualite: Math.round(m.monthlyPayment),
    emprunt: Math.round(m.costs.loanPrincipal),
    score: scoreSur100,
    verdict: verdictFromScore(scoreSur100),
    rendementBrutPct: m.rendementBrutPct,
  };
}

/**
 * Séparateur de milliers français (espace fine insécable), sans symbole :
 * « 224 910 ». Écrit à la main plutôt qu'avec `toLocaleString` : le rendu
 * serveur et le navigateur doivent produire exactement la même chaîne.
 */
export function formatSimple(n: number): string {
  const s = String(Math.abs(Math.round(n)));
  const groupes = s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  return n < 0 && Math.round(n) !== 0 ? `\u2212${groupes}` : groupes;
}

/** Montant signé, pour une addition : « +690 € », « −512 € ». */
export function formatSigne(n: number): string {
  const abs = formatSimple(Math.abs(n));
  if (n > 0) return `+${abs}\u00a0€`;
  if (n < 0) return `\u2212${abs}\u00a0€`;
  return "0\u00a0€";
}

/**
 * La phrase qui dit ce que le résultat veut dire pour le visiteur. Elle part du
 * reste mensuel, que tout le monde comprend, avant le verdict.
 */
export function phraseReste(reste: number): string {
  if (reste >= 20)
    return `Le loyer couvre tout. Il vous reste environ ${formatSimple(reste)} € par mois.`;
  if (reste > -20) return "Le loyer couvre tout juste les dépenses. Vous êtes à l'équilibre.";
  return `Le loyer ne couvre pas tout. Il vous faudra ajouter environ ${formatSimple(-reste)} € par mois.`;
}
