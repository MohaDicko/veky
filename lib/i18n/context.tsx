"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, LANGUAGES, type Language, type T } from "./translations"

interface LanguageContextValue {
  lang: Language
  t: T
  setLang: (lang: Language) => void
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  t: translations.fr,
  setLang: () => {},
  dir: "ltr",
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr")

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    if (typeof window !== "undefined") {
      localStorage.setItem("vekyshop-lang", newLang)
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("vekyshop-lang") as Language | null
    if (stored && LANGUAGES.find((l) => l.code === stored)) {
      setLangState(stored)
    }
  }, [])

  const langConfig = LANGUAGES.find((l) => l.code === lang)!
  const dir = langConfig.dir

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang)
    document.documentElement.setAttribute("dir", dir)
  }, [lang, dir])

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
