/* ───────── 연대표: 시대 버튼 = 전체 속에서 그 시대로 이동 (한 줄로 이어 그림) ───────── */
let ovCont=null,ovBuilding=false;
function ovSecs(){return [...$('ovchart').querySelectorAll('.ovsec')]}
function buildCont(){const V=ovDir==='v',sc=$('ovscroll'),parts=[];ovBuilding=true;if(V)ovDir='h';
  try{for(const E of ERAS){drawEra(E.k);const html=$('ovchart').innerHTML;
    parts.push(`<section class="ovsec hsec" data-sec="${E.k}">${html}</section>`)}}
  finally{ovBuilding=false;if(V)ovDir='v'}
  $('v-ov').classList.add('hzsplit');
  $('ovchart').innerHTML=`<div class="hzall">${parts.join('')}</div>`;
  $('ovsum').innerHTML='';$('ovside').innerHTML='';
  if(V)vSlice();else hzAlign();
  ovCont={dir:ovDir,w:sc.clientWidth,dirty:false};if(!V)hzSync()}
/* 세로: 가로 연대표를 화면 폭만큼 잘라 줄줄이 쌓기 (글자 안 잘리는 자리에서 자름) */
function vSlice(){const sc=$('ovscroll'),cw=Math.max(280,sc.clientWidth-20),out=[];
  for(const s of $('ovchart').querySelectorAll('.hsec')){const top=s.querySelector('.hztop');if(!top)continue;const r0=top.getBoundingClientRect(),W=top.scrollWidth||r0.width,H=top.offsetHeight;
    const iv=[],bx=[];top.querySelectorAll('*').forEach(el=>{if(el.children.length&&!(el instanceof SVGElement))return;const r=el.getBoundingClientRect();if(!r.width||!r.height)return;const L=r.left-r0.left,T=r.top-r0.top;if(r.height<H*.8)bx.push([L,L+r.width,T,T+r.height]);if(r.width>cw*.6)return;iv.push([L-3,L+r.width+3])});
    const ok=x=>!iv.some(([a,b])=>x>a&&x<b);const Wc=Math.min(W,Math.max(0,...iv.map(q=>q[1]))+12);let x0=0;const rows=[];
    const nR=Math.max(1,Math.ceil((Wc-2)/(cw*1.0)));let left=nR;while(x0<Wc-2){const step=(Wc-x0)/left;let x1=Math.min(Wc,x0+Math.min(cw,step));if(x1<Wc-2){const cutN=c=>iv.reduce((n,[a,b])=>n+(c>a&&c<b?1:0),0);let best=x1,bc=1e9;for(let c=x0+cw*.3;c<=Math.min(Wc,x0+cw);c+=3){const sc=cutN(c)*1000+Math.abs(c-x1);if(sc<bc){bc=sc;best=c}}x1=best}rows.push([x0,x1]);x0=x1;left=Math.max(1,left-1)}
    const inner=top.outerHTML;
    out.push(`<section class="ovsec vsec vcut" data-sec="${s.dataset.sec}">${rows.map(([a,b])=>{const ys=bx.filter(q=>q[1]>a&&q[0]<b);const y0=Math.max(0,Math.min(...ys.map(q=>q[2]))-6),y1=Math.min(H,Math.max(...ys.map(q=>q[3]))+6);const t=isFinite(y0)?y0:0,h=isFinite(y1)?y1-t:H;return `<div class="vrow" style="width:${Math.ceil(b-a)}px;height:${h}px"><div class="vrin" style="left:${-a}px;top:${-t}px;width:${W}px;height:${H}px">${inner}</div></div>`}).join('')}</section>`)}
  $('v-ov').classList.remove('hzsplit');$('ovchart').innerHTML=out.join('')}
/* 가로: 시대마다 연도 줄 높이를 맞춰 한 줄로 이어지게 */
function hzAlign(){const secs=[...$('ovchart').querySelectorAll('.hsec')];const ys=secs.map(s=>{const a=s.querySelector('.hzax');return a?a.getBoundingClientRect().top:null});const mx=Math.max(...ys.filter(v=>v!=null));
  secs.forEach((s,i)=>{if(ys[i]==null)return;const d=mx-ys[i];if(d<1)return;const top=s.querySelector('.hztop');const inner=top&&top.querySelector(':scope>div[style*="left:0;right:0"]');if(!inner)return;inner.style.top=(parseFloat(inner.style.top)||0)+d+'px';top.style.height=(top.offsetHeight+d)+'px'});
  const hs=secs.map(s=>s.querySelector('.hztop').offsetHeight);const mh=Math.max(...hs);secs.forEach((s,i)=>{const t=s.querySelector('.hztop');if(hs[i]<mh)t.style.height=mh+'px'})}
function ovGoSec(k,smooth){const s=$('ovchart').querySelector(`.ovsec[data-sec="${k}"]`);if(!s)return;
  if(ovDir==='h'){const sc=$('ovscroll');sc.scrollTo({left:s.getBoundingClientRect().left-sc.getBoundingClientRect().left+sc.scrollLeft,behavior:smooth?'smooth':'auto'})}
  else{const rd=$('ovread');const hd=$('v-ov').querySelector('.rhead');const top=Math.max(rd.getBoundingClientRect().top,hd&&hd.offsetHeight?hd.getBoundingClientRect().bottom:0);const y=s.getBoundingClientRect().top-top+rd.scrollTop-6;rd.scrollTo({top:y,behavior:smooth?'smooth':'auto'})}}
{const prev=drawEra;drawEra=function(k){if(ovBuilding||k==='all'||k==='heart'||!ERA[k]){if(!ovBuilding)ovCont=null;return prev(k)}
  const sc=$('ovscroll');if(!ovCont||ovCont.dir!==ovDir||ovCont.dirty||Math.abs(sc.clientWidth-ovCont.w)>24||!$('ovchart').querySelector('.ovsec'))buildCont();
  requestAnimationFrame(()=>ovGoSec(k))}}
{const os=ovShow;ovShow=function(k,keep){if(k==='all'||(!ERA[k]&&k!=='heart'))k='prehist';if(ovCont&&typeof ovDirty!=='undefined'&&ovDirty)ovCont.dirty=true;const had=!!(ovCont&&$('ovchart').querySelector('.ovsec'));const sc=$('ovscroll'),rd=$('ovread'),sl=sc.scrollLeft,st=rd.scrollTop;os(k,keep);if(ovCont&&ERA[k]&&!keep){if(had){sc.scrollLeft=sl;rd.scrollTop=st;requestAnimationFrame(()=>ovGoSec(k,true))}else{ovGoSec(k);requestAnimationFrame(()=>ovGoSec(k))}}}}
/* 스크롤하면 지금 보이는 시대 버튼에 불 켜기 */
let ovSpyT=0;let ovSpy=function(){if(!ovCont)return;clearTimeout(ovSpyT);ovSpyT=setTimeout(()=>{const H=ovDir==='h',ref=H?$('ovscroll').getBoundingClientRect().left+60:$('ovread').getBoundingClientRect().top+80;let cur=null;
  for(const s of ovSecs()){const r=s.getBoundingClientRect();if((H?r.left:r.top)<=ref)cur=s.dataset.sec}if(!cur||cur===ovSel)return;ovSel=cur;store.set('overa',cur);
  $('ovchips').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.e===cur));const a=$('ovchips').querySelector(`[data-e="${cur}"]`);if(a)a.scrollIntoView({inline:'nearest',block:'nearest',behavior:'smooth'})},80)}
$('ovscroll').addEventListener('scroll',ovSpy,{passive:true});$('ovread').addEventListener('scroll',ovSpy,{passive:true});
/* 가로: 시대마다 요약·왕 이름이 그 시대 안에서 왼쪽에 붙어 따라오게 */
hzSync=function(){const sc=$('ovscroll');if(!sc)return;const L=sc.scrollLeft,cw=sc.clientWidth,SL=sc.getBoundingClientRect().left;
  sc.querySelectorAll('.hzwrap').forEach(w=>{const sec=w.closest('.ovsec'),x0=w.getBoundingClientRect().left-SL+L,ww=w.offsetWidth;if(x0>L+cw||x0+ww<L)return;
    const s=w.querySelector('.hzsum');if(s)s.style.transform=`translateX(${Math.max(0,Math.min(L-x0,ww-s.offsetWidth))}px)`;
    w.querySelectorAll('.hzbot .hzk').forEach(k=>{const sp=k.firstElementChild;if(!sp)return;const a=k.getBoundingClientRect().left-SL+L,kw=k.offsetWidth;sp.style.transform=`translateX(${Math.max(0,Math.min(L-a,kw-sp.offsetWidth-4))}px)`})})};
/* 시대 버튼은 왼쪽 세로 줄로 */
function ovRail(){const v=$('v-ov');let r=$('ovrail');if(!r){r=document.createElement('nav');r.id='ovrail';r.setAttribute('aria-label','시대');v.prepend(r)}
  const d=v.querySelector('.ovdir'),c=$('ovchips');if(d&&d.parentNode!==r)r.prepend(d);if(c&&c.parentNode!==r)r.append(c);v.classList.add('railed')}
{const oc=ovChips;ovChips=function(){const x=oc.apply(this,arguments);ovRail();return x}}
if(document.querySelector('#v-ov .ovdir')||$('ovchips').children.length)ovRail();
/* 좁은 화면: 옆으로 넘치는 줄은 마우스로도 끌어서 넘기기, 휠도 가로로 */
{const SEL='.jump,.chips,.htree,.hchain,#ovscroll,.fontgrid';let dr=null,moved=false;
 document.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;const el=e.target.closest(SEL);if(!el||el.scrollWidth<=el.clientWidth+2)return;if(e.target.closest('input,textarea,.hzbot'))return;dr={el,x:e.clientX,sl:el.scrollLeft};moved=false});
 document.addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x;if(!moved&&Math.abs(dx)>5){moved=true;dr.el.classList.add('dragging')}if(moved){dr.el.scrollLeft=dr.sl-dx;e.preventDefault()}});
 const end=()=>{if(dr){dr.el.classList.remove('dragging');dr=null}};document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);
 document.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true);
 document.addEventListener('wheel',e=>{const el=e.target.closest('.jump,.chips');if(!el||el.scrollWidth<=el.clientWidth+2||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;if(el.closest('#ovrail'))return;el.scrollLeft+=e.deltaY;e.preventDefault()},{passive:false})}
/* ───────── 한눈에 구분: 칸마다 색·상자·굵은 제목 ───────── */
const SEC_COL={'업적':'#b91c1c','어떤 사람':'#b91c1c','관련 사건':'#1d4ed8','최후':'#475569','물러남':'#475569','동시대 왕':'#7c3aed','동시대':'#7c3aed','동시대 인물':'#047857','함께 나오는 인물':'#047857','같은 시기 인물':'#0e7490','주변국':'#b45309'};
const NAT_COL={'고조선':'#8a6d1f','가야':'#6b7280','고구려':'#b91c1c','백제':'#1d4ed8','신라':'#a16207','발해':'#6d28d9','후고구려':'#be123c','후백제':'#2563eb','고려':'#0f766e','조선':'#1e40af','대한제국':'#b08900','한국':'#1d4ed8','대한민국':'#1d4ed8','북한':'#b91c1c','중국':'#c2410c','북방 민족':'#7c2d12','일본':'#be185d','미국':'#0369a1','러시아·소련':'#991b1b','영국':'#4338ca','프랑스':'#4f46e5','독일':'#3f3f46','캐나다':'#dc2626','인도':'#ea580c','외국':'#64748b','기타':'#64748b'};
function paintSections(root){if(!root)return;root.querySelectorAll('.kpin>section').forEach(s=>{const h=s.querySelector('h3');if(!h)return;const k=h.textContent.trim();const c=SEC_COL[k]||Object.entries(SEC_COL).find(([a])=>k.startsWith(a))?.[1]||'#475569';s.style.setProperty('--sc',c);s.classList.add('kpsec')});
  root.querySelectorAll('.kpng p>b').forEach(b=>{b.style.setProperty('--nc',NAT_COL[b.textContent.trim()]||'#64748b')})}
{const ok=openKing;openKing=function(){ok.apply(this,arguments);paintSections($('kpage'))};const op=openPerson;openPerson=function(){op.apply(this,arguments);paintSections($('kpage'))}}
/* 검색 결과: 묶음마다 색 상자 */
const SR_COL={'인물':'#047857','왕':'#7c3aed','구조도':'#c2410c','낱말':'#6d28d9','사건':'#1d4ed8','장소':'#0e7490'};
{const sr=srRun;srRun=function(q){sr(q);const box=$('srres');if(!box.querySelector('h4'))return;const out=document.createElement('div');let g=null;[...box.childNodes].forEach(n=>{if(n.nodeType===1&&n.tagName==='H4'){g=document.createElement('div');g.className='srgrp';const k=Object.keys(SR_COL).find(k=>n.textContent.startsWith(k));g.style.setProperty('--sc',SR_COL[k]||'#475569');out.appendChild(g)}(g||out).appendChild(n)});box.innerHTML='';box.appendChild(out)}}
/* 마우스를 올리면 버튼 이름 말풍선 (아이콘 버튼·로그인 등) */
{const tip=document.createElement('div');tip.id='hovtip';document.body.appendChild(tip);let cur=null,tT=0;
 const nameOf=el=>{if(el.title){el.dataset.tt=el.title;el.removeAttribute('title')}return el.dataset.tt||el.getAttribute('aria-label')||''};
 const isIconish=el=>{const t=(el.textContent||'').replace(/\s+/g,'');return !t||t.length<=3||el.dataset.tt};
 document.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const el=e.target.closest('button[aria-label],button[title],button[data-tt],[role=button][aria-label]');if(!el||el===cur)return;if(!isIconish(el)&&!el.matches('.loginb')){return}const n=nameOf(el);if(!n)return;cur=el;clearTimeout(tT);tT=setTimeout(()=>{if(cur!==el)return;tip.textContent=n;tip.classList.add('on');const r=el.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;let x=r.left+r.width/2-w/2,y=r.bottom+8;if(y+h>innerHeight-6)y=r.top-h-8;x=Math.max(6,Math.min(innerWidth-w-6,x));tip.style.left=x+'px';tip.style.top=y+'px'},250)});
 document.addEventListener('pointerout',e=>{if(!cur)return;if(e.relatedTarget&&cur.contains(e.relatedTarget))return;cur=null;clearTimeout(tT);tip.classList.remove('on')});
 document.addEventListener('pointerdown',()=>{cur=null;clearTimeout(tT);tip.classList.remove('on')},true)}
/* 지도 아이콘 설명 모아 보기 */
{const z=document.querySelector('.zoom');if(z){z.insertAdjacentHTML('beforeend','<button id="zleg" type="button" aria-label="아이콘 설명"><svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6M12 16.8v.2"/></svg></button>');
 const pop=document.createElement('div');pop.id='iconleg';pop.hidden=true;$('v-map').appendChild(pop);
 const ic=(inner,cls='')=>`<svg viewBox="-13 -13 26 26" class="lgi"><g class="pin ${cls}">${inner}</g></svg>`;
 const dot=c=>`<circle class="dot" r="8" style="fill:${c}"/>`;const gl=k=>{const I=ICON_GL[k];return ic(dot(I[2]||'var(--t-pol)')+`<path class="gp${I[1]?' f':''}${k==='inc'?' bold':''}" d="${I[0]}"/>`)};
 const rows=[
  ['나라 세움',ic(dot('#c2410c')+`<path class="gp f" d="${GLYPH.crown[0]}"/>`)],
  ['멸망',ic(`<circle class="dot" r="8" style="fill:color-mix(in srgb,var(--ink) 80%,var(--seal))"/><path class="gp" d="M-3.6,-3.6L3.6,3.6M3.6,-3.6L-3.6,3.6"/>`)],
  ['침입당함 · 전쟁',ic(`<path class="burst" d="${BURST}"/><path class="burst2" d="${BURST2}"/>`)],
  ['막아냄 · 승리',gl('def')],['공격 · 진출',gl('atk')],['작전',gl('op')],
  ['조약',ic(`<circle class="seal" r="8.5"/><text class="sealt" x="0" y="3.6">조</text>`)],
  ['백성의 봉기 (난·농민 봉기)',gl('rev')],['권력 다툼 · 정변',gl('coup')],['유물 · 유적',gl('relic')],['사건 · 사고',gl('inc')],
  ['정치 · 민족 운동',`<svg viewBox="-6 -30 26 34" class="lgi"><g class="pin"><path class="pole" d="M0,1.5V-26"/><path class="flg" d="M0.8,-25.5C5,-28.5,9.5,-22,15,-25.2V-14.8C9.5,-11.6,5,-18.1,0.8,-15.1Z" style="fill:var(--t-ind)"/></g></svg>`]];
 const tps=(typeof TOPICS!=='undefined'?TOPICS:[]).map(t=>`<span><i style="background:var(--t-${t.k})"></i>${esc(t.n)}</span>`).join('');
 pop.innerHTML=`<div class="lghd"><b>지도 아이콘</b><button type="button" class="lgx" aria-label="닫기">✕</button></div><ul>${rows.map(([n,s])=>`<li>${s}<span>${n}</span></li>`).join('')}</ul>${tps?`<div class="lgt"><b>그 밖의 점 색 = 주제</b><div>${tps}</div></div>`:''}`;
 $('zleg').onclick=e=>{e.stopPropagation();pop.hidden=!pop.hidden};pop.querySelector('.lgx').onclick=()=>pop.hidden=true;
 document.addEventListener('pointerdown',e=>{if(!pop.hidden&&!e.target.closest('#iconleg,#zleg'))pop.hidden=true})}}

document.addEventListener('click',e=>{const b=e.target.closest('.sumtg');if(!b)return;const s=b.closest('.ovsec').querySelector('.ovsecsum');s.hidden=!s.hidden;b.setAttribute('aria-expanded',!s.hidden);b.textContent=s.hidden?'요약 보기':'요약 접기'});
/* ───────── 교과서 지도처럼: 사건 번호·날짜, 화살표 범례 ───────── */
const circNum=n=>n<=20?String.fromCharCode(0x2460+n-1):n<=35?String.fromCharCode(0x3251+n-21):n<=50?String.fromCharCode(0x32B1+n-36):'('+n+')';
function evDate(e){if(e.yl||e.y<-3000)return '';if(e.y<0)return 'BC '+(-e.y);return e.y+(e.m&&e.y>=1100?'.'+e.m+'.':'')}
{const byF=new Map();for(const o of OV){if(!o.pin||!o.t)continue;const f=o.pin.f;if(!byF.has(f))byF.set(f,[]);byF.get(f).push(o)}
 byF.forEach(list=>{list.sort((a,b)=>a.pin.T-b.pin.T);
   /* 번호는 이어지는 사건(전쟁·운동처럼 기간이 있는 일)끼리만 */
   const num=new Map();ONGOING.forEach(q=>{const ser=list.filter(o=>{const e=o.pin;return e.T>=q[0]-.05&&e.T<=q[1]+.3&&(e.tp.includes('war')||e.vs||e.ar||e.t.includes(q[2].slice(0,2)))&&!num.has(o)});if(ser.length>=2)ser.forEach((o,k)=>num.set(o,k+1))});
   list.forEach((o,i)=>{const e=o.pin,t=o.t;const name=t.textContent;const d=evDate(e);t.textContent='';
   if(num.has(o)){const s1=document.createElementNS('http://www.w3.org/2000/svg','tspan');s1.setAttribute('class','lnum');s1.textContent=circNum(num.get(o))+' ';t.appendChild(s1)}
   t.appendChild(document.createTextNode(name));if(d){const s2=document.createElementNS('http://www.w3.org/2000/svg','tspan');s2.setAttribute('class','ldate');s2.textContent=' '+d;t.appendChild(s2)}})});
 schedLabels()}
/* 화살표 범례: 지금 보이는 화살표가 누구의 진로인지 */
const FOREIGN=['홍건적','중국군','중공군','거란','몽골','후금','여진','당','수','원','명','청','금','연','한','왜','러시아','프랑스','영국','미국'];
function arrName(c,e){const y=e.y;const k=n=>n;
  if(c==='japan')return y<1868?'왜군':'일본군';if(c==='north')return '북한군';if(c==='south')return '국군';if(c==='us')return y>=1950?'유엔군·미군':'미군';if(c==='ussr')return '소련군';
  if(c==='han'){const src=(e.vs||'')+' '+e.t;let best=null,bi=1e9;FOREIGN.forEach(f=>{const re=new RegExp('(^|[^가-힣])'+f+'(군|$|[^가-힣])');const m=src.match(re);if(m&&m.index<bi){bi=m.index;best=f}});return best?(/군$/.test(best)?best:best+'군'):'중국·북방 세력'}
  const D=REIGNS.find(D=>D.c===c);return D?(D.n==='남한'?'국군':D.n+'군'):c}
{const lg=document.createElement('div');lg.id='arrleg';lg.hidden=true;$('v-map').appendChild(lg);
 window.updArrLeg=function(){const seen=new Map();(byFrame[pos.i]||[]).forEach(e=>{const ps=arrOf.get(e.id);if(!ps)return;ps.forEach(p=>{const cl=p.g.classList;if(cl.contains('hide')||cl.contains('gone')||cl.contains('stale')||cl.contains('dim'))return;const nm=arrName(p.c,e);const key=nm+'|'+p.dash;if(!seen.has(key))seen.set(key,{nm,col:acol(p.c),dash:p.dash})})});
   if(!seen.size||$('v-map').hidden){lg.hidden=true;return}lg.hidden=false;{const dk=$('dock'),vm=$('v-map');if(dk&&vm){const a=vm.getBoundingClientRect(),b2=dk.getBoundingClientRect();lg.style.bottom=Math.max(10,a.bottom-b2.top+10)+'px'}}lg.innerHTML=[...seen.values()].slice(0,6).map(o=>`<div><svg viewBox="0 0 30 10"><path d="M2 5H20" style="stroke:${o.col};stroke-width:3"${o.dash?' stroke-dasharray="4 3"':''}/><path d="M18 0.8L28 5L18 9.2Z" style="fill:${o.col};stroke:none"/></svg>${esc(o.nm)} ${o.dash?'이동':'진로'}</div>`).join('')};
 const ut=updateTime;updateTime=function(ch){ut(ch);clearTimeout(updArrLeg.t);updArrLeg.t=setTimeout(updArrLeg,60)}}

/* 연대표 방향: 화면이 가로면 가로, 세로로 세우면 세로 (자동) */
{const fit=()=>{const want=(innerHeight>innerWidth*1.05)?'v':'h';if(want===ovDir)return;ovDir=want;ovCont=null;if(!$('v-ov').hidden&&ovSel)ovShow(ovSel)};let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(fit,250)});addEventListener('orientationchange',()=>setTimeout(fit,300))}

/* 선사 특징: 위 칸의 시대 이름(구석기·신석기) 바로 밑으로 올리기 */
function hzLift(){document.querySelectorAll('#ovchart .hzwrap').forEach(w=>{const top=w.querySelector('.hztop');const inn=top&&top.querySelector(':scope>div[style*="left:0;right:0"]');if(!inn)return;const r0=inn.getBoundingClientRect();
  const ns=[...w.querySelectorAll('.hzbot .hznt')];const lbs=ns.map(n=>{const b=n.querySelector('button[data-ev]');return b&&top.querySelector(`.hzn[data-ev="${b.dataset.ev}"]`)}).filter(Boolean);if(lbs.length>1){const t=Math.min(...lbs.map(l=>parseFloat(l.style.top)||0));lbs.forEach(l=>l.style.top=t+'px')}const sts=[...w.querySelectorAll(':scope>.hzst')].map(e=>parseFloat(e.style.left)||0).sort((a,b)=>a-b);const stOf=l=>sts.filter(v=>v<=(parseFloat(l.style.left)||0)+l.offsetWidth/2+1).pop();const so=lbs.map(stOf);if(so.every(v=>v!=null)&&new Set(so).size===so.length)lbs.forEach((l,i)=>{l.style.left=(so[i]+10)+'px';l.style.width='auto'});
  ns.forEach(n=>{const b=n.querySelector('button[data-ev]');const lb=b&&top.querySelector(`.hzn[data-ev="${b.dataset.ev}"]`);if(!lb)return;const r=lb.getBoundingClientRect();
    b.remove();n.classList.add('lift');n.style.left=(r.left-r0.left)+'px';n.style.top=(r.bottom-r0.top+4)+'px';inn.appendChild(n);const need=inn.offsetTop+n.offsetTop+n.offsetHeight+12;if(need>top.offsetHeight)top.style.height=need+'px'})})}


/* 키보드 방향키 = 부드러운 드래그 (누르고 있는 동안 일정한 속도로, 떼면 서서히 멈춤) */
{const KM={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1],Left:[-1,0],Right:[1,0],Up:[0,-1],Down:[0,1],UIKeyInputLeftArrow:[-1,0],UIKeyInputRightArrow:[1,0],UIKeyInputUpArrow:[0,-1],UIKeyInputDownArrow:[0,1]},KC={37:[-1,0],38:[0,-1],39:[1,0],40:[0,1]};
 const held=new Map();let raf=0,last=0,vx=0,vy=0,tgt=null,acc={x:0,y:0},boost=1;
 const keyOf=e=>KM[e.key]||KC[e.keyCode];
 const typing=t=>t&&(t.isContentEditable||/^(TEXTAREA|SELECT)$/.test(t.tagName)||(t.tagName==='INPUT'&&!/^(checkbox|radio|button)$/.test(t.type)));
 const pick=(root,ax)=>{let best=null,ba=0;[root,...root.querySelectorAll('*')].forEach(el=>{if(!el.offsetParent&&el!==root)return;const cs=getComputedStyle(el),ov=ax?cs.overflowY:cs.overflowX;if(!/auto|scroll/.test(ov))return;const can=ax?el.scrollHeight-el.clientHeight>2:el.scrollWidth-el.clientWidth>2;if(!can)return;const r=el.getBoundingClientRect(),a=r.width*r.height;if(a>ba){ba=a;best=el}});return best};
 function findT(D){
   const ovl=[...document.querySelectorAll('#kpage,#ovpop,.modal,[role=dialog]')].find(x=>!x.hidden&&x.offsetParent!==null);
   const gen=root=>{const v=pick(root,1),h=pick(root,0);return {v:v||document.scrollingElement,h:h||null}};
   if(ovl)return gen(ovl);
   if(!$('v-map').hidden)return {map:true};
   if(!$('v-ov').hidden){const sc=$('ovscroll');if(ovDir==='h'){const b=[...sc.querySelectorAll('.hzbot')].find(b=>{const r=b.getBoundingClientRect();return r.right>0&&r.left<innerWidth});return {h:sc,v:b||null}}return {v:$('ovread'),h:null}}
   const v=[...document.querySelectorAll('section.view')].find(x=>!x.hidden);return v?gen(v):null}
 const MAXV=520; // 화면 px / 초
 function tick(now){const dt=Math.min(.05,(now-last)/1000);last=now;let dx=0,dy=0;held.forEach(d=>{dx+=d[0];dy+=d[1]});
   const k=1-Math.exp(-dt*(held.size?6:5));vx+=(dx*MAXV*boost-vx)*k;vy+=(dy*MAXV*boost-vy)*k;
   if(!held.size&&Math.abs(vx)<4&&Math.abs(vy)<4){raf=0;vx=vy=0;return}
   const mx=vx*dt,my=vy*dt;
   if(tgt&&tgt.map){const kk=kNow();setVB({...vb,x:vb.x+mx*kk,y:vb.y+my*kk});userMoved=true}
   else if(tgt){let H=tgt.h,V=tgt.v,ax=mx,ay=my;if(!H&&V&&tgt.v!==$('ovscroll')&&!(V.scrollWidth-V.clientWidth>2)){ay+=ax;ax=0}
     if(H&&ax){acc.x+=ax;const s=Math.trunc(acc.x);if(s){H.scrollLeft+=s;acc.x-=s}}
     if(V&&ay){acc.y+=ay;const s=Math.trunc(acc.y);if(s){if(V.classList&&V.classList.contains('hzbot')&&window.hzScrollBy)hzScrollBy(s);else V.scrollTop+=s;acc.y-=s}}}
   raf=requestAnimationFrame(tick)}
 addEventListener('keydown',e=>{const D=keyOf(e);if(!D||e.altKey||e.metaKey)return;const t=e.target;if(typing(t)||(t&&t.tagName==='INPUT'&&t.type==='range'))return;
   {const ft=findT(D);const onMap=!!(ft&&ft.map);if(onMap!==!!e.ctrlKey)return} /* 지도: Ctrl+방향키로 움직이기, 다른 화면: 방향키 */
   e.preventDefault();e.stopPropagation();boost=e.shiftKey?2.5:1;if(held.has(e.code||e.key))return;
   if(!held.size||!tgt){tgt=findT(D);acc={x:0,y:0};if(tgt&&tgt.map){cancelAnimationFrame(vbRAF);if(typeof schedRecenter==='function')schedRecenter()}}
   held.set(e.code||e.key,D);if(!raf){last=performance.now();vx=D[0]*MAXV*.5*boost;vy=D[1]*MAXV*.5*boost;raf=requestAnimationFrame(tick)}},true);
 addEventListener('keyup',e=>{if(held.delete(e.code||e.key)&&!held.size&&tgt&&tgt.map&&typeof schedRecenter==='function')schedRecenter();boost=e.shiftKey?2.5:1},true);
 addEventListener('blur',()=>held.clear());}

addEventListener('pointerdown',e=>{const t=e.target;if(!(t.closest&&t.closest('input,textarea,select,[contenteditable]'))){try{window.focus()}catch(_){}}},true);try{window.focus()}catch(_){}
/* 구조도: 옆에 남는 자리가 있으면 흐름(→) 카드를 세로로 세워서 끼워 넣기 */
function trTight(tb){tb.querySelectorAll('.hn').forEach(h=>h.style.maxWidth='');tb.querySelectorAll('.trcard:not(.vtr) .htree .hn').forEach(h=>{const r0=h.getBoundingClientRect();if(!r0.width)return;let mx=0;const rg=document.createRange();const tw=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);while(tw.nextNode()){const t=tw.currentNode;if(!t.nodeValue.trim())continue;rg.selectNodeContents(t);[...rg.getClientRects()].forEach(r=>{if(r.width)mx=Math.max(mx,r.right)})}h.querySelectorAll('.ha>i').forEach(e=>{const r=e.getBoundingClientRect();if(r.width)mx=Math.max(mx,r.right)});const pr=parseFloat(getComputedStyle(h).paddingRight)||0;const w=Math.ceil(mx-r0.left+pr+1);if(w<r0.width-4)h.style.maxWidth=w+'px'})}
function trPack(){const tb=$('trbody');if(!tb||!tb.offsetParent)return;const cs=[...tb.children].filter(c=>c.classList.contains('trcard'));
  cs.forEach(c=>c.classList.remove('vtr','vfit','vauto'));trTight(tb);
  const H=()=>tb.scrollHeight;const i0=Math.max(0,cs.findIndex(c=>c.id==='tree-abroad'));
  cs.forEach(c=>{const h=c.querySelector('.htree');if(h&&h.scrollWidth>h.clientWidth+2)c.classList.add('vtr','vauto')});
  /* 앞쪽(개항기까지): 흐름 카드만 옆 자리에 세로로 끼워 넣기 */
  tb.classList.add('trmeasure');
  for(let i=1;i<i0;i++){const c=cs[i],p=cs[i-1];if(!c.querySelector('.hchain')||c.classList.contains('vtr'))continue;if(c.offsetTop===p.offsetTop)continue;
    c.classList.add('vfit');if(c.offsetTop!==p.offsetTop||c.offsetHeight>p.offsetHeight*1.6)c.classList.remove('vfit')}
  tb.classList.remove('trmeasure');
  /* 독립운동 이후: 가로·세로 중 효율적인 쪽 */
  const cls=c=>c.querySelector('.htree')?'vtr':'vfit';
  const ok=c=>c&&!/tree-(laws|orgs)/.test(c.id)&&!c.classList.contains('vauto')&&(c.querySelector('.htree')||c.querySelector('.hchain'));
  for(let i=i0;i<cs.length-1;i++){const A=cs[i],B=cs[i+1];const h0=H();let best=null,bh=h0-40;
    for(const [x,y] of [[1,0],[0,1],[1,1]]){if((x&&!ok(A))||(y&&!ok(B)))continue;if(x)A.classList.add(cls(A));if(y)B.classList.add(cls(B));const h=H();if(h<bh){bh=h;best=[x,y]}if(x)A.classList.remove(cls(A));if(y)B.classList.remove(cls(B))}
    if(best){if(best[0])A.classList.add(cls(A));if(best[1])B.classList.add(cls(B));i++}}
  cs.slice(i0).forEach(c=>{if(!ok(c))return;const k=cls(c);const h0=H();c.classList.toggle(k);if(!(H()<h0-40))c.classList.toggle(k)});
  trTight(tb)}
