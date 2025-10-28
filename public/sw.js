// Service Worker for Playmat Companion PWA

const CACHE_NAME = 'playmat-companion-v1';
const STATIC_CACHE = 'playmat-static-v1';
const DYNAMIC_CACHE = 'playmat-dynamic-v1';

// Files to cache immediately on install - ONLY files that exist!
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/manifest.json',
];

// INSTALL EVENT - Caches static assets when SW is first installed
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching static assets');
        // Cache files one by one to see which one fails
        return Promise.all(
          STATIC_ASSETS.map(url => {
            return cache.add(url).catch(err => {
              console.error('❌ Failed to cache:', url, err);
            });
          })
        );
      })
      .then(() => {
        console.log('✅ All assets cached successfully');
        return self.skipWaiting();
      })
  );
});

// ACTIVATE EVENT - Cleans up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => {
              console.log('🗑️ Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// FETCH EVENT - Network first, then cache fallback strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone();
        
        if (response.status === 200) {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Offline - content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});