const _libLoadPromises = {};
function loadScriptOnce(key, src){
  if(_libLoadPromises[key]) return _libLoadPromises[key];
  _libLoadPromises[key] = new Promise((resolve, reject)=>{
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => { delete _libLoadPromises[key]; reject(new Error('Failed to load '+src)); };
      document.head.appendChild(s);
    });
  return _libLoadPromises[key];
}
function loadJsPDF(){
  return loadScriptOnce('jspdf', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
}
async function loadJsPDFAutoTable(){
  await loadJsPDF();
  return loadScriptOnce('jspdf-autotable', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
}
function loadQRCode(){
  return loadScriptOnce('qrcode', 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');
}
function loadChartJs(){
  return loadScriptOnce('chartjs', 'https://cdn.jsdelivr.net/npm/chart.js');
}
const LOGO_ICON_B64 = "https://res.cloudinary.com/xszjfxug/image/upload/v1790123617/stampbook_logos/bipsoao9gw4nl9zxc2ve.png";
const SPLASH_IMG_B64 = "https://res.cloudinary.com/xszjfxug/image/upload/v1790532417/splash-image.jpg";
const ICONS = {
  home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
  invoice:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6"/><circle cx="17" cy="8" r="2.3"/><path d="M16.3 14.2c2.7.5 5.2 2.4 5.2 5.8"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  chart:'<rect x="3" y="12" width="4.2" height="8" rx="1"/><rect x="9.9" y="7" width="4.2" height="13" rx="1"/><rect x="16.8" y="3" width="4.2" height="17" rx="1"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell:'<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  back:'<path d="M19 12H5M11 18l-6-6 6-6"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  download:'<path d="M12 4v11m0 0-4-4m4 4 4-4"/><path d="M5 19.5h14"/>',
  share:'<circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 10.8 16 7M8 13.2l8 3.6"/>',
  whatsapp:'<path d="M4 20l1.3-3.9A8 8 0 1 1 8.5 19L4 20Z"/><g transform="translate(5.5,5.5) scale(0.55)"><path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1 1 0 0 1-1 1C10.7 20 4 13.3 4 5a1 1 0 0 1 1-1Z"/></g>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  print:'<path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1"/><path d="M6 17v4h12v-4"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
  phone:'<path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1 1 0 0 1-1 1C10.7 20 4 13.3 4 5a1 1 0 0 1 1-1Z"/>',
  location:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>',
  trash:'<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
  edit:'<path d="m4 20 1-4 11-11 3 3-11 11-4 1Z"/>',
  card:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',
  logout:'<path d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/><path d="M9 12h12m0 0-3-3m3 3-3 3"/>',
  chevron:'<path d="m9 6 6 6-6 6"/>',
  check:'<path d="m5 12 5 5 9-10"/>',
  alert:'<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
  wallet:'<path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2Z"/><circle cx="16" cy="14" r="1.1"/>',
  receipt:'<path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21Z"/><path d="M9 8h6M9 12h6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  send:'<path d="m4 12 16-8-6 16-3-6-7-2Z"/>',
  moon:'<path d="M20 14.5a8.5 8.5 0 1 1-9.5-9.5 7 7 0 0 0 9.5 9.5Z"/>',
  sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/>',
  ban:'<circle cx="12" cy="12" r="9"/><path d="m6.5 6.5 11 11"/>',
  shield:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z"/><path d="m9 12 2 2 4-4"/>'
};
function ic(name, size, cls){
  size = size || 20; cls = cls || '';
  return '<svg class="'+cls+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[name]||'')+'</svg>';
}
let profile = { name:'', designation:'', gender:'', phone:'', email:'', adsEnabled:true, adsOffUntil:null };
let business = { name:'', address:'', gstin:'', pan:'', bankName:'', account:'', ifsc:'', upi:'', prefix:'SB', nextNo:1001, tax:0, currency:'₹ INR', terms:'', template:'Classic', logoUrl:'', themeColor:'#C0392B', mdrEnabled:false };
function loadMdrSetting(){
  try{ return localStorage.getItem('stampbook_upi_mdr_enabled') === 'true'; }catch(e){ return false; }
}
const UPI_MDR_RATE = 0.004;
const UPI_MDR_THRESHOLD = 2000;
const NOTIF_PREF_KEYS = {
  paymentReminders: 'stampbook_notif_payment_reminders',
  paymentReceived: 'stampbook_notif_payment_received',
  paymentOverdue: 'stampbook_notif_payment_overdue',
  loginSecurity: 'stampbook_notif_login_security',
  accountUpdates: 'stampbook_notif_account_updates'
};
function loadNotifPrefs(){
  const prefs = {};
  Object.entries(NOTIF_PREF_KEYS).forEach(([key, storageKey])=>{
      try{ const v = localStorage.getItem(storageKey); prefs[key] = v===null ? true : v==='true'; }
      catch(e){ prefs[key] = true; }
    });
  return prefs;
}
let notifPrefs = loadNotifPrefs();
function toggleNotifPref(key, on){
  notifPrefs[key] = !!on;
  try{ localStorage.setItem(NOTIF_PREF_KEYS[key], notifPrefs[key] ? 'true' : 'false'); }catch(e){}
  showToast(notifPrefs[key] ? 'Notification turned on' : 'Notification turned off');
}
function renderNotificationSettings(){
  Object.entries(NOTIF_PREF_KEYS).forEach(([key])=>{
      const el = $('notifpref-'+key);
      if(el) el.checked = !!notifPrefs[key];
    });
}
const NOTIF_EVENTS_KEY = 'stampbook_notif_events';
function loadNotifEvents(){
  try{ return JSON.parse(localStorage.getItem(NOTIF_EVENTS_KEY) || '[]'); }
  catch(e){ return []; }
}
function logNotifEvent(type, title, desc){
  if(!notifPrefs[type]) return;
  try{
    const events = loadNotifEvents();
    events.unshift({ type, title, desc, date: new Date().toISOString() });
    localStorage.setItem(NOTIF_EVENTS_KEY, JSON.stringify(events.slice(0,20)));
  }catch(e){}
}
const EXTRA_CHARGE_PREFIX = '\u2063xc\u2063:';
function makeChargeItem(label, amount){ return { name: EXTRA_CHARGE_PREFIX + label, qty:1, price:amount }; }
function isExtraChargeItem(name){ return typeof name==='string' && name.startsWith(EXTRA_CHARGE_PREFIX); }
function extraChargeLabel(name){ return name.slice(EXTRA_CHARGE_PREFIX.length); }
function splitInvoiceItems(items){
  const lineItems = [], extraCharges = [];
  (items||[]).forEach(it=>{
      if(isExtraChargeItem(it.name)) extraCharges.push({ label: extraChargeLabel(it.name), amount: it.qty*it.price });
      else lineItems.push(it);
    });
  return { lineItems, extraCharges };
}
const CLOUDINARY_CLOUD_NAME = 'xszjfxug';
const CLOUDINARY_UPLOAD_PRESET = 'stampbook_logos';
const CLOUDINARY_FOLDER = 'stampbook_logos';
let clients = [];
let invoices = [];
let payments = [];
let selectedRevenueMonth = null;
let expenses = [];
let activity = [];
let realtimeChannel = null;
const SUPABASE_URL = 'https://sjrkoiypdhcrwzetijen.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xyVWy9kXzG4wScJMp40kbg_ZX1fgeMb';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const APP_VERSION = 'stampbook-3.3.4';
const _reportedCrashes = new Set();
let _crashReportCount = 0;
function reportCrash(message, stack, screen){
  try{
    const key = String(message).slice(0,200) + '|' + String(stack||'').slice(0,120);
    if(_reportedCrashes.has(key) || _crashReportCount >= 20) return;
    _reportedCrashes.add(key);
    _crashReportCount++;
    sb.from('crash_reports').insert({
        user_id: currentAuth ? currentAuth.id : null,
        message: String(message||'Unknown error').slice(0,2000),
        stack: stack ? String(stack).slice(0,4000) : null,
        screen: screen || (document.querySelector('.screen.active')||{}).id || null,
        user_agent: navigator.userAgent,
        app_version: APP_VERSION
      }).then(()=>{}).catch(()=>{});
  }catch(e){  }
}
window.addEventListener('error', (ev)=>{
    reportCrash(ev.message, ev.error && ev.error.stack);
  });
window.addEventListener('unhandledrejection', (ev)=>{
    const reason = ev.reason;
    reportCrash(reason && reason.message ? reason.message : String(reason), reason && reason.stack);
  });
const OTP_RESEND_SECONDS = 60;
let currentAuth = null;
function getAuth(){ return currentAuth; }
let accountSuspended = false;
async function refreshAuthFromSession(){
  accountSuspended = false;
  const { data:{ session } } = await sb.auth.getSession();
  if(!session){ currentAuth = null; return null; }
  let prof = null;
  for(let attempt = 0; attempt < 4 && !prof; attempt++){
    if(attempt > 0) await new Promise(r => setTimeout(r, 350 * attempt));
    const { data } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
    prof = data;
  }
  if(!prof){ currentAuth = null; return null; }
  if(prof.is_active === false){
    await sb.auth.signOut();
    teardownRealtimeSync();
    currentAuth = null;
    accountSuspended = true;
    return null;
  }
  currentAuth = { id: session.user.id, email: prof.email, name: prof.name, role: prof.role, loggedInAt: new Date().toISOString() };
  profile.name = prof.name || '';
  profile.designation = prof.designation || '';
  profile.gender = prof.gender || '';
  profile.phone = prof.phone || '';
  profile.email = prof.email || '';
  profile.phoneVerified = !!prof.phone_verified;
  profile.adsEnabled = prof.ads_enabled !== false;
  profile.adsOffUntil = prof.ads_off_until || null;
  updateAdsGate();
  return currentAuth;
}
function adsCurrentlyOff(){
  if(profile.adsOffUntil && new Date(profile.adsOffUntil) <= new Date()) return false;
  return profile.adsEnabled === false;
}
function updateAdsGate(){
  document.body.classList.toggle('ads-off', adsCurrentlyOff());
}
async function logLoginEvent(kind){
  if(!currentAuth) return;
  try{ await sb.from('login_events').insert({ user_id: currentAuth.id, event: kind }); }
  catch(e){  }
}
function mapInvoiceRow(row, items){
  return { id:row.id, clientId:row.client_id, date:row.date, dueDate:row.due_date, stage:row.stage,
    discount:Number(row.discount||0), paid:Number(row.paid||0),
    items:(items||[]).map(it=>({name:it.name, qty:Number(it.qty), price:Number(it.price)})) };
}
function mapPaymentRow(row){
  return { id:row.id, clientId:row.client_id, invoiceId:row.invoice_id, date:row.date, amount:Number(row.amount||0), mode:row.mode, txn:row.txn, notes:row.notes };
}
function mapExpenseRow(row){
  return { id:row.id, category:row.category, date:row.date, amount:Number(row.amount||0), note:row.notes };
}
function mapActivityRow(row){
  return { id:row.id, type:row.type, bucket:row.bucket, date:row.date, text:row.text, sub:row.sub };
}
function cacheKey(uid){ return 'stampbook_cache_' + uid; }
function loadCachedData(uid){
  try{
    const raw = localStorage.getItem(cacheKey(uid));
    if(!raw) return false;
    const c = JSON.parse(raw);
    business = c.business || business;
    clients = c.clients || [];
    invoices = c.invoices || [];
    payments = c.payments || [];
    expenses = c.expenses || [];
    activity = c.activity || [];
    return true;
  }catch(e){ return false; }
}
function saveCachedData(){
  if(!currentAuth) return;
  try{
    localStorage.setItem(cacheKey(currentAuth.id), JSON.stringify({
          business, clients, invoices, payments, expenses, activity, cachedAt: Date.now()
        }));
  }catch(e){
  }
}
function clearCachedData(uid){
  try{ localStorage.removeItem(cacheKey(uid)); }catch(e){}
}
function mapClientRow(c){
  return { id:c.id, name:c.name, phone:c.phone||'', email:c.email||'', address:c.address||'', gstin:c.gstin||'', notes:c.notes||'' };
}
const BIZ_DEFAULTS = { prefix:'SB', template:'Classic', currency:'INR', themeColor:'#C0392B' };
function mapBusinessRow(b, nextNo){
  return {
    name:b.name||'', address:b.address||'', gstin:b.gstin||'', pan:b.pan||'',
    bankName:b.bank_name||'', account:b.account||'', ifsc:b.ifsc||'', upi:b.upi||'',
    prefix:b.prefix||BIZ_DEFAULTS.prefix, nextNo, tax:Number(b.tax||0),
    currency:b.currency||BIZ_DEFAULTS.currency, terms:b.terms||'', template:b.template||BIZ_DEFAULTS.template,
    logoUrl:b.logo_url||'', themeColor:b.theme_color||BIZ_DEFAULTS.themeColor, mdrEnabled:loadMdrSetting()
  };
}
async function fetchAllData(){
  const uidUser = currentAuth.id;
  const q = (table, orderCol, asc) => sb.from(table).select('*').eq('user_id', uidUser).order(orderCol, { ascending:asc });
  // all independent reads run in parallel instead of one after another
  const [bizRes, clientsRes, invRes, itemsRes, payRes, expRes, actRes] = await Promise.all([
    sb.from('business_settings').select('*').eq('user_id', uidUser).maybeSingle(),
    q('clients','created_at',false),
    q('invoices','created_at',false),
    q('invoice_items','position',true),
    q('payments','date',false),
    q('expenses','date',false),
    q('activity','created_at',false).limit(100)
  ]);
  for(const r of [bizRes, clientsRes, invRes, itemsRes, payRes, expRes, actRes]) if(r.error) throw r.error;
  let biz = bizRes.data;
  if(!biz){
    const insertRow = { user_id:uidUser, name:profile.name?profile.name+"'s Business":'', prefix:'SB', next_no:1001 };
    const { data:created, error:createErr } = await sb.from('business_settings').insert(insertRow).select().single();
    if(createErr) throw createErr;
    biz = created;
  }
  // group invoice items once (O(n)) instead of filtering the full list for every invoice (O(n*m))
  const itemsByInvoice = new Map();
  for(const it of (itemsRes.data||[])){
    const arr = itemsByInvoice.get(it.invoice_id);
    if(arr) arr.push(it); else itemsByInvoice.set(it.invoice_id, [it]);
  }
  business = mapBusinessRow(biz, Number(biz.next_no||1001));
  clients = (clientsRes.data||[]).map(mapClientRow);
  invoices = (invRes.data||[]).map(r => mapInvoiceRow(r, itemsByInvoice.get(r.id) || []));
  payments = (payRes.data||[]).map(mapPaymentRow);
  expenses = (expRes.data||[]).map(mapExpenseRow);
  activity = (actRes.data||[]).map(mapActivityRow);
  saveCachedData();
  setupRealtimeSync();
  updateNotifDot();
}
let dataLoading = false;
function endDataLoad(){
  dataLoading = false;
  refreshActiveScreenNow();
}
function skBox(w,h,extra){
  return `<div class="sk" style="width:${w};height:${h}px;${extra||''}"></div>`;
}
function skInline(w,h){
  return `<span class="sk" style="display:inline-block;width:${w};height:${h}px;vertical-align:middle;"></span>`;
}
function skInvoiceRow(){
  return `<div class="listitem sk-item"><div>${skBox('78px',14)}${skBox('120px',12,'margin-top:7px;')}${skBox('64px',11,'margin-top:6px;')}</div>
<div style="display:flex;flex-direction:column;align-items:flex-end;">${skBox('70px',14)}${skBox('52px',18,'margin-top:8px;border-radius:10px;')}</div></div>`;
}
function skClientRow(){
  return `<div class="listitem sk-item"><div style="display:flex;align-items:center;gap:12px;">${skBox('38px',38,'border-radius:50%;')}
<div>${skBox('110px',14)}${skBox('84px',12,'margin-top:7px;')}</div></div>${skBox('62px',12)}</div>`;
}
function skPaymentRow(){
  return `<div class="listitem sk-item"><div>${skBox('110px',13)}${skBox('150px',11,'margin-top:7px;')}</div>${skBox('66px',14)}</div>`;
}
function skHistoryRow(){
  return `<div class="tl-item"><div style="width:28px;height:28px;flex:none;">${skBox('28px',28,'border-radius:50%;')}</div>
<div style="flex:1;">${skBox('80%',13)}${skBox('45%',11,'margin-top:7px;')}</div></div>`;
}
function skRepeat(fn,n){ let h=''; for(let i=0;i<n;i++) h+=fn(); return h; }
function showSkeleton(name){
  const set = (id,html)=>{ const el=$(id); if(el) el.innerHTML=html; };
  if(name==='home'){
    ['home-total-billed','home-received','home-due','home-count','home-month','home-clientcount'].forEach(id=>set(id, skInline(id==='home-total-billed'?'120px':'70px', id==='home-total-billed'?28:18)));
    set('home-recent', skRepeat(skInvoiceRow,3));
    return true;
  }
  if(name==='invoices'){ set('invoices-list', skRepeat(skInvoiceRow,7)); return true; }
  if(name==='clients'){ set('clients-list', skRepeat(skClientRow,7)); return true; }
  if(name==='payments'){ set('payments-list', skRepeat(skPaymentRow,7)); return true; }
  if(name==='history'){ set('history-list', '<div class="timeline">'+skRepeat(skHistoryRow,7)+'</div>'); return true; }
  if(name==='reports'){
    ['rep-billed','rep-received','rep-due','rep-paidcount','rep-pendingcount','rep-overduecount'].forEach(id=>set(id, skInline('60px',18)));
    set('rep-top', skRepeat(()=>`<div style="margin-bottom:14px;">${skBox('100%',12)}${skBox('100%',8,'margin-top:8px;')}</div>`,4));
    return true;
  }
  if(name==='invoice-detail'){
    set('invoice-detail-body', `<div class="card sk-item">${skBox('40%',16)}${skBox('60%',12,'margin-top:10px;')}${skBox('100%',1,'margin:16px 0;')}${skRepeat(()=>`<div style="display:flex;justify-content:space-between;margin-bottom:12px;">${skBox('50%',13)}${skBox('20%',13)}</div>`,4)}${skBox('100%',1,'margin:8px 0 14px;')}${skBox('35%',18,'margin-left:auto;')}</div>`);
    return true;
  }
  if(name==='client-detail'){
    set('client-detail-body', `<div class="card sk-item"><div style="display:flex;align-items:center;gap:12px;">${skBox('48px',48,'border-radius:50%;')}<div style="flex:1;">${skBox('50%',16)}${skBox('70%',12,'margin-top:8px;')}${skBox('60%',12,'margin-top:6px;')}</div></div></div>`+skRepeat(skInvoiceRow,3));
    return true;
  }
  return false;
}
const REALTIME_REFRESHABLE = ['home','invoices','clients','payments','reports','history','client-detail','invoice-detail'];
let refreshTimer = null;
function refreshActiveScreenNow(){
  const activeEl = document.querySelector('.screen.active');
  const activeName = activeEl && activeEl.id.replace('screen-','');
  if(getAuth() && activeName && REALTIME_REFRESHABLE.includes(activeName)){
    goto(activeName, { fromPopstate:true });
  }
}
function refreshActiveScreenIfRelevant(){
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(refreshActiveScreenNow, 300);
}
let resyncTimer = null;
function scheduleFullResync(){
  clearTimeout(resyncTimer);
  resyncTimer = setTimeout(()=>{
    if(!currentAuth) return;
    fetchAllData().then(refreshActiveScreenNow).catch(()=>{});
  }, 1500);
}
function makeRealtimeHandler(get, set, mapRow, opts){
  opts = opts || {};
  return function(payload){
    if(payload.eventType==='DELETE'){
      const id = payload.old.id;
      set(get().filter(x=>x.id!==id));
    } else {
      const list = get();
      const idx = list.findIndex(x=>x.id===payload.new.id);
      const mapped = mapRow(payload.new, idx>-1 ? list[idx] : null);
      if(idx>-1) list[idx] = mapped;
      else if(opts.append) list.push(mapped);
      else list.unshift(mapped);
      if(opts.limit && list.length>opts.limit) set(list.slice(0, opts.limit));
    }
    saveCachedData();
    refreshActiveScreenIfRelevant();
  };
}
const applyInvoiceRealtimeEvent = makeRealtimeHandler(()=>invoices, v=>{invoices=v;}, (row, prev)=>mapInvoiceRow(row, prev ? prev.items : []), { append:true });
const applyPaymentRealtimeEvent = makeRealtimeHandler(()=>payments, v=>{payments=v;}, mapPaymentRow);
const applyClientRealtimeEvent = makeRealtimeHandler(()=>clients, v=>{clients=v;}, mapClientRow);
const applyExpenseRealtimeEvent = makeRealtimeHandler(()=>expenses, v=>{expenses=v;}, mapExpenseRow);
const applyActivityRealtimeEvent = makeRealtimeHandler(()=>activity, v=>{activity=v;}, mapActivityRow, { limit:100 });
function setupRealtimeSync(){
  if(!currentAuth) return;
  teardownRealtimeSync();
  const uid = currentAuth.id;
  realtimeChannel = sb.channel('stampbook-sync-'+uid)
  .on('postgres_changes', { event:'*', schema:'public', table:'invoices', filter:'user_id=eq.'+uid }, applyInvoiceRealtimeEvent)
  .on('postgres_changes', { event:'*', schema:'public', table:'payments', filter:'user_id=eq.'+uid }, applyPaymentRealtimeEvent)
  .on('postgres_changes', { event:'*', schema:'public', table:'clients', filter:'user_id=eq.'+uid }, applyClientRealtimeEvent)
  .on('postgres_changes', { event:'*', schema:'public', table:'expenses', filter:'user_id=eq.'+uid }, applyExpenseRealtimeEvent)
  .on('postgres_changes', { event:'*', schema:'public', table:'activity', filter:'user_id=eq.'+uid }, applyActivityRealtimeEvent)
  .on('postgres_changes', { event:'*', schema:'public', table:'invoice_items', filter:'user_id=eq.'+uid }, scheduleFullResync);
  const thisChannel = realtimeChannel;
  let wasDown = false;
  thisChannel.subscribe((status)=>{
    if(realtimeChannel !== thisChannel) return;
    if(status==='CHANNEL_ERROR' || status==='TIMED_OUT'){ wasDown = true; }
    else if(status==='SUBSCRIBED' && wasDown){ wasDown = false; scheduleFullResync(); }
  });
}
function teardownRealtimeSync(){
  if(realtimeChannel){ sb.removeChannel(realtimeChannel); realtimeChannel = null; }
}
let publicInvoiceData = null;
let publicClientData = null;
let publicBusinessData = null;
async function loadPublicInvoice(id){
  const { data, error } = await sb.rpc('get_public_invoice', { p_invoice_id: id });
  if(error || !data || !data.invoice) return false;
  const invRow = data.invoice;
  publicInvoiceData = mapInvoiceRow(invRow, data.items || []);
  publicClientData = data.client ? {
    id:data.client.id, name:data.client.name, phone:data.client.phone||'',
    email:data.client.email||'', address:data.client.address||'', gstin:data.client.gstin||'', notes:''
  } : null;
  publicBusinessData = data.business ? mapBusinessRow(data.business, 1) : null;
  currentInvoiceId = invRow.id;
  publicInvoiceView = true;
  publicActiveGateway = data.active_gateway || null;
  publicUpiClaimedAt = data.upi_claimed_at || null;
  return true;
}
let publicActiveGateway = null;
let publicUpiClaimedAt = null;
function getDisplayInvoice(id){
  if(publicInvoiceView && publicInvoiceData && publicInvoiceData.id===id) return publicInvoiceData;
  return invoices.find(i=>i.id===id);
}
function getDisplayClient(id){
  if(publicInvoiceView && publicClientData && publicClientData.id===id) return publicClientData;
  return clientById(id);
}
function getDisplayBusiness(){
  return (publicInvoiceView && publicBusinessData) ? publicBusinessData : business;
}
async function saveState(){
  if(!currentAuth || publicInvoiceView) return;
  await sb.from('business_settings').upsert({
      user_id: currentAuth.id, name:business.name, address:business.address, gstin:business.gstin, pan:business.pan,
      bank_name:business.bankName, account:business.account, ifsc:business.ifsc, upi:business.upi,
      prefix:business.prefix, next_no:business.nextNo, tax:business.tax, currency:business.currency,
      terms:business.terms, template:business.template, logo_url:business.logoUrl, theme_color:business.themeColor
    }, { onConflict: 'user_id' });
}
function logActivity(text, sub, bucket, type){
  const row = {id:uid(), type, bucket, date:todayISO(), text, sub};
  activity.unshift(row);
  if(currentAuth){
    sb.from('activity').insert({ user_id:currentAuth.id, type, bucket, date:row.date, text, sub });
  }
}
let currentInvoiceId = null;
let publicInvoiceView = false;
let currentClientId = null;
let clientTab = 'invoices';
let editingClientId = null;
let createItems = [{name:'',qty:1,price:0}];
let invFilter = 'All';
let histFilter = 'All';
const $ = (id) => document.getElementById(id);
const ESC_MAP = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, ch => ESC_MAP[ch]);
const debounce = (fn, ms=180) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const renderAdminUserListDebounced = debounce(()=>renderAdminUserList());
const renderClientsDebounced = debounce(()=>renderClients());
const renderPaymentsDebounced = debounce(()=>renderPayments());
const renderInvoicesDebounced = debounce(()=>renderInvoices());
const uid = () => Math.random().toString(36).slice(2,9);
const _inr = new Intl.NumberFormat('en-IN');
const rupee = (n) => '₹' + _inr.format(Math.round(Number(n||0)));
const todayISO = () => new Date().toISOString().slice(0,10);
const _dateFmt = new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'});
const _timeFmt = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit'});
const fmtDate = (iso) => iso ? _dateFmt.format(new Date(iso)) : '';
const fmtDateTime = (iso) => { if(!iso) return ''; const d=new Date(iso); return _dateFmt.format(d)+', '+_timeFmt.format(d); };
const clientById = (id) => clients.find(c=>c.id===id);
function computeInvoice(inv){
  const { lineItems, extraCharges } = splitInvoiceItems(inv.items);
  const subtotal = lineItems.reduce((s,i)=>s+i.qty*i.price,0);
  const extraChargesTotal = extraCharges.reduce((s,c)=>s+c.amount,0);
  const total = Math.max(subtotal - (inv.discount||0), 0) + extraChargesTotal;
  const due = Math.max(total - (inv.paid||0), 0);
  let status;
  if(inv.stage==='cancelled') status='Cancelled';
  else if(inv.stage==='draft') status='Draft';
  else if(due<=0) status='Paid';
  else if(inv.paid>0) status='Partial';
  else status = new Date(inv.dueDate) < new Date(todayISO()) ? 'Overdue' : 'Sent';
  return {...inv, subtotal, total, due, status, lineItems, extraCharges};
}
function allInvoicesComputed(){ return invoices.map(computeInvoice); }
function totalsSummary(){
  const inv = allInvoicesComputed().filter(i=>i.stage!=='cancelled');
  const now = new Date();
  const monthTotal = inv.filter(i=>{ const d=new Date(i.date); return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear(); }).reduce((s,i)=>s+i.total,0);
  return {
    billed: inv.reduce((s,i)=>s+i.total,0),
    received: inv.reduce((s,i)=>s+i.paid,0),
    due: inv.reduce((s,i)=>s+i.due,0),
    count: inv.length,
    month: monthTotal,
    paidCount: inv.filter(i=>i.status==='Paid').length,
    pendingCount: inv.filter(i=>i.status==='Sent'||i.status==='Partial'||i.status==='Draft').length,
    overdueCount: inv.filter(i=>i.status==='Overdue').length
  };
}
function clientStats(id){
  const inv = allInvoicesComputed().filter(i=>i.clientId===id && i.stage!=='cancelled');
  return {
    billed: inv.reduce((s,i)=>s+i.total,0),
    paid: inv.reduce((s,i)=>s+i.paid,0),
    due: inv.reduce((s,i)=>s+i.due,0),
    invoices: inv
  };
}
function toggleLoginSupport(){
  const opts = $('login-support-options');
  const title = $('login-support-toggle');
  const open = opts.style.display === 'none';
  opts.style.display = open ? 'block' : 'none';
  title.classList.toggle('open', open);
}
function paintStaticChrome(){
  renderAdminMainTabs();
  $('login-logo-img').src = LOGO_ICON_B64;
  $('register-logo-img').src = LOGO_ICON_B64;
  $('otp-logo-img').src = LOGO_ICON_B64;
  $('sidebar-logo-img').src = LOGO_ICON_B64;
  $('home-logo-img').src = LOGO_ICON_B64;
  $('app-favicon').href = LOGO_ICON_B64;
  $('admin-home-btn').innerHTML = ic('home',18);
  $('admin-logout-btn').innerHTML = ic('logout',18);
  $('admin-notices-btn').innerHTML = ic('bell',18);
  $('an-back').innerHTML = ic('back',18);
  $('aud-back').innerHTML = ic('back',18);
  $('admin-searchbar').innerHTML = ic('search',16)+'<input id="admin-search-input" placeholder="Search by name, email or phone..." oninput="renderAdminUserListDebounced()">';
  $('home-bell-wrap').innerHTML = ic('bell',18) + '<span class="dot" id="home-bell-dot" style="display:none;"></span>';
  $('login-support-chev0').innerHTML = ic('chevron',14,'icon-chev');
  $('login-support-email').innerHTML = ic('mail',17)+' stampbook03@gmail.com';
  $('login-support-whatsapp').innerHTML = ic('whatsapp',17)+' WhatsApp: +91 90837 87933';
  $('login-support-call').innerHTML = ic('phone',17)+' Call: +91 90837 87933';
  ['login-support-chev1','login-support-chev2','login-support-chev3'].forEach(id=>$(id).innerHTML=ic('chevron',16));
  $('home-viewall').innerHTML = 'View All ' + ic('chevron',14);
  $('inv-search-btn').innerHTML = ic('search',18);
  $('inv-clients-btn').innerHTML = ic('users',18);
  $('invd-back').innerHTML = ic('back',18);
  $('create-back').innerHTML = ic('back',18);
  $('create-addclient-btn').innerHTML = ic('plus',15)+' Add';
  $('additem-btn').innerHTML = ic('plus',14)+' Add Item';
  $('addclient-back').innerHTML = ic('back',18);
  $('addclient-back').onclick = ()=> goto(editingClientId ? 'client-detail' : 'clients');
  $('clients-back').innerHTML = ic('back',18);
  $('clients-add').innerHTML = ic('plus',18);
  $('clientd-back').innerHTML = ic('back',18);
  $('clientd-edit').innerHTML = ic('edit',17);
  $('clientd-delete').innerHTML = ic('trash',17);
  $('addpay-back').innerHTML = ic('back',18);
  $('addexp-back').innerHTML = ic('back',18);
  $('pay-back').innerHTML = ic('back',18);
  $('pay-add').innerHTML = ic('plus',18);
  $('rep-history-link').innerHTML = ic('calendar',14)+' History';
  $('rep-add-expense').innerHTML = ic('plus',13)+' Add';
  $('hist-back').innerHTML = ic('back',18);
  $('ads-back').innerHTML = ic('back',18);
  $('notif-back').innerHTML = ic('back',18);
  $('notifsettings-back').innerHTML = ic('back',18);
  $('notifpref-icon-paymentReminders').innerHTML = ic('calendar',13);
  $('notifpref-icon-paymentReceived').innerHTML = ic('wallet',13);
  $('notifpref-icon-paymentOverdue').innerHTML = ic('alert',13);
  $('notifpref-icon-loginSecurity').innerHTML = ic('shield',13);
  $('notifpref-icon-accountUpdates').innerHTML = ic('user',13);
  $('terms-back').innerHTML = ic('back',18);
  $('privacy-back').innerHTML = ic('back',18);
  $('refund-back').innerHTML = ic('back',18);
  $('help-back').innerHTML = ic('back',18);
  $('ep-back').innerHTML = ic('back',18);
  $('biz-back').innerHTML = ic('back',18);
  $('menu-editprofile').innerHTML = ic('user',17)+' Edit Profile';
  $('menu-business').innerHTML = ic('briefcase',17)+' Business Settings';
  $('menu-turnoffads').innerHTML = ic('shield',17)+' Turn Off Ads';
  $('menu-notif').innerHTML = ic('bell',17)+' Notification Settings';
  $('menu-admin').innerHTML = ic('users',17)+' Admin Panel';
  $('menu-help').innerHTML = ic('settings',17)+' Help &amp; Support';
  $('menu-getapp').innerHTML = ic('download',17)+' Get this app';
  $('chev-getapp').innerHTML = ic('chevron',16);
  ['chev1','chev2','chev3','chev4','chev5'].forEach(id=>$(id).innerHTML=ic('chevron',16));
  const authNow = getAuth();
  $('menu-admin-row').style.display = (authNow && authNow.role==='admin') ? 'flex' : 'none';
  $('logout-btn').innerHTML = ic('logout',16)+' Log Out';
  $('side-notif-label').innerHTML = ic('bell',17)+'<span class="navlabel">&nbsp;Notifications</span>';
  $('cl-searchbar').innerHTML = ic('search',16)+'<input id="cl-search-input" placeholder="Search clients..." oninput="renderClientsDebounced()">';
  $('pay-searchbar').innerHTML = ic('search',16)+'<input id="pay-search-input" placeholder="Search payments..." oninput="renderPaymentsDebounced()">';
  $('inv-search').innerHTML = ic('search',16)+'<input id="inv-search-input" placeholder="Search invoices..." oninput="renderInvoicesDebounced()">';
  const navDefs = [
    {key:'home', icon:'home', label:'Home'},
    {key:'invoices', icon:'invoice', label:'Invoices'},
    {key:'reports', icon:'chart', label:'Reports'},
    {key:'profile', icon:'user', label:'Profile'}
  ];
  document.querySelectorAll('.navbtn[data-nav]').forEach(btn=>{
      const def = navDefs.find(d=>d.key===btn.dataset.nav);
      if(def) btn.innerHTML = ic(def.icon,20) + '<span class="navlabel">'+def.label+'</span>';
    });
  document.querySelectorAll('.fab').forEach(btn=>{ btn.innerHTML = ic('plus',22); });
  $('home-qa').innerHTML = `
<div class="qabtn" onclick="goto('create')"><div class="ic">${ic('invoice',17)}</div>Create Invoice</div>
<div class="qabtn" onclick="openAddClient()"><div class="ic">${ic('users',17)}</div>Add Client</div>
<div class="qabtn" onclick="goto('addpayment')"><div class="ic">${ic('wallet',17)}</div>Record Payment</div>`;
  $('home-shortcuts').innerHTML = `
<div class="qabtn" onclick="goto('clients')"><div class="ic">${ic('users',17)}</div>Clients</div>
<div class="qabtn" onclick="goto('payments')"><div class="ic">${ic('card',17)}</div>Payments</div>
<div class="qabtn" onclick="goto('history')"><div class="ic">${ic('calendar',17)}</div>History</div>`;
  $('plus-options').innerHTML = `
<div class="sheet-opt" onclick="closePlusSheet();goto('create')"><div class="ic">${ic('invoice',19)}</div><div><div class="t">Create Invoice</div><div class="s">Bill a client for work done</div></div></div>
<div class="sheet-opt" onclick="closePlusSheet();openAddClient()"><div class="ic">${ic('users',19)}</div><div><div class="t">Add Client</div><div class="s">Save contact &amp; billing details</div></div></div>
<div class="sheet-opt" onclick="closePlusSheet();goto('addpayment')"><div class="ic">${ic('wallet',19)}</div><div><div class="t">Record Payment</div><div class="s">Log money received</div></div></div>
<div class="sheet-opt" onclick="closePlusSheet();goto('addexpense')"><div class="ic">${ic('receipt',19)}</div><div><div class="t">Add Expense</div><div class="s">Track a business expense</div></div></div>`;
  const initial = profile.name.trim()[0]||'S';
  $('profile-avatar').textContent = initial;
  $('profile-name').textContent = profile.name;
  $('profile-designation').textContent = profile.designation;
  $('home-username').textContent = profile.name;
}
const CHROMELESS_SCREENS = ['splash','login','register','otp','admin','admin-user-detail','admin-notices'];
function goto(name, opts){
  opts = opts || {};
  const auth = getAuth();
  const isPublicInvoiceRoute = name==='invoice-detail' && publicInvoiceView;
  if(!auth && !['splash','login','register','otp'].includes(name) && !isPublicInvoiceRoute){
    name = 'login';
  }
  if((name==='admin' || name==='admin-user-detail' || name==='admin-notices') && (!auth || auth.role!=='admin')){
    name = auth ? 'home' : 'login';
  }
  const target = $('screen-'+name);
  if(!target) return;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.navbtn[data-nav]').forEach(b=>b.classList.toggle('active', b.dataset.nav===name));
  document.body.classList.toggle('no-chrome', CHROMELESS_SCREENS.includes(name) || isPublicInvoiceRoute);
  const skel = dataLoading && !isPublicInvoiceRoute && showSkeleton(name);
  if(!skel && name==='home') renderHome();
  if(name==='admin-notices') fetchAdminNotices();
  if(name==='register'){ resetRegCaptcha(); }
  if(!skel && name==='invoices') renderInvoices();
  if(!skel && name==='clients') renderClients();
  if(!skel && name==='payments') renderPayments();
  if(!skel && name==='reports') renderReports();
  if(!skel && name==='history') renderHistory();
  if(name==='create') renderCreateScreen();
  if(name==='addpayment') renderAddPaymentScreen();
  if(name==='addexpense') renderAddExpenseScreen();
  if(name==='editprofile') renderEditProfile();
  if(name==='business'){ renderBusinessSettings(); renderPaymentGatewaySettings(); }
  if(name==='turnoffads') renderTurnOffAdsScreen();
  if(name==='notifications') renderNotifications();
  if(name==='notification-settings') renderNotificationSettings();
  if(name==='help') renderHelp();
  if(!skel && name==='invoice-detail') renderInvoiceDetail();
  if(!skel && name==='client-detail') renderClientDetail();
  if(name==='otp') renderOtpScreen();
  if(name==='admin') renderAdmin();
  if(name==='admin-user-detail') renderAdminUserDetail();
  updateAnchorAd(name, isPublicInvoiceRoute);
  target.scrollTop = 0;
  window.scrollTo(0,0);
  if(!opts.fromPopstate){
    const hash = '#/' + name;
    if(location.hash !== hash){
      history.pushState({ screen:name }, '', hash);
    }
  }
  if(!['splash','otp','login','register'].includes(name)){
    try{ localStorage.setItem('stampbook_last_screen', name); }catch(e){}
  }
}
window.addEventListener('popstate', (e)=>{
    const screen = (e.state && e.state.screen) || screenFromHash() || 'home';
    if(document.body.classList.contains('no-chrome') && !getAuth()) return;
    goto(screen, { fromPopstate:true });
  });
function screenFromHash(){
  const m = location.hash.match(/^#\/([a-z-]+)/i);
  return m ? m[1] : null;
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{10}$/;
const COUNTRY_CODE = '+91';
function toE164(phone){ return COUNTRY_CODE + phone; }
function showAuthError(elId, html){
  const el = $(elId);
  el.innerHTML = html;
  el.style.display = 'block';
}
function hideAuthError(elId){
  $(elId).style.display = 'none';
}
function setBtnBusy(id, busy, busyText){
  const btn = $(id);
  if(!btn) return;
  if(busy){
    if(btn.dataset.origText===undefined) btn.dataset.origText = btn.textContent;
    btn.disabled = true;
    btn.textContent = busyText;
  } else {
    btn.disabled = false;
    if(btn.dataset.origText!==undefined) btn.textContent = btn.dataset.origText;
  }
}
let otpContext = null;
let otpResendTimer = null;
let otpResendRemaining = 0;
function clearOtpInputs(){
  document.querySelectorAll('.otp-box').forEach(b=>{ b.value=''; });
}
function setupOtpInputBehavior(){
  const boxes = Array.from(document.querySelectorAll('.otp-box'));
  boxes.forEach((box, i)=>{
      box.oninput = ()=>{
        box.value = box.value.replace(/[^0-9]/g,'').slice(0,1);
        if(box.value && boxes[i+1]) boxes[i+1].focus();
      };
      box.onkeydown = (e)=>{
        if(e.key==='Backspace' && !box.value && boxes[i-1]){ boxes[i-1].focus(); }
        if(e.key==='Enter') doVerifyOtp();
      };
      box.onpaste = (e)=>{
        e.preventDefault();
        const digits = (e.clipboardData.getData('text')||'').replace(/[^0-9]/g,'').slice(0,6).split('');
        digits.forEach((d,j)=>{ if(boxes[j]) boxes[j].value = d; });
        const next = boxes[digits.length] || boxes[boxes.length-1];
        if(next) next.focus();
      };
    });
}
function startOtpResendCountdown(){
  otpResendRemaining = OTP_RESEND_SECONDS;
  updateOtpResendUI();
  clearInterval(otpResendTimer);
  otpResendTimer = setInterval(()=>{
      otpResendRemaining--;
      updateOtpResendUI();
      if(otpResendRemaining<=0) clearInterval(otpResendTimer);
    }, 1000);
}
function updateOtpResendUI(){
  const btn = $('otp-resend-btn');
  const timerEl = $('otp-resend-timer');
  if(!btn) return;
  if(otpResendRemaining>0){
    btn.disabled = true;
    const s = String(otpResendRemaining % 60).padStart(2,'0');
    const m = Math.floor(otpResendRemaining/60);
    timerEl.textContent = 'Resend OTP in ' + m + ':' + s;
  } else {
    btn.disabled = false;
    timerEl.textContent = '';
  }
}
async function doLogout(){
  if(!confirm('Log out of StampBook?')) return;
  await logLoginEvent('logout');
  if(currentAuth) clearCachedData(currentAuth.id);
  await sb.auth.signOut();
  teardownRealtimeSync();
  currentAuth = null;
  publicInvoiceView = false;
  try{ localStorage.removeItem('stampbook_last_screen'); }catch(e){}
  otpContext = null;
  clearInterval(otpResendTimer);
  const loginIdEl = $('login-identifier');
  if(loginIdEl) loginIdEl.value = '';
  history.replaceState({ screen:'login' }, '', '#/login');
  goto('login', { fromPopstate:true });
}
let adminUsersCache = [];
let adminGatewayCache = [];
let adminNoticesCache = [];
let editingNoticeId = null;
let adminCrashCache = [];
let adminChurnCache = [];
let adminFailuresCache = [];
let adminSessionsCache = [];
let adminMainTab = 'gateway';
const ADMIN_MAIN_TABS = [
  ['gateway','Gateway', ()=> adminGatewayCache.filter(u=>u.active_gateway).length],
  ['ads','Ads', null],
  ['broadcast','Broadcast', null],
  ['whatsapp','WhatsApp', null],
  ['tickets','Tickets', ()=> adminTicketsCache.filter(t=>t.status!=='resolved').length],
  ['users','Users', ()=> adminUsersCache.length],
  ['crashes','Crashes', ()=> adminCrashCache.length],
  ['churn','Churn', ()=> adminChurnCache.filter(u=>u.invoice_count===0 || isStaleUser(u)).length],
  ['failures','Failures', null],
  ['sessions','Sessions', ()=> adminSessionsCache.filter(u=>u.last_event==='login').length],
];
function renderAdminMainTabs(){
  const el = $('admin-main-tabs');
  if(!el) return;
  el.innerHTML = ADMIN_MAIN_TABS.map(([key,label,countFn])=>
    `<div class="chip ${adminMainTab===key?'active':''}" onclick="setAdminMainTab('${key}')">${label}${countFn?` (${countFn()})`:''}</div>`
  ).join('');
}
function setAdminMainTab(t){
  adminMainTab = t;
  renderAdminMainTabs();
  ADMIN_MAIN_TABS.forEach(([key])=>{
      const sec = $('admin-tab-'+key);
      if(sec) sec.style.display = (key===t) ? '' : 'none';
    });
}
async function renderAdmin(){
  const [_chartLib, { data:list }, { data:stats, error:statsErr }, { data:allInvData, error:allInvErr }, { data:gwData, error:gwErr }] = await Promise.all([
      loadChartJs(),
      sb.from('profiles').select('*').order('created_at', { ascending:false }),
      sb.rpc('admin_platform_stats'),
      sb.rpc('admin_get_all_invoices'),
      sb.rpc('admin_get_gateway_usage')
    ]);
  const users = list || [];
  adminUsersCache = users;
  const s = (!statsErr && stats && stats[0]) ? stats[0] : null;
  $('admin-count').textContent = s ? s.total_users : users.length;
  $('admin-admincount').textContent = s ? s.total_admins : users.filter(u=>u.role==='admin').length;
  $('admin-activecount').textContent = s ? s.active_users : users.filter(u=>u.is_active!==false).length;
  $('admin-suspendedcount').textContent = s ? s.suspended_users : users.filter(u=>u.is_active===false).length;
  $('admin-invoicecount').textContent = s ? s.total_invoices : '\u2014';
  $('admin-gatewaycount').textContent = s ? s.gateways_live_count : '\u2014';
  $('admin-revenue').textContent = s ? rupee(Number(s.total_revenue||0)) : '\u2014';
  $('admin-outstanding').textContent = s ? rupee(Number(s.total_outstanding||0)) : '\u2014';
  $('admin-new7').textContent = s ? s.new_users_7d : '\u2014';
  $('admin-new30').textContent = s ? s.new_users_30d : '\u2014';
  const days = [...Array(7)].map((_,i)=>{
      const d = new Date(); d.setDate(d.getDate() - (6-i)); d.setHours(0,0,0,0); return d;
    });
  const counts = days.map(d=>{
      const next = new Date(d); next.setDate(next.getDate()+1);
      return users.filter(u=>{ const c = new Date(u.created_at); return c>=d && c<next; }).length;
    });
  const maxCount = Math.max(1, ...counts);
  $('admin-signup-trend').innerHTML = `
<div style="display:flex; align-items:flex-end; gap:8px; height:70px;">
${days.map((d,i)=>`
<div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:4px;">
<div style="font-size:10.5px; color:var(--muted);">${counts[i]||''}</div>
<div style="width:100%; max-width:22px; height:${Math.max(4, (counts[i]/maxCount)*46)}px; background:var(--blue,#3B82F6); border-radius:4px;"></div>
<div style="font-size:9.5px; color:var(--muted);">${d.toLocaleDateString(undefined,{weekday:'short'})}</div>
</div>`).join('')}
</div>`;
  renderAdminRevenueChart(allInvErr ? null : allInvData);
  renderAdminGatewayUsage(gwErr ? null : gwData);
  renderAdminUserList();
  renderAdminMainTabs();
  // Fire-and-forget: tickets, crash reports, feature usage, churn and
  // gateway-failure stats each render into their own section once they
  // land, no need to hold up the rest of the dashboard.
  loadAdminTickets();
  loadAdminCrashes();
  loadAdminFeatureUsage();
  loadAdminChurn();
  loadAdminGatewayFailures();
  loadAdminSessions();
  loadAdminAdsSettings();
}
// ---- Admin: ads pricing + platform payment gateway ----
// platform_settings is a single row (id=1) holding the price/availability of
// each ad-free plan plus the platform's own Razorpay keys, used only for
// charging users to turn ads off (separate from each business's own
// Razorpay keys under Business Settings, which charge that business's
// clients).
let platformAdsSettings = null;
async function loadAdminAdsSettings(){
  const { data, error } = await sb.from('platform_settings').select('*').eq('id', 1).maybeSingle();
  if(error){ return; }
  platformAdsSettings = data || {};
  $('ads-price-monthly').value = platformAdsSettings.ads_monthly_price ?? 49;
  $('ads-price-weekly').value = platformAdsSettings.ads_weekly_price ?? 19;
  $('ads-price-yearly').value = platformAdsSettings.ads_yearly_price ?? 399;
  $('ads-enabled-monthly').checked = platformAdsSettings.ads_monthly_enabled !== false;
  $('ads-enabled-weekly').checked = platformAdsSettings.ads_weekly_enabled !== false;
  $('ads-enabled-yearly').checked = platformAdsSettings.ads_yearly_enabled !== false;
  $('ads-rp-keyid').value = platformAdsSettings.razorpay_key_id || '';
  $('ads-rp-secret').value = platformAdsSettings.razorpay_key_secret || '';
  $('ads-admin-whatsapp').value = platformAdsSettings.admin_whatsapp || '';
}
async function saveAdminAdsSettings(){
  hideAuthError('admin-ads-error');
  const row = {
    id: 1,
    ads_monthly_price: Number($('ads-price-monthly').value || 0),
    ads_weekly_price: Number($('ads-price-weekly').value || 0),
    ads_yearly_price: Number($('ads-price-yearly').value || 0),
    ads_monthly_enabled: $('ads-enabled-monthly').checked,
    ads_weekly_enabled: $('ads-enabled-weekly').checked,
    ads_yearly_enabled: $('ads-enabled-yearly').checked,
    razorpay_key_id: $('ads-rp-keyid').value.trim(),
    razorpay_key_secret: $('ads-rp-secret').value.trim(),
    admin_whatsapp: $('ads-admin-whatsapp').value.trim(),
  };
  setBtnBusy('admin-ads-save-btn', true, 'Saving\u2026');
  try{
    const { error } = await sb.from('platform_settings').upsert(row, { onConflict:'id' });
    if(error){ showAuthError('admin-ads-error', error.message || 'Could not save.'); return; }
    platformAdsSettings = row;
    showToast('Ads settings saved');
  } finally {
    setBtnBusy('admin-ads-save-btn', false);
  }
}
// ---- Admin: per-user "show ads" switch (profiles.ads_enabled) ----
// Independent of a user's own purchased ad-free period (profiles.ads_off_until):
// turning this ON always shows ads again immediately; turning it OFF hides
// ads for that user until an admin turns it back on, a purchase aside.
async function toggleUserAdsOn(userId, checked){
  const { error } = await sb.from('profiles').update({ ads_enabled: checked }).eq('id', userId);
  if(error){ showToast('Could not update — ' + error.message); return; }
  const u = adminUsersCache.find(x=>x.id===userId);
  if(u) u.ads_enabled = checked;
  if(adminDetailUserId===userId) renderAdminUserDetail();
  showToast(checked ? 'Ads turned on for this user' : 'Ads turned off for this user');
}
// ---------------- USER: TURN OFF ADS (purchase flow) ----------------
const ADS_PLAN_DEFS = [
  { key:'weekly',  label:'Weekly',  days:7,   priceField:'ads_weekly_price',  enabledField:'ads_weekly_enabled'  },
  { key:'monthly', label:'Monthly', days:30,  priceField:'ads_monthly_price', enabledField:'ads_monthly_enabled' },
  { key:'yearly',  label:'Yearly',  days:365, priceField:'ads_yearly_price',  enabledField:'ads_yearly_enabled'  },
];
let adsSelectedPlan = null;
let lastAdsPurchase = null; // holds the record used to build/download the invoice after a successful purchase
// Persisted per-device so "Download Invoice" keeps working after the user
// navigates away, closes the app, or reopens it later -- not just in the
// same session right after paying.
const ADS_LAST_PURCHASE_KEY = 'stampbook_last_ads_purchase';
function saveLastAdsPurchase(p){ try{ localStorage.setItem(ADS_LAST_PURCHASE_KEY, JSON.stringify(p)); }catch(e){} }
function loadLastAdsPurchase(){ try{ return JSON.parse(localStorage.getItem(ADS_LAST_PURCHASE_KEY) || 'null'); }catch(e){ return null; } }
async function renderTurnOffAdsScreen(){
  adsSelectedPlan = null;
  $('ads-success-card').style.display = 'none';
  hideAuthError('ads-purchase-error');
  const offCard = $('ads-currently-off-card');
  const pickText = $('ads-pick-plan-text');
  const list = $('ads-plan-list');
  const payBtn = $('ads-pay-btn');
  const downloadBtn = $('ads-off-download-btn');
  // A plan is already active: show the status + a way to re-download the
  // invoice, and don't show the buy-a-plan screen again until it expires.
  if(adsCurrentlyOff() && profile.adsOffUntil){
    offCard.style.display = 'block';
    $('ads-off-until-text').textContent = 'Paid off until ' + fmtDate(profile.adsOffUntil);
    if(!lastAdsPurchase) lastAdsPurchase = loadLastAdsPurchase();
    downloadBtn.style.display = lastAdsPurchase ? 'flex' : 'none';
    pickText.style.display = 'none';
    list.innerHTML = '';
    payBtn.style.display = 'none';
    return;
  }
  offCard.style.display = 'none';
  pickText.style.display = 'block';
  payBtn.style.display = 'flex';
  payBtn.disabled = true;
  payBtn.textContent = 'Select a plan';
  list.innerHTML = '<div class="muted" style="font-size:12px;">Loading plans\u2026</div>';
  try{
    // Regular users are blocked from selecting platform_settings directly
    // (RLS on that table only allows admin role SELECT/ALL) -- this RPC is
    // a SECURITY DEFINER function that returns just the safe columns
    // (prices, enabled flags, razorpay_key_id) without exposing
    // razorpay_key_secret or admin_whatsapp.
    const { data: rows, error } = await sb.rpc('get_platform_ads_settings_public');
    const data = rows && rows[0];
    if(error || !data){ list.innerHTML = '<div class="empty">Could not load plans right now.</div>'; return; }
    platformAdsSettings = data;
    const enabledPlans = ADS_PLAN_DEFS.filter(p => data[p.enabledField] !== false);
    if(!enabledPlans.length){ list.innerHTML = '<div class="empty">No ad-free plans are available right now.</div>'; return; }
    list.innerHTML = enabledPlans.map(p => `
<div class="plancard" id="plancard-${p.key}" onclick="selectAdsPlan('${p.key}')">
<div>
<div class="pc-name">${p.label}</div>
<div class="pc-sub">${p.days} days, ads-free</div>
</div>
<div class="pc-price">\u20b9${Number(data[p.priceField]||0).toLocaleString('en-IN')}</div>
</div>
`).join('');
  }catch(e){
    // Network/RLS failures land here instead of leaving the screen stuck
    // on "Loading plans..." forever.
    list.innerHTML = '<div class="empty">Could not load plans right now.</div>';
  }
}
function selectAdsPlan(key){
  adsSelectedPlan = ADS_PLAN_DEFS.find(p => p.key === key);
  document.querySelectorAll('.plancard').forEach(el => el.classList.toggle('selected', el.id === 'plancard-'+key));
  const btn = $('ads-pay-btn');
  const price = platformAdsSettings ? platformAdsSettings[adsSelectedPlan.priceField] : 0;
  btn.disabled = false;
  btn.textContent = 'Pay \u20b9' + Number(price||0).toLocaleString('en-IN');
}
async function payForAdsRemoval(){
  hideAuthError('ads-purchase-error');
  if(!adsSelectedPlan){ showAuthError('ads-purchase-error', 'Pick a plan first.'); return; }
  if(!platformAdsSettings || !platformAdsSettings.razorpay_key_id){
    showAuthError('ads-purchase-error', 'Payments are not set up yet. Please try again later.');
    return;
  }
  const amount = Number(platformAdsSettings[adsSelectedPlan.priceField] || 0);
  setBtnBusy('ads-pay-btn', true, 'Starting payment\u2026');
  try{
    // ads-create-order is a platform-side Edge Function (separate from the
    // per-business razorpay-create-order used for client invoices) that
    // creates a Razorpay order under the platform's own Razorpay account.
    const createRes = await fetch(CF_FUNCTIONS_BASE + '/ads-create-order', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer ' + (await sb.auth.getSession()).data.session.access_token },
        body: JSON.stringify({ plan: adsSelectedPlan.key, days: adsSelectedPlan.days })
      });
    const order = await createRes.json();
    if(!createRes.ok || !order.order_id) throw new Error(order.error || 'Could not start payment.');
    await loadRazorpayScript();
    setBtnBusy('ads-pay-btn', false);
    const rzp = new Razorpay({
        key: order.key_id || platformAdsSettings.razorpay_key_id,
        amount: order.amount || amount*100,
        currency: order.currency || 'INR',
        name: 'StampBook',
        description: adsSelectedPlan.label + ' \u2014 Turn Off Ads',
        order_id: order.order_id,
        prefill: { name: profile.name || '', email: profile.email || '', contact: profile.phone || '' },
        theme: { color: '#C0392B' },
        handler: async function(response){
          await confirmAdsPurchase(response, order);
        },
        modal: { ondismiss: function(){ setBtnBusy('ads-pay-btn', false); } }
      });
    rzp.open();
  }catch(e){
    showAuthError('ads-purchase-error', e.message || 'Payment could not be started.');
    setBtnBusy('ads-pay-btn', false);
  }
}
async function confirmAdsPurchase(rpResponse, order){
  showPaymentWaitOverlay(5);
  try{
    // ads-verify-payment checks the Razorpay signature on the server, then
    // (on success) flips profiles.ads_enabled off with an expiry, records
    // the purchase, emails the business owner, and sends the paid invoice
    // to the platform admin's WhatsApp.
    const verifyRes = await fetch(CF_FUNCTIONS_BASE + '/ads-verify-payment', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer ' + (await sb.auth.getSession()).data.session.access_token },
        body: JSON.stringify({
            razorpay_order_id: rpResponse.razorpay_order_id,
            razorpay_payment_id: rpResponse.razorpay_payment_id,
            razorpay_signature: rpResponse.razorpay_signature,
            plan: adsSelectedPlan.key,
            days: adsSelectedPlan.days,
          })
      });
    const result = await verifyRes.json();
    if(!verifyRes.ok || result.status !== 'PAID') throw new Error(result.error || 'Payment could not be confirmed.');
    profile.adsEnabled = false;
    profile.adsOffUntil = result.valid_until;
    updateAdsGate();
    lastAdsPurchase = {
      invoiceNo: result.invoice_no,
      plan: adsSelectedPlan.label,
      amount: Number(platformAdsSettings[adsSelectedPlan.priceField] || 0),
      purchasedAt: result.purchased_at || new Date().toISOString(),
      validUntil: result.valid_until,
      customerName: profile.name || '',
      phone: profile.phone || '',
      transactionId: rpResponse.razorpay_payment_id || '',
      themeColor: business.themeColor || '#C0392B',
      logoUrl: business.logoUrl || '',
    };
    saveLastAdsPurchase(lastAdsPurchase);
    hidePaymentWaitOverlay();
    $('ads-success-card').style.display = 'block';
    showToast('Ads turned off');
    // Build the invoice PDF, upload it to Cloudinary, then tell the
    // platform admin's WhatsApp about the purchase with a link to it.
    // Runs after the success UI is already shown -- a failure here
    // shouldn't block or alarm the user, the purchase itself is done.
    notifyAdminOfAdsPurchase(lastAdsPurchase).catch(e => console.error('Admin WhatsApp notify failed:', e));
  }catch(e){
    hidePaymentWaitOverlay();
    showAuthError('ads-purchase-error', e.message || 'Payment could not be confirmed.');
  } finally {
    setBtnBusy('ads-pay-btn', false);
  }
}
async function notifyAdminOfAdsPurchase(purchase){
  const doc = await buildAdsInvoicePDF(purchase);
  const pdfBlob = doc.output('blob');
  const pdfUrl = await uploadPdfToCloudinary(pdfBlob, 'StampBook-AdsInvoice-' + purchase.invoiceNo + '.pdf');
  await fetch(CF_FUNCTIONS_BASE + '/ads-notify-admin', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + (await sb.auth.getSession()).data.session.access_token },
      body: JSON.stringify({ invoice_no: purchase.invoiceNo, pdf_url: pdfUrl })
    });
}
// Same unsigned-preset pattern as uploadToCloudinary(), but for the PDF
// invoice: resource_type 'raw' (Cloudinary's bucket for non-image/video
// files) and its own folder so invoices don't mix with logo uploads.
async function uploadPdfToCloudinary(blob, filename){
  const formData = new FormData();
  formData.append('file', blob, filename);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'stampbook_ads_invoices');
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, {
      method: 'POST',
      body: formData
    });
  if(!res.ok) throw new Error('Cloudinary PDF upload failed: ' + res.status);
  const data = await res.json();
  if(!data.secure_url) throw new Error('Cloudinary PDF upload returned no URL');
  return data.secure_url;
}
// Builds and downloads the "Turn Off Ads" invoice as a PDF for the
// business owner, styled to match their own invoice theme (business
// settings: theme color + logo), not a fixed StampBook look. Amounts are
// written as "Rs" rather than the \u20b9 symbol. The same PDF is uploaded
// to Cloudinary and its link sent to the platform admin's WhatsApp by
// notifyAdminOfAdsPurchase(), after this function returns.
const STAMPBOOK_LOGO_URL = 'https://res.cloudinary.com/xszjfxug/image/upload/v1790123632/stampbook_logos/rwsg9iu4fooubisylsvs.png';
// Loads an image and returns its natural {w,h} -- used to fit the logo
// into a box by its own aspect ratio instead of stretching or cropping
// it square, since this logo is drawn independently, not inside a circle.
async function imageDataUrlSize(src){
  const img = await new Promise((resolve, reject)=>{
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    });
  return { w: img.naturalWidth, h: img.naturalHeight };
}
async function buildAdsInvoicePDF(p){
  await loadJsPDF();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 44;
  const mL = margin, mR = pageW - margin;
  const theme = hexToRgb(p.themeColor);
  doc.setFillColor(theme[0], theme[1], theme[2]);
  doc.rect(0,0,7,pageH,'F');
  const headerH = 100, hy = headerH/2;
  doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(1.4);
  doc.line(mL, headerH-6, mR, headerH-6);
  doc.setDrawColor(230,222,216); doc.setLineWidth(0.6);
  doc.line(mL, headerH-2, mR, headerH-2);
  doc.setLineWidth(0.2);
  // Logo drawn independently -- its own shape, no white disc or circular
  // clip behind it -- fitted into a box by its natural aspect ratio.
  const maxW = 76, maxH = 40;
  let textX = mL;
  try{
    const logoUrl = STAMPBOOK_LOGO_URL;
    const logoDataUrl = await urlToDataUrl(logoUrl);
    const { w: nw, h: nh } = await imageDataUrlSize(logoDataUrl);
    const scale = Math.min(maxW/nw, maxH/nh);
    const w = nw*scale, h = nh*scale;
    const format = /^data:image\/(\w+)/.exec(logoDataUrl);
    doc.addImage(logoDataUrl, (format ? format[1] : 'PNG').toUpperCase(), mL, hy-h/2, w, h);
    textX = mL + w + 14;
  }catch(e){}
  doc.setTextColor(30,25,23);
  doc.setFont('helvetica','bold'); doc.setFontSize(20);
  doc.text('StampBook', textX, hy-5);
  doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(120,110,105);
  doc.text('Ad-free plan purchase', textX, hy+13);
  doc.setTextColor(theme[0], theme[1], theme[2]);
  doc.setFont('helvetica','bold'); doc.setFontSize(26);
  doc.text('INVOICE', mR, hy-3, { align:'right' });
  doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(120,110,105);
  doc.text('#'+p.invoiceNo, mR, hy+15, { align:'right' });
  let y = headerH + 50;
  const row = (label, value) => {
    doc.setFont('helvetica','normal'); doc.setFontSize(10.5); doc.setTextColor(140,130,124);
    doc.text(label, mL, y);
    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(30,25,23);
    doc.text(String(value||'\u2014'), mR, y, { align:'right' });
    y += 26;
    doc.setDrawColor(238,232,227); doc.setLineWidth(0.5); doc.line(mL, y-16, mR, y-16);
  };
  row('Customer Name', p.customerName);
  row('Mobile Number', p.phone);
  row('Purchase Plan', p.plan);
  row('Transaction ID', p.transactionId);
  row('Date & Time of Purchase', fmtDateTime(p.purchasedAt));
  row('Date of Purchase', fmtDate(p.purchasedAt));
  row('Valid Until', fmtDate(p.validUntil));
  y += 14;
  doc.setFillColor(253, 245, 243);
  doc.roundedRect(mL, y, mR-mL, 46, 8, 8, 'F');
  doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(120,110,105);
  doc.text('Amount Paid', mL+16, y+29);
  doc.setFont('helvetica','bold'); doc.setFontSize(18); doc.setTextColor(theme[0], theme[1], theme[2]);
  doc.text('Rs '+Number(p.amount||0).toLocaleString('en-IN'), mR-16, y+29, { align:'right' });
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(160,150,145);
  doc.text('StampBook \u00b7 This is a system-generated invoice.', pageW/2, pageH-30, { align:'center' });
  return doc;
}
async function downloadAdsInvoice(){
  if(!lastAdsPurchase) lastAdsPurchase = loadLastAdsPurchase();
  if(!lastAdsPurchase) return;
  const doc = await buildAdsInvoicePDF(lastAdsPurchase);
  doc.save('StampBook-AdsInvoice-'+lastAdsPurchase.invoiceNo+'.pdf');
}
// Platform-wide "Monthly Revenue" chart — billed totals grouped by invoice
// month across every user, cancelled invoices excluded. Same grouping and
// SVG-drawing approach as the per-user chart on the Reports screen (see
// renderReports), rebuilt here standalone rather than shared, because that
// one reads from the signed-in user's own `invoices` global — reusing it
// directly would either require polluting that global with every user's
// invoices (defeats the point of keeping admin-viewed data separate) or
// threading extra parameters through a function other screens also call.
// computeInvoice() and mapInvoiceRow() themselves ARE reused as-is since
// they're pure functions that only touch the row/items passed in.
let adminRevChartInstance = null;
function renderAdminRevenueChart(data){
  const canvas = $('admin-rev-chart');
  const monthEl = $('admin-rev-ins-month');
  const valEl = $('admin-rev-ins-val');
  if(!canvas) return;
  if(adminRevChartInstance){ adminRevChartInstance.destroy(); adminRevChartInstance=null; }
  if(!data){ if(monthEl) monthEl.textContent='Hover chart'; if(valEl) valEl.textContent='--'; return; }
  const itemRows = data.invoice_items || [];
  const invoicesComputed = (data.invoices || [])
  .map(r => mapInvoiceRow(r, itemRows.filter(it=>it.invoice_id===r.id)))
  .map(computeInvoice)
  .filter(i=>i.stage!=='cancelled');
  const byMonth = {};
  invoicesComputed.forEach(i=>{
      if(!i.date) return;
      const key = i.date.slice(0,7);
      byMonth[key] = (byMonth[key]||0) + i.total;
    });
  const now = new Date();
  const monthKeys = [];
  for(let k=11;k>=0;k--){
    const d = new Date(now.getFullYear(), now.getMonth()-k, 1);
    monthKeys.push(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'));
  }
  const monthLabels = monthKeys.map(k=>{
      const [y,m] = k.split('-').map(Number);
      return new Date(y, m-1, 1).toLocaleDateString('en-GB',{month:'short'});
    });
  const vals = monthKeys.map(k=>byMonth[k]||0);
  if(vals.every(v=>v===0)){ if(monthEl) monthEl.textContent='Hover chart'; if(valEl) valEl.textContent='--'; return; }
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0,0,0,140);
  grad.addColorStop(0,'rgba(6, 182, 212, 0.45)');
  grad.addColorStop(0.65,'rgba(6, 182, 212, 0.08)');
  grad.addColorStop(1,'rgba(6, 182, 212, 0.0)');
  adminRevChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [{
            label: 'Revenue',
            data: vals,
            borderColor: '#06b6d4',
            borderWidth: 2.5,
            backgroundColor: grad,
            fill: true,
            tension: 0.44,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#0d121c',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#06b6d4'
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 900, easing: 'easeOutCubic' },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: function(context){
              const tm = context.tooltip;
              if(tm.opacity===0){
                if(monthEl) monthEl.textContent='Hover chart';
                if(valEl) valEl.textContent='--';
                return;
              }
              const idx = tm.dataPoints[0].dataIndex;
              if(monthEl) monthEl.textContent = monthLabels[idx];
              if(valEl) valEl.textContent = rupee(vals[idx]);
            }
          }
        },
        scales: {
          x: {
            grid: { display:false, drawBorder:false },
            ticks: { color:'#64748b', font:{ weight:'600', size:10 }, padding:6 }
          },
          y: {
            display:false,
            grid: { display:false, drawBorder:false }
          }
        }
      }
    });
}
// Which payment gateway (if any) each user has made active. Reads only
// active_gateway — never the stored razorpay_key_id/secret — since this
// list is for "who's using what", not a place to expose anyone's API keys.
function renderAdminGatewayUsage(list){
  const el = $('admin-gateway-usage');
  adminGatewayCache = list || [];
  renderAdminMainTabs();
  if(!el) return;
  if(!list){ el.innerHTML = `<div class="empty">Could not load gateway usage</div>`; return; }
  const names = { razorpay:'Razorpay', upi:'UPI' };
  const connected = list.filter(u=>u.active_gateway);
  const notConnected = list.filter(u=>!u.active_gateway);
  el.innerHTML = `
${connected.map(u=>`<div class="listitem" style="cursor:default;">
<div><div style="font-size:13px;font-weight:700;">${u.name}</div><div class="muted" style="font-size:11px;">${u.email}</div></div>
<span class="pill Paid">${names[u.active_gateway]||u.active_gateway}</span>
</div>`).join('')}
${notConnected.length ? `<div class="muted" style="font-size:11.5px;margin-top:10px;">${notConnected.length} user(s) with no gateway connected</div>` : ''}
` || `<div class="empty">No users yet</div>`;
}
function renderAdminUserList(){
  const users = adminUsersCache;
  const q = ($('admin-search-input')||{}).value || '';
  const filtered = q
  ? users.filter(u => (u.name+' '+u.email+' '+u.phone+' '+u.designation).toLowerCase().includes(q.toLowerCase()))
  : users;
  $('admin-list').innerHTML = filtered.map(u=>{
      const isSelf = currentAuth && u.id===currentAuth.id;
      const suspended = u.is_active===false;
      return `
<div class="admin-userrow" onclick="openAdminUserDetail('${u.id}')" style="cursor:pointer;">
<div class="top">
<div>
<div class="name">${u.name}</div>
<div class="desig">${u.designation||'\u2014'}</div>
</div>
<span class="pill ${u.role==='admin'?'Sent':'Paid'}">${u.role==='admin'?'Admin':'User'}</span>
</div>
<div class="line">${ic('phone',14)} ${u.phone||''}</div>
<div class="line">${ic('mail',14)} ${u.email}</div>
<div class="line muted" style="font-size:11.5px;">${ic('calendar',13)} Registered ${fmtDate(u.created_at)}</div>
${suspended ? `<div class="line" style="margin-top:6px;"><span class="pill Overdue">Suspended</span></div>` : ''}
${isSelf ? `<div class="line muted" style="font-size:11px; margin-top:8px;">This is you</div>` : `
<div class="row" style="gap:8px; margin-top:10px;" onclick="event.stopPropagation()">
<button class="btn-ghost" style="flex:1; font-size:12.5px; padding:8px;" onclick="doAdminSetActive('${u.id}', ${suspended})">${suspended?'Reactivate':'Suspend'}</button>
<button class="btn-ghost" style="flex:1; font-size:12.5px; padding:8px;" onclick="doAdminSetRole('${u.id}', '${u.role==='admin'?'user':'admin'}')">${u.role==='admin'?'Demote to User':'Promote to Admin'}</button>
</div>`}
</div>`;
    }).join('') || `<div class="empty">${ic('users',34)}No users have registered yet</div>`;
}
async function doAdminSetActive(userId, makeActive){
  const label = makeActive ? 'reactivate' : 'suspend';
  if(!confirm(`Are you sure you want to ${label} this user?`)) return;
  const { error } = await sb.rpc('admin_set_user_active', { p_user_id:userId, p_active:makeActive });
  if(error){ alert(error.message || 'Something went wrong.'); return; }
  await renderAdmin();
}
async function doAdminSetRole(userId, newRole){
  const label = newRole==='admin' ? 'promote this user to Admin' : 'demote this user to a regular User';
  if(!confirm(`Are you sure you want to ${label}?`)) return;
  const { error } = await sb.rpc('admin_set_user_role', { p_user_id:userId, p_role:newRole });
  if(error){ alert(error.message || 'Something went wrong.'); return; }
  await renderAdmin();
}
async function fetchAdminNotices(){
  const { data, error } = await sb.from('app_notices').select('*').order('created_at', { ascending:false });
  if(error){ adminNoticesCache = []; renderAdminNoticesList(); return; }
  adminNoticesCache = data || [];
  renderAdminNoticesList();
}
function renderAdminNoticesList(){
  const el = $('admin-notice-list');
  if(!el) return;
  if(!adminNoticesCache.length){ el.innerHTML = '<div class="muted" style="font-size:12.5px;">No notices published yet.</div>'; return; }
  el.innerHTML = adminNoticesCache.map((n,i)=>{
      const d = new Date(n.created_at);
      const dstr = String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();
      return `<div class="card" style="margin-bottom:8px;">
<div class="muted" style="font-size:11px;margin-bottom:6px;">Date : ${dstr}</div>
<div data-notice-preview="${i}"></div>
<div style="display:flex;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid var(--line);">
<button class="btn-ghost sm" style="flex:1;" onclick="editAdminNotice('${n.id}')">Edit</button>
<button class="btn-ghost sm" style="flex:1;color:var(--red);" onclick="deleteAdminNotice('${n.id}')">Delete</button>
</div>
</div>`;
    }).join('');
  adminNoticesCache.forEach((n,i)=>{
      const host = el.querySelector(`[data-notice-preview="${i}"]`);
      if(!host) return;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
      iframe.style.cssText = 'width:100%;border:0;display:block;overflow:hidden;';
      iframe.srcdoc = n.body_html;
      iframe.addEventListener('load', ()=>{
          try{
            const doc = iframe.contentDocument;
            const resize = ()=>{ iframe.style.height = doc.documentElement.scrollHeight + 'px'; };
            resize();
            new ResizeObserver(resize).observe(doc.documentElement);
          }catch(e){  }
        });
      host.replaceWith(iframe);
    });
}
function editAdminNotice(id){
  const n = adminNoticesCache.find(x=>x.id===id);
  if(!n) return;
  editingNoticeId = id;
  $('admin-notice-body').value = n.body_html;
  $('admin-notice-publish-btn').textContent = 'Update Notice';
  $('admin-notice-body').scrollIntoView({behavior:'smooth', block:'center'});
}
async function doAdminPublishNotice(){
  hideAuthError('admin-notice-error');
  const body_html = $('admin-notice-body').value.trim();
  if(!body_html){ showAuthError('admin-notice-error','Please write the notice.'); return; }
  const wasEditing = !!editingNoticeId;
  setBtnBusy('admin-notice-publish-btn', true, wasEditing ? 'Updating\u2026' : 'Publishing\u2026');
  let error;
  if(wasEditing){
    ({ error } = await sb.from('app_notices').update({ body_html }).eq('id', editingNoticeId));
  }else{
    ({ error } = await sb.from('app_notices').insert({ body_html }));
  }
  setBtnBusy('admin-notice-publish-btn', false, 'Publish Notice');
  if(error){ showAuthError('admin-notice-error', error.message || 'Something went wrong.'); return; }
  $('admin-notice-body').value = '';
  $('admin-notice-publish-btn').textContent = 'Publish Notice';
  editingNoticeId = null;
  showToast(wasEditing ? 'Notice updated' : 'Notice published');
  await fetchAdminNotices();
}
async function deleteAdminNotice(id){
  if(!confirm('Delete this notice?')) return;
  const { error } = await sb.from('app_notices').delete().eq('id', id);
  if(error){ showToast('Could not delete'); return; }
  showToast('Notice deleted');
  await fetchAdminNotices();
}
async function doAdminBroadcast(){
  hideAuthError('admin-broadcast-error');
  $('admin-broadcast-result').textContent = '';
  const title = $('admin-broadcast-title').value.trim();
  const body = $('admin-broadcast-body').value.trim();
  const audience = $('admin-broadcast-audience').value;
  const isHtml = $('admin-broadcast-ishtml').checked;
  if(!title || !body){ showAuthError('admin-broadcast-error', 'Please fill in both subject and message.'); return; }
  setBtnBusy('admin-broadcast-btn', true, 'Sending\u2026');
  showSendWait('Sending broadcast…', 'Delivering your message to recipients.');
  try{
    const { data, error } = await sb.functions.invoke('admin-broadcast-email', { body: { title, body, audience, is_html:isHtml } });
    if(error){ hideSendWait(); showAuthError('admin-broadcast-error', error.message || 'Something went wrong.'); return; }
    const resultMsg = data && typeof data.sent==='number'
    ? `Sent to ${data.sent} of ${data.total} matching user(s).` : 'Sent.';
    $('admin-broadcast-result').textContent = resultMsg;
    $('admin-broadcast-title').value = '';
    $('admin-broadcast-body').value = '';
    completeSendWait('Email broadcast sent!', resultMsg);
  } finally {
    setBtnBusy('admin-broadcast-btn', false);
  }
}
async function doAdminBroadcastWhatsapp(){
  hideAuthError('admin-wabroadcast-error');
  $('admin-wabroadcast-result').textContent = '';
  const body = $('admin-wabroadcast-body').value.trim();
  const audience = $('admin-wabroadcast-audience').value;
  if(!body){ showAuthError('admin-wabroadcast-error', 'Please write a message.'); return; }
  setBtnBusy('admin-wabroadcast-btn', true, 'Sending\u2026');
  showSendWait('Sending broadcast…', 'Delivering your WhatsApp message to recipients.');
  try{
    const { data, error } = await sb.functions.invoke('admin-broadcast-whatsapp', { body: { body, audience } });
    if(error){ hideSendWait(); showAuthError('admin-wabroadcast-error', error.message || 'Something went wrong.'); return; }
    const resultMsg = data && typeof data.sent==='number'
    ? `Sent to ${data.sent} of ${data.total} matching user(s).` : 'Sent.';
    $('admin-wabroadcast-result').textContent = resultMsg;
    $('admin-wabroadcast-body').value = '';
    completeSendWait('WhatsApp broadcast sent!', resultMsg);
  } finally {
    setBtnBusy('admin-wabroadcast-btn', false);
  }
}
let adminTicketsCache = [];
let adminTicketFilter = 'open';
async function loadAdminTickets(){
  const { data, error } = await sb.rpc('admin_get_support_tickets');
  const el = $('admin-tickets-list');
  if(error){
    if(el) el.innerHTML = `<div class="empty">Could not load tickets. ${error.message||''}</div>`;
    return;
  }
  adminTicketsCache = data || [];
  renderAdminTicketFilters();
  renderAdminTickets();
  renderAdminMainTabs();
}
function renderAdminTicketFilters(){
  const el = $('admin-ticket-filters');
  if(!el) return;
  let openCount=0, resolvedCount=0;
  adminTicketsCache.forEach(t=>{ if(t.status==='resolved') resolvedCount++; else openCount++; });
  const chips = [
    ['open', `Open (${openCount})`],
    ['resolved', `Resolved (${resolvedCount})`],
    ['all', `All (${adminTicketsCache.length})`]
  ];
  el.innerHTML = chips.map(([val,label])=>
    `<div class="chip ${adminTicketFilter===val?'active':''}" onclick="setAdminTicketFilter('${val}')">${label}</div>`
  ).join('');
}
function setAdminTicketFilter(f){ adminTicketFilter = f; renderAdminTicketFilters(); renderAdminTickets(); }
function renderAdminTickets(){
  const el = $('admin-tickets-list');
  if(!el) return;
  const filtered = adminTicketFilter==='all' ? adminTicketsCache
  : adminTicketsCache.filter(t => adminTicketFilter==='resolved' ? t.status==='resolved' : t.status!=='resolved');
  el.innerHTML = filtered.map(t=>`
<div class="listitem" style="cursor:default; flex-direction:column; align-items:stretch;">
<div class="top" style="display:flex; justify-content:space-between; gap:8px;">
<div style="font-size:13.5px; font-weight:700;">${t.subject || '(no subject)'}</div>
<span class="pill ${t.status==='resolved'?'Paid':'Overdue'}">${t.status==='resolved'?'Resolved':'Open'}</span>
</div>
<div class="muted" style="font-size:11.5px; margin-top:2px;">${t.user_name||''} \u00b7 ${t.user_email||''} \u00b7 ${fmtDate(t.created_at)}</div>
<div style="font-size:12.5px; margin-top:6px;">${(t.message||'').slice(0,160)}${(t.message||'').length>160?'\u2026':''}</div>
<div class="row" style="gap:8px; margin-top:10px;">
<button class="btn-ghost" style="flex:1; font-size:12px; padding:8px;" onclick="doAdminSetTicketStatus('${t.id}', '${t.status==='resolved'?'open':'resolved'}')">${t.status==='resolved'?'Reopen':'Mark Resolved'}</button>
${t.user_id ? `<button class="btn-ghost" style="flex:1; font-size:12px; padding:8px;" onclick="replyToTicket('${t.id}')">Reply by Email</button>` : ''}
</div>
</div>`).join('') || `<div class="empty">No support tickets</div>`;
}
async function doAdminSetTicketStatus(ticketId, newStatus){
  const { error } = await sb.rpc('admin_update_ticket_status', { p_ticket_id:ticketId, p_status:newStatus });
  if(error){ alert(error.message || 'Something went wrong.'); return; }
  await loadAdminTickets();
}
// Jumps to the ticket's user in Admin > User Details and pre-fills the
// "Email This User" subject with "Re: <ticket subject>".
function replyToTicket(ticketId){
  const t = adminTicketsCache.find(x=>x.id===ticketId);
  if(!t || !t.user_id) return;
  adminEmailPrefillSubject = t.subject ? ('Re: ' + t.subject) : '';
  openAdminUserDetail(t.user_id);
}
// ---------------- Crash / error reports (admin) ----------------
// Client-side JS errors are captured by reportCrash() (see just below the
// Supabase client init) and written into public.crash_reports. Read here
// via the SECURITY DEFINER admin_get_crash_reports() RPC (same admin-only
// pattern as admin_get_support_tickets) — run the migration SQL before
// this section will show any data.
async function loadAdminCrashes(){
  const { data, error } = await sb.rpc('admin_get_crash_reports');
  const el = $('admin-crash-list');
  if(error){
    if(el) el.innerHTML = `<div class="empty">Could not load crash reports. ${error.message||''}</div>`;
    return;
  }
  adminCrashCache = data || [];
  renderAdminCrashes();
  renderAdminMainTabs();
}
function renderAdminCrashes(){
  const el = $('admin-crash-list');
  if(!el) return;
  el.innerHTML = adminCrashCache.map(c=>`
<div class="listitem" style="cursor:default; flex-direction:column; align-items:stretch; ${c.resolved?'opacity:.55;':''}">
<div class="top" style="display:flex; justify-content:space-between; gap:8px;">
<div style="font-size:13px; font-weight:700;">${(c.message||'Unknown error').slice(0,120)}</div>
<span class="pill ${c.resolved?'Paid':'Overdue'}">${c.resolved?'Resolved':'Open'}</span>
</div>
<div class="muted" style="font-size:11px; margin-top:2px;">${c.screen||'\u2014'} \u00b7 ${c.app_version||'\u2014'} \u00b7 ${fmtDate(c.created_at)}</div>
${c.stack ? `<div class="muted" style="font-size:10.5px; margin-top:6px; white-space:pre-wrap; max-height:80px; overflow-y:auto; font-family:monospace;">${c.stack.slice(0,500)}</div>` : ''}
<div class="row" style="gap:8px; margin-top:10px;">
<button class="btn-ghost" style="flex:1; font-size:12px; padding:8px;" onclick="doAdminResolveCrash('${c.id}', ${!c.resolved})">${c.resolved?'Reopen':'Mark Resolved'}</button>
<button class="btn-ghost" style="flex:1; font-size:12px; padding:8px; color:var(--red);" onclick="doAdminDeleteCrash('${c.id}')">Delete</button>
</div>
</div>`).join('') || `<div class="empty">No crash reports recorded yet.</div>`;
}
async function doAdminResolveCrash(id, resolved){
  const { error } = await sb.rpc('admin_resolve_crash', { p_id:id, p_resolved:resolved });
  if(error){ alert(error.message || 'Something went wrong.'); return; }
  await loadAdminCrashes();
}
async function doAdminDeleteCrash(id){
  if(!confirm('Permanently delete this crash report?')) return;
  const { error } = await sb.rpc('admin_delete_crash', { p_id:id });
  if(error){ alert(error.message || 'Something went wrong.'); return; }
  await loadAdminCrashes();
}
async function loadAdminFeatureUsage(){
  const { data, error } = await sb.rpc('admin_get_feature_usage');
  const el = $('admin-feature-usage');
  if(!el) return;
  if(error || !data || !data[0]){ el.innerHTML = `<div class="empty">Could not load feature usage${error?'. '+error.message:''}</div>`; return; }
  const s = data[0];
  const total = s.total_users || 1;
  const rows = [
    ['Added a client', s.users_with_clients],
    ['Created an invoice', s.users_with_invoices],
    ['Sent an invoice', s.users_with_sent_invoice],
    ['Received a payment', s.users_with_payment_received],
  ];
  el.innerHTML = `<div class="card">` + rows.map(([label,count])=>{
      const pct = total ? Math.round((count/total)*100) : 0;
      return `<div style="margin-bottom:10px;">
<div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
<span>${label}</span><span class="muted">${count} / ${s.total_users} (${pct}%)</span>
</div>
<div style="height:8px; border-radius:4px; background:var(--slate-50); overflow:hidden;">
<div style="width:${pct}%; height:100%; background:var(--red);"></div>
</div>
</div>`;
    }).join('') + `</div>`;
}
const CHURN_STALE_DAYS = 30;
function daysSince(dateStr){
  if(!dateStr) return null;
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}
function isStaleUser(u){
  const ref = u.last_activity_at || u.last_invoice_date || u.created_at;
  const d = daysSince(ref);
  return d===null || d >= CHURN_STALE_DAYS;
}
async function loadAdminChurn(){
  const { data, error } = await sb.rpc('admin_get_user_engagement');
  const el = $('admin-churn-list');
  if(error){
    if(el) el.innerHTML = `<div class="empty">Could not load engagement data. ${error.message||''}</div>`;
    return;
  }
  adminChurnCache = data || [];
  renderAdminChurn();
  renderAdminMainTabs();
}
function renderAdminChurn(){
  const el = $('admin-churn-list');
  if(!el) return;
  const rows = adminChurnCache
  .filter(u => u.invoice_count===0 || isStaleUser(u))
  .sort((a,b)=>{
      const da = daysSince(a.last_activity_at || a.last_invoice_date || a.created_at);
      const db = daysSince(b.last_activity_at || b.last_invoice_date || b.created_at);
      return (db===null?99999:db) - (da===null?99999:da);
    });
  el.innerHTML = rows.map(u=>{
      const d = daysSince(u.last_activity_at || u.last_invoice_date || u.created_at);
      const neverUsed = u.invoice_count === 0;
      return `<div class="listitem" style="cursor:default; flex-direction:column; align-items:stretch;">
<div class="top" style="display:flex; justify-content:space-between; gap:8px;">
<div style="font-size:13px; font-weight:700;">${u.name||'\u2014'}</div>
<span class="pill ${neverUsed?'Draft':'Overdue'}">${neverUsed?'Never used':(d+'d inactive')}</span>
</div>
<div class="muted" style="font-size:11px; margin-top:2px;">${u.email||''} \u00b7 signed up ${fmtDate(u.created_at)} \u00b7 ${u.invoice_count||0} invoice${u.invoice_count===1?'':'s'}</div>
<button class="btn-ghost" style="margin-top:8px; font-size:12px; padding:8px;" onclick="reEngageUser('${u.id}')">Send Re-engagement Email</button>
</div>`;
    }).join('') || `<div class="empty">No inactive users \u2014 everyone's engaged.</div>`;
}
function reEngageUser(userId){
  adminEmailPrefillSubject = 'We miss you at StampBook!';
  openAdminUserDetail(userId);
}
async function loadAdminGatewayFailures(){
  const { data, error } = await sb.rpc('admin_get_gateway_failure_stats');
  const el = $('admin-gateway-failures');
  if(error){
    if(el) el.innerHTML = `<div class="empty">Could not load gateway stats. ${error.message||''}</div>`;
    return;
  }
  adminFailuresCache = data || [];
  renderAdminGatewayFailures();
}
function renderAdminGatewayFailures(){
  const el = $('admin-gateway-failures');
  if(!el) return;
  const names = { razorpay:'Razorpay' };
  const rows = adminFailuresCache.filter(g=>g.total_orders>0);
  if(!rows.length){ el.innerHTML = `<div class="empty">No gateway orders recorded yet.</div>`; return; }
  el.innerHTML = rows.map(g=>{
      const failRate = g.total_orders ? Math.round((g.failed/g.total_orders)*100) : 0;
      return `<div class="card" style="margin-bottom:10px;">
<div style="display:flex; justify-content:space-between; align-items:center;">
<div style="font-size:13.5px; font-weight:700;">${names[g.gateway]||g.gateway}</div>
<span class="pill ${failRate>=20?'Overdue':(failRate>=5?'Partial':'Paid')}">${failRate}% failed</span>
</div>
<div class="muted" style="font-size:11px; margin-top:4px;">${g.total_orders} orders \u00b7 ${g.succeeded} succeeded \u00b7 ${g.failed} failed \u00b7 ${g.pending} pending</div>
<div style="display:flex; height:8px; border-radius:4px; overflow:hidden; margin-top:8px; background:var(--slate-50);">
<div style="width:${g.total_orders?(g.succeeded/g.total_orders*100):0}%; background:var(--green);"></div>
<div style="width:${g.total_orders?(g.failed/g.total_orders*100):0}%; background:var(--red);"></div>
<div style="width:${g.total_orders?(g.pending/g.total_orders*100):0}%; background:var(--amber);"></div>
</div>
</div>`;
    }).join('');
}
async function loadAdminSessions(){
  const { data, error } = await sb.rpc('admin_get_login_status');
  const el = $('admin-sessions-list');
  if(error){
    if(el) el.innerHTML = `<div class="empty">Could not load login activity. ${error.message||''}</div>`;
    return;
  }
  adminSessionsCache = data || [];
  renderAdminSessions();
  renderAdminMainTabs();
}
function renderAdminSessions(){
  const el = $('admin-sessions-list');
  if(!el) return;
  const rows = [...adminSessionsCache].sort((a,b)=>{
      const ta = a.last_event_at ? new Date(a.last_event_at).getTime() : -1;
      const tb = b.last_event_at ? new Date(b.last_event_at).getTime() : -1;
      return tb - ta;
    });
  el.innerHTML = rows.map(u=>{
      const online = u.last_event === 'login';
      const never = !u.last_event;
      const pillClass = never ? 'Draft' : (online ? 'Paid' : 'Overdue');
      const pillText = never ? 'Never logged in' : (online ? 'Online' : 'Offline');
      const whenText = never ? '' : `${online?'since':'logged out'} ${fmtDateTime(u.last_event_at)}`;
      return `<div class="listitem" style="cursor:pointer; flex-direction:column; align-items:stretch;" onclick="openAdminUserDetail('${u.id}')">
<div class="top" style="display:flex; justify-content:space-between; gap:8px;">
<div style="font-size:13px; font-weight:700;">${u.name||'\u2014'}</div>
<span class="pill ${pillClass}">${pillText}</span>
</div>
<div class="muted" style="font-size:11px; margin-top:2px;">${u.email||''}${whenText?' \u00b7 '+whenText:''}</div>
</div>`;
    }).join('') || `<div class="empty">No login activity recorded yet.</div>`;
}
let adminEmailPrefillSubject = '';
async function doAdminSendEmail(userId){
  hideAuthError('admin-email-error');
  const subject = $('admin-email-subject').value.trim();
  const msg = $('admin-email-body').value.trim();
  const isHtml = $('admin-email-ishtml').checked;
  if(!subject || !msg){ showAuthError('admin-email-error', 'Please fill in both subject and message.'); return; }
  setBtnBusy('admin-email-btn', true, 'Sending\u2026');
  try{
    const { error } = await sb.functions.invoke('admin-send-email', { body: { user_id:userId, subject, body:msg, is_html:isHtml } });
    if(error){ showAuthError('admin-email-error', error.message || 'Something went wrong.'); return; }
    $('admin-email-subject').value = '';
    $('admin-email-body').value = '';
    adminEmailPrefillSubject = '';
  } finally {
    setBtnBusy('admin-email-btn', false);
  }
}
async function doAdminSendWhatsapp(userId){
  hideAuthError('admin-wa-error');
  const msg = $('admin-wa-body').value.trim();
  if(!msg){ showAuthError('admin-wa-error', 'Please write a message.'); return; }
  setBtnBusy('admin-wa-btn', true, 'Sending\u2026');
  try{
    const { error } = await sb.functions.invoke('admin-send-whatsapp', { body: { user_id:userId, message:msg } });
    if(error){ showAuthError('admin-wa-error', error.message || 'Something went wrong.'); return; }
    $('admin-wa-body').value = '';
  } finally {
    setBtnBusy('admin-wa-btn', false);
  }
}
let adminDetailUserId = null;
let adminDetailData = null;
let adminDetailTab = 'clients';
let adminDetailLoginHistory = null;
function openAdminUserDetail(userId){
  adminDetailUserId = userId;
  adminDetailData = null;
  adminDetailTab = 'clients';
  adminDetailLoginHistory = null;
  goto('admin-user-detail');
  loadAdminUserDetail(userId);
  loadAdminUserLoginHistory(userId);
}
async function loadAdminUserDetail(userId){
  const { data, error } = await sb.rpc('admin_get_user_data', { p_user_id: userId });
  if(error || !data){
    const body = $('admin-user-detail-body');
    if(body) body.innerHTML = `<div class="empty">Could not load this user's data.${error?(' '+error.message):''}</div>`;
    return;
  }
  const clientsArr = (data.clients||[]).map(c=>({
        id:c.id, name:c.name, phone:c.phone||'', email:c.email||'', address:c.address||'', gstin:c.gstin||'', notes:c.notes||''
      }));
  const itemRows = data.invoice_items||[];
  const invoicesArr = (data.invoices||[])
  .map(r=>mapInvoiceRow(r, itemRows.filter(it=>it.invoice_id===r.id)))
  .map(computeInvoice);
  const paymentsArr = (data.payments||[]).map(mapPaymentRow);
  adminDetailData = { clients:clientsArr, invoices:invoicesArr, payments:paymentsArr };
  if(adminDetailUserId===userId) renderAdminUserDetail();
}
async function loadAdminUserLoginHistory(userId){
  const { data, error } = await sb.rpc('admin_get_login_history', { p_user_id: userId });
  if(!error && adminDetailUserId===userId){
    adminDetailLoginHistory = data || [];
    renderAdminUserDetail();
  }
}
function setAdminDetailTab(t){ adminDetailTab = t; renderAdminUserDetail(); }
function renderAdminUserLoginHistoryHtml(){
  if(adminDetailLoginHistory===null) return `<div class="muted" style="font-size:12px;">Loading\u2026</div>`;
  if(!adminDetailLoginHistory.length) return `<div class="muted" style="font-size:12px;">No login activity recorded yet.</div>`;
  const latest = adminDetailLoginHistory[0];
  const online = latest.event==='login';
  let html = `<div class="line" style="margin-bottom:8px;"><span class="pill ${online?'Paid':'Overdue'}">${online?'Online':'Offline'}</span> <span class="muted" style="font-size:11px;">${online?'since':'logged out'} ${fmtDateTime(latest.created_at)}</span></div>`;
  html += adminDetailLoginHistory.map(ev=>
    `<div class="line muted" style="font-size:11.5px;">${ic(ev.event==='login'?'shield':'back',12)} ${ev.event==='login'?'Logged in':'Logged out'} \u00b7 ${fmtDateTime(ev.created_at)}</div>`
  ).join('');
  return html;
}
function renderAdminUserDetail(){
  const body = $('admin-user-detail-body');
  const u = adminUsersCache.find(x=>x.id===adminDetailUserId);
  if(!u){ body.innerHTML = `<div class="empty">User not found</div>`; return; }
  let html = `
<div class="card">
<div style="display:flex;align-items:center;gap:12px;">
<div class="avatar">${(u.name||'?')[0]}</div>
<div>
<div style="font-size:16px;font-weight:800;">${u.name}</div>
<div class="muted" style="font-size:12px;">${u.designation||'\u2014'}</div>
</div>
</div>
<div class="line" style="margin-top:10px;">${ic('phone',14)} ${u.phone||'\u2014'}</div>
<div class="line">${ic('mail',14)} ${u.email}</div>
<div class="line muted" style="font-size:11.5px;">${ic('calendar',13)} Registered ${fmtDate(u.created_at)}</div>
<div class="line" style="margin-top:6px;"><span class="pill ${u.role==='admin'?'Sent':'Paid'}">${u.role==='admin'?'Admin':'User'}</span>${u.is_active===false?' <span class="pill Overdue">Suspended</span>':''}</div>
<div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--line);">
<div>
<div style="font-size:13px;font-weight:700;">Ads</div>
<div class="muted" style="font-size:11px;margin-top:2px;">${u.ads_enabled===false?'Ads are off for this user':'Ads are shown to this user'}${u.ads_off_until && new Date(u.ads_off_until)>new Date() ? ' \\u00b7 paid off until '+fmtDate(u.ads_off_until) : ''}</div>
</div>
<label class="toggle-switch"><input type="checkbox" ${u.ads_enabled!==false?'checked':''} onchange="toggleUserAdsOn('${u.id}', this.checked)"><span class="slider"></span></label>
</div>
</div>
<div class="section-head" style="padding-top:14px;"><h2>Login Activity</h2></div>
<div class="card" id="admin-user-login-card">${renderAdminUserLoginHistoryHtml()}</div>
<div class="section-head" style="padding-top:14px;"><h2>Email This User</h2></div>
<div class="card">
<div class="field" style="margin-bottom:8px;"><input id="admin-email-subject" placeholder="Subject" value="${(adminEmailPrefillSubject||'').replace(/"/g,'&quot;')}"></div>
<div class="field" style="margin-bottom:4px;">
<label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="admin-email-ishtml" style="width:auto;" onchange="$('admin-email-body').placeholder = this.checked ? 'Paste your branded HTML email here' : 'Message'">Send as raw HTML</label>
</div>
<div class="field" style="margin-bottom:8px;"><textarea id="admin-email-body" rows="4" placeholder="Message"></textarea></div>
<div class="auth-error" id="admin-email-error"></div>
<button class="btn" id="admin-email-btn" onclick="doAdminSendEmail('${u.id}')">Send Email</button>
</div>
<div class="section-head" style="padding-top:14px;"><h2>WhatsApp This User</h2></div>
<div class="card">
<div class="field" style="margin-bottom:8px;"><textarea id="admin-wa-body" rows="4" placeholder="Message"></textarea></div>
<div class="auth-error" id="admin-wa-error"></div>
<button class="btn" id="admin-wa-btn" onclick="doAdminSendWhatsapp('${u.id}')">Send WhatsApp</button>
</div>`;
  if(!adminDetailData){
    html += `<div class="empty" style="margin-top:16px;">Loading history\u2026</div>`;
    body.innerHTML = html;
    return;
  }
  const d = adminDetailData;
  const live = d.invoices.filter(i=>i.stage!=='cancelled');
  const billed = live.reduce((s,i)=>s+i.total,0);
  const received = live.reduce((s,i)=>s+i.paid,0);
  const due = live.reduce((s,i)=>s+i.due,0);
  html += `
<div class="statgrid" style="margin-top:12px;">
<div class="stat"><div class="muted" style="font-size:11px;">Billed</div><div class="v">${rupee(billed)}</div></div>
<div class="stat"><div class="muted" style="font-size:11px;">Received</div><div class="v" style="color:var(--green)">${rupee(received)}</div></div>
<div class="stat"><div class="muted" style="font-size:11px;">Due</div><div class="v" style="color:var(--red)">${rupee(due)}</div></div>
</div>
<div class="tabs" style="margin-top:14px;">
<div class="tab ${adminDetailTab==='clients'?'active':''}" onclick="setAdminDetailTab('clients')">Clients (${d.clients.length})</div>
<div class="tab ${adminDetailTab==='invoices'?'active':''}" onclick="setAdminDetailTab('invoices')">Invoices (${d.invoices.length})</div>
<div class="tab ${adminDetailTab==='payments'?'active':''}" onclick="setAdminDetailTab('payments')">Payments (${d.payments.length})</div>
</div>
<div style="margin-top:12px;">`;
  if(adminDetailTab==='clients'){
    html += d.clients.map(c=>`<div class="listitem" style="cursor:default;">
<div><div style="font-size:13px;font-weight:700;">${c.name}</div><div class="muted" style="font-size:11px;">${c.phone||c.email||'\u2014'}</div></div>
</div>`).join('') || `<div class="empty">No clients</div>`;
  } else if(adminDetailTab==='invoices'){
    html += [...d.invoices].sort((a,b)=> new Date(b.date)-new Date(a.date)).map(inv=>{
        const cl = d.clients.find(c=>c.id===inv.clientId);
        return `<div class="listitem" style="cursor:default;">
<div><div style="font-size:13px;font-weight:700;">${inv.id}</div><div class="muted" style="font-size:11px;">${cl?cl.name:'\u2014'} \u00b7 ${fmtDate(inv.date)}</div></div>
<div style="text-align:right;"><div style="font-size:13px;font-weight:800;">${rupee(inv.total)}</div><span class="pill ${inv.status}">${inv.status}</span></div>
</div>`;
      }).join('') || `<div class="empty">No invoices</div>`;
  } else {
    html += [...d.payments].sort((a,b)=> new Date(b.date)-new Date(a.date)).map(p=>{
        const cl = d.clients.find(c=>c.id===p.clientId);
        return `<div class="listitem" style="cursor:default;">
<div><div style="font-size:13px;font-weight:700;">${cl?cl.name:'\u2014'}</div><div class="muted" style="font-size:11px;">${fmtDate(p.date)} \u00b7 ${p.mode}${p.invoiceId?' \u00b7 '+p.invoiceId:''}</div></div>
<div style="font-size:13px;font-weight:800;color:var(--green);">${rupee(p.amount)}</div>
</div>`;
      }).join('') || `<div class="empty">No payments</div>`;
  }
  html += `</div>`;
  if(!(currentAuth && u.id===currentAuth.id)){
    html += `<button class="btn line" style="margin-top:16px;color:var(--red);border-color:var(--red-100);" onclick="doAdminDeleteUser('${u.id}')">${ic('trash',15)} Permanently Delete User</button>`;
  }
  body.innerHTML = html;
}
async function doAdminDeleteUser(userId){
  const u = adminUsersCache.find(x=>x.id===userId);
  if(!u) return;
  const d = adminDetailData;
  const counts = d ? `${d.clients.length} client(s), ${d.invoices.length} invoice(s) and ${d.payments.length} payment(s)` : 'their clients, invoices and payments';
  const msg = `Permanently delete ${u.name}'s account? This will erase their login and ${counts}. This cannot be undone.`;
  if(!confirm(msg)) return;
  if(!confirm(`Last check — really delete ${u.name}? There is no recovery after this.`)) return;
  const { error } = await sb.rpc('admin_delete_user', { p_user_id: userId });
  if(error){ alert(error.message || 'Could not delete this user.'); return; }
  adminUsersCache = adminUsersCache.filter(x=>x.id!==userId);
  if(adminDetailUserId===userId){ adminDetailUserId = null; adminDetailData = null; }
  showToast(u.name+' deleted');
  goto('admin');
  renderAdmin();
}
function openInvoice(id){ currentInvoiceId = id; goto('invoice-detail'); }
function openClient(id){ currentClientId = id; clientTab='invoices'; goto('client-detail'); }
function toggleSearch(kind){
  const box = $(kind+'-search');
  box.style.display = box.style.display==='none' ? 'flex' : 'none';
}
function openPlusSheet(){ $('plus-overlay').classList.add('active'); }
function closePlusSheet(){ $('plus-overlay').classList.remove('active'); }
function animateNumber(el, to){
  if(!el) return;
  const from = 0;
  const dur = 650;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = rupee(from + (to-from)*eased);
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function adInFeedHtml(slot, layoutKey){
  return `<div class="card adblock-wrap" style="margin-bottom:8px;padding:10px 12px;">
<div class="muted" style="font-size:9.5px;text-align:center;margin-bottom:4px;letter-spacing:.3px;">Advertisement</div>
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5534015246644026" data-ad-slot="${slot}" data-ad-format="fluid" data-ad-layout-key="${layoutKey}"></ins>
</div>`;
}
function pushAdsIn(containerId){
  if(adsCurrentlyOff()) return;
  const el = $(containerId);
  if(!el) return;
  el.querySelectorAll('ins.adsbygoogle').forEach(()=>{
      try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
    });
}
function pushStaticAdOnce(insId){
  if(adsCurrentlyOff()) return;
  const el = $(insId);
  if(!el || el.dataset.pushed) return;
  el.dataset.pushed = '1';
  try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
}
const ANCHOR_AD_SCREENS = ['home','invoices','clients','payments','reports','history','client-detail','invoice-detail','profile'];
let anchorAdPushed = false;
let anchorAdDismissed = false;
function updateAnchorAd(name, isPublicRoute){
  const bar = $('anchor-ad-bar');
  if(!bar) return;
  const allowed = ANCHOR_AD_SCREENS.includes(name) && !isPublicRoute && !anchorAdDismissed && !adsCurrentlyOff();
  bar.classList.toggle('show', allowed);
  if(allowed && !anchorAdPushed){
    anchorAdPushed = true;
    try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
  }
}
function dismissAnchorAd(){
  anchorAdDismissed = true;
  const bar = $('anchor-ad-bar');
  if(bar) bar.classList.remove('show');
}
let homeAdPushed = false;
function renderHome(){
  if(!homeAdPushed && !adsCurrentlyOff()){
    homeAdPushed = true;
    try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
  }
  const t = totalsSummary();
  animateNumber($('home-total-billed'), t.billed);
  $('home-received').textContent = rupee(t.received);
  $('home-due').textContent = rupee(t.due);
  $('home-count').textContent = t.count;
  $('home-month').textContent = rupee(t.month);
  $('home-clientcount').textContent = clients.length;
  updateNotifDot();
  const recent = allInvoicesComputed().sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,3);
  $('home-recent').innerHTML = recent.map(inv=>{
      const c = clientById(inv.clientId);
      return `<div class="listitem" onclick="openInvoice('${inv.id}')">
<div><div style="font-size:14px;font-weight:700;">${inv.id}</div>
<div class="muted" style="font-size:12px;">${c?c.name:''} · ${fmtDate(inv.date)}</div></div>
<div style="text-align:right;"><div style="font-size:14px;font-weight:800;">${rupee(inv.total)}</div>
<span class="pill ${inv.status}">${inv.status}</span></div></div>`;
    }).join('') || `<div class="empty">${ic('invoice',34)}No invoices yet</div>`;
}
function isDueTomorrow(dueDate){
  const d = new Date(dueDate); const t = new Date(todayISO());
  const diff = Math.round((d-t)/86400000);
  return diff===1;
}
function renderInvoices(){
  const filters = ['All','Draft','Sent','Partial','Paid','Overdue','Cancelled'];
  $('inv-filters').innerHTML = filters.map(f=>
    `<div class="chip ${f===invFilter?'active':''}" onclick="setInvFilter('${f}')">${f}</div>`).join('');
  const q = ($('inv-search-input')?.value||'').toLowerCase();
  let list = allInvoicesComputed().sort((a,b)=> new Date(b.date)-new Date(a.date));
  if(invFilter!=='All') list = list.filter(i=>i.status===invFilter);
  if(q) list = list.filter(i=> i.id.toLowerCase().includes(q) || (clientById(i.clientId)?.name||'').toLowerCase().includes(q));
  $('invoices-list').innerHTML = list.map((inv,idx)=>{
      const c = clientById(inv.clientId);
      const card = `<div class="listitem" onclick="openInvoice('${inv.id}')">
<div><div style="font-size:14px;font-weight:700;">${inv.id}</div>
<div class="muted" style="font-size:12px;">${c?c.name:''}</div>
<div class="muted" style="font-size:11px;margin-top:2px;">${fmtDate(inv.date)}</div></div>
<div style="text-align:right;"><div style="font-size:14px;font-weight:800;">${rupee(inv.total)}</div>
<span class="pill ${inv.status}">${inv.status}</span></div></div>`;
      const ad = (idx>0 && (idx+1)%4===0) ? adInFeedHtml('9512343683','-fb+5w+4e-db+86') : '';
      return card+ad;
    }).join('') || `<div class="empty">${ic('invoice',34)}No invoices found</div>`;
  pushAdsIn('invoices-list');
  pushStaticAdOnce('ins-invoices-banner');
}
function setInvFilter(f){ invFilter=f; renderInvoices(); }
function renderInvoiceDetail(){
  const inv = computeInvoice(getDisplayInvoice(currentInvoiceId));
  const c = getDisplayClient(inv.clientId);
  const backBtn = $('invd-back');
  if(backBtn) backBtn.style.display = publicInvoiceView ? 'none' : '';
  let actionsHtml = '';
  let cancelHtml = '';
  let deleteHtml = '';
  if(!publicInvoiceView){
    if(inv.stage==='draft'){
      actionsHtml = `<button class="btn" style="margin-top:14px;" onclick="markAsSent('${inv.id}')">${ic('send',15)} Send Invoice</button>`;
    } else if(inv.stage!=='cancelled' && inv.due>0){
      actionsHtml = `<div id="upi-claim-banner"></div><button class="btn" style="margin-top:14px;" onclick="prefillPayment('${inv.id}','${inv.clientId}')">${ic('wallet',15)} Add Payment</button>`;
      loadUpiClaimBanner(inv.id);
    }
    if(inv.stage!=='cancelled' && inv.status!=='Paid'){
      cancelHtml = `<button class="btn line" style="margin-top:10px;color:var(--red);" onclick="cancelInvoice('${inv.id}')">${ic('ban',15)} Cancel Invoice</button>`;
    }
    deleteHtml = `<button class="btn line" style="margin-top:10px;color:var(--red);border-color:var(--red-100);" onclick="deleteInvoice('${inv.id}')">${ic('trash',15)} Delete Invoice</button>`;
  }
  let payHtml = '';
  if(publicInvoiceView && publicActiveGateway && inv.stage!=='cancelled' && inv.due>0){
    if(publicActiveGateway === 'upi' && publicUpiClaimedAt){
      payHtml = `<div class="card" style="margin-top:14px;background:var(--amber-50,#FFF7E8);border-color:var(--amber-200,#F5D68C);">
<div style="font-size:13px;font-weight:700;">${ic('bell',15)} Waiting for confirmation</div>
<div class="muted" style="font-size:12px;margin-top:4px;line-height:1.5;">You told us you paid ${rupee(inv.due)} on ${fmtDate(publicUpiClaimedAt)}. The business will verify and mark this invoice as paid shortly.</div>
<button class="btn line" style="margin-top:10px;font-size:12px;" onclick="resetUpiClaim('${inv.id}')">Didn't actually pay yet? Pay again</button>
</div>`;
    } else if(publicActiveGateway === 'upi'){
      const _bz = publicBusinessData || business;
      const _upi = (_bz && _bz.upi) ? String(_bz.upi).trim() : '';
      if(_upi && isMerchantUpiId(_upi)){
        payHtml = `<div class="card" id="upi-qr-card" style="margin-top:14px;text-align:center;">
<div style="font-size:14px;font-weight:800;">Scan to Pay</div>
<div id="upi-qr-img" style="margin:12px auto 8px;width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:10px;"><span class="muted" style="font-size:12px;">Loading QR…</span></div>
<div style="font-size:20px;font-weight:800;">${rupee(inv.due)}</div>
<div class="muted" style="font-size:12px;margin-top:6px;">UPI ID</div>
<div style="font-size:14px;font-weight:700;word-break:break-all;">${esc(_upi)}</div>
</div>
<button class="btn" style="margin-top:14px;" onclick="openUpiConfirmFor('${inv.id}')">I've made the payment, confirm</button>`;
      }
    } else {
      payHtml = `<button class="btn" id="cf-pay-btn" style="margin-top:14px;" onclick="payWithGateway('${inv.id}', this)">${ic('wallet',15)} Pay ${rupee(inv.due)} Online</button>`;
    }
  }
  $('invoice-detail-body').innerHTML = `
<div class="card">
<div style="display:flex;justify-content:space-between;align-items:flex-start;">
<div><div style="font-size:17px;font-weight:800;">${inv.id}</div>
<div class="muted" style="font-size:13px;margin-top:2px;">${c?c.name:''}</div></div>
<span class="pill ${inv.status}">${inv.status}</span>
</div>
<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:14px;">
<span>Date: ${fmtDate(inv.date)}</span><span>Due: ${fmtDate(inv.dueDate)}</span>
</div>
<div style="border-top:1px dashed var(--line);margin-top:16px;padding-top:12px;">
${inv.lineItems.map(it=>`<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
<span>${it.name} <span class="muted">×${it.qty}</span></span><span style="font-weight:700;">${rupee(it.qty*it.price)}</span></div>`).join('')}
</div>
<div class="totalsbox">
<div class="trow"><span>Subtotal</span><span>${rupee(inv.subtotal)}</span></div>
<div class="trow"><span>Discount</span><span>${rupee(inv.discount)}</span></div>
${inv.extraCharges.map(c=>`<div class="trow"><span>${c.label}</span><span>${rupee(c.amount)}</span></div>`).join('')}
<div class="trow total"><span>Total</span><span>${rupee(inv.total)}</span></div>
<div class="trow green"><span>Paid</span><span>${rupee(inv.paid)}</span></div>
<div class="trow red"><span>Due</span><span>${rupee(inv.due)}</span></div>
</div>
</div>
<div class="share-row">
<button id="btn-pdf-${inv.id}" onclick="downloadInvoicePDF('${inv.id}', this)"><div class="ic">${ic('download',18)}</div>PDF</button>
<button id="btn-share-${inv.id}" onclick="shareInvoice('${inv.id}','native', this)"><div class="ic">${ic('share',18)}</div>Share</button>
<button onclick="shareInvoice('${inv.id}','whatsapp')"><div class="ic">${ic('whatsapp',18)}</div>WhatsApp</button>
<button onclick="shareInvoice('${inv.id}','email')"><div class="ic">${ic('mail',18)}</div>Email</button>
<button onclick="showPrintWait()"><div class="ic">${ic('print',18)}</div>Print</button>
</div>
${payHtml}
${actionsHtml}
${cancelHtml}
${deleteHtml}
${!publicInvoiceView ? adInFeedHtml('9975378118','-gw-3+1f-3d+2z') : ''}
`;
  pushAdsIn('invoice-detail-body');
  if($('upi-qr-img')) renderUpiQrOnPage(inv);
}
async function renderUpiQrOnPage(inv){
  const box = $('upi-qr-img');
  if(!box) return;
  const biz = publicBusinessData || business;
  const dataUrl = await buildUpiQrDataUrl(String(biz.upi).trim(), biz.name || 'StampBook', Number(inv.due).toFixed(2), inv.id);
  const again = $('upi-qr-img');
  if(!again) return;
  if(dataUrl){
    again.innerHTML = '<img alt="UPI QR code" src="'+dataUrl+'" style="width:100%;height:100%;object-fit:contain;">';
  } else {
    again.innerHTML = '<span class="muted" style="font-size:12px;">Could not load QR</span>';
  }
}
// ---------------- PDF / SHARE ----------------
const pdfRupee = (n) => 'Rs. ' + _inr.format(Math.round(Number(n||0)));
const CANONICAL_APP_URL = 'https://stampbook.shop/';
function appBaseUrl(){
  return CANONICAL_APP_URL;
}
function invoiceShareLink(invId){
  return appBaseUrl() + '#/pay/' + encodeURIComponent(invId);
}
async function shortenLink(longUrl){
  try{
    const { data, error } = await sb.functions.invoke('shorten-link', { body: { url: longUrl } });
    if(error || !data || !data.short) throw new Error('shorten failed');
    return data.short;
  }catch(e){
    return longUrl;
  }
}
const submitLocks = new Set();
async function loadUpiClaimBanner(invId){
  const el = $('upi-claim-banner');
  if(!el) return;
  try{
    const { data, error } = await sb.from('upi_payment_claims')
    .select('claimed_at').eq('invoice_id', invId)
    .order('claimed_at', { ascending:false }).limit(1).maybeSingle();
    if(error || !data) return;
    const stillThere = $('upi-claim-banner');
    if(!stillThere) return;
    stillThere.innerHTML = `<div class="card" style="margin-top:14px;background:var(--amber-50,#FFF7E8);border-color:var(--amber-200,#F5D68C);">
<div style="font-size:13px;font-weight:700;">${ic('bell',15)} Client says they paid</div>
<div class="muted" style="font-size:12px;margin-top:4px;">Marked as paid via UPI on ${fmtDate(data.claimed_at)}. Verify it landed in your account, then use "Add Payment" below.</div>
</div>`;
  }catch(e){  }
}
function guardSubmit(key, btn){
  if(submitLocks.has(key)) return false;
  submitLocks.add(key);
  if(btn){ btn.disabled = true; btn.style.opacity = '0.6'; btn.style.pointerEvents = 'none'; }
  return true;
}
function releaseSubmit(key, btn){
  submitLocks.delete(key);
  if(btn){ btn.disabled = false; btn.style.opacity = ''; btn.style.pointerEvents = ''; }
}
let paywaitInterval = null;
function showPaymentWaitOverlay(seconds){
  const overlay = $('paywait-overlay');
  const countEl = $('paywait-count');
  let remaining = seconds;
  countEl.textContent = remaining;
  overlay.classList.add('active');
  clearInterval(paywaitInterval);
  paywaitInterval = setInterval(()=>{
      remaining = Math.max(0, remaining - 1);
      countEl.textContent = remaining;
      if(remaining <= 0) clearInterval(paywaitInterval);
    }, 1000);
}
function hidePaymentWaitOverlay(){
  $('paywait-overlay').classList.remove('active');
  clearInterval(paywaitInterval);
  paywaitInterval = null;
}
function showSaveWait(kind, msg){
  const overlayId = kind==='client' ? 'savewait-client-overlay' : 'savewait-invoice-overlay';
  const titleId = kind==='client' ? 'savewait-client-title' : 'savewait-invoice-title';
  $(titleId).textContent = msg || (kind==='client' ? 'Creating client…' : 'Saving invoice…');
  $(overlayId).classList.add('active');
}
function hideSaveWait(kind){
  const overlayId = kind==='client' ? 'savewait-client-overlay' : 'savewait-invoice-overlay';
  $(overlayId).classList.remove('active');
}
function showSendWait(msg, sub){
  const stage = $('sendwait-stage');
  stage.classList.remove('launch','success');
  stage.classList.add('flying');
  const title = $('sendwait-title');
  title.textContent = msg || 'Sending…';
  title.classList.remove('big-success');
  $('sendwait-sub').textContent = sub || "Please don't close this window.";
  $('sendwait-track').classList.remove('done');
  $('sendwait-overlay').classList.add('active');
}
function completeSendWait(msg, sub){
  const stage = $('sendwait-stage');
  $('sendwait-track').classList.add('done');
  stage.classList.remove('flying');
  stage.classList.add('launch');
  setTimeout(()=>{
      stage.classList.add('success');
      const title = $('sendwait-title');
      title.textContent = msg || 'Your message is sent!';
      title.classList.add('big-success');
      $('sendwait-sub').textContent = sub || 'Tap anywhere to continue.';
    }, 1000);
}
function hideSendWait(){
  $('sendwait-overlay').classList.remove('active');
}
function closeSendWaitIfDone(){
  const stage = $('sendwait-stage');
  if(stage.classList.contains('success')) hideSendWait();
}
function showPrintWait(){
  const overlay = $('printwait-overlay');
  const scene = $('printwait-scene');
  const checkmark = $('printwait-checkmark');
  const checkPath = overlay.querySelector('.print-check-path');
  const title = $('printwait-title');
  const desc = $('printwait-desc');
  overlay.classList.add('active');
  scene.style.display = 'flex';
  scene.style.opacity = '1';
  scene.style.transform = 'scale(1)';
  checkmark.style.display = 'none';
  checkPath.style.animation = 'none';
  void checkPath.offsetWidth;
  checkPath.style.animation = '';
  title.textContent = 'Printing Invoice…';
  title.style.color = 'var(--ink)';
  desc.textContent = 'Please wait while processing';
  scene.classList.remove('animating');
  void scene.offsetWidth;
  scene.classList.add('animating');
  setTimeout(() => {
      scene.style.opacity = '0';
      scene.style.transform = 'scale(0.7)';
      setTimeout(() => {
          scene.style.display = 'none';
          checkmark.style.display = 'flex';
          title.textContent = 'Print Ready!';
          title.style.color = 'var(--green)';
          desc.textContent = 'Opening the print dialog…';
          window.print();
        }, 300);
    }, 1600);
  setTimeout(() => { overlay.classList.remove('active'); }, 2600);
}
function showDeleteWait(msg){
  $('deletewait-title').textContent = msg || 'Deleting…';
  $('deletewait-overlay').classList.add('active');
}
function hideDeleteWait(){
  $('deletewait-overlay').classList.remove('active');
}
function setBtnLoading(btn, on){
  if(!btn) return;
  if(on){ btn.dataset.orig = btn.innerHTML; btn.classList.add('loading'); btn.innerHTML = '<span class="spinner-sm" style="border-color:rgba(192,57,43,.35);border-top-color:var(--red);"></span>'; }
  else{ btn.classList.remove('loading'); if(btn.dataset.orig) btn.innerHTML = btn.dataset.orig; }
}
let toastTimer = null;
function showToast(msg){
  let t = $('app-toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'app-toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2400);
}
// Merchant UPI ID format check: handle@psp (e.g. shopname@okaxis, 9876543210@ybl).
// Number-based IDs are allowed because many merchants use them.
function isMerchantUpiId(v){
  v = (v||'').trim();
  if(!/^[a-zA-Z0-9][a-zA-Z0-9.\-_]{1,255}@[a-zA-Z][a-zA-Z0-9]{2,63}$/.test(v)) return false;
  return true;
}
const MERCHANT_UPI_MSG = 'Please enter a valid UPI ID (e.g. yourshop@bankname). You can use your merchant UPI ID or your own personal UPI ID.';
async function buildUpiQrDataUrl(upiId, payeeName, amount, invoiceId){
  try{
    await loadQRCode();
    const upiUri = 'upi://pay?pa='+encodeURIComponent(upiId)
    +'&pn='+encodeURIComponent(payeeName)
    +'&am='+encodeURIComponent(amount)
    +'&cu=INR'
    +'&tn='+encodeURIComponent('Invoice '+invoiceId);
    const holder = document.createElement('div');
    holder.style.position='fixed'; holder.style.left='-9999px'; holder.style.top='-9999px';
    document.body.appendChild(holder);
    new QRCode(holder, { text: upiUri, width: 240, height: 240, correctLevel: QRCode.CorrectLevel.M });
    let dataUrl = null;
    const canvas = holder.querySelector('canvas');
    if(canvas){ dataUrl = canvas.toDataURL('image/png'); }
    else {
      const img = holder.querySelector('img');
      if(img && img.src && img.src.startsWith('data:')) dataUrl = img.src;
    }
    document.body.removeChild(holder);
    return dataUrl;
  }catch(e){ console.error(e); return null; }
}
async function buildInvoicePDF(invId){
  await loadJsPDFAutoTable();
  const inv = computeInvoice(getDisplayInvoice(invId));
  const c = getDisplayClient(inv.clientId) || {};
  const business = getDisplayBusiness();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;
  const theme = hexToRgb(business.themeColor);
  const supportedTemplates = ['Classic','Minimal','Bold','Modern','Luxe','Editorial','Aster','Ledger','Stamp','Spine'];
  const tpl = supportedTemplates.includes(business.template) ? business.template : 'Classic';
  const contentInset = ['Modern','Aster'].includes(tpl) ? 16 : (tpl==='Spine' ? 44 : 0);
  const plainTpl = ['Minimal','Modern','Editorial','Aster','Ledger','Stamp','Spine'];
  const tf = tpl==='Ledger' ? 'times' : 'helvetica';
  const mL = margin + contentInset;
  const mR = pageW - margin - contentInset;
  const headerH = tpl==='Bold' ? 110
  : (['Modern','Luxe','Aster','Spine'].includes(tpl) ? 100
    : (['Editorial','Ledger','Stamp'].includes(tpl) ? 96 : 90));
  const hy = headerH/2;
  const pageHfull = doc.internal.pageSize.getHeight();
  if(tpl==='Minimal'){
    doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(2);
    doc.line(mL, headerH-4, mR, headerH-4);
    doc.setLineWidth(0.2);
  } else if(['Modern','Aster'].includes(tpl)){
    doc.setFillColor(theme[0], theme[1], theme[2]);
    doc.rect(0,0,7,pageHfull,'F');
    doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(1.4);
    doc.line(mL, headerH-6, mR, headerH-6);
    doc.setDrawColor(230,222,216); doc.setLineWidth(0.6);
    doc.line(mL, headerH-2, mR, headerH-2);
    doc.setLineWidth(0.2);
  } else if(tpl==='Luxe'){
    doc.setFillColor(31, 28, 27);
    doc.rect(0,0,pageW,headerH,'F');
    doc.setFillColor(214,170,83);
    doc.rect(margin, headerH-5, pageW-margin*2, 5, 'F');
  } else if(tpl==='Editorial'){
    doc.setDrawColor(34,29,27); doc.setLineWidth(1.4);
    doc.line(mL, 22, mL+86, 22);
    doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(2.2);
    doc.line(mL+92, 22, mR, 22);
    doc.setLineWidth(0.2);
  } else if(tpl==='Ledger'){
    doc.setFillColor(243,247,241); doc.rect(0,0,pageW,pageHfull,'F');
    doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(0.8);
    doc.line(mL-14, 0, mL-14, pageHfull);
    doc.setDrawColor(34,29,27); doc.setLineWidth(1.6); doc.line(mL, headerH-8, mR, headerH-8);
    doc.setLineWidth(0.5); doc.line(mL, headerH-3, mR, headerH-3);
    doc.setLineWidth(0.2);
  } else if(tpl==='Stamp'){
    doc.setDrawColor(theme[0], theme[1], theme[2]);
    doc.setLineWidth(2.4); doc.rect(26, 14, pageW-52, pageHfull-28);
    doc.setLineWidth(0.6); doc.rect(31, 19, pageW-62, pageHfull-38);
    doc.setLineWidth(0.2);
  } else if(tpl==='Spine'){
    doc.setFillColor(theme[0], theme[1], theme[2]);
    doc.rect(0,0,58,pageHfull,'F');
    doc.setTextColor(255,255,255);
    doc.setFont('helvetica','bold'); doc.setFontSize(22);
    const spineStatus = String(inv.status||'').toUpperCase();
    doc.text(spineStatus, 36, pageHfull-44, { angle:90 });
    doc.setFont('helvetica','normal'); doc.setFontSize(10);
    doc.text('Due '+fmtDate(inv.dueDate), 34, pageHfull-44-doc.getTextWidth(spineStatus)*2.1-18, { angle:90 });
  } else {
    doc.setFillColor(theme[0], theme[1], theme[2]);
    doc.rect(0,0,pageW,headerH,'F');
  }
  let logoDataUrl = LOGO_ICON_B64;
  if(business.logoUrl){
    try{ logoDataUrl = await urlToDataUrl(business.logoUrl); }
    catch(e){ console.error(e); logoDataUrl = LOGO_ICON_B64; }
  }
  try{
    const cx = mL+18, cy = hy, r = 20;
    doc.setFillColor(255,255,255);
    if(tpl==='Minimal'||tpl==='Modern'){ doc.setDrawColor(230,222,216); doc.circle(cx, cy, r, 'FD'); } else doc.circle(cx, cy, r, 'F');
    const squareLogo = await squareCropDataUrl(logoDataUrl, 200);
    doc.saveGraphicsState();
    doc.circle(cx, cy, r);
    doc.clip();
    doc.discardPath();
    doc.addImage(squareLogo, 'PNG', cx-r, cy-r, r*2, r*2);
    doc.restoreGraphicsState();
  }catch(e){
    try{
      doc.setFillColor(255,255,255);
      doc.circle(mL+18, hy, 20, 'F');
      const logoFormat = /^data:image\/(\w+)/.exec(logoDataUrl);
      doc.addImage(logoDataUrl, (logoFormat ? logoFormat[1] : 'PNG').toUpperCase(), mL+3, hy-15, 30, 30);
    }catch(e2){}
  }
  const onBand = ['Classic','Bold','Luxe'].includes(tpl);
  if(onBand) doc.setTextColor(255,255,255); else doc.setTextColor(30,25,23);
  doc.setFont(tf,'bold'); doc.setFontSize(20);
  doc.text(business.name || 'StampBook', mL+46, hy-5);
  doc.setFont('helvetica','normal'); doc.setFontSize(10);
  if(!onBand) doc.setTextColor(120,110,105);
  doc.text(business.address || '', mL+46, hy+13, { maxWidth: Math.max(120, mR-(mL+46)-150) });
  if(tpl==='Luxe') doc.setTextColor(234,198,115);
  else if(!onBand) doc.setTextColor(theme[0], theme[1], theme[2]);
  doc.setFont(tf, tpl==='Ledger' ? 'bolditalic' : 'bold'); doc.setFontSize(['Bold','Ledger'].includes(tpl) ? 30 : (['Modern','Luxe','Aster','Spine'].includes(tpl) ? 26 : 22));
  doc.text('INVOICE', mR, hy-3, { align:'right' });
  doc.setFont('helvetica','normal'); doc.setFontSize(11);
  if(tpl==='Luxe') doc.setTextColor(246,224,170);
  else if(!onBand) doc.setTextColor(120,110,105);
  doc.text('#'+inv.id, mR, hy+15, { align:'right' });
  doc.setTextColor(30,25,23);
  let y = headerH + 28;
  if(['Modern','Aster'].includes(tpl)){
    const cardY = headerH + 14, cardH = 126;
    const cardX = mL - 12, cardW = (mR-mL) + 24;
    if(tpl==='Aster'){
      doc.setFillColor(241,248,247); doc.setDrawColor(205,228,224);
    } else {
      doc.setFillColor(248,246,244); doc.setDrawColor(236,230,225);
    }
    doc.setLineWidth(0.7);
    doc.roundedRect(cardX, cardY, cardW, cardH, 8, 8, 'FD');
    doc.setLineWidth(0.2);
    y = cardY + 22;
  }
  doc.setFont('helvetica','bold'); doc.setFontSize(10.5);
  doc.text('BILLED TO', mL, y);
  doc.setFont('helvetica','normal'); doc.setFontSize(11);
  doc.text(c.name || '-', mL, y+16);
  doc.setFontSize(9.5); doc.setTextColor(120,110,105);
  let cy = y+30;
  const clientTextWidth = Math.min(250, Math.max(150, (mR-mL)*0.48));
  if(c.address){
    const addressLines = doc.splitTextToSize(c.address, clientTextWidth).slice(0,2);
    doc.text(addressLines, mL, cy);
    cy += 13 * addressLines.length;
  }
  if(c.phone){ doc.text(c.phone, mL, cy); cy += 13; }
  if(c.email){ doc.text(c.email, mL, cy); cy += 13; }
  if(c.gstin){ doc.text('GSTIN: '+c.gstin, mL, cy); }
  doc.setTextColor(30,25,23); doc.setFont('helvetica','bold'); doc.setFontSize(10.5);
  doc.text('INVOICE DATE', mR, y, { align:'right' });
  doc.setFont('helvetica','normal'); doc.setFontSize(10.5);
  doc.text(fmtDate(inv.date), mR, y+15, { align:'right' });
  doc.setFont('helvetica','bold'); doc.setFontSize(10.5);
  doc.text('DUE DATE', mR, y+34, { align:'right' });
  doc.setFont('helvetica','normal'); doc.setFontSize(10.5);
  doc.text(fmtDate(inv.dueDate), mR, y+49, { align:'right' });
  doc.setFont('helvetica','bold'); doc.setFontSize(10.5);
  doc.text('STATUS', mR, y+68, { align:'right' });
  doc.setTextColor(theme[0], theme[1], theme[2]); doc.text(inv.status, mR, y+83, { align:'right' });
  doc.setTextColor(30,25,23);
  if(tpl==='Stamp'){
    const sc = inv.status==='Paid' ? [14,143,92] : theme;
    const scx = pageW/2+70, scy = y+42, ang = 14, rad = ang*Math.PI/180;
    doc.setDrawColor(sc[0],sc[1],sc[2]);
    doc.setLineWidth(2.2); doc.circle(scx, scy, 33);
    doc.setLineWidth(0.6); doc.circle(scx, scy, 28);
    doc.setLineWidth(0.2);
    const st = String(inv.status||'').toUpperCase();
    doc.setFont('courier','bold'); doc.setFontSize(st.length>6 ? 10 : 13); doc.setTextColor(sc[0],sc[1],sc[2]);
    const tw = doc.getTextWidth(st);
    doc.text(st, scx-(tw/2)*Math.cos(rad)+3*Math.sin(rad), scy+(tw/2)*Math.sin(rad)+3*Math.cos(rad), { angle:ang });
    doc.setTextColor(30,25,23);
  }
  const rows = inv.lineItems.map(it=>[it.name, String(it.qty), pdfRupee(it.price), pdfRupee(it.qty*it.price)]);
  const tblHead = tpl==='Minimal'
  ? { fillColor:[244,241,238], textColor:[30,25,23], fontStyle:'bold' }
  : tpl==='Bold'
  ? { fillColor:[theme[0],theme[1],theme[2]], textColor:[255,255,255], fontStyle:'bold' }
  : tpl==='Luxe'
  ? { fillColor:[214,170,83], textColor:[31,28,27], fontStyle:'bold' }
  : tpl==='Ledger'
  ? { fillColor:false, textColor:[34,29,27], fontStyle:'bold', font:'times', lineWidth:{top:1.2,bottom:1.2}, lineColor:[34,29,27] }
  : ['Modern','Editorial','Aster','Stamp','Spine'].includes(tpl)
  ? { fillColor:[255,255,255], textColor:[theme[0],theme[1],theme[2]], fontStyle:'bold', lineWidth:{bottom:1.2}, lineColor:[theme[0],theme[1],theme[2]] }
  : { fillColor:[34,29,27], textColor:[255,255,255], fontStyle:'bold' };
  doc.autoTable({
      startY: Math.max(['Modern','Aster'].includes(tpl) ? y + 120 : y + 92, cy + 14),
      head: [['Item / Service','Qty','Rate','Amount']],
      body: rows,
      theme: (plainTpl.includes(tpl)) ? 'plain' : 'striped',
      styles:{ font: tpl==='Stamp' ? 'courier' : tf, fontSize:10, cellPadding:8, textColor:[30,25,23] },
      headStyles: tblHead,
      alternateRowStyles: (plainTpl.includes(tpl)) ? {} : { fillColor:[251,248,245] },
      columnStyles:{ 1:{halign:'center',cellWidth:50}, 2:{halign:'right',cellWidth:90}, 3:{halign:'right',cellWidth:100} },
      margin:{ left:mL, right:pageW-mR },
      didParseCell: function(d){
        if(d.section==='head'){
          const headerAlign = ['left','center','right','right'];
          d.cell.styles.halign = headerAlign[d.column.index] || 'left';
        }
      },
      didDrawCell: function(d){
        if((plainTpl.includes(tpl)) && d.section==='body'){
          const lineColor = tpl==='Aster' ? [205,228,224] : [230,222,216];
          doc.setDrawColor(lineColor[0],lineColor[1],lineColor[2]); doc.setLineWidth(0.5);
          doc.line(d.cell.x, d.cell.y+d.cell.height, d.cell.x+d.cell.width, d.cell.y+d.cell.height);
        }
      }
    });
  let ty = doc.lastAutoTable.finalY + 20;
  const totalsX = mR;
  function totalLine(label, val, bold, color){
    doc.setFont('helvetica', bold?'bold':'normal'); doc.setFontSize(bold?12:10.5);
    if(color) doc.setTextColor(color[0],color[1],color[2]); else doc.setTextColor(80,72,68);
    doc.text(label, totalsX-150, ty);
    doc.setTextColor(30,25,23);
    if(bold && color) doc.setTextColor(color[0],color[1],color[2]);
    doc.text(val, totalsX, ty, { align:'right' });
    ty += bold?20:16;
  }
  totalLine('Subtotal', pdfRupee(inv.subtotal));
  totalLine('Discount', '-'+pdfRupee(inv.discount));
  inv.extraCharges.forEach(c=>totalLine(c.label, pdfRupee(c.amount)));
  doc.setDrawColor(230,222,216); doc.line(totalsX-150, ty-8, totalsX, ty-8);
  totalLine('Total', pdfRupee(inv.total), true);
  totalLine('Paid', pdfRupee(inv.paid), false, [14,143,92]);
  if(tpl==='Bold' || tpl==='Luxe'){
    ty += 6;
    if(tpl==='Luxe') doc.setFillColor(214,170,83);
    else doc.setFillColor(theme[0], theme[1], theme[2]);
    doc.roundedRect(totalsX-160, ty-15, 160, 26, 4, 4, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(12);
    if(tpl==='Luxe') doc.setTextColor(31,28,27); else doc.setTextColor(255,255,255);
    doc.text('Balance Due', totalsX-150, ty+2);
    doc.text(pdfRupee(inv.due), totalsX-8, ty+2, { align:'right' });
    ty += 28;
  } else if(tpl==='Ledger'){
    ty += 4;
    doc.setFont('times','bold'); doc.setFontSize(13); doc.setTextColor(34,29,27);
    doc.text('Balance Due', totalsX-150, ty); doc.text(pdfRupee(inv.due), totalsX, ty, { align:'right' });
    doc.setDrawColor(34,29,27); doc.setLineWidth(0.7);
    doc.line(totalsX-150, ty+5, totalsX, ty+5); doc.line(totalsX-150, ty+8, totalsX, ty+8);
    doc.setLineWidth(0.2); ty += 26;
  } else if(['Modern','Aster','Spine','Stamp'].includes(tpl)){
    ty += 6;
    if(tpl==='Stamp') doc.setLineDashPattern([4,2.5],0);
    if(tpl==='Aster'){
      doc.setFillColor(241,248,247); doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(1.2);
      doc.roundedRect(totalsX-160, ty-15, 160, 26, 5, 5, 'FD');
    } else {
      doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(1.2);
      doc.roundedRect(totalsX-160, ty-15, 160, 26, 5, 5, 'D');
    }
    doc.setLineWidth(0.2); doc.setLineDashPattern([],0);
    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(theme[0], theme[1], theme[2]);
    doc.text('Balance Due', totalsX-150, ty+2);
    doc.text(pdfRupee(inv.due), totalsX-8, ty+2, { align:'right' });
    ty += 28;
  } else {
    totalLine('Balance Due', pdfRupee(inv.due), true, theme);
  }
  ty += 14;
  const merchantUpi = isMerchantUpiId(business.upi) ? business.upi.trim() : '';
  if(merchantUpi || business.account){
    const detailsStartY = ty;
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(30,25,23);
    doc.text('Payment Details', mL, ty); ty += 15;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(100,92,88);
    if(business.bankName) { doc.text('Bank: '+business.bankName, mL, ty); ty+=13; }
    if(business.account) { doc.text('A/C: '+business.account+(business.ifsc?'  ·  IFSC: '+business.ifsc:''), mL, ty); ty+=13; }
    if(merchantUpi) { doc.text('UPI: '+merchantUpi, mL, ty); ty+=13; }
    if(merchantUpi && inv.due>0){
      const qrAmount = inv.due.toFixed(2);
      const qrDataUrl = await buildUpiQrDataUrl(merchantUpi, business.name||'StampBook', qrAmount, inv.id);
      if(qrDataUrl){
        const qrSize = 78;
        const boxWidth = 128;
        const boxRight = mR;
        const boxLeft = boxRight - boxWidth;
        const qrX = boxLeft + (boxWidth-qrSize)/2;
        const qrY = detailsStartY - 6;
        try{
          doc.setDrawColor(230,222,216);
          doc.roundedRect(boxLeft, qrY-8, boxWidth, qrSize+34, 4, 4);
          doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
          doc.setFont('helvetica','normal'); doc.setFontSize(8);
          doc.setTextColor(100,92,88);
          doc.text('Scan to pay', boxLeft+boxWidth/2, qrY+qrSize+13, { align:'center' });
          doc.setFont('helvetica','bold'); doc.setFontSize(9);
          doc.setTextColor(30,25,23);
          doc.text(pdfRupee(qrAmount), boxLeft+boxWidth/2, qrY+qrSize+25, { align:'center' });
        }catch(e){}
      }
    }
  }
  if(tpl==='Stamp'){
    const sy = pageHfull-124;
    if(ty+70 < sy){
      doc.setDrawColor(theme[0], theme[1], theme[2]); doc.setLineWidth(0.8); doc.setLineDashPattern([5,3],0);
      doc.line(26, sy, pageW-26, sy);
      doc.setLineDashPattern([],0); doc.setLineWidth(0.2);
      doc.setFont('courier','normal'); doc.setFontSize(8.5); doc.setTextColor(120,110,105);
      doc.text('tear here and send with payment', pageW/2, sy-5, { align:'center' });
      doc.setFont('courier','bold'); doc.setFontSize(10.5); doc.setTextColor(30,25,23);
      doc.text('Invoice '+inv.id, mL, sy+20);
      doc.setFont('courier','normal'); doc.setFontSize(9.5);
      doc.text(c.name || '-', mL, sy+35);
      doc.text('Due '+fmtDate(inv.dueDate), mL, sy+49);
      doc.setFont('courier','bold'); doc.setFontSize(18); doc.setTextColor(theme[0], theme[1], theme[2]);
      doc.text(pdfRupee(inv.due), mR, sy+38, { align:'right' });
    }
  }
  if(business.terms){
    doc.setFont('helvetica','italic'); doc.setFontSize(9); doc.setTextColor(140,132,127);
    const termLines = doc.splitTextToSize('Payment Terms: '+business.terms, doc.internal.pageSize.getWidth()-margin*2).slice(0,3);
    doc.text(termLines, margin, doc.internal.pageSize.getHeight()-40-(termLines.length-1)*11);
  }
  doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(170,163,158);
  doc.text('Generated with StampBook · Powered by Mandal Industries', margin, doc.internal.pageSize.getHeight()-24);
  return doc;
}
function downloadInvoicePDF(invId, btn){
  setBtnLoading(btn, true);
  setTimeout(async ()=>{
      try{
        const doc = await buildInvoicePDF(invId);
        doc.save(invId + '.pdf');
        showToast('PDF downloaded');
      }catch(e){
        console.error(e);
        showToast('Could not generate PDF');
      }finally{
        setBtnLoading(btn, false);
      }
    }, 30);
}
async function shareInvoice(invId, kind, btn){
  const inv = computeInvoice(getDisplayInvoice(invId));
  const c = getDisplayClient(inv.clientId) || {};
  const business = getDisplayBusiness();
  if(btn) setBtnLoading(btn, true);
  const longLink = invoiceShareLink(invId);
  const shortLink = await shortenLink(longLink);
  const text = `Invoice ${inv.id} from ${business.name}\nClient: ${c.name||''}\nAmount: ${rupee(inv.total)} · ${inv.status}\nClick to Pay: ${shortLink}`;
  if(kind==='whatsapp'){
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  } else if(kind==='email'){
    const subject = encodeURIComponent(`Invoice ${inv.id} from ${business.name}`);
    window.location.href = `mailto:${c.email||''}?subject=${subject}&body=${encodeURIComponent(text)}`;
  } else {
    if(navigator.share){
      try{
        await navigator.share({ title:'Invoice '+inv.id, text, url: shortLink });
      }catch(e){  }
    } else if(navigator.clipboard){
      try{
        await navigator.clipboard.writeText(shortLink);
        showToast('Link copied: ' + shortLink);
      }catch(e){
        prompt('Copy this link:', shortLink);
      }
    } else {
      prompt('Copy this link:', shortLink);
    }
  }
  if(btn) setBtnLoading(btn, false);
}
async function markAsSent(id){
  const inv = invoices.find(i=>i.id===id);
  if(!inv) return;
  showSendWait('Sending invoice…');
  inv.stage='sent';
  await sb.from('invoices').update({ stage:'sent' }).eq('id', id);
  logActivity('Invoice '+id+' sent', (clientById(inv.clientId)||{}).name||'', 'due', 'sent');
  renderInvoiceDetail();
  completeSendWait('Invoice sent!', `Invoice ${id} is on its way.`);
}
async function cancelInvoice(id){
  if(!confirm('Cancel invoice '+id+'? This cannot be undone.')) return;
  const inv = invoices.find(i=>i.id===id);
  if(inv){
    inv.stage='cancelled';
    await sb.from('invoices').update({ stage:'cancelled' }).eq('id', id);
    logActivity('Invoice '+id+' cancelled', (clientById(inv.clientId)||{}).name||'', 'other', 'cancelled');
  }
  renderInvoiceDetail();
  showToast('Invoice cancelled');
}
async function deleteInvoice(id){
  const inv = invoices.find(i=>i.id===id);
  if(!inv) return;
  const c = clientById(inv.clientId);
  const linkedPayments = payments.filter(p=>p.invoiceId===id);
  let msg = `Delete invoice ${id}? This can't be undone.`;
  if(linkedPayments.length){
    msg = `Invoice ${id} has ${linkedPayments.length} payment record(s). Deleting this invoice will also delete all associated payment records. This can't be undone. Continue?`;
  }
  if(!confirm(msg)) return;
  showDeleteWait('Deleting invoice…');
  try{
    const { error:rpErr } = await sb.from('razorpay_orders').delete().eq('invoice_id', id);
    if(rpErr){ alert('Could not delete invoice: '+rpErr.message); return; }
    const { error:itemsErr } = await sb.from('invoice_items').delete().eq('invoice_id', id);
    if(itemsErr){ alert('Could not delete invoice: '+itemsErr.message); return; }
    const { error:payErr } = await sb.from('payments').delete().eq('invoice_id', id);
    if(payErr){ alert('Could not delete invoice: '+payErr.message); return; }
    const { error:invErr } = await sb.from('invoices').delete().eq('id', id);
    if(invErr){ alert('Could not delete invoice: '+invErr.message); return; }
    invoices = invoices.filter(i=>i.id!==id);
    payments = payments.filter(p=>p.invoiceId!==id);
    activity = activity.filter(a=> !(a.text||'').includes(id));
    saveCachedData();
    logActivity('Invoice '+id+' deleted', (c||{}).name||'', 'other', 'cancelled');
    showToast('Invoice deleted');
    if(currentInvoiceId===id) currentInvoiceId = null;
    goto('invoices');
  } finally {
    hideDeleteWait();
  }
}
const CF_FUNCTIONS_BASE = 'https://sjrkoiypdhcrwzetijen.supabase.co/functions/v1';
function payWithGateway(invId, btn){
  if(publicActiveGateway === 'upi') return payViaUpi(invId, btn);
  return payViaRazorpay(invId, btn);
}
let upiAwaitingReturn = null;
function payViaUpi(invId, btn){
  const inv = computeInvoice(getDisplayInvoice(invId));
  const biz = publicBusinessData || business;
  const upiId = biz && biz.upi;
  if(!upiId){ showToast('This business has not set up a UPI ID yet'); return; }
  if(!isMerchantUpiId(upiId)){ showToast('This business has not set up a valid UPI ID'); return; }
  const upiUri = 'upi://pay?pa='+encodeURIComponent(upiId)
  +'&pn='+encodeURIComponent(biz.name || 'StampBook')
  +'&am='+encodeURIComponent(inv.due)
  +'&cu=INR'
  +'&tn='+encodeURIComponent('Invoice '+invId);
  upiAwaitingReturn = { invId };
  showToast('Opening your UPI app…');
  window.location.href = upiUri;
}
document.addEventListener('visibilitychange', ()=>{
    if(document.visibilityState !== 'visible') return;
    if(!upiAwaitingReturn) return;
    const { invId } = upiAwaitingReturn;
    upiAwaitingReturn = null;
    $('upi-confirm-pending-id').value = invId;
    $('upi-confirm-overlay').classList.add('active');
  });
function openUpiConfirmFor(invId){
  $('upi-confirm-pending-id').value = invId;
  $('upi-confirm-overlay').classList.add('active');
}
function dismissUpiConfirm(){
  $('upi-confirm-overlay').classList.remove('active');
}
async function confirmUpiClaim(){
  const invId = $('upi-confirm-pending-id').value;
  dismissUpiConfirm();
  showPaymentWaitOverlay(5);
  const minWait = new Promise(resolve=>setTimeout(resolve, 5000));
  try{
    const [res] = await Promise.all([
        fetch(CF_FUNCTIONS_BASE + '/notify-upi-claim', {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ invoice_id: invId })
          }),
        minWait
      ]);
    const result = await res.json();
    hidePaymentWaitOverlay();
    if(!res.ok || result.error){
      showToast(result.error || 'Could not reach the business — try again');
      return;
    }
    await loadPublicInvoice(invId);
    renderInvoiceDetail();
    showToast('Thanks — the business has been notified to verify your payment');
  }catch(e){
    hidePaymentWaitOverlay();
    showToast('Could not reach the business — try again');
  }
}
async function resetUpiClaim(invId){
  publicUpiClaimedAt = null;
  renderInvoiceDetail();
}
let razorpayScriptPromise = null;
function loadRazorpayScript(){
  if(window.Razorpay) return Promise.resolve();
  if(razorpayScriptPromise) return razorpayScriptPromise;
  razorpayScriptPromise = new Promise((resolve, reject)=>{
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = ()=>resolve();
      s.onerror = ()=>reject(new Error('Could not load Razorpay checkout'));
      document.head.appendChild(s);
    });
  return razorpayScriptPromise;
}
async function payViaRazorpay(invId, btn){
  setBtnLoading(btn, true);
  try{
    const createRes = await fetch(CF_FUNCTIONS_BASE + '/razorpay-create-order', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ invoice_id: invId })
      });
    const order = await createRes.json();
    if(!createRes.ok || order.error){
      showToast(order.error || 'Could not start payment');
      setBtnLoading(btn, false);
      return;
    }
    await loadRazorpayScript();
    setBtnLoading(btn, false);
    const rzp = new Razorpay({
        key: order.key_id,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: (publicBusinessData && publicBusinessData.name) || 'StampBook',
        description: 'Invoice ' + invId,
        handler: async function(response){
          showPaymentWaitOverlay(10);
          try{
            const verifyRes = await fetch(CF_FUNCTIONS_BASE + '/razorpay-verify-payment', {
                method:'POST', headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                  })
              });
            const verify = await verifyRes.json();
            hidePaymentWaitOverlay();
            if(verify.status === 'PAID'){
              showToast('Payment received — thank you!');
              await loadPublicInvoice(invId);
              renderInvoiceDetail();
            } else {
              showToast('Payment could not be verified');
            }
          }catch(e){
            hidePaymentWaitOverlay();
            showToast('Payment failed, please try again');
          }
        },
        modal: {
          ondismiss: function(){ setBtnLoading(btn, false); }
        },
        theme: { color: '#c0392b' }
      });
    rzp.on('payment.failed', function(){
        showToast('Payment failed, please try again');
        setBtnLoading(btn, false);
      });
    rzp.open();
  }catch(e){
    console.error(e);
    showToast('Payment failed, please try again');
    setBtnLoading(btn, false);
  }
}
function renderCreateScreen(){
  $('ci-date').value = todayISO();
  $('ci-duedate').value = todayISO();
  const sel = $('ci-client');
  sel.innerHTML = clients.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  createItems = [{name:'',qty:1,price:0}];
  $('ci-discount').value = 0;
  $('ci-tax').value = Number(business.tax||0);
  $('ci-charge').value = 0;
  $('ci-charge-reason').value = '';
  hideQuickAddClient();
  renderCreateItems();
  calcCreateTotals();
}
function renderCreateItems(){
  const itemHead = `<div class="item-head-hint">Qty = how many units you are billing (pieces, hours, kg…). Rate = price of 1 unit.</div>
<div class="item-row item-head"><span class="name">Item / Service</span><span class="qty">Qty</span><span class="price">Rate (₹)</span><span class="rm-sp"></span></div>`;
  $('ci-items').innerHTML = itemHead + createItems.map((it,idx)=>`
<div class="item-row">
<input class="name" placeholder="Item name" value="${it.name}" oninput="updateItem(${idx},'name',this.value)">
<input class="qty" type="number" min="1" value="${it.qty}" aria-label="Quantity (number of units)" title="Quantity: number of units" oninput="updateItem(${idx},'qty',this.value)">
<input class="price" type="number" min="0" value="${it.price}" aria-label="Rate per unit" title="Rate: price of 1 unit" onfocus="if(this.value=='0')this.value='';" oninput="updateItem(${idx},'price',this.value)">
<button class="rm" onclick="removeItem(${idx})">${ic('close',15)}</button>
</div>`).join('');
}
function updateItem(idx,key,val){ createItems[idx][key] = key==='name'?val:Number(val); calcCreateTotals(); }
function addItemRow(){ createItems.push({name:'',qty:1,price:0}); renderCreateItems(); }
function removeItem(idx){ if(createItems.length>1){ createItems.splice(idx,1); renderCreateItems(); calcCreateTotals(); } }
function taxAmountFor(subtotal, ratePct){
  const r = Number(ratePct||0);
  return r>0 ? Math.round(subtotal*r)/100 : 0;
}
function calcCreateTotals(){
  const subtotal = createItems.reduce((s,i)=>s+Number(i.qty||0)*Number(i.price||0),0);
  const discount = Number($('ci-discount').value||0);
  const charge = Number($('ci-charge').value||0);
  const taxRate = Number($('ci-tax').value||0);
  const tax = taxAmountFor(subtotal, taxRate);
  const billed = Math.max(subtotal-discount,0)+tax+charge;
  const mdr = mdrChargeFor(billed);
  $('ci-subtotal').textContent = rupee(subtotal);
  $('ci-tax-row').style.display = tax>0 ? 'flex' : 'none';
  $('ci-tax-amt').textContent = rupee(tax);
  $('ci-mdr-row').style.display = mdr>0 ? 'flex' : 'none';
  $('ci-mdr').textContent = rupee(mdr);
  $('ci-total').textContent = rupee(billed+mdr);
}
const UPI_MDR_CAP = 300;
function mdrChargeFor(billedAmount){
  if(!business.mdrEnabled || billedAmount <= UPI_MDR_THRESHOLD) return 0;
  return Math.min(Math.round(billedAmount * UPI_MDR_RATE), UPI_MDR_CAP);
}
function showQuickAddClient(){ $('create-client-quickadd').style.display='block'; }
function hideQuickAddClient(){ $('create-client-quickadd').style.display='none'; $('qc-name').value=''; $('qc-phone').value=''; $('qc-email').value=''; }
async function quickAddClient(){
  const name = $('qc-name').value.trim();
  if(!name){ alert('Please enter a client name.'); return; }
  const phone = $('qc-phone').value.trim();
  if(!PHONE_RE.test(phone)){ alert('Please enter a valid 10-digit phone number.'); return; }
  const email = $('qc-email').value.trim();
  if(!email){ alert('Please enter the client\'s email address.'); return; }
  if(!EMAIL_RE.test(email)){ alert('Please enter a valid email address.'); return; }
  const { data, error } = await sb.from('clients').insert({ user_id:currentAuth.id, name, phone, email, address:'', gstin:'', notes:'' }).select().single();
  if(error){ alert('Could not add client: '+error.message); return; }
  const client = { id:data.id, name, phone, email, address:'', gstin:'', notes:'' };
  clients.unshift(client);
  const sel = $('ci-client');
  sel.innerHTML = clients.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  sel.value = client.id;
  hideQuickAddClient();
}
async function reserveNextInvoiceNumber(){
  for(let attempt=0; attempt<5; attempt++){
    const { data:biz, error:readErr } = await sb.from('business_settings')
    .select('next_no').eq('user_id', currentAuth.id).single();
    if(readErr || !biz) throw new Error('Could not read invoice numbering');
    const current = Number(biz.next_no||1001);
    const { data:updated, error:casErr } = await sb.from('business_settings')
    .update({ next_no: current + 1 })
    .eq('user_id', currentAuth.id)
    .eq('next_no', current)
    .select('next_no')
    .maybeSingle();
    if(!casErr && updated){
      business.nextNo = current + 1;
      return current;
    }
  }
  throw new Error('Could not reserve an invoice number right now — please try again.');
}
async function saveInvoice(stage, btn){
  if(!guardSubmit('saveInvoice', btn)) return;
  try{
    const clientId = $('ci-client').value;
    const items = createItems.filter(i=>i.name.trim());
    if(!clientId || items.length===0){ alert('Please select a client and add at least one item.'); return; }
    showSaveWait('invoice', 'Saving invoice…');
    const discount = Number($('ci-discount').value||0);
    const charge = Number($('ci-charge').value||0);
    const chargeReason = $('ci-charge-reason').value.trim();
    const subtotalSave = items.reduce((s,i)=>s+i.qty*i.price,0);
    const taxRate = Number($('ci-tax').value||0);
    const tax = taxAmountFor(subtotalSave, taxRate);
    const billed = Math.max(subtotalSave - discount, 0) + tax + charge;
    const mdr = mdrChargeFor(billed);
    const total = billed + mdr;
    if(tax>0) items.push(makeChargeItem('Tax ('+taxRate+'%)', tax));
    if(charge>0) items.push(makeChargeItem(chargeReason || 'Additional Charge', charge));
    if(mdr>0) items.push(makeChargeItem('UPI MDR (0.4%)', mdr));
    const date = $('ci-date').value;
    const dueDate = $('ci-duedate').value;
    let id, reservedNo;
    for(let attempt=0; attempt<5; attempt++){
      try{
        reservedNo = await reserveNextInvoiceNumber();
      }catch(numErr){
        alert(numErr.message || 'Could not generate an invoice number. Please try again.');
        return;
      }
      id = business.prefix + '-' + reservedNo;
      const { error:invErr } = await sb.from('invoices').insert({
          id, user_id:currentAuth.id, client_id:clientId, stage: stage||'sent',
          date, due_date:dueDate, discount, paid:0
        });
      if(!invErr) break;
      const isDupNo = invErr.code==='23505' || /duplicate key/i.test(invErr.message||'');
      if(!isDupNo || attempt===4){
        alert('Could not save invoice: '+invErr.message);
        return;
      }
    }
    await sb.from('invoice_items').insert(items.map((it,idx)=>({
            invoice_id:id, user_id:currentAuth.id, name:it.name, qty:it.qty, price:it.price, position:idx
          })));
    invoices.unshift({ id, clientId, stage: stage||'sent', date, dueDate, items, discount, paid:0 });
    logActivity('Invoice '+id+' created', (clientById(clientId)||{}).name+' · '+rupee(total), 'due', 'created');
    showToast('Invoice '+id+' saved');
    goto('invoices');
  } finally {
    hideSaveWait('invoice');
    releaseSubmit('saveInvoice', btn);
  }
}
function renderClients(){
  const q = ($('cl-search-input')?.value||'').toLowerCase();
  let list = clients.filter(c=>c.name.toLowerCase().includes(q));
  $('clients-list').innerHTML = list.map((c,idx)=>{
      const s = clientStats(c.id);
      const card = `<div class="listitem" onclick="openClient('${c.id}')">
<div style="display:flex;align-items:center;gap:12px;"><div class="avatar" style="width:38px;height:38px;font-size:14px;">${c.name[0]}</div>
<div><div style="font-size:14px;font-weight:700;">${c.name}</div>
<div class="muted" style="font-size:12px;">${c.phone||''}</div></div></div>
<div style="text-align:right;font-size:12px;color:${s.due>0?'var(--red)':'var(--muted)'};font-weight:700;">${s.due>0?'Due '+rupee(s.due):'Settled'}</div>
</div>`;
      const ad = (idx>0 && (idx+1)%4===0) ? adInFeedHtml('5573098675','-fb+5w+4e-db+86') : '';
      return card+ad;
    }).join('') || `<div class="empty">${ic('users',34)}No clients found</div>`;
  pushAdsIn('clients-list');
  pushStaticAdOnce('ins-clients-banner');
}
async function deleteClient(clientId){
  const c = clientById(clientId);
  if(!c) return;
  const linkedInvoices = invoices.filter(i=>i.clientId===clientId);
  const linkedPayments = payments.filter(p=>p.clientId===clientId);
  let msg = `Delete ${c.name}? This can't be undone.`;
  if(linkedInvoices.length || linkedPayments.length){
    msg = `${c.name} has ${linkedInvoices.length} invoice(s) and ${linkedPayments.length} payment(s). Deleting this client will also delete all of their invoices and payment records. This can't be undone. Continue?`;
  }
  if(!confirm(msg)) return;
  showDeleteWait('Deleting client…');
  try{
    const invoiceIds = linkedInvoices.map(i=>i.id);
    if(invoiceIds.length){
      const { error:rpErr } = await sb.from('razorpay_orders').delete().in('invoice_id', invoiceIds);
      if(rpErr){ alert('Could not delete client: '+rpErr.message); return; }
      const { error:itemsErr } = await sb.from('invoice_items').delete().in('invoice_id', invoiceIds);
      if(itemsErr){ alert('Could not delete client: '+itemsErr.message); return; }
    }
    const { error:payErr } = await sb.from('payments').delete().eq('client_id', clientId);
    if(payErr){ alert('Could not delete client: '+payErr.message); return; }
    if(invoiceIds.length){
      const { error:invErr } = await sb.from('invoices').delete().in('id', invoiceIds);
      if(invErr){ alert('Could not delete client: '+invErr.message); return; }
    }
    const { error:clientErr } = await sb.from('clients').delete().eq('id', clientId);
    if(clientErr){ alert('Could not delete client: '+clientErr.message); return; }
    invoices = invoices.filter(i=>i.clientId!==clientId);
    payments = payments.filter(p=>p.clientId!==clientId);
    saveCachedData();
    activity = activity.filter(a=>{
        if(invoiceIds.some(id=> (a.text||'').includes(id))) return false;
        if((a.sub||'').includes(c.name)) return false;
        return true;
      });
    clients = clients.filter(cl=>cl.id!==clientId);
    showToast(c.name+' deleted');
    if(currentClientId===clientId) currentClientId = null;
    goto('clients');
  } finally {
    hideDeleteWait();
  }
}
function openAddClient(){
  editingClientId = null;
  ['ac-name','ac-phone','ac-email','ac-address','ac-gstin','ac-notes'].forEach(id=>$(id).value='');
  $('addclient-title').textContent = 'Add Client';
  $('addclient-savebtn').textContent = 'Save Client';
  $('addclient-back').onclick = ()=> goto('clients');
  goto('addclient');
}
function openEditClient(clientId){
  const c = clientById(clientId);
  if(!c) return;
  editingClientId = clientId;
  $('ac-name').value = c.name||'';
  $('ac-phone').value = c.phone||'';
  $('ac-email').value = c.email||'';
  $('ac-address').value = c.address||'';
  $('ac-gstin').value = c.gstin||'';
  $('ac-notes').value = c.notes||'';
  $('addclient-title').textContent = 'Edit Client';
  $('addclient-savebtn').textContent = 'Save Changes';
  $('addclient-back').onclick = ()=> goto('client-detail');
  goto('addclient');
}
async function saveClient(btn){
  if(!guardSubmit('saveClient', btn)) return;
  try{
    const name = $('ac-name').value.trim();
    if(!name){ alert('Please enter a client name.'); return; }
    const phone = $('ac-phone').value.trim();
    if(!PHONE_RE.test(phone)){ alert('Please enter a valid 10-digit phone number.'); return; }
    const email = $('ac-email').value.trim();
    if(!email){ alert('Please enter the client\'s email address.'); return; }
    if(!EMAIL_RE.test(email)){ alert('Please enter a valid email address.'); return; }
    const row = {
      name,
      phone,
      email,
      address: $('ac-address').value,
      gstin: $('ac-gstin').value,
      notes: $('ac-notes').value
    };
    if(editingClientId){
      showSaveWait('client', 'Saving changes…');
      const { error } = await sb.from('clients').update(row).eq('id', editingClientId);
      if(error){ alert('Could not save client: '+error.message); return; }
      const existing = clientById(editingClientId);
      if(existing) Object.assign(existing, row);
      const editedId = editingClientId;
      editingClientId = null;
      showToast('Client updated');
      currentClientId = editedId;
      goto('client-detail');
    } else {
      showSaveWait('client', 'Creating client…');
      const { data, error } = await sb.from('clients').insert({ user_id: currentAuth.id, ...row }).select().single();
      if(error){ alert('Could not save client: '+error.message); return; }
      clients.unshift({ id:data.id, ...row });
      ['ac-name','ac-phone','ac-email','ac-address','ac-gstin','ac-notes'].forEach(id=>$(id).value='');
      showToast('Client saved');
      goto('clients');
    }
  } finally {
    hideSaveWait('client');
    releaseSubmit('saveClient', btn);
  }
}
function setClientTab(t){ clientTab=t; renderClientDetail(); }
function renderClientDetail(){
  const c = clientById(currentClientId);
  const s = clientStats(c.id);
  let body = `
<div class="card">
<div style="display:flex;align-items:center;gap:12px;">
<div class="avatar">${c.name[0]}</div>
<div>
<div style="font-size:16px;font-weight:800;">${c.name}</div>
<div class="muted row-icon" style="font-size:12px;">${ic('phone',13)} ${c.phone||'—'}</div>
<div class="muted row-icon" style="font-size:12px;">${ic('mail',13)} ${c.email||'—'}</div>
<div class="muted row-icon" style="font-size:12px;">${ic('location',13)} ${c.address||'—'}</div>
</div>
</div>
<div class="statgrid" style="padding:14px 0 0;">
<div class="stat"><div class="muted" style="font-size:11px;">Total Billed</div><div class="v">${rupee(s.billed)}</div></div>
<div class="stat"><div class="muted" style="font-size:11px;">Paid</div><div class="v" style="color:var(--green)">${rupee(s.paid)}</div></div>
<div class="stat"><div class="muted" style="font-size:11px;">Due</div><div class="v" style="color:var(--red)">${rupee(s.due)}</div></div>
</div>
</div>
<div class="tabs">
<div class="tab ${clientTab==='invoices'?'active':''}" onclick="setClientTab('invoices')">Invoices</div>
<div class="tab ${clientTab==='payments'?'active':''}" onclick="setClientTab('payments')">Payments</div>
<div class="tab ${clientTab==='details'?'active':''}" onclick="setClientTab('details')">Details</div>
</div>
<div style="margin-top:12px;">`;
  if(clientTab==='invoices'){
    body += s.invoices.map(inv=>`<div class="listitem" onclick="openInvoice('${inv.id}')">
<div><div style="font-size:13px;font-weight:700;">${inv.id}</div><div class="muted" style="font-size:11px;">${fmtDate(inv.date)}</div></div>
<div style="text-align:right;"><div style="font-size:13px;font-weight:800;">${rupee(inv.total)}</div><span class="pill ${inv.status}">${inv.status}</span></div>
</div>`).join('') || `<div class="empty">No invoices yet</div>`;
  } else if(clientTab==='payments'){
    const cp = payments.filter(p=>p.clientId===c.id);
    body += cp.map(p=>`<div class="listitem" style="cursor:default;">
<div><div style="font-size:13px;font-weight:700;">${p.invoiceId||'—'}</div><div class="muted" style="font-size:11px;">${fmtDate(p.date)} · ${p.mode}</div></div>
<div style="font-size:13px;font-weight:800;color:var(--green);">${rupee(p.amount)}</div>
</div>`).join('') || `<div class="empty">No payments yet</div>`;
  } else {
    body += `<div class="card">
<div class="trow"><span>GSTIN</span><span>${c.gstin||'—'}</span></div>
<div class="trow"><span>Notes</span><span style="max-width:60%;text-align:right;">${c.notes||'—'}</span></div>
</div>
<button class="btn line" style="margin-top:12px;" onclick="openEditClient('${c.id}')">${ic('edit',15)} Edit Client</button>
<button class="btn line" style="margin-top:10px;color:var(--red);border-color:var(--red-100);" onclick="deleteClient('${c.id}')">${ic('trash',15)} Delete Client</button>`;
  }
  body += `</div><button class="btn" style="margin-top:16px;" onclick="prefillInvoiceClient('${c.id}')">${ic('plus',15)} Create Invoice</button>${adInFeedHtml('9975378118','-gw-3+1f-3d+2z')}`;
  $('client-detail-body').innerHTML = body;
  pushAdsIn('client-detail-body');
}
function prefillInvoiceClient(clientId){
  goto('create');
  $('ci-client').value = clientId;
}
function renderPayments(){
  const q = ($('pay-search-input')?.value||'').toLowerCase();
  let list = [...payments].sort((a,b)=> new Date(b.date)-new Date(a.date));
  if(q) list = list.filter(p=> (clientById(p.clientId)?.name||'').toLowerCase().includes(q) || (p.invoiceId||'').toLowerCase().includes(q));
  $('payments-list').innerHTML = list.map(p=>{
      const c = clientById(p.clientId);
      return `<div class="listitem" style="cursor:default;">
<div><div style="font-size:13px;font-weight:700;">${c?c.name:''}</div>
<div class="muted" style="font-size:11px;">${fmtDate(p.date)} · ${p.mode}${p.invoiceId?' · '+p.invoiceId:''}</div></div>
<div style="font-size:14px;font-weight:800;color:var(--green);">${rupee(p.amount)}</div>
</div>`;
    }).join('') || `<div class="empty">${ic('wallet',34)}No payments recorded</div>`;
  pushStaticAdOnce('ins-payments-banner');
}
function renderAddPaymentScreen(){
  const sel = $('ap-client');
  sel.innerHTML = clients.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  $('ap-date').value = todayISO();
  $('ap-amount').value = '';
  $('ap-txn').value = '';
  $('ap-notes').value = '';
  fillPaymentInvoices();
}
function fillPaymentInvoices(){
  const clientId = $('ap-client').value;
  const invs = allInvoicesComputed().filter(i=>i.clientId===clientId && i.stage!=='cancelled');
  const sel = $('ap-invoice');
  sel.innerHTML = `<option value="">— No specific invoice —</option>` +
  invs.map(i=>`<option value="${i.id}">${i.id} · Due ${rupee(i.due)}</option>`).join('');
}
function prefillPayment(invoiceId, clientId){
  goto('addpayment');
  $('ap-client').value = clientId;
  fillPaymentInvoices();
  $('ap-invoice').value = invoiceId;
}
async function savePayment(btn){
  if(!guardSubmit('savePayment', btn)) return;
  try{
    const clientId = $('ap-client').value;
    const amount = Number($('ap-amount').value||0);
    if(!clientId || amount<=0){ alert('Please select a client and enter a valid amount.'); return; }
    const invoiceId = $('ap-invoice').value;
    const row = {
      user_id: currentAuth.id, client_id:clientId, invoice_id: invoiceId||null,
      date: $('ap-date').value,
      amount, mode: $('ap-mode').value,
      txn: $('ap-txn').value,
      notes: $('ap-notes').value
    };
    const { data, error } = await sb.from('payments').insert(row).select().single();
    if(error){ alert('Could not save payment: '+error.message); return; }
    payments.unshift({ id:data.id, clientId, invoiceId, date:row.date, amount, mode:row.mode, txn:row.txn, notes:row.notes });
    if(invoiceId){
      const inv = invoices.find(i=>i.id===invoiceId);
      if(inv){
        inv.paid = (inv.paid||0) + amount;
        await sb.from('invoices').update({ paid: inv.paid }).eq('id', invoiceId);
      }
    }
    logActivity('Payment received', rupee(amount)+' from '+(clientById(clientId)||{}).name, 'paid', 'payment');
    (async () => {
        try {
          const { data: { session } } = await sb.auth.getSession();
          await fetch('https://notify-payment-received-production.up.railway.app', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (session?.access_token || '')
              },
              body: JSON.stringify({ payment_id: data.id })
            });
        } catch (err) {
          console.error('payment-received notify failed:', err);
        }
      })();
    showToast('Payment recorded');
    goto('payments');
  } finally {
    releaseSubmit('savePayment', btn);
  }
}
function renderAddExpenseScreen(){
  $('ex-date').value = todayISO();
  $('ex-amount').value = '';
  $('ex-note').value = '';
}
async function saveExpense(btn){
  if(!guardSubmit('saveExpense', btn)) return;
  try{
    const amount = Number($('ex-amount').value||0);
    if(amount<=0){ alert('Please enter a valid amount.'); return; }
    const row = {
      user_id: currentAuth.id, category: $('ex-category').value,
      date: $('ex-date').value, amount,
      notes: $('ex-note').value
    };
    const { data, error } = await sb.from('expenses').insert(row).select().single();
    if(error){ alert('Could not save expense: '+error.message); return; }
    expenses.unshift({ id:data.id, category:row.category, date:row.date, amount, note:row.notes });
    showToast('Expense added');
    goto('reports');
  } finally {
    releaseSubmit('saveExpense', btn);
  }
}
async function renderReports(){
  const t = totalsSummary();
  $('rep-billed').textContent = rupee(t.billed);
  $('rep-received').textContent = rupee(t.received);
  $('rep-due').textContent = rupee(t.due);
  $('rep-paidcount').textContent = t.paidCount;
  $('rep-pendingcount').textContent = t.pendingCount;
  $('rep-overduecount').textContent = t.overdueCount;
  const expTotal = expenses.reduce((s,e)=>s+e.amount,0);
  $('rep-expense-total').textContent = rupee(expTotal)+' total · '+expenses.length+' entries';
  const top = clients.map(c=>({...c, ...clientStats(c.id)})).sort((a,b)=>b.billed-a.billed).slice(0,4);
  const max = Math.max(...top.map(t=>t.billed),1);
  $('rep-top').innerHTML = top.map(c=>`
<div class="barwrap"><div class="barhead"><span class="name">${c.name}</span><span class="muted">${rupee(c.billed)}</span></div>
<div class="bartrack"><div class="barfill" style="width:${(c.billed/max*100)}%"></div></div></div>`).join('');
  pushStaticAdOnce('ins-reports-banner');
  const rangeFromEl = $('rep-range-from');
  const rangeToEl = $('rep-range-to');
  if(rangeFromEl && !rangeFromEl.value){
    const today = new Date();
    rangeFromEl.value = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0,10);
    rangeToEl.value = todayISO();
  }
  calcRangeRevenue();
  const byMonth = {};
  const paymentMonths = [];
  payments.forEach(p=>{
      if(!p.date || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) return;
      const key = p.date.slice(0,7);
      byMonth[key] = (byMonth[key]||0) + Number(p.amount||0);
      paymentMonths.push(key);
    });
  const now = new Date();
  const monthKeys = [];
  for(let k=11;k>=0;k--){
    const d = new Date(now.getFullYear(), now.getMonth()-k, 1);
    monthKeys.push(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'));
  }
  const monthNames = monthKeys.map(k=>{
      const [y,m] = k.split('-').map(Number);
      return new Date(y,m-1,1).toLocaleDateString('en-IN',{month:'long',year:'numeric'});
    });
  const monthLabels = monthKeys.map((k,index)=>{
      const [y,m] = k.split('-').map(Number);
      const shortMonth=new Date(y,m-1,1).toLocaleDateString('en-GB',{month:'short'});
      return index===0 || m===1 ? `${shortMonth} ’${String(y).slice(-2)}` : shortMonth;
    });
  if(selectedRevenueMonth && !monthKeys.includes(selectedRevenueMonth)) selectedRevenueMonth=null;
  const vals = monthKeys.map(k=>byMonth[k]||0);
  await loadChartJs();
  renderRepFlowChart(monthKeys, monthLabels, monthNames, vals);
  if(selectedRevenueMonth) renderMonthlyPayments(selectedRevenueMonth);
}
let repChartInstance = null;
function renderRepFlowChart(monthKeys, monthLabels, monthNames, vals){
  const wrap = $('rep-chart').parentElement;
  const scrollEl = wrap.parentElement;
  const monthEl = $('rep-chart-ins-month');
  const recvEl = $('rep-chart-ins-received');
  const labelsEl = $('rep-chart-labels');
  const chartWidth = monthKeys.length<=6 ? Math.max(scrollEl.clientWidth||320,320) : 20+(monthKeys.length-1)*52;
  wrap.style.width = chartWidth+'px';
  if(repChartInstance){ repChartInstance.destroy(); repChartInstance=null; }
  const canvas = $('rep-chart');
  canvas.width = chartWidth; canvas.height = 140;
  const ctx = canvas.getContext('2d');
  const isDark = document.body.classList.contains('dark-mode');
  const redRGB = '192,57,43';
  const grad = ctx.createLinearGradient(0,0,0,140);
  grad.addColorStop(0, `rgba(${redRGB},0.32)`);
  grad.addColorStop(0.7, `rgba(${redRGB},0.05)`);
  grad.addColorStop(1, `rgba(${redRGB},0.0)`);
  repChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Revenue', data: vals,
            borderColor: '#C0392B', borderWidth: 2.5, backgroundColor: grad, fill: true,
            tension: 0.4, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#C0392B', pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: false,
        interaction: { mode:'index', intersect:false },
        animation: { duration: 700, easing: 'easeOutCubic' },
        onClick: (evt, elements)=>{
          const idx = elements && elements.length ? elements[0].index : null;
          if(idx!==null) toggleMonthlyPayments(monthKeys[idx]);
        },
        plugins: {
          legend: { display:false },
          tooltip: {
            enabled:false,
            external: function(context){
              const tm = context.tooltip;
              if(tm.opacity===0){
                if(monthEl) monthEl.textContent='Hover chart';
                if(recvEl) recvEl.textContent='₹0';
                return;
              }
              const idx = tm.dataPoints[0].dataIndex;
              if(monthEl) monthEl.textContent = monthNames[idx];
              if(recvEl) recvEl.textContent = rupee(vals[idx]);
            }
          }
        },
        scales: {
          x: { grid:{display:false,drawBorder:false}, ticks:{color: isDark?'#A8A199':'#8A7E79', font:{weight:'600',size:10}, padding:6} },
          y: { display:false, grid:{display:false,drawBorder:false} }
        }
      }
    });
  if(labelsEl){
    labelsEl.innerHTML = monthKeys.map((key,index)=>
      `<button type="button" class="rep-month-btn${selectedRevenueMonth===key?' active':''}" data-month-key="${key}" aria-pressed="${selectedRevenueMonth===key}" title="${monthNames[index]} · ${rupee(vals[index])} received">${monthLabels[index]}</button>`
    ).join('');
    labelsEl.style.width=chartWidth+'px';
    labelsEl.style.minWidth=monthKeys.length<=6?'0':chartWidth+'px';
    labelsEl.onclick=event=>{
      const button=event.target.closest&&event.target.closest('.rep-month-btn');
      if(button) toggleMonthlyPayments(button.getAttribute('data-month-key'));
    };
  }
}
function toggleMonthlyPayments(monthKey){
  selectedRevenueMonth = selectedRevenueMonth===monthKey ? null : monthKey;
  const labelsEl = $('rep-chart-labels');
  if(labelsEl) labelsEl.querySelectorAll('.rep-month-btn').forEach(btn=>{
      const active = btn.getAttribute('data-month-key')===selectedRevenueMonth && !!selectedRevenueMonth;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',String(active));
    });
  const detailsEl = $('rep-month-payments');
  if(!selectedRevenueMonth){
    detailsEl.style.display='none';
    detailsEl.innerHTML='';
    return;
  }
  renderMonthlyPayments(selectedRevenueMonth);
}
function renderMonthlyPayments(monthKey){
  const detailsEl = $('rep-month-payments');
  if(!detailsEl) return;
  const [year,month] = monthKey.split('-').map(Number);
  const label = new Date(year,month-1,1).toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  const monthPayments = payments
  .filter(p=>p.date && p.date.slice(0,7)===monthKey)
  .sort((a,b)=>new Date(b.date)-new Date(a.date));
  const total = monthPayments.reduce((sum,p)=>sum+Number(p.amount||0),0);
  const escapeText=esc;
  detailsEl.style.display='block';
  detailsEl.onclick=event=>{
    const closeButton=event.target.closest&&event.target.closest('[data-close-month]');
    if(closeButton) toggleMonthlyPayments(selectedRevenueMonth);
  };
  detailsEl.innerHTML = `
<div style="border-top:1px solid var(--line);padding-top:11px;">
<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px;">
<div><div style="font-size:13px;font-weight:800;">${label} payments</div><div class="muted" style="font-size:11px;">${monthPayments.length} payment(s) · ${rupee(total)} total</div></div>
<button class="link" type="button" data-close-month>Close</button>
</div>
${monthPayments.map(p=>{
      const clientName=(clientById(p.clientId)||{}).name||'Client';
      const meta=[fmtDate(p.date),p.mode,p.invoiceId].filter(Boolean).map(escapeText).join(' · ');
      return `<div class="listitem"><div><div style="font-size:13px;font-weight:700;">${escapeText(clientName)}</div><div class="muted" style="font-size:11px;">${meta}</div></div><div style="font-size:13px;font-weight:800;color:var(--green);">${rupee(p.amount)}</div></div>`;
    }).join('') || `<div class="muted" style="font-size:12px;padding:12px 2px;">No payments recorded in this month.</div>`}
</div>
`;
}
function calcRangeRevenue(){
  const fromVal = $('rep-range-from').value;
  const toVal = $('rep-range-to').value;
  const billedEl = $('rep-range-billed');
  const receivedEl = $('rep-range-received');
  if(!fromVal || !toVal){ billedEl.textContent = '₹0'; receivedEl.textContent = '₹0'; return; }
  if(fromVal > toVal){ showToast('From date must be before To date'); return; }
  const billed = allInvoicesComputed()
  .filter(i=>i.stage!=='cancelled' && i.date>=fromVal && i.date<=toVal)
  .reduce((s,i)=>s+i.total,0);
  const received = payments
  .filter(p=>p.date>=fromVal && p.date<=toVal)
  .reduce((s,p)=>s+p.amount,0);
  billedEl.textContent = rupee(billed);
  receivedEl.textContent = rupee(received);
}
function renderHistory(){
  const filters = ['All','Paid','Due','Overdue'];
  $('hist-filters').innerHTML = filters.map(f=>
    `<div class="chip ${f===histFilter?'active':''}" onclick="setHistFilter('${f}')">${f}</div>`).join('');
  let list = [...activity].sort((a,b)=> new Date(b.date)-new Date(a.date));
  if(histFilter!=='All') list = list.filter(a=>a.bucket===histFilter.toLowerCase());
  const dotClass = {paid:'paid', due:'due', overdue:'overdue', other:'other'};
  const dotIcon = {paid:'check', due:'invoice', overdue:'alert', other:'ban'};
  $('history-list').innerHTML = `<div class="timeline">` + (list.map(a=>`
<div class="tl-item">
<div class="tl-dot ${dotClass[a.bucket]||'other'}">${ic(dotIcon[a.bucket]||'receipt',13)}</div>
<div><div class="tl-text">${a.text}</div><div class="tl-sub">${a.sub||''} · ${fmtDate(a.date)}</div></div>
</div>`).join('') || `<div class="empty">${ic('calendar',34)}No history yet</div>`) + `</div>`;
  pushStaticAdOnce('ins-history-banner');
}
function setHistFilter(f){ histFilter=f; renderHistory(); }
function renderEditProfile(){
  $('ep-name').value = profile.name;
  $('ep-designation').value = profile.designation;
  $('ep-gender').value = profile.gender;
  $('ep-phone').value = profile.phone;
  $('ep-email').value = profile.email;
}
async function saveProfile(){
  profile.name = $('ep-name').value.trim() || profile.name;
  profile.designation = $('ep-designation').value.trim();
  profile.gender = $('ep-gender').value;
  profile.phone = $('ep-phone').value.trim();
  if(currentAuth){
    await sb.from('profiles').update({ name:profile.name, designation:profile.designation, gender:profile.gender, phone:profile.phone }).eq('id', currentAuth.id);
    currentAuth.name = profile.name;
    logNotifEvent('accountUpdates', 'Profile Updated', 'Your account details were updated.');
  }
  paintStaticChrome();
  showToast('Profile updated');
  goto('profile');
}
function toggleDarkMode(){
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('stampbook_dark_mode', isDarkMode ? 'true' : 'false');
  updateDarkModeButton();
  showToast(isDarkMode ? 'Dark mode enabled' : 'Dark mode disabled');
}
function updateDarkModeButton(){
  const isDarkMode = document.body.classList.contains('dark-mode');
  const icon = $('darkmode-icon');
  const text = $('darkmode-text');
  if(icon) icon.innerHTML = ic(isDarkMode ? 'sun' : 'moon', 17);
  if(text) text.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}
