import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Check, Phone, ChevronRight } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('allOn4Title'),
    description: t('allOn4Desc'),
    openGraph: { title: t('allOn4Title'), description: t('allOn4Desc'), url: `https://implantoloq.az/${locale}/all-on-4` },
    alternates: { canonical: `https://implantoloq.az/${locale}/all-on-4` },
  };
}

export default async function AllOn4Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'allOn4' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const basePath = `/${locale}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Səhifə', item: `https://implantoloq.az/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('pageTitle'), item: `https://implantoloq.az/${locale}/all-on-4` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t('faq1Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq1A') } },
      { '@type': 'Question', name: t('faq2Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq2A') } },
      { '@type': 'Question', name: t('faq3Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq3A') } },
    ],
  };

  const candidates = [t('candidate1'), t('candidate2'), t('candidate3'), t('candidate4')];
  const benefits = [t('benefit1'), t('benefit2'), t('benefit3'), t('benefit4'), t('benefit5')];
  const steps = [t('step1'), t('step2'), t('step3'), t('step4'), t('step5'), t('step6')];
  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-200 text-sm mb-6 flex items-center gap-2">
            <Link href={basePath} className="hover:text-white transition-colors">Ana Səhifə</Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('candidatesTitle')}</h2>
              <div className="space-y-3">
                {candidates.map((c) => (
                  <div key={c} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <Check size={16} className="text-[#1A9BD7] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('benefitsTitle')}</h2>
              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">{t('processTitle')}</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 bg-[#0F4C81] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex-1 border border-gray-100">
                  <p className="text-gray-700 text-sm">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t('faqTitle')}</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-xl border border-gray-100">
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
