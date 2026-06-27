'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

type Props = { locale: string };

export default function Header({ locale }: Props) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const basePath = `/${locale}`;

  function isActive(path: string) {
    return pathname === path || pathname.startsWith(path + '/');
  }

  const services = [
    { href: `${basePath}/implantasiya`, label: t('implantasiya') },
    { href: `${basePath}/all-on-4`, label: t('allOn4') },
    { href: `${basePath}/sumuk-artirmasi`, label: t('sumukArtirmasi') },
    { href: `${basePath}/sinus-lift`, label: t('sinusLift') },
    { href: `${basePath}/sedasiya-ile-implant`, label: t('sedasiya') },
  ];

  const mainLinks = [
    { href: `${basePath}`, label: t('home') },
    { href: `${basePath}/haqqimda`, label: t('haqqimda') },
    { href: `${basePath}/qiymetler`, label: t('qiymetler') },
    { href: `${basePath}/sual-cavab`, label: t('sualCavab') },
    { href: `${basePath}/elaqe`, label: t('elaqe') },
  ];

  const locales = [
    { code: 'az', label: 'AZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#0F4C81] text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:+994105010107`} className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <Phone size={13} />
              <span>+994 10 501 01 07</span>
            </a>
            <span className="text-blue-200">|</span>
            <span>B.e–Cümə: 09:00–19:00 &nbsp;|&nbsp; Şənbə: 10:00–15:00</span>
          </div>
          <div className="flex items-center gap-2">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={switchLocale(l.code)}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                  locale === l.code
                    ? 'bg-white text-[#0F4C81]'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={basePath} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#0F4C81] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2 5 .5.8.8 1.5 1 2.5.2 1 .5 5.5 2 5.5s1.8-4.5 2-5.5c.2-1 .5-1.7 1-2.5 1-1.5 2-3 2-5 0-3-2-5-5-5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.2)"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-[#0F4C81] text-lg leading-tight">İmplantoloq</span>
              <span className="font-bold text-[#1A9BD7] text-lg leading-tight">.az</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href={basePath}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(basePath) && pathname === basePath
                  ? 'text-[#0F4C81] bg-blue-50'
                  : 'text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50'
              }`}
            >
              {t('home')}
            </Link>

            {/* Services dropdown */}
            <div className="relative">
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  services.some((s) => isActive(s.href))
                    ? 'text-[#0F4C81] bg-blue-50'
                    : 'text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50'
                }`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                {t('services')}
                <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        isActive(service.href)
                          ? 'text-[#0F4C81] bg-blue-50 font-medium'
                          : 'text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50'
                      }`}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#0F4C81] bg-blue-50'
                    : 'text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & mobile */}
          <div className="flex items-center gap-3">
            <Link
              href={`${basePath}/randevu`}
              className="hidden md:inline-flex items-center gap-2 bg-[#0F4C81] hover:bg-[#0d3d6b] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <Phone size={14} />
              {t('randevu')}
            </Link>

            {/* Mobile lang */}
            <div className="flex items-center gap-1 lg:hidden">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocale(l.code)}
                  className={`px-1.5 py-0.5 text-xs font-semibold rounded transition-colors ${
                    locale === l.code
                      ? 'bg-[#0F4C81] text-white'
                      : 'text-gray-500 hover:text-[#0F4C81]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            <Link
              href={basePath}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('services')}
            </div>
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block px-6 py-2.5 rounded-md text-sm text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50"
                onClick={() => setMenuOpen(false)}
              >
                {service.label}
              </Link>
            ))}
            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:text-[#0F4C81] hover:bg-blue-50"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href={`${basePath}/randevu`}
                className="flex items-center justify-center gap-2 bg-[#0F4C81] text-white px-4 py-3 rounded-lg text-sm font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                <Phone size={14} />
                {t('randevu')}
              </Link>
            </div>
            <a
              href="tel:+994105010107"
              className="flex items-center justify-center gap-2 border border-[#0F4C81] text-[#0F4C81] px-4 py-3 rounded-lg text-sm font-semibold mt-2"
            >
              <Phone size={14} />
              +994 10 501 01 07
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
