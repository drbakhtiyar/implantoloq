import type { MetadataRoute } from 'next';
import { articles } from '@/lib/articles';

const baseUrl = 'https://implantoloq.az';
const locales = ['az', 'ru', 'en'];
const pages = [
  '',
  '/implantasiya',
  '/all-on-4',
  '/sumuk-artirmasi',
  '/sinus-lift',
  '/sedasiya-ile-implant',
  '/haqqimda',
  '/qiymetler',
  '/meqaleler',
  '/sual-cavab',
  '/elaqe',
  '/randevu',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Article pages (az locale only — content is Azerbaijani)
  for (const article of articles) {
    urls.push({
      url: `${baseUrl}/az/meqaleler/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return urls;
}
