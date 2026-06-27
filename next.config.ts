import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const config: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/implantoloqa-ne-vaxt-muraciet-etmek-lazimdir',
        destination: '/az/meqaleler/implantoloqa-ne-vaxt-muraciet-etmek-lazimdir',
        permanent: true,
      },
      {
        source: '/implantoloqa-ne-vaxt-muraciet-etmek-lazimdir/',
        destination: '/az/meqaleler/implantoloqa-ne-vaxt-muraciet-etmek-lazimdir',
        permanent: true,
      },
      {
        source: '/dis-implanti-agrilidirmi-emeliyyat-haqqinda-en-cox-verilen-suallar',
        destination: '/az/meqaleler/dis-implanti-agrilidirmi',
        permanent: true,
      },
      {
        source: '/dis-implanti-agrilidirmi-emeliyyat-haqqinda-en-cox-verilen-suallar/',
        destination: '/az/meqaleler/dis-implanti-agrilidirmi',
        permanent: true,
      },
      {
        source: '/implant-nece-il-qalir-implantoloq-meslehet-edir',
        destination: '/az/meqaleler/implant-nece-il-qalir',
        permanent: true,
      },
      {
        source: '/implant-nece-il-qalir-implantoloq-meslehet-edir/',
        destination: '/az/meqaleler/implant-nece-il-qalir',
        permanent: true,
      },
      {
        source: '/bakida-pesekar-agiz-cerrahi',
        destination: '/az/meqaleler/bakida-implantoloq-secimi',
        permanent: true,
      },
      {
        source: '/bakida-pesekar-agiz-cerrahi/',
        destination: '/az/meqaleler/bakida-implantoloq-secimi',
        permanent: true,
      },
      {
        source: '/kateqoriya/meqaleler',
        destination: '/az/meqaleler',
        permanent: true,
      },
      {
        source: '/kateqoriya/meqaleler/',
        destination: '/az/meqaleler',
        permanent: true,
      },
      {
        source: '/fotolar',
        destination: '/az/haqqimda',
        permanent: true,
      },
      {
        source: '/fotolar/',
        destination: '/az/haqqimda',
        permanent: true,
      },
      {
        source: '/haqqimizda',
        destination: '/az/haqqimda',
        permanent: true,
      },
      {
        source: '/haqqimizda/',
        destination: '/az/haqqimda',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
