"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Users, Lightbulb, Heart, Target, Clock, Code, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: CheckCircle,
    title: "Excellence",
    description: "Offrir des solutions de qualité et un service irréprochable.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Toujours à la pointe des tendances pour répondre aux besoins du marché.",
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Un accompagnement personnalisé pour garantir la satisfaction de nos clients.",
  },
  {
    icon: Users,
    title: "Accessibilité",
    description: "Des services adaptés à toutes les entreprises, quelle que soit leur taille.",
  },
];

const reasons = [
  {
    icon: Target,
    title: "Premier processus de croissance",
    description: "Une méthodologie éprouvée pour accélérer votre développement digital.",
  },
  {
    icon: Clock,
    title: "Assistance dédiée 24h/24 et 7j/7",
    description: "Une équipe disponible pour répondre à vos besoins à tout moment.",
  },
  {
    icon: Code,
    title: "Conception de code propre",
    description: "Des solutions techniques robustes et maintenables sur le long terme.",
  },
];

const stats = [
  { value: "5+", label: "Années d'expérience" },
  { value: "50+", label: "Projets réalisés" },
  { value: "30+", label: "Clients satisfaits" },
  { value: "2", label: "Bureaux au Sénégal" },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              À propos de nous
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              KSD : L&apos;innovation digitale au service de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                votre réussite !
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Chez Khidma Service Digital (KSD), nous sommes bien plus qu&apos;une simple
              agence digitale. Nous sommes des créateurs de solutions innovantes,
              dédiés à accompagner les entreprises, startups et entrepreneurs dans
              leur transformation numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden">
                <Image
                  src="/images/colleagues-working-office-scaled.jpg"
                  alt="Équipe KSD au travail"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ksd-blue/50 to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-ksd-blue dark:text-ksd-orange mb-4 flex items-center gap-2">
                    🔹 Notre Mission
                  </h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Accompagner les entreprises et entrepreneurs dans leur transformation
                    digitale en leur proposant des solutions innovantes et adaptées à
                    leurs besoins en communication, web et bureautique.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-ksd-blue dark:text-ksd-orange mb-4 flex items-center gap-2">
                    🌍 Notre Vision
                  </h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Devenir une référence incontournable dans le domaine du digital et
                    de l&apos;impression en Afrique, en proposant des services accessibles,
                    performants et en constante évolution.
                  </p>
                </div>

                <p className="text-foreground-secondary leading-relaxed">
                  Avec une équipe passionnée et des outils de pointe, nous mettons
                  notre expertise au service de votre croissance en vous proposant
                  des solutions adaptées à vos besoins et à votre marché.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Nos Valeurs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Ce qui nous{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                définit
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-6 rounded-2xl border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-ksd-orange/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-ksd-orange" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-foreground-secondary text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Raisons de nous choisir */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Pourquoi nous choisir
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Raisons de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                compter sur nous
              </span>
            </h2>
            <p className="text-foreground-secondary mt-4">
              Choisir KSD, c&apos;est opter pour l&apos;excellence, l&apos;innovation et un service
              sur mesure adapté à vos besoins.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-ksd-blue/10 dark:bg-ksd-orange/10 flex items-center justify-center mx-auto mb-6">
                  <reason.icon className="w-8 h-8 text-ksd-blue dark:text-ksd-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-foreground-secondary">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-ksd-blue dark:bg-ksd-blue-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-ksd-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Créons votre site Web !
            </h2>
            <p className="text-foreground-secondary mb-8">
              Prêt à transformer votre présence digitale ? Contactez-nous pour
              discuter de votre projet.
            </p>
            <Link href="/contact">
              <Button size="lg" className="group">
                Demander un devis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
