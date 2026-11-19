import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { nearbyCopy, nearbyPlaces, type NearbySlug } from '@/lib/nearby';
import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/site';
import { nearbyDetails } from '@/lib/nearbyDetails';
import JsonLd from '@/components/JsonLd';

const ui = {
  zh: { back: '返回公园指南', overview: '探索景点', tips: '游览建议', features: '景点特色', about: '关于景点与管理主体', basics: '基本信息', address: '地址', duration: '建议停留', hours: '开放时间与门票', hoursText: '根据当日活动或管理安排调整，请查看官方公告及现场信息。', transport: '交通方式', transportText: '可从 Expiatorio Park 步行前往；驾驶者应另行查询周边停车条件。', history: '历史背景', architecture: '建筑与观察重点', route: '建议步行路线', photos: '拍摄机位', faq: '常见问答', maps: '打开该景点 Google 地图', source: '参考来源', photo: '照片来源', nearby: '继续探索周边景点', type: '景点类型', operator: '管理主体', admission: '门票与费用', culture: '文化与核心体验', caution: '游览须知', stay: '住宿建议', reviews: '游客评价', direction: '交通指南与地点导航', verified: '开放资料核对：2026 年 11 月 19 日', rating: '即时评分请查看 Google 地图', official: '官方开放信息' },
  en: { back: 'Back to park guide', overview: 'Explore', tips: 'Visiting tips', features: 'Highlights', about: 'About & management', basics: 'Essential information', address: 'Address', duration: 'Suggested visit', hours: 'Hours & admission', hoursText: 'Schedules depend on events and management decisions; check official and on-site notices.', transport: 'Getting there', transportText: 'Walk from Expiatorio Park; drivers should check local parking arrangements separately.', history: 'History', architecture: 'Architecture & what to notice', route: 'Suggested walking route', photos: 'Photo spots', faq: 'Frequently asked questions', maps: 'Open this place in Google Maps', source: 'Primary source', photo: 'Photo source', nearby: 'Explore another nearby landmark', type: 'Place type', operator: 'Managed by', admission: 'Tickets and costs', culture: 'Culture & key experiences', caution: 'Before you visit', stay: 'Where to stay', reviews: 'Visitor reviews', direction: 'Directions & map', verified: 'Hours information checked: November 19, 2026', rating: 'See Google Maps for live rating', official: 'Official visit information' },
  es: { back: 'Volver a la guía del parque', overview: 'Descubre el lugar', tips: 'Consejos de visita', features: 'Puntos de interés', about: 'Sobre el lugar y su gestión', basics: 'Información básica', address: 'Dirección', duration: 'Visita sugerida', hours: 'Horarios y entrada', hoursText: 'Los horarios pueden variar por eventos o decisiones administrativas; consulta los avisos oficiales y del recinto.', transport: 'Cómo llegar', transportText: 'Se puede caminar desde el Parque Expiatorio; consulta por separado las opciones de estacionamiento.', history: 'Historia', architecture: 'Arquitectura y detalles', route: 'Ruta a pie sugerida', photos: 'Lugares para fotografiar', faq: 'Preguntas frecuentes', maps: 'Ver este lugar en Google Maps', source: 'Fuente de referencia', photo: 'Fuente de fotografía', nearby: 'Explora otro lugar cercano', type: 'Tipo de lugar', operator: 'Administración', admission: 'Entradas y costos', culture: 'Cultura y experiencias', caution: 'Antes de visitar', stay: 'Dónde alojarse', reviews: 'Opiniones de visitantes', direction: 'Indicaciones y mapa', verified: 'Información de horarios revisada: 19 de noviembre de 2026', rating: 'Consulta Google Maps para la valoración actual', official: 'Información oficial de visita' },
};

const templeSearchTitles = {
  zh: '瓜达拉哈拉赎罪教堂：开放时间、建筑与交通指南',
  en: 'Templo Expiatorio Guadalajara: Hours, Architecture & Directions',
  es: 'Templo Expiatorio Guadalajara: Horarios, Cómo Llegar y Arquitectura',
};

const parkingRelated = {
  zh: { title: '如何前往及停车', text: '若自驾参观教堂，先查看附近停车场的收费与最晚取车时间。', link: '查看停车指南' },
  en: { title: 'Directions and parking', text: 'If driving to the church, check the nearby parking options, rates and latest exit times first.', link: 'Read the parking guide' },
  es: { title: 'Cómo llegar y dónde estacionarse', text: 'Si llega en coche, revise las opciones de estacionamiento, tarifas y horarios de salida antes de entrar.', link: 'Ver guía de estacionamiento' },
};

export function generateStaticParams() {
  return ['zh', 'en', 'es'].flatMap(locale => Object.keys(nearbyPlaces).map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(locale in nearbyCopy) || !(slug in nearbyPlaces)) return {};
  const item = nearbyCopy[locale][slug as NearbySlug];
  const canonical = `${BASE_URL}/${locale}/nearby/${slug}/`;
  const title = slug === 'templo-expiatorio' ? templeSearchTitles[locale as keyof typeof templeSearchTitles] : `${item.title} | Expiatorio Park`;
  return { title, description: item.intro, alternates: { canonical, languages: Object.fromEntries(['zh', 'en', 'es'].map(l => [l, `${BASE_URL}/${l}/nearby/${slug}/`])) }, openGraph: { title, description: item.tagline, url: canonical, images: [nearbyPlaces[slug as NearbySlug].image] } };
}

