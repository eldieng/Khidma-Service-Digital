import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generatePageMetadata({
  title: "Realisations et projets clients",
  description:
    "Explorez les projets KSD en developpement web, design et transformation digitale realises pour nos clients.",
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
              Derniers projets de notre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                équipe KSD
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Découvrez nos réalisations et les projets que nous avons menés
              avec succès pour nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
              >
                <Link
                  href={`/realisations/${project.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-background border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl">
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-ksd-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ExternalLink className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-ksd-orange text-sm font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-ksd-orange transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-foreground-secondary text-sm mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech) => (
                          <span
                            key={tech.id}
                            className="px-3 py-1 bg-background-secondary rounded-full text-xs font-medium text-foreground-secondary"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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
