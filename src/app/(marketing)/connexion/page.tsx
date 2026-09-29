import type { Metadata } from "next";
import Link from "next/link";
import { FormulaireConnexion } from "@/components/site/FormulairesAcces";

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Retrouvez vos projets, vos annonces et vos notes.",
};

export default function Connexion() {
  return (
    <section className="s-container py-16 lg:py-24">
      <div className="mx-auto max-w-[28rem]">
        <h1 className="s-h2 text-encre">Reprenez où vous en étiez.</h1>
        <p className="s-body mt-4">
          Vos projets, vos annonces, vos notes et vos raisons d&apos;écarter vous attendent.
        </p>
        <div className="mt-10">
          <FormulaireConnexion />
        </div>
        <p className="s-small mt-8 border-t border-filet pt-6 text-encre-2">
          Pas encore de compte&#8239;?{" "}
          <Link href="/inscription" className="s-link">
            Créer un compte
          </Link>
        </p>
      </div>
    </section>
  );
}
