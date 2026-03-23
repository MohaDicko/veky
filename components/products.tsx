"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

const images = [
  { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800", alt: "Lots de parfumerie et cosmétiques Allemagne — Balea, Nivea, Eucerin" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800", alt: "Véhicules sélectionnés sur Mobile.de — importation depuis l'Allemagne" },
  { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800", alt: "Outillage et pièces mécaniques industrielles Bosch et Makita" },
]

export function Products() {
  const { t } = useLanguage()

  return (
    <section
      id="produits"
      aria-labelledby="products-heading"
      className="py-24 lg:py-40 bg-muted/30 noise-texture overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <header className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-primary/40" aria-hidden="true" />{t.products.label}
            </p>
            <h2 id="products-heading" className="text-luxury text-5xl sm:text-7xl font-bold text-foreground">
              {t.products.title}
            </h2>
          </header>
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-primary/20 hover:bg-primary hover:text-white transition-all duration-500 group"
            aria-label={`${t.products.cta} — produits depuis l'Allemagne`}
          >
            {t.products.cta}
            <ArrowUpRight className="ms-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </Button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch" role="list">
          {t.products.items.map((product, index) => (
            <li
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-[3rem] cursor-pointer transition-all duration-[1s] ease-out",
                index === 1 ? "md:col-span-12 lg:col-span-8 aspect-[16/9]" : "md:col-span-12 lg:col-span-4 aspect-[4/5]"
              )}
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  priority={index === 1}
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                aria-hidden="true"
              />

              {/* Text */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">{product.subtitle}</p>
                  <h3 className="text-luxury text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h3>
                  <p className="text-lg text-muted-foreground font-light max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {product.desc}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
