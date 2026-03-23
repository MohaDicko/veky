"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/context"

export default function LegalPage() {
  const { t } = useLanguage()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-40 pb-24 bg-background noise-texture">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          
          <div className="mb-16">
            <h1 className="text-luxury text-5xl sm:text-7xl font-bold mb-6">Informations Légales</h1>
            <p className="text-muted-foreground text-xl font-light">Mentions légales, politique de confidentialité et conditions générales.</p>
          </div>

          <div className="space-y-20 glass-morphism p-8 sm:p-16 rounded-[3rem] text-muted-foreground leading-relaxed">
            
            <section id="mentions" className="scroll-mt-40">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-4">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Mentions Légales
              </h2>
              <div className="space-y-4">
                <p><strong>Éditeur du site :</strong> Veky-Shop Bielefeld</p>
                <p><strong>Siège social :</strong> Bielefeld, Nordrhein-Westfalen, Allemagne</p>
                <p><strong>Directeur de la publication :</strong> Ousmane Mahamad Toure</p>
                <p><strong>Contact :</strong> +49 176 2137 4833 | ousmanemahamadtoure@gmail.com</p>
                <p>Conformément à la loi allemande (Telemediengesetz - TMG), ce site est édité à des fins de présentation commerciale B2B et B2C pour l'import-export vers l'Afrique.</p>
              </div>
            </section>

            <section id="privacy" className="scroll-mt-40">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-4">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Politique de Confidentialité
              </h2>
              <div className="space-y-4">
                <p>Nous attachons une grande importance à la protection de vos données personnelles. Ce site respecte le Règlement Général sur la Protection des Données (RGPD).</p>
                <p><strong>Collecte des données :</strong> Nous collectons uniquement les informations transmises volontairement via notre formulaire de contact ou nos boutons d'appel (nom, email, téléphone).</p>
                <p><strong>Cookies :</strong> Nous utilisons des traceurs d'audience de base via Vercel Analytics, qui sont anonymisés. Les autres cookies servent uniquement à sauvegarder vos préférences de langue (Essentiels).</p>
                <p>Vous disposez d'un droit d'accès, de modification et de suppression de vos données en nous contactant directement par email.</p>
              </div>
            </section>

            <section id="cgv" className="scroll-mt-40">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-4">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Conditions Générales
              </h2>
              <div className="space-y-4">
                <p>Veky-Shop agit en qualité d'agent d'achat, inspecteur et intermédiaire logistique. Nos responsabilités et commissions sont définies par un contrat établi avant toute transaction financière (généralement entre 5% et 10%).</p>
                <p>Nous ne sommes pas un concessionnaire automobile mais un partenaire de sourcing qui garantit la transparence d'achat sur le marché allemand. Les litiges relèvent du droit commercial allemand.</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
