"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Afficher après 500px de scroll
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retourner en haut de la page"
      className={cn(
        "fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[90]",
        "w-14 h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/25",
        "flex items-center justify-center transition-all duration-500 hover:bg-primary/90 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
