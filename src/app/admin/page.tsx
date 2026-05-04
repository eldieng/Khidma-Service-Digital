"use client";

import { useEffect, useState } from "react";
import { 
  Briefcase, 
  FolderOpen, 
  FileText, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  ArrowUpRight,
  Plus,
  Calendar,
  BarChart3,
  Globe,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

interface Stats {
  services: number;
  projects: number;
  articles: number;
  quotes: number;
}

interface RecentItem {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  type: "project" | "article";
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0, articles: 0, quotes: 0 });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, projectsRes, articlesRes, quotesRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/projects"),
          fetch("/api/articles"),
          fetch("/api/quotes"),
        ]);

        const services = await servicesRes.json();
        const projects = await projectsRes.json();
        const articles = await articlesRes.json();
        const quotes = await quotesRes.json();

        setStats({
          services: Array.isArray(services) ? services.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          articles: Array.isArray(articles) ? articles.length : 0,
          quotes: Array.isArray(quotes) ? quotes.length : 0,
        });

        // Combine recent projects and articles
        const recentProjects = (Array.isArray(projects) ? projects : [])
          .slice(0, 3)
          .map((p: { id: string; title: string; slug: string; createdAt: string }) => ({ 
            ...p, 
            type: "project" as const 
          }));
        const recentArticles = (Array.isArray(articles) ? articles : [])
          .slice(0, 3)
          .map((a: { id: string; title: string; slug: string; createdAt: string }) => ({ 
            ...a, 
            type: "article" as const 
          }));
        
        setRecentItems([...recentProjects, ...recentArticles].slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Services",
      value: stats.services,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      href: "/admin/services",
      description: "Services actifs",
    },
    {
      title: "Réalisations",
      value: stats.projects,
      icon: FolderOpen,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
      href: "/admin/projects",
      description: "Projets publiés",
    },
    {
      title: "Articles",
      value: stats.articles,
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      href: "/admin/articles",
      description: "Articles de blog",
    },
    {
      title: "Demandes",
      value: stats.quotes,
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
      href: "/admin/quotes",
      description: "Demandes de devis",
    },
  ];

  const quickActions = [
    { 
      label: "Nouveau service", 
      href: "/admin/services/new", 
      icon: Briefcase,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    { 
      label: "Nouveau projet", 
      href: "/admin/projects/new", 
      icon: FolderOpen,
      color: "bg-emerald-500 hover:bg-emerald-600"
    },
    { 
      label: "Nouvel article", 
      href: "/admin/articles/new", 
      icon: FileText,
      color: "bg-purple-500 hover:bg-purple-600"
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Tableau de bord
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString("fr-FR", { 
              weekday: "long", 
              day: "numeric", 
              month: "long", 
              year: "numeric" 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.color} text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-black/10`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {loading ? (
                  <span className="inline-block w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                {card.title}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ksd-blue to-ksd-blue-dark flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">Activité récente</h2>
                <p className="text-xs text-gray-500">Derniers contenus ajoutés</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentItems.length > 0 ? (
              <div className="space-y-3">
                {recentItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.type === "project" ? `/admin/projects/${item.slug}` : `/admin/articles/${item.slug}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === "project" 
                        ? "bg-emerald-100 dark:bg-emerald-900/30" 
                        : "bg-purple-100 dark:bg-purple-900/30"
                    }`}>
                      {item.type === "project" ? (
                        <FolderOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-white truncate group-hover:text-ksd-orange transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.type === "project" ? "Réalisation" : "Article"} • {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-ksd-orange transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">Aucune activité récente</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats & Links */}
        <div className="space-y-6">
          {/* Site Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ksd-orange to-orange-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">Aperçu du site</h2>
                <p className="text-xs text-gray-500">khidmaservices.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Pages indexées</span>
                </div>
                <span className="font-bold text-gray-800 dark:text-white">43</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Avis Google</span>
                </div>
                <span className="font-bold text-ksd-orange">8 ⭐</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Clients actifs</span>
                </div>
                <span className="font-bold text-gray-800 dark:text-white">30+</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-bold text-gray-800 dark:text-white mb-4">Liens rapides</h2>
            <div className="space-y-2">
              <a
                href="https://khidmaservices.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-300 hover:text-ksd-orange"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Voir le site</span>
              </a>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-300 hover:text-ksd-orange"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm font-medium">Google Search Console</span>
              </a>
              <a
                href="https://business.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-300 hover:text-ksd-orange"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Google Business</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
