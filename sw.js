const C='piano-coach-v8';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r).then(res=>{if(res.ok&&(new URL(r.url).origin===location.origin||r.url.includes('fonts.g')))caches.open(C).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))))});
