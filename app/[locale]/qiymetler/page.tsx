import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, ChevronRight, Info } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('qiymetlerTitle'),
    description: t('qiymetlerDesc'),
    openGraph: { title: t('qiymetlerTitle'), description: t('qiymetlerDesc'), url: `https://implantoloq.az/${locale}/qiymetler` },
    alternates: { canonical: `https://implantoloq.az/${locale}/qiymetler` },
  };
}

export default async function QiymetlerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'qiymetler' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const basePath = `/${locale}`;

  const factors = [
    { title: t('factor1Title'), desc: t('factor1Desc') },
    { title: t('factor2Title'), desc: t('factor2Desc') },
    { title: t('factor3Title'), desc: t('factor3Desc') },
    { title: t('factor4Title'), desc: t('factor4Desc') },
    { title: t('factor5Title'), desc: t('factor5Desc') },
  ];

  return (
    <>
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
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 mb-10">
            <Info size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-800 mb-1">{t('whyNoFixed')}</div>
              <p className="text-amber-700 text-sm leading-relaxed">{t('whyNoFixedDesc')}</p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t('factorsTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {factors.map((f, i) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#0F4C81] text-white rounded-lg flex items-center justify-center font-bold text-sm">{i + 1}</div>
                  <h3 className="font-bold text-gray-900">{f.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-bold text-[#0F4C81] mb-4">{t('consultTitle')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">{t('consultDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+994105010107" className="inline-flex items-center justify-center gap-2 bg-[#0F4C81] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0d3d6b] transition-colors shadow-lg">
                <Phone size={20} />+994 10 501 01 07
              </a>
              <Link href={`${basePath}/randevu`} className="inline-flex items-center justify-center gap-2 border-2 border-[#0F4C81] text-[#0F4C81] px-8 py-4 rounded-xl font-semibold hover:bg-[#0F4C81] hover:text-white transition-colors">
                {tn('randevu')}
              </Link>
            </div>
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
            <a href="https://wa.me/994105010107" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
