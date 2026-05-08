"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import Link from "next/link";

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  industry: string | null;
  description: string;
  fullDescription: string;
  client: string;
  date: string;
  duration: string | null;
  image: string;
  liveUrl: string | null;
  repositoryUrl: string | null;
  projectStatus: string;
  order: number;
  isFeatured: boolean;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
}

function toLines(items: string[]) {
  return items.join("\n");
}

function toArrayFromLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProjectData | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            ...data,
            technologies: Array.isArray(data.technologies)
              ? data.technologies.map((item: { name?: string } | string) =>
                  typeof item === "string" ? item : (item.name ?? "")
                ).filter(Boolean)
              : [],
            challenges: Array.isArray(data.challenges)
              ? data.challenges.map((item: { text?: string } | string) =>
                  typeof item === "string" ? item : (item.text ?? "")
                ).filter(Boolean)
              : [],
            solutions: Array.isArray(data.solutions)
              ? data.solutions.map((item: { text?: string } | string) =>
                  typeof item === "string" ? item : (item.text ?? "")
                ).filter(Boolean)
              : [],
            results: Array.isArray(data.results)
              ? data.results.map((item: { text?: string } | string) =>
                  typeof item === "string" ? item : (item.text ?? "")
                ).filter(Boolean)
              : [],
          });
        } else {
          router.push("/admin/projects");
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/admin/projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/projects/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/projects");
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/projects");
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
          <Link href="/admin/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Modifier le Projet</h1>
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

        <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium mb-2">Catégorie *</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Technologies (une par ligne)</label>
          <textarea
            rows={4}
            value={toLines(formData.technologies)}
            onChange={(e) => setFormData({ ...formData, technologies: toArrayFromLines(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder={"Next.js\nTypeScript\nPostgreSQL"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Defis rencontres (un par ligne)</label>
          <textarea
            rows={4}
            value={toLines(formData.challenges)}
            onChange={(e) => setFormData({ ...formData, challenges: toArrayFromLines(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Solutions apportees (une par ligne)</label>
          <textarea
            rows={4}
            value={toLines(formData.solutions)}
            onChange={(e) => setFormData({ ...formData, solutions: toArrayFromLines(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Resultats obtenus (un par ligne)</label>
          <textarea
            rows={4}
            value={toLines(formData.results)}
            onChange={(e) => setFormData({ ...formData, results: toArrayFromLines(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Secteur</label>
          <input
            type="text"
            value={formData.industry || ""}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
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
          <label className="block text-sm font-medium mb-2">Description complète *</label>
          <textarea
            required
            rows={4}
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Client *</label>
            <input
              type="text"
              required
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Durée du projet</label>
            <input
              type="text"
              value={formData.duration || ""}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Statut projet</label>
            <select
              value={formData.projectStatus}
              onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="live">En ligne</option>
              <option value="in_progress">En cours</option>
              <option value="private">Privé</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">URL du site</label>
            <input
              type="url"
              value={formData.liveUrl || ""}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">URL du repository</label>
            <input
              type="url"
              value={formData.repositoryUrl || ""}
              onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <ImageUpload
          label="Image du projet"
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
          folder="projects"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor="featured" className="text-sm">Projet mis en avant</label>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/projects">
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
