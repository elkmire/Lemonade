// Lemonade Service Worker
const CACHE_NAME = 'lemonade-cache-v1';

// Install event - cache app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.add('./');
        })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
                .then((fetchResponse) => {
                    // Don't cache API responses or analytics
                    if (event.request.url.includes('api/') || 
                        event.request.url.includes('analytics')) {
                        return fetchResponse;
                    }
                    
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
        }).catch(() => {
            // Fallback for offline
            if (event.request.destination === 'document') {
                return caches.match('./');
            }
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});