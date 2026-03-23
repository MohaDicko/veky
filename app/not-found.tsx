import Link from 'next/link'
import { ArrowLeft, PackageOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background noise-texture relative overflow-hidden p-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="glass-morphism p-10 sm:p-20 rounded-[4rem] text-center max-w-3xl w-full relative z-10 flex flex-col items-center shadow-2xl">
        <div className="w-28 h-28 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-10 shadow-inner">
          <PackageOpen className="h-14 w-14" />
        </div>
        
        <h1 className="text-luxury text-[8rem] sm:text-[10rem] font-bold leading-none mb-4 -tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20">
          404
        </h1>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Conteneur introuvable</h2>
        
        <p className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
          Il semble que la page que vous cherchez concernant nos véhicules, lots de cosmétiques ou services d'expédition ait été déplacée ou n'existe plus.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-xl shadow-primary/25"
        >
          <ArrowLeft className="w-6 h-6" />
          Retour au terminal d'accueil
        </Link>
      </div>
    </div>
  )
}
