import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, ChevronRight, Phone } from 'lucide-react';
import { articles, getArticleBySlug } from '@/lib/articles';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const locales = ['az', 'ru', 'en'];
  return locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | İmplantoloq.az`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${i}`} className="list-disc list-inside space-y-1 text-gray-700 my-4 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.indexOf('**', 2) === trimmed.length - 2) {
      flushList();
      elements.push(
        <p key={i} className="font-semibold text-gray-900 mt-4 mb-1">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
    } else {
      flushList();
      // Handle inline bold: **text**
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/);
      const rendered = parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed my-3">
          {rendered}
        </p>
      );
    }
    i++;
  }
  flushList();
  return elements;
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const basePath = `/${locale}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: 'Dr. Bəxtiyar Əliyev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'İmplantoloq.az',
      url: 'https://implantoloq.az',
    },
    inLanguage: locale,
    mainEntityOfPage: `https://implantoloq.az/${locale}/meqaleler/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F4C81] to-[#0d3d6b] text-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
            <Link href={`${basePath}/meqaleler`} className="hover:text-white transition-colors">
              Məqalələr
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/70 truncate">{article.title.slice(0, 40)}…</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-blue-200 text-sm">
            <Calendar size={14} />
            <span>{article.date}</span>
            <span className="text-blue-300">·</span>
            <span>Dr. Bəxtiyar Əliyev</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <article className="prose-article">
            {renderContent(article.content)}
          </article>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href={`${basePath}/meqaleler`}
              className="inline-flex items-center gap-2 text-[#0F4C81] font-semibold hover:gap-3 transition-all"
            >
              ← Bütün məqalələr
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0F4C81] to-[#1A9BD7] text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Pulsuz Konsultasiya Alın</h2>
          <p className="text-blue-100 mb-8">
            Dr. Bəxtiyar Əliyev ilə şəxsi görüş üçün bu gün zəng edin.
          </p>
          <a
            href="tel:+994105010107"
            className="inline-flex items-center gap-2 bg-white text-[#0F4C81] hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg"
          >
            <Phone size={20} />
            +994 10 501 01 07
          </a>
        </div>
      </section>
    </>
  );
}
