
/* ───────── 연대표: 고치기 모드에서 옮기기 · 형광펜 길이 · 세로줄 길이 ───────── */
{
const $=id=>document.getElementById(id);
const TRM=()=>window.__ME&&window.__ME.tr;
const can=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own()&&!$('v-ov').hidden;
const keyOf=el=>el.dataset.ovk||keyOf0(el);
const keyOf0=el=>{if(el.matches('.hzn'))return 'n'+el.dataset.ev;if(el.matches('.hznt')){const b=el.querySelector('[data-ev]');return b?'t'+b.dataset.ev:'t'+(el.textContent||'').trim().slice(0,20)}if(el.matches('.hzrg'))return 'r'+el.dataset.rg;if(el.matches('.hzld')){const n=el.nextElementSibling;return n&&n.dataset.ev?'l'+n.dataset.ev:null}return null};
const get=k=>{const M=TRM();return (M&&M.get('@ov:'+k))||null};
const put=(k,v)=>{const M=TRM();if(!M)return;M.set('@ov:'+k,v);try{window.__MEX.save('T:@ov:'+k,v)}catch(_){}};
const SEL='#v-ov .hzn,#v-ov .hznt,#v-ov .hzrg,#v-ov .hzld';
function applyAll(){const ed=can();const seen={};document.querySelectorAll(SEL).forEach(el=>{const k0=keyOf0(el);if(!k0)return;const nn=seen[k0]=(seen[k0]||0)+1;const k=nn>1?k0+'#'+nn:k0;el.dataset.ovk=k;const v=get(k);
  if(el.dataset.ow==null)el.dataset.ow=el.style.width||'';if(el.dataset.oh==null)el.dataset.oh=el.style.height||'';
  el.style.translate=v&&(v.x||v.y)?`${v.x||0}px ${v.y||0}px`:'';
  if(el.matches('.hzrg'))el.style.width=v&&v.w?v.w+'px':el.dataset.ow;
  if(el.matches('.hzld'))el.style.height=v&&v.h?v.h+'px':el.dataset.oh;
  let g=el.querySelector(':scope>.ovgrip');if(ed&&!g&&(el.matches('.hzrg')||el.matches('.hzld'))){el.insertAdjacentHTML('beforeend',`<ovg class="ovgrip ${el.matches('.hzld')?'ovgv':'ovgh'}" title="${el.matches('.hzld')?'세로줄 길이':'길이'}"></ovg>`)}else if(!ed&&g)g.remove()});
  document.body.classList.toggle('ovedit',ed)}
let t=0;const sched=()=>{const v=$('v-ov');if(!v||v.hidden)return;clearTimeout(t);t=setTimeout(applyAll,80)};
new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&!n.classList.contains('ovgrip'))))sched()}).observe(document.body,{childList:true,subtree:true});
new MutationObserver(sched).observe(document.body,{attributes:true,attributeFilter:['class']});
setTimeout(applyAll,500);
/* 끌기 */
document.addEventListener('pointerdown',e=>{if(!can())return;const t=e.target;if(!t.closest||t.closest('[contenteditable]'))return;const grip=t.closest('.ovgrip');const el=t.closest(SEL);if(!el)return;if(e.button!==0&&e.pointerType==='mouse')return;const k=keyOf(el);if(!k)return;
  const v0=Object.assign({},get(k)||{});const x0=e.clientX,y0=e.clientY;let st=false;const w0=el.offsetWidth,h0=el.offsetHeight;
  if(grip){e.preventDefault();e.stopPropagation()}
  const mv=ev=>{const dx=ev.clientX-x0,dy=ev.clientY-y0;if(!st){if(!grip&&Math.abs(dx)+Math.abs(dy)<6)return;st=true;el.classList.add('ovdrag');try{getSelection().removeAllRanges()}catch(_){}}ev.preventDefault();
    if(grip&&el.matches('.hzld')){const h=Math.max(4,Math.round(h0+dy));el.style.height=h+'px';v0.h=h}
    else if(grip){const w=Math.max(20,Math.round(w0+dx));el.style.width=w+'px';v0.w=w}
    else{const nx=Math.round((get(k)||{}).x||0)+Math.round(dx),ny=Math.round((get(k)||{}).y||0)+Math.round(dy);el.style.translate=`${nx}px ${ny}px`;v0.x=nx;v0.y=ny}};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);if(!st)return;el.classList.remove('ovdrag');put(k,v0);const kill=ev=>{ev.preventDefault();ev.stopImmediatePropagation();removeEventListener('click',kill,true)};addEventListener('click',kill,true);setTimeout(()=>removeEventListener('click',kill,true),60)};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
/* 고치기 모드에서는 눌러도 다른 곳으로 가지 않음 (글씨 고치기만) */
window.addEventListener('click',e=>{if(!can())return;const b=e.target.closest&&e.target.closest('#v-ov [data-ev],#v-ov [data-grp],#v-ov [data-tip],#v-ov .hzrg');if(!b)return;if(e.target.closest('[contenteditable],.hzn>span,.hznt button,.hznt span,.hzrg>span'))return;e.preventDefault();e.stopImmediatePropagation()},true);
}

/* 고치는 중 Tab = 띄어쓰기 4칸 */
document.addEventListener('keydown',e=>{if(e.key!=='Tab'||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey)return;const a=document.activeElement;if(!a||!a.isContentEditable||a.closest('.hadd'))return;e.preventDefault();e.stopPropagation();try{document.execCommand('insertText',false,'    ')}catch(_){}},true);

