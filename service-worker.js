
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('tjquiz-store').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/questions.json',
        '/tjquiz_logo_gold_outline.png',
        '/style.css',
        '/script.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
