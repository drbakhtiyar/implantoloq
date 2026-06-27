import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://implantoloq.az/sitemap.xml',
    host: 'https://implantoloq.az',
  };
}
