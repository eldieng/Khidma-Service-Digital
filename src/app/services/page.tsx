import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock3, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generatePageMetadata({
  title: "Services digitaux orientés croissance",
  description:
    "Découvrez les services KSD pour attirer plus de clients, améliorer votre image de marque et accélérer votre croissance digitale.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, featuredProjects] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      include: { subServices: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { isActive: true, isFeatured: true },
      take: 3,
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
      },
    }),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Nos Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Des services qui font croître{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                votre business
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Nous combinons stratégie, design et exécution pour transformer vos objectifs
              commerciaux en résultats concrets: plus de visibilité, plus de leads et plus de ventes.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-background-secondary p-5">
              <ShieldCheck className="w-6 h-6 text-ksd-orange mb-2" />
              <h3 className="font-semibold mb-1">Qualité garantie</h3>
              <p className="text-sm text-foreground-secondary">Des livrables testés, documentés et faciles à maintenir.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background-secondary p-5">
              <Clock3 className="w-6 h-6 text-ksd-orange mb-2" />
              <h3 className="font-semibold mb-1">Exécution rapide</h3>
              <p className="text-sm text-foreground-secondary">Un planning clair et des jalons visibles pour sécuriser les délais.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background-secondary p-5">
              <BarChart3 className="w-6 h-6 text-ksd-orange mb-2" />
              <h3 className="font-semibold mb-1">Approche orientée ROI</h3>
              <p className="text-sm text-foreground-secondary">Chaque service est pensé pour générer des résultats mesurables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`} />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 text-3xl`}
                  >
                    {service.icon}
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    {service.title}
                  </h2>

                  <p className="text-foreground-secondary text-lg mb-6">
                    {service.longDescription}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.subServices.slice(0, 3).map((subService) => (
                      <li key={subService.id} className="flex items-start gap-2 text-sm text-foreground-secondary">
                        <CheckCircle2 className="w-4 h-4 text-ksd-orange mt-0.5 shrink-0" />
                        <span>{subService.name}: {subService.description}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Sub-services */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 text-ksd-blue dark:text-ksd-orange">
                      Nos services incluent :
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {service.subServices.map((subService) => (
                        <div
                          key={subService.name}
                          className="flex items-center gap-2 text-foreground-secondary"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-ksd-orange" />
                          {subService.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/services/${service.slug}`}>
                    <Button className="group">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">Preuves</p>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2">Exemples de projets livrés</h2>
              </div>
              <Link href="/realisations">
                <Button variant="outline" className="group">
                  Voir toutes les réalisations
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/realisations/${project.slug}`} className="group rounded-2xl border border-border bg-background overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-ksd-orange transition-colors">{project.title}</h3>
                    <p className="text-sm text-foreground-secondary line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-ksd-blue dark:bg-ksd-blue-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à passer à l&apos;action ?
            </h2>
            <p className="text-white/80 mb-8">
              Réservez un échange de 20 minutes pour définir la meilleure stratégie pour votre activité.
            </p>
            <Link href="/demande-devis">
              <Button size="lg" className="bg-white text-ksd-blue hover:bg-white/90">
                Recevoir une proposition
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
