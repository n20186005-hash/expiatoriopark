import { ATTRACTION } from './site';

/** 天气查询坐标（与景点实体坐标一致） */
export const WEATHER_LAT = ATTRACTION.LATITUDE;
export const WEATHER_LON = ATTRACTION.LONGITUDE;

/** Open-Meteo 天气预报响应（取用其中所需字段） */
export interface OpenMeteoResponse {
  timezone: string;
  current?: {
    time: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
    is_day?: number;
    precipitation?: number;
    wind_speed_10m?: number;
    uv_index?: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    precipitation_probability_max: (number | null)[];
    uv_index_max?: (number | null)[];
    wind_speed_10m_max?: (number | null)[];
  };
}

/** 将 WMO 天气代码归类为可展示的状态 key（对应各语言 messages.weather.conditions.*） */
export function conditionKey(code: number, isDay = true): string {
  if (code === 0) return isDay ? 'sunny' : 'clear';
  if (code === 1) return isDay ? 'sunny' : 'clear';
  if (code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code === 51 || code === 53 || code === 55) return 'drizzle';
  if (code === 56 || code === 57) return 'freezingDrizzle';
  if (code >= 61 && code <= 65) return 'rain';
  if (code === 66 || code === 67) return 'freezingRain';
  if (code >= 71 && code <= 75) return 'snow';
  if (code === 77) return 'snowGrains';
  if (code >= 80 && code <= 82) return 'showers';
  if (code === 85 || code === 86) return 'snowShowers';
  if (code === 95) return 'thunder';
  return 'hail'; // 96 / 99
}

/**
 * 拉取 Expiatorio Park 的实时天气与未来 7 日预报。
 *
 * 说明：本站为静态站，此函数在浏览器端请求；如需在服务端渲染时获取，
 * 可在 Server Component 中以 `fetch(url, { next: { revalidate: 900 } })` 方式调用，
 * 利用框架的数据缓存做到约 15 分钟级刷新。UI 层面不会暴露任何接口来源说明。
 */
export async function fetchWeather(signal?: AbortSignal): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: String(WEATHER_LAT),
    longitude: String(WEATHER_LON),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,precipitation,wind_speed_10m,uv_index',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max',
    timezone: 'America/Mexico_City',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
    signal,
  });
  if (!res.ok) {
    throw new Error('Weather request failed');
  }
  return (await res.json()) as OpenMeteoResponse;
}
