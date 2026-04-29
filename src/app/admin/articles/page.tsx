"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
  publishedAt: string | null;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Articles</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez les articles du blog KSD
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Aucun article trouvé</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Article</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Catégorie</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Auteur</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800 dark:text-white line-clamp-1 max-w-xs">{article.title}</p>
                        {article.isFeatured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{article.author}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.isActive 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {article.isActive ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${article.slug}`} target="_blank">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                      </Link>
                      <Link href={`/admin/articles/${article.slug}`}>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(article.slug)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
