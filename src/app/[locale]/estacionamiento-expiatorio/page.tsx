import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, ATTRACTION } from '@/lib/site';
import JsonLd from '@/components/JsonLd';

type Locale = 'es' | 'en' | 'zh';

const content: Record<Locale, {
  title: string;
  description: string;
  back: string;
  h1: string;
  intro: string;
  updated: string;
  sections: Array<{ title: string; body: string[] }>;
  tipsTitle: string;
  tips: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  es: {
    title: 'Estacionamiento Expiatorio Guadalajara | Dónde Estacionarse',
    description: 'Guía práctica para estacionarse cerca del Parque Expiatorio en Guadalajara: opciones de pago, qué revisar antes de entrar y cómo caminar hasta la explanada.',
    back: 'Volver al inicio',
    h1: 'Estacionamiento cerca del Parque Expiatorio',
    intro:
      'Si piensa llegar en coche al Parque Expiatorio o al Templo Expiatorio, lo más práctico es buscar estacionamiento público de pago junto a la explanada o usar cajones con parquímetro en las calles cercanas de la colonia Americana.',
    updated: 'Información práctica revisada en octubre de 2026. Tarifas, horario y accesos pueden cambiar.',
    sections: [
      {
        title: 'Opciones habituales para estacionarse',
        body: [
          'La zona suele contar con estacionamiento público de pago junto al conjunto del Expiatorio y con lugares de parquímetro en calles cercanas. La disponibilidad cambia mucho por hora, sobre todo al atardecer, en la noche y durante fines de semana.',
          'Si encuentra un estacionamiento público señalizado, revise primero el tablero de tarifas, la hora de cierre y el método de pago antes de dejar el coche.',
        ],
      },
      {
        title: 'Qué conviene revisar antes de entrar',
        body: [
          'Antes de pagar, confirme tres cosas: tarifa vigente, horario de salida permitido y si acepta efectivo, tarjeta o pago digital. No asuma que todos los estacionamientos de la zona operan igual.',
          'En parquímetros o cajones en vía pública, verifique también los límites de tiempo y las restricciones del día para evitar multas o inmovilización.',
        ],
      },
      {
        title: 'Cómo caminar al parque desde el estacionamiento',
        body: [
          'Desde los estacionamientos más próximos, el acceso peatonal a la explanada suele ser de pocos minutos. El punto de referencia más fácil es la silueta del Templo Expiatorio, visible desde varias calles del entorno.',
          'Por la noche hay más movimiento de peatones y puestos alrededor de la plaza; lleve solo lo necesario y guarde bien objetos de valor antes de bajar del coche.',
        ],
      },
      {
        title: 'Cuándo conviene evitar el coche',
        body: [
          'Si va a visitar el Expiatorio en horario nocturno o en un fin de semana con mucha afluencia, taxi o app suelen ser opciones más sencillas que conducir y buscar lugar.',
          'También puede combinar transporte público y caminata corta desde el centro o desde la colonia Americana, especialmente si ya está hospedado por la zona.',
        ],
      },
    ],
    tipsTitle: 'Consejos rápidos',
    tips: [
      'Llegue con margen si desea estacionarse cerca de la explanada.',
      'Tome una foto al tablero de tarifas y a la referencia de su cajón.',
      'Confirme siempre el horario de salida antes de dejar el coche.',
      'Lleve cambio o un método de pago alternativo por si el sistema falla.',
    ],
    ctaPrimary: 'Abrir ubicación en Google Maps',
    ctaSecondary: 'Ver guía principal del Parque Expiatorio',
  },
  en: {
    title: 'Parking Near Expiatorio Park Guadalajara',
    description: 'Practical parking guide for Expiatorio Park in Guadalajara, including paid parking options, what to check before leaving your car and when rideshare may be easier.',
    back: 'Back to home',
    h1: 'Parking Near Expiatorio Park',
    intro:
      'If you plan to reach Expiatorio Park or Templo Expiatorio by car, the simplest option is usually a paid public parking facility near the square or metered street parking on nearby blocks in Colonia Americana.',
    updated: 'Practical information reviewed in October 2026. Prices, opening hours and access points can change.',
    sections: [
      {
        title: 'Typical parking options',
        body: [
          'Visitors usually rely on paid public parking close to the Expiatorio complex or metered on-street spaces nearby. Availability changes a lot depending on the hour, especially at dusk, at night and on weekends.',
          'If you find a signed public parking lot, check the tariff board, closing time and payment method before leaving your vehicle.',
        ],
      },
      {
        title: 'What to verify first',
        body: [
          'Before paying, confirm the current rate, the latest exit time and whether the lot accepts cash, cards or digital payment. Parking conditions are not always the same from one facility to another.',
          'For metered street parking, also check time limits and day-specific restrictions to avoid tickets or wheel locks.',
        ],
      },
      {
        title: 'Walking from parking to the square',
        body: [
          'From the closest parking areas, the walk to the square is usually only a few minutes. The easiest landmark is the Neo-Gothic silhouette of Templo Expiatorio, which is visible from several nearby streets.',
          'The area gets busier at night with more foot traffic and food stalls, so keep valuables out of sight before leaving the car.',
        ],
      },
      {
        title: 'When not to drive',
        body: [
          'If you are visiting in the evening or on a busy weekend, taxi or rideshare can be easier than driving and looking for a spot.',
          'Public transport plus a short walk also works well if you are staying in central Guadalajara or in Colonia Americana.',
        ],
      },
    ],
    tipsTitle: 'Quick tips',
    tips: [
      'Arrive with extra time if you want to park close to the square.',
      'Take a photo of the tariff board and your parking reference.',
      'Always confirm the exit time before leaving the car.',
      'Carry a backup payment option in case a machine is unavailable.',
    ],
    ctaPrimary: 'Open location in Google Maps',
    ctaSecondary: 'See the main Expiatorio Park guide',
  },
  zh: {
    title: 'Expiatorio Park 停车指南',
    description: '前往瓜达拉哈拉 Expiatorio Park 的停车实用页：附近收费停车选择、入场前要确认什么，以及什么时候更适合打车前往。',
    back: '返回首页',
    h1: 'Expiatorio Park 附近停车',
    intro:
      '如果你打算自驾前往 Expiatorio Park 或 Templo Expiatorio，通常最省心的做法是优先找广场旁的收费公共停车场，或在 Colonia Americana 周边街区寻找带收费规则的路边车位。',
    updated: '实用信息核对于 2026 年 10 月。价格、营业时间和出入口都可能调整。',
    sections: [
      {
        title: '常见停车方式',
        body: [
          '游客通常会使用 Expiatorio 一带的收费公共停车场，或附近街区的计时收费路边车位。黄昏、夜间和周末时段更容易紧张。',
          '看到明确标注的公共停车场后，先看现场费率牌、关门时间和支付方式，再决定是否进入。',
        ],
      },
      {
        title: '停车前先确认什么',
        body: [
          '建议先确认当前收费、最晚取车时间，以及是否支持现金、刷卡或电子支付。不同停车点规则未必一致。',
          '如果停在路边计时车位，也要顺手核对时长限制和当天规则，避免吃罚单或被锁车。',
        ],
      },
      {
        title: '从停车点步行到广场',
        body: [
          '离得最近的停车点步行到广场通常只要几分钟。最好认的地标就是 Templo Expiatorio 的新哥特式塔楼，周边多条街道都能看到。',
          '夜里人流和小吃摊会变多，下车前把贵重物品收好，只带需要的东西去逛会更轻松。',
        ],
      },
      {
        title: '什么时候不建议自驾',
        body: [
          '如果你打算夜里或周末高峰去 Expiatorio，打车或网约车通常比自己绕圈找车位更省事。',
          '住在市中心或 Americana 一带的话，也很适合公共交通加短距离步行。',
        ],
      },
    ],
    tipsTitle: '快速建议',
    tips: [
      '想停得近一点，尽量预留找车位时间。',
      '拍下收费牌和停车位置，回程更省心。',
      '离车前一定再确认最晚取车时间。',
      '最好准备备用支付方式，以防机器临时不可用。',
    ],
    ctaPrimary: '在 Google Maps 打开位置',
    ctaSecondary: '查看 Expiatorio Park 主页面',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (locale === 'zh' || locale === 'en' || locale === 'es' ? locale : 'es') as Locale;
  const page = content[currentLocale];

  const zhUrl = `${BASE_URL}/zh/estacionamiento-expiatorio`;
  const enUrl = `${BASE_URL}/en/estacionamiento-expiatorio`;
  const esUrl = `${BASE_URL}/es/estacionamiento-expiatorio`;
  const selfUrl = currentLocale === 'zh' ? zhUrl : currentLocale === 'en' ? enUrl : esUrl;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: zhUrl,
        en: enUrl,
        es: esUrl,
        'x-default': esUrl,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: selfUrl,
      type: 'article',
    },
  };
}

export default async function ParkingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale === 'zh' || locale === 'en' || locale === 'es' ? locale : 'es') as Locale;
  const page = content[currentLocale];
  const pageUrl = `${BASE_URL}/${currentLocale}/estacionamiento-expiatorio`;
  const homeUrl = `${BASE_URL}/${currentLocale}`;

  setRequestLocale(currentLocale);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: currentLocale === 'es' ? 'Parque Expiatorio' : 'Expiatorio Park',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: pageUrl,
    about: {
      '@id': ATTRACTION.ATTRACTION_ENTITY_ID,
      name: currentLocale === 'es' ? 'Parque Expiatorio' : 'Expiatorio Park',
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <a
            href={`/${currentLocale}`}
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {page.back}
          </a>

          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {page.h1}
          </h1>
          <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            {page.intro}
          </p>
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            {page.updated}
          </p>

          <div className="space-y-6 mb-10">
            {page.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl p-6"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section
            className="rounded-2xl p-6 mb-10"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
          >
            <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {page.tipsTitle}
            </h2>
            <ul className="space-y-3">
              {page.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-4">
            <a
              href={ATTRACTION.MAPS_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {page.ctaPrimary}
            </a>
            <a
              href={`/${currentLocale}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              {page.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