/* 구조도 고치는 중: 옆으로 넘어가지 않게 + 상자 놓을 때 화면이 튀지 않게 */
{
const ed=()=>document.body.classList.contains('medit');
let LK=null;
const snap=()=>{const tb=document.getElementById('trbody');const rd=document.getElementById('trread');const c=LK&&LK.c;return {tb,rd,c,tl:tb&&tb.scrollLeft,tt:tb&&tb.scrollTop,rl:rd&&rd.scrollTop,cl:c&&c.scrollLeft,ct:c&&c.scrollTop}};
const restore=s=>{if(!s)return;if(s.tb){if(s.tb.scrollLeft!==s.tl)s.tb.scrollLeft=s.tl;if(s.tb.scrollTop!==s.tt)s.tb.scrollTop=s.tt}if(s.rd&&s.rd.scrollTop!==s.rl)s.rd.scrollTop=s.rl;if(s.c){if(s.c.scrollLeft!==s.cl)s.c.scrollLeft=s.cl;if(s.c.scrollTop!==s.ct)s.c.scrollTop=s.ct}};
document.addEventListener('pointerdown',e=>{if(!ed())return;const t=e.target;if(!t.closest)return;const c=t.closest('#trbody .trcard');if(!c||!t.closest('.hn,.trflow,.trh,[data-trgrip],[data-trmv]'))return;if(t.closest('[contenteditable]'))return;LK={c};LK.s=snap();
  const hold=()=>{if(LK&&LK.c===c){restore(LK.s);LK.raf=requestAnimationFrame(hold)}};LK.raf=requestAnimationFrame(hold)},true);
const end=()=>{if(!LK)return;const s=LK.s;cancelAnimationFrame(LK.raf);LK=null;const t0=Date.now();const keep=()=>{restore(s);if(Date.now()-t0<900)requestAnimationFrame(keep)};keep()};
addEventListener('pointerup',end,true);addEventListener('pointercancel',end,true);
/* 끄는 중 다른 곳 스크롤로 밀리지 않게, 손으로 넘기기도 막기 */
addEventListener('wheel',e=>{if(!ed())return;const tb=document.getElementById('trbody');if(!tb||!tb.contains(e.target))return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){const c=e.target.closest('.trcard');if(c&&c.scrollWidth>c.clientWidth+2)return;e.preventDefault()}},{passive:false,capture:true});
}

/* 구조도 상자 여러 개 고르기: Shift(또는 Ctrl/⌘)+누르기, 빈 곳 끌어서 네모로 고르기 → 하나 끌면 같이 움직임 */
{
const can=()=>window.__MEX&&window.__MEX.can&&window.__MEX.can();
const clear=()=>document.querySelectorAll('.hn.hnsel').forEach(o=>o.classList.remove('hnsel'));
const killClick=()=>{const k=ev=>{ev.preventDefault();ev.stopImmediatePropagation();removeEventListener('click',k,true)};addEventListener('click',k,true);setTimeout(()=>removeEventListener('click',k,true),400)};
document.addEventListener('pointerdown',e=>{if(!can()||e.button!==0)return;const t=e.target;if(!t.closest)return;
  const n=t.closest('#trbody .hn');
  if(n&&(e.shiftKey||e.metaKey||e.ctrlKey)&&!t.closest('button,.hngrip,[contenteditable]')){e.preventDefault();e.stopImmediatePropagation();const c=n.closest('.trcard');document.querySelectorAll('.hn.hnsel').forEach(o=>{if(o.closest('.trcard')!==c)o.classList.remove('hnsel')});n.classList.toggle('hnsel');killClick();return}
  if(n)return;
  const c=t.closest('#trbody .trcard');if(!c||!c.querySelector('.tfin,.htree,.hchain'))return;if(t.closest('button,input,textarea,[contenteditable],.trut,.trflow,.trh,.trsplit,.trgrip,.hnbar,a,.hjw,.tflh'))return;
  const r0=c.getBoundingClientRect();if(e.clientX>r0.right-16||e.clientY>r0.bottom-16)return;
  const x0=e.clientX,y0=e.clientY,add=e.shiftKey||e.metaKey||e.ctrlKey;let band=null;
  const mv=ev=>{const dx=ev.clientX-x0,dy=ev.clientY-y0;if(!band){if(Math.abs(dx)+Math.abs(dy)<6)return;band=document.createElement('div');band.id='hnband';document.body.appendChild(band);try{getSelection().removeAllRanges()}catch(_){}}ev.preventDefault();
    const L=Math.min(x0,ev.clientX),T=Math.min(y0,ev.clientY),W=Math.abs(dx),H=Math.abs(dy);Object.assign(band.style,{left:L+'px',top:T+'px',width:W+'px',height:H+'px'});
    c.querySelectorAll('.hn').forEach(o=>{if(o.style.display==='none'||!o.offsetParent)return;const q=o.getBoundingClientRect();const hit=q.left<L+W&&q.right>L&&q.top<T+H&&q.bottom>T;if(hit)o.classList.add('hnsel');else if(!add&&!o.dataset.keep)o.classList.remove('hnsel')})};
  if(add)c.querySelectorAll('.hn.hnsel').forEach(o=>o.dataset.keep='1');
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);c.querySelectorAll('[data-keep]').forEach(o=>delete o.dataset.keep);if(band){band.remove();killClick();const k=c.querySelectorAll('.hn.hnsel').length;if(k&&window.__MEX.toast)window.__MEX.toast(k+'개 골랐어요 · 하나를 끌면 같이 움직여요')}else if(!add)clear()};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')clear()},true);
/* 상자의 빈(흰) 부분을 누르면 고르기/빼기 (글씨를 누르면 그대로 고치기) */
const onText=(x,y)=>{let node=null,off=0;if(document.caretRangeFromPoint){const r=document.caretRangeFromPoint(x,y);if(r){node=r.startContainer;off=r.startOffset}}else if(document.caretPositionFromPoint){const r=document.caretPositionFromPoint(x,y);if(r){node=r.offsetNode;off=r.offset}}if(!node||node.nodeType!==3)return false;const L=node.nodeValue.length;for(const o of [off-1,off]){if(o<0||o>=L)continue;const rg=document.createRange();rg.setStart(node,o);rg.setEnd(node,o+1);for(const q of rg.getClientRects()){if(x>=q.left-2&&x<=q.right+2&&y>=q.top-1&&y<=q.bottom+1)return true}}return false};
window.addEventListener('click',e=>{if(!can())return;const t=e.target;if(!t.closest)return;const n=t.closest('#trbody .hn');if(!n||t.closest('button,.hngrip,.hnbar,[contenteditable],input,textarea'))return;if(t!==n&&onText(e.clientX,e.clientY))return;e.preventDefault();e.stopImmediatePropagation();const c=n.closest('.trcard');document.querySelectorAll('.hn.hnsel').forEach(o=>{if(o.closest('.trcard')!==c)o.classList.remove('hnsel')});n.classList.toggle('hnsel')},true);
new MutationObserver(()=>{if(!document.body.classList.contains('medit'))clear()}).observe(document.body,{attributes:true,attributeFilter:['class']});
}

