import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/site';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const zhUrl = `${BASE_URL}/zh/cookie-settings`;
  const enUrl = `${BASE_URL}/en/cookie-settings`;
  const esUrl = `${BASE_URL}/es/cookie-settings`;
  const selfUrl = locale === 'zh' ? zhUrl : locale === 'en' ? enUrl : esUrl;

  return {
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': esUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
