"use client"

import { ArrowUpRight, CarFront, Wrench, Sparkles, Images, ChevronLeft, ChevronRight, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// @ts-ignore
import { useLanguage } from "@/lib/i18n/context"
import { useEffect, useState, useMemo } from "react"

export function Products() {
  const { t } = useLanguage()
  const [items, setItems] = useState<any[]>([])
  const [filter, setFilter] = useState("car")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  useEffect(() => {
    fetch('/api/catalog')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(console.error)
  }, [])

  const filteredItems = useMemo(() => items.filter(item => item.type === filter), [items, filter])

  const tabs = [
    { id: "car", label: "Voitures", icon: CarFront, title: "Véhicules Sélectionnés" },
    { id: "part", label: "Pièces Détachées", icon: Wrench, title: "Pièces & Outillage" },
    { id: "cosmetic", label: "Lots Grossistes", icon: Sparkles, title: "Parfums & Cosmétiques" },
  ]

  const currentTabInfo = tabs.find(t => t.id === filter)

  return (
    <>
      <section
        id="produits"
        aria-labelledby="products-heading"
        className="py-24 lg:py-40 bg-muted/30 noise-texture overflow-hidden relative"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <header className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-[1px] bg-primary/40" aria-hidden="true" />{t.products.label}
              </p>
              <h2 id="products-heading" className="text-luxury text-5xl sm:text-7xl font-bold text-foreground">
                {currentTabInfo?.title}
              </h2>
            </header>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 border-primary/20 hover:bg-primary hover:text-white transition-all duration-500 group shrink-0"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.products.cta}
              <ArrowUpRight className="ms-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>

          {/* Tabs Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 overflow-x-auto no-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3.5 rounded-[1.5rem] font-bold text-sm transition-all duration-500",
                    filter === tab.id 
                      ? "bg-primary text-white shadow-xl shadow-primary/25 scale-105" 
                      : "bg-white/50 text-foreground border border-black/5 hover:border-primary/30 hover:bg-white"
                  )}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              )
            })}
          </div>

          {/* Grid of items */}
          <ul className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch" role="list">
            {filteredItems.map((item, index) => (
               <ProductCard key={item.id} item={item} index={index} onClick={() => setSelectedItem(item)} />
            ))}
            {filteredItems.length === 0 && (
               <div className="col-span-12 py-20 text-center">
                  <p className="text-muted-foreground font-bold text-lg">Aucune annonce disponible dans cette catégorie pour le moment.</p>
               </div>
            )}
          </ul>
        </div>
      </section>

      {/* Premium Full-Screen Modal */}
      {selectedItem && (
        <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  )
}

function ProductCard({ item, index, onClick }: { item: any, index: number, onClick: () => void }) {
  const [currentImg, setCurrentImg] = useState(0)
  const images = item.images && item.images.length > 0 ? item.images : [item.image]
  const hasMultiple = images.length > 1;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasMultiple) {
      interval = setInterval(() => {}, 3000)
    }
    return () => clearInterval(interval)
  }, [hasMultiple, images.length])

  return (
    <li
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[3rem] cursor-pointer transition-all duration-[1s] ease-out hover:shadow-2xl hover:shadow-primary/10",
        index % 3 === 1 ? "md:col-span-12 lg:col-span-8 aspect-[16/9]" : "md:col-span-12 lg:col-span-4 aspect-[4/5]"
      )}
      onMouseLeave={() => setCurrentImg(0)}
    >
      <div className="absolute inset-0 z-0 bg-slate-900">
        {images.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            alt={`${item.title} - vue ${i + 1}`}
            className={cn(
              "absolute inset-0 object-cover w-full h-full transition-all duration-700 ease-in-out",
              i === currentImg ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
          />
        ))}
      </div>

      {hasMultiple && (
         <div className="absolute top-6 left-6 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white font-bold flex items-center gap-1.5 shadow-sm border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity">
            <Images className="w-3 h-3" /> Galerie ({images.length})
         </div>
      )}

      {hasMultiple && (
        <div className="absolute top-6 inset-x-0 z-30 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-10">
          {images.map((_: any, i: number) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentImg(i) }}
              onMouseEnter={() => setCurrentImg(i)}
              className={cn("h-1.5 rounded-full transition-all duration-300 shadow-sm", 
                 i === currentImg ? "w-8 bg-primary" : "w-2 bg-white/70 hover:bg-white flex-1 max-w-[20px]"
              )}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end z-20">
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
          <div className="flex flex-wrap gap-2 mb-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-white/90 font-bold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
              ⚓ Port: {item.pricePort}
            </p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-primary font-bold bg-white px-3 py-1.5 rounded-full shadow-xl">
              🇲🇱/🇳🇪 Rendu: {item.priceCountry}
            </p>
          </div>
          
          <h3 className="text-luxury text-3xl md:text-3xl font-bold text-white mb-3 drop-shadow-md">{item.title}</h3>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            <p className="text-base text-gray-200 font-light drop-shadow-sm max-w-lg line-clamp-2">
              {item.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-white border border-white/20">
                {item.meta1}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-white border border-white/20">
                {item.meta2}
              </span>
            </div>
          </div>
          
          <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
            <div className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm bg-white text-primary font-bold shadow-xl border border-white/20">
               Découvrir les détails <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function ProductModal({ item, onClose }: { item: any, onClose: () => void }) {
  const images = item.images && item.images.length > 0 ? item.images : [item.image]

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "auto" }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex animate-in fade-in duration-500">
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-3xl" 
        onClick={onClose} 
      />
      
      {/* Close Button Top Right Fixed */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 lg:top-8 lg:right-8 z-[110] w-12 h-12 lg:w-16 lg:h-16 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-full flex items-center justify-center backdrop-blur-md transition-all group border border-border/50"
      >
         <X className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-[1500px] h-full mx-auto flex flex-col md:flex-row overflow-hidden overflow-y-auto md:overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
        
        {/* Left: Scrollable Massive Images (The Gallery) */}
        <div className="w-full md:w-[60%] lg:w-[65%] md:h-full md:overflow-y-auto scroll-smooth flex flex-col md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
           {images.map((img: string, i: number) => (
             <div key={i} className="w-full relative bg-muted/10 min-h-[40vh] md:min-h-screen flex items-center justify-center group overflow-hidden border-b border-border/20 last:border-b-0">
                 <img 
                   src={img} 
                   alt={`${item.title} Vue ${i + 1}`} 
                   className="w-full h-auto min-h-full object-cover transition-transform duration-[2s] hover:scale-105" 
                   loading={i === 0 ? "eager" : "lazy"} 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
             </div>
           ))}
        </div>

        {/* Right: Sticky Details Window */}
        <div className="w-full md:w-[40%] lg:w-[35%] bg-background/80 backdrop-blur-xl p-8 md:p-12 lg:p-16 flex flex-col z-10 shadow-[-30px_0_60px_-15px_rgba(0,0,0,0.15)] border-l border-white/10 md:h-full md:sticky top-0 right-0">
          
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="mb-10">
               <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
                 <span className="w-10 h-px bg-primary/50" />
                 {item.type === "car" ? "Véhicule Premium" : item.type === "part" ? "Pièce Auto" : "Lot Cosmétique"}
               </p>
               <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-8 tracking-tight drop-shadow-sm">{item.title}</h2>
               
               <p className="text-lg text-muted-foreground font-light leading-relaxed">
                 {item.desc}
               </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
               {[
                 { label: item.type === "car" ? "Carburant" : item.type === "part" ? "Compatible" : "Marque", value: item.spec1 || item.meta1 },
                 { label: item.type === "car" ? "Kilométrage" : item.type === "part" ? "État" : "Quantité", value: item.spec2 || item.meta2 },
                 { label: item.type === "car" ? "Année" : item.type === "part" ? "Version" : "Catégorie", value: item.spec3 },
                 { label: item.type === "car" ? "Transmission" : item.type === "part" ? "Poids" : "Conditionnement", value: item.spec4 },
                 { label: item.type === "car" ? "Couleur" : item.type === "part" ? "Référence" : "DLUO", value: item.spec5 },
                 { label: item.type === "car" ? "Moteur" : item.type === "part" ? "Origine" : "Infos", value: item.spec6 },
               ].filter(s => s.value).map((spec, idx) => (
                 <div key={idx} className="p-4 rounded-3xl bg-card border border-border/50 flex flex-col gap-1.5 hover:border-primary/30 transition-colors shadow-sm">
                   <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground font-bold whitespace-nowrap overflow-hidden text-ellipsis">{spec.label}</span>
                   <span className="text-sm sm:text-base font-bold text-foreground leading-tight line-clamp-2" title={spec.value}>{spec.value}</span>
                 </div>
               ))}
            </div>

            {/* Pricing Section Premium */}
            <div className="pt-8 border-t border-border/40 pb-8">
               <div className="space-y-8">
                 <div className="flex justify-between items-end opacity-70">
                   <span className="text-xs font-bold uppercase tracking-widest leading-tight w-1/2">Valeur Nette port<br/>(Dakar / Abidjan)</span>
                   <span className="text-2xl font-medium">{item.pricePort}</span>
                 </div>
                 <div className="flex flex-col gap-3">
                   <span className="text-[10px] bg-primary/10 text-primary self-start px-4 py-2 rounded-full font-bold uppercase tracking-[0.2em]">Tarif Rendu Final (Option Livré Mali/Niger)</span>
                   <span className="text-4xl lg:text-5xl font-black text-foreground drop-shadow-sm truncate" title={item.priceCountry}>{item.priceCountry}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="mt-auto pt-6 bg-background/0 relative z-20">
             <a 
               href={`https://wa.me/4917621374833?text=${encodeURIComponent(`Bonjour AYA-DIENST, cette offre exclusive m'intéresse : ${item.title}. Plus de détails ?`)}`} 
               target="_blank" rel="noopener noreferrer"
               className="w-full flex items-center justify-between px-8 rounded-full h-20 sm:h-24 text-lg sm:text-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-[#25D366]/30 group overflow-hidden relative"
             >
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" /> Discuter de l'offre
                </span>
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500" />
             </a>
             <p className="text-center text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-6 flex justify-center items-center gap-2 opacity-60">
               * Aucun paiement immédiat requis.
             </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}
