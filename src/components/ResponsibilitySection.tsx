import { useTranslations, useMessages } from 'next-intl';

type Item = { title: string; text: string };

export default function ResponsibilitySection() {
  const t = useTranslations('responsibility');
  const messages = useMessages() as any;
  const items = (messages?.responsibility?.items || []) as Item[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex items-start gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                style={{ background: 'var(--accent)' }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
