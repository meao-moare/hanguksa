
/* ───────── 구조도: 목차 · 모든 구조도를 옆으로 넘기기 · 한 화면에 맞추기 · 순서/같이 보기 바꾸기 ───────── */
{
const BASE=[
 {t:'고려의 지배층',s:'고려',c:'#9a3412',k:['goryeo','musin']},
 {t:'조선의 정치 세력',s:'조선 전기 ~ 후기',c:'#0f766e',k:['hungu','bungdang2','yesong','tangpyeong']},
 {t:'조선 후기 사상',s:'17 ~ 18세기',c:'#7c3aed',k:['bukbeol','silhak']},
 {t:'개항기 사상과 운동',s:'19세기 후반',c:'#b45309',k:['wijeong','gaehwa','donghak']},
 {t:'국권 수호 운동',s:'1890 ~ 1910년대',c:'#be123c',k:['uibyeong','gyemong']},
 {t:'1910년대 독립운동',s:'국내 · 국외',c:'#1d4ed8',k:['org1910','abroad']},
 {t:'1920년대 독립운동',s:'무장 · 의열 · 국내 운동',c:'#0369a1',k:['armed1920','uiyeol','society1920','minjok1920']},
 {t:'1930 ~ 40년대와 노선',s:'중국 관내 · 독립운동 노선',c:'#4338ca',k:['china1930','dongnip']},
 {t:'광복 직후',s:'1945 ~ 1948',c:'#334155',k:['haebang']}
];
const JOIN0=['gaehwa'];
const PREF={wijeong:['vtr','uv']};
const $=id=>document.getElementById(id);
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const title=k=>{try{return TREES[k]?TREES[k].title:k}catch(_){return k}};
const has=k=>{try{return !!TREES[k]}catch(_){return false}};
const TRM=()=>window.__ME&&window.__ME.tr;
let TRG=[],ALLP=[],ORDSIG='',JOIN=new Set(JOIN0);
const dataSig=()=>{const M=TRM();return JSON.stringify([(M&&M.get('@tgo'))||null,(M&&M.get('@tjoin'))||null])};
function rebuildOrder(){const M=TRM();const SO=M&&M.get('@tgo');const JN=M&&M.get('@tjoin');JOIN=new Set(Array.isArray(JN)?JN:JOIN0);
  TRG=BASE.map(g=>Object.assign({},g,{k:g.k.filter(has)}));
  {const seen=new Set(TRG.flatMap(g=>g.k));let rest=[];try{rest=Object.keys(TREES).filter(k=>!seen.has(k)&&k!=='orgs')}catch(_){}if(rest.length)TRG.push({t:'더 보기',s:'',c:'#475569',k:rest})}
  if(Array.isArray(SO)){const all=new Set(TRG.flatMap(g=>g.k));const used=new Set();SO.forEach((L,gi)=>{if(!TRG[gi]||!Array.isArray(L))return;TRG[gi].k=L.filter(k=>all.has(k)&&!used.has(k)&&(used.add(k),true))});
    TRG.forEach(g=>g.k.forEach(()=>{}));BASE.forEach((g,gi)=>g.k.forEach(k=>{if(all.has(k)&&!used.has(k)){used.add(k);TRG[gi].k.push(k)}}))}
  TRG.forEach(g=>{g.p=[];g.k.forEach((k,i)=>{if(i>0&&JOIN.has(k)&&g.p.length&&g.p[g.p.length-1].length<4)g.p[g.p.length-1].push(k);else g.p.push([k])})});
  ALLP=[];TRG.forEach((g,gi)=>g.p.forEach(p=>ALLP.push({g:gi,p})));ORDSIG=dataSig()}
rebuildOrder();
let IX=true,PAGE=0;
const G=()=>IX||!ALLP[PAGE]?-1:ALLP[PAGE].g;
const pageOfKey=k=>Math.max(0,ALLP.findIndex(x=>x.p.includes(k)));
const firstOfGroup=gi=>Math.max(0,ALLP.findIndex(x=>x.g===gi));
const relX=(tb,c)=>c.getBoundingClientRect().left-tb.getBoundingClientRect().left+tb.scrollLeft;
const canEd=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own();

/* 화면 만들기 */
function indexHTML(){return `<div class="trih"><h2>구조도</h2><span>보고 싶은 구조도를 고르세요. 옆으로 넘기면 모든 구조도를 차례로 볼 수 있어요.</span></div><div class="trig">${TRG.map((g,i)=>`<section class="trgc" style="--gc:${g.c}"><button type="button" class="trgh" data-trg="${i}"><b>${esc2(g.t)}</b><i>${esc2(g.s)}</i><em>${g.k.length}개</em></button><ol>${g.k.map(k=>`<li><button type="button" data-trg="${i}" data-trk="${k}">${esc2(title(k))}</button></li>`).join('')}</ol></section>`).join('')}</div>`}
function sideHTML(){const ed=canEd();return (ed?'<div class="tsnote">⋮⋮ 끌어서 순서 바꾸기 · <b>⇡</b> 누르면 위 구조도와 한 화면에</div>':'')+TRG.map((g,i)=>`<div class="tsg" data-gi="${i}" style="--gc:${g.c}"><button type="button" class="tsgh" data-trg="${i}">${esc2(g.t)}</button>${g.k.map((k,j)=>{const jn=j>0&&JOIN.has(k);return `<div class="tsr${jn?' tsjoin':''}" data-k="${k}">${ed?'<span class="tsh" data-tsh title="끌어서 옮기기">⋮⋮</span>':''}<button type="button" class="tsk" data-trg="${i}" data-trk="${k}">${esc2(title(k))}</button>${ed&&j>0?`<button type="button" class="tsj${jn?' on':''}" data-tsj="${k}" title="${jn?'따로 보기':'위 구조도와 한 화면에'}">⇡</button>`:''}</div>`}).join('')}</div>`).join('')}
function menuHTML(){return TRG.map((g,i)=>`<div class="trmg" style="--gc:${g.c}"><button type="button" class="trmh" data-trg="${i}">${esc2(g.t)}</button>${g.k.map(k=>`<button type="button" class="trmk" data-trg="${i}" data-trk="${k}">${esc2(title(k))}</button>`).join('')}</div>`).join('')}
window.__TRMENUHTML=menuHTML;
function ensureUI(){const rd=$('trread');if(!rd)return false;
  if(!$('trindex')){const d=document.createElement('div');d.id='trindex';d.className='rin';rd.querySelector('.rhead').after(d);d.addEventListener('click',e=>{const b=e.target.closest('[data-trg]');if(!b)return;openG(+b.dataset.trg,b.dataset.trk||null)})}
  if(!$('trpbar')){const r=rd.querySelector('.rhead .rin');const d=document.createElement('div');d.id='trpbar';r.appendChild(d);
    d.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.tpx!=null)return toIndex();if(b.dataset.tpg!=null)return openG(+b.dataset.tpg);if(b.dataset.tpk!=null)return goPage(+b.dataset.tpk)})}
  if(!$('trside')){const sd=document.createElement('aside');sd.id='trside';$('trbody').before(sd);
    sd.addEventListener('click',e=>{if(e.target.closest('[data-tsh]'))return;const j=e.target.closest('[data-tsj]');if(j){e.preventDefault();toggleJoin(j.dataset.tsj);return}const b=e.target.closest('[data-trg]');if(!b)return;openG(+b.dataset.trg,b.dataset.trk||null)})}
  if(!$('trnavl')){['l','r'].forEach(s=>{const b=document.createElement('button');b.type='button';b.id='trnav'+s;b.className='trnav';b.setAttribute('aria-label',s==='l'?'이전 구조도':'다음 구조도');b.innerHTML=s==='l'?'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>':'<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';b.onclick=()=>goPage(PAGE+(s==='l'?-1:1));rd.appendChild(b)})}
  if(!$('trimp')){const b=document.createElement('button');b.type='button';b.id='trimp';b.innerHTML='+ 구조도 가져오기';($('trpbar')||rd).appendChild(b);const m=document.createElement('div');m.id='trimpm';m.hidden=true;document.body.appendChild(m);
    b.onclick=e=>{e.stopPropagation();if(!m.hidden){m.hidden=true;return}const cur=ALLP[PAGE]?ALLP[PAGE].p:[];m.innerHTML=`<div class="tih">이 화면에 같이 볼 구조도</div>`+TRG.map(g=>`<div class="trmg" style="--gc:${g.c}"><span class="trmh">${esc2(g.t)}</span>${g.k.filter(k=>!cur.includes(k)).map(k=>`<button type="button" class="trmk" data-imp="${k}">${esc2(title(k))}</button>`).join('')}</div>`).join('');const r=b.getBoundingClientRect();m.hidden=false;m.style.top=(r.bottom+6)+'px';m.style.left=Math.max(8,Math.min(innerWidth-m.offsetWidth-8,r.right-m.offsetWidth))+'px'};
    m.addEventListener('click',e=>{const x=e.target.closest('[data-imp]');if(!x)return;m.hidden=true;importTree(x.dataset.imp)});document.addEventListener('click',e=>{if(!m.hidden&&!e.target.closest('#trimpm,#trimp'))m.hidden=true})}
  if(!$('trpgord')){const st=document.createElement('style');st.id='trpgord';st.textContent=Array.from({length:80},(_,n)=>`#trbody.trpg>.trcard[data-po="${n}"]{order:${n}!important}`).join('');document.head.appendChild(st)}
  return true}
