
/* ───────── 연대표: 고치기 모드에서 옮기기 · 형광펜 길이 · 세로줄 길이 ───────── */
{
const $=id=>document.getElementById(id);
const TRM=()=>window.__ME&&window.__ME.tr;
const can=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own()&&!$('v-ov').hidden;
const keyOf=el=>el.dataset.ovk||keyOf0(el);
const keyOf0=el=>{if(el.matches('.hzn'))return 'n'+el.dataset.ev;if(el.matches('.hznt')){const b=el.querySelector('[data-ev]');return b?'t'+b.dataset.ev:'t'+(el.textContent||'').trim().slice(0,20)}if(el.matches('.hzrg'))return 'r'+el.dataset.rg;if(el.matches('.hzach')){const b=el.querySelector('[data-king]');return b?'a'+b.dataset.king:null}if(el.matches('.hzld')){const n=el.nextElementSibling;return n&&n.dataset.ev?'l'+n.dataset.ev:null}return null};
const get=k=>{const M=TRM();return (M&&M.get('@ov:'+k))||null};
const put=(k,v)=>{const M=TRM();if(!M)return;M.set('@ov:'+k,v);try{window.__MEX.save('T:@ov:'+k,v)}catch(_){}};
const SEL='#v-ov .hzn,#v-ov .hznt,#v-ov .hzrg,#v-ov .hzach';
function applyAll(){const ed=can();const seen={};document.querySelectorAll(SEL).forEach(el=>{const k0=keyOf0(el);if(!k0)return;const nn=seen[k0]=(seen[k0]||0)+1;const k=nn>1?k0+'#'+nn:k0;el.dataset.ovk=k;const v=get(k);
  if(el.dataset.ow==null)el.dataset.ow=el.style.width||'';if(el.dataset.ogc==null)el.dataset.ogc=el.style.getPropertyValue('--gc')||'';if(el.dataset.oh==null)el.dataset.oh=el.style.height||'';
  el.style.translate=v&&(v.x||v.y)?`${v.x||0}px ${v.y||0}px`:'';
  if(el.matches('.hzrg'))el.style.width=v&&v.w?v.w+'px':el.dataset.ow;
  if(el.matches('.hzach')){el.style.width=v&&v.w?v.w+'px':el.dataset.ow;el.style.minHeight=v&&v.h?v.h+'px':'';el.style.height=v&&v.h?v.h+'px':'';el.classList.toggle('ovsz',!!(v&&v.h))}
  if(el.matches('.hzrg')){if(v&&v.c)el.style.setProperty('--gc',v.c);else if(el.dataset.ogc!=null)el.style.setProperty('--gc',el.dataset.ogc)}else{if(v&&v.c){el.style.setProperty('--oc',v.c);el.classList.add('ovc')}else el.classList.remove('ovc')}el.classList.toggle('ovx',!!(v&&v.xm));if(el.matches('.hzrg2')){if(v&&v.th){el.style.setProperty('height',v.th+'px','important');el.style.setProperty('line-height',v.th+'px','important')}else{el.style.removeProperty('height');el.style.removeProperty('line-height')}}
  if(el.matches('.hzld'))el.style.height=v&&v.h?v.h+'px':el.dataset.oh;
  let g=el.querySelector(':scope>.ovgrip');if(ed&&!g&&el.matches('.hzach')){el.insertAdjacentHTML('beforeend','<ovg class="ovgrip ovgc" title="크기 조절"></ovg>')}else if(ed&&!g&&el.matches('.hzrg')){el.insertAdjacentHTML('beforeend','<ovg class="ovgrip ovgh ovgl" title="왼쪽 길이"></ovg>');el.insertAdjacentHTML('beforeend',`<ovg class="ovgrip ${el.matches('.hzld')?'ovgv':'ovgh'}" title="${el.matches('.hzld')?'세로줄 길이':'길이'}"></ovg>`)}else if(!ed&&g)el.querySelectorAll(':scope>.ovgrip').forEach(x=>x.remove())});
  try{contFix()}catch(_){}document.querySelectorAll('#v-ov .hzld').forEach(link);try{marks()}catch(_){}drawL();document.body.classList.toggle('ovedit',ed);if(!ed)document.body.classList.remove('ovline');const lb=$('ovline');if(lb)lb.hidden=true;const ab=$('ovadd');if(ab)ab.hidden=!ed}
/* 이끔선: 축의 연도 자리에서 글자까지 바로 잇기 (글자를 옮기면 따라감) */
function link(ld){const n=ld.nextElementSibling;if(!n||!n.matches('.hzn'))return;if(ld.dataset.ol==null){ld.dataset.ol=parseFloat(ld.style.left)||0;ld.dataset.ot=parseFloat(ld.style.top)||0;ld.dataset.oh0=parseFloat(ld.style.height)||0}
  const up=ld.classList.contains('up');const Ax=+ld.dataset.ol,Ay=up?(+ld.dataset.ot)+(+ld.dataset.oh0):+ld.dataset.ot;const tr=(n.style.translate||'').split(/\s+/).map(parseFloat);const tx=tr[0]||0,ty=tr[1]||0;
  const L=n.offsetLeft+tx,T=n.offsetTop+ty,W=n.offsetWidth,H=n.offsetHeight;const Bx=Math.max(L+3,Math.min(L+W-3,Ax)),By=(T+H/2<Ay)?T+H:T;const dx=Bx-Ax,dy=By-Ay;const len=Math.hypot(dx,dy);const ang=Math.atan2(dy,dx)*180/Math.PI-90;
  ld.classList.add('lnk');ld.style.left=Ax+'px';ld.style.top=Ay+'px';ld.style.height=len+'px';ld.style.rotate=ang+'deg';ld.style.display=Math.abs(dy)<30?'none':''}
window.__ovLink=()=>document.querySelectorAll('#v-ov .hzld').forEach(link);
/* 축의 | ↔ ✕ : 고치기 모드에서 누르면 바뀜 */
function marks(){document.querySelectorAll('#v-ov [data-mev]').forEach(m=>{if(m.dataset.m0==null)m.dataset.m0=m.classList.contains('hzx')?'1':'0';const v=get('k'+m.dataset.mev);const on=v&&v.mj!=null?!!v.mj:m.dataset.m0==='1';m.classList.toggle('hzx',on);m.classList.toggle('hztk',!on);m.textContent=on?'×':'';const y=document.querySelector(`#v-ov .hzyr[data-yev="${m.dataset.mev}"]`);if(y){if(y.dataset.m0==null)y.dataset.m0=y.classList.contains('mj')?'1':'0';y.classList.toggle('mj',v&&v.mj!=null?!!v.mj:y.dataset.m0==='1')}})}
document.addEventListener('click',e=>{const m=can()&&e.target.closest&&e.target.closest('#v-ov [data-mev],#v-ov .hzyr[data-yev]');if(!m)return;e.preventDefault();e.stopPropagation();const id=m.dataset.mev||m.dataset.yev;const mk=document.querySelector(`#v-ov [data-mev="${id}"]`);if(!mk)return;const cur=mk.classList.contains('hzx');put('k'+id,Object.assign({},get('k'+id)||{},{mj:cur?0:1}));marks()},true);
/* 선 긋기: 고치기 모드에서 '선 긋기'를 켜고 끌어서 직선 (선을 누르면 지우기) */
const cvOf=sec=>sec.querySelector('.hztop>div')||sec.querySelector('.hztop');
function drawL(){try{document.querySelectorAll('#v-ov .hzbot').forEach(b=>{let m=0;for(const c of b.children){const r=c.offsetTop+c.offsetHeight;if(r>m)m=r}const want=Math.max(m+16,0);if(Math.abs((parseFloat(b.dataset.fh)||0)-want)>2){b.dataset.fh=want;b.style.setProperty('height',want+'px','important');b.style.setProperty('min-height',want+'px','important')}})}catch(_){}try{window.__ovDraw&&window.__ovDraw()}catch(_){}document.querySelectorAll('#v-ov section.ovsec[data-sec]').forEach(sec=>{const cv=cvOf(sec);if(!cv)return;const L=get('L:'+sec.dataset.sec);const sg=JSON.stringify(L&&L.l||[]);if(cv.dataset.lsig===sg&&(cv.querySelector(':scope>.ovl')||sg==='[]'))return;cv.dataset.lsig=sg;cv.querySelectorAll(':scope>.ovl').forEach(x=>x.remove());if(!L||!L.l)return;
  L.l.forEach((q,i)=>{const [x1,y1,x2,y2,c]=q;const len=Math.hypot(x2-x1,y2-y1),ang=Math.atan2(y2-y1,x2-x1)*180/Math.PI;cv.insertAdjacentHTML('beforeend',`<i class="ovl" data-li="${i}" style="left:${x1}px;top:${y1}px;width:${len}px;rotate:${ang}deg;--lc:${c||'#dc2626'}"></i>`)})})}
{const b=document.createElement('button');b.id='ovline';b.type='button';b.hidden=true;b.textContent='선 긋기';document.body.appendChild(b);b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();document.body.classList.toggle('ovline');b.classList.toggle('on',document.body.classList.contains('ovline'))})}
addEventListener('pointerdown',e=>{if(!can()||!document.body.classList.contains('ovline'))return;const sec=e.target.closest&&e.target.closest('#v-ov section.ovsec[data-sec]');if(!sec||e.target.closest('.ovl'))return;const cv=cvOf(sec);if(!cv)return;e.preventDefault();e.stopPropagation();
  const r=cv.getBoundingClientRect();const x1=e.clientX-r.left,y1=e.clientY-r.top;const tmp=document.createElement('i');tmp.className='ovl';tmp.style.cssText=`left:${x1}px;top:${y1}px;width:0;--lc:${window.__ovLC||'#dc2626'}`;cv.appendChild(tmp);let x2=x1,y2=y1;
  const SC=$('ovscroll');const sl0=SC?SC.scrollLeft:0;const hold=()=>{if(SC&&SC.scrollLeft!==sl0)SC.scrollLeft=sl0};SC&&SC.addEventListener('scroll',hold);
  const mv=ev=>{ev.preventDefault();const r2=cv.getBoundingClientRect();x2=ev.clientX-r2.left;y2=ev.clientY-r2.top;if(ev.shiftKey||Math.abs(y2-y1)<6)y2=Math.abs(y2-y1)<6?y1:y2;if(Math.abs(x2-x1)<6)x2=x1;tmp.style.width=Math.hypot(x2-x1,y2-y1)+'px';tmp.style.rotate=Math.atan2(y2-y1,x2-x1)*180/Math.PI+'deg'};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);SC&&SC.removeEventListener('scroll',hold);tmp.remove();if(Math.hypot(x2-x1,y2-y1)<8)return;const k='L:'+sec.dataset.sec;const L=Object.assign({l:[]},get(k)||{});L.l=(L.l||[]).concat([[Math.round(x1),Math.round(y1),Math.round(x2),Math.round(y2),window.__ovLC||'#dc2626']]);put(k,L);drawL()};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
