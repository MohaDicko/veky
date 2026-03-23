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
    default: "AYA-DIENST | Agents d'Achats Premium en Allemagne",
    template: "%s | AYA-DIENST",
  },
  description: "Votre bureau opérationnel à Bielefeld, Allemagne. Inspection sur place, logistique totale, commission fixe et transparente pour l'import-export vers l'Afrique.",
  keywords: [
    "import Allemagne Afrique", "achat voiture Allemagne", "agent achat Bielefeld",
    "cosmétiques grossiste Allemagne", "transit fret maritime", "sourcing véhicule occasion",
    "export Sénégal Côte d'Ivoire Mali", "logistique import export premium",
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
    title: "AYA-DIENST | Agents d'Achats Premium en Allemagne",
    description: "Import-export premium depuis Bielefeld. Véhicules, cosmétiques, logistique internationale.",
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
    title: "AYA-DIENST | Import-Export Premium depuis l'Allemagne",
    description: "Votre bureau opérationnel à Bielefeld — véhicules, cosmétiques, logistique.",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"],
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