/* 사진: 자료가 새로 들어와 글이 다시 그려져도, 이미 불러온 사진을 그대로 다시 써서 깜빡이지 않게 */
{
const IMC=new Map();
const take=im=>{const f=im.closest&&im.closest('figure.mimg');if(!f)return;const id=f.dataset.img;if(!id)return;const old=IMC.get(id);
  if(old&&old!==im&&!old.isConnected&&old.complete&&old.naturalWidth&&old.getAttribute('src')===im.getAttribute('src')){old.alt=im.alt;im.replaceWith(old);return}
  IMC.set(id,im)};
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!==1)continue;if(n.tagName==='IMG')take(n);else if(n.querySelectorAll)n.querySelectorAll('figure.mimg img').forEach(take)}}).observe(document.body,{childList:true,subtree:true});
}

/* 용어 사전: 인물 빼고 보기 */
{
let on=false;try{on=localStorage.getItem('hgs_dcnop')==='1'}catch(_){}
const sync=()=>{const b=document.getElementById('dcbody');if(!b)return;b.classList.toggle('nop',on);const c=document.getElementById('dcnopcb');if(c&&c.checked!==on)c.checked=on;b.querySelectorAll('h4.gh').forEach(h=>{const dl=h.nextElementSibling;const any=dl&&[...dl.children].some(x=>!(on&&x.classList.contains('gp')));h.style.display=any?'':'none';if(dl)dl.style.display=any?'':'none'})};
document.addEventListener('change',e=>{if(e.target&&e.target.id==='dcnopcb'){on=e.target.checked;try{localStorage.setItem('hgs_dcnop',on?'1':'0')}catch(_){}sync()}},true);
let tq=0;new MutationObserver(()=>{clearTimeout(tq);tq=setTimeout(()=>{if(document.getElementById('dcnopcb'))sync()},200)}).observe(document.body,{childList:true});setInterval(()=>{const b=document.getElementById('dcbody');if(b&&b.dataset.built&&!b.dataset.nops){b.dataset.nops=1;sync()}},800);
}

/* 문화유산 시기별: 시대 제목 크게(옆에 연도 작게) + 아래 3개씩 네모 카드 */
{
const SUB={'구석기':'약 70만 년 전 ~ 기원전 8000년경','신석기':'기원전 8000년경 ~ 기원전 2000년경','청동기':'기원전 2000년경 ~','철기':'기원전 5세기경 ~'};
const subOf=t=>{const m=String(t).match(/구석기|신석기|청동기|철기/);return m?m[0]:''};
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function tf(){document.querySelectorAll('#v-rl section.rltle').forEach(sec=>{const ol=sec.querySelector(':scope>ol.rltl');if(!ol||sec.dataset.g3)return;sec.dataset.g3=1;sec.classList.add('rlg3s');
  const lis=[...ol.children];const wrap=document.createElement('div');wrap.className='rlg3w';let cur=null,key=null;
  lis.forEach(li=>{const ry=li.querySelector('.ry');const row=li.querySelector('.rlrow');if(!row)return;const lab=ry?ry.textContent:'';const rk=row.querySelector('.rk');let k=subOf(lab);if(!k){const m=lab.match(/(?:BC|기원전)\s*([\d,]+)/);if(m&&key){const y=-parseInt(m[1].replace(/,/g,''));k=y<-8000?'구석기':y<-2000?'신석기':'청동기'}else if(key&&!/\d/.test(lab))k=key;else k=subOf((row.querySelector('.rd')||{}).textContent||'')&&key?subOf(row.querySelector('.rd').textContent):''}
    if(k!==key||!cur){key=k;if(k){const h=document.createElement('h4');h.className='rlsub';h.innerHTML=`${E(k)} 시대<span>${E(SUB[k]||'')}</span>`;wrap.appendChild(h)}cur=document.createElement('div');cur.className='rlg3';wrap.appendChild(cur)}
    const card=document.createElement('div');card.className='rlc3';card.style.cssText=li.getAttribute('style')||'';if(lab){const s=document.createElement('span');s.className='rlc3y';s.textContent=lab;card.appendChild(s)}card.appendChild(row);cur.appendChild(card)});
  ol.replaceWith(wrap)})}
let t=0;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(tf,60)}).observe(document.body,{childList:true,subtree:true});setTimeout(tf,800);
}

