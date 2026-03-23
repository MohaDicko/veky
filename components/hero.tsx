"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Globe, Truck, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function Hero() {
  const { t } = useLanguage()
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="accueil" aria-labelledby="hero-heading" className="relative min-h-screen flex items-center justify-center overflow-hidden noise-texture">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" aria-hidden="true"
        style={{ backgroundImage: `linear-gradient(to right bottom, rgba(15, 23, 42, 0.96), rgba(30, 58, 138, 0.72)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070')` }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px] pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8 text-center w-full">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-widest text-white/70 mb-8 animate-fade-in-up font-bold bg-white/10 py-2 px-5 rounded-full inline-flex items-center gap-2 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t.hero.badge}
          </p>

          <h1 id="hero-heading" className="text-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white animate-fade-in-up [animation-delay:150ms] opacity-0 mb-8">
            {t.hero.title1} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-accent animate-shimmer bg-[length:200%_auto]">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:300ms] opacity-0 font-light">
            {t.hero.subtitle}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:450ms] opacity-0">
            <Button size="lg" onClick={() => scrollTo("contact")}
              className="rounded-full px-10 py-7 text-lg bg-white text-primary hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all hover:scale-105 active:scale-95 font-bold">
              {t.hero.cta1} <ArrowRight className="ms-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("apropos")}
              className="rounded-full px-10 py-7 text-lg border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md transition-all">
              {t.hero.cta2}
            </Button>
            <a href="https://wa.me/4917621374833?text=Bonjour%2C%20je%20souhaite%20importer%20une%20voiture%20d%27Allemagne." target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-base border border-green-500/40 text-green-400 hover:bg-green-500/15 bg-green-500/5 backdrop-blur-md transition-all font-semibold">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t.hero.cta3}
            </a>
          </div>
        </div>

        <div className="mt-28 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-up [animation-delay:600ms] opacity-0 text-left">
          {[
            { icon: Shield, title: t.hero.card1Title, desc: t.hero.card1Desc },
            { icon: Globe, title: t.hero.card2Title, desc: t.hero.card2Desc },
            { icon: Truck, title: t.hero.card3Title, desc: t.hero.card3Desc },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-morphism p-6 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group">
              <Icon className="h-7 w-7 text-accent shrink-0 mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <h2 className="text-base text-white font-bold">{title}</h2>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 animate-fade-in-up [animation-delay:750ms] opacity-0">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-6 font-bold">{t.hero.partnersLabel}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <span className="text-white font-serif italic text-lg decoration-primary underline decoration-2 underline-offset-4">mobile.de</span>
            <span className="text-white font-bold tracking-tighter text-xl">AutoScout24</span>
            <span className="text-white font-black italic text-xl">DHL <span className="not-italic font-light">Express</span></span>
            <span className="text-white font-serif text-lg">Zalando <span className="text-xs align-top">Lounge</span></span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  )
}
