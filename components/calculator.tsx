"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator as CalcIcon, Ship, ShieldCheck, ArrowRight, Wallet, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function Calculator() {
  const { t } = useLanguage()
  const [price, setPrice] = useState<string>("")
  const [category, setCategory] = useState<number>(0)
  const [destination, setDestination] = useState<number>(0)
  const [results, setResults] = useState({ commission: 0, shipping: 0, total: 0 })

  useEffect(() => {
    // Treat the input string directly as FCFA
    const p = parseFloat(price.replace(/\s/g, "")) || 0
    if (p <= 0) {
      setResults({ commission: 0, shipping: 0, total: 0 })
      return
    }

    // Calculation Logic (Estimates in FCFA)
    const commRate = category === 0 ? 0.08 : 0.06 // 8% for vehicles, 6% others
    const comm = Math.max(p * commRate, category === 0 ? 325000 : 35000)
    
    // Shipping Estimates (in FCFA)
    const baseShipping = [1300000, 800000, 850000, 1400000, 850000] // Mali, Sénégal, CI, Niger, Guinée
    const catMultiplier = category === 0 ? 1 : 0.1 // Vehicles are 100%, others are roughly 10% of vehicle shipping cost or less
    const ship = baseShipping[destination] * catMultiplier

    setResults({
      commission: Math.round(comm),
      shipping: Math.round(ship),
      total: Math.round(p + comm + ship)
    })
  }, [price, category, destination])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="calculateur" className="py-24 lg:py-40 bg-background relative overflow-hidden noise-texture">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-primary/40" />{t.calculator.label}
          </p>
          <h2 className="text-luxury text-5xl sm:text-7xl font-bold text-foreground mb-8">
            {t.calculator.title}
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-8 glass-morphism p-8 sm:p-12 rounded-[3.5rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/20" />
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2">
                  <Wallet className="h-3 w-3" /> {t.calculator.priceLabel}
                </label>
                <div className="relative">
                    <Input 
                        type="number" 
                        placeholder="Ex: 8000000" 
                        className="rounded-2xl border-border/40 bg-background/50 h-16 text-xl sm:text-2xl font-bold px-6 focus:ring-primary/20 pr-16"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold opacity-70">FCFA</div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2">
                  <CalcIcon className="h-3 w-3" /> {t.calculator.categoryLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {t.calculator.categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setCategory(i)}
                      className={cn(
                        "p-4 rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all border",
                        category === i 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]" 
                          : "bg-background/40 text-muted-foreground border-border/40 hover:bg-background/60"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2">
                  <Globe className="h-3 w-3" /> {t.calculator.destinationLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                   {t.calculator.destinations.map((dest, i) => (
                    <button
                      key={i}
                      onClick={() => setDestination(i)}
                      className={cn(
                        "p-4 rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all border text-left flex items-center justify-between",
                        destination === i 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]" 
                          : "bg-background/40 text-muted-foreground border-border/40 hover:bg-background/60"
                      )}
                    >
                      {dest}
                      {destination === i && <ShieldCheck className="h-4 w-4 shrink-0 ms-2" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-[3.5rem] bg-foreground text-background shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-luxury text-2xl font-bold mb-10 opacity-70 border-b border-background/10 pb-6">{t.calculator.resultTitle}</h3>
              
              <div className="space-y-8">
                <div className="flex justify-between items-end gap-2">
                    <span className="text-sm font-light opacity-60 flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary shrink-0" /> {t.calculator.commissionLabel}</span>
                    <span className="text-xl sm:text-2xl font-bold whitespace-nowrap">{results.commission.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between items-end gap-2">
                    <span className="text-sm font-light opacity-60 flex items-center gap-2"><Ship className="h-4 w-4 text-primary shrink-0" /> {t.calculator.shippingLabel}</span>
                    <span className="text-xl sm:text-2xl font-bold whitespace-nowrap">{results.shipping.toLocaleString()} FCFA</span>
                </div>
                
                <div className="pt-8 border-t border-background/20 mt-10">
                    <div className="flex flex-col gap-2 bg-background/5 p-6 rounded-[2rem]">
                        <span className="text-sm font-bold uppercase tracking-widest">{t.calculator.totalLabel}</span>
                        <span className="block text-3xl sm:text-4xl lg:text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(30,58,138,0.3)] truncate" title={results.total.toLocaleString() + " FCFA"}>
                            {results.total.toLocaleString()}
                        </span>
                        <span className="text-sm font-bold text-primary ml-1">FCFA</span>
                    </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground font-medium italic px-6">
               {t.calculator.disclaimer}
            </p>

            <Button size="lg" className="w-full rounded-[2.5rem] h-20 text-lg sm:text-xl font-bold group shadow-2xl hover:scale-[1.02] transition-all" onClick={() => scrollTo("contact")}>
              {t.calculator.cta} <ArrowRight className="ms-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
