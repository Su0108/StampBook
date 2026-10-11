/* StampBook core helpers: client-side rate limiter + persistent retry queue.
   NOTE: client limits only stop accidental spam. Real enforcement is server-side (see backend/). */
(function(){
  const store = {
    get(k){ try{ return JSON.parse(localStorage.getItem(k)||'null'); }catch(e){ return null; } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  };
  // ---- Rate limiter (sliding window, survives reload) ----
  window.rateLimit = function(key, max, windowMs){
    const k = 'sb_rl_'+key, now = Date.now();
    const hits = (store.get(k)||[]).filter(t => now - t < windowMs);
    if(hits.length >= max){
      store.set(k, hits);
      return { ok:false, retryAfterSec: Math.ceil((windowMs - (now - hits[0]))/1000) };
    }
    hits.push(now); store.set(k, hits);
    return { ok:true, retryAfterSec:0 };
  };
  // ---- Retry queue (background jobs in the browser) ----
  const QKEY = 'sb_job_queue', handlers = {}, MAX_TRIES = 6;
  let running = false, timer = null;
  window.registerJobHandler = function(type, fn){ handlers[type] = fn; };
  window.enqueueJob = function(type, payload){
    const q = store.get(QKEY) || [];
    q.push({ id: Date.now()+'-'+Math.random().toString(36).slice(2,8), type, payload, tries:0, next:0 });
    store.set(QKEY, q.slice(-50));
    runJobs();
  };
  async function runJobs(){
    if(running || (typeof navigator!=='undefined' && navigator.onLine===false)) return;
    running = true;
    try{
      let q = store.get(QKEY) || [];
      const now = Date.now(); let nextWake = 0;
      for(const job of q.slice()){
        if(job.next > now){ nextWake = nextWake ? Math.min(nextWake, job.next) : job.next; continue; }
        const h = handlers[job.type];
        if(!h) continue;
        try{ await h(job.payload); q = q.filter(j => j.id !== job.id); }
        catch(e){
          job.tries++;
          if(job.tries >= MAX_TRIES) q = q.filter(j => j.id !== job.id);
          else { job.next = Date.now() + Math.min(300000, 2000 * Math.pow(2, job.tries)); nextWake = nextWake ? Math.min(nextWake, job.next) : job.next; }
        }
        store.set(QKEY, q);
      }
      store.set(QKEY, q);
      clearTimeout(timer);
      if(nextWake) timer = setTimeout(runJobs, Math.max(1000, nextWake - Date.now()));
    } finally { running = false; }
  }
  window.runJobs = runJobs;
  window.addEventListener('online', runJobs);
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) runJobs(); });
  setTimeout(runJobs, 4000);
  // ---- Service worker ----
  if('serviceWorker' in navigator && location.protocol.startsWith('http')){
    window.addEventListener('load', ()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  }
})();
