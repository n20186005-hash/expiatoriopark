import { useLocale } from 'next-intl';

const copy = {
  zh: { title: '关于 Expiatorio Park · 管理主体', text: 'Expiatorio Park 是瓜达拉哈拉 Colonia Americana 的城市公共广场，日常公共空间维护和市政管理由瓜达拉哈拉市政府相关部门负责。紧邻广场的至圣圣礼赎罪教堂属于独立的宗教场所，并不等同于市政公园。这里将哥特复兴式建筑与街区生活连接起来，适合步行观景、拍摄建筑与探索附近的大学艺术设施。具体活动与临时管理安排以当地公告为准。' },
  en: { title: 'About Expiatorio Park · Management', text: 'Expiatorio Park is a public urban plaza in Guadalajara’s Colonia Americana. Municipal public-space management and maintenance fall under the relevant Guadalajara city authorities. The neighboring Templo Expiatorio is a separate religious property, not part of the municipal park administration. The plaza connects Gothic Revival architecture with everyday neighborhood life and offers a useful starting point for short walks to nearby university arts venues. Check local notices for temporary arrangements.' },
  es: { title: 'Sobre el Parque Expiatorio · Gestión', text: 'El Parque Expiatorio es una plaza pública urbana de la colonia Americana de Guadalajara. La administración y el mantenimiento del espacio público corresponden a las autoridades municipales competentes del Ayuntamiento de Guadalajara. El Templo Expiatorio contiguo es un recinto religioso independiente y no forma parte de la administración de la plaza. Este lugar conecta la arquitectura neogótica con la vida cotidiana del barrio y permite iniciar recorridos a pie hacia espacios culturales universitarios. Consulta los avisos locales ante cambios temporales.' },
};

export default function ParkManagement() {
  const locale = useLocale();
  const c = copy[locale as keyof typeof copy] || copy.es;
  return <section id="management" className="section-padding" style={{ background: 'var(--bg-secondary)' }}><div className="max-w-5xl mx-auto"><h2 className="font-display text-3xl sm:text-4xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{c.title}</h2><div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }}/><p className="leading-8 max-w-4xl" style={{ color: 'var(--text-secondary)' }}>{c.text}</p></div></section>;
}