/* 구조도 선 옮기기: 고치기 모드에서 선을 끌면 꺾이는 자리가 옮겨짐 */
{
document.addEventListener('pointerdown',e=>{const t=e.target;if(!t.classList||!t.classList.contains('tflh'))return;if(!(window.__MEX&&window.__MEX.can&&window.__MEX.can()))return;e.preventDefault();e.stopPropagation();
  const c=t.closest('.trcard');const k=c.id.replace(/^tree-/,'');const key=t.dataset.e,ax=t.dataset.ax,sg=+t.dataset.sg||1;const M=window.__ME.tr;const LO=Object.assign({},M.get('@lo:'+k)||{});const lv=LO[key];const v0=Array.isArray(lv)?(+lv[0]||0):(+lv||0),w0=Array.isArray(lv)?(+lv[1]||0):0,shp0=Array.isArray(lv)?(+lv[2]||0):0;const X0=e.clientX,Y0=e.clientY;
  const z=(()=>{const r=c.querySelector('.tfin').getBoundingClientRect();const w=c.querySelector('.tfin').offsetWidth;return w?r.width/w:1})();document.body.classList.add('tflmoving');
  const midOf=pth=>{const d=pth.getAttribute('d')||'';const m=ax==='x'?d.match(/H\s*(-?[\d.]+)/):d.match(/V\s*(-?[\d.]+)/);return m?+m[1]:null};
  const targets=[...c.querySelectorAll('svg.tfl path.tflh')].filter(q=>q.dataset.e!==key&&q.dataset.ax===ax).map(midOf).filter(v=>v!=null);
  const mv=ev=>{ev.preventDefault();const dx=(ev.clientX-X0)/z,dy=(ev.clientY-Y0)/z;const d1=(ax==='x'?dx:dy)*sg,d2=ax==='x'?dy:dx;let o1=Math.round(v0+d1),o2=Math.round(w0+d2);if(Math.abs(o2)<7)o2=0;LO[key]=[o1,o2,shp0];if(shp0===3){const par=key.split('-')[0];Object.keys(LO).forEach(e=>{if(e!==key&&e.split('-')[0]===par&&Array.isArray(LO[e])&&+LO[e][2]===3)LO[e]=[o1,+LO[e][1]||0,3]})}M.set('@lo:'+k,Object.assign({},LO));try{window.__DRAWLINES(c)}catch(_){}
    /* 자석: 다른 선의 꺾인 자리(ㅗ·[ 모양)와 가까우면 딱 맞춤 */
    const me=c.querySelector('svg.tfl path.tflh[data-e="'+key+'"]');const cur=me&&midOf(me);if(cur!=null&&targets.length){let best=null;targets.forEach(t=>{if(Math.abs(t-cur)<9&&(best==null||Math.abs(t-cur)<Math.abs(best-cur)))best=t});if(best!=null&&best!==cur){o1+=Math.round((best-cur)*sg);LO[key]=[o1,o2,shp0];M.set('@lo:'+k,Object.assign({},LO));try{window.__DRAWLINES(c)}catch(_){}}}
    c.querySelectorAll('svg.tfl path.tflh.snap').forEach(q=>q.classList.remove('snap'));const me2=c.querySelector('svg.tfl path.tflh[data-e="'+key+'"]');if(me2){const v=midOf(me2);c.querySelectorAll('svg.tfl path.tflh').forEach(q=>{if(q!==me2&&q.dataset.ax===ax&&midOf(q)===v)q.classList.add('snap')})}};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);document.body.classList.remove('tflmoving');c.querySelectorAll('svg.tfl path.tflh.snap').forEach(q=>q.classList.remove('snap'));const v=Object.assign({},M.get('@lo:'+k)||{});try{window.__MEX.save('T:@lo:'+k,v)}catch(_){}};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
new MutationObserver(()=>{document.querySelectorAll('#trbody .trcard .tfin').forEach(f=>{const has=!!f.querySelector('.tflh');if(has!==document.body.classList.contains('medit')){try{window.__DRAWLINES(f.closest('.trcard'))}catch(_){}}})}).observe(document.body,{attributes:true,attributeFilter:['class']});
}

/* 고치기 모드에서 구조도에 손을 대면 선을 잡을 수 있게 미리 준비 */
{const prep=e=>{if(!document.body.classList.contains('medit'))return;const c=e.target.closest&&e.target.closest('#trbody .trcard');if(!c||c.dataset.lprep)return;c.dataset.lprep=1;try{window.__TRPREP&&window.__TRPREP(c)}catch(_){}};
 document.addEventListener('pointerover',prep,true);document.addEventListener('touchstart',prep,{capture:true,passive:true});
 new MutationObserver(()=>{if(!document.body.classList.contains('medit'))document.querySelectorAll('#trbody .trcard[data-lprep]').forEach(c=>delete c.dataset.lprep)}).observe(document.body,{attributes:true,attributeFilter:['class']})}

