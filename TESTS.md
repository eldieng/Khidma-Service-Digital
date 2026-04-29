# Guide de Tests - KSD Website

## 1. Tests Responsive

### Breakpoints à tester
- **Mobile** : 320px, 375px, 414px
- **Tablet** : 768px, 1024px
- **Desktop** : 1280px, 1440px, 1920px

### Pages à vérifier
- [ ] Accueil (/)
- [ ] À propos (/a-propos)
- [ ] Services (/services)
- [ ] Service détail (/services/developpement-web)
- [ ] Réalisations (/realisations)
- [ ] Projet détail (/realisations/aruo-service)
- [ ] Blog (/blog)
- [ ] Article détail (/blog/10-top-machine-learning-platforms)
- [ ] FAQ (/faq)
- [ ] Contact (/contact)
- [ ] Mentions légales (/mentions-legales)
- [ ] Page 404

### Éléments à vérifier
- [ ] Navigation mobile (hamburger menu)
- [ ] Images responsive
- [ ] Textes lisibles
- [ ] Boutons accessibles (min 44x44px)
- [ ] Formulaires utilisables
- [ ] Scroll horizontal (ne doit pas exister)

---

## 2. Tests Cross-Browser

### Navigateurs à tester
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)
- [ ] Safari iOS
- [ ] Chrome Android

### Fonctionnalités à vérifier
- [ ] Animations Framer Motion
- [ ] Dark mode toggle
- [ ] Formulaires
- [ ] Images (lazy loading)
- [ ] Fonts (Geist)
- [ ] Gradients CSS
- [ ] Backdrop blur

---

## 3. Tests d'Accessibilité (WCAG 2.1)

### Niveau A (Obligatoire)
- [ ] **1.1.1** Alt text sur toutes les images
- [ ] **1.3.1** Structure sémantique (headings, landmarks)
- [ ] **1.4.1** Couleur pas seul indicateur
- [ ] **2.1.1** Navigation clavier complète
- [ ] **2.4.1** Skip link fonctionnel
- [ ] **2.4.2** Titres de pages descriptifs
- [ ] **3.1.1** Langue de la page (lang="fr")
- [ ] **4.1.1** HTML valide

### Niveau AA (Recommandé)
- [ ] **1.4.3** Contraste minimum 4.5:1 (texte)
- [ ] **1.4.4** Redimensionnement texte 200%
- [ ] **2.4.6** Headings descriptifs
- [ ] **2.4.7** Focus visible

### Outils de test
```bash
# Lighthouse (Chrome DevTools)
# axe DevTools (extension)
# WAVE (extension)
# Contrast Checker
```

---

## 4. Tests de Performance

### Métriques cibles (Lighthouse)
- **Performance** : > 90
- **Accessibility** : > 90
- **Best Practices** : > 90
- **SEO** : > 90

### Core Web Vitals
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

### Commandes de test
```bash
# Build de production
npm run build

# Analyse du bundle
npm run build && npx @next/bundle-analyzer

# Lighthouse CLI
npx lighthouse http://localhost:3000 --view
```

---

## 5. Tests Fonctionnels

### Navigation
- [ ] Tous les liens fonctionnent
- [ ] Logo redirige vers l'accueil
- [ ] Menu mobile s'ouvre/ferme
- [ ] Dark mode toggle fonctionne
- [ ] Scroll smooth

### Formulaires
- [ ] Validation côté client
- [ ] Messages d'erreur clairs
- [ ] Message de succès après envoi
- [ ] Champs required fonctionnent

### Interactions
- [ ] Bouton WhatsApp flottant
- [ ] FAQ accordéon
- [ ] Filtres portfolio
- [ ] Partage social (blog)
- [ ] Animations au scroll

---

## 6. Tests SEO

### Vérifications
- [ ] Balises title uniques par page
- [ ] Meta descriptions présentes
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Sitemap.xml accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)
- [ ] Canonical URLs
- [ ] Données structurées (JSON-LD)

### Outils
```bash
# Google Search Console
# Google Rich Results Test
# Facebook Sharing Debugger
# Twitter Card Validator
```

---

## 7. Checklist Pré-Déploiement

- [ ] Variables d'environnement configurées
- [ ] Images optimisées
- [ ] Console sans erreurs
- [ ] Formulaires testés
- [ ] Analytics configuré
- [ ] Favicon présent
- [ ] 404 page personnalisée
- [ ] HTTPS activé
- [ ] Redirections configurées

---

## Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview production
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```
