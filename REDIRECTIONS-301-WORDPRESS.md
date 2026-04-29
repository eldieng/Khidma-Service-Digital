# Matrice Redirections 301 WordPress -> Next.js

## Pages principales
- `/a-propos/` -> `/a-propos`
- `/service/` -> `/services`
- `/realisations/` -> `/realisations`
- `/contact/` -> `/contact`
- `/blog/` -> `/blog`
- `/faq/` -> `/faq`

## Services (categories)
- `/service/communication-digitale/` -> `/services/communication-digitale`
- `/service/developpement-web-web-design/` -> `/services/developpement-web`
- `/service/impression-papeterie/` -> `/services`
- `/service/bureautique-automatisation/` -> `/services/bureautique-automatisation`

## Portfolio WordPress (`/portfolios/*`)
- `/portfolios/aruo-service/` -> `/realisations/aruo-service`
- `/portfolios/elite-science/` -> `/realisations/elite-science`
- `/portfolios/securite-co/` -> `/realisations/securite-co`
- `/portfolios/murid-pro/` -> `/realisations/murid-pro`
- `/portfolios/diapale-pos/` -> `/realisations/diapale-pos`
- `/portfolios/african-west-technology/` -> `/realisations/african-west-technology`
- `/portfolios/gestion-des-taches/` -> `/realisations/gestion-taches`
- `/portfolios/wadude-wireless/` -> `/realisations/wadude-wireless`
- `/portfolios/gestion-des-pharmacies/` -> `/realisations/gestion-pharmacies`
- `/portfolios/gestion-des-budgets/` -> `/realisations/gestion-budgets`
- `/portfolios/bibliotheque-en-ligne/` -> `/realisations/bibliotheque-ligne`
- `/portfolios/maquette-new-horizon-hotel/` -> `/realisations/maquette-new-horizon`
- `/portfolios/maquette-khidma-service-digital/` -> `/realisations/maquette-ksd`
- `/portfolios/maquette-initiation-wordpress/` -> `/realisations/maquette-wordpress`

## Blog legacy
- `/10-top-machine-learning-platforms-in-2023/` -> `/blog/10-top-machine-learning-platforms`
- `/how-do-you-become-a-graphic-designer/` -> `/blog/how-do-you-become-a-graphic-designer`
- `/simple-guidance-for-you-in-web-development/` -> `/blog/simple-guidance-for-web-development`
- `/dozit-app-development-complete-guide/` -> `/blog/app-development-complete-guide`
- `/tips-to-help-you-build-your-social-media/` -> `/blog/tips-to-build-your-social-media`

## Legacy patterns a traiter
- `/?p=:id` -> page cible selon export WordPress
- `/category/:slug` -> `/blog` (ou page categorie dediee)
- `/tag/:slug` -> `/blog` (ou page tag dediee)
- `/author/:slug` -> `/blog` (ou page auteur dediee)

## Notes
- Cette matrice doit etre completee puis injectee dans `next.config.ts`.
- Verifier chaque destination par test HTTP (301) avant go-live.
