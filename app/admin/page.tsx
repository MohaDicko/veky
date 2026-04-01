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
      status: formData.get("status") || "available",
      createdAt: new Date().toISOString()
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
            <p className="text-slate-600">Ajoutez des Voitures, Pièces détachées, ou lots de Cosmétiques (Multi-Photos supportées).</p>
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
          <form onSubmit={handleAdd} className="space-y-8 animate-in fade-in duration-700">
            {/* Informations de base (Communes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {selectedType === "car" ? "Marque & Modèle" : selectedType === "part" ? "Nom de la pièce" : "Nom du produit / lot"}
                </label>
                <Input name="title" required placeholder={selectedType === "car" ? "Ex: Mercedes-Benz GLE 350" : "Ex: Huile Moteur 5W30"} className="h-14 bg-gray-50/80 rounded-2xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Prix au Port (Dakar/Abidjan)
                </label>
                <Input name="pricePort" required placeholder="Ex: 11 000 000 FCFA" className="h-14 bg-gray-50/80 rounded-2xl border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Prix rendu au Pays (Mali/Niger)
                </label>
                <Input name="priceCountry" required placeholder="Ex: 12 100 000 FCFA" className="h-14 bg-primary/[0.03] rounded-2xl border-primary/20 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all font-bold text-primary placeholder:text-primary/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Statut de disponibilité
                </label>
                <select name="status" className="w-full h-14 bg-gray-50/80 rounded-2xl px-4 border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none">
                  <option value="available">✅ En Stock / Disponible</option>
                  <option value="sold">🔴 Vendu / Indisponible</option>
                  <option value="coming_soon">⏳ Arrivage Prochain</option>
                </select>
              </div>
            </div>

            {/* Formulaire spécifique : VOITURES */}
            {selectedType === "car" && (
              <div className="pt-8 mt-8 border-t border-dashed border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  </div>
                  <h3 className="text-xl font-bold">Spécifications du Véhicule</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "spec1", label: "Carburant", placeholder: "Ex: Essence / Hybride", icon: "⛽" },
                    { name: "spec2", label: "Kilométrage", placeholder: "Ex: 45 000 km", icon: "📍" },
                    { name: "spec3", label: "Année / Millésime", placeholder: "Ex: 2022", icon: "📅" },
                    { name: "spec4", label: "Boîte de Vitesse", placeholder: "Ex: Automatique 9G", icon: "⚙️" },
                    { name: "spec5", label: "Couleur Extérieure", placeholder: "Ex: Gris Montagne", icon: "🎨" },
                    { name: "spec6", label: "Moteur / Puissance", placeholder: "Ex: 2.0 L - 194 ch", icon: "⚡" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[11px] uppercase font-bold text-blue-600/70 tracking-wider flex items-center gap-1.5 ml-1">
                        <span>{field.icon}</span> {field.label}
                      </label>
                      <Input name={field.name} required placeholder={field.placeholder} className="h-12 bg-gray-50/50 rounded-xl border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulaire spécifique : PIÈCES */}
            {selectedType === "part" && (
              <div className="pt-8 mt-8 border-t border-dashed border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold">Détails de la Pièce</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "spec1", label: "Compatibilité", placeholder: "Ex: Classe C / E / Sprinter", icon: "🚗" },
                    { name: "spec2", label: "État", placeholder: "Ex: Neuf / Occasion certifiée", icon: "💎" },
                    { name: "spec3", label: "Référence OEM", placeholder: "Ex: A651 911 00 23", icon: "🔢" },
                    { name: "spec4", label: "Poids / Dimension", placeholder: "Ex: 190 kg / Palette", icon: "秤" },
                    { name: "spec5", label: "Marque / Constructeur", placeholder: "Ex: Mercedes-Benz / Bosch", icon: "🏷️" },
                    { name: "spec6", label: "Origine", placeholder: "Ex: Allemagne (Stuttgart)", icon: "📍" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[11px] uppercase font-bold text-orange-600/70 tracking-wider flex items-center gap-1.5 ml-1">
                        <span>{field.icon}</span> {field.label}
                      </label>
                      <Input name={field.name} required placeholder={field.placeholder} className="h-12 bg-gray-50/50 rounded-xl border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulaire spécifique : COSMÉTIQUES */}
            {selectedType === "cosmetic" && (
              <div className="pt-8 mt-8 border-t border-dashed border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.281a2 2 0 01-1.806 0l-.628-.281a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 000 2.828l1.16 1.16a2 2 0 001.022.547l2.387.477a6 6 0 003.86-.517l.628-.281a2 2 0 011.806 0l.628.281a6 6 0 003.86.517l2.387-.477a2 2 0 001.022-.547l1.16-1.16a2 2 0 000-2.828l-1.16-1.16z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold">Détails du Lot Cosmétique</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "spec1", label: "Marque / Gamme", placeholder: "Ex: Balea / Eucerin", icon: "🏷️" },
                    { name: "spec2", label: "Quantité / Volume", placeholder: "Ex: Lot de 500 unités", icon: "📦" },
                    { name: "spec3", label: "Catégorie", placeholder: "Ex: Soins Visage / Hygiène", icon: "✨" },
                    { name: "spec4", label: "Conditionnement", placeholder: "Ex: Cartons scellés / Palette", icon: "🛡️" },
                    { name: "spec5", label: "DLC / DLUO", placeholder: "Ex: Minimum 12 mois", icon: "⏳" },
                    { name: "spec6", label: "Autres Infos", placeholder: "Ex: Mix de produits", icon: "ℹ️" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                       <label className="text-[11px] uppercase font-bold text-pink-600/70 tracking-wider flex items-center gap-1.5 ml-1">
                        <span>{field.icon}</span> {field.label}
                      </label>
                      <Input name={field.name} required placeholder={field.placeholder} className="h-12 bg-gray-50/50 rounded-xl border-none focus-visible:ring-2 focus-visible:ring-pink-500/20 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-dashed border-border pt-8">
              <div className="space-y-4">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <Images className="w-5 h-5 text-primary" /> Téléverser photos réelles
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
                   <div className="h-40 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center bg-gray-50 group-hover:bg-primary/[0.02] group-hover:border-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Images className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-xs font-bold text-gray-900">Glissez-déposez ou cliquez</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Multi-sélection supportée</p>
                   </div>
                </div>

                {previewImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4 max-h-60 overflow-y-auto p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    {previewImages.map((src, idx) => (
                      <div key={idx} className="relative group/preview w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md">
                        <img src={src} className="w-full h-full object-cover transition-transform duration-300 group-hover/preview:scale-110" alt={`Prévisualisation ${idx}`} />
                        <button 
                          type="button" 
                          onClick={() => removeFile(idx)}
                          className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <Images className="w-5 h-5 text-primary" /> Liens photos externes
                </label>
                <textarea  
                  name="images" 
                  placeholder="https://images.unsplash.com/photo-..." 
                  className="w-full h-40 bg-gray-50/50 rounded-3xl p-5 border-none focus:ring-2 focus:ring-primary/20 resize-none text-sm transition-all font-mono placeholder:font-sans" 
                />
              </div>
            </div>

            <div className="space-y-2 border-t border-dashed border-border pt-8">
              <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Courte Description de l'annonce
              </label>
              <Input name="desc" required placeholder={selectedType === "car" ? "Ex: État impeccable, certifié. Volant cuir, toit ouvrant." : "Ex: Lot complet prêt à l'exportation."} className="h-14 bg-gray-50/80 rounded-2xl border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
            </div>

            {/* Message d'erreur */}
            {formError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 animate-in shake duration-300">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm font-bold leading-relaxed">{formError}</p>
              </div>
            )}

            {/* Message de succès */}
            {formSuccess && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 text-green-600 rounded-2xl p-5 animate-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm font-bold leading-relaxed">{formSuccess}</p>
              </div>
            )}

            <Button type="submit" size="lg" disabled={isUploading} className="w-full h-20 text-xl font-black rounded-3xl bg-primary hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] transition-all shadow-xl group">
              {isUploading ? (
                <span className="flex items-center gap-2"><Loader2 className="w-6 h-6 animate-spin" /> Publication en cours...</span>
              ) : (
                <span className="flex items-center gap-3">
                   PUBLIER L'ANNONCE
                   <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              )}
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
                      {item.status === "sold" && <span className="text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-0.5 rounded">Vendu</span>}
                      {item.status === "coming_soon" && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-600 px-2 py-0.5 rounded">Arrivage</span>}
                      <h3 className="font-bold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1 flex items-center gap-2 flex-wrap">
                      <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-lg border border-primary/10">{item.priceCountry}</span>
                      <span className="text-[10px] opacity-30 font-normal">|</span>
                      <span className="opacity-80">{item.spec1 || item.meta1}</span>
                      <span className="text-[10px] opacity-30">•</span>
                      <span className="opacity-80">{item.spec2 || item.meta2}</span>
                      {(item.spec3 || item.spec4) && (
                        <>
                          <span className="text-[10px] opacity-30">•</span>
                          <span className="opacity-60 text-xs">{item.spec3 || item.spec4}</span>
                        </>
                      )}
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
