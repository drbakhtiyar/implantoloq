import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Shield, Star, Award, Check, Phone, ChevronRight, Users, Zap, Globe
} from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('homeTitle'),
    description: t('homeDesc'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDesc'),
      url: `https://implantoloq.az/${locale}`,
    },
  };
}

function BrandsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const brands = [
    { name: t('brand1Name'), country: t('brand1Country'), desc: t('brand1Desc'), flag: '🇩🇪' },
    { name: t('brand2Name'), country: t('brand2Country'), desc: t('brand2Desc'), flag: '🇨🇭' },
    { name: t('brand3Name'), country: t('brand3Country'), desc: t('brand3Desc'), flag: '🇰🇷' },
    { name: t('brand4Name'), country: t('brand4Country'), desc: t('brand4Desc'), flag: '🇰🇷' },
    { name: t('brand5Name'), country: t('brand5Country'), desc: t('brand5Desc'), flag: '🇰🇷' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {brands.map((b) => (
        <div key={b.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl mb-2">{b.flag}</div>
          <div className="font-bold text-[#0F4C81] text-sm mb-1">{b.name}</div>
          <div className="text-xs text-gray-500 mb-2">{b.country}</div>
          <div className="text-xs text-gray-600">{b.desc}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  const basePath = `/${locale}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'MedicalClinic'],
    name: 'İmplantoloq.az',
    url: 'https://implantoloq.az',
    telephone: '+994105010107',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Babək Plaza',
      addressLocality: 'Bakı',
      postalCode: 'AZ1025',
      addressCountry: 'AZ',
    },
    openingHours: ['Mo-Fr 09:00-19:00', 'Sa 10:00-15:00'],
  };

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Bakhtiyar Aliyev',
    medicalSpecialty: 'Dentistry',
    worksFor: { '@type': 'MedicalClinic', name: 'İmplantoloq.az' },
    alumniOf: 'Azerbaijan Medical University',
    hasCredential: ['ITI', 'EAO', 'Nobel Biocare'],
  };

  const services = [
    { href: `${basePath}/implantasiya`, name: t('service1Name'), desc: t('service1Desc'), icon: '🦷' },
    { href: `${basePath}/all-on-4`, name: t('service2Name'), desc: t('service2Desc'), icon: '✨' },
    { href: `${basePath}/sumuk-artirmasi`, name: t('service3Name'), desc: t('service3Desc'), icon: '🦴' },
    { href: `${basePath}/sinus-lift`, name: t('service4Name'), desc: t('service4Desc'), icon: '🔬' },
    { href: `${basePath}/sedasiya-ile-implant`, name: t('service5Name'), desc: t('service5Desc'), icon: '💊' },
    { href: `${basePath}/implantasiya`, name: t('service6Name'), desc: t('service6Desc'), icon: '🖥️' },
  ];

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  const whyUs = [
    { icon: <Award className="w-7 h-7 text-[#1A9BD7]" />, title: t('why1Title'), desc: t('why1Desc') },
    { icon: <Globe className="w-7 h-7 text-[#1A9BD7]" />, title: t('why2Title'), desc: t('why2Desc') },
    { icon: <Zap className="w-7 h-7 text-[#1A9BD7]" />, title: t('why3Title'), desc: t('why3Desc') },
    { icon: <Shield className="w-7 h-7 text-[#1A9BD7]" />, title: t('why4Title'), desc: t('why4Desc') },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
  ];

  const credentials = [
    t('aboutCred1'), t('aboutCred2'), t('aboutCred3'), t('aboutCred4'), t('aboutCred5'),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] via-[#0d3d6b] to-[#062947] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#1A9BD7] rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-100 mb-6">
              <Star size={14} className="text-yellow-400" />
              Bakı, Azərbaycan — 2009–{new Date().getFullYear()}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-2xl">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${basePath}/randevu`}
                className="inline-flex items-center justify-center gap-2 bg-[#1A9BD7] hover:bg-[#158ab8] text-white px-7 py-4 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Phone size={18} />
                {t('heroCta1')}
              </Link>
              <Link
                href={`${basePath}/implantasiya`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-4 rounded-xl text-base font-semibold transition-all backdrop-blur-sm"
              >
                {t('heroCta2')}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#0F4C81] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Intro */}
      {locale === 'az' && (
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              İmplantoloq.az diş implantasiyası sahəsində ixtisaslaşmış implantoloq tərəfindən
              təqdim olunan məlumat və xidmətləri əhatə edir. Məqsədimiz hər bir pasiyentə fərdi
              yanaşma göstərərək sağlam və estetik nəticə əldə etməkdir. Əgər siz Bakıda implantoloq
              axtarırsınızsa, burada peşəkar yanaşma və etibarlı müalicə prosesi ilə tanış ola
              bilərsiniz. Müasir texnologiyalar və təcrübəli implantoloq yanaşması sayəsində
              uzunmüddətli və keyfiyyətli nəticə əldə etmək mümkündür.
            </p>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('servicesTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('servicesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1A9BD7]/30 transition-all group"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#0F4C81] transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex items-center gap-1 text-[#1A9BD7] text-sm font-semibold">
                  <span>Ətraflı →</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Doctor */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-full max-w-sm mx-auto lg:mx-0 bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] rounded-3xl aspect-[4/5] flex items-center justify-center shadow-2xl">
                <div className="text-center text-white p-8">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users size={40} className="text-white" />
                  </div>
                  <div className="text-xl font-bold mb-1">Dr. Bəxtiyar Əliyev</div>
                  <div className="text-blue-200 text-sm mb-6">İmplantoloq & Klinika Direktoru</div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[['3000+', 'İmplant'], ['15+', 'İl'], ['98%', 'Uğur']].map(([v, l]) => (
                      <div key={l} className="bg-white/10 rounded-xl p-2">
                        <div className="font-bold text-lg">{v}</div>
                        <div className="text-xs text-blue-200">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('aboutTitle')}</h2>
              <p className="text-[#1A9BD7] font-semibold mb-6">{t('aboutSubtitle')}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{t('aboutDesc')}</p>
              <div className="space-y-3 mb-8">
                {credentials.map((cred) => (
                  <div key={cred} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#1A9BD7]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#1A9BD7]" />
                    </div>
                    <span className="text-gray-700 text-sm">{cred}</span>
                  </div>
                ))}
              </div>
              <Link
                href={`${basePath}/haqqimda`}
                className="inline-flex items-center gap-2 text-[#0F4C81] font-semibold hover:gap-3 transition-all"
              >
                {tn('haqqimda')}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('brandsTitle')}</h2>
            <p className="text-lg text-gray-600">{t('brandsSubtitle')}</p>
          </div>
          <BrandsSection t={t} />
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('whyTitle')}</h2>
            <p className="text-lg text-gray-600">{t('whySubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('faqTitle')}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-xl border border-gray-100 shadow-sm">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-[#0F4C81] transition-colors">
                  <span>{faq.q}</span>
                  <ChevronRight size={18} className="flex-shrink-0 text-[#1A9BD7] group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`${basePath}/sual-cavab`}
              className="inline-flex items-center gap-2 text-[#0F4C81] font-semibold hover:gap-3 transition-all"
            >
              {tn('sualCavab')} <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0F4C81] to-[#1A9BD7] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-xl text-blue-100 mb-10">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+994105010107"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0F4C81] hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg"
            >
              <Phone size={20} />
              {t('ctaPhone')}
            </a>
            <Link
              href={`${basePath}/randevu`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              {tn('randevu')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
