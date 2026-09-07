import { useTranslations, useMessages } from 'next-intl';

export default function SeasonalSection() {
  const t = useTranslations('seasonal');
  const messages = useMessages() as any;
  const head = (messages?.seasonal?.head || []) as string[];
  const rows = (messages?.seasonal?.rows || []) as string[][];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                {head.map((cell, i) => (
                  <th
                    key={i}
                    className="px-5 py-3.5 text-sm font-semibold whitespace-nowrap"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-5 py-4 align-top text-sm leading-relaxed"
                      style={{
                        color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: j === 0 ? 600 : 400,
                        whiteSpace: j === 0 ? 'nowrap' : 'normal',
                        minWidth: j === 0 ? '150px' : undefined,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
