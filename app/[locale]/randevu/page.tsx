import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, ChevronRight, CheckCircle } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('randevuTitle'),
    description: t('randevuDesc'),
    openGraph: { title: t('randevuTitle'), description: t('randevuDesc'), url: `https://implantoloq.az/${locale}/randevu` },
    alternates: { canonical: `https://implantoloq.az/${locale}/randevu` },
  };
}

export default async function RandevuPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'randevu' });
  const basePath = `/${locale}`;

  const steps = [
    { num: 1, title: t('step1Title') },
    { num: 2, title: t('step2Title') },
    { num: 3, title: t('step3Title') },
  ];

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
          <p className="text-xl text-blue-100 max-w-2xl">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 bg-[#0F4C81] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.num}
                </div>
                <div className="font-semibold text-gray-900">{step.title}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <form className="bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formName')} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formPhone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                      placeholder="+994 XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formEmail')}</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formService')}</label>
                    <select
                      name="service"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    >
                      <option value="">{t('formServiceDefault')}</option>
                      <option value="implant">{t('formService1')}</option>
                      <option value="all-on-4">{t('formService2')}</option>
                      <option value="bone-graft">{t('formService3')}</option>
                      <option value="sinus-lift">{t('formService4')}</option>
                      <option value="sedation">{t('formService5')}</option>
                      <option value="consult">{t('formService6')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formTime')}</label>
                    <select
                      name="time"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all"
                    >
                      <option value="">{t('formTimeDefault')}</option>
                      <option value="morning">{t('formTimeMorning')}</option>
                      <option value="afternoon">{t('formTimeAfternoon')}</option>
                      <option value="evening">{t('formTimeEvening')}</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('formNote')}</label>
                    <textarea
                      name="note"
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1A9BD7] focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0F4C81] hover:bg-[#0d3d6b] text-white py-4 rounded-xl font-bold text-base transition-colors"
                >
                  {t('formSubmit')}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0F4C81] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Zəng edin</h3>
                <a href="tel:+994105010107" className="flex items-center gap-3 text-xl font-bold hover:text-blue-200 transition-colors">
                  <Phone size={22} />
                  +994 10 501 01 07
                </a>
                <p className="text-blue-200 text-sm mt-2">B.e–Cümə: 09:00–19:00</p>
                <p className="text-blue-200 text-sm">Şənbə: 10:00–15:00</p>
              </div>
              <a
                href="https://wa.me/994105010107"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl p-6 font-bold transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('ctaWhatsapp')}
              </a>
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center gap-2 text-[#0F4C81] font-semibold mb-2">
                  <CheckCircle size={18} />
                  Pulsuz Konsultasiya
                </div>
                <p className="text-gray-600 text-sm">İlkin görüşdə KT skan nəticəsinə görə fərdi müalicə planı hazırlanır.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
