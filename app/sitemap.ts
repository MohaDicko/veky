import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://veky-shop.com"
  const lastModified = new Date()

  const routes = [
    { url: baseUrl, changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${baseUrl}/#services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/#processus`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/#produits`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/#apropos`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/#faq`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/#contact`, changeFrequency: "monthly" as const, priority: 0.9 },
  ]

  return routes.map((route) => ({
    ...route,
    lastModified,
  }))
}
