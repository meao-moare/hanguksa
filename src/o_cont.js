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
   const p=ev.target.closest('[data-person]');if(p&&!(p.classList.contains('gpn')&&document.body.classList.contains('medit'))&&!ev.target.closest('#pppop')&&!ev.target.closest('.kpage .pplist')){ev.preventDefault();ev.stopPropagation();pop.innerHTML=personPopHTML(p.dataset.person,p.dataset.pt?+p.dataset.pt:null);place(p);return}
   if(!pop.hidden&&!ev.target.closest('#pppop'))pop.hidden=true},true);}
/* 짝 인물은 한 버튼으로: '원종과 애노' */
{const wh=whoHTML;whoHTML=function(e,cls){let h=wh.apply(this,arguments);Object.entries({'원종과 애노':['원종','애노'],'망이와 망소이':['망이','망소이']}).forEach(([t,[a,b]])=>{const re=new RegExp(`<button type="button" class="pn" data-person="${a}"([^>]*)>${a}</button>, <button type="button" class="pn" data-person="${b}"[^>]*>${b}</button>`);h=h.replace(re,`<button type="button" class="pn" data-person="${a}"$1>${t}</button>`)});return h}}
try{buildTL();renderTLFilter();addTclb()}catch(_){}
/* 밑줄 낱말 팝업: '사전에서 보기' */
document.addEventListener('click',ev=>{const w=ev.target.closest('[data-gl]');if(!w||ev.target.closest('#glpop'))return;const gp=$('glpop');if(gp.hidden||gp.querySelector('.ppgo.dc'))return;const k=w.dataset.gl;gp.insertAdjacentHTML('beforeend',`<button type="button" class="ppgo dc" data-dc="${esc(k)}">사전에서 자세히 →</button>`)});
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-dc]');if(!b)return;ev.preventDefault();ev.stopImmediatePropagation();const k=b.dataset.dc;$('glpop').hidden=true;try{if(!$('srch').hidden)closeSearch()}catch(_){}if(!GLOSS[k]&&typeof PEOPLE!=='undefined'&&PEOPLE.has(k))openPerson(k);else openTerm(k)},true);
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
 h.addEventListener('click',()=>{try{if(playing)pause()}catch(_){}['kpage','trpop','trdim','menupop','srch'].forEach(id=>{const n=$(id);if(n&&!n.hidden){if(id==='srch'){try{closeSearch()}catch(_){}}else n.hidden=true}});
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
  <div class="kpsub">${t0!=null?`<span>${yrTxt(t0)}${t1>t0+.5?' ~ '+yrTxt(t1):''}</span>`:''}${main&&typeof eventKing==='function'&&eventKing(main)?`<span>${esc(eventKing(main).txt)}</span>`:''}</div>
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
 const box=ev.target.closest('#dcbody .gl2>div[data-k]');if(!box||ev.target.closest('button,a,[data-gl],.hrt'))return;ev.preventDefault();ev.stopPropagation();const go=()=>{if(box.classList.contains('gp')){openPerson(box.dataset.k);return}openTerm(box.dataset.k)};if(document.body.classList.contains('medit')){if(window.__dcEdit)return;{const r=box.getBoundingClientRect();if(ev.clientX>r.right-34&&ev.clientY>r.bottom-30){const dd=box.querySelector('dd');if(dd){clearTimeout(window.__dcT);window.__dcEdit=true;try{dd.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}))}finally{window.__dcEdit=false}}return}}clearTimeout(window.__dcT);window.__dcT=setTimeout(go,280);return}go()},true);
