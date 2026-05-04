import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://khidmaservices.com";

  // Pages statiques principales
  const staticPages = [
    { path: "", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/a-propos", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/services", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/realisations", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFreq: "daily" as const },
    { path: "/faq", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/demande-devis", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/mentions-legales", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/politique-confidentialite", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/cgu", priority: 0.3, changeFreq: "yearly" as const },
  ];

  const [services, projects, articles] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.article.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
    }),
  ]);

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  const serviceRoutes = services.map((slug) => ({
    url: `${baseUrl}/services/${slug.slug}`,
    lastModified: slug.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((slug) => ({
    url: `${baseUrl}/realisations/${slug.slug}`,
    lastModified: slug.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((slug) => ({
    url: `${baseUrl}/blog/${slug.slug}`,
    lastModified: slug.publishedAt ?? slug.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes];
}
