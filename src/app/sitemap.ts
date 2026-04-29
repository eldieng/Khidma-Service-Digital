import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://khidmaservices.com";

  const staticPages = [
    "",
    "/a-propos",
    "/services",
    "/realisations",
    "/blog",
    "/faq",
    "/contact",
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

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
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
