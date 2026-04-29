"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ksd-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ksd-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ksd-blue to-ksd-orange">
              transformer
            </span>{" "}
            votre business ?
          </h2>
          <p className="text-foreground-secondary text-lg mb-10 max-w-2xl mx-auto">
            Discutons de votre projet et découvrez comment KSD peut vous aider à
            atteindre vos objectifs digitaux.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="group">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="group">
                <MessageCircle className="w-5 h-5" />
                Discuter sur WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
