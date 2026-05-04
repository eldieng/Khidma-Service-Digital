import { Metadata } from "next";

const baseUrl = "https://khidmaservices.com";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/logo.png",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | KSD - Khidma Service Digital`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "KSD - Khidma Service Digital",
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${baseUrl}${image}`],
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "KSD - Khidma Service Digital | Agence Digitale au Sénégal",
    template: "%s | KSD - Agence Digitale Sénégal",
  },
  description:
    "Agence de communication digitale à Dakar et Louga. Création de sites web, applications, marketing digital, community management et design graphique pour entreprises au Sénégal et en Afrique.",
  keywords: [
    "agence digitale Sénégal",
    "agence web Dakar",
    "création site web Sénégal",
    "développement web Dakar",
    "communication digitale Sénégal",
    "marketing digital Dakar",
    "community management Sénégal",
    "design graphique Dakar",
    "agence communication Louga",
    "application web Sénégal",
    "e-commerce Dakar",
    "SEO Sénégal",
    "transformation digitale Afrique",
    "social media Sénégal",
    "branding Sénégal",
    "identité visuelle Dakar",
  ],
  authors: [{ name: "Khidma Service Digital", url: baseUrl }],
  creator: "Khidma Service Digital",
  publisher: "Khidma Service Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "KSD - Khidma Service Digital",
    title: "KSD - Khidma Service Digital | Agence Digitale au Sénégal",
    description:
      "Agence de communication digitale à Dakar et Louga. Création de sites web, marketing digital et design graphique.",
    images: [
      {
        url: `${baseUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "KSD - Khidma Service Digital - Agence Digitale au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KSD - Khidma Service Digital | Agence Digitale Sénégal",
    description: "Création de sites web, marketing digital et design graphique à Dakar et Louga",
    images: [`${baseUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "votre-code-verification-google",
  },
};
