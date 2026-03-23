"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Clock, Shield, MapPin, Anchor, Truck } from "lucide-react"

export function Destinations() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
            <span className="w-12 h-[1px] bg-primary/40" />{t.destinations.label}
          </p>
          <h2 className="text-luxury text-4xl sm:text-5xl font-bold text-foreground">
            {t.destinations.title}
          </h2>
          <p className="mt-6 text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
            {t.destinations.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.destinations.items.map((item, i) => (
            <div key={i} className="glass-morphism rounded-[2.5rem] p-8 group hover:bg-primary/5 transition-all duration-700 border border-border/40 hover:-translate-y-2">
              <div className="flex justify-between items-start mb-10">
                <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{item.flag}</span>
                <div className="bg-primary/10 text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {i === 2 ? <Truck className="h-5 w-5" /> : <Anchor className="h-5 w-5" />}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-luxury text-2xl font-bold">{item.country}</h3>
                  <p className="text-sm text-primary font-bold mt-1 tracking-wide">{item.city}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item.safety}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium capitalize">Tracking GPS</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