/* 화면이 위로 튀지 않게: 자료가 새로 들어와 다시 그려져도, 같은 화면이면 보고 있던 스크롤 자리를 그대로 */
{
const REC=new Map();let lastIn=0,lastMut=0;const now=()=>performance.now();
const ident=el=>{const h=el.querySelector('.kph h1,.trh h3,.trh h2,h1,h2');return el.id+'|'+(h?h.textContent.trim().slice(0,60):'')};
['wheel','touchmove','touchstart'].forEach(t=>addEventListener(t,()=>{lastIn=now()},{capture:true,passive:true}));
addEventListener('keydown',e=>{const a=document.activeElement;if(a&&(a.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(a.tagName)))return;if(/Page|Arrow|Home|End|^ $/.test(e.key))lastIn=now()},true);
addEventListener('pointerdown',e=>{const t=e.target;if(t&&t.id&&t.scrollHeight>t.clientHeight)lastIn=now();if(t&&t.closest&&t.closest('button,a,[data-rj],[data-pj],[data-tpg],[data-tpk],[data-trg],[data-trk],[data-kgn],[data-mv]'))lastIn=now()},true);
document.addEventListener('scroll',e=>{const el=e.target;if(!el||el.nodeType!==1||!el.id)return;if(now()-lastMut<200&&now()-lastIn>250)return;REC.set(el.id,{top:el.scrollTop,left:el.scrollLeft,id:ident(el)})},true);
const dirty=new Set();let raf=0;
const fix=()=>{raf=0;dirty.forEach(id=>{const el=document.getElementById(id);const r=REC.get(id);if(!el||!r)return;if(now()-lastIn<300)return;if(ident(el)!==r.id)return;if(Math.abs(el.scrollTop-r.top)>4)el.scrollTop=r.top;if(Math.abs(el.scrollLeft-r.left)>4)el.scrollLeft=r.left});};
const later=()=>{const ids=[...dirty];dirty.clear();ids.forEach(i=>dirty.add(i));fix();[60,250,700].forEach(ms=>setTimeout(()=>{ids.forEach(i=>dirty.add(i));fix();dirty.clear()},ms))};
new MutationObserver(ms=>{let hit=false;for(const m of ms){if(!m.removedNodes.length)continue;let p=m.target;while(p&&p.nodeType===1){if(p.id&&REC.has(p.id)){dirty.add(p.id);hit=true}p=p.parentElement}}if(hit){lastMut=now();if(!raf)raf=requestAnimationFrame(later)}}).observe(document.body,{childList:true,subtree:true});
}

/* 고치는 중 글칸에 들어갈 때 화면이 끌려 올라가지 않게 */
{const of=HTMLElement.prototype.focus;HTMLElement.prototype.focus=function(o){try{if(document.body.classList.contains('medit')&&(this.isContentEditable||(this.closest&&this.closest('#trbody,#v-ov,#kpage,.evd,#dcbody,#ppbody'))))return of.call(this,Object.assign({preventScroll:true},o||{}))}catch(_){}return of.call(this,o)};
 /* 앱 화면은 창 자체가 스크롤되지 않음: 글자판이 안 떠 있는데 창이 밀리면 제자리로 */
 const kb=()=>{const v=window.visualViewport;return v&&v.height<innerHeight-120};
 addEventListener('scroll',()=>{const se=document.scrollingElement||document.documentElement;if(se.scrollTop>0&&!kb())se.scrollTop=0},{passive:true});
 if(window.visualViewport)visualViewport.addEventListener('resize',()=>{if(!kb()){const se=document.scrollingElement||document.documentElement;if(se.scrollTop>0)se.scrollTop=0}});
}

/* 구조도 고치는 중: 내가 스크롤하지 않았는데 화면(구조도 칸·전체)이 움직이면 그 자리로 되돌림 */
{
let lastU=0;const now=()=>performance.now();const mark=()=>{lastU=now()};
['wheel','touchmove','touchend'].forEach(t=>addEventListener(t,mark,{capture:true,passive:true}));
addEventListener('keydown',e=>{const a=document.activeElement;if(a&&(a.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(a.tagName)))return;if(/Page|Arrow|Home|End|^ $/.test(e.key))mark()},true);
addEventListener('pointerdown',e=>{const t=e.target;if(!t||!t.closest)return;if(t.closest('#trside,#trpbar,#trnavl,#trnavr,.trnav,#trindex,[data-tpg],[data-tpk],[data-tsj],#trimpm,[data-tj]'))window.__trnavT=now();if((t.id&&t.scrollHeight>t.clientHeight)||t.closest('#trside,#trpbar,#trnavl,#trnavr,.trnav,#trindex,[data-tpg],[data-tpk],[data-tsj],nav,header,.tabs,#menupop'))mark()},true);
addEventListener('click',e=>{const t=e.target;if(t&&t.closest&&t.closest('#trside,#trpbar,#trnavl,#trnavr,.trnav,#trimpm'))window.__trnavT=now()},true);
addEventListener('keydown',e=>{if(/^Arrow(Left|Right)$|^Page/.test(e.key))window.__trnavT=now()},true);
const on=()=>document.body.classList.contains('medit')&&document.body.classList.contains('trpgon');
const POS=new WeakMap();const keyEl=el=>el===document?document.scrollingElement||document.documentElement:el;
const rec=el=>POS.set(el,[el.scrollTop,el.scrollLeft]);
document.addEventListener('scroll',e=>{const el=keyEl(e.target);if(!el||el.nodeType!==1)return;if(!(el.id==='trbody'||el.id==='trread'||el===document.scrollingElement||el.classList.contains('trcard')))return;
  if(on()&&el.id==='trbody'){const p=POS.get(el);const nav=now()-(window.__trnavT||-1e9)<1500;if(nav||!p){rec(el);return}if(Math.abs(el.scrollLeft-p[1])>2){el.scrollLeft=p[1]}if(Math.abs(el.scrollTop-p[0])>2)el.scrollTop=p[0];return}
  if(!on()||now()-lastU<1300){rec(el);return}const p=POS.get(el);if(!p){rec(el);return}if(Math.abs(el.scrollTop-p[0])>2||Math.abs(el.scrollLeft-p[1])>2){el.scrollTop=p[0];el.scrollLeft=p[1]}},true);
new MutationObserver(()=>{if(on()){['trbody','trread'].forEach(id=>{const el=document.getElementById(id);if(el)rec(el)});document.querySelectorAll('#trbody>.trcard').forEach(rec);rec(document.scrollingElement||document.documentElement)}}).observe(document.body,{attributes:true,attributeFilter:['class']});
}