export default async function NearbyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!(locale in ui) || !(slug in nearbyPlaces)) notFound();
  setRequestLocale(locale);
  const l = locale as keyof typeof ui;
  const id = slug as NearbySlug;
  const t = ui[l];
  const place = nearbyPlaces[id];
  const copy = nearbyCopy[l][id];
  const detail = nearbyDetails[l][id];
  const related = (Object.keys(nearbyPlaces) as NearbySlug[]).filter(item => item !== id).slice(0, 4);
  const pageUrl = `${BASE_URL}/${locale}/nearby/${slug}/`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': id === 'musa-museo-de-las-artes' ? 'Museum' : id === 'parque-de-la-revolucion' ? 'Park' : 'PlaceOfWorship',
    name: copy.title,
    description: copy.intro,
    url: pageUrl,
    image: place.image.startsWith('https://') ? place.image : `${BASE_URL}${place.image}`,
    address: { '@type': 'PostalAddress', streetAddress: place.address, addressLocality: 'Guadalajara', addressRegion: 'Jalisco', addressCountry: 'MX' },
    hasMap: place.map,
  };

  return <>
    <JsonLd data={placeSchema} />
    <JsonLd data={faqSchema} />
    <Header />
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <section className="pt-28 pb-12 px-5" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <a href={`/${locale}/#nearby`} className="text-sm underline" style={{ color: 'var(--accent)' }}>← {t.back}</a>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-8 mb-4">{copy.title}</h1>
          <p className="text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>{copy.tagline}</p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{place.address}</p>
          <div className="flex flex-wrap gap-2 mb-6 text-sm"><span className="rounded-full px-4 py-2" style={{ background: 'var(--bg-primary)' }}>{detail.duration}</span><span className="rounded-full px-4 py-2" style={{ background: 'var(--bg-primary)' }}>{t.rating}</span></div>
          <a href={place.map} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg px-5 py-3 text-white" style={{ background: 'var(--accent)' }}>{t.maps} ↗</a>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-10">
        <img src={place.image} alt={copy.title} className="rounded-2xl w-full max-h-[550px] object-cover" />
        <h2 className="font-display text-3xl font-semibold mt-10 mb-4">{t.overview}</h2>
        <p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{copy.intro}</p>
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <article className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h3 className="text-xl font-semibold mb-3">{t.tips}</h3><p className="leading-7">{copy.tips}</p></article>
          <article className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h3 className="text-xl font-semibold mb-3">{t.features}</h3><p className="leading-7">{copy.highlights}</p></article>
        </div>
      </section>
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto"><h2 className="font-display text-3xl font-semibold mb-5">{t.about}</h2><p className="leading-8 max-w-3xl">{copy.management}</p></div></section>
      <section className="section-padding"><div className="max-w-5xl mx-auto space-y-12">
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.basics}</h2><dl className="grid md:grid-cols-2 gap-5 rounded-2xl p-6" style={{ background: 'var(--bg-secondary)' }}><div><dt className="font-semibold">{t.address}</dt><dd>{place.address}</dd></div><div><dt className="font-semibold">{t.duration}</dt><dd>{detail.duration}</dd></div><div><dt className="font-semibold">{t.type}</dt><dd>{detail.type}</dd></div><div><dt className="font-semibold">{t.operator}</dt><dd>{detail.operator}</dd></div></dl></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.hours}</h2><p className="leading-8">{detail.hours}</p><p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{t.verified}</p><a className="underline mt-2 inline-block" href={detail.official} target="_blank" rel="noopener noreferrer">{t.official} ↗</a></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.admission}</h2><p className="leading-8">{detail.admission}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.transport}</h2><p className="leading-8">{detail.transport}</p><a className="underline mt-3 inline-block" href={place.map} target="_blank" rel="noopener noreferrer">{t.maps} ↗</a></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.history}</h2><p className="leading-8">{copy.history}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.architecture}</h2><p className="leading-8">{copy.architecture}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.culture}</h2><p className="leading-8">{copy.highlights}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.route}</h2><ol className="list-decimal pl-6 space-y-3">{copy.route.map(step => <li key={step}>{step}</li>)}</ol></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.caution}</h2><p className="leading-8">{detail.practical}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.photos}</h2><p>{copy.photos}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.stay}</h2><p className="leading-8">{detail.stay}</p></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.reviews}</h2><p className="leading-8">{detail.reviews}</p><a href={place.map} target="_blank" rel="noopener noreferrer" className="underline mt-3 inline-block">{t.maps} ↗</a></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.faq}</h2><div className="space-y-5">{copy.faq.map(([q, a]) => <div key={q}><h3 className="font-semibold mb-2">{q}</h3><p>{a}</p></div>)}</div></div>
        <div><h2 className="font-display text-3xl font-semibold mb-4">{t.direction}</h2><p className="mb-4">{place.address}</p><a href={place.map} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg px-5 py-3 text-white" style={{ background: 'var(--accent)' }}>{t.maps} ↗</a></div>
        {id === 'templo-expiatorio' && <div className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-display text-2xl font-semibold mb-3">{parkingRelated[l].title}</h2><p className="mb-3">{parkingRelated[l].text}</p><a href={`/${locale}/estacionamiento-expiatorio/`} className="underline" style={{ color: 'var(--accent)' }}>{parkingRelated[l].link} →</a></div>}
        <div className="text-sm flex flex-wrap gap-6"><a className="underline" href={place.source} target="_blank" rel="noopener noreferrer">{t.source} ↗</a><a className="underline" href={place.photo} target="_blank" rel="noopener noreferrer">{t.photo} ↗</a></div>
        <div className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-semibold text-xl mb-3">{t.nearby}</h2><ul className="grid sm:grid-cols-2 gap-3">{related.map(other => <li key={other}><a className="underline" href={`/${locale}/nearby/${other}/`}>{nearbyCopy[l][other].title} →</a></li>)}</ul></div>
      </div></section>
    </main>
    <Footer />
  </>;
}
