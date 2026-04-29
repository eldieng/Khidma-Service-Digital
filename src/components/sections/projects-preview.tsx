"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-commerce Mode",
    category: "Développement Web",
    description: "Plateforme e-commerce complète pour une marque de mode sénégalaise.",
    image: "/projects/project-1.jpg",
    href: "/realisations/ecommerce-mode",
    tags: ["Next.js", "Stripe", "TailwindCSS"],
  },
  {
    title: "App Gestion RH",
    category: "Application Web",
    description: "Solution de gestion des ressources humaines pour une PME.",
    image: "/projects/project-2.jpg",
    href: "/realisations/app-gestion-rh",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Campagne Social Media",
    category: "Communication Digitale",
    description: "Stratégie et création de contenu pour le lancement d'un produit.",
    image: "/projects/project-3.jpg",
    href: "/realisations/campagne-social",
    tags: ["Instagram", "Facebook", "TikTok"],
  },
];

export function ProjectsPreview() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Nos Réalisations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
              Projets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                récents
              </span>
            </h2>
          </div>
          <Link href="/realisations">
            <Button variant="outline" className="group">
              Voir tous les projets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={project.href} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-background border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl">
                  {/* Image Placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-ksd-blue/20 to-ksd-orange/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-ksd-blue/10">
                        {index + 1}
                      </div>
                    </div>
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
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-background-secondary rounded-full text-xs font-medium text-foreground-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