/* 용어 사전에서만 인물 빼기 (인물 사전에는 그대로) */
{
const TRM=()=>window.__ME&&window.__ME.tr;const HID=()=>{const M=TRM();const v=M&&M.get('@dch');return new Set(Array.isArray(v)?v:[])};
const ed=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own();
const keyOfGp=g=>{const b=g.querySelector('.gpn');return g.dataset.k||(b&&(b.dataset.person||b.textContent.trim()))||''};
let busy=false;function deco(){const b=document.getElementById('dcbody');if(!b||busy)return;busy=true;const H=HID();const E=ed();
  b.querySelectorAll('.gl2>.gp').forEach(g=>{const k=keyOfGp(g);const h=H.has(k);g.classList.toggle('dchid',h);let x=g.querySelector(':scope>dt>.dchbtn');if(E){if(!x){g.querySelector('dt')?.insertAdjacentHTML('beforeend','<button type="button" class="dchbtn"></button>');x=g.querySelector(':scope>dt>.dchbtn')}if(x){x.textContent=h?'사전에 다시 넣기':'사전에서 빼기';x.dataset.k=k}}else if(x)x.remove()});busy=false}
document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('#dcbody .dchbtn');if(!x)return;e.preventDefault();e.stopImmediatePropagation();const M=TRM();if(!M)return;const H=HID();const k=x.dataset.k;if(H.has(k))H.delete(k);else H.add(k);const v=[...H];M.set('@dch',v);try{window.__MEX.save('T:@dch',v)}catch(_){}deco();try{window.__MEX.toast(H.has(k)?'「'+k+'」 용어 사전에서 뺐어요 (인물 사전엔 그대로)':'다시 넣었어요')}catch(_){}},true);
let t=0;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(deco,150)}).observe(document.body,{attributes:true,attributeFilter:['class']});
const wait=()=>{const b=document.getElementById('dcbody');if(!b)return setTimeout(wait,800);new MutationObserver(()=>{clearTimeout(t);t=setTimeout(deco,150)}).observe(b,{childList:true});deco()};wait();
}

/* 선 모양 바꾸기: 선을 두 번 누르면 기본 → ㄱ(옆으로 나가서 내려감) → ㄴ(내려가서 옆으로) 차례로 */
{let lastT=0,lastE='';const cyc=t=>{const c=t.closest('.trcard');const k=c.id.replace(/^tree-/,'');const key=t.dataset.e;const M=window.__ME.tr;const LO=Object.assign({},M.get('@lo:'+k)||{});const lv=LO[key];const cur=Array.isArray(lv)?(+lv[2]||0):0;const nx=(cur+1)%4;const par=key.split('-')[0];const sibs=[...c.querySelectorAll('svg.tfl path.tflh')].map(q=>q.dataset.e).filter(e=>e.split('-')[0]===par);sibs.forEach(e=>{LO[e]=[0,0,nx]});LO[key]=[0,0,nx];M.set('@lo:'+k,LO);try{window.__DRAWLINES(c)}catch(_){}try{window.__MEX.save('T:@lo:'+k,LO)}catch(_){}try{window.__MEX.toast(['기본 모양','ㄱ 모양 (옆으로 나가서 꺾임)','ㄴ 모양 (내려가서 꺾임)','모 모양 (아래로 내려와서 갈라짐 · 가로줄을 끌어 높이 조절)'][nx]+' · 같은 상자에서 나간 선 모두')}catch(_){}};
 document.addEventListener('dblclick',e=>{const t=e.target;if(!t.classList||!t.classList.contains('tflh'))return;e.preventDefault();e.stopPropagation();cyc(t)},true);
 document.addEventListener('pointerup',e=>{const t=e.target;if(e.pointerType!=='touch'||!t.classList||!t.classList.contains('tflh'))return;const n=performance.now();if(n-lastT<350&&lastE===t.dataset.e){cyc(t);lastT=0}else{lastT=n;lastE=t.dataset.e}},true)}

