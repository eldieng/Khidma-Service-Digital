import { ArrowRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export async function ServicesPreview() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: 4,
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      icon: true,
      color: true,
    },
  });

  return (
    <section className="py-16 sm:py-24 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-2">
          <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
            Nos Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Des solutions digitales{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
              complètes
            </span>
          </h2>
          <p className="text-foreground-secondary text-base sm:text-lg">
            Des offres pensées pour faire croître votre activité: visibilité,
            acquisition, image de marque et performance opérationnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service) => (
            <div key={service.id}>
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <div className="relative h-full p-4 sm:p-6 bg-background rounded-2xl border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl sm:text-3xl leading-none">{service.icon}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-ksd-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center text-ksd-orange font-medium text-sm">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
