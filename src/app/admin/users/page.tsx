"use client";

import { useEffect, useState } from "react";
import { User, Shield, ShieldCheck, Trash2, Eye, Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  company: string | null;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  _count: {
    quoteRequests: number;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleUserStatus(id: string, isActive: boolean) {
    try {
      await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function toggleUserRole(id: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Utilisateurs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez les utilisateurs inscrits sur le site
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {users.length} utilisateur{users.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Aucun utilisateur trouvé</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Utilisateur</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Devis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ksd-orange/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-ksd-orange" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.company || "Particulier"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800 dark:text-white">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone || "-"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserRole(user.id, user.role)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Shield className="w-3.5 h-3.5" />
                      )}
                      {user.role === "admin" ? "Admin" : "Utilisateur"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user._count.quoteRequests} demande{user._count.quoteRequests > 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        user.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200"
                      }`}
                    >
                      {user.isActive ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Ban className="w-3.5 h-3.5" />
                      )}
                      {user.isActive ? "Actif" : "Inactif"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
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
