"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Désactiver sur mobile / tablettes tactiles pour ne pas gêner
    if (window.matchMedia("(pointer: coarse)").matches) return
    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Détecter si l'élément survolé est cliquable
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" || 
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") || target.closest("button")
      
      setIsHovering(!!isClickable)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseover", updateHoverState)
    
    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseover", updateHoverState)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: none; }
          a, button, [role="button"], select, input, textarea { cursor: none !important; }
        }
      `}</style>
      
      {/* Point central ultra rapide */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000]"
        style={{ transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)` }}
      />
      
      {/* Cercle suiveur fluide et flouté (magnetic effect) */}
      <div 
        className={cn(
          "fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9999] transition-all duration-300 ease-out",
          isHovering 
            ? "w-20 h-20 bg-primary/10 backdrop-blur-[2px] -ml-10 -mt-10 scale-110 border-primary" 
            : "w-10 h-10 border-primary/40 -ml-5 -mt-5"
        )}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
    </>
  )
}