document.addEventListener('click',e=>{const l=e.target.closest&&e.target.closest('#v-ov .ovl[data-li]');if(!l||!can())return;e.preventDefault();e.stopPropagation();const sec=l.closest('section.ovsec');const k='L:'+sec.dataset.sec;const L=Object.assign({},get(k)||{});L.l=(L.l||[]).filter((_,i)=>i!==+l.dataset.li);put(k,L);drawL()},true);
/* 고치기 모드: 글자·형광펜을 누르면 색 바꾸기 / ✕ 표시 */
{const pal=document.createElement('div');pal.id='ovpal';pal.hidden=true;document.body.appendChild(pal);let cur=null;
 const COLS=['#dc2626','#ea580c','#ca8a04','#16a34a','#0d9488','#2563eb','#7c3aed','#db2777','#57534e','#111827'];
 document.addEventListener('click',e=>{if(e.target.closest('#ovpal'))return;const el=can()&&e.target.closest&&e.target.closest(SEL);if(!el||el.matches('.hzach')){pal.hidden=true;cur=null;return}if(e.target.closest('.ovgrip'))return;
   e.preventDefault();e.stopPropagation();cur=el;const v=get(keyOf(el))||{};const rg=el.matches('.hzrg');
   pal.innerHTML=!rg?`<button type="button" data-ox class="xb ${v.xm?'on':''}">✕ 표시</button>${v.c?'<button type="button" data-oc="" class="rs">글씨 색 원래대로</button>':''}<span class="phint">글씨 색·크기는 필통에서</span>`:`<span>형광펜 색</span>${COLS.map(c=>`<button type="button" data-oc="${c}" style="--c:${c}" class="${v.c===c?'on':''}"></button>`).join('')}<button type="button" data-oc="" class="rs" title="원래 색">원래</button><button type="button" data-ox class="xb ${v.xm?'on':''}">✕ 표시</button>${rg&&el.matches('.hzrg2')?`<span class="thl">두께</span>${[[8,'얇게'],[0,'보통'],[26,'두껍게']].map(([t,n])=>`<button type="button" data-oth="${t}" class="rs ${(v.th||0)===t?'on':''}">${n}</button>`).join('')}`:''}`;
   pal.hidden=false;const r=el.getBoundingClientRect();pal.style.left=Math.max(8,Math.min(innerWidth-pal.offsetWidth-8,r.left))+'px';const y=r.bottom+6;pal.style.top=(y+pal.offsetHeight>innerHeight-8?r.top-pal.offsetHeight-6:y)+'px'},true);
 pal.addEventListener('click',e=>{if(!cur)return;const k=keyOf(cur);const v=Object.assign({},get(k)||{});const b=e.target.closest('button');if(!b)return;
   if(b.hasAttribute('data-oth')){const t=+b.dataset.oth;if(t)v.th=t;else delete v.th;pal.querySelectorAll('[data-oth]').forEach(x=>x.classList.toggle('on',x===b))}else if(b.hasAttribute('data-ox'))v.xm=v.xm?0:1;else{const c=b.dataset.oc;if(c)v.c=c;else delete v.c}put(k,v);applyAll();pal.querySelectorAll('[data-oc]').forEach(x=>x.classList.toggle('on',!!v.c&&x.dataset.oc===v.c));if(b.dataset.oc)window.__ovLC=b.dataset.oc;pal.querySelector('[data-ox]').classList.toggle('on',!!v.xm)});
 addEventListener('scroll',e=>{if(!e.target.closest||!e.target.closest('#ovpal'))pal.hidden=true},true)}
