"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const contactInfo = [
  {
    location: "Dakar & Louga",
    address: "Sénégal",
    email: "contact@khidmaservice.com",
    phone: "(+221) 77 454 86 61",
    phoneHref: "+221774548661",
    color: "from-ksd-orange to-orange-600",
  },
];

const reasons = [
  { icon: Headphones, title: "Support réactif", description: "Réponse garantie sous 24h" },
  { icon: Globe, title: "Expertise locale", description: "Présents à Dakar et Louga" },
  { icon: CheckCircle, title: "Satisfaction client", description: "+100 projets réalisés" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: data.error });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Parlons de votre <span className="text-ksd-orange">projet</span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Vous avez une question, un projet ou besoin d&apos;un devis ? Notre équipe
              est à votre écoute et prête à vous accompagner dans votre transformation digitale.
            </p>
          </motion.div>

          {/* Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          >
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-ksd-orange/10 flex items-center justify-center shrink-0">
                  <reason.icon className="w-6 h-6 text-ksd-orange" />
                </div>
                <div>
                  <p className="font-semibold">{reason.title}</p>
                  <p className="text-sm text-foreground-secondary">{reason.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Bureaux */}
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden bg-background-secondary p-6 rounded-2xl border border-border group hover:border-ksd-orange/50 transition-all"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${info.color}`} />
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-ksd-orange/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-ksd-orange" />
                    </div>
                    {info.location}
                  </h3>
                  <p className="text-sm text-foreground-secondary mb-4">{info.address}</p>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${info.email}`}
                      className="flex items-center gap-3 text-foreground-secondary hover:text-ksd-orange transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {info.email}
                    </a>
                    <a
                      href={`tel:${info.phoneHref}`}
                      className="flex items-center gap-3 text-foreground-secondary hover:text-ksd-orange transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {info.phone}
                    </a>
                  </div>
                </div>
              ))}

              {/* Horaires */}
              <div className="bg-background-secondary p-6 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-ksd-orange" />
                  Horaires
                </h3>
                <div className="space-y-2 text-foreground-secondary">
                  <p>Lundi - Vendredi : 8h - 18h</p>
                  <p>Samedi : 9h - 14h</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/221774548661"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-green-500 hover:bg-green-600 transition-colors p-6 rounded-2xl text-white">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-8 h-8" />
                    <div>
                      <p className="font-bold">Discuter sur WhatsApp</p>
                      <p className="text-sm text-white/80">Réponse rapide garantie</p>
                    </div>
                  </div>
                </div>
              </a>

              {/* Réseaux sociaux */}
              <div className="bg-background-secondary p-6 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/khidmaservicedigital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-ksd-blue/10 flex items-center justify-center hover:bg-ksd-orange hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/khidmaservice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-ksd-blue/10 flex items-center justify-center hover:bg-ksd-orange hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/khidma-service-digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-ksd-blue/10 flex items-center justify-center hover:bg-ksd-orange hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-background-secondary p-8 rounded-3xl border border-border">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                {/* Status Message */}
                {submitStatus && (
                  <div
                    className={`p-4 rounded-xl mb-6 ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-ksd-orange focus:ring-1 focus:ring-ksd-orange outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-ksd-orange focus:ring-1 focus:ring-ksd-orange outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-ksd-orange focus:ring-1 focus:ring-ksd-orange outline-none transition-all"
                        placeholder="+221 77 000 00 00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Sujet *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-ksd-orange focus:ring-1 focus:ring-ksd-orange outline-none transition-all"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="devis">Demande de devis</option>
                        <option value="info">Demande d&apos;information</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-ksd-orange focus:ring-1 focus:ring-ksd-orange outline-none transition-all resize-none"
                      placeholder="Décrivez votre projet ou votre demande..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">Nos Bureaux</h2>
            <p className="text-foreground-secondary mt-2">
              Présents à Dakar et Louga pour mieux vous servir
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-2xl overflow-hidden border border-border h-[300px] flex items-center justify-center">
              <div className="text-center text-foreground-secondary">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-ksd-orange" />
                <p className="font-semibold">Bureau Dakar</p>
                <p className="text-sm">Sénégal</p>
              </div>
            </div>
            <div className="bg-background rounded-2xl overflow-hidden border border-border h-[300px] flex items-center justify-center">
              <div className="text-center text-foreground-secondary">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-ksd-orange" />
                <p className="font-semibold">Bureau Louga</p>
                <p className="text-sm">Sénégal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
