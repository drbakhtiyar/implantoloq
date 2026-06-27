import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, ChevronRight } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('sinusTitle'),
    description: t('sinusDesc'),
    openGraph: { title: t('sinusTitle'), description: t('sinusDesc'), url: `https://implantoloq.az/${locale}/sinus-lift` },
    alternates: { canonical: `https://implantoloq.az/${locale}/sinus-lift` },
  };
}

export default async function SinusLiftPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sinusLift' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const basePath = `/${locale}`;

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t('whatIsTitle')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">{t('whatIsDesc')}</p>
          <div className="bg-blue-50 border-l-4 border-[#1A9BD7] rounded-r-xl p-6">
            <p className="text-gray-700 font-medium">{t('intro')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t('typesTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0F4C81] text-lg mb-3">{t('type1Title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('type1Desc')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0F4C81] text-lg mb-3">{t('type2Title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('type2Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t('faqTitle')}</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-gray-50 rounded-xl border border-gray-100">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-[#0F4C81] transition-colors">
                  <span>{faq.q}</span>
                  <ChevronRight size={16} className="flex-shrink-0 text-[#1A9BD7] group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0F4C81] to-[#1A9BD7] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-blue-100 mb-8">{t('ctaDesc')}</p>
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