/* 사건 모아보기: 연도 옆 세로 색줄 = 그 사건의 나라 (이름 없이 색만) */
{
const NC=n=>{try{return (window.NAT_COL&&NAT_COL[n])||(typeof NAT_COL!=='undefined'&&NAT_COL[n])||''}catch(_){return ''}};
const ST={goguryeo:'고구려',baekje:'백제',silla:'신라',gaya:'가야',balhae:'발해'};
function natOf(e){if(!e)return '';const t=(e.st||'')+' '+e.t+' '+(e.vs||'');const T=e.T;
  if(/북한/.test(t)&&T>1945)return '북한';
  for(const n of ['고구려','백제','신라','가야','발해','후고구려','후백제','고려','조선','대한제국'])if((e.st||'').includes(n))return n==='대한제국'?'대한제국':n;
  try{const h=typeof hzSt==='function'?hzSt(e):'';if(h&&ST[h])return ST[h]}catch(_){}
  if(T<-2333)return '';if(T<=-108||(T<0&&/고조선|위만/.test(t)))return '고조선';if(T<676){for(const n of ['고구려','백제','신라','가야','부여'])if(t.includes(n))return n;return ''}
  if(T<936.9){if(/발해/.test(t))return '발해';if(/후백제|견훤/.test(t))return '후백제';if(/후고구려|태봉|궁예/.test(t))return '후고구려';if(T>=918.5&&/고려|왕건/.test(t))return '고려';return '신라'}
  if(T<1392.55)return '고려';if(T<1897.8)return '조선';if(T<1910.66)return '대한제국';if(T<1945.62)return '일제강점기';return '대한민국'}
const LIFE=[['고조선',-2333,-108,0,1],['신라',-57,935,1,1],['고구려',-37,668,2,1],['백제',-18,660,3,1],['가야',42,562,4,1],['발해',698,926,2,1],['후백제',900,936,3,1],['후고구려',901,918,4,1],['고려',918.5,1392.5,0,1],['조선',1392.55,1897.8,0,0],['대한제국',1897.8,1910.66,0,1],['일제강점기',1910.66,1945.62,0,0],['대한민국',1948.6,9999,0,0],['북한',1948.7,9999,1,0]];
let q=0;function run(){q=0;document.querySelectorAll('#v-tl ol.tl,#v-map.listonly #pbody ul.elist').forEach(run1);document.querySelectorAll('#v-map:not(.listonly) #pbody ul.elist[data-nbn]').forEach(u=>{delete u.dataset.nbn})}function run1(ol){const byId=window.__EVBYID||(window.__EVBYID=new Map(EVENTS.map(e=>[String(e.id),e])));
  const L=[...ol.querySelectorAll(':scope>li')];const sg=L.length+'|'+(L[0]&&L[0].dataset.id||'')+'|'+(L[L.length-1]&&L[L.length-1].dataset.id||'');if(ol.dataset.nbn===sg)return;ol.dataset.nbn=sg;
  const act=T=>T==null?null:LIFE.filter(x=>T>=x[1]&&T<x[2]+(x[2]%1?0.05:1));
  const sets=L.map(li=>{const e=li.dataset.id&&byId.get(li.dataset.id);return e?act(e.T):null});
  L.forEach((li,i)=>{let A=sets[i];if(!A){let p=i-1,n=i+1;while(p>=0&&!sets[p])p--;while(n<L.length&&!sets[n])n++;const P=p>=0?sets[p]:[],N=n<L.length?sets[n]:[];A=P.filter(x=>N.includes(x))}
    li.dataset.nb=A.length?A.map(x=>x[0]).join(','):'-';const im=[],ps=[],sz=[];
    let nx=null;for(let j=i+1;j<L.length;j++)if(sets[j]){nx=sets[j];break}
    A.forEach(x=>{const c=NC(x[0])||'#888';const X0=x[3]*10+3;const end=x[4]&&nx&&!nx.includes(x)&&sets[i];
      if(end){im.push(`url("data:image/svg+xml,${encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\'><path d=\'M2 2L12 12M12 2L2 12\' stroke=\'#dc2626\' stroke-width=\'3\' stroke-linecap=\'round\'/></svg>')}")`);ps.push(`${X0-4}px 22px`);sz.push('14px 14px');
        im.push(`linear-gradient(${c},${c})`);ps.push(`${X0}px 0`);sz.push('6px 29px')}
      else{im.push(`linear-gradient(${c},${c})`);ps.push(`${X0}px 0`);sz.push('6px 100%')}});
    li.style.setProperty('--nbg',im.join(',')||'none');li.style.setProperty('--nbp',ps.join(',')||'0 0');li.style.setProperty('--nbs',sz.join(',')||'0 0')});
  if(!ol.dataset.nbx){const li=ol.querySelector(':scope>li[data-id]');const d=li&&li.querySelector(':scope>.d');const d2=li&&li.children[1];if(d&&d2&&li.offsetWidth){const lr=li.getBoundingClientRect(),dr=d.getBoundingClientRect(),r2=d2.getBoundingClientRect();const x=Math.round(r2.left-lr.left-16);if(x>30){ol.style.setProperty('--nbx',x+'px');ol.dataset.nbx=1}}}}
new MutationObserver(()=>{if(!q)q=setTimeout(run,120)}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});setTimeout(run,1200);
}

/* 연대표 왕 묶음(짧은 재위 여러 명) 누르면 이름 목록 */
{const pop=document.createElement('div');pop.id='kgpop';pop.hidden=true;document.body.appendChild(pop);const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const yr=v=>{const y=Math.floor(v);return y<0?'기원전 '+(-y):String(y)};
 document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('#v-ov .hzkg[data-kgl]');if(!g){if(!pop.hidden&&!e.target.closest('#kgpop'))pop.hidden=true;return}e.preventDefault();e.stopImmediatePropagation();const [dn,ids]=g.dataset.kgl.split('|');const D=REIGNS.find(x=>x.n===dn);if(!D)return;
   pop.innerHTML=ids.split(',').map(i=>{const r=D.r[+i];return `<button type="button" data-king="${E(dn)}|${i}"><b>${E(r.name)}</b><i>${yr(r.s)}~${yr(r.e)}</i></button>`}).join('');pop.hidden=false;const q=g.getBoundingClientRect();pop.style.left=Math.max(8,Math.min(innerWidth-240,q.left))+'px';pop.style.top=(q.bottom+6)+'px'},true);
 pop.addEventListener('click',e=>{if(e.target.closest('[data-king]'))setTimeout(()=>{pop.hidden=true},0)});addEventListener('scroll',()=>{pop.hidden=true},true)}

/* 화살표가 먼저 그려지고, 다 닿은 뒤에 사건 핀이 터짐 */
{const pp=popPin;popPin=function(o){const e=o&&o.pin;const ps=e&&arrOf.get(e.id);
  if(playing&&ps&&ps.length&&!reduceMotion){const D=e.seqAr?1100*ps.length-50:950;o.g.classList.add('arwait');clearTimeout(o.pa);
    o.pa=setTimeout(()=>{o.g.classList.remove('arwait');if(pos.i===e.f)pp(o)},D);return}
  if(o&&o.g)o.g.classList.remove('arwait');return pp(o)}}

