"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Building, FileText, Calendar, DollarSign, Send, CheckCircle, Sparkles, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceData {
  id: string;
  title: string;
}

const budgets = [
  "Moins de 100 000 FCFA",
  "100 000 - 300 000 FCFA",
  "300 000 - 500 000 FCFA",
  "500 000 - 1 000 000 FCFA",
  "Plus de 1 000 000 FCFA",
  "À définir",
];

const features = [
  { icon: Clock, title: "Réponse sous 24h", description: "Notre équipe vous répond rapidement" },
  { icon: Shield, title: "Devis gratuit", description: "Sans engagement de votre part" },
  { icon: Zap, title: "Sur mesure", description: "Solutions adaptées à vos besoins" },
];

export default function QuoteRequestPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<ServiceData[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    deadline: "",
    description: "",
  });

  useEffect(() => {
    // Charger les services depuis l'API
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();

    // Pré-remplir si l'utilisateur est connecté
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        company: userData.company || "",
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).id : null;

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'envoi");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Demande envoyée !</h1>
            <p className="text-foreground-secondary mb-8">
              Merci pour votre demande de devis. Notre équipe vous contactera dans les plus brefs délais.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Retour à l&apos;accueil
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-ksd-orange/10 text-ksd-orange rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Devis Gratuit
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Demandez votre <span className="text-ksd-orange">devis personnalisé</span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Décrivez votre projet et recevez une proposition sur mesure sous 24h. Notre équipe est prête à vous accompagner.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-background-secondary rounded-2xl border border-border"
              >
                <div className="w-10 h-10 rounded-xl bg-ksd-orange/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-ksd-orange" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-foreground-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background-secondary rounded-3xl p-8 shadow-xl border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom complet *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                    <input
                      type="tel"
                      required
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service souhaité *</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget estimé</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">Sélectionnez un budget</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Délai souhaité</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all"
                      placeholder="Ex: 2 semaines, 1 mois..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description du projet *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-ksd-orange focus:border-transparent transition-all resize-none"
                  placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, références..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Envoi en cours..." : "Envoyer ma demande"}
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
