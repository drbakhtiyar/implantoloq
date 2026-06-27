import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const alternates: Record<string, string> = {
    'az': `https://implantoloq.az/az`,
    'ru': `https://implantoloq.az/ru`,
    'en': `https://implantoloq.az/en`,
  };

  return {
    title: {
      default: t('homeTitle'),
      template: '%s',
    },
    description: t('homeDesc'),
    alternates: {
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      locale: locale,
      siteName: 'İmplantoloq.az',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'MedicalClinic', 'LocalBusiness'],
  name: 'İmplantoloq.az',
  description: 'Bakıda peşəkar diş implantasiyası klinikası',
  url: 'https://implantoloq.az',
  telephone: '+994105010107',
  email: 'info@smilebydrbakhtiyar.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Babək Plaza',
    addressLocality: 'Bakı',
    postalCode: 'AZ1025',
    addressCountry: 'AZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.4093',
    longitude: '49.8671',
  },
  openingHours: ['Mo-Fr 09:00-19:00', 'Sa 10:00-15:00'],
  priceRange: '$$',
  medicalSpecialty: 'Dentistry',
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="az" href={`https://implantoloq.az/az`} />
        <link rel="alternate" hrefLang="ru" href={`https://implantoloq.az/ru`} />
        <link rel="alternate" hrefLang="en" href={`https://implantoloq.az/en`} />
        <link rel="alternate" hrefLang="x-default" href={`https://implantoloq.az/az`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
