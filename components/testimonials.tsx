"use client"

import { useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

const testimonials = [
  { name: "Moussa Diallo", role: "Importateur automobile", country: "Sénégal 🇸🇳", initials: "MD", text: "J'ai acheté 3 BMW via AYA-DIENST en 6 mois. Chaque fois, rapport d'inspection complet, prix juste, et véhicule livré en parfait état à Dakar. Je ne cherche plus ailleurs.", rating: 5, tag: "Véhicules" },
  { name: "Aminata Koné", role: "Gérante de boutique cosmétique", country: "Côte d'Ivoire 🇨🇮", initials: "AK", text: "Les lots Balea et Eucerin depuis Bielefeld me permettent de vendre 40% moins cher que mes concurrents. Qualité et traçabilité irréprochables, à chaque commande.", rating: 5, tag: "Cosmétiques" },
  { name: "Ibrahim Sangaré", role: "Mécanicien & Atelier", country: "Mali 🇲🇱", initials: "IS", text: "Les pièces Bosch commandées via AYA-DIENST m'arrivent originales, avec facture allemande. Fini les contrefaçons du marché local. Commission transparente et honnête.", rating: 5, tag: "Pièces" },
  { name: "Fatou Baldé", role: "Commerçante importatrice", country: "Guinée 🇬🇳", initials: "FB", text: "J'avais peur de me faire arnaquer depuis l'Allemagne. Avec AYA-DIENST, j'ai les photos, les vidéos, les documents avant même de payer. C'est du sérieux, je recommande.", rating: 5, tag: "Logistique" },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const { t } = useLanguage()

  return (
    <section aria-labelledby="testimonials-heading" className="py-24 lg:py-40 bg-muted/20 noise-texture overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-primary/40" />{t.testimonials.label}
            </p>
            <h2 id="testimonials-heading" className="text-luxury text-5xl sm:text-7xl font-bold text-foreground">{t.testimonials.title}</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1))}
              className="w-14 h-14 rounded-2xl border border-border/60 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label={t.testimonials.prev}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setActive((p) => (p + 1) % testimonials.length)}
              className="w-14 h-14 rounded-2xl border border-border/60 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label={t.testimonials.next}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-7 glass-morphism rounded-[3rem] p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute top-8 right-10 text-primary/8 pointer-events-none">
              <Quote className="h-28 w-28" fill="currentColor" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-2xl sm:text-3xl font-light leading-relaxed text-foreground mb-12">&ldquo;{testimonials[active].text}&rdquo;</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl flex-shrink-0">{testimonials[active].initials}</div>
                <div>
                  <p className="font-bold text-lg text-foreground">{testimonials[active].name}</p>
                  <p className="text-muted-foreground text-sm">{testimonials[active].role} · {testimonials[active].country}</p>
                </div>
                <span className="ml-auto text-[11px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">{testimonials[active].tag}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4">
            {testimonials.map((t2, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={cn("text-left p-6 rounded-[2rem] border transition-all duration-500 flex-1 flex flex-col gap-3",
                  active === i ? "bg-primary text-white border-primary shadow-2xl shadow-primary/25 scale-[1.01]" : "bg-card/60 border-border/40 hover:border-primary/40 hover:bg-card"
                )}>
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0", active === i ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}>{t2.initials}</div>
                  <div>
                    <p className={cn("font-bold text-sm", active === i ? "text-white" : "text-foreground")}>{t2.name}</p>
                    <p className={cn("text-xs", active === i ? "text-white/60" : "text-muted-foreground")}>{t2.country}</p>
                  </div>
                </div>
                <p className={cn("text-sm font-light line-clamp-2", active === i ? "text-white/75" : "text-muted-foreground")}>&ldquo;{t2.text}&rdquo;</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={cn("rounded-full transition-all duration-500", active === i ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/40")} />
          ))}
        </div>
      </div>
    </section>
  )
}
