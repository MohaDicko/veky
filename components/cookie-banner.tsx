"use client"

import { useState, useEffect } from "react"
import { X, Cookie, Shield, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("vekyshop-cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = (all = true) => {
    localStorage.setItem("vekyshop-cookie-consent", all ? "all" : "essential")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className={cn(
        "fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100]",
        "bg-background border border-border/60 rounded-[2rem] shadow-2xl shadow-black/10 p-6",
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      {/* Close */}
      <button
        onClick={() => accept(false)}
        className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        aria-label="Fermer — Refuser les cookies non essentiels"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Cookie className="h-5 w-5" />
        </div>
        <div>
          <h2 id="cookie-title" className="font-bold text-foreground text-base mb-1">
            Vos préférences de confidentialité
          </h2>
          <p id="cookie-desc" className="text-sm text-muted-foreground leading-relaxed">
            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic, conformément au{" "}
            <strong>RGPD</strong> et à la directive ePrivacy.
          </p>
        </div>
      </div>

      {/* Details toggle */}
      {showDetails && (
        <div className="mb-4 space-y-2 p-4 rounded-2xl bg-muted/40 border border-border/40">
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span><strong>Essentiels</strong> — langue, préférences. Toujours actifs.</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <BarChart2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <span><strong>Analytiques</strong> — Vercel Analytics, mesure d'audience anonymisée.</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4 mb-5 transition-colors block"
        aria-expanded={showDetails}
      >
        {showDetails ? "Masquer les détails" : "Voir les détails des cookies"}
      </button>

      <div className="flex gap-3">
        <button
          onClick={() => accept(false)}
          className="flex-1 h-11 rounded-xl border border-border/60 text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-foreground transition-all"
        >
          Essentiels seulement
        </button>
        <button
          onClick={() => accept(true)}
          className="flex-1 h-11 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
        >
          Tout accepter
        </button>
      </div>

      <p className="text-[10px] text-muted-foreground/60 text-center mt-4">
        En continuant à naviguer, vous acceptez nos cookies essentiels.{" "}
        <a href="#" className="underline hover:text-primary transition-colors">Politique de confidentialité</a>
      </p>
    </div>
  )
}
