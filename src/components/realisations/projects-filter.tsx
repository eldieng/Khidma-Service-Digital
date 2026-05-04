"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter } from "lucide-react";

interface Technology {
  id: string;
  name: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  technologies: Technology[];
}

interface ProjectsFilterProps {
  projects: Project[];
}

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-ksd-orange text-white shadow-lg shadow-ksd-orange/30"
                : "bg-background-secondary text-foreground-secondary hover:bg-ksd-orange/10 hover:text-ksd-orange"
            }`}
          >
            {category === "all" ? (
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Tous
              </span>
            ) : (
              category
            )}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-foreground-secondary mb-8">
        {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} trouvé{filteredProjects.length > 1 ? "s" : ""}
      </p>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/realisations/${project.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-background border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl">
                  {/* Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-ksd-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="w-10 h-10 text-white" />
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-ksd-orange text-white text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-ksd-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground-secondary text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech.id}
                          className="px-3 py-1 bg-background-secondary rounded-full text-xs font-medium text-foreground-secondary"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-3 py-1 bg-background-secondary rounded-full text-xs font-medium text-foreground-secondary">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground-secondary text-lg">
            Aucun projet trouvé dans cette catégorie.
          </p>
        </div>
      )}
    </>
  );
}