function keepParens(root){if(!root)return;const RE=/[^\s,()]*\([^()]{1,40}\)[^\s,()]*/g;root.querySelectorAll('.hn small,.hn em,.trflow li').forEach(el=>{const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.plw,.kpar')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const ns=[];while(w.nextNode())ns.push(w.currentNode);
  ns.forEach(tn=>{const t=tn.nodeValue;RE.lastIndex=0;if(!RE.test(t))return;RE.lastIndex=0;const f=document.createDocumentFragment();let i=0,m;while((m=RE.exec(t))){if(m.index>i)f.append(t.slice(i,m.index));const sp=document.createElement('span');sp.className='kpar';sp.textContent=m[0];f.append(sp);i=m.index+m[0].length}if(i<t.length)f.append(t.slice(i));tn.replaceWith(f)})})}
{const t1=trShow;trShow=function(){const r=t1.apply(this,arguments);try{keepParens($('trbody'))}catch(e){}requestAnimationFrame(trPack);return r};let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(trPack,300)})}
/* ───────── 조약 주요 내용 (누르면 펼침) ───────── */
const TREATY_TXT={
 '미일 화친 조약':['시모다·하코다테 2개 항구 개항','미국 배에 연료·식량 공급','미국에 일방적 최혜국 대우'],
 '강화도 조약':['제1관 조선은 자주국 → 청의 종주권 부정 의도','제4·5관 부산 외 2곳 개항 (원산 1880, 인천 1883)','제7관 일본의 조선 해안 측량권','제10관 개항장 일본인 범죄는 일본 영사가 재판 (영사 재판권·치외 법권)'],
 '조일 수호 조규 부록':['개항장에서 일본 화폐 사용','일본인 거류지 설정, 간행이정 10리','(무역 규칙) 양곡 무제한 유출','(무역 규칙) 무관세, 일본 선박 항세 면제'],
 '조미 수호 통상 조약':['서양과 맺은 최초의 조약 (청 이홍장 알선)','거중 조정','최혜국 대우 (최초)','치외 법권, 협정 관세 (관세 부과 첫 인정)','→ 보빙사 파견'],
 '제물포 조약':['배상금 지불','일본 공사관에 경비병 주둔','사죄 사절 파견 (박영효, 태극기 사용)'],
 '조청 상민 수륙 무역 장정':['조선은 청의 속방','청 상인의 한성 양화진 개설·내지 통상','청의 치외 법권, 상무위원 파견','→ 청·일 상인의 경쟁 심화'],
 '한성 조약':['일본에 사과','배상금 지불','일본 공사관 신축 비용 부담'],
 '톈진 조약':['청·일 양국 군대 동시 철수','파병 시 서로 미리 알림 (행문지조)','→ 청일 전쟁 때 일본 파병의 구실'],
 '시모노세키 조약':['청은 조선이 완전한 자주 독립국임을 인정','랴오둥 반도·타이완·펑후 제도를 일본에 할양','배상금 지불','→ 삼국 간섭(러·프·독)으로 랴오둥 반도 반환'],
 '제1차 한일 협약':['일본이 추천한 고문을 둠 (고문 정치)','재정 고문 메가타 → 화폐 정리 사업','외교 고문 스티븐스'],
 '포츠머스 조약':['(포츠머스) 러시아가 일본의 한국 지도·보호·감리권 인정','(포츠머스) 사할린 남부를 일본에 넘김','(가쓰라·태프트 밀약) 미국의 필리핀, 일본의 한국 지배를 서로 인정','(제2차 영일 동맹) 영국도 일본의 한국 지배 인정'],
 '을사늑약':['대한 제국의 외교권 박탈','통감부 설치 (초대 통감 이토 히로부미)','고종의 서명·비준 없음 → 무효 주장, 헤이그 특사(1907)','→ 민영환 자결, 「시일야방성대곡」, 을사의병'],
 '샌프란시스코 강화 조약':['일본의 주권 회복','일본이 한국 독립 인정, 제주도·거문도·울릉도 포기','독도는 명시되지 않음','한국은 서명국에서 제외'],
 '정전 협정':['군사 분계선(휴전선)과 비무장 지대(DMZ) 설정','포로 자유 송환','군사 정전 위원회·중립국 감독 위원회 설치','한국 정부는 서명하지 않음 (이승만 반대)'],
 '한미 상호 방위 조약':['외부 무력 공격 시 공동 대처','미군의 한국 주둔 근거']};
function treatyTxt(e){if(!e||!e.t)return null;const k=Object.keys(TREATY_TXT).find(k=>e.t.includes(k));return k?TREATY_TXT[k]:null}
const treatyHTML=e=>{const t=treatyTxt(e);return t?`<div class="tcl"><h4>조약 주요 내용</h4>${t.map(x=>`<div class="tci">${esc(x)}</div>`).join('')}</div>`:''};
{const ed=evDetailHTML;evDetailHTML=function(e){const h=ed.apply(this,arguments);const t=treatyHTML(e);if(!t)return h;const i=h.indexOf('<p');return i>=0?h.replace(/(<p[^>]*>[\s\S]*?<\/p>)/,'$1'+t):h+t}}
document.addEventListener('click',ev=>{const tb=ev.target.closest('.tclb');if(tb){ev.stopPropagation();ev.preventDefault();const e=EVENTS.find(x=>String(x.id)===tb.dataset.tcl);const nx=tb.nextElementSibling;if(nx&&nx.classList.contains('tcl')){nx.remove();tb.classList.remove('on');return}tb.insertAdjacentHTML('afterend',treatyHTML(e));tb.classList.add('on');return}
 const li=ev.target.closest('.lawl li[data-tl]');if(!li||ev.target.closest('button,.gw,.pl'))return;ev.stopPropagation();ev.preventDefault();const e=EVENTS.find(x=>String(x.id)===li.dataset.tl);if(!e)return;let box=li.querySelector('.tcl');if(box){box.remove();li.classList.remove('open');return}const t=treatyHTML(e);if(!t)return;li.querySelector('div').insertAdjacentHTML('beforeend',t);li.classList.add('open')},true);
{const rh=rowHTML;rowHTML=function(e){const h=rh.apply(this,arguments);if(!treatyTxt(e))return h;return h.replace(/(<p>[\s\S]*?<\/p>)/,`$1<button type="button" class="tclb" data-tcl="${e.id}">조약 내용</button>`)}}
function addTclb(root){(root||document).querySelectorAll('li[data-id]:not([data-tc])').forEach(li=>{li.dataset.tc=1;const e=EVENTS.find(x=>String(x.id)===li.dataset.id);if(!treatyTxt(e))return;const p=li.querySelector('p');if(p&&!li.querySelector('.tclb'))p.insertAdjacentHTML('afterend',`<button type="button" class="tclb" data-tcl="${e.id}">조약 내용</button>`)})}
addTclb();['tlbody','tpbody'].forEach(id=>{const el=$(id);if(el)new MutationObserver(()=>addTclb(el)).observe(el,{childList:true,subtree:true})});
/* ───────── 하트 모아 보기: 시대 버튼 대신 정렬 ───────── */
const HSORTS=[['add','추가한 순'],['time','시간 흐름순'],['imp','빈출순'],['custom','사용자 정의']];
function hSorted(){const q=($('q').value||'').trim().toLowerCase();const byT=new Map();EVENTS.forEach(e=>{if(!byT.has(e.t))byT.set(e.t,e)});
  let list=[...HEARTS].map(t=>byT.get(t)).filter(Boolean);
  if(q)list=list.filter(e=>(e.t+' '+e.x+' '+(e.p||'')+' '+(e.pp||'')+' '+(e.vs||'')+' '+yearLabel(e)).toLowerCase().includes(q));
  const m=store.get('hsort','add');
  if(m==='add')list.reverse();
  else if(m==='time')list.sort((a,b)=>a.T-b.T);
  else if(m==='imp'){const sc=e=>(e.top?2:0)+(isMajor(e)?1:0);list.sort((a,b)=>sc(b)-sc(a)||a.T-b.T)}
  else if(m==='custom'){const o=store.get('hord',[]);const ix=t=>{const i=o.indexOf(t);return i<0?1e6:i};const add=[...HEARTS];list.sort((a,b)=>ix(a.t)-ix(b.t)||add.indexOf(b.t)-add.indexOf(a.t))}
  return list}
function renderHList(){const body=$('tlbody'),v=$('v-tl');const on=tlHeart==='h';v.classList.toggle('hmode',on);let box=$('hlist');
  if(!on){if(box)box.remove();return}
  if(!box){box=document.createElement('section');box.id='hlist';const kh=$('tlkh');kh?kh.after(box):body.prepend(box)}
  const m=store.get('hsort','add'),list=hSorted(),cu=m==='custom';
  box.innerHTML=`<div class="hlh"><h3>하트한 사건 <small>${list.length}</small></h3><div class="hsort"><button type="button" class="hsbtn" aria-haspopup="true" aria-expanded="false">정렬 · ${HSORTS.find(s=>s[0]===m)[1]} ▾</button><div class="hsmenu" hidden>${HSORTS.map(([k,n])=>`<button type="button" data-hs="${k}" aria-pressed="${k===m}">${n}</button>`).join('')}</div></div></div>${cu&&list.length>1?'<p class="hshint">⠿ 를 잡고 위아래로 끌어 순서를 바꿔요</p>':''}<ol class="tl hl${cu?' cu':''}">${list.map(e=>{const r=rowHTML(e);return cu?r.replace('<li ','<li draggable="false" ').replace(/(<div class="d">)/,'<span class="hdrag" title="끌어서 순서 바꾸기">⠿</span>$1'):r}).join('')}</ol>${list.length?'':`<p class="dcempty">${$('q').value?'찾는 사건이 없어요.':'아직 하트한 사건이 없어요. 사건의 ♡를 누르면 여기 모여요.'}</p>`}`;
  $('tlnone').hidden=true;try{addTclb(box)}catch(_){}}
{const rt=renderTLFilter;renderTLFilter=function(){rt.apply(this,arguments);renderHList()}}
document.addEventListener('click',ev=>{const b=ev.target.closest('.hsbtn');const mn=document.querySelector('#hlist .hsmenu');
  if(b){ev.stopPropagation();mn.hidden=!mn.hidden;b.setAttribute('aria-expanded',!mn.hidden);return}
  const s=ev.target.closest('[data-hs]');if(s){ev.stopPropagation();if(s.dataset.hs==='custom'&&!store.get('hord',[]).length)store.set('hord',hSorted().map(e=>e.t));store.set('hsort',s.dataset.hs);renderHList();return}
  if(mn&&!mn.hidden&&!ev.target.closest('.hsmenu'))mn.hidden=true},true);
/* 사용자 정의: ⠿ 잡고 끌어서 순서 바꾸기 */
{let drag=null;
 document.addEventListener('pointerdown',ev=>{const h=ev.target.closest('#hlist .hdrag');if(!h)return;ev.preventDefault();const li=h.closest('li');drag={li,ol:li.parentElement,id:ev.pointerId};li.classList.add('dragging');try{h.setPointerCapture(ev.pointerId)}catch(_){}} ,true);
 document.addEventListener('pointermove',ev=>{if(!drag)return;ev.preventDefault();const y=ev.clientY;const sib=[...drag.ol.children].filter(x=>x!==drag.li);let before=null;for(const s of sib){const r=s.getBoundingClientRect();if(y<r.top+r.height/2){before=s;break}}
   if(before!==drag.li.nextElementSibling||(!before&&drag.ol.lastElementChild!==drag.li))drag.ol.insertBefore(drag.li,before);
   const rd=$('tlread'),rr=rd.getBoundingClientRect();if(y<rr.top+60)rd.scrollTop-=12;else if(y>rr.bottom-60)rd.scrollTop+=12},{passive:false});
 const end=()=>{if(!drag)return;drag.li.classList.remove('dragging');const byId=new Map(EVENTS.map(e=>[String(e.id),e.t]));const ord=[...drag.ol.children].map(li=>byId.get(li.dataset.id)).filter(Boolean);store.set('hord',ord);drag=null};
 document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end)}
/* 연대표 기간 막대를 누르면 그 시기 설명과 사건 목록 */
function openRgPop(s,e,n){const p=$('ovpop');const fs=FRAMES.filter(f=>f.t2>s&&f.t<e);const evs=EVENTS.filter(x=>x.T>=s-0.2&&x.T<e&&!x.llBan).sort((a,b)=>a.T-b.T);
  const cap=fs.map(f=>f.cap).filter(Boolean).slice(0,3);
  p.innerHTML=`<div class="evd"><div class="dt">${esc(yrTxt(Math.floor(s)))} ~ ${esc(yrTxt(Math.floor(e)))}</div><div class="hrow"><h2>${esc(n)}</h2></div>${cap.map(c=>`<p>${glx(c)}</p>`).join('')}${evs.length?`<h4 class="rgh">이 시기 사건 ${evs.length}</h4><div class="rgl">${evs.slice(0,40).map(x=>`<button type="button" data-rgev="${x.id}"><span>${esc(x.yl||yrTxt(Math.floor(x.T)))}</span>${esc(x.t)}</button>`).join('')}</div>`:''}<div class="nav"><button class="btn" data-x>닫기</button></div></div>`;
  p.hidden=false;$('ovdim').hidden=false;p.querySelector('[data-x]').onclick=closeOvPop;p.querySelectorAll('[data-rgev]').forEach(b=>b.onclick=()=>{const x=EVENTS.find(q=>q.id===+b.dataset.rgev);if(x)openOvPop(x)})}
document.addEventListener('click',ev=>{const r=ev.target.closest('#ovchart [data-rg]');if(!r||ev.defaultPrevented)return;const [s,e,...n]=r.dataset.rg.split('|');openRgPop(+s,+e,n.join('|'))});
/* '당시 ○○왕' 대신 '시기 철종 13년' (즉위한 해는 즉위년) */
{whoHTML=function(e,cls='who'){const R=kingRef(e);let s='';
  if(R){const {D,r}=R;let txt;if(r.name==='미군정'||D.n==='남한'||D.n==='북한')txt=r.name==='미군정'?'미군정':r.name;else{const n=Math.floor(e.T)-Math.floor(r.s);txt=`${D.n==='대한제국'?'대한 제국':D.n} ${r.name} ${n<=0?'즉위년':n+'년'}`}
    s+=`<span class="wk" style="--rc:var(--c-${D.c})"><i></i><em>시기</em>${esc(txt)}</span>`}
  if(e.pp)s+=`<span class="wp"><em>인물</em>${e.pp.split(/,\s*/).map(n=>`<button type="button" class="pn" data-person="${esc(n)}" data-pt="${e.T}">${esc(n)}</button>`).join(', ')}</span>`;return (s?`<div class="${cls}">${s}</div>`:'')+lnkHTML(e)}}
try{buildTL();renderTLFilter();addTclb()}catch(_){}
/* 같은 사람 다른 이름 → 왕 페이지로 (수양 대군 → 세조 등) */
const P_ALIAS={'수양대군':['조선','세조'],'수양 대군':['조선','세조'],'이방원':['조선','태종'],'정안군':['조선','태종'],'충녕대군':['조선','세종'],'충녕 대군':['조선','세종'],'이성계':['조선','태조'],'이방과':['조선','정종'],'연잉군':['조선','영조'],'이산':['조선','정조'],'왕건':['고려','태조'],'김춘추':['신라','태종 무열왕'],'김법민':['신라','문무왕'],'대조영':['발해','고왕'],'주몽':['고구려','동명성왕'],'온조':['백제','온조왕'],'박혁거세':['신라','박혁거세'],'이명복':['조선','고종']};
function aliasKing(n){if(!n)return null;let s=String(n).trim();const par=(s.match(/\(([^)]+)\)/)||[])[1];const base=s.replace(/\s*\(.*\)\s*/,'').trim();
  const a=P_ALIAS[base]||P_ALIAS[base.replace(/\s+/g,'')];const tryK=(dn,nm)=>{const D=DYN[dn];if(!D)return null;const i=D.r.findIndex(r=>r.name===nm||r.name.startsWith(nm)||r.name.replace(/\s*\(.*\)/,'')===nm);return i>=0?{dn,i}:null};
  if(a)return tryK(a[0],a[1]);if(par){const K=kingOfName(par);if(K)return {dn:K.D.n,i:K.i}}return null}
{const op=openPerson;openPerson=function(n,T){const k=aliasKing(n);if(k){openKing(k.dn,k.i);return}return op.apply(this,arguments)}}
/* 인물 정보 보강 */
Object.assign(PINFO,{
 '성삼문':'집현전 학사. 훈민정음 창제에 참여하였고, 단종 복위를 꾀하다 처형된 사육신의 한 사람(1456).',
 '박팽년':'집현전 학사 출신. 단종 복위 운동에 가담하였다가 처형된 사육신.',
 '하위지':'사육신의 한 사람. 세조의 왕위 찬탈에 반대하여 단종 복위를 꾀하다 처형되었다.',
 '이개':'사육신의 한 사람. 집현전 학사로 단종 복위 운동에 참여하였다.',
 '유성원':'사육신의 한 사람. 단종 복위 계획이 발각되자 스스로 목숨을 끊었다.',
 '유응부':'무신 출신 사육신. 단종 복위 운동 때 거사의 무력을 맡았다.',
 '김시습':'생육신의 한 사람. 세조 즉위 뒤 벼슬을 버리고 떠돌며 최초의 한문 소설 『금오신화』를 지었다.',
 '남효온':'생육신의 한 사람. 『육신전』을 지어 사육신의 충절을 기록하였다.',
 '김종서':'세종 때 6진을 개척한 장군. 단종을 보필하다 계유정난(1453) 때 수양 대군에게 죽임을 당하였다.',
 '한명회':'계유정난을 기획해 세조 즉위를 도운 공신. 이후 훈구 세력의 중심이 되었다.',
 '조광조':'중종 때 사림. 현량과 실시, 소격서 폐지, 위훈 삭제를 추진하다 기묘사화(1519)로 죽었다.',
 '이황':'조선 성리학자(퇴계). 『성학십도』를 지어 선조에게 바쳤고, 영남학파·동인(남인)의 뿌리가 되었다.',
 '이이':'조선 성리학자(율곡). 『성학집요』·『동호문답』, 수미법·10만 양병 주장, 기호학파·서인의 뿌리.',
 '허준':'선조·광해군 때 의관. 『동의보감』을 완성하였다(1610).',
 '장영실':'세종 때 과학자. 자격루·앙부일구·측우기 제작에 참여하였다.',
 '세종':'조선 제4대 왕. 집현전, 훈민정음 창제, 4군 6진 개척, 『농사직설』·측우기 등 과학 발전.',
 '김정희':'조선 후기 학자·서예가(추사). 추사체를 만들고 북한산비가 진흥왕 순수비임을 밝혔다.',
 '최제우':'동학 창시자(1860). 인내천 사상을 내세웠으나 혹세무민 죄로 처형되었다(1864).',
 '최익현':'위정척사 운동가. 흥선 대원군 탄핵, 개항 반대(왜양일체론), 을사의병을 일으켰다.',
 '민영환':'을사늑약에 항거하여 자결한 관리(1905).',
 '장지연':'『황성신문』에 「시일야방성대곡」을 실어 을사늑약을 비판하였다.',
 '방정환':'천도교 소년회를 이끌며 어린이날을 만들고 잡지 『어린이』를 펴냈다.',
 '이상재':'독립 협회·신간회 초대 회장. 조선 민립 대학 기성회를 이끌었다.',
 '조만식':'평양에서 조선 물산 장려 운동을 이끈 민족 운동가.',
 '김원봉':'의열단 단장. 조선 의용대를 만들고 한국 광복군 부사령관이 되었다.',
 '지청천':'한국 독립군 총사령관, 한국 광복군 총사령관.',
 '양세봉':'조선 혁명군 총사령관. 영릉가·흥경성 전투에서 일본군을 물리쳤다.',
 '이회영':'신민회 회원. 형제들과 재산을 정리해 서간도에 신흥 강습소를 세웠다.',
 '박은식':'『한국통사』·『한국독립운동지혈사』를 쓴 역사학자, 임시 정부 제2대 대통령.'});
/* 지도: 그 장면의 사건 핀이 화면 끝에 걸려 잘리지 않게 보기 범위를 넓힘 (한반도 둘레만) */
FRAMES.forEach((f,i)=>{if(!f.view||f.view===VS)return;const pts=EVENTS.filter(e=>e.f===i&&e.ll&&e.tp[0]!=='wld'&&e.ll[0]>117&&e.ll[0]<133&&e.ll[1]>32&&e.ll[1]<44.5).map(e=>e.ll);if(!pts.length)return;
  const v=f.view,padX=.45,padT=.55,padB=.3;let [a,b,c,d]=v;pts.forEach(([lo,la])=>{a=Math.min(a,lo-padX);c=Math.max(c,lo+padX);b=Math.min(b,la-padB);d=Math.max(d,la+padT)});f.view=[a,b,c,d]});
/* 지도 맞춤: 위쪽 머리말 밑으로 (지명이 머리말에 가려 잘리지 않게) */
{const sa=safeArea;safeArea=function(){const a=sa.apply(this,arguments);const s=svg.getBoundingClientRect(),tp=document.querySelector('.top');if(tp){const ov=tp.getBoundingClientRect().bottom-s.top+14;if(ov>a.t){a.h=Math.max(80,a.h-(ov-a.t));a.t=ov}}return a}}
/* 재생 중 경로가 있는 사건(동학·임진왜란·갑신정변 등)은 경로만큼 확대해 자세히 보여 주고 다시 돌아감 */
let rzT=0;
/* 재생 확대: 같은 장면에서 가까운 곳에 사건이 연달아 3개 이상 몰릴 때(임진왜란 남해안, 동학 농민 운동 등)와
   갑신정변처럼 꼭 짚을 사건만 확대. 확대 뒤엔 잠깐 멈춰 볼 시간을 주고, 그 묶음이 끝나면 다시 전체로 */
const RZ_FORCE=/갑신정변/,RZ_HOLD=1600,RZ_R=1.4;let rzCur=null,rzSeen=new Set();
function rzPts(e){const deg=X(1)-X(0),r=[];if(e.ll&&e.tp[0]!=='wld'&&e.ll[0]>117&&e.ll[0]<133&&e.ll[1]>32&&e.ll[1]<44.5)r.push([X(e.ll[0]),Y(e.ll[1])]);
  const ps=arrOf.get(e.id);if(ps){let w=0;ps.forEach(p=>w=Math.max(w,p.bb[2]-p.bb[0],p.bb[3]-p.bb[1]));if(w<=deg*1.6)ps.forEach(p=>{r.push([p.bb[0],p.bb[1]],[p.bb[2],p.bb[3]])})}return r}
function rzCluster(e){const deg=X(1)-X(0),L=byFrame[pos.i]||[],k=L.indexOf(e),a=rzPts(e);if(k<0||!a.length)return null;
  const hasR=x=>rzPts(x).length>(x.ll?1:0);const cx=a[0][0],cy=a[0][1];let pts=a.slice(),n=1,nr=hasR(e)?1:0,mem=[e.id],gap=[];
  for(let j=k+1;j<L.length;j++){const q=rzPts(L[j]);if(!q.length){gap.push(L[j].id);continue}if(q.some(([x,y])=>Math.hypot(x-cx,y-cy)>deg*RZ_R))break;mem.push(...gap,L[j].id);gap=[];pts=pts.concat(q);n++;if(hasR(L[j]))nr++}
  const force=RZ_FORCE.test(e.t);if((n<3||nr<2)&&!force)return null;
  let x0=Math.min(...pts.map(p=>p[0])),x1=Math.max(...pts.map(p=>p[0])),y0=Math.min(...pts.map(p=>p[1])),y1=Math.max(...pts.map(p=>p[1]));
  const minW=deg*(force?3:3.4);let w=x1-x0,h=y1-y0;if(w<minW){x0-=(minW-w)/2;w=minW}if(h<minW*.8){y0-=(minW*.8-h)/2;h=minW*.8}
  const pw=w*.18,ph=h*.22,fb=fitBox({x:x0-pw,y:y0-ph,w:w+2*pw,h:h+2*ph}),FV=fitVB(FRAMES[pos.i].view);if(fb.w*fb.h>FV.w*FV.h*.5)return null;fb.mem=new Set(mem);fb.last=mem[mem.length-1];return fb}
const rzIn=(e,b)=>rzPts(e).every(([x,y])=>x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h);
function rzOut(){const now=performance.now(),fi=pos.i;holdUntil=Math.max(holdUntil,now+2500+900+600);clearTimeout(rzOut.t);
  rzOut.t=setTimeout(()=>{if(pos.i!==fi||userMoved)return;rzCur=null;animVB(fitVB(FRAMES[pos.i].view),900)},2500)}
const RZ_SEQ=[[/^공산 전투/,/^고창 전투/,/^일리천 전투/],Object.assign([/^고부 농민 봉기/,/^무장 기포/,/^황토현 전투/,/^장성 황룡촌/,/^전주성 점령/,/^집강소/,/^삼례 재봉기/,/^우금치 전투/,/^전봉준 체포/],{mw:1.7})];
function rzSeq(e){for(const sq of RZ_SEQ){if(!sq[0].test(e.t))continue;const evs=sq.map(r=>EVENTS.find(x=>r.test(x.t))).filter(Boolean);const pts=[].concat(...evs.map(rzPts));if(!pts.length)return null;
  const deg=X(1)-X(0);let x0=Math.min(...pts.map(p=>p[0])),x1=Math.max(...pts.map(p=>p[0])),y0=Math.min(...pts.map(p=>p[1])),y1=Math.max(...pts.map(p=>p[1]));const minW=deg*(sq.mw||3.6);let w=x1-x0,h=y1-y0;if(w<minW){x0-=(minW-w)/2;w=minW}if(h<minW*.8){y0-=(minW*.8-h)/2;h=minW*.8}
  const fb=fitBox({x:x0-w*.2,y:y0-h*.25,w:w*1.4,h:h*1.5});fb.mem=new Set(evs.map(x=>x.id));fb.last=evs[evs.length-1].id;fb.seq=true;return fb}return null}
function routeZoom(e){if(typeof playing==='undefined'||!playing||userMoved)return;
  if(rzCur&&rzCur.seq){if(e.id===rzCur.last)rzOut();else if(!rzCur.shown&&rzCur.mem.has(e.id)){rzCur.shown=1;holdUntil=Math.max(holdUntil,performance.now()+RZ_HOLD)}return}
  {const q=rzSeq(e);if(q){rzCur=q;animVB(q,900);holdUntil=Math.max(holdUntil,performance.now()+900+RZ_HOLD);return}}
  if(rzCur&&rzCur.mem.has(e.id)){if(e.id===rzCur.last)rzOut();else if(!rzCur.shown){rzCur.shown=1;holdUntil=Math.max(holdUntil,performance.now()+RZ_HOLD)}return}
  const c=rzSeen.has(e.id)?null:rzCluster(e);const now=performance.now();
  if(c){c.mem.forEach(id=>rzSeen.add(id));rzCur=c;animVB(c,900);holdUntil=Math.max(holdUntil,now+900+RZ_HOLD+(RZ_FORCE.test(e.t)?1400:0));if(e.id===c.last)setTimeout(()=>{if(rzCur===c&&playing)rzOut()},900+RZ_HOLD+(RZ_FORCE.test(e.t)?1400:0));return}
  if(rzCur){rzCur=null;animVB(fitVB(FRAMES[pos.i].view),900);holdUntil=Math.max(holdUntil,now+900+500)}}
{const sp=setPos;setPos=function(i,f,opt){if(i!==pos.i){if(rzCur&&rzCur.seq&&playing&&!userMoved&&(byFrame[i]||[]).some(x=>rzCur.mem.has(x.id))){rzSeen.clear();const r=sp.call(this,i,f,{...(opt||{}),fit:false});const c=rzCur;setTimeout(()=>{if(rzCur===c){const L=EVENTS.find(x=>x.id===c.last);if(L&&L.f===pos.i&&L.T<=curT()+1e-6)rzOut()}},60);return r}rzCur=null;rzSeen.clear();clearTimeout(rzOut.t)}return sp.apply(this,arguments)}}
{const tk=ticker;ticker=function(e){const r=tk.apply(this,arguments);try{routeZoom(e)}catch(_){}return r}}
/* ───────── 해외 작은 지도: 멀리 떨어진 곳이 여럿이면 최대 3개, 화면에 보여도 우리나라 밖이면 표시 ───────── */
{const KOR=e=>e.ll[0]>=124&&e.ll[0]<=131.3&&e.ll[1]>=33&&e.ll[1]<=43.4;
 const INS=[inset];let groups=[];
 function mk(i){if(INS[i])return INS[i];const b=document.createElement('button');b.className='inset';b.type='button';b.hidden=true;b.dataset.gi=i;
   b.innerHTML='<svg><use href="#coastc"/><use href="#coastk"/><use href="#landc"/><use href="#landk"/><use href="#terr"/><g class="ov inp"></g></svg><span class="inl"></span>';inset.parentNode.appendChild(b);INS[i]=b;
   b.addEventListener('click',()=>{const g=groups[i];if(!g)return;abroad=true;userMoved=true;outPins=g;flyVB(fitVB(gBox(g)));updAll()});return b}
 const gBox=ps=>{let a=1e9,b=1e9,c=-1e9,d=-1e9;ps.forEach(e=>{a=Math.min(a,e.ll[0]);c=Math.max(c,e.ll[0]);b=Math.min(b,e.ll[1]);d=Math.max(d,e.ll[1])});const pw=Math.max(2.2,(c-a)*.25),ph=Math.max(1.6,(d-b)*.25);return [a-pw,b-ph,c+pw,d+ph]};
 function cluster(ps){const G=[];ps.forEach(e=>{let g=G.find(g=>Math.abs(g.cx-e.ll[0])<16&&Math.abs(g.cy-e.ll[1])<11);if(!g){g={cx:e.ll[0],cy:e.ll[1],l:[]};G.push(g)}g.l.push(e);g.cx=g.l.reduce((s,x)=>s+x.ll[0],0)/g.l.length;g.cy=g.l.reduce((s,x)=>s+x.ll[1],0)/g.l.length});
   G.sort((a,b)=>b.l.length-a.l.length);while(G.length>3){const x=G.pop();let best=G[0],bd=1e9;G.forEach(g=>{const d=Math.hypot(g.cx-x.cx,g.cy-x.cy);if(d<bd){bd=d;best=g}});best.l.push(...x.l)}return G.map(g=>g.l)}
 function draw(btn,ps){const sv=btn.querySelector('svg'),g=btn===inset?$('inpins'):btn.querySelector('.inp');const mx=Math.max(0,...ps.map(e=>(e.s||e.t).length));const narrow=innerWidth<560;btn.style.width=Math.round(Math.min(narrow?200:240,Math.max(narrow?120:150,mx*11+44)))+'px';
   const b=box(gBox(ps));const W=Math.max(60,btn.clientWidth||150),H=Math.max(40,(btn.clientHeight||120)-20);const s=Math.max(b.w/W,b.h/H);const vbx=b.x+b.w/2-W*s/2,cx0=b.x+b.w/2;sv.setAttribute('viewBox',`${vbx} ${b.y+b.h/2-H*s/2} ${W*s} ${H*s}`);g.innerHTML='';
   ps.forEach(e=>{const px=X(e.ll[0]),py=Y(e.ll[1]);el('circle',{cx:px,cy:py,r:4.5*s,style:`fill:var(--t-${e.tp[0]});stroke:var(--panel);stroke-width:${1.5*s}`},g);const right=px>cx0;const tx=el('text',{x:px+(right?-6:6)*s,y:py+4*s,'text-anchor':right?'end':'start',style:`font-size:${10.5*s}px`},g);tx.textContent=e.s||e.t;
     try{const bb=tx.getBBox();const L=vbx+2*s,R=vbx+W*s-2*s;if(bb.x<L)tx.setAttribute('x',+tx.getAttribute('x')+(L-bb.x));else if(bb.x+bb.width>R)tx.setAttribute('x',+tx.getAttribute('x')-(bb.x+bb.width-R))}catch(_){}});
   {const kept=[];[...g.querySelectorAll('text')].forEach(t=>{try{const bb=t.getBBox();const hitK=kept.some(c=>bb.x<c.x+c.width+1.5*s&&bb.x+bb.width>c.x&&bb.y<c.y+c.height&&bb.y+bb.height>c.y);if(hitK)t.style.display='none';else kept.push(bb)}catch(_){}})}
   const nm=[...new Set(ps.map(e=>placeName(e)).filter(Boolean))];(btn===inset?$('inlab'):btn.querySelector('.inl')).textContent=(nm.length?nm[0]+(nm.length>1?` 외 ${nm.length-1}곳`:''):'')}
 const corners=()=>{const wrap=svg.getBoundingClientRect();const dock=$('dock')?$('dock').getBoundingClientRect():{top:wrap.bottom};const card=$('fcard')?$('fcard').getBoundingClientRect():{bottom:wrap.top+90};const hb=document.querySelector('header.top').getBoundingClientRect().bottom-wrap.top;
   return {wrap,dock,card,hb}};
 function placeAll(list){const {wrap,dock,card,hb}=corners();if(!wrap.width)return;const pts=[];document.querySelectorAll('#pins .pin:not(.hide):not(.wait):not(.stale):not(.buried):not(.gone), #ovl text:not(.hide), #arrleg:not([hidden])').forEach(g=>{const r=g.getBoundingClientRect();if(r.width){const lab=g.matches('.pin')?110:0;pts.push([r.left-wrap.left-(lab?40:0),r.top-wrap.top,r.right-wrap.left+lab,r.bottom-wrap.top])}});
   const used=[];list.forEach(btn=>{const iw=btn.offsetWidth||150,ih=btn.offsetHeight||124;const bottomY=Math.min(wrap.height,dock.top-wrap.top)-ih-52,topY=Math.max(12,card.bottom-wrap.top+10,hb+10);
     const lgE=$('arrleg'),lg=lgE&&!lgE.hidden?lgE.getBoundingClientRect():null;const C={br:[wrap.width-iw-12,bottomY],bl:[12,lg&&lg.width?Math.min(bottomY,lg.top-wrap.top-ih-10):bottomY],tr:[wrap.width-iw-60,Math.max(12,hb+10)],tl:[12,topY]};
     const sc=k=>{const [x,y]=C[k];if(y<0||x<0||used.includes(k))return 1e9;let s=0;pts.forEach(([a,b,c,d])=>{if(c>x-4&&a<x+iw+4&&d>y-4&&b<y+ih+4)s++});return s+(k==='br'?-.1:0)-(btn.dataset.corner===k?1.6:0)};
     let best=null,bs=1e10;['br','bl','tr','tl'].forEach(k=>{const s=sc(k);if(s<bs){bs=s;best=k}});used.push(best);btn.dataset.corner=best;const [x,y]=C[best];btn.style.left=x+'px';btn.style.top=y+'px';btn.style.right='auto';btn.style.bottom='auto';pts.push([x,y,x+iw,y+ih])})}
 const orig=updateInset;
 function updAll(){if(abroad){INS.slice(1).forEach(b=>b.hidden=true);return orig.apply(this,arguments)}
   const t=curT();const ps=byFrame[pos.i].filter(e=>e.ll&&!KOR(e)&&(!playing||e.T<=t+1e-9));groups=cluster(ps);outPins=groups[0]||[];
   INS.forEach((b,i)=>{if(i>=groups.length)b.hidden=true});if(!groups.length)return;
   groups.forEach((g,i)=>{const b=mk(i);b.hidden=false;draw(b,g)});placeAll(groups.map((g,i)=>INS[i]))}
 updateInset=updAll;placeInset=function(){if(abroad){return}placeAll(groups.map((g,i)=>INS[i]).filter(Boolean))};
 /* 기본 작은 지도 누르기: 첫 묶음으로 날아가기 / 돌아오기 */
 inset.addEventListener('click',ev=>{ev.stopImmediatePropagation();if(abroad){abroad=false;userMoved=true;flyVB(fitVB(FRAMES[pos.i].view));updAll();return}const g=groups[0];if(!g)return;abroad=true;userMoved=true;outPins=g;flyVB(fitVB(gBox(g)));orig()},true);
}
/* 다시 보기 버튼: 지도에서 보이는 칸의 한가운데 */
{const rb=$('replay');const fix=()=>{if(!rb||rb.hidden)return;const w=svg.getBoundingClientRect(),v=$('v-map').getBoundingClientRect(),hb=document.querySelector('header.top').getBoundingClientRect().bottom,dk=$('dock')?$('dock').getBoundingClientRect().top:w.bottom;rb.style.left=(w.left+w.width/2-v.left)+'px';rb.style.top=((Math.max(hb,w.top)+Math.min(dk,w.bottom))/2-v.top)+'px'};
 if(rb){new MutationObserver(fix).observe(rb,{attributes:true,attributeFilter:['hidden']});addEventListener('resize',fix)}}
