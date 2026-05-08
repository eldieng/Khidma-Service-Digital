import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutCtaBand() {
  return (
    <section className="py-16 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-background p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-ksd-orange font-semibold text-sm uppercase tracking-wider mb-3">
              A propos de KSD
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Une equipe locale engagee pour faire grandir votre presence digitale
            </h2>
            <p className="text-foreground-secondary text-sm sm:text-base mb-6">
              Decouvrez notre histoire, notre methode et nos engagements qualite pour
              livrer des projets utiles, performants et durables.
            </p>
            <Link href="/a-propos">
              <Button size="lg" className="group">
                Voir la page A propos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
