"use client"

import { ArrowUpRight, CarFront, Wrench, Sparkles, Images, ChevronLeft, ChevronRight, X, MessageCircle, ShieldCheck, Truck } from "lucide-react"
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
    fetch('/api/catalog?t=' + Date.now(), { cache: 'no-store' })
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
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" role="list">
            {filteredItems.map((item, index) => (
               <ProductCard key={item.id} item={item} index={index} onClick={() => setSelectedItem(item)} />
            ))}
            {filteredItems.length === 0 && (
               <div className="col-span-full py-20 text-center">
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
      className="group relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 aspect-[4/3]"
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
  const [current, setCurrent] = useState(0)

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "auto" }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center bg-black/60 backdrop-blur-sm p-0 sm:p-6 lg:p-12 animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Container - Leboncoin/Avito Style */}
      <div className="relative w-full max-w-[1200px] bg-background sm:rounded-[2rem] shadow-2xl flex flex-col max-h-[95vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-500 overflow-hidden ring-1 ring-border/20">
        
        {/* Header - Sticky */}
        <div className="flex justify-between items-center p-4 sm:px-8 sm:py-5 border-b border-border/40 sticky top-0 bg-background/90 backdrop-blur-md z-20">
           <h3 className="font-bold text-lg sm:text-xl text-foreground truncate max-w-[80%]">{item.title}</h3>
           <button onClick={onClose} className="w-10 h-10 bg-muted hover:bg-muted-foreground/20 rounded-full flex items-center justify-center transition-colors"><X className="w-5 h-5"/></button>
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col lg:flex-row overflow-y-auto w-full hide-scrollbar">
          
          {/* LEFT: Gallery, Critères, Description */}
          <div className="w-full lg:w-[65%] p-4 sm:p-8 border-r border-border/40 flex flex-col gap-10">
             
             {/* Galerie */}
             <div>
               {/* Main Image */}
               <div className="relative w-full aspect-[4/3] sm:aspect-video bg-background rounded-2xl overflow-hidden group border border-border/40 flex items-center justify-center">
                  <img src={images[current]} className="w-full h-full object-cover lg:object-contain bg-background" alt={item.title} />
                  {images.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setCurrent(p => p===0 ? images.length-1 : p-1) }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"><ChevronLeft /></button>
                      <button onClick={(e) => { e.stopPropagation(); setCurrent(p => (p+1)%images.length) }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"><ChevronRight /></button>
                    </>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                    {current + 1} / {images.length}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md">
                      {item.type === "car" ? "Automobile" : item.type === "part" ? "Pièce / Moteur" : "Lot Cosmétique"}
                    </span>
                  </div>
               </div>

               {/* Thumbnails */}
               {images.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                     {images.map((img: string, i: number) => (
                        <button key={i} onClick={() => setCurrent(i)} className={cn("relative h-20 sm:h-24 aspect-[4/3] flex-shrink-0 border-2 rounded-xl overflow-hidden snap-start transition-all bg-muted", current === i ? "border-primary shadow-sm" : "border-transparent opacity-60 hover:opacity-100")}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               )}
             </div>

             <div className="h-px bg-border/40 w-full" />

             {/* Critères / Specs (Avito Grid style) */}
             <div>
                <h4 className="text-2xl font-black mb-6 text-foreground">Critères de l'annonce</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-border/60 rounded-2xl overflow-hidden shadow-sm">
                   {[
                     { label: item.type === "car" ? "Carburant" : item.type === "part" ? "Compatible" : "Marque", value: item.spec1 || item.meta1 },
                     { label: item.type === "car" ? "Kilométrage" : item.type === "part" ? "État" : "Quantité", value: item.spec2 || item.meta2 },
                     { label: item.type === "car" ? "Année-Modèle" : item.type === "part" ? "Version" : "Catégorie", value: item.spec3 },
                     { label: item.type === "car" ? "Boîte de vitesse" : item.type === "part" ? "Poids (kg)" : "Format", value: item.spec4 },
                     { label: item.type === "car" ? "Teinte / Couleur" : item.type === "part" ? "Réf. OEM" : "DLUO Maxi", value: item.spec5 },
                     { label: item.type === "car" ? "Motorisation" : item.type === "part" ? "Fabriquant" : "Informations", value: item.spec6 },
                   ].map((spec, idx) => spec.value ? (
                     <div key={idx} className="flex flex-col border-b border-r border-border/60 p-4 sm:p-5 bg-card hover:bg-muted/30 transition-colors">
                       <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-80">{spec.label}</span>
                       <span className="text-sm sm:text-base font-bold text-foreground mt-1 break-words">{spec.value}</span>
                     </div>
                   ) : null)}
                </div>
             </div>

             <div className="h-px bg-border/40 w-full" />

             {/* Description */}
             <div className="mb-10 lg:mb-0">
                <h4 className="text-2xl font-black mb-6 text-foreground">Description détaillée</h4>
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-base sm:text-lg bg-muted/10 p-6 rounded-2xl border border-border/40">{item.desc}</p>
             </div>
          </div>

          {/* RIGHT: Price & Contact Action Box (Sticky on Desktop layout) */}
          <div className="w-full lg:w-[35%] bg-muted/10 p-4 sm:p-8 flex flex-col border-l border-white/5">
             <div className="bg-background rounded-3xl p-6 sm:p-8 shadow-xl border border-border/60 lg:sticky top-8">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Référence AYA-{item.id?.slice(-6) || "XXX"}</p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-8 leading-tight">{item.title}</h2>
                
                <div className="space-y-4 mb-8 bg-card rounded-2xl border border-border/50 overflow-hidden divide-y divide-border/50 shadow-sm">
                   <div className="p-5 flex flex-col bg-muted/30">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center justify-between">
                         Valeur Port (Dakar/Abidjan)
                         <span className="bg-foreground/10 px-2 py-0.5 rounded text-[9px]">HT</span>
                      </span>
                      <span className="text-xl font-bold text-foreground/80">{item.pricePort}</span>
                   </div>
                   <div className="p-6 sm:p-8 bg-primary/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
                      <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em] block mb-2 relative z-10">Option Tarif Rendu (Mali/Niger)</span>
                      <span className="text-3xl sm:text-4xl font-black text-primary relative z-10 leading-none">{item.priceCountry}</span>
                   </div>
                </div>

                <a 
                  href={`https://wa.me/4917621374833?text=${encodeURIComponent(`Bonjour AYA-DIENST, je vous contacte pour cette annonce : ${item.title} (Réf AYA-${item.id?.slice(-6) || "XXX"}). Pouvez-vous me donner la procédure d'achat ?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 rounded-2xl h-16 sm:h-[72px] text-lg bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all hover:scale-[1.02] shadow-[0_10px_30px_-10px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle className="w-6 h-6"/> Discuter via WhatsApp
                </a>

                <div className="mt-8 pt-6 border-t border-border/40 flex flex-col gap-4 text-xs font-bold text-foreground/70 uppercase tracking-widest">
                   <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-primary shrink-0"/> Inspection physique avant achat</div>
                   <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-primary shrink-0"/> Fret maritime via Anvers contrôlé</div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
