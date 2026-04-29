"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <span className="text-[150px] sm:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
              404
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Page introuvable
            </h1>
            <p className="text-foreground-secondary text-lg mb-8">
              Oups ! La page que vous recherchez n&apos;existe pas ou a été déplacée.
              Pas de panique, nous allons vous aider à retrouver votre chemin.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" className="group w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Retour à l&apos;accueil
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Page précédente
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-foreground-secondary mb-4">
              Vous cherchez peut-être :
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="px-4 py-2 bg-background-secondary rounded-full text-sm font-medium hover:bg-ksd-orange hover:text-white transition-all"
              >
                Nos services
              </Link>
              <Link
                href="/realisations"
                className="px-4 py-2 bg-background-secondary rounded-full text-sm font-medium hover:bg-ksd-orange hover:text-white transition-all"
              >
                Nos réalisations
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-background-secondary rounded-full text-sm font-medium hover:bg-ksd-orange hover:text-white transition-all"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="px-4 py-2 bg-background-secondary rounded-full text-sm font-medium hover:bg-ksd-orange hover:text-white transition-all"
              >
                FAQ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
