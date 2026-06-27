import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, ChevronRight } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('sualCavabTitle'),
    description: t('sualCavabDesc'),
    openGraph: { title: t('sualCavabTitle'), description: t('sualCavabDesc'), url: `https://implantoloq.az/${locale}/sual-cavab` },
    alternates: { canonical: `https://implantoloq.az/${locale}/sual-cavab` },
  };
}

export default async function SualCavabPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sualCavab' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const basePath = `/${locale}`;

  const items = t.raw('items') as Array<{ q: string; a: string }>;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-200 text-sm mb-6 flex items-center gap-2">
            <Link href={basePath} className="hover:text-white">Ana Səhifə</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t('heroTitle')}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
          <p className="text-xl text-blue-100 max-w-2xl">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-3">
            {items.map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 shadow-sm">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-[#0F4C81] transition-colors">
                  <span className="pr-4">{item.q}</span>
                  <ChevronRight size={18} className="flex-shrink-0 text-[#1A9BD7] group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0F4C81] to-[#1A9BD7] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Başqa sualınız var?</h2>
          <p className="text-blue-100 mb-8">Bizimlə əlaqə saxlayın. Bütün suallarınızı cavablamağa hazırıq.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+994105010107" className="inline-flex items-center justify-center gap-2 bg-white text-[#0F4C81] px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              <Phone size={20} />+994 10 501 01 07
            </a>
            <Link href={`${basePath}/randevu`} className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors">
              {tn('randevu')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