/* 기록물·석탑: 고인돌처럼 그림 모양 핀 */
{const BK='<path class="bkb" d="M-11,-6L-3,-2.5L-3,0.5L-11,-3Z"/><path class="bkp" d="M-3,-2.5L11,-6.5L11,-3.5L-3,0.5Z"/><path class="stl" d="M-3,-1.5L11,-5.5M-3,-0.5L11,-4.5"/><path class="bkc" d="M-11,-6L3,-10L11,-6.5L-3,-2.5Z"/>'+
  [0.15,0.38,0.62,0.85].map(t=>{const x=-11+8*t,y=-6+3.5*t;return `<path class="bks" d="M${x.toFixed(2)},${y.toFixed(2)}l1.4,-0.4"/>`}).join('')+
  '<path class="bkt" d="M-7.4,-6.2L-3.8,-4.6L-2.4,-5L-6,-6.6Z"/>';
 const WP='<path class="wpb" d="M-6.5,0.3H6.5V-1.3H-6.5Z"/><path class="wpw" d="M-3.30,-1.30H3.30V-2.80H-3.30Z"/><path class="wpr" d="M-6.40,-2.80Q-7.10,-3.25 -6.90,-3.60L-5.00,-3.75H5.00L6.90,-3.60Q7.10,-3.25 6.40,-2.8Z"/><path class="wpw" d="M-3.03,-3.75H3.03V-5.25H-3.03Z"/><path class="wpr" d="M-5.90,-5.25Q-6.60,-5.70 -6.40,-6.05L-4.50,-6.20H4.50L6.40,-6.05Q6.60,-5.70 5.90,-5.25Z"/><path class="wpw" d="M-2.77,-6.20H2.77V-7.70H-2.77Z"/><path class="wpr" d="M-5.40,-7.70Q-6.10,-8.15 -5.90,-8.50L-4.00,-8.65H4.00L5.90,-8.50Q6.10,-8.15 5.40,-7.7Z"/><path class="wpw" d="M-2.50,-8.65H2.50V-10.15H-2.50Z"/><path class="wpr" d="M-4.90,-10.15Q-5.60,-10.60 -5.40,-10.95L-3.50,-11.10H3.50L5.40,-10.95Q5.60,-10.60 4.90,-10.15Z"/><path class="wpw" d="M-2.23,-11.10H2.23V-12.60H-2.23Z"/><path class="wpr" d="M-4.40,-12.60Q-5.10,-13.05 -4.90,-13.40L-3.00,-13.55H3.00L4.90,-13.40Q5.10,-13.05 4.40,-12.6Z"/><path class="wpw" d="M-1.97,-13.55H1.97V-15.05H-1.97Z"/><path class="wpr" d="M-3.90,-15.05Q-4.60,-15.50 -4.40,-15.85L-2.50,-16.00H2.50L4.40,-15.85Q4.60,-15.50 3.90,-15.049999999999999Z"/><path class="wpw" d="M-1.70,-16.00H1.70V-17.50H-1.70Z"/><path class="wpr" d="M-3.40,-17.50Q-4.10,-17.95 -3.90,-18.30L-2.00,-18.45H2.00L3.90,-18.30Q4.10,-17.95 3.40,-17.5Z"/><path class="wps" d="M-0.35,-18.45H0.35V-22.65H-0.35Z"/><path class="wps" d="M-0.9,-19.35H0.9V-19.70H-0.9Z"/><path class="wps" d="M-0.9,-20.25H0.9V-20.60H-0.9Z"/><path class="wps" d="M-0.9,-21.15H0.9V-21.50H-0.9Z"/><path class="wps" d="M-0.9,-22.05H0.9V-22.40H-0.9Z"/>';
 const PG='<path class="dmc" d="M-8,0.2H8V-2.2H-8Z"/><path class="dmc" d="M-6.4,-2.2H6.4V-4H-6.4Z"/>'+
  [[-4,3.2,2.6,6.9,1.2],[-7.8,2.6,1.9,5.9,1],[-10.7,2.0,1.5,4.9,0.9]].map(([y,bw,bh,rw,rh])=>{const yb=y-bh,yr=yb-rh;return `<path class="dms" d="M${-bw},${y}H${bw}V${yb}H${-bw}Z"/><path class="dmc" d="M${-rw},${yb}Q${-rw-0.6},${yb-0.5} ${-rw-0.4},${yb-0.9}L${-rw+1.3},${yr}H${rw-1.3}L${rw+0.4},${yb-0.9}Q${rw+0.6},${yb-0.5} ${rw},${yb}Z"/>`}).join('')+
  '<path class="dms" d="M-0.5,-13.1H0.5V-16.6H-0.5Z"/><path class="dmg" d="M-10,0.6H10"/>';
 function apply(){if(typeof pinOf==='undefined')return;EVENTS.forEach(e=>{if(e.icon!=='book'&&e.icon!=='pagoda')return;const o=pinOf.get(e.id);if(!o||o.g.classList.contains('artpin'))return;const gl=o.g.querySelector('.gl');if(!gl)return;
   const ob=o.g.querySelector('.dot');const wood=e.icon==='pagoda'&&/목탑/.test(e.t);gl.innerHTML=e.icon==='book'?BK:wood?WP:PG;o.g.classList.add('stelepin','dolpin','artpin',e.icon==='book'?'bookpin':'pagpin');if(wood)o.g.classList.add('woodpin')})}
 apply();setTimeout(apply,1500)}

/* 화살촉: 손으로 그린 것처럼 선으로 된 V자 */
{try{arrOf.forEach(ps=>ps.forEach(p=>{const f=p.hg.querySelector('.ahf');if(!f)return;const col=f.style.fill;const d=p.inv?'M-13.5,-9L1,0L-13.5,9':'M-11.5,-7.6L0.8,0L-11.5,7.6';const n=document.createElementNS('http://www.w3.org/2000/svg','path');n.setAttribute('class','ahl');n.setAttribute('d',d);n.style.stroke=col;n.style.fill='none';f.replaceWith(n)}))}catch(_){}}

