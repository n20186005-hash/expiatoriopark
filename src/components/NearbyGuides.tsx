import { useLocale } from 'next-intl';
import { nearbyCopy, nearbyPlaces, type NearbySlug } from '@/lib/nearby';

const labels = {
  zh: { title: '周边景点深度指南', text: '从公园步行探索教堂建筑与大学艺术空间，每个地点都有独立的资料与地图。', view: '阅读景点指南' },
  en: { title: 'Explore nearby landmarks', text: 'Walk from the park to architectural and university arts landmarks, each with its own guide and map.', view: 'Read the place guide' },
  es: { title: 'Explora los lugares cercanos', text: 'Desde el parque, descubre arquitectura y arte universitario con guías y mapas específicos.', view: 'Ver la guía' },
};

export default function NearbyGuides() {
  const locale = useLocale();
  const lang = locale in labels ? locale as keyof typeof labels : 'es';
  const t = labels[lang];
  return <section id="nearby-guides" className="section-padding" style={{ background: 'var(--bg-primary)' }}><div className="max-w-5xl mx-auto"><h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.title}</h2><p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{t.text}</p><div className="grid md:grid-cols-2 gap-6">{(Object.keys(nearbyPlaces) as NearbySlug[]).map(slug => <a key={slug} href={`/${lang}/nearby/${slug}/`} className="rounded-2xl overflow-hidden block transition-transform hover:-translate-y-1" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><img src={nearbyPlaces[slug].image} alt={nearbyCopy[lang][slug].title} className="w-full h-56 object-cover"/><div className="p-6"><h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{nearbyCopy[lang][slug].title}</h3><p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{nearbyCopy[lang][slug].tagline}</p><span className="text-sm underline" style={{ color: 'var(--accent)' }}>{t.view} →</span></div></a>)}</div></div></section>;
}
