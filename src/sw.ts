/// <reference lib="WebWorker" />

const cacheName = '::qdaServiceWorker';
const version = 'v0.0.1';

export type {};
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version + cacheName).then(function (cache) {
      return cache.addAll(['fallback.html']);
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
    cache.match(event.request).then(() => {
      return fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          if (event.request.mode === 'navigate') {
            return caches.match('fallback.html');
          }
        });
    })));
});
