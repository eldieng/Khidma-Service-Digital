"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Palette, Megaphone, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Megaphone,
    title: "Communication Digitale",
    description:
      "Stratégie social media, création de contenu, community management et campagnes publicitaires pour booster votre visibilité.",
    href: "/services/communication-digitale",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Globe,
    title: "Développement Web",
    description:
      "Sites vitrines, e-commerce, applications web sur mesure avec les technologies les plus modernes et performantes.",
    href: "/services/developpement-web",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Design Graphique",
    description:
      "Identité visuelle, logos, supports print et digitaux pour une image de marque cohérente et impactante.",
    href: "/services/web-design",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileSpreadsheet,
    title: "Bureautique & Automatisation",
    description:
      "Formation, automatisation des processus et solutions bureautiques pour optimiser votre productivité.",
    href: "/services/bureautique-automatisation",
    color: "from-green-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesPreview() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Des solutions digitales{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
              complètes
            </span>
          </h2>
          <p className="text-foreground-secondary text-lg">
            De la stratégie à l&apos;exécution, nous vous accompagnons dans tous
            les aspects de votre transformation digitale.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={service.href} className="group block h-full">
                <div className="relative h-full p-6 bg-background rounded-2xl border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-ksd-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-ksd-orange font-medium text-sm">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
