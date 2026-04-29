"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle, XCircle, Eye, Trash2, Mail, Phone } from "lucide-react";

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  budget: string | null;
  deadline: string | null;
  description: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock },
  in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: FileText },
  completed: { label: "Terminé", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
};

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      setQuotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchQuotes();
      if (selectedQuote?.id === id) {
        setSelectedQuote({ ...selectedQuote, status });
      }
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) return;

    try {
      await fetch(`/api/quotes/${id}`, { method: "DELETE" });
      fetchQuotes();
      if (selectedQuote?.id === id) {
        setSelectedQuote(null);
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Demandes de Devis</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez les demandes de devis reçues
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {quotes.filter(q => q.status === "pending").length} en attente
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste des demandes */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : quotes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Aucune demande de devis</div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {quotes.map((quote) => {
                const status = statusConfig[quote.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                
                return (
                  <div
                    key={quote.id}
                    onClick={() => setSelectedQuote(quote)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      selectedQuote?.id === quote.id ? "bg-ksd-orange/5 border-l-4 border-ksd-orange" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-800 dark:text-white truncate">{quote.name}</p>
                          {quote.user && (
                            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                              Inscrit
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{quote.service}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(quote.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Détails de la demande */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          {selectedQuote ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Détails</h2>
                <button
                  onClick={() => handleDelete(selectedQuote.id)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Client</p>
                  <p className="font-medium text-gray-800 dark:text-white">{selectedQuote.name}</p>
                  {selectedQuote.company && (
                    <p className="text-sm text-gray-500">{selectedQuote.company}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <a
                    href={`mailto:${selectedQuote.email}`}
                    className="flex items-center gap-2 text-sm text-ksd-orange hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedQuote.email}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${selectedQuote.phone}`}
                    className="flex items-center gap-2 text-sm text-ksd-orange hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedQuote.phone}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Service</p>
                  <p className="font-medium text-gray-800 dark:text-white">{selectedQuote.service}</p>
                </div>

                {selectedQuote.budget && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Budget</p>
                    <p className="font-medium text-gray-800 dark:text-white">{selectedQuote.budget}</p>
                  </div>
                )}

                {selectedQuote.deadline && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Délai</p>
                    <p className="font-medium text-gray-800 dark:text-white">{selectedQuote.deadline}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedQuote.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Statut</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(selectedQuote.id, key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedQuote.status === key
                            ? config.color
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Sélectionnez une demande pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
