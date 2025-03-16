// Lemonade Service Worker with improved large file support
const CACHE_NAME = 'lemonade-cache-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './icon.svg',
    './manifest.json'
];

// Install event - cache app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    // Skip large file uploads/downloads
    if (event.request.method !== 'GET' || 
        event.request.headers.has('range')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((fetchResponse) => {
                        // Don't cache large responses
                        if (!fetchResponse || 
                            !fetchResponse.ok ||
                            fetchResponse.type !== 'basic' ||
                            event.request.url.includes('api/') || 
                            event.request.url.includes('analytics')) {
                            return fetchResponse;
                        }

                        // Clone the response
                        const responseToCache = fetchResponse.clone();

                        // Check response size before caching (avoid caching large files)
                        return responseToCache.blob()
                            .then((blob) => {
                                // Only cache responses smaller than 5MB
                                if (blob.size < 5 * 1024 * 1024) {
                                    caches.open(CACHE_NAME)
                                        .then((cache) => {
                                            cache.put(event.request, responseToCache);
                                        });
                                }
                                return fetchResponse;
                            })
                            .catch(() => {
                                return fetchResponse;
                            });
                    });
            })
            .catch(() => {
                // Fallback for offline
                if (event.request.mode === 'navigate') {
                    return caches.match('./');
                }
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});
