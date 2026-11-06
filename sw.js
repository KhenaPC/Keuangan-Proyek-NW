/* NW28 Keuangan — service worker.
   Data (Supabase) TIDAK pernah disimpan di sini: selalu langsung ke server, jadi angka selalu terbaru.
   Yang disimpan hanya kerangka aplikasi supaya cepat dibuka dan bisa diinstall. */
const VERSI = 'nw28-keu-v1';
const KERANGKA = ['/', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/favicon-64.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(KERANGKA)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.hostname.endsWith('supabase.co')) return;            // data: selalu ke server
  const cdn = /(^|\.)(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname);
  if (r.mode === 'navigate') {                                // halaman: utamakan versi terbaru
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(VERSI).then(x => x.put('/', c)); return res; })
      .catch(() => caches.match('/')));
    return;
  }
  if (cdn) {                                                  // pustaka & font berversi: simpan sekali
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok || res.type === 'opaque') { const c = res.clone(); caches.open(VERSI).then(x => x.put(r, c)); } return res; })));
    return;
  }
  if (u.origin === location.origin) {                         // file lain di situs ini
    e.respondWith(caches.match(r).then(hit => { const net = fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSI).then(x => x.put(r, c)); } return res; }).catch(() => hit); return hit || net; }));
  }
});
