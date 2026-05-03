"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = [
  "Équipe passionnée et expérimentée",
  "Approche personnalisée pour chaque projet",
  "Technologies modernes et performantes",
  "Support et accompagnement continu",
];

export function AboutPreview() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm sm:max-w-lg mx-auto">
              {/* Background shapes */}
              <div className="absolute inset-0 bg-gradient-to-br from-ksd-blue to-ksd-blue-dark rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-ksd-orange to-ksd-orange-dark rounded-3xl transform -rotate-3 opacity-80" />
              
              {/* Main content */}
              <div className="relative bg-background rounded-3xl p-4 sm:p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="bg-ksd-blue/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-ksd-blue mb-1 sm:mb-2">5+</div>
                    <div className="text-xs sm:text-sm text-foreground-secondary">Années d&apos;expérience</div>
                  </div>
                  <div className="bg-ksd-orange/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-ksd-orange mb-1 sm:mb-2">50+</div>
                    <div className="text-xs sm:text-sm text-foreground-secondary">Projets livrés</div>
                  </div>
                  <div className="bg-ksd-orange/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-ksd-orange mb-1 sm:mb-2">30+</div>
                    <div className="text-xs sm:text-sm text-foreground-secondary">Clients actifs</div>
                  </div>
                  <div className="bg-ksd-blue/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-ksd-blue mb-1 sm:mb-2">2</div>
                    <div className="text-xs sm:text-sm text-foreground-secondary">Bureaux au Sénégal</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              À propos de KSD
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              Votre partenaire digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                de confiance
              </span>
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Basée à Dakar et Louga, Khidma Service Digital est une agence de
              communication digitale qui accompagne les entreprises sénégalaises
              et africaines dans leur transformation numérique.
            </p>
            <p className="text-foreground-secondary text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Notre mission : rendre le digital accessible et performant pour
              toutes les entreprises, des startups aux grandes organisations.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-ksd-orange flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/a-propos">
              <Button variant="secondary" size="lg" className="group">
                Découvrir notre histoire
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
