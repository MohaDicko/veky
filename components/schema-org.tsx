export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://aya-dienst.com/#organization",
        "name": "AYA-DIENST",
        "alternateName": "AYA-DIENST Bielefeld",
        "description": "Agent d'achats et société de logistique premium basée à Bielefeld, Allemagne. Spécialisée dans l'import-export de véhicules, cosmétiques, pièces détachées et produits Made in Germany vers l'Afrique.",
        "url": "https://aya-dienst.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aya-dienst.com/logo.png",
          "width": 200,
          "height": 60
        },
        "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
        "telephone": ["+4917621374833", "+22377157399"],
        "email": "ousmanemahamadtoure@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Opelstraße",
          "addressLocality": "Bielefeld",
          "postalCode": "33602",
          "addressRegion": "Nordrhein-Westfalen",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "52.0116",
          "longitude": "8.5316"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Bank Transfer, Wire Transfer",
        "areaServed": [
          "Monde Entier", "Sénégal", "Côte d'Ivoire", "Mali", "Guinée", "Maroc",
          "Algérie", "Cameroun", "Togo", "Allemagne"
        ],
        "serviceType": [
          "Sourcing de véhicules d'occasion",
          "Achat cosmétiques en gros",
          "Logistique et transit international",
          "Inspection de biens sur place",
          "Dédouanement et formalités export"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/aya-dienst",
          "https://www.facebook.com/ayadienst",
          "https://www.instagram.com/ayadienst"
        ],
        "foundingDate": "2019",
        "foundingLocation": {
          "@type": "Place",
          "name": "Bielefeld, Germany"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://aya-dienst.com/#website",
        "url": "https://aya-dienst.com",
        "name": "AYA-DIENST",
        "description": "Agent d'achats premium en Allemagne",
        "publisher": { "@id": "https://aya-dienst.com/#organization" },
        "inLanguage": ["fr", "en", "de", "ar", "zh"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://aya-dienst.com/#contact",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://aya-dienst.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Comment fonctionne votre système de commission ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Notre commission est fixe et communiquée dès le devis — généralement entre 5% et 10% du prix d'achat. Il n'y a aucun frais caché."
            }
          },
          {
            "@type": "Question",
            "name": "Dans quels pays livrez-vous ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nous expédions vers l'Afrique de l'Ouest et du Nord : Sénégal, Côte d'Ivoire, Mali, Guinée, Maroc, Algérie, Cameroun, Togo et plus."
            }
          },
          {
            "@type": "Question",
            "name": "Combien de temps pour recevoir un véhicule ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Comptez 3 à 6 semaines pour une livraison maritime depuis Bielefeld vers l'Afrique de l'Ouest."
            }
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