/* 시대 막대 이름은 화면 왼쪽에 붙어 따라오게 */
{const hs=hzSync;hzSync=function(){hs.apply(this,arguments);const sc=$('ovscroll');if(!sc)return;const R=sc.getBoundingClientRect();sc.querySelectorAll('.hzrg,.hzband').forEach(b=>{const sp=b.firstElementChild;if(!sp)return;const r=b.getBoundingClientRect();if(r.right<R.left||r.left>R.right){sp.style.transform='';return}const sw=sp.offsetWidth;const dx=Math.max(0,Math.min(R.left+8-r.left,r.width-sw-16));sp.style.transform=dx>0?`translateX(${dx}px)`:''})};
 $('ovscroll').addEventListener('scroll',()=>requestAnimationFrame(()=>hzSync()),{passive:true})}
/* ───────── 시대 버튼 12개 ───────── */
const ERA12=[['선사 시대','prehist'],['고조선','pre'],['초기 여러 나라','early'],['삼국 시대','three'],['통일 신라','nsk'],['남북국 시대','nsk',698],['후삼국 시대','hsk'],['고려','goryeo'],['조선','joseon1'],['개항기와 대한 제국','modern1'],['일제 강점기','colonial'],['현대 (광복 이후)','contemp']];
function chipOf(sec,t){if(sec==='joseon2')return 8;if(sec==='nsk')return t!=null&&t>=698?5:4;const i=ERA12.findIndex(x=>x[1]===sec&&x[2]==null);return i}
function ovGoT(sec,t,smooth){const s=$('ovchart').querySelector(`.ovsec[data-sec="${sec}"]`);if(!s)return ovGoSec(sec,smooth);
  const evs=[...s.querySelectorAll('.hzn[data-ev],[data-ev]')].map(b=>({b,e:EVENTS.find(x=>x.id===+b.dataset.ev)})).filter(o=>o.e&&o.e.T>=t-.5).sort((a,b)=>a.e.T-b.e.T);if(!evs.length)return ovGoSec(sec,smooth);const b=evs[0].b;
  if(ovDir==='h'){const sc=$('ovscroll');sc.scrollTo({left:b.getBoundingClientRect().left-sc.getBoundingClientRect().left+sc.scrollLeft-60,behavior:smooth?'smooth':'auto'})}else{const rd=$('ovread');rd.scrollTo({top:b.getBoundingClientRect().top-rd.getBoundingClientRect().top+rd.scrollTop-120,behavior:smooth?'smooth':'auto'})}}
function hlChip(i){$('ovchips').querySelectorAll('.chip').forEach((c,j)=>c.setAttribute('aria-pressed',j===i));const a=$('ovchips').querySelectorAll('.chip')[i];if(a)a.scrollIntoView({inline:'nearest',block:'nearest',behavior:'smooth'})}
{const c=$('ovchips');c.innerHTML=ERA12.map(([n,k],i)=>`<button class="chip" data-e="${k}" data-ci="${i}">${esc(n)}</button>`).join('');
 c.querySelectorAll('.chip').forEach((b,i)=>b.onclick=()=>{const [,k,t]=ERA12[i];ovShow(k);if(t!=null)setTimeout(()=>ovGoT(k,t,true),60);setTimeout(()=>hlChip(i),400)})}
/* 스크롤 위치 → 버튼 (같은 시대 칸 안에서도 통일 신라/남북국 구분) */
$('ovscroll').removeEventListener('scroll',ovSpy);$('ovread').removeEventListener('scroll',ovSpy);
ovSpy=function(){if(!ovCont)return;clearTimeout(ovSpyT);ovSpyT=setTimeout(()=>{const H=ovDir==='h',ref=H?$('ovscroll').getBoundingClientRect().left+60:$('ovread').getBoundingClientRect().top+80;let cur=null;
  for(const s of ovSecs()){const r=s.getBoundingClientRect();if((H?r.left:r.top)<=ref)cur=s.dataset.sec}if(!cur)return;
  let t=null;if(cur==='nsk'){const s=$('ovchart').querySelector('.ovsec[data-sec="nsk"]');const bh=[...s.querySelectorAll('[data-ev]')].find(b=>{const e=EVENTS.find(x=>x.id===+b.dataset.ev);return e&&e.T>=698});if(bh){const r=bh.getBoundingClientRect();t=(H?r.left:r.top)<=ref+200?698:676}}
  if(cur!==ovSel){ovSel=cur;store.set('overa',cur)}hlChip(chipOf(cur,t))},80)};
$('ovscroll').addEventListener('scroll',ovSpy,{passive:true});$('ovread').addEventListener('scroll',ovSpy,{passive:true});
/* 연표 화면의 시대 버튼도 같은 12개로 */
function setTlJump(){const j=$('tljump');if(j){j.innerHTML=ERA12.map(([n,k,t])=>`<button data-e="${k}"${t?` data-t="${t}"`:''} type="button">${esc(n)}</button>`).join('');
 j.querySelectorAll('button').forEach(b=>b.onclick=()=>{const rd=$('tlread');let target=$('era-'+b.dataset.e);if(b.dataset.t){const t=+b.dataset.t;const li=[...target.querySelectorAll('li[data-id]')].find(l=>{const e=EVENTS.find(x=>x.id===+l.dataset.id);return e&&e.T>=t-.5});if(li)target=li}
   if(target)rd.scrollTo({top:target.getBoundingClientRect().top-rd.getBoundingClientRect().top+rd.scrollTop-(rd.querySelector('.rhead')?rd.querySelector('.rhead').offsetHeight:0)-6,behavior:'smooth'})})}}
setTlJump();{const bt=buildTL;buildTL=function(){const r=bt.apply(this,arguments);setTlJump();return r}}
{const o2=ovShow;ovShow=function(){const r=o2.apply(this,arguments);setTimeout(()=>{try{ovSpy()}catch(_){}},300);return r}}
/* ───────── 인물 누르면 먼저 작은 팝업 → '자세히 보기'로 이동 ───────── */
const P_PAIR={'원종':'원종과 애노','애노':'원종과 애노','망이':'망이와 망소이','망소이':'망이와 망소이'};
Object.assign(PINFO,{'원종과 애노':'신라 말 진성 여왕 때(889) 사벌주(상주)에서 함께 봉기한 농민 지도자. 세금 독촉에 반발한 이 봉기를 시작으로 전국에서 반란이 잇따랐다.',
 '망이와 망소이':'고려 무신 집권기(1176) 공주 명학소에서 함께 봉기한 형제(소민). 소(所) 주민에 대한 차별에 맞섰고, 명학소는 한때 충순현으로 승격되었다.'});
function pName(n){return String(n).replace(/\s*\(.*\)\s*/,'').trim()}
function personPopHTML(n,T){const nm=pName(n),pair=P_PAIR[nm];const title=pair||nm;const k=aliasKing(n)||(()=>{const K=kingOfName(n,T);return K?{dn:K.D.n,i:K.i}:null})();
  let sub='',body='';if(k){const D=DYN[k.dn],r=D.r[k.i];sub=`${k.dn==='남한'?'대한민국':k.dn} · ${yrTxt(Math.floor(r.s))}~${yrTxt(Math.floor(r.e))}`;const a=(typeof kAch==='function'?kAch(D,r):[])||[];body=a.slice(0,3).map(x=>`<li>${esc(x)}</li>`).join('');body=body?`<ul>${body}</ul>`:''}
  const info=PINFO[title]||PINFO[nm]||'';const evs=EVENTS.filter(e=>(e.pp||'').split(/,\s*/).some(x=>pName(x)===nm||(pair&&P_PAIR[pName(x)]===pair))).sort((a,b)=>a.T-b.T).slice(0,4);
  return `<b>${esc(title)}</b>${sub?`<em>${esc(sub)}</em>`:''}${info?`<p>${glx(info)}</p>`:''}${body}${evs.length?`<div class="ppev">${evs.map(e=>`<span>${esc(e.yl||yrTxt(Math.floor(e.T)))} ${esc(e.t)}</span>`).join('')}</div>`:''}<button type="button" class="ppgo" data-go-person="${esc(n)}" data-pt="${T??''}">자세히 보기 →</button>`}
{const pop=document.createElement('div');pop.id='pppop';pop.className='glpop pppop';pop.hidden=true;document.body.appendChild(pop);
 const place=(el)=>{const r=el.getBoundingClientRect();pop.hidden=false;const w=pop.offsetWidth,h=pop.offsetHeight;let x=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2)),y=r.bottom+8;if(y+h>innerHeight-8)y=Math.max(8,r.top-h-8);pop.style.left=x+'px';pop.style.top=y+'px'};
 addEventListener('click',ev=>{const go=ev.target.closest('[data-go-person]');if(go){ev.preventDefault();ev.stopPropagation();pop.hidden=true;const T=go.dataset.pt?+go.dataset.pt:null;let n=go.dataset.goPerson;openPerson(n,T);return}
   const p=ev.target.closest('[data-person]');if(p&&!ev.target.closest('#pppop')&&!ev.target.closest('.kpage .pplist')){ev.preventDefault();ev.stopPropagation();pop.innerHTML=personPopHTML(p.dataset.person,p.dataset.pt?+p.dataset.pt:null);place(p);return}
   if(!pop.hidden&&!ev.target.closest('#pppop'))pop.hidden=true},true);}
/* 짝 인물은 한 버튼으로: '원종과 애노' */
{const wh=whoHTML;whoHTML=function(e,cls){let h=wh.apply(this,arguments);Object.entries({'원종과 애노':['원종','애노'],'망이와 망소이':['망이','망소이']}).forEach(([t,[a,b]])=>{const re=new RegExp(`<button type="button" class="pn" data-person="${a}"([^>]*)>${a}</button>, <button type="button" class="pn" data-person="${b}"[^>]*>${b}</button>`);h=h.replace(re,`<button type="button" class="pn" data-person="${a}"$1>${t}</button>`)});return h}}
try{buildTL();renderTLFilter();addTclb()}catch(_){}
/* 밑줄 낱말 팝업: '사전에서 보기' */
document.addEventListener('click',ev=>{const w=ev.target.closest('[data-gl]');if(!w||ev.target.closest('#glpop'))return;const gp=$('glpop');if(gp.hidden||gp.querySelector('.ppgo.dc'))return;const k=w.dataset.gl;gp.insertAdjacentHTML('beforeend',`<button type="button" class="ppgo dc" data-dc="${esc(k)}">사전에서 자세히 →</button>`)});
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-dc]');if(!b)return;ev.stopPropagation();const k=b.dataset.dc;$('glpop').hidden=true;showView('dc');try{dcShow();dcOnlyBk=false;dcFilter()}catch(_){}setTimeout(()=>{const c=$('dcbody').querySelector(`.gl2>div[data-k="${CSS.escape(k)}"]`);if(c){c.scrollIntoView({block:'center'});c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash')}},120)},true);
/* ───────── 이야기로 듣는 사건 배경 ───────── */
const STORY={
 '고조선 건국':'하늘을 다스리는 환인의 아들 환웅이 인간 세상을 다스리고 싶어 하자, 환인은 천부인 3개를 주어 내려보냈다. 환웅은 무리 3천을 이끌고 태백산 신단수 아래로 내려와 신시를 열고, 바람·비·구름을 맡은 풍백·우사·운사를 거느리며 곡식·생명·질병·형벌·선악 등 인간의 360여 가지 일을 다스렸다(홍익인간). 곰과 호랑이가 사람이 되기를 빌자 쑥 한 줌과 마늘 20개를 주며 100일 동안 햇빛을 보지 말라고 했는데, 호랑이는 견디지 못했고 곰은 21일 만에 여자(웅녀)가 되었다. 웅녀와 환웅 사이에서 태어난 단군왕검이 아사달에 도읍하고 고조선을 세웠다. → 하늘 자손이라는 선민 사상(천손 사상), 풍백·우사·운사로 보는 농경 사회, 곰을 섬기는 부족과의 결합(토테미즘), 단군(제사장)+왕검(정치 지배자) = 제정일치 사회를 보여 준다. 『삼국유사』(일연)에 처음 실렸다.',
 '위만, 고조선의 왕이 됨':'중국 진·한 교체기의 혼란을 피해 연에서 무리 1천여 명을 이끌고 상투를 틀고 오랑캐 옷을 입은 채 고조선으로 들어온 위만은, 준왕의 신임을 얻어 서쪽 변경을 지켰다. 세력을 키운 위만은 준왕을 몰아내고 왕이 되었고(기원전 194), 준왕은 남쪽으로 내려가 한왕이라 칭했다. 위만 조선은 철기 문화를 본격적으로 받아들여 농업·무기를 발전시키고, 한과 남쪽 진(辰) 사이에서 중계 무역으로 이익을 얻으며 크게 성장했다. 국호는 그대로 조선을 썼고 토착민 출신을 높은 벼슬에 앉혀 고조선을 계승했다.',
 '한 무제의 고조선 침략':'중계 무역을 독점하며 성장한 고조선을 경계한 한 무제가 수륙 양면으로 쳐들어왔다(기원전 109). 고조선은 1년 가까이 버텼으나 지배층의 내분으로 우거왕이 살해되고 왕검성이 함락되어 멸망했다(기원전 108). 한은 그 자리에 낙랑·진번·임둔·현도의 4군을 두었다. 고조선에는 사람을 죽이면 사형, 남을 다치게 하면 곡식으로 갚고, 도둑질하면 노비로 삼되 풀려나려면 50만 전을 내는 8조법이 있었는데, 한 군현이 들어선 뒤 법 조항이 60여 개로 늘고 풍속이 각박해졌다.',
 '고구려 건국':'부여 금와왕이 태백산 남쪽에서 만난 하백(물의 신)의 딸 유화는, 햇빛을 받아 큰 알을 낳았다. 알에서 나온 아이는 일곱 살에 활을 만들어 쏘면 백발백중이라 주몽(활 잘 쏘는 사람)이라 불렸다. 금와왕의 아들들이 시기하여 죽이려 하자 주몽은 남쪽으로 달아났는데, 강을 만나자 "나는 하늘의 아들이요 하백의 외손"이라 외치니 물고기와 자라가 다리를 놓아 건넜다. 주몽은 졸본에서 고구려를 세웠다(기원전 37). → 부여에서 갈라져 나온 세력임을 보여 준다.',
 '백제 건국':'주몽이 부여에서 낳은 아들 유리가 찾아와 고구려 태자가 되자, 졸본에서 낳은 아들 비류와 온조는 무리를 이끌고 남쪽으로 내려왔다. 비류는 바닷가 미추홀(인천)에, 온조는 한강 유역 위례성에 자리 잡았는데, 미추홀은 땅이 습하고 물이 짜 살기 어려워 비류의 백성들이 온조에게로 모였다. 온조는 나라 이름을 십제에서 백제로 바꾸었다(기원전 18). → 고구려계 유이민이 세운 나라라서 백제 왕족은 성을 부여씨라 했고, 서울 석촌동 돌무지무덤도 고구려 무덤 양식과 닮았다.',
 '신라 건국':'진한의 6촌 촌장들이 왕을 모시려고 의논하던 중, 나정 우물가에서 흰 말이 무릎 꿇고 절하는 곳에 보랏빛 알이 있었다. 알에서 나온 아이가 박처럼 둥근 알에서 나왔다 하여 성을 박, 세상을 밝게 다스린다 하여 이름을 혁거세라 했다. 6촌 사람들이 그를 왕(거서간)으로 받들어 서라벌에서 나라를 세웠다(기원전 57). → 박·석·김 세 성씨가 번갈아 왕이 되다가 내물 마립간 때부터 김씨가 왕위를 이었다.',
 '금관가야 건국':'김해 구지봉에서 9간(촌장)과 백성들이 "거북아 거북아 머리를 내어라, 내놓지 않으면 구워 먹으리"라는 노래(구지가)를 부르며 춤추자, 하늘에서 금빛 상자가 내려왔다. 그 안의 황금 알 6개에서 아이들이 나왔는데, 가장 먼저 나온 수로가 금관가야의 왕이 되고 나머지가 다섯 가야의 왕이 되었다(42). 수로왕은 바다 건너 인도 아유타국에서 왔다는 허황옥을 왕비로 맞았다고 한다. → 철이 풍부해 낙랑·왜에 철을 수출했다.',
 '무신 정변':'고려는 문신이 높은 자리를 차지하고 무신은 낮게 대접받던 나라였다. 인종 때 김부식의 아들 김돈중은 장난삼아 젊은 무신 정중부의 수염을 촛불로 태워 버렸다. 의종 때인 1170년, 왕이 보현원으로 놀러 가던 길에 무신들에게 맨손 무예 시합(수박희)을 시켰는데, 나이 든 장군 이소응이 힘에 부쳐 물러서자 젊은 문신 한뢰가 그의 뺨을 때렸다. 참다못한 정중부·이의방·이고가 "문관의 관을 쓴 자는 모두 죽여라" 하며 문신들을 죽이고 의종을 내쫓았다. 이렇게 100년 동안 무신이 나라를 쥐는 무신 정권이 시작되었다.',
 '이자겸의 난':'이자겸은 둘째 딸을 예종의 왕비로, 셋째·넷째 딸을 손자뻘인 인종의 왕비로 들여 권력을 독차지했다. "십팔자(十八子, 李)가 왕이 된다"는 소문까지 돌자 인종이 그를 없애려 했고, 이자겸은 척준경과 함께 궁궐에 불을 지르며 반란을 일으켰다. 인종은 척준경을 몰래 설득해 등을 돌리게 하여 겨우 이자겸을 몰아냈다.',
 '묘청':'이자겸의 난으로 개경 궁궐이 불타 버리자 서경(평양) 출신 승려 묘청은 "서경으로 도읍을 옮기면 금나라가 항복하고 36개 나라가 조공을 바친다"며 왕을 황제라 부르고 금을 치자고 주장했다. 개경 귀족 김부식 등이 반대해 일이 틀어지자 묘청은 서경에서 나라 이름을 대위, 연호를 천개로 정하고 반란을 일으켰다. 김부식이 이끈 관군에게 1년 만에 진압되었고, 훗날 신채호는 이 사건을 "조선 역사상 일천 년 이래 제일 대사건"이라 불렀다.',
 '위화도 회군':'명이 철령 북쪽 땅을 내놓으라고 하자 우왕과 최영은 요동을 치기로 했다. 이성계는 "작은 나라가 큰 나라를 거스르면 안 되고, 여름에 군사를 일으키면 안 되며, 왜구가 빈틈을 노리고, 장마철이라 활이 풀리고 병이 돈다"는 4불가론으로 반대했지만 결국 출병했다. 압록강의 섬 위화도에 이르자 그는 군대를 돌려 개경으로 쳐들어가 최영을 몰아내고 우왕을 폐위했다. 이 일로 이성계는 권력을 잡고 조선 건국의 발판을 마련했다.',
 '계유정난':'열두 살 단종이 왕위에 오르자 김종서·황보인 같은 대신들이 나랏일을 이끌었다. 숙부 수양 대군은 이를 못마땅히 여겨 한명회 등과 일을 꾸몄고, 1453년 밤 김종서의 집을 찾아가 철퇴로 쓰러뜨린 뒤 왕명이라며 대신들을 궁으로 불러들여 죽였다. 권력을 쥔 수양 대군은 2년 뒤 조카에게서 왕위를 넘겨받아 세조가 되었다.',
 '단종 복위 운동':'성삼문·박팽년 등은 명 사신을 맞는 잔치에서 칼을 차고 왕을 호위하는 별운검 자리를 맡아 세조를 없애고 단종을 다시 왕으로 세우려 했다. 그런데 그날 별운검을 세우지 말라는 명이 내려 거사가 미뤄졌고, 함께하던 김질이 겁을 먹고 고발했다. 성삼문 등은 모진 고문에도 세조를 "나으리"라 부르며 굽히지 않고 죽었다(사육신). 단종은 노산군으로 강등되어 영월로 쫓겨났고 이듬해 세상을 떠났다.',
 '임오군란':'신식 군대 별기군은 좋은 대우를 받았지만 구식 군인들은 13개월이나 월급을 받지 못했다. 겨우 받은 쌀 한 달 치에 겨와 모래가 섞여 있자 분노한 군인들이 담당자를 때리고, 선혜청 책임자 민겸호의 집을 부수고 일본 공사관까지 공격했다. 쫓겨난 흥선 대원군이 다시 권력을 잡았지만, 청군이 들어와 대원군을 톈진으로 끌고 가 버렸다. 이후 청의 간섭이 심해지고 일본과는 제물포 조약을 맺었다.',
 '갑신정변':'청의 간섭이 심해지자 김옥균·박영효·홍영식·서광범 등 급진 개화파는 일본의 도움을 약속받고 정변을 일으켰다. 1884년 우정총국 개국 축하 잔치에서 불이 났다고 소란을 피운 틈에 민씨 정권 고관들을 죽이고, 고종을 경우궁으로 옮긴 뒤 새 정부를 세워 14개조 정강을 내놓았다. 그러나 청군이 쳐들어오자 일본군은 슬그머니 물러났고, 정변은 3일 만에 끝났다(삼일천하). 김옥균 등은 일본으로 달아났다.',
 '을미사변':'청일 전쟁 뒤 러시아·프랑스·독일이 일본을 압박하자(삼국 간섭), 명성 황후는 러시아와 가까이하며 일본을 견제했다. 그러자 1895년 일본 공사 미우라는 낭인과 군인을 경복궁 깊숙한 건청궁으로 들여보내 왕비를 시해하고 시신을 불태웠다. 이 일과 뒤이은 단발령에 분노한 유생들이 을미의병을 일으켰다.',
 '아관 파천':'왕비가 시해된 뒤 늘 신변의 위협을 느끼던 고종은 1896년 이른 새벽 궁녀의 가마를 타고 몰래 궁을 빠져나가 러시아 공사관으로 옮겼다. 고종은 그곳에서 1년 동안 머물렀고, 친일 내각은 무너졌지만 러시아를 비롯한 열강이 광산·철도 같은 이권을 앞다투어 빼앗아 갔다.',
 '병인양요':'흥선 대원군이 천주교를 탄압하면서(병인박해) 프랑스 신부 9명이 처형되었다. 이를 구실로 1866년 프랑스 함대가 강화도에 쳐들어왔지만, 한성근이 문수산성에서, 양헌수가 정족산성에서 맞서 물리쳤다. 프랑스군은 물러나면서 외규장각에 있던 의궤 등 귀한 책을 빼앗아 갔고, 이 책들은 2011년에야 돌아왔다.',
 '신미양요':'1866년 미국 상선 제너럴셔먼호가 대동강을 거슬러 올라와 통상을 요구하며 행패를 부리다가 평양 관민에게 불태워졌다. 이를 핑계로 1871년 미국 함대가 강화도를 공격했고, 광성보에서 어재연 장군과 군사들이 끝까지 싸우다 전사했다. 미군이 물러가자 흥선 대원군은 전국에 척화비를 세워 통상 거부 의지를 알렸다.',
 '운요호 사건':'1875년 일본 군함 운요호가 강화도 초지진 앞바다에 허락 없이 다가와 조선군과 포격을 주고받고, 영종도에 상륙해 사람들을 죽이고 물건을 빼앗았다. 일본은 오히려 이 일을 따지며 군함을 이끌고 와 조약을 강요했고, 이듬해 강화도 조약이 맺어졌다.',
 '3·1 운동':'1919년 1월 고종이 갑자기 세상을 떠나자 일본이 독살했다는 소문이 돌았다. 민족 대표 33인은 고종의 장례식(인산일)을 앞둔 3월 1일 태화관에서 독립 선언서를 읽었고, 탑골 공원에서는 학생과 시민이 태극기를 흔들며 만세를 불렀다. 만세 운동은 전국과 해외로 퍼졌고, 이를 계기로 상하이에 대한민국 임시 정부가 세워졌다.'};
function storyOf(e){if(!e)return null;const k=Object.keys(STORY).find(k=>e.t.includes(k));return k?STORY[k]:null}
{const ed=evDetailHTML;evDetailHTML=function(e){const h=ed.apply(this,arguments);const s=storyOf(e);return s?h+`<div class="story"><h4>📖 이야기로 보기</h4><p>${glx(s)}</p></div>`:h}}
document.addEventListener('click',ev=>{const b=ev.target.closest('.stb');if(!b)return;ev.stopPropagation();ev.preventDefault();const e=EVENTS.find(x=>String(x.id)===b.dataset.st);const nx=b.nextElementSibling;if(nx&&nx.classList.contains('story')){nx.remove();b.classList.remove('on');return}b.insertAdjacentHTML('afterend',`<div class="story"><p>${glx(storyOf(e))}</p></div>`);b.classList.add('on')},true);
function addStb(root){(root||document).querySelectorAll('li[data-id]:not([data-sb])').forEach(li=>{li.dataset.sb=1;const e=EVENTS.find(x=>String(x.id)===li.dataset.id);if(!storyOf(e))return;const p=li.querySelector('p');if(p)p.insertAdjacentHTML('afterend',`<button type="button" class="stb" data-st="${e.id}">📖 이야기</button>`)})}
addStb();['tlbody','tpbody'].forEach(id=>{const el=$(id);if(el)new MutationObserver(()=>addStb(el)).observe(el,{childList:true,subtree:true})});
{const gp=$('glpop');let busy=false;new MutationObserver(()=>{if(busy||gp.hidden||gp.querySelector('[data-dc]'))return;const b=gp.querySelector('b');if(!b)return;const k=(b.childNodes[0]&&b.childNodes[0].nodeType===3?b.childNodes[0].nodeValue:b.textContent).trim();if(!GLOSS[k])return;busy=true;gp.insertAdjacentHTML('beforeend',`<button type="button" class="ppgo dc" data-dc="${esc(k)}">사전에서 자세히 →</button>`);busy=false}).observe(gp,{childList:true,attributes:true,attributeFilter:['hidden']})}
/* 지도 글씨: 테두리 대신 뒤로 은은하게 번지는 바탕(선이 글씨 근처에서만 흐려짐) */
{const NS='http://www.w3.org/2000/svg';const mk=(sv,id)=>{if(!sv||sv.querySelector('#'+id))return;let d=sv.querySelector('defs');if(!d){d=document.createElementNS(NS,'defs');sv.prepend(d)}
  d.insertAdjacentHTML('beforeend',`<filter id="${id}" x="-15%" y="-40%" width="130%" height="180%" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="d"/><feGaussianBlur in="d" stdDeviation="2" result="b"/><feFlood style="flood-color:var(--paper);flood-opacity:.9"/><feComposite in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`)};
 mk($('map'),'txglow');mk($('insvg'),'txglow2')}
