
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
let t=0;const sched=()=>{clearTimeout(t);t=setTimeout(applyAll,80)};
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
  const c=t.closest('#trbody .trcard');if(!c||!c.querySelector('.tfin,.htree,.hchain'))return;if(t.closest('button,input,textarea,[contenteditable],.trut,.trflow,.trh,.trsplit,.trgrip,.hnbar,a,.hjw'))return;
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
  const c=t.closest('.trcard');const k=c.id.replace(/^tree-/,'');const key=t.dataset.e,ax=t.dataset.ax,sg=+t.dataset.sg||1;const M=window.__ME.tr;const LO=Object.assign({},M.get('@lo:'+k)||{});const v0=+LO[key]||0;const p0=ax==='x'?e.clientX:e.clientY;
  const z=(()=>{const r=c.querySelector('.tfin').getBoundingClientRect();const w=c.querySelector('.tfin').offsetWidth;return w?r.width/w:1})();document.body.classList.add('tflmoving');
  const mv=ev=>{ev.preventDefault();const d=((ax==='x'?ev.clientX:ev.clientY)-p0)/z*sg;LO[key]=Math.round(v0+d);M.set('@lo:'+k,Object.assign({},LO));try{window.__DRAWLINES(c)}catch(_){}};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);document.body.classList.remove('tflmoving');const v=Object.assign({},M.get('@lo:'+k)||{});try{window.__MEX.save('T:@lo:'+k,v)}catch(_){}};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
new MutationObserver(()=>{document.querySelectorAll('#trbody .trcard .tfin').forEach(f=>{const has=!!f.querySelector('.tflh');if(has!==document.body.classList.contains('medit')){try{window.__DRAWLINES(f.closest('.trcard'))}catch(_){}}})}).observe(document.body,{attributes:true,attributeFilter:['class']});
}
