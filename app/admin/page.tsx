"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Lock, Images } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState("car")

  useEffect(() => {
    if (isAuthenticated) fetchItems()
  }, [isAuthenticated])

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/catalog")
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ token: password })
    })
    
    if (res.ok) {
       setIsAuthenticated(true)
    } else {
       alert("Identifiants incorrects ou accès refusé.")
    }
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Parse les images séparées par un retour à la ligne
    const imagesRaw = formData.get("images") as string
    const imagesList = imagesRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean)

    const newItem = {
      type: selectedType,
      title: formData.get("title"),
      pricePort: formData.get("pricePort"),
      priceCountry: formData.get("priceCountry"),
      // Legacy props fallback
      meta1: formData.get("spec1") || formData.get("meta1"),
      meta2: formData.get("spec2") || formData.get("meta2"),
      // New extended specs
      spec1: formData.get("spec1"),
      spec2: formData.get("spec2"),
      spec3: formData.get("spec3"),
      spec4: formData.get("spec4"),
      spec5: formData.get("spec5"),
      spec6: formData.get("spec6"),
      image: imagesList[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800", // Fallback
      images: imagesList,
      desc: formData.get("desc"),
    }
    
    const res = await fetch("/api/catalog", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${password}`
      },
      body: JSON.stringify(newItem)
    })
    
    if (res.ok) {
      e.currentTarget.reset()
      fetchItems()
    } else {
      alert("Erreur de sécurité : session expirée ou piratage détecté.")
      setIsAuthenticated(false)
    }
  }

  const handleDelete = async (id: string) => {
    if(!window.confirm("Supprimer cette annonce ?")) return;
    const res = await fetch(`/api/catalog?id=${id}`, { 
       method: "DELETE",
       headers: { "Authorization": `Bearer ${password}` }
    })
    if (res.ok) {
       fetchItems()
    } else {
       alert("Action bloquée. Vous n'avez pas les droits.")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Accès Sécurisé</h1>
          <p className="text-muted-foreground mb-8">Veuillez vous identifier pour gérer les annonces.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="text" placeholder="Identifiant" required className="h-14 bg-gray-50/80 rounded-2xl text-center" value={username} onChange={e => setUsername(e.target.value)} />
            <Input type="password" placeholder="Mot de passe" required className="h-14 bg-gray-50/80 rounded-2xl text-center" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-lg font-bold mt-4">Se Connecter</Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 p-8 pt-32 pb-40">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-slate-900">Espace Admin - Catalogue</h1>
            <p className="text-slate-600">Ajoutez des Voitures, Pièces détachées, ou lots de Cosmétiques (Multi-Photos suportées).</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="rounded-xl">Se déconnecter</Button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Ajouter une nouvelle annonce</h2>
            <div className="flex bg-gray-100 p-1 rounded-2xl">
              <button onClick={() => setSelectedType("car")} className={`px-4 py-2 rounded-xl text-sm font-bold ${selectedType === "car" ? "bg-white shadow-sm text-primary" : "text-gray-500"}`}>Voiture</button>
              <button onClick={() => setSelectedType("part")} className={`px-4 py-2 rounded-xl text-sm font-bold ${selectedType === "part" ? "bg-white shadow-sm text-primary" : "text-gray-500"}`}>Pièce</button>
              <button onClick={() => setSelectedType("cosmetic")} className={`px-4 py-2 rounded-xl text-sm font-bold ${selectedType === "cosmetic" ? "bg-white shadow-sm text-primary" : "text-gray-500"}`}>Cosmétique</button>
            </div>
          </div>
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70">Titre ({selectedType === "car" ? "Marque & Modèle" : selectedType === "part" ? "Nom de la pièce" : "Nom du lot"})</label>
                <Input name="title" required placeholder="Ex: Mercedes Classe C" className="h-14 bg-gray-50/80 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70">Prix au Port (Dakar/Abidjan)</label>
                <Input name="pricePort" required placeholder="Ex: 11 000 000 FCFA" className="h-14 bg-gray-50/80 rounded-2xl" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold opacity-70">Prix rendu au Pays (Mali/Niger) - Sera affiché en très grand</label>
                <Input name="priceCountry" required placeholder="Ex: 12 100 000 FCFA" className="h-14 bg-gray-50/80 rounded-2xl border-primary/30" />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border/40">
              <h3 className="text-lg font-bold mb-4">Caractéristiques Détailées</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-primary">{selectedType === "car" ? "Carburant" : selectedType === "part" ? "Marque compatible" : "Marque / Origine"}</label>
                  <Input name="spec1" required placeholder={selectedType === "car" ? "Ex: Essence" : "Ex: Toyota"} className="h-14 bg-gray-50/80 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-primary">{selectedType === "car" ? "Kilométrage" : selectedType === "part" ? "État" : "Quantité"}</label>
                  <Input name="spec2" required placeholder={selectedType === "car" ? "Ex: 65 000 km" : "Ex: Très bon état"} className="h-14 bg-gray-50/80 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-primary">{selectedType === "car" ? "Année / Modèle" : selectedType === "part" ? "Année / Version" : "Catégorie"}</label>
                  <Input name="spec3" placeholder={selectedType === "car" ? "Ex: 2021" : "Ex: Soins Visage"} className="h-14 bg-gray-50/80 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-primary">{selectedType === "car" ? "Transmission" : selectedType === "part" ? "Poids / Dimension" : "Conditionnement"}</label>
                  <Input name="spec4" placeholder={selectedType === "car" ? "Ex: Automatique" : "Ex: Palette"} className="h-14 bg-gray-50/80 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-primary">{selectedType === "car" ? "Couleur" : selectedType === "part" ? "Référence / OEM" : "DLC / DLUO"}</label>
                  <Input name="spec5" placeholder={selectedType === "car" ? "Ex: Noir Métallisé" : "Ex: Non applicable"} className="h-14 bg-gray-50/80 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-primary">{selectedType === "car" ? "Moteur / Puissance" : selectedType === "part" ? "Origine" : "Autre Info"}</label>
                  <Input name="spec6" placeholder={selectedType === "car" ? "Ex: 2.0L - 190ch" : "Ex: Allemagne"} className="h-14 bg-gray-50/80 rounded-xl" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 border-t border-border/40 pt-6">
              <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                <Images className="w-4 h-4" /> URLs des photos (Galerie)
              </label>
              <p className="text-xs text-muted-foreground mb-2">Collez un lien par ligne. La première photo sera l'image d'arriere plan et le reste défilera dans le mode de luxe.</p>
              <textarea  
                name="images" 
                required 
                placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/...&#10;https://images.unsplash.com/..." 
                className="w-full h-32 bg-gray-50/80 rounded-2xl p-4 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70">Courte Description</label>
              <Input name="desc" required placeholder="Ex: État impeccable, certifié. Volant cuir, toit ouvrant." className="h-14 bg-gray-50/80 rounded-2xl" />
            </div>
            <Button type="submit" size="lg" className="w-full h-16 text-lg font-bold rounded-2xl bg-primary">Mettre en ligne sur le site</Button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Catalogue actuel en ligne</h2>
            <span className="bg-primary/10 text-primary font-bold px-5 py-2 rounded-full">{items.length} Annonces</span>
          </div>
          
          {loading ? (
            <p className="text-center py-10 opacity-50 font-bold">Chargement des annonces...</p>
          ) : (
            <div className="space-y-4">
              {items.map((item: any) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 border rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="relative shrink-0">
                    <img src={item.image} alt={item.title} className="w-32 h-20 object-cover rounded-xl shadow-sm" />
                    {item.images && item.images.length > 1 && (
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        +{item.images.length - 1} photos
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded shadow-sm">{item.type}</span>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">
                      {item.pricePort} (Port) / {item.priceCountry} (Pays) - {item.meta1} - {item.meta2}
                    </p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl h-12 w-12 shrink-0 self-end sm:self-center" title="Supprimer">
                    <Trash2 className="h-6 w-6" />
                  </Button>
                </div>
              ))}
              {items.length === 0 && <p className="text-center py-10 opacity-50 font-bold">Aucune annonce actuellement.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