/* 화살표: 그려지는 동작이 끝나면 점선 기법을 풀어 확대/축소 때 중간이 끊기지 않게 */
{const sa=setArrows;setArrows=function(e,state){const r=sa.apply(this,arguments);const ps=arrOf.get(e.id);if(ps&&state==='draw')ps.forEach(p=>{p.g.classList.remove('drawn');clearTimeout(p.dT);p.dT=setTimeout(()=>p.g.classList.add('drawn'),1050)});return r}
 for(const ps of arrOf.values())ps.forEach(p=>{if(!p.g.classList.contains('draw'))p.g.classList.add('drawn')})}
{const ul=window.updArrLeg;if(ul)window.updArrLeg=function(){const r=ul.apply(this,arguments);try{placeInset()}catch(_){}return r}}
{const sa=setArrowsAll;setArrowsAll=function(){const r=sa.apply(this,arguments);clearTimeout(updArrLeg.t2);updArrLeg.t2=setTimeout(()=>{try{updArrLeg()}catch(_){}},80);return r}}
/* 확대는 사건이 나타나기 "전"에: 다음 사건이 확대 묶음의 첫 사건이면 미리 확대하고 멈췄다가 그 사건을 보여 줌 */
(function rzPre(){requestAnimationFrame(rzPre);try{if(!playing||userMoved||performance.now()<holdUntil)return;
  const t=curT(),ta=tOfF(pos.i,Math.min(1,pos.f+450/frameDur(pos.i)));const L=byFrame[pos.i]||[];if(rzCur&&rzCur.seq)return;let ev=null,c=null;const x=L.find(x=>x.T>t+1e-9);if(x&&!(rzCur&&rzCur.mem.has(x.id))&&!rzSeen.has(x.id)&&(x.ll||arrOf.has(x.id))){c=rzSeq(x)||rzCluster(x);ev=x}
  if(!c)return;{const w=(window.__lastTick||0)+2000-performance.now();if(w>0){holdUntil=Math.max(holdUntil,performance.now()+w+30);return}} /* 앞 사건을 2초 보여 준 뒤 확대 */
  if(!c.seq)c.mem.forEach(id=>rzSeen.add(id));
  rzCur=c;animVB(c,900);holdUntil=Math.max(holdUntil,performance.now()+900+1000)}catch(_){}})();
/* 나라 이름이 장면 중간에 바뀌는 경우 (후고구려 → 마진 → 태봉 → 고려) */
const NAME_T={'후고구려':[[918,'고려']],'진한':[[-57,'신라']],'변한':[[42,'가야']]};
function applyNameT(){try{const t=curT();OV.forEach(o=>{if(!o.slab)return;const tx=o.t;if(o.base==null||!(o.base in NAME_T)){const cur=tx.textContent;if(cur in NAME_T)o.base=cur;else return}
  let nm=o.base;for(const [y,n] of NAME_T[o.base])if(t>=y-1e-6)nm=n;if(tx.textContent!==nm){tx.textContent=nm;o.lc=null;schedLabels()}})}catch(_){}}
{const ls=labStyle;labStyle=function(L,s){L.o.base=null;const r=ls.apply(this,arguments);applyNameT();return r}}
{const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);applyNameT();return r}}
applyNameT();
/* 장면 중간에 세워진 나라: 세운 해부터 땅이 생기고(그 전엔 신라 땅 색), 이름이 바뀌면 색도 바뀜.
   재생 중에는 도읍에서 사악 퍼지듯이 */
const STATE_STEPS={taebong:{pre:'silla',steps:[[901,null,[126.55,37.97]],[918,'goryeo',[127.31,38.25]]]},goguryeo:{pre:null,steps:[[-37,null,[125.4,41.27]]]},baekje:{fr:7,keep:1,keepLab:1,hideLab:1,steps:[[660,'silla',[126.92,36.28]]]},mahan:{preTint:1,keepLab:1,steps:[[369,null,[127.11,37.52]]],ban:{y:369,t:'백제, 마한 복속',tp:['pol'],ll:[127.11,37.52]}},jinhan:{preTint:1,keepLab:1,steps:[[-57,null,[129.21,35.83]]]},byeonhan:{preTint:1,keepLab:1,steps:[[42,null,[128.88,35.23]]]}};
const tcol=k=>`color-mix(in srgb,var(--c-${k}) 66%,var(--land))`,lcol=k=>`color-mix(in srgb,var(--c-${k}) 52%,var(--ink))`;
function spreadFill(c,fill,ll){const p=c.el;if(c.sp){c.sp.end()}if(!fill)fill=getComputedStyle(p).fill;
  const cid='sp'+Math.random().toString(36).slice(2,8),cp=el('clipPath',{id:cid},$('defs')),ci=el('circle',{cx:X(ll[0]),cy:Y(ll[1]),r:0},cp);
  const cl=p.cloneNode(false);cl.removeAttribute('id');cl.style.transition='none';cl.style.fill=fill;cl.style.pointerEvents='none';cl.setAttribute('clip-path',`url(#${cid})`);p.after(cl);
  const bb=p.getBBox(),cx=X(ll[0]),cy=Y(ll[1]);const R=Math.max(...[[bb.x,bb.y],[bb.x+bb.width,bb.y],[bb.x,bb.y+bb.height],[bb.x+bb.width,bb.y+bb.height]].map(([x,y])=>Math.hypot(x-cx,y-cy)))+10;
  cl.style.opacity='1';const t0=performance.now(),D=2000;let raf=0;const end=()=>{cancelAnimationFrame(raf);p.style.transition='none';p.style.fill=fill;p.style.opacity='';cl.remove();cp.remove();c.sp=null};c.sp={end};
  const step=now=>{const u=Math.min(1,(now-t0)/D),k=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;ci.setAttribute('r',(R*k).toFixed(1));if(u<1)raf=requestAnimationFrame(step);else end()};raf=requestAnimationFrame(step)}
function applyStates(fresh){try{const t=curT();for(const [id,S] of Object.entries(STATE_STEPS)){const c=shapes.get(id);if(!c)continue;
    if(S.fr!=null&&pos.i!==S.fr){if(c.stk!=null){c.stk=null;c.lab.g.style.visibility=''}continue}
    if(fresh||c.base==null){c.base=c.el.style.fill||getComputedStyle(c.el).fill;c.lbase=c.lab.t.style.fill;c.stk=null}
    let k=-1;S.steps.forEach(([y],i)=>{if(t>=y-1e-6)k=i});const key=String(k);if(c.stk===key)continue;
    const hid=k<0&&!S.pre&&!S.preTint&&!S.keep;const fill=k<0?(S.preTint?`color-mix(in srgb,${c.base} 32%,var(--land))`:S.pre?tcol(S.pre):c.base):(S.steps[k][1]?tcol(S.steps[k][1]):c.base),lf=k<0?null:(S.steps[k][1]?lcol(S.steps[k][1]):c.lbase);
    const anim=!fresh&&c.stk!=null&&+key>+c.stk&&!reduceMotion;c.stk=key;
    c.lab.g.style.visibility=(k<0&&!S.keepLab)||(k>=0&&S.hideLab)?'hidden':'';if(lf)c.lab.t.style.fill=lf;
    if(anim&&S.ban&&k>=0){try{const b=Object.assign({T:S.ban.y,f:pos.i,id:-1},S.ban);topBanner(b)}catch(_){}}
    if(anim)spreadFill(c,fill,S.steps[k][2]);else{if(c.sp)c.sp.end();c.el.style.transition='none';c.el.style.fill=fill;c.el.style.opacity=hid?'0':''}}}catch(_){}}
{const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);applyStates(false);return r}}
{const af=applyFrame;applyFrame=function(){const r=af.apply(this,arguments);applyStates(true);return r}}
applyStates(true);
/* 갔다가 돌아오는 화살표(위화도 회군): 가는 길을 다 그린 뒤 돌아오는 길을 그림 */
{const sa=setArrows;setArrows=function(e,state){const r=sa.apply(this,arguments);const ps=arrOf.get(e.id);
  if(ps&&e.seqAr){ps.forEach((p,k)=>{clearTimeout(p.sqT);if(!k)return;if(state==='draw'){p.g.style.visibility=p.hg.style.visibility='hidden';
      p.sqT=setTimeout(()=>{p.g.style.visibility=p.hg.style.visibility='';[p.g,p.hg].forEach(n=>{n.classList.remove('draw','drawn');void n.getBoundingClientRect();n.classList.add('draw')});clearTimeout(p.dT);p.dT=setTimeout(()=>p.g.classList.add('drawn'),1050)},1100*k)}
    else p.g.style.visibility=p.hg.style.visibility=''})}return r}}
/* 렉 줄이기: 재생 중 목록 시간 표시는 0.25초마다만 */
{const ml=markListTime;let last=0,tm=0;markListTime=function(force){const now=performance.now();if(force||!playing||now-last>250){last=now;return ml.apply(this,arguments)}clearTimeout(tm);tm=setTimeout(()=>{last=performance.now();ml()},260)}}
/* 렉 줄이기: 해안선은 가벼운 버전을 기본으로, 아주 크게 확대했을 때만 자세한 버전 */
{let hi=false;const IDS=['landk','coastk','clipk','cl1','sm1','cpk'];{const a=$('cpk'),c=$('cpc');if(a)a.setAttribute('d',LAND.kor);if(c)c.setAttribute('d',LAND.ctx)}
 let lt=0;function landLOD(){if(!LAND.korHi)return;const want=hi?vb.w<240:vb.w<200;if(want===hi)return;clearTimeout(lt);lt=setTimeout(()=>{const w2=hi?vb.w<240:vb.w<200;if(w2===hi)return;hi=w2;const d=hi?LAND.korHi:LAND.kor;IDS.forEach(id=>{const n=$(id);if(n)n.setAttribute('d',d)})},400)}
 const sv=setVB;setVB=function(){const r=sv.apply(this,arguments);landLOD();return r}}
/* 렉 줄이기: 움직이는 동안만 가벼운 클립, 멈추면 매끈한 마스크 */
{const G2=['chn','terr'].map(id=>$(id));let mT=0,moving=false;const setM=m=>{m=false;G2.forEach(g=>{if(!g)return;if(m){g.removeAttribute('clip-path');g.setAttribute('mask','url(#landmask)')}else{g.removeAttribute('mask');g.setAttribute('clip-path','url(#landclip)')}})};setM(true);
 const sv=setVB;setVB=function(){const r=sv.apply(this,arguments);if(!moving){moving=true;setM(false)}clearTimeout(mT);mT=setTimeout(()=>{moving=false;setM(true)},220);return r}
 }
/* 배경 음악이 효과음(건국 '둥' 등) 때문에 멈추면 다시 켜기 (모바일 브라우저에서 음악이 끊기는 문제) */
{const want=()=>bgOn==='file'&&SND.bgm&&(SND.when==='always'||playing)&&!document.hidden;
 const kick=()=>{try{if(want()&&BGA&&BGA.paused){const pr=BGA.play();if(pr&&pr.catch)pr.catch(()=>{})}if(AC&&AC.state!=='running'&&AC.state!=='closed'&&(want()||bgOn===true))AC.resume()}catch(_){}};
 setInterval(kick,800);
 const fs=fileStart;fileStart=function(){const r=fs.apply(this,arguments);if(BGA&&!BGA.__wd){BGA.__wd=1;BGA.addEventListener('pause',()=>setTimeout(kick,150))}return r};
 const sx=sfx;sfx=function(){const r=sx.apply(this,arguments);setTimeout(kick,120);setTimeout(kick,600);return r}}
/* 스페이스바: 지도에서 재생 / 멈춤 */
document.addEventListener('keydown',ev=>{if(ev.code!=='Space'&&ev.key!==' ')return;if(ev.repeat||ev.ctrlKey||ev.metaKey||ev.altKey)return;
  const t=ev.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
  const vm=$('v-map');if(!vm||vm.hidden)return;const sp=$('setpop');if(sp&&!sp.hidden)return;
  ev.preventDefault();ev.stopPropagation();try{if(document.activeElement&&document.activeElement.tagName==='BUTTON')document.activeElement.blur()}catch(_){}playing?pause():play()},true);
/* 지도 가장자리(중국 쪽) 직선 숨기기: 주변 땅 해안선은 자료 경계에서 잘라냄 */
{const c2=$('cl2');if(c2){try{const bb=c2.getBBox(),m=2.5;const cp=el('clipPath',{id:'cl2clip',clipPathUnits:'userSpaceOnUse'},$('defs'));el('rect',{x:bb.x+m,y:bb.y+m,width:bb.width-2*m,height:bb.height-2*m},cp);c2.setAttribute('clip-path','url(#cl2clip)')}catch(_){}}}
/* 배경 음악을 효과음과 같은 오디오 통로로: 모바일에서 효과음 뒤에 음악이 멈추거나 안 들리는 문제 방지 */
{let BGG=null;const ensureG=()=>{if(BGG||!BGA)return BGG;const a=ac();if(!a)return null;try{const src=a.createMediaElementSource(BGA);BGG=a.createGain();BGG.gain.value=0;src.connect(BGG);BGG.connect(a.destination);BGA.volume=1;window.__bgg=BGG}catch(_){BGG=null}return BGG};
 const ramp=(v,ms)=>{const t=AC.currentTime;BGG.gain.cancelScheduledValues(t);BGG.gain.setValueAtTime(BGG.gain.value,t);BGG.gain.linearRampToValueAtTime(v,t+ms/1000)};
 const ft=fadeTo;fadeTo=function(a,v,ms,done){if(a===BGA&&BGG){clearInterval(fadeT);clearTimeout(fadeTo.t);ramp(v,ms);if(done)fadeTo.t=setTimeout(done,ms);return}return ft.apply(this,arguments)};
 fileStart=function(){if(!BGA){BGA=new Audio('bgm.mp3');BGA.loop=true;BGA.preload='auto';try{BGA.crossOrigin='anonymous'}catch(_){}}const g=location.protocol.startsWith('http')?ensureG():null;if(g){BGA.volume=1;clearTimeout(fadeTo.t);ramp(0,10)}else BGA.volume=0;const pr=BGA.play();if(pr&&pr.catch)pr.catch(()=>{});fadeTo(BGA,fileVol(),1200)};
 const dk=duck;duck=function(){if(bgOn==='file'&&BGA&&BGG){clearTimeout(duck.t);ramp(fileVol()*.55,80);duck.t=setTimeout(()=>{if(bgOn==='file')ramp(fileVol(),700)},900);return}return dk.apply(this,arguments)}}
/* 재생 중 방향키: ←/→ 한 번 = 이전·다음 사건, 꾹 누르면 빨리 감기·되감기 / ↑↓ 이전·다음 장면(꾹 누르면 계속)
   멈춰 있을 땐 원래처럼 지도 끌기 */
{const fOfT=(i,T)=>{let a=0,b=1;for(let k=0;k<30;k++){const m=(a+b)/2;if(tOfF(i,m)<T)a=m;else b=m}return a};
 const KEV=EVENTS.filter(e=>e.f!=null).slice().sort((a,b)=>a.T-b.T||a.id-b.id);
 const frameOf=T=>{let i=0;for(let j=0;j<FRAMES.length;j++)if(FRAMES[j].t<=T+1e-9)i=j;return i};
 const seekT=(T,fit)=>{T=Math.max(FRAMES[0].t,T);if(!playing&&typeof closeBubble==='function')try{closeBubble(true)}catch(_){}if(rzCur){rzCur=null;clearTimeout(rzOut.t);try{animVB(fitVB(FRAMES[frameOf(T)].view),500)}catch(_){}}rzSeen.clear();const i=frameOf(T);const f=Math.max(0,Math.min(.9999,fOfT(i,T)));const ch=i!==pos.i;userMoved=false;setPos(i,f,{fit:fit!==false&&ch});if(typeof lastT!=='undefined')lastT=curT();holdUntil=performance.now()+250};
 const KS=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];let hk=null,hT=0,scr=0,rep=0,sLast=0,hStart=0;
 const stepOnce=k=>{const now=curT();
  if(k==='ArrowRight'){const e=KEV.find(x=>x.T>now+1e-6);if(e)seekT(e.T-1e-4)}
  else if(k==='ArrowLeft'){const past=KEV.filter(x=>x.T<now-1e-6);const e=past.length>1?past[past.length-2]:past[0];if(e)seekT(e.T-1e-4);else seekT(FRAMES[pos.i].t)}
  else if(k==='ArrowDown'){if(pos.i<FRAMES.length-1)seekT(FRAMES[pos.i+1].t)}
  else if(k==='ArrowUp'){const tgt=pos.f>.08||pos.i===0?pos.i:pos.i-1;seekT(FRAMES[tgt].t)}};
 const scrub=now=>{if(!hk){scr=0;return}const dt=Math.min(60,now-sLast);sLast=now;const dir=hk==='ArrowRight'?1:-1;
  const F=FRAMES[pos.i],span=(FRAMES[pos.i+1]?FRAMES[pos.i+1].t:tOfF(pos.i,1))-F.t;const hold=(now-hStart)/1000,mul=Math.min(40,8+hold*16);const rate=span/frameDur(pos.i)*mul; // 꾹 누를수록 빨라짐 (8배 → 40배)
  const T=curT()+dir*rate*dt;const last=tOfF(FRAMES.length-1,.9999);seekT(Math.min(last,T),true);holdUntil=performance.now()+120;scr=requestAnimationFrame(scrub)};
 const stopHold=()=>{clearTimeout(hT);clearInterval(rep);cancelAnimationFrame(scr);scr=0;if(hk){hk=null;holdUntil=performance.now()+200}};
 window.addEventListener('keydown',ev=>{const k=ev.key;if(k==='ArrowUp'||k==='ArrowDown')return;if(!KS.includes(k)||ev.ctrlKey||ev.metaKey||ev.altKey)return;const vm=$('v-map');if(!vm||vm.hidden)return;if([...document.querySelectorAll('#kpage,#ovpop,.modal,[role=dialog]')].some(x=>!x.hidden&&x.offsetParent!==null))return;
  const t=ev.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;ev.preventDefault();ev.stopImmediatePropagation();
  if(ev.repeat||hk===k)return;stopHold();hk=k;stepOnce(k);
  hT=setTimeout(()=>{if(hk!==k)return;if(k==='ArrowLeft'||k==='ArrowRight'){sLast=hStart=performance.now();scr=requestAnimationFrame(scrub)}else rep=setInterval(()=>{if(hk===k)stepOnce(k)},550)},240)},true);
 window.addEventListener('keyup',ev=>{if(!KS.includes(ev.key))return;if(hk===ev.key){stopHold();if(!ev.ctrlKey)ev.stopImmediatePropagation()}},true);
 window.addEventListener('blur',stopHold)}
/* 화면을 나가면(다른 앱·탭으로 가거나 지도 탭을 떠나면) 재생 자동 멈춤 */
{const stop=()=>{try{if(playing)pause()}catch(_){}};document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});window.addEventListener('pagehide',stop);
 const vm=$('v-map');if(vm)new MutationObserver(()=>{if(vm.hidden)stop()}).observe(vm,{attributes:true,attributeFilter:['hidden']})}
/* 로고(한국사 지도) 누르면: 새로고침하듯 지도 화면으로 */
{const h=document.querySelector('header.top h1');if(h){h.style.cursor='pointer';h.setAttribute('role','button');h.title='지도 화면으로';
 h.addEventListener('click',()=>{try{if(playing)pause()}catch(_){}
  document.querySelectorAll('.pppop,#pppop,#glpop,.glpop,#setpop').forEach(n=>{if(n.id==='setpop'){if(!n.hidden&&typeof closeSet==='function')closeSet()}else n.hidden=true});
  try{closeBubble(true)}catch(_){}try{selId=null;refreshSel()}catch(_){}abroad=false;userMoved=false;
  const app=document.querySelector('.app');app.classList.add('reloading');showView('map');
  try{flyVB(fitVB(FRAMES[pos.i].view))}catch(_){animVB(fitVB(FRAMES[pos.i].view),600)}
  document.querySelectorAll('#pbody,.pbody').forEach(n=>{try{n.scrollTo({top:0})}catch(_){}});try{if(typeof markListTime==='function')markListTime(true)}catch(_){}
  setTimeout(()=>app.classList.remove('reloading'),380)})}}

/* 확대 타이밍용: 마지막으로 사건이 뜬 시각 */
{const tk=ticker;ticker=function(){window.__lastTick=performance.now();return tk.apply(this,arguments)}}
/* 나갔다 와서 다시 재생할 때 음악이 안 켜지던 문제: 늦게 실행된 '멈춤 처리'가 새로 켠 음악을 끄지 않게 */
fileStop=function(){if(BGA&&!BGA.paused)fadeTo(BGA,0,600,()=>{if(bgOn!=='file')BGA.pause()})};
{const p0=play;play=function(){const r=p0.apply(this,arguments);try{if(AC&&AC.state!=='running')AC.resume();if(bgOn==='file'&&BGA&&BGA.paused){const pr=BGA.play();if(pr&&pr.catch)pr.catch(()=>{})}}catch(_){}return r}}
/* 옥저·동예는 고구려에 복속 — 4세기부터 그 땅도 고구려 땅으로 */
(function(){try{const F3=FRAMES[3],F4=FRAMES[4];const g=F4&&F4.st.find(s=>s.id==='goguryeo');if(!g||g._oj)return;const add=['okjeo','dongye'].map(id=>(F3.st.find(s=>s.id===id)||{}).d).filter(Boolean);g.d=g.d+' '+add.join(' ');g._oj=1;if(pos.i===4){const c=shapes.get('goguryeo');if(c){c.el.setAttribute('d',g.d);c.d=g.d}}}catch(_){}})();
/* 6세기: 장면 안에서 영토가 바뀜 — 553 신라 한강 장악(고구려 남쪽 땅이 신라로), 562 대가야 멸망(가야 → 신라) */
{const F5=FRAMES[5],F6=FRAMES[6],g5=id=>F5&&F5.st.find(s=>s.id===id),g6=id=>F6&&F6.st.find(s=>s.id===id);
 const MID=[];
 if(g5('silla')&&g6('silla')&&g5('goguryeo')&&g6('goguryeo')&&g5('gaya')&&!g6('gaya')){
  const s6=g6('silla'),k6=g6('goguryeo');
  MID.push({id:'silla',steps:[[F6.t,g5('silla').d,g5('silla').lab],[551,s6.d,s6.lab]]});window.__S6=s6.d;
  MID.push({id:'goguryeo',steps:[[F6.t,g5('goguryeo').d,g5('goguryeo').lab],[551,k6.d,k6.lab]]});
  const gy=Object.assign({},g5('gaya'));F6.st.push(gy);MID.push({id:'gaya',until:562})}
 MID.push({id:'goguryeo',fr:7,until:668});{const F3=FRAMES[3],F4=FRAMES[4],a=F3&&F3.st.find(x=>x.id==='goguryeo'),b=F4&&F4.st.find(x=>x.id==='goguryeo');const oj=['okjeo','dongye'].map(id=>(F3.st.find(x=>x.id===id)||{}).d).filter(Boolean).join(' ');if(a&&b)MID.push({id:'goguryeo',fr:3,steps:[[F3.t,a.d,a.lab],[56,a.d+' '+oj,a.lab,[127.3,40.9]],[313,b.d,b.lab]]});MID.push({id:'nangnang',fr:3,until:313});MID.push({id:'okjeo',fr:3,until:56,lag:1900});MID.push({id:'dongye',fr:3,until:56,lag:1900})}MID.push({id:'balhae',fr:10,until:926});
/* 고조선: 연(진개) 침략(기원전 3세기)으로 서쪽 땅을 잃고, 위만 때 진번·임둔 복속 */
{try{const F2=FRAMES[2],F3=FRAMES[3],g=F2&&F2.st.find(s=>s.id==='gojoseon');if(g&&!g._cut){
 const A=[X(121.0),Y(38.5)],B=[X(122.9),Y(44.6)],sd=p=>(B[0]-A[0])*(p[1]-A[1])-(B[1]-A[1])*(p[0]-A[0]),ref=Math.sign(sd([X(125),Y(41)]));
 const inn=p=>sd(p)*ref>=0,cut=(p,q)=>{const a=sd(p),b=sd(q),u=a/(a-b);return [p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u]};
 const clip=d=>d.split('Z').map(x=>x.trim()).filter(Boolean).map(x=>{const P=x.replace(/^M/,'').split('L').map(t=>t.split(',').map(Number));const o=[];for(let i=0;i<P.length;i++){const p=P[i],q=P[(i+1)%P.length];if(inn(p)){o.push(p);if(!inn(q))o.push(cut(p,q))}else if(inn(q))o.push(cut(p,q))}return o.length>2?'M'+o.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z':''}).join('');
 const d1=clip(g.d);const add=['nangnang','dongye'].map(id=>(F3.st.find(x=>x.id===id)||{}).d).filter(Boolean).join(' ');g._cut=1;
 MID.push({id:'gojoseon',fr:2,steps:[[F2.t,g.d,g.lab],[-300,d1,g.lab],[-190,d1+' '+add,g.lab,[125.75,39.02]]]});
 {const af=applyFrame;let lk=null;const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);try{if(pos.i===2){const t=curT(),k=t>=-190;if(lk===false&&k&&playing)topBanner({T:-190,f:2,id:-1,t:'위만 조선, 진번·임둔 복속',tp:['war','pol'],ll:[125.75,39.02]});lk=k}else lk=null}catch(_){}return r}}
}}catch(_){}}

 {const F4=FRAMES[4],g4=id=>F4&&F4.st.find(s=>s.id===id);['goguryeo','baekje'].forEach(id=>{const a=g4(id),b=g5(id);if(a&&b&&a.d!==b.d)MID.push({id,fr:5,steps:[[F5.t,a.d,a.lab],[475,b.d,b.lab]]})});
  const a=g4('silla'),b=g5('silla');if(a&&b&&a.d!==b.d)MID.push({id:'silla',fr:5,steps:[[F5.t,a.d,a.lab],[475,b.d,b.lab]]})}
 /* 광개토 대왕(400년 무렵) 요동·북방 확장 → 475 한강 / 부여는 494년까지 따로 */
 {try{const F4=FRAMES[4],F5=FRAMES[5];const ga=F4.st.find(s=>s.id==='goguryeo'),gb=F5.st.find(s=>s.id==='goguryeo'),by=F4.st.find(s=>s.id==='buyeo');
  const A=[X(120.5),Y(38.0)],B=[X(131),Y(41.8)],sd=p=>(B[0]-A[0])*(p[1]-A[1])-(B[1]-A[1])*(p[0]-A[0]),nref=Math.sign(sd([X(124),Y(42)]));
  const cut=(p,q)=>{const a=sd(p),b=sd(q),u=a/(a-b);return [p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u]};
  const clip=(d,north)=>d.split('Z').map(x=>x.trim()).filter(Boolean).map(x=>{const P=x.replace(/^M/,'').split('L').map(t=>t.split(',').map(Number));const inn=p=>(sd(p)*nref>=0)===north;const o=[];for(let i=0;i<P.length;i++){const p=P[i],q=P[(i+1)%P.length];if(inn(p)){o.push(p);if(!inn(q))o.push(cut(p,q))}else if(inn(q))o.push(cut(p,q))}return o.length>2?'M'+o.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z':''}).join('');
  if(ga&&gb){const mix=clip(gb.d,true)+' '+clip(ga.d,false);const M=MID.find(m=>m.id==='goguryeo'&&m.fr===5);if(M)M.steps=[[F5.t,ga.d,ga.lab],[400,mix,gb.lab],[475,gb.d,gb.lab]]}
  if(by&&!F5.st.some(s=>s.id==='buyeo')){F5.st.push(Object.assign({},by,{from:undefined}));MID.push({id:'buyeo',fr:5,until:494})}
 }catch(_){}}
 const mor=(c,d1,lab,anim)=>{{const tk=(typeof morphTasks!=='undefined'&&morphTasks||[]).find(k=>k.cur===c);if(tk){tk.to=d1;try{tk.f=flubber.interpolate(tk.from,d1,{maxSegmentLength:7})}catch(_){tk.f=null}if(lab)tk.l1=lab;c.d=d1;return}}const p=c.el,d0=p.getAttribute('d');if(d0===d1)return;cancelAnimationFrame(c.mr);
   if(!anim||typeof flubber==='undefined'||reduceMotion){p.setAttribute('d',d1);c.d=d1;if(lab){c.lab.o.x=lab[0];c.lab.o.y=lab[1]}placeOV();schedLabels();return}
   let f=null;try{f=flubber.interpolate(d0,d1,{maxSegmentLength:7})}catch(_){}const l0=[c.lab.o.x,c.lab.o.y],t0=performance.now(),D=2000;c.d=d1;
   const st=now=>{const u=Math.min(1,(now-t0)/D),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;p.setAttribute('d',f?(u>=1?d1:f(e)):(e<.5?d0:d1));if(lab){c.lab.o.x=l0[0]+(lab[0]-l0[0])*e;c.lab.o.y=l0[1]+(lab[1]-l0[1])*e}placeOV();if(u<1)c.mr=requestAnimationFrame(st);else schedLabels()};c.mr=requestAnimationFrame(st)};
 function applyMid(fresh){if(![2,3,5,6,7,10].includes(pos.i))return;try{const t=curT();for(const M of MID){if((M.fr||6)!==pos.i)continue;const c=shapes.get(M.id);if(!c)continue;
   if(M.until){const on=t<M.until-1e-6;const key=String(on);if(c.mk===key&&!fresh)continue;const anim=!fresh&&c.mk!=null;c.mk=key;clearTimeout(c.ut);if(anim&&!on&&M.lag){c.el.style.transition='none';c.lab.g.style.transition='opacity .8s';c.lab.g.style.opacity='0';c.ut=setTimeout(()=>{c.el.style.opacity='0';c.lab.g.style.visibility='hidden';c.lab.g.style.opacity=''},M.lag);continue}c.el.style.transition=anim&&!M.lag?'opacity 1.6s':'none';c.el.style.opacity=on?'':'0';c.lab.g.style.opacity='';c.lab.g.style.visibility=on?'':'hidden';continue}
   let k=0;M.steps.forEach(([y],i)=>{if(t>=y-1e-6)k=i});const key=String(k);if(c.mk===key&&!fresh)continue;const anim=!fresh&&c.mk!=null&&+key>+c.mk;c.mk=key;if(c.sm)c.sm.end(false);const S=M.steps[k];if(anim&&S[3]&&!reduceMotion)spreadMor(c,S[1],S[2],S[3]);else mor(c,S[1],S[2],anim)}}catch(_){}}
 function spreadMor(c,d1,lab,ll){const p=c.el;cancelAnimationFrame(c.mr);const cid='sm'+Math.random().toString(36).slice(2,8),cp=el('clipPath',{id:cid},$('defs')),cx=X(ll[0]),cy=Y(ll[1]),ci=el('circle',{cx,cy,r:0},cp);const cl=p.cloneNode(false);cl.removeAttribute('id');cl.setAttribute('d',d1);cl.style.transition='none';cl.style.opacity='1';cl.style.pointerEvents='none';cl.setAttribute('clip-path',`url(#${cid})`);p.parentNode.appendChild(cl);let R=600;try{const bb=cl.getBBox();R=Math.max(...[[bb.x,bb.y],[bb.x+bb.width,bb.y],[bb.x,bb.y+bb.height],[bb.x+bb.width,bb.y+bb.height]].map(([x,y])=>Math.hypot(x-cx,y-cy)))+10}catch(_){}let raf=0;const t0=performance.now(),D=2000;const end=(fin)=>{cancelAnimationFrame(raf);cl.remove();cp.remove();c.sm=null;if(fin!==false)mor(c,d1,lab,false)};c.sm={end};const st=now=>{const u=Math.min(1,(now-t0)/D),k=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;ci.setAttribute('r',(R*k).toFixed(1));if(u<1)raf=requestAnimationFrame(st);else end()};raf=requestAnimationFrame(st)}
 window.__applyMid=applyMid;{const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);applyMid(false);return r}}
 {const af=applyFrame;applyFrame=function(i){MID.forEach(M=>{const c=shapes.get(M.id);if(c){c.mk=null;c.el.style.opacity='';c.lab.g.style.opacity='';c.lab.g.style.visibility=''}});const r=af.apply(this,arguments);if([2,3,5,6,7,10].includes(i))applyMid(true);return r}}
 if(pos.i===6){try{applyFrame(6,false)}catch(_){}}}
/* 비석 사건은 진짜 비석 모양으로 땅에 세움 */
{const RE=/릉비|순수비|정계비|척화비|령비|비 건립/;
 const ST='<path class="stb" d="M-7,0.6H7V-2.6H-7Z"/><path class="sts" d="M-4.3,-2.6V-17.2Q-4.3,-21.6 0,-21.6Q4.3,-21.6 4.3,-17.2V-2.6Z"/><path class="stl" d="M-1.9,-17.5V-5.5M1.9,-17.5V-5.5"/>';
 EVENTS.filter(e=>RE.test(e.t)).forEach(e=>{const o=pinOf.get(e.id);if(!o)return;const gl=o.g.querySelector('.gl');if(!gl)return;gl.innerHTML=ST;o.g.classList.add('stelepin')})}
