import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Core WordPress routes
      { source: "/a-propos/", destination: "/a-propos", permanent: true },
      { source: "/service/", destination: "/services", permanent: true },
      { source: "/realisations/", destination: "/realisations", permanent: true },
      { source: "/faq/", destination: "/faq", permanent: true },
      { source: "/contact/", destination: "/contact", permanent: true },
      { source: "/blog/", destination: "/blog", permanent: true },

      // Legacy service routes
      {
        source: "/service/developpement-web-web-design/",
        destination: "/services/developpement-web",
        permanent: true,
      },
      {
        source: "/service/communication-digitale/",
        destination: "/services/communication-digitale",
        permanent: true,
      },
      {
        source: "/service/bureautique-automatisation/",
        destination: "/services/bureautique-automatisation",
        permanent: true,
      },
      {
        source: "/service/impression-papeterie/",
        destination: "/services",
        permanent: true,
      },
      { source: "/services/impression-papeterie", destination: "/services/web-design", permanent: true },
      { source: "/services/design-graphique", destination: "/services/web-design", permanent: true },
      { source: "/services/bureautique", destination: "/services/bureautique-automatisation", permanent: true },

      // Portfolio legacy URLs
      { source: "/portfolios/aruo-service/", destination: "/realisations/aruo-service", permanent: true },
      { source: "/portfolios/elite-science/", destination: "/realisations/elite-science", permanent: true },
      { source: "/portfolios/securite-co/", destination: "/realisations/securite-co", permanent: true },
      { source: "/portfolios/murid-pro/", destination: "/realisations/murid-pro", permanent: true },
      { source: "/portfolios/diapale-pos/", destination: "/realisations/diapale-pos", permanent: true },
      {
        source: "/portfolios/african-west-technology/",
        destination: "/realisations/african-west-technology",
        permanent: true,
      },
      { source: "/portfolios/gestion-des-taches/", destination: "/realisations/gestion-taches", permanent: true },
      { source: "/portfolios/wadude-wireless/", destination: "/realisations/wadude-wireless", permanent: true },
      { source: "/portfolios/gestion-des-pharmacies/", destination: "/realisations/gestion-pharmacies", permanent: true },
      { source: "/portfolios/gestion-des-budgets/", destination: "/realisations/gestion-budgets", permanent: true },
      { source: "/portfolios/bibliotheque-en-ligne/", destination: "/realisations/bibliotheque-ligne", permanent: true },
      {
        source: "/portfolios/maquette-new-horizon-hotel/",
        destination: "/realisations/maquette-new-horizon",
        permanent: true,
      },
      {
        source: "/portfolios/maquette-khidma-service-digital/",
        destination: "/realisations/maquette-ksd",
        permanent: true,
      },
      {
        source: "/portfolios/maquette-initiation-wordpress/",
        destination: "/realisations/maquette-wordpress",
        permanent: true,
      },

      // Legacy blog URLs
      {
        source: "/10-top-machine-learning-platforms-in-2023/",
        destination: "/blog/10-top-machine-learning-platforms",
        permanent: true,
      },
      {
        source: "/how-do-you-become-a-graphic-designer/",
        destination: "/blog/how-do-you-become-a-graphic-designer",
        permanent: true,
      },
      {
        source: "/simple-guidance-for-you-in-web-development/",
        destination: "/blog/simple-guidance-for-web-development",
        permanent: true,
      },
      {
        source: "/dozit-app-development-complete-guide/",
        destination: "/blog/app-development-complete-guide",
        permanent: true,
      },
      {
        source: "/tips-to-help-you-build-your-social-media/",
        destination: "/blog/tips-to-build-your-social-media",
        permanent: true,
      },
      {
        source: "/necessity-may-give-us-best-virtual-court/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/top-crypto-exchange-influencers-in-china/",
        destination: "/blog",
        permanent: true,
      },

      // WordPress taxonomy/author routes
      { source: "/category/:slug*", destination: "/blog", permanent: true },
      { source: "/tag/:slug*", destination: "/blog", permanent: true },
      { source: "/author/:slug*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