document.addEventListener('dblclick',ev=>{if(!document.body.classList.contains('medit'))return;const t=ev.target.closest&&ev.target.closest('#dcbody .gl2>div[data-k]');if(!t)return;clearTimeout(window.__dcT);ev.preventDefault();window.__dcEdit=true;try{ev.target.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}))}finally{window.__dcEdit=false}},true);
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
/* 클로드 ↔ 사이트(Firebase) 어느 정도 맞추기: 사이트에서 고친 것을 Firebase에서 읽어 와 최신 것으로 합침 */
window.__FSR={key:'AIzaSyAPHs56cX-nqgmU9tR3eVGu8cJo5MqalQY',proj:'hanguksa-dbb5e',subs:{}};
window.__fsDec=v=>{if(!v)return null;if('stringValue' in v)return v.stringValue;if('integerValue' in v)return +v.integerValue;if('doubleValue' in v)return v.doubleValue;if('booleanValue' in v)return v.booleanValue;if('nullValue' in v)return null;if(v.mapValue){const o={};const f=v.mapValue.fields||{};for(const k in f)o[k]=window.__fsDec(f[k]);return o}if(v.arrayValue)return (v.arrayValue.values||[]).map(window.__fsDec);return null};
window.__fsPoll=(col,cb)=>{const run=async()=>{try{const r=await fetch(`https://firestore.googleapis.com/v1/projects/${__FSR.proj}/databases/(default)/documents/${col}?pageSize=1000&key=${__FSR.key}`);if(!r.ok)return;const j=await r.json();const out=new Map();(j.documents||[]).forEach(d=>{const id=d.name.split('/').pop();const o={};const f=d.fields||{};for(const k in f)o[k]=__fsDec(f[k]);out.set(id,o)});cb(out)}catch(_){}};run();setInterval(run,60000)};
window.__hidK=k=>[...new TextEncoder().encode(k)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,190);
window.__mergeFS=(baseDocs,fs)=>{const m=new Map();baseDocs.forEach(d=>{if(d&&d.k)m.set(__hidK(d.k),d)});if(fs)fs.forEach((d,id)=>{const b=m.get(id);const at=+(d&&d.at)||0,bt=+(b&&b.at)||0;if(d&&d.del){if(!b||at>bt)m.delete(id)}else if(d&&d.k&&(!b||at>=bt))m.set(id,d)});return [...m.values()]};
/* 나만의 사론: "사신은 논한다," — 주인(나)만 쓰고, 다른 사람은 보기만 (claude.ai 공유 저장소) */
{let NT={},canW=false,DB=null;
 const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const hid=k=>[...new TextEncoder().encode(k)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,190);
 const inner=k=>{const v=NT[k];return v?`<span class="snh">사신은 논한다,</span> <span class="snv">${E(v).replace(/\n/g,'<br>')}</span>`:(canW?'<span class="sna">✎ 사신은 논한다…</span>':'')};
 const cls=k=>'snote'+(NT[k]?' has':'')+(canW?' mine':'');
 const html=k=>`<div class="${cls(k)}" data-sk="${E(k)}">${inner(k)}</div>`;
 const refresh=()=>document.querySelectorAll('.snote[data-sk]').forEach(b=>{if(b.querySelector('textarea'))return;const k=b.dataset.sk;b.className=cls(k);b.innerHTML=inner(k)});
 const put=async(k,v)=>{const old=NT[k];if(v)NT[k]=v;else delete NT[k];refresh();if(!DB)return;try{const r=DB.collection('sanon').doc(hid(k));if(v)await r.set({k,v,at:Date.now()});else await r.set({k,del:true,at:Date.now()})}catch(_){if(old)NT[k]=old;else delete NT[k];refresh()}};
 const ed=box=>{if(!canW||box.querySelector('textarea'))return;const k=box.dataset.sk;box.classList.add('ed');box.innerHTML='<span class="snh">사신은 논한다,</span><textarea rows="2" placeholder="내 생각을 적어 보세요"></textarea>';const ta=box.querySelector('textarea');ta.value=NT[k]||'';const fit=()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px'};ta.addEventListener('input',fit);fit();ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length);
   let at=0;ta.addEventListener('input',()=>{clearTimeout(at);at=setTimeout(()=>{const v=ta.value.trim();if(v!==(NT[k]||'')){if(v)NT[k]=v;else delete NT[k];if(DB){const r=DB.collection('sanon').doc(hid(k));(v?r.set({k,v,at:Date.now()}):r.set({k,del:true,at:Date.now()})).catch(()=>{})}}},700)});ta.addEventListener('blur',()=>{clearTimeout(at);const v=ta.value.trim();box.classList.remove('ed');ta.remove();if(v!==(NT[k]||''))put(k,v);else refresh()})};
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.snote.mine');if(!b||e.target.tagName==='TEXTAREA')return;e.stopPropagation();ed(b)},true);
 window.addEventListener('keydown',e=>{const t=e.target;if(!(t&&t.closest&&t.closest('.snote')))return;e.stopImmediatePropagation();if(e.key==='Escape'||(e.key==='Enter'&&!e.shiftKey&&!e.isComposing)){e.preventDefault();t.blur()}},true);
 ['keyup','keypress'].forEach(ev=>window.addEventListener(ev,e=>{const t=e.target;if(t&&t.closest&&t.closest('.snote'))e.stopImmediatePropagation()},true));
 const ev0=evDetailHTML;evDetailHTML=function(e){return ev0.apply(this,arguments)+html('e:'+(e.id!=null?e.id:e.t))};
 const kp=$('kpage');if(kp){const add=()=>{if(kp.querySelector('.snote'))return;const h=kp.querySelector('h2,h1,.kn,.ttl');const key=(h?h.textContent:'').trim();if(!key)return;const host=kp.querySelector('.kpin,.kbody,.pbody')||kp;host.insertAdjacentHTML('beforeend',html('k:'+key))};new MutationObserver(()=>{clearTimeout(add.t);add.t=setTimeout(add,30)}).observe(kp,{childList:true,subtree:false})}
 window.__sanonSet=n=>{NT=n||{};refresh()};window.__sanonAttach=(db,w)=>{canW=!!w;DB=w?db:null;refresh();try{db.collection('sanon').onSnapshot(q=>{const n={};q.docs.forEach(d=>{const x=d.data();if(x&&x.k&&x.v)n[x.k]=String(typeof x.v==='object'?(x.v.v||x.v.t||''):x.v)});NT=n;refresh()},()=>{})}catch(_){}};(async()=>{try{if(!window.claude||!claude.use)return;const [db,us]=await Promise.all([claude.use('db'),claude.use('user')]);canW=!!(us&&await us.isOwner());DB=canW?db:null;refresh();
   if(db){let base=[],fs=null;const apply=()=>{const n={};__mergeFS(base,fs).forEach(x=>{if(x&&x.k&&x.v)n[x.k]=String(typeof x.v==='object'?(x.v.v||x.v.t||''):x.v)});NT=n;refresh()};db.collection('sanon').onSnapshot(q=>{base=q.docs.map(d=>d.data());apply()},()=>{});__fsPoll('sanon',m=>{fs=m;apply()})}}catch(_){}})()}
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
{const ME={xg:new Map(),x:new Map(),xc:new Map(),s:new Set(),h:new Map(),g:new Map(),w:new Map(),q:new Map(),o:{menu:[]},l:new Map(),c:new Map(),v:new Map(),u:new Map(),y:new Map(),f:new Map(),bx:new Map(),n:new Map(),j:new Map(),zh:new Set(),ro:new Map(),img:new Map(),xs:new Map(),yo:new Map(),hr:new Map(),tr:new Map()};const CUR=new Map();const UND=[],RED=[];let penMode='';let canW=false,DB=null,editOn=false;window.__ME=ME;window.__MEX={save:(k,v)=>save(k,v),can:()=>canW&&editOn,toast:t=>toast(t)};
 const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const hid=k=>[...new TextEncoder().encode(k)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,190);
 const LBLT=new Set(['📖 이야기로 보기','이야기로 보기','사신은 논한다,','더 자세히 ▾','내용','인물','대립','시기','장소','분류','뜻','자세히','관련 사건','관련 인물','관련 낱말','배경 이야기','구조도','어떤 사람','함께 나오는 인물','같은 시기 인물','이어지는 사건','같은 시기 사건','같은 인물이 나오는 사건','결과','배경','의의','과정','원인']);const LBLMIG={'📖 이야기로 보기':['e:0'],'이야기로 보기':['e:0'],'내용':['k:고조선 건국','e:0']};const MIGQ=[],MIGD=new Set();
 const SEL='#kgbody .stk b,#kgbody .stk span,#kgbody .kgk b,#kgbody .kgk span,.tl>li>.d,.evd>.dt,.kpsub>span,.gpn,h1,h2,h3,h4,p,li,dd,dt,td,th,.kpd,.snv,.sri b,.sri span,.gdr span,.evd b,.evd span,.gdr i,.gdr>span,.kprows dt,.kprows dd,#menupop .mnv button[data-mv],#menupop .mnh';
 const SKIP='header.top h1,.gptag,.kpnat,svg,#map,.tbar,.tbtns,.search,#srq,textarea,input,.mtool,.snote,.mtags,#medit,#menupop .mnq,#menupop .mnadd';
 /* 받은 자료 넣기 */
 let pendD=null;const load=docs=>{if(document.querySelector('.xing')){pendD=docs;return}try{localStorage.setItem('hgs_mec',JSON.stringify(docs.filter(d=>!(d&&d.k&&d.k.startsWith('p:')))))}catch(_){}const wOld=JSON.stringify([...ME.w])+JSON.stringify([...ME.n]);ME.x.clear();ME.xg.clear();ME.xc.clear();ME.xs.clear();ME.yo.clear();ME.s.clear();ME.h.clear();ME.g.clear();ME.w.clear();ME.q.clear();ME.o.menu=[];ME.l.clear();ME.c.clear();ME.v.clear();ME.u.clear();ME.hr.clear();ME.tr.clear();ME.y.clear();ME.f.clear();ME.bx.clear();ME.n.clear();ME.j.clear();ME.zh.clear();ME.ro.clear();ME.img.clear();CUR.clear();docs.forEach(d=>{if(d&&d.k&&!d.del)CUR.set(d.k,d)});docs.forEach(d=>{if(!d||!d.k)return;const t=d.k[0],key=d.k.slice(2);
   if(t==='x'&&d.v!=null){ME.x.set(key,String(d.v));if(d.c)ME.xc.set(key,d.c);const j=key.indexOf('\u0001');if(key[0]==='@'&&j>0){const it=key.slice(1,j),o=key.slice(j+1);if(!ME.xs.has(it))ME.xs.set(it,new Map());ME.xs.get(it).set(o,String(d.v))}else{const o=j>=0?key.slice(j+1):key;if(LBLT.has(o)){(LBLMIG[o]||[]).forEach((it,ii)=>{if(!ME.xs.has(it))ME.xs.set(it,new Map());ME.xs.get(it).set(o,String(d.v));MIGQ.push([key,it,o,String(d.v),ii])})}else ME.xg.set(o,String(d.v))}}else if(t==='s'&&d.v)ME.s.add(key);else if(t==='h'&&Array.isArray(d.v)&&d.v.length)ME.h.set(key,d.v.map(String));else if(t==='g'&&Array.isArray(d.v)&&d.v.length)ME.g.set(key,d.v.map(String));else if(t==='w'&&d.v)ME.w.set(key,String(d.v));else if(t==='q'&&d.v&&(d.v.u||d.v.it||d.v.v||d.v.kind==='g'))ME.q.set(key,d.v);else if(t==='o'&&key==='menu'&&Array.isArray(d.v))ME.o.menu=d.v.map(String);else if(t==='l'&&Array.isArray(d.v)&&d.v.length)ME.l.set(key,d.v.map(String));else if(t==='c'&&Array.isArray(d.v)&&d.v.length)ME.c.set(key,d.v.filter(x=>x&&x.v));else if(t==='v'&&d.v&&d.v.t)ME.v.set(key,d.v);else if(t==='u'&&Array.isArray(d.v)&&d.v.length)ME.u.set(key,d.v.map(String));else if(t==='H'&&d.v&&d.v.t)ME.hr.set(key,d.v);else if(t==='T'&&d.v&&typeof d.v==='object')ME.tr.set(key,d.v);else if(t==='y'&&d.v&&typeof d.v==='object')ME.y.set(key,d.v);else if(t==='f'&&Array.isArray(d.v)&&d.v.length)ME.f.set(key,d.v);else if(t==='b'&&d.v)ME.bx.set(key,String(d.v));else if(t==='n'&&d.v)ME.n.set(key,String(d.v));else if(t==='j'&&Array.isArray(d.v)&&d.v.length)ME.j.set(key,d.v.map(String));else if(t==='z'&&d.v)ME.zh.add(key);else if(t==='r'&&Array.isArray(d.v)&&d.v.length)ME.ro.set(key,d.v.map(String));else if(t==='p'&&typeof d.v==='string'&&d.v.startsWith('data:image'))ME.img.set(key,d.v);else if(t==='Y'&&d.v&&typeof d.v==='object')ME.yo.set(key,d.v)});if(MIGQ.length&&DB){const q=MIGQ.splice(0).filter(r=>!MIGD.has(r[0]+'|'+r[1]));q.forEach(r=>MIGD.add(r[0]+'|'+r[1]));if(q.length)setTimeout(()=>q.forEach(([k,it,o,v,ii])=>{if(!ii)save('x:'+k,'',undefined,true);save('x:@'+it+'\u0001'+o,v,undefined,true)}),0)}else MIGQ.length=0;syncYov();syncEvents();if(JSON.stringify([...ME.w])+JSON.stringify([...ME.n])!==wOld)applyWords();applyAll()};
 document.addEventListener('focusout',()=>setTimeout(()=>{if(pendD&&!document.querySelector('.xing')){const d=pendD;pendD=null;load(d)}},30),true);
 const save=(k,v,extra,noH)=>{if(!DB)return;{const e0=v==null||v===''||(Array.isArray(v)&&!v.length)||v===0;if(!noH){UND.push({k,prev:CUR.has(k)?JSON.parse(JSON.stringify(CUR.get(k))):null,next:e0?null:Object.assign({k,v},extra||{})});if(UND.length>200)UND.shift();RED.length=0}if(e0)CUR.delete(k);else CUR.set(k,Object.assign({k,v},extra||{}))}const r=DB.collection('mine').doc(hid(k));const empty=v==null||v===''||(Array.isArray(v)&&!v.length)||v===0;(empty?r.set({k,del:true,at:Date.now()}):r.set(Object.assign({k,v,at:Date.now()},extra||{}))).then(()=>{}).catch(()=>toast('저장 못 함'))};
 const toast=t=>{if(document.querySelector('.xing'))return;let b=$('mtoast');if(!b){b=document.createElement('div');b.id='mtoast';document.body.appendChild(b)}b.textContent=t;b.classList.add('on');clearTimeout(b.t);b.t=setTimeout(()=>b.classList.remove('on'),900)};
 /* 글씨 바꾸기 적용 */
 const SIMP=el=>!el.closest('#kpage')&&!!el.closest('#dcbody,.evd,#v-tl,#v-pp,#glpop,#pppop,#v-map,#v-rl,.snote');
 const applyText=root=>{applyStyle(root);try{inlTags(root)}catch(_){}if(!ME.x.size&&!(root.nodeType===1?root:document.body).querySelector('.xed'))return;{const w=document.createTreeWalker(root.nodeType===1?root:document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;if(!p)return 2;if(p.closest&&p.closest('svg'))return p.tagName==='text'||p.tagName==='tspan'?1:2;return (p.closest&&p.closest(SKIP+',.mseg'))||p.isContentEditable?2:1}});const SM=ME.xs.get('S');const sv=(n,t)=>SM&&SM.has(t)&&n.parentNode&&n.parentNode.closest&&SIMP(n.parentNode)?SM.get(t):null;const L=[];let n;while((n=w.nextNode())){const t=n.nodeValue.trim();if(t&&(ME.xg.has(t)||sv(n,t)!=null))L.push([n,t])}
   L.forEach(([n,t])=>{const v=sv(n,t)??ME.xg.get(t);n.nodeValue=n.nodeValue.replace(t,v);const p=n.parentNode;if(p&&v.includes('#'))setTimeout(()=>{try{inlTags(p)}catch(_){}},0);if(p&&p.style&&v.includes('\n')){p.style.whiteSpace='pre-line';setTimeout(()=>{try{if(p.closest&&p.matches(SEL))lineify(p)}catch(_){}},0)}if(p&&p.dataset&&!p.dataset.xo&&p.textContent.trim()===v){p.dataset.xo=t;p.classList.add('xed')}})}const list=root.matches&&root.matches(SEL)?[root,...root.querySelectorAll(SEL)]:[...root.querySelectorAll(SEL)];list.forEach(el=>{if(el.isContentEditable||el.closest(SKIP))return;if(el.querySelector('div,p,h1,h2,h3,h4,ul,ol,li,section,dl,table,button,svg'))return;const o=el.dataset.xo||el.textContent.trim();if(!o)return;let v=ME.xg.get(o);{const SM2=ME.xs.get('S');if(SM2&&SM2.has(o)&&SIMP(el))v=SM2.get(o)}if(ME.xs.size&&el.closest('.evd,#kpage,#v-tl')){const it=itemOf(el);const m=it&&ME.xs.get(it);if(m&&m.has(o))v=m.get(o);else if(LBLT.has(o))v=null}if(v==null){if(el.classList.contains('xed')&&el.dataset.xo){el.textContent=el.dataset.xo;el.classList.remove('xed');el.style.whiteSpace=''}return}if(el.dataset.xo===o&&TXL(el)===v)return;el.dataset.xo=o;el.textContent=v;el.classList.add('xed');if(v.includes('\n'))el.style.whiteSpace='pre-line';try{hrify(el);lineify(el)}catch(_){}if(v.includes('#'))try{inlTags(el)}catch(_){}})};
 function lineify(el){if(!el||!el.querySelector||el.isContentEditable||el.querySelector('.mseg,.mln,div,p,li,section')||el.closest('.msec'))return;const t=el.textContent;if(!t.includes('\n'))return;el.innerHTML=t.split('\n').map(l=>`<span class="mln">${l.trim()?(typeof glx==='function'?glx(l):E(l)):'<br>'}</span>`).join('');el.style.whiteSpace='';lnAlign(el)}
 function lnAlign(root){(root&&root.querySelectorAll?root:document).querySelectorAll('.mln').forEach(s=>{const y=ME.y.get(s.textContent.trim());s.style.textAlign=y&&y.a||''})}
 const TXL=el=>el.querySelector('.mln')?[...el.querySelectorAll('.mln')].map(x=>x.textContent).join('\n'):el.textContent;
 const HRRE=/(^|\n)[ \t]*---[ \t]*(?=\n|$)/;
 function hrify(el){const v=el.textContent;if(!HRRE.test(v))return;const parts=v.split(/\n[ \t]*---[ \t]*(?:\n|$)|^[ \t]*---[ \t]*\n/);el.innerHTML=parts.map(x=>`<span class="mseg">${x.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</span>`).join('<hr class="msep">');el.style.whiteSpace='pre-line'}
 const styEl=(el,y)=>{el.style.textAlign=y&&y.a||'';el.style.color=y&&y.c||'';el.style.fontWeight=y&&y.b?(y.b>0?'800':'400'):'';el.style.fontSize=y&&y.p?y.p+'px':y&&y.z&&y.z!==1?Math.round(y.z*100)+'%':'';el.style.fontStyle=y&&y.it?'italic':'';el.style.textDecoration=y&&(y.ul||y.st)?[y.ul?'underline':'',y.st?'line-through':''].join(' ').trim():''};
 function applyStyle(root){applyPart(root);applyBox(root);try{lnAlign(root)}catch(_){}if(!ME.y.size)return;const r=root.nodeType===1?root:document.body;const list=r.matches&&r.matches(SEL)?[r,...r.querySelectorAll(SEL)]:[...r.querySelectorAll(SEL)];list.forEach(el=>{if(el.closest(SKIP))return;const o=el.dataset.xo||el.textContent.trim();const y=ME.y.get(o);if(y){if(!el.dataset.xo)el.dataset.xo=o;styEl(el,y);el.dataset.xy=1}else if(el.dataset.xy){styEl(el,null);delete el.dataset.xy}})}
 const BOXSEL='#kpage .kpin>section,.sumblk,.evd>section,#dcbody .gl2>div,.rlcard';
 const viewName=()=>{const v=[...document.querySelectorAll('[id^="v-"]')].find(x=>!x.hidden&&x.offsetParent);return v?v.id:''};
 const boxKey=b=>{const it=itemOf(b)||viewName();const hd=b.querySelector('h2,h3,h4,dt,b');const t=hd?(hd.dataset.xo||hd.textContent).trim().slice(0,40):'';if(!t){const sib=[...b.parentElement.children].indexOf(b);return it+'|#'+sib}return it+'|'+t};
 function applyBox(root){const r=root&&root.nodeType===1?root:document.body;const L=r.matches&&r.matches(BOXSEL)?[r]:[...r.querySelectorAll(BOXSEL)];const ed=editOn&&canW;L.forEach(b=>{const k=boxKey(b);if(ME.zh.has(k)){b.style.display='none';b.dataset.zh=1}else if(b.dataset.zh){b.style.display='';delete b.dataset.zh}let x=b.querySelector(':scope>.mboxx');if(ed&&!x){x=document.createElement('button');x.type='button';x.className='mboxx';x.setAttribute('aria-label','칸 삭제');x.textContent='×';b.prepend(x)}else if(!ed&&x)x.remove();let mv=b.querySelector(':scope>.mboxmv');const canMv=ed&&b.matches('#kpage .kpin>section');if(canMv&&!b.querySelector(':scope>.mplus')){b.insertAdjacentHTML('beforeend','<button type="button" class="mplus top" data-mplus="0" aria-label="여기에 내용 칸 넣기">+</button><button type="button" class="mplus bot" data-mplus="1" aria-label="여기에 내용 칸 넣기">+</button>')}else if(!canMv)b.querySelectorAll(':scope>.mplus').forEach(x=>x.remove());if(canMv&&!mv){b.insertAdjacentHTML('afterbegin','<span class="mboxmv"><button type="button" class="msgrip" aria-label="끌어서 옮기기">⠿</button><button type="button" data-secmv="-1" aria-label="위로">↑</button><button type="button" data-secmv="1" aria-label="아래로">↓</button></span>')}else if(!canMv&&mv)mv.remove()});if(!ME.bx.size&&!L.some(b=>b.dataset.bx))return;L.forEach(b=>{const c=ME.bx.get(boxKey(b));if(c){b.style.setProperty('background',`color-mix(in srgb,${c} 13%,var(--panel))`,'important');b.style.setProperty('border-color',`color-mix(in srgb,${c} 40%,transparent)`,'important');b.dataset.bx=1}else if(b.dataset.bx){b.style.removeProperty('background');b.style.removeProperty('border-color');delete b.dataset.bx}})}
 function applyPart(root){const r=root&&root.nodeType===1?root:document.body;const list=r.matches&&r.matches(SEL)?[r,...r.querySelectorAll(SEL)]:[...r.querySelectorAll(SEL)];list.forEach(el=>{if(el.closest(SKIP)||el.isContentEditable)return;const o=el.dataset.xo||el.textContent.trim();const L=ME.f.get(o);const had=el.querySelector('span.mfx');if(!L&&!had)return;el.querySelectorAll('span.mfx').forEach(m=>m.replaceWith(...m.childNodes));el.normalize();if(!L)return;if(!el.dataset.xo)el.dataset.xo=o;
   L.forEach(f=>{if(!f||!f.s)return;const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode())){const i=n.nodeValue.indexOf(f.s);if(i<0)continue;const rg=document.createRange();rg.setStart(n,i);rg.setEnd(n,i+f.s.length);const m=document.createElement('span');m.className='mfx';if(f.c)m.style.color=f.c;if(f.b)m.style.fontWeight=f.b>0?'800':'400';if(f.p)m.style.fontSize=f.p+'px';if(f.it)m.style.fontStyle='italic';if(f.ul||f.st)m.style.textDecoration=[f.ul?'underline':'',f.st?'line-through':''].join(' ').trim();try{rg.surroundContents(m)}catch(_){}break}})})}
 /* 지금 열린 자세한 화면의 이름표 */
 const itemOf=el=>{if(el&&el.closest&&el.closest('#v-kg'))return 'v:kg';{const tli=el&&el.closest&&el.closest('#v-tl ol.tl>li[data-id]');if(tli)return 'e:'+tli.dataset.id}const ev=el&&el.closest&&el.closest('.evd');if(ev){const s=ev.querySelector('.snote[data-sk^="e:"]');if(s)return s.dataset.sk}const kp=$('kpage');if(kp&&!kp.hidden&&kp.contains(el)){const ke=kp.querySelector('.kpin.kpev');if(ke)return 'e:'+ke.dataset.ev;const h=kp.querySelector('h1');if(h)return 'k:'+(h.dataset.xo||h.textContent.trim())}return ''};
 /* 형광펜 적용 */
 const applyHL=(host,item)=>{host.querySelectorAll('mark.mhl,span.mul').forEach(m=>m.replaceWith(...m.childNodes));host.normalize();applyUL(host,item);const L=ME.h.get(item);if(!L)return;
   L.forEach(str=>{const w=document.createTreeWalker(host,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentNode.closest('.mtool,.mtags,.snote,mark,button.hrt')?2:1});let n;while((n=w.nextNode())){const i=n.nodeValue.indexOf(str);if(i<0)continue;const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+str.length);const m=document.createElement('mark');m.className='mhl';m.dataset.hl=str;r.surroundContents(m);break}})};
 const applyUL=(host,item)=>{const L=ME.u.get(item);if(!L)return;L.forEach(ent=>{const j=ent.indexOf('|');const str=j>=0?ent.slice(0,j):ent,term=j>=0?ent.slice(j+1):ent;
   const mk=()=>{const m=document.createElement('span');m.setAttribute('role','button');m.tabIndex=0;m.dataset.ul=ent;if(term.startsWith('@rl:')){m.className='hw mul';m.dataset.rl=term.slice(4)}else if(term.startsWith('@pp:')){m.className='pw mul';m.dataset.person=term.slice(4)}else if(term.startsWith('@nt:')){m.className='nw mul';m.dataset.nt=term.slice(4)}else{m.className='gw mul';m.dataset.gl=term}return m};
   const w=document.createTreeWalker(host,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentNode.closest('.mtool,.mtags,.snote,mark,button,[data-gl],[data-rl],[data-nt],h1,h3')?2:1});let n,done=false;while((n=w.nextNode())){const i=n.nodeValue.indexOf(str);if(i<0)continue;const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+str.length);r.surroundContents(mk());done=true;break}
   if(done)return;
   /* 여러 조각(낱말·인물 이름)에 걸친 글씨 */
   const blocks=[...host.querySelectorAll('p,li,dd,dt,td,.kpd,.mln,.d,span.mseg')].filter(b=>!b.querySelector('p,li,dd,dt,td,.kpd,.mln'));(blocks.length?blocks:[host]).some(bk=>{if(bk.closest('.mtool,.mtags,.snote,h1,h3'))return false;const w2=document.createTreeWalker(bk,NodeFilter.SHOW_TEXT,{acceptNode:x=>x.parentNode.closest('.mul,.mtool,.mtags,.mhlb,.mwdb,.hrt,.mstar2')?2:1});const ns=[];let t='',x;while((x=w2.nextNode())){ns.push([x,t.length]);t+=x.nodeValue}
     const norm=v=>v.replace(/\s+/g,' ');let at=t.indexOf(str);if(at<0){const tn=norm(t),sn=norm(str);if(tn.length!==t.length||tn.indexOf(sn)<0)return false;at=tn.indexOf(sn)}const end=at+str.length;const segs=ns.filter(([x,o])=>o<end&&o+x.nodeValue.length>at);if(!segs.length)return false;
     segs.forEach(([x,o],k)=>{const a=Math.max(0,at-o),b=Math.min(x.nodeValue.length,end-o);if(b<=a)return;const r=document.createRange();r.setStart(x,a);r.setEnd(x,b);const m=mk();if(k<segs.length-1)m.classList.add('mulc');try{r.surroundContents(m)}catch(_){}});return true})})};
 /* 별표·형광펜·태그 막대 */
 const isW=()=>canW;
 const bar=item=>{const st=false,tg=ME.g.get(item)||[];const lk=linksOf(item);const canW=isW()&&editOn;if(!canW&&!tg.length&&!lk.length)return '';const ev=item.startsWith('e:')?EVENTS.find(x=>x.id===+item.slice(2)):null;
   return `<div class="mtool" data-item="${E(item)}">${!canW&&tg.length?`<span class="mtagline">${tg.map(t=>`<a data-tagq="${E(t)}">#${E(t)}</a>`).join('')}</span>`:''}<span class="mtags">${canW?tg.map(t=>`<span class="mtag" data-tagq="${E(t)}">#${E(t)}<i data-rm="${E(t)}" title="지우기">×</i></span>`).join(''):''}${canW?'<button type="button" class="madd">#태그 추가</button>':''}</span>${lk.length||canW?`<span class="mlinks">${lk.map(t=>`<button type="button" class="mlink${t.startsWith('w:')?' mweb':''}" data-go="${E(t)}"${t.startsWith('w:')?` title="${E(wUrl(t))}"`:''}>${t.startsWith('w:')?E(wLab(t))+'<svg class="mwi" viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-8 8M11 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5"/></svg>':E(nameOf(t))}${canW&&(ME.l.get(item)||[]).includes(t)?`<i data-unl="${E(t)}">×</i>`:''}</button>`).join('')}${canW?'<button type="button" class="mladd">+ 연결</button>':''}${canW&&item.match(/^[ekt]:/)?'<button type="button" class="mimgadd">+ 사진</button>':''}</span>`:''}${canW&&ev&&ev.mid?'<button type="button" class="meved">사건 고치기</button>':''}</div>`};
 const decorate=()=>{{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim()&&!window.__decoForce){clearTimeout(window.__decoT);window.__decoT=setTimeout(()=>decorate(),400);return}}try{kindBar()}catch(_){}try{const kb=$('kgbody');const sig=JSON.stringify(ME.h.get('v:kg')||[]);if(kb&&kb.offsetParent&&kb.dataset.hls!==sig){kb.dataset.hls=sig;applyHL(kb,'v:kg')}}catch(_){}setTimeout(()=>{try{const kp=$('kpage');if(!kp||kp.hidden)return;const k=kp.querySelector('.kpin');if(!k)return;let at=k.querySelector(':scope>.kph');if(!at)return;[':scope>.kpsub',':scope>.mtool',':scope>.mnats',':scope>.kpgo'].forEach(q=>{const n=k.querySelector(q);if(n){if(at.nextElementSibling!==n)at.after(n);at=n}})}catch(_){}},0);setTimeout(()=>{try{bandMark()}catch(_){}},0);try{starMarks()}catch(_){}if(document.activeElement&&document.activeElement.classList.contains('mtagin'))return;const kp=$('kpage');if(kp&&!kp.hidden){const h=kp.querySelector('.kph');const item=itemOf(h||kp);if(h&&item){const old=kp.querySelector('.mtool');const html=bar(item);if(old)old.outerHTML=html||'';else if(html)h.insertAdjacentHTML('afterend',html);const host=kp.querySelector('.kpin');if(host){secs(host,item);applyHL(host,item);try{applyStyle(host);applyOrder();liHide()}catch(_){}}}}
   document.querySelectorAll('.evd').forEach(ev=>{const item=itemOf(ev);if(!item)return;const old=ev.querySelector('.mtool');const html=bar(item);if(old)old.outerHTML=html||'';else if(html){let t=ev.querySelector('h2,h3,.ttl,b')||ev.firstElementChild;while(t&&t.parentElement&&t.parentElement!==ev)t=t.parentElement;if(t)t.insertAdjacentHTML('afterend',html)}secs(ev,item);if(!ev.closest('#kpage')){let ab=ev.querySelector(':scope>.msadd');if(isW()&&editOn){if(!ab){const sn=ev.querySelector('.snote');const h='<button type="button" class="msadd">+ 내용 추가</button>';if(sn)sn.insertAdjacentHTML('beforebegin',h);else{const nav=ev.querySelector(':scope>.nav');nav?nav.insertAdjacentHTML('beforebegin',h):ev.insertAdjacentHTML('beforeend',h)}}}else if(ab)ab.remove()}applyHL(ev,item)})};
 const applyAll=()=>{applyText(document.body);decorate();try{decorH(document.body)}catch(_){}};
 let mq=[],mt=0;new MutationObserver(ms=>{if(busy)return;ms.forEach(m=>{if(m.target.closest&&m.target.closest('.mtool,.xing'))return;m.addedNodes.forEach(n=>{if(n.nodeType===1&&!n.classList.contains('mtool')&&!n.classList.contains('mtagin')&&!n.classList.contains('mboxask')&&n.id!=='mglpick')mq.push(n)})});if(!mq.length)return;clearTimeout(mt);mt=0;(()=>{busy=true;try{const q=mq;mq=[];q.forEach(n=>{if(n.isConnected){applyText(n);try{decorH(n)}catch(_){}}});if(q.some(n=>n.isConnected&&n.closest&&n.closest('#pbody')))try{starMarks()}catch(_){}if(q.some(n=>n.isConnected&&(n.closest('#kpage')||n.querySelector&&n.querySelector('.evd')||n.closest('.evd'))))decorate()}finally{setTimeout(()=>busy=false,0)}})()}).observe(document.body,{childList:true,subtree:true});let busy=false;
 /* 주인: 고치기 모드 단추 */
 const mkBtn=()=>{if($('medit'))return;const b=document.createElement('button');b.id='medit';b.type='button';b.className='tib';b.setAttribute('aria-label','글씨 고치기 (나만)');b.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>';
   const hb=$('heartbtn');if(hb)hb.before(b);else document.body.appendChild(b);
   b.onclick=()=>{setTimeout(()=>{try{starMarks();applyBox(document.body);liHide()}catch(_){}},0);editOn=!editOn;if(!editOn){penMode='';document.body.classList.remove('pen-hl','pen-gl')}{const c=$('mpenon');if(!editOn&&c)c.remove()}document.body.classList.toggle('medit',editOn);try{penBox();decorH(document.body)}catch(_){};fBtn();try{decorate()}catch(_){}b.setAttribute('aria-pressed',editOn);toast(editOn?'고치기 모드: 글씨를 눌러 고치세요':'고치기 끝')}};
 document.addEventListener('click',e=>{if(!editOn||!canW||penMode)return;const t=e.target;if(t.closest(SKIP)||t.closest('.msec,.minltag,.mtool,.mform,#mhlfloat,.msec .mced,#mwform,#mwadd,mark.mhl'))return;{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim())return}if(t.isContentEditable||t.closest('[contenteditable="plaintext-only"],[contenteditable="true"]'))return;if(t.closest('.btn,.mevmore,[data-evpage],[data-km],[data-kt],[data-evmap],[data-evtl],[data-kx],[data-go],[data-term],.kpgo,.nav,.tg,.gw,.pw,.hw,.nw'))return;if(t.closest('#dcbody')&&!window.__dcEdit)return;const el=t.closest(SEL);if(!el||el.isContentEditable)return;{const bt=t.closest('button,a');if(bt&&bt!==el)return}if(el.querySelector('div,p,h1,h2,h3,h4,ul,ol,li,section,dl,table')){return}e.preventDefault();e.stopPropagation();
   const HELP='.mevmore,.mstar2,.mboxx,.mboxmv,.mplus,.mevplus,.mced,.mlst,.minltag,.hrt';const txtOf=n=>{if(!n.querySelector(HELP))return n.textContent.trim();const c=n.cloneNode(true);c.querySelectorAll(HELP).forEach(x=>x.remove());return c.textContent.trim()};if(el.dataset.xo&&el.querySelector(HELP)&&/자세히 →$/.test(el.dataset.xo))delete el.dataset.xo;const o=el.dataset.xo||txtOf(el);if(!o)return;el.dataset.xo=o;let itS=itemOf(el);let scoped=!!itS&&(el.matches('h3,h4,b,i,dt,summary,label,.d,.dt,.kpsub>span,.kprows dd')||LBLT.has(o))&&!el.matches('.hrow>h2,.kph h1,#dcbody dt');if(!scoped&&SIMP(el)&&!el.matches('.hrow>h2,#dcbody dt,.gpn')){itS='S';scoped=true}const xk=scoped?'@'+itS+'\u0001'+o:o;const xsm=()=>{if(!ME.xs.has(itS))ME.xs.set(itS,new Map());return ME.xs.get(itS)};const cur=scoped?(xsm().get(o)||txtOf(el)):(ME.x.get(xk)||ME.xg.get(o)||txtOf(el));
   const INL=/^(SPAN|B|I|EM|SMALL|MARK|STRONG|SUB|SUP|A|HR|BR)$/;const rich=[...el.children].some(k=>!INL.test(k.tagName)||k.matches('.mstar2,.mboxx,.hrt,.wbk,.gptag,.gtr,.kpy,.kpnat,.mlst,.tg'));
   const hadGw=!!el.querySelector('.gw');let h=el;const keepDom=!rich&&el.tagName!=='BUTTON'&&el.tagName!=='A'&&!el.querySelector('hr.msep,.mseg,.mln,'+HELP)&&(el.innerText||'').trim()===String(cur).trim();if(keepDom){}else if(rich||el.tagName==='BUTTON'||el.tagName==='A'){const tn=[...el.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim());if(!tn){if(rich)return;}if(tn){h=document.createElement('span');h.className='xinner';h.textContent=cur;tn.replaceWith(h)}else{el.textContent='';h=document.createElement('span');h.className='xinner';h.textContent=cur;el.appendChild(h)}}else h.textContent=cur;
   try{h.contentEditable='plaintext-only'}catch(_){h.contentEditable='true'}if(!h.isContentEditable)h.contentEditable='true';h.classList.add('xing');h.focus();try{const r=document.createRange();r.selectNodeContents(h);r.collapse(false);const sl=getSelection();sl.removeAllRanges();sl.addRange(r)}catch(_){}
   let tm=0;const commit=fin=>{let v=(h.innerText||h.textContent).replace(/\u00a0/g,' ').trim();if(v.includes('#')){if(!fin)return;const tit=titleItem(el);if(!tit){const it=itemOf(el)||headKey(el);const tg=[...v.matchAll(/#([^\s#.,·()\[\]]+)/g)].map(m=>m[1]);if(it&&tg.length){const L=ME.j.get(it)||[];let ch=false;tg.forEach(x=>{if(!L.includes(x)){L.push(x);ch=true}});if(ch){ME.j.set(it,L);save('j:'+it,L)}}}if(tit){const tg=[...v.matchAll(/#([^\s#.,·]+)/g)].map(m=>m[1]);if(tg.length){addTags(tit,tg);v=v.replace(/\s*#[^\s#.,·]+/g,'').replace(/[ \t]{2,}/g,' ').trim()||o;h.textContent=v;toast('태그 '+tg.map(x=>'#'+x).join(' '));setTimeout(()=>{decorate();decorH(document.body)},50)}}}if(!v&&fin)v='\u200b';if(v===o||!v){if(ME.x.has(xk)){ME.x.delete(xk);if(scoped)xsm().delete(o);else ME.xg.delete(o);save('x:'+xk,'')}}else if(v!==ME.x.get(xk)){ME.x.set(xk,v);if(scoped)xsm().set(o,v);else ME.xg.set(o,v);save('x:'+xk,v)}const isYear=el.matches('.d,.dt,.kpsub>span')||(el.matches('.kprows dd')&&(el.previousElementSibling&&/시기/.test(el.previousElementSibling.textContent)));if(fin&&scoped&&/^e:\d+$/.test(itS)&&isYear){const id=itS.slice(2);const lab=(v||o).replace(/\s+/g,' ').trim();const py=parseYear(lab);const ev=EVENTS.find(x=>String(x.id)===id);if(py&&ev){const yv=Object.assign(py.m?{y:py.y,m:py.m}:{y:py.y},{yl:lab});const old=ME.yo.get(id);if(JSON.stringify(old)!==JSON.stringify(yv)){ME.yo.set(id,yv);save('Y:'+id,yv);if(ev.mid&&ME.v.has(ev.mid)){const cv=Object.assign({},ME.v.get(ev.mid),{y:py.y});if(py.m)cv.m=py.m;else delete cv.m;delete cv.d;delete cv.y2;delete cv.m2;delete cv.d2;cv.yl=lab;ME.v.set(ev.mid,cv);save('v:'+ev.mid,cv)}syncYov(true)}}}
     if(fin&&/^e:\d+$/.test(itS)){const ev=EVENTS.find(x=>String(x.id)===itS.slice(2));if(ev&&ev.mid&&ME.v.has(ev.mid)){const cv=Object.assign({},ME.v.get(ev.mid));let ch=false;const nv=(v||o);if(el.matches('.hrow>h2,.kph h1,#v-tl li h3')&&cv.t!==nv){cv.t=nv;ch=true}else if(el.matches('.evd p.ds,#v-tl li[data-id] p')&&cv.x!==nv){cv.x=nv;ch=true}else if(el.matches('.kprows dd')){const lb=(el.previousElementSibling||{}).textContent||'';if(/장소/.test(lb)&&cv.p!==nv){cv.p=nv;ch=true}else if(/인물/.test(lb)&&cv.pp!==nv){cv.pp=nv;ch=true}}if(ch){ME.v.set(ev.mid,cv);save('v:'+ev.mid,cv)}}}};
   h.oninput=()=>{clearTimeout(tm);tm=setTimeout(commit,1500)};h.onblur=()=>{clearTimeout(tm);commit(true);h.removeAttribute('contenteditable');h.classList.remove('xing');const fin=(scoped?xsm().get(o):ME.x.get(xk))||o;if(h!==el&&h.parentNode===el&&el.children.length>1){h.replaceWith(document.createTextNode(fin))}else if(hadGw&&typeof glx==='function'&&!HRRE.test(fin)){el.innerHTML=glx(fin)}else el.textContent=fin;el.style.whiteSpace=fin.includes('\n')?'pre-line':'';if(fin!==o)el.classList.add('xed');try{hrify(el);lineify(el);applyPart(el);inlTags(el)}catch(_){}if(!scoped||itS==='S')setTimeout(()=>{try{applyText(document.body)}catch(_){}},30)};
   h.onkeydown=k=>{k.stopPropagation();if(k.key==='Escape'){k.preventDefault();h.blur();return}if(k.key==='Enter'&&!k.isComposing&&h.classList.contains('xinner')){k.preventDefault();document.execCommand('insertText',false,'\n')}};fmtBar(el,h,o)},true);
 const FCOL=['','#111827','#b91c1c','#c2410c','#a16207','#15803d','#0f766e','#1d4ed8','#6d28d9','#be185d','#6b7280'];
 const FSZ=[11,12,13,14,15,16,17,18,20,22,24,26,28,32,36,40];
 const FMTH=()=>`<div class="mfrow"><button type="button" class="mfdot" data-fdot aria-label="색"><i></i></button><button type="button" data-fb aria-label="굵게">B</button><select data-fs aria-label="글씨 크기" disabled><option>–</option></select><button type="button" data-fr aria-label="원래대로" title="원래대로"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg></button></div><div class="mfrow mfal"><button type="button" data-fa="left" aria-label="왼쪽 정렬"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 10h10M4 14h16M4 18h10"/></svg></button><button type="button" data-fa="center" aria-label="가운데 정렬"><svg viewBox="0 0 24 24"><path d="M4 6h16M7 10h10M4 14h16M7 18h10"/></svg></button><button type="button" data-fa="right" aria-label="오른쪽 정렬"><svg viewBox="0 0 24 24"><path d="M4 6h16M10 10h10M4 14h16M10 18h10"/></svg></button></div><div class="mfrow mfbius" hidden><button type="button" data-fx="it" aria-label="기울임"><i>I</i></button><button type="button" data-fx="ul" aria-label="밑줄"><u>U</u></button><button type="button" data-fx="st" aria-label="취소선"><s>S</s></button></div><div class="mfpal" hidden><span class="mfc">${FCOL.map(c=>`<button type="button" data-fc="${c}" style="${c?'background:'+c:''}" class="${c?'':'mfc0'}" aria-label="${c||'원래 색'}"></button>`).join('')}<label class="mfcc" aria-label="다른 색"><input type="color" data-fcc></label></span></div><div class="mftg"></div>`;
 let fmtOff=null,FT=null;
 /* T = {kind:'el',el,h,o} | {kind:'sel',el,o,str} | {kind:'box',box,key} */
 function fmtOpen(T){penBox();const p=$('mpen');if(!p)return;const f=p.querySelector('.mpfmt');if(fmtOff)fmtOff();FT=T;
   if(T.kind==='el'&&!T.bx){const bx=T.el.closest(BOXSEL);if(bx){T.bx=bx;T.bkey=boxKey(bx)}}let y;if(T.kind==='el'){y=Object.assign({},ME.y.get(T.o)||{});if(T.bx)y.c=ME.bx.get(T.bkey)}else if(T.kind==='sel'){const L=ME.f.get(T.o)||[];y=Object.assign({},L.find(x=>x.s===T.str)||{})}else y={c:ME.bx.get(T.key)};
   f.classList.add('on');f.classList.toggle('box',T.kind==='box');f.innerHTML=FMTH();f.querySelector('.mftg').textContent=T.kind==='box'?'칸 색':T.kind==='sel'?'고른 글씨':T.bx?'색: 칸 · B/크기: 글씨':'글씨 전체';
   const sel=f.querySelector('[data-fs]');const pal=f.querySelector('.mfpal');const tgt=T.kind==='box'?T.box:T.el;
   const curPx=()=>Math.round(parseFloat(getComputedStyle(tgt).fontSize)||16);
   const fillSz=()=>{if(T.kind==='box'){sel.disabled=true;return}const c=y.p||curPx();const L=[...new Set([...FSZ,c])].sort((a,b)=>a-b);sel.innerHTML=L.map(v=>`<option value="${v}"${v===c?' selected':''}>${v}</option>`).join('');sel.disabled=false};
   const mark=()=>{f.querySelector('[data-fb]').classList.toggle('on',!!(y.b>0));if(y.it||y.ul||y.st)f.querySelector('.mfbius').hidden=false;f.querySelectorAll('[data-fx]').forEach(x=>x.classList.toggle('on',x.dataset.fx==='b'?y.b>0:!!y[x.dataset.fx]));f.querySelectorAll('[data-fc]').forEach(b=>b.classList.toggle('on',(b.dataset.fc||'')===(y.c||'')));f.querySelector('.mfdot i').style.background=y.c||(T.kind==='box'||T.bx?'var(--panel)':getComputedStyle(tgt).color)};
   let st=0;const put=()=>{const clean={};if(y.a&&T.kind==='el')clean.a=y.a;if(y.c)clean.c=y.c;if(y.b&&T.kind!=='box')clean.b=y.b;if(y.p&&T.kind!=='box')clean.p=y.p;if(T.kind!=='box'){if(y.it)clean.it=1;if(y.ul)clean.ul=1;if(y.st)clean.st=1}const has=Object.keys(clean).length;clearTimeout(st);
     if(T.kind==='el'){if(T.bx){const bc=clean.c;delete clean.c;const prev=ME.bx.get(T.bkey)||'';if((bc||'')!==prev){bc?ME.bx.set(T.bkey,bc):ME.bx.delete(T.bkey);applyBox(document.body);save('b:'+T.bkey,bc||'')}}const has2=Object.keys(clean).length;has2?ME.y.set(T.o,clean):ME.y.delete(T.o);styEl(T.el,ME.y.get(T.o));T.el.dataset.xy=1;st=setTimeout(()=>save('y:'+T.o,has2?clean:''),500)}
     else if(T.kind==='sel'){const L=(ME.f.get(T.o)||[]).filter(x=>x.s!==T.str);if(has)L.push(Object.assign({s:T.str},clean));L.length?ME.f.set(T.o,L):ME.f.delete(T.o);save('f:'+T.o,L);const reSel=root=>{try{const sp=[...(root||document).querySelectorAll('span.mfx')].find(x=>x.textContent===T.str);if(sp&&sp.isConnected){document.querySelectorAll('.mfxsel').forEach(x=>x.classList.remove('mfxsel'));sp.classList.add('mfxsel');const r=document.createRange();r.selectNodeContents(sp);const sl=getSelection();sl.removeAllRanges();sl.addRange(r);T.el=sp.closest(SEL)||T.el;T.rg=r.cloneRange();FT=T}}catch(_){}};if(T.h&&T.h.isContentEditable){const sec=T.el.closest('section')||T.el.closest('.kpin,.evd');T.h=null;try{document.activeElement&&document.activeElement.blur()}catch(_){}setTimeout(()=>{try{applyPart(sec||document.body);reSel(sec)}catch(_){}},60);setTimeout(()=>reSel(sec&&sec.isConnected?sec:document.querySelector('#kpage .kpin')),800)}else{applyPart(T.el);reSel(T.el)}}
     else{y.c?ME.bx.set(T.key,y.c):ME.bx.delete(T.key);applyBox(document.body);st=setTimeout(()=>save('b:'+T.key,y.c||''),300)}
     mark();fillSz()};
   delete y.z;mark();fillSz();const markA=v=>f.querySelectorAll('[data-fa]').forEach(x=>x.classList.toggle('on',(x.dataset.fa==='left'?'':x.dataset.fa)===(v||'')));markA(T.kind==='el'?y.a:(()=>{const e0=alignTargets(T)[0];return e0?(ME.y.get(e0.dataset.xo||e0.textContent.trim())||{}).a:''})());
   const back=()=>{try{if(T.h&&T.h.isContentEditable)T.h.focus()}catch(_){}};
   const onClick=e=>{const b=e.target.closest('button');if(!b||!f.contains(b))return;e.stopPropagation();if(b.dataset.fa){const av=b.dataset.fa==='left'?'':b.dataset.fa;if(T.kind==='el'){y.a=av;put();back();markA(av);return}if(T.kind==='sel'&&T.h&&T.h.isContentEditable&&(T.h.innerText||'').includes('\n')&&!T.ms){T.h.innerText.split('\n').map(x=>x.trim()).filter(x=>x&&(x.includes(T.str)||T.str.includes(x))).forEach(o2=>{const y2=Object.assign({},ME.y.get(o2)||{});if(av)y2.a=av;else delete y2.a;Object.keys(y2).length?ME.y.set(o2,y2):ME.y.delete(o2);save('y:'+o2,Object.keys(y2).length?y2:'')});markA(av);back();return}if(T.kind==='sel'){const els=alignTargets(T);els.forEach(e2=>{const o2=e2.dataset.xo||e2.textContent.trim();if(!o2)return;e2.dataset.xo=o2;const y2=Object.assign({},ME.y.get(o2)||{});if(av)y2.a=av;else delete y2.a;Object.keys(y2).length?ME.y.set(o2,y2):ME.y.delete(o2);styEl(e2,ME.y.get(o2));e2.dataset.xy=1;save('y:'+o2,Object.keys(y2).length?y2:'')});markA(av);return}return}if(b.hasAttribute('data-fdot')){pal.hidden=!pal.hidden;back();return}if(b.hasAttribute('data-fc')){y.c=b.dataset.fc||undefined;pal.hidden=true}else if(b.hasAttribute('data-fb')){if(T.kind==='box')return;f.querySelector('.mfbius').hidden=false;y.b=y.b>0?0:1}else if(b.dataset.fx){if(T.kind==='box')return;const k=b.dataset.fx;if(k==='b')y.b=y.b>0?0:1;else y[k]=y[k]?0:1}else if(b.hasAttribute('data-fr')){delete y.c;delete y.b;delete y.p;delete y.it;delete y.ul;delete y.st}put();back()};
   f.addEventListener('click',onClick,true);sel.addEventListener('change',()=>{y.p=+sel.value;put();back()});const ci=f.querySelector('[data-fcc]');ci.addEventListener('input',()=>{y.c=ci.value;put()});
   const out=e=>{if(p.contains(e.target))return;if(T.kind==='el'&&(e.target===T.el||T.el.contains(e.target)))return;off()};setTimeout(()=>document.addEventListener('mousedown',out,true),0);
   const off=()=>{document.querySelectorAll('.mfxsel').forEach(x=>x.classList.remove('mfxsel'));document.removeEventListener('mousedown',out,true);f.removeEventListener('click',onClick,true);f.classList.remove('on','box');f.innerHTML=FMTH();if(T.box)T.box.classList.remove('mboxsel');FT=null;fmtOff=null};fmtOff=off;if(T.box)T.box.classList.add('mboxsel')}
 function fmtBar(el,h,o){fmtOpen({kind:'el',el,h,o})}
 function alignTargets(T){if(T.kind!=='sel')return [];if(T.h&&T.h.isContentEditable)return [T.el];const rg=T.rg;if(!rg)return [T.el];{const ml=[...(T.el.closest(SEL)||T.el).querySelectorAll('.mln')].filter(e=>{try{return rg.intersectsNode(e)}catch(_){return false}});if(ml.length)return ml}const root=rg.commonAncestorContainer.nodeType===1?rg.commonAncestorContainer:rg.commonAncestorContainer.parentNode;const sc=root.closest('.kpin,.evd,#pbody,.tl,#dcbody')||root;const L=[...sc.querySelectorAll(SEL)].filter(e=>{try{return rg.intersectsNode(e)}catch(_){return false}}).filter(e=>!e.closest(SKIP)&&!e.querySelector('div,p,li,h1,h2,h3,h4,section,ul,ol,dl'));const own=root.closest(SEL);return L.length?L:(own?[own]:[T.el])}
 /* 글씨 드래그 → 고른 글씨 꾸미기 */
 let selT=0;document.addEventListener('selectionchange',()=>{clearTimeout(selT);selT=setTimeout(()=>{if(!editOn||!canW||penMode)return;const sl=getSelection();const str=sl&&String(sl).trim();if(!str||str.length>200||!sl.rangeCount)return;const rg=sl.getRangeAt(0);const host=rg.commonAncestorContainer;const n=host.nodeType===1?host:host.parentNode;if(!n||!n.closest||n.closest('#mpen'))return;const xi=document.querySelector('.xing');let el,h=null;if(xi){if(!xi.contains(n)&&n!==xi)return;h=xi;el=xi.classList.contains('xinner')?xi.parentElement:xi;if(el.closest('.msec')){const ln=(xi.innerText||xi.textContent).split('\n').map(x=>x.trim()).find(x=>x.includes(str));if(!ln)return;if(FT&&FT.kind==='sel'&&FT.str===str&&FT.o===ln){FT.rg=rg.cloneRange();return}fmtOpen({kind:'sel',el:xi,o:ln,str,h:xi,rg:rg.cloneRange(),ms:1});return}}else{if(n.closest(SKIP))return;el=n.closest(SEL);if(!el){el=[...n.querySelectorAll(SEL)].find(e=>{try{return rg.intersectsNode(e)}catch(_){return false}});if(!el)return}}const o=el.dataset.xo||el.textContent.trim();if(FT&&FT.kind==='sel'&&FT.el===el&&FT.str===str){FT.rg=rg.cloneRange();return}if(xi&&str===xi.textContent.trim())return;fmtOpen({kind:'sel',el,o,str,h,rg:rg.cloneRange()})},120)});
 /* 칸 누르기 → 칸 색 */
 document.addEventListener('click',e=>{if(!editOn||!canW||penMode)return;const t=e.target;if(!t.closest||t.closest(SEL)||t.closest('button,a,input,textarea,select,.mtool,.gw,[data-gl],#mpen,.mboxask,[role=button],[data-rle]'))return;const box=t.closest(BOXSEL);if(!box)return;{const sl=getSelection();if(sl&&!sl.isCollapsed)return}e.preventDefault();e.stopPropagation();fmtOpen({kind:'box',box,key:boxKey(box)});const p=$('mpen');if(p){const pal=p.querySelector('.mfpal');if(pal)pal.hidden=false}},true);
 /* 자세히 화면 목록(관련·같은 시기 사건 등) 하나씩 빼기 */
 function liHide(){const kp=$('kpage');if(!kp||kp.hidden)return;const host=kp.querySelector('.kpin');if(!host)return;const it=itemOf(host);const ed=editOn&&canW;host.querySelectorAll('.kpl>li').forEach(li=>{const b=li.querySelector('[data-kpe],[data-evpage]');if(!b)return;const k=it+'|li|'+(b.dataset.kpe||b.dataset.evpage);if(ME.zh.has(k)){li.style.display='none'}else li.style.display='';let x=li.querySelector(':scope>.mlix');if(ed&&!x){li.insertAdjacentHTML('beforeend',`<button type="button" class="mlix" data-lix="${E(k)}" aria-label="목록에서 빼기">×</button>`)}else if(!ed&&x)x.remove()})}
 document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('.mlix');if(!x)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const k=x.dataset.lix;ME.zh.add(k);save('z:'+k,1);liHide();toast('목록에서 뺐어요 (필통 되돌리기로 살릴 수 있어요)')},true);
 /* 칸 순서 바꾸기 */
 const secId=sc=>{if(sc.classList.contains('msec')&&sc.dataset.cid)return 'c:'+sc.dataset.cid;const h=sc.querySelector(':scope>h3');const t=h?(h.dataset.xo||h.textContent).replace(/#\S+/g,'').trim():'';if(sc.classList.contains('msec'))return 'c:'+(t||'#'+sc.dataset.msi);return t||'#'+[...sc.parentElement.children].indexOf(sc)};
 function applyOrder(){const kp=$('kpage');if(!kp||kp.hidden)return;const host=kp.querySelector('.kpin');if(!host)return;const item=itemOf(host);const ord=ME.ro.get(item);if(!ord)return;const secs=[...host.children].filter(n=>n.tagName==='SECTION');if(secs.length<2)return;const slots=secs.map(n=>{const m=document.createComment('s');n.before(m);return m});const rank=n=>{const i=ord.indexOf(secId(n));return i<0?999+secs.indexOf(n):i};const sorted=secs.slice().sort((a,b)=>rank(a)-rank(b));sorted.forEach((n,i)=>slots[i].replaceWith(n))}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-secmv]');if(!b)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const sc=b.closest('section');const host=sc.parentElement;const item=itemOf(host);if(!item)return;const secs=[...host.children].filter(n=>n.tagName==='SECTION'&&n.style.display!=='none');const i=secs.indexOf(sc),j=i+(+b.dataset.secmv);if(j<0||j>=secs.length)return;const ids=secs.map(secId);[ids[i],ids[j]]=[ids[j],ids[i]];ME.ro.set(item,ids);save('r:'+item,ids);applyOrder();sc.scrollIntoView({block:'nearest',behavior:'smooth'})},true);
 /* 간단히 보는 칸(지도 옆 사건 칸)에서 내용 추가: 거기와 자세히 화면 둘 다 보임 */
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.msadd');if(!b)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const ev=b.closest('.evd');const item=itemOf(ev);if(!item)return;const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);const P=PEND.get(item)||[];P.push({h:'',v:'',id,s:1});PEND.set(item,P);decorate();setTimeout(()=>{const n=[...document.querySelectorAll('.evd .msec[data-cid="'+id+'"]')].find(x=>x.offsetParent);if(n){n.scrollIntoView({block:'center',behavior:'smooth'});const t=n.querySelector('[data-msf=h]');if(t)t.click()}},60)},true);
 /* 칸 사이 + → 그 자리에 빈 내용 칸 */
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-mplus]');if(!b)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const sc=b.closest('section');const host=sc.parentElement;const item=itemOf(host);if(!item)return;const L=[...host.children].filter(n=>n.tagName==='SECTION'&&n.style.display!=='none');const pos=L.indexOf(sc)+(+b.dataset.mplus);const id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);const ids=L.map(secId);ids.splice(pos,0,'c:'+id);ME.ro.set(item,ids);save('r:'+item,ids);const P=PEND.get(item)||[];P.push({h:'',v:'',id});PEND.set(item,P);decorate();setTimeout(()=>{const n=document.querySelector('#kpage .msec[data-cid="'+id+'"]');if(n){n.scrollIntoView({block:'center',behavior:'smooth'});const t=n.querySelector('[data-msf=h]');if(t)t.click()}},60)},true);
 /* 끌어서 칸 옮기기 */
 {let D=null,scT=0;const secList=host=>[...host.children].filter(n=>n.tagName==='SECTION'&&n.style.display!=='none');
  document.addEventListener('pointerdown',e=>{const g=e.target.closest&&e.target.closest('.msgrip');if(!g||!(editOn&&canW))return;e.preventDefault();e.stopPropagation();const sc=g.closest('section');D={sc,host:sc.parentElement,y:e.clientY,id:e.pointerId};sc.classList.add('mdrag');try{g.setPointerCapture(e.pointerId)}catch(_){}},true);
  document.addEventListener('pointermove',e=>{if(!D||e.pointerId!==D.id)return;e.preventDefault();const L=secList(D.host);const i=L.indexOf(D.sc);const prev=L[i-1],next=L[i+1];if(prev){const r=prev.getBoundingClientRect();if(e.clientY<r.top+r.height/2){prev.before(D.sc)}}if(next){const r=next.getBoundingClientRect();if(e.clientY>r.top+r.height/2){next.after(D.sc)}}
    const kp=$('kpage');clearInterval(scT);if(kp){const R=kp.getBoundingClientRect();const dy=e.clientY<R.top+70?-12:e.clientY>R.bottom-70?12:0;if(dy)scT=setInterval(()=>kp.scrollBy(0,dy),16)}},{capture:true,passive:false});
  const end=e=>{if(!D)return;clearInterval(scT);const {sc,host}=D;D=null;sc.classList.remove('mdrag');const item=itemOf(host);if(!item)return;const ids=secList(host).map(secId);const old=ME.ro.get(item);if(JSON.stringify(old)===JSON.stringify(ids))return;ME.ro.set(item,ids);save('r:'+item,ids)};
  document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
  document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.msgrip')){e.preventDefault();e.stopPropagation()}},true)}
 /* 칸 삭제 (× → 한 번 묻기) */
 document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('.mboxx');if(!x)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const box=x.parentElement;document.querySelectorAll('.mboxask').forEach(n=>n.remove());const a=document.createElement('div');a.className='mboxask';a.innerHTML='<span>이 칸을 삭제할까요?</span><button type="button" data-ok>삭제</button><button type="button" data-no>취소</button>';box.prepend(a);box.classList.add('mboxsel');
   a.addEventListener('click',ev=>{ev.stopPropagation();ev.preventDefault();if(ev.target.closest('[data-ok]')){if(box.classList.contains('msec')){const item=itemOf(box);const i=+box.dataset.msi;const N=(ME.c.get(item)||[]).slice();if(i>=N.length){const P=PEND.get(item)||[];P.splice(i-N.length,1);P.length?PEND.set(item,P):PEND.delete(item)}else{N.splice(i,1);N.length?ME.c.set(item,N):ME.c.delete(item);save('c:'+item,N)}a.remove();decorate();toast('칸 삭제 (필통 되돌리기로 살릴 수 있어요)');return}const k=boxKey(box);ME.zh.add(k);save('z:'+k,1);a.remove();box.classList.remove('mboxsel');applyBox(document.body);toast('칸 삭제 (필통 되돌리기로 살릴 수 있어요)')}else if(ev.target.closest('[data-no]')){a.remove();box.classList.remove('mboxsel')}},true)},true);
 /* 형광펜·단어 설명 켜졌거나 글씨를 고르는 중엔 왕·인물·낱말 눌러도 이동 안 함 */
 window.addEventListener('click',e=>{if(!(editOn&&canW))return;const sl=getSelection();const sel=sl&&!sl.isCollapsed&&String(sl).trim();if(!penMode&&!sel)return;const t=e.target.closest&&e.target.closest('[data-king],[data-person],[data-term],[data-kpe],[data-gl],[data-rl],[data-nt],.gw');if(!t||t.closest('#mpen'))return;if(penMode&&penMode!=='hl'&&t.closest('span.mul'))return;e.preventDefault();e.stopImmediatePropagation()},true);
 /* 다른 곳을 누르면 고치기 끝 (아이패드는 빈 곳을 눌러도 안 끝나서) */
 ['pointerdown','touchstart'].forEach(tp=>document.addEventListener(tp,e=>{const x=document.querySelector('.xing');if(!x||x.contains(e.target))return;if(e.target.closest&&e.target.closest('#mpen,#mglpick,.mboxask,#mwform,.mform'))return;try{x.blur()}catch(_){}},{capture:true,passive:true}));
 /* 되돌리기 · 다시 하기 */
 const reload=()=>{load([...CUR.values()])};
 function undo(){const u=UND.pop();if(!u){toast('되돌릴 게 없어요');return}RED.push(u);save(u.k,u.prev?u.prev.v:'',u.prev?(()=>{const x=Object.assign({},u.prev);delete x.k;delete x.v;delete x.at;return x})():undefined,true);reload();toast('되돌림')}
 function redo(){const u=RED.pop();if(!u){toast('다시 할 게 없어요');return}UND.push(u);save(u.k,u.next?u.next.v:'',u.next?(()=>{const x=Object.assign({},u.next);delete x.k;delete x.v;return x})():undefined,true);reload();toast('다시 함')}
 function kindBar(){const kp=$('kpage');if(!kp)return;let k=kp.querySelector('.mkind');const lab=kp.querySelector('.kpbar span');const isP=lab&&lab.textContent==='인물 사전',isT=lab&&/용어 사전|낱말 사전/.test(lab.textContent);const h=kp.querySelector('.kph h1');if(kp.hidden||!(editOn&&canW)||!(isP||isT)||!h){if(k)k.remove();return}const nm=(h.dataset.xo||h.textContent).trim();const cur=isP?'p':'t';
   const html=`<span class="mkind" data-nm="${E(nm)}"><span class="mkseg"><button type="button" data-kind="p" class="${cur==='p'?'on':''}">인물</button><button type="button" data-kind="t" class="${cur==='t'?'on':''}">용어</button></span><button type="button" data-kind="x" class="mkdel">삭제</button></span>`;if(k&&k.dataset.nm===nm&&k.querySelector('.on')?.dataset.kind===cur)return;if(k)k.remove();lab.insertAdjacentHTML('afterend',html)}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.mkind [data-kind]');if(!b||!canW)return;e.preventDefault();e.stopPropagation();const nm=b.closest('.mkind').dataset.nm;const v=b.dataset.kind;
   if(v==='x'){if(!b.classList.contains('arm')){b.classList.add('arm');b.textContent='정말 삭제?';setTimeout(()=>{if(b.isConnected){b.classList.remove('arm');b.textContent='삭제'}},2500);return}ME.n.set(nm,'x');save('n:'+nm,'x');if(ME.w.has(nm)){ME.w.delete(nm);save('w:'+nm,'')}applyWords();$('kpage').hidden=true;toast('「'+nm+'」 삭제 (필통 되돌리기로 살릴 수 있어요)');return}
   if(b.classList.contains('on'))return;ME.n.set(nm,v);save('n:'+nm,v);applyWords();$('kpage').hidden=true;if(v==='p')openPerson(nm);else openTerm(nm);toast(v==='p'?'인물로 바꿈':'용어로 바꿈')},true);
 function titleItem(el){if(!el||!el.matches)return '';const kp=$('kpage');if(kp&&!kp.hidden&&el.matches('#kpage .kph h1'))return itemOf(el);const ev=el.closest('.evd');if(ev&&el.matches('h2')&&el.closest('.hrow'))return itemOf(el);if(el.matches('#dcbody .gl2>div>dt')){const c=el.closest('[data-k]');return c?'k:'+c.dataset.k:''}if(el.matches(HSEL)&&!el.closest(HSKIP)){const t=(el.dataset.xo||el.textContent).trim();return t?'t:'+t:''}return ''}
 function inlTags(root){const r=root&&root.nodeType===1?root:document.body;if(!r.textContent.includes('#'))return;const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT,{acceptNode:n=>{if(!n.nodeValue.includes('#'))return 2;const p=n.parentNode;if(!p||!p.closest||p.closest('a,button,input,textarea,.minltag,.mtool,svg,#mpen,.gidx,.mtagline,.mtags,script,style')||p.isContentEditable)return 2;if(/^#[ㄱ-ㅎ]$|^#숫자$/.test(n.nodeValue.trim()))return 2;return 1}});const L=[];let n;while((n=w.nextNode()))L.push(n);
   L.forEach(n=>{const t=n.nodeValue;const re=/#([^\s#.,·()\[\]]+)/g;if(!re.test(t))return;re.lastIndex=0;const fr=document.createDocumentFragment();let last=0,m;while((m=re.exec(t))){if(m.index>last)fr.appendChild(document.createTextNode(t.slice(last,m.index)));const a=document.createElement('a');a.className='minltag';a.dataset.tagq=m[1];a.textContent='#'+m[1];fr.appendChild(a);last=m.index+m[0].length}if(last<t.length)fr.appendChild(document.createTextNode(t.slice(last)));n.parentNode.replaceChild(fr,n)})}
 const STAR='<svg viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
 function starMarks(){const ed=editOn&&canW;const put=(host,item,after)=>{if(!host||!item)return;let b=host.querySelector(':scope>.mstar2')||(after.querySelector&&after.querySelector(':scope>.mstar2'));const on=ME.s.has(item);if(!on&&!ed){if(b)b.remove();return}if(!b||b.parentElement!==(after.matches&&after.matches('h2')&&after.querySelector('.mevmore')?after:host)){if(b)b.remove();b=document.createElement('button');b.type='button';b.className='mstar2';b.innerHTML=STAR;const mv=after.matches&&after.matches('h2')&&after.querySelector(':scope>.mevmore');if(mv)mv.before(b);else after.after(b)}b.dataset.item=item;b.classList.toggle('on',on);b.disabled=!ed;b.setAttribute('aria-label',on?'별표 빼기':'별표')};
   const kp=$('kpage');if(kp&&!kp.hidden){const h=kp.querySelector('.kph h1');if(h){const it=itemOf(h);const yr=kp.querySelector('.kph .kpy');put(kp.querySelector('.kph'),it,yr&&yr.nextElementSibling&&yr.nextElementSibling.classList.contains('kpnat')?yr.nextElementSibling:yr||h)}}
   document.querySelectorAll('.evd').forEach(ev=>{const it=itemOf(ev);const h=ev.querySelector('.hrow>h2');if(h)put(h.parentElement,it,h)});
   document.querySelectorAll('#pbody li[data-id]>button>.t').forEach(t=>{const on=ME.s.has('e:'+t.closest('li').dataset.id);const m=t.querySelector('.mlst');if(on&&!m)t.insertAdjacentHTML('beforeend','<i class="mlst">'+STAR+'</i>');else if(!on&&m)m.remove()})}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.mstar2');if(!b)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const it=b.dataset.item;ME.s.has(it)?ME.s.delete(it):ME.s.add(it);save('s:'+it,ME.s.has(it)?1:0);starMarks()},true);
 function addTags(item,vs){const L=ME.g.get(item)||[];vs.forEach(v=>{v=v.replace(/^#/,'').trim();if(v&&!L.includes(v))L.push(v)});if(L.length){ME.g.set(item,L);save('g:'+item,L)}}
 const HSEL='h1,h2,h3';const HSKIP='header.top,#kpage .kph,#kpage section,.msec,.mtool,#menupop,#setpop,.glpop,#glpop,#pppop,#mwform,.mform,#mfmt,#mpen,#srch,.tgpage,.tgdef';
 function headKey(el){if(!el||!el.closest)return '';let h=el.matches&&el.matches(HSEL)?el:null;if(!h){let n=el;while(n&&n!==document.body&&!h){let p=n.previousElementSibling;while(p&&!h){if(p.matches(HSEL))h=p;else h=p.querySelector&&[...p.querySelectorAll(HSEL)].pop()||null;p=p.previousElementSibling}n=n.parentElement}}if(!h||h.closest(HSKIP))return '';const t=(h.dataset.xo||h.textContent).trim();return t?'t:'+t:''}
 function decorH(root){const r=root&&root.nodeType===1?root:document.body;const ed=editOn&&canW;const hs=r.matches&&r.matches(HSEL)?[r]:[...r.querySelectorAll(HSEL)];hs.forEach(h=>{if(h.closest(HSKIP)||h.closest('.evd')&&h.closest('.evd').querySelector('.mtool'))return;const t=(h.dataset.xo||h.textContent).trim();if(!t||t.length>40)return;const key='t:'+t;const tg=ME.g.get(key)||[];let nx=h.nextElementSibling;const has=nx&&nx.classList.contains('mhtool')?nx:null;
   if(!ed&&!tg.length){if(has)has.remove();return}
   const html=`<div class="mtool mhtool${tg.length?'':' empty'}" data-item="${E(key)}">${!ed?`<span class="mtagline">${tg.map(x=>`<a data-tagq="${E(x)}">#${E(x)}</a>`).join('')}</span>`:`<span class="mtags">${tg.map(x=>`<span class="mtag" data-tagq="${E(x)}">#${E(x)}<i data-rm="${E(x)}">×</i></span>`).join('')}<button type="button" class="madd">#태그 추가</button></span>`}</div>`;
   if(has){if(has.outerHTML!==html&&!has.querySelector('.mtagin:focus'))has.outerHTML=html}else h.insertAdjacentHTML('afterend',html)})}
 /* 필통: 형광펜·낱말 도구 (끌어서 옮기기) */
 function setPen(m){penMode=penMode===m?'':m;{let c=$('mpenon');if(penMode){if(!c){c=document.createElement('button');c.id='mpenon';c.type='button';document.body.appendChild(c);c.onclick=()=>setPen(penMode)}c.textContent=(penMode==='hl'?'형광펜':penMode==='hr'?'국가유산':penMode==='pp'?'인물 연결':penMode==='nt'?'주석':'단어 설명')+' 켜짐 · 끄기';c.className=penMode}else if(c)c.remove()}document.body.classList.toggle('pen-hl',penMode==='hl');document.body.classList.toggle('pen-gl',penMode==='gl');document.body.classList.toggle('pen-hr',penMode==='hr');document.body.classList.toggle('pen-pp',penMode==='pp');document.body.classList.toggle('pen-nt',penMode==='nt');const p=$('mpen');if(p)p.querySelectorAll('[data-pen]').forEach(b=>{b.classList.toggle('on',b.dataset.pen===penMode);b.setAttribute('aria-pressed',b.dataset.pen===penMode)});toast(penMode==='hl'?'형광펜: 칠할 글씨를 드래그하세요 (칠한 곳 누르면 지움)':penMode==='gl'?'단어 설명: 설명을 띄울 단어를 드래그하세요 (밑줄 누르면 지움)':penMode==='hr'?'국가유산: 연결할 글씨를 드래그하세요 (파란 밑줄 누르면 지움)':penMode==='pp'?'인물 연결: 인물 이름을 드래그하세요 (연결된 이름 누르면 지움)':penMode==='nt'?'주석: 주석 달 글씨를 드래그하세요 (주석 누르면 고치기)':'도구 끔')}
 function penBox(){let p=$('mpen');if(!(editOn&&canW)){if(p)p.hidden=true;return}if(!p){p=document.createElement('div');p.id='mpen';p.innerHTML='<div class="mptop"><button type="button" data-undo aria-label="되돌리기" title="되돌리기"><svg viewBox="0 0 24 24"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg></button><span class="mpgrip" title="끌어서 옮기기">⠿</span><button type="button" data-pmin aria-label="필통 접기" title="접기/펴기"><svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg></button><button type="button" data-redo aria-label="다시 하기" title="다시 하기"><svg viewBox="0 0 24 24"><path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/></svg></button></div><div class="mpfmt">'+FMTH()+'</div><button type="button" data-pen="hl"><span>형광펜</span></button><button type="button" data-pen="gl"><span>단어 설명</span></button><button type="button" data-pen="hr"><span>국가유산</span></button><button type="button" data-pen="pp"><span>인물 연결</span></button><button type="button" data-pen="nt"><span>주석</span></button><button type="button" class="mphr" data-hrline><span>─ 구분선</span></button>';document.body.appendChild(p);
   let pos=null;try{pos=JSON.parse(localStorage.getItem('hgs_penpos')||'null')}catch(_){}const place=(x,y)=>{x=Math.max(4,Math.min(innerWidth-p.offsetWidth-4,x));y=Math.max(60,Math.min(innerHeight-p.offsetHeight-4,y));p.style.left=x+'px';p.style.top=y+'px';return [x,y]};
   requestAnimationFrame(()=>{pos?place(pos[0],pos[1]):place(innerWidth-p.offsetWidth-18,innerHeight*0.42)});addEventListener('resize',()=>place(p.offsetLeft,p.offsetTop));
   p.addEventListener('mousedown',e=>{if(!e.target.closest('input,label,select'))e.preventDefault()});
   let dr=null;p.addEventListener('pointerdown',e=>{if(e.target.closest('.mpfmt,[data-undo],[data-redo],[data-hrline],[data-pmin]'))return;dr={x:e.clientX,y:e.clientY,l:p.offsetLeft,t:p.offsetTop,moved:false,btn:e.target.closest('[data-pen]')};try{p.setPointerCapture(e.pointerId)}catch(_){}});
   p.addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(!dr.moved&&Math.hypot(dx,dy)<5)return;dr.moved=true;p.classList.add('drag');place(dr.l+dx,dr.t+dy)});
   p.addEventListener('pointerup',e=>{if(!dr)return;const d=dr;dr=null;p.classList.remove('drag');if(d.moved){try{localStorage.setItem('hgs_penpos',JSON.stringify([p.offsetLeft,p.offsetTop]))}catch(_){}return}if(d.btn&&d.btn.dataset.pen&&!p.classList.contains('mini'))setPen(d.btn.dataset.pen)});try{if(localStorage.getItem('hgs_pmin'))p.classList.add('mini')}catch(_){}p.addEventListener('click',e=>{if(e.target.closest('[data-pmin]')||(p.classList.contains('mini')&&!e.target.closest('.mpgrip'))){e.stopPropagation();const m=!p.classList.contains('mini');p.classList.toggle('mini',m);try{localStorage.setItem('hgs_pmin',m?'1':'')}catch(_){}return}if(e.target.closest('[data-hrline]')){e.stopPropagation();const a=document.activeElement;if(a&&a.isContentEditable){document.execCommand('insertLineBreak');document.execCommand('insertText',false,'---');document.execCommand('insertLineBreak');a.dispatchEvent(new Event('input'))}else toast('글씨를 고치는 중에 누르면 그 자리에 구분선이 들어가요');return}if(e.target.closest('[data-undo]')){e.stopPropagation();undo()}else if(e.target.closest('[data-redo]')){e.stopPropagation();redo()}},true);
   p.addEventListener('click',e=>{e.stopPropagation()})}
  p.hidden=false;p.querySelectorAll('[data-pen]').forEach(b=>b.classList.toggle('on',b.dataset.pen===penMode))}
 /* 낱말 추가 (고치기 모드에서만) */
 const BASE=new Set(Object.keys(GLOSS));const BASEV=Object.assign({},GLOSS);
 {const gb=glossBookHTML;glossBookHTML=function(PP){PP=Object.assign({},PP||{});const tmp={};ME.n.forEach((v,k)=>{if(v==='x'||v==='t')delete PP[k];else if(v==='p'&&GLOSS[k]!=null){tmp[k]=GLOSS[k];if(!PP[k])PP[k]=GLOSS[k];delete GLOSS[k]}});try{return gb.call(this,PP)}finally{Object.assign(GLOSS,tmp)}}}
 {const ot=openTerm;openTerm=function(k){if(ME.n.get(k)==='p')return openPerson(k);return ot.apply(this,arguments)};const opn=openPerson;openPerson=function(n,T){const b=typeof pbase==='function'?pbase(n):n;if(ME.n.get(b)==='t'){if(GLOSS[b]==null)GLOSS[b]=PINFO[b]||'';return openTerm(b)}return opn.apply(this,arguments)}}
 function applyWords(){Object.keys(GLOSS).forEach(k=>{if(!BASE.has(k))delete GLOSS[k]});BASE.forEach(k=>{if(GLOSS[k]==null&&BASEV[k]!=null)GLOSS[k]=BASEV[k]});ME.w.forEach((v,k)=>{if(!BASE.has(k))GLOSS[k]=v});ME.n.forEach((v,k)=>{if(v==='x')delete GLOSS[k];else if(v==='t'&&GLOSS[k]==null){const P=typeof PEOPLE!=='undefined'&&PEOPLE.get(k);GLOSS[k]=PINFO[k]||(P?P.evs.slice(0,2).map(e=>shortYear(e)+' '+e.t).join(' · '):'')}else if(v==='p'&&!PINFO[k]&&GLOSS[k])PINFO[k]=GLOSS[k]});
   try{GLRE=new RegExp('('+Object.keys(GLOSS).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g');GLRE_SET()}catch(_){}
   const b=$('dcbody');if(b&&b.dataset.built){const nb=b.cloneNode(false);delete nb.dataset.built;b.replaceWith(nb);const j=$('dcjump');if(j){const nj=j.cloneNode(false);j.replaceWith(nj)}if(!$('v-dc')||!$('v-dc').hidden)try{dcShow()}catch(_){}}}
 const wBtn=()=>{let b=$('mwadd');if(!editOn){if(b)b.hidden=true;return}if(!b){b=document.createElement('button');b.id='mwadd';b.type='button';b.textContent='+ 낱말 추가';document.body.appendChild(b);b.onclick=wForm}b.hidden=false};
 const wForm=(kind)=>{if($('mwform'))return;const isP=kind==='p';const f=document.createElement('div');f.id='mwform';f.innerHTML=(isP?'<b>인물 추가</b><input id="mwk" placeholder="이름 (예: 이제현)"><textarea id="mwv" rows="3" placeholder="어떤 사람인지"></textarea>':'<b>낱말 추가</b><input id="mwk" placeholder="낱말 (예: 녹읍)"><textarea id="mwv" rows="3" placeholder="뜻"></textarea>')+'<div><button type="button" data-a="ok">저장</button><button type="button" data-a="x">닫기</button></div><small>'+(isP?'이미 있는 이름을 적으면 고치기 · 설명을 비우면 지우기':'이미 있는 낱말을 적으면 고치기 · 뜻을 비우면 지우기')+'</small>';document.body.appendChild(f);
   const k=f.querySelector('#mwk'),v=f.querySelector('#mwv');k.focus();k.addEventListener('input',()=>{const w=k.value.trim();if(ME.w.has(w))v.value=ME.w.get(w)});
   f.addEventListener('keydown',e=>e.stopPropagation(),true);
   f.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(!a)return;e.stopPropagation();if(a==='x'){f.remove();return}
     const w=k.value.trim(),m=v.value.trim();if(!w){k.focus();return}if(BASE.has(w)){toast('원래 있는 낱말이에요 — 뜻 글씨를 눌러 고치세요');return}
     if(isP&&typeof PEOPLE!=='undefined'&&PEOPLE.has(w)&&!ME.w.has(w)){toast('이미 있는 인물이에요');return}if(m)ME.w.set(w,m);else ME.w.delete(w);save('w:'+w,m);if(isP&&m&&ME.n.get(w)!=='p'){ME.n.set(w,'p');save('n:'+w,'p')}applyWords();f.remove();try{if(typeof f.onDone==='function')f.onDone(m?w:'')}catch(_){}toast(m?(isP?'인물 추가됨':'낱말 추가됨'):(isP?'인물 지움':'낱말 지움'))},true);return f};
 /* 연결: 내가 이어 둔 것 + 거꾸로 이어진 것 */
 function wUrl(t){const j=t.indexOf('\u0001');return j>=0?t.slice(j+1):t.slice(2)}
 function wLab(t){const j=t.indexOf('\u0001');return j>=0?t.slice(2,j):t.slice(2)}
 function wMake(q){const m=q.match(/https?:\/\/\S+/);if(!m)return null;const url=m[0];let lab=q.replace(url,'').trim();if(!lab){try{const h=new URL(url).hostname.replace(/^www\./,'');lab=/sillok/.test(h)?'조선왕조실록':/encykorea/.test(h)?'한국민족문화대백과':/heritage\.go|cha\.go/.test(h)?'국가유산포털':/db\.history/.test(h)?'한국사데이터베이스':/wikipedia/.test(h)?'위키백과':/namu\.wiki/.test(h)?'나무위키':h}catch(_){lab='링크'}}return 'w:'+lab.replace(/\u0001/g,'')+'\u0001'+url}
 function linksOf(item){const out=new Set(ME.l.get(item)||[]);ME.l.forEach((L,k)=>{if(L.includes(item))out.add(k)});out.delete(item);return [...out]}
 /* 내가 추가한 내용 칸 */
 const IMGRE=/^\[\[img:([\w-]+)(?:\|([^|\]]*))?(?:\|(\d+))?\]\]$/;
 function MSBODY(v){return String(v||'').split('\n').map(l=>{const t=l.trim();if(t==='---')return '<hr class="msep">';const m=t.match(IMGRE);if(m){const src=ME.img.get(m[1]);const w=m[3]?+m[3]:100;return `<figure class="mimg" data-img="${m[1]}" style="width:${w}%">${src?`<img src="${src}" alt="${E(m[2]||'')}" loading="lazy">`:'<div class="mimgph">사진 불러오는 중…</div>'}${m[2]?`<figcaption>${E(m[2])}</figcaption>`:''}<span class="mimgtool"><button type="button" data-imgact="size">크기</button><button type="button" data-imgact="cap">설명</button><button type="button" data-imgact="del">×</button></span></figure>`}return t?`<p class="kpd">${glx(l)}</p>`:'<p class="kpd mblank"><br></p>'}).join('')}
 function secs(host,item){if(host.querySelector('.msec .xing'))return;host.querySelectorAll(':scope>.msec,:scope .msec').forEach(n=>n.remove());const L=(ME.c.get(item)||[]).concat(PEND.get(item)||[]);if(!L.length)return;const at=host.querySelector('.snote');
   const MC={'배경':'#b45309','주변 인물':'#047857','과정':'#1d4ed8','결과':'#be185d','의의':'#7c3aed','메모':'#475569'};const PAL=['#0e7490','#c2410c','#4d7c0f','#9f1239','#4338ca','#a16207'];const col=h=>MC[h]||(typeof SEC_COL!=='undefined'&&SEC_COL[h])||PAL[[...String(h)].reduce((a,c)=>a+c.charCodeAt(0),0)%PAL.length];
   const ed=canW&&editOn;const body=MSBODY;const body0=v=>String(v||'').split('\n').map(l=>l.trim()==='---'?'<hr class="msep">':(l.trim()?`<p class="kpd">${glx(l)}</p>`:'')).join('');
   const simple=!host.closest('#kpage');const html=L.map((c,i)=>simple&&!c.s?'':`<section class="msec kpsec kband" data-msi="${i}" data-cid="${E(c.id||'')}" style="--sc:${col(c.h||'메모')};--bc:${col(c.h||'메모')}">${c.h||ed?`<h3 data-msf="h" data-ph="이름 (안 써도 돼요)">${E(c.h||'')}</h3>`:''}${ed?`<span class="mced"><i data-msimg title="사진 넣기">사진</i><i data-cdel="${i}" title="지우기">×</i></span>`:''}<div class="msbody" data-msf="v" data-ph="내용을 쓰세요 (--- 만 쓴 줄은 구분선)">${body(c.v)}</div></section>`).join('');
   if(at)at.insertAdjacentHTML('beforebegin',html);else host.insertAdjacentHTML('beforeend',html)}
 /* 고르기 창 (연결 대상) */
 const CANDS=()=>{const a=[];EVENTS.forEach(e=>a.push({k:'e:'+e.id,n:e.t,s:shortYear(e)+' 사건'}));if(typeof PEOPLE!=='undefined')PEOPLE.forEach(P=>a.push({k:'k:'+P.n,n:P.n,s:'인물'}));Object.keys(GLOSS).forEach(g=>a.push({k:'k:'+g,n:g,s:'낱말'}));return a};
 const picker=(anchorEl,onPick)=>{const box=document.createElement('div');box.className='mpick';box.innerHTML='<input placeholder="사건·인물·낱말 찾기 · 링크 붙여넣기"><div class="mpl"></div><div class="mpwh">링크 앞에 이름을 쓰면 그 이름으로 보여요 (예: 태종실록 https://…)</div>';anchorEl.after(box);const i=box.querySelector('input'),l=box.querySelector('.mpl');const all=CANDS();
   const run=()=>{const q=i.value.trim();if(!q){l.innerHTML='';return}{const w=wMake(q);if(w){l.innerHTML=`<button type="button" class="mpweb" data-pk="${E(w)}"><b>${E(wLab(w))}</b><span>링크 연결 · ${E(wUrl(w).slice(0,48))}</span></button>`;return}}const hits=all.filter(c=>c.n.includes(q)).sort((a,b)=>(a.n.indexOf(q)-b.n.indexOf(q))||a.n.length-b.n.length).slice(0,10);l.innerHTML=hits.map(c=>`<button type="button" data-pk="${E(c.k)}"><b>${E(c.n)}</b><span>${E(c.s)}</span></button>`).join('')||'<span class="mpn">없어요</span>'};
   i.addEventListener('input',run);i.focus();box.addEventListener('mousedown',e=>{if(e.target.closest('[data-pk]'))e.preventDefault()});
   box.addEventListener('click',e=>{const b=e.target.closest('[data-pk]');if(!b)return;e.stopPropagation();box.remove();onPick(b.dataset.pk)},true);
   i.onkeydown=k=>{if(k.key==='Escape'){box.remove()}else if(k.key==='Enter'&&!k.isComposing){const f=l.querySelector('[data-pk]');if(f){box.remove();onPick(f.dataset.pk)}}};i.onblur=()=>setTimeout(()=>box.isConnected&&box.remove(),150)};
 /* 내용 추가 창 */
 const cForm=(item,idx)=>{if($('mcform'))$('mcform').remove();const L=ME.c.get(item)||[];const cur=idx!=null?L[idx]:{h:'',v:''};const f=document.createElement('div');f.id='mcform';f.className='mform';
   f.innerHTML=`<b>내용 ${idx!=null?'고치기':'추가'}</b><input id="mch" placeholder="위에 띄울 이름 (비우면 없음)" value="${E(cur.h)}"><textarea id="mcv" rows="5" placeholder="내용">${E(cur.v)}</textarea><div><button type="button" data-a="ok">저장</button><button type="button" data-a="x">닫기</button></div>`;document.body.appendChild(f);f.querySelector(idx!=null?'#mcv':'#mch').focus();
   f.addEventListener('click',e=>{const h=e.target.dataset&&e.target.dataset.ch;if(h){f.querySelector('#mch').value=h;return}const a=e.target.dataset&&e.target.dataset.a;if(!a)return;e.stopPropagation();if(a==='x'){f.remove();return}
     const hh=f.querySelector('#mch').value.trim(),vv=f.querySelector('#mcv').value.trim();const N=(ME.c.get(item)||[]).slice();if(idx!=null){if(vv)N[idx]={h:hh,v:vv};else N.splice(idx,1)}else if(vv)N.push({h:hh,v:vv});N.length?ME.c.set(item,N):ME.c.delete(item);save('c:'+item,N);f.remove();decorate()},true)};
 /* 사건 추가·고치기 */
 const invLL=(sx,sy)=>{const s=$('map'),P=s.createSVGPoint();P.x=sx;P.y=sy;const q=P.matrixTransform(s.getScreenCTM().inverse());const inv=(F,v,a,b)=>{const up=F(b)>F(a);for(let n=0;n<50;n++){const m=(a+b)/2;((F(m)<v)===up)?a=m:b=m}return (a+b)/2};return [+inv(X,q.x,60,200).toFixed(3),+inv(Y,q.y,-10,80).toFixed(3)]};
 const vForm=mid=>{if($('mvform'))$('mvform').remove();const cur=mid?ME.v.get(mid):{y:'',t:'',x:'',p:'',tp:[]};const f=document.createElement('div');f.id='mvform';f.className='mform';
   f.innerHTML=`<b>사건 ${mid?'고치기':'추가'}</b><input id="mvt" placeholder="사건 이름" value="${E(cur.t||'')}"><div class="mdate"><span class="mdl">언제</span><div class="mrow"><input id="mvy" type="number" placeholder="연도 (기원전은 -)" value="${cur.y??''}"><input id="mvm" type="number" min="1" max="12" placeholder="월" value="${cur.m??''}"><input id="mvd" type="number" min="1" max="31" placeholder="일" value="${cur.d??''}"></div><span class="mdl">~ 언제까지 <small>(기간이면 적고, 아니면 비워 두세요)</small></span><div class="mrow"><input id="mvy2" type="number" placeholder="연도" value="${cur.y2??''}"><input id="mvm2" type="number" min="1" max="12" placeholder="월" value="${cur.m2??''}"><input id="mvd2" type="number" min="1" max="31" placeholder="일" value="${cur.d2??''}"></div></div><div class="mtps"><span class="mdl">분류 (여러 개)</span>${TOPICS.map(t=>`<label class="mtp"><input type="checkbox" value="${t.k}"${(cur.tp||[]).includes(t.k)?' checked':''}><i style="background:var(--t-${t.k})"></i>${t.n}</label>`).join('')}</div><textarea id="mvx" rows="3" placeholder="내용">${E(cur.x||'')}</textarea><input id="mvpp" placeholder="인물 (쉼표로)" value="${E(cur.pp||'')}"><div class="mrow"><input id="mvp" placeholder="장소 이름" value="${E(cur.p||'')}"><button type="button" data-a="pick">📍 지도에서</button></div><small id="mvll">${cur.ll?'위치: '+cur.ll.join(', '):'위치 없음 (지도에 핀 없이 목록에만)'}</small><div><button type="button" data-a="ok">저장</button>${mid?'<button type="button" data-a="del">지우기</button>':''}<button type="button" data-a="x">닫기</button></div><small>저장하면 화면이 한 번 새로 고쳐져요</small>`;
   document.body.appendChild(f);let ll=cur.ll||null;
   f.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(!a)return;e.stopPropagation();if(a==='x'){f.remove();return}
     if(a==='pick'){f.classList.add('picking');showView('map');const vm=$('v-map');const wasLO=vm&&vm.classList.contains('listonly');if(wasLO)vm.classList.remove('listonly');toast('지도에서 위치를 누르세요');let dn=null;
       const down=ev=>{if(!ev.target.closest('#mapwrap,#map'))return;dn={x:ev.clientX,y:ev.clientY}};
       const up=ev=>{if(!dn)return;const mv=Math.hypot(ev.clientX-dn.x,ev.clientY-dn.y);dn=null;if(mv>10||!ev.target.closest('#mapwrap,#map'))return;ev.preventDefault();ev.stopPropagation();ll=invLL(ev.clientX,ev.clientY).map(n=>Math.round(n*1000)/1000);f.querySelector('#mvll').textContent='위치: '+ll.join(', ');f.classList.remove('picking');document.removeEventListener('pointerdown',down,true);document.removeEventListener('pointerup',up,true);if(wasLO)vm.classList.add('listonly');toast('위치 골랐어요')};
       setTimeout(()=>{document.addEventListener('pointerdown',down,true);document.addEventListener('pointerup',up,true)},50);return}
     if(a==='del'){save('v:'+mid,'');ME.v.delete(mid);f.remove();syncEvents(true);return}
     const y=parseFloat(f.querySelector('#mvy').value),t=f.querySelector('#mvt').value.trim();if(isNaN(y)||!t){toast('연도와 사건 이름을 적어 주세요');return}
     const num=(id,lo,hi)=>{const n=parseInt(f.querySelector(id).value);return n>=lo&&n<=hi?n:null};const m=num('#mvm',1,12),dd=num('#mvd',1,31),y2v=parseFloat(f.querySelector('#mvy2').value),y2=isNaN(y2v)?null:y2v,m2=num('#mvm2',1,12),d2=num('#mvd2',1,31);const tps=[...f.querySelectorAll('.mtp input:checked')].map(x=>x.value);const v={y,t,tp:tps.length?tps:['pol'],x:f.querySelector('#mvx').value.trim()||t};if(m)v.m=m;if(dd)v.d=dd;if(y2!=null)v.y2=y2;if(m2)v.m2=m2;if(d2)v.d2=d2;
     {const yl=window.fmtYL?fmtYL(v):'';if(yl)v.yl=yl}const pp=f.querySelector('#mvpp').value.trim();if(pp)v.pp=pp;const p=f.querySelector('#mvp').value.trim();if(p)v.p=p;if(ll)v.ll=ll;
     const id=mid||Date.now().toString(36);ME.v.set(id,v);save('v:'+id,v);f.remove();syncEvents(true)},true);
   f.addEventListener('keydown',e=>e.stopPropagation(),true)};
 function syncYov(now){const O={};[...ME.yo.entries()].sort().forEach(([id,v])=>{if(v&&typeof v.y==='number'){O[id]=v.m?{y:v.y,m:v.m}:{y:v.y};if(v.yl)O[id].yl=String(v.yl)}});const sig=JSON.stringify(O);let old='{}';try{old=JSON.stringify(JSON.parse(window.__YOV_SIG||'{}'))}catch(_){}try{localStorage.setItem('hgs_yov',sig)}catch(_){}if(sig===old||window.__fromCache)return;if(now){let lt='';try{lt=sessionStorage.getItem('hgs_rly')||''}catch(_){}if(lt!==sig){try{sessionStorage.setItem('hgs_rly',sig)}catch(_){}toast('연도 옮기는 중…');setTimeout(()=>location.reload(),600)}}}
 function parseYear(t){t=String(t||'');const bc=/기원전|BC|B\.C/i.test(t);const n=t.match(/\d+/);if(!n)return null;let y=+n[0];if(bc)y=-y;const mm=t.match(/(\d+)\s*월/)||t.replace(/^\D*\d+/,'').match(/^[.\/-](\d{1,2})/);const m=mm?+mm[1]:0;return {y,m:m>=1&&m<=12?m:0}}
 function syncEvents(now){const canon=o=>{if(Array.isArray(o))return o.map(canon);if(o&&typeof o==='object'){const r={};Object.keys(o).filter(k=>k!=='at'&&o[k]!==undefined&&o[k]!==null&&o[k]!=='').sort().forEach(k=>r[k]=canon(o[k]));return r}return o};
   const list=[...ME.v.entries()].sort((a,b)=>a[0]<b[0]?-1:1).map(([id,v])=>canon(Object.assign({mid:id},v)));const sig=JSON.stringify(list);
   const loose=L=>L.map(o=>[o.mid,o.t,String(o.y),String(o.m||''),String(o.x||'').length,(o.ll||[]).join(',')].join('|')).sort().join('\n');let oldL=[];try{oldL=JSON.parse(window.__MYEV_SIG||'[]')}catch(_){}
   try{localStorage.setItem('hgs_myev',sig)}catch(_){}
   if(loose(list)===loose(oldL.map(canon))){window.__MYEV_SIG=sig;const ob=$('mevbar');if(ob)ob.remove();return}if(window.__fromCache)return;
   let lt=0;try{lt=+sessionStorage.getItem('hgs_rlt')||0}catch(_){}
   if(now&&Date.now()-lt>20000){try{sessionStorage.setItem('hgs_rlt',String(Date.now()))}catch(_){}toast('새 사건 반영 중…');setTimeout(()=>location.reload(),600);return}
   /* 다른 기기에서 바뀐 사건: 알림 없이 다음에 열 때 반영 */}
 /* 떠 있는 추가 단추: 사전 화면이면 낱말, 지도·연표면 사건 */
 /* 추가 단추는 그 자리에: 사건 목록 머리(지도 옆 사건 칸·연표), 사전 머리 */
 let fbN=-1;const fBtn=()=>{if(document.querySelector('.xing'))return;const on=editOn&&canW;const old=$('mwadd');if(old)old.hidden=true;
   const place=(id,host,txt,fn,before)=>{let b=$(id);if(!host){if(b)b.hidden=true;return}if(!b){b=document.createElement('button');b.id=id;b.type='button';b.className='maddbtn';b.textContent=txt;b.onclick=e=>{e.stopPropagation();fn()}}if(b.parentNode!==host){if(before&&host.querySelector(before))host.insertBefore(b,host.querySelector(before));else host.appendChild(b)}b.hidden=!on};
   {const old=$('evaddp');if(old)old.remove();const r=$('evaddrow');if(r)r.remove();const L=document.querySelectorAll('#pbody li[data-id],#v-tl ol.tl>li[data-id]');const nP=document.querySelectorAll('.mevplus').length;if(fbN===L.length*10+(on?1:0)&&nP===(on?L.length*2:0))return;fbN=L.length*10+(on?1:0);L.forEach(li=>{const has=li.querySelector(':scope>.mevplus');if(on&&!has)li.insertAdjacentHTML('beforeend','<button type="button" class="mevplus top" data-evplus="0" aria-label="위에 사건 넣기"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button><button type="button" class="mevplus bot" data-evplus="1" aria-label="아래에 사건 넣기"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>');else if(!on&&has)li.querySelectorAll(':scope>.mevplus').forEach(x=>x.remove())})}
   {const t=$('evaddt');if(t)t.remove()}
   place('wdadd',document.querySelector('#dcread .rhead .rin'),'+ 낱말',()=>wForm())};
 setInterval(fBtn,600);
 window.addEventListener('click',e=>{const r=e.target.closest&&e.target.closest('.mevplus');if(!r)return;e.preventDefault();e.stopImmediatePropagation();const li=r.closest('li[data-id]');const id=+li.dataset.id;const ev=EVENTS.find(x=>x.id===id);vForm();if(ev){const yv=$('mvy');if(yv&&!yv.value)yv.value=Math.round(ev.T)}},true);
 /* 연필 모드에서 드래그하면 바로 형광펜 */
 const selMarks=(rg,root)=>[...root.querySelectorAll('mark.mhl,span.mul')].filter(m=>rg.intersectsNode(m));
 const selUp=e=>{if(!editOn||!canW||!penMode)return;if(e.target.closest&&e.target.closest('#mhlfloat,.mpick,.mtool,#mfmt'))return;setTimeout(()=>{const sel=getSelection();const str=sel&&String(sel).trim();if(!str||str.length>300||!sel.rangeCount)return;const rg=sel.getRangeAt(0);const host=rg.commonAncestorContainer;const el=host.nodeType===1?host:host.parentNode;if(el.closest(SKIP))return;const item=itemOf(el);if(!item){toast('자세히 화면이나 사건 설명 안에서 골라 주세요');return}
   if(penMode==='hl'){const L=ME.h.get(item)||[];if(!L.includes(str))L.push(str);ME.h.set(item,L);sel.removeAllRanges();save('h:'+item,L);window.__decoForce=true;try{decorate()}finally{window.__decoForce=false}return}
   if(penMode==='gl'){const r=rg.getBoundingClientRect();glPick(item,str,r)}if(penMode==='hr'){const r=rg.getBoundingClientRect();hrPick(item,str,r)}if(penMode==='pp'){const r=rg.getBoundingClientRect();ppPick(item,str,r)}if(penMode==='nt'){const r=rg.getBoundingClientRect();ntPick(item,str,r)}},10)};
 function glPick(item,str,r){let b=$('mglpick');if(b)b.remove();b=document.createElement('div');b.id='mglpick';b.innerHTML=`<div class="mgh">「${E(str)}」 단어 설명</div><input placeholder="사전에서 찾기" value="${E(str)}"><div class="mgl"></div><button type="button" class="mgnew">+ 새 낱말로 추가하기</button>`;document.body.appendChild(b);
   const x=Math.max(8,Math.min(innerWidth-290,r.left)),y=r.bottom+8+260<innerHeight?r.bottom+8:Math.max(60,r.top-268);b.style.left=x+'px';b.style.top=y+'px';
   const inp=b.querySelector('input'),list=b.querySelector('.mgl');const link=term=>{const L=ME.u.get(item)||[];const ent=term===str?str:str+'|'+term;if(!L.includes(ent))L.push(ent);ME.u.set(item,L);save('u:'+item,L);b.remove();try{getSelection().removeAllRanges()}catch(_){}decorate();toast('「'+term+'」 설명 연결')};
   const run=()=>{const q=inp.value.trim();const ks=Object.keys(GLOSS);const hits=(q?ks.filter(k=>k.includes(q)||q.includes(k)):[]).sort((a,c)=>(a===q?-1:0)-(c===q?-1:0)||a.length-c.length).slice(0,8);list.innerHTML=hits.map(k=>`<button type="button" data-gk="${E(k)}"><b>${E(k)}</b><span>${E(String(GLOSS[k]||'').slice(0,40))}</span></button>`).join('')||'<div class="mgn">사전에 비슷한 낱말이 없어요</div>'};
   run();inp.addEventListener('input',run);inp.onkeydown=e=>{e.stopPropagation();if(e.key==='Escape')b.remove();if(e.key==='Enter'&&!e.isComposing){const f=list.querySelector('[data-gk]');if(f){e.preventDefault();f.click()}}};setTimeout(()=>inp.focus(),0);
   b.addEventListener('mousedown',e=>{if(!e.target.closest('input'))e.preventDefault()});
   b.addEventListener('click',e=>{e.stopPropagation();const k=e.target.closest('[data-gk]');if(k){link(k.dataset.gk);return}if(e.target.closest('.mgnew')){b.remove();wForm();const kk=$('mwk');if(kk){kk.value=str;const v=$('mwv');if(v)v.focus()}const L=ME.u.get(item)||[];if(!L.includes(str)){L.push(str);ME.u.set(item,L);save('u:'+item,L)}decorate();toast('뜻을 적어 저장하세요')}},true);
   setTimeout(()=>{const out=e=>{if(!b.isConnected){document.removeEventListener('mousedown',out,true);return}if(!b.contains(e.target)){b.remove();document.removeEventListener('mousedown',out,true)}};document.addEventListener('mousedown',out,true)},0)}
 document.addEventListener('mouseup',selUp,true);


 function ntPick(item,str,r,old){let b=$('mglpick');if(b)b.remove();b=document.createElement('div');b.id='mglpick';b.className='ntpick';const ov=old?old.slice(old.indexOf('|@nt:')+5):'';b.innerHTML=`<div class="mgh">「${E(str)}」 주석</div><textarea rows="3" placeholder="하고 싶은 말을 쓰세요 (Enter 저장 · Shift+Enter 줄바꿈)">${E(ov)}</textarea><div class="ntbt">${old?'<button type="button" class="ntdel">지우기</button>':''}<button type="button" class="ntok">저장</button></div>`;document.body.appendChild(b);
   const x=Math.max(8,Math.min(innerWidth-290,r.left)),y=r.bottom+8+200<innerHeight?r.bottom+8:Math.max(60,r.top-208);b.style.left=x+'px';b.style.top=y+'px';
   const ta=b.querySelector('textarea');setTimeout(()=>{ta.focus();ta.selectionStart=ta.value.length},0);
   const put=v=>{let L=(ME.u.get(item)||[]).filter(e=>e!==old);if(v)L.push(str+'|@nt:'+v);L.length?ME.u.set(item,L):ME.u.delete(item);save('u:'+item,L);b.remove();try{getSelection().removeAllRanges()}catch(_){}decorate();toast(v?'주석 저장':'주석 지움')};
   ta.onkeydown=e=>{e.stopPropagation();if(e.key==='Escape')b.remove();if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();put(ta.value.trim())}};
   b.addEventListener('mousedown',e=>{if(!e.target.closest('textarea'))e.preventDefault()});
   b.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('.ntok'))put(ta.value.trim());else if(e.target.closest('.ntdel'))put('')},true);
   setTimeout(()=>{const out=e=>{if(!b.isConnected){document.removeEventListener('mousedown',out,true);return}if(!b.contains(e.target)){b.remove();document.removeEventListener('mousedown',out,true)}};document.addEventListener('mousedown',out,true)},0)}
 window.addEventListener('click',e=>{if(!editOn||!canW||penMode!=='nt')return;const u=e.target.closest&&e.target.closest('span.mul.nw');if(!u)return;{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim())return}e.preventDefault();e.stopImmediatePropagation();const item=itemOf(u);if(!item)return;ntPick(item,u.dataset.ul.slice(0,u.dataset.ul.indexOf('|')),u.getBoundingClientRect(),u.dataset.ul)},true);
 {const pop=document.createElement('div');pop.id='ntpop';pop.hidden=true;document.body.appendChild(pop);const hide=()=>{pop.hidden=true};document.addEventListener('scroll',hide,true);
  window.addEventListener('click',e=>{const w=e.target.closest&&e.target.closest('[data-nt]');if(!w){if(!(e.target.closest&&e.target.closest('#ntpop')))hide();return}if(editOn&&canW&&penMode)return;{const sl=getSelection();if(editOn&&sl&&!sl.isCollapsed&&String(sl).trim())return}
   e.preventDefault();e.stopImmediatePropagation();pop.textContent=w.dataset.nt;pop.hidden=false;const r=w.getBoundingClientRect(),W=innerWidth,gw=Math.min(280,W-24);pop.style.maxWidth=gw+'px';pop.style.left='0px';pop.style.top='0px';const pw=pop.offsetWidth;pop.style.left=Math.max(12,Math.min(W-pw-12,r.right-pw/2))+'px';const gh=pop.offsetHeight;pop.style.top=(r.bottom+6+gh<innerHeight-8?r.bottom+6:Math.max(8,r.top-gh-6))+'px'},true)}
 function ppPick(item,str,r){let b=$('mglpick');if(b)b.remove();b=document.createElement('div');b.id='mglpick';b.className='pppick';b.innerHTML=`<div class="mgh">「${E(str)}」 인물 연결</div><input placeholder="인물 찾기" value="${E(str)}"><div class="mgl"></div><button type="button" class="mgnew">+ 새 인물로 추가하기</button>`;document.body.appendChild(b);
   const x=Math.max(8,Math.min(innerWidth-290,r.left)),y=r.bottom+8+260<innerHeight?r.bottom+8:Math.max(60,r.top-268);b.style.left=x+'px';b.style.top=y+'px';
   const inp=b.querySelector('input'),list=b.querySelector('.mgl');const NM=[...new Set([...(typeof PEOPLE!=='undefined'?PEOPLE.keys():[]),...Object.keys(typeof PLIFE!=='undefined'?PLIFE:{}),...[...ME.n].filter(([k,v])=>v==='p').map(([k])=>k)])];
   const nat=n=>{try{const P=PEOPLE.get(n);return P?personNation(P):(PNAT[n]||'')}catch(_){return ''}};
   const link=n=>{const L=ME.u.get(item)||[];const ent=str+'|@pp:'+n;if(!L.includes(ent))L.push(ent);ME.u.set(item,L);save('u:'+item,L);b.remove();try{getSelection().removeAllRanges()}catch(_){}decorate();toast('「'+n+'」 인물 연결')};
   const run=()=>{const q=inp.value.trim().replace(/\s+/g,'');const hits=(q?NM.filter(n=>{const k=n.replace(/\s+/g,'');return k.includes(q)||q.includes(k)}):[]).sort((a,c)=>(a===q?-1:0)-(c===q?-1:0)||a.length-c.length).slice(0,8);
     list.innerHTML=hits.map(n=>{const na=nat(n);return `<button type="button" data-pk="${E(n)}" style="--kc:${(typeof NAT_COL!=='undefined'&&NAT_COL[na])||'#64748b'}"><b>${E(n)}</b><span>${E(na)}</span></button>`}).join('')||'<div class="mgn">비슷한 인물이 없어요</div>'};
   run();inp.addEventListener('input',run);inp.onkeydown=e=>{e.stopPropagation();if(e.key==='Escape')b.remove();if(e.key==='Enter'&&!e.isComposing){const f=list.querySelector('[data-pk]');if(f){e.preventDefault();link(f.dataset.pk)}}};setTimeout(()=>inp.focus(),0);
   b.addEventListener('mousedown',e=>{if(!e.target.closest('input'))e.preventDefault()});
   b.addEventListener('click',e=>{e.stopPropagation();const k=e.target.closest('[data-pk]');if(k){link(k.dataset.pk);return}if(e.target.closest('.mgnew')){const nm=inp.value.trim()||str;b.remove();const f=wForm('p');if(f){const kk=$('mwk');if(kk)kk.value=nm;const v=$('mwv');if(v)v.focus();f.onDone=n=>{if(!n)return;const L=ME.u.get(item)||[];const ent=str+'|@pp:'+n;if(!L.includes(ent))L.push(ent);ME.u.set(item,L);save('u:'+item,L);decorate()}}}},true);
   setTimeout(()=>{const out=e=>{if(!b.isConnected){document.removeEventListener('mousedown',out,true);return}if(!b.contains(e.target)){b.remove();document.removeEventListener('mousedown',out,true)}};document.addEventListener('mousedown',out,true)},0)}
 function hrPick(item,str,r){let b=$('mglpick');if(b)b.remove();b=document.createElement('div');b.id='mglpick';b.className='hrpick';b.innerHTML=`<div class="mgh">「${E(str)}」 국가유산 연결</div><input placeholder="문화유산에서 찾기" value="${E(str)}"><div class="mgl"></div>`;document.body.appendChild(b);
   const x=Math.max(8,Math.min(innerWidth-290,r.left)),y=r.bottom+8+260<innerHeight?r.bottom+8:Math.max(60,r.top-268);b.style.left=x+'px';b.style.top=y+'px';
   const inp=b.querySelector('input'),list=b.querySelector('.mgl');const L0=RLITEMS();
   const link=id=>{const L=ME.u.get(item)||[];const ent=str+'|@rl:'+id;if(!L.includes(ent))L.push(ent);ME.u.set(item,L);save('u:'+item,L);b.remove();try{getSelection().removeAllRanges()}catch(_){}decorate();const e=L0.find(x=>String(x.id)===String(id));toast('「'+(e?rlName(e):str)+'」 국가유산 연결')};
   const run=()=>{const q=inp.value.trim().replace(/\s+/g,'');const nm=e=>rlName(e).replace(/\s+/g,'');const hits=(q?L0.filter(e=>{const n=nm(e);return n.includes(q)||q.includes(n)}):L0).sort((a,c)=>(nm(a)===q?-1:0)-(nm(c)===q?-1:0)||nm(a).length-nm(c).length).slice(0,8);
     list.innerHTML=hits.map(e=>{const [a,bb]=HCLS(e);return `<button type="button" data-rk2="${E(String(e.id))}" style="--kc:${RL_COL[a]}"><b>${E(rlName(e))}</b><span>${E(a+(bb?' · '+bb:''))}</span></button>`}).join('')||'<div class="mgn">문화유산에 비슷한 이름이 없어요</div>'};
   run();inp.addEventListener('input',run);inp.onkeydown=e=>{e.stopPropagation();if(e.key==='Escape')b.remove();if(e.key==='Enter'&&!e.isComposing){const f=list.querySelector('[data-rk2]');if(f){e.preventDefault();link(f.dataset.rk2)}}};setTimeout(()=>inp.focus(),0);
   b.addEventListener('mousedown',e=>{if(!e.target.closest('input'))e.preventDefault()});
   b.addEventListener('click',e=>{e.stopPropagation();const k=e.target.closest('[data-rk2]');if(k)link(k.dataset.rk2)},true);
   setTimeout(()=>{const out=e=>{if(!b.isConnected){document.removeEventListener('mousedown',out,true);return}if(!b.contains(e.target)){b.remove();document.removeEventListener('mousedown',out,true)}};document.addEventListener('mousedown',out,true)},0)}
 {const pop=document.createElement('div');pop.id='rlpop';pop.className='glpop rlpop';pop.hidden=true;document.body.appendChild(pop);
  const hide=()=>{pop.hidden=true};document.addEventListener('scroll',hide,true);
  window.addEventListener('click',e=>{const w=e.target.closest&&e.target.closest('[data-rl]');if(!w){if(!(e.target.closest&&e.target.closest('#rlpop')))hide();return}
   if(editOn&&canW&&(penMode||(()=>{const sl=getSelection();return sl&&!sl.isCollapsed&&String(sl).trim()})()))return;
   e.preventDefault();e.stopImmediatePropagation();try{$('glpop').hidden=true}catch(_){}const it=RLITEMS().find(x=>String(x.id)===w.dataset.rl);if(!it){pop.innerHTML='<b>'+E(w.textContent)+'</b><p>문화유산 목록에서 찾을 수 없어요</p>'}else{const [a,bb]=HCLS(it);const d=((it.x||'').split(/(?<=[.다])\s/)[0]||'');
    pop.innerHTML=`<b>${E(rlName(it))}</b><span class="rlk" style="--kc:${RL_COL[a]}">${E(a+(bb?' · '+bb:''))}</span><p>${E(d)}</p><span class="rlm">${E(RLNAT(it))} · ${E(it.yl||shortYear(it))}${it.p?' · '+E(it.p):''}</span><button type="button" class="ppgo rlgo2" data-rlopen="${E(String(it.id))}">자세히 →</button>`;pop.style.setProperty('--gc2','#2563eb')}
   pop.hidden=false;const r=w.getBoundingClientRect(),W=innerWidth,gw=Math.min(300,W-24);pop.style.width=gw+'px';pop.style.left=Math.max(12,Math.min(W-gw-12,r.left+r.width/2-gw/2))+'px';const gh=pop.offsetHeight;pop.style.top=(r.bottom+8+gh<innerHeight-8?r.bottom+8:Math.max(8,r.top-gh-8))+'px'},true);
  pop.addEventListener('click',e=>{const b=e.target.closest('[data-rlopen]');if(!b)return;e.stopPropagation();const it=RLITEMS().find(x=>String(x.id)===b.dataset.rlopen);hide();if(it)rlOpen(it)})}