/* 고조선 멸망 → 2초 보여 준 뒤 여러 나라가 차례로 사아악 생김 */
{const SEQ={3:['nangnang','buyeo','okjeo','dongye','mahan','jinhan','byeonhan']},WAIT=2100,GAP=700,D=2000;
 const reveal=(c)=>{const p=c.el;const cid='sq'+Math.random().toString(36).slice(2,8),cp=el('clipPath',{id:cid},$('defs'));const cx=c.lab.o.x,cy=c.lab.o.y,ci=el('circle',{cx,cy,r:0},cp);
   let R=400;try{const bb=p.getBBox();R=Math.max(...[[bb.x,bb.y],[bb.x+bb.width,bb.y],[bb.x,bb.y+bb.height],[bb.x+bb.width,bb.y+bb.height]].map(([x,y])=>Math.hypot(x-cx,y-cy)))+10}catch(_){}
   p.setAttribute('clip-path',`url(#${cid})`);p.style.visibility='';c.lab.g.style.visibility='';setTimeout(()=>{try{window.__applyMid&&__applyMid(true)}catch(_){}},560);c.lab.g.style.opacity='0';c.lab.g.style.transition='opacity .6s';setTimeout(()=>{c.lab.g.style.opacity=''},500);
   const t0=performance.now();const st=now=>{const u=Math.min(1,(now-t0)/D),k=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;ci.setAttribute('r',(R*k).toFixed(1));if(u<1)requestAnimationFrame(st);else{p.removeAttribute('clip-path');cp.remove()}};requestAnimationFrame(st)};
 const af=applyFrame;applyFrame=function(i,anim){const r=af.apply(this,arguments);const L=SEQ[i];if(!L||!anim||reduceMotion)return r;
   const cs=L.map(id=>shapes.get(id)).filter(Boolean);cs.forEach(c=>{c.el.style.visibility='hidden';c.lab.g.style.visibility='hidden'});
   const t0=performance.now(),H=playing?t0+WAIT+cs.length*GAP+900:0;holdUntil=Math.max(holdUntil,H);Promise.resolve().then(()=>{holdUntil=Math.max(holdUntil,H)});setTimeout(()=>{holdUntil=Math.max(holdUntil,H)},0);
   const W2=playing?WAIT:150,G2=playing?GAP:220;cs.forEach((c,k)=>setTimeout(()=>{if(pos.i!==i){c.el.style.visibility='';c.lab.g.style.visibility='';return}reveal(c)},W2+k*G2));
   const fix=()=>{if(pos.i!==i)cs.forEach(c=>{c.el.style.visibility='';c.lab.g.style.visibility=''});try{window.__applyMid&&__applyMid(true)}catch(_){}};setTimeout(fix,(playing?WAIT+cs.length*GAP:150+cs.length*220)+50);return r}}
/* 깃발 조금 짧게 */
document.querySelectorAll('.pin.flagpin').forEach(g=>{const p=g.querySelector('.pole'),f=g.querySelector('.flg'),k=g.querySelector('.knob');if(p)p.setAttribute('d','M0,1.5V-22.2');if(f){f.removeAttribute('transform');f.setAttribute('d','M0.8,-20.9C5,-23.9,9.5,-17.4,15,-20.6V-10.2C9.5,-7,5,-13.5,0.8,-10.5Z')}if(k)k.setAttribute('cy','-22.8')});
/* 독립운동(만세 운동 등) 깃발은 태극기 */
document.querySelectorAll('.pin.flagpin.k-ind').forEach(g=>{const f=g.querySelector('.flg');if(!f||g.querySelector('.tgk'))return;f.classList.add('tgflag');
 const t=document.createElementNS('http://www.w3.org/2000/svg','g');t.setAttribute('class','tgk');t.setAttribute('transform','translate(0,4.6)');
 t.innerHTML='<clipPath id="tgcl"><circle cx="7.9" cy="-20.2" r="2.6"/></clipPath><circle class="tgb" cx="7.9" cy="-20.2" r="2.6"/><path class="tgsp" clip-path="url(#tgcl)" d="M6.32,-21.78 L6.48,-21.91 L6.65,-22.02 L6.84,-22.12 L7.03,-22.19 L7.22,-22.25 L7.42,-22.28 L7.62,-22.30 L7.81,-22.30 L8.01,-22.27 L8.20,-22.23 L8.38,-22.17 L8.55,-22.10 L8.72,-22.01 L8.87,-21.91 L9.01,-21.79 L9.14,-21.66 L9.25,-21.52 L9.35,-21.38 L9.43,-21.22 L9.50,-21.06 L9.55,-20.90 L9.58,-20.74 L9.60,-20.57 L9.60,-20.41 L9.59,-20.25 L9.56,-20.09 L9.52,-19.94 L9.46,-19.80 L9.39,-19.67 L9.31,-19.54 L9.22,-19.43 L9.12,-19.32 L9.01,-19.23 L8.90,-19.15 L8.78,-19.09 L8.66,-19.03 L8.53,-18.99 L8.41,-18.97 L8.28,-18.95 L8.16,-18.95 L8.04,-18.96 L7.92,-18.98 L7.81,-19.01 L7.71,-19.06 L7.61,-19.11 L7.52,-19.17 L7.44,-19.23 L7.36,-19.31 L7.30,-19.38 L7.25,-19.47 L7.20,-19.55 L7.17,-19.64 L7.15,-19.72 L7.13,-19.81 L7.13,-19.89 L7.13,-19.98 L7.15,-20.05 L7.17,-20.13 L7.19,-20.20 L7.23,-20.26"/><path class="tgt" d="M3.01,-24.99L1.70,-23.10M3.66,-24.54L2.34,-22.66M4.30,-24.10L2.99,-22.21M14.08,-22.86L13.61,-23.59M13.30,-24.06L12.82,-24.79M13.43,-22.44L12.17,-24.36M12.78,-22.01L12.30,-22.74M11.99,-23.21L11.52,-23.94M1.69,-17.06L3.05,-15.21M2.32,-17.53L2.83,-16.83M3.17,-16.37L3.68,-15.67M2.95,-17.99L4.31,-16.14M12.79,-15.41L13.28,-16.13M13.60,-16.59L14.10,-17.30M12.14,-15.86L12.64,-16.57M12.96,-17.03L13.46,-17.74M11.50,-16.30L12.00,-17.01M12.32,-17.47L12.81,-18.19"/>';
 f.after(t)});
/* 백제: 기원전 18년 위례성에서 작게 생겨(둥) 369년 마한 복속까지 조금씩 넓어짐 */
{const FR=3,T0=-18,T1=369,LL=[127.11,37.52];const deg=X(1)-X(0);const lay=el('g',{},G.terr);
 const cp=el('clipPath',{id:'bjgrow',clipPathUnits:'userSpaceOnUse'},$('defs')),cpp=el('path',{},cp);
 const ci=el('circle',{cx:X(LL[0]),cy:Y(LL[1]),r:0,'clip-path':'url(#bjgrow)',style:'stroke:none'},lay);let shown=false,grow=0,ra=0,R1=0,rt=0;const bl=el('g',{class:'bhlab bjlab'},labG);const bt=el('text',{x:-20,y:-13},bl);bt.textContent='백제';bt.style.fill='color-mix(in srgb,var(--c-baekje) 60%,var(--ink))';ovItem(bl,X(LL[0]),Y(LL[1]));bl.style.display='none';
 function upd(){try{const h=shapes.get('mahan');const on=pos.i===FR&&h&&h.el.style.visibility!=='hidden',t=curT();lay.style.display=on?'':'none';bl.style.display=on&&t>=T0-1e-6&&t<T1-1e-6?'':'none';if(!on||!h)return;if(G.terr.lastChild!==lay)G.terr.appendChild(lay);
   const d=h.el.getAttribute('d');if(cpp.getAttribute('d')!==d){cpp.setAttribute('d',d);try{const bb=h.el.getBBox(),cx=X(LL[0]),cy=Y(LL[1]);R1=Math.max(...[[bb.x,bb.y],[bb.x+bb.width,bb.y],[bb.x,bb.y+bb.height],[bb.x+bb.width,bb.y+bb.height]].map(([x,y])=>Math.hypot(x-cx,y-cy)))}catch(_){R1=deg*3}}
   ci.style.fill=h.el.dataset.full||STATE_FULL();
   const setName=n=>{const tx=h.lab.t;if(tx.textContent!==n){tx.textContent=n;h.lab.o.lc=null;schedLabels()}};
   if(t<T0-1e-6||t>=T1-1e-6){ci.setAttribute('r',0);shown=false;cancelAnimationFrame(ra);grow=0;setName(t>=T1-1e-6?'백제':'마한');h.lab.g.style.visibility='';return}
   const p=(t-T0)/(T1-T0),R=deg*.3+(R1-deg*.3)*Math.pow(p,1.15);rt=R;
   {const dl=Math.hypot(h.lab.o.x-X(LL[0]),h.lab.o.y-Y(LL[1]));const big=R>dl+deg*.25;setName('마한');h.lab.g.style.visibility=big?'hidden':'';bl.style.display='';const bo=OV.find(o=>o.g===bl);if(bo){if(big){const t2=h.lab.t,ty=+(t2.getAttribute('y')||0),tx=+(t2.getAttribute('x')||0);bo.x=h.lab.o.x;bo.y=h.lab.o.y;bt.setAttribute('x',tx);bt.setAttribute('y',ty);bt.setAttribute('text-anchor','middle');bt.style.fontSize=t2.style.fontSize||'18px'}else{bo.x=X(LL[0]);bo.y=Y(LL[1]);bt.setAttribute('x',-20);bt.setAttribute('y',-13);bt.style.fontSize=''}placeOV()}}
   if(!shown){shown=true;if(!reduceMotion){const t0=performance.now();grow=1;const st=now=>{const u=Math.min(1,(now-t0)/2000),k=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;ci.setAttribute('r',(rt*k).toFixed(1));if(u<1)ra=requestAnimationFrame(st);else grow=0};ra=requestAnimationFrame(st);return}}
   if(!grow)ci.setAttribute('r',R.toFixed(1))}catch(_){}}
 const STATE_FULL=()=>{const c=shapes.get('mahan');return c&&c.base?c.base:'color-mix(in srgb,var(--c-baekje) 66%,var(--land))'};
 {const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);upd();return r}}
 {const af=applyFrame;applyFrame=function(){shown=false;grow=0;const r=af.apply(this,arguments);upd();return r}}
 setInterval(()=>{if(pos.i===FR&&lay.style.display==='none')upd()},300);upd()}
/* 영토 변화를 역사 흐름대로: 한 장면 안에서 다음 장면 영토로 시간에 맞춰 조금씩 바뀜 (장면 경계에서 한번에 바뀌지 않게) */
{const EXC={3:['mahan','jinhan','byeonhan','goguryeo'],6:['silla','goguryeo','gaya'],10:['taebong']};const cache=new Map();let lastU=0,lastP=-1,lastI=-1;
 const pairs=i=>{if(cache.has(i))return cache.get(i);const A=FRAMES[i],B=FRAMES[i+1],L=[];
   const same=false; /* 미리 바뀌는 흐름은 끔 — 사건 연도에 맞춰서만 바꿈 */
   if(same&&typeof flubber!=='undefined'){const ex=new Set(EXC[i]||[]);A.st.forEach(s=>{if(ex.has(s.id))return;const n=B.st.find(x=>x.id===s.id);if(!n||n.d===s.d)return;L.push({id:s.id,d0:s.d,d1:n.d,l0:s.lab,l1:n.lab,f:null})})}
   cache.set(i,L);return L};
 function flow(force){try{if(reduceMotion)return;const i=pos.i,L=pairs(i);if(!L.length)return;const now=performance.now();if(!force&&now-lastU<(playing?180:90))return;
   const A=FRAMES[i],t1=FRAMES[i+1].t,p=Math.max(0,Math.min(1,(curT()-A.t)/(t1-A.t)));if(!force&&i===lastI&&Math.abs(p-lastP)<.004)return;lastU=now;lastP=p;lastI=i;
   const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
   for(const q of L){const c=shapes.get(q.id);if(!c||(c.mr))continue;if(!q.f){try{q.f=flubber.interpolate(q.d0,q.d1,{maxSegmentLength:9})}catch(_){q.f=false}}if(!q.f)continue;
     if(morphTasks&&morphTasks.some(k=>k.cur===c))continue;
     const d=p<=0.001?q.d0:p>=.995?q.d1:q.f(e);c.el.setAttribute('d',d);c.d=p>=.995?q.d1:(p<=0.001?q.d0:d);
     if(q.l0&&q.l1){c.lab.o.x=q.l0[0]+(q.l1[0]-q.l0[0])*e;c.lab.o.y=q.l0[1]+(q.l1[1]-q.l0[1])*e}}
   placeOV();schedLabels()}catch(_){}}
 {const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);flow(false);return r}}
 {const af=applyFrame;applyFrame=function(i){const r=af.apply(this,arguments);lastP=-1;setTimeout(()=>flow(true),2050);return r}}
 flow(true)}
/* 그림자를 속성으로 직접 지정 (일부 브라우저는 CSS로 준 위치를 무시해서 그림자가 아래로 떨어져 보임) */
document.querySelectorAll('.pin.stelepin .psh').forEach(e=>{e.setAttribute('cx',0);e.setAttribute('cy',0.8);e.setAttribute('rx',8);e.setAttribute('ry',2)});
document.querySelectorAll('.pin.flagpin .psh').forEach(e=>{e.setAttribute('cx',0);e.setAttribute('cy',2);e.setAttribute('rx',6);e.setAttribute('ry',1.8)});
/* 마한·진한·변한 사이 경계선 없애기 */
{const IDS=['mahan','jinhan','byeonhan'];const f=()=>IDS.forEach(id=>{const c=shapes.get(id);if(c){c.el.style.stroke='none'}});
 const af=applyFrame;applyFrame=function(){const r=af.apply(this,arguments);f();return r};f()}
/* 렉 줄이기: 재생 중 글자 배치는 0.15초에 한 번만 */
{const sl=schedLabels;let last=0,tm=0;schedLabels=function(){const now=performance.now();if(!playing||now-last>150){last=now;return sl()}if(!tm)tm=setTimeout(()=>{tm=0;last=performance.now();sl()},150-(now-last))}}
/* 렉 줄이기: 재생 중 작은 지도 자리 계산은 0.3초에 한 번만 */
{const thr=(fn,ms)=>{let last=0,tm=0;return function(){const now=performance.now();if(!playing||now-last>ms){last=now;clearTimeout(tm);tm=0;return fn.apply(this,arguments)}if(!tm)tm=setTimeout(()=>{tm=0;last=performance.now();fn()},ms-(now-last))}};
 updateInset=thr(updateInset,300);placeInset=thr(placeInset,300)}
/* 연대표 세로: 줄마다 화면 폭을 꽉 채우도록 시대별 간격을 늘려서 다시 배치 */
{const vs=vSlice;vSlice=function(){if(window.__ovMeasure){const sc=$('ovscroll'),cw=Math.max(280,sc.clientWidth-20),M={};
   for(const s of $('ovchart').querySelectorAll('.hsec')){const top=s.querySelector('.hztop');if(!top)continue;const r0=top.getBoundingClientRect();let R=0;top.querySelectorAll('*').forEach(el=>{if(el.children.length&&!(el instanceof SVGElement))return;const r=el.getBoundingClientRect();if(!r.width||r.width>cw*.6)return;R=Math.max(R,r.right-r0.left)});M[s.dataset.sec]={W:R+12,cw}}
   window.__ovM=M;return}return vs.apply(this,arguments)};
 const bc=buildCont;buildCont=function(){if(ovDir!=='v'||window.__ovMeasure)return bc.apply(this,arguments);
   let F={};const meas=()=>{window.HZ_GAPF=F;window.__ovMeasure=1;try{bc.apply(this,arguments)}finally{window.__ovMeasure=0}return window.__ovM||{}};
   let M=meas();const N={};for(const k in M){const {W,cw}=M[k];if(!W)continue;const q=W/cw;N[k]=Math.max(1,q-Math.floor(q)>.3?Math.ceil(q):Math.floor(q))}
   for(let it=0;it<2;it++){for(const k in M){const {W,cw}=M[k];if(!W||!N[k])continue;const tgt=N[k]*cw*.97;F[k]=Math.max(.85,Math.min(9,(F[k]||1)*tgt/W))}if(it<1)M=meas()}
   window.HZ_GAPF=F;const r=bc.apply(this,arguments);window.HZ_GAPF={};return r}}
/* 연대표 세로: 줄 경계에서 글씨가 잘리지 않게 — 글씨는 자기 자리(가운데)가 있는 줄에 통째로 보이고, 다른 줄 것은 숨김 */
{const vs=vSlice;vSlice=function(){const r=vs.apply(this,arguments);if(window.__ovMeasure)return r;try{vFix()}catch(_){}return r};
 window.__vFix=()=>vFix();function vFix(){const sc=$("ovscroll"),cw=Math.max(280,sc.clientWidth-20);
  document.querySelectorAll('#ovchart .vrow').forEach(row=>{const inn=row.querySelector('.vrin');if(!inn)return;const a=-parseFloat(inn.style.left)||0,w=parseFloat(row.style.width)||row.clientWidth,b=a+w;
   const pad=Math.max(0,Math.min(36,(cw-w)/2));row.style.width=Math.min(cw,w+pad*2)+'px';inn.style.left=(-(a-pad))+'px';
   const r0=inn.getBoundingClientRect(),ox=r0.left;
   inn.querySelectorAll('*').forEach(el=>{if(el.children.length&&!(el instanceof SVGElement))return;const r=el.getBoundingClientRect();if(!r.width)return;const L=r.left-ox,R=r.right-ox;
     if(r.width>cw*.6){const cl=Math.max(0,a-L),cr=Math.max(0,R-b);if(cl||cr)el.style.clipPath=`inset(0px ${cr}px 0px ${cl}px)`;return}
     const c=(L+R)/2;if(c<a||c>=b){el.style.visibility='hidden';return}
    });
   const rr=row.getBoundingClientRect(),sec=row.closest('.ovsec'),sr=sec?sec.getBoundingClientRect():rr,vis0=Math.max(rr.left,sr.left)-ox,vis1=Math.min(rr.right,sr.right,innerWidth)-ox;
   inn.querySelectorAll('.hzn').forEach(bt=>{if(getComputedStyle(bt).visibility==='hidden')return;const sp=bt.firstElementChild&&getComputedStyle(bt.firstElementChild).visibility!=='hidden'?bt.firstElementChild:bt;sp.style.translate='';const q=sp.getBoundingClientRect();if(!q.width)return;const L=q.left-ox,R=q.right-ox;let dx=0;if(L<vis0+2)dx=vis0+2-L;else if(R>vis1-2)dx=vis1-2-R;if(dx&&q.width<vis1-vis0-4){if(getComputedStyle(sp).display==="inline")sp.style.display="inline-block";sp.style.translate=`${dx.toFixed(1)}px 0`}})})}}
/* 영토 바뀔 때 빈틈·흰 바탕 막기: 영토 밑에 '바탕 영토'를 깔아 둠
   (바뀌는 동안엔 이전 나라 + 바뀔 모양, 그 뒤엔 지금 모양 + 다음 장면 모양) → 틈이 나도 흰색이 아니라 원래 있던 나라 색이 보임 */
{const NS='http://www.w3.org/2000/svg';const base=document.createElementNS(NS,'g');base.setAttribute('class','terrbase');G.terr.insertBefore(base,G.terr.firstChild);
 const EXC2={3:['mahan','jinhan','byeonhan','goguryeo'],6:['silla','goguryeo','gaya'],10:['taebong']};
 const visOK=el=>{const cs=getComputedStyle(el);return cs.visibility!=='hidden'&&cs.display!=='none'&&+cs.opacity>.05&&el.style.opacity!=='0'};
 const add=(d,fill)=>{if(!d||!fill||fill==='none')return;const p=document.createElementNS(NS,'path');p.setAttribute('d',d);p.style.fill=fill;p.style.stroke=fill;p.style.strokeWidth='3px';p.style.strokeLinejoin='round';p.style.vectorEffect='non-scaling-stroke';base.appendChild(p)};
 const curFill=c=>getComputedStyle(c.el).fill;
 function keepFirst(){if(G.terr.firstChild!==base)G.terr.insertBefore(base,G.terr.firstChild)}
 function flowBase(i){base.innerHTML='';keepFirst();const B=FRAMES[i+1],A=FRAMES[i],ex=new Set(EXC2[i]||[]);
   const same=false;if(same)B.st.forEach(s=>{if(ex.has(s.id)||!A.st.some(x=>x.id===s.id))return;const c=shapes.get(s.id);if(c&&visOK(c.el))add(s.d,curFill(c))});
   A&&A.st.forEach(s=>{const c=shapes.get(s.id);if(c&&visOK(c.el))add(c.el.getAttribute('d'),curFill(c))})}
 let bT=0;const af=applyFrame;applyFrame=function(i,anim){
   const snap=anim?[...G.terr.children].filter(p=>p.tagName==='path'&&visOK(p)).map(p=>[p.getAttribute('d'),getComputedStyle(p).fill]):[];
   const r=af.apply(this,arguments);clearTimeout(bT);base.innerHTML='';keepFirst();
   if(anim){snap.forEach(([d,f])=>add(d,f));const P=FRAMES[i-1]||{st:[]};(FRAMES[i].st||[]).forEach(s=>{if(!P.st.some(x=>x.id===s.id||x.id===s.from))return;const c=shapes.get(s.id);if(c&&visOK(c.el))add(s.d,curFill(c))});bT=setTimeout(()=>{if(pos.i===i)flowBase(i)},2150)}
   else flowBase(i);return r};
 flowBase(pos.i)}
/* 삼국 시대부터: 한반도 땅에 주인 없는 흰 땅이 안 보이게, 가장 가까운 나라 색으로 메움 (실제 영토 밑에 깔림) */
{const NS='http://www.w3.org/2000/svg';const cp=el('clipPath',{id:'korclip',clipPathUnits:'userSpaceOnUse'},$('defs'));el('path',{d:LAND.korHi||LAND.kor},cp);
 const fill=document.createElementNS(NS,'g');fill.setAttribute('clip-path','url(#korclip)');fill.setAttribute('class','terrfill');
 const deg=X(1)-X(0);
 function build(){fill.innerHTML='';if(pos.i<3){fill.remove();return}const base=G.terr.querySelector('.terrbase');if(base)G.terr.insertBefore(fill,base);else G.terr.insertBefore(fill,G.terr.firstChild);
   const sts=(FRAMES[pos.i].st||[]).map(s=>shapes.get(s.id)).filter(c=>c&&getComputedStyle(c.el).opacity>.05&&getComputedStyle(c.el).visibility!=='hidden');
   sts.forEach(c=>{const f=getComputedStyle(c.el).fill;if(!f||f==='none'||/url/.test(f))return;const p=document.createElementNS(NS,'path');p.setAttribute('d',c.el.getAttribute('d'));p.style.fill=f;p.style.stroke=f;p.style.strokeWidth=(deg*.8)+'px';p.style.strokeLinejoin='round';fill.appendChild(p)})}
 const af=applyFrame;applyFrame=function(){const r=af.apply(this,arguments);clearTimeout(build.t);build();build.t=setTimeout(build,2200);return r};
 {let lt=0;const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);const n=performance.now();if(n-lt>700){lt=n;build()}return r}}
 build()}
document.querySelectorAll('.pin .sealt').forEach(t=>t.setAttribute('y','0.5'));
/* 낱말 풀이 → 한 번 더 누르면 더 자세히 (누가·왜·무엇을·배경 이야기), '사전에서 보기'는 사전으로 */
const DEEP={
'갑오개혁':[['누가','군국기무처(김홍집·유길준 등), 뒤에 김홍집·박영효 연립 내각'],['왜','동학 농민 운동과 청일 전쟁 속에서 일본이 경복궁을 점령하고 개혁을 요구함. 농민들의 폐정 개혁 요구도 일부 반영'],['일본과','일본의 간섭 아래 진행 — 그래서 자주적 개혁이라는 평가와 일본에 이용당했다는 평가가 함께 있음'],['무엇을','1차: 개국 기년 사용, 과거제 폐지, 신분제(양반·상민) 폐지, 노비제 폐지, 과부 재가 허용, 조세 금납화, 은 본위제, 도량형 통일 · 2차: 홍범 14조 반포, 8도 → 23부, 재판소 설치(사법권 독립), 교육 입국 조서'],['흐름','동학 농민 운동(1894) → 갑오개혁 → 을미사변·을미개혁(1895) → 아관 파천(1896)으로 중단']],
'갑신정변':[['누가','김옥균·박영효·홍영식·서광범·서재필 등 급진 개화파'],['왜','임오군란 뒤 청의 간섭이 심해지고 민씨 정권이 청에 기대자, 일본처럼 빠르게 근대화하려 함'],['일본과','일본 공사관이 군대 지원을 약속 → 청군이 개입하자 일본군이 물러나 3일 만에 실패(삼일천하)'],['무엇을','14개조 정강: 청에 대한 사대 폐지, 문벌 폐지·인민 평등, 지조법(토지세) 개혁, 호조로 재정 일원화, 내각 중심 정치'],['결과','한성 조약(조선-일본), 톈진 조약(청-일본: 함께 철수, 파병 시 서로 알림) → 청일 전쟁의 씨앗']],
'을미개혁':[['누가','김홍집 친일 내각'],['왜','삼국 간섭으로 일본 세력이 약해지자 명성 황후를 시해(을미사변)하고 친일 내각이 다시 개혁 추진'],['무엇을','단발령, 태양력 사용, "건양" 연호, 종두법, 소학교 설치, 우체사, 친위대·진위대'],['결과','단발령과 을미사변에 반발해 을미의병 → 아관 파천으로 중단']],
'임오군란':[['누가','구식 군인과 도시 하층민, 흥선 대원군이 다시 집권'],['왜','신식 군대 별기군과 차별받고 밀린 녹봉으로 겨와 모래 섞인 쌀을 받음'],['결과','청군이 대원군을 납치하고 진압 → 제물포 조약(일본 공사관 경비병 주둔), 조청 상민 수륙 무역 장정(청 상인 내륙 진출) → 청의 내정 간섭 강화']],
'강화도 조약':[['누가','조선(신헌) - 일본(구로다)'],['왜','운요호 사건(1875)을 구실로 일본이 군함을 끌고 와 개항 요구'],['무엇을','조선은 자주국(→ 청의 간섭 배제 노림), 부산·원산·인천 개항, 해안 측량권, 치외 법권(영사 재판권)'],['성격','최초의 근대적 조약이자 불평등 조약 · 부록과 무역 규칙으로 일본 화폐 사용, 양곡 무제한 유출, 무관세']],
'을사늑약':[['누가','이토 히로부미가 강요, 찬성한 대신 5명 = 을사오적(이완용·박제순·이지용·이근택·권중현)'],['왜','러일 전쟁에서 이긴 일본이 가쓰라·태프트 밀약, 제2차 영일 동맹, 포츠머스 조약으로 열강의 인정을 받음'],['무엇을','대한 제국의 외교권 박탈, 통감부 설치(초대 통감 이토 히로부미)'],['저항','장지연 「시일야방성대곡」, 민영환 자결, 헤이그 특사(1907), 을사의병(최익현·신돌석)']],
'척화비':[['누가','흥선 대원군'],['왜','병인양요(1866, 프랑스)와 신미양요(1871, 미국)를 물리친 뒤 서양과 수교하지 않겠다는 뜻을 널리 알리려고'],['내용','"洋夷侵犯 非戰則和 主和賣國" — 서양 오랑캐가 쳐들어오는데 싸우지 않으면 화친이요, 화친을 주장함은 나라를 파는 것'],['결과','통상 수교 거부 정책의 상징 · 대원군이 물러난 뒤 강화도 조약(1876)으로 개항, 임오군란 뒤 대부분 뽑혀 묻힘']],
'대동법':[['누가','광해군 때 이원익의 건의로 경기도부터(1608) → 숙종 때 전국(평안·함경 제외)'],['왜','공납(특산물)을 대신 내주고 비싸게 받아 내는 방납의 폐단'],['무엇을','특산물 대신 토지 1결당 쌀 12두(또는 베·동전)로 냄 → 땅 많은 사람이 많이 냄'],['결과','선혜청 설치, 관청에 물건을 대는 공인 등장 → 상품 화폐 경제 발달']],
'균역법':[['누가','영조(1750)'],['왜','군포 2필 부담이 무겁고 백골징포·황구첨정 같은 폐단'],['무엇을','군포 1필로 줄임 · 모자란 재정은 결작(토지 1결당 쌀 2두), 선무군관포, 어장세·염세·선박세로 보충']],
'과전법':[['누가','이성계·조준·정도전 등 신진 사대부(1391)'],['왜','권문세족의 대농장으로 나라 재정이 무너지고 신진 사대부에게 줄 땅이 없음'],['무엇을','경기 지역 토지의 수조권을 전·현직 관리에게 줌, 세습 원칙적 금지(수신전·휼양전 예외)'],['흐름','과전법 → 직전법(세조, 현직만) → 관수 관급제(성종) → 직전법 폐지(명종)']],
'전시과':[['누가','고려 경종(시정 전시과) → 목종(개정) → 문종(경정 전시과)'],['무엇을','관리에게 등급에 따라 곡물을 거두는 땅(전지)과 땔감을 얻는 땅(시지)의 수조권을 줌'],['흐름','시정(관품+인품) → 개정(관품만) → 경정(현직 관리만)']],
'독립 협회':[['누가','서재필(창립, 『독립신문』), 윤치호·이상재·남궁억'],['왜','아관 파천 뒤 열강의 이권 침탈과 러시아의 간섭'],['무엇을','자주 국권(독립문, 러시아 절영도 조차 요구 저지), 자유 민권, 자강 개혁(관민 공동회, 헌의 6조, 의회식 중추원 관제)'],['결과','보수 세력이 공화정 수립 모함 → 황국 협회 동원, 고종이 해산(1898)']],
'신간회':[['누가','민족주의 좌파(이상재·안재홍) + 사회주의 세력, 1927'],['왜','일제의 자치론 등장과 정우회 선언 — 함께 손잡자'],['무엇을','민족 단결, 정치·경제적 각성, 기회주의 배격 · 광주 학생 항일 운동 진상 조사단 파견'],['결과','민족 협동 전선 최대 조직 · 1931 해소']]};
{const gp=$('glpop');const rowsAuto=k=>{const e=EVENTS.find(x=>x.t===k||x.s===k)||EVENTS.find(x=>x.t.startsWith(k));if(!e)return [];const r=[['시기',(typeof yearLabel==='function'?yearLabel(e):e.y)+''],e.pp?['인물',e.pp]:null,e.vs?['대립',e.vs]:null,e.x?['내용',e.x]:null,(typeof STORY!=='undefined'&&STORY[e.t])?['배경 이야기',STORY[e.t]]:null];return r.filter(Boolean)};
 new MutationObserver(()=>{if(gp.hidden||gp.querySelector('.gdmore'))return;const dc=gp.querySelector('[data-dc]');if(!dc)return;const k=dc.dataset.dc;const R=DEEP[k]||rowsAuto(k);if(dc.textContent!=='사전에서 보기 →')dc.textContent='사전에서 보기 →';if(!R.length)return;
   dc.insertAdjacentHTML('beforebegin',`<button type="button" class="ppgo gdmore">더 자세히 ▾</button>`)}).observe(gp,{childList:true,subtree:true});
 gp.addEventListener('click',ev=>{const b=ev.target.closest('.gdmore');if(!b)return;ev.stopPropagation();ev.preventDefault();const dc=gp.querySelector('[data-dc]');const k=dc&&dc.dataset.dc;let d=gp.querySelector('.gdeep');if(d){d.remove();b.textContent='더 자세히 ▾';return}
   const R=DEEP[k]||rowsAuto(k);b.insertAdjacentHTML('beforebegin',`<div class="gdeep">${R.map(([a,t])=>`<div class="gdr" data-l="${esc(a)}"><i>${esc(a)}</i><span>${typeof glx==='function'?glx(t):esc(t)}</span></div>`).join('')}</div>`);b.textContent='접기 ▴';const r=gp.getBoundingClientRect();if(r.bottom>innerHeight-8)gp.style.top=Math.max(8,innerHeight-8-r.height)+'px'},true)}
