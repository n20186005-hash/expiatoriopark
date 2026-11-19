import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/site';
import { nearbyPlaces } from '@/lib/nearby';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en', 'es'];
  const routes = ['', '/estacionamiento-expiatorio', ...Object.keys(nearbyPlaces).map(slug => `/nearby/${slug}`)];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
      });
    }
  }

  return sitemap;
}
