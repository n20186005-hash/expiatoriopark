import { useTranslations } from 'next-intl';
import { ATTRACTION } from '@/lib/site';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= count ? '#f0b429' : 'var(--border-color)'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations('reviews');

  return (
    <section id="reviews" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-sm leading-relaxed mb-10 max-w-2xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('declaration')}
        </p>

        <div
          className="rounded-2xl p-6 sm:p-8 mb-8"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div
              className="inline-flex items-center gap-3 rounded-full px-4 py-2"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <span
                className="text-2xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {ATTRACTION.RATING}
              </span>
              <Stars count={5} />
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                ({ATTRACTION.REVIEW_COUNT})
              </span>
            </div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Google Maps
            </span>
          </div>

        </div>

        {/* More reviews link — arrow only */}
        <div className="flex justify-center">
          <a
            href="https://maps.app.goo.gl/7LuiFPvzPmf6TEYk9"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
          >
            <span>{t('moreReviews')}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
