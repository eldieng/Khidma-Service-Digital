import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run prisma seed.");
}
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================
  // SERVICES
  // ============================================
  const services = [
    {
      slug: "communication-digitale",
      title: "Communication Digitale",
      description: "Maximisez votre visibilité et engagez efficacement votre audience.",
      longDescription: "Dans un monde hyperconnecté, une présence digitale impactante est essentielle. Chez KSD, nous vous accompagnons dans la gestion de votre image de marque en ligne, la création de contenus engageants et l'optimisation de votre communication sur les différents canaux numériques.",
      icon: "📢",
      color: "from-orange-500 to-red-500",
      image: "/images/social-media-marketing-concept-marketing-with-applications-3-scaled.jpg",
      order: 1,
      benefits: [
        "Augmentation de votre visibilité en ligne",
        "Engagement accru de votre communauté",
        "Génération de leads qualifiés",
        "Renforcement de votre image de marque",
        "Analyse et reporting détaillés",
      ],
      subServices: [
        { name: "Création de Contenu", description: "Visuels, vidéos, articles et infographies pour vos réseaux" },
        { name: "Gestion des Réseaux Sociaux", description: "Community management et animation de vos pages" },
        { name: "Stratégie Digitale", description: "Plan de communication adapté à vos objectifs" },
        { name: "Publicité en Ligne", description: "Campagnes Facebook Ads, Google Ads, Instagram" },
      ],
      processSteps: [
        { step: 1, title: "Audit", description: "Analyse de votre présence digitale actuelle" },
        { step: 2, title: "Stratégie", description: "Définition des objectifs et du plan d'action" },
        { step: 3, title: "Création", description: "Production de contenus engageants" },
        { step: 4, title: "Diffusion", description: "Publication et promotion sur les canaux" },
        { step: 5, title: "Optimisation", description: "Analyse des résultats et ajustements" },
      ],
    },
    {
      slug: "developpement-web",
      title: "Développement Web",
      description: "Des sites modernes, performants et adaptés à vos besoins.",
      longDescription: "Nous concevons des sites web professionnels qui allient esthétique et performance. Que ce soit pour un site vitrine, une boutique en ligne ou une plateforme sur-mesure, nous mettons en place des solutions adaptées à votre activité.",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      image: "/images/person-working-html-computer-scaled.jpg",
      order: 2,
      benefits: [
        "Site responsive adapté à tous les écrans",
        "Code propre et maintenable",
        "Optimisation SEO intégrée",
        "Performance et rapidité de chargement",
        "Sécurité et maintenance incluses",
      ],
      subServices: [
        { name: "Création de Sites Vitrines", description: "Sites professionnels pour présenter votre activité" },
        { name: "Sites E-commerce", description: "Boutiques en ligne avec paiement sécurisé" },
        { name: "Applications Web", description: "Plateformes sur-mesure et outils métier" },
        { name: "Refonte & Maintenance", description: "Modernisation et suivi de votre site" },
        { name: "Optimisation SEO", description: "Référencement naturel pour plus de visibilité" },
        { name: "Hébergement & Sécurité", description: "Solutions d'hébergement fiables et sécurisées" },
      ],
      processSteps: [
        { step: 1, title: "Brief", description: "Compréhension de vos besoins et objectifs" },
        { step: 2, title: "Conception", description: "Architecture et structure du site" },
        { step: 3, title: "Développement", description: "Intégration et programmation" },
        { step: 4, title: "Tests", description: "Vérification qualité et compatibilité" },
        { step: 5, title: "Lancement", description: "Mise en ligne et formation" },
      ],
    },
    {
      slug: "web-design",
      title: "Web Design",
      description: "Des designs créatifs et une identité visuelle unique.",
      longDescription: "Nous créons des designs modernes et attractifs qui reflètent l'identité de votre marque. De la conception de logos à la création de chartes graphiques complètes, nous donnons vie à votre vision.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      image: "/images/colorful-illustration-camera-with-picture-camera-it.jpg",
      order: 3,
      benefits: [
        "Design moderne et professionnel",
        "Identité visuelle cohérente",
        "Interfaces utilisateur intuitives",
        "Expérience utilisateur optimisée",
        "Fichiers sources fournis",
      ],
      subServices: [
        { name: "UI/UX Design", description: "Interfaces utilisateur intuitives et attractives" },
        { name: "Création de Logo", description: "Logos uniques et mémorables" },
        { name: "Charte Graphique", description: "Identité visuelle complète pour votre marque" },
        { name: "Maquettes Web", description: "Prototypes visuels de vos projets" },
        { name: "Design Réseaux Sociaux", description: "Visuels pour vos publications et bannières" },
      ],
      processSteps: [
        { step: 1, title: "Brief", description: "Compréhension de votre vision et objectifs" },
        { step: 2, title: "Recherche", description: "Analyse des tendances et de la concurrence" },
        { step: 3, title: "Création", description: "Conception des maquettes et visuels" },
        { step: 4, title: "Révisions", description: "Ajustements selon vos retours" },
        { step: 5, title: "Livraison", description: "Remise des fichiers finaux" },
      ],
    },
    {
      slug: "bureautique-automatisation",
      title: "Bureautique & Automatisation",
      description: "Optimisez votre gestion et gagnez du temps.",
      longDescription: "Nous développons des outils sur-mesure pour automatiser vos processus, simplifier votre gestion administrative et améliorer votre productivité.",
      icon: "📊",
      color: "from-green-500 to-emerald-500",
      image: "/images/digital-finance-business-models-using-data-analytics-technology-graph-perceptive-insights-scaled.jpg",
      order: 4,
      benefits: [
        "Gain de temps considérable",
        "Réduction des erreurs manuelles",
        "Meilleure organisation",
        "Suivi en temps réel",
        "Formation incluse",
      ],
      subServices: [
        { name: "Facturation et Documents Automatisés", description: "Génération automatique de factures, devis, rapports" },
        { name: "Formation en Bureautique", description: "Excel, Word, PowerPoint, Google Workspace" },
        { name: "Outils Collaboratifs", description: "Solutions de travail en équipe et partage de documents" },
      ],
      processSteps: [
        { step: 1, title: "Analyse", description: "Étude de vos processus actuels" },
        { step: 2, title: "Solution", description: "Proposition d'outils adaptés" },
        { step: 3, title: "Développement", description: "Création de vos solutions" },
        { step: 4, title: "Déploiement", description: "Installation et configuration" },
        { step: 5, title: "Formation", description: "Accompagnement de vos équipes" },
      ],
    },
  ];

  for (const serviceData of services) {
    const { benefits, subServices, processSteps, ...service } = serviceData;
    
    const createdService = await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });

    // Delete existing related data
    await prisma.serviceBenefit.deleteMany({ where: { serviceId: createdService.id } });
    await prisma.subService.deleteMany({ where: { serviceId: createdService.id } });
    await prisma.processStep.deleteMany({ where: { serviceId: createdService.id } });

    // Create benefits
    for (let i = 0; i < benefits.length; i++) {
      await prisma.serviceBenefit.create({
        data: { text: benefits[i], order: i, serviceId: createdService.id },
      });
    }

    // Create sub-services
    for (let i = 0; i < subServices.length; i++) {
      await prisma.subService.create({
        data: { ...subServices[i], order: i, serviceId: createdService.id },
      });
    }

    // Create process steps
    for (const step of processSteps) {
      await prisma.processStep.create({
        data: { ...step, serviceId: createdService.id },
      });
    }

    console.log(`✅ Service: ${service.title}`);
  }

  // ============================================
  // PROJECTS
  // ============================================
  const projects = [
    {
      slug: "aruo-service",
      title: "Aruo Service",
      category: "Développement Web",
      description: "Site web professionnel pour une entreprise de services.",
      fullDescription: "Conception et développement d'un site web moderne et responsive pour Aruo Service, une entreprise spécialisée dans les services aux professionnels.",
      client: "Aruo Service",
      date: "Janvier 2025",
      image: "/images/programming-background-collage-scaled.jpg",
      order: 1,
      isFeatured: true,
      technologies: ["WordPress", "Elementor", "PHP", "MySQL"],
      challenges: ["Créer une identité visuelle moderne", "Optimiser le référencement naturel", "Assurer une navigation intuitive"],
      solutions: ["Design épuré avec une palette de couleurs professionnelle", "Structure SEO-friendly avec balises optimisées", "Architecture de navigation claire et accessible"],
      results: ["Augmentation de 150% du trafic organique", "Temps de chargement < 2 secondes", "Taux de conversion amélioré de 40%"],
    },
    {
      slug: "elite-science",
      title: "Elite Science",
      category: "Développement Web",
      description: "Plateforme éducative moderne et interactive.",
      fullDescription: "Développement d'une plateforme éducative complète permettant aux étudiants d'accéder à des ressources pédagogiques.",
      client: "Elite Science",
      date: "Décembre 2024",
      image: "/images/view-bookbag-school-classroom-scaled.jpg",
      order: 2,
      isFeatured: true,
      technologies: ["React", "Node.js", "MongoDB", "TailwindCSS"],
      challenges: ["Gérer un grand volume de contenus", "Créer un système de suivi des progrès", "Assurer la sécurité des données"],
      solutions: ["Architecture scalable avec MongoDB", "Dashboard personnalisé pour chaque utilisateur", "Authentification sécurisée et chiffrement"],
      results: ["Plus de 500 utilisateurs actifs", "Note de satisfaction de 4.8/5", "Réduction de 60% du temps administratif"],
    },
    {
      slug: "diapale-pos",
      title: "Diapalé POS",
      category: "Développement Web",
      description: "Système de point de vente moderne.",
      fullDescription: "Création d'un système de point de vente (POS) complet et intuitif pour les commerces.",
      client: "Diapalé",
      date: "Novembre 2024",
      image: "/images/blue-shirt-client-hold-credit-card-point-laptop-brown-shirt-user-cybercash-scaled.jpg",
      order: 3,
      isFeatured: false,
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      challenges: ["Interface rapide et intuitive", "Synchronisation en temps réel", "Intégration des paiements"],
      solutions: ["UI optimisée pour écrans tactiles", "WebSocket pour mises à jour instantanées", "Intégration Stripe sécurisée"],
      results: ["Traitement de 1000+ transactions/jour", "Temps de formation réduit à 30 minutes", "Zéro erreur de caisse"],
    },
  ];

  for (const projectData of projects) {
    const { technologies, challenges, solutions, results, ...project } = projectData;
    
    const createdProject = await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });

    // Delete existing related data
    await prisma.projectTechnology.deleteMany({ where: { projectId: createdProject.id } });
    await prisma.projectChallenge.deleteMany({ where: { projectId: createdProject.id } });
    await prisma.projectSolution.deleteMany({ where: { projectId: createdProject.id } });
    await prisma.projectResult.deleteMany({ where: { projectId: createdProject.id } });

    // Create technologies
    for (let i = 0; i < technologies.length; i++) {
      await prisma.projectTechnology.create({
        data: { name: technologies[i], order: i, projectId: createdProject.id },
      });
    }

    // Create challenges
    for (let i = 0; i < challenges.length; i++) {
      await prisma.projectChallenge.create({
        data: { text: challenges[i], order: i, projectId: createdProject.id },
      });
    }

    // Create solutions
    for (let i = 0; i < solutions.length; i++) {
      await prisma.projectSolution.create({
        data: { text: solutions[i], order: i, projectId: createdProject.id },
      });
    }

    // Create results
    for (let i = 0; i < results.length; i++) {
      await prisma.projectResult.create({
        data: { text: results[i], order: i, projectId: createdProject.id },
      });
    }

    console.log(`✅ Project: ${project.title}`);
  }

  // ============================================
  // ARTICLES
  // ============================================
  const articles = [
    {
      slug: "10-top-machine-learning-platforms",
      title: "Les 10 meilleures plateformes d'apprentissage automatique en 2025",
      excerpt: "Découvrez les plateformes de machine learning les plus performantes.",
      content: `L'apprentissage automatique (Machine Learning) est devenu un pilier essentiel de l'innovation technologique.

## 1. Google Cloud AI Platform
Google propose une suite complète d'outils pour le machine learning, incluant TensorFlow, AutoML et Vertex AI.

## 2. Amazon SageMaker
AWS SageMaker permet de construire, entraîner et déployer des modèles ML à grande échelle.

## 3. Microsoft Azure Machine Learning
Azure ML offre un environnement complet pour le développement de modèles.

## Conclusion
Le choix de la plateforme dépend de vos besoins spécifiques.`,
      image: "/images/3d-rendering-biorobots-concept-1-scaled.jpg",
      category: "Tech",
      author: "Équipe KSD",
      readTime: "8 min",
      isFeatured: true,
      publishedAt: new Date("2025-01-15"),
    },
    {
      slug: "how-do-you-become-a-graphic-designer",
      title: "Comment devient-on graphiste ?",
      excerpt: "Guide complet pour démarrer une carrière dans le design graphique.",
      content: `Le métier de graphiste attire de nombreux créatifs passionnés par le visuel et la communication.

## Les compétences essentielles
Un bon graphiste doit maîtriser plusieurs compétences : la théorie des couleurs, la typographie, la composition.

## Les formations disponibles
Plusieurs parcours sont possibles : écoles de design, formations universitaires en arts appliqués.

## Construire son portfolio
Votre portfolio est votre carte de visite. Incluez vos meilleurs travaux.`,
      image: "/images/colorful-illustration-camera-with-picture-camera-it.jpg",
      category: "Design",
      author: "Équipe KSD",
      readTime: "6 min",
      isFeatured: false,
      publishedAt: new Date("2025-01-10"),
    },
    {
      slug: "simple-guidance-for-web-development",
      title: "Des conseils simples pour le développement Web",
      excerpt: "Les meilleures pratiques pour réussir vos projets web.",
      content: `Le développement web est un domaine en constante évolution.

## 1. Adoptez le mobile-first
Commencez toujours par la version mobile de votre site.

## 2. Optimisez les performances
La vitesse de chargement est cruciale. Compressez vos images, minifiez votre code.

## 3. Pensez accessibilité
Votre site doit être accessible à tous.`,
      image: "/images/person-working-html-computer-scaled.jpg",
      category: "Développement",
      author: "Équipe KSD",
      readTime: "5 min",
      isFeatured: false,
      publishedAt: new Date("2025-01-05"),
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log(`✅ Article: ${article.title}`);
  }

  // ============================================
  // ADMIN USER
  // ============================================
  const bcrypt = await import("bcryptjs");
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("SEED_ADMIN_PASSWORD is required to seed the admin user.");
  }
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: "admin@khidmaservice.com" },
    update: {},
    create: {
      email: "admin@khidmaservice.com",
      password: hashedPassword,
      name: "Admin KSD",
      role: "admin",
      isActive: true,
      emailVerified: true,
    },
  });
  console.log("✅ Admin user created");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
