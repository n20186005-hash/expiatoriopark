/**
 * 天气出行建议引擎（面向普通游客）
 * ================================
 * 输入：单日天气事实（WMO 代码 / 最高最低温 / 降水概率 / UV / 日级最大风速）
 * 输出：按「出行穿搭 / 游玩安排 / 随身物品 / 风险提醒」分组、动态命中、口语化的建议条目。
 *
 * 设计要点（对齐产品规则）：
 * - 风险提醒优先级最高，一旦命中由 UI 置顶红色展示；无预警时整体隐藏。
 * - 每个建议由规则产生“文案 key”，显示文本取自多语言文案库 UI[i18n]。phrases，
 *   引擎本身与展示语言解耦，便于以后扩展其他语言。
 * - 该景点为城市开放广场（瓜达拉哈拉市中心），规则贴近「城市人文」场景，
 *   不虚构海边 / 登山 / 漂流等与当地无关的环境风险。
 */

export type AdviceLocale = 'zh' | 'en' | 'es';

export type AdviceGroup = 'outfit' | 'plan' | 'gear' | 'risk';

export interface WeatherFacts {
  /** WMO 天气代码（日级） */
  wmo: number;
  /** 当日最高温（℃） */
  high: number | null;
  /** 当日最低温（℃） */
  low: number | null;
  /** 降水概率 0-100 */
  precipProb: number | null;
  /** 紫外线指数 */
  uv: number | null;
  /** 白天最大风速 km/h */
  windKmh: number | null;
}

export interface AdviceItem {
  group: AdviceGroup;
  /** 对应多语文案库文案 key */
  key: string;
}

export interface AdviceLocaleText {
  group: { outfit: string; plan: string; gear: string; risk: string };
  /** 无预警时的安抚提示 */
  noRisk: string;
  /** 今日天气概览标题 */
  overview: string;
  /** 概览指标标题 */
  fact: {
    tempRange: string;
    precip: string;
    wind: string;
    uv: string;
  };
  /** 紫外线档位文案 */
  uvLevel: { weak: string; moderate: string; strong: string; veryStrong: string };
  /** 全部建议文案 */
  phrases: Record<string, string>;
}

/* ==================== 多语文案库 ==================== */

const zh: AdviceLocaleText = {
  group: { outfit: '出行穿搭', plan: '游玩安排', gear: '随身物品', risk: '风险提醒' },
  noRisk: '当前无气象预警，可按原计划出行',
  overview: '今日天气概览',
  fact: {
    tempRange: '今日气温',
    precip: '降水概率',
    wind: '白天最大风',
    uv: '紫外线',
  },
  uvLevel: { weak: '弱', moderate: '中等', strong: '强', veryStrong: '很强' },
  phrases: {
    p_rain_prob_plan: '降雨概率较高（≥60%），优先安排室内展馆或咖啡馆，户外行程建议留出弹性',
    p_rain_prob_gear: '雨伞 / 便携雨衣',
    p_rain_light_outfit: '有小雨，路面湿滑，穿防滑鞋并留意脚下',
    p_rain_light_plan: '短时小雨影响有限，短程户外仍可安排，随身备伞更稳妥',
    p_rain_light_gear: '折叠伞',
    p_rain_heavy_plan: '不建议长时间户外游玩，优先 MUSA 等室内展馆，游园与露天活动顺延',
    p_rain_heavy_gear: '雨衣（风大时不宜长柄伞）',
    p_rain_heavy_risk: '降雨较强：避开低洼积水路段，远离大树与临时搭棚',
    p_thunder_plan: '雷雨时段避免露天游览，就近转入室内避雷，关注天气变化再出发',
    p_thunder_risk: '雷雨天气：勿在开阔广场逗留，远离大树、灯杆等高处物体，谨防雷电',
    p_fog_plan: '雾通常在上午逐渐散去，午后更适合观景与拍照',
    p_fog_risk: '大雾能见度差，注意出行交通安全，观景效果会受影响',
    p_wind_plan: '风力 5–6 级，露天伞座与观景区域受风影响，注意遮挡',
    p_wind_risk: '大风天气：注意高空坠物与临时构筑物，固定好帽子与伞具',
    p_heat_outfit: '气温较高，穿轻薄透气衣物，正午尽量待在阴凉处',
    p_heat_plan: '正午 12–16 点日照强，安排室内或树荫休息，缩短暴晒时间',
    p_heat_gear: '充足饮用水与防暑用品',
    p_uv_gear: '防晒霜、墨镜、遮阳帽',
    p_diff_outfit: '昼夜温差较大，备一件薄外套便于早晚增减',
    p_cold_outfit: '气温偏低，建议多穿一层保暖',
    p_cold_gear: '厚外套（早晚出行更稳妥）',
    p_clear_plan: '晴好天气适合白天逛公园与教堂，傍晚（17 点后）逛夜市体验更佳',
    p_clear_outfit: '天气舒适，常规出行着装即可',
    p_partly_plan: '多云间晴，体感舒适，适合公园散步观光',
    p_overcast_plan: '阴天光线柔和、无暴晒，适合较长时间的户外漫步与拍照',
    p_fine_default: '天气平稳，可按原计划在公园及周边游览',
  },
};

