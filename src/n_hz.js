/* 삼국~남북국 사건은 나라 색으로 */
function hzSt(e){if(e.T>936)return '';const t=(e.st||'')+' '+e.t+' '+(e.vs||'');const L=[['고구려','goguryeo'],['백제','baekje'],['신라','silla'],['가야','gaya'],['발해','balhae'],['고조선','gojoseon'],['부여','buyeo']];for(const [k,c] of L)if((e.st||'').includes(k)||e.t.startsWith(k)||e.t.includes(k+','))return c;for(const [k,c] of L)if(t.includes(k))return c;return ''}
/* ───────── 연대표 가로: 필기 노트처럼 (위: 조약·개혁안 / 가운데: 시기·축·사건 이름 / 아래: 왕·주요 사건 풀이) ───────── */
function drawHZ(k){$('v-ov').classList.add('hzsplit');const sr=$('ovscroll').getBoundingClientRect();const avail=Math.max(300,(sr.top>0?innerHeight-sr.top:$('ovscroll').clientHeight)-14);HZAV=avail;let sc=1,res=layHZ(k,1);for(let it=0;it<9&&res&&res.H>avail;it++){sc*=1.3;const nx=layHZ(k,sc);if(sc>2.3)break;if(nx.H<res.H-2)res=nx;else break}if(res){$('ovchart').innerHTML=res.html;$('v-ov').classList.add('hzsplit');$('ovsum').innerHTML=''}}
let HZAV=9999;
/* 연대표 아래 칸: 사건 설명 속 꼭 알아 둘 낱말(척화비 같은 것)을 그 사건 자리에 */
function hzTerms(evs,xT,fitSep){if(typeof GLOSS==='undefined')return [];const used=new Set(),out=[];const titles=evs.map(e=>e.t);
  evs.forEach(e=>{if(!e.x||isSiteO(e))return;const tmp=document.createElement('div');tmp.innerHTML=glx(e.x);[...tmp.querySelectorAll('[data-gl]')].slice(0,2).forEach(s=>{const k=s.dataset.gl;if(used.has(k)||titles.some(t=>t.includes(k)))return;used.add(k);const x=xT(e.T);out.push(fitSep({g:k,from:e.t,a:x-120,b:x+120},x))})});return out}
/* 맨 위 두꺼운 막대 = 시대, 그 밑 얇은 막대 = 세부 시기 */
const HZ_T1=[[-700000,-2333,'선사 시대'],[-2333,-108,'고조선'],[-108,371,'초기 여러 나라'],[371,676,'삼국 시대'],[676,698,'통일 신라'],[698,900,'남북국 시대'],[900,936,'후삼국 시대'],[936,1392.55,'고려'],[1392.55,1863.95,'조선'],[1863.95,1897.8,'개항기'],[1897.8,1910.66,'대한 제국'],[1910.66,1945.62,'일제 강점기'],[1945.62,2100,'현대']].map(([s,e,n],i)=>({s,e,n,c:n==='통일 신라'?'y':(i%5)+1}));
const HZ_T2=[...REGIMES.filter(r=>!/^(대한 제국)$/.test(r.n)),{s:-2000,e:-400,n:'청동기 시대',c:3},{s:-400,e:-1,n:'철기 시대',c:4}].sort((a,b)=>a.s-b.s);
const HZ_ONLY={prehist:['구석기','신석기']};
const HZ_NOTES={'구석기':['뗀석기 — 주먹도끼, 슴베찌르개','이동 생활 (동굴·막집)','사냥·채집','무리 생활, 평등 사회'],
 '신석기':['간석기','빗살무늬 토기 (저장·조리)','갈돌·갈판 (곡식 갈기)','농사 시작 → 정착 생활 (움집)','애니미즘·샤머니즘·토테미즘','씨족 사회, 평등 사회'],
 '청동기':['비파형 동검, 청동 거울 (지배자의 물건)','반달 돌칼 (벼 이삭 따기), 민무늬 토기','벼농사 → 잉여 생산물','사유 재산 → 계급 사회, 군장 등장','고인돌 (지배층 무덤)','고조선 건국 — 단군왕검 (제정일치)'],
 '철기 보급':['위만 때 본격 보급','철제 농기구 → 생산량 증가','세형동검, 거푸집 (독자적 청동기)','명도전·반량전 (중국과 교류)','붓 (창원 다호리) — 한자 사용']};