document.addEventListener('touchend',selUp,true);
 document.addEventListener('mousedown',e=>{const b=$('mhlfloat');if(b&&!e.target.closest('#mhlfloat'))b.remove()},true);
 /* 형광펜 눌러서 지우기 (연필 켠 상태) — 다른 클릭보다 먼저 */
 window.addEventListener('click',e=>{if(!editOn||!canW||(penMode!=='gl'&&penMode!=='hr'&&penMode!=='pp'))return;const u=e.target.closest&&e.target.closest(penMode==='hr'?'span.mul.hw':penMode==='pp'?'span.mul.pw':'span.mul.gw');if(!u)return;{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim())return}e.preventDefault();e.stopImmediatePropagation();const item=itemOf(u);if(!item)return;const L=(ME.u.get(item)||[]).filter(x=>x!==(u.dataset.ul||u.dataset.gl));L.length?ME.u.set(item,L):ME.u.delete(item);save('u:'+item,L);decorate();toast(u.dataset.rl?'국가유산 밑줄 지움':u.classList.contains('pw')?'인물 연결 지움':'낱말 밑줄 지움')},true);
 window.addEventListener('click',e=>{if(!editOn||!canW)return;const mk=e.target.closest&&e.target.closest('mark.mhl');if(!mk)return;{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim())return}e.preventDefault();e.stopImmediatePropagation();const item=itemOf(mk);if(!item)return;const L=(ME.h.get(item)||[]).filter(x=>x!==mk.dataset.hl);L.length?ME.h.set(item,L):ME.h.delete(item);save('h:'+item,L);decorate();toast('형광펜 지움')},true);
 /* 글 쓰는 중에는 단축키가 안 먹게 (태그 칸·낱말 추가 창·고치는 글씨) */
 ['keydown','keyup','keypress'].forEach(tp=>window.addEventListener(tp,e=>{const t=e.target;if(!(t&&t.closest&&(t.closest('.mtool,#mwform,#mhlfloat,#mglpick')||t.classList.contains('xing'))))return;e.stopImmediatePropagation();if(t.classList.contains('xing')&&(e.key===' '||e.key==='Enter')&&t.closest('button')){if(tp!=='keydown'){e.preventDefault();return}if(e.key===' '){e.preventDefault();document.execCommand('insertText',false,' ');return}}if(tp==='keydown'&&typeof t.onkeydown==='function')t.onkeydown(e)},true));
 /* 별표·형광펜·태그 누르기 */
 document.addEventListener('mousedown',e=>{if(e.target.closest&&e.target.closest('.mhlb,.mwdb'))e.preventDefault()},true);
 document.addEventListener('click',e=>{const tb=e.target.closest&&e.target.closest('.mtool');const mk=e.target.closest&&e.target.closest('mark.mhl');
   if(mk&&canW&&editOn){const item=itemOf(mk);const L=(ME.h.get(item)||[]).filter(x=>x!==mk.dataset.hl);L.length?ME.h.set(item,L):ME.h.delete(item);save('h:'+item,L);decorate();e.stopPropagation();return}
   if(!tb||!canW||e.target.closest('.mpick'))return;e.stopPropagation();const item=tb.dataset.item;
   if(e.target.closest('.mstar')){ME.s.has(item)?ME.s.delete(item):ME.s.add(item);save('s:'+item,ME.s.has(item)?1:0);decorate();return}
   
   const rm=e.target.closest('[data-rm]');if(rm){const L=(ME.g.get(item)||[]).filter(x=>x!==rm.dataset.rm);L.length?ME.g.set(item,L):ME.g.delete(item);save('g:'+item,L);decorate();decorH(document.body);return}
   const un=e.target.closest('[data-unl]');if(un){const L=(ME.l.get(item)||[]).filter(x=>x!==un.dataset.unl);L.length?ME.l.set(item,L):ME.l.delete(item);save('l:'+item,L);decorate();return}
   if(e.target.closest('.mimgadd')){const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.style.display='none';document.body.appendChild(inp);inp.onchange=async()=>{const fl=inp.files&&inp.files[0];inp.remove();if(!fl)return;toast('사진 줄이는 중…');try{const url=await shrink(fl);const pid=Date.now().toString(36)+Math.random().toString(36).slice(2,6);ME.img.set(pid,url);save('p:'+pid,url);const cid='c'+pid;const N=(ME.c.get(item)||[]).slice();N.push({h:'',v:'[[img:'+pid+']]',id:cid});ME.c.set(item,N);save('c:'+item,N);const kp=$('kpage');const host=kp&&!kp.hidden?kp.querySelector('.kpin'):null;if(host){const ids=[...host.children].filter(n=>n.tagName==='SECTION').map(secId);ids.unshift('c:'+cid);ME.ro.set(item,ids);save('r:'+item,ids)}decorate();toast('사진 넣음')}catch(_){toast('사진을 못 읽었어요')}};inp.click();return}
   if(e.target.closest('.mladd')){picker(e.target.closest('.mladd'),k=>{const L=ME.l.get(item)||[];if(!L.includes(k)&&k!==item)L.push(k);ME.l.set(item,L);save('l:'+item,L);decorate()});return}
   if(e.target.closest('.mcadd')){const P=PEND.get(item)||[];P.push({h:'',v:''});PEND.set(item,P);decorate();setTimeout(()=>{const all=document.querySelectorAll('.msec[data-msi]');const last=[...all].filter(x=>itemOf(x)===item).pop();if(last){last.scrollIntoView({block:'center',behavior:'smooth'});const t=last.querySelector('[data-msf=h]');if(t)t.click()}},60);return}
   if(e.target.closest('.meved')){const ev=EVENTS.find(x=>x.id===+item.slice(2));if(ev&&ev.mid)vForm(ev.mid);return}
   if(e.target.closest('.madd')){const b=e.target.closest('.madd');const i=document.createElement('input');i.className='mtagin';i.placeholder='태그';b.replaceWith(i);i.focus();
     const done=ok=>{const vs=i.value.split(/[#,\s]+/).map(x=>x.trim()).filter(Boolean);if(ok&&vs.length)addTags(item,vs);i.onblur=null;i.blur();decorate();decorH(document.body)};
     i.onkeydown=k=>{k.stopPropagation();if(k.key==='Enter'&&!k.isComposing){k.preventDefault();const more=!!i.value.trim();done(true);if(more)setTimeout(()=>{const t=[...document.querySelectorAll('.mtool[data-item]')].find(x=>x.dataset.item===item&&x.offsetParent);const m=t&&t.querySelector('.madd');if(m)m.click()},40)}else if(k.key==='Escape')done(false)};i.onblur=()=>done(true)}},true);
 document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('.mlink[data-go]');if(!g||e.target.closest('[data-unl]'))return;e.preventDefault();e.stopPropagation();if(g.dataset.go.startsWith('w:')){const a=document.createElement('a');a.href=wUrl(g.dataset.go);a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();return}openItem(g.dataset.go)},true);
 document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('[data-ced],[data-cdel]');if(!c||!canW)return;e.preventDefault();e.stopPropagation();const item=itemOf(c);if(!item)return;if(c.dataset.ced!=null)cForm(item,+c.dataset.ced);else{const N=(ME.c.get(item)||[]).slice();const k2=+c.dataset.cdel;if(k2>=N.length){const P=(PEND.get(item)||[]);P.splice(k2-N.length,1);P.length?PEND.set(item,P):PEND.delete(item)}else{N.splice(k2,1);N.length?ME.c.set(item,N):ME.c.delete(item);save('c:'+item,N)}decorate()}},true);
 /* 내용 칸 바로 고치기 (이름·내용) */
 const PEND=window.__PEND||(window.__PEND=new Map());
 const msSave=(sec,item)=>{const i=+sec.dataset.msi;const S=(ME.c.get(item)||[]).slice();const P=(PEND.get(item)||[]).slice();const pend=i>=S.length;const cur=pend?P[i-S.length]:S[i];if(!cur)return;const h=sec.querySelector('[data-msf=h]'),b=sec.querySelector('[data-msf=v]');const hv=h&&h.isContentEditable?h.textContent.trim():(cur.h||'');const bv=b&&b.isContentEditable?b.innerText.replace(/\n{4,}/g,'\n\n\n').trim():(cur.v||'');
   if(pend){const pi=i-S.length;if(bv){S.push(Object.assign({},cur,{h:hv,v:bv}));P.splice(pi,1);ME.c.set(item,S);save('c:'+item,S)}else P[pi]=Object.assign({},cur,{h:hv,v:''});P.length?PEND.set(item,P):PEND.delete(item)}else{if(bv)S[i]=Object.assign({},cur,{h:hv,v:bv});else S.splice(i,1);S.length?ME.c.set(item,S):ME.c.delete(item);save('c:'+item,S)}};
 document.addEventListener('click',e=>{if(!(editOn&&canW))return;if(e.target.closest&&e.target.closest('.msec figure.mimg,.msec [data-msimg]'))return;const f=e.target.closest&&e.target.closest('.msec [data-msf]');const sp=e.target.closest&&e.target.closest('.msec [data-msep]');if(!f&&!sp)return;const sec=(f||sp).closest('.msec');const item=itemOf(sec);if(!item)return;e.preventDefault();e.stopPropagation();
   if(sp){const b=sec.querySelector('[data-msf=v]');if(b&&b.isContentEditable){b.focus();document.execCommand('insertLineBreak');document.execCommand('insertText',false,'---');document.execCommand('insertLineBreak')}else{const i=+sec.dataset.msi;const N=(ME.c.get(item)||[]).slice();if(N[i]){N[i]={h:N[i].h,v:(N[i].v||'')+'\n---\n'};ME.c.set(item,N);save('c:'+item,N.filter(x=>x&&x.v));decorate();setTimeout(()=>{const s2=[...document.querySelectorAll('.msec[data-msi="'+i+'"]')].find(x=>itemOf(x)===item);const bb=s2&&s2.querySelector('[data-msf=v]');if(bb)bb.click()},40)}}return}
   if(f.isContentEditable)return;const i=+sec.dataset.msi;const c=(ME.c.get(item)||[])[i]||{h:'',v:''};const fld=f.dataset.msf;f.textContent=fld==='h'?(c.h||''):(c.v||'');try{f.contentEditable='plaintext-only'}catch(_){f.contentEditable='true'}if(!f.isContentEditable)f.contentEditable='true';f.classList.add('xing');f.focus();try{const r=document.createRange();r.selectNodeContents(f);r.collapse(false);const sl=getSelection();sl.removeAllRanges();sl.addRange(r)}catch(_){}
   f.onkeydown=k=>{k.stopPropagation();if(k.key==='Escape'){k.preventDefault();f.blur()}if(fld==='h'&&k.key==='Enter'&&!k.isComposing){k.preventDefault();const b=sec.querySelector('[data-msf=v]');if(b)b.click();else f.blur()}};
   f.onblur=()=>{const txt=fld==='v'?f.innerText.trim():f.textContent.trim();msSave(sec,item);f.removeAttribute('contenteditable');f.classList.remove('xing');if(fld==='v')f.innerHTML=MSBODY(txt);else f.textContent=txt;clearTimeout(window.__msT);window.__msT=setTimeout(()=>{if(document.querySelector('.msec .xing'))return;decorate()},700)}},true);
 /* 사진 넣기 */
 const shrink=file=>new Promise((res,rej)=>{const fr=new FileReader();fr.onerror=rej;fr.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{let W=im.naturalWidth,H=im.naturalHeight;const M=1280;if(Math.max(W,H)>M){const k=M/Math.max(W,H);W=Math.round(W*k);H=Math.round(H*k)}const c=document.createElement('canvas');let q=.82,url='';for(let i=0;i<6;i++){c.width=W;c.height=H;const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,W,H);g.drawImage(im,0,0,W,H);url=c.toDataURL('image/jpeg',q);if(url.length<700000)break;q-=.12;W=Math.round(W*.85);H=Math.round(H*.85)}res(url)};im.src=fr.result};fr.readAsDataURL(file)});
 const entryOf=(sec,item)=>{const i=+sec.dataset.msi;const S=(ME.c.get(item)||[]).slice();const P=(PEND.get(item)||[]).slice();return {i,S,P,pend:i>=S.length,cur:i>=S.length?P[i-S.length]:S[i]}};
 const setV=(sec,item,fn)=>{const {i,S,P,pend,cur}=entryOf(sec,item);if(!cur)return;const nv=fn(cur.v||'');const ne=Object.assign({},cur,{v:nv});if(pend){P.splice(i-S.length,1);P.length?PEND.set(item,P):PEND.delete(item);if(nv.trim()){S.push(ne)}else{P.splice(i-S.length,0,ne);PEND.set(item,P)}}else{if(nv.trim())S[i]=ne;else S.splice(i,1)}S.length?ME.c.set(item,S):ME.c.delete(item);save('c:'+item,S);decorate()};
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.msec [data-msimg]');if(!b||!(editOn&&canW))return;e.preventDefault();e.stopPropagation();const sec=b.closest('.msec');const item=itemOf(sec);if(!item)return;const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.style.display='none';document.body.appendChild(inp);inp.onchange=async()=>{const fl=inp.files&&inp.files[0];inp.remove();if(!fl)return;toast('사진 줄이는 중…');try{const url=await shrink(fl);const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);ME.img.set(id,url);save('p:'+id,url);setV(sec,item,v=>(v?v.replace(/\s+$/,'')+'\n':'')+'[[img:'+id+']]');toast('사진 넣음')}catch(_){toast('사진을 못 읽었어요')}};inp.click()},true);
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('figure.mimg [data-imgact]');if(!a)return;e.preventDefault();e.stopPropagation();if(!(editOn&&canW))return;const fg=a.closest('figure');const sec=fg.closest('.msec');const item=itemOf(sec);if(!item)return;const id=fg.dataset.img;const act=a.dataset.imgact;
   const edit=fn=>setV(sec,item,v=>v.split('\n').map(l=>{const m=l.trim().match(IMGRE);return m&&m[1]===id?fn(m):l}).filter(x=>x!==null).join('\n'));
   if(act==='size'){const S=[100,75,50,33];edit(m=>{const w=m[3]?+m[3]:100;const nw=S[(S.indexOf(w)+1)%S.length]||100;return `[[img:${id}|${m[2]||''}${nw!==100?'|'+nw:''}]]`})}
   else if(act==='del'){if(!fg.classList.contains('arm')){fg.classList.add('arm');a.textContent='삭제?';setTimeout(()=>{if(a.isConnected){fg.classList.remove('arm');a.textContent='×'}},2500);return}edit(()=>null);ME.img.delete(id);save('p:'+id,'')}
   else if(act==='cap'){let c=fg.querySelector('figcaption');if(!c){c=document.createElement('figcaption');fg.insertBefore(c,fg.querySelector('.mimgtool'))}c.contentEditable='plaintext-only';c.classList.add('xing');c.focus();c.onkeydown=k=>{k.stopPropagation();if(k.key==='Enter'&&!k.isComposing){k.preventDefault();c.blur()}};c.onblur=()=>{const t=c.textContent.replace(/[|\]\n]/g,' ').trim();c.classList.remove('xing');c.removeAttribute('contenteditable');edit(m=>`[[img:${id}|${t}${m[3]&&m[3]!=='100'?'|'+m[3]:''}]]`)}}},true);
 /* 사진 크게 보기 */
 document.addEventListener('click',e=>{const im=e.target.closest&&e.target.closest('figure.mimg img');if(!im||(editOn&&canW))return;e.preventDefault();e.stopPropagation();const o=document.createElement('div');o.className='mimgbig';o.innerHTML=`<img src="${im.src}" alt="">`;o.onclick=()=>o.remove();document.body.appendChild(o)},true);
 /* 내용 칸 이름: 쭉 이어진 띠 (분류 칸은 그대로 알약) */
 const BANDT=new Set(['뜻','내용','어떤 사람','자세히','이야기','설명','더 자세히']);
 function bandMark(){document.querySelectorAll('#kpage .kpin>section:not(.msec),.evd>section:not(.msec)').forEach(sc=>{const h=sc.querySelector(':scope>h3');if(!h)return;const t=(h.dataset.xo||h.textContent).replace(/#\S+/g,'').trim();const on=BANDT.has(t);sc.classList.toggle('kband',on);if(on&&!sc.style.getPropertyValue('--bc'))sc.style.setProperty('--bc',sc.closest('#kpage')?'var(--pc,var(--kc,#0f766e))':'var(--tc,#0f766e)')})}
 /* 태그 모아 보기: 같은 태그 붙은 것들 + 낱말이면 뜻을 맨 위에 */
 const tagPage=tag=>{const p=$('kpage');const items=[...ME.g.entries()].filter(([it,L])=>L.includes(tag)).map(([it])=>it);ME.j.forEach((L,it)=>{if(L.includes(tag)&&!items.includes(it))items.push(it)});const def=GLOSS[tag];
   p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>태그</span></div><div class="kpin tgpage"><div class="kph"><h1>#${E(tag)}</h1></div>
   ${def?`<div class="tgdef"><h3>뜻</h3><p class="kpd">${glx(def)}</p>${GLOSS[tag]?`<button type="button" class="ppgo" data-term="${E(tag)}">낱말 사전에서 보기 →</button>`:''}</div>`:''}
   <div class="tglist">${items.map(it=>{const ev=it.startsWith('e:')?EVENTS.find(x=>String(x.id)===it.slice(2)):null;return `<button type="button" data-go="${E(it)}" class="mlink"><b>${E(nameOf(it))}</b><span>${ev?E(shortYear(ev))+' 사건':(it.startsWith('t:')&&!GLOSS[it.slice(2)]?'제목':typeof PEOPLE!=='undefined'&&PEOPLE.has(it.slice(2))?'인물':'낱말')}</span></button>`}).join('')||'<p class="kpd">아직 이 태그가 붙은 것이 없어요.</p>'}</div></div>`;
   p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true}};
 document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-tagq]');if(!t||e.target.closest('[data-rm]'))return;e.preventDefault();e.stopPropagation();try{closeTree()}catch(_){}tagPage(t.dataset.tagq)},true);
 /* ☰ 메뉴: 화면 + 내가 넣는 메뉴(주소·앱 안 항목) + 고른 메뉴를 묶음으로 */
 {const sb=$('setbtn');if(sb&&!$('menubtn')){const b=document.createElement('button');b.id='menubtn';b.type='button';b.className='tib';b.setAttribute('aria-label','메뉴');b.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';sb.after(b);
   const m=document.createElement('div');m.id='menupop';m.hidden=true;document.body.appendChild(m);
   const VS0=[['map','지도'],['tl','연표'],['ov','연대표'],['ev','사건 모아보기'],['tr','구조도'],['kg','왕계표'],['dc','용어 사전'],['pp','인물'],['ty','조약'],['rl','문화유산']];const VN=Object.fromEntries(VS0);const VS=[['map','지도'],['tr','구조도'],['kg','왕계표'],['ty','조약'],['rl','문화유산']];const BG=[{b:'@tl',n:'연표',items:[['tl','연표'],['ov','연대표'],['ev','사건 모아보기']],at:1},{b:'@dc',n:'사전',items:[['dc','용어 사전'],['pp','인물']],at:4}];
   const goV=v=>{if(v==='ev'){const t=document.querySelector('#tlmenu [data-tv=ev]');if(t){t.click();return}}showView(v)};
   let fold={};try{fold=JSON.parse(localStorage.getItem('hgs_mfold')||'{}')}catch(_){}
   let pend=null;const pick=new Set();
   const cb=key=>`<input type="checkbox" class="mncb" data-sel="${E(key)}"${pick.has(key)?' checked':''}>`;
   const ordBtns=key=>`<span class="mnord"><i data-up="${E(key)}">↑</i><i data-dn="${E(key)}">↓</i></span>`;
   const itemHTML=([k,q],ed,inGroup)=>{const lab0=E(q.n||(q.v?VN[q.v]:'')||q.u||nameOf(q.it||''));let host='';try{host=new URL(q.u).hostname}catch(_){}
     const fav=inGroup?'':(q.u&&host)?`<img class="mnfav" alt="" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64">`:'';const lab=fav+(q.u?'<span class="mnext" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 16L16 8M9.5 8H16v6.5"/></svg></span>':'')+'<span class="mnt">'+lab0+'</span>';
     const del=ed?`<i class="mnx" data-qdel="${E(k)}">×</i>`:'';const c=ed?cb('q:'+k):'';const ob=ed?ordBtns('q:'+k):'';const cls='mni'+(inGroup?' mnin':'');
     if(q.v)return `<div class="mnrowi">${c}<button type="button" class="${cls}" data-mv="${E(q.v)}">${lab}</button>${ob}${del}</div>`;
     if(q.it)return `<div class="mnrowi">${c}<button type="button" class="${cls}" data-qit="${E(q.it)}">${lab}</button>${ob}${del}</div>`;
     return `<div class="mnrowi">${c}<a class="${cls}" href="${E(q.u)}" target="_blank" rel="noopener">${lab}</a>${ob}${del}</div>`};
   const ordIdx=k=>{const i=ME.o.menu.indexOf(k);return i<0?1e6:i};const srt=(arr,keyOf)=>arr.map((x,i)=>[x,i]).sort((a,b)=>(ordIdx(keyOf(a[0]))-ordIdx(keyOf(b[0])))||(a[1]-b[1])).map(x=>x[0]);
   const render=()=>{const ed=canW&&editOn;const all=[...ME.q.entries()].sort((a,b)=>(a[1].at||0)-(b[1].at||0));const G=all.filter(([k,q])=>q.kind==='g'),I=all.filter(([k,q])=>q.kind!=='g');
     const inG=([k,q])=>q.g&&ME.q.has(q.g);const grouped=new Set(I.filter(x=>inG(x)&&x[1].v).map(x=>x[1].v));const loose=I.filter(x=>!inG(x)&&!x[1].v);
     const top0=VS.filter(([v])=>!grouped.has(v)).map(([v,n])=>({key:'v:'+v,v,n}));BG.forEach(g=>{if(g.items.some(([v])=>grouped.has(v))||G.some(([gk,gg])=>(gg.n||'').trim()===g.n))return;top0.splice(Math.min(g.at,top0.length),0,{key:'b:'+g.b,bg:g})});const top=srt([...top0,...G.map(([gk,g])=>({key:'g:'+gk,gk,g}))],x=>x.key);
     m.innerHTML=`<div class="mnh">화면</div><div class="mnv">${top.map(x=>{if(x.bg){const g=x.bg;const f=fold[g.b]!==false;return `<div class="mnrowi"><button type="button" class="mngbtn${f?' fold':''}" data-gfold="${g.b}" data-bfold="1"><span>${g.n}</span></button>${ed?ordBtns(x.key):''}</div>${f?'':`<div class="mntree">${g.items.map(([v,n])=>`<div class="mnrowi"><button type="button" class="mni mnin" data-mv="${v}"><span class="mnt">${n}</span></button></div>`).join('')}</div>`}`}if(x.v)return `<div class="mnrowi">${ed?cb(x.key):''}<button type="button" data-mv="${x.v}">${x.n}</button>${ed?ordBtns(x.key):''}</div>`;
       const its=srt(I.filter(([k,q])=>q.g===x.gk),([k])=>'q:'+k);const f=!!fold[x.gk];return `<div class="mnrowi"><button type="button" class="mngbtn${f?' fold':''}" data-gfold="${E(x.gk)}"><span>${E(x.g.n)}</span></button>${ed?ordBtns(x.key):''}${ed?`<i class="mnx" data-qdel="${E(x.gk)}" title="묶음 풀기">×</i>`:''}</div>${f?'':`<div class="mntree">${its.map(y=>itemHTML(y,ed,true)).join('')||'<span class="mnempty">비어 있어요</span>'}</div>`}`}).join('')}</div>
     <div class="mnh">바로가기</div><div class="mnq">${srt(loose,([k])=>'q:'+k).map(x=>itemHTML(x,ed)).join('')||'<span class="mnempty">아직 없어요</span>'}</div>
     ${ed&&pick.size?`<div class="mngrp"><b>${pick.size}개 고름</b><div class="mnrow"><input id="mqgn" placeholder="묶음 이름" list="mqgl"><datalist id="mqgl">${G.map(([gk,g])=>`<option value="${E(g.n)}">`).join('')}</datalist><button type="button" data-gdo>묶기</button></div><button type="button" class="mnlink" data-gclear>고르기 취소</button></div>`:''}
     ${ed?`<div class="mnadd"><div class="mnh2">메뉴 추가</div><input id="mqn" placeholder="메뉴 이름"><div class="mnrow"><input id="mqu" placeholder="주소 (https://…)"><button type="button" class="mnpick" data-qpick>앱 안에서 고르기</button></div><div class="mnsel">${pend?`<span class="mnpend">${E(nameOf(pend))}<i data-qunpick>×</i></span>`:''}</div><div class="mnrow"><button type="button" data-qadd>추가</button></div><small class="mnhint">묶으려면 메뉴 왼쪽 네모를 고르고 묶음 이름을 적으세요</small></div>`:''}`};
   const fly=document.createElement('div');fly.id='mgpop';fly.hidden=true;document.body.appendChild(fly);
   const openFly=(gk,row)=>{const ed=canW&&editOn;const g=ME.q.get(gk);if(!g){fly.hidden=true;return}const its=[...ME.q.entries()].filter(([k,q])=>q.kind!=='g'&&q.g===gk).sort((a,b)=>(a[1].at||0)-(b[1].at||0));
     fly.innerHTML=`<div class="mgh">${E(g.n)}</div>${its.map(x=>itemHTML(x,ed)).join('')||'<span class="mnempty">비어 있어요</span>'}`;fly.dataset.g=gk;const r=row.getBoundingClientRect(),mr=m.getBoundingClientRect();
     fly.hidden=false;const w=fly.offsetWidth;let left=mr.left-w-6;if(left<8)left=Math.min(innerWidth-w-8,mr.left+20);fly.style.left=left+'px';fly.style.top=Math.min(innerHeight-fly.offsetHeight-8,r.top)+'px'};
   m.openFly=openFly;
   fly.addEventListener('click',e=>{const v=e.target.closest('[data-mv]');if(v&&!(editOn&&canW)&&!e.target.closest('[data-qdel]')){fly.hidden=true;m.hidden=true;$('kpage').hidden=true;goV(v.dataset.mv);return}
     const qi=e.target.closest('[data-qit]');if(qi&&!(editOn&&canW)&&!e.target.closest('[data-qdel]')){fly.hidden=true;m.hidden=true;openItem(qi.dataset.qit);return}
     const a=e.target.closest('a.mni');if(a&&!e.target.closest('[data-qdel]')){fly.hidden=true;return}
     const d=e.target.closest('[data-qdel]');if(d){e.preventDefault();e.stopPropagation();const k=d.dataset.qdel;const q=ME.q.get(k);if(q){if(q.v){ME.q.delete(k);save('q:'+k,'')}else{q.g='';save('q:'+k,q)}}render();const row=m.querySelector(`[data-gopen="${CSS.escape(fly.dataset.g)}"]`);if(row)openFly(fly.dataset.g,row);else fly.hidden=true}});
   fly.addEventListener('change',e=>{const c=e.target.closest('[data-sel]');if(!c)return;c.checked?pick.add(c.dataset.sel):pick.delete(c.dataset.sel);render()});
   document.addEventListener('click',e=>{if(!fly.hidden&&e.target.isConnected&&!e.target.closest('#mgpop,[data-gopen]'))fly.hidden=true});
   const favFix=root=>root.querySelectorAll('img.mnfav').forEach(i=>{if(i.complete&&!i.naturalWidth){const sp=document.createElement('span');i.remove()}else i.onerror=()=>i.remove()});
   new MutationObserver(()=>{favFix(m);favFix(fly)}).observe(m,{childList:true});new MutationObserver(()=>favFix(fly)).observe(fly,{childList:true});
   m.render=render;
   b.onclick=e=>{e.stopPropagation();fly.hidden=true;if(!m.hidden){m.hidden=true;return}render();const tb=document.querySelector('.top').getBoundingClientRect();m.style.setProperty('--mtop',tb.bottom+'px');const cur=store.get('view','map');m.querySelectorAll('[data-mv]').forEach(x=>x.classList.toggle('on',x.dataset.mv===cur));m.hidden=false};
   document.addEventListener('click',e=>{if(!m.hidden&&e.target.isConnected&&!e.target.closest('#menupop,#menubtn,.mpick,#mgpop'))m.hidden=true});
   m.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'&&!e.isComposing&&e.target.id==='mqgn'){const g=m.querySelector('[data-gdo]');if(g)g.click()}},true);
   m.addEventListener('change',e=>{const c=e.target.closest('[data-sel]');if(!c)return;c.checked?pick.add(c.dataset.sel):pick.delete(c.dataset.sel);const keep=(m.querySelector('#mqgn')||{}).value;render();const n=m.querySelector('#mqgn');if(n&&keep)n.value=keep});
   m.addEventListener('click',e=>{if(e.target.closest('[data-sel]'))return;
     const v=e.target.closest('[data-mv]');if(v){if(editOn&&canW&&!e.target.closest('[data-qdel]'))return;if(!e.target.closest('[data-qdel]')){m.hidden=true;$('kpage').hidden=true;goV(v.dataset.mv);return}}
     const d=e.target.closest('[data-qdel]');if(d){e.preventDefault();e.stopPropagation();const k=d.dataset.qdel;const q=ME.q.get(k);ME.q.delete(k);save('q:'+k,'');if(q&&q.kind==='g'){[...ME.q.entries()].forEach(([ik,iq])=>{if(iq.g===k){if(iq.v){ME.q.delete(ik);save('q:'+ik,'')}else{iq.g='';save('q:'+ik,iq)}}})}render();return}
     const mv=e.target.closest('[data-up],[data-dn]');if(mv){e.preventDefault();e.stopPropagation();const key=mv.dataset.up||mv.dataset.dn,dir=mv.dataset.up?-1:1;const row=mv.closest('.mnrowi');const list=row.parentElement;
       const keys=[...list.children].filter(c=>c.classList.contains('mnrowi')).map(c=>{const o=c.querySelector('[data-up]');return o&&o.dataset.up}).filter(Boolean);const i=keys.indexOf(key),j=i+dir;if(i<0||j<0||j>=keys.length)return;[keys[i],keys[j]]=[keys[j],keys[i]];
       const rest=ME.o.menu.filter(k=>!keys.includes(k));ME.o.menu=[...keys,...rest];save('o:menu',ME.o.menu);render();return}
     const go=e.target.closest('[data-gopen]');if(go){if(!fly.hidden&&fly.dataset.g===go.dataset.gopen){fly.hidden=true}else openFly(go.dataset.gopen,go);return}
     const gf=e.target.closest('[data-gfold]');if(gf){const k=gf.dataset.gfold;if(gf.dataset.bfold)fold[k]=fold[k]===false;else fold[k]=!fold[k];try{localStorage.setItem('hgs_mfold',JSON.stringify(fold))}catch(_){}render();return}
     const qi=e.target.closest('[data-qit]');if(qi){if(editOn&&canW)return;m.hidden=true;openItem(qi.dataset.qit);return}
     if(e.target.closest('[data-gclear]')){pick.clear();render();return}
     if(e.target.closest('[data-gdo]')){const n=(m.querySelector('#mqgn').value||'').trim();if(!n){m.querySelector('#mqgn').focus();return}
       let gk=[...ME.q.entries()].find(([k,q])=>q.kind==='g'&&q.n===n);gk=gk?gk[0]:null;if(!gk){gk='g'+Date.now().toString(36);const gv={kind:'g',n,at:Date.now()};ME.q.set(gk,gv);save('q:'+gk,gv)}
       let i=0;pick.forEach(s=>{if(s.startsWith('v:')){const vv=s.slice(2);const ex=[...ME.q.entries()].find(([k,q])=>q.v===vv);const id=ex?ex[0]:'v'+vv+Date.now().toString(36);const val=Object.assign({},ex?ex[1]:{v:vv,n:VN[vv],at:Date.now()+(i++)},{g:gk});ME.q.set(id,val);save('q:'+id,val)}else{const k=s.slice(2);const q=ME.q.get(k);if(q&&q.kind!=='g'){q.g=gk;save('q:'+k,q)}}});
       pick.clear();render();return}
     if(e.target.closest('[data-qpick]')){picker(e.target.closest('[data-qpick]'),k=>{pend=k;const n=m.querySelector('#mqn');const keep=n?n.value:'';render();const n2=m.querySelector('#mqn');if(n2)n2.value=keep||nameOf(k)});return}
     if(e.target.closest('[data-qunpick]')){pend=null;render();return}
     if(e.target.closest('[data-qadd]')){const n=m.querySelector('#mqn').value.trim();let u=m.querySelector('#mqu').value.trim();if(!pend&&!u){m.querySelector('#mqu').focus();return}
       const v=pend?{n:n||nameOf(pend),it:pend,at:Date.now()}:{n:n||u,u:/^https?:\/\//.test(u)?u:'https://'+u,at:Date.now()};const id=Date.now().toString(36);ME.q.set(id,v);save('q:'+id,v);pend=null;render()}})}}
 /* 검색: 내가 고친 글씨·태그·별표도 찾기 */
 const openItem=it=>{try{if(!$('srch').hidden)closeSearch()}catch(_){}if(it.startsWith('t:')){const x=it.slice(2);if(GLOSS[x]){openTerm(x);return}if(typeof PEOPLE!=='undefined'&&PEOPLE.has(x)){openPerson(x);return}$('kpage').hidden=true;const h=[...document.querySelectorAll('h1,h2,h3')].find(n=>(n.dataset.xo||n.textContent).trim()===x&&n.offsetParent);if(h){h.scrollIntoView({block:'center',behavior:'smooth'});h.classList.remove('flash');void h.offsetWidth;h.classList.add('flash');return}openSearch();$('srq').value=x;srRun(x);return}if(it.startsWith('e:')){const e=EVENTS.find(x=>String(x.id)===it.slice(2));if(!e)return;const p=$('trpop');p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button></div></div>`;p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();$('kpage').hidden=true;gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();$('kpage').hidden=true;gotoTimeline(e)};return}if(it.startsWith('k:')){const n=it.slice(2);if(GLOSS[n])openTerm(n);else if(typeof PEOPLE!=='undefined'&&PEOPLE.has(n))openPerson(n);else openTerm(n)}};
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
 try{const c=JSON.parse(localStorage.getItem('hgs_mec')||'null');if(Array.isArray(c)&&c.length){window.__fromCache=true;try{load(c)}finally{window.__fromCache=false}}}catch(_){}
 (async()=>{let ok=false;try{if(window.claude&&claude.use){const [db,us]=await Promise.all([claude.use('db'),claude.use('user')]);if(db){ok=true;canW=!!(us&&await us.isOwner());DB=canW?db:null;if(canW)mkBtn();{let base=[],fs=null;const ap=()=>load(__mergeFS(base,fs));db.collection('mine').onSnapshot(q=>{base=q.docs.map(d=>d.data());ap()},()=>{});__fsPoll('mine',m=>{fs=m;ap()})}applyAll()}}}catch(_){}
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
{const tl=$('tab-tl');if(tl){tl.textContent='연표 ▾';const m=document.createElement('div');m.id='tlmenu';m.hidden=true;m.innerHTML='<button type="button" data-tv="tl">연표</button><button type="button" data-tv="ov">연대표</button><button type="button" data-tv="ev">사건 모아보기</button>';document.body.appendChild(m);
  tl.onclick=e=>{e.stopPropagation();if(!m.hidden){m.hidden=true;return}const r=tl.getBoundingClientRect();m.style.left=r.left+'px';m.style.top=(r.bottom+6)+'px';const v=window.__evOnly?'ev':store.get('view','map');m.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tv===v));m.hidden=false};
  m.addEventListener('click',e=>{const b=e.target.closest('[data-tv]');if(!b)return;m.hidden=true;const v=b.dataset.tv;if(v==='ev'){showView('map');window.__evOnly=true;const vm=$('v-map');if(vm)vm.classList.add('listonly');const p=$('panel');if(p)p.classList.add('open');tl.setAttribute('aria-selected','true');const mt=document.querySelector('.tabs [data-v="map"]');if(mt)mt.setAttribute('aria-selected','false');tl.textContent='사건 모아보기 ▾';setTimeout(()=>dispatchEvent(new Event('resize')),50);return}if(v==='rl'){showView('rl');rlShow()}else{if(v==='tl'&&typeof tlHeart!=='undefined'&&tlHeart){tlHeart=false;renderTLFilter()}showView(v)}});
  document.addEventListener('click',e=>{if(!m.hidden&&!e.target.closest('#tlmenu,#tab-tl'))m.hidden=true});
  const sv=showView;showView=function(v){window.__evOnly=false;{const vm=$('v-map');if(vm&&vm.classList.contains('listonly')){vm.classList.remove('listonly');setTimeout(()=>dispatchEvent(new Event('resize')),50)}}const r=sv.apply(this,arguments);try{store.set('view',v)}catch(_){}tl.setAttribute('aria-selected',['tl','ov'].includes(v));{const X_=window.__ME&&window.__ME.xg,w=v==='ov'?'연대표':'연표';tl.textContent=((X_&&X_.get(w))||w)+' ▾'}if(v==='rl')try{rlShow()}catch(_){}return r};
  if(store.get('view','map')==='rl')setTimeout(()=>{showView('rl')},0)}}
/* 유적·유물 모아 보기 */
const RL_KIND=e=>{if(e.kind)return e.kind;const t=e.t;if(e.tp.includes('war')||/건국|병합|천도|전투|탕평|박해|수신사|전등/.test(t))return null;
  if(/유적|동굴|패총|암각화|고인돌/.test(t))return '유적';if(/『|대장경|직지|훈민정음|지도|실록/.test(t))return '기록 유산';
  if(/탑|궁|황룡사|부석사|석굴암|불국사|서원|화성|첨성대|왕릉|릉 |천리장성|비 건립|비·|정계비|척화비|순수비|중건/.test(t))return '건축·비석';if(/신종|측우기|금관|토기|동검|청자|백자|활자|불상/.test(t))return '유물';return null};
const rlName=e=>e.t.replace(/\s*·\s*농경 시작$/,'').replace(/중건 시작$/,'중건').replace(/\s*(건립 시작|건립|완성|제작|축조|편찬|간행|인쇄|완공|창제|발행|반포)$/,'').trim();
const RL_COL={'유적건조물':'#b45309','유물':'#be185d','기록유산':'#047857','무형유산':'#7c3aed','자연유산':'#15803d','등록문화유산':'#0e7490'};let rlKind='',rlSub='';
/* 국가유산 유형 분류(대분류 · 중분류)에 맞춘 나눔 */
const HCLS=e=>{const r=HCLS0(e);if(r[0]==='유적건조물'&&r[1]!=='무덤'&&r[1]!=='정치국방')return [r[0],r[1]==='인물사건'?'정치국방':''];if(r[0]==='유물'){const m={'생활공예':'공예','불교공예':'공예','과학기술':'과학기술','회화':'회화','조각':'조각'};return [r[0],m[r[1]]||'공예']}return r};
const HCLS0=e=>{if(e.hc)return e.hc;const t=e.t;const R=[[/^『|대장경|직지|훈민정음|대동여지도|한성순보/,'기록유산','전적류'],[/신종/,'유물','불교공예'],[/청자|백자|토기/,'유물','생활공예'],[/측우기|자격루|혼천의/,'유물','과학기술'],[/금관|동검/,'유물','생활공예'],
  [/비$|비·|비 |정계비|척화비|순수비|릉비/,'유적건조물','인물사건'],[/고인돌|왕릉|무령|고분|무덤/,'유적건조물','무덤'],[/석탑|목탑|불국사|석굴암|황룡사|부석사|종묘/,'유적건조물','종교신앙'],[/궁|화성|산성|장성/,'유적건조물','정치국방'],[/서원|향교|첨성대/,'유적건조물','교육문화'],
  [/암각화/,'유적건조물','종교신앙'],[/유적|동굴|패총/,'유적건조물','유물산포지·선사 유적']];const n=rlName(e);for(const [r,a,b] of R)if(r.test(n)||r.test(t))return [a,b];const k=RL_KIND(e);return k==='기록 유산'?['기록유산','전적류']:k==='유물'?['유물','기타']:['유적건조물','기타']};
/* 같은 문화유산은 하나로: 경복궁(창건·소실·중건), 종묘 */
const RL_MERGE=['경복궁·종묘 건립','경복궁 중건 시작'];
let RL_CACHE=null,RL_SIG='';function RLITEMS(){{const H=window.__ME&&window.__ME.hr;const sg=H?JSON.stringify([...H]):'';if(sg!==RL_SIG){RL_SIG=sg;RL_CACHE=null}}if(RL_CACHE)return RL_CACHE;const byT=t=>EVENTS.find(e=>e.t===t);const L=EVENTS.filter(e=>RL_KIND(e)&&!RL_MERGE.includes(e.t));
 const a=byT('경복궁·종묘 건립'),b=byT('경복궁 중건 시작');const era=(a&&a.era)||'joseon1';
 L.push({id:'x-gbg',kind:'건축·비석',t:'경복궁',y:1395,T:1395,era,yl:'1395 창건 · 1867 중건',p:'서울',ll:[126.977,37.579],tp:['cul'],cz:[a,b].filter(Boolean),
  x:'조선의 법궁(으뜸 궁궐). 1395년 한양 천도와 함께 태조 때 세웠다. 임진왜란(1592) 때 불타 270여 년 동안 빈터로 남았다. 흥선 대원군이 왕실의 권위를 다시 세우려고 1865년부터 다시 지어 1867년에 완공하였다(중건). 이때 원납전을 걷고 당백전을 발행하여 백성의 부담이 커졌다. 일제 강점기에는 많은 건물이 헐리고 조선 총독부 청사가 세워졌다.'});
 L.push({id:'x-jm',kind:'건축·비석',t:'종묘',y:1395,T:1395.01,era,yl:'1395',p:'서울',ll:[126.994,37.574],tp:['cul'],cz:[a].filter(Boolean),
  x:'조선 왕과 왕비의 신주를 모신 왕실 사당. 1395년 경복궁과 함께 세웠다. 임진왜란 때 불탔다가 광해군 때 다시 지었다. 종묘 제례와 종묘 제례악이 지금까지 이어진다.'});
 const ev=t=>EVENTS.find(e=>e.t===t);const eraOf=T=>{let f=0;for(let j=0;j<FRAMES.length;j++)if(FRAMES[j].t<=T)f=j;return FRAMES[f].era};
 [{id:'x-jmjr',hc:['무형유산','전통 공연·예술'],t:'종묘 제례악',y:1464,T:1464,yl:'조선 전기',p:'서울 종묘',ll:[126.994,37.574],x:'종묘에서 왕실 조상에게 제사를 지낼 때 연주하는 음악과 춤. 세종 때 만든 보태평·정대업을 바탕으로 한다. 종묘 제례와 함께 유네스코 인류무형유산이다.'},
  {id:'x-psr',hc:['무형유산','전통 공연·예술'],t:'판소리',y:1750,T:1750,yl:'조선 후기',p:'전라도 일대',ll:[127.0,35.3],x:'소리꾼이 고수의 북장단에 맞춰 이야기를 노래(창)·말(아니리)·몸짓(발림)으로 풀어내는 공연. 서민 문화가 발달한 조선 후기에 널리 퍼졌다. 춘향가·심청가 등이 전해진다.'},
  {id:'x-tch',hc:['무형유산','전통 공연·예술'],t:'탈춤',y:1760,T:1760,yl:'조선 후기',p:'안동 하회 등',ll:[128.52,36.54],x:'양반을 풍자하고 서민의 삶을 담은 탈놀이. 하회 별신굿 탈놀이·봉산 탈춤·양주 별산대놀이 등이 있다.'},
  {id:'x-bgsy',hc:['유물','조각'],t:'금동 미륵보살 반가 사유상',y:610,T:610,yl:'삼국 시대(7세기 전반)',p:'국립중앙박물관',ll:[126.98,37.524],x:'한쪽 다리를 무릎에 얹고 생각에 잠긴 보살을 표현한 금동 불상. 삼국 시대 불교 조각의 대표작으로, 일본 고류지의 목조 반가 사유상과 매우 닮았다.'},
  {id:'x-smsj',hc:['유물','조각'],t:'서산 용현리 마애 여래 삼존상',y:600,T:600,yl:'백제(6세기 말~7세기 초)',p:'서산',ll:[126.62,36.77],x:'바위에 새긴 백제의 불상. 온화한 웃음 때문에 "백제의 미소"라고 불린다.'},
  {id:'x-iwj',hc:['유물','회화'],t:'인왕제색도',y:1751,T:1751,yl:'1751',p:'서울 인왕산',ll:[126.958,37.585],x:'정선이 비 갠 뒤의 인왕산을 그린 그림. 우리 산천을 직접 보고 그린 진경산수화의 대표작이다.'},
  {id:'x-khd',hc:['유물','회화'],t:'김홍도 풍속화',y:1780,T:1780,yl:'18세기 후반',p:'조선',x:'김홍도가 서당·씨름·대장간 등 서민의 일상을 그린 풍속화. 『단원 풍속도첩』에 실려 있다.'},
  {id:'x-dokdo',hc:['자연유산','천연기념물'],t:'독도',y:1900,T:1900.9,yl:'1900 울도군 관할',p:'울릉군',ll:[131.87,37.24],cz:[ev('대한 제국 칙령 제41호')].filter(Boolean),x:'동도·서도와 여러 부속 섬으로 이루어진 섬. 1900년 대한 제국 칙령 제41호로 울도군이 석도(독도)를 관할하게 하였다. 천연보호구역(천연기념물)으로 지정되어 있다.'},
  {id:'x-jgsf',hc:['등록문화유산','근대 유물'],t:'진관사 태극기',y:1919,T:1919.3,yl:'1919 무렵',p:'서울 진관사',ll:[126.938,37.638],cz:[ev('3·1 운동')].filter(Boolean),x:'2009년 서울 진관사 칠성각을 고치다가 독립 신문들에 싸인 채 발견된 태극기. 일장기 위에 태극과 4괘를 덧그려 만들었다. 3·1 운동 무렵의 독립 의지를 보여 준다.'}
 ].forEach(o=>{o.era=eraOf(o.T);o.tp=['cul'];o.kind='x';L.push(o)});
 {const H=window.__ME&&window.__ME.hr;if(H)H.forEach((v,k)=>{const NT={'선사 시대':-5000,'고조선':-1000,'부여':0,'고구려':300,'백제':400,'신라':500,'가야':300,'통일 신라':800,'발해':800,'후삼국':910,'고려':1150,'조선':1600,'대한제국':1900,'일제강점기':1930,'대한민국':1980};const hasY=v.y!=null&&v.y!=='';const y=hasY?+v.y:(NT[v.nat]!=null?NT[v.nat]:null);const o={id:'h-'+k,cust:k,hc:[v.k1||'유적건조물',v.k2||''],t:v.t,y:y==null?9999:y,T:y==null?9999:y,yl:v.yl||(hasY?'':'연도 모름'),p:v.p||'',x:v.x||'',nat:v.nat||'',noY:!hasY};if(v.ll)o.ll=v.ll;o.era=y==null?'unk':eraOf(o.T);o.tp=['cul'];o.kind='x';L.push(o)})}
 RL_CACHE=L.sort((x,y)=>x.T-y.T);return RL_CACHE}
/* 국가유산 나라 */
const RL_NATS=['선사 시대','고조선','부여','고구려','백제','신라','가야','통일 신라','발해','후삼국','고려','조선','대한제국','일제강점기','대한민국','나라 불분명'];
function RLNAT(e){if(e.nat)return e.nat;if(e.era==='prehist')return '선사 시대';const src=rlName(e)+' '+(e.yl||'')+' '+(e.x||'');let best='',bi=1e9;['고조선','부여','고구려','백제','신라','가야','발해','고려','조선','대한 제국','대한제국'].forEach(n=>{let i=src.indexOf(n);while(i>=0){const pv=src[i-1]||'';if((n==='백제'||n==='고구려')&&pv==='후'){i=src.indexOf(n,i+1);continue}if(n==='조선'&&pv==='고'){i=src.indexOf(n,i+1);continue}if(n==='신라'&&pv==='통'){}break}if(i>=0&&i<bi){bi=i;best=n}});
 if(best==='대한 제국')best='대한제국';const era=e.era;
 if(era==='colonial')return '일제강점기';if(era==='contemp')return '대한민국';if(era==='goryeo')return '고려';if(era==='joseon1'||era==='joseon2')return '조선';if(era==='hsk')return best==='고려'?'고려':'후삼국';
 if(era==='modern1')return e.T>=1897?'대한제국':'조선';if(era==='nsk')return best==='발해'?'발해':'통일 신라';if(best)return best;try{const R=kingRef(e);if(R&&R.D&&R.D.n)return R.D.n}catch(_){}if(era==='pre')return '고조선';return '나라 불분명'}
function rlShow(){const L=RLITEMS();const BIG=Object.keys(RL_COL);
 const subs=rlKind?[...new Set(L.filter(e=>HCLS(e)[0]===rlKind).map(e=>HCLS(e)[1]).filter(Boolean))]:[];
 $('rlchips').innerHTML=['',...BIG].map(k=>`<button type="button" data-rk="${k}" aria-pressed="${rlKind===k}" style="--kc:${RL_COL[k]||'var(--ink)'}">${k||'전체'} ${L.filter(e=>!k||HCLS(e)[0]===k).length}</button>`).join('')+(subs.length?`<span class="rlsubs">${['',...subs].map(x=>`<button type="button" data-rs="${x}" aria-pressed="${rlSub===x}" style="--kc:${RL_COL[rlKind]}">${x||'모두'}</button>`).join('')}</span>`:'');
 const ok=e=>{const [a,b]=HCLS(e);return (!rlKind||a===rlKind)&&(!rlSub||b===rlSub)};
 let rlMode='nat';try{rlMode=localStorage.getItem('hgs_rlmode')||'nat'}catch(_){}
 {const hd=document.querySelector('#v-rl .rlhd');if(hd&&!hd.querySelector('.rlmode')){hd.querySelector('h2').insertAdjacentHTML('afterend','<div class="rlmode"><button type="button" class="rlmb" data-rlmb aria-haspopup="true"></button><div class="rlmp" hidden><button type="button" data-rlm="nat">나라별</button><button type="button" data-rlm="era">시기별</button><button type="button" data-rlm="kind">항목별</button></div></div><button type="button" class="rladd" data-rladd hidden>+ 국가유산</button>')}
  const mb=hd&&hd.querySelector('[data-rlmb]');if(mb)mb.innerHTML=`<span>묶어 보기</span><b>${{nat:'나라별',era:'시기별',kind:'항목별'}[rlMode]}</b><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>`;hd&&hd.querySelectorAll('[data-rlm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.rlm===rlMode));const ad=hd&&hd.querySelector('[data-rladd]');if(ad)ad.hidden=false}
 const by=rlMode==='nat'?(()=>{const ns=[...new Set(L.filter(ok).map(RLNAT))].sort((a,b)=>(RL_NATS.indexOf(a)+1||99)-(RL_NATS.indexOf(b)+1||99));return ns.map((n,i)=>({E:{k:'n'+i,n,rg:''},xs:L.filter(e=>ok(e)&&RLNAT(e)===n)}))})()
  :rlMode==='kind'?BIG.map((k,i)=>({E:{k:'k'+i,n:k,rg:'',c:RL_COL[k]},xs:L.filter(e=>ok(e)&&HCLS(e)[0]===k)})).filter(x=>x.xs.length)
  :[...ERAS,{k:'unk',n:'시기 모름',rg:''}].map(E=>({E,xs:L.filter(e=>e.era===E.k&&ok(e))})).filter(x=>x.xs.length);
 $('rljump').innerHTML=by.map(({E})=>`<button type="button" data-rj="${E.k}">${E.n}</button>`).join('');
 if(rlMode==='era'){$('rlbody').innerHTML=by.map(({E,xs})=>`<section class="rlera rltle" id="rl-${E.k}"><h3>${esc(E.n)}<span>${esc(E.rg||'')}</span></h3><ol class="rltl">${xs.slice().sort((a,b)=>a.T-b.T).map(e=>{const [a,b]=HCLS(e);return `<li style="--kc:${RL_COL[a]}"><span class="ry">${esc(e.noY?(e.yl&&e.yl!=='연도 모름'?e.yl:'?'):shortYear(e))}</span><div role="button" tabindex="0" class="rlrow" data-rle="${e.id}"><b>${esc(rlName(e))}</b><span class="rk">${esc(RLNAT(e))} · ${a}${b?' · '+b:''}${e.p?' · '+esc(e.p):''}</span><span class="rd">${esc(((e.x||'').split(/(?<=[.다])\s/)[0]||'').replace(/\(.*?\)/g,''))}</span></div></li>`}).join('')}</ol></section>`).join('');return}
 $('rlbody').innerHTML=by.map(({E,xs})=>`<section class="rlera" id="rl-${E.k}"><h3>${esc(E.n)}<span>${esc(E.rg||'')}</span></h3><div class="rlgrid">${xs.map(e=>{const [a,b]=HCLS(e);return `<div role="button" tabindex="0" class="rlcard" data-rle="${e.id}" style="--kc:${RL_COL[a]}"><span class="rk">${a}${b?' · '+b:''}</span><b>${esc(rlName(e))}</b><span class="rd">${esc(((e.x||'').split(/(?<=[.다])\s/)[0]||'').replace(/\(.*?\)/g,''))}</span><span class="rm">${rlMode!=='nat'?esc(RLNAT(e))+' · ':''}${esc(e.yl||shortYear(e))}${e.p?' · '+esc(e.p):''}</span></div>`}).join('')}</div></section>`).join('')}
document.addEventListener('click',ev=>{const k=ev.target.closest('[data-rk]');if(k){rlKind=k.dataset.rk;rlSub='';rlShow();return}const rs=ev.target.closest('[data-rs]');if(rs){rlSub=rs.dataset.rs;rlShow();return}
 const j=ev.target.closest('[data-rj]');if(j){const s=document.getElementById('rl-'+j.dataset.rj),rd=$('rlread');if(s)rd.scrollTo({top:s.offsetTop-rd.querySelector('.rhead').offsetHeight-6,behavior:'smooth'});return}
 const c=ev.target.closest('[data-rle]');if(!c)return;{const sl=getSelection();if(sl&&!sl.isCollapsed&&String(sl).trim()&&c.contains(sl.anchorNode))return}const e=RLITEMS().find(x=>String(x.id)===c.dataset.rle);if(!e)return;rlOpen(e);return;const p=$('trpop');
 p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button></div></div>`;
 p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();gotoTimeline(e)}});
/* 유적·유물 자세히: 사전처럼 한 화면 */
Object.assign(SEC_COL,{'설명':'#b45309','배경 이야기':'#7c3aed','자세히':'#0e7490','뜻':'#b91c1c','앞뒤 사건':'#1d4ed8','관련 인물':'#047857','같은 시대 문화유산':'#be185d'});
function rlOpen(e){const p=$('kpage');const L=RLITEMS();const i=L.findIndex(x=>x.id===e.id);const HC=HCLS(e),k=HC[0];
 const story=typeof STORY!=='undefined'?STORY[e.t]:null;const deep=typeof DEEP!=='undefined'?(DEEP[e.s]||DEEP[e.t]):null;const def=GLOSS[e.s]||GLOSS[e.t];
 const pps=(e.pp||'').split(/,\s*/).map(x=>x.trim()).filter(Boolean);const lk=[...(e.cz||[]),...(e.fx||[])];const near=L.filter(x=>x.era===e.era&&x.id!==e.id).slice(0,10);
 p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>문화유산</span><span class="kpnav rlnav"><button type="button" class="ib" data-rlv="-1" aria-label="이전"${i>0?'':' disabled'}><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><button type="button" class="ib" data-rlv="1" aria-label="다음"${i<L.length-1?'':' disabled'}><svg class="ic" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></span></div>
 <div class="kpin" style="--kc:${RL_COL[k]}">
  <div class="kph"><h1>${esc(rlName(e))}</h1><button class="hrt" type="button" data-kh="r|${esc(e.t)}" aria-pressed="${KHEARTS.has('r|'+e.t)}" aria-label="하트">${HEART_IC}</button></div>
  <div class="kpsub"><span style="color:${RL_COL[k]};font-weight:700">${HC[0]}${HC[1]?' · '+HC[1]:''}</span><span class="rlnat">${esc(RLNAT(e))}</span><span>${esc(e.yl||shortYear(e))}${e.kind?'':' '+esc(e.t)}</span>${e.p?`<span>${esc(e.p)}</span>`:''}</div>
  <section><h3>설명</h3><p class="kpd">${glx(e.x||'')}</p></section>
  ${def?`<section><h3>뜻</h3><p class="kpd">${glx(def)}</p></section>`:''}
  ${deep?`<section><h3>자세히</h3><div class="tmrows">${deep.map(([a,t])=>`<div class="gdr" data-l="${esc(a)}"><i>${esc(a)}</i><span>${glx(t)}</span></div>`).join('')}</div></section>`:''}
  ${story?`<section><h3>배경 이야기</h3><p class="kpd">${glx(story)}</p></section>`:''}
  ${pps.length?`<section><h3>관련 인물</h3><div class="kpp">${pps.map(x=>`<button class="pchip" data-person="${esc(x)}" data-pt="${e.T}"><i>${esc([...x][0]||'')}</i>${esc(x)}</button>`).join('')}</div></section>`:''}
  ${lk.length?`<section><h3>앞뒤 사건</h3><ul class="kpl">${lk.map(x=>`<li class="ev"><button data-kpe="${x.id}" style="--tc:var(--t-${x.tp[0]})"><em>${esc(shortYear(x))}</em>${esc(x.t)}</button></li>`).join('')}</ul></section>`:''}
  ${near.length?`<section><h3>같은 시대 문화유산</h3><div class="kpp">${near.map(x=>`<button type="button" data-rle="${x.id}" style="--kc:${RL_COL[HCLS(x)[0]]}"><i></i>${esc(rlName(x))}</button>`).join('')}</div></section>`:''}
  <div class="rlgo">${e.cust&&window.__MEX&&window.__MEX.can()?`<button class="btn" data-rledit="${esc(e.cust)}">고치기</button><button class="btn rldel" data-rldel="${esc(e.cust)}">지우기</button>`:''}${e.ll?'<button class="btn" data-rlmap>지도에서 보기</button>':''}<button class="btn" data-rltl>연표에서 보기</button></div>
 </div>`;
 p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true};
 p.querySelectorAll('[data-rlv]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const n=L[i+(+b.dataset.rlv)];if(n)rlOpen(n)});
 const real=e.kind?((e.cz||[]).find(x=>x&&x.ll)||(e.cz||[])[0]):e;if(!real){p.querySelectorAll('.rlgo [data-rlmap],.rlgo [data-rltl]').forEach(x=>x.remove());const g=p.querySelector('.rlgo');if(g&&!g.children.length)g.remove()}const m=p.querySelector('[data-rlmap]');if(m)m.onclick=()=>{if(!real)return;p.hidden=true;gotoMap(real)};const tlb=p.querySelector('[data-rltl]');if(tlb)tlb.onclick=()=>{if(!real)return;p.hidden=true;gotoTimeline(real)};
 try{paintSections(p)}catch(_){}}
/* 사전: 인물은 나라마다 다른 색 (인물 탭과 같은 색) */
{const paintP=()=>{const b=$('dcbody');if(!b)return;b.querySelectorAll('.gp[data-k]:not([data-nc])').forEach(d=>{const P=typeof PEOPLE!=='undefined'?PEOPLE.get(d.dataset.k):null;let n='';try{n=P?personNation(P):(PNAT[d.dataset.k]||'')}catch(_){}const c=(n&&NAT_COL[n])||'#64748b';d.dataset.nc=1;d.style.setProperty('--nc',c);const t=d.querySelector('.gptag');if(t&&n)t.textContent=n})};
 const ds=dcShow;dcShow=function(){const r=ds.apply(this,arguments);paintP();return r};const b=$('dcbody');if(b)new MutationObserver(()=>{if(document.querySelector('.xing'))return;paintP()}).observe(b.parentElement||b,{childList:true,subtree:false});paintP()}
/* 인물 색 = 지도 영토 색, 생몰년, 인물 자세히 화면 */
{const V={'고조선':'gojoseon','가야':'gaya','고구려':'goguryeo','백제':'baekje','신라':'silla','발해':'balhae','후고구려':'goguryeo','후백제':'baekje','고려':'goryeo','조선':'joseon','대한제국':'daehan','한국':'south','대한민국':'south','북한':'north','중국':'han','일본':'japan','미국':'us','러시아·소련':'ussr'};
 Object.keys(V).forEach(n=>{NAT_COL[n]=`color-mix(in srgb,var(--c-${V[n]}) 80%,var(--ink))`});
 const yrs=k=>{const v=PLIFE[k];return v?v.replace('~',' ~ '):''};
 const addY=()=>{document.querySelectorAll('#dcbody .gp[data-k]').forEach(g=>{if(!g.querySelector('.gph')){const k='p|'+g.dataset.k;const d=g.querySelector('.gpd');const h=`<button type="button" class="hrt gph" data-kh="${E2(k)}" aria-pressed="${KHEARTS.has(k)}" aria-label="하트">${HEART_IC}</button>`;if(d)d.insertAdjacentHTML('beforebegin',h)}if(g.querySelector('.gpy'))return;const y=yrs(g.dataset.k);if(!y)return;const n=g.querySelector('.gpn');if(n)n.insertAdjacentHTML('afterend',`<small class="gpy">${y}</small>`)})};
 const b=$('dcbody');if(b)new MutationObserver(()=>{if(document.querySelector('.xing'))return;addY()}).observe(b,{childList:true,subtree:true});addY();
 const op=openPerson;openPerson=function(n,T){const r=op.apply(this,arguments);try{const p=$('kpage');const bar=p.querySelector('.kpbar span');if(!bar||bar.textContent!=='인물 사전')return r;const k=p.querySelector('.kph h1').textContent.trim();const P=PEOPLE.get(k);let nat='';try{nat=P?personNation(P):(PNAT[k]||'')}catch(_){}const col=NAT_COL[nat]||'var(--ink)';const kin=p.querySelector('.kpin');kin.classList.add('kpperson');kin.style.setProperty('--pc',col);const h=p.querySelector('.kph');const y=yrs(k);
   h.querySelector('h1').insertAdjacentHTML('afterend',`${y?`<span class="kpy">${y}</span>`:''}${nat?`<i class="kpnat">${E2(nat)}</i>`:''}`);try{const sub=p.querySelector('.kpsub');if(sub)sub.innerHTML=lifeKings(k,nat,P)}catch(_){}}catch(_){}return r};
 const yv=t=>{t=String(t).trim();if(!t||t==='?')return null;const m=t.match(/^(BC|AD)?\s*(\d+)$/);if(!m)return null;return m[1]==='BC'?-+m[2]:+m[2]};
 function lifeKings(k,nat,P){const v=PLIFE[k];let b=null,d=null;if(v){const [x,z]=v.split('~');b=yv(x);d=yv(z)}const ev=P&&P.evs&&P.evs.length?P.evs.map(e=>e.T):[];if(b==null&&ev.length)b=Math.min(...ev)-(d==null?0:0);if(d==null&&ev.length)d=Math.max(...ev);if(b==null||d==null)return '';if(b>d){const t=b;b=d;d=t}
  const NS={'조선':['조선','대한제국'],'대한제국':['조선','대한제국'],'일제강점기':['조선','대한제국','남한'],'한국':['조선','대한제국','남한'],'대한민국':['남한']}[nat]||[nat];const seg=[];REIGNS.filter(D=>NS.includes(D.n)).forEach(D=>D.r.forEach(r=>seg.push({n:r.name.replace(/\(.*?\)/,'').replace('대통령 ','').trim(),s:r.s,e:r.e,dn:D.n})));if(NS.includes('남한'))seg.push({n:'일제강점기',s:1910.65,e:1945.62});seg.sort((a,c)=>a.s-c.s);const out=[];seg.forEach(r=>{const s1=Math.max(b,r.s),e1=Math.min(d+1,r.e);if(e1-s1<0.3)return;const s0=Math.floor(s1),e0=Math.min(d,Math.floor(e1-0.01));const last=out[out.length-1];if(last&&last.n===r.n&&last.e>=s0-1){last.e=e0;return}out.push({n:r.n,s:s0,e:e0,a:Math.floor(r.s),z:Math.floor(r.e-0.01),k:r.dn&&r.dn!=='남한'&&r.dn!=='북한'})});const ry=y=>o=>Math.max(1,y-o.a);return out.map(o=>{const whole=o.s<=o.a&&o.e>=o.z;const r1=ry(o.s)(o),r2=ry(o.e)(o);const reg=o.k&&!whole?(r1===r2?r1+'년':r1+'~'+r2+'년')+' ':'';const yrs=whole?(o.a===o.z?yrTxt(o.a):yrTxt(o.a)+'~'+yrTxt(o.z)):(o.s===o.e?yrTxt(o.s):yrTxt(o.s)+'~'+yrTxt(o.e));return `<span class="lk">${E2(o.n)} ${reg}<small>${yrs}</small></span>`}).join('<i class="lks">·</i>')}
 function E2(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}}

{NAT_COL['일제강점기']='color-mix(in srgb,var(--t-ind) 85%,var(--ink))';const pn=personNation;personNation=function(P){if(P&&PNAT[P.n])return PNAT[P.n];const n=pn.apply(this,arguments);if(P&&P.evs&&P.evs.length&&['한국','대한민국','대한제국','조선',''].includes(n)){const c=P.evs.filter(e=>e.era==='colonial').length;if(c*2>=P.evs.length&&c>0)return '일제강점기'}return n}}

/* 사건 자세히 보기 (낱말·인물처럼 한 화면) */
function accessionOf(e){if(!/즉위|왕위에 오름|왕이 됨/.test(e.t))return null;const nm=e.t.replace(/\s*(즉위|왕위에 오름|왕이 됨).*$/,'').replace(/^(고구려|백제|신라|고려|조선|발해|가야)\s*,?\s*/,'').replace(/\(.*?\)/g,'').trim();const key=nm.replace(/\s/g,'').slice(0,2);let best=null;REIGNS.forEach(D=>D.r.forEach((r,i)=>{const rn=r.name.replace(/\(.*?\)/g,'').replace(/\s/g,'');const ok=key&&rn.includes(key);const dt=Math.abs(r.s-e.T);if((ok&&dt<4)||(!best&&dt<0.6)){const sc=(ok?0:10)+dt;if(!best||sc<best.sc)best={D,i,r,sc}}}));if(!best)return null;const {D,i,r}=best;const pv=i>0?D.r[i-1]:null;const cl=n=>n.replace('대통령 ','');if(D.n==='고조선'||D.n==='남한'||D.n==='북한')return {txt:`${D.n==='고조선'?'고조선 왕 ':''}${cl(r.name)}`,prev:pv&&D.n!=='고조선'?cl(pv.name):''};return {txt:`${D.n} 제${i+1}대 ${cl(r.name)}`,prev:pv?`제${i}대 ${cl(pv.name)}`:''}}
function openEvPage(id){const e=EVENTS.find(x=>String(x.id)===String(id));if(!e)return;const p=$('kpage');const ACC=accessionOf(e);
 const TOPN={};try{TOPICS.forEach(t=>TOPN[t.k]=t.n)}catch(_){}
 const pps=(e.pp||'').split(/,\s*/).map(x=>(typeof pbase==='function'?pbase(x):x).trim()).filter(x=>x.length>1);
 const chain=e.c?EVENTS.filter(x=>x.c===e.c&&x.id!==e.id):[];
 const ppSet=new Set(pps);const byP=EVENTS.filter(x=>x.id!==e.id&&!chain.includes(x)&&(x.pp||'').split(/,\s*/).some(n=>ppSet.has((typeof pbase==='function'?pbase(n):n).trim()))).slice(0,10);
 const near=EVENTS.filter(x=>x.id!==e.id&&!chain.includes(x)&&!byP.includes(x)&&(x.f===e.f||Math.abs(x.T-e.T)<=12)&&x.tp[0]!=='wld').sort((a,b)=>Math.abs(a.T-e.T)-Math.abs(b.T-e.T)).slice(0,10).sort((a,b)=>a.T-b.T);
 const rows=[ACC?['왕위',ACC.txt+(ACC.prev?' (이전: '+ACC.prev+')':'')]:['시기',yearLabel(e)],e.p?['장소',typeof placeName==='function'?placeName(e):e.p]:null,e.pp?['인물',e.pp]:null,e.vs?['대립',e.vs]:null,['분류',e.tp.map(t=>TOPN[t]||t).join(' · ')]].filter(Boolean);
 const story=typeof STORY!=='undefined'?STORY[e.t]:null;
 const li=x=>`<li class="ev"><button data-evpage="${x.id}" style="--tc:var(--t-${x.tp[0]})"><em>${esc(shortYear(x))}</em>${esc(x.t)}</button><p>${glx(x.x||'')}</p></li>`;
 const kw=(e.t+' '+(e.x||'')+' '+(story||''));const rel=Object.keys(GLOSS).filter(g=>g.length>1&&kw.includes(g)).sort((a,b)=>b.length-a.length).slice(0,14);
 p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>사건</span></div>
 <div class="kpin kpev" data-ev="${e.id}" style="--kc:var(--t-${e.tp[0]})">
  <div class="kph"><h1>${esc(e.t)}</h1></div>
  <div class="kpsub"><span>${esc(yearLabel(e))}</span>${ACC?`<span>${esc(ACC.txt)}${ACC.prev?` <small>(이전: ${esc(ACC.prev)})</small>`:''}</span>`:(typeof eventKing==='function'&&eventKing(e)?`<span>${esc(eventKing(e).txt)}</span>`:'')}</div>
  <section><h3>내용</h3><p class="kpd">${glx(e.x||'')}</p>${story?`<p class="kpd">${glx(story)}</p>`:''}</section>
  <section><h3>자세히</h3><dl class="kprows">${rows.map(r=>`<div><dt>${esc(r[0])}</dt><dd>${r[0]==='시기'||r[0]==='분류'||r[0]==='왕위'?esc(r[1]):glx(r[1])}</dd></div>`).join('')}</dl></section>
  ${pps.length?`<section><h3>관련 인물</h3><div class="kpp">${pps.map(x=>`<button class="pchip" data-person="${esc(x)}" data-pt="${e.T}"><i>${esc([...x][0]||'')}</i>${esc(x)}</button>`).join('')}</div></section>`:''}
  ${chain.length?`<section><h3>이어지는 사건</h3><ul class="kpl">${chain.sort((a,b)=>a.T-b.T).map(li).join('')}</ul></section>`:''}
  ${byP.length?`<section><h3>같은 인물이 나오는 사건</h3><ul class="kpl">${byP.map(li).join('')}</ul></section>`:''}
  ${near.length?`<section><h3>같은 시기 사건</h3><ul class="kpl">${near.map(li).join('')}</ul></section>`:''}
  ${rel.length?`<section><h3>관련 낱말</h3><div class="kpp">${rel.map(x=>`<button data-term="${esc(x)}"><i></i>${esc(x)}</button>`).join('')}</div></section>`:''}
  <div class="kpgo">${e.ll?'<button class="btn" data-evmap>지도에서 보기</button>':''}<button class="btn" data-evtl>연표에서 보기</button></div>
 </div>`;
 p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true};
 const m=p.querySelector('[data-evmap]');if(m)m.onclick=()=>{p.hidden=true;gotoMap(e)};p.querySelector('[data-evtl]').onclick=()=>{p.hidden=true;gotoTimeline(e)}}
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-evpage]');if(!b)return;if(document.body.classList.contains('medit')&&!b.classList.contains('mevmore')&&ev.target.closest('.kpl p'))return;ev.preventDefault();ev.stopPropagation();try{closeTree()}catch(_){}try{if(!$('srch').hidden)closeSearch()}catch(_){}openEvPage(b.dataset.evpage)},true);
/* 사건 칸·연표 줄에 '자세히 보기' */
{const evMore=()=>{document.querySelectorAll('.evd').forEach(d=>{if(d.closest('#kpage'))return;const s=d.querySelector('.snote[data-sk^="e:"]');let id=s?s.dataset.sk.slice(2):null;if(!id){const h=d.querySelector('.hrow>h2');const t=h&&(h.dataset.xo||h.textContent).trim();const e=t&&EVENTS.find(x=>x.t===t);id=e&&e.id}if(id==null)return;let b=d.querySelector('.mevmore');if(!b){const h=d.querySelector('.hrow>h2');b=document.createElement('button');b.className='mevmore mevm2 mevm3';b.type='button';b.textContent='자세히 →';if(h)h.appendChild(b);else d.appendChild(b)}b.dataset.evpage=id});
  document.querySelectorAll('#v-tl ol.tl>li[data-id]').forEach(li=>{if(li.querySelector('.mevmore'))return;const h=li.querySelector('h3');if(!h)return;h.insertAdjacentHTML('beforeend',`<button type="button" class="mevmore mevm2" data-evpage="${li.dataset.id}" aria-label="자세히 보기">자세히 →</button>`)})};
 new MutationObserver(ms=>{if(document.querySelector('.xing'))return;if(ms.every(m=>m.target.closest&&m.target.closest('.mtool,#mpen,#mtoast')))return;clearTimeout(evMore.t);evMore.t=setTimeout(evMore,150)}).observe(document.body,{childList:true,subtree:true});setTimeout(evMore,500)}
/* 사건 칸 크기 조절: 가로 화면은 너비, 세로 화면은 높이 */
{const p=$('panel');if(p){const g=document.createElement('div');g.className='pgrip';g.title='끌어서 크기 조절';p.prepend(g);
 const vert=()=>{if(p.style.position==='relative')p.style.position='';const ps=getComputedStyle(p).position;if(ps==='static')p.style.position='relative';return ps==='absolute'||ps==='fixed'};
 const load=()=>{let s={};try{s=JSON.parse(localStorage.getItem('hgs_psz')||'{}')}catch(_){}if(vert()){p.style.width='';if(s.h){p.style.maxHeight=s.h+'px';p.style.height=s.h+'px'}else{p.style.maxHeight='';p.style.height=''}}else{p.style.maxHeight='';p.style.height='';p.style.width=s.w?s.w+'px':''}};
 const mark=()=>g.classList.toggle('pgv',vert());load();mark();let lastV=vert();addEventListener('resize',()=>{const v=vert();mark();if(v!==lastV){lastV=v;load()}});setInterval(mark,1500);
 let D=null;g.addEventListener('pointerdown',e=>{e.preventDefault();D={x:e.clientX,y:e.clientY,w:p.offsetWidth,h:p.offsetHeight,v:vert(),id:e.pointerId};try{g.setPointerCapture(e.pointerId)}catch(_){}document.body.classList.add('presize')});
 g.addEventListener('pointermove',e=>{if(!D)return;if(D.v){const h=Math.max(140,Math.min(innerHeight-120,D.h-(e.clientY-D.y)));p.style.maxHeight=h+'px';p.style.height=h+'px'}else{const w=Math.max(260,Math.min(innerWidth*0.7,D.w-(e.clientX-D.x)));p.style.width=w+'px'}});
 const end=()=>{if(!D)return;const v=D.v;D=null;document.body.classList.remove('presize');let s={};try{s=JSON.parse(localStorage.getItem('hgs_psz')||'{}')}catch(_){}if(v)s.h=p.offsetHeight;else s.w=p.offsetWidth;try{localStorage.setItem('hgs_psz',JSON.stringify(s))}catch(_){}dispatchEvent(new Event('resize'))};
 g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end);
 g.addEventListener('dblclick',()=>{let s={};try{s=JSON.parse(localStorage.getItem('hgs_psz')||'{}')}catch(_){}if(vert())delete s.h;else delete s.w;try{localStorage.setItem('hgs_psz',JSON.stringify(s))}catch(_){}load();dispatchEvent(new Event('resize'))})}}
/* 사건 목록만 크게: 연표 메뉴의 '사건 모아보기'로 (지도 화면 버튼은 없앰) */
try{localStorage.removeItem('hgs_listonly')}catch(_){}

document.addEventListener('click',ev=>{const h=ev.target.closest&&ev.target.closest('#dcbody [data-kh]');if(!h)return;ev.preventDefault();ev.stopPropagation();const k=h.dataset.kh;KHEARTS.has(k)?KHEARTS.delete(k):KHEARTS.add(k);store.set('kh',[...KHEARTS]);h.setAttribute('aria-pressed',KHEARTS.has(k));try{if(KHEARTS.has(k))sfx('heart',true)}catch(_){}},true);
/* 사건 이름·태그 밑에 나라 표시 */
{const NATS=['고조선','부여','고구려','옥저','동예','삼한','백제','신라','가야','발해','후백제','후고구려','태봉','고려','조선','대한제국'];const NCV={'고조선':'gojoseon','부여':'buyeo','고구려':'goguryeo','옥저':'okjeo','동예':'dongye','백제':'baekje','신라':'silla','가야':'gaya','발해':'balhae','후백제':'baekje','후고구려':'goguryeo','태봉':'goguryeo','고려':'goryeo','조선':'joseon','대한제국':'daehan','삼한':'gaya'};
 const natsOf=e=>{const out=[];const src=e.t+' '+(e.x||'');NATS.forEach(n=>{let i=src.indexOf(n);while(i>=0){const prev=src[i-1]||'';if(!(n==='백제'&&prev==='후')&&!(n==='고구려'&&prev==='후')&&!(n==='조선'&&/고/.test(prev))){if(!out.includes(n))out.push(n);break}i=src.indexOf(n,i+1)}});if(!out.length){try{const R=kingRef(e);if(R&&NCV[R.D.n])out.push(R.D.n)}catch(_){}}if(e.era==='colonial'&&!out.length)out.push('일제강점기');return out.slice(0,4)};
 const chips=e=>{const L=natsOf(e);return L.length?`<div class="mnats">${L.map(n=>`<span class="mnat" style="--nc:${NCV[n]?`var(--c-${NCV[n]})`:'var(--t-ind)'}">${esc(n)}</span>`).join('')}</div>`:''};
 const put=()=>{const kp=$('kpage');if(kp&&!kp.hidden){const k=kp.querySelector('.kpin.kpev');if(k&&!k.querySelector('.mnats')){const e=EVENTS.find(x=>String(x.id)===k.dataset.ev);if(e){const at=k.querySelector(':scope>.mtool')||k.querySelector(':scope>.kpsub')||k.querySelector(':scope>.kph');if(at)at.insertAdjacentHTML('afterend',chips(e))}}else if(k){const n=k.querySelector('.mnats');const at=k.querySelector(':scope>.mtool')||k.querySelector(':scope>.kpsub');if(n&&at&&at.nextElementSibling!==n)at.after(n)}}
  document.querySelectorAll('.evd').forEach(d=>{if(d.closest('#kpage')||d.querySelector('.mnats'))return;const s=d.querySelector('.snote[data-sk^="e:"]');let e=null;if(s)e=EVENTS.find(x=>'e:'+x.id===s.dataset.sk);if(!e){const h=d.querySelector('.hrow>h2');const t=h&&(h.dataset.xo||h.firstChild&&h.firstChild.nodeValue||'').trim();e=t&&EVENTS.find(x=>x.t===t)}if(!e)return;const tg=d.querySelector(':scope>.tags')||d.querySelector(':scope>.hrow');if(tg)tg.insertAdjacentHTML('afterend',chips(e))})};
 new MutationObserver(()=>{if(document.querySelector('.xing'))return;clearTimeout(put.t);put.t=setTimeout(put,60)}).observe(document.body,{childList:true,subtree:true});setTimeout(put,600)}

/* 국가유산: 묶어 보기 · 추가 */
document.addEventListener('click',ev=>{const t=ev.target;if(!t.closest)return;
 const mb=t.closest('[data-rlmb]');const mp=document.querySelector('#v-rl .rlmp');if(mb){ev.preventDefault();if(mp)mp.hidden=!mp.hidden;return}
 const m=t.closest('[data-rlm]');if(m){try{localStorage.setItem('hgs_rlmode',m.dataset.rlm)}catch(_){}if(mp)mp.hidden=true;rlShow();const rd=$('rlread');if(rd)rd.scrollTop=0;return}
 if(mp&&!mp.hidden&&!t.closest('.rlmode'))mp.hidden=true;
 if(t.closest('[data-rladd]')){rlForm();return}
 const ed=t.closest('[data-rledit]');if(ed){ev.stopPropagation();rlForm(ed.dataset.rledit);return}
 const dl=t.closest('[data-rldel]');if(dl){ev.stopPropagation();const k=dl.dataset.rldel;if(!(window.__MEX&&window.__MEX.can()))return;if(dl.dataset.ok!=='1'){dl.dataset.ok='1';dl.textContent='정말 지울까요?';setTimeout(()=>{if(dl.isConnected){dl.dataset.ok='';dl.textContent='지우기'}},2500);return}window.__ME.hr.delete(k);window.__MEX.save('H:'+k,'');$('kpage').hidden=true;try{rlShow()}catch(_){}window.__MEX.toast('지웠어요');return}
},true);
function rlForm(key){if(!(window.__MEX&&window.__MEX.can()))return;const H=window.__ME.hr;const v=key?(H.get(key)||{}):{};let f=document.getElementById('mrlform');if(f)f.remove();f=document.createElement('div');f.id='mrlform';f.className='mform';
 const KS=Object.keys(RL_COL);const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 f.innerHTML=`<div class="mrlin"><h3>${key?'국가유산 고치기':'국가유산 추가'}</h3>
 <label>이름<input data-f="t" value="${es(v.t)}" placeholder="예: 경주 첨성대"></label>
 <div class="mrl2"><label>항목<select data-f="k1">${KS.map(k=>`<option${(v.k1||'유적건조물')===k?' selected':''}>${k}</option>`).join('')}</select></label><label>세부 항목<input data-f="k2" value="${es(v.k2)}" placeholder="예: 종교신앙"></label></div>
 <div class="mrl2"><label>나라<select data-f="nat"><option value="">자동</option>${RL_NATS.map(n=>`<option${v.nat===n?' selected':''}>${n}</option>`).join('')}</select></label><label>연도 (몰라도 돼요)<input data-f="y" type="number" value="${es(v.y)}" placeholder="기원전은 -"></label></div>
 <div class="mrl2"><label>연도 표시<input data-f="yl" value="${es(v.yl)}" placeholder="예: 7세기 전반"></label><label>장소<input data-f="p" value="${es(v.p)}" placeholder="예: 경주"></label></div>
 <label>설명<textarea data-f="x" rows="4" placeholder="첫 문장이 카드에 보여요">${es(v.x)}</textarea></label>
 <div class="mrlbt"><button type="button" class="btn" data-rlc>취소</button><button type="button" class="btn pri" data-rls>저장</button></div></div>`;
 document.body.appendChild(f);const q=k=>f.querySelector(`[data-f="${k}"]`);setTimeout(()=>q('t').focus(),0);
 f.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape')f.remove()},true);
 f.addEventListener('click',e=>{e.stopPropagation();if(e.target===f||e.target.closest('[data-rlc]')){f.remove();return}if(e.target.closest('[data-rls]')){const o={};['t','k1','k2','nat','yl','p','x'].forEach(k=>{const x=q(k).value.trim();if(x)o[k]=x});const y=q('y').value.trim();if(y!=='')o.y=+y;if(!o.t){q('t').focus();return}
   const k=key||('h'+Date.now().toString(36));H.set(k,o);window.__MEX.save('H:'+k,o);f.remove();try{rlShow()}catch(_){}const it=RLITEMS().find(x=>x.cust===k);if(key&&it&&!$('kpage').hidden)rlOpen(it);window.__MEX.toast(key?'고쳤어요':'국가유산을 추가했어요')}},true)}

/* 구조도: 내가 방향·크기·자리 정하기 */
{const TR=()=>window.__ME&&window.__ME.tr;const can=()=>window.__MEX&&window.__MEX.can();let busy=false;
 const keyOf=c=>c.id.replace(/^tree-/,'');
 const unwrap=()=>{const tb=$('trbody');if(!tb)return;tb.querySelectorAll(':scope>.trcol').forEach(w=>{[...w.children].forEach(ch=>tb.insertBefore(ch,w));w.remove()})};
 const stackApply=()=>{const tb=$('trbody');const M=TR();const S=M&&M.get('@stack');if(!tb||!S||typeof S!=='object')return;Object.entries(S).forEach(([root,kids])=>{const r=document.getElementById('tree-'+root);if(!r||r.parentElement!==tb||!Array.isArray(kids))return;const ks=kids.map(k=>document.getElementById('tree-'+k)).filter(x=>x&&x!==r&&x.parentElement===tb);if(!ks.length)return;const rw=r.getBoundingClientRect().width;const w=document.createElement('div');w.className='trcol';w.style.order=r.style.order;w.style.width=Math.round(rw)+'px';tb.insertBefore(w,r);w.appendChild(r);ks.forEach(k=>w.appendChild(k))})};
 function trUser(){const tb=$('trbody');const M=TR();if(!tb||!M)return;busy=true;unwrap();try{const cs=[...tb.children].filter(c=>c.classList.contains('trcard'));const ord=M.get('@order');const oi=Array.isArray(ord)?ord:null;const ed=can();
   cs.forEach((c,i)=>{const k=keyOf(c),v=M.get(k)||{};c.classList.remove('uv','uh','ut');if(v.d==='v'){c.classList.remove('vfit','vauto');c.classList.add('vtr','uv')}else if(v.d==='h'){c.classList.remove('vtr','vfit','vauto');c.classList.add('uh')}else if(v.d==='t'&&c.querySelector('.htree')){c.classList.remove('vtr','vfit','vauto');c.classList.add('ut')}
    c.style.width=v.w?v.w+'px':'';c.style.height=v.h?v.h+'px':'';c.classList.toggle('usz',!!(v.w||v.h));c.style.order=oi?(oi.indexOf(k)>=0?oi.indexOf(k):oi.length+i):'';
    let t=c.querySelector(':scope>.trut');if(ed&&!t){c.insertAdjacentHTML('beforeend',`<div class="trut"><button type="button" class="trmv" data-trmv title="끌어서 자리 옮기기" aria-label="자리 옮기기"><svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg></button><button type="button" data-trdir></button><button type="button" data-trrs title="원래대로" aria-label="원래대로"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg></button></div><span class="trgrip" data-trgrip title="끌어서 크기 바꾸기"></span>`);t=c.querySelector(':scope>.trut')}else if(!ed&&t){t.remove();const g=c.querySelector(':scope>.trgrip');if(g)g.remove()}
    if(t){const vert=v.d?v.d==='v':(c.classList.contains('vtr')||c.classList.contains('vfit')||!!(c.querySelector('.hchain')&&getComputedStyle(c.querySelector('.hchain')).flexDirection==='column'));const cur=c.classList.contains('ut')?'t':vert?'v':'h';const tb=t.querySelector('[data-trdir]');tb.dataset.cur=cur;tb.textContent={h:'가로',t:'아래로',v:'세로'}[cur];tb.title='모양 바꾸기 (가로 → '+(c.querySelector('.htree')?'아래로 → ':'')+'세로)'}});stackApply();try{tb.querySelectorAll('#tree-abroad .hkids.grp>.hkid').forEach(k=>{const n=k.querySelector('.hn');if(n&&/^\s*(\d+\s*)?미주/.test(n.textContent))k.style.gridColumnStart='1'})}catch(_){}}finally{setTimeout(()=>{busy=false},0)}}
 window.trUser=trUser;
 const tp=trPack;trPack=function(){try{unwrap()}catch(_){}const r=tp.apply(this,arguments);try{trUser()}catch(_){}return r};
 const put=(k,v)=>{const M=TR();const c=Object.fromEntries(Object.entries(v).filter(([a,b])=>b!=null&&b!==''));Object.keys(c).length?M.set(k,c):M.delete(k);window.__MEX.save('T:'+k,Object.keys(c).length?c:'')};
 document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.trut button');if(!t||!can())return;e.preventDefault();e.stopPropagation();const c=t.closest('.trcard');const k=keyOf(c);const M=TR();const v=Object.assign({},M.get(k)||{});
   if(t.hasAttribute('data-trdir')){const cur=t.dataset.cur||'h';const tree=!!c.querySelector('.htree');v.d=cur==='h'?(tree?'t':'v'):cur==='t'?'v':'h';put(k,v);trPack()}else if(t.hasAttribute('data-trrs')){put(k,{});trPack()}},true);
 /* 크기 */
 document.addEventListener('pointerdown',e=>{const g=e.target.closest&&e.target.closest('[data-trgrip]');if(!g||!can())return;e.preventDefault();e.stopPropagation();const c=g.closest('.trcard');const r=c.getBoundingClientRect();const x0=e.clientX,y0=e.clientY;c.classList.add('trrz');
   const TW=$('trbody').clientWidth;const mv=ev=>{c.style.width=Math.min(TW,Math.max(220,Math.round(r.width+ev.clientX-x0)))+'px';c.style.height=Math.max(140,Math.round(r.height+ev.clientY-y0))+'px';c.classList.add('usz')};
   const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);c.classList.remove('trrz');const k=keyOf(c);const v=Object.assign({},TR().get(k)||{});v.w=parseInt(c.style.width)||null;v.h=parseInt(c.style.height)||null;put(k,v)};
   addEventListener('pointermove',mv);addEventListener('pointerup',up)},true);
 /* 자리: 다른 상자 옆(앞·뒤)으로, 또는 상자 밑 빈자리로 */
 document.addEventListener('pointerdown',e=>{const h=e.target.closest&&e.target.closest('[data-trmv]');if(!h||!can())return;e.preventDefault();e.stopPropagation();const c=h.closest('.trcard');const tb=$('trbody');
   const all=()=>[...tb.querySelectorAll(':scope>.trcard,:scope>.trcol>.trcard')];
   c.classList.add('trdrag');let tgt=null,mode='',after=false;
   const clr=()=>document.querySelectorAll('.trdrop,.trdropa,.trdropb').forEach(x=>x.classList.remove('trdrop','trdropa','trdropb'));
   const mv=ev=>{clr();tgt=null;mode='';const el=document.elementFromPoint(ev.clientX,ev.clientY);if(!el||!tb.contains(el)&&el!==tb)return;const o=el.closest('.trcard');if(o&&o!==c&&tb.contains(o)){const r=o.getBoundingClientRect();after=ev.clientX>r.left+r.width/2;tgt=o;mode='ord';o.classList.add(after?'trdropa':'trdrop');return}
     if(o)return;let side=null,sr=-1e9;all().forEach(x=>{if(x===c)return;const r=x.getBoundingClientRect();if(ev.clientY>=r.top&&ev.clientY<=r.bottom&&r.right<=ev.clientX&&r.right>sr){sr=r.right;side=x}});if(side){tgt=side;mode='fit';after=true;side.classList.add('trdropa');return}
     let best=null,bb=-1e9;all().forEach(x=>{if(x===c)return;const r=x.getBoundingClientRect();if(ev.clientX>=r.left&&ev.clientX<=r.right&&r.bottom<=ev.clientY+4&&r.bottom>bb){bb=r.bottom;best=x}});if(best){tgt=best;mode='stack';best.classList.add('trdropb')}};
   const sc=(()=>{let el=tb;while(el&&el!==document.body){const o=getComputedStyle(el).overflowY;if((o==='auto'||o==='scroll')&&el.scrollHeight>el.clientHeight)return el;el=el.parentElement}return document.scrollingElement})();let ay=0,araf=0;const auto=()=>{if(!ay){araf=0;return}sc.scrollTop+=ay;araf=requestAnimationFrame(auto)};
   const mv0=mv;const mv2=ev=>{const r=sc===document.scrollingElement?{top:0,bottom:innerHeight}:sc.getBoundingClientRect();ay=ev.clientY<r.top+60?-14:ev.clientY>r.bottom-60?14:0;if(ay&&!araf)araf=requestAnimationFrame(auto);mv0(ev)};
   const up=()=>{ay=0;removeEventListener('pointermove',mv2);removeEventListener('pointerup',up);c.classList.remove('trdrag');clr();if(!tgt)return;const M=TR();const S=JSON.parse(JSON.stringify(M.get('@stack')||{}));const ck=keyOf(c),tk=keyOf(tgt);
     const rootOf=k=>{for(const [r,ks] of Object.entries(S))if(ks.includes(k))return r;return k};
     Object.keys(S).forEach(r=>{S[r]=S[r].filter(x=>x!==ck);if(!S[r].length)delete S[r]});
     if(mode==='stack'){const mine=S[ck]||[];delete S[ck];const R=rootOf(tk);const L=S[R]||[];const at=tk===R?0:L.indexOf(tk)+1;L.splice(at,0,ck,...mine.filter(x=>x!==R));S[R]=L}
     else{let L=all().filter(x=>x!==c);L.sort((a,b)=>{const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return (Math.round(ra.top)-Math.round(rb.top))||(ra.left-rb.left)});const tr=document.getElementById('tree-'+rootOf(tk))||tgt;const i=L.indexOf(tr);L.splice(after?i+1:i,0,c);const ord=L.map(keyOf);M.set('@order',ord);window.__MEX.save('T:@order',ord)}
     if(mode==='fit'){const tr=tb.getBoundingClientRect(),rr=tgt.getBoundingClientRect();const pr=parseFloat(getComputedStyle(tb).paddingRight)||0;const avail=Math.floor(tr.left+tb.clientWidth-pr-rr.right-16-2);const cw=c.getBoundingClientRect().width;if(cw>avail&&avail>=220){const v=Object.assign({},M.get(ck)||{});v.w=avail;M.set(ck,v);window.__MEX.save('T:'+ck,v)}}
     M.set('@stack',S);window.__MEX.save('T:@stack',Object.keys(S).length?S:'');trPack();window.__MEX.toast(mode==='stack'||mode==='fit'?'빈자리로 옮겼어요':'자리를 옮겼어요')};
   addEventListener('pointermove',mv2);addEventListener('pointerup',up)},true);
 new MutationObserver(()=>{if(!busy)try{trUser()}catch(_){}}).observe(document.body,{attributes:true,attributeFilter:['class']});
}

