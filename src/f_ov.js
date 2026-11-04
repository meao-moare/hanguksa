/* ───────── 한눈에 보는 연대표 ───────── */
let ovBuilt=false,ovSel=null;const ovZ=1,ovDet=true;
const LABW=78;
function ovChips(){{const ovh=document.querySelector('.ovh');ovh.insertAdjacentHTML('beforeend',`<div class="seg ovdir" role="group" aria-label="읽는 방향"><button type="button" data-d="v">세로</button><button type="button" data-d="h">가로</button></div>`);const sync=()=>ovh.querySelectorAll('.ovdir button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.d===ovDir));sync();ovh.querySelectorAll('.ovdir button').forEach(b=>b.onclick=()=>{ovDir=b.dataset.d;store.set('ovdir',ovDir);sync();if(ovSel)drawEra(ovSel);$('ovscroll').scrollLeft=0})}
  const c=$('ovchips');c.innerHTML=ERAS.map(E=>`<button class="chip" data-e="${E.k}">${E.n}</button>`).join('');
  c.querySelectorAll('.chip').forEach(b=>b.onclick=()=>ovShow(b.dataset.e));
  $('ovchart').addEventListener('click',ev=>{const c=ev.target.closest('[data-ev]');if(c){openOvPop(EVENTS.find(x=>x.id===+c.dataset.ev));return}const gp=ev.target.closest('[data-grp]');if(gp){openGrpPop(+gp.dataset.grp);return}
    const er=ev.target.closest('[data-era]');if(er){ovShow(er.dataset.era);return}
    const fr=ev.target.closest('[data-fr]');if(fr){showView('map');requestAnimationFrame(()=>{userMoved=false;setPos(+fr.dataset.fr,0,{fit:true})})}
    const rb=ev.target.closest('[data-tip]');if(rb){ovTip(rb)}});
}
function ovTip(elm){const t=$('ovtip');t.textContent=elm.dataset.tip;const r=elm.getBoundingClientRect(),w=$('v-ov').getBoundingClientRect();t.hidden=false;
  t.style.left=Math.max(8,Math.min(w.width-t.offsetWidth-8,r.left-w.left+r.width/2-t.offsetWidth/2))+'px';t.style.top=(r.top-w.top-34)+'px';clearTimeout(ovTip.t);ovTip.t=setTimeout(()=>t.hidden=true,1800)}
function ovShow(k,keepScroll){ovSel=k;store.set('overa',k);ovBuilt=true;
  $('ovchips').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.e===k));
  const act=$('ovchips').querySelector(`[data-e="${k}"]`);if(act&&!keepScroll)act.scrollIntoView({inline:'center',block:'nearest'});
  const sc=$('ovscroll'),sl=sc.scrollLeft;
  drawEra(k);
  if(keepScroll)sc.scrollLeft=sl;else sc.scrollLeft=0;
  if(!keepScroll)$('ovread').scrollTop=0;ovDirty=false;
}
const NATION=[['미국','미'],['미군','미'],['유엔','유'],['일본','일'],['왜','왜'],['청','청'],['러시아','러'],['소련','소'],['프랑스','프'],['영국','영'],['독일','독'],['당','당'],['수','수'],['한','한'],['거란','거'],['몽골','몽'],['원','원'],['홍건적','홍'],['후금','금'],['여진','여'],['중국','중']];
function nationBadges(vs){const out=[];const parts=vs.replace(/[()·]/g,' ').split(/\s|vs/);NATION.forEach(([w,a])=>{if(parts.some(p=>p===w||p.startsWith(w+'군')||(w.length>1&&p.startsWith(w))))if(!out.includes(a))out.push(a)});return out.map(a=>`<i class="nbg">${a}</i>`).join('')}
/* 한눈에 연표에서는 빼는 자잘한 사건 (목록에는 그대로 있음) */
const MINOR=new Set();
function yrTxt(t){if(t<-10000)return Math.round(-t/10000)+'만 년 전';if(t<0)return 'BC '+(-Math.round(t));return String(Math.floor(t+1e-6))}
function row(label,cls,inner,h){return `<div class="orow ${cls||''}" style="height:${h}px"><div class="olab">${label}</div><div class="otrk">${inner}</div></div>`}