let UISIG='';
function renderLists(force){const sig=ORDSIG+'|'+canEd();if(!force&&sig===UISIG&&$('trindex').innerHTML)return;UISIG=sig;$('trindex').innerHTML=indexHTML();$('trside').innerHTML=sideHTML();side()}
function bar(){const d=$('trpbar');if(!d)return;const ib=$('trimp');const gi=G();if(gi<0){d.innerHTML='';if(ib)d.appendChild(ib);return}const g=TRG[gi];
  d.innerHTML=`<button type="button" class="tpx" data-tpx><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>목차</button><span class="tpg" style="--gc:${g.c}">${esc2(g.t)}</span><span class="tpks">${ALLP.map((x,i)=>x.g===gi?`<button type="button" data-tpk="${i}" aria-pressed="${i===PAGE}">${esc2(x.p.map(title).join(' · '))}</button>`:'').join('')}</span><span class="tpgo">${gi>0?`<button type="button" data-tpg="${gi-1}" title="${esc2(TRG[gi-1].t)}">← 이전 묶음</button>`:''}${gi<TRG.length-1?`<button type="button" data-tpg="${gi+1}" title="${esc2(TRG[gi+1].t)}">다음 묶음 →</button>`:''}</span>`;if(ib)d.appendChild(ib)}
