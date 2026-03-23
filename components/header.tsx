"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import { LANGUAGES } from "@/lib/i18n/translations"
import { Globe, ChevronDown } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const { t, lang, setLang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: t.nav.expertise, href: "#services" },
    { name: t.nav.process, href: "#processus" },
    { name: t.nav.sourcing, href: "#produits" },
    { name: t.nav.agency, href: "#apropos" },
    { name: t.nav.contact, href: "#contact" },
  ]

  const currentLang = LANGUAGES.find((l) => l.code === lang)!

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500")}>
      {/* Top info bar */}
      <div className={cn("bg-primary text-white overflow-hidden transition-all duration-500", isScrolled ? "max-h-0 py-0" : "max-h-12 py-2.5")}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Bielefeld Office: Open
            </span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="hidden sm:inline">DE: +49 176 2137 4833</span>
          </div>
          <div className="hidden md:inline">Commission Fixe & Transparente</div>
        </div>
      </div>

      {/* Main nav */}
      <div className={cn("transition-all duration-500 border-b", isScrolled ? "bg-background/80 backdrop-blur-xl border-border/40 py-3 shadow-sm" : "bg-transparent border-transparent py-5")}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 group flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform duration-500">V</div>
              <span className={cn("text-display text-2xl font-bold tracking-tighter transition-colors duration-500", isScrolled ? "text-foreground" : "text-white")}>
                VEKY<span className="text-primary">-</span>SHOP
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden gap-3 items-center">
            {/* Mobile lang switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={cn("flex items-center gap-1 text-sm font-bold px-3 py-2 rounded-xl transition-all", isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10")}
              >
                <span>{currentLang.flag}</span>
                <span className="text-xs">{currentLang.code.toUpperCase()}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border/40 rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[140px]">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false) }}
                      className={cn("w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors", lang === l.code && "bg-primary/10 text-primary font-bold")}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className={cn("-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5", isScrolled ? "text-foreground" : "text-white")}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn("text-sm font-bold uppercase tracking-widest transition-all relative group py-2", isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white")}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </Link>
            ))}
          </div>

          {/* Desktop right: Lang switcher + CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300",
                  isScrolled
                    ? "border-border/40 text-foreground hover:bg-muted"
                    : "border-white/20 text-white hover:bg-white/10"
                )}
              >
                <Globe className="h-4 w-4 opacity-60" />
                <span>{currentLang.flag}</span>
                <span className="text-xs uppercase">{currentLang.code}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", langMenuOpen && "rotate-180")} />
              </button>

              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border/40 rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[160px]">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false) }}
                      className={cn("w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left", lang === l.code && "bg-primary/10 text-primary font-bold")}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#contact">
              <Button className="rounded-full px-8 py-6 h-auto font-bold tracking-widest uppercase text-[10px] bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                {t.nav.cta}
              </Button>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={cn("fixed inset-0 z-50 transition-all duration-500 lg:hidden", mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
        <div className="fixed inset-0 bg-background/97 backdrop-blur-2xl px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-between mb-16">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">V</div>
              <span className="text-display text-2xl font-bold tracking-tighter">VEKY-SHOP</span>
            </Link>
            <button type="button" className="-m-2.5 rounded-xl p-2.5 text-foreground" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="space-y-5">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
                className="block text-4xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors">
                {item.name}
              </Link>
            ))}
            <div className="pt-8">
              <Button className="w-full rounded-2xl h-16 text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.cta}
              </Button>
            </div>
            {/* Mobile lang buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMobileMenuOpen(false) }}
                  className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all", lang === l.code ? "bg-primary text-white border-primary" : "border-border hover:bg-muted")}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
