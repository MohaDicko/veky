"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/lib/i18n/context"

export function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" })
  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Nouvelle demande d'import : ${formData.email || "Général"}`
    const body = `Contact : ${formData.firstName}\nVille : ${formData.lastName}\nCatégorie : ${formData.email}\nWhatsApp : ${formData.phone}\nBudget : ${formData.service}\n\nCritères & Année : ${formData.message}`
    window.location.href = `mailto:ousmanemahamadtoure@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast.success(t.contact.toastTitle, { description: t.contact.toastDesc })
    setFormData({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" })
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 lg:py-40 bg-background relative overflow-hidden noise-texture"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-[1px] bg-primary/40" />{t.contact.label}
              </p>
              <h2 id="contact-heading" className="text-luxury text-5xl sm:text-7xl font-bold text-foreground">{t.contact.title}</h2>
            </div>

            <div className="space-y-8">
              <a href="mailto:ousmanemahamadtoure@gmail.com" className="flex items-start gap-6 group cursor-pointer">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"><Mail className="h-6 w-6" /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">{t.contact.emailLabel}</p>
                  <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">ousmanemahamadtoure@gmail.com</span>
                </div>
              </a>
              <a href="tel:+4917621374833" className="flex items-start gap-6 group cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded-2xl transition-colors">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm"><Phone className="h-6 w-6" /></div>
                <div className="flex flex-col items-start">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">{t.contact.phoneLabel}</p>
                  <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">+49 176 2137 4833</span>
                  <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full mt-2 group-hover:bg-primary group-hover:text-white transition-colors flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Cliquez pour appeler
                  </span>
                </div>
              </a>
              <a href="tel:+22377157399" className="flex items-start gap-6 group cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded-2xl transition-colors">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm"><Phone className="h-6 w-6" /></div>
                <div className="flex flex-col items-start">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">Contact Mali 🇲🇱</p>
                  <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">+223 77 15 73 99</span>
                  <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full mt-2 group-hover:bg-primary group-hover:text-white transition-colors flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Cliquez pour appeler
                  </span>
                </div>
              </a>
              <div className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"><MapPin className="h-6 w-6" /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">{t.contact.addressLabel}</p>
                  <address className="text-xl font-medium text-foreground not-italic">{t.contact.address}</address>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[3rem] border border-border/40 aspect-[16/10] shadow-2xl">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156555.228515715!2d8.406161494531251!3d52.0116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba3dca7e05e5d9%3A0xe328005370f1a94e!2sBielefeld%2C%20Germany!5e0!3m2!1sen!2sde!4v1710924000000!5m2!1sen!2sde"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="transition-transform duration-[1.5s] group-hover:scale-110" />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-background/20 rounded-[3rem]" />
            </div>

            <div className="p-8 rounded-[2rem] bg-primary text-white space-y-4 shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">{t.contact.statusLabel}</span>
              </div>
              <p className="text-lg font-light leading-snug">{t.contact.statusText}</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="glass-morphism p-8 sm:p-12 rounded-[3.5rem] relative overflow-hidden backdrop-blur-3xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="mb-10">
                <h3 className="text-luxury text-3xl font-bold mb-2">{t.contact.formTitle}</h3>
                <p className="text-muted-foreground font-light">{t.contact.formSubtitle}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary ms-1">{t.contact.firstName}</label>
                    <Input placeholder="Jean Diop" className="rounded-2xl border-border/40 bg-background/50 h-14" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary ms-1">{t.contact.lastName}</label>
                    <Input placeholder="Bamako" className="rounded-2xl border-border/40 bg-background/50 h-14" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary ms-1">{t.contact.email}</label>
                    <Input type="text" placeholder="Mercedes Classe C" className="rounded-2xl border-border/40 bg-background/50 h-14" value={formData.email} onChange={(e) => update("email", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary ms-1">{t.contact.phone}</label>
                    <Input type="tel" placeholder="+223 70 00 00 00" className="rounded-2xl border-border/40 bg-background/50 h-14" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary ms-1">{t.contact.service}</label>
                  <select className="flex h-14 w-full rounded-2xl border border-border/40 bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    value={formData.service} onChange={(e) => update("service", e.target.value)} required>
                    <option value="">{t.contact.serviceDefault}</option>
                    {t.contact.services.map((s, i) => <option key={i} value={t.contact.serviceValues[i]}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary ms-1">{t.contact.message}</label>
                  <Textarea placeholder={t.contact.messagePlaceholder} rows={4} className="rounded-2xl border-border/40 bg-background/50 p-4 resize-none" value={formData.message} onChange={(e) => update("message", e.target.value)} required />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-2xl h-16 text-lg font-bold group bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all">
                  {t.contact.submit} <ArrowRight className="ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
