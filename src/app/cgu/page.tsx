import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation du site Khidma Service Digital.",
};

export default function CGUPage() {
  return (
    <section className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Conditions Générales d&apos;Utilisation</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Objet</h2>
              <p className="text-foreground-secondary">
                Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour objet de définir 
                les modalités et conditions d&apos;utilisation du site web khidmaservices.com, 
                ainsi que les droits et obligations des utilisateurs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Acceptation des CGU</h2>
              <p className="text-foreground-secondary">
                L&apos;accès et l&apos;utilisation du site impliquent l&apos;acceptation pleine et entière 
                des présentes CGU. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas 
                utiliser ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Accès au site</h2>
              <p className="text-foreground-secondary">
                Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès 
                à Internet. Tous les coûts liés à l&apos;accès au site (matériel informatique, 
                connexion Internet, etc.) sont à la charge de l&apos;utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Services proposés</h2>
              <p className="text-foreground-secondary">
                Khidma Service Digital propose les services suivants :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li>Communication digitale et gestion des réseaux sociaux</li>
                <li>Développement web et web design</li>
                <li>Impression et papeterie</li>
                <li>Bureautique et automatisation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Propriété intellectuelle</h2>
              <p className="text-foreground-secondary">
                Tous les contenus présents sur le site (textes, images, logos, vidéos, etc.) 
                sont protégés par le droit de la propriété intellectuelle. Toute reproduction, 
                même partielle, est strictement interdite sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Responsabilité de l&apos;utilisateur</h2>
              <p className="text-foreground-secondary">
                L&apos;utilisateur s&apos;engage à :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li>Utiliser le site de manière légale et respectueuse</li>
                <li>Ne pas tenter de nuire au bon fonctionnement du site</li>
                <li>Fournir des informations exactes lors de l&apos;utilisation des formulaires</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Limitation de responsabilité</h2>
              <p className="text-foreground-secondary">
                Khidma Service Digital ne saurait être tenu responsable des dommages directs 
                ou indirects résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Modification des CGU</h2>
              <p className="text-foreground-secondary">
                Khidma Service Digital se réserve le droit de modifier les présentes CGU 
                à tout moment. Les utilisateurs seront informés de toute modification 
                par la mise à jour de cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Droit applicable</h2>
              <p className="text-foreground-secondary">
                Les présentes CGU sont régies par le droit sénégalais. Tout litige relatif 
                à l&apos;interprétation ou à l&apos;exécution des présentes sera soumis aux tribunaux 
                compétents du Sénégal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
              <p className="text-foreground-secondary">
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
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
