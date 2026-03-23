"use client"

import { useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

const testimonials = [
  { 
    name: "Moussa Diallo", role: "Acheteur particulier", country: "Mali 🇲🇱", initials: "MD", 
    text: "J'avais très peur d'envoyer mon argent. Mais l'équipe m'a envoyé des vidéos depuis la concession en Allemagne. Aujourd'hui je roule dans mon X5 à Bamako !", 
    rating: 5, tag: "BMW X5",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800"
  },
  { 
    name: "Aminata Koné", role: "Revente Auto", country: "Mali 🇲🇱", initials: "AK", 
    text: "Mon deuxième véhicule commandé avec eux. Tout est carré : du rapport d'inspection jusqu'au dédouanement à l'arrivée. Le prix final rendu est imbattable.", 
    rating: 5, tag: "Tucson 2020",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800"
  },
  { 
    name: "Oumar Sangaré", role: "Chef d'entreprise", country: "Mali 🇲🇱", initials: "OS", 
    text: "Une Mercedes Classe E importée en 28 jours exactement. Zéro surprise sur les frais, état complètement clinique comme promis sur la vidéo.", 
    rating: 5, tag: "Classe E",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800"
  },
  { 
    name: "Fatoumata Kéita", role: "Particulier", country: "Niger 🇳🇪", initials: "FK", 
    text: "Je n'y connais rien en mécanique. Leur service d'inspection m'a sauvé: ils ont refusé la 1ère voiture qui avait un vice caché, et m'en ont trouvé une meilleure.", 
    rating: 5, tag: "Toyota Yaris",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800"
  },
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
              <span className="w-12 h-[1px] bg-primary/40" />PREUVES SOCIALES
            </p>
            <h2 id="testimonials-heading" className="text-luxury text-5xl sm:text-7xl font-bold text-foreground">Dernières livraisons.</h2>
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
          <div className="md:col-span-8 glass-morphism rounded-[3rem] p-8 sm:p-10 relative overflow-hidden flex flex-col sm:flex-row gap-8 items-center shadow-lg">
            
            <div className="w-full sm:w-2/5 relative h-64 sm:h-full min-h-[250px] rounded-[2rem] overflow-hidden shadow-md">
              <img src={testimonials[active].image} alt="Voiture livrée" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/20">
                <CheckCircle2 className="w-3 h-3" /> Livré avec succès
              </div>
            </div>

            <div className="flex-1 relative z-10 flex flex-col h-full justify-between py-2">
              <div className="absolute top-0 right-0 text-primary/10 pointer-events-none -mr-4 -mt-4">
                <Quote className="h-20 w-20" fill="currentColor" />
              </div>
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-xl sm:text-2xl font-light leading-relaxed text-foreground mb-8">&ldquo;{testimonials[active].text}&rdquo;</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="font-bold text-lg text-foreground">{testimonials[active].name}</p>
                  <p className="text-muted-foreground text-sm font-medium">{testimonials[active].role} · <span className="text-foreground">{testimonials[active].country}</span></p>
                </div>
                <span className="ml-auto text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">{testimonials[active].tag}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            {testimonials.map((t2, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={cn("text-left p-5 rounded-[2rem] border transition-all duration-500 flex-1 flex items-center gap-4",
                  active === i ? "bg-primary text-white border-primary shadow-xl shadow-primary/25 scale-[1.02]" : "bg-card/60 border-border/40 hover:border-primary/40 hover:bg-card"
                )}>
                <img src={t2.image} alt="Miniature" className="w-16 h-16 rounded-xl object-cover shadow-sm bg-muted" />
                <div className="flex-1 overflow-hidden">
                  <p className={cn("font-bold text-sm truncate", active === i ? "text-white" : "text-foreground")}>{t2.name}</p>
                  <p className={cn("text-xs font-medium truncate mb-1", active === i ? "text-white/80" : "text-primary")}>{t2.tag}</p>
                  <p className={cn("text-[10px] uppercase tracking-wider font-bold", active === i ? "text-white/60" : "text-muted-foreground")}>{t2.country}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Témoignage ${i+1}`}
              className={cn("rounded-full transition-all duration-500", active === i ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/40")} />
          ))}
        </div>
      </div>
    </section>
  )
}