let t=0;const sched=()=>{const v=$('v-ov');if(!v||v.hidden)return;clearTimeout(t);t=setTimeout(applyAll,80)};
new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&!n.classList.contains('ovgrip'))))sched()}).observe(document.body,{childList:true,subtree:true});
new MutationObserver(sched).observe(document.body,{attributes:true,attributeFilter:['class']});
setTimeout(applyAll,500);
{const b=document.createElement('button');b.id='ovadd';b.type='button';b.hidden=true;b.textContent='+ 사건 추가';document.body.appendChild(b);b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();try{window.__vForm()}catch(_){}})}
/* 끌기 */
document.addEventListener('pointerdown',e=>{if(!can())return;const t=e.target;if(!t.closest||t.closest('[contenteditable]'))return;const grip=t.closest('.ovgrip');const el=t.closest(SEL);if(!el)return;if(e.button!==0&&e.pointerType==='mouse')return;const k=keyOf(el);if(!k)return;
  const v0=Object.assign({},get(k)||{});const x0=e.clientX,y0=e.clientY;let st=false;const w0=el.offsetWidth,h0=el.offsetHeight;const SC=document.getElementById('ovscroll');const sl0=SC?SC.scrollLeft:0,stp0=SC?SC.scrollTop:0;const hold=()=>{if(SC&&(SC.scrollLeft!==sl0||SC.scrollTop!==stp0)){SC.scrollLeft=sl0;SC.scrollTop=stp0}};SC&&SC.addEventListener('scroll',hold);
  if(grip){e.preventDefault();e.stopPropagation()}
  const mv=ev=>{const dx=ev.clientX-x0,dy=ev.clientY-y0;if(!st){if(!grip&&Math.abs(dx)+Math.abs(dy)<6)return;st=true;el.classList.add('ovdrag');try{getSelection().removeAllRanges()}catch(_){}}ev.preventDefault();
    if(grip&&el.matches('.hzld')){const h=Math.max(4,Math.round(h0+dy));el.style.height=h+'px';v0.h=h}
    else if(grip&&el.matches('.hzach')){const w=Math.max(90,Math.round(w0+dx)),h=Math.max(30,Math.round(h0+dy));el.style.width=w+'px';el.style.height=h+'px';el.style.minHeight=h+'px';el.classList.add('ovsz');v0.w=w;v0.h=h}
    else if(grip&&grip.classList.contains('ovgl')){const d=Math.min(Math.round(dx),w0-20);const bx=Math.round((get(k)||{}).x||0);const nx=bx+d,ny=Math.round((get(k)||{}).y||0);const w=w0-d;el.style.translate=`${nx}px ${ny}px`;el.style.width=w+'px';v0.x=nx;v0.y=ny;v0.w=w}
    else if(grip){const w=Math.max(20,Math.round(w0+dx));el.style.width=w+'px';v0.w=w}
    else{const nx=Math.round((get(k)||{}).x||0)+Math.round(dx),ny=Math.round((get(k)||{}).y||0)+Math.round(dy);el.style.translate=`${nx}px ${ny}px`;v0.x=nx;v0.y=ny;const pl=el.previousElementSibling;if(pl&&pl.matches('.hzld'))link(pl)}};
  const up=()=>{SC&&SC.removeEventListener('scroll',hold);removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);if(!st)return;el.classList.remove('ovdrag');put(k,v0);const kill=ev=>{ev.preventDefault();ev.stopImmediatePropagation();removeEventListener('click',kill,true)};addEventListener('click',kill,true);setTimeout(()=>removeEventListener('click',kill,true),60)};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
/* 고치기 모드에서는 눌러도 다른 곳으로 가지 않음 (글씨 고치기만) */
window.addEventListener('click',e=>{if(!can())return;const b=e.target.closest&&e.target.closest('#v-ov [data-ev],#v-ov [data-grp],#v-ov [data-tip],#v-ov .hzrg');if(!b)return;if(e.target.closest('[contenteditable],.hzn>span,.hznt button,.hznt span,.hzrg>span'))return;e.preventDefault();e.stopImmediatePropagation()},true);
/* 형광펜을 줄여 범위를 끝냈으면 다음 칸으로 이어지는 같은 막대는 숨김 */
function contFix(){const all=[...document.querySelectorAll('#v-ov .hzrg2')];all.forEach((el,i)=>{if(!el.classList.contains('cont'))return;el.style.display='';if(get(el.dataset.ovk))return;let P=null;for(let j=i-1;j>=0;j--)if(all[j].dataset.rg===el.dataset.rg){P=all[j];break}if(!P)return;if(P.style.display==='none'){el.style.display='none';return}const v=get(P.dataset.ovk);if(!v||!(v.w||v.x))return;const end=P.offsetLeft+(v.x||0)+P.offsetWidth;const W=P.offsetParent?P.offsetParent.clientWidth:1e9;if(end<W-6)el.style.display='none'})}
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
  if(playing&&ps&&ps.length&&!reduceMotion){const D=e.seqAr?1100*ps.length-50:950;o.g.classList.add('arwait');try{freshId=e.id;clearTimeout(freshT);freshT=setTimeout(()=>{freshId=null},D+2800)}catch(_){}clearTimeout(o.pa);
    o.pa=setTimeout(()=>{o.g.classList.remove('arwait');if(pos.i===e.f)pp(o)},D);return}
  if(o&&o.g)o.g.classList.remove('arwait');return pp(o)}}

