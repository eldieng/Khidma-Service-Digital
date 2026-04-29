import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Building2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project || !project.isActive) {
    return generatePageMetadata({
      title: "Projet introuvable",
      description: "Ce projet n'est pas disponible.",
      path: `/realisations/${slug}`,
    });
  }

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/realisations/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      technologies: { orderBy: { order: "asc" } },
      challenges: { orderBy: { order: "asc" } },
      solutions: { orderBy: { order: "asc" } },
      results: { orderBy: { order: "asc" } },
    },
  });

  if (!project || !project.isActive) {
    notFound();
  }

  return (
    <>
      {/* Hero - Immersive Full Screen */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Floating Back Button */}
        <Link
          href="/realisations"
          className="absolute top-28 left-4 sm:left-8 z-20 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 pt-32">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-ksd-orange text-white rounded-full text-sm font-semibold mb-6">
              {project.category}
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              {project.fullDescription}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-ksd-orange" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Date</p>
                  <p className="text-white font-medium">{project.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-ksd-orange" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Client</p>
                  <p className="text-white font-medium">{project.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Layers className="w-5 h-5 text-ksd-orange" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Technologies</p>
                  <p className="text-white font-medium">{project.technologies.length} outils</p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/10"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Challenges & Solutions - Modern Split Design */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-ksd-orange/10 text-ksd-orange rounded-full text-sm font-semibold mb-4">
              Étude de cas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Défis & Solutions
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Challenges */}
            <div
              className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-red-500/5 to-red-500/10 border border-red-500/20"
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="text-2xl text-white font-bold">!</span>
              </div>
              <h3 className="text-2xl font-bold mb-8 mt-4 ml-8">Défis rencontrés</h3>
              <ul className="space-y-5">
                {project.challenges.map((challenge, index) => (
                  <li 
                    key={challenge.id} 
                    className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl"
                  >
                    <span className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground-secondary pt-1">{challenge.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div
              className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20"
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-2xl text-white font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold mb-8 mt-4 mr-8">Solutions apportées</h3>
              <ul className="space-y-5">
                {project.solutions.map((solution, index) => (
                  <li 
                    key={solution.id}
                    className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl"
                  >
                    <span className="w-8 h-8 rounded-xl bg-green-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground-secondary pt-1">{solution.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-ksd-blue dark:bg-ksd-blue-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Résultats obtenus</h2>
            <p className="text-white/80">L&apos;impact concret de notre travail</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {project.results.map((result) => (
              <div
                key={result.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <p className="text-white text-lg">{result.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-foreground-secondary mb-8">
              Discutons de votre projet et voyons comment nous pouvons vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Démarrer un projet
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/realisations">
                <Button size="lg" variant="outline">
                  Voir d&apos;autres projets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
