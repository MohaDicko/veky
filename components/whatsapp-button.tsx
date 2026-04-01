"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "4917621374833" // Number with country code, no + or spaces
  const defaultMessage = "Bonjour AYA-DIENST ! Je souhaite faire importer un véhicule depuis l'Allemagne."
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-110 active:scale-95 transition-all duration-300"
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      
      {/* Pulse effect */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      
      {/* Optional tooltip bubble */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
        Discutons sur WhatsApp !
        {/* Triangle arrow */}
        <span className="absolute left-full top-1/2 -translate-x-1 -translate-y-1/2 border-8 border-transparent border-l-foreground" />
      </span>
    </a>
  )
}