/* 기록물·석탑: 고인돌처럼 그림 모양 핀 */
{const BK='<path class="bkp" d="M-5.4,-15.2H7V0.6H-5.4Z"/><path class="bkc" d="M-6.5,-16H6V0H-6.5Z"/><path class="bkb" d="M-6.5,-16H-4.3V0H-6.5Z"/><path class="bks" d="M-6.9,-14.2H-4.6"/><circle class="bkh" cx="-4.6" cy="-14.2" r=".38"/><path class="bks" d="M-6.9,-10.2H-4.6"/><circle class="bkh" cx="-4.6" cy="-10.2" r=".38"/><path class="bks" d="M-6.9,-6H-4.6"/><circle class="bkh" cx="-4.6" cy="-6" r=".38"/><path class="bks" d="M-6.9,-1.8H-4.6"/><circle class="bkh" cx="-4.6" cy="-1.8" r=".38"/><path class="bkt" d="M-3.2,-14.6H-0.6V-6.2H-3.2Z"/><path class="bkm" d="M-2.3,-13.4V-11.2M-1.5,-13.4V-10.2M-2.3,-9.8V-7.6"/>';
 const WP='<path class="wpb" d="M-6.5,0.3H6.5V-1.3H-6.5Z"/><path class="wpw" d="M-3.30,-1.30H3.30V-2.80H-3.30Z"/><path class="wpr" d="M-6.40,-2.80Q-7.10,-3.25 -6.90,-3.60L-5.00,-3.75H5.00L6.90,-3.60Q7.10,-3.25 6.40,-2.8Z"/><path class="wpw" d="M-3.03,-3.75H3.03V-5.25H-3.03Z"/><path class="wpr" d="M-5.90,-5.25Q-6.60,-5.70 -6.40,-6.05L-4.50,-6.20H4.50L6.40,-6.05Q6.60,-5.70 5.90,-5.25Z"/><path class="wpw" d="M-2.77,-6.20H2.77V-7.70H-2.77Z"/><path class="wpr" d="M-5.40,-7.70Q-6.10,-8.15 -5.90,-8.50L-4.00,-8.65H4.00L5.90,-8.50Q6.10,-8.15 5.40,-7.7Z"/><path class="wpw" d="M-2.50,-8.65H2.50V-10.15H-2.50Z"/><path class="wpr" d="M-4.90,-10.15Q-5.60,-10.60 -5.40,-10.95L-3.50,-11.10H3.50L5.40,-10.95Q5.60,-10.60 4.90,-10.15Z"/><path class="wpw" d="M-2.23,-11.10H2.23V-12.60H-2.23Z"/><path class="wpr" d="M-4.40,-12.60Q-5.10,-13.05 -4.90,-13.40L-3.00,-13.55H3.00L4.90,-13.40Q5.10,-13.05 4.40,-12.6Z"/><path class="wpw" d="M-1.97,-13.55H1.97V-15.05H-1.97Z"/><path class="wpr" d="M-3.90,-15.05Q-4.60,-15.50 -4.40,-15.85L-2.50,-16.00H2.50L4.40,-15.85Q4.60,-15.50 3.90,-15.049999999999999Z"/><path class="wpw" d="M-1.70,-16.00H1.70V-17.50H-1.70Z"/><path class="wpr" d="M-3.40,-17.50Q-4.10,-17.95 -3.90,-18.30L-2.00,-18.45H2.00L3.90,-18.30Q4.10,-17.95 3.40,-17.5Z"/><path class="wps" d="M-0.35,-18.45H0.35V-22.65H-0.35Z"/><path class="wps" d="M-0.9,-19.35H0.9V-19.70H-0.9Z"/><path class="wps" d="M-0.9,-20.25H0.9V-20.60H-0.9Z"/><path class="wps" d="M-0.9,-21.15H0.9V-21.50H-0.9Z"/><path class="wps" d="M-0.9,-22.05H0.9V-22.40H-0.9Z"/>';
 const PG='<path class="dmc" d="M-8,0.2H8V-2.2H-8Z"/><path class="dmc" d="M-6.4,-2.2H6.4V-4H-6.4Z"/>'+
  [[-4,3.2,2.6,6.9,1.2],[-7.8,2.6,1.9,5.9,1],[-10.7,2.0,1.5,4.9,0.9]].map(([y,bw,bh,rw,rh])=>{const yb=y-bh,yr=yb-rh;return `<path class="dms" d="M${-bw},${y}H${bw}V${yb}H${-bw}Z"/><path class="dmc" d="M${-rw},${yb}Q${-rw-0.6},${yb-0.5} ${-rw-0.4},${yb-0.9}L${-rw+1.3},${yr}H${rw-1.3}L${rw+0.4},${yb-0.9}Q${rw+0.6},${yb-0.5} ${rw},${yb}Z"/>`}).join('')+
  '<path class="dms" d="M-0.5,-13.1H0.5V-16.6H-0.5Z"/><path class="dmg" d="M-10,0.6H10"/>';
 function apply(){if(typeof pinOf==='undefined')return;EVENTS.forEach(e=>{if(/석탑|목탑/.test(e.t)&&!(e.tp||[]).includes('war'))e.icon='pagoda';if(e.icon!=='book'&&e.icon!=='pagoda')return;const o=pinOf.get(e.id);if(!o||o.g.classList.contains('artpin'))return;const gl=o.g.querySelector('.gl');if(!gl)return;
   const ob=o.g.querySelector('.dot');const wood=e.icon==='pagoda'&&/목탑/.test(e.t);gl.innerHTML=e.icon==='book'?BK:wood?WP:PG;o.g.classList.add('stelepin','dolpin','artpin',e.icon==='book'?'bookpin':'pagpin');if(wood)o.g.classList.add('woodpin')})}
 apply();setTimeout(apply,1500)}

/* 화살촉 모양만 > (꺾쇠) — 꺾쇠 선 두께 = 몸통 두께 (확대해도 같이) */
{const W=new Map();const wOf=p=>{if(!W.has(p)){let w=2.6;try{const af=p.g.querySelector('.af');const c=getComputedStyle(af).strokeWidth;if(c&&!p.g.classList.contains('hide'))w=parseFloat(c)||w;else w=p.inv?3.4:2.6}catch(_){}W.set(p,w)}return W.get(p)};
 try{arrOf.forEach(ps=>ps.forEach(p=>{const f=p.hg.querySelector('.ahf');if(!f)return;f.setAttribute('d',p.inv?'M-7,-4.9Q-2.6,-1.5 1.2,0Q-2.6,1.5 -7,4.9':'M-5.9,-4.1Q-2.2,-1.25 1,0Q-2.2,1.25 -5.9,4.1');f.classList.add('ahk2');f.style.setProperty('stroke',f.style.fill,'important');f.style.fill='none'}))}catch(_){}
 const fit=()=>{try{const k=kNow();arrOf.forEach(ps=>ps.forEach(p=>{const f=p.hg.querySelector('.ahk2');if(!f)return;let w=p.inv?3.4:2.6;try{const af=p.g.querySelector('.af');const c=parseFloat(getComputedStyle(af).strokeWidth);if(c)w=c}catch(_){}f.style.setProperty('stroke-width',w+'px','important')}))}catch(_){}};
 const po=placeOV;placeOV=function(){const r=po.apply(this,arguments);fit();return r};fit()}



