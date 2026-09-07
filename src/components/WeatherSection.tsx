'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { fetchWeather, conditionKey, type OpenMeteoResponse } from '@/lib/weather';
import {
  adviceUiFor,
  suggestForToday,
  uvLevelKey,
  type AdviceGroup,
  type WeatherFacts,
} from '@/lib/weatherAdvice';

function formatDayLabel(locale: string, dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map((n) => parseInt(n, 10));
  const date = new Date(y, m - 1, d);
  const label = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function round(value: number | null | undefined): number | null {
  return typeof value === 'number' ? Math.round(value) : null;
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const ui = adviceUiFor(locale);
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setFailed(false);
    const ctrl = new AbortController();
    fetchWeather(ctrl.signal)
      .then((d) => {
        if (!alive) return;
        setData(d);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
      ctrl.abort();
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const current = data?.current;
  const daily = data?.daily;

  /* 今天（daily[0]）的聚合事实：用于建议引擎与概览 */
  let todayFacts: WeatherFacts | null = null;
  let todayConditionKey: string | null = null;
  if (current && daily && daily.time.length > 0) {
    const i = 0;
    const high = round(daily.temperature_2m_max?.[i]);
    const low = round(daily.temperature_2m_min?.[i]);
    const uvDaily = round(daily.uv_index_max?.[i]);
    const uv = uvDaily ?? (typeof current.uv_index === 'number' ? Math.round(current.uv_index) : null);
    todayFacts = {
      wmo: daily.weather_code[i] ?? 0,
      high,
      low,
      precipProb: round(daily.precipitation_probability_max?.[i]),
      uv,
      windKmh: round(daily.wind_speed_10m_max?.[i]),
    };
    todayConditionKey = conditionKey(daily.weather_code[i] ?? 0, true);
  }

  const advice = todayFacts ? suggestForToday(todayFacts) : [];
  const riskItems = advice.filter((it) => it.group === 'risk');
  const groupItems = (group: AdviceGroup) => advice.filter((it) => it.group === group);
  const hasNormalAdvice =
    groupItems('outfit').length + groupItems('plan').length + groupItems('gear').length > 0;

  const nowKey = current?.is_day === 0 ? 'clear' : 'sunny';
  const currentConditionKey =
    current && typeof current.weather_code === 'number'
      ? conditionKey(current.weather_code, (current.is_day ?? 1) === 1)
      : nowKey;

  const metricBoxes = [
    {
      label: t('feelsLike'),
      value: current ? `${round(current.apparent_temperature)}°` : '--',
    },
    { label: t('humidity'), value: current ? `${round(current.relative_humidity_2m)}%` : '--' },
    { label: ui.fact.wind, value: current ? `${round(current.wind_speed_10m)} km/h` : '--' },
    {
      label: ui.fact.precip,
      value: todayFacts?.precipProb != null ? `${todayFacts.precipProb}%` : '--',
    },
  ];

  const overviewChips =
    todayFacts && todayConditionKey
      ? [
          {
            label: ui.fact.tempRange,
            value:
              todayFacts.low != null && todayFacts.high != null
                ? `${todayFacts.low}–${todayFacts.high}°`
                : '--',
          },
          { label: ui.fact.precip, value: todayFacts.precipProb != null ? `${todayFacts.precipProb}%` : '--' },
          {
            label: ui.fact.wind,
            value: todayFacts.windKmh != null ? `${todayFacts.windKmh} km/h` : '--',
          },
          {
            label: ui.fact.uv,
            value:
              todayFacts.uv != null
                ? `${todayFacts.uv} · ${ui.uvLevel[uvLevelKey(todayFacts.uv)]}`
                : '--',
          },
        ]
      : null;

  const renderGroup = (group: AdviceGroup) => {
    const items = groupItems(group);
    if (items.length === 0) return null;
    return (
      <div
        className="rounded-xl px-4 py-3.5"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
          {ui.group[group]}
        </p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.key} className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {ui.phrases[item.key] ?? item.key}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {failed && !data && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{t('error')}</p>
            <button
              onClick={retry}
              className="px-5 py-2 rounded-full text-sm font-medium text-white"
              style={{ background: 'var(--accent)' }}
            >
              {t('retry')}
            </button>
          </div>
        )}

        {!data && !failed && (
          <div className="grid gap-4 lg:grid-cols-2 animate-pulse">
            <div className="h-64 rounded-2xl" style={{ background: 'var(--bg-tertiary)' }} />
            <div className="h-64 rounded-2xl" style={{ background: 'var(--bg-tertiary)' }} />
          </div>
        )}

        {data && current && daily && daily.time.length > 0 && (
          <>
            {/* 风险提醒：有预警才显示，置顶红色 */}
            {riskItems.length > 0 && (
              <div
                role="alert"
                className="rounded-2xl px-5 sm:px-6 py-4 mb-5"
                style={{
                  background: 'rgba(239,68,68,0.09)',
                  border: '1px solid rgba(239,68,68,0.55)',
                }}
              >
                <p className="text-sm font-semibold mb-1 flex items-center gap-2" style={{ color: '#ef4444' }}>
                  <span aria-hidden="true">⚠</span>
                  {ui.group.risk}
                </p>
                <ul className="space-y-1">
                  {riskItems.map((item) => (
                    <li key={item.key} className="text-sm leading-relaxed" style={{ color: '#ef4444' }}>
                      {ui.phrases[item.key] ?? item.key}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 今日天气概览 */}
            {overviewChips && (
              <div
                className="rounded-2xl px-5 sm:px-6 py-4 mb-5"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {ui.overview}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {t(`conditions.${todayConditionKey}`)}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {overviewChips.map((chip) => (
                    <div key={chip.label} className="rounded-xl px-3 py-2" style={{ background: 'var(--bg-secondary)' }}>
                      <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-muted)' }}>{chip.label}</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{chip.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 lg:grid-cols-2">
              {/* 实时天气 */}
              <div
                className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                    {t('now')}
                  </p>
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-display text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {round(current.temperature_2m)}°
                      </p>
                      <p className="mt-1 text-base" style={{ color: 'var(--text-secondary)' }}>
                        {t(`conditions.${currentConditionKey}`)}
                      </p>
                    </div>
                    <div className="text-right text-xs" style={{ color: 'var(--text-muted)' }}>
                      <p>{t('city')}</p>
                      {current.time && (
                        <p className="mt-1">
                          {t('updated')} {current.time.slice(11, 16)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {metricBoxes.map((box, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                    >
                      <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{box.label}</p>
                      <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{box.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 游客建议（动态渲染：未命中的分类不展示） */}
              <div
                className="rounded-2xl p-6 sm:p-8 flex flex-col gap-3"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                {hasNormalAdvice ? (
                  <>
                    {renderGroup('outfit')}
                    {renderGroup('plan')}
                    {renderGroup('gear')}
                  </>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {ui.phrases.p_fine_default}
                  </p>
                )}
                {riskItems.length === 0 && (
                  <p
                    className="mt-auto pt-2 text-xs"
                    style={{ color: 'var(--text-muted)' }}
                    aria-live="polite"
                  >
                    ✓ {ui.noRisk}
                  </p>
                )}
              </div>
            </div>

            {/* 未来 7 日预报 */}
            <div
              className="rounded-2xl p-6 sm:p-8 mt-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="overflow-x-auto -mx-1 px-1 pb-2">
                <div className="flex gap-3 min-w-max">
                  {daily.time.map((dateStr, i) => {
                    const isToday = i === 0;
                    const condKey = conditionKey(daily.weather_code[i] ?? 0, true);
                    const high = round(daily.temperature_2m_max[i]);
                    const low = round(daily.temperature_2m_min[i]);
                    const rain = round(daily.precipitation_probability_max[i]);
                    const uv = round(daily.uv_index_max?.[i]);
                    return (
                      <div
                        key={dateStr}
                        className="w-24 rounded-xl px-2 py-4 text-center flex-shrink-0"
                        style={{
                          background: isToday ? 'var(--accent)' : 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <p
                          className="text-sm font-medium mb-2"
                          style={{ color: isToday ? '#fff' : 'var(--text-secondary)' }}
                        >
                          {isToday ? t('today') : formatDayLabel(locale, dateStr)}
                        </p>
                        <p
                          className="text-xs mb-3"
                          style={{ color: isToday ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)' }}
                        >
                          {t(`conditions.${condKey}`)}
                        </p>
                        <p
                          className="font-display text-xl font-bold"
                          style={{ color: isToday ? '#fff' : 'var(--text-primary)' }}
                        >
                          {high != null ? `${high}°` : '--'}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: isToday ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}
                        >
                          {t('min')} {low != null ? `${low}°` : '--'}
                        </p>
                        <p
                          className="text-xs mt-2"
                          style={{ color: isToday ? 'rgba(255,255,255,0.9)' : 'var(--accent)' }}
                        >
                          {t('chance')} {rain != null ? `${rain}%` : '--'}
                        </p>
                        {uv != null && (
                          <p
                            className="text-[11px] mt-1"
                            style={{ color: isToday ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)' }}
                          >
                            UV {uv}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