const en: AdviceLocaleText = {
  group: { outfit: 'What to wear', plan: 'Plan your visit', gear: 'What to pack', risk: 'Safety notice' },
  noRisk: 'No active weather alerts — feel free to follow your usual plan',
  overview: "Today's outlook",
  fact: {
    tempRange: 'High / low',
    precip: 'Chance of rain',
    wind: 'Max wind (day)',
    uv: 'UV index',
  },
  uvLevel: { weak: 'Low', moderate: 'Moderate', strong: 'High', veryStrong: 'Very high' },
  phrases: {
    p_rain_prob_plan:
      'High chance of rain (60%+) — line up indoor sights or a café first and keep outdoor plans flexible',
    p_rain_prob_gear: 'Umbrella / packable raincoat',
    p_rain_light_outfit: 'Light rain — streets can be slick, wear slip-resistant shoes and watch your step',
    p_rain_light_plan: 'Light showers won’t last long; short outdoor walks are fine if you stay close to cover',
    p_rain_light_gear: 'Compact umbrella',
    p_rain_heavy_plan:
      'Long outdoor time not advised — head to indoor venues like MUSA and reschedule park strolling',
    p_rain_heavy_gear: 'Raincoat (skip long umbrellas when it’s windy)',
    p_rain_heavy_risk: 'Heavy rain — avoid low-lying flooded spots, big trees and temporary stalls',
    p_thunder_plan: 'Stay away from open-air sightseeing during thunderstorms; take shelter indoors nearby',
    p_thunder_risk: 'Lightning risk — avoid open areas, tall trees and lamp posts; keep off the plaza',
    p_fog_plan: 'Fog usually clears by late morning — save the best views for later',
    p_fog_risk: 'Dense fog — take extra care on the streets and expect limited views',
    p_wind_plan: 'Winds of 5–6 on the scale — outdoor seating and viewpoints may be gusty, so find shelter',
    p_wind_risk: 'Strong wind — watch for falling objects and loose structures; secure hats and umbrellas',
    p_heat_outfit: 'It’s hot — wear light, breathable clothes and stick to shade around midday',
    p_heat_plan: 'Strong midday sun (12–4 pm) — rest indoors or in shade and limit time in the sun',
    p_heat_gear: 'Plenty of drinking water and heat protection',
    p_uv_gear: 'Sunscreen, sunglasses and a sun hat',
    p_diff_outfit: 'Big day–night temperature swing — bring a light layer for the evening',
    p_cold_outfit: 'It’s cool — dress warmly in layers',
    p_cold_gear: 'Warm jacket (extra useful in the morning or evening)',
    p_clear_plan:
      'Clear, fine weather — great for the park and church by day; the evening market (after ~5 pm) is a highlight',
    p_clear_outfit: 'Comfortable — regular casual wear works fine',
    p_partly_plan: 'Partly sunny and comfortable — ideal for strolling around the park',
    p_overcast_plan: 'Soft overcast light with no harsh sun — perfect for a longer outdoor walk and photos',
    p_fine_default: 'Weather is stable — keep your original plan around the park and nearby sights',
  },
};