/* 전체 흐름: 지도 재생 막대와 같은 비율로 나라의 흥망을 한 줄에 */
function drawAll(){
  const W=Math.round(2300*ovZ);
  const xT=t=>{let i=0;for(let j=0;j<N;j++)if(FRAMES[j].t<=t)i=j;const F=FRAMES[i];const fr=Math.max(0,Math.min(1,(t-F.t)/(F.t2-F.t)));return (cum[i]+F.w*fr)/TOT*W};
  let h='';
  // 시대 띠
  h+=row('시대','',ERAS.map(E=>{const fs=FRAMES.filter(f=>f.era===E.k);const a=xT(fs[0].t),b=xT(fs[fs.length-1].t2);return `<button class="oband" data-era="${E.k}" style="left:${a}px;width:${b-a-2}px;--bc:var(--c-${{prehist:'dongye',pre:'gojoseon',early:'buyeo',three:'goguryeo',nsk:'silla',goryeo:'goryeo',joseon1:'joseon',joseon2:'joseon',modern1:'han',colonial:'japan',contemp:'south'}[E.k]})">${E.n}</button>`}).join(''),40);
  // 나라 (겹치지 않게 줄 나누기)
  const lanes=[];const bars=COUNTRIES.map(([n,s,e,c])=>{const a=xT(s),b=xT(Math.min(e,END_T));let li=lanes.findIndex(end=>end<=a-2);if(li<0){li=lanes.length;lanes.push(0)}lanes[li]=b;return {n,s,e,c,a,b,li}});
  h+=row('나라','',bars.map(r=>`<div class="obar" data-tip="${esc(r.n)} (${yrTxt(r.s)}~${r.e>=2026?'':yrTxt(r.e)})" style="left:${r.a}px;width:${Math.max(4,r.b-r.a-2)}px;top:${4+r.li*30}px;--rc:var(--c-${r.c})">${esc(r.n)}</div>`).join(''),lanes.length*30+8);
  // 연도 눈금
  let ax='',last=-99,first=true;FRAMES.forEach(F=>{const x=xT(F.t);ax+=`<i class="otk" style="left:${x}px"></i>`;const tx=yrTxt(F.t),w=tx.length*8.5;const st=first?x:x-w/2;if(st>last+6){ax+=`<span class="oyr" style="left:${x}px">${tx}</span>`;last=st+w;first=false}});
  h+=row('연도','oaxis',ax,30);
  // 장면 카드
  const fl=[];const cards=FRAMES.map(F=>{const x=xT(F.t);let li=fl.findIndex(end=>end<=x);if(li<0){li=fl.length;fl.push(0)}fl[li]=x+150;return `<button class="ocard fr" data-fr="${F.i}" style="left:${x}px;top:${6+li*54}px;--tc:var(--seal)"><b>${esc(F.per)}</b>${esc(F.title)}</button>`});
  h+=row('지도 장면','',cards.join(''),fl.length*54+10);
  $('ovchart').innerHTML=`<div class="ochart" style="width:${LABW+W+40}px">${h}</div>`;
  $('ovsum').innerHTML=`<p class="ovhint">시대 띠를 누르면 그 시대의 자세한 연대표가 열리고, 장면 카드를 누르면 지도에서 그 장면을 보여 줍니다.</p>`;
}

const isMajor=e=>e.found||e.fall||e.treaty||/건국|멸망|전쟁|정변|반정|혁명|천도|병합|피탈|광복|수립|대첩|사화|환국|침입|란$|의 난|^3·1 운동$|6·10 만세|광주 학생 항일/.test(e.t);
/* 시대별 연대표: 화면 너비에 맞춰 여러 줄로 접어 아래로 내려 읽는다 */
const isSiteO=e=>(e.era==='prehist'||e.era==='pre')&&/유적|동굴|패총|암각화|고인돌/.test(e.t);
const UPT=new Set(['pol','eco','cul']);
const yrO=e=>esc(e.yl?e.yl.replace('기원전 ','BC '):(e.y<0?'BC '+(-e.y):String(e.y)));
function cardO(e,w,pos){const hc=HEARTS.has(e.t)?' hearted':'',tr=e.treaty?'<i class="tseal">조</i>':'',st=`width:${w}px;--tc:var(--t-${e.tp[0]});${pos||''}`;
  return `<button class="${UPT.has(e.tp[0])?'ocard dt':'fev'}${hc}" data-ev="${e.id}" style="${st}"><span class="h"><b>${yrO(e)}</b>${tr}${nbT(esc(e.t))}<i class="hm"><svg viewBox="0 0 24 24"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg></i></span></button>`}
