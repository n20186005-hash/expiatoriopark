import { useTranslations, useMessages } from 'next-intl';

type NearbyCard = {
  title: string;
  text: string;
};

/* 中性图标：日间餐饮 / 夜间街头 / 顺游地标 */
const Glyphs = [
  <svg key="day" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h14v3a2 2 0 0 1-2 2h-3v4l3.5 2.5v4H9.5v-4L13 12V8h-3a2 2 0 0 1-2-2V3Z" /><path d="M8 21h8" />
  </svg>,
  <svg key="night" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4.5a8 8 0 1 0 6.5 6.5A6 6 0 0 1 13 4.5Z" /><path d="M6.5 14a3 3 0 0 0 3.5 3.5" />
  </svg>,
  <svg key="sight" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 21h16M6 21V10l6-5 6 5v11M10 21v-4h4v4" /><circle cx="12" cy="8" r="1.6" />
  </svg>,
];

export default function NearbySection() {
  const t = useTranslations('nearby');
  const messages = useMessages() as any;
  const cards = (messages?.nearby?.cards || []) as NearbyCard[];

  return (
    <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* 中立性说明 */}
        <div
          className="rounded-xl px-5 py-4 mb-10 text-sm leading-relaxed flex items-start gap-3"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <span className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>{t('note')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ background: 'var(--accent)' }}
              >
                {Glyphs[i] || Glyphs[Glyphs.length - 1]}
              </span>
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
