import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import {
  ATTRACTION,
  BASE_URL,
  OG_IMAGE_URL,
  GA4_ID,
} from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${BASE_URL}/zh`;
  const enUrl = `${BASE_URL}/en`;
  const esUrl = `${BASE_URL}/es`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'es') selfUrl = esUrl;

  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'es': 'es_MX',
  };

  return {
    metadataBase: new URL(BASE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: [
      ATTRACTION.ATTRACTION_FULL_NAME,
      ATTRACTION.ATTRACTION_SHORT_NAME,
      ATTRACTION.CITY_NAME,
      ATTRACTION.STATE_PROVINCE,
      ATTRACTION.COUNTRY_NAME,
      ATTRACTION.NEARBY_LANDMARK_1,
      'Guadalajara Park',
    ],
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': esUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: ATTRACTION.ATTRACTION_FULL_NAME,
      locale: localeMap[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: OG_IMAGE_URL,
          alt: `${ATTRACTION.ATTRACTION_FULL_NAME} in ${ATTRACTION.CITY_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'es': 'es',
  };

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        {/* ===== TDK / OG / Canonical (由 generateMetadata 注入) ===== */}

        {/* PWA / Icons */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2d6375" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0c1a14" />
        <link rel="icon" type="image/png" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* Google Analytics 4（同意门控：仅在用户接受“分析型 Cookie”后才注入 gtag.js） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

    var GA_ID = '${GA4_ID}';
    var disableFlag = 'ga-disable-' + GA_ID;

    // 未取得同意前：默认拒绝 analytics_storage，且不加载 gtag.js
    gtag('consent', 'default', { 'analytics_storage': 'denied' });

    function injectGTag() {
      if (document.getElementById('gtag-ga4')) return;
      var s = document.createElement('script');
      s.id = 'gtag-ga4';
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', GA_ID, { 'anonymize_ip': true });
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }

    // 供 Cookie 设置页在保存/拒绝后即时调用
    window.__setAnalytics = function (enabled) {
      window[disableFlag] = enabled ? false : true;
      if (enabled) injectGTag();
    };

    var prefs = {};
    try { prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}'); } catch (e) {}
    if (prefs.analytics) window.__setAnalytics(true);
  } catch (e) {}
})();`,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {/* PWA Service Worker 注册 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(e) {
                      console.warn('Service worker registration failed:', e);
                    });
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
