"use client";

import { useState, type FormEvent } from "react";
import { Bouton } from "@/components/site/Bouton";
import { ChampChoix, ChampTexte, ChampZone, Remarque } from "@/components/site/Champs";
import { IconArrowRight } from "@/components/ui/Icon";

const SUJETS = [
  "Un chiffre qui me semble faux",
  "Une question sur Estio",
  "Un usage professionnel",
  "Presse",
  "Autre chose",
];

/**
 * Formulaire de contact sans serveur : il prépare le message dans la
 * messagerie du visiteur, qui l'envoie lui-même. Rien n'est stocké, rien ne se
 * perd, et l'accusé de réception ne ment pas : il dit ce qui s'est vraiment
 * passé.
 */
export function FormulaireContact({ destinataire }: { destinataire: string }) {
  const [ouvert, setOuvert] = useState(false);

  function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nom = String(d.get("nom") ?? "");
    const email = String(d.get("email") ?? "");
    const sujet = String(d.get("sujet") ?? "");
    const message = String(d.get("message") ?? "");
    const corps = `${message}\n\n${nom}\n${email}`;
    window.location.href = `mailto:${destinataire}?subject=${encodeURIComponent(
      `${sujet} (${nom})`,
    )}&body=${encodeURIComponent(corps)}`;
    setOuvert(true);
  }

  return (
    <form onSubmit={envoyer} className="flex flex-col gap-6 rounded-site border border-filet bg-feuille p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <ChampTexte name="nom" label="Votre nom" required autoComplete="name" />
        <ChampTexte name="email" type="email" label="Votre adresse e-mail" required autoComplete="email" />
      </div>
      <ChampChoix name="sujet" label="Sujet" defaultValue={SUJETS[0]}>
        {SUJETS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </ChampChoix>
      <ChampZone name="message" label="Votre message" required rows={6} />

      {ouvert && (
        <Remarque>
          Votre messagerie s&apos;est ouverte avec le message prêt à partir. Il ne reste
          qu&apos;à l&apos;envoyer. Si rien ne s&apos;est ouvert, écrivez directement à{" "}
          <a href={`mailto:${destinataire}`} className="s-link">
            {destinataire}
          </a>
          .
        </Remarque>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Bouton type="submit" apres={<IconArrowRight size={16} />}>
          Préparer le message
        </Bouton>
        <p className="s-small text-encre-3">Le message s&apos;ouvre dans votre messagerie.</p>
      </div>
    </form>
  );
}