/* 화살표 그릴 때 머리가 몸통 끝을 따라 같이 나아감 (몸통·머리 한 덩어리) */
{const H=new Map();try{arrOf.forEach(ps=>ps.forEach(p=>H.set(p.hg,p)))}catch(_){}
 const bz=(x1,y1,x2,y2)=>t=>{let a=0,b=1,u=t;for(let i=0;i<22;i++){u=(a+b)/2;const x=3*(1-u)*(1-u)*u*x1+3*(1-u)*u*u*x2+u*u*u;if(x<t)a=u;else b=u}return 3*(1-u)*(1-u)*u*y1+3*(1-u)*u*u*y2+u*u*u};const EZ=bz(.4,0,.2,1);
 const ride=p=>{const path=p.g.querySelector('.af');if(!path)return;let L=0;try{L=path.getTotalLength()}catch(_){}if(!L)return;cancelAnimationFrame(p.rid);p.hg.classList.remove('rode');p.hg.classList.add('ride');const o=p.o;const t0=performance.now();
   const step=now=>{const t=Math.min(1,(now-t0)/1000);let f=Math.min(1,2*EZ(t));try{const off=parseFloat(getComputedStyle(path).strokeDashoffset);if(!isNaN(off)&&p.g.classList.contains('draw')&&!p.g.classList.contains('dash'))f=Math.max(0,Math.min(1,2-off))}catch(_){}const d=Math.max(0.001,f)*L;const a=path.getPointAtLength(d),b=path.getPointAtLength(Math.max(0,d-Math.min(3,L*0.02)));const ang=Math.atan2(a.y-b.y,a.x-b.x)*180/Math.PI;const k=kNow();
     p.hg.setAttribute('transform',`translate(${a.x.toFixed(1)},${a.y.toFixed(1)}) rotate(${(d<1?o.rot:ang).toFixed(1)}) scale(${k.toFixed(4)})`);
     if(t<1&&p.hg.classList.contains('draw')&&!p.hg.classList.contains('hide'))p.rid=requestAnimationFrame(step);else{p.hg.classList.add('rode');p.hg.classList.remove('ride');try{p.hg.setAttribute('transform',`translate(${o.x.toFixed(1)},${o.y.toFixed(1)}) rotate(${o.rot.toFixed(1)}) scale(${kNow().toFixed(4)})`)}catch(_){}}};p.rid=requestAnimationFrame(step)};
 new MutationObserver(ms=>{ms.forEach(m=>{const n=m.target;if(!n.classList||!n.classList.contains('ahd'))return;const was=(m.oldValue||'').split(/\s+/).includes('draw');if(n.classList.contains('draw')&&!was){const p=H.get(n);if(p)ride(p)}})}).observe(document.getElementById('map'),{attributes:true,attributeFilter:['class'],attributeOldValue:true,subtree:true})}

/* 인물 미리보기: 같은 이름인 다른 사람을 제목 옆에 작게 */
{const pp=personPopHTML;const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 personPopHTML=function(n,T){let h=pp.apply(this,arguments);try{const nm=pName(n);const A=PEOPLE_ALL();const same=Object.entries(A).filter(([k])=>k.replace(/⁠/g,'')===nm);if(same.length<2)return h;
   let cur=null;try{const K=(T!=null&&!isNaN(T))?kingOfName(n,T):null;if(K)cur=same.find(([k,m])=>m.king&&(m.tags||[]).some(t=>t.t.includes(K.D.n)&&t.t.includes((K.i+1)+'대')))}catch(_){}
   if(!cur){const ts=same.filter(([k,m])=>T!=null&&m.T!=null);cur=ts.sort((a,b)=>Math.abs(a[1].T-T)-Math.abs(b[1].T-T))[0]||same[0]}
   const oth=same.filter(x=>x!==cur).map(([k,m])=>{const lab=((m.tags||[])[0]||{}).t||m.nat||'';return `<button type="button" data-go-person="${E(nm)}" data-pt="${m.T??''}">${E(lab)}</button>`}).join('');
   const lab0=((cur[1].tags||[])[0]||{}).t||'';h=h.replace(/^<b>([^<]*)<\/b>/,`<b>$1</b><span class="ppsame">${lab0?`<i>${E(lab0)}</i>`:''}<small>같은 이름</small>${oth}</span>`)}catch(_){}return h}}


