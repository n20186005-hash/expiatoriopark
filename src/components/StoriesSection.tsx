import { useTranslations, useMessages } from 'next-intl';

type Story = { heading: string; text: string };

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const items = (messages?.stories?.items || []) as Story[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="max-w-2xl mx-auto text-center leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>
        <div className="w-12 h-0.5 mb-10 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {items.map((story, i) => (
            <article
              key={i}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {story.heading}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {story.text}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