/* 사전 ▾ (용어 사전 · 인물 · 조약) + 조약 화면 */
try{VIEWS.push('ty')}catch(_){}
function tyShow(){const b=$('tybody');if(!b)return;const tmp=document.createElement('div');tmp.innerHTML=lawsHTML();const s=tmp.querySelector('section.laws');b.innerHTML='';if(s){const h=s.querySelector('h2');if(h)h.remove();b.appendChild(s)}const n=EVENTS.filter(e=>e.treaty).length;const c=$('tycount');if(c)c.textContent=n+'개';b.querySelectorAll('[data-tl]').forEach(li=>li.onclick=ev=>{if(ev.target.closest('[data-gl]'))return;gotoTimeline(EVENTS.find(x=>x.id===+li.dataset.tl))});try{glossify&&glossify(b)}catch(_){}}
{const dc=$('tab-dc'),pp=$('tab-pp');if(dc){if(pp)pp.style.display='none';const NM={dc:'사전',pp:'인물'};dc.textContent='사전 ▾';const tyb=document.createElement('button');tyb.id='tab-ty';tyb.setAttribute('role','tab');tyb.setAttribute('aria-selected','false');tyb.dataset.v='ty';tyb.textContent='조약';dc.after(tyb);tyb.onclick=e=>{e.preventDefault();e.stopPropagation();try{$('kpage').hidden=true}catch(_){}showView('ty')};
 const m=document.createElement('div');m.id='dcmenu';m.className='tabmenu';m.hidden=true;m.innerHTML='<button type="button" data-dv="dc">용어 사전</button><button type="button" data-dv="pp">인물</button>';document.body.appendChild(m);
 dc.onclick=e=>{e.stopPropagation();e.preventDefault();if(!m.hidden){m.hidden=true;return}const r=dc.getBoundingClientRect();m.style.left=r.left+'px';m.style.top=(r.bottom+6)+'px';const v=store.get('view','map');m.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.dv===v));m.hidden=false};
 m.addEventListener('click',e=>{const b=e.target.closest('[data-dv]');if(!b)return;m.hidden=true;try{$('kpage').hidden=true}catch(_){}showView(b.dataset.dv)});
 document.addEventListener('click',e=>{if(!m.hidden&&!e.target.closest('#dcmenu,#tab-dc'))m.hidden=true});
 const sv=showView;showView=function(v){const r=sv.apply(this,arguments);const on=['dc','pp'].includes(v);if(tyb)tyb.setAttribute('aria-selected',v==='ty');dc.setAttribute('aria-selected',on);dc.textContent=(on?NM[v]:'사전')+' ▾';if(v==='ty')try{tyShow()}catch(_){}return r};
 if(store.get('view','map')==='ty')setTimeout(()=>showView('ty'),0);else{const v=store.get('view','map');if(['dc','pp'].includes(v)){dc.setAttribute('aria-selected','true');dc.textContent=NM[v]+' ▾'}}}}
