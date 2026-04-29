import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de Khidma Service Digital.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-foreground-secondary">
                Khidma Service Digital (KSD) s&apos;engage à protéger la vie privée des utilisateurs 
                de son site web. Cette politique de confidentialité explique comment nous collectons, 
                utilisons et protégeons vos données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Données collectées</h2>
              <p className="text-foreground-secondary">
                Nous pouvons collecter les informations suivantes :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Informations relatives à votre projet</li>
                <li>Données de navigation (cookies, adresse IP)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Utilisation des données</h2>
              <p className="text-foreground-secondary">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li>Répondre à vos demandes de contact ou de devis</li>
                <li>Vous fournir nos services</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Vous envoyer des informations commerciales (avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Protection des données</h2>
              <p className="text-foreground-secondary">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger 
                vos données personnelles contre tout accès non autorisé, modification, 
                divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
              <p className="text-foreground-secondary">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines 
                fonctionnalités du site pourraient ne pas fonctionner correctement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Partage des données</h2>
              <p className="text-foreground-secondary">
                Nous ne vendons, n&apos;échangeons ni ne louons vos données personnelles à des tiers. 
                Nous pouvons partager vos informations avec des prestataires de services de confiance 
                qui nous aident à exploiter notre site web et à mener nos activités.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Vos droits</h2>
              <p className="text-foreground-secondary">
                Vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li>Droit d&apos;accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d&apos;opposition</li>
              </ul>
              <p className="text-foreground-secondary mt-4">
                Pour exercer ces droits, contactez-nous à : contact@khidmaservice.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Conservation des données</h2>
              <p className="text-foreground-secondary">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour 
                les finalités pour lesquelles elles ont été collectées, ou conformément aux 
                exigences légales applicables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
              <p className="text-foreground-secondary">
                Pour toute question concernant cette politique de confidentialité, 
                vous pouvez nous contacter :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li><strong>Email :</strong> contact@khidmaservice.com</li>
                <li><strong>Téléphone :</strong> (+221) 77 454 86 61</li>
              </ul>
            </section>

            <p className="text-foreground-secondary text-sm mt-8">
              Dernière mise à jour : Février 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
