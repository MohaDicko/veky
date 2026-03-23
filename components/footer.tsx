"use client"

import Link from "next/link"
import { ArrowUpRight, Instagram, Linkedin, Facebook, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const navLinks = {
  services: [
    { name: "Sourcing Véhicules", href: "#" },
    { name: "Lots Cosmétiques", href: "#" },
    { name: "Expédition Maritime", href: "#" },
    { name: "Pièces Bosch/Makita", href: "#" },
    { name: "Logistique Transit", href: "#" },
  ],
  company: [
    { name: "L'Agence", href: "#apropos" },
    { name: "Expertise Bielefeld", href: "#" },
    { name: "Calculateur Douane", href: "#" },
    { name: "Presse & Médias", href: "#" },
  ],
  support: [
    { name: "Demande Contact", href: "#contact" },
    { name: "Zones Desservies", href: "#" },
    { name: "Service Client", href: "#" },
    { name: "FAQ", href: "#faq" },
  ],
  legal: [
    { name: "Mentions légales", href: "/legal#mentions" },
    { name: "Vie Privée", href: "/legal#privacy" },
    { name: "CGV & Transit", href: "/legal#cgv" },
  ],
  social: [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/4917621374833" },
  ],
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-white pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 pointer-events-none select-none translate-y-[-20%] translate-x-[10%] opacity-[0.03]" aria-hidden="true">
        <span className="text-luxury text-[40vw] font-bold leading-none tracking-tighter">AYA</span>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pb-24 border-b border-white/10 mb-24">
          <div className="max-w-xl">
            <h2 className="text-luxury text-5xl sm:text-7xl font-bold leading-none mb-8">{t.footer.ctaTitle}</h2>
            <p className="text-xl text-white/50 font-light leading-relaxed">{t.footer.ctaSubtitle}</p>
          </div>
          <Link href="#contact" className="group inline-flex items-center gap-6 px-12 py-8 rounded-full bg-white text-primary text-2xl font-bold hover:bg-white/90 transition-all hover:scale-105">
            {t.footer.ctaBtn} <ArrowUpRight className="h-8 w-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">
          <div className="col-span-2 lg:col-span-1 space-y-10">
            <Link href="/" className="inline-block">
              <span className="text-luxury text-4xl font-bold tracking-tighter">AYA<span className="text-accent">-</span>DIENST</span>
            </Link>
            <div className="space-y-4">
              <p className="text-xl font-light text-white/60">{t.footer.tagline}</p>
              <div className="flex gap-4">
                {navLinks.social.map((item) => (
                  <Link key={item.name} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label={item.name}>
                    <item.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white/40">{t.footer.servicesTitle}</h3>
            <ul className="space-y-5">
              {navLinks.services.map((item) => (
                <li key={item.name}><Link href={item.href} className="text-xl font-light text-white/70 hover:text-white transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white/40">{t.footer.agencyTitle}</h3>
            <ul className="space-y-5">
              {navLinks.company.map((item) => (
                <li key={item.name}><Link href={item.href} className="text-xl font-light text-white/70 hover:text-white transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white/40">{t.footer.helpTitle}</h3>
            <ul className="space-y-5">
              {navLinks.support.map((item) => (
                <li key={item.name}><Link href={item.href} className="text-xl font-light text-white/70 hover:text-white transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <p className="text-xs text-white/30 font-medium tracking-widest uppercase">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <p className="text-xs text-white/20 font-medium tracking-widest uppercase">
              Designed by <a href="https://sahelmultiservices.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-colors font-bold">SAHEL MULTISERVICES</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {navLinks.legal.map((item) => (
              <Link key={item.name} href={item.href} className="text-xs text-white/30 font-medium uppercase tracking-widest hover:text-white transition-colors">{item.name}</Link>
            ))}
            {/* Le lien Admin discret */}
            <Link href="/admin" className="text-xs text-white/10 font-medium uppercase tracking-widest hover:text-white/30 transition-colors">Portail Interne</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
