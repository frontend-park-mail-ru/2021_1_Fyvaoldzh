/// <reference lib="WebWorker" />

const cacheName = '::qdaServiceWorker';
const version = 'v0.0.1';

export type {};
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(version + cacheName).then((cache) => cache.addAll(['fallback.html'])),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => key.indexOf(version) !== 0)
        .map((key) => caches.delete(key)),
    )),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.open(cacheName).then((cache) => cache.match(event.request).then(() => fetch(event.request)
    .then((response) => response)
    .catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('fallback.html');
      }
      return null;
    }))));
});