const es: AdviceLocaleText = {
  group: { outfit: 'Qué llevar', plan: 'Organiza tu visita', gear: 'Qué empacar', risk: 'Aviso de seguridad' },
  noRisk: 'Sin avisos meteorológicos activos — puedes seguir tu plan habitual',
  overview: 'Resumen de hoy',
  fact: {
    tempRange: 'Máx / mín',
    precip: 'Prob. de lluvia',
    wind: 'Viento máx. (día)',
    uv: 'Índice UV',
  },
  uvLevel: { weak: 'Bajo', moderate: 'Moderado', strong: 'Alto', veryStrong: 'Muy alto' },
  phrases: {
    p_rain_prob_plan:
      'Alta probabilidad de lluvia (≥60%) — prioriza museos o cafés y deja flexibles los planes al aire libre',
    p_rain_prob_gear: 'Paraguas o impermeable compacto',
    p_rain_light_outfit: 'Lluvia ligera, pisos resbaladizos: usa calzado antideslizante y ten cuidado',
    p_rain_light_plan: 'La lluvia corta no molesta mucho; puedes caminar un poco si no te alejas del refugio',
    p_rain_light_gear: 'Paraguas plegable',
    p_rain_heavy_plan:
      'No conviene estar mucho tiempo al aire libre; elige sitios cerrados como el MUSA y aplaza el paseo',
    p_rain_heavy_gear: 'Impermeable (evita paraguas largos si hay viento)',
    p_rain_heavy_risk: 'Lluvia intensa: evita zonas bajas inundadas, árboles grandes y toldos temporales',
    p_thunder_plan: 'Evita la vista al aire libre durante tormentas; resguárdate pronto en interiores',
    p_thunder_risk: 'Riesgo de rayos: no permanezcas en zonas abiertas ni cerca de árboles o postes altos',
    p_fog_plan: 'La niebla suele disiparse a media mañana; guarda las mejores vistas para después',
    p_fog_risk: 'Niebla densa: extremo cuidado al caminar y visibilidad reducida',
    p_wind_plan: 'Viento 5–6 en la escala: las terrazas y miradores pueden sentir ráfagas; busca resguardo',
    p_wind_risk: 'Viento fuerte: cuidado con objetos que caen; sujeta gorras y paraguas',
    p_heat_outfit: 'Hace calor: ropa ligera y transpirable; busca sombra al mediodía',
    p_heat_plan: 'Sol fuerte de 12 a 16 h: descansa en interiores o sombra y evita exponerte',
    p_heat_gear: 'Suficiente agua y protección contra el calor',
    p_uv_gear: 'Protector solar, gafas de sol y sombrero',
    p_diff_outfit: 'Gran contraste térmico día-noche: lleva una chaqueta ligera para la tarde',
    p_cold_outfit: 'Temperaturas bajas: abrígate por capas',
    p_cold_gear: 'Chaqueta abrigada (útil por la mañana o noche)',
    p_clear_plan:
      'Tiempo despejado: ideal para el parque y el templo de día; por la tarde (desde las ~17 h) el mercado nocturno',
    p_clear_outfit: 'Clima agradable: basta ropa casual cómoda',
    p_partly_plan: 'Parcialmente nublado y agradable: perfecto para pasear por el parque',
    p_overcast_plan:
      'Luz suave sin sol fuerte: buen momento para caminar más tiempo al aire libre y fotografiar',
    p_fine_default: 'El tiempo está estable: mantén tu plan por el parque y sus alrededores',
  },
};

export const ADVICE_UI: Record<AdviceLocale, AdviceLocaleText> = { zh, en, es };

export function adviceUiFor(locale: string): AdviceLocaleText {
  return ADVICE_UI[locale as AdviceLocale] ?? ADVICE_UI.en;
}

/* ==================== WMO 代码分档 ==================== */

const isStorm = (code: number) => code === 95 || code === 96 || code === 99;
const isFog = (code: number) => code === 45 || code === 48;
const isRainy = (code: number) =>
  (code >= 51 && code <= 67) || (code >= 80 && code <= 86) || isStorm(code);

/** 雨量分档：light / medium / heavy / none */
function rainIntensity(code: number): 'light' | 'medium' | 'heavy' | 'none' {
  if (isStorm(code)) return 'none'; // 雷雨单独处理，优先级更高
  if ([51, 53, 61, 80].includes(code)) return 'light';
  if ([55, 63, 81].includes(code)) return 'medium';
  if ([65, 82].includes(code)) return 'heavy';
  return 'none';
}

/** km/h 风速转蒲福风级（用于文案里的“5–6 级 / 7 级以上”） */
export function beaufort(kmh: number): number {
  const knots = kmh / 1.852;
  if (knots < 1) return 0;
  if (knots < 4) return 1;
  if (knots < 7) return 2;
  if (knots < 11) return 3;
  if (knots < 17) return 4;
  if (knots < 22) return 5;
  if (knots < 28) return 6;
  if (knots < 34) return 7;
  if (knots < 41) return 8;
  if (knots < 48) return 9;
  if (knots < 56) return 10;
  return 11;
}

export function uvLevelKey(uv: number): 'weak' | 'moderate' | 'strong' | 'veryStrong' {
  if (uv >= 8) return 'veryStrong';
  if (uv >= 6) return 'strong';
  if (uv >= 3) return 'moderate';
  return 'weak';
}

/* ==================== 建议引擎 ==================== */

