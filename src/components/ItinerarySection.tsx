import { useTranslations, useMessages } from 'next-intl';

type Plan = {
  name: string;
  duration: string;
  summary: string;
  steps: { title: string; text: string }[];
};

export default function ItinerarySection() {
  const t = useTranslations('itinerary');
  const messages = useMessages() as any;
  const plans = (messages?.itinerary?.plans || []) as Plan[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan, p) => (
            <div
              key={p}
              className="rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    {plan.duration}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {plan.summary}
                </p>
              </div>

              <ol className="relative space-y-0 border-l ml-2.5" style={{ borderColor: 'var(--border-color)' }}>
                {plan.steps.map((step, s) => (
                  <li key={s} className="relative pl-6 pb-5 last:pb-0">
                    <span
                      className="absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2"
                      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
                    />
                    <p className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
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