function stackO(items){const placed=[];items.sort((a,b)=>a.left-b.left).forEach(it=>{let y=0,mv=true;while(mv){mv=false;for(const p of placed){if(p.left<it.left+it.w+6&&it.left<p.left+p.w+6&&p.y<y+it.h+6&&y<p.y+p.h+6){y=p.y+p.h+6;mv=true}}}it.y=y;placed.push(it)});return placed.reduce((m,p)=>Math.max(m,p.y+p.h),0)}
let ovW=0,ovDir=(innerHeight>innerWidth*1.05)?'v':'h';
function drawEra(k){
  const HE=k==='heart',ALL=k==='all'||HE;
  const E=ALL?{n:HE?'하트한 사건':'전체 흐름',rg:'',s:{}}:ERA[k];const fs=ALL?FRAMES:FRAMES.filter(f=>f.era===k);
  const evs=EVENTS.filter(e=>(ALL||e.era===k)&&!isSiteO(e)&&!MINOR.has(e.t)&&(!HE||HEARTS.has(e.t)));
  const SW=Math.max(300,$('ovscroll').clientWidth||360);ovW=SW;ovDirty=false;
  if(!evs.length){$('ovchart').innerHTML=`<p class="ovempty">${HE?'아직 하트한 사건이 없어요. 사건을 눌러 ♡를 누르면 여기에 모여요.':'사건이 없어요.'}</p>`;$('ovsum').innerHTML='';return}
  const t0=HE?evs[0].T:fs[0].t,t1=HE?evs[evs.length-1].T:fs[fs.length-1].t2;
  const HZ0=ovDir==='h';const Tk=e=>e.T;
  let A=[t0,...evs.map(Tk),...(HE?[]:[t1])].sort((a,b)=>a-b);A=A.filter((t,i)=>i===0||t>A[i-1]+1e-6);
  const LBL=A.map((t,i)=>{return yrTxt(t);const fy=Math.floor(t+1e-6),same=(A[i-1]!=null&&Math.floor(A[i-1]+1e-6)===fy)||(A[i+1]!=null&&Math.floor(A[i+1]+1e-6)===fy);return same&&t>1000?fy+'.'+(Math.floor((t-fy)*12+1e-6)+1):yrTxt(t)});const LW=LBL.map(t=>t.length*8.6);
  const dts=A.slice(1).map((t,i)=>t-A[i]).sort((a,b)=>a-b),med=dts[Math.floor(dts.length/2)]||1;
  const NAR=SW<600,PADL=Math.max(16,LW[0]/2+6);const CWa=NAR?Math.floor((SW-PADL-10)/2.3):132,CWb=NAR?CWa:124,avail=SW-PADL-CWa*.62;
  const sideAt=A.map(t=>{let u=0,d=0;evs.forEach(x=>{if(Math.abs(Tk(x)-t)<1e-6)(HZ0||UPT.has(x.tp[0]))?u++:d++});return [u,d]});
  const brk=new Set();const AX=[0];let lu=sideAt[0][0]?0:-1e9,ld=sideAt[0][1]?0:-1e9;
  for(let i=1;i<A.length;i++){if(A[i]-A[i-1]>Math.max(med*4,5))brk.add(i);let x=AX[i-1]+Math.max(LBL[i]===LBL[i-1]?20:LW[i-1]/2+LW[i]/2+12,34)+(brk.has(i)?14:0);
    const [u,d]=sideAt[i];const sp=ovDir==='h'?1.04:(NAR?.7:.56);if(u)x=Math.max(x,lu+CWa*sp);if(d)x=Math.max(x,ld+CWb*sp);if(x-AX[i-1]>avail)x=AX[i-1]+Math.max(LW[i-1]/2+LW[i]/2+12,34)+(brk.has(i)?14:0);
    AX.push(x);if(u)lu=x;if(d)ld=x}
  // 줄 나누기
  const HZ=ovDir==='h';const segs=[];if(HZ)segs.push([0,A.length-1]);else for(let s=0;s<A.length;){let e=s;while(e+1<A.length&&AX[e+1]-AX[s]<=avail)e++;segs.push([s,e]);s=e+1}
  const SWs=HZ?Math.max(SW,Math.max(PADL,LW[0]/2+6)+AX[A.length-1]+CWa+30):SW;$('ovscroll').classList.toggle('hz',HZ);
  // 상자 높이 재기
  const ms=document.createElement('div');ms.className='ochart flow omeasure';ms.innerHTML=evs.map(e=>cardO(e,UPT.has(e.tp[0])?CWa:CWb)).join('');$('ovchart').innerHTML='';$('ovchart').appendChild(ms);
  const HT=new Map();[...ms.children].forEach((c,i)=>HT.set(evs[i].id,Math.ceil(c.getBoundingClientRect().height)));ms.remove();
  const kAll=ALL?[]:REIGNS.map(D=>({D,rs:D.r.filter(r=>Math.min(r.e,t1)-Math.max(r.s,t0)>.3)})).filter(x=>x.rs.length);
  let rgs=ALL?ERAS.map((E2,j)=>{const ff=FRAMES.filter(x=>x.era===E2.k);return {s:ff[0].t,e:ff[ff.length-1].t2,n:E2.n,c:(j%5)+1,era:E2.k}}):REGIMES.filter(r=>r.e>t0&&r.s<t1);if(!rgs.length)rgs=fs.map((F,j)=>({s:F.t,e:F.t2,n:F.title.replace(/^\d세기 · /,''),c:(j%5)+1}));
  let out='',side='';
  segs.forEach(([s,e],si)=>{
    const last=si===segs.length-1,span=AX[e]-AX[s],fct=HZ?1:(e>s?Math.min(last?1.15:1.8,Math.max(1,avail/span)):1);
    const PL=Math.max(PADL,LW[s]/2+6),loc=i=>PL+(AX[i]-AX[s])*fct,R=last?loc(e)+24:SW-8,tEnd=last?t1:A[e+1];
    const xL=t=>{if(t<=A[s])return loc(s);for(let i=s+1;i<=e;i++)if(t<=A[i])return loc(i-1)+(loc(i)-loc(i-1))*(t-A[i-1])/(A[i]-A[i-1]);if(t>=tEnd)return R;return loc(e)+(R-loc(e))*(t-A[e])/Math.max(1e-6,tEnd-A[e])};
    const ta=A[s],tb=tEnd,inR=(a,b)=>Math.min(b,tb)-Math.max(a,ta)>1e-6;
    const sev=evs.filter(x=>Tk(x)>=A[s]-1e-6&&Tk(x)<=A[e]+1e-6);
    const mk=(x,w)=>({e:x,x:xL(Tk(x)),w,h:HT.get(x.id),left:Math.max(4,Math.min(SWs-w-4,xL(Tk(x))-(HZ?2:12)))});
    const up=sev.filter(x=>HZ||UPT.has(x.tp[0])).map(x=>mk(x,CWa)),dn=sev.filter(x=>!HZ&&!UPT.has(x.tp[0])).map(x=>mk(x,CWb));
    const Hup=stackO(up),Hdn=stackO(dn);
    // 왕 · 나라 줄
    let kh='',rows=0;
    if(ALL&&false){const cl=[];COUNTRIES.forEach(([n,cs,ce,c])=>{if(!inR(cs,ce))return;const a=xL(Math.max(cs,ta)),b=xL(Math.min(ce,tb));if(b-a<3)return;let li=cl.findIndex(end=>end<=a-2);if(li<0){li=cl.length;cl.push(0)}cl[li]=b;
      kh+=`<div class="fkg" data-tip="${esc(n)} (${yrTxt(cs)}~${ce>=2026?'':yrTxt(ce)})" style="left:${a}px;top:${6+li*24}px;width:${b-a-1}px;--rc:var(--c-${c})">${b-a>n.length*11+6?esc(n):''}</div>`});rows=cl.length}
    else if(!HZ)kAll.forEach(({D,rs})=>{const rr=rs.filter(r=>inR(r.s,r.e));if(!rr.length)return;const j=rows++;const lab=D.n==='남한'?'대한민국':D.n;
      rr.forEach((r,i)=>{const a=xL(Math.max(r.s,ta)),b=xL(Math.min(r.e,tb)),w=b-a;if(w<1.5)return;const nm=r.name.replace('대통령 ','');const txt=nm;
        kh+=`<div class="fkg${(D.r.indexOf(r))%2?' alt':''}" data-king="${esc(D.n)}|${D.r.indexOf(r)}" data-tip="${esc(D.n)} ${esc(r.name)} (${yrTxt(r.s)}~${yrTxt(r.e)})" style="left:${a}px;top:${5+j*22}px;width:${Math.max(2,w-1)}px;--rc:var(--c-${D.c})">${w>txt.length*10.5+6?esc(txt):(w>nm.length*10.5+6?esc(nm):'')}</div>`})});
    let ogTop=[];if(HZ){const og=ONGOING.filter(o=>inR(o[0],o[1])).map(o=>({n:o[2],c:o[3],a:xL(Math.max(o[0],ta)),b:xL(Math.min(o[1],tb)),s:o[0],e:o[1]}));const ends=[];og.sort((a,b)=>a.a-b.a).forEach(o=>{let li=ends.findIndex(x=>x<=o.a-4);if(li<0){li=ends.length;ends.push(0)}ends[li]=o.b;o.li=li});rows=ends.length;ogTop=og;
      kh=og.map(o=>`<div class="sdbar top" data-tip="${esc(o.n)} (${yrTxt(o.s)}~${yrTxt(o.e)})" style="left:${o.a}px;top:${4+o.li*22}px;width:${Math.max(6,o.b-o.a)}px;--tc:var(--t-${o.c})"><span>${esc(o.n)}</span></div>`).join('')}
    const KH=rows*22,upTop=KH+(KH?8:6),upBase=upTop+Hup,bandY=upBase+8,yrY=bandY+26,axisY=yrY+19,dnTop=axisY+13,H=dnTop+Hdn+10;
    let h=kh;
    rgs.forEach(r=>{if(!inR(r.s,r.e))return;const a=xL(Math.max(r.s,ta)),b=xL(Math.min(r.e,tb));if(b-a<2)return;h+=`<div class="ostripe" style="left:${a}px;width:${b-a}px;--gc:var(--g${r.c})"></div><div class="oreg" ${r.era?`data-era="${r.era}"`:`data-tip="${esc(r.n)}"`} style="left:${a}px;top:${bandY}px;width:${Math.max(3,b-a-2)}px;--gc:var(--g${r.c})">${b-a>r.n.length*12?esc(r.n):''}</div>`});
    h+=`<div class="faxis" style="left:${Math.max(0,loc(s)-8)}px;top:${axisY}px;width:${R-loc(s)+8}px"></div>`;
    if(si>0&&brk.has(s))h+=`<span class="obrk" style="left:6px;top:${axisY-9}px">≈</span>`;
    for(let i=s;i<=e;i++){const x=loc(i);if(i>s&&brk.has(i))h+=`<span class="obrk" style="left:${(loc(i-1)+x)/2}px;top:${axisY-9}px">≈</span>`;
      const at=sev.filter(x=>Math.abs(Tk(x)-A[i])<1e-6);const isEv=at.length>0;if(isEv)h+=at.some(isMajor)?`<span class="fx" style="left:${x}px;top:${axisY}px">×</span>`:`<span class="ftk" style="left:${x}px;top:${axisY-5}px"></span>`;
      if(!(i>s&&LBL[i]===LBL[i-1]))h+=`<span class="fyr${isEv?' ev':''}" style="left:${x}px;top:${yrY}px">${LBL[i]}</span>`}
    const SEPX=rgs.filter(r=>inR(r.s,r.e)).map(r=>xL(Math.max(r.s,ta)));[...up,...dn].forEach(it=>{for(const a of SEPX){if(it.left<a+5&&it.left+it.w>a-2){if(it.x>=a-4)it.left=a+6;else if(it.x-(a-6-it.w)<it.w)it.left=Math.max(0,a-6-it.w)}}});
    up.forEach(it=>{const top=upBase-it.y-it.h;h+=`<i class="flead" style="left:${it.x}px;top:${top+it.h}px;height:${bandY-top-it.h}px"></i>`+cardO(it.e,it.w,`left:${it.left}px;top:${top}px`)});
    dn.forEach(it=>{const top=dnTop+it.y;h+=`<i class="flead dn" style="left:${it.x}px;top:${axisY+6}px;height:${top-axisY-6}px"></i>`+cardO(it.e,it.w,`left:${it.left}px;top:${top}px`)});
    out+=`<div class="oseg" style="height:${H}px;${HZ?`width:${SWs}px`:''}">${h}</div>`;
    if(HZ){ // 아래 칸: 왕 · 진행 중 · 조약 · 개혁안
      const lanes=(items)=>{const ends=[];items.sort((a,b)=>a.a-b.a).forEach(it=>{let li=ends.findIndex(x=>x<=it.a-4);if(li<0){li=ends.length;ends.push(0)}ends[li]=it.b;it.li=li});return ends.length};
      const rowH=(n,h)=>Math.max(1,n)*h+8;let sh='';
      const rowWrap=(lab,n,h,inner)=>`<div class="sdrow" style="height:${rowH(n,h)}px">${inner}</div>`;
      // 왕
      let kin='',kr=0;
      if(false){const it=COUNTRIES.filter(([n,cs,ce])=>inR(cs,ce)).map(([n,cs,ce,c])=>({n,cs,ce,c,a:xL(Math.max(cs,ta)),b:xL(Math.min(ce,tb))}));kr=lanes(it);kin=it.map(o=>`<div class="fkg" data-tip="${esc(o.n)} (${yrTxt(o.cs)}~${o.ce>=2026?'':yrTxt(o.ce)})" style="left:${o.a}px;top:${4+o.li*22}px;width:${Math.max(3,o.b-o.a-1)}px;--rc:var(--c-${o.c})">${o.b-o.a>o.n.length*11+6?esc(o.n):''}</div>`).join('')}
      else (ALL?REIGNS.map(D=>({D,rs:D.r.filter(r=>Math.min(r.e,t1)-Math.max(r.s,t0)>.3)})).filter(x=>x.rs.length):kAll).forEach(({D,rs})=>{const rr=rs.filter(r=>inR(r.s,r.e));if(!rr.length)return;const j=kr++;rr.forEach(r=>{const a=xL(Math.max(r.s,ta)),b=xL(Math.min(r.e,tb)),w=b-a;if(w<1.5)return;const nm=r.name.replace('대통령 ','');
        kin+=`<div class="fkg${(D.r.indexOf(r))%2?' alt':''}" data-king="${esc(D.n)}|${D.r.indexOf(r)}" data-tip="${esc(D.n)} ${esc(r.name)} (${yrTxt(r.s)}~${yrTxt(r.e)})" style="left:${a}px;top:${4+j*22}px;width:${Math.max(2,w-1)}px;--rc:var(--c-${D.c})"><span>${w>14?esc(nm):''}</span></div>`})});
      if(kr)sh+=rowWrap('왕',kr,22,kin);
      // 진행 중
      const og=ONGOING.filter(o=>inR(o[0],o[1])).map(o=>({n:o[2],c:o[3],a:xL(Math.max(o[0],ta)),b:xL(Math.min(o[1],tb)),s:o[0],e:o[1]}));const on=lanes(og);
      if(false)sh+=rowWrap('진행 중',on,22,og.map(o=>`<div class="sdbar" data-tip="${esc(o.n)} (${yrTxt(o.s)}~${yrTxt(o.e)})" style="left:${o.a}px;top:${4+o.li*22}px;width:${Math.max(6,o.b-o.a)}px;--tc:var(--t-${o.c})">${o.b-o.a>o.n.length*11?esc(o.n):''}</div>`).join(''));
      // 조약
      const tr=evs.filter(x=>x.treaty&&x.T>=ta-1e-6&&x.T<=tb+1e-6).map(x=>({e:x,a:xL(x.T)-6,b:xL(x.T)-6+x.t.length*12.5+34}));const tn=lanes(tr);
      if(tr.length)sh+=rowWrap('조약',tn,26,tr.map(o=>`<button class="sdchip" data-ev="${o.e.id}" style="left:${o.a}px;top:${4+o.li*26}px"><i class="tseal">조</i>${esc(o.e.t)}</button>`).join(''));
      // 개혁안
      const rf=REFORMS.filter(r=>r[0]>=ta-1e-6&&r[0]<=tb+1e-6).map(r=>({r,a:xL(r[0])-6,b:xL(r[0])-6+r[1].length*12.5+24}));const rn=lanes(rf);
      if(rf.length)sh+=rowWrap('개혁안',rn,26,rf.map(o=>`<button class="sdchip rf" data-tip="${esc(o.r[1])} — ${esc(o.r[2])}: ${esc(o.r[3])}" style="left:${o.a}px;top:${4+o.li*26}px">${esc(o.r[1])}</button>`).join(''));
      const seps=rgs.filter(r=>inR(r.s,r.e)).map(r=>{const a=xL(Math.max(r.s,ta));return `<i class="sdsep" style="left:${a}px"></i><span class="sdsepl" style="left:${a+4}px">${esc(r.n)}</span>`}).join('');sh=seps+sh;
      const nrows=(sh.match(/class="sdrow"/g)||[]).length;
      const extra=!ALL?`<div class="sdsum">${sumHTML(E)}</div>`:'';
      side=`<div class="oside" style="width:${SWs}px">${sh}${extra}</div>`}
  });
  $('ovchart').innerHTML=`<div class="ochart flow">${out}${HZ?side:''}</div>`;$('v-ov').classList.toggle('hzsplit',HZ);$('ovside').innerHTML='';
  $('ovsum').innerHTML=ALL?`<p class="ovhint">${HE?'♡를 다시 누르면 빠져요.':'시대 띠를 누르면 그 시대만 자세히 볼 수 있어요.'} 사건을 누르면 설명과 지도 보기가 나와요.</p>`:`<div class="ovsumh"><h2>${esc(E.n)}</h2><span>${esc(E.rg)}</span></div>${sumHTML(E)}`;
}
new ResizeObserver(()=>{const w=$('ovscroll').clientWidth;if(ovBuilt&&!$('v-ov').hidden&&w&&Math.abs(w-ovW)>24)drawEra(ovSel)}).observe($('ovscroll'));

