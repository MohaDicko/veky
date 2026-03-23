"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function About() {
  const { t } = useLanguage()

  return (
    <section
      id="apropos"
      aria-labelledby="about-heading"
      className="py-24 lg:py-40 bg-background relative overflow-hidden noise-texture"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image */}
          <div className="relative group" aria-hidden="true">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3.5rem] blur-2xl group-hover:bg-primary/20 transition-colors duration-700" />
            <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-border/40 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000"
                alt="Bureau AYA-DIENST à Bielefeld, Allemagne"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            <div className="absolute bottom-8 right-8 glass-morphism p-6 rounded-3xl">
              <p className="text-luxury text-xl font-bold">{t.about.badge1}</p>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mt-1">{t.about.badge2}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            <header>
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-[1px] bg-primary/40" aria-hidden="true" />{t.about.label}
              </p>
              <h2 id="about-heading" className="text-luxury text-5xl sm:text-7xl font-bold text-foreground">
                {t.about.title}
              </h2>
            </header>

            <div className="space-y-8 text-muted-foreground text-xl font-light leading-relaxed">
              <p>
                {t.about.p1.replace("AYA-DIENST", "")}
                <span className="text-foreground font-medium underline decoration-primary/40 underline-offset-8">AYA-DIENST</span>.
              </p>
              <p>{t.about.p2}</p>
            </div>

            <ul
              aria-label="Nos engagements"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-border/40"
            >
              {t.about.values.map((v, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div
                    className="p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold tracking-wide text-foreground/80 group-hover:text-foreground transition-colors">{v}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
