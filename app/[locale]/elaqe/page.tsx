import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, MapPin, Mail, Clock, ChevronRight } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('elaqeTitle'),
    description: t('elaqeDesc'),
    openGraph: { title: t('elaqeTitle'), description: t('elaqeDesc'), url: `https://implantoloq.az/${locale}/elaqe` },
    alternates: { canonical: `https://implantoloq.az/${locale}/elaqe` },
  };
}

export default async function ElaqePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'elaqe' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const basePath = `/${locale}`;

  return (
    <>
      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-200 text-sm mb-6 flex items-center gap-2">
            <Link href={basePath} className="hover:text-white">Ana Səhifə</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t('heroTitle')}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
          <p className="text-xl text-blue-100">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Əlaqə Məlumatları</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-[#0F4C81]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">{t('phone')}</div>
                    <a href="tel:+994105010107" className="text-xl font-bold text-[#0F4C81] hover:underline">{t('phoneValue')}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-[#0F4C81]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">{t('address')}</div>
                    <div className="font-bold text-gray-900">{t('addressValue')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-[#0F4C81]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">{t('hours')}</div>
                    <div className="font-medium text-gray-900">{t('hoursWeekday')}</div>
                    <div className="font-medium text-gray-900">{t('hoursSaturday')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-[#0F4C81]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">{t('email')}</div>
                    <a href={`mailto:${t('emailValue')}`} className="font-bold text-[#0F4C81] hover:underline">{t('emailValue')}</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-6 flex gap-4">
                <a href="tel:+994105010107" className="flex-1 flex items-center justify-center gap-2 bg-[#0F4C81] text-white py-3 rounded-xl font-semibold hover:bg-[#0d3d6b] transition-colors text-sm">
                  <Phone size={16} />Zəng et
                </a>
                <a href="https://wa.me/994105010107" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('formTitle')}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formName')}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formPhone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    placeholder="+994 XX XXX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formEmail')}</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formMessage')}</label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all resize-none"
                    placeholder="Mesajınızı yazın..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0F4C81] hover:bg-[#0d3d6b] text-white py-4 rounded-xl font-bold text-base transition-colors"
                >
                  {t('formSubmit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-0">
        <div className="bg-gray-100 h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={40} className="text-[#0F4C81] mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Babək Plaza, Bakı, AZ1025</p>
            <a
              href="https://maps.google.com/?q=Babek+Plaza+Baku+Azerbaijan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[#1A9BD7] font-semibold hover:underline"
            >
              Google Maps-da Aç →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
