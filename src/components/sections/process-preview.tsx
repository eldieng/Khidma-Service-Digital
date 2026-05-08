"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket, Headphones } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Audit & cadrage",
    description: "Analyse de vos objectifs, de votre marché et des opportunités de croissance.",
  },
  {
    icon: PenTool,
    title: "Conception orientée conversion",
    description: "Messages, architecture et design pensés pour capter l'attention et convertir.",
  },
  {
    icon: Rocket,
    title: "Développement & lancement",
    description: "Mise en ligne rapide, performante, sécurisée et optimisée SEO.",
  },
  {
    icon: Headphones,
    title: "Suivi & amélioration continue",
    description: "Support réactif, ajustements réguliers et recommandations concrètes.",
  },
];

export function ProcessPreview() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
            Notre méthode
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Un processus clair, du brief au résultat
          </h2>
          <p className="text-foreground-secondary text-base sm:text-lg">
            Chaque projet suit une méthode structurée pour sécuriser les délais, la qualité et la performance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-background-secondary p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-ksd-orange/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-ksd-orange" />
              </div>
              <p className="text-xs text-foreground-secondary mb-2">Etape {index + 1}</p>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-foreground-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
