import { useTranslations, useMessages } from 'next-intl';
import JsonLd from './JsonLd';

type FaqItem = { q: string; a: string };

export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as FaqItem[];

  // FAQPage 结构化数据：抓取 Featured Snippet / AI 概览
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <section id="faq" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="space-y-3">
            {items.map((item, i) => (
              <details
                key={i}
                className="faq-item group rounded-xl overflow-hidden"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <summary
                  className="cursor-pointer flex items-center justify-between gap-4 px-5 sm:px-6 py-4 select-none"
                  style={{ listStyle: 'none' }}
                >
                  <span className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>
                    {item.q}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div
                  className="px-5 sm:px-6 pb-5 pt-0 border-t"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--text-secondary)' }}>
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
