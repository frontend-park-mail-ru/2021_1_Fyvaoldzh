/// <reference lib="WebWorker" />

const cacheName = '::qdaServiceWorker';
const version = 'v0.0.1';

export type {};
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(version + cacheName).then(function (cache) {
            return cache.addAll(['fallback.html', 'app.js']);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys
                    .filter(function (key) {
                        return key.indexOf(version) !== 0;
                    })
                    .map(function (key) {
                        return caches.delete(key);
                    })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.open(cacheName).then((cache) =>
    cache.match(event.request).then((cachedResponse) => {
      const url = new URL(event.request.url);
      const staticCheck = url.pathname.includes('/static/') && url.pathname.includes('.');
      const distCheck = url.pathname.includes('/dist/');

      if ((!navigator.onLine || staticCheck || distCheck) && cachedResponse) {
        return cachedResponse;
      }


      return fetch(event.request)
        .then((response) => {
          if (staticCheck || distCheck) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch((err) => {
          if (event.request.mode === 'navigate') {
            console.log('OFFLINE!!');
            return caches.match('fallback.html');
          }
        });
    })));
});