/* ───────── 필통 연필: 연대표 위에 직선·자유선·형광펜(가로/자유, 글씨)·지우개 ───────── */
{const $=id=>document.getElementById(id);const TR=()=>window.__ME&&window.__ME.tr;const own=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own();
 const getD=k=>{const M=TR();return (M&&M.get('@ovd:'+k))||{s:[]}};const putD=(k,v)=>{const M=TR();if(!M)return;M.set('@ovd:'+k,v);try{window.__MEX.save('T:@ovd:'+k,v)}catch(_){}};
 const LS=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(_){return d}};const LSS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};
 const S=Object.assign({tool:'',c:'#dc2626',w:3,hw:14,o:35},LS('hgs_draw',{}));const W=()=>/hl/.test(S.tool)?S.hw:S.w;S.tool='';let SAVED=LS('hgs_dcols',['#dc2626','#2563eb','#16a34a','#f59e0b','#111827']);
 const cvOf=sec=>sec.querySelector('.hztop>div')||sec.querySelector('.hztop');
 const CONTS=[['#v-ov section.ovsec[data-sec]',el=>el.dataset.sec,el=>cvOf(el)],['#trbody .trcard[id]',el=>'tr:'+el.id,el=>el],['#kpage:not([hidden]) .kpin',el=>'kp:'+((el.querySelector('h1')||{}).textContent||'').trim().slice(0,40),el=>el],['#v-tl:not([hidden]) ol.tl',el=>'tl',el=>el],['.view:not([hidden]) .vbody,.view:not([hidden])',el=>'v:'+(el.id||(el.closest('[id]')||{}).id||'x'),el=>el]];
 const contOf=t=>{for(const [sel,kf,cf] of CONTS){const el=t.closest&&t.closest(sel);if(el&&!el.closest('#v-map svg')){const cv=cf(el);if(cv)return {el,key:kf(el),cv}}}return null};
 const allConts=()=>{const out=[];CONTS.forEach(([sel,kf,cf])=>document.querySelectorAll(sel).forEach(el=>{const cv=cf(el);if(cv&&!out.some(o=>o.cv===cv))out.push({el,key:kf(el),cv})}));return out};const E=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const pathD=P=>{if(!P.length)return '';if(P.length<3)return 'M'+P.map(q=>q.join(',')).join('L');let d='M'+P[0].join(',');for(let i=1;i<P.length-1;i++){const m=[(P[i][0]+P[i+1][0])/2,(P[i][1]+P[i+1][1])/2];d+=`Q${P[i][0]},${P[i][1]} ${m[0].toFixed(1)},${m[1].toFixed(1)}`}const l=P[P.length-1];return d+`L${l[0]},${l[1]}`};
 const rgba=(c,o)=>`color-mix(in srgb,${c} ${o}%,transparent)`;
 function render(){allConts().forEach(({el:sec,key,cv})=>{if(!cv)return;if(getComputedStyle(cv).position==='static')cv.style.position='relative';const D=getD(key);const sig=JSON.stringify(D.s||[]);const have=cv.querySelector(':scope>.ovdw:not(.tmp),:scope>.ovhl');if(cv.dataset.dsig===sig&&(have||!(D.s||[]).length))return;if(cv.querySelector('.ovhl span[contenteditable="true"]'))return;cv.dataset.dsig=sig;cv.querySelectorAll(':scope>.ovdw:not(.tmp),:scope>.ovhl').forEach(x=>x.remove());if(!D.s||!D.s.length)return;
   let svg='';D.s.forEach((q,i)=>{if(q.t==='hl'){const [a,b]=q.p;const x=Math.min(a[0],b[0]),w=Math.abs(b[0]-a[0]);cv.insertAdjacentHTML('beforeend',`<div class="ovhl" data-si="${i}" style="left:${x}px;top:${a[1]-q.w/2}px;width:${w}px;height:${q.w}px;--hb:${rgba(q.c,q.o)};font-size:${Math.max(10,Math.min(18,q.w*.62))}px"><span>${E(q.tx||'')}</span></div>`);return}
     const st=q.t==='hlf'?`stroke:${q.c};stroke-opacity:${q.o/100};stroke-width:${q.w};stroke-linecap:round;mix-blend-mode:multiply`:`stroke:${q.c};stroke-width:${q.w};stroke-linecap:round;stroke-linejoin:round`;
     svg+=q.t==='line'?`<line data-si="${i}" x1="${q.p[0][0]}" y1="${q.p[0][1]}" x2="${q.p[1][0]}" y2="${q.p[1][1]}" style="${st}"/>`:`<path data-si="${i}" d="${pathD(q.p)}" style="fill:none;${st}"/>`});
   if(svg)cv.insertAdjacentHTML('beforeend',`<svg class="ovdw" style="width:${cv.scrollWidth}px;height:${cv.scrollHeight}px">${svg}</svg>`)})}
 window.__ovDraw=render;
 /* 도구 막대 */
 const bar=document.createElement('div');bar.id='drawbar';bar.hidden=true;document.body.appendChild(bar);
 const T=[['line','직선','<path d="M5 19L19 5"/>'],['pen','자유선','<path d="M4 17c3-6 5 2 8-3s4-6 8-4"/>'],['hl','형광펜(가로)','<rect x="4" y="9" width="16" height="6" rx="1"/>'],['hlf','형광펜(자유)','<path d="M4 16c4-5 7 0 10-4s4-3 6-3" stroke-width="5" opacity=".5"/>'],['er','지우개','<path d="M8 20h12M5 15l8-8 5 5-8 8H8z"/>']];
 function drawBar(){bar.innerHTML=`<div class="dbt">${T.map(([k,n,ic])=>`<button type="button" data-dt="${k}" class="${S.tool===k?'on':''}" title="${n}"><svg viewBox="0 0 24 24">${ic}</svg><span>${n}</span></button>`).join('')}</div>
   <div class="dbr"><label>두께 <input type="range" min="1" max="${/hl/.test(S.tool)?40:14}" value="${W()}" data-dw><b>${W()}</b></label>${/hl/.test(S.tool)?`<label>투명도 <input type="range" min="10" max="90" value="${S.o}" data-do><b>${S.o}%</b></label>`:''}</div>
   <div class="dbc"><input type="color" value="${S.c}" data-dc title="색 고르기">${SAVED.map(c=>`<button type="button" data-dsc="${c}" style="--c:${c}" class="${c===S.c?'on':''}" title="길게 누르면 지우기"></button>`).join('')}<button type="button" data-dsave title="지금 색 저장">＋</button><button type="button" data-dclose class="dx">닫기</button></div>${S.tool==='hl'?'<p class="dbh">그은 형광펜을 누르면 그 위에 글씨를 쓸 수 있어요</p>':''}`}
 const setTool=k=>{S.tool=S.tool===k?'':k;document.body.classList.toggle('drawing',!!S.tool);document.body.dataset.dtool=S.tool;drawBar()};
 const open=()=>{if(!own())return;bar.hidden=false;if(!S.tool)S.tool='pen';document.body.classList.add('drawing');document.body.dataset.dtool=S.tool;drawBar()};
 const close=()=>{bar.hidden=true;S.tool='';document.body.classList.remove('drawing');delete document.body.dataset.dtool};
 bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();e.stopPropagation();if(b.dataset.dt)setTool(b.dataset.dt);else if(b.dataset.dsc){S.c=b.dataset.dsc;LSS('hgs_draw',S);drawBar()}else if(b.hasAttribute('data-dsave')){if(!SAVED.includes(S.c)){SAVED=[S.c].concat(SAVED).slice(0,12);LSS('hgs_dcols',SAVED)}drawBar()}else if(b.hasAttribute('data-dclose'))close()});
 let lpT=0;bar.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-dsc]');if(!b)return;lpT=setTimeout(()=>{SAVED=SAVED.filter(c=>c!==b.dataset.dsc);LSS('hgs_dcols',SAVED);drawBar()},700)});bar.addEventListener('pointerup',()=>clearTimeout(lpT));
 bar.addEventListener('input',e=>{const t=e.target;if(t.matches('[data-dw]')){if(/hl/.test(S.tool))S.hw=+t.value;else S.w=+t.value;t.nextElementSibling.textContent=t.value}else if(t.matches('[data-do]')){S.o=+t.value;t.nextElementSibling.textContent=S.o+'%'}else if(t.matches('[data-dc]'))S.c=t.value;LSS('hgs_draw',S)});
 bar.addEventListener('change',e=>{if(e.target.matches('[data-dc]'))drawBar()});
 /* 필통에 '연필' 버튼 */
 const addBtn=()=>{const p=$('mpen');if(!p||p.querySelector('[data-pdraw]'))return;const w=document.createElement('div');w.className='mpdraw';w.dataset.pdraw='1';w.innerHTML='<b>그리기</b><div>'+T.map(([k,n,ic])=>`<button type="button" data-pdt="${k}" title="${n}"><svg viewBox="0 0 24 24">${ic}</svg><span>${n.replace('형광펜','형광')}</span></button>`).join('')+'</div>';const ref=p.querySelector('[data-hrline]');p.insertBefore(w,ref?ref.nextSibling:null);
   w.addEventListener('click',e=>{const b=e.target.closest('[data-pdt]');if(!b)return;e.preventDefault();e.stopPropagation();const k=b.dataset.pdt;if(!bar.hidden&&S.tool===k){close()}else{bar.hidden=false;S.tool=k;document.body.classList.add('drawing');document.body.dataset.dtool=k;drawBar()}syncP()})};
 const syncP=()=>{const p=$('mpen');if(!p)return;p.querySelectorAll('[data-pdt]').forEach(b=>b.classList.toggle('on',!bar.hidden&&S.tool===b.dataset.pdt))};
 new MutationObserver(syncP).observe(bar,{childList:true,attributes:true});
 new MutationObserver(addBtn).observe(document.body,{childList:true});setInterval(()=>{addBtn();if(!bar.hidden&&!own())close()},1000);
 /* 그리기 */
 const ptIn=(cv,e)=>{const r=cv.getBoundingClientRect();return [Math.round((e.clientX-r.left)*10)/10,Math.round((e.clientY-r.top)*10)/10]};
 const hitDel=(C,e)=>{const el=document.elementFromPoint(e.clientX,e.clientY);if(!el)return;const h=el.closest('[data-si]');const ol=el.closest('.ovl[data-li]');if(h&&C.cv.contains(h)){const k=C.key;const D=getD(k);const i=+h.dataset.si;D.s=D.s.filter((_,j)=>j!==i);putD(k,{s:D.s});render()}else if(ol){ol.click()}};
 addEventListener('pointerdown',e=>{if(!S.tool||bar.hidden||!own())return;if(e.target.closest('#drawbar,#mpen,.ovhl span[contenteditable]'))return;{const ae=document.activeElement;if(ae&&ae.closest&&ae.closest('.ovhl'))ae.blur()}const C=contOf(e.target);if(!C)return;const sec=C.el,cv=C.cv;if(getComputedStyle(cv).position==='static')cv.style.position='relative';
   const hlEl=e.target.closest('.ovhl');if(hlEl&&S.tool==='hl'){e.preventDefault();e.stopPropagation();editHL(C,hlEl);return}
   e.preventDefault();e.stopPropagation();const SC=cv.closest('#ovscroll,#trbody,#kpage,.view')||$('ovscroll');const sl0=SC?SC.scrollLeft:0,st0=SC?SC.scrollTop:0;const hold=()=>{if(SC){SC.scrollLeft=sl0;SC.scrollTop=st0}};SC&&SC.addEventListener('scroll',hold);
   if(S.tool==='er'){hitDel(C,e);const mv=ev=>{ev.preventDefault();hitDel(C,ev)};const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);SC&&SC.removeEventListener('scroll',hold)};addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);return}
   const p0=ptIn(cv,e);const P=[p0];const tmp=document.createElementNS('http://www.w3.org/2000/svg','svg');tmp.setAttribute('class','ovdw tmp');tmp.style.width=cv.scrollWidth+'px';tmp.style.height=cv.scrollHeight+'px';cv.appendChild(tmp);const pa=document.createElementNS('http://www.w3.org/2000/svg','path');tmp.appendChild(pa);
   const hl=/hl/.test(S.tool);pa.setAttribute('style',`fill:none;stroke:${S.c};stroke-width:${W()};stroke-linecap:round;stroke-linejoin:round;${hl?`stroke-opacity:${S.o/100}`:''}`);
   let snap=false,hT=0;const free=S.tool==='pen'||S.tool==='hlf';const arm=()=>{clearTimeout(hT);if(free&&!snap)hT=setTimeout(()=>{if(P.length>2){snap=true;P.splice(1,P.length-2);pa.setAttribute('d',pathD(P));try{navigator.vibrate&&navigator.vibrate(10)}catch(_){}}},550)};arm();
   const mv=ev=>{ev.preventDefault();const q=ptIn(cv,ev);if(snap){P[1]=q;pa.setAttribute('d',pathD(P));return}{const l=P[P.length-1];if(Math.hypot(q[0]-l[0],q[1]-l[1])>3)arm()}if(S.tool==='line'){if(Math.abs(q[1]-p0[1])<6)q[1]=p0[1];if(Math.abs(q[0]-p0[0])<6)q[0]=p0[0];P[1]=q}else if(S.tool==='hl'){P[1]=[q[0],p0[1]]}else{const l=P[P.length-1];if(Math.hypot(q[0]-l[0],q[1]-l[1])>=2)P.push(q)}pa.setAttribute('d',pathD(P))};
   const up=()=>{clearTimeout(hT);removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);SC&&SC.removeEventListener('scroll',hold);tmp.remove();const len=P.length<2?0:Math.hypot(P[P.length-1][0]-P[0][0],P[P.length-1][1]-P[0][1]);if(len<4&&P.length<4)return;
     const k=C.key;const D=getD(k);const q={t:S.tool,p:S.tool==='line'||S.tool==='hl'||snap?[P[0],P[P.length-1]]:P,c:S.c,w:W()};if(hl)q.o=S.o;const ns=(D.s||[]).concat([q]);putD(k,{s:ns});render();
     if(S.tool==='hl')setTimeout(()=>{const el=cv.querySelector(`.ovhl[data-si="${ns.length-1}"]`);if(el)editHL(C,el)},60)};
   addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
 /* 아이패드(사파리·크롬): 그리는 동안 화면이 같이 밀려 선이 끊기지 않게 터치 자체를 막음 */
 {const blk=e=>{if(!S.tool||bar.hidden||!own())return;const t=e.target;if(!t||!t.closest||t.closest('#drawbar,#mpen,.ovhl span[contenteditable],input,textarea,button'))return;if(e.touches&&e.touches.length>1)return;if(!contOf(t))return;if(t.closest('.ovhl')&&S.tool==='hl')return;e.preventDefault()};
  addEventListener('touchstart',blk,{passive:false,capture:true});addEventListener('touchmove',blk,{passive:false,capture:true})}
 function editHL(C,el){const sp=el.querySelector('span');sp.contentEditable='true';sp.focus();try{const r=document.createRange();r.selectNodeContents(sp);r.collapse(false);const s=getSelection();s.removeAllRanges();s.addRange(r)}catch(_){}
   const done=()=>{sp.removeEventListener('blur',done);sp.removeAttribute('contenteditable');const k=C.key;const D=getD(k);const i=+el.dataset.si;if(D.s[i]){const v=sp.textContent.trim();if((D.s[i].tx||'')!==v){D.s[i]=Object.assign({},D.s[i],{tx:v});putD(k,{s:D.s.slice()})}}};sp.addEventListener('blur',done);sp.addEventListener('keydown',ev=>{ev.stopPropagation();if(ev.key==='Enter'){ev.preventDefault();sp.blur()}})}
 setTimeout(render,1200);let rq=0;new MutationObserver(()=>{if(!rq)rq=setTimeout(()=>{rq=0;try{render()}catch(_){}},400)}).observe(document.body,{childList:true,subtree:true})}