function initDarkMode(){
  try{
    const darkMode = localStorage.getItem('stampbook_dark_mode');
    if(darkMode === 'true'){
      document.body.classList.add('dark-mode');
    }
  }catch(e){}
  updateDarkModeButton();
}
function renderBusinessSettings(){
  $('biz-name').value = business.name;
  $('biz-address').value = business.address;
  $('biz-gstin').value = business.gstin;
  $('biz-pan').value = business.pan;
  $('biz-bankname').value = business.bankName;
  $('biz-account').value = business.account;
  $('biz-ifsc').value = business.ifsc;
  $('biz-upi').value = business.upi;
  $('biz-prefix').value = business.prefix;
  $('biz-nextno').value = business.nextNo;
  $('biz-tax').value = business.tax;
  $('biz-terms').value = business.terms;
  $('biz-template').value = business.template;
  $('biz-theme-color').value = business.themeColor || '#C0392B';
  $('biz-mdr-toggle').checked = !!business.mdrEnabled;
  $('biz-mdr-status').textContent = business.mdrEnabled ? 'On' : 'Off';
  $('bizlogo-placeholder').innerHTML = ic('briefcase', 22);
  renderBizLogoPreview();
}
function toggleUpiMdr(on){
  business.mdrEnabled = !!on;
  try{ localStorage.setItem('stampbook_upi_mdr_enabled', business.mdrEnabled ? 'true' : 'false'); }catch(e){}
  $('biz-mdr-status').textContent = business.mdrEnabled ? 'On' : 'Off';
  showToast(business.mdrEnabled ? 'UPI New Rule (MDR) turned on' : 'UPI New Rule (MDR) turned off');
}
function renderBizLogoPreview(){
  const img = $('bizlogo-preview');
  const placeholder = $('bizlogo-placeholder');
  const removeBtn = $('bizlogo-remove-btn');
  if(business.logoUrl){
    img.src = business.logoUrl;
    img.style.display = '';
    placeholder.style.display = 'none';
    removeBtn.style.display = '';
  } else {
    img.style.display = 'none';
    placeholder.style.display = '';
    removeBtn.style.display = 'none';
  }
}
async function handleLogoSelect(event){
  const file = event.target.files && event.target.files[0];
  event.target.value = '';
  if(!file) return;
  if(!file.type || !file.type.startsWith('image/')){
    showToast('Please choose an image file');
    return;
  }
  if(file.size > 5*1024*1024){
    showToast('Image is too large (max 5MB)');
    return;
  }
  if(CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME'){
    showToast('Logo upload is not configured yet');
    return;
  }
  const statusEl = $('bizlogo-status');
  const chooseBtn = $('bizlogo-choose-btn');
  statusEl.textContent = 'Uploading…';
  chooseBtn.disabled = true;
  try{
    const url = await uploadToCloudinary(file);
    business.logoUrl = url;
    renderBizLogoPreview();
    statusEl.textContent = '';
    if(currentAuth){
      await sb.from('business_settings').upsert({ user_id: currentAuth.id, logo_url: url }, { onConflict: 'user_id' });
    }
    showToast('Logo uploaded');
  }catch(e){
    console.error(e);
    statusEl.textContent = '';
    showToast('Could not upload logo');
  }finally{
    chooseBtn.disabled = false;
  }
}
async function uploadToCloudinary(file){
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  if(CLOUDINARY_FOLDER) formData.append('folder', CLOUDINARY_FOLDER);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
  if(!res.ok) throw new Error('Cloudinary upload failed: ' + res.status);
  const data = await res.json();
  if(!data.secure_url) throw new Error('Cloudinary upload returned no URL');
  return data.secure_url;
}
async function removeBizLogo(){
  if(!confirm('Remove your business logo?')) return;
  business.logoUrl = '';
  renderBizLogoPreview();
  if(currentAuth){
    await sb.from('business_settings').upsert({ user_id: currentAuth.id, logo_url: '' }, { onConflict: 'user_id' });
  }
  showToast('Logo removed');
}
async function urlToDataUrl(url){
  const res = await fetch(url, { mode: 'cors' });
  if(!res.ok) throw new Error('Could not fetch logo image');
  const blob = await res.blob();
  return await new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
}
async function squareCropDataUrl(src, size){
  size = size || 256;
  const img = await new Promise((resolve, reject)=>{
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    });
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
  return canvas.toDataURL('image/png');
}
function hexToRgb(hex){
  const fallback = [192,57,43];
  if(!hex) return fallback;
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if(!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n>>16)&255, (n>>8)&255, n&255];
}
function saveBusiness(){
  { const _u = $('biz-upi').value.trim(); if(_u && !isMerchantUpiId(_u)){ alert(MERCHANT_UPI_MSG); return; } }
  business.name = $('biz-name').value.trim() || business.name;
  business.address = $('biz-address').value;
  business.gstin = $('biz-gstin').value;
  business.pan = $('biz-pan').value;
  business.bankName = $('biz-bankname').value;
  business.account = $('biz-account').value;
  business.ifsc = $('biz-ifsc').value;
  business.upi = $('biz-upi').value.trim();
  business.prefix = $('biz-prefix').value.trim() || business.prefix;
  business.nextNo = Number($('biz-nextno').value||business.nextNo);
  business.tax = Number($('biz-tax').value||0);
  business.terms = $('biz-terms').value.trim();
  business.template = $('biz-template').value;
  business.themeColor = $('biz-theme-color').value || business.themeColor;
  saveState();
  showToast('Business settings saved');
  goto('profile');
}
function renderGatewayFields(){
  const g = $('pg-gateway').value;
  $('pg-fields-razorpay').style.display = g==='razorpay' ? '' : 'none';
  $('pg-fields-upi').style.display = g==='upi' ? '' : 'none';
  const note = $('pg-upi-note');
  if(g==='upi' && note){
    note.innerHTML = business.upi
    ? `Uses your UPI ID (<strong>${business.upi}</strong>) from Business Settings above. Tapping "Pay Online" opens the client's UPI app directly with the amount filled in — no Razorpay account needed.`
    : `Add a merchant UPI ID in Business Settings above first, then come back and save this.`;
  }
}
async function renderPaymentGatewaySettings(){
  if(!currentAuth) return;
  const { data:pgRows, error:pgErr } = await sb.from('payment_gateway_settings').select('*').eq('user_id', currentAuth.id).order('updated_at', { ascending:false }).limit(1);
  if(pgErr) console.error(pgErr);
  const pg = pgRows && pgRows[0];
  $('rp-keyid').value = pg?.razorpay_key_id || '';
  $('rp-secret').value = pg?.razorpay_key_secret || '';
  $('rp-mode').value = pg?.razorpay_is_live ? 'live' : 'test';
  const activeGateway = pg?.active_gateway || '';
  $('pg-gateway').value = activeGateway;
  renderGatewayFields();
  const pill = $('cf-status-pill');
  const names = { razorpay:'Razorpay', upi:'UPI ID' };
  if(activeGateway){
    pill.textContent = names[activeGateway] + ' live on invoices';
    pill.className = 'pill Paid';
  } else {
    pill.textContent = 'Not connected';
    pill.className = 'pill Cancelled';
  }
}
async function savePaymentGatewaySettings(){
  if(!currentAuth) return;
  const activeGateway = $('pg-gateway').value || null;
  const razorpay_key_id = $('rp-keyid').value.trim();
  const razorpay_key_secret = $('rp-secret').value.trim();
  const razorpay_is_live = $('rp-mode').value === 'live';
  if(activeGateway === 'razorpay' && (!razorpay_key_id || !razorpay_key_secret)){
    alert('Add your Razorpay Key ID and Key Secret before making it the active gateway.');
    return;
  }
  if(activeGateway === 'upi' && !$('biz-upi').value.trim()){
    alert('Add a merchant UPI ID in Business Settings above before making it the active gateway.');
    return;
  }
  if(activeGateway === 'upi' && !isMerchantUpiId($('biz-upi').value)){
    alert(MERCHANT_UPI_MSG);
    return;
  }
  const { error: pgError } = await sb.from('payment_gateway_settings').upsert({
      user_id: currentAuth.id, active_gateway: activeGateway,
      razorpay_key_id, razorpay_key_secret, razorpay_is_live,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  if(pgError){ alert('Could not save payment settings: '+pgError.message); return; }
  showToast('Payment settings saved');
  renderPaymentGatewaySettings();
}
async function buildNotifItems(){
  const items = [];
  if(notifPrefs.paymentReceived) [...payments].slice(0,3).forEach(p=>{
      items.push({icon:'wallet', tone:'green', title:'Payment Received', desc:rupee(p.amount)+' payment received from '+(clientById(p.clientId)||{}).name, date:p.date});
    });
  if(notifPrefs.paymentReminders) allInvoicesComputed().filter(i=>i.status==='Sent' && isDueTomorrow(i.dueDate)).forEach(i=>{
      items.push({icon:'calendar', tone:'amber', title:'Invoice Due', desc:'Invoice #'+i.id+' is due tomorrow.', date:i.dueDate});
    });
  if(notifPrefs.paymentOverdue) allInvoicesComputed().filter(i=>i.status==='Overdue').forEach(i=>{
      items.push({icon:'alert', tone:'red', title:'Invoice Overdue', desc:'Invoice #'+i.id+' is overdue.', date:i.dueDate});
    });
  loadNotifEvents().forEach(e=>{
      if(!notifPrefs[e.type]) return;
      items.push({icon: e.type==='loginSecurity' ? 'shield' : 'user', tone: e.type==='loginSecurity' ? 'amber' : 'blue', title:e.title, desc:e.desc, date:e.date});
    });
  try{
    const { data:broadcasts } = await sb.from('broadcasts').select('*').order('created_at', { ascending:false }).limit(10);
    (broadcasts||[]).forEach(b=>{
        items.push({icon:'bell', tone:'blue', title:b.title, desc:b.body, date:b.created_at});
      });
  }catch(e){}
  items.sort((a,b)=> new Date(b.date)-new Date(a.date));
  return items;
}
const NOTIF_SEEN_KEY = 'stampbook_notif_seen_at';
function getNotifSeenAt(){ try{ return localStorage.getItem(NOTIF_SEEN_KEY) || null; }catch(e){ return null; } }
function setNotifSeenAt(iso){ try{ localStorage.setItem(NOTIF_SEEN_KEY, iso); }catch(e){} }
async function updateNotifDot(){
  const dot = $('home-bell-dot');
  if(!dot || !getAuth()) return;
  try{
    const items = await buildNotifItems();
    const newest = items[0] && items[0].date;
    const seenAt = getNotifSeenAt();
    if(!seenAt){
      setNotifSeenAt(new Date().toISOString());
      dot.style.display = 'none';
      return;
    }
    dot.style.display = (newest && new Date(newest) > new Date(seenAt)) ? 'block' : 'none';
  }catch(e){}
}
async function renderNotifications(){
  const items = await buildNotifItems();
  $('notif-list').innerHTML = items.map(n=>`
<div class="notif-item">
<div class="ic ${n.tone}">${ic(n.icon,17)}</div>
<div><div class="t">${n.title}</div><div class="d">${n.desc}</div><div class="time">${fmtDate(n.date)}</div></div>
</div>`).join('') || `<div class="empty">${ic('bell',34)}You're all caught up</div>`;
  setNotifSeenAt(items[0] ? items[0].date : new Date().toISOString());
  updateNotifDot();
}
const HELP_FAQS = [
  {q:'How do I create a new invoice?', a:'Tap the red + button on the Home screen (or go to Invoices and tap New) — add your client, line items and due date, then save.'},
  {q:'How do I record a payment against an invoice?', a:'Open the invoice, tap "Record Payment", then enter the amount received and the date. The invoice status updates automatically to Partial or Paid.'},
  {q:'How do I share an invoice with a client?', a:'Open the invoice and tap Share to send it via WhatsApp, email, or copy the link directly. Clients can view a shared invoice without needing an account.'},
  {q:'How do I set up online payments?', a:'Go to Profile \u2192 Business Settings \u2192 Online Payments, choose Razorpay from the Payment Gateway dropdown, add your Razorpay keys, then save.'},
  {q:'How do I add or edit a client?', a:'Go to Clients from the bottom navigation. Tap + to add a new client, or tap an existing client to view and edit their details.'},
  {q:'Can I change my login email or phone number?', a:'For security, the login email/phone can\u2019t be changed directly in the app. Contact support and we\u2019ll help you update it.'},
  {q:'How do I switch to Dark Mode?', a:'Go to Profile and tap Dark Mode to toggle it on or off.'}
];
function renderHelp(){
  $('help-email').innerHTML = ic('mail',17)+' stampbook03@gmail.com';
  $('help-whatsapp').innerHTML = ic('whatsapp',17)+' WhatsApp: +91 90837 87933';
  $('help-call').innerHTML = ic('phone',17)+' Call: +91 90837 87933';
  $('help-terms').innerHTML = ic('invoice',17)+' Terms &amp; Conditions';
  $('help-privacy').innerHTML = ic('invoice',17)+' Privacy Policy';
  $('help-refund').innerHTML = ic('invoice',17)+' Refund &amp; Cancellation Policy';
  ['help-chev1','help-chev2','help-chev3','help-chev4','help-chev5','help-chev6'].forEach(id=>$(id).innerHTML=ic('chevron',16));
  $('help-faq').innerHTML = HELP_FAQS.map(f=>`
<details class="faq-item">
<summary>${f.q}</summary>
<div class="faq-a">${f.a}</div>
</details>`).join('');
  loadMyTickets();
}
async function doSubmitSupportTicket(){
  hideAuthError('support-ticket-error');
  const subject = $('support-ticket-subject').value.trim();
  const message = $('support-ticket-message').value.trim();
  if(!subject || !message){ showAuthError('support-ticket-error', 'Please fill in both subject and message.'); return; }
  setBtnBusy('support-ticket-btn', true, 'Submitting\u2026');
  try{
    const { error } = await sb.from('support_tickets').insert({ user_id: currentAuth.id, subject, message });
    if(error){ showAuthError('support-ticket-error', error.message || 'Something went wrong.'); return; }
    $('support-ticket-subject').value = '';
    $('support-ticket-message').value = '';
    showToast('Support request submitted');
    loadMyTickets();
  } finally {
    setBtnBusy('support-ticket-btn', false);
  }
}
async function loadMyTickets(){
  const el = $('my-tickets-list');
  if(!el || !currentAuth) return;
  const { data, error } = await sb.from('support_tickets').select('*').eq('user_id', currentAuth.id).order('created_at', { ascending:false }).limit(10);
  if(error || !data || !data.length){ el.innerHTML = ''; return; }
  el.innerHTML = `<div style="font-size:14px;font-weight:800;margin:22px 0 10px;">My Support Requests</div>` +
  data.map(t=>`
<div class="listitem" style="cursor:default; flex-direction:column; align-items:stretch;">
<div class="top" style="display:flex; justify-content:space-between; gap:8px;">
<div style="font-size:13px;font-weight:700;">${t.subject}</div>
<span class="pill ${t.status==='resolved'?'Paid':'Overdue'}">${t.status==='resolved'?'Resolved':'Open'}</span>
</div>
<div class="muted" style="font-size:11px;margin-top:2px;">${fmtDate(t.created_at)}</div>
</div>`).join('');
}
function resolveBootTarget(){
  const invMatch = location.hash.match(/^#\/invoice\/(.+)$/);
  if(invMatch){
    const id = decodeURIComponent(invMatch[1]);
    if(invoices.some(i=>i.id===id)){ currentInvoiceId = id; return 'invoice-detail'; }
  }
  const auth = getAuth();
  const defaultHome = (auth && auth.role==='admin') ? 'admin' : 'home';
  let last = defaultHome;
  try{ last = localStorage.getItem('stampbook_last_screen') || defaultHome; }catch(e){}
  if(!$('screen-'+last)) last = defaultHome;
  return last;
}
document.body.classList.add('no-chrome');
initDarkMode();
$('screen-splash').classList.add('active');
$('splash-full-img').src = SPLASH_IMG_B64;
const SPLASH_MIN_MS = 1700;
const bootStart = Date.now();
function isReloadNavigation(){
  try{
    const entries = performance.getEntriesByType('navigation');
    if(entries && entries.length) return entries[0].type === 'reload';
    if(performance.navigation) return performance.navigation.type === 1;
  }catch(e){}
  return false;
}
async function finishBoot(){
  await refreshAuthFromSession();
  if(currentAuth){
    if(loadCachedData(currentAuth.id)){
      fetchAllData().then(()=>{
          const activeEl = document.querySelector('.screen.active');
          const activeName = activeEl && activeEl.id.replace('screen-','');
          const REFRESHABLE = ['home','invoices','clients','payments','reports','history','client-detail','invoice-detail'];
          if(getAuth() && activeName && REFRESHABLE.includes(activeName)){
            goto(activeName, { fromPopstate:true });
          }
        }).catch(()=>{});
    } else if(/^#\/(pay|invoice)\//.test(location.hash)){
      try{ await fetchAllData(); }
      catch(e){ reportCrash(e && e.message, e && e.stack, 'boot'); }
    } else {
      dataLoading = true;
      fetchAllData()
        .catch(e=>{ reportCrash(e && e.message, e && e.stack, 'boot'); })
        .finally(endDataLoad);
    }
  }
  const payMatch = location.hash.match(/^#\/pay\/(.+)$/);
  const invMatch = payMatch ? null : location.hash.match(/^#\/invoice\/(.+)$/);
  const sharedId = payMatch ? decodeURIComponent(payMatch[1])
  : invMatch ? decodeURIComponent(invMatch[1]) : null;
  if(sharedId){
    const ownCopy = !payMatch && currentAuth && invoices.find(i=>i.id===sharedId);
    if(ownCopy){
      currentInvoiceId = sharedId;
    } else {
      await loadPublicInvoice(sharedId);
    }
  }
  paintStaticChrome();
  const wait = Math.max(SPLASH_MIN_MS - (Date.now()-bootStart), 0);
  setTimeout(async ()=>{
      let target;
      if(sharedId && currentInvoiceId===sharedId){
        target = 'invoice-detail';
      } else if(!getAuth()){
        target = 'login';
        if(accountSuspended) showAuthError('login-error', 'Your account has been suspended. Please contact support.');
      } else if(isReloadNavigation()){
        target = resolveBootTarget();
      } else {
        const auth = getAuth();
        target = (auth && auth.role==='admin') ? 'admin' : 'home';
      }
      history.replaceState({ screen:target }, '', '#/'+(target==='invoice-detail' ? 'invoice/'+currentInvoiceId : target));
      goto(target, { fromPopstate:true });
    }, wait);
}
finishBoot();
window.addEventListener('beforeunload', ()=>{ saveState(); });
let registerPhoneVerified = false;
let registerPhoneVerifiedE164 = '';
let registerEmailVerified = false;
let registerEmailVerifiedFor = '';
let regCaptchaToken = null;
function onRegCaptchaSuccess(token){ regCaptchaToken = token; syncRegisterPhoneUI(); }
function onRegCaptchaExpired(){ regCaptchaToken = null; syncRegisterPhoneUI(); }
function resetRegCaptcha(){
  regCaptchaToken = null;
  if(window.turnstile && $('reg-turnstile')){
    try{ turnstile.reset('#reg-turnstile'); }catch(e){}
  }
  syncRegisterPhoneUI();
}
function syncRegisterPhoneUI(){
  const input = $('reg-phone');
  const btn = $('reg-phone-verify-btn');
  const status = $('reg-phone-status');
  if(!input || !btn || !status) return;
  if(registerPhoneVerified && toE164(input.value) !== registerPhoneVerifiedE164){
    registerPhoneVerified = false;
    registerPhoneVerifiedE164 = '';
  }
  btn.disabled = !PHONE_RE.test(input.value) || registerPhoneVerified || !regCaptchaToken;
  btn.textContent = registerPhoneVerified ? 'Verified ✓' : 'Verify';
  btn.classList.toggle('verified', registerPhoneVerified);
  status.classList.toggle('verified', registerPhoneVerified);
  status.innerHTML = registerPhoneVerified
  ? '<span class="wa-otp-badge">✓ WhatsApp number verified</span>'
  : (regCaptchaToken ? 'Verify this number with a 6-digit WhatsApp OTP.' : 'Please complete the CAPTCHA above first.');
  syncRegisterEmailUI();
}
function syncRegisterEmailUI(){
  const input = $('reg-email');
  const btn = $('reg-email-verify-btn');
  const status = $('reg-email-status');
  if(!input || !btn || !status) return;
  const email = input.value.trim().toLowerCase();
  if(registerEmailVerified && email !== registerEmailVerifiedFor){
    registerEmailVerified = false;
    registerEmailVerifiedFor = '';
  }
  btn.disabled = !registerPhoneVerified || !EMAIL_RE.test(email) || registerEmailVerified;
  btn.textContent = registerEmailVerified ? 'Verified ✓' : 'Verify';
  btn.classList.toggle('verified', registerEmailVerified);
  status.classList.toggle('verified', registerEmailVerified);
  status.innerHTML = registerEmailVerified
  ? '<span class="wa-otp-badge">✓ Email verified</span>'
  : (registerPhoneVerified ? 'Verify this email with a 6-digit code.' : 'Verify your WhatsApp number first.');
}
function syncLoginIdentifierUI(){
  const input = $('login-identifier');
  const note = $('login-note');
  if(!input || !note) return;
  const raw = input.value.trim();
  if(PHONE_RE.test(raw)){
    note.textContent = 'A 6-digit OTP will be sent to your WhatsApp number.';
  } else if(EMAIL_RE.test(raw.toLowerCase())){
    note.textContent = 'A 6-digit OTP will be sent to your email.';
  } else {
    note.textContent = 'A 6-digit OTP will be sent to your WhatsApp number or email.';
  }
}
async function doSendLoginOtp(){
  hideAuthError('login-error');
  const raw = $('login-identifier').value.trim();
  const isPhone = PHONE_RE.test(raw);
  const isEmail = EMAIL_RE.test(raw.toLowerCase());
  if(!isPhone && !isEmail){
    showAuthError('login-error','Please enter a valid 10-digit WhatsApp number or email address.');
    return;
  }
  setBtnBusy('login-btn',true,'Sending OTP…');
  try{
    if(isPhone){
      const phone = toE164(raw);
      const {error} = await sb.auth.signInWithOtp({
          phone,
          options:{shouldCreateUser:false, channel:'whatsapp'}
        });
      if(error){
        console.error('[login phone] signInWithOtp error:', error.status, error.message, error);
        showAuthError('login-error',
          'No account was found for this number. <button class="link-inline" onclick="goto(\'register\')">Register instead</button>'
          + '<div style="margin-top:8px;font-size:11px;opacity:.75;">Debug: ' + (error.status||'') + ' ' + (error.message||'unknown error') + '</div>');
        return;
      }
      otpContext = {purpose:'login-phone',phone};
    } else {
      const email = raw.toLowerCase();
      const {error} = await sb.auth.signInWithOtp({
          email,
          options:{shouldCreateUser:false}
        });
      if(error){
        console.error('[login email] signInWithOtp error:', error.status, error.message, error);
        showAuthError('login-error',
          'No account was found for this email. <button class="link-inline" onclick="goto(\'register\')">Register instead</button>'
          + '<div style="margin-top:8px;font-size:11px;opacity:.75;">Debug: ' + (error.status||'') + ' ' + (error.message||'unknown error') + '</div>');
        return;
      }
      otpContext = {purpose:'login-email',email};
    }
    goto('otp');
  }finally{
    setBtnBusy('login-btn',false);
  }
}
// Registration OTPs go through the `register-otp` Edge Function, which checks the
// Turnstile CAPTCHA on the server, creates the user, and sends the WhatsApp OTP.
// Returns {error} where error is a message string (or null on success).
async function callRegisterOtp(payload){
  try{
    const {data, error} = await sb.functions.invoke('register-otp', {body: payload});
    if(error) return {error: error.message || 'Could not reach the server. Please try again.'};
    if(!data || data.ok !== true) return {error: (data && data.error) || 'Could not send WhatsApp OTP. Please try again.'};
    return {error: null};
  }catch(e){
    return {error: (e && e.message) || 'Could not reach the server. Please try again.'};
  }
}
async function startRegisterPhoneVerification(){
  hideAuthError('reg-error');
  const name = $('reg-name').value.trim();
  const designation = $('reg-designation').value.trim();
  const phoneRaw = $('reg-phone').value.trim();
  const email = $('reg-email').value.trim().toLowerCase();
  if(!name || !designation || !phoneRaw || !email){
    showAuthError('reg-error','Please fill in your name, designation, WhatsApp number and email first.');
    return;
  }
  if(!PHONE_RE.test(phoneRaw)){
    showAuthError('reg-error','Please enter a valid 10-digit WhatsApp number.');
    return;
  }
  if(!EMAIL_RE.test(email)){
    showAuthError('reg-error','Please enter a valid email address.');
    return;
  }
  if(!regCaptchaToken){
    showAuthError('reg-error','Please complete the CAPTCHA first.');
    return;
  }
  const phone = toE164(phoneRaw);
  setBtnBusy('reg-phone-verify-btn',true,'Sending…');
  try{
    const {data:existingByEmail, error:dupError} = await sb
    .from('profiles')
    .select('id')
    .ilike('email', email)
    .maybeSingle();
    if(dupError){
      showAuthError('reg-error', dupError.message || 'Could not verify the email. Please try again.');
      return;
    }
    if(existingByEmail){
      showAuthError('reg-error',
        'This email is already registered. <button class="link-inline" onclick="goto(\'login\')">Log in instead</button>');
      return;
    }
    const {error: regErr} = await callRegisterOtp({
      action:'start', phone, phoneRaw, name, designation, email,
      captchaToken: regCaptchaToken
    });
    resetRegCaptcha();
    if(regErr){
      showAuthError('reg-error',
        /already|registered|exists|duplicate key|unique constraint/i.test(regErr)
        ? 'This WhatsApp number or email is already registered. <button class="link-inline" onclick="goto(\'login\')">Log in instead</button>'
        : regErr);
      return;
    }
    otpContext = {
      purpose:'register-phone',
      phone,
      pendingProfile:{name,designation,phone:phoneRaw,email}
    };
    goto('otp');
  }finally{
    setBtnBusy('reg-phone-verify-btn',false);
    syncRegisterPhoneUI();
  }
}
async function startRegisterEmailVerification(){
  hideAuthError('reg-error');
  if(!registerPhoneVerified){
    showAuthError('reg-error','Please verify your WhatsApp number first.');
    return;
  }
  const email = $('reg-email').value.trim().toLowerCase();
  if(!EMAIL_RE.test(email)){
    showAuthError('reg-error','Please enter a valid email address.');
    return;
  }
  setBtnBusy('reg-email-verify-btn',true,'Sending…');
  try{
    const {data:existingByEmail, error:dupError} = await sb
    .from('profiles')
    .select('id')
    .ilike('email', email)
    .maybeSingle();
    if(dupError){
      showAuthError('reg-error', dupError.message || 'Could not verify the email. Please try again.');
      return;
    }
    if(existingByEmail){
      showAuthError('reg-error',
        'This email is already registered. <button class="link-inline" onclick="goto(\'login\')">Log in instead</button>');
      return;
    }
    const {error} = await sb.auth.updateUser({email});
    if(error){
      showAuthError('reg-error',
        /already|registered|exists|duplicate key|unique constraint/i.test(error.message||'')
        ? 'This email is already registered. <button class="link-inline" onclick="goto(\'login\')">Log in instead</button>'
        : (error.message || 'Could not send the email code. Please try again.'));
      return;
    }
    otpContext = {
      purpose:'register-email-change',
      email,
      pendingProfile:{
        name: $('reg-name').value.trim(),
        designation: $('reg-designation').value.trim(),
        phone: $('reg-phone').value.trim()
      }
    };
    goto('otp');
  }finally{
    setBtnBusy('reg-email-verify-btn',false);
    syncRegisterEmailUI();
  }
}
async function completeRegistration(){
  hideAuthError('reg-error');
  const name = $('reg-name').value.trim();
  const designation = $('reg-designation').value.trim();
  const phone = $('reg-phone').value.trim();
  const email = $('reg-email').value.trim().toLowerCase();
  if(!name || !designation || !phone || !email){
    showAuthError('reg-error','Please fill in all fields.');
    return;
  }
  if(!PHONE_RE.test(phone) || !registerPhoneVerified || registerPhoneVerifiedE164 !== toE164(phone)){
    showAuthError('reg-error','Please verify your WhatsApp number first.');
    return;
  }
  if(!EMAIL_RE.test(email)){
    showAuthError('reg-error','Please enter a valid email address.');
    return;
  }
  if(!registerEmailVerified || registerEmailVerifiedFor !== email){
    showAuthError('reg-error','Please verify your email address first.');
    return;
  }
  setBtnBusy('register-btn',true,'Creating…');
  try{
    const session = (await sb.auth.getSession()).data.session;
    if(!session){
      showAuthError('reg-error','Your verification session expired. Please verify the number again.');
      registerPhoneVerified=false;
      registerEmailVerified=false;
      syncRegisterPhoneUI();
      return;
    }
    const pending = {name,designation,phone,email};
    const {error:upsertError} = await sb.from('profiles').upsert({
        id:session.user.id,
        email,
        name,
        designation,
        phone,
        phone_verified:true,
        email_verified:true
      },{onConflict:'id'});
    if(upsertError){
      showAuthError('reg-error', upsertError.message || 'Could not save your profile. Please try again.');
      return;
    }
    await refreshAuthFromSession();
    if(!currentAuth){
      showAuthError('reg-error','Account created, but the profile could not be loaded. Please log in again.');
      return;
    }
    await fetchAllData();
    paintStaticChrome();
    logLoginEvent('login');
    otpContext=null;
    registerPhoneVerified=false;
    registerPhoneVerifiedE164='';
    registerEmailVerified=false;
    registerEmailVerifiedFor='';
    history.replaceState({screen:currentAuth.role==='admin'?'admin':'home'},'', '#/'+(currentAuth.role==='admin'?'admin':'home'));
    goto(currentAuth.role==='admin'?'admin':'home',{fromPopstate:true});
  }catch(e){
    showAuthError('reg-error',e.message||'Could not create your account. Please try again.');
  }finally{
    setBtnBusy('register-btn',false);
  }
}
function renderOtpScreen(){
  if(!otpContext){ goto('login'); return; }
  hideAuthError('otp-error');
  const isEmail = otpContext.purpose==='login-email' || otpContext.purpose==='register-email-change';
  const isRegister = otpContext.purpose==='register-phone' || otpContext.purpose==='register-email-change';
  if(isEmail){
    $('otp-title').textContent =
    otpContext.purpose==='register-email-change' ? 'Verify your email' : 'Enter login code';
    $('otp-subtitle').innerHTML =
    'Enter the 6-digit code sent to <span style="color:var(--ink);font-weight:700;">'+otpContext.email+'</span>';
    $('otp-devnote').textContent = '';
  } else {
    $('otp-title').textContent = isRegister ? 'Verify your WhatsApp' : 'Enter WhatsApp OTP';
    $('otp-subtitle').innerHTML =
    'Enter the 6-digit code sent via WhatsApp to <span style="color:var(--ink);font-weight:700;">'+otpContext.phone+'</span>';
    $('otp-devnote').innerHTML =
    '<span class="wa-otp-badge">WhatsApp OTP</span> · 6 digits';
  }
  clearOtpInputs();
  setupOtpInputBehavior();
  startOtpResendCountdown();
  const boxes=document.querySelectorAll('.otp-box');
  if(boxes[0]) boxes[0].focus();
  const switchBtn=$('otp-switch-btn');
  if(switchBtn){
    switchBtn.textContent = isRegister ? 'Back to registration' : (isEmail ? 'Use a different email' : 'Use a different number');
    switchBtn.onclick=()=>{ if(isRegister) otpContext=null; goto(isRegister?'register':'login'); };
  }
}
async function doResendOtp(){
  if(!otpContext || otpResendRemaining>0) return;
  setBtnBusy('otp-resend-btn',true,'Resending…');
  let error=null;
  if(otpContext.purpose==='register-phone'){
    const {error: resendErr} = await callRegisterOtp({action:'resend', phone:otpContext.phone});
    error = resendErr ? {message: resendErr} : null;
  }else if(otpContext.purpose==='login-phone'){
    ({error}=await sb.auth.signInWithOtp({
          phone:otpContext.phone,
          options:{shouldCreateUser:false,channel:'whatsapp'}
        }));
  }else if(otpContext.purpose==='login-email'){
    ({error}=await sb.auth.signInWithOtp({
          email:otpContext.email,
          options:{shouldCreateUser:false}
        }));
  }else if(otpContext.purpose==='register-email-change'){
    ({error}=await sb.auth.updateUser({email:otpContext.email}));
  }
  setBtnBusy('otp-resend-btn',false);
  if(error){
    showAuthError('otp-error',error.message||'Could not resend the code.');
    return;
  }
  clearOtpInputs();
  startOtpResendCountdown();
  const boxes=document.querySelectorAll('.otp-box');
  if(boxes[0]) boxes[0].focus();
  showToast('WhatsApp OTP resent');
}
async function doVerifyOtp(){
  if(!otpContext) return;
  hideAuthError('otp-error');
  const code=Array.from(document.querySelectorAll('.otp-box')).map(b=>b.value).join('');
  if(code.length!==6){
    showAuthError('otp-error','Please enter the full 6-digit code.');
    return;
  }
  setBtnBusy('otp-verify-btn',true,'Verifying…');
  try{
    const verifyArgs = (otpContext.purpose==='login-email')
    ? {email:otpContext.email, token:code, type:'email'}
    : (otpContext.purpose==='register-email-change')
    ? {email:otpContext.email, token:code, type:'email_change'}
    : {phone:otpContext.phone, token:code, type:'sms'};
    const {data,error}=await sb.auth.verifyOtp(verifyArgs);
    if(error){
      showAuthError('otp-error',/expired/i.test(error.message||'')
        ? 'This OTP has expired. Please resend a new one.'
        : 'Incorrect OTP. Please try again.');
      return;
    }
    if(otpContext.purpose==='register-email-change'){
      const p = otpContext.pendingProfile || {};
      const session = (await sb.auth.getSession()).data.session;
      if(!session){
        showAuthError('otp-error','Your verification session expired. Please start registration again.');
        otpContext=null;
        goto('register');
        return;
      }
      const {error:upsertError} = await sb.from('profiles').upsert({
          id:session.user.id,
          email:otpContext.email,
          name:p.name,
          designation:p.designation,
          phone:p.phone,
          phone_verified:true,
          email_verified:true
        },{onConflict:'id'});
      if(upsertError){
        showAuthError('otp-error', upsertError.message || 'Could not save your profile. Please try again.');
        return;
      }
      clearInterval(otpResendTimer);
      otpContext=null;
      registerPhoneVerified=false;
      registerPhoneVerifiedE164='';
      registerEmailVerified=false;
      registerEmailVerifiedFor='';
      await refreshAuthFromSession();
      if(!currentAuth){
        showAuthError('otp-error',accountSuspended?'Your account has been suspended. Please contact support.':'Could not load your account. Please try again.');
        return;
      }
      try{ await fetchAllData(); }
      catch(e){
        reportCrash(e && e.message, e && e.stack, 'otp');
      }
      paintStaticChrome();
      const target=currentAuth.role==='admin'?'admin':'home';
      history.replaceState({screen:target},'', '#/'+target);
      showToast('Account created');
      logNotifEvent('accountUpdates', 'Email Updated', 'The email address on your account was changed.');
      goto(target,{fromPopstate:true});
      return;
    }
    if(otpContext.purpose==='register-phone'){
      const p=otpContext.pendingProfile;
      registerPhoneVerified=true;
      registerPhoneVerifiedE164=otpContext.phone;
      clearInterval(otpResendTimer);
      otpContext=null;
      $('reg-phone').value=p.phone;
      $('reg-name').value=p.name;
      $('reg-designation').value=p.designation;
      $('reg-email').value=p.email;
      syncRegisterPhoneUI();
      showToast('WhatsApp number verified');
      goto('register');
      return;
    }
    await refreshAuthFromSession();
    if(!currentAuth){
      showAuthError('otp-error',accountSuspended?'Your account has been suspended. Please contact support.':'Could not load your account. Please try again.');
      return;
    }
    clearInterval(otpResendTimer);
    otpContext=null;
    try{ await fetchAllData(); }
    catch(e){ reportCrash(e && e.message, e && e.stack, 'otp'); }
    paintStaticChrome();
    logNotifEvent('loginSecurity', 'New Login', 'You signed in to your StampBook account.');
    logLoginEvent('login');
    const target=currentAuth.role==='admin'?'admin':'home';
    history.replaceState({screen:target},'', '#/'+target);
    goto(target,{fromPopstate:true});
  }finally{
    setBtnBusy('otp-verify-btn',false);
  }
}
(function(){
    const REFRESH_SCREENS=['home','invoices','clients','payments','reports','history','client-detail','invoice-detail'];
    const THRESHOLD=70, MAX_PULL=110;
    let startY=0, pulling=false, screenEl=null, indicator=null, pullDist=0;
    function ensureIndicator(screen){
      let el=screen.querySelector(':scope > .ptr-indicator');
      if(!el){
        el=document.createElement('div');
        el.className='ptr-indicator';
        el.innerHTML='<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20 4v5h-5"/></svg>';
        screen.insertBefore(el, screen.firstChild);
      }
      return el;
    }
    function resetIndicator(){
      if(indicator){
        indicator.style.transition='transform .25s ease, opacity .25s ease';
        indicator.style.transform='translateY(0)';
        indicator.style.opacity='0';
        indicator.classList.remove('spinning');
        setTimeout(()=>{ if(indicator) indicator.style.transition=''; },250);
      }
      screenEl=null; indicator=null; pulling=false; pullDist=0;
    }
    document.addEventListener('touchstart',(e)=>{
        if(e.touches.length!==1) return;
        const screen=e.target.closest('.screen.active');
        if(!screen) return;
        const name=screen.id.replace('screen-','');
        if(!getAuth() || !REFRESH_SCREENS.includes(name)) return;
        if(screen.scrollTop>0) return;
        screenEl=screen;
        startY=e.touches[0].clientY;
        pulling=true;
        pullDist=0;
        indicator=ensureIndicator(screen);
      },{passive:true});
    document.addEventListener('touchmove',(e)=>{
        if(!pulling || !screenEl) return;
        if(screenEl.scrollTop>0){ resetIndicator(); return; }
        const dy=e.touches[0].clientY-startY;
        if(dy<=0) return;
        e.preventDefault();
        pullDist=Math.min(dy*0.5, MAX_PULL);
        indicator.style.transform=`translateY(${pullDist}px) rotate(${pullDist*3}deg)`;
        indicator.style.opacity=String(Math.min(pullDist/THRESHOLD,1));
      },{passive:false});
    document.addEventListener('touchend', async ()=>{
        if(!pulling || !screenEl) return;
        const dist=pullDist, screen=screenEl;
        pulling=false;
        if(dist>=THRESHOLD){
          indicator.style.transform='translateY(50px) rotate(0deg)';
          indicator.classList.add('spinning');
          try{
            await fetchAllData();
            const activeEl=document.querySelector('.screen.active');
            const activeName=activeEl && activeEl.id.replace('screen-','');
            if(getAuth() && activeName && REFRESH_SCREENS.includes(activeName)){
              goto(activeName, { fromPopstate:true });
            }
          }catch(e){}
        }
        resetIndicator();
      },{passive:true});
    document.addEventListener('touchcancel', resetIndicator, {passive:true});
  })();
const _originalGoto = goto;
goto = function(screen, opts){
  if(screen==='register'){
    setTimeout(syncRegisterPhoneUI,0);
  }
  return _originalGoto(screen, opts);
};