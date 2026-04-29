# Checklist Go-Live Refonte (WordPress -> Next.js)

## 1) Securite / Auth
- [ ] `AUTH_SECRET` configure (>= 32 caracteres) sur tous les environnements.
- [ ] `DATABASE_URL` configure sans fallback hardcode.
- [ ] `SEED_ADMIN_PASSWORD` configure pour les seeds.
- [ ] Routes admin/API sensibles protegees par auth serveur + role admin.
- [ ] Acces `/admin` bloque sans cookie HttpOnly valide.
- [ ] Rotation des mots de passe admin par defaut effectuee.

## 2) SEO Technique
- [ ] `robots.txt` valide (`/_next/` non bloque, `/admin` et `/api` bloques).
- [ ] `sitemap.xml` genere dynamiquement depuis les donnees reelles.
- [ ] Metadata par page (title, description, canonical, OG, Twitter).
- [ ] Canonical valide sur toutes les pages indexables.
- [ ] Pages 404 et 500/error configurees.

## 3) Migration WordPress
- [ ] Matrice 301 complete (pages, services, blog, portfolios, legacy patterns).
- [ ] Redirections configurees dans `next.config.ts`.
- [ ] Verification des slugs migrés (pas de doublons, pas de 404).
- [ ] Migration contenu (portfolio, blog, FAQ) relue et validee.
- [ ] Nettoyage des articles hors-cible/metier avant publication.

## 4) Perf / Qualite
- [ ] Rendu serveur/ISR sur pages SEO critiques (services, realisations, blog).
- [ ] Images presentes et verifiees (`public/` ou CDN).
- [ ] Build production OK (`npm run build`).
- [ ] Lint OK (`npm run lint`).
- [ ] Parcours critiques testes (devis, contact, login, admin CRUD).

## 5) Conformite / Tracking
- [ ] Analytics configure (GA4/Plausible/etc.).
- [ ] Bandeau consentement cookies en place.
- [ ] Pages legales a jour (mentions, politique, CGU).
- [ ] Adresses email/telephone verifies.

## 6) Go-Live et Post Go-Live
- [ ] Sauvegarde complete avant bascule DNS.
- [ ] Fenetre de bascule planifiee + rollback defini.
- [ ] Monitoring erreurs 48h post-deploiement.
- [ ] Audit Search Console (couverture, erreurs, sitemap).
- [ ] Verification des redirections les plus traffiquees.
