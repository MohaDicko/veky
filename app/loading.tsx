"use client"

import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center group">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full w-40 h-40 animate-pulse" />
        <div className="relative w-20 h-20 mb-8 rounded-2xl overflow-hidden bg-white shadow-xl flex items-center justify-center p-2 border border-border/10 transition-transform duration-700 group-hover:scale-110">
          <Image
            src="/logo.png"
            alt="AYA-DIENST Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <Loader2 className="absolute h-16 w-16 text-primary animate-spin opacity-20" />
        <div className="mt-8 text-xs font-bold tracking-[0.4em] uppercase text-primary animate-pulse">
          AYA-DIENST
        </div>
      </div>
    </div>
  )
}
