"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

    try {
      await fetch(`/api/services/${slug}`, { method: "DELETE" });
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Services</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez les services proposés par KSD
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nouveau service
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Aucun service trouvé</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{service.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{service.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      service.isActive 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {service.isActive ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/services/${service.slug}`} target="_blank">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                      </Link>
                      <Link href={`/admin/services/${service.slug}`}>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(service.slug)}
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
