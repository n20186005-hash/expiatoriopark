import { useTranslations, useMessages } from 'next-intl';

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const breadcrumbItems: string[] = messages?.intro?.breadcrumbItems || [];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* 地理面包屑：FULL → CITY → STATE → COUNTRY */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            {breadcrumbItems.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>/</span>
                )}
                <span
                  className={i === breadcrumbItems.length - 1 ? 'font-medium' : ''}
                  style={{
                    color: i === breadcrumbItems.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* 首段等位声明 */}
        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('entityLead')}
        </p>

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        {/* 周边语义集群 */}
        <div
          className="rounded-xl p-6 mb-12"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('nearbyText')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-4">
              {alsoKnownAsItems.map((keyword, i) => {
                const parts = keyword.split('：');
                if (parts.length > 1) {
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{parts[0]}：</strong>
                        {parts.slice(1).join('：')}
                      </span>
                    </li>
                  );
                }
                // Handle English/Spanish colon
                const enParts = keyword.split(': ');
                if (enParts.length > 1) {
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{enParts[0]}: </strong>
                        {enParts.slice(1).join(': ')}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