/* 사건 상자를 누르면 */
function openOvPop(e){const p=$('ovpop');p.innerHTML=`<div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-map>${PIN_IC}지도에서 보기</button>`:''}<button class="btn" data-tl>연표에서 보기</button><button class="btn" data-x>닫기</button></div></div>`;
  p.hidden=false;$('ovdim').hidden=false;p.querySelector('[data-x]').onclick=closeOvPop;const m=p.querySelector('[data-map]');if(m)m.onclick=()=>{closeOvPop();gotoMap(e)};p.querySelector('[data-tl]').onclick=()=>{closeOvPop();gotoTimeline(e)}}
function openGrpPop(fi){const F=FRAMES[fi];const list=EVENTS.filter(e=>e.f===fi&&(e.era==='prehist'||e.era==='pre')&&/유적|동굴|패총|암각화|고인돌/.test(e.t));const p=$('ovpop');
  p.innerHTML=`<div class="evd"><div class="dt">${esc(F.per)}</div><h2>${esc(F.title.replace(' 시대',''))} 유적</h2><ul class="glist">${list.map(e=>`<li><div><b>${esc(e.t)}</b><span>${esc(e.p||'')} · ${esc(e.yl||'')}</span></div><p>${glx(e.x)}</p>${e.ll?`<button class="btn" data-go="${e.id}">${PIN_IC}지도</button>`:''}</li>`).join('')}</ul><div class="nav"><button class="btn" data-x>닫기</button></div></div>`;
  p.hidden=false;$('ovdim').hidden=false;p.scrollTop=0;p.querySelector('[data-x]').onclick=closeOvPop;p.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{closeOvPop();gotoMap(EVENTS.find(x=>x.id===+b.dataset.go))})}
function closeOvPop(){$('ovpop').hidden=true;$('ovdim').hidden=true;if(ovDirty&&ovSel==='heart')drawEra('heart')}
$('ovdim').onclick=closeOvPop;

/* ───────── 왕별 ───────── */
const NATION_TREES={'고려':['goryeo','musin'],'조선':['bungdang2','bukbeol','silhak','wijeong','gaehwa','donghak','uibyeong'],'남한':['haebang']};
function ordOf(D,r){let n=0;for(const x of D.r){const base=x.name.replace(/\(.*\)/,'');const prev=D.r[D.r.indexOf(x)-1];if(!(prev&&prev.name.replace(/\(.*\)/,'')===base))n++;if(x===r)return n}return ''}
let kgSel=store.get('kg','고구려');
function kgChips(){const c=$('kgchips');c.innerHTML=REIGNS.map(D=>`<button class="chip" data-k="${esc(D.n)}" style="--tc:var(--c-${D.c})"><i></i>${D.n==='남한'?'대한민국':esc(D.n)}</button>`).join('');c.querySelectorAll('.chip').forEach(b=>b.onclick=()=>kgShow(b.dataset.k,true))}
let kgBuilt=false;
/* 왕계표에는 그 왕이 한 일만: 업적 정리(KINFO)가 있으면 그것, 없으면 왕 이름이 들어간 사건 */
function kAch(D,r){try{const I=KINFO[D.n+'|'+r.name];return I&&I.a?I.a:[]}catch(e){return []}}
function kOwn(e,r){const nm=r.name.replace('대통령 ','');const base=nm.replace(/\(.*\)/,'').trim();const inner=(nm.match(/\((.*?)\)/)||[])[1]||'';const keys=[base,inner,base.replace(/ 대왕$| 마립간$| 이사금$| 여왕$/,'')].filter(k=>k&&k.length>=2&&!/황제|복위|손자/.test(k));const hay=e.t+' '+(e.pp||'');return keys.some(k=>hay.includes(k))}
function kgShow(n,go){const D0=DYN[n]||REIGNS[0];kgSel=D0.n;
  $('kgchips').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',go&&c.dataset.k===D0.n));
  if(kgBuilt){kgGo(D0,go);return}kgBuilt=true;
  const by=new Map();EVENTS.forEach(e=>{if(isSiteO(e)||e.tp[0]==='wld')return;const R=kingRef(e);if(R){if(!by.has(R.r))by.set(R.r,[]);by.get(R.r).push(e)}});
  const yrs=r=>`${yrTxt(r.s)}~${r.e>=2026?'':yrTxt(r.e)}`;
  // 나라마다 가로 한 줄: 위에 시기 띠, 가운데 왕 이름과 축, 아래에 그 왕 때 사건
  const MAJ=/건국|정변|반정|멸망|천도|난$|난 |사화|환국|병합|피탈|수립|혁명|항쟁|의 난/;
  $('kgbody').innerHTML=REIGNS.map(D=>{
    const cols=D.r.map(r=>{const all=by.get(r)||[];const ach=kAch(D,r);const evs=ach.length?[]:all.filter(e=>kOwn(e,r));const L=[...ach.map(a=>a.length*.82),...evs.map(e=>e.t.length)];const w=L.length?Math.min(190,Math.max(118,Math.max(...L)*12.2+22)):Math.max(76,r.name.replace('대통령 ','').length*15+16);return {r,evs,ach,w,all}});
    let x=0;cols.forEach(c=>{c.x=x;x+=c.w});const W=x+20;
    const t0=D.r[0].s,t1=D.r[D.r.length-1].e;
    const colAt=t=>{for(const c of cols)if(t<c.r.e)return c;return cols[cols.length-1]};
    const xOf=t=>{const c=colAt(t);const k=Math.max(0,Math.min(1,(t-c.r.s)/((c.r.e-c.r.s)||1)));return c.x+c.w*k};
    const bars=ONGOING.filter(o=>o[1]>t0&&o[0]<t1&&o[1]-o[0]>3).map(o=>({n:o[2],c:o[3],s:Math.max(o[0],t0),e:Math.min(o[1],t1)}));
    const lanes=[];bars.forEach(b=>{let li=lanes.findIndex(e=>e<=b.s);if(li<0){li=lanes.length;lanes.push(0)}lanes[li]=b.e;b.li=li});
    const HB=lanes.length?lanes.length*20+4:0;
    const trees=(NATION_TREES[D.n]||[]).map(k=>`<button class="kgtree" type="button" data-tree="${k}">${esc(TREES[k].title)}</button>`).join('');
    return `<section class="kgn" id="kgn-${esc(D.n)}" style="--kc:var(--c-${D.c})"><div class="kghd"><h2>${D.n==='남한'?'대한민국':esc(D.n)}</h2><span>${yrTxt(t0)} ~ ${t1>=2026?'현재':yrTxt(t1)}</span></div>${trees?`<div class="kgtrees">구조도 ${trees}</div>`:''}
    <div class="kgl" style="--hb:${HB}px"><div class="kgcols">${cols.map(({r,evs,ach,w,all})=>{const maj=all.some(e=>e.found||e.fall||MAJ.test(e.t));
      const bs=bars.filter(b=>b.s<r.e&&b.e>r.s).map(b=>{const first=b.s>=r.s-1e-6,last=b.e<=r.e+1e-6;return `<i class="kbs${first?' f':''}${last?' l':''}" style="top:${b.li*20}px;--tc:var(--t-${b.c})" title="${esc(b.n)}">${first?esc(b.n):''}</i>`}).join('');
      return `<div class="kcol${evs.length||ach.length?'':' q'}" style="width:${w}px"><div class="kbars">${bs}</div><div class="kname" data-king="${esc(D.n)}|${D.r.indexOf(r)}"><small>${D.n==='남한'?'':`<em>${ordOf(D,r)}</em>`}${yrTxt(r.s)}${evs.length||ach.length?'~'+(r.e>=2026?'':yrTxt(r.e)):''}</small><b>${esc(r.name.replace('대통령 ',''))}</b></div><div class="ktick">${maj?'<i>×</i>':''}</div>${evs.length||ach.length?`<ul>${ach.map(a=>`<li class="kach">${glx(a)}</li>`).join('')}${evs.map(e=>`<li><button type="button" data-kev="${e.id}" class="${HEARTS.has(e.t)?'hearted':''}" style="--tc:var(--t-${e.tp[0]})">${e.treaty?'<i class="tseal">조</i>':''}${esc(e.t)}</button></li>`).join('')}</ul>`:''}</div>`}).join('')}</div></div></section>`}).join('');
  kgGo(D0,go)}
function kgGo(D0,go){if(!go)return;const s=document.getElementById('kgn-'+D0.n);if(s){const rd=$('kgread');rd.scrollTo({top:s.offsetTop-rd.querySelector('.rhead').offsetHeight-4,behavior:'smooth'})}}
$('kgbody').addEventListener('click',ev=>{const b=ev.target.closest('[data-kev]');if(!b)return;const e=EVENTS.find(x=>x.id===+b.dataset.kev);const p=$('trpop');
  p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>${PIN_IC}지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button>${hbtn(e,1)}</div></div>`;
  p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();gotoTimeline(e)}});
