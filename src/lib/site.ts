/**
 * 单景点 SEO 实体绑定配置
 * =====================
 * 全站统一引用该文件，将网站与 Google 上的实体(Expiatorio Park)一一绑定。
 *
 * 域名动态化：
 * - 构建 / 部署环境可注入 NEXT_PUBLIC_SITE_DOMAIN（如 Cloudflare Pages / CI 中设置）
 *   => NEXT_PUBLIC_SITE_DOMAIN=expiatoriopark.com npm run cf:deploy
 * - 未注入时安全回退主域名，保证本地构建产物一致、不写死第二套域名。
 * 注意：这是静态导出站，任何改动都需重新执行构建后部署。
 */
const resolveSiteDomain = (): string => {
  const envDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || '';
  if (envDomain) {
    // 容错：容忍误带协议 / 末尾斜杠 / 空白
    return envDomain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  }
  return 'expiatoriopark.com';
};

const SITE_DOMAIN = resolveSiteDomain();

export const ATTRACTION = {
  // 域名（动态注入，见上）
  DOMAIN_NAME: SITE_DOMAIN,
  // 景点官方全称（Google Maps 挂牌名）
  ATTRACTION_FULL_NAME: 'Expiatorio Park',
  // 常用俗称 / 域名的对应含义（西语名）
  ATTRACTION_SHORT_NAME: 'Parque Expiatorio',
  // 所在城市 / 城镇
  CITY_NAME: 'Guadalajara',
  // 所在省 / 州
  STATE_PROVINCE: 'Jalisco',
  // 所在国家
  COUNTRY_NAME: 'Mexico',
  // 两位国家代码
  COUNTRY_CODE_2LETTER: 'MX',
  // 邮政编码
  POSTAL_CODE: '44160',
  // 纬度 / 经度（来自官方嵌入参数）
  LATITUDE: 20.6730137,
  LONGITUDE: -103.3588943,
  // Google Maps 分享短链接
  MAPS_SHARE_URL: 'https://maps.app.goo.gl/7LuiFPvzPmf6TEYk9',
  // Google Maps 官方嵌入 src
  MAPS_EMBED_SRC:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.915569046086!2d-103.35889429999999!3d20.6730137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae027ac79cfb%3A0xc522c9fc77abf26!2sExpiatorio%20Park!5e0!3m2!1sen!2s!4v1788745939853!5m2!1sen!2s',
  // 周边核心地标
  NEARBY_LANDMARK_1: 'Templo Expiatorio',
  NEARBY_LANDMARK_2: 'MUSA (Museo de las Artes)',
  // 官方政府 / 旅游局链接（哈利斯科州政府旅游局，.gob.mx）
  GOVT_TOURISM_URL: 'https://secturjal.jalisco.gob.mx/',
  GOVT_TOURISM_LABEL: 'Mexico / Jalisco Official Tourism Portal',
  // Google 评分（最新）
  RATING: '4.7',
  REVIEW_COUNT: '8,196',
  // 结构化实体锚点
  ATTRACTION_ENTITY_ID: `https://${SITE_DOMAIN}/#attraction`,
};

export const BASE_URL = `https://${SITE_DOMAIN}`;

/** 社交分享 / Schema 使用的站点主图（URL 编码括号以保证正确解析） */
export const OG_IMAGE_URL = `${BASE_URL}/gallery/expiatorio-park-guadalajara-11.jpg`;

/** Google Analytics 4 测量 ID */
export const GA4_ID = 'G-HXM22WWPKP';

/** 本地化实体主名：不同语言主页对应的常用名 */
export const LOCALIZED_ENTITY_NAME: Record<string, string> = {
  zh: 'Expiatorio Park',
  en: 'Expiatorio Park',
  es: 'Parque Expiatorio',
};

export const LOCALIZED_ENTITY_ALT: Record<string, string> = {
  zh: 'Parque Expiatorio',
  en: 'Parque Expiatorio',
  es: 'Expiatorio Park',
};
