/* ===== GAMMA Panel Demo — datos ficticios, sin backend, sin login ===== */
'use strict';

/* --- helpers DOM (sin innerHTML) --- */
function el(tag, cls, text){
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function ico(name){
  const i = document.createElement('i');
  i.setAttribute('data-lucide', name);
  return i;
}
function drawIcons(){ if (window.lucide) lucide.createIcons(); } /* guard: un CDN caido no debe matar el panel */
const AV = ['#FFEB3B','#FFC107','#f59e0b','#22c55e','#3b82f6','#a78bfa','#f472b6','#2dd4bf'];
const avColor = (s)=> AV[[...s].reduce((a,c)=>a+c.charCodeAt(0),0) % AV.length];
const initials = (s)=> s.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();

/* ========================= DATOS FICTICIOS ========================= */
const CHATS = [
  { name:'Lucia Fernandez', phone:'+54 9 11 5523-8841', tag:'Cliente', unread:2, botOn:true, time:'14:32',
    last:'Perfecto, muchas gracias!',
    msgs:[
      {f:'in', t:'Hola! Queria saber el horario de atencion para el sabado', w:'14:28'},
      {f:'bot',t:'Hola Lucia! Los sabados atendemos de 9 a 13hs. Queres que te reserve un turno?', w:'14:28'},
      {f:'in', t:'Si, a las 10 estaria bien', w:'14:30'},
      {f:'bot',t:'Listo, te agendo el sabado a las 10:00. Te llega la confirmacion por aca.', w:'14:31'},
      {f:'in', t:'Perfecto, muchas gracias!', w:'14:32'} ]},
  { name:'Martin Gomez', phone:'+54 9 351 644-1290', tag:'Lead', unread:1, botOn:true, time:'14:15',
    last:'Y cuanto saldria el plan mensual?',
    msgs:[
      {f:'in', t:'Buenas, vi la publicidad. Que incluye el servicio?', w:'14:10'},
      {f:'bot',t:'Hola Martin! Incluye atencion automatica 24/7, agenda de turnos y envio de recordatorios. Te paso los planes?', w:'14:11'},
      {f:'in', t:'Dale', w:'14:14'},
      {f:'in', t:'Y cuanto saldria el plan mensual?', w:'14:15'} ]},
  { name:'Carla Ruiz', phone:'+54 9 11 3398-7762', tag:'Cliente', unread:0, botOn:false, time:'13:40',
    last:'Te paso con una persona del equipo.',
    msgs:[
      {f:'in', t:'Necesito cambiar una factura que ya me emitieron', w:'13:36'},
      {f:'bot',t:'Entiendo Carla. Eso lo tiene que ver alguien del equipo, ya te derivo.', w:'13:37'},
      {f:'agent',t:'Hola Carla, soy Sofia del equipo. Pasame el numero de factura asi lo reviso.', w:'13:40'} ]},
  { name:'Diego Paz', phone:'+54 9 341 277-5503', tag:'Lead', unread:0, botOn:true, time:'12:05',
    last:'Genial, espero el link entonces',
    msgs:[
      {f:'in', t:'Hola, me pasan info del producto?', w:'11:58'},
      {f:'bot',t:'Hola Diego! Te armo el link con el catalogo actualizado. Un segundo.', w:'11:59'},
      {f:'bot',t:'Aca lo tenes: catalogo.ejemplo.com/2026', w:'12:00'},
      {f:'in', t:'Genial, espero el link entonces', w:'12:05'} ]},
  { name:'Valentina Sosa', phone:'+54 9 11 6612-0934', tag:'VIP', unread:0, botOn:true, time:'Ayer',
    last:'Nos vemos el jueves!',
    msgs:[
      {f:'in', t:'Confirmo el turno del jueves', w:'Ayer'},
      {f:'bot',t:'Confirmado Valentina. Te espero el jueves a las 16:00. Nos vemos!', w:'Ayer'},
      {f:'in', t:'Nos vemos el jueves!', w:'Ayer'} ]},
  { name:'Joaquin Medina', phone:'+54 9 11 4487-1123', tag:'Cliente', unread:0, botOn:true, time:'Ayer',
    last:'Ok, lo reviso y te aviso',
    msgs:[
      {f:'in', t:'Me llego el recordatorio de pago, gracias', w:'Ayer'},
      {f:'bot',t:'De nada Joaquin! Cualquier cosa escribime por aca.', w:'Ayer'},
      {f:'in', t:'Ok, lo reviso y te aviso', w:'Ayer'} ]},
];

const KPIS = [
  { icon:'messages-square', val:342, label:'Mensajes hoy', delta:'+12%', dir:'up' },
  { icon:'bot',             val:289, label:'Respuestas automaticas', delta:'+8%', dir:'up', suffix:'' },
  { icon:'users-round',     val:128, label:'Contactos activos', delta:'+5%', dir:'up' },
  { icon:'timer',           val:6,   label:'Resp. promedio (seg)', delta:'-3s', dir:'up', },
];
const WEEK = [{d:'Lun',v:210},{d:'Mar',v:265},{d:'Mie',v:240},{d:'Jue',v:312},{d:'Vie',v:342},{d:'Sab',v:180},{d:'Dom',v:95}];
const ACTIVITY = [
  { ico:'calendar-check', c:'green', t:'Turno agendado por el bot con Lucia Fernandez', w:'Hace 3 min' },
  { ico:'user-plus',      c:'gold',  t:'Nuevo contacto: Martin Gomez', w:'Hace 18 min' },
  { ico:'headset',        c:'blue',  t:'Conversacion derivada a un agente humano', w:'Hace 41 min' },
  { ico:'send',           c:'amber', t:'Campana "Promo Octubre" enviada a 86 contactos', w:'Hace 2 h' },
  { ico:'bell-ring',      c:'gold',  t:'12 recordatorios enviados automaticamente', w:'Hace 4 h' },
];
const CONTACTS = [
  { name:'Lucia Fernandez', phone:'+54 9 11 5523-8841', tag:'Cliente', tagCls:'', last:'Hoy 14:32', activo:true },
  { name:'Martin Gomez',    phone:'+54 9 351 644-1290', tag:'Lead', tagCls:'lead', last:'Hoy 14:15', activo:true },
  { name:'Carla Ruiz',      phone:'+54 9 11 3398-7762', tag:'Cliente', tagCls:'', last:'Hoy 13:40', activo:true },
  { name:'Valentina Sosa',  phone:'+54 9 11 6612-0934', tag:'VIP', tagCls:'vip', last:'Ayer', activo:true },
  { name:'Diego Paz',       phone:'+54 9 341 277-5503', tag:'Lead', tagCls:'lead', last:'Hoy 12:05', activo:true },
  { name:'Joaquin Medina',  phone:'+54 9 11 4487-1123', tag:'Cliente', tagCls:'', last:'Ayer', activo:true },
  { name:'Agustina Rios',   phone:'+54 9 223 510-8876', tag:'Cliente', tagCls:'', last:'Hace 3 dias', activo:false },
  { name:'Franco Diaz',     phone:'+54 9 11 2290-4417', tag:'Lead', tagCls:'lead', last:'Hace 5 dias', activo:false },
];
const BROADCASTS = [
  { title:'Promo Octubre', status:'enviada', text:'Descuento del 20% en el primer mes para nuevos clientes. Valido hasta fin de mes.', env:86, leidos:79, resp:21 },
  { title:'Recordatorio turnos', status:'programada', text:'Aviso automatico 24hs antes del turno agendado. Se dispara todos los dias a las 9:00.', env:0, leidos:0, resp:0 },
  { title:'Encuesta de satisfaccion', status:'borrador', text:'Mensaje con 3 preguntas rapidas para medir la atencion. Pendiente de aprobacion.', env:0, leidos:0, resp:0 },
];
const CONFIG = [
  { ico:'power', title:'Respuestas automaticas', desc:'El bot responde solo las consultas frecuentes las 24 horas.', on:true },
  { ico:'calendar', title:'Agenda de turnos', desc:'Permite reservar y confirmar turnos desde el chat.', on:true },
  { ico:'bell', title:'Recordatorios', desc:'Envia avisos automaticos de turnos y pagos.', on:true },
  { ico:'headset', title:'Derivacion a humano', desc:'Pasa la conversacion a un agente cuando detecta un caso complejo.', on:true },
  { ico:'moon', title:'Modo nocturno', desc:'Fuera del horario, avisa que respondera al dia siguiente.', on:false },
];

/* ========================= RENDER ========================= */
function renderChats(filter, q){
  const box = document.getElementById('chatItems');
  box.textContent = '';
  const list = CHATS.filter(c=>{
    if (filter==='sin-leer' && !c.unread) return false;
    if (filter==='bot-off' && c.botOn) return false;
    if (q && !(c.name.toLowerCase().includes(q) || c.phone.includes(q))) return false;
    return true;
  });
  document.getElementById('chatCount').textContent = list.length;
  list.forEach(c=>{
    const item = el('div','chat-item');
    item.dataset.name = c.name;
    const av = el('div','chat-avatar', initials(c.name)); av.style.background = avColor(c.name);
    const meta = el('div','chat-meta');
    const top = el('div','chat-top');
    top.append(el('span','chat-name', c.name), el('span','chat-time', c.time));
    const last = el('div','chat-last', c.last);
    const badges = el('div','chat-badges');
    badges.append(el('span','pill tag', c.tag));
    if (!c.botOn) badges.append(el('span','pill agent','Con agente'));
    if (c.unread) badges.append(el('span','unread', String(c.unread)));
    meta.append(top, last, badges);
    item.append(av, meta);
    item.addEventListener('click', ()=> openThread(c, item));
    box.append(item);
  });
  drawIcons();
}

function openThread(c, item){
  document.querySelectorAll('.chat-item').forEach(i=>i.classList.remove('active'));
  if (item) item.classList.add('active');
  document.getElementById('threadEmpty').hidden = true;
  document.getElementById('thread').hidden = false;
  document.getElementById('threadName').textContent = c.name;
  document.getElementById('threadPhone').textContent = c.phone;
  const av = document.getElementById('threadAvatar');
  av.textContent = initials(c.name); av.style.background = avColor(c.name);
  const pill = document.getElementById('botPill');
  pill.classList.toggle('off', !c.botOn);
  document.getElementById('botPillText').textContent = c.botOn ? 'Bot activo' : 'Agente humano';
  const m = document.getElementById('messages');
  m.textContent = '';
  c.msgs.forEach(msg=>{
    const b = el('div','msg '+(msg.f==='in'?'in':msg.f==='bot'?'bot':'agent'));
    b.append(el('div','who', msg.f==='in'?c.name.split(' ')[0]:msg.f==='bot'?'Bot':'Agente'));
    b.append(el('div',null,msg.t));
    b.append(el('div','when', msg.w));
    m.append(b);
  });
  m.scrollTop = m.scrollHeight;
  document.getElementById('threadPane').classList.add('open'); /* mobile */
  drawIcons();
}

function renderKpis(){
  const g = document.getElementById('kpiGrid'); g.textContent='';
  KPIS.forEach(k=>{
    const c = el('div','kpi');
    const top = el('div','kpi-top');
    const ib = el('div','kpi-ico'); ib.append(ico(k.icon));
    const d = el('div','kpi-delta '+k.dir); d.append(ico(k.dir==='up'?'trending-up':'trending-down'), el('span',null,k.delta));
    top.append(ib,d);
    const val = el('div','kpi-val','0'); val.dataset.target = k.val;
    c.append(top, val, el('div','kpi-label', k.label));
    g.append(c);
  });
  drawIcons();
  countUp();
}
function countUp(){
  document.querySelectorAll('.kpi-val').forEach(v=>{
    const target = +v.dataset.target; let cur=0;
    const step = Math.max(1, Math.round(target/28));
    const t = setInterval(()=>{ cur+=step; if(cur>=target){cur=target;clearInterval(t);} v.textContent=String(cur); }, 24);
  });
}
function renderBars(){
  const b = document.getElementById('weekBars'); b.textContent='';
  const max = Math.max(...WEEK.map(w=>w.v));
  WEEK.forEach(w=>{
    const col = el('div','bar-col');
    col.append(el('div','bar-val', String(w.v)));
    const track = el('div','bar-track'); const fill = el('div','bar-fill');
    track.append(fill); col.append(track, el('div','bar-lbl', w.d));
    b.append(col);
    requestAnimationFrame(()=>{ setTimeout(()=>{ fill.style.height = (w.v/max*100)+'%'; }, 60); });
  });
}
function renderActivity(){
  const u = document.getElementById('activityList'); u.textContent='';
  ACTIVITY.forEach(a=>{
    const li = el('li');
    const ib = el('div','act-ico '+a.c); ib.append(ico(a.ico));
    const body = el('div','act-body');
    body.append(el('div','act-txt', a.t), el('div','act-when', a.w));
    li.append(ib, body); u.append(li);
  });
  drawIcons();
}
function renderContacts(q){
  const tb = document.getElementById('contactBody'); tb.textContent='';
  const list = CONTACTS.filter(c=> !q || c.name.toLowerCase().includes(q) || c.phone.includes(q));
  document.getElementById('contactCount').textContent = list.length + ' contactos';
  list.forEach(c=>{
    const tr = el('tr');
    const td1 = el('td'); td1.dataset.label='Contacto';
    const wrap = el('div','td-contact');
    const av = el('div','td-avatar', initials(c.name)); av.style.background = avColor(c.name);
    wrap.append(av, el('span','td-name', c.name)); td1.append(wrap);
    const td2 = el('td', null, c.phone); td2.dataset.label='Telefono';
    const td3 = el('td'); td3.dataset.label='Etiqueta'; td3.append(el('span','tag-chip '+c.tagCls, c.tag));
    const td4 = el('td', null, c.last); td4.dataset.label='Ultimo mensaje';
    const td5 = el('td'); td5.dataset.label='Estado';
    const st = el('span','state '+(c.activo?'activo':'inactivo')); st.append(el('span','dot'), el('span',null,c.activo?'Activo':'Inactivo'));
    td5.append(st);
    tr.append(td1,td2,td3,td4,td5); tb.append(tr);
  });
}
function renderBroadcasts(){
  const g = document.getElementById('broadcastGrid'); g.textContent='';
  BROADCASTS.forEach(b=>{
    const c = el('div','bc-card');
    const head = el('div','bc-head');
    head.append(el('div','bc-title', b.title), el('span','bc-status '+b.status, b.status));
    const stats = el('div','bc-stats');
    [['Enviados',b.env],['Leidos',b.leidos],['Respuestas',b.resp]].forEach(([k,v])=>{
      const s = el('div','bc-stat'); s.append(el('b',null,String(v)), el('span',null,k)); stats.append(s);
    });
    c.append(head, el('div','bc-text', b.text), stats); g.append(c);
  });
}
function renderConfig(){
  const g = document.getElementById('configList'); g.textContent='';
  CONFIG.forEach(cf=>{
    const row = el('div','config-row');
    const ib = el('div','config-ico'); ib.append(ico(cf.ico));
    const info = el('div','config-info');
    info.append(el('div','config-title', cf.title), el('div','config-desc', cf.desc));
    const sw = el('label','switch');
    const inp = document.createElement('input'); inp.type='checkbox'; inp.checked = cf.on;
    sw.append(inp, el('span','slider'));
    row.append(ib, info, sw); g.append(row);
  });
  drawIcons();
}

/* ========================= NAVEGACION (una sola vista visible) ========================= */
function hideAllViews(){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
}
function showView(name){
  hideAllViews();
  document.getElementById('view-'+name).classList.add('active');
  document.querySelectorAll('.rail-item').forEach(b=> b.classList.toggle('active-view', b.dataset.view===name));
}

/* ========================= INIT ========================= */
document.addEventListener('DOMContentLoaded', ()=>{
  renderChats('todos','');
  renderKpis(); renderBars(); renderActivity();
  renderContacts(''); renderBroadcasts(); renderConfig();
  document.getElementById('metricDate').textContent = 'Actualizado ' + new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
  drawIcons();

  document.querySelectorAll('.rail-item').forEach(b=> b.addEventListener('click', ()=> showView(b.dataset.view)));

  document.getElementById('chatFilters').addEventListener('click', e=>{
    const btn = e.target.closest('.filter'); if(!btn) return;
    document.querySelectorAll('.filter').forEach(f=>f.classList.remove('active'));
    btn.classList.add('active');
    renderChats(btn.dataset.filter, document.getElementById('chatSearch').value.trim().toLowerCase());
  });
  document.getElementById('chatSearch').addEventListener('input', e=>{
    const active = document.querySelector('.filter.active').dataset.filter;
    renderChats(active, e.target.value.trim().toLowerCase());
  });
  document.getElementById('contactSearch').addEventListener('input', e=> renderContacts(e.target.value.trim().toLowerCase()));

  document.getElementById('backBtn').addEventListener('click', ()=>{
    document.getElementById('threadPane').classList.remove('open');
    document.querySelectorAll('.chat-item').forEach(i=>i.classList.remove('active'));
  });

  /* composer: eco visual, es demo (no hay backend) */
  const send = ()=>{
    const inp = document.getElementById('composerInput'); const v = inp.value.trim(); if(!v) return;
    const m = document.getElementById('messages');
    const b = el('div','msg agent');
    b.append(el('div','who','Agente'), el('div',null,v),
             el('div','when', new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})));
    m.append(b); m.scrollTop = m.scrollHeight; inp.value=''; inp.focus();
  };
  document.getElementById('composerSend').addEventListener('click', send);
  document.getElementById('composerInput').addEventListener('keydown', e=>{ if(e.key==='Enter') send(); });
});
