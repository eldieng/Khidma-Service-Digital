"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Qu'est-ce que Khidma Service Digital ?",
    answer:
      "Khidma Service Digital (KSD) est une entreprise spécialisée dans la communication digitale, l'impression, la papeterie, le développement web et la bureautique. Nous aidons les entreprises et entrepreneurs à améliorer leur visibilité et à optimiser leur présence en ligne.",
  },
  {
    question: "Quels services proposez-vous ?",
    answer:
      "Nous proposons plusieurs services classés en différentes catégories :\n\n• Communication Digitale : Gestion des réseaux sociaux, création de contenu, publicité en ligne.\n• Impression & Papeterie : Cartes de visite, flyers, affiches, impressions personnalisées.\n• Développement Web & Web Design : Création de sites vitrines, e-commerce, intégration web.\n• Bureautique & Solutions Numériques : Automatisation de documents, gestion administrative, facturation.",
  },
  {
    question: "À qui s'adressent vos services ?",
    answer:
      "Nos services sont destinés aux startups, PME, grandes entreprises et entrepreneurs souhaitant booster leur communication et digitaliser leurs activités.",
  },
  {
    question: "Quels sont les délais de réalisation ?",
    answer:
      "Les délais varient en fonction du service choisi et de la complexité du projet. Une estimation est donnée après étude de votre besoin. Nous nous engageons à respecter les délais convenus.",
  },
  {
    question: "Bénéficie-t-on d'un suivi personnalisé ?",
    answer:
      "Oui, chaque projet bénéficie d'un suivi dédié pour garantir des solutions adaptées à vos attentes. Un chef de projet vous accompagne tout au long de la réalisation.",
  },
  {
    question: "Comment obtenir un devis ?",
    answer:
      "Vous pouvez nous contacter via notre site web, nos réseaux sociaux ou directement par e-mail pour obtenir un devis personnalisé. Nous répondons généralement sous 24h.",
  },
  {
    question: "Proposez-vous un support après livraison ?",
    answer:
      "Oui, nous assurons un suivi et une assistance technique pour garantir la satisfaction de nos clients. Nous proposons également des contrats de maintenance pour les sites web.",
  },
  {
    question: "Comment êtes-vous informés de l'avancement du projet ?",
    answer:
      "Nous tenons nos clients informés à chaque étape du projet via e-mails, appels ou rendez-vous. Vous avez une visibilité complète sur l'avancement de votre projet.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left bg-background hover:bg-background-secondary transition-colors"
      >
        <span className="font-semibold text-lg pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-ksd-orange flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-foreground-secondary whitespace-pre-line">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Questions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
                Fréquentes
              </span>
            </h1>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
              Retrouvez les réponses aux questions les plus fréquemment posées
              sur nos services et notre fonctionnement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FAQItem
                    faq={faq}
                    isOpen={openIndex === index}
                    onToggle={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <HelpCircle className="w-16 h-16 text-ksd-orange mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Vous avez d&apos;autres questions ?
            </h2>
            <p className="text-foreground-secondary mb-8">
              Notre équipe est disponible pour répondre à toutes vos questions.
              N&apos;hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Nous contacter
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/221773675214"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline">
                  Discuter sur WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
