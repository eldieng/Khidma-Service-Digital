import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import { ProjectsFilter } from "@/components/realisations/projects-filter";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generatePageMetadata({
  title: "Réalisations et projets clients",
  description:
    "Explorez les projets KSD en développement web, design et transformation digitale réalisés pour nos clients au Sénégal et en Afrique.",
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
                réalisations
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Découvrez nos projets réalisés avec succès pour nos clients.
              Sites web, applications, design et solutions digitales sur mesure.
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
            <Link href="/contact">
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
