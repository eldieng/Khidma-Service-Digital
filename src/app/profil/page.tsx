"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Building, Camera, Save, LogOut, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  company: string | null;
  avatar: string | null;
  role: string;
  createdAt: string;
  quoteRequests?: Array<{
    id: string;
    service: string;
    status: string;
    createdAt: string;
  }>;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Terminé", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-800" },
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
  });

  const fetchUserData = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("user");
          router.push("/connexion");
          return;
        }
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      setUser(data);
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        company: data.company || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/connexion");
      return;
    }

    const userData = JSON.parse(storedUser);
    fetchUserData(userData.id);
  }, [router, fetchUserData]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser({ ...user, ...updatedUser });
        localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
        alert("Profil mis à jour !");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      router.push("/");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-ksd-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mon Profil</h1>
            <p className="text-foreground-secondary">
              Gérez vos informations personnelles
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-background-secondary rounded-3xl p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-ksd-orange/10 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-ksd-orange" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-ksd-orange rounded-full flex items-center justify-center text-white shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-foreground-secondary text-sm mb-4">{user.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "admin" 
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}>
                  {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                </span>

                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full">
                        Accéder au Back-Office
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Edit Profile */}
              <div className="bg-background-secondary rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-6">Informations personnelles</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all"
                        placeholder="+221 77 XXX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Entreprise</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </div>

              {/* Quote Requests */}
              <div className="bg-background-secondary rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Mes demandes de devis</h3>
                  <Link href="/demande-devis">
                    <Button size="sm">Nouvelle demande</Button>
                  </Link>
                </div>

                {user.quoteRequests && user.quoteRequests.length > 0 ? (
                  <div className="space-y-3">
                    {user.quoteRequests.map((quote) => {
                      const status = statusLabels[quote.status] || statusLabels.pending;
                      return (
                        <div
                          key={quote.id}
                          className="flex items-center justify-between p-4 bg-background rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-ksd-orange/10 rounded-xl flex items-center justify-center">
                              <FileText className="w-5 h-5 text-ksd-orange" />
                            </div>
                            <div>
                              <p className="font-medium">{quote.service}</p>
                              <p className="text-sm text-foreground-secondary">
                                {new Date(quote.createdAt).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground-secondary">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune demande de devis</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
