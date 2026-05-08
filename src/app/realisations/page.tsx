import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import { ProjectsFilter } from "@/components/realisations/projects-filter";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generatePageMetadata({
  title: "Réalisations web et études de cas clients",
  description:
    "Découvrez nos réalisations détaillées : contexte, objectifs, solutions et résultats business pour chaque projet digital livré par KSD.",
  path: "/realisations",
});

export default async function RealisationsPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    include: { technologies: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                études de cas
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Chaque projet présente le contexte client, les défis, les solutions
              mises en œuvre et les résultats obtenus. Cliquez pour consulter les
              détails et, quand disponible, le site en ligne.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsFilter projects={projects} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ksd-blue dark:bg-ksd-blue-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-white/80 mb-8">
              Discutons de votre projet et voyons comment nous pouvons vous aider
              à atteindre vos objectifs.
            </p>
            <Link href="/demande-devis">
              <Button size="lg" className="bg-white text-ksd-blue hover:bg-white/90">
                Démarrer un projet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