function pushUnique(list: AdviceItem[], group: AdviceGroup, key: string) {
  if (!list.some((it) => it.key === key)) list.push({ group, key });
}

/**
 * 根据当日天气事实生成面向游客的动态建议。
 * - 天气预警/高风险条目进入 risk，由 UI 置顶红色展示；
 * - 其余按 outfit（出行穿搭）/ plan（游玩安排）/ gear（随身物品）分组；
 * - 命中的才返回，未命中一律不展示。
 */
export function suggestForToday(facts: WeatherFacts): AdviceItem[] {
  const out: AdviceItem[] = [];
  const code = facts.wmo;
  const high = facts.high;
  const low = facts.low;
  const precipProb = facts.precipProb ?? 0;
  const uv = facts.uv ?? 0;
  const wind = facts.windKmh ?? 0;
  const bft = beaufort(wind);

  const storm = isStorm(code);
  const fog = isFog(code);
  const rainy = isRainy(code);
  const rain = rainy ? rainIntensity(code) : 'none';
  const hot = (high ?? 0) >= 32;
  const cold = (high ?? 0) <= 10;
  const bigSwing = high != null && low != null && high - low > 8;

  /* ---- 风险提醒（优先级最高） ---- */
  if (storm) {
    pushUnique(out, 'risk', 'p_thunder_risk');
  }
  if (rain === 'heavy') {
    pushUnique(out, 'risk', 'p_rain_heavy_risk');
  }
  if (fog) {
    pushUnique(out, 'risk', 'p_fog_risk');
  }
  if (bft >= 7) {
    pushUnique(out, 'risk', 'p_wind_risk');
  }

  /* ---- 降雨 ---- */
  if (rainy) {
    if (rain === 'light') {
      pushUnique(out, 'outfit', 'p_rain_light_outfit');
      pushUnique(out, 'plan', 'p_rain_light_plan');
      pushUnique(out, 'gear', 'p_rain_light_gear');
    } else if (rain === 'medium' || rain === 'heavy') {
      pushUnique(out, 'plan', 'p_rain_heavy_plan');
      pushUnique(out, 'gear', 'p_rain_heavy_gear');
    }
  } else if (precipProb >= 60) {
    // 降水概率≠一定下雨：文案只建议“备伞/留弹性”，不写“必然降雨”
    pushUnique(out, 'plan', 'p_rain_prob_plan');
    pushUnique(out, 'gear', 'p_rain_prob_gear');
  }

  if (storm) {
    pushUnique(out, 'plan', 'p_thunder_plan');
  }

  /* ---- 大雾：观景受影响 ---- */
  if (fog) {
    pushUnique(out, 'plan', 'p_fog_plan');
  }

  /* ---- 风力（仅 5–6 级给提示，7 级及以上已进风险） ---- */
  if (!fog && (bft === 5 || bft === 6)) {
    pushUnique(out, 'plan', 'p_wind_plan');
  }

  /* ---- 高温 / 低温 / 昼夜温差 ---- */
  if (hot) {
    pushUnique(out, 'outfit', 'p_heat_outfit');
    pushUnique(out, 'plan', 'p_heat_plan');
    pushUnique(out, 'gear', 'p_heat_gear');
  } else if (cold) {
    pushUnique(out, 'outfit', 'p_cold_outfit');
    pushUnique(out, 'gear', 'p_cold_gear');
  } else if (bigSwing) {
    pushUnique(out, 'outfit', 'p_diff_outfit');
  }

  /* ---- 紫外线 ---- */
  if (uv >= 5 && !rainy) {
    pushUnique(out, 'gear', 'p_uv_gear');
  }

  /* ---- 晴 / 多云 / 阴（且无降雨干扰时给出场景化游玩建议） ----
     注：若降水概率已 ≥60%，上面已提示“以室内为主”，
     这里不再叠加“适合户外”的晴好文案，避免同一屏出现自相矛盾的建议。 */
  if (!rainy && !fog && !storm && precipProb < 60) {
    if (code <= 1) {
      if (!hot && !cold && !bigSwing) pushUnique(out, 'outfit', 'p_clear_outfit');
      if (!hot && !cold) pushUnique(out, 'plan', 'p_clear_plan');
    } else if (code === 2) {
      pushUnique(out, 'plan', 'p_partly_plan');
    } else if (code === 3) {
      pushUnique(out, 'plan', 'p_overcast_plan');
    }
  }

  /* ---- 平稳天气兜底 ---- */
  if (out.filter((it) => it.group !== 'risk').length === 0) {
    pushUnique(out, 'plan', 'p_fine_default');
  }

  return out;
}
