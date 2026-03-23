"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

const icons = ["✨", "🚗", "📦", "📋"]

export function Services() {
  const { t } = useLanguage()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--x", `${x}px`)
    e.currentTarget.style.setProperty("--y", `${y}px`)
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary" aria-hidden="true" />{t.services.label}
            </p>
            <h2 id="services-heading" className="text-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">{t.services.title}</h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg font-light leading-relaxed">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {t.services.items.map((service, index) => {
            const isLarge = index === 0 || index === 3
            return (
              <div 
                key={index} 
                onMouseMove={handleMouseMove}
                className={cn(
                  "group relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/50 p-8 transition-transform duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10", 
                  isLarge ? "md:col-span-3 lg:col-span-4" : "md:col-span-3 lg:col-span-2"
                )}
              >
                {/* Spotlight effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[background]" 
                  style={{
                    background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), var(--primary-color, rgba(59, 130, 246, 0.15)), transparent 40%)`
                  }}
                />
                
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                  <div>
                    <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/5 text-primary mb-8 text-2xl group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:text-white">
                      {icons[index]}
                    </div>
                    <h3 className="text-luxury text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light opacity-80 group-hover:opacity-100 transition-opacity">{service.desc}</p>
                  </div>
                  <div className="mt-12 flex flex-wrap gap-2">
                    {service.features.map((f, i) => (
                      <span key={i} className="text-[11px] uppercase tracking-wider font-bold bg-muted px-3 py-1.5 rounded-full border border-border group-hover:border-primary/20 transition-colors">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
