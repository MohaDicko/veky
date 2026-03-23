"use client"

import { MessageSquare, Search, CheckCircle2, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"
import { useLanguage } from "@/lib/i18n/context"

const icons = [MessageSquare, Search, CheckCircle2, Truck]

export function HowItWorks() {
  const { ref, inView } = useInView(0.1)
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
      id="processus"
      aria-labelledby="howitworks-heading"
      className="py-24 lg:py-40 bg-primary text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none select-none flex items-end justify-end pr-8 pb-4">
        <span className="text-[30vw] font-bold leading-none tracking-tighter">04</span>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.4em] text-white/40 font-bold mb-6 flex items-center gap-3">
            <span className="w-12 h-[1px] bg-white/30" />{t.howItWorks.label}
          </p>
          <h2 id="howitworks-heading" className="text-luxury text-5xl sm:text-7xl font-bold leading-none">{t.howItWorks.title}</h2>
        </div>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <div key={index}
                onMouseMove={handleMouseMove}
                className={cn("relative p-8 rounded-[2.5rem] border border-white/10 bg-white/5 transition-all duration-700 hover:-translate-y-2 overflow-hidden group", "opacity-0 translate-y-8", inView && "opacity-100 translate-y-0")}
                style={{ transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms` }}
              >
                {/* Spotlight effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[background]" 
                  style={{
                    background: `radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.1), transparent 40%)`
                  }}
                />
                
                <div className="absolute top-4 right-6 text-[72px] font-bold text-white/[0.04] leading-none select-none pointer-events-none">{String(index + 1).padStart(2, "0")}</div>
                <div className="relative z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 pointer-events-auto">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mb-3">{step.label}</div>
                  <h3 className="text-luxury text-xl font-bold mb-4 leading-tight">{step.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
