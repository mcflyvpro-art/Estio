"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { IconCheck, IconChevronDown } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * Champs de formulaire du site (DESIGN.md §2 et §4).
 *
 * Bordure en encre tertiaire (5,7:1) : un champ doit se voir. Étiquette au-dessus,
 * toujours visible, jamais remplacée par un texte d'exemple. 48 px de haut, la
 * même hauteur qu'un bouton.
 */

const CONTROLE =
  "w-full rounded-site border border-encre-3 bg-feuille px-4 text-[17px] text-encre " +
  "placeholder:text-encre-3 transition-colors duration-150 " +
  "focus:border-bleu focus:outline-2 focus:outline-offset-0 focus:outline-bleu";

function Etiquette({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[16px] font-semibold text-encre">
      {children}
    </label>
  );
}

function Aide({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="s-small mt-2 text-encre-2">
      {children}
    </p>
  );
}

export function ChampTexte({
  label,
  aide,
  className,
  id,
  ...rest
}: { label: string; aide?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const champ = id ?? auto;
  return (
    <div>
      <Etiquette htmlFor={champ}>{label}</Etiquette>
      <input
        id={champ}
        aria-describedby={aide ? `${champ}-aide` : undefined}
        className={cx(CONTROLE, "h-12", className)}
        {...rest}
      />
      {aide && <Aide id={`${champ}-aide`}>{aide}</Aide>}
    </div>
  );
}

export function ChampZone({
  label,
  className,
  id,
  ...rest
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId();
  const champ = id ?? auto;
  return (
    <div>
      <Etiquette htmlFor={champ}>{label}</Etiquette>
      <textarea id={champ} className={cx(CONTROLE, "resize-y py-3 leading-relaxed", className)} {...rest} />
    </div>
  );
}

export function ChampChoix({
  label,
  className,
  id,
  children,
  ...rest
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const auto = useId();
  const champ = id ?? auto;
  return (
    <div>
      <Etiquette htmlFor={champ}>{label}</Etiquette>
      <div className="relative">
        <select id={champ} className={cx(CONTROLE, "h-12 cursor-pointer appearance-none pr-11", className)} {...rest}>
          {children}
        </select>
        <IconChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-encre-2"
        />
      </div>
    </div>
  );
}

export function CaseACocher({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cx(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-site border transition-colors duration-150",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bleu",
          checked ? "border-bleu bg-bleu text-feuille" : "border-encre-3 bg-feuille",
        )}
      >
        {checked && <IconCheck size={14} strokeWidth={2.2} />}
      </span>
      <span className="s-small text-encre-2">{children}</span>
    </label>
  );
}

/** Bandeau d'information, sobre. */
export function Remarque({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="status"
      className={cx("rounded-site border border-bleu bg-bleu-voile px-4 py-3 text-[16px] text-encre", className)}
    >
      {children}
    </div>
  );
}