/* 연대표 왕 업적 고칠 때 ↑↓ 키로 윗줄·아랫줄 칸으로 옮겨 가기 */
document.addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;if(e.shiftKey||e.altKey||e.metaKey||e.ctrlKey)return;const h=document.activeElement;if(!h||!h.isContentEditable||!h.closest('#v-ov'))return;
  const box=h.closest('.hzach,.hznt>div,.hzd,.hzg');if(!box)return;const cur=[...box.children].find(c=>c===h||c.contains(h));if(!cur)return;
  let sl=getSelection();if(!sl.rangeCount)return;const r=sl.getRangeAt(0);const q=document.createRange();q.selectNodeContents(h);
  if(e.key==='ArrowDown'){q.setStart(r.endContainer,r.endOffset);if(q.toString().includes('\n'))return}else{q.setEnd(r.startContainer,r.startOffset);if(q.toString().includes('\n'))return}
  const items=[...box.children].filter(x=>x.matches('p,button,div,li,span:not(.hzmore),i:not(.hzmore)'));let i=items.indexOf(cur);let nx=items[i+(e.key==='ArrowDown'?1:-1)];
  if(!nx&&box.matches('.hzach')){const B=[...document.querySelectorAll('#v-ov .hzach')];const bx=box.getBoundingClientRect();const cand=B.filter(o=>o!==box).map(o=>({o,r:o.getBoundingClientRect()})).filter(({r})=>r.left<bx.right&&r.right>bx.left&&(e.key==='ArrowDown'?r.top>=bx.bottom-2:r.bottom<=bx.top+2)).sort((a,b)=>e.key==='ArrowDown'?a.r.top-b.r.top:b.r.bottom-a.r.bottom)[0];if(cand){const its=[...cand.o.children].filter(x=>x.matches('p,button,div,li'));nx=e.key==='ArrowDown'?its[0]:its[its.length-1]}}
  if(!nx)return;e.preventDefault();e.stopPropagation();h.blur();setTimeout(()=>{nx.scrollIntoView({block:'nearest',inline:'nearest'});nx.click();setTimeout(()=>{const a=document.activeElement;if(a&&a.isContentEditable){try{const rr=document.createRange();rr.selectNodeContents(a);rr.collapse(e.key!=='ArrowDown');const s2=getSelection();s2.removeAllRanges();s2.addRange(rr)}catch(_){}}},30)},20)},true);

