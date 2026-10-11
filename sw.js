// StampBook service worker: cache the app shell, never cache API/ads/auth calls.
const V = 'sb-shell-v4';
const SHELL = ['app.html','app.min.js?v=4','core.min.js?v=4','style.min.css?v=4'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if(r.method !== 'GET') return;
  const u = new URL(r.url);
  const sameOrigin = u.origin === location.origin;
  const isFont = u.host === 'fonts.googleapis.com' || u.host === 'fonts.gstatic.com' || u.host === 'cdn.jsdelivr.net' || u.host === 'cdnjs.cloudflare.com';
  if(!sameOrigin && !isFont) return; // Supabase, ads, Razorpay etc. go straight to network
  if(sameOrigin && !/\.(js|css|json|png|jpg|svg|html)$/.test(u.pathname) && u.pathname !== '/') return;
  if(r.mode === 'navigate'){ // network first for pages, cache fallback offline
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(V).then(x=>x.put(r,c)); return res; }).catch(()=>caches.match(r).then(m=>m||caches.match('app.html'))));
    return;
  }
  e.respondWith(caches.match(r).then(m => { // stale-while-revalidate for assets
    const net = fetch(r).then(res => { if(res.ok){ const c = res.clone(); caches.open(V).then(x=>x.put(r,c)); } return res; }).catch(()=>m);
    return m || net;
  }));
});
