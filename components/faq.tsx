"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function Faq() {
  const { t } = useLanguage()

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 lg:py-40 bg-background relative overflow-hidden noise-texture">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-[1px] bg-primary/40" />{t.faq.label}
              </p>
              <h2 id="faq-heading" className="text-luxury text-5xl sm:text-6xl font-bold text-foreground leading-tight">{t.faq.title}</h2>
            </div>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">{t.faq.subtitle}</p>
            <Button size="lg" className="rounded-2xl h-14 px-8 font-bold group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              {t.faq.cta} <ArrowRight className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-4">
              {t.faq.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}
                  className="rounded-[1.5rem] border border-border/40 bg-card/40 px-6 overflow-hidden data-[state=open]:border-primary/30 data-[state=open]:bg-primary/[0.02] transition-colors duration-300">
                  <AccordionTrigger className="text-left text-lg font-bold py-6 hover:no-underline hover:text-primary transition-colors gap-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base font-light leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
