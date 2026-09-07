import { useTranslations } from 'next-intl';

export default function SourcesSection() {
  const t = useTranslations('sourcesSection');
  const footer = useTranslations('footer');

  const linksObj = footer.raw('officialLinks') as Record<string, { name: string; url: string }>;
  const links = Object.values(linksObj);

  const hostOf = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <ul className="space-y-3">
          {links.map((link, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-4 rounded-xl px-5 py-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                <div>
                  <p className="font-medium text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    {link.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {hostOf(link.url)}
                  </p>
                </div>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 flex-shrink-0 text-sm font-medium hover:underline mt-1"
                style={{ color: 'var(--accent)' }}
              >
                {t('itemNote')}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