/* 이전 버튼: 모든 화면에서 — 열린 창 먼저 닫고, 사전 낱말·구조도·지도 사건 이동도 되돌림 */
{const dcJump=k=>{showView('dc');try{dcShow();dcOnlyBk=false;dcFilter()}catch(_){}setTimeout(()=>{const c=$('dcbody').querySelector(`.gl2>div[data-k="${CSS.escape(k)}"]`);if(c){c.scrollIntoView({block:'center'});c.classList.remove('flash');void c.offsetWidth;c.classList.add('flash')}},120)};
 const ha=hApply;hApply=function(en){if(en.d||en.t||en.e!=null){hLock=true;try{if(en.d)dcJump(en.d);else if(en.t){$('kpage').hidden=true;showView('tr');openTree(en.t)}else{$('kpage').hidden=true;showView('map');const e=EVENTS.find(x=>x.id===en.e);if(e)selectEvent(e,{pan:!!e.ll})}}finally{hLock=false}hSync();return}return ha.apply(this,arguments)};
 document.addEventListener('click',ev=>{const b=ev.target.closest('[data-dc]');if(b&&!hLock)setTimeout(()=>{hPush({d:b.dataset.dc});const pv=HIST[hIdx-1];if(pv&&pv.v==='dc'){HIST.splice(hIdx-1,1);hIdx--;hSync()}},0)},true);
 const ot=openTree;openTree=function(k){const r=ot.apply(this,arguments);if(!hLock){hPush({t:k});}return r};
 const se=selectEvent;selectEvent=function(e,opt){const r=se.apply(this,arguments);try{if(e&&!$('v-map').hidden)hPush({e:e.id})}catch(_){}return r};
 const openPops=()=>['glpop','pppop','ovpop','trpop','setpop'].map(id=>$(id)).filter(p=>p&&!p.hidden);
 $('hback').onclick=()=>{const P=openPops();if(P.length){P.forEach(p=>{if(p.id==='setpop'&&typeof closeSet==='function')closeSet();else p.hidden=true});try{closeBubble(true)}catch(_){}hSync();return}if(!$('kpage').hidden&&hIdx<=0){$('kpage').hidden=true;return}if(hIdx>0){hIdx--;hApply(HIST[hIdx])}};
 const hs=hSync;hSync=function(){hs();$('hback').disabled=hIdx<=0&&!openPops().length&&$('kpage').hidden};
 document.addEventListener('click',()=>setTimeout(hSync,50),true)}
