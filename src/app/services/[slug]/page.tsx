import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle, ExternalLink, ShieldCheck, Clock3, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return services.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service || !service.isActive) {
    return generatePageMetadata({
      title: "Service introuvable",
      description: "Ce service n'est pas disponible.",
      path: `/services/${slug}`,
    });
  }

  return generatePageMetadata({
    title: `${service.title} - service digital`,
    description: `${service.description} Découvrez la méthodologie, les livrables et les bénéfices pour votre activité.`,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, relatedProjects] = await Promise.all([
    prisma.service.findUnique({
      where: { slug },
      include: {
        benefits: { orderBy: { order: "asc" } },
        subServices: { orderBy: { order: "asc" } },
        processSteps: { orderBy: { step: "asc" } },
      },
    }),
    prisma.project.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        liveUrl: true,
      },
    }),
  ]);

  if (!service || !service.isActive) {
    notFound();
  }

  const faqItems = [
    {
      question: `Combien de temps prend un projet de ${service.title.toLowerCase()} ?`,
      answer:
        "Le délai dépend du périmètre, mais nous validons toujours un planning clair en amont avec des jalons hebdomadaires.",
    },
    {
      question: "Comment se déroule la collaboration avec KSD ?",
      answer:
        "Après un cadrage initial, nous avançons par étapes (validation, production, livraison) avec des points réguliers et des retours rapides.",
    },
    {
      question: "Proposez-vous un accompagnement après livraison ?",
      answer:
        "Oui, nous proposons un suivi post-livraison pour optimiser les performances, corriger rapidement et faire évoluer votre solution.",
    },
  ];

  return (
    <>
      {/* Hero - Modern Full Width */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ksd-blue/95 via-ksd-blue/80 to-ksd-blue/60 dark:from-black/95 dark:via-black/80 dark:to-black/60" />
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-ksd-orange/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/70 hover:text-ksd-orange mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux services
          </Link>

          <div className="max-w-3xl">
            <div>
              <span className="text-7xl mb-6 block">
                {service.icon}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                {service.longDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/demande-devis">
                  <Button size="lg" className="group text-base px-8">
                    Demander un devis gratuit
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="https://wa.me/221773675214" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8">
                    Discuter sur WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-2 bg-ksd-blue/10 text-ksd-blue dark:bg-ksd-orange/10 dark:text-ksd-orange rounded-full text-sm font-semibold mb-4">
              Ce que vous obtenez
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Un accompagnement complet et concret</h2>
            <p className="text-foreground-secondary">
              Au-dela de la prestation technique, nous apportons un cadre de travail clair et oriente resultats.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-background p-6">
              <ShieldCheck className="w-7 h-7 text-ksd-orange mb-3" />
              <h3 className="text-lg font-bold mb-2">Qualite et fiabilite</h3>
              <p className="text-sm text-foreground-secondary">
                Livrables testes, structures et prets a l&apos;usage pour votre equipe.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <Clock3 className="w-7 h-7 text-ksd-orange mb-3" />
              <h3 className="text-lg font-bold mb-2">Delai maitrise</h3>
              <p className="text-sm text-foreground-secondary">
                Roadmap claire, priorisation des actions et suivi continu jusqu&apos;a la livraison.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <Handshake className="w-7 h-7 text-ksd-orange mb-3" />
              <h3 className="text-lg font-bold mb-2">Partenariat long terme</h3>
              <p className="text-sm text-foreground-secondary">
                Conseils strategiques, support post-livraison et amelioration continue de vos performances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Modern Cards */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.05),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-ksd-orange/10 text-ksd-orange rounded-full text-sm font-semibold mb-4">
              Avantages
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Pourquoi choisir ce service ?
            </h2>
            <p className="text-lg text-foreground-secondary">
              Les avantages de travailler avec KSD pour votre {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="group relative p-8 bg-background-secondary rounded-3xl border border-border hover:border-ksd-orange/30 transition-all duration-300 hover:shadow-xl hover:shadow-ksd-orange/5"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-ksd-orange/10 to-transparent rounded-bl-[100px] rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-2xl bg-ksd-orange/10 flex items-center justify-center mb-5 group-hover:bg-ksd-orange group-hover:scale-110 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-ksd-orange group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-lg">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-ksd-orange/10 text-ksd-orange rounded-full text-sm font-semibold mb-4">
                Questions frequentes
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tout ce qu&apos;il faut savoir avant de demarrer</h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-border bg-background-secondary p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-foreground-secondary text-sm sm:text-base">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">Références</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-3">Projets associés</h2>
              <p className="text-foreground-secondary">
                Découvrez comment cette expertise se traduit dans des projets livrés pour nos clients.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/realisations/${project.slug}`} className="group rounded-2xl border border-border bg-background overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-ksd-orange transition-colors">{project.title}</h3>
                    <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">{project.description}</p>
                    <div className="text-xs font-semibold text-ksd-orange flex items-center gap-1">
                      Voir l&apos;étude de cas
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sub-services - Bento Grid Style */}
      <section className="py-24 bg-ksd-blue dark:bg-ksd-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
              Nos Prestations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ce que nous proposons
            </h2>
            <p className="text-lg text-white/70">
              Découvrez l&apos;ensemble de nos services en {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map((subService, index) => (
              <div
                key={subService.id}
                className={`group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-ksd-orange/50 hover:bg-white/10 transition-all duration-300 ${
                  index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ksd-orange/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-ksd-orange" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ksd-orange to-ksd-orange-dark flex items-center justify-center mb-6 shadow-lg shadow-ksd-orange/20">
                  <span className="text-2xl text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{subService.name}</h3>
                <p className="text-white/60 leading-relaxed">{subService.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Horizontal Timeline */}
      <section className="py-24 bg-background-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ksd-orange/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-2 bg-ksd-blue/10 dark:bg-ksd-orange/10 text-ksd-blue dark:text-ksd-orange rounded-full text-sm font-semibold mb-4">
              Notre Méthodologie
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Comment nous travaillons
            </h2>
            <p className="text-lg text-foreground-secondary">
              Une approche structurée pour garantir le succès de votre projet.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-ksd-orange via-ksd-blue to-ksd-orange rounded-full" />
              
              <div className="grid grid-cols-5 gap-4">
                {service.processSteps.map((step) => (
                  <div
                    key={step.id}
                    className="relative"
                  >
                    {/* Step Number */}
                    <div className="w-24 h-24 mx-auto rounded-full bg-background border-4 border-ksd-orange flex items-center justify-center text-3xl font-bold text-ksd-orange relative z-10 shadow-lg">
                      {step.step}
                    </div>
                    {/* Content */}
                    <div className="mt-8 text-center">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-foreground-secondary text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {service.processSteps.map((step) => (
              <div
                key={step.id}
                className="flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-ksd-orange text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-lg">
                  {step.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-foreground-secondary text-sm">{step.description}</p>
                </div>
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
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-white/80 mb-8">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis">
                <Button size="lg" className="bg-white text-ksd-blue hover:bg-white/90">
                  Lancer mon projet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/realisations">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Voir nos réalisations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
