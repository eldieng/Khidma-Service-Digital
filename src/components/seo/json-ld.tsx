export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Khidma Service Digital",
    alternateName: "KSD",
    url: "https://khidmaservices.com",
    logo: "https://khidmaservices.com/logo.png",
    description:
      "Agence de communication digitale basée au Sénégal. Développement web, design, marketing digital et transformation numérique.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Dakar",
        addressCountry: "SN",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Louga",
        addressCountry: "SN",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+221-77-454-86-61",
        contactType: "customer service",
        areaServed: "SN",
        availableLanguage: ["French"],
      },
    ],
    email: "contact@khidmaservice.com",
    sameAs: [
      "https://www.facebook.com/khidmaservicedigital/",
      "https://www.instagram.com/khidmaservice",
      "https://www.linkedin.com/company/khidma-service-digital",
    ],
    foundingDate: "2020",
    areaServed: {
      "@type": "Country",
      name: "Senegal",
    },
    serviceType: [
      "Communication Digitale",
      "Développement Web",
      "Web Design",
      "Marketing Digital",
      "Impression",
      "Bureautique",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://khidmaservices.com",
    name: "Khidma Service Digital",
    image: "https://khidmaservices.com/logo.png",
    telephone: "+221-77-454-86-61",
    email: "contact@khidmaservice.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.6937,
      longitude: -17.4441,
    },
    url: "https://khidmaservices.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Khidma Service Digital",
    alternateName: "KSD",
    url: "https://khidmaservices.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://khidmaservices.com/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Khidma Service Digital",
      url: "https://khidmaservices.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Senegal",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