/* 사전: 낱말 칸을 누르면 인물 사전처럼 따로 창 — 뜻, 자세히, 배경 이야기, 관련 사건·인물·낱말·구조도 */
function openTerm(k){const p=$('kpage');const def=GLOSS[k]||'';
 const evs=EVENTS.filter(e=>e.tp[0]!=='wld'||e.t.includes(k)).filter(e=>e.t===k||e.s===k||e.t.includes(k)||(e.x||'').includes(k)).sort((a,b)=>a.T-b.T).slice(0,24);
 const main=EVENTS.find(e=>e.t===k||e.s===k)||evs.find(e=>e.t.includes(k));
 const rows=(typeof DEEP!=='undefined'&&DEEP[k])||(main?[main.pp?['인물',main.pp]:null,main.vs?['대립',main.vs]:null,main.x?['내용',main.x]:null].filter(Boolean):[]);
 const story=main&&typeof STORY!=='undefined'?STORY[main.t]:null;
 const pc=new Map();evs.forEach(e=>(e.pp||'').split(/,\s*/).forEach(x=>{x=(typeof pbase==='function'?pbase(x):x).trim();if(x.length>1)pc.set(x,(pc.get(x)||0)+1)}));const pps=[...pc.entries()].sort((a,b)=>b[1]-a[1]).slice(0,14).map(x=>x[0]);
 const txt=[def,...rows.map(r=>r[1]),story||'',...evs.slice(0,8).map(e=>e.x||'')].join(' ');const rel=Object.keys(GLOSS).filter(g=>g!==k&&g.length>1&&txt.includes(g)).sort((a,b)=>b.length-a.length).slice(0,16);
 const t0=evs.length?evs[0].T:null,t1=evs.length?evs[evs.length-1].T:null;const tk=typeof TREE_OF!=='undefined'?TREE_OF[k]:null;
 p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>용어 사전</span></div>
 <div class="kpin" style="--kc:var(--seal)">
  <div class="kph"><h1>${esc(k)}</h1><button class="hrt" type="button" data-kh="t|${esc(k)}" aria-pressed="${KHEARTS.has('t|'+k)}" aria-label="하트">${HEART_IC}</button></div>
  <div class="kpsub">${t0!=null?`<span>관련 시기 ${yrTxt(t0)}${t1>t0+.5?' ~ '+yrTxt(t1):''}</span>`:''}${main&&typeof eventKing==='function'&&eventKing(main)?`<span>${esc(eventKing(main).txt)}</span>`:''}</div>
  ${def?`<section><h3>뜻</h3><p class="kpd">${glx(def)}</p></section>`:''}
  ${rows.length?`<section><h3>자세히</h3><div class="tmrows">${rows.map(([a,t])=>`<div class="gdr" data-l="${esc(a)}"><i>${esc(a)}</i><span>${glx(t)}</span></div>`).join('')}</div></section>`:''}
  ${story?`<section><h3>배경 이야기</h3><p class="kpd">${glx(story)}</p></section>`:''}
  ${tk?`<section><h3>구조도</h3><button class="ppgo" data-tmtree="${esc(tk)}">구조도로 보기 →</button></section>`:''}
  ${evs.length?`<section><h3>관련 사건</h3><ul class="kpl">${evs.map(e=>`<li class="ev"><button data-kpe="${e.id}" style="--tc:var(--t-${e.tp[0]})"><em>${esc(shortYear(e))}</em>${e.treaty?'<i class="tseal">조</i>':''}${esc(e.t)}</button><p>${glx(e.x||'')}</p></li>`).join('')}</ul></section>`:''}
  ${pps.length?`<section><h3>관련 인물</h3><div class="kpp">${pps.map(x=>`<button class="pchip" data-person="${esc(x)}" data-pt="${t0}"><i>${esc([...x][0]||'')}</i>${esc(x)}</button>`).join('')}</div></section>`:''}
  ${rel.length?`<section><h3>관련 낱말</h3><div class="kpp">${rel.map(x=>`<button data-term="${esc(x)}"><i></i>${esc(x)}</button>`).join('')}</div></section>`:''}
 </div>`;
 p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true};try{if(!hLock)hPush({tm:k})}catch(_){}}
document.addEventListener('click',ev=>{const t=ev.target.closest('[data-term]');if(t){ev.preventDefault();ev.stopPropagation();try{if(!$('srch').hidden)closeSearch()}catch(_){}openTerm(t.dataset.term);return}
 const tt=ev.target.closest('[data-tmtree]');if(tt){$('kpage').hidden=true;showView('tr');openTree(tt.dataset.tmtree);return}
 const box=ev.target.closest('#dcbody .gl2>div[data-k]');if(!box||ev.target.closest('button,a,[data-gl],.hrt'))return;ev.preventDefault();ev.stopPropagation();if(box.classList.contains('gp')){openPerson(box.dataset.k);return}openTerm(box.dataset.k)},true);
{const ha=hApply;hApply=function(en){if(en.tm){hLock=true;try{openTerm(en.tm)}finally{hLock=false}hSync();return}return ha.apply(this,arguments)}}
DEEP['단군왕검']=[['무엇','사람 이름이 아니라 고조선 지배자의 칭호(직책)'],['단군','하늘에 제사를 지내는 제사장'],['왕검','나라를 다스리는 정치적 지배자'],['뜻','제사와 정치를 한 사람이 맡음 = 제정일치 사회'],['나오는 곳','『삼국유사』(일연), 『제왕운기』(이승휴), 『동국통감』 등']];
/* 태극기: 태극·괘가 깃발 천 밖으로 나오지 않게 — 조금 줄이고 천 모양으로 잘라 냄 */
{const NS='http://www.w3.org/2000/svg';const cp=el('clipPath',{id:'tgcloth'},$('defs'));el('path',{d:'M0.8,-25.5C5,-28.5,9.5,-22,15,-25.2V-14.8C9.5,-11.6,5,-18.1,0.8,-15.1Z'},cp);
 document.querySelectorAll('.pin.flagpin .tgk').forEach(t=>{if(t.querySelector(':scope>.tgin'))return;const g=document.createElementNS(NS,'g');g.setAttribute('class','tgin');g.setAttribute('transform','translate(7.9,-20.2) scale(.78) translate(-7.9,20.2)');while(t.firstChild)g.appendChild(t.firstChild);const w=document.createElementNS(NS,'g');w.setAttribute('clip-path','url(#tgcloth)');w.appendChild(g);t.appendChild(w)})}
/* 태극기도 펄럭이게: 천과 그림을 한 묶음으로 같이 흔듦 (그림이 천 밖으로 안 나감) */
document.querySelectorAll('.pin.flagpin .flg.tgflag').forEach(f=>{if(f.parentNode.classList.contains('tgwrap'))return;const t=f.parentNode.querySelector('.tgk');const w=document.createElementNS('http://www.w3.org/2000/svg','g');w.setAttribute('class','tgwrap');f.before(w);w.appendChild(f);if(t)w.appendChild(t)});

/* 비파형 동검 출토지 (청동기·고조선 장면) */
{const NS='http://www.w3.org/2000/svg',SITES=[[120.45,41.57,'조양 십이대영자'],[123.43,41.8,'선양 정가와자'],[121.62,38.98,'다롄 강상'],[125.55,39.35,'평양 부근'],[127.66,34.78,'여수 적량동']];
 const DG='<path class="bpb" d="M0,-15.5C1.7,-13.4,2.9,-11.6,2.3,-9.6C1.8,-8.2,3.4,-6.8,3,-5.1C2.6,-3.6,1,-2.9,0.6,-2.2H-0.6C-1,-2.9,-2.6,-3.6,-3,-5.1C-3.4,-6.8,-1.8,-8.2,-2.3,-9.6C-2.9,-11.6,-1.7,-13.4,0,-15.5Z"/><path class="bpr" d="M0,-14V-3"/><path class="bph" d="M-2.4,-2.2H2.4M0,-2.2V1.6"/>';
 const gs=SITES.map(([lo,la,nm],i)=>{const g=document.createElementNS(NS,'g');g.setAttribute('class','bpin');g.innerHTML=DG+(i===1?'<text class="bpt" x="5" y="-6">비파형 동검</text>':'')+`<title>비파형 동검 · ${nm}</title>`;G.pins.insertBefore(g,G.pins.firstChild);const o={g,x:X(lo),y:Y(la)};OV.push(o);return g});
 const sync=()=>{const on=pos.i===2;gs.forEach(g=>g.style.display=on?'':'none')};
 {const af=applyFrame;applyFrame=function(){const r=af.apply(this,arguments);sync();return r}}sync();placeOV()}
/* 고조선 장면은 밑깔개 없이 (서쪽 잃은 땅이 밑에 남지 않게) */
{const af=applyFrame;const sy=()=>{const b=G.terr.querySelector('.terrbase');if(b)b.style.display=pos.i===2?'none':''};applyFrame=function(){const r=af.apply(this,arguments);sy();return r};sy()}
/* 6·25 전쟁: 탱크·수류탄 아이콘 */
{const TK='<path class="tkt" d="M-10,-1.2Q-10.8,-4.2,-8,-4.6H8Q10.8,-4.2,10,-1.2Q9.2,0.6,7,0.6H-7Q-9.2,0.6,-10,-1.2Z"/><circle class="tkw" cx="-6" cy="-2" r="1.3"/><circle class="tkw" cx="-2" cy="-2" r="1.3"/><circle class="tkw" cx="2" cy="-2" r="1.3"/><circle class="tkw" cx="6" cy="-2" r="1.3"/><path class="tkb" d="M-7.6,-4.6L-6.4,-7.6H6.4L7.6,-4.6Z"/><path class="tkh" d="M-4,-7.6Q-3.6,-11.2,0,-11.2Q3.6,-11.2,4,-7.6Z"/><path class="tkg" d="M2.6,-9.6H13.2"/>';
 const GR='<path class="grb" d="M0,-12.6C4,-12.6,5.2,-9.2,5.2,-6.2C5.2,-2.4,3,0.6,0,0.6C-3,0.6,-5.2,-2.4,-5.2,-6.2C-5.2,-9.2,-4,-12.6,0,-12.6Z"/><path class="grl" d="M-5,-6.2H5M-4.2,-9.4H4.2M-4.2,-3H4.2M0,-12.4V0.4"/><path class="grc" d="M-2.2,-12.6V-14.8H2.2V-12.6Z"/><path class="grs" d="M2.2,-14.2Q6.8,-14.4,5.8,-9.4"/><circle class="grr" cx="-3.2" cy="-15.4" r="1.4"/>';
 const M={'6·25 전쟁 발발':TK,'서울 수복':TK,'평양 점령':TK,'1·4 후퇴':TK,'낙동강 방어선':GR,'중국군 참전':GR,'국군, 압록강 도달':TK};
 EVENTS.forEach(e=>{const s=M[e.t];if(!s||e.T<1950)return;const o=pinOf.get(e.id);if(!o)return;const gl=o.g.querySelector('.gl');if(!gl)return;gl.innerHTML=s;o.g.classList.add('stelepin','warpin')})}
/* 나만의 사론: "사신은 논한다," — 주인(나)만 쓰고, 다른 사람은 보기만 (claude.ai 공유 저장소) */
{let NT={},canW=false,DB=null;
 const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const hid=k=>[...new TextEncoder().encode(k)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,190);
 const inner=k=>{const v=NT[k];return v?`<span class="snh">사신은 논한다,</span> <span class="snv">${E(v).replace(/\n/g,'<br>')}</span>`:(canW?'<span class="sna">✎ 사신은 논한다…</span>':'')};
 const cls=k=>'snote'+(NT[k]?' has':'')+(canW?' mine':'');
 const html=k=>`<div class="${cls(k)}" data-sk="${E(k)}">${inner(k)}</div>`;
 const refresh=()=>document.querySelectorAll('.snote[data-sk]').forEach(b=>{if(b.querySelector('textarea'))return;const k=b.dataset.sk;b.className=cls(k);b.innerHTML=inner(k)});
 const put=async(k,v)=>{const old=NT[k];if(v)NT[k]=v;else delete NT[k];refresh();if(!DB)return;try{const r=DB.collection('sanon').doc(hid(k));if(v)await r.set({k,v,at:Date.now()});else await r.delete()}catch(_){if(old)NT[k]=old;else delete NT[k];refresh()}};
 const ed=box=>{if(!canW||box.querySelector('textarea'))return;const k=box.dataset.sk;box.classList.add('ed');box.innerHTML='<span class="snh">사신은 논한다,</span><textarea rows="2" placeholder="내 생각을 적어 보세요"></textarea>';const ta=box.querySelector('textarea');ta.value=NT[k]||'';const fit=()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px'};ta.addEventListener('input',fit);fit();ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length);
   let at=0;ta.addEventListener('input',()=>{clearTimeout(at);at=setTimeout(()=>{const v=ta.value.trim();if(v!==(NT[k]||'')){if(v)NT[k]=v;else delete NT[k];if(DB){const r=DB.collection('sanon').doc(hid(k));(v?r.set({k,v,at:Date.now()}):r.delete()).catch(()=>{})}}},700)});ta.addEventListener('blur',()=>{clearTimeout(at);const v=ta.value.trim();box.classList.remove('ed');ta.remove();if(v!==(NT[k]||''))put(k,v);else refresh()})};
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.snote.mine');if(!b||e.target.tagName==='TEXTAREA')return;e.stopPropagation();ed(b)},true);
 window.addEventListener('keydown',e=>{const t=e.target;if(!(t&&t.closest&&t.closest('.snote')))return;e.stopImmediatePropagation();if(e.key==='Escape'||(e.key==='Enter'&&!e.shiftKey&&!e.isComposing)){e.preventDefault();t.blur()}},true);
 ['keyup','keypress'].forEach(ev=>window.addEventListener(ev,e=>{const t=e.target;if(t&&t.closest&&t.closest('.snote'))e.stopImmediatePropagation()},true));
 const ev0=evDetailHTML;evDetailHTML=function(e){return ev0.apply(this,arguments)+html('e:'+(e.id!=null?e.id:e.t))};
 const kp=$('kpage');if(kp){const add=()=>{if(kp.querySelector('.snote'))return;const h=kp.querySelector('h2,h1,.kn,.ttl');const key=(h?h.textContent:'').trim();if(!key)return;const host=kp.querySelector('.kpin,.kbody,.pbody')||kp;host.insertAdjacentHTML('beforeend',html('k:'+key))};new MutationObserver(()=>{clearTimeout(add.t);add.t=setTimeout(add,30)}).observe(kp,{childList:true,subtree:false})}
 window.__sanonSet=n=>{NT=n||{};refresh()};window.__sanonAttach=(db,w)=>{canW=!!w;DB=w?db:null;refresh();try{db.collection('sanon').onSnapshot(q=>{const n={};q.docs.forEach(d=>{const x=d.data();if(x&&x.k&&x.v)n[x.k]=String(x.v)});NT=n;refresh()},()=>{})}catch(_){}};(async()=>{try{if(!window.claude||!claude.use)return;const [db,us]=await Promise.all([claude.use('db'),claude.use('user')]);canW=!!(us&&await us.isOwner());DB=canW?db:null;refresh();
   if(db)db.collection('sanon').onSnapshot(q=>{const n={};q.docs.forEach(d=>{const x=d.data();if(x&&x.k&&x.v)n[x.k]=String(x.v)});NT=n;refresh()},()=>{})}catch(_){}})()}
/* ↑↓: 지금 보이는 설명창 위아래로 움직이기 (Ctrl+방향키는 지도 이동 그대로) */
{let mx=-1,my=-1;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
 const canS=el=>{const cs=getComputedStyle(el);return (/(auto|scroll)/.test(cs.overflowY)||(el.classList&&el.classList.contains('hzbot')))&&el.scrollHeight>el.clientHeight+2};
 const vis=el=>{const r=el.getBoundingClientRect();const w=Math.min(r.right,innerWidth)-Math.max(r.left,0),h=Math.min(r.bottom,innerHeight)-Math.max(r.top,0);return w>20&&h>20?w*h:0};
 const pick=()=>{if(mx>=0){let e=document.elementFromPoint(mx,my);while(e&&e!==document.body){if(canS(e)&&vis(e))return e;e=e.parentElement}}
   let best=null,ba=0;document.querySelectorAll('#pbody,.pbody,.hzbot,#ovread,#ovscroll,#tlread,#kpage,.kbody,.ovside,[id$="read"],[class*="body"]').forEach(e=>{if(e.offsetParent===null||!canS(e))return;const a=vis(e);if(a>ba){ba=a;best=e}});return best};
 window.addEventListener('keydown',e=>{if(e.key!=='ArrowUp'&&e.key!=='ArrowDown')return;if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)return;const t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
   const el=pick();if(!el||el.classList.contains('hzbot'))return;e.preventDefault();e.stopImmediatePropagation();el.scrollBy({top:(e.key==='ArrowDown'?1:-1)*Math.max(60,el.clientHeight*.18),behavior:e.repeat?'auto':'smooth'})},true)}

/* 사전 인물 카드: '자세히 →' 바로 인물 화면으로 */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pdeep]');if(!b)return;e.preventDefault();e.stopPropagation();try{openPerson(b.dataset.pdeep)}catch(_){}},true);

/* 자세히 칸 이름 다듬기: 누가 → 주도 … */
{const LM={'누가':'주도','왜':'배경','무엇을':'내용','무엇':'정체','결과':'결과','흐름':'전개','일본과':'외세 관계','내용':'내용'};try{Object.values(DEEP).forEach(R=>{if(Array.isArray(R))R.forEach(r=>{if(r&&LM[r[0]])r[0]=LM[r[0]]})})}catch(_){}}
/* 연대표 설명창: 같은 나라 줄은 시대 경계를 넘어 같은 높이로 이어지게 (나라마다 고정 줄, 끝난 나라 자리는 다음 나라가 씀) */
function hzLink(){try{const secs=[...document.querySelectorAll('#ovscroll .hzall .hzbot')];if(secs.length<2)return;for(let k=1;k<secs.length;k++){const prev=new Set([...secs[k-1].querySelectorAll('.hzach>button[data-king]')].map(b=>b.dataset.king));secs[k].querySelectorAll('.hzach>button[data-king]').forEach(b=>{if(prev.has(b.dataset.king))b.parentElement.remove()})}
  const span={};(typeof REIGNS!=='undefined'?REIGNS:[]).forEach(D=>{const n=D.n==='남한'?'대한민국':D.n;const s0=Math.min(...D.r.map(r=>r.s)),e0=Math.max(...D.r.map(r=>r.e));span[n]=[s0,e0]});
  const LN={};{const ends=[];Object.entries(span).sort((a,b)=>a[1][0]-b[1][0]).forEach(([n,[s0,e0]])=>{let L=-1,be=-1e9;ends.forEach((v,i)=>{if(v<=s0+.5&&v>be){be=v;L=i}});if(L<0){L=ends.length;ends.push(0)}ends[L]=e0;LN[n]=L})}
  const SPLIT_L=LN['고려'];
  const S=secs.map((hb,si)=>{const pvG=si>0&&[...secs[si-1].querySelectorAll('.hzband>b')].some(b=>b.textContent==='고려');const kids=[...hb.children];const bands=kids.filter(e=>e.classList.contains('hzband')).map(e=>({e,n:(e.querySelector('b')||{}).textContent||'',t:parseFloat(e.style.top)||0,h:parseFloat(e.style.height)||0}));
    const blocks=bands.map(B=>({B,els:[B.e],d:0,L:(pvG&&SPLIT_L!=null&&LN[B.n]===SPLIT_L&&(span[B.n]||[0])[0]>=917)?-1:(LN[B.n]??99)}));const tail={els:[],d:0};let bot=0;
    kids.forEach(e=>{if(e.classList.contains('hzband')||e.classList.contains('hzsep'))return;const t=parseFloat(e.style.top);if(isNaN(t))return;const bl=blocks.find(x=>t>=x.B.t&&t<x.B.t+x.B.h);(bl||tail).els.push(e)});
    blocks.sort((p,q)=>(p.L-q.L)||((span[p.B.n]||[0])[0]-(span[q.B.n]||[0])[0]));const ext=bl=>{let A=1e9,Z=-1e9;bl.els.forEach(e=>{const l=parseFloat(e.style.left)||0,w=e.offsetWidth||parseFloat(e.style.width)||0;A=Math.min(A,l);Z=Math.max(Z,l+w)});return [A,Z]};let cur=6,lastL=null,lt=6,lb=6,lr=-1e9;blocks.forEach(bl=>{const [A,Z]=ext(bl);if(bl.L===lastL&&bl.L!==99&&A>=lr+8){bl.d=lt-bl.B.t;lb=Math.max(lb,lt+bl.B.h+6);cur=lb;lr=Math.max(lr,Z)}else{lt=cur;bl.d=cur-bl.B.t;lb=cur+bl.B.h+6;cur=lb;lr=Z}lastL=bl.L});const bandsEnd=bands.length?Math.max(...bands.map(B=>B.t+B.h))+6:6;tail.d=cur-bandsEnd;
    return {hb,blocks,tail}});
  const NOL=new Set();S.forEach((s,k)=>{if(k&&s.blocks.some(b=>b.B.n==='고려')&&S[k-1].blocks.some(b=>b.B.n==='고려')&&!S[k-1].blocks.some(b=>b.L===-1&&b.B.n==='고려')){NOL.add((k-1)+'|고려');NOL.add((k-1)+'|후백제')}});const top=(s,i)=>s.blocks[i].B.t+s.blocks[i].d;
  const push=(s,i,dy)=>{for(let j=i;j<s.blocks.length;j++)s.blocks[j].d+=dy;s.tail.d+=dy};
  for(let it=0;it<8;it++){let ch=0;for(let k=0;k+1<S.length;k++){const A=S[k],B=S[k+1];A.blocks.forEach((ba,i)=>{const j=B.blocks.findIndex(bb=>bb.B.n===ba.B.n);if(j<0)return;if(NOL.has(k+'|'+ba.B.n))return;const ta=top(A,i),tb=top(B,j);if(Math.abs(ta-tb)<.5)return;ch=1;if(ta<tb)push(A,i,tb-ta);else push(B,j,ta-tb)})}if(!ch)break}
  S.forEach((s,k)=>{const P=S[k-1],N=S[k+1];s.blocks.concat([s.tail]).forEach(bl=>{if(bl.d)bl.els.forEach(e=>{const t=parseFloat(e.style.top)||0;e.style.top=(t+bl.d)+'px'})});
    const W=s.hb.scrollWidth||s.hb.clientWidth;s.blocks.forEach(bl=>{const e=bl.B.e,n=bl.B.n,inP=P&&!NOL.has((k-1)+'|'+n)&&P.blocks.some(x=>x.B.n===n),inN=N&&!NOL.has(k+'|'+n)&&N.blocks.some(x=>x.B.n===n);let L=parseFloat(e.style.left)||0,Wd=parseFloat(e.style.width)||0;
      if(inP){Wd+=L;L=0;e.classList.add('cl')}if(inN){Wd=W-L;e.classList.add('cr')}e.style.left=L+'px';e.style.width=Wd+'px'})});
  S.forEach(s=>{const bl=s.blocks.map(b=>({e:b.B.e,t:parseFloat(b.B.e.style.top)})).sort((p,q)=>p.t-q.t);bl.forEach((b,i)=>{if(i+1<bl.length){const h=bl[i+1].t-6-b.t;if(h>parseFloat(b.e.style.height))b.e.style.height=h+'px'}})});
  S.forEach((s,k)=>{const P=S[k-1];const cont=P&&s.blocks.some(b=>P.blocks.some(x=>x.B.n===b.B.n));s.hb.classList.toggle('hzcont',!!cont);const sec=s.hb.closest('.hsec');if(sec)sec.classList.toggle('hzcont',!!cont)});
 }catch(_){}}
let hzSyncing=false;const hzBots=()=>[...document.querySelectorAll('#ovscroll .hzall .hzbot')];
function hzSetTop(y){hzY=y;hzSyncing=true;hzBots().forEach(h=>{if(Math.abs(h.scrollTop-y)>1)h.scrollTop=y});requestAnimationFrame(()=>{hzSyncing=false})}
function hzLift(){hzBots().forEach(hb=>{const R=e=>({a:e.offsetLeft,b:e.offsetLeft+e.offsetWidth,t:e.offsetTop,h:e.offsetHeight});const fixed=[...hb.querySelectorAll('.hzband,.hzach,.hzk')].map(R);const mov=[...hb.querySelectorAll('.hznt,.hzd')].sort((p,q)=>p.offsetTop-q.offsetTop);const placed=[];
  mov.forEach(e=>{const r=R(e);const hit=y=>fixed.concat(placed).some(p=>p.a<r.b+4&&r.a<p.b+4&&p.t<y+r.h+4&&y<p.t+p.h+4);const cs=[12,...fixed.concat(placed).map(p=>p.t+p.h+6)].filter(y=>y<=r.t).sort((p,q)=>p-q);const y=cs.find(y=>!hit(y));if(y!=null&&y<r.t){e.style.top=y+'px';r.t=y}placed.push(r)})})}
let hzY=0;function hzPad(){const b=hzBots();b.forEach(h=>{const p=h.querySelector('.hzpad');if(p)p.remove()});const H=Math.max(...b.map(h=>h.scrollHeight));b.forEach(h=>h.insertAdjacentHTML('beforeend',`<i class="hzpad" style="position:absolute;left:0;top:${H-1}px;width:1px;height:1px;pointer-events:none"></i>`))}
window.hzScrollBy=dy=>{const b=hzBots();if(!b.length)return false;const mx=Math.max(...b.map(h=>h.scrollHeight-h.clientHeight));hzY=Math.max(0,Math.min(mx,hzY+dy));hzSetTop(hzY);return true};
function hzTopScroll(){const sc=$('ovscroll');if(!sc)return;const cx=sc.getBoundingClientRect().left+sc.clientWidth*.35;const hb=hzBots().find(h=>{const r=h.getBoundingClientRect();return r.left<=cx&&r.right>cx});if(!hb)return;const ts=[...hb.querySelectorAll('.hzband')].map(b=>parseFloat(b.style.top)||0);hzSetTop(ts.length?Math.max(0,Math.min(...ts)-6):0)}
{const sc=$('ovscroll');if(sc){sc.addEventListener('wheel',e=>{const hb=e.target.closest&&e.target.closest('.hzall .hzbot');if(!hb||e.ctrlKey||Math.abs(e.deltaY)<Math.abs(e.deltaX)||e.shiftKey)return;e.preventDefault();hzScrollBy(e.deltaMode===1?e.deltaY*18:e.deltaY)},{passive:false});let ty=null;sc.addEventListener('touchstart',e=>{const hb=e.target.closest&&e.target.closest('.hzall .hzbot');ty=hb&&e.touches.length===1?{y:e.touches[0].clientY,x:e.touches[0].clientX,lock:null}:null},{passive:true});sc.addEventListener('touchmove',e=>{if(!ty)return;const t=e.touches[0],dy=ty.y-t.clientY,dx=ty.x-t.clientX;if(ty.lock==null&&(Math.abs(dy)>6||Math.abs(dx)>6))ty.lock=Math.abs(dy)>Math.abs(dx)?'y':'x';if(ty.lock==='y'){e.preventDefault();hzScrollBy(dy);ty.y=t.clientY;ty.x=t.clientX}},{passive:false});sc.addEventListener('touchend',()=>{ty=null},{passive:true});let lx=sc.scrollLeft,tm=0;sc.addEventListener('scroll',e=>{if(e.target!==sc)return;clearTimeout(tm);tm=setTimeout(()=>{if(Math.abs(sc.scrollLeft-lx)>300)hzTopScroll();lx=sc.scrollLeft},220)},{passive:true})}}
{const bc=buildCont;buildCont=function(){const r=bc.apply(this,arguments);if(ovDir!=='v'){hzLink();hzLift();hzPad();hzTopScroll();setTimeout(hzTopScroll,50)}return r}}
/* 자세히 화면 위쪽 ‹ › : 사전·인물·왕계표 순서대로 옆 항목으로 */
{let CUR=null,dep=0;const vis=id=>{const v=$(id);return v&&!v.hidden&&v.offsetParent!==null};
 const wrap=(name,mk)=>{const f=window[name];if(typeof f!=='function')return;window[name]=function(){const top=dep===0;dep++;try{if(top&&!CUR_LOCK)CUR=mk.apply(null,arguments)}catch(_){}try{return f.apply(this,arguments)}finally{dep--}}};
 let CUR_LOCK=false;
 const src=()=>vis('v-pp')?'pp':vis('v-dc')?'dc':null;
 wrap('openTerm',k=>({t:'term',k,src:'dc'}));
 wrap('openPerson',(n,T)=>({t:'person',k:n,T,src:src()||'dc'}));
 wrap('openKing',(dn,i)=>({t:'king',dn,i,src:src()==='pp'?'pp':'king'}));
 const dcList=()=>[...document.querySelectorAll('#dcbody [data-k]')].map(e=>({k:e.dataset.k,p:e.classList.contains('gp')}));
 const ppList=()=>{const s=new Set();return [...document.querySelectorAll('#ppbody [data-person]')].filter(b=>!s.has(b.dataset.person)&&s.add(b.dataset.person)).map(b=>({k:b.dataset.person,T:b.dataset.pt!=null?+b.dataset.pt:undefined}))};
 const go=dir=>{if(!CUR)return;CUR_LOCK=true;let next=null;try{
   if(CUR.t==='king'&&CUR.src==='king'){const D=DYN[CUR.dn];const j=CUR.i+dir;if(D&&D.r[j]){openKing(CUR.dn,j);next={...CUR,i:j}}}
   else if(CUR.src==='pp'){const L=ppList();const nm=CUR.t==='king'?(DYN[CUR.dn].r[CUR.i]||{}).name:CUR.k;let i=L.findIndex(x=>x.k===nm||x.k===CUR.k);if(i<0&&CUR.t==='king')i=L.findIndex(x=>nm&&nm.startsWith(x.k));const o=L[i+dir];if(o){next={t:'person',k:o.k,T:o.T,src:'pp'};openPerson(o.k,o.T)}}
   else{const L=dcList();const i=L.findIndex(x=>x.k===CUR.k);const o=L[i+dir];if(o){next={t:o.p?'person':'term',k:o.k,src:'dc'};o.p?openPerson(o.k):openTerm(o.k)}}
  }catch(_){}finally{CUR_LOCK=false}if(next)CUR=next};
 const kp=$('kpage');if(kp){const add=()=>{const bar=kp.querySelector('.kpbar');if(!bar||bar.querySelector('.kpnav'))return;bar.insertAdjacentHTML('beforeend','<span class="kpnav"><button type="button" class="ib" data-kpv="-1" aria-label="이전 항목"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><button type="button" class="ib" data-kpv="1" aria-label="다음 항목"><svg class="ic" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></span>')};
  new MutationObserver(add).observe(kp,{childList:true});add();
  kp.addEventListener('click',e=>{const b=e.target.closest('[data-kpv]');if(!b)return;e.preventDefault();e.stopPropagation();go(+b.dataset.kpv)},true)}}
/* 연대표 설명창 업적: 처음엔 한 줄, 누르면 펼침 */
document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('.hzach.fold');if(!c||e.target.closest('[data-king]')||e.target.closest('.gw'))return;e.stopPropagation();const op=!c.classList.contains('open');document.querySelectorAll('.hzach.open').forEach(x=>x.classList.remove('open'));if(op)c.classList.add('open')},true);

/* 잠깐 남의 땅이 된 곳: 551~553 한강 하류(백제), 642~660 대야성 일대(백제) — 볼록 다각형으로 잘라 그 나라 색으로 덮음 */
{const clipC=(d,poly)=>{const P0=poly.map(([lo,la])=>[X(lo),Y(la)]);let area=0;for(let i=0;i<P0.length;i++){const a=P0[i],b=P0[(i+1)%P0.length];area+=a[0]*b[1]-b[0]*a[1]}const sg=Math.sign(area);
   return d.split('Z').map(x=>x.trim()).filter(Boolean).map(x=>{let P=x.replace(/^M/,'').split('L').map(t=>t.split(',').map(Number));for(let e=0;e<P0.length&&P.length;e++){const A=P0[e],B=P0[(e+1)%P0.length],sd=p=>((B[0]-A[0])*(p[1]-A[1])-(B[1]-A[1])*(p[0]-A[0]))*sg,o=[];for(let i=0;i<P.length;i++){const p=P[i],q=P[(i+1)%P.length],sp=sd(p),sq=sd(q);if(sp>=0){o.push(p);if(sq<0){const u=sp/(sp-sq);o.push([p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u])}}else if(sq>=0){const u=sp/(sp-sq);o.push([p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u])}}P=o}return P.length>2?'M'+P.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z':''}).join('')};
 const sil=fr=>(FRAMES[fr].st.find(s=>s.id==='silla')||{}).d||'';
 const PT=[{fr:6,s:551,e:553,own:'baekje',ll:[126.95,37.5],d:clipC(window.__S6||sil(6),[[125.9,38.2],[127.35,38.2],[127.35,36.85],[125.9,36.85]])},
   {fr:7,s:642,e:660,own:'baekje',ll:[128.17,35.57],d:clipC(sil(7),[[127.25,36.05],[128.42,35.95],[128.5,35.4],[128.35,34.85],[127.25,34.85]])}].filter(p=>p.d);
 const NS='http://www.w3.org/2000/svg';PT.forEach(p=>{const e=document.createElementNS(NS,'path');e.setAttribute('d',p.d);e.setAttribute('class','terr tpatch');e.style.pointerEvents='none';e.style.display='none';G.terr.appendChild(e);p.el=e;p.on=null});
 const sync=(anim)=>{const t=curT();PT.forEach(p=>{const on=pos.i===p.fr&&t>=p.s-1e-6&&t<p.e-1e-6;if(on===p.on&&!anim)return;const was=p.on;p.on=on;const o=shapes.get(p.own);if(!on){p.el.style.display='none';return}if(G.terr.lastChild!==p.el)G.terr.appendChild(p.el);p.el.style.display='';const so=FRAMES[p.fr].st.find(x=>x.id===p.own);const f=(so&&so.c&&getComputedStyle(document.documentElement).getPropertyValue('--c-'+so.c).trim())||((o&&getComputedStyle(o.el).fill)||'');p.el.style.fill=f;p.el.style.stroke=f;
   if(was===false&&playing&&!reduceMotion){try{spreadFill({el:p.el,sp:null},f,p.ll)}catch(_){}}})};
 {const ut=updateTime;updateTime=function(){const r=ut.apply(this,arguments);sync(false);return r}}
 {const af=applyFrame;applyFrame=function(){const r=af.apply(this,arguments);PT.forEach(p=>p.on=null);sync(true);setTimeout(()=>sync(true),2200);return r}}sync(true)}
/* 땅 가르기: 영토·중국 색은 항상 땅 모양 클립으로(마스크 전환 없음 → 렉·깜빡임·네모 잘림 없음).
   한국 땅과 바깥 땅 사이 틈(압록강·두만강)은 메움 조각으로 채움 */
{const NS='http://www.w3.org/2000/svg',mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
 const P=d=>(d||'').split(/(?=M)/).map(s=>s.replace(/[MZ]/g,' ').trim().split(/[ L]+/).filter(Boolean).map(t=>t.split(',').map(Number)));
 let fd=LAND.seamFill||'';
 window.__fill=fd;
 /* 땅 색으로도 틈 메우기 */
 const lk=$('landk');if(lk&&fd)lk.after(mk('path',{class:'land',id:'landfill',d:fd}));
 /* 클립: 한국+바깥 땅+틈 메움+세계 땅 */
 const cp=$('landclip');if(cp){if(fd)mk('path',{d:fd},cp);
  if($('wl')&&$('outctx'))[-1,0,1].forEach(k=>{const u=mk('use',{href:'#wl','clip-path':'url(#outctx)'},cp);if(k)u.setAttribute('transform','translate('+(k*WW)+',0)')});
  cp.setAttribute('clip-rule','nonzero')}
 ['chn','terr'].forEach(id=>{const g=$(id);if(g){g.removeAttribute('mask');g.setAttribute('clip-path','url(#landclip)')}});
 /* 바깥 땅 해안선의 네모 테두리 자르기도 클립 대신 안쪽 그대로 */
}
/* 세계 지도: 나라끼리 국경선은 없애고 해안선만 (선 그린 층 위에 같은 땅을 선 없이 한 번 더 덮음) */
{const w=$('world'),wl=$('wl');if(w&&wl){const NS='http://www.w3.org/2000/svg';const g=document.createElementNS(NS,'g');g.id='world2';g.setAttribute('clip-path','url(#outctx)');
 const p=document.createElementNS(NS,'path');p.id='wl2';p.setAttribute('class','wland2');g.appendChild(p);
 [-1,1].forEach(k=>{const u=document.createElementNS(NS,'use');u.setAttribute('href','#wl2');u.setAttribute('transform','translate('+(k*WW)+',0)');g.appendChild(u)});
 w.after(g);const sync=()=>p.setAttribute('d',wl.getAttribute('d')||'');sync();new MutationObserver(sync).observe(wl,{attributes:true,attributeFilter:['d']});
 const st=document.createElement('style');st.textContent='.wland{stroke-width:2.2!important}.wland2{fill:var(--land);stroke:var(--land);stroke-width:.4;vector-effect:non-scaling-stroke}';document.head.appendChild(st)}}
/* ───────── 나만의 편집: 글씨 고치기(자동 저장)·별표·형광펜·태그 — 주인만 쓰고, 다른 사람은 보기만 ───────── */
{const ME={xg:new Map(),x:new Map(),xc:new Map(),s:new Set(),h:new Map(),g:new Map(),w:new Map(),q:new Map(),l:new Map(),c:new Map(),v:new Map()};let canW=false,DB=null,editOn=false;window.__ME=ME;
 const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const hid=k=>[...new TextEncoder().encode(k)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,190);
 const SEL='h1,h2,h3,h4,p,li,dd,dt,td,th,.kpd,.snv,.sri b,.sri span,.ppnames button,.kpp button,.gdr span,.evd b,.evd span,.evd div';
 const SKIP='svg,#map,.tbar,header,.topbar,#srq,textarea,input,.mtool,.snote,.mtags,#medit';
 /* 받은 자료 넣기 */
 const load=docs=>{const wOld=JSON.stringify([...ME.w]);ME.x.clear();ME.xg.clear();ME.xc.clear();ME.s.clear();ME.h.clear();ME.g.clear();ME.w.clear();ME.q.clear();ME.l.clear();ME.c.clear();ME.v.clear();docs.forEach(d=>{if(!d||!d.k)return;const t=d.k[0],key=d.k.slice(2);
   if(t==='x'&&d.v!=null){ME.x.set(key,String(d.v));if(d.c)ME.xc.set(key,d.c);const j=key.indexOf('\u0001');ME.xg.set(j>=0?key.slice(j+1):key,String(d.v))}else if(t==='s'&&d.v)ME.s.add(key);else if(t==='h'&&Array.isArray(d.v)&&d.v.length)ME.h.set(key,d.v.map(String));else if(t==='g'&&Array.isArray(d.v)&&d.v.length)ME.g.set(key,d.v.map(String));else if(t==='w'&&d.v)ME.w.set(key,String(d.v));else if(t==='q'&&d.v&&d.v.u)ME.q.set(key,d.v);else if(t==='l'&&Array.isArray(d.v)&&d.v.length)ME.l.set(key,d.v.map(String));else if(t==='c'&&Array.isArray(d.v)&&d.v.length)ME.c.set(key,d.v.filter(x=>x&&x.v));else if(t==='v'&&d.v&&d.v.t)ME.v.set(key,d.v)});syncEvents();if(JSON.stringify([...ME.w])!==wOld)applyWords();applyAll()};
 const save=(k,v,extra)=>{if(!DB)return;const r=DB.collection('mine').doc(hid(k));const empty=v==null||v===''||(Array.isArray(v)&&!v.length)||v===0;(empty?r.delete():r.set(Object.assign({k,v,at:Date.now()},extra||{}))).then(()=>toast('저장됨')).catch(()=>toast('저장 못 함'))};
 const toast=t=>{let b=$('mtoast');if(!b){b=document.createElement('div');b.id='mtoast';document.body.appendChild(b)}b.textContent=t;b.classList.add('on');clearTimeout(b.t);b.t=setTimeout(()=>b.classList.remove('on'),900)};
 /* 글씨 바꾸기 적용 */
 const applyText=root=>{if(!ME.x.size)return;{const w=document.createTreeWalker(root.nodeType===1?root:document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;if(!p)return 2;if(p.closest&&p.closest('svg'))return p.tagName==='text'||p.tagName==='tspan'?1:2;return (p.closest&&p.closest(SKIP))||p.isContentEditable?2:1}});const L=[];let n;while((n=w.nextNode())){const t=n.nodeValue.trim();if(t&&ME.xg.has(t))L.push([n,t])}
   L.forEach(([n,t])=>{const v=ME.xg.get(t);n.nodeValue=n.nodeValue.replace(t,v);const p=n.parentNode;if(p&&p.dataset&&!p.dataset.xo&&p.textContent.trim()===v){p.dataset.xo=t;p.classList.add('xed')}})}const list=root.matches&&root.matches(SEL)?[root,...root.querySelectorAll(SEL)]:[...root.querySelectorAll(SEL)];list.forEach(el=>{if(el.isContentEditable||el.closest(SKIP))return;const o=el.dataset.xo||el.textContent.trim();if(!o)return;const v=ME.xg.get(o);if(v==null)return;if(el.dataset.xo===o&&el.textContent===v)return;el.dataset.xo=o;el.textContent=v;el.classList.add('xed')})};
 /* 지금 열린 자세한 화면의 이름표 */
 const itemOf=el=>{const ev=el&&el.closest&&el.closest('.evd');if(ev){const s=ev.querySelector('.snote[data-sk^="e:"]');if(s)return s.dataset.sk}const kp=$('kpage');if(kp&&!kp.hidden&&kp.contains(el)){const h=kp.querySelector('h1');if(h)return 'k:'+(h.dataset.xo||h.textContent.trim())}return ''};
 /* 형광펜 적용 */
 const applyHL=(host,item)=>{host.querySelectorAll('mark.mhl').forEach(m=>m.replaceWith(...m.childNodes));host.normalize();const L=ME.h.get(item);if(!L)return;
   L.forEach(str=>{const w=document.createTreeWalker(host,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentNode.closest('.mtool,.mtags,.snote,mark,button.hrt')?2:1});let n;while((n=w.nextNode())){const i=n.nodeValue.indexOf(str);if(i<0)continue;const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+str.length);const m=document.createElement('mark');m.className='mhl';m.dataset.hl=str;r.surroundContents(m);break}})};
 /* 별표·형광펜·태그 막대 */
 const isW=()=>canW;
 const bar=item=>{const st=ME.s.has(item),tg=ME.g.get(item)||[];const lk=linksOf(item);const canW=isW()&&editOn;if(!canW&&!st&&!tg.length&&!lk.length)return '';const ev=item.startsWith('e:')?EVENTS.find(x=>x.id===+item.slice(2)):null;
   return `<div class="mtool" data-item="${E(item)}">${canW||st?`<button type="button" class="mstar${st?' on':''}" ${canW?'':'disabled'} aria-label="별표">${st?'★':'☆'}</button>`:''}${canW?'<button type="button" class="mhlb" aria-label="형광펜">🖍 형광펜</button>':''}${!canW&&tg.length?`<span class="mtagline">${tg.map(t=>`<a data-tagq="${E(t)}">#${E(t)}</a>`).join('')}</span>`:''}<span class="mtags">${canW?tg.map(t=>`<span class="mtag" data-tagq="${E(t)}">#${E(t)}<i data-rm="${E(t)}">×</i></span>`).join(''):''}${canW?'<button type="button" class="madd">+ 태그</button>':''}</span>${lk.length||canW?`<span class="mlinks">${lk.map(t=>`<button type="button" class="mlink" data-go="${E(t)}">🔗 ${E(nameOf(t))}${canW&&(ME.l.get(item)||[]).includes(t)?`<i data-unl="${E(t)}">×</i>`:''}</button>`).join('')}${canW?'<button type="button" class="mladd">+ 연결</button>':''}</span>`:''}${canW?'<button type="button" class="mcadd">+ 내용 추가</button>':''}${canW&&ev&&ev.mid?'<button type="button" class="meved">✎ 사건 고치기</button>':''}</div>`};
 const decorate=()=>{if(document.activeElement&&document.activeElement.classList.contains('mtagin'))return;const kp=$('kpage');if(kp&&!kp.hidden){const h=kp.querySelector('.kph');const item=itemOf(h||kp);if(h&&item){const old=kp.querySelector('.mtool');const html=bar(item);if(old)old.outerHTML=html||'';else if(html)h.insertAdjacentHTML('afterend',html);const host=kp.querySelector('.kpin');if(host){secs(host,item);applyHL(host,item)}}}
   document.querySelectorAll('.evd').forEach(ev=>{const item=itemOf(ev);if(!item)return;const old=ev.querySelector('.mtool');const html=bar(item);if(old)old.outerHTML=html||'';else if(html){let t=ev.querySelector('h2,h3,.ttl,b')||ev.firstElementChild;while(t&&t.parentElement&&t.parentElement!==ev)t=t.parentElement;if(t)t.insertAdjacentHTML('afterend',html)}secs(ev,item);applyHL(ev,item)})};
 const applyAll=()=>{applyText(document.body);decorate()};
 let mq=[],mt=0;new MutationObserver(ms=>{if(busy)return;ms.forEach(m=>{if(m.target.closest&&m.target.closest('.mtool'))return;m.addedNodes.forEach(n=>{if(n.nodeType===1&&!n.classList.contains('mtool')&&!n.classList.contains('mtagin'))mq.push(n)})});if(!mq.length)return;clearTimeout(mt);mt=setTimeout(()=>{busy=true;try{const q=mq;mq=[];q.forEach(n=>{if(n.isConnected)applyText(n)});if(q.some(n=>n.isConnected&&(n.closest('#kpage')||n.querySelector&&n.querySelector('.evd')||n.closest('.evd'))))decorate()}finally{setTimeout(()=>busy=false,0)}},60)}).observe(document.body,{childList:true,subtree:true});let busy=false;
 /* 주인: 고치기 모드 단추 */
 const mkBtn=()=>{if($('medit'))return;const b=document.createElement('button');b.id='medit';b.type='button';b.className='tib';b.setAttribute('aria-label','글씨 고치기 (나만)');b.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>';
   const hb=$('heartbtn');if(hb)hb.before(b);else document.body.appendChild(b);
   b.onclick=()=>{editOn=!editOn;document.body.classList.toggle('medit',editOn);fBtn();try{decorate()}catch(_){}b.setAttribute('aria-pressed',editOn);toast(editOn?'고치기 모드: 글씨를 눌러 고치세요':'고치기 끝')}};
 document.addEventListener('click',e=>{if(!editOn||!canW)return;const t=e.target;if(t.closest(SKIP)||t.closest('.mtool,.mform,#mhlfloat,.msec .mced,#mwform,#mwadd,mark.mhl'))return;{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim())return}const el=t.closest(SEL);if(!el||el.isContentEditable)return;e.preventDefault();e.stopPropagation();
   const o=el.dataset.xo||el.textContent.trim();if(!o)return;el.dataset.xo=o;const ctx=itemOf(el);const xk=o;el.textContent=ME.x.get(xk)||ME.xg.get(o)||el.textContent;el.contentEditable='plaintext-only';el.classList.add('xing');el.focus();
   let tm=0;const commit=()=>{const v=el.textContent.trim();if(v===o||!v){if(ME.x.has(xk)){ME.x.delete(xk);save('x:'+xk,'')}}else if(v!==ME.x.get(xk)){ME.x.set(xk,v);save('x:'+xk,v)}};
   el.oninput=()=>{clearTimeout(tm);tm=setTimeout(commit,700)};el.onblur=()=>{clearTimeout(tm);commit();el.contentEditable='false';el.removeAttribute('contenteditable');el.classList.remove('xing');if(!ME.x.has(xk)){el.textContent=o}};
   el.onkeydown=k=>{k.stopPropagation();if(k.key==='Escape'||(k.key==='Enter'&&!k.shiftKey&&!k.isComposing)){k.preventDefault();el.blur()}}},true);
 /* 낱말 추가 (고치기 모드에서만) */
 const BASE=new Set(Object.keys(GLOSS));
 function applyWords(){Object.keys(GLOSS).forEach(k=>{if(!BASE.has(k))delete GLOSS[k]});ME.w.forEach((v,k)=>{if(!BASE.has(k))GLOSS[k]=v});
   try{GLRE=new RegExp('('+Object.keys(GLOSS).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g');GLRE_SET()}catch(_){}
   const b=$('dcbody');if(b&&b.dataset.built){const nb=b.cloneNode(false);delete nb.dataset.built;b.replaceWith(nb);const j=$('dcjump');if(j){const nj=j.cloneNode(false);j.replaceWith(nj)}if(!$('v-dc')||!$('v-dc').hidden)try{dcShow()}catch(_){}}}
 const wBtn=()=>{let b=$('mwadd');if(!editOn){if(b)b.hidden=true;return}if(!b){b=document.createElement('button');b.id='mwadd';b.type='button';b.textContent='+ 낱말 추가';document.body.appendChild(b);b.onclick=wForm}b.hidden=false};
 const wForm=()=>{if($('mwform'))return;const f=document.createElement('div');f.id='mwform';f.innerHTML='<b>낱말 추가</b><input id="mwk" placeholder="낱말 (예: 녹읍)"><textarea id="mwv" rows="3" placeholder="뜻"></textarea><div><button type="button" data-a="ok">저장</button><button type="button" data-a="x">닫기</button></div><small>이미 있는 낱말을 적으면 고치기 · 뜻을 비우면 지우기</small>';document.body.appendChild(f);
   const k=f.querySelector('#mwk'),v=f.querySelector('#mwv');k.focus();k.addEventListener('input',()=>{const w=k.value.trim();if(ME.w.has(w))v.value=ME.w.get(w)});
   f.addEventListener('keydown',e=>e.stopPropagation(),true);
   f.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(!a)return;e.stopPropagation();if(a==='x'){f.remove();return}
     const w=k.value.trim(),m=v.value.trim();if(!w){k.focus();return}if(BASE.has(w)){toast('원래 있는 낱말이에요 — 뜻 글씨를 눌러 고치세요');return}
     if(m)ME.w.set(w,m);else ME.w.delete(w);save('w:'+w,m);applyWords();f.remove();toast(m?'낱말 추가됨':'낱말 지움')},true)};
 /* 연결: 내가 이어 둔 것 + 거꾸로 이어진 것 */
 function linksOf(item){const out=new Set(ME.l.get(item)||[]);ME.l.forEach((L,k)=>{if(L.includes(item))out.add(k)});out.delete(item);return [...out]}
 /* 내가 추가한 내용 칸 */
 function secs(host,item){host.querySelectorAll(':scope>.msec,:scope .msec').forEach(n=>n.remove());const L=ME.c.get(item)||[];if(!L.length)return;const at=host.querySelector('.snote');
   const MC={'배경':'#b45309','주변 인물':'#047857','과정':'#1d4ed8','결과':'#be185d','의의':'#7c3aed','메모':'#475569'};const PAL=['#0e7490','#c2410c','#4d7c0f','#9f1239','#4338ca','#a16207'];const col=h=>MC[h]||(typeof SEC_COL!=='undefined'&&SEC_COL[h])||PAL[[...String(h)].reduce((a,c)=>a+c.charCodeAt(0),0)%PAL.length];
   const html=L.map((c,i)=>`<section class="msec kpsec" style="--sc:${col(c.h||'메모')}"><h3>${E(c.h||'메모')}${canW&&editOn?`<span class="mced"><i data-ced="${i}">✎</i><i data-cdel="${i}">×</i></span>`:''}</h3><p class="kpd">${glx(c.v)}</p></section>`).join('');
   if(at)at.insertAdjacentHTML('beforebegin',html);else host.insertAdjacentHTML('beforeend',html)}
 /* 고르기 창 (연결 대상) */
 const CANDS=()=>{const a=[];EVENTS.forEach(e=>a.push({k:'e:'+e.id,n:e.t,s:shortYear(e)+' 사건'}));if(typeof PEOPLE!=='undefined')PEOPLE.forEach(P=>a.push({k:'k:'+P.n,n:P.n,s:'인물'}));Object.keys(GLOSS).forEach(g=>a.push({k:'k:'+g,n:g,s:'낱말'}));return a};
 const picker=(anchorEl,onPick)=>{const box=document.createElement('div');box.className='mpick';box.innerHTML='<input placeholder="이을 사건·인물·낱말 찾기"><div class="mpl"></div>';anchorEl.after(box);const i=box.querySelector('input'),l=box.querySelector('.mpl');const all=CANDS();
   const run=()=>{const q=i.value.trim();if(!q){l.innerHTML='';return}const hits=all.filter(c=>c.n.includes(q)).sort((a,b)=>(a.n.indexOf(q)-b.n.indexOf(q))||a.n.length-b.n.length).slice(0,10);l.innerHTML=hits.map(c=>`<button type="button" data-pk="${E(c.k)}"><b>${E(c.n)}</b><span>${E(c.s)}</span></button>`).join('')||'<span class="mpn">없어요</span>'};
   i.addEventListener('input',run);i.focus();box.addEventListener('mousedown',e=>{if(e.target.closest('[data-pk]'))e.preventDefault()});
   box.addEventListener('click',e=>{const b=e.target.closest('[data-pk]');if(!b)return;e.stopPropagation();box.remove();onPick(b.dataset.pk)},true);
   i.onkeydown=k=>{if(k.key==='Escape'){box.remove()}else if(k.key==='Enter'&&!k.isComposing){const f=l.querySelector('[data-pk]');if(f){box.remove();onPick(f.dataset.pk)}}};i.onblur=()=>setTimeout(()=>box.isConnected&&box.remove(),150)};
 /* 내용 추가 창 */
 const cForm=(item,idx)=>{if($('mcform'))$('mcform').remove();const L=ME.c.get(item)||[];const cur=idx!=null?L[idx]:{h:'배경',v:''};const f=document.createElement('div');f.id='mcform';f.className='mform';
   f.innerHTML=`<b>내용 ${idx!=null?'고치기':'추가'}</b><div class="mchips">${['배경','주변 인물','과정','결과','의의','메모'].map(h=>`<button type="button" data-ch="${h}">${h}</button>`).join('')}</div><input id="mch" placeholder="제목" value="${E(cur.h)}"><textarea id="mcv" rows="5" placeholder="내용">${E(cur.v)}</textarea><div><button type="button" data-a="ok">저장</button><button type="button" data-a="x">닫기</button></div>`;document.body.appendChild(f);f.querySelector('#mcv').focus();
   f.addEventListener('click',e=>{const h=e.target.dataset&&e.target.dataset.ch;if(h){f.querySelector('#mch').value=h;return}const a=e.target.dataset&&e.target.dataset.a;if(!a)return;e.stopPropagation();if(a==='x'){f.remove();return}
     const hh=f.querySelector('#mch').value.trim()||'메모',vv=f.querySelector('#mcv').value.trim();const N=(ME.c.get(item)||[]).slice();if(idx!=null){if(vv)N[idx]={h:hh,v:vv};else N.splice(idx,1)}else if(vv)N.push({h:hh,v:vv});N.length?ME.c.set(item,N):ME.c.delete(item);save('c:'+item,N);f.remove();decorate()},true)};
 /* 사건 추가·고치기 */
 const invLL=(sx,sy)=>{const s=$('map'),P=s.createSVGPoint();P.x=sx;P.y=sy;const q=P.matrixTransform(s.getScreenCTM().inverse());const inv=(F,v,a,b)=>{const up=F(b)>F(a);for(let n=0;n<50;n++){const m=(a+b)/2;((F(m)<v)===up)?a=m:b=m}return (a+b)/2};return [+inv(X,q.x,60,200).toFixed(3),+inv(Y,q.y,-10,80).toFixed(3)]};
 const vForm=mid=>{if($('mvform'))$('mvform').remove();const cur=mid?ME.v.get(mid):{y:'',t:'',x:'',p:'',tp:['pol']};const f=document.createElement('div');f.id='mvform';f.className='mform';
   f.innerHTML=`<b>사건 ${mid?'고치기':'추가'}</b><div class="mrow"><input id="mvy" type="number" placeholder="연도 (기원전은 -)" value="${cur.y??''}"><input id="mvm" type="number" min="1" max="12" placeholder="월" value="${cur.m??''}"></div><input id="mvt" placeholder="사건 이름" value="${E(cur.t||'')}"><select id="mvtp">${TOPICS.map(t=>`<option value="${t.k}"${(cur.tp||[])[0]===t.k?' selected':''}>${t.n}</option>`).join('')}</select><textarea id="mvx" rows="3" placeholder="내용">${E(cur.x||'')}</textarea><input id="mvpp" placeholder="인물 (쉼표로)" value="${E(cur.pp||'')}"><div class="mrow"><input id="mvp" placeholder="장소 이름" value="${E(cur.p||'')}"><button type="button" data-a="pick">📍 지도에서</button></div><small id="mvll">${cur.ll?'위치: '+cur.ll.join(', '):'위치 없음 (지도에 핀 없이 목록에만)'}</small><div><button type="button" data-a="ok">저장</button>${mid?'<button type="button" data-a="del">지우기</button>':''}<button type="button" data-a="x">닫기</button></div><small>저장하면 지도·연표·애니메이션에 넣으려고 화면을 한 번 새로 고쳐요</small>`;
   document.body.appendChild(f);let ll=cur.ll||null;
   f.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(!a)return;e.stopPropagation();if(a==='x'){f.remove();return}
     if(a==='pick'){f.classList.add('picking');showView('map');toast('지도에서 위치를 누르세요');const h=ev=>{if(!ev.target.closest('#map'))return;ev.preventDefault();ev.stopPropagation();document.removeEventListener('click',h,true);ll=invLL(ev.clientX,ev.clientY);f.querySelector('#mvll').textContent='위치: '+ll.join(', ');f.classList.remove('picking')};setTimeout(()=>document.addEventListener('click',h,true),50);return}
     if(a==='del'){save('v:'+mid,'');ME.v.delete(mid);f.remove();syncEvents(true);return}
     const y=parseFloat(f.querySelector('#mvy').value),t=f.querySelector('#mvt').value.trim();if(isNaN(y)||!t){toast('연도와 사건 이름을 적어 주세요');return}
     const m=parseInt(f.querySelector('#mvm').value);const v={y,t,tp:[f.querySelector('#mvtp').value],x:f.querySelector('#mvx').value.trim()||t};if(m>=1&&m<=12)v.m=m;const pp=f.querySelector('#mvpp').value.trim();if(pp)v.pp=pp;const p=f.querySelector('#mvp').value.trim();if(p)v.p=p;if(ll)v.ll=ll;
     const id=mid||Date.now().toString(36);ME.v.set(id,v);save('v:'+id,v);f.remove();syncEvents(true)},true);
   f.addEventListener('keydown',e=>e.stopPropagation(),true)};
 function syncEvents(now){const list=[...ME.v.entries()].sort((a,b)=>a[0]<b[0]?-1:1).map(([id,v])=>Object.assign({mid:id},v));const sig=JSON.stringify(list);if(sig===(window.__MYEV_SIG||'[]'))return;
   try{localStorage.setItem('hgs_myev',sig)}catch(_){toast('새로 고치면 사건이 보여요');return}
   let rl='';try{rl=sessionStorage.getItem('hgs_rl')||''}catch(_){}if(rl===sig&&!now)return;try{sessionStorage.setItem('hgs_rl',sig)}catch(_){}
   toast('사건을 지도에 넣는 중…');setTimeout(()=>location.reload(),now?900:300)}
 /* 떠 있는 추가 단추: 사전 화면이면 낱말, 지도·연표면 사건 */
 const fBtn=()=>{let b=$('mwadd');const v=['dc','map','tl'].find(k=>{const e=$('v-'+k);return e&&!e.hidden});const kpOpen=$('kpage')&&!$('kpage').hidden;if(!editOn||!v||kpOpen){if(b)b.hidden=true;return}
   if(!b){b=document.createElement('button');b.id='mwadd';b.type='button';document.body.appendChild(b);b.onclick=()=>{b.dataset.k==='dc'?wForm():vForm()}}b.dataset.k=v==='dc'?'dc':'ev';b.textContent=v==='dc'?'+ 낱말 추가':'+ 사건 추가';b.hidden=false};
 setInterval(()=>{if(editOn)fBtn()},400);
 /* 연필 모드에서 드래그하면 바로 형광펜 */
 document.addEventListener('mouseup',e=>{if(!editOn||!canW)return;setTimeout(()=>{const sel=getSelection();const str=sel&&String(sel).trim();let b=$('mhlfloat');if(!str||str.length>300||!sel.rangeCount){if(b)b.remove();return}const host=sel.getRangeAt(0).commonAncestorContainer;const el=host.nodeType===1?host:host.parentNode;const item=itemOf(el);if(!item){if(b)b.remove();return}
   if(!b){b=document.createElement('button');b.id='mhlfloat';b.type='button';b.textContent='🖍 칠하기';document.body.appendChild(b)}const r=sel.getRangeAt(0).getBoundingClientRect();b.style.left=Math.min(innerWidth-90,r.right+4)+'px';b.style.top=Math.max(8,r.top-34)+'px';
   b.onmousedown=ev=>ev.preventDefault();b.onclick=ev=>{ev.stopPropagation();const L=ME.h.get(item)||[];if(!L.includes(str))L.push(str);ME.h.set(item,L);getSelection().removeAllRanges();b.remove();save('h:'+item,L);decorate()}},10)},true);
 /* 글 쓰는 중에는 단축키가 안 먹게 (태그 칸·낱말 추가 창·고치는 글씨) */
 ['keydown','keyup','keypress'].forEach(tp=>window.addEventListener(tp,e=>{const t=e.target;if(!(t&&t.closest&&(t.closest('.mtool,#mwform')||t.classList.contains('xing'))))return;e.stopImmediatePropagation();if(tp==='keydown'&&typeof t.onkeydown==='function')t.onkeydown(e)},true));
 /* 별표·형광펜·태그 누르기 */
 document.addEventListener('mousedown',e=>{if(e.target.closest&&e.target.closest('.mhlb'))e.preventDefault()},true);
 document.addEventListener('click',e=>{const tb=e.target.closest&&e.target.closest('.mtool');const mk=e.target.closest&&e.target.closest('mark.mhl');
   if(mk&&canW&&editOn){const item=itemOf(mk);const L=(ME.h.get(item)||[]).filter(x=>x!==mk.dataset.hl);L.length?ME.h.set(item,L):ME.h.delete(item);save('h:'+item,L);decorate();e.stopPropagation();return}
   if(!tb||!canW||e.target.closest('.mpick'))return;e.stopPropagation();const item=tb.dataset.item;
   if(e.target.closest('.mstar')){ME.s.has(item)?ME.s.delete(item):ME.s.add(item);save('s:'+item,ME.s.has(item)?1:0);decorate();return}
   if(e.target.closest('.mhlb')){const sel=getSelection();const str=sel&&String(sel).trim();if(!str||str.length>300){toast('먼저 칠할 글씨를 드래그해서 고르세요');return}const L=ME.h.get(item)||[];if(!L.includes(str))L.push(str);ME.h.set(item,L);sel.removeAllRanges();save('h:'+item,L);decorate();return}
   const rm=e.target.closest('[data-rm]');if(rm){const L=(ME.g.get(item)||[]).filter(x=>x!==rm.dataset.rm);L.length?ME.g.set(item,L):ME.g.delete(item);save('g:'+item,L);decorate();return}
   const un=e.target.closest('[data-unl]');if(un){const L=(ME.l.get(item)||[]).filter(x=>x!==un.dataset.unl);L.length?ME.l.set(item,L):ME.l.delete(item);save('l:'+item,L);decorate();return}
   if(e.target.closest('.mladd')){picker(e.target.closest('.mladd'),k=>{const L=ME.l.get(item)||[];if(!L.includes(k)&&k!==item)L.push(k);ME.l.set(item,L);save('l:'+item,L);decorate()});return}
   if(e.target.closest('.mcadd')){cForm(item);return}
   if(e.target.closest('.meved')){const ev=EVENTS.find(x=>x.id===+item.slice(2));if(ev&&ev.mid)vForm(ev.mid);return}
   if(e.target.closest('.madd')){const b=e.target.closest('.madd');const i=document.createElement('input');i.className='mtagin';i.placeholder='태그';b.replaceWith(i);i.focus();
     const done=ok=>{const v=i.value.replace(/^#/,'').trim();if(ok&&v){const L=ME.g.get(item)||[];if(!L.includes(v))L.push(v);ME.g.set(item,L);save('g:'+item,L)}i.onblur=null;i.blur();decorate()};
     i.onkeydown=k=>{k.stopPropagation();if(k.key==='Enter'&&!k.isComposing){k.preventDefault();done(true)}else if(k.key==='Escape')done(false)};i.onblur=()=>done(true)}},true);
 document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('.mlink[data-go]');if(!g||e.target.closest('[data-unl]'))return;e.preventDefault();e.stopPropagation();openItem(g.dataset.go)},true);
 document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('[data-ced],[data-cdel]');if(!c||!canW)return;e.preventDefault();e.stopPropagation();const item=itemOf(c);if(!item)return;if(c.dataset.ced!=null)cForm(item,+c.dataset.ced);else{const N=(ME.c.get(item)||[]).slice();N.splice(+c.dataset.cdel,1);N.length?ME.c.set(item,N):ME.c.delete(item);save('c:'+item,N);decorate()}},true);
 /* 태그 모아 보기: 같은 태그 붙은 것들 + 낱말이면 뜻을 맨 위에 */
 const tagPage=tag=>{const p=$('kpage');const items=[...ME.g.entries()].filter(([it,L])=>L.includes(tag)).map(([it])=>it);const def=GLOSS[tag];
   p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>태그</span></div><div class="kpin tgpage"><div class="kph"><h1>#${E(tag)}</h1></div>
   ${def?`<div class="tgdef"><h3>뜻</h3><p class="kpd">${glx(def)}</p>${GLOSS[tag]?`<button type="button" class="ppgo" data-term="${E(tag)}">낱말 사전에서 보기 →</button>`:''}</div>`:''}
   <div class="tglist">${items.map(it=>{const ev=it.startsWith('e:')?EVENTS.find(x=>String(x.id)===it.slice(2)):null;return `<button type="button" data-go="${E(it)}" class="mlink"><b>${E(nameOf(it))}</b><span>${ev?E(shortYear(ev))+' 사건':(typeof PEOPLE!=='undefined'&&PEOPLE.has(it.slice(2))?'인물':'낱말')}</span></button>`}).join('')||'<p class="kpd">아직 이 태그가 붙은 것이 없어요.</p>'}</div></div>`;
   p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true}};
 document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-tagq]');if(!t||e.target.closest('[data-rm]'))return;e.preventDefault();e.stopPropagation();try{closeTree()}catch(_){}tagPage(t.dataset.tagq)},true);
 /* ☰ 메뉴: 화면 바로 가기 + 내가 넣는 바로가기 */
 {const sb=$('setbtn');if(sb&&!$('menubtn')){const b=document.createElement('button');b.id='menubtn';b.type='button';b.className='tib';b.setAttribute('aria-label','메뉴');b.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';sb.after(b);
   const m=document.createElement('div');m.id='menupop';m.hidden=true;document.body.appendChild(m);
   const VS=[['map','지도'],['tl','연표'],['ov','연대표'],['tr','구조도'],['kg','왕계표'],['pp','인물'],['dc','사전'],['rl','문화유산']];
   const render=()=>{const Q=[...ME.q.entries()].sort((a,b)=>(a[1].at||0)-(b[1].at||0));
     m.innerHTML=`<div class="mnh">화면</div><div class="mnv">${VS.map(([v,n])=>`<button type="button" data-mv="${v}">${n}</button>`).join('')}</div>
     <div class="mnh">바로가기</div><div class="mnq">${Q.map(([k,q])=>`<a href="${E(q.u)}" target="_blank" rel="noopener">${E(q.n||q.u)}${canW?`<i data-qdel="${E(k)}">×</i>`:''}</a>`).join('')||'<span class="mnempty">아직 없어요</span>'}</div>
     ${canW?'<div class="mnadd"><input id="mqn" placeholder="이름"><input id="mqu" placeholder="주소 (https://…)"><button type="button" data-qadd>추가</button></div>':''}`};
   b.onclick=e=>{e.stopPropagation();if(!m.hidden){m.hidden=true;return}render();const tb=document.querySelector('.top').getBoundingClientRect();m.style.setProperty('--mtop',tb.bottom+'px');const cur=store.get('view','map');m.querySelectorAll('[data-mv]').forEach(x=>x.classList.toggle('on',x.dataset.mv===cur));m.hidden=false};
   document.addEventListener('click',e=>{if(!m.hidden&&e.target.isConnected&&!e.target.closest('#menupop,#menubtn'))m.hidden=true});
   m.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'&&!e.isComposing&&e.target.closest('.mnadd'))m.querySelector('[data-qadd]').click()},true);
   m.addEventListener('click',e=>{const v=e.target.closest('[data-mv]');if(v){m.hidden=true;$('kpage').hidden=true;showView(v.dataset.mv);return}
     const d=e.target.closest('[data-qdel]');if(d){e.preventDefault();e.stopPropagation();const k=d.dataset.qdel;ME.q.delete(k);save('q:'+k,'');render();return}
     if(e.target.closest('[data-qadd]')){const n=m.querySelector('#mqn').value.trim();let u=m.querySelector('#mqu').value.trim();if(!u){m.querySelector('#mqu').focus();return}if(!/^https?:\/\//.test(u))u='https://'+u;const id=Date.now().toString(36);const v={n:n||u,u,at:Date.now()};ME.q.set(id,v);save('q:'+id,v);render()}})}}
 /* 검색: 내가 고친 글씨·태그·별표도 찾기 */
 const openItem=it=>{try{if(!$('srch').hidden)closeSearch()}catch(_){}if(it.startsWith('e:')){const e=EVENTS.find(x=>String(x.id)===it.slice(2));if(!e)return;const p=$('trpop');p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button></div></div>`;p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();$('kpage').hidden=true;gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();$('kpage').hidden=true;gotoTimeline(e)};return}if(it.startsWith('k:')){const n=it.slice(2);if(GLOSS[n])openTerm(n);else if(typeof PEOPLE!=='undefined'&&PEOPLE.has(n))openPerson(n);else openTerm(n)}};
 const nameOf=it=>{if(it.startsWith('e:')){const e=EVENTS.find(x=>String(x.id)===it.slice(2));return e?e.t:it.slice(2)}return it.slice(2)};
 {const sr=srRun;srRun=function(q){sr(q);const qq=q.trim().replace(/^#/,'').toLowerCase();if(!qq)return;const box=$('srres');let h='';
   const xs=[...ME.x.entries()].filter(([o,v])=>v.toLowerCase().includes(qq)).slice(0,12);
   if(xs.length)h+=`<div class="srgrp" style="--sc:#be185d"><h4>내가 고친 글</h4>${xs.map(([xk,v])=>{const [c,o]=xk.includes('\u0001')?xk.split('\u0001'):['',xk];return `<button class="sri" data-mitem="${E(c)}" data-mq="${E(o)}"><b>${E(v.length>40?v.slice(0,40)+'…':v)}</b><span>${c?E(nameOf(c))+' · ':''}원래: ${E(o.length>40?o.slice(0,40)+'…':o)}</span></button>`}).join('')}</div>`;
   const tg=[...ME.g.entries()].filter(([it,L])=>L.some(t=>t.toLowerCase().includes(qq))).slice(0,16);
   if(tg.length)h+=`<div class="srgrp" style="--sc:#0f766e"><h4>태그</h4>${tg.map(([it,L])=>`<button class="sri" data-mitem="${E(it)}"><b>${E(nameOf(it))}</b><span>${L.map(t=>'#'+E(t)).join(' ')}</span></button>`).join('')}</div>`;
   if(/^(★|별|별표|star)$/.test(qq)&&ME.s.size)h+=`<div class="srgrp" style="--sc:#ca8a04"><h4>별표</h4>${[...ME.s].map(it=>`<button class="sri" data-mitem="${E(it)}"><b>★ ${E(nameOf(it))}</b></button>`).join('')}</div>`;
   if(!h)return;if(box.querySelector('.srh'))box.innerHTML='';box.insertAdjacentHTML('afterbegin',h)}}
 $('srres').addEventListener('click',e=>{const b=e.target.closest('[data-mitem]');if(!b)return;e.stopPropagation();const it=b.dataset.mitem;if(it)openItem(it);else{const o=b.dataset.mq;const k=Object.keys(GLOSS).find(g=>o.includes(g));if(k)openItem('k:'+k)}},true);
 window.__mineAttach=(db,w)=>{canW=!!w;DB=w?db:null;if(canW)mkBtn();try{db.collection('mine').onSnapshot(q=>load(q.docs.map(d=>d.data())),()=>{})}catch(_){}applyAll()};
 /* 자료 불러오기: claude.ai면 공유 저장소, 웹사이트면 mine.json */
 (async()=>{let ok=false;try{if(window.claude&&claude.use){const [db,us]=await Promise.all([claude.use('db'),claude.use('user')]);if(db){ok=true;canW=!!(us&&await us.isOwner());DB=canW?db:null;if(canW)mkBtn();db.collection('mine').onSnapshot(q=>load(q.docs.map(d=>d.data())),()=>{});applyAll()}}}catch(_){}
   if(!ok){try{const r=await fetch('mine.json',{cache:'no-store'});if(r.ok){const j=await r.json();load(j.mine||[]);if(window.__sanonSet&&j.sanon)window.__sanonSet(j.sanon)}}catch(_){}}})()}
