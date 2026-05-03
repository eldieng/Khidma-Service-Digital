"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ArticlePreviewData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  publishedAt: string;
}

export function BlogPreview() {
  const [articles, setArticles] = useState<ArticlePreviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) return;
        const data = (await res.json()) as ArticlePreviewData[];
        setArticles(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!loading && articles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-background">
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
              Notre Blog
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
              Actualités &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                conseils
              </span>
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="group">
              Voir tous les articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Articles Grid */}
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
                  <div className="rounded-2xl bg-background-secondary border border-border overflow-hidden">
                    <div className="aspect-[16/10] bg-foreground/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 w-20 bg-foreground/10 rounded" />
                      <div className="h-6 w-3/4 bg-foreground/10 rounded" />
                      <div className="h-4 w-full bg-foreground/10 rounded" />
                      <div className="h-4 w-2/3 bg-foreground/10 rounded" />
                    </div>
                  </div>
                </motion.div>
              ))
            : articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${article.slug}`} className="group block h-full">
                    <div className="h-full relative overflow-hidden rounded-2xl bg-background-secondary border border-border hover:border-ksd-orange/50 transition-all duration-300 hover:shadow-xl">
                      {/* Article Image */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <Image
                          src={article.image || "/images/placeholder.jpg"}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-ksd-orange text-white text-xs font-semibold rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-ksd-orange transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-foreground-secondary">
                          <div className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTime}</span>
                          </div>
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
