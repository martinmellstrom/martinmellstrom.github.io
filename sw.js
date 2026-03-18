// ═══════════════════════════════════════════════
//  SERVICE WORKER — Martin Mellström Music Player
//  Cache:ar app-skalet (player.html, oauth.html)
//  så att appen kan öppnas utan nät.
// ═══════════════════════════════════════════════

const CACHE_NAME = 'mm-player-v1';

// Filer att cache:a vid installation
const PRECACHE_URLS = [
  '/player.html',
  '/oauth.html',
];

// ── Install: cache:a app-skalet direkt ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // aktivera direkt utan att vänta
  );
});

// ── Activate: rensa gamla versioner av cachen ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // ta kontroll över alla öppna flikar direkt
  );
});

// ── Fetch: hantera nätverksförfrågningar ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignorera icke-GET-förfrågningar och Dropbox API-anrop
  if (event.request.method !== 'GET') return;
  if (url.hostname === 'api.dropboxapi.com' || url.hostname === 'www.dropbox.com') return;
  if (url.hostname === 'content.dropboxapi.com') return;

  // Google Fonts: network-first med cache-fallback
  // (försöker hämta nytt typsnitt, faller tillbaka på cachat om offline)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App-filer (player.html, oauth.html): cache-first
  // Returnerar cachat direkt — uppdaterar cachen i bakgrunden (stale-while-revalidate)
  if (url.hostname === 'martinmellstrom.github.io' || url.hostname === 'martinmellstrom.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => null);

        // Returnera cachad version direkt om den finns, annars vänta på nätverket
        return cached || networkFetch;
      })
    );
    return;
  }

  // Allt annat: passera igenom utan caching
});
