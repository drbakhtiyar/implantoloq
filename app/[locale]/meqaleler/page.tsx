import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Calendar } from 'lucide-react';
import { articles } from '@/lib/articles';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAz = locale === 'az';
  const title = isAz
    ? 'Məqalələr — İmplantoloq.az'
    : 'Articles — İmplantoloq.az';
  const description = isAz
    ? 'Diş implantı, implantoloq seçimi, implant qulluğu haqqında peşəkar məqalələr. Dr. Bəxtiyar Əliyev tərəfindən.'
    : 'Professional articles about dental implants and implantologist selection.';
  return {
    title,
    description,
    alternates: { canonical: `https://implantoloq.az/${locale}/meqaleler` },
  };
}

export default async function MeqalelərPage({ params }: Props) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C81] to-[#0d3d6b] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Məqalələr</h1>
          <p className="text-blue-100 text-lg">
            Diş implantı, implantoloq seçimi və ağız sağlamlığı haqqında faydalı məlumatlar
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`${basePath}/meqaleler/${article.slug}`}
                className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1A9BD7]/30 transition-all group"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={14} />
                  <span>{article.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0F4C81] transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-[#1A9BD7] text-sm font-semibold">
                  <span>Daha çox oxu</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sualınız var?</h2>
          <p className="text-gray-600 mb-8">Pulsuz konsultasiya üçün bu gün zəng edin.</p>
          <a
            href="tel:+994105010107"
            className="inline-flex items-center gap-2 bg-[#0F4C81] hover:bg-[#0d3d6b] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg"
          >
            +994 10 501 01 07
          </a>
        </div>
      </section>
    </>
  );
}
