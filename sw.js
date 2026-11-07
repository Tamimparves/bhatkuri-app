const C='bk-v3';
const F=['./','index.html','manifest.json','icon-192.png','icon-512.png',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const u=e.request.url;
 if(e.request.method!=='GET')return;
 if(!u.startsWith(self.location.origin)&&!u.includes('gstatic.com/firebasejs'))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));}return r;})
  .catch(()=>caches.match(e.request).then(m=>m||(e.request.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
