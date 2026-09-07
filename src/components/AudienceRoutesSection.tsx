import { useTranslations, useMessages } from 'next-intl';

type Route = {
  tag: string;
  meta: string;
  desc: string;
  points: string[];
};

const Badges = ['01', '02', '03'];

export default function AudienceRoutesSection() {
  const t = useTranslations('audience');
  const messages = useMessages() as any;
  const routes = (messages?.audience?.routes || []) as Route[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {routes.map((route, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-display text-3xl font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  {Badges[i]}
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {route.tag}
                </h3>
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>{route.meta}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {route.desc}
                </p>
              </div>
              <ul className="space-y-2 mt-auto">
                {route.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {point}
                  </li>
                ))}
              </ul>
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
