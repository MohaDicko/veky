"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Preloader() {
  const [loading, setLoading] = useState(true)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animation de la barre
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 30)

    // Splash screen minimaliste (1.8s)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (!loading) return null

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-1000",
      loading ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
       <div className="flex flex-col items-center gap-6 animate-pulse">
         <img src="/logo.png" className="w-24 h-24 object-contain drop-shadow-2xl" alt="AYA-DIENST Logo" />
         <h1 className="text-4xl font-black tracking-tighter drop-shadow-md">AYA-DIENST</h1>
       </div>
       <div className="mt-12 w-64 h-[2px] bg-muted overflow-hidden rounded-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 ease-linear" 
            style={{ width: `${progress}%` }}
          />
       </div>
    </div>
  )
}
