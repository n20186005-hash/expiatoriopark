import { useTranslations, useMessages } from 'next-intl';

type ServiceItem = {
  name: string;
  desc: string;
  tips: string[];
};

/* 中性图标：按设施类型展示通用图形 */
const Glyphs = [
  // WC / 洗手间
  <svg key="wc" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3.2" /><path d="M3 21v-3a6 6 0 0 1 8-5.6" />
    <circle cx="17" cy="8" r="2.6" /><path d="M15.5 21v-6h6v6M18 15v-4" />
  </svg>,
  // 停车
  <svg key="park" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" />
  </svg>,
  // 餐饮
  <svg key="food" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3v5a3 3 0 0 0 6 0V3" /><path d="M11 8v13M17 4v6c0 2.2-1.8 3.5-4 3.5" />
  </svg>,
  // 住宿
  <svg key="hotel" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" /><path d="M21 21V10a2 2 0 0 0-2-2h-4" />
    <path d="M6 11h5M6 15h5M6 19h5M14 11h1M14 15h1M14 19h1" />
  </svg>,
  // 商超
  <svg key="shop" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l1 4a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0l1-4Z" />
    <path d="M6 21V12M18 21V12M4 21h16" />
  </svg>,
  // 加油 / 充电
  <svg key="fuel" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15" /><path d="M3 21h13" />
    <path d="M14 11h2a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0V9l-3-3" /><path d="M9 7h2" />
  </svg>,
  // 药房 / 医疗
  <svg key="med" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4Z" /><path d="M12 9v5M9.5 11.5h5" />
  </svg>,
  // 无障碍与辅助
  <svg key="access" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="1.6" /><path d="M5 11l4.5 1 2.5-3 2.5 3L19 11" />
    <path d="M8 21v-5l2.5-1v6M16 21v-5h-2.5" />
  </svg>,
];

export default function ServicesSection() {
  const t = useTranslations('services');
  const messages = useMessages() as any;
  const items = (messages?.services?.items || []) as ServiceItem[];

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
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
          <p style={{ color: 'var(--text-secondary)' }}>{t('neutralNote')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: 'var(--accent)' }}
                >
                  {Glyphs[i] || Glyphs[Glyphs.length - 1]}
                </span>
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
              {item.tips?.length > 0 && (
                <ul className="mt-1 space-y-1.5">
                  {item.tips.map((tip, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
