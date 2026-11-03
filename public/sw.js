/* Expiatorio Park PWA Service Worker
 * Keep documents and Next.js bundles on the network. A cached document from an
 * older deployment can reference JS chunks that no longer exist, crashing the
 * client during hydration.
 */
const CACHE_NAME = 'expiatorio-park-v2';
const PRECACHE_URLS = [
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Only cache non-executable, non-HTML assets for offline use.
function isCacheableAsset(pathname) {
  return pathname === '/manifest.webmanifest' ||
    pathname.startsWith('/gallery/') ||
    pathname.startsWith('/icons/');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Remove the old cache-first HTML/JS cache when this worker activates.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('expiatorio-park-') && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Never intercept page navigations, /_next/ JS, CSS, or RSC requests.
// Images and icons use network-first, falling back to the cache if offline.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || request.mode === 'navigate') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !isCacheableAsset(url.pathname)) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
