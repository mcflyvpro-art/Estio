"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Bouton } from "@/components/site/Bouton";
import { CaseACocher, ChampTexte, Remarque } from "@/components/site/Champs";
import { IconArrowRight } from "@/components/ui/Icon";

/**
 * Connexion et création de compte.
 *
 * Les comptes arrivent avec la phase 5 (authentification Supabase). D'ici là,
 * les formulaires sont complets et accessibles, et l'envoi dit la vérité :
 * rien n'est enregistré. Le branchement sera une substitution, pas une refonte.
 */

function Separateur() {
  return (
    <div className="flex items-center gap-4" aria-hidden>
      <span className="h-px flex-1 bg-filet" />
      <span className="s-small text-encre-3">ou</span>
      <span className="h-px flex-1 bg-filet" />
    </div>
  );
}

const PAS_ENCORE =
  "Les comptes ne sont pas encore ouverts. Rien n'a été envoyé ni enregistré. Revenez bientôt.";

export function FormulaireConnexion() {
  const [info, setInfo] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Bouton variante="secondaire" className="w-full" onClick={() => setInfo(true)}>
        Continuer avec Google
      </Bouton>
      <Separateur />
      <ChampTexte name="email" type="email" label="Adresse e-mail" required autoComplete="email" />
      <ChampTexte
        name="password"
        type="password"
        label="Mot de passe"
        required
        autoComplete="current-password"
      />
      {info && <Remarque>{PAS_ENCORE}</Remarque>}
      <Bouton type="submit" className="w-full" apres={<IconArrowRight size={16} />}>
        Se connecter
      </Bouton>
    </form>
  );
}

export function FormulaireInscription() {
  const [info, setInfo] = useState(false);
  const [accord, setAccord] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Bouton variante="secondaire" className="w-full" onClick={() => setInfo(true)}>
        Continuer avec Google
      </Bouton>
      <Separateur />
      <ChampTexte name="email" type="email" label="Adresse e-mail" required autoComplete="email" />
      <ChampTexte
        name="password"
        type="password"
        label="Mot de passe"
        aide="Douze caractères au moins. Aucune règle de majuscule ni de symbole."
        required
        minLength={12}
        autoComplete="new-password"
      />
      <CaseACocher checked={accord} onChange={setAccord}>
        J&apos;accepte les{" "}
        <Link href="/cgu" className="s-link">
          conditions d&apos;utilisation
        </Link>{" "}
        et la{" "}
        <Link href="/confidentialite" className="s-link">
          politique de confidentialité
        </Link>
        .
      </CaseACocher>
      {info && <Remarque>{PAS_ENCORE}</Remarque>}
      <Bouton type="submit" className="w-full" disabled={!accord} apres={<IconArrowRight size={16} />}>
        Créer mon compte
      </Bouton>
    </form>
  );
}
