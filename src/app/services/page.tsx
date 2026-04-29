import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generatePageMetadata({
  title: "Services digitaux pour entreprises",
  description:
    "KSD accompagne votre croissance avec des services en communication digitale, developpement web, design et automatisation.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    include: { subServices: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

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
              Nous nous soucions de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                votre entreprise
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              De la stratégie à l&apos;exécution, nous vous accompagnons dans tous les
              aspects de votre transformation digitale avec des solutions sur mesure.
            </p>
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

      {/* CTA */}
      <section className="py-20 bg-ksd-blue dark:bg-ksd-blue-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Besoin de tout type de solution informatique pour votre entreprise ?
            </h2>
            <p className="text-white/80 mb-8">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-ksd-blue hover:bg-white/90">
                Demander un devis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
