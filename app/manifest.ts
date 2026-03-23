import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AYA-DIENST | Agents d'Achats Premium en Allemagne",
    short_name: "AYA-DIENST",
    description: "Votre bureau opérationnel à Bielefeld. Import-export premium depuis l'Allemagne vers l'Afrique.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e3a8a",
    orientation: "portrait-primary",
    scope: "/",
    lang: "fr",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "shopping", "logistics"],
    shortcuts: [
      {
        name: "Demander un devis",
        short_name: "Devis",
        description: "Obtenir un devis rapide",
        url: "/#contact",
      },
    ],
  }
}
