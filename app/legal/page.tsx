"use client"

import { useLanguage } from "@/lib/i18n/context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LegalPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-muted/20 pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Retour au site
        </Link>
        
        <div className="space-y-24">
          
          {/* Mentions Légales / Impressum */}
          <section id="mentions" className="scroll-mt-32">
            <h1 className="text-4xl font-bold mb-8 text-foreground pb-4 border-b">Mentions Légales (Impressum)</h1>
            <div className="prose prose-lg text-muted-foreground">
              <p>Conformément au § 5 de la loi allemande sur les télémédias (TMG) :</p>
              
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Éditeur du site :</h3>
              <p>
                <strong>AYA-DIENST</strong><br />
                Opelstraße<br />
                33602 Bielefeld<br />
                Allemagne (Deutschland)
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Contact :</h3>
              <p>
                Téléphone (DE) : +49 176 2137 4833<br />
                WhatsApp (International) : +49 176 2137 4833<br />
                Email : contact@aya-dienst.com
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Responsabilité pour le contenu (Haftungsausschluss)</h3>
              <p>
                En tant que prestataire de services, nous sommes responsables de nos propres contenus sur ces pages conformément aux lois générales selon le § 7 alinéa 1 TMG. Les informations fournies sur ce site le sont à titre purement indicatif. 
                Les prix mentionnés sur le simulateur ("Calculateur Douane/Import") sont des estimations macro-économiques et ne constituent pas un devis légalement contraignant tant qu'un contrat formel n'est pas signé entre AYA-DIENST et le client.
              </p>
            </div>
          </section>

          {/* Politique de Confidentialité / Datenschutzerklärung */}
          <section id="privacy" className="scroll-mt-32">
            <h2 className="text-4xl font-bold mb-8 text-foreground pb-4 border-b">Politique de Confidentialité (RGPD)</h2>
            <div className="prose prose-lg text-muted-foreground">
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Aperçu de la protection des données</h3>
              <p>
                La protection de vos données personnelles est une priorité absolue pour AYA-DIENST. La présente déclaration de confidentialité vous informe sur la nature, la portée et la finalité de la collecte et de l'utilisation des données personnelles sur notre plateforme.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Collecte de données sur notre site web</h3>
              <p>
                <strong>Formulaires de contact & WhatsApp :</strong> Si vous nous envoyez des demandes via le formulaire de contact ou WhatsApp, vos coordonnées (Nom, Ville, Numéro de téléphone) seront stockées pour le traitement de la demande et en cas de questions de suivi. Nous ne transmettons pas ces données sans votre consentement.
              </p>
              <p>
                Le traitement de ces données est fondé sur l'art. 6, par. 1, let. b du RGPD, dans la mesure où votre demande est liée à l'exécution d'un contrat ou à des mesures précontractuelles (recherche d'un véhicule ou lot).
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Vos droits (Information, suppression, blocage)</h3>
              <p>
                Vous avez à tout moment le droit d'obtenir gratuitement des informations sur vos données personnelles stockées, leur origine et leurs destinataires ainsi que la finalité du traitement des données. Vous avez également le droit de demander la rectification, le blocage ou la suppression de ces données.
              </p>
            </div>
          </section>

          {/* CGV & Règles d'Importation */}
          <section id="cgv" className="scroll-mt-32">
            <h2 className="text-4xl font-bold mb-8 text-foreground pb-4 border-b">CGV & Conditions de Transit</h2>
            <div className="prose prose-lg text-muted-foreground">
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Validation des accords</h3>
              <p>
                Les accords d'importation (véhicules, cosmétiques, pièces) conclus entre AYA-DIENST (Bielefeld, Allemagne) et l'Acheteur ne deviennent effectifs qu'après la signature d'un devis/contrat officiel et la réception d'un premier acompte sécurisé de cautionnement.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Transparence de la Commission</h3>
              <p>
                AYA-DIENST agit en tant qu'agent facilitateur et logisticien (Sourcing, Inspection, Fret). Notre prestation est rémunérée via une commission fixe et transparente détaillée dans le contrat final. Le prix d'achat du bien en Allemagne (ex: concessionaire sur Mobile.de) est le prix réel payé, sans marge cachée.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Inspection et État des Biens</h3>
              <p>
                Nous effectuons un contrôle technique visuel et physique (documents, photos, vidéos, test routier). L'approbation finale pour procéder à l'achat revient au client sur la base du rapport fourni. Une fois validé par le client, l'achat en Allemagne est définitif. AYA-DIENST ne saurait être tenu responsable d'un vice caché qui échapperait raisonnablement à une inspection de contrôle tierce.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. Logistique et Transit Maritime</h3>
              <p>
                Les délais de livraison maritime (généralement 3 à 6 semaines vers l'Afrique de l'Ouest) sont donnés à titre estimatif et dépendent de la compagnie maritime. AYA-DIENST s'occupe de rassembler les formulaires de dédouanement (ex: EUR.1, EX-A) mais les droits et taxes d'entrée dans le pays de destination (ex: Douane de Bamako ou Dakar) incombent au client final, sauf accord de livraison type DDP (Delivered Duty Paid) explicitement formulé.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
