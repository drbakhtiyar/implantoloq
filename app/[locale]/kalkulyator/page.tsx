import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import CalculatorPage, { type CalculatorT } from '@/components/calculator/CalculatorPage';
import calculatorConfig from '@/lib/calculator-config.json';
import type { CalcConfig } from '@/lib/calculator';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('kalkulyatorTitle'),
    description: t('kalkulyatorDesc'),
    alternates: { canonical: `https://implantoloq.az/${locale}/kalkulyator` },
  };
}

export default async function KalkulyatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'calculator' });

  const hero = {
    az: {
      badge: 'Qiymət Kalkulyatoru',
      h1: 'İmplant Xərcinizi Online Hesablayın',
      sub: 'Addım-addım seçimlərinizi edin — dərhal AZN-lə təxmini qiymət alın.',
    },
    ru: {
      badge: 'Калькулятор Стоимости',
      h1: 'Рассчитайте Стоимость Имплантов Онлайн',
      sub: 'Пройдите шаги выбора — получите расчёт стоимости в режиме реального времени.',
    },
    en: {
      badge: 'Cost Calculator',
      h1: 'Calculate Your Implant Cost Online',
      sub: 'Go through the selection steps — get a real-time cost estimate.',
    },
  }[locale] ?? {
    badge: 'Qiymət Kalkulyatoru',
    h1: 'İmplant Xərcinizi Online Hesablayın',
    sub: 'Addım-addım seçimlərinizi edin — dərhal AZN-lə təxmini qiymət alın.',
  };

  const t: CalculatorT = {
    gateTitle: tc('gateTitle'),
    gateSubtitle: tc('gateSubtitle'),
    namePlaceholder: tc('namePlaceholder'),
    phonePlaceholder: tc('phonePlaceholder'),
    gateBtn: tc('gateBtn'),
    privacyNote: tc('privacyNote'),
    step1Title: tc('step1Title'),
    step1Sub: tc('step1Sub'),
    step2Title: tc('step2Title'),
    step2Sub: tc('step2Sub'),
    step2Tag: tc('step2Tag'),
    step3Title: tc('step3Title'),
    step3Sub: tc('step3Sub'),
    step4Title: tc('step4Title'),
    step4Sub: tc('step4Sub'),
    addonBoneGraft: tc('addonBoneGraft'),
    addonSinusLift: tc('addonSinusLift'),
    addonXray: tc('addonXray'),
    addonPerImplant: tc('addonPerImplant'),
    addonOnetime: tc('addonOnetime'),
    back: tc('back'),
    next: tc('next'),
    calculate: tc('calculate'),
    resultTitle: tc('resultTitle'),
    resultSub: tc('resultSub'),
    lineImplants: tc('lineImplants'),
    lineCrowns: tc('lineCrowns'),
    lineBoneGraft: tc('lineBoneGraft'),
    lineSinusLift: tc('lineSinusLift'),
    lineXray: tc('lineXray'),
    lineDiscount: tc('lineDiscount'),
    totalLabel: tc('totalLabel'),
    resultNote: tc('resultNote'),
    ctaWhatsApp: tc('ctaWhatsApp'),
    ctaCall: tc('ctaCall'),
    ctaBook: tc('ctaBook'),
    implants: tc('implants'),
    implantCount: tc('implantCount'),
    selected: tc('selected'),
    currency: tc('currency'),
    perUnit: tc('perUnit'),
    perImplant: tc('perImplant'),
  };

  return (
    <>
      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1A9BD7] text-white py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase bg-white/20 px-3 py-1 rounded-full">
              {hero.badge}
            </span>
          </div>
          <h1
            className="font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)' }}
          >
            {hero.h1}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl">{hero.sub}</p>
        </div>
      </section>

      <CalculatorPage
        locale={locale}
        config={calculatorConfig as CalcConfig}
        t={t}
      />
    </>
  );
}
