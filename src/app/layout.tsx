import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { SkipLink } from "@/components/ui/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khidmaservices.com"),
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
  ],
  authors: [{ name: "Khidma Service Digital", url: "https://khidmaservices.com" }],
  creator: "Khidma Service Digital",
  publisher: "Khidma Service Digital",
  icons: {
    icon: "/images/Favicon_khidma_services.png",
    shortcut: "/images/Favicon_khidma_services.png",
    apple: "/images/Favicon_khidma_services.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://khidmaservices.com",
    siteName: "KSD - Khidma Service Digital",
    title: "KSD - Khidma Service Digital | Agence Digitale au Sénégal",
    description:
      "Agence de communication digitale à Dakar et Louga. Création de sites web, marketing digital et design graphique.",
    images: [
      {
        url: "/images/og-image.png",
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
    images: ["/images/og-image.png"],
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
  alternates: {
    canonical: "https://khidmaservices.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SkipLink />
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