function syncOrder(){if(dataSig()!==ORDSIG){const k=ALLP[PAGE]&&ALLP[PAGE].p[0];rebuildOrder();if(k)PAGE=pageOfKey(k);UISIG='';LASTG=-2;return true}return false}
function apply(){const tb=$('trbody');if(!tb||!ensureUI())return;const ch=syncOrder();
  tb.classList.add('trpg');document.body.classList.toggle('trix',IX);document.body.classList.add('trpgon');renderLists();
  const pos=new Map();let n=0;ALLP.forEach(x=>x.p.forEach(k=>pos.set(k,n++)));
  [...tb.children].forEach(c=>{if(!c.classList||!c.classList.contains('trcard'))return;const k=c.id.replace(/^tree-/,'');const on=!IX&&pos.has(k);c.classList.toggle('trpon',on);if(on)c.dataset.po=pos.get(k);else delete c.dataset.po});
  bar();if(!IX)fit(ch);nav()}
function nav(){try{side()}catch(_){}const l=$('trnavl'),r=$('trnavr');if(!l)return;l.hidden=IX||PAGE<=0;r.hidden=IX||PAGE>=ALLP.length-1}
const cardOf=k=>{const tb=$('trbody');return tb&&tb.querySelector('#tree-'+k)};
function cur(){if(IX||!ALLP[PAGE])return null;return cardOf(ALLP[PAGE].p[0])}
const vis=all=>{if(IX)return;ALLP.forEach((x,i)=>x.p.forEach(k=>{const c=cardOf(k);if(c)c.style.visibility=all||i===PAGE?'':'hidden'}))};
function side(){const sd=$('trside');if(!sd||IX||!ALLP[PAGE])return;const pk=ALLP[PAGE].p;const gi=G();sd.querySelectorAll('.tsk').forEach(b=>b.setAttribute('aria-current',pk.includes(b.dataset.trk)?'true':'false'));sd.querySelectorAll('.tsgh').forEach(b=>b.setAttribute('aria-current',+b.dataset.trg===gi?'true':'false'));const c=sd.querySelector('.tsk[aria-current=true]');if(c){const r=c.getBoundingClientRect(),s=sd.getBoundingClientRect();if(r.top<s.top||r.bottom>s.bottom)c.scrollIntoView({block:'center'})}}
let PROG=0,LASTG=-2;
function goPage(i,instant){if(IX)return;PROG=Date.now()+(instant?0:500);PAGE=Math.max(0,Math.min(ALLP.length-1,i));const tb=$('trbody');const c=cur();if(tb&&c){fitNear();vis(true);tb.scrollTo({left:relX(tb,c),behavior:instant?'auto':'smooth'});if(instant)vis(false)}afterMove()}
function afterMove(){const gi=G();if(gi!==LASTG){LASTG=gi;bar()}else{const d=$('trpbar');d&&d.querySelectorAll('[data-tpk]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.tpk===PAGE))}nav()}
function openG(gi,k){if(store&&store.get('view','map')!=='tr'){try{showView('tr')}catch(_){}}IX=false;syncOrder();PAGE=k?pageOfKey(k):firstOfGroup(gi);LASTG=-2;apply();requestAnimationFrame(()=>{goPage(PAGE,true);const rd=$('trread');if(rd)rd.scrollTop=0})}
function toIndex(){IX=true;apply();const rd=$('trread');if(rd)rd.scrollTop=0}
window.__TROPEN=k=>{syncOrder();const i=ALLP.findIndex(x=>x.p.includes(k));if(i>=0)openG(ALLP[i].g,k)};
window.__TRINDEX=()=>toIndex();window.__TROPENG=(i,k)=>openG(i,k);

/* 한 화면에 맞추기 (카드마다 zoom) — 지금 쪽 근처부터, 나머지는 천천히 */
const MINZ=1,MAXZ=1;let GEO={W:0,H:0},FITQ=[],FITT=0,FITGEN=0;
function geo(){const tb=$('trbody'),rd=$('trread');const top=tb.getBoundingClientRect().top-rd.getBoundingClientRect().top;GEO={W:tb.clientWidth,H:Math.max(260,rd.clientHeight-top-12)};tb.style.height=GEO.H+'px'}
function pageW(k){const x=ALLP.find(x=>x.p.includes(k));return Math.floor(GEO.W/(x?x.p.length:1))}
function fitCard(c){const k0=c.id.replace(/^tree-/,'');const x=ALLP.find(x=>x.p.includes(k0))||{p:[k0]};const PW=pageW(k0),PH=GEO.H-4;const mul=Math.max(1,(window.__TRS&&window.__TRS())||1);
  c.style.zoom=1;c.style.height='';c.style.margin='0';c.classList.remove('trscr');c.classList.toggle('trpair2',x.p.indexOf(k0)>0);c.classList.toggle('trmulti',x.p.length>1);
  const iwOf=()=>{const fn=c.querySelector('.tfin');const cr=c.getBoundingClientRect();const z=parseFloat(c.style.zoom)||1;let mx=0;c.querySelectorAll('.hn,.trflow,.trh,.hextra').forEach(e=>{const q=e.getBoundingClientRect();if(q.width)mx=Math.max(mx,q.right-cr.left)});return Math.max(c.scrollWidth+Math.max(0,...[...c.querySelectorAll('.htree,.hchain')].map(e=>e.scrollWidth-e.clientWidth)),fn?fn.offsetWidth+64:0,mx/z+30)};
  const m=w=>{c.style.width=w;return [iwOf(),c.scrollHeight]};
  const best=()=>{let [aw,ah]=m('max-content');let zA=Math.min(MAXZ,PW/aw,PH/ah);let w=PW,zB=1;for(let it=0;it<4;it++){const [iw,ih]=m(w+'px');const nz=Math.min(MAXZ,PW/Math.max(iw,1),PH/Math.max(ih,1));if(Math.abs(nz-zB)<0.01&&it){zB=nz;break}zB=nz;w=Math.max(PW,Math.round(PW/Math.min(1,zB)))}return Math.max(zA,zB)};
  const LC=['vtr','vfit','vauto','uv','uh','ut'];
  if(PREF[k0]&&!c.querySelector('.tfin')){c.classList.remove(...LC);PREF[k0].forEach(x=>c.classList.add(x))}
  /* 모양(가로·세로)은 원래 설정 그대로 */
  const base=Math.max(MINZ,best());c.dataset.fz=base;let zz=Math.max(MINZ,base*mul);
  const set=z=>{c.style.width=Math.round(PW/z)+'px';c.style.zoom=z;c.style.height=Math.round(PH/z)+'px'};set(zz);
  for(let i=0;i<6&&zz>MINZ;i++){if(c.scrollHeight<=c.clientHeight+2&&iwOf()<=c.clientWidth+2)break;zz=Math.max(MINZ,zz*0.94);set(zz)}
  c.querySelectorAll('.hchain>.harr').forEach(a=>{a.style.visibility='';const nx=a.nextElementSibling;if(nx&&!c.classList.contains('uv')&&nx.offsetTop>a.offsetTop+a.offsetHeight)a.style.visibility='hidden'});
  c.classList.toggle('trscr',c.scrollHeight>c.clientHeight+2||c.scrollWidth>c.clientWidth+2);c.dataset.fit='1'}
function placeholder(c){if(c.dataset.fit)return;const k0=c.id.replace(/^tree-/,'');c.style.zoom=1;c.style.width=pageW(k0)+'px';c.style.height=(GEO.H-4)+'px'}
function fit(){const tb=$('trbody');if(!tb||IX||!tb.offsetParent)return;geo();FITGEN++;const cs=[...tb.querySelectorAll(':scope>.trcard.trpon')];cs.forEach(c=>{delete c.dataset.fit;placeholder(c)});fitNear();
  clearTimeout(FITT);const gen=FITGEN;FITQ=ALLP.map((x,i)=>[Math.abs(i-PAGE),x]).sort((a,b)=>a[0]-b[0]).flatMap(y=>y[1].p);
  const tick=()=>{if(gen!==FITGEN||IX)return;const t0=performance.now();while(FITQ.length&&performance.now()-t0<40){const c=cardOf(FITQ.shift());if(c&&!c.dataset.fit)fitCard(c)}if(FITQ.length)FITT=setTimeout(tick,30);else requestAnimationFrame(()=>goPage(PAGE,true))};FITT=setTimeout(tick,30);requestAnimationFrame(()=>goPage(PAGE,true))}
function fitNear(){if(IX||!GEO.W)return;[PAGE-1,PAGE,PAGE+1].forEach(i=>{const x=ALLP[i];if(!x)return;x.p.forEach(k=>{const c=cardOf(k);if(c&&!c.dataset.fit)fitCard(c)})})}
window.__TRFIT=()=>fit();
let LASTC=null;window.addEventListener('pointerdown',e=>{LASTC=e.target.closest&&e.target.closest('#trbody .trcard')},true);
window.__TRZC=()=>{const c=LASTC;return c&&c.style.zoom?(+c.style.zoom||1):1};

/* 손으로 넘기면 쪽 번호 따라가기 */
{let st=0;document.addEventListener('scroll',e=>{const tb=$('trbody');if(e.target!==tb||IX)return;vis(true);clearTimeout(st);st=setTimeout(()=>{if(Date.now()-PROG<350){vis(false);return}const x=tb.scrollLeft;let best=0,bd=1e9;ALLP.forEach((p,i)=>{const c=cardOf(p.p[0]);if(!c)return;const d=Math.abs(relX(tb,c)-x);if(d<bd){bd=d;best=i}});if(best!==PAGE){PAGE=best;fitNear();afterMove()}vis(false)},120)},true)}
window.addEventListener('keydown',e=>{if(IX||$('v-tr').hidden)return;if(e.target.closest&&e.target.closest('input,textarea,[contenteditable]'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goPage(PAGE+(e.key==='ArrowRight'?1:-1),true)}else if(e.key==='Escape')toIndex();else return;e.stopImmediatePropagation()},true);

/* 순서 · 같이 보기 저장 */
function saveOrder(L,J){const M=TRM();if(!M)return;if(L){M.set('@tgo',L);try{window.__MEX.save('T:@tgo',L)}catch(_){}}if(J){M.set('@tjoin',J);try{window.__MEX.save('T:@tjoin',J)}catch(_){}}const keep=ALLP[PAGE]&&ALLP[PAGE].p[0];rebuildOrder();if(keep)PAGE=pageOfKey(keep);UISIG='';LASTG=-2;apply()}
function importTree(k){if(!canEd()||!ALLP[PAGE])return;const cur=ALLP[PAGE];if(cur.p.includes(k))return;if(cur.p.length>=4){try{window.__MEX.toast('한 화면에는 4개까지 볼 수 있어요')}catch(_){}return}const L=TRG.map(g=>g.k.filter(x=>x!==k));const gi=cur.g;const last=cur.p[cur.p.length-1];const idx=L[gi].indexOf(last);L[gi].splice(idx+1,0,k);const J=new Set(JOIN);J.add(k);const keep=cur.p[0];saveOrder(L,[...J]);PAGE=pageOfKey(keep);apply();requestAnimationFrame(()=>goPage(PAGE,true));try{window.__MEX.toast('「'+title(k)+'」을 이 화면에 가져왔어요')}catch(_){}}
function toggleJoin(k){if(!canEd())return;const J=new Set(JOIN);J.has(k)?J.delete(k):J.add(k);saveOrder(null,[...J]);try{window.__MEX.toast(J.has(k)?'위 구조도와 한 화면에 보여요':'따로 보여요')}catch(_){}}
document.addEventListener('pointerdown',e=>{const h=e.target.closest&&e.target.closest('#trside [data-tsh]');if(!h||!canEd())return;e.preventDefault();e.stopPropagation();const row=h.closest('.tsr');const sd=$('trside');const k=row.dataset.k;
  const ghost=row.cloneNode(true);ghost.classList.add('tsghost');document.body.appendChild(ghost);ghost.style.width=row.getBoundingClientRect().width+'px';ghost.style.left=(e.clientX-20)+'px';ghost.style.top=(e.clientY-12)+'px';row.classList.add('tsdrag');
  const mark=document.createElement('div');mark.className='tsmark';let tgt=null;
  const mv=ev=>{ev.preventDefault();ghost.style.left=(ev.clientX-20)+'px';ghost.style.top=(ev.clientY-12)+'px';
    let ins=null;const gh=[...sd.querySelectorAll('.tsg')].find(g=>{const hb=g.querySelector('.tsgh').getBoundingClientRect();return ev.clientY>=hb.top&&ev.clientY<=hb.bottom});
    if(gh){const first=gh.querySelector('.tsr:not(.tsdrag)');ins=first?{before:first}:{end:gh}}
    else{for(const r of sd.querySelectorAll('.tsr:not(.tsdrag)')){const b=r.getBoundingClientRect();if(ev.clientY<b.top+b.height/2){ins={before:r};break}}
      if(!ins){const gs=[...sd.querySelectorAll('.tsg')];ins={end:gs[gs.length-1]}}
      if(ins.before&&ins.before.previousElementSibling&&ins.before.previousElementSibling.classList.contains('tsgh')){const pg=ins.before.closest('.tsg').previousElementSibling;if(pg&&pg.classList.contains('tsg')){const b=ins.before.closest('.tsg').getBoundingClientRect();if(ev.clientY<b.top+4)ins={end:pg}}}}
    tgt=ins;if(ins.before)ins.before.before(mark);else ins.end.appendChild(mark);
    const sb=sd.getBoundingClientRect();if(ev.clientY<sb.top+30)sd.scrollTop-=10;else if(ev.clientY>sb.bottom-30)sd.scrollTop+=10};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);ghost.remove();row.classList.remove('tsdrag');mark.remove();
    if(tgt){const L=TRG.map(g=>g.k.filter(x=>x!==k));let gi,idx;if(tgt.before){gi=+tgt.before.closest('.tsg').dataset.gi;idx=L[gi].indexOf(tgt.before.dataset.k)}else{gi=+tgt.end.dataset.gi;idx=L[gi].length}if(idx<0)idx=L[gi].length;L[gi].splice(idx,0,k);saveOrder(L,null);try{window.__MEX.toast('순서를 바꿨어요')}catch(_){}}};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
new MutationObserver(()=>{if($('trside')&&document.body.classList.contains('trpgon')){const s=ORDSIG+'|'+canEd();if(s!==UISIG)renderLists()}}).observe(document.body,{attributes:true,attributeFilter:['class']});

/* 기존 함수에 연결 */
{const t0=trPack;trPack=function(){const r=t0.apply(this,arguments);try{if(store.get('view','map')==='tr'){apply()}}catch(_){}return r}}
{const sv=showView;showView=function(v){const r=sv.apply(this,arguments);if(v==='tr'||v==='tp'){requestAnimationFrame(()=>{try{apply()}catch(_){}})}else{document.body.classList.remove('trpgon','trix')}return r}}
let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!IX)fit()},250)});
{const m=document.createElement('div');m.id='trmenu';m.hidden=true;m.innerHTML=menuHTML();document.body.appendChild(m)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-tj]');if(!b||!document.body.classList.contains('trpgon'))return;const k=b.dataset.tj;if(ALLP.some(x=>x.p.includes(k))){e.preventDefault();e.stopImmediatePropagation();window.__TROPEN(k)}},true);
if(store.get('view','map')==='tr')setTimeout(()=>{try{apply()}catch(_){}},50);
}
