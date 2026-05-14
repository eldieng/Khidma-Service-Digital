import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Communication Digitale", href: "/services/communication-digitale" },
    { name: "Développement Web & Design", href: "/services/developpement-web" },
    { name: "Web Design", href: "/services/web-design" },
    { name: "Bureautique & Automatisation", href: "/services/bureautique-automatisation" },
  ],
  company: [
    { name: "À propos", href: "/a-propos" },
    { name: "Réalisations", href: "/realisations" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-confidentialite" },
    { name: "CGU", href: "/cgu" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/khidmaservicedigital/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/khidmaservice" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/khidma-service-digital" },
];

export function Footer() {
  return (
    <footer className="bg-ksd-blue-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo_khidma_services.png"
                alt="KSD - Khidma Service Digital"
                width={120}
                height={120}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Khidma Service Digital - Votre partenaire pour une transformation
              digitale réussie au Sénégal et en Afrique.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ksd-orange transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-ksd-orange transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-ksd-orange transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ksd-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Dakar & Louga, Sénégal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-ksd-orange flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="tel:+221774548661" className="hover:text-ksd-orange transition-colors block">
                    (+221) 77 454 86 61
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-ksd-orange flex-shrink-0" />
                <a
                  href="mailto:contact@khidmaservice.com"
                  className="text-gray-300 hover:text-ksd-orange transition-colors text-sm"
                >
                  contact@khidmaservice.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Khidma Service Digital. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-ksd-orange transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