/* 연대표 맨 위 시대 이름: 옆으로 넘겨도 화면 왼쪽에 붙어 보이게 */
{let q=0;const fit=()=>{q=0;const sc=document.getElementById('ovscroll');if(!sc||document.getElementById('v-ov').hidden)return;const L=sc.getBoundingClientRect().left+8;document.querySelectorAll('#v-ov .hzrg:not(.hzrg2)>span').forEach(s=>{const b=s.parentElement.getBoundingClientRect();const w=s.offsetWidth;const off=Math.max(0,Math.min(L-b.left,b.width-w-8));s.style.transform=off>0?`translateX(${off}px)`:''})};
 document.addEventListener('scroll',e=>{if(e.target&&e.target.id==='ovscroll'&&!q)q=requestAnimationFrame(fit)},true);addEventListener('resize',()=>{if(!q)q=requestAnimationFrame(fit)});setInterval(fit,1500)}

/* 필통 글씨 색 팔레트: ＋로 지금 고른 색 추가, 색을 길게 누르면 빼기 */
{const LS=()=>{try{return Object.assign({add:[],hide:[]},JSON.parse(localStorage.getItem('hgs_fcol')||'{}'))}catch(_){return {add:[],hide:[]}}};const SV=v=>{try{localStorage.setItem('hgs_fcol',JSON.stringify(v))}catch(_){}};
 const T=m=>{try{toast(m)}catch(_){}};
 const ensure=()=>{const st=LS();document.querySelectorAll('#mpen .mfpal .mfc').forEach(c=>{c.querySelectorAll('[data-fc]:not(.mfcu)').forEach(b=>{b.style.display=b.dataset.fc&&st.hide.includes(b.dataset.fc)?'none':''});
   const have=[...c.querySelectorAll('.mfcu')].map(b=>b.dataset.fc).join('|');if(have!==st.add.join('|')){c.querySelectorAll('.mfcu').forEach(b=>b.remove());const lab=c.querySelector('.mfcc');st.add.forEach(col=>{const b=document.createElement('button');b.type='button';b.className='mfcu';b.dataset.fc=col;b.style.background=col;b.setAttribute('aria-label',col);c.insertBefore(b,lab||null)})}
   if(!c.querySelector('[data-fcadd]')){const a=document.createElement('button');a.type='button';a.dataset.fcadd='1';a.className='mfadd';a.title='고른 색을 팔레트에 추가';a.textContent='＋';c.appendChild(a)}
   if(!c.querySelector('.mfhint')){const h=document.createElement('small');h.className='mfhint';h.textContent='색을 길게 누르면 빼기';c.appendChild(h)}})};
 setInterval(ensure,800);
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('#mpen [data-fcadd]');if(!a)return;e.preventDefault();e.stopImmediatePropagation();const inp=a.parentElement.querySelector('[data-fcc]');const col=inp&&inp.value;if(!col)return;const st=LS();st.hide=st.hide.filter(x=>x!==col);if(!st.add.includes(col))st.add.push(col);SV(st);ensure();T('팔레트에 색을 넣었어요')},true);
 let lp=0,lpEl=null;document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('#mpen .mfpal [data-fc]');if(!b||!b.dataset.fc)return;lpEl=b;clearTimeout(lp);lp=setTimeout(()=>{const col=b.dataset.fc;const st=LS();if(b.classList.contains('mfcu'))st.add=st.add.filter(x=>x!==col);else if(!st.hide.includes(col))st.hide.push(col);SV(st);ensure();T('팔레트에서 뺐어요');const kill=ev=>{ev.preventDefault();ev.stopImmediatePropagation();removeEventListener('click',kill,true)};addEventListener('click',kill,true);setTimeout(()=>removeEventListener('click',kill,true),600)},650)},true);
 ['pointerup','pointercancel','pointermove'].forEach(t=>document.addEventListener(t,e=>{if(t==='pointermove'&&lpEl&&e.pressure===0)return;if(t!=='pointermove')clearTimeout(lp)},true))}

/* 설명칸 위에서 휠·손가락으로 내려도 연대표 전체가 같이 내려가게 (끝까지) */
{let vel=0,lt=0,raf=0;const sc=()=>document.getElementById('ovscroll');
 let hold=false;addEventListener('touchstart',e=>{const t=e.target;hold=!!(t&&t.closest&&(document.body.classList.contains('drawing')||(document.body.classList.contains('ovedit')&&t.closest('#v-ov .hzn,#v-ov .hznt,#v-ov .hzrg,#v-ov .hzach,.ovgrip,[contenteditable=true]'))))},{capture:true,passive:true});
 window.hzScrollBy=dy=>{const s=sc();if(!s)return false;if(hold||document.body.classList.contains('drawing')||document.querySelector('.ovdrag'))return true;s.scrollTop+=dy;const t=performance.now();const dt=Math.max(8,t-lt);vel=t-lt<80?vel*.5+dy/dt*.5:dy/dt;lt=t;cancelAnimationFrame(raf);return true};
 addEventListener('touchend',()=>{const s=sc();if(!s||performance.now()-lt>60||Math.abs(vel)<.1)return;let v=vel*16,p=performance.now();const f=t=>{const d=Math.min(40,t-p);p=t;v*=Math.pow(.95,d/16);s.scrollTop+=v*d/16;if(Math.abs(v)>.4)raf=requestAnimationFrame(f)};raf=requestAnimationFrame(f)},{passive:true})}
