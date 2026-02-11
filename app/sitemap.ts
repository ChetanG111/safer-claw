import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils/urls' // Corrected import path

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const locales = ['en', 'es', 'fr'] // Supported locales

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    sitemapEntries.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/terms`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    )
  })

  return sitemapEntries
}
