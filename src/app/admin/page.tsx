"use client";

import { useEffect, useState } from "react";
import { Briefcase, FolderOpen, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Stats {
  services: number;
  projects: number;
  articles: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0, articles: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [servicesRes, projectsRes, articlesRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/projects"),
          fetch("/api/articles"),
        ]);

        const services = await servicesRes.json();
        const projects = await projectsRes.json();
        const articles = await articlesRes.json();

        setStats({
          services: Array.isArray(services) ? services.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          articles: Array.isArray(articles) ? articles.length : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Services",
      value: stats.services,
      icon: Briefcase,
      color: "bg-blue-500",
      href: "/admin/services",
    },
    {
      title: "Réalisations",
      value: stats.projects,
      icon: FolderOpen,
      color: "bg-green-500",
      href: "/admin/projects",
    },
    {
      title: "Articles",
      value: stats.articles,
      icon: FileText,
      color: "bg-purple-500",
      href: "/admin/articles",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Bienvenue dans le back-office KSD
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                  {loading ? "..." : card.value}
                </p>
              </div>
              <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Gérer</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/admin/services/new"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-blue-700 dark:text-blue-400">Nouveau service</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <FolderOpen className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-700 dark:text-green-400">Nouveau projet</span>
          </Link>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <FileText className="w-5 h-5 text-purple-500" />
            <span className="font-medium text-purple-700 dark:text-purple-400">Nouvel article</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