/* 땅 속 구멍(호수 등 안쪽 고리)을 메워 영토 안에 흰 점이 안 생기게 */
{const P=d=>(d||'').split(/(?=M)/).filter(s=>s.trim());const pts=s=>s.replace(/[MZ]/g,' ').trim().split(/[ L]+/).filter(Boolean).map(t=>t.split(',').map(Number));
 const A=r=>{let a=0;for(let i=0;i<r.length;i++){const [x1,y1]=r[i],[x2,y2]=r[(i+1)%r.length];a+=x1*y2-x2*y1}return Math.abs(a/2)};
 const inside=(pt,r)=>{let c=false;for(let i=0,j=r.length-1;i<r.length;j=i++){const [xi,yi]=r[i],[xj,yj]=r[j];if(((yi>pt[1])!=(yj>pt[1]))&&(pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi))c=!c}return c};
 const fix=d=>{const S=P(d),R=S.map(pts),as=R.map(A);return S.filter((s,i)=>!R.some((q,j)=>j!==i&&as[j]>as[i]&&inside(R[i][0],q))).join('')};
 const was={kor:LAND.kor,korHi:LAND.korHi};LAND.kor=fix(LAND.kor);if(LAND.korHi)LAND.korHi=fix(LAND.korHi);
 ['landk','coastk','clipk','cl1','sm1','cpk'].forEach(id=>{const n=$(id);if(!n)return;const d=n.getAttribute('d');n.setAttribute('d',d===was.korHi?LAND.korHi:LAND.kor)})}
/* 주인 없는 땅도 흰색으로 안 남게: 영토 밑에 시대별 밑색(선사·진·탐라·말갈·여진)을 깔기 */
{const NS='http://www.w3.org/2000/svg';const g=document.createElementNS(NS,'g');g.id='terrunder';g.setAttribute('clip-path','url(#landclip)');$('chn').before(g);
 const p=document.createElementNS(NS,'path');p.setAttribute('class','tund');g.appendChild(p);
 const sync=()=>p.setAttribute('d',($('cpk').getAttribute('d')||'')+($('landfill')?$('landfill').getAttribute('d'):''));sync();new MutationObserver(sync).observe($('cpk'),{attributes:true,attributeFilter:['d']});
 const PRE='#e6dcc6',TAM='#e6d4b8',JUR='#d5ddc6',N='none';
 /* 만주 쪽(중국 나라와 우리나라 사이) 빈 땅도 그 시대 세력 색으로 */
 const cpM=document.createElementNS(NS,'clipPath');cpM.id='manch';cpM.setAttribute('clipPathUnits','userSpaceOnUse');const mp=document.createElementNS(NS,'path');
 mp.setAttribute('d','M'+[[60,8],[60,75],[180,75],[180,52],[142,52],[142,47.6],[138.6,47.6],[138.6,42.3],[131.2,42.3],[130.6,42.6],[129.0,42.0],[128.0,41.6],[126.0,40.9],[124.3,39.95],[124.0,37],[123.5,30],[121,21],[110,8]].map(([lo,la])=>X(lo).toFixed(1)+','+Y(la).toFixed(1)).join('L')+'Z');cpM.appendChild(mp);$('defs').appendChild(cpM);
 const g2=document.createElementNS(NS,'g');g2.setAttribute('clip-path','url(#manch)');g.appendChild(g2);const p2=document.createElementNS(NS,'path');p2.setAttribute('class','tund');p2.setAttribute('d',$('landc').getAttribute('d')||'');g2.appendChild(p2);{const u=document.createElementNS(NS,'path');u.setAttribute('clip-path','url(#outctx)');u.setAttribute('class','tund tund2');g2.appendChild(u);p2.u=u;const u2=document.createElementNS(NS,'path');u2.setAttribute('class','tund tund2');g2.appendChild(u2);p2.u2=u2;const wl=$('wl');const sy=()=>{const d=(wl&&wl.getAttribute('d'))||'';u.setAttribute('d',d);u2.setAttribute('d',d);if($('nwc'))u2.setAttribute('clip-path','url(#nwc)')};sy();if(wl)new MutationObserver(sy).observe(wl,{attributes:true,attributeFilter:['d']})}
 const T=['탐라',126.55,33.38];
 const CFG={0:[N,N],1:[N,N],2:[N,N],3:[N,JUR,[['읍루',132.2,46.6],['선비',119.6,44.6]]],
  4:[JUR,JUR,[T,['물길',129.6,47]]],5:[JUR,JUR,[T,['물길',129.6,47]]],6:[JUR,JUR,[T,['말갈',129.6,47]]],7:[JUR,JUR,[T,['말갈',129.6,47]]],
  8:[JUR,JUR,[['말갈',127.15,39.45],T,['말갈',128.6,45]]],9:[JUR,JUR,[T,['흑수 말갈',132.4,48.2]]],10:[JUR,JUR,[T,['여진',128.7,41.3],['여진',131.6,46.5]]],
  11:[JUR,JUR,[['여진',128.7,41.3],['여진',131.6,46.5]]],12:[JUR,JUR,[['여진',128.7,41.3],['여진',131.6,46.5]]],13:[JUR,JUR,[['여진',128.7,41.3]]],14:[JUR,JUR,[['여진',128.7,41.3]]],
  15:[JUR,JUR,[['여진',127.6,41.4],['여진',131.2,45.6]]],16:[JUR,JUR,[['여진',127.6,41.4],['여진',131.2,45.6]]],17:[N,JUR,[['여진',131.2,45.6]]],18:[N,JUR,[['여진',131.2,45.6]]]};
 const labs=[];const mkLab=(n,lo,la)=>{const lg=document.createElementNS(NS,'g');lg.setAttribute('class','ulab');const t=document.createElementNS(NS,'text');t.textContent=n;lg.appendChild(t);$('ovl').appendChild(lg);const o={g:lg,x:X(lo),y:Y(la)};OV.push(o);labs.push({n,lg});return lg};
 const apply=()=>{const c=CFG[pos.i]||[N,N];p.style.fill=c[0];p2.style.fill=c[1];if(p2.u)p2.u.style.fill=c[1];if(p2.u2)p2.u2.style.fill=c[1];labs.forEach(L=>L.lg.style.display='none');(c[2]||[]).forEach(([n,lo,la])=>{let L=labs.find(L=>L.key===n+lo+la);if(!L){mkLab(n,lo,la);L=labs[labs.length-1];L.key=n+lo+la}L.lg.style.display=''});placeOV()};
 const af=applyFrame;applyFrame=function(){const r=af.apply(this,arguments);apply();return r};apply()}
/* 동아시아 상세 지도 북서쪽 귀퉁이(몽골 쪽)가 비어 호수처럼 잘려 보이던 곳 → 세계 지도 땅으로 채움 */
{const NS='http://www.w3.org/2000/svg',mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
 const x1=X(111.4),x2=X(120.6),y1=Y(50.6),y2=Y(44.2);const R={x:x1,y:y1,width:x2-x1,height:y2-y1};
 const cp=mk('clipPath',{id:'nwc',clipPathUnits:'userSpaceOnUse'},$('defs'));mk('rect',R,cp);
 const w2=$('world2')||$('world');if(w2){const g=mk('g',{id:'world3','clip-path':'url(#nwc)'});mk('use',{href:'#wl2',class:'wland2'},g);w2.after(g)}
 const lc=$('landclip');if(lc)mk('use',{href:'#wl','clip-path':'url(#nwc)'},lc);
 const c2=$('cl2clip');if(c2){const r=c2.querySelector('rect');if(r){const a=+r.getAttribute('x'),b=+r.getAttribute('y'),w=+r.getAttribute('width'),h=+r.getAttribute('height');r.remove();const u1=Math.max(x1,a),v1=Math.max(y1,b),u2=Math.min(x2,a+w),v2=Math.min(y2,b+h);mk('path',{d:`M${a},${b}h${w}v${h}h${-w}Z M${u1},${v1}H${u2}V${v2}H${u1}Z`,'clip-rule':'evenodd'},c2)}}
 const ls=$('lshg');if(ls){const cq=mk('clipPath',{id:'nwout',clipPathUnits:'userSpaceOnUse'},$('defs'));mk('path',{d:`M-200000,-200000H200000V200000H-200000Z M${x1},${y1}h${x2-x1}v${y2-y1}h${x1-x2}Z`,'clip-rule':'evenodd'},cq);ls.setAttribute('clip-path','url(#nwout)')}}
/* 해안선: 바다와 맞닿은 변만 미리 골라 둔 선을 영토 위에 그림 (국경·남북 이음매는 처음부터 없음) */
{const NS='http://www.w3.org/2000/svg';const g=document.createElementNS(NS,'g');g.id='coasttop';const k=document.createElementNS(NS,'path'),c=document.createElementNS(NS,'path');k.setAttribute('class','ctop');c.setAttribute('class','ctop');k.setAttribute('d',LAND.korCoast||'');c.setAttribute('d',LAND.ctxCoast||'');g.appendChild(c);g.appendChild(k);G.terr.after(g);
 ['cl1','cl2'].forEach(id=>{const n=$(id);if(n)n.style.display='none'});
 const lk=$('landk');if(lk&&LAND.korHiCoast)new MutationObserver(()=>{const hi=lk.getAttribute('d')===LAND.korHi;k.setAttribute('d',hi?LAND.korHiCoast:LAND.korCoast)}).observe(lk,{attributes:true,attributeFilter:['d']})}
/* 얇은 순서 화살표 */
arrOf.forEach(ps=>ps.forEach(p=>{if(p.c==='donghak'){p.g.classList.add('thin');p.hg.classList.add('thin')}}));
/* 고인돌: 탁자식 고인돌 모양 핀 */
{const DM='<path class="dmc" d="M-11,-11.6Q-6,-14.2,1,-13.8Q8,-13.6,11.4,-11.4Q11.8,-9.8,10,-9.2Q1,-8.2,-9.6,-9.2Q-11.8,-9.8,-11,-11.6Z"/><path class="dms" d="M-7.6,-9.1L-6.8,0.2L-3.4,0.2L-3.8,-9Z"/><path class="dms" d="M3.6,-8.9L3.2,0.2L6.8,0.2L7.4,-9Z"/><path class="dmg" d="M-10,0.6H10"/>';
 EVENTS.forEach(e=>{if(!/^고인돌/.test(e.t))return;const o=pinOf.get(e.id);if(!o)return;const gl=o.g.querySelector('.gl');if(!gl)return;gl.innerHTML=DM;o.g.classList.add('stelepin','dolpin')})}
/* 연표·연대표·유적 하나의 단추로: 누르면 아래에 고르기 */
{const tl=$('tab-tl');if(tl){tl.textContent='연표 ▾';const m=document.createElement('div');m.id='tlmenu';m.hidden=true;m.innerHTML='<button type="button" data-tv="tl">연표</button><button type="button" data-tv="ov">연대표</button>';document.body.appendChild(m);
  tl.onclick=e=>{e.stopPropagation();if(!m.hidden){m.hidden=true;return}const r=tl.getBoundingClientRect();m.style.left=r.left+'px';m.style.top=(r.bottom+6)+'px';const v=store.get('view','map');m.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tv===v));m.hidden=false};
  m.addEventListener('click',e=>{const b=e.target.closest('[data-tv]');if(!b)return;m.hidden=true;const v=b.dataset.tv;if(v==='rl'){showView('rl');rlShow()}else{if(v==='tl'&&typeof tlHeart!=='undefined'&&tlHeart){tlHeart=false;renderTLFilter()}showView(v)}});
  document.addEventListener('click',e=>{if(!m.hidden&&!e.target.closest('#tlmenu,#tab-tl'))m.hidden=true});
  const sv=showView;showView=function(v){const r=sv.apply(this,arguments);try{store.set('view',v)}catch(_){}tl.setAttribute('aria-selected',['tl','ov'].includes(v));tl.textContent=(v==='ov'?'연대표':'연표')+' ▾';if(v==='rl')try{rlShow()}catch(_){}return r};
  if(store.get('view','map')==='rl')setTimeout(()=>{showView('rl')},0)}}
/* 유적·유물 모아 보기 */
const RL_KIND=e=>{if(e.kind)return e.kind;const t=e.t;if(e.tp.includes('war')||/건국|병합|천도|전투|탕평|박해|수신사|전등/.test(t))return null;
  if(/유적|동굴|패총|암각화|고인돌/.test(t))return '유적';if(/『|대장경|직지|훈민정음|지도|실록/.test(t))return '기록 유산';
  if(/탑|궁|황룡사|부석사|석굴암|불국사|서원|화성|첨성대|왕릉|릉 |천리장성|비 건립|비·|정계비|척화비|순수비|중건/.test(t))return '건축·비석';if(/신종|측우기|금관|토기|동검|청자|백자|활자|불상/.test(t))return '유물';return null};
const rlName=e=>e.t.replace(/\s*·\s*농경 시작$/,'').replace(/중건 시작$/,'중건').replace(/\s*(건립 시작|건립|완성|제작|축조|편찬|간행|인쇄|완공|창제|발행|반포)$/,'').trim();
const RL_COL={'유적':'#b45309','건축·비석':'#1d4ed8','유물':'#be185d','기록 유산':'#047857'};let rlKind='';
/* 같은 문화유산은 하나로: 경복궁(창건·소실·중건), 종묘 */
const RL_MERGE=['경복궁·종묘 건립','경복궁 중건 시작'];
let RL_CACHE=null;function RLITEMS(){if(RL_CACHE)return RL_CACHE;const byT=t=>EVENTS.find(e=>e.t===t);const L=EVENTS.filter(e=>RL_KIND(e)&&!RL_MERGE.includes(e.t));
 const a=byT('경복궁·종묘 건립'),b=byT('경복궁 중건 시작');const era=(a&&a.era)||'joseon1';
 L.push({id:'x-gbg',kind:'건축·비석',t:'경복궁',y:1395,T:1395,era,yl:'1395 창건 · 1867 중건',p:'서울',ll:[126.977,37.579],tp:['cul'],cz:[a,b].filter(Boolean),
  x:'조선의 법궁(으뜸 궁궐). 1395년 한양 천도와 함께 태조 때 세웠다. 임진왜란(1592) 때 불타 270여 년 동안 빈터로 남았다. 흥선 대원군이 왕실의 권위를 다시 세우려고 1865년부터 다시 지어 1867년에 완공하였다(중건). 이때 원납전을 걷고 당백전을 발행하여 백성의 부담이 커졌다. 일제 강점기에는 많은 건물이 헐리고 조선 총독부 청사가 세워졌다.'});
 L.push({id:'x-jm',kind:'건축·비석',t:'종묘',y:1395,T:1395.01,era,yl:'1395',p:'서울',ll:[126.994,37.574],tp:['cul'],cz:[a].filter(Boolean),
  x:'조선 왕과 왕비의 신주를 모신 왕실 사당. 1395년 경복궁과 함께 세웠다. 임진왜란 때 불탔다가 광해군 때 다시 지었다. 종묘 제례와 종묘 제례악이 지금까지 이어진다.'});
 RL_CACHE=L.sort((x,y)=>x.T-y.T);return RL_CACHE}
function rlShow(){const L=RLITEMS();const kinds=Object.keys(RL_COL);
 $('rlchips').innerHTML=['',...kinds].map(k=>`<button type="button" data-rk="${k}" aria-pressed="${rlKind===k}" style="--kc:${RL_COL[k]||'var(--ink)'}">${k||'전체'} ${L.filter(e=>!k||RL_KIND(e)===k).length}</button>`).join('');
 const by=ERAS.map(E=>({E,xs:L.filter(e=>e.era===E.k&&(!rlKind||RL_KIND(e)===rlKind))})).filter(x=>x.xs.length);
 $('rljump').innerHTML=by.map(({E})=>`<button type="button" data-rj="${E.k}">${E.n}</button>`).join('');
 $('rlbody').innerHTML=by.map(({E,xs})=>`<section class="rlera" id="rl-${E.k}"><h3>${esc(E.n)}<span>${esc(E.rg||'')}</span></h3><div class="rlgrid">${xs.map(e=>{const k=RL_KIND(e);return `<button type="button" class="rlcard" data-rle="${e.id}" style="--kc:${RL_COL[k]}"><span class="rk">${k}</span><b>${esc(rlName(e))}</b><span class="rd">${esc(((e.x||'').split(/(?<=[.다])\s/)[0]||'').replace(/\(.*?\)/g,''))}</span><span class="rm">${esc(e.yl||shortYear(e))}${e.p?' · '+esc(e.p):''}</span></button>`}).join('')}</div></section>`).join('')}
document.addEventListener('click',ev=>{const k=ev.target.closest('[data-rk]');if(k){rlKind=k.dataset.rk;rlShow();return}
 const j=ev.target.closest('[data-rj]');if(j){const s=document.getElementById('rl-'+j.dataset.rj),rd=$('rlread');if(s)rd.scrollTo({top:s.offsetTop-rd.querySelector('.rhead').offsetHeight-6,behavior:'smooth'});return}
 const c=ev.target.closest('[data-rle]');if(!c)return;const e=RLITEMS().find(x=>String(x.id)===c.dataset.rle);if(!e)return;rlOpen(e);return;const p=$('trpop');
 p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button></div></div>`;
 p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();gotoTimeline(e)}});
/* 유적·유물 자세히: 사전처럼 한 화면 */
Object.assign(SEC_COL,{'설명':'#b45309','배경 이야기':'#7c3aed','자세히':'#0e7490','뜻':'#b91c1c','앞뒤 사건':'#1d4ed8','관련 인물':'#047857','같은 시대 문화유산':'#be185d'});
function rlOpen(e){const p=$('kpage');const L=RLITEMS();const i=L.findIndex(x=>x.id===e.id);const k=RL_KIND(e);
 const story=typeof STORY!=='undefined'?STORY[e.t]:null;const deep=typeof DEEP!=='undefined'?(DEEP[e.s]||DEEP[e.t]):null;const def=GLOSS[e.s]||GLOSS[e.t];
 const pps=(e.pp||'').split(/,\s*/).map(x=>x.trim()).filter(Boolean);const lk=[...(e.cz||[]),...(e.fx||[])];const near=L.filter(x=>x.era===e.era&&x.id!==e.id).slice(0,10);
 p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>문화유산</span><span class="kpnav rlnav"><button type="button" class="ib" data-rlv="-1" aria-label="이전"${i>0?'':' disabled'}><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><button type="button" class="ib" data-rlv="1" aria-label="다음"${i<L.length-1?'':' disabled'}><svg class="ic" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></span></div>
 <div class="kpin" style="--kc:${RL_COL[k]}">
  <div class="kph"><h1>${esc(rlName(e))}</h1><button class="hrt" type="button" data-kh="r|${esc(e.t)}" aria-pressed="${KHEARTS.has('r|'+e.t)}" aria-label="하트">${HEART_IC}</button></div>
  <div class="kpsub"><span style="color:${RL_COL[k]};font-weight:700">${k}</span><span>${esc(e.yl||shortYear(e))}${e.kind?'':' '+esc(e.t)}</span>${e.p?`<span>${esc(e.p)}</span>`:''}</div>
  <section><h3>설명</h3><p class="kpd">${glx(e.x||'')}</p></section>
  ${def?`<section><h3>뜻</h3><p class="kpd">${glx(def)}</p></section>`:''}
  ${deep?`<section><h3>자세히</h3><div class="tmrows">${deep.map(([a,t])=>`<div class="gdr" data-l="${esc(a)}"><i>${esc(a)}</i><span>${glx(t)}</span></div>`).join('')}</div></section>`:''}
  ${story?`<section><h3>배경 이야기</h3><p class="kpd">${glx(story)}</p></section>`:''}
  ${pps.length?`<section><h3>관련 인물</h3><div class="kpp">${pps.map(x=>`<button class="pchip" data-person="${esc(x)}" data-pt="${e.T}"><i>${esc([...x][0]||'')}</i>${esc(x)}</button>`).join('')}</div></section>`:''}
  ${lk.length?`<section><h3>앞뒤 사건</h3><ul class="kpl">${lk.map(x=>`<li class="ev"><button data-kpe="${x.id}" style="--tc:var(--t-${x.tp[0]})"><em>${esc(shortYear(x))}</em>${esc(x.t)}</button></li>`).join('')}</ul></section>`:''}
  ${near.length?`<section><h3>같은 시대 문화유산</h3><div class="kpp">${near.map(x=>`<button type="button" data-rle="${x.id}" style="--kc:${RL_COL[RL_KIND(x)]}"><i></i>${esc(rlName(x))}</button>`).join('')}</div></section>`:''}
  <div class="rlgo">${e.ll?'<button class="btn" data-rlmap>지도에서 보기</button>':''}<button class="btn" data-rltl>연표에서 보기</button></div>
 </div>`;
 p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true};
 p.querySelectorAll('[data-rlv]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const n=L[i+(+b.dataset.rlv)];if(n)rlOpen(n)});
 const real=e.kind?((e.cz||[]).find(x=>x&&x.ll)||(e.cz||[])[0]):e;const m=p.querySelector('[data-rlmap]');if(m)m.onclick=()=>{if(!real)return;p.hidden=true;gotoMap(real)};p.querySelector('[data-rltl]').onclick=()=>{if(!real)return;p.hidden=true;gotoTimeline(real)};
 try{paintSections(p)}catch(_){}}
