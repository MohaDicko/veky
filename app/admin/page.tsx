"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Lock, Images, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // Stocker le mot de passe dans un ref pour qu'il persiste après le login
  const savedPassword = useRef("")

  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedType, setSelectedType] = useState("car")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) fetchItems()
  }, [isAuthenticated])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/catalog?t=' + Date.now(), { cache: 'no-store' })
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    
    if (res.ok) {
       // ✅ Mémoriser le mot de passe dans le ref avant de réinitialiser les states
       savedPassword.current = password
       setIsAuthenticated(true)
    } else {
       setFormError("Identifiants incorrects ou accès refusé.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...filesArray])
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file))
      setPreviewImages(prev => [...prev, ...newPreviews])
    }
  }

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewImages[index])
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)
    const form = e.currentTarget
    setIsUploading(true)
    const formData = new FormData(form)
    
    let uploadedUrls: string[] = []
    
    if (selectedFiles.length > 0) {
      const uploadFormData = new FormData()
      selectedFiles.forEach(file => {
        uploadFormData.append('files', file)
      })
      
      try {
        // ✅ Utiliser savedPassword.current (le ref) pour l'authentification
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Authorization": `Bearer ${savedPassword.current}` },
          body: uploadFormData
        })
        
        if (uploadRes.ok) {
          const data = await uploadRes.json()
          uploadedUrls = data.urls
        } else {
          const errData = await uploadRes.text()
          setFormError(`Erreur upload images (${uploadRes.status}): ${errData}`)
          setIsUploading(false)
          return
        }
      } catch (err) {
        setFormError("Erreur réseau lors du téléversement. Vérifiez votre connexion.")
        setIsUploading(false)
        return
      }
    }

    // Parse les images séparées par un retour à la ligne
    const imagesRaw = formData.get("images") as string
    const manualUrls = imagesRaw ? imagesRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean) : []
    
    const imagesList = [...uploadedUrls, ...manualUrls]

    if (imagesList.length === 0) {
      setFormError("Veuillez ajouter au moins une photo (téléversement ou lien URL).")
      setIsUploading(false)
      return
    }

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
      image: imagesList[0],
      images: imagesList,
      desc: formData.get("desc"),
    }
    
    // ✅ Utiliser savedPassword.current ici aussi
    const res = await fetch("/api/catalog", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${savedPassword.current}`
      },
      body: JSON.stringify(newItem)
    })
    
    setIsUploading(false)
    if (res.ok) {
      form.reset()
      setSelectedFiles([])
      setPreviewImages([])
      setFormSuccess(`✅ Annonce "${newItem.title}" mise en ligne avec succès !`)
      fetchItems()
    } else {
      const errData = await res.json().catch(() => ({ error: "Réponse non-JSON" }))
      setFormError(`Erreur API (${res.status}): ${errData.error || "Impossible d'ajouter l'annonce."}`)
    }
  }

  const handleDelete = async (id: string) => {
    if(!window.confirm("Supprimer cette annonce ?")) return;
    setFormError(null)
    setFormSuccess(null)
    
    // ✅ Utiliser savedPassword.current ici aussi
    const res = await fetch(`/api/catalog?id=${id}`, { 
       method: "DELETE",
       headers: { "Authorization": `Bearer ${savedPassword.current}` }
    })
    
    if (res.ok) {
       setFormSuccess("✅ Annonce supprimée avec succès !")
       fetchItems()
    } else {
       const errData = await res.json().catch(() => ({ error: "Impossible de lire la réponse serveur" }))
       setFormError(`Suppression échouée (${res.status}): ${errData.error || "Droits d'accès insuffisants ou erreur serveur."}`)
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-border/40 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <Images className="w-4 h-4" /> Téléverser photos réelles
                </label>
                <div className="relative group">
                   <input 
                    type="file" 
                    name="fileUpload" 
                    multiple 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   />
                   <div className="h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 group-hover:border-primary/30 transition-all">
                      <Images className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                      <p className="text-xs font-bold text-gray-500 group-hover:text-primary">Ajouter des photos</p>
                      <p className="text-[10px] text-gray-400 mt-1">Multi-sélection supportée</p>
                   </div>
                </div>

                {previewImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-100">
                    {previewImages.map((src, idx) => (
                      <div key={idx} className="relative group/preview w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img src={src} className="w-full h-full object-cover" alt={`Prévisualisation ${idx}`} />
                        <button 
                          type="button" 
                          onClick={() => removeFile(idx)}
                          className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <Images className="w-4 h-4" /> Ou liens photos externes
                </label>
                <textarea  
                  name="images" 
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full h-32 bg-gray-50/80 rounded-2xl p-4 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70">Courte Description</label>
              <Input name="desc" required placeholder="Ex: État impeccable, certifié. Volant cuir, toit ouvrant." className="h-14 bg-gray-50/80 rounded-2xl" />
            </div>

            {/* Bandeau d'erreur */}
            {formError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">{formError}</p>
              </div>
            )}

            {/* Bandeau de succès */}
            {formSuccess && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">{formSuccess}</p>
              </div>
            )}

            <Button type="submit" size="lg" disabled={isUploading} className="w-full h-16 text-lg font-bold rounded-2xl bg-primary">
              {isUploading ? (
                <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Téléversement en cours...</span>
              ) : "Mettre en ligne sur le site"}
            </Button>
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