const hzShort=t=>{t=String(t||'').split(/[.。]/)[0].replace(/\s*\([^)]*\)/g,'');return t.length>30?t.slice(0,29)+'…':t};
function layHZ(k,SC){
  const ALL=k==='all';const E=ALL?{n:'전체 흐름',rg:'',s:{}}:ERA[k];const fs=ALL?FRAMES:FRAMES.filter(f=>f.era===k);
  const evs=EVENTS.filter(e=>(ALL||e.era===k)&&!isSiteO(e)&&(!HZ_ONLY[k]||HZ_ONLY[k].includes(e.t)));
  if(!evs.length){return {html:'<p class="ovempty">사건이 없어요.</p>',H:0}}
  const t0=fs[0].t,t1=fs[fs.length-1].t2;
  const tw=s=>s.length*13.2+8,twe=e=>tw(e.t)+(e.treaty?20:0);
  // 1) 사건마다 x: 같은 해는 붙여서, 해가 바뀌면 조금 띄움
  const xs=[];let x=HZ_ONLY[k]?36:40,prevY=null;evs.forEach((e,i)=>{const y=Math.floor(e.T+1e-6);if(i){const fast=(['pre','early'].includes(k)?.7:1)*((isMajor(e)||e.top)?1:.85);const GF=(window.HZ_GAPF&&HZ_GAPF[k])||1;x+=GF*(HZ_ONLY[k]?165:(y===prevY?26:Math.max(yrTxt(y).length*8.2+10,Math.min(90,Math.max(40,yrTxt(y).length*8.5+14))*SC*fast)))}xs.push(x);prevY=y});
  const W=Math.max(x+(HZ_ONLY[k]?190:130),(typeof ovBuilding!=='undefined'&&ovBuilding)?0:($('ovscroll').clientWidth||0));
  const xT=t=>{if(t<=evs[0].T)return xs[0]-(HZ_ONLY[k]?36:30);for(let i=1;i<evs.length;i++)if(t<=evs[i].T)return xs[i-1]+(xs[i]-xs[i-1])*(t-evs[i-1].T)/Math.max(1e-6,evs[i].T-evs[i-1].T);return xs[xs.length-1]+(HZ_ONLY[k]?165:40)};
  const lanes=(items,gap=10)=>{const ends=[];items.forEach(it=>{let li=ends.findIndex(v=>v<=it.a-gap);if(li<0){li=ends.length;ends.push(-1e9)}ends[li]=it.b;it.li=li});return ends.length};
  let h='';
  // 위: 조약 · 개혁안
  const tops=[...evs.filter(e=>e.treaty).map(e=>({kind:'t',e,t:e.T,title:e.t,body:e.x})),...REFORMS.filter(r=>r[0]>=t0&&r[0]<t1).map(r=>({kind:'r',t:r[0],title:r[1],by:r[2],body:r[3]}))].sort((a,b)=>a.t-b.t);
  const rg=(ALL?ERAS.map((E2,j)=>{const ff=FRAMES.filter(x=>x.era===E2.k);return {s:ff[0].t,e:ff[ff.length-1].t2,n:E2.n,c:E2.n==='통일 신라'?'y':(j%5)+1}}):(HZ_T1.filter(r=>r.e>t0&&r.s<t1))).map(r=>({n:r.n,c:r.c,ts:r.s,te:r.e,a:xT(Math.max(r.s,t0)),b:xT(Math.min(r.e,t1))})).filter((r,i,A)=>A.length<2||r.b-r.a>=60);if(rg.length)rg[0].a=Math.min(rg[0].a,0);
  const SEPS=rg.slice(1).map(r=>r.a).concat(rg.length?[rg[rg.length-1].b]:[]);
  const fitSep=(o,anchor)=>{const w=o.b-o.a;for(const s of SEPS){if(o.a<s-3&&o.b>s-3){if(anchor<s){o.b=s-5;o.a=o.b-w;o.ra=1}else{o.a=s+5;o.b=o.a+w}}}if(o.a<6){o.a=6;o.b=6+w;o.ra=0}if(o.b>W-6){o.b=W-6;o.a=o.b-w;o.ra=1}return o};
  tops.forEach(o=>{o.a=xT(o.t)-115;o.b=o.a+230;fitSep(o,xT(o.t))});tops.sort((p,q)=>p.a-q.a);const TL=lanes(tops,14);
  const og=ONGOING.filter(o=>o[1]>t0&&o[0]<t1).map(o=>({n:o[2],c:o[3],ta:o[0],tb:o[1],a:xT(Math.max(o[0],t0)),b:xT(Math.min(o[1],t1))})).filter(o=>o.b-o.a>=30);const ogDup=o=>{const k=x=>String(x).split(/[·(]/)[0].replace(/\s+/g,'');const m=n=>k(n).includes(k(o.n))||k(o.n).includes(k(n));return rg.some(r=>r.b>o.a&&r.a<o.b&&m(r.n))||(typeof REGIMES!=='undefined'&&REGIMES.some(r=>(r.e??r[1])>o.ta&&(r.s??r[0])<o.tb&&m(r.n??r[2])))||FRAMES.some(f=>(f.t2||f.t+1)>o.ta&&f.t<o.tb&&m(f.title))};og.splice(0,og.length,...og.filter(o=>!ogDup(o)));const OL=0;
  const isUp=e=>UPT.has(e.tp[0])&&!e.treaty;
  const upN=evs.map((e,i)=>({e,x:xs[i],a:xs[i]-twe(e)/2,b:xs[i]+twe(e)/2})).filter(o=>isUp(o.e)).map(o=>fitSep(o,o.x)).sort((p,q)=>p.a-q.a);const UL0=lanes(upN,6);
  const HALF=Math.max(150,HZAV*.31),FIX=(OL?OL*22+4:0)+30+22+16;let room=HALF-FIX;const ULc=Math.min(UL0,Math.max(1,Math.min(3,Math.floor(room*.45/25))));room-=ULc*25+10;const TB=74,TLc=0,TOPH=TLc*TB;
  tops.filter(o=>o.li<TLc).forEach(o=>{const y=TOPH-(o.li+1)*TB+4;h+=`<div class="hzt" style="left:${o.a}px;top:${y}px">${o.kind==='t'?`<button data-ev="${o.e.id}"><b><i class="tseal">조</i>${esc(o.title)} <em>(${yrTxt(o.t)})</em></b></button>`:`<b data-tip="${esc(o.by)}">* ${esc(o.title)} <em>(${yrTxt(Math.floor(o.t))})</em></b>`}<p>${esc(o.body)}</p></div>`});
  // 가운데: 진행 중 · 시기 띠
  // 시기 띠 바로 위부터 줄을 쌓음: 진행 중 띠가 먼저, 사건 이름은 빈 자리 중 가장 아래 줄로
  const RH=25,RR=OL+ULc,occ=Array.from({length:RR},()=>[]);
  const free=(k,a,b)=>occ[k].every(([p,q])=>b+6<=p||a>=q+6);
  const upP=[...upN].sort((p,q)=>(isMajor(q.e)-isMajor(p.e))||(p.a-q.a));upP.forEach(o=>{o.row=-1;for(let k=0;k<RR;k++)if(free(k,o.a,o.b)){o.row=k;occ[k].push([o.a,o.b]);break}});
  const used=Math.max(OL,...upN.map(o=>o.row+1),0);
  const rg2=HZ_T2.filter(r=>r.e>t0&&r.s<t1&&!rg.some(q=>q.n===r.n)).map(r=>({n:r.n,c:r.c,ts:r.s,te:r.e,cont:r.s<t0-.01,a:r.s<t0-.01?0:xT(r.s),b:r.e>t1+.01?W:xT(Math.min(r.e,t1))})).sort((p,q)=>p.a-q.a).reduce((L,r)=>{const p=L.find(q=>q.n===r.n&&r.a<=q.b+8);if(p){p.b=Math.max(p.b,r.b);p.te=Math.max(p.te,r.te)}else L.push(r);return L},[]).filter(r=>r.b-r.a>=14).concat(og.map(o=>({n:o.n,og:1,c:o.c,ts:o.ta,te:o.tb,a:o.a,b:o.b})));const BL=[];rg2.slice().sort((p,q)=>((p.og||0)-(q.og||0))||p.a-q.a).forEach(r=>{let L=BL.findIndex(b=>r.a>=b+3);if(L<0){L=BL.length;BL.push(0)}BL[L]=r.b;r.ln=L});const nBL=BL.length,BX=nBL>2?nBL*13-25:0;
  let y0=TOPH+38+BX+(rg2.length?22:0)+used*RH+(used?10:0);
  const rowY=k=>y0-10-(k+1)*RH+3;const gcAt=x=>{const r=rg.find(r=>x>=r.a&&x<r.b);return r?`var(--g${r.c})`:'transparent'};
  [].forEach(o=>{h+=`<div class="hzog" data-rg="${o.ta}|${o.tb}|${esc(o.n)}" style="left:${o.a}px;top:${rowY(o.li)}px;width:${Math.max(8,o.b-o.a)}px;--tc:var(--t-${o.c})"><span>${esc(o.n)}</span></div>`});
  let rgH='',stH='';{const two=nBL>1;
   rg2.forEach(r=>{const top=two?33+r.ln*13:34;const nearS=SEPS.concat(rg.length?[rg[0].a]:[]).some(s=>Math.abs(r.a-s)<8)||r.a<8;const ax=r.a+(nearS?8:2);rgH+=`<div class="hzrg hzrg2${two?' thin':''}${r.og?' og':''}" data-rg="${r.ts}|${r.te}|${esc(r.n)}" style="left:${ax}px;top:${top}px;width:${Math.max(8,r.b-r.a-4)}px;--gc:${r.og?`var(--t-${r.c})`:`var(--g${r.c})`}"><span>${r.cont?'':esc((r.b-r.a-4)<r.n.length*12.5+14?r.n.replace(/ ?시대$/,'').replace(/^(.+?)\s*\(.*\)$/,'$1'):r.n)}</span></div>`})}rg.forEach((r,ri)=>{const rb=ri===rg.length-1?Math.max(r.b,W):r.b;stH+=`<div class="hzst" style="left:${ri?r.a:Math.min(r.a,0)}px;width:${Math.max(0,rb-(ri?r.a:Math.min(r.a,0)))}px;--gc:var(--g${r.c})"></div>`;rgH+=`<div class="hzrg" data-rg="${r.ts}|${r.te}|${esc(r.n)}" style="left:${r.a}px;top:4px;width:${Math.max(8,rb-r.a-6)}px;--gc:var(--g${r.c})"><span>${esc(r.n)}</span></div><i class="hzsep" style="left:${r.a}px"></i>`});
  const axY=y0+22;
  // 축 · 연도 · 표시
  h+=`<div class="hzax" style="top:${axY}px;width:${W}px"></div>`;
  let lastY=null;evs.forEach((e,i)=>{const yy=Math.floor(e.T+1e-6);const maj=isMajor(e);
    if(yy!==lastY){h+=`<span class="hzyr${maj?' mj':''}" style="left:${xs[i]}px;top:${axY-21}px">${yrTxt(yy)}</span>`;lastY=yy}
    h+=maj?`<span class="hzx${evs[i].top?' bin':''}" style="left:${xs[i]}px;top:${axY-6}px">×</span>`:`<span class="hztk" style="left:${xs[i]}px;top:${axY-6}px"></span>`});
  // 축 아래: 사건 이름만
  upN.filter(o=>o.row>=0).forEach(o=>{const y=rowY(o.row);h+=`<i class="hzld up" style="left:${o.x}px;top:${y+19}px;height:${axY-6-(y+19)}px"></i><button class="hzn up${o.ra?' ra':''}${isMajor(o.e)?' mj':''}${o.e.top?' bin':''}${hzSt(o.e)?' st-'+hzSt(o.e):''}${HEARTS.has(o.e.t)?' hearted':''}" data-ev="${o.e.id}" style="left:${o.a}px;top:${y}px;width:${o.b-o.a}px;--tc:var(--t-${o.e.tp[0]});--gc:${gcAt(o.x)}"><span>${esc(o.e.t)}</span></button>`});
  const nm=evs.map((e,i)=>({e,x:xs[i],a:xs[i]-twe(e)/2,b:xs[i]+twe(e)/2})).filter(o=>!isUp(o.e)).map(o=>fitSep(o,o.x)).sort((p,q)=>p.a-q.a);const NL=lanes(nm,6);
  const nmTop=axY+20;const NLc=Math.max(2,Math.min(NL,Math.floor((HALF-30)/24)));
  nm.filter(o=>o.li<NLc).forEach(o=>{const y=nmTop+o.li*24;h+=`<i class="hzld" style="left:${o.x}px;top:${axY+6}px;height:${y-axY-2}px"></i><button class="hzn${o.ra?' ra':''}${isMajor(o.e)?' mj':''}${o.e.top?' bin':''}${hzSt(o.e)?' st-'+hzSt(o.e):''}${HEARTS.has(o.e.t)?' hearted':''}" data-ev="${o.e.id}" style="left:${o.a}px;top:${y}px;width:${o.b-o.a}px;--tc:var(--t-${o.e.tp[0]});--gc:${gcAt(o.x)}"><span>${o.e.treaty?'<i class="tseal">조</i>':''}${esc(o.e.t)}</span></button>`});
  const topH0=nmTop+NLc*24+10,aboveH=axY+3,belowH=topH0-axY-3,padT=0,topH=aboveH+belowH;
  // 아래 칸: 왕 줄 + 주요 사건 풀이
  let b='';const kr=ALL?[]:REIGNS.map(D=>({D,rs:D.r.filter(r=>Math.min(r.e,t1)-Math.max(r.s,t0)>.3)})).filter(x=>x.rs.length);
  /* 나라별 줄: 왕 재위 막대 + 그 밑에 왕 이름·업적 (교과서 정리표처럼) */
  let KY=6;kr.forEach(({D,rs},j)=>{const y0=KY;const cw=12.2;
    {const KB=rs.map(r=>({r,a:r.s<t0-.01?0:xT(r.s),bb:r.e>t1+.01?W:xT(Math.min(r.e,t1)),n:r.name.replace('대통령 ','')})).filter(o=>o.bb-o.a>=2);const G=[];KB.forEach(o=>{const nar=o.bb-o.a<30;const L=G[G.length-1];if(nar&&L&&L.nar&&o.a-L.bb<4){L.bb=o.bb;L.L.push(o)}else G.push({nar,a:o.a,bb:o.bb,L:[o]})});
     G.forEach(g=>{if(g.L.length===1){const o=g.L[0],w=o.bb-o.a-2,n=o.n;b+=`<div class="hzk" data-king="${esc(D.n)}|${D.r.indexOf(o.r)}" style="left:${o.a}px;top:${y0+18}px;width:${w}px;--rc:var(--c-${D.c})" title="${esc(n)}"><span>${w>=n.length*11.5+8?esc(n):(w>=26?esc(n[0]):"")}</span></div>`;return}
       const w=g.bb-g.a-2,nm=g.L.map(o=>o.n);const lab=w>=nm[0].length*11.5+40?`${nm[0]} 외 ${nm.length-1}명`:w>=34?`${nm.length}명`:'';b+=`<div class="hzk hzkg" data-king="${esc(D.n)}|${D.r.indexOf(g.L[0].r)}" style="left:${g.a}px;top:${y0+18}px;width:${w}px;--rc:var(--c-${D.c})" title="${esc(nm.join(' → '))}"><span>${esc(lab)}</span></div>`})}
    const blk=rs.map(r=>{const ach=(typeof kAch==='function'?kAch(D,r):[])||[];if(!ach.length)return null;const a=xT(Math.max(r.s,t0));const n=r.name.replace('대통령 ','');const L=Math.max(n.length*15,...ach.map(x=>x.length*cw));const w=Math.min(250,Math.max(120,L+22));const lines=Math.max(1,Math.ceil(ach[0].length*cw/(w-22)));return {r,n,ach,a,b:a+w,w,h:26+lines*17}}).filter(Boolean);
    const PL=[],Y0=y0+42;blk.forEach(o=>{const hit=y=>PL.some(p=>p.a<o.b+6&&o.a<p.b+6&&p.y<y+o.h+6&&y<p.y+p.h+6);const cs=[Y0,...PL.map(p=>p.y+p.h+6)].sort((p,q)=>p-q);o.y=cs.find(y=>!hit(y));PL.push({a:o.a,b:o.b,y:o.y,h:o.h})});
    let yy=PL.length?Math.max(...PL.map(p=>p.y+p.h+6)):Y0;
    blk.forEach(o=>{b+=`<div class="hzach${o.ach.length>1?' fold':''}" style="left:${o.a}px;top:${o.y}px;width:${o.w}px;--rc:var(--c-${D.c})"><button data-king="${esc(D.n)}|${D.r.indexOf(o.r)}">${esc(o.n)}</button>${o.ach.length>1?`<i class="hzmore" role="button" tabindex="0">+${o.ach.length-1}</i>`:''}${o.ach.map(x=>`<p>${glx(x)}</p>`).join('')}</div>`});
    const bh=Math.max(36,yy-y0);const bA=xT(Math.max(t0,Math.min(...rs.map(r=>r.s)))),bB=Math.max(bA+60,xT(Math.min(t1,Math.max(...rs.map(r=>r.e)))),...blk.map(o=>o.b+6));b+=`<div class="hzband" style="top:${y0}px;height:${bh}px;left:${Math.max(0,bA-4)}px;width:${bB-Math.max(0,bA-4)+4}px;right:auto;--rc:var(--c-${D.c})"><b>${esc(D.n==='남한'?'대한민국':D.n)}</b></div>`;KY=y0+bh+6});
  const KH=KY+6;
  const shownT=new Set(tops.filter(o=>o.li<TLc&&o.e).map(o=>o.e.id));
  const shownL=new Set([...upN.filter(o=>o.row>=0),...nm.filter(o=>o.li<NLc)].map(o=>o.e.id));const det=[...evs.filter(e=>(isMajor(e)&&!shownT.has(e.id)&&!shownL.has(e.id))).map(e=>fitSep({e,a:xT(e.T)-120,b:xT(e.T)+120},xT(e.T))),...(()=>{const ne=evs.filter(e=>HZ_NOTES[e.t]);if(!ne.length)return [];if(HZ_ONLY[k]){const as=ne.map(e=>Math.max(8,xT(e.T)+4));return ne.map((e,i)=>({nt:[e],a:as[i],b:Math.min(as[i]+150,i+1<as.length?as[i+1]-2:1e9)}))}const st=Math.max(4,xT(ne[0].T)-34),jn=evs.indexOf(ne[ne.length-1])+1,en=jn<evs.length?xT(evs[jn].T)-6:st+300,cw=Math.max(185,Math.min(200,(en-st)/ne.length));return ne.map((e,i)=>({nt:[e],a:st+i*cw,b:st+(i+1)*cw-2}))})(),...tops.filter(o=>o.li>=TLc&&o.kind==='r').map(o=>fitSep({r:o,a:xT(o.t)-120,b:xT(o.t)+120},xT(o.t))),].sort((p,q)=>p.a-q.a);let DL=lanes(det,14);{const nn=det.filter(o=>o.nt);if(nn.length>1){const m=Math.min(...nn.map(o=>o.li));nn.forEach(o=>o.li=m)}}if(HZ_ONLY[k]){det.forEach((o,i)=>{o.li=0;if(o.nt)return;const w=o.b-o.a;o.a=Math.max(6,(o.e?xT(o.e.T):o.a)+8);o.b=o.a+w});DL=1}
  const DB=HZ_ONLY[k]?160:62;const DLc=DL;const lh=[];det.forEach(o=>{const h=o.nt?176:DB;lh[o.li]=Math.max(lh[o.li]||0,h)});const LT=li=>{let t=KH;for(let i=0;i<li;i++)t+=lh[i]||DB;return t};det.filter(o=>o.li<DLc).forEach(o=>{if(o.nt){b+=`<div class="hznt" style="left:${o.a}px;top:${LT(o.li)}px;max-width:${o.b-o.a}px">${o.nt.map(e=>`<div><button data-ev="${e.id}">${esc(e.t)}</button>${HZ_NOTES[e.t].map(v=>`<span>${esc(v)}</span>`).join('')}</div>`).join('')}</div>`;return}if(o.g){b+=`<div class="hzd hzg" style="left:${o.a}px;top:${LT(o.li)}px"><b data-gl="${esc(o.g)}" class="gw">${esc(o.g)}</b><em>${esc(o.from)}</em><p>${esc(hzShort(GLOSS[o.g]))}</p></div>`;return}if(o.r){b+=`<div class="hzd" style="left:${o.a}px;top:${LT(o.li)}px"><b class="rfh">* ${esc(o.r.title)} <em>(${yrTxt(Math.floor(o.r.t))})</em></b><em>${esc(o.r.by)}</em><p>${esc(hzShort(o.r.body))}</p></div>`;return}b+=`<div class="hzd" style="left:${o.a}px;top:${LT(o.li)}px"><button data-ev="${o.e.id}" style="--tc:var(--t-${o.e.tp[0]})">${HZ_NOTES[o.e.t]?'':'* '}${esc(o.e.t)}</button>${o.e.pp?`<em>${esc(o.e.pp)}</em>`:''}${HZ_NOTES[o.e.t]?`<div class="hzkw">${HZ_NOTES[o.e.t].map(v=>`<span>${esc(v)}</span>`).join('')}</div>`:`<p>${esc(hzShort(o.e.x))}</p>`}</div>`});
  rg.forEach(r=>{stH+=`<i class="hzsep" style="left:${r.a}px"></i>`});
  const usedB=det.length?LT(DL)+4:KH;if(false)b+=`<div class="hzsum" style="margin-top:${usedB}px">${sumHTML(E)}</div>`;
  const botH=Math.max(KH+DB,HZAV-topH-4);
  return {H:topH+botH+4,html:`<div class="hzwrap" style="width:${W}px">${stH}<div class="hztop" style="height:${topH}px">${rgH}<div style="position:absolute;left:0;right:0;top:${padT}px;height:${topH0}px">${h}</div></div><div class="hzbot" style="height:${botH}px">${rg.map((r,ri)=>`<i class="hzsep" style="left:${ri?r.a:Math.min(r.a,0)}px"></i>`).join('')}${b}</div></div>`}
}
{const de=drawEra;drawEra=function(k){if(ovDir==='h'&&k!=='heart'){$('ovscroll').classList.add('hz');drawHZ(k)}else{$('v-ov').classList.remove('hzsplit');de(k)}}}

/* 아래칸만 세로 스크롤: 요약은 가로 스크롤 따라 왼쪽에 붙어 있게 */
function hzSync(){const sc=$('ovscroll');if(!sc)return;const L=sc.scrollLeft,s=sc.querySelector('.hzsum');if(s)s.style.transform=`translateX(${L}px)`;sc.querySelectorAll('.hzbot .hzk').forEach(k=>{const sp=k.firstElementChild;if(!sp)return;const a=k.offsetLeft,w=k.offsetWidth,sw=sp.offsetWidth;sp.style.transform=`translateX(${Math.max(0,Math.min(L-a,w-sw-4))}px)`})}
{const sc=$('ovscroll');if(sc)sc.addEventListener('scroll',()=>hzSync(),{passive:true});const d0=drawHZ;drawHZ=function(k){d0(k);hzSync();requestAnimationFrame(hzSync)}}
