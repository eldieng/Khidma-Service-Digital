import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generatePageMetadata({
  title: "Blog - Conseils en digital, design et web",
  description:
    "Retrouvez les actualites et conseils KSD sur le marketing digital, le design et le developpement web.",
  path: "/blog",
});

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { isActive: true },
    orderBy: { publishedAt: "desc" },
  });

  const featured = articles[0];
  const others = articles.slice(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  };

  if (articles.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="text-foreground-secondary">Aucun article disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Actualités &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                Conseils
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Restez informé des dernières tendances du digital, du design et du
              développement web avec nos articles et guides.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          <div className="mb-16">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 bg-background-secondary rounded-3xl overflow-hidden border border-border hover:border-ksd-orange/50 transition-all">
                <div className="aspect-[16/10] lg:aspect-auto relative">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-ksd-orange/10 text-ksd-orange rounded-full text-sm font-medium w-fit mb-4">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-ksd-orange transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-foreground-secondary mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate((featured.publishedAt ?? featured.createdAt).toISOString())}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((article) => (
              <div key={article.id}>
                <Link href={`/blog/${article.slug}`} className="group block h-full">
                  <div className="h-full bg-background rounded-2xl overflow-hidden border border-border hover:border-ksd-orange/50 transition-all hover:shadow-lg">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-black/90 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-3 group-hover:text-ksd-orange transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-foreground-secondary text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-foreground-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate((article.publishedAt ?? article.createdAt).toISOString())}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-background-secondary rounded-full font-medium hover:bg-ksd-orange hover:text-white transition-all">
              Besoin d&apos;un accompagnement ?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-ksd-blue dark:bg-ksd-blue-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Restez informé
            </h2>
            <p className="text-white/80 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers
              articles et conseils directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-ksd-orange focus:ring-1 focus:ring-ksd-orange outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-ksd-orange hover:bg-ksd-orange-dark text-white font-semibold rounded-xl transition-colors"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
