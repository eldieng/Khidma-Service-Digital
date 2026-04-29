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
    template: "%s | KSD",
  },
  description:
    "Agence de communication digitale basée au Sénégal (Dakar & Louga). Développement web, design, marketing digital et transformation numérique pour entreprises et startups.",
  keywords: [
    "agence digitale Sénégal",
    "agence web Dakar",
    "développement web Sénégal",
    "communication digitale Dakar",
    "marketing digital Afrique",
    "création site web Sénégal",
    "design graphique Dakar",
    "community management Sénégal",
    "SEO Sénégal",
    "e-commerce Dakar",
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
      "Agence de communication digitale basée au Sénégal. Développement web, design, marketing digital.",
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "KSD - Khidma Service Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KSD - Khidma Service Digital",
    description: "Agence de communication digitale au Sénégal",
    images: [`${baseUrl}/logo.png`],
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
