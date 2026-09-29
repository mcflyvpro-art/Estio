import { PageIntro } from "@/components/site/PageIntro";
import { fr } from "@/components/site/typo";

export type SectionLegale = { heading: string; body: string };

/**
 * Gabarit des pages légales. Sommaire à gauche sur grand écran, texte à mesure
 * de lecture confortable. Un texte juridique lisible est un signe de sérieux.
 */
export function PageLegale({
  titre,
  chapo,
  sections,
  provisoire = true,
}: {
  titre: string;
  chapo?: string;
  sections: SectionLegale[];
  /** Affiche l'avertissement « texte provisoire » tant que le texte n'est pas définitif. */
  provisoire?: boolean;
}) {
  const ancre = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <>
      <PageIntro titre={titre} chapo={chapo} />

      <section className="s-container pb-24">
        {provisoire && (
          <p className="mb-12 max-w-[44rem] rounded-site border border-encre-3 bg-feuille px-4 py-3 text-[16px] text-encre">
            Texte provisoire, à compléter avant l&apos;ouverture du service. Les informations
            sur l&apos;éditeur, l&apos;hébergeur et le responsable du traitement restent à
            renseigner.
          </p>
        )}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="Sommaire" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <p className="s-small font-semibold text-encre">Sommaire</p>
              <ol className="mt-4 flex flex-col gap-2.5">
                {sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${ancre(s.heading)}`}
                      className="s-small text-encre-2 transition-colors duration-150 hover:text-encre hover:underline hover:underline-offset-4"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-[44rem] border-t border-encre lg:col-span-9">
            {sections.map((s) => (
              <article key={s.heading} id={ancre(s.heading)} className="border-b border-filet py-8">
                <h2 className="s-h3 text-encre">{s.heading}</h2>
                <p className="s-body mt-4 whitespace-pre-line">{fr(s.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
