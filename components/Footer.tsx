import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  const basePath = `/${locale}`;

  const services = [
    { href: `${basePath}/implantasiya`, label: tn('implantasiya') },
    { href: `${basePath}/all-on-4`, label: tn('allOn4') },
    { href: `${basePath}/sumuk-artirmasi`, label: tn('sumukArtirmasi') },
    { href: `${basePath}/sinus-lift`, label: tn('sinusLift') },
    { href: `${basePath}/sedasiya-ile-implant`, label: tn('sedasiya') },
  ];

  const pages = [
    { href: basePath, label: tn('home') },
    { href: `${basePath}/haqqimda`, label: tn('haqqimda') },
    { href: `${basePath}/qiymetler`, label: tn('qiymetler') },
    { href: `${basePath}/sual-cavab`, label: tn('sualCavab') },
    { href: `${basePath}/elaqe`, label: tn('elaqe') },
    { href: `${basePath}/randevu`, label: tn('randevu') },
  ];

  return (
    <footer className="bg-[#0a2e4f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={basePath} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2 5 .5.8.8 1.5 1 2.5.2 1 .5 5.5 2 5.5s1.8-4.5 2-5.5c.2-1 .5-1.7 1-2.5 1-1.5 2-3 2-5 0-3-2-5-5-5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.15)"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-tight">İmplantoloq</span>
                <span className="font-bold text-[#1A9BD7] text-lg leading-tight">.az</span>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">{t('tagline')}</p>
            <div className="space-y-3">
              <a href="tel:+994105010107" className="flex items-center gap-2.5 text-sm text-blue-100 hover:text-white transition-colors">
                <Phone size={14} className="text-[#1A9BD7] flex-shrink-0" />
                <span>{t('phone')}</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-blue-100">
                <MapPin size={14} className="text-[#1A9BD7] flex-shrink-0 mt-0.5" />
                <span>{t('address')}</span>
              </div>
              <a href={`mailto:${t('email')}`} className="flex items-center gap-2.5 text-sm text-blue-100 hover:text-white transition-colors">
                <Mail size={14} className="text-[#1A9BD7] flex-shrink-0" />
                <span>{t('email')}</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-blue-100">
                <Clock size={14} className="text-[#1A9BD7] flex-shrink-0 mt-0.5" />
                <div>
                  <div>{t('hours')}</div>
                  <div>{t('hoursSat')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('servicesTitle')}</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('pagesTitle')}</h3>
            <ul className="space-y-2.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('contactTitle')}</h3>
            <div className="space-y-3">
              <a
                href="tel:+994105010107"
                className="flex items-center justify-center gap-2 bg-[#1A9BD7] hover:bg-[#158ab8] text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors w-full"
              >
                <Phone size={14} />
                +994 10 501 01 07
              </a>
              <a
                href="https://wa.me/994105010107"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors w-full"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <Link
                href={`/${locale}/randevu`}
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors w-full"
              >
                {tn('randevu')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-blue-300">{t('copyright')}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-xs text-blue-300 hover:text-white transition-colors">AZ</Link>
            <Link href={`/ru`} className="text-xs text-blue-300 hover:text-white transition-colors">RU</Link>
            <Link href={`/en`} className="text-xs text-blue-300 hover:text-white transition-colors">EN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