kgChips();

/* ───────── 시작 ───────── */
buildTL();buildTP();ovChips();
function relayout(){const d=$('dock');$('mapwrap').style.setProperty('--dockh',d.offsetHeight+'px')}
new ResizeObserver(()=>{relayout();if(!$('v-map').hidden){if(!userMoved)setVB(fitVB(abroad&&outPins.length?outBox():FRAMES[pos.i].view));else{placeOV();schedLabels()}}}).observe($('mapwrap'));
relayout();
setPos(pos.i,0,{instant:true,fit:true});
setVB(fitVB(FRAMES[pos.i].view));
if(wide())openPanel('list');
try{showView(store.get('view','map'))}catch(e){setTimeout(()=>{try{showView(store.get('view','map'))}catch(_){showView('map')}},0)}
/* 재생바(왕·진행 중 칩) 높이가 바뀌면 지도를 다시 맞춘다 */
{let dh=0;new ResizeObserver(()=>{const h=$('dock').offsetHeight;if(Math.abs(h-dh)<4)return;dh=h;relayout();if(!$('v-map').hidden&&!userMoved)animVB(fitVB(abroad&&outPins.length?outBox():FRAMES[pos.i].view),350)}).observe($('dock'))}

/* 가로 보기: 위 사건 칸과 아래 부가 칸을 함께 옆으로 */
{let lock=false;const a=$('ovscroll'),b=$('ovside');a.addEventListener('scroll',()=>{if(lock)return;lock=true;b.scrollLeft=a.scrollLeft;lock=false});b.addEventListener('scroll',()=>{if(lock)return;lock=true;a.scrollLeft=b.scrollLeft;lock=false});
 b.addEventListener('click',ev=>{const c=ev.target.closest('[data-ev]');if(c){openOvPop(EVENTS.find(x=>x.id===+c.dataset.ev));return}const t=ev.target.closest('[data-tip]');if(t)ovTip(t)})}
