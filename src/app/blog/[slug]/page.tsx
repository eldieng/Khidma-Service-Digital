import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || !article.isActive) {
    return generatePageMetadata({
      title: "Article introuvable",
      description: "Cet article n'est pas disponible.",
      path: `/blog/${slug}`,
    });
  }

  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || !article.isActive) {
    notFound();
  }

  const contentBlocks = article.content.split(/\n\n+/).filter(Boolean);
  const shareUrl = `https://khidmaservices.com/blog/${article.slug}`;
  const formattedDate = (article.publishedAt ?? article.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Hero - Magazine Style */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        {/* Floating Back Button */}
        <Link
          href="/blog"
          className="absolute top-28 left-4 sm:left-8 z-20 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog
        </Link>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 pt-32">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-ksd-orange text-white rounded-full text-sm font-semibold mb-6">
              {article.category}
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-ksd-orange flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{article.author}</p>
                  <p className="text-white/60 text-sm">{formattedDate}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Clock className="w-4 h-4 text-ksd-orange" />
                <span className="text-white text-sm">{article.readTime} de lecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content - Modern Article Layout */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {contentBlocks.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 
                      key={index} 
                      className="text-2xl lg:text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-4"
                    >
                      <span className="w-1 h-8 bg-ksd-orange rounded-full" />
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p 
                    key={index} 
                    className="text-foreground-secondary text-lg leading-relaxed mb-6"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* Share Section - Modern Design */}
            <div className="mt-16 p-8 bg-background-secondary rounded-3xl border border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-ksd-orange/10 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-ksd-orange" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Partagez cet article</p>
                    <p className="text-foreground-secondary text-sm">Aidez d&apos;autres à découvrir ce contenu</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-700/30 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Besoin d&apos;aide pour votre projet digital ?
            </h2>
            <p className="text-foreground-secondary mb-8">
              Notre équipe est là pour vous accompagner dans votre transformation numérique.
            </p>
            <Link href="/contact">
              <Button size="lg" className="group">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
