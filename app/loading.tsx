"use client"

import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center group">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full w-40 h-40 animate-pulse" />
        <Loader2 className="absolute h-12 w-12 text-primary animate-spin" />
        <div className="mt-32 text-xs font-bold tracking-[0.4em] uppercase text-primary animate-pulse">
          Veky-Shop
        </div>
      </div>
    </div>
  )
}
