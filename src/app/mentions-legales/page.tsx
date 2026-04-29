import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site Khidma Service Digital (KSD).",
};

export default function MentionsLegalesPage() {
  return (
    <section className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Éditeur du site</h2>
              <p className="text-foreground-secondary">
                Le site <strong>khidmaservices.com</strong> est édité par :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li><strong>Raison sociale :</strong> Khidma Service Digital (KSD)</li>
                <li><strong>Forme juridique :</strong> Entreprise individuelle</li>
                <li><strong>Siège social :</strong> Dakar, Sénégal</li>
                <li><strong>Email :</strong> contact@khidmaservice.com</li>
                <li><strong>Téléphone :</strong> (+221) 77 454 86 61</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Directeur de la publication</h2>
              <p className="text-foreground-secondary">
                Le directeur de la publication est le représentant légal de Khidma Service Digital.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Hébergement</h2>
              <p className="text-foreground-secondary">
                Le site est hébergé par :
              </p>
              <ul className="list-disc pl-6 text-foreground-secondary space-y-2">
                <li><strong>Hébergeur :</strong> Vercel Inc.</li>
                <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                <li><strong>Site web :</strong> vercel.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
              <p className="text-foreground-secondary">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) 
                est la propriété exclusive de Khidma Service Digital ou de ses partenaires. 
                Toute reproduction, représentation, modification, publication, adaptation de tout 
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
                est interdite, sauf autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation de responsabilité</h2>
              <p className="text-foreground-secondary">
                Khidma Service Digital s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise 
                à jour des informations diffusées sur ce site. Toutefois, KSD ne peut garantir 
                l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition 
                sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Liens hypertextes</h2>
              <p className="text-foreground-secondary">
                Le site peut contenir des liens vers d&apos;autres sites. Khidma Service Digital 
                n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant 
                à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Droit applicable</h2>
              <p className="text-foreground-secondary">
                Les présentes mentions légales sont régies par le droit sénégalais. 
                En cas de litige, les tribunaux sénégalais seront seuls compétents.
              </p>
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
