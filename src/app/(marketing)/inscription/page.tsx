import type { Metadata } from "next";
import { metaPage } from "@/components/site/meta";
import Link from "next/link";
import { FormulaireInscription } from "@/components/site/FormulairesAcces";

export const metadata: Metadata = metaPage(
  "Créer un compte",
  "Créez votre compte Estio. La formule Free est gratuite et ne demande pas de carte bancaire.",
);

export default function Inscription() {
  return (
    <section className="s-container py-16 lg:py-24">
      <div className="mx-auto max-w-[28rem]">
        <h1 className="s-h2 text-encre">Créez votre compte.</h1>
        <p className="s-body mt-4">
          Gratuit pour commencer, sans carte bancaire. Votre première annonce suffit pour
          voir ce qu&apos;Estio en dit.
        </p>
        <div className="mt-10">
          <FormulaireInscription />
        </div>
        <p className="s-small mt-8 border-t border-filet pt-6 text-encre-2">
          Vous avez déjà un compte&#8239;?{" "}
          <Link href="/connexion" className="s-link">
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
}
