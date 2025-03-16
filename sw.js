// sw.js - Place this file in the same directory as your HTML file

const CACHE_NAME = 'lemonade-cache-v1';
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB limit for cached files

// Files to cache on install
const filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Install event - cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(filesToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch event - network first for large files, then cache
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // For large files (.lmn extension), use network first approach
  if (requestUrl.pathname.endsWith('.lmn') || 
      requestUrl.pathname.includes('download') ||
      event.request.headers.get('range')) {
    
    // For range requests (streaming large files), pass through to network
    if (event.request.headers.get('range')) {
      event.respondWith(
        fetch(event.request)
          .catch(error => {
            console.error('Network fetch failed for range request:', error);
            return new Response('Network error occurred', { status: 408 });
          })
      );
      return;
    }
    
    // For other large files, try network first then cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Don't cache responses larger than MAX_FILE_SIZE
          if (response.headers.get('content-length') > MAX_FILE_SIZE) {
            return response;
          }
          
          // Clone the response to cache it and return it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
  } else {
    // For other resources, check cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached response if available
          if (response) {
            return response;
          }
          
          // Clone the request
          const fetchRequest = event.request.clone();
          
          // Try to fetch from network
          return fetch(fetchRequest)
            .then(response => {
              // Check if valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response to cache it and return it
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
    );
  }
});

// Handle messages from the main page
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Initialized with MAX_FILE_SIZE limit of ' + (MAX_FILE_SIZE / (1024 * 1024)) + 'MB');
