"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProjectPreviewData {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies?: { id: string; name: string }[];
}

export function ProjectsPreview() {
  const [projects, setProjects] = useState<ProjectPreviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) return;
        const data = (await res.json()) as ProjectPreviewData[];
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

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
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="rounded-2xl bg-background border border-border overflow-hidden">
                    <div className="aspect-[4/3] bg-foreground/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 w-24 bg-foreground/10 rounded" />
                      <div className="h-6 w-3/4 bg-foreground/10 rounded" />
                      <div className="h-4 w-full bg-foreground/10 rounded" />
                      <div className="h-4 w-2/3 bg-foreground/10 rounded" />
                    </div>
                  </div>
                </motion.div>
              ))
            : projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/realisations/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-background border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl">
                  {/* Project Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image || "/images/placeholder.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
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
                      {(project.technologies ?? []).slice(0, 3).map((tech) => (
                        <span
                          key={tech.id}
                          className="px-3 py-1 bg-background-secondary rounded-full text-xs font-medium text-foreground-secondary"
                        >
                          {tech.name}
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
