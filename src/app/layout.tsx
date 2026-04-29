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
  title: {
    default: "KSD - Khidma Service Digital | Agence Digitale au Sénégal",
    template: "%s | KSD",
  },
  description:
    "Agence de communication digitale basée au Sénégal. Développement web, design, marketing digital et transformation numérique pour entreprises et startups.",
  keywords: [
    "agence digitale",
    "Sénégal",
    "Dakar",
    "développement web",
    "communication digitale",
    "marketing digital",
    "design",
  ],
  authors: [{ name: "Khidma Service Digital" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://khidmaservices.com",
    siteName: "KSD - Khidma Service Digital",
    title: "KSD - Khidma Service Digital | Agence Digitale au Sénégal",
    description:
      "Agence de communication digitale basée au Sénégal. Développement web, design, marketing digital.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KSD - Khidma Service Digital",
    description: "Agence de communication digitale au Sénégal",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
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
