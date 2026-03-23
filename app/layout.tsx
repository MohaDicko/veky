import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, Noto_Sans_Arabic, Noto_Sans_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from "@/components/ui/sonner"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LanguageProvider } from "@/lib/i18n/context"
import { CookieBanner } from "@/components/cookie-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CustomCursor } from "@/components/custom-cursor"
import SchemaOrg from "@/components/schema-org"
import './globals.css'

const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-display', display: 'swap' })
const inter = Inter({ subsets: ["latin"], variable: '--font-sans', display: 'swap' })
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: '--font-arabic', weight: ['400', '700'], display: 'swap' })
const chinese = Noto_Sans_SC({ subsets: ["latin"], variable: '--font-chinese', weight: ['400', '700'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://aya-dienst.com'),
  title: {
    default: "AYA-DIENST | Expert Import Auto, Pièces & Cosmétiques d'Allemagne vers le Mali",
    template: "%s | AYA-DIENST",
  },
  description: "Votre acheteur de confiance en Allemagne. Gagnez du temps et de l'argent : nous inspectons, achetons et livrons vos véhicules, pièces détachées et lots cosmétiques jusqu'à Bamako.",
  keywords: [
    "import auto allemagne mali", "voiture occasion allemagne bamako", "agent sourcing bielefeld",
    "grossiste cosmétique balea eucerin dakar mali", "import pièces détachées allemagne", "dédouanement voiture mali",
    "export afrique de l'ouest", "logistique auto premium",
  ],
  authors: [{ name: "AYA-DIENST", url: "https://aya-dienst.com" }],
  creator: "AYA-DIENST",
  publisher: "AYA-DIENST",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "AYA-DIENST | Import Auto, Pièces & Cosmétiques Allemagne",
    description: "La sécurité allemande jusqu'au Mali. Découvrez le catalogue d'importation de véhicules et produits premium.",
    url: "https://aya-dienst.com",
    siteName: "AYA-DIENST",
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE", "ar_SA", "zh_CN"],
    type: "website",
    images: [{
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
      width: 1200,
      height: 630,
      alt: "AYA-DIENST — Agents d'Achats Premium en Allemagne",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AYA-DIENST | L'Import d'Allemagne sur-mesure",
    description: "Votre bureau sur le terrain à Bielefeld — auto, composants, déstockages cosmétiques, et logistique Afrique.",
    images: ["https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200"],
  },
  alternates: {
    canonical: "https://aya-dienst.com",
    languages: {
      "fr": "https://aya-dienst.com",
      "en": "https://aya-dienst.com/en",
      "de": "https://aya-dienst.com/de",
      "ar": "https://aya-dienst.com/ar",
      "zh": "https://aya-dienst.com/zh",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  verification: {
    google: "aya-dienst-google-verification",
  },
  category: "business",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${display.variable} ${inter.variable} ${arabic.variable} ${chinese.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SchemaOrg />
      </head>
      <body className="font-sans antialiased bg-background text-foreground relative">
        <LanguageProvider>
          {/* Skip to main content — Accessibilité WCAG 2.1 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:font-bold focus:shadow-2xl focus:outline-none"
          >
            Aller au contenu principal
          </a>
          <main id="main-content">
            {children}
          </main>
          <WhatsAppButton />
          <ScrollToTop />
          <CustomCursor />
          <CookieBanner />
          <Toaster />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
