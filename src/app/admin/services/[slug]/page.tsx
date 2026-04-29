"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceData {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  image: string;
  order: number;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ServiceData | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        } else {
          router.push("/admin/services");
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/admin/services");
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/services/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/services");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

    try {
      const res = await fetch(`/api/services/${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/services");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-ksd-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!formData) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/services">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Modifier le Service</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:bg-red-50">
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titre *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description courte *</label>
          <textarea
            required
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description longue *</label>
          <textarea
            required
            rows={4}
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Icône (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-2xl text-center"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ordre</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/services">
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
          <Button type="submit" disabled={saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
