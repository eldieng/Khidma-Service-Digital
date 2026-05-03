"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "KSD a transformé notre présence en ligne. Leur équipe est professionnelle, créative et toujours à l'écoute. Notre site web a généré 3x plus de leads depuis la refonte.",
    author: "Amadou Diallo",
    role: "CEO, TechStart Sénégal",
    avatar: "AD",
  },
  {
    content:
      "Une collaboration exceptionnelle ! L'équipe KSD a su comprendre nos besoins et livrer un projet qui dépasse nos attentes. Je recommande vivement.",
    author: "Fatou Ndiaye",
    role: "Directrice Marketing, ModaAfrik",
    avatar: "FN",
  },
  {
    content:
      "Grâce à KSD, notre stratégie social media a pris une nouvelle dimension. Engagement multiplié par 5 et une communauté fidèle qui grandit chaque jour.",
    author: "Ibrahima Sow",
    role: "Fondateur, GreenFood Dakar",
    avatar: "IS",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-ksd-blue dark:bg-ksd-blue-dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-2"
        >
          <span className="text-ksd-orange font-semibold text-sm uppercase tracking-wider">
            Témoignages
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-white">
            Ce que disent nos{" "}
            <span className="text-ksd-orange">clients</span>
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-ksd-orange mb-4 sm:mb-6" />

              {/* Content */}
              <p className="text-base sm:text-xl md:text-2xl text-white leading-relaxed mb-6 sm:mb-8">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-ksd-orange flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-base sm:text-lg">
                    {testimonials[current].author}
                  </div>
                  <div className="text-white/70 text-xs sm:text-sm">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === current
                      ? "bg-ksd-orange w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
