import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Check, Phone, ChevronRight, Award } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('haqqimdaTitle'),
    description: t('haqqimdaDesc'),
    openGraph: { title: t('haqqimdaTitle'), description: t('haqqimdaDesc'), url: `https://implantoloq.az/${locale}/haqqimda` },
    alternates: { canonical: `https://implantoloq.az/${locale}/haqqimda` },
  };
}

export default async function HaqqimdaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'haqqimda' });
  const tn = await getTranslations({ locale, namespace: 'nav' });
  const basePath = `/${locale}`;

  const educations = [t('edu1'), t('edu2'), t('edu3'), t('edu4')];
  const certs = [t('cert1'), t('cert2'), t('cert3'), t('cert4'), t('cert5'), t('cert6')];
  const stats = [
    { value: t('stat1'), label: t('stat1Label') },
    { value: t('stat2'), label: t('stat2Label') },
    { value: t('stat3'), label: t('stat3Label') },
  ];

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Bakhtiyar Aliyev',
    medicalSpecialty: 'Dentistry',
    alumniOf: 'Azerbaijan Medical University',
    hasCredential: ['ITI', 'EAO', 'Nobel Biocare', '3Shape', 'SDI'],
    worksFor: { '@type': 'MedicalClinic', name: 'İmplantoloq.az' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />

      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-blue-200 text-sm mb-6 flex items-center gap-2">
            <Link href={basePath} className="hover:text-white">Ana Səhifə</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t('heroTitle')}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{t('heroTitle')}</h1>
          <p className="text-xl text-blue-200">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-[#0F4C81]">{s.value}</div>
                <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] rounded-3xl aspect-[3/4] flex items-center justify-center shadow-xl">
                <div className="text-white text-center p-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award size={35} className="text-white" />
                  </div>
                  <div className="font-bold text-lg">Dr. Bəxtiyar Əliyev</div>
                  <div className="text-blue-200 text-xs mt-1">İmplantoloq & Klinika Direktoru</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('bioTitle')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t('bioText')}</p>
              <div className="bg-blue-50 border-l-4 border-[#1A9BD7] rounded-r-xl p-5">
                <p className="text-gray-700 italic">{t('philosophyText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('educationTitle')}</h2>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-[#1A9BD7] rounded-full flex-shrink-0 mt-2" />
                    <span className="text-gray-700 text-sm">{edu}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('certTitle')}</h2>
              <div className="space-y-3">
                {certs.map((cert) => (
                  <div key={cert} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <Check size={16} className="text-[#1A9BD7] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
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
            <Link href={`${basePath}/randevu`} className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors">
              {tn('randevu')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
