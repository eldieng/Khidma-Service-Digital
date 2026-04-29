# Khidma Service Digital

![KSD Logo](public/logo.png)

Site web vitrine moderne pour **Khidma Service Digital**, une agence digitale basée au Sénégal spécialisée dans la communication digitale, le développement web, le design graphique et l'automatisation.

## 🚀 Fonctionnalités

- **Site vitrine** : Présentation des services, réalisations et articles de blog
- **Demande de devis** : Formulaire de demande de devis en ligne
- **Back-office** : Administration complète du contenu (services, projets, articles)
- **Authentification** : Système de connexion/inscription utilisateur
- **Mode sombre/clair** : Thème adaptatif
- **Responsive** : Design optimisé pour tous les appareils

## 🛠️ Stack Technique

| Technologie | Description |
|-------------|-------------|
| **Next.js 14** | Framework React avec App Router |
| **TypeScript** | Typage statique |
| **TailwindCSS** | Styling utilitaire |
| **Prisma** | ORM pour PostgreSQL |
| **shadcn/ui** | Composants UI |
| **Framer Motion** | Animations |

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/eldieng/Khidma-Service-Digital.git
cd Khidma-Service-Digital

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Générer le client Prisma
npx prisma generate

# Lancer les migrations
npx prisma migrate dev

# Seed de la base de données (optionnel)
npx prisma db seed

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔧 Variables d'Environnement

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ksd"
AUTH_SECRET="votre_secret_de_32_caracteres_minimum"
```

## 📁 Structure du Projet

```
src/
├── app/                    # Pages et routes (App Router)
│   ├── admin/             # Back-office administration
│   ├── api/               # Routes API REST
│   └── [pages]/           # Pages publiques
├── components/            # Composants React réutilisables
│   ├── layout/           # Header, Footer
│   ├── sections/         # Sections de pages
│   └── ui/               # Composants UI (shadcn)
├── lib/                   # Utilitaires et configurations
└── styles/               # Styles globaux
```

## 🌐 Pages Principales

- `/` - Accueil
- `/a-propos` - À propos de l'entreprise
- `/services` - Liste des services
- `/realisations` - Portfolio des projets
- `/blog` - Articles et actualités
- `/contact` - Formulaire de contact
- `/demande-devis` - Demande de devis
- `/admin` - Back-office (authentification requise)

## 👤 Auteur

**El Hadji Dieng**

- 🌐 Website : [https://elhadji-dieng.com](https://elhadji-dieng.com)
- 📧 Email : [el.elhadji.dieng@gmail.com](mailto:el.elhadji.dieng@gmail.com)
-  Téléphone : +221 77 454 86 61
- 📍 Localisation : Dakar, Parcelle Assainie U8, Sénégal

## 🏢 Client

**Khidma Service Digital**

- 🌐 Website : [www.khidmaservice.com](https://www.khidmaservice.com)
- 📧 Email : contact@khidmaservice.com
- 📍 Bureaux : Dakar & Louga, Sénégal

## 📄 Licence

Ce projet est sous licence privée. Tous droits réservés © 2026 Khidma Service Digital.
