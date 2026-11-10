/* ───────── 계산 도우미 ───────── */
const KX=78.80107536067219;
const X=lon=>(lon-123)*KX, Y=lat=>(44-lat)*100;
function chaikin(pts,n,closed){let a=pts;for(let k=0;k<n;k++){const b=[];const m=closed?a.length:a.length-1;if(!closed)b.push(a[0]);for(let i=0;i<m;i++){const p=a[i],q=a[(i+1)%a.length];b.push([p[0]*.75+q[0]*.25,p[1]*.75+q[1]*.25],[p[0]*.25+q[0]*.75,p[1]*.25+q[1]*.75])}if(!closed)b.push(a[a.length-1]);a=b}return a}
function dens(pts,step,closed=true){const o=[];const m=closed?pts.length:pts.length-1;for(let i=0;i<m;i++){const p=pts[i],q=pts[(i+1)%pts.length];const n=Math.max(1,Math.ceil(Math.hypot(q[0]-p[0],q[1]-p[1])/step));for(let k=0;k<n;k++)o.push([p[0]+(q[0]-p[0])*k/n,p[1]+(q[1]-p[1])*k/n])}if(!closed)o.push(pts[pts.length-1]);return o}
/* 경계선을 자연스럽게: 같은 자리의 점은 늘 같은 만큼 흔들리므로 이웃 나라의 경계가 서로 맞물린다 */
function hash(i,j,s){const v=Math.sin(i*127.1+j*311.7+s*74.7)*43758.5453;return v-Math.floor(v)}
function vnoise(x,y,s){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j;const u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);const a=hash(i,j,s),b=hash(i+1,j,s),c=hash(i,j+1,s),d=hash(i+1,j+1,s);return (a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v)*2-1}
const wob=p=>[p[0]+.42*vnoise(p[0]/1.7,p[1]/1.7,1)+.13*vnoise(p[0]/.5,p[1]/.5,3)+.04*vnoise(p[0]/.13,p[1]/.13,5),p[1]+.32*vnoise(p[0]/1.7,p[1]/1.7,2)+.1*vnoise(p[0]/.5,p[1]/.5,4)+.03*vnoise(p[0]/.13,p[1]/.13,6)];
const xy=p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);
const P=pts=>'M'+chaikin(dens(pts,.07).map(wob),1,true).map(xy).join('L')+'Z';
const PL=pts=>'M'+(pts.length>2?chaikin(pts,3,false):pts).map(xy).join('L');
const tOf=o=>o.y+((o.m||1)-1)/12+((o.d||1)-1)/372;
const $=id=>document.getElementById(id);
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs,parent){const e=document.createElementNS(NS,tag);if(attrs)for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function h(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem('ksh-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('ksh-'+k,JSON.stringify(v))}catch(e){}}};
const HEARTS=new Set(store.get('hearts',[])),BOOKS=new Set(store.get('books',[]));if(BOOKS.size){BOOKS.forEach(t=>HEARTS.add(t));BOOKS.clear();store.set('hearts',[...HEARTS]);store.set('books',[])}let tlHeart=false,ovDirty=false;
const HEART_IC='<svg viewBox="0 0 24 24"><path d="M12 20.3s-7.6-4.6-7.6-10.4A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.6 2.6c0 5.8-7.6 10.4-7.6 10.4z"/></svg>';
const BOOK_IC='<svg viewBox="0 0 24 24"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>';
const hbtn=(e,bk)=>`<button class="hrt" type="button" data-h="${e.id}" aria-pressed="${HEARTS.has(e.t)}" aria-label="하트">${HEART_IC}</button>`;
function toggleHeart(id){const e=EVENTS.find(x=>x.id===id);if(!e)return;HEARTS.has(e.t)?HEARTS.delete(e.t):HEARTS.add(e.t);store.set('hearts',[...HEARTS]);const on=HEARTS.has(e.t);
  document.querySelectorAll(`[data-h="${id}"]`).forEach(b=>b.setAttribute('aria-pressed',on));document.querySelectorAll(`[data-ev="${id}"]`).forEach(b=>b.classList.toggle('hearted',on));
  if(tlHeart==='h')renderTLFilter();ovDirty=true;const hc=document.querySelector('.hchip b');if(hc)hc.textContent=HEARTS.size}
document.addEventListener('click',ev=>{const w=ev.target.closest('[data-gl]');const gp=$('glpop');if(!w){if(!ev.target.closest('#glpop'))gp.hidden=true;return}ev.preventDefault();ev.stopPropagation();
  const k=w.dataset.gl;gp.innerHTML=`<b>${esc(k)}</b><p>${esc(GLOSS[k]||'')}</p>`;gp.hidden=false;const r=w.getBoundingClientRect(),W=innerWidth,gw=Math.min(300,W-24);gp.style.width=gw+'px';
  const left=Math.max(12,Math.min(W-gw-12,r.left+r.width/2-gw/2));gp.style.left=left+'px';const gh=gp.offsetHeight;gp.style.top=(r.bottom+8+gh<innerHeight-8?r.bottom+8:Math.max(8,r.top-gh-8))+'px'},true);
document.addEventListener('scroll',()=>{const g=$('glpop');if(g)g.hidden=true},true);
document.addEventListener('click',ev=>{const l=ev.target.closest('[data-lk]');if(!l)return;ev.preventDefault();ev.stopPropagation();const t=EVENTS.find(x=>x.id===+l.dataset.lk);if(!t)return;
  if(l.closest('#ovpop')){openOvPop(t);return}
  if(l.closest('#mapwrap')||l.closest('#panel')){closeBubble(true);selectEvent(t,{pan:!!t.ll});return}
  const v=l.closest('.view');const li=v&&v.querySelector(`li[data-id="${t.id}"]`);if(li&&!li.hidden){li.scrollIntoView({block:'center',behavior:'smooth'});li.classList.remove('hit');void li.offsetWidth;li.classList.add('hit')}else gotoTimeline(t)},true);
function toggleBook(id){const e=EVENTS.find(x=>x.id===id);if(!e)return;BOOKS.has(e.t)?BOOKS.delete(e.t):BOOKS.add(e.t);store.set('books',[...BOOKS]);const on=BOOKS.has(e.t);
  document.querySelectorAll(`[data-b="${id}"]`).forEach(b=>b.setAttribute('aria-pressed',on));document.querySelectorAll(`[data-ev="${id}"]`).forEach(b=>b.classList.toggle('hearted',on));if(tlHeart==='b')renderTLFilter()}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-b]');if(b){ev.preventDefault();ev.stopPropagation();toggleBook(+b.dataset.b)}},true);
document.addEventListener('click',ev=>{const h=ev.target.closest('[data-h]');if(h){ev.preventDefault();ev.stopPropagation();toggleHeart(+h.dataset.h)}},true);
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 준비: 장면·사건 */
FRAMES.forEach(f=>{if(!f.st.length||!f.view||f.view===VS||(f.era==='contemp'&&f.y>=1953))return;let a=1e9,b=1e9,cc=-1e9,d=-1e9;f.st.forEach(s=>s[3].forEach(([lo,la])=>{a=Math.min(a,lo);cc=Math.max(cc,lo);b=Math.min(b,la);d=Math.max(d,la)}));const px=(cc-a)*.04+.25,py=(d-b)*.04+.2;const v=f.view;f.view=[Math.min(v[0],a-px),Math.min(v[1],b-py,32.75),Math.max(v[2],cc+px),Math.max(v[3],d+py)]});
FRAMES.forEach(f=>{if(f.view&&f.view[1]>32.75)f.view=[f.view[0],32.75,f.view[2],f.view[3]]});
FRAMES.forEach((f,i)=>{f.i=i;f.t=tOf(f);f.w=f.w||1;f.st=f.st.map(s=>({id:s[0],name:s[1],c:s[2],d:P(s[3]),area:(()=>{const xs=s[3].map(p=>X(p[0])),ys=s[3].map(p=>Y(p[1]));return Math.min(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys))})(),lab:[X(s[4][0]),Y(s[4][1])],from:(s[5]||{}).from,hatch:(s[5]||{}).hatch}))});
FRAMES.forEach((f,i)=>{f.t2=i<FRAMES.length-1?FRAMES[i+1].t:END_T});
const ERA=Object.fromEntries(ERAS.map(e=>[e.k,e]));
const TOPIC=Object.fromEntries(TOPICS.map(t=>[t.k,t]));
EVENTS.forEach((e,i)=>{e.id=i;e.T=tOf(e);let f=0;for(let j=0;j<FRAMES.length;j++)if(FRAMES[j].t<=e.T+1e-9)f=j;e.f=f;e.era=FRAMES[f].era});
EVENTS.sort((a,b)=>a.T-b.T||a.id-b.id);
const byFrame=FRAMES.map(()=>[]);EVENTS.forEach(e=>byFrame[e.f].push(e));
/* 해외 사건이 가까우면 작은 지도 대신 본 지도를 살짝 넓혀 함께 보여 준다 */
FRAMES.forEach((F,i)=>{const v0=F.view;if(!v0)return;const w0=v0[2]-v0[0],h0=v0[3]-v0[1];let v=[...v0];
  const out=byFrame[i].filter(e=>e.ll&&!(e.ll[0]>=v[0]&&e.ll[0]<=v[2]&&e.ll[1]>=v[1]&&e.ll[1]<=v[3]));
  out.sort((a,b)=>Math.hypot(a.ll[0]-(v0[0]+v0[2])/2,a.ll[1]-(v0[1]+v0[3])/2)-Math.hypot(b.ll[0]-(v0[0]+v0[2])/2,b.ll[1]-(v0[1]+v0[3])/2));
  F.view=v});
/* 장면 안의 시간: 사건마다 같은 시간이 돌아가도록 사건 시점을 기준점으로 나눈다 */
FRAMES.forEach((F,i)=>{const a=[F.t];byFrame[i].forEach(e=>{if(e.T>a[a.length-1]+1e-6&&e.T<F.t2-1e-6)a.push(e.T)});a.push(F.t2);F.A=a});
function tOfF(i,f){const A=FRAMES[i].A,n=A.length-1,x=Math.max(0,Math.min(.99999,f))*n,k=Math.floor(x);return A[k]+(A[k+1]-A[k])*(x-k)}
function fOfT(i,t){const A=FRAMES[i].A,n=A.length-1;for(let k=0;k<n;k++)if(t<A[k+1]||k===n-1)return Math.max(0,Math.min(.9999,(k+(t-A[k])/((A[k+1]-A[k])||1))/n))}

function yearLabel(e){
  if(e.yl)return e.yl;
  if(e.y<0)return '기원전 '+(-e.y)+'년';
  if(e.m&&e.y>=1880)return e.y+'년 '+e.m+'월'+(e.d&&e.y>=1945?' '+e.d+'일':'');
  return e.y+'년';
}
function shortYear(e){if(e.yl&&e.y<-9000)return e.yl;if(e.yl)return e.yl.replace('기원전 ','BC ');let y=e.y;if(y==null||isNaN(y))y=e.T!=null&&!isNaN(e.T)?Math.floor(e.T):null;if(y==null)return '';if(y<0)return 'BC '+(-y);return String(y)}
function tg(k){return `<span class="tg" style="--tc:var(--t-${k})">${TOPIC[k].n}</span>`}
/* 그 사건 때의 왕 */
const DYN=Object.fromEntries(REIGNS.map(D=>[D.n,D]));
function eventKing(e){const R=kingRef(e);if(!R)return null;const {D,r}=R;if(D.n==='조선'&&r.s!=null){let pt=true;try{pt=!String(yearLabel(e)).includes('~')}catch(_){}if(pt){const nm=r.name.replace(/\s*\(.*\)\s*/,'');const sameYr=/^(태조|중종|인조)$/.test(nm);const n=Math.floor(e.T)-Math.floor(r.s)+(sameYr?1:0);return {c:D.c,txt:nm+' '+(n<=0?'즉위년':n+'년')}}}return {c:D.c,txt:r.name==='미군정'?'미군정':(r.n==='대한민국'?r.name:r.n+' '+r.name)}}
function kingRef(e){
  let st=e.st;
  if(!st){const NM=['후백제','후고구려','고구려','백제','신라','발해','고려','조선'];const find=src=>{let best=null,pos=1e9;for(const n of NM){const i=src.indexOf(n);if(i>=0&&i<pos&&!(n==='백제'&&src.slice(Math.max(0,i-1),i)==='후')&&!(n==='고구려'&&src.slice(Math.max(0,i-1),i)==='후')){best=n;pos=i}}return best};st=find(e.t)||find(e.x)}
  if(!st){if(e.era==='goryeo')st='고려';else if(['joseon1','joseon2','modern1'].includes(e.era))st='조선';else if(e.era==='contemp')st='남한';else if(e.era==='nsk')st='신라'}
  if(st==='조선'&&e.T<1392.55)return null;
  if((st==='조선'||st==='대한 제국'||st==='대한제국')&&e.T>=1897.8&&e.T<1910.67)st='대한제국';
  const D=DYN[st];if(!D)return null;const r=D.r.find(x=>x.s<=e.T+.001&&e.T<x.e)||(e.T>=D.r[0].s-.5&&e.T<D.r[0].s?D.r[0]:null);if(!r)return null;
  return {D,r};
}
function whoHTML(e,cls='who'){const k=eventKing(e);const pol=e.tp.some(t=>t==='pol'||t==='eco');let s='';
  if(k)s+=`<span class="wk" style="--rc:var(--c-${k.c})"><i></i><em>${pol?'시행':'당시'}</em>${esc(k.txt)}</span>`;
  if(e.pp)s+=`<span class="wp"><em>인물</em>${e.pp.split(/,\s*/).map(n=>`<button type="button" class="pn" data-person="${esc(n)}" data-pt="${e.T}">${esc(n)}</button>`).join(', ')}</span>`;return (s?`<div class="${cls}">${s}</div>`:'')+lnkHTML(e)}
function lnkHTML(e){const f=(arr,lab,cl)=>arr&&arr.length?`<div class="lnk ${cl}"><em>${lab}</em>${arr.map(x=>`<button type="button" data-lk="${x.id}">${esc(x.t)}</button>`).join('')}</div>`:'';return f(e.cz,'← 배경','cz')+f(e.fx,'영향 →','eff')}
function vsHTML(e){if(!e.vs)return '';if(e.treaty){const q=e.vs.split(/ vs | · /);return `<div class="vs trt"><i class="tseal">조</i>${q.map(x=>`<b>${esc(x)}</b>`).join('<span>·</span>')}</div>`}const p=e.vs.split(' vs ');return `<div class="vs">${p.length>1?`<b>${esc(p[0])}</b><span>VS</span><b>${esc(p[1])}</b>`:`<b>${esc(e.vs)}</b>`}</div>`}

/* ───────── 지도 바탕 ───────── */
const svg=$('map'),G={terr:$('terr'),riv:$('rivers'),arr:$('arrows'),ovl:$('ovl'),pins:$('pins')};
['landk','coastk','clipk'].forEach(id=>$(id).setAttribute('d',LAND.kor));['landc','coastc','clipc'].forEach(id=>$(id).setAttribute('d',LAND.ctx));['cl1','sm1'].forEach(id=>$(id).setAttribute('d',LAND.kor));['cl2','sm2'].forEach(id=>$(id).setAttribute('d',LAND.ctx));
(function grat(){return;const g=$('grat');for(let lat=30;lat<=50;lat+=2)el('path',{class:'grat',d:PL([[110,lat],[145,lat]])},g);for(let lon=114;lon<=142;lon+=2)el('path',{class:'grat',d:PL([[lon,28],[lon,52]])},g)})();

const OV=[]; // 화면 크기에 맞춰 크기를 되돌리는 표시들
function ovItem(g,x,y,rot){const o={g,x,y,rot};OV.push(o);return o}
const RIV_EV={'압록강':['위화도 회군','4군 설치','국군, 압록강 도달','서희의 외교 담판','중국군 참전'],'두만강':['6진 설치'],'청천강(살수)':['살수 대첩'],'대동강':['제너럴셔먼호 사건','고구려, 낙랑군 축출'],'금강':['백강 전투','기벌포 전투 · 삼국 통일','진포 대첩'],'낙동강':['낙동강 방어선','고구려군, 신라를 도와 왜 격퇴'],'영산강':[],'요하':['안시성 싸움'],'송화강':['나선 정벌'],'흑룡강':['나선 정벌']};
const RIVEL=[];let lastHan='';
RIVERS.forEach(([n,pts,li])=>{const nm=n||lastHan;if(n)lastHan=n;const p=el('path',{class:'river',d:PL(pts)},G.riv);let o=null;if(n){const g=el('g',{class:'rl'},G.ovl);const t=el('text',{x:5,y:-4},g);t.textContent=n;o=ovItem(g,X(pts[li][0]),Y(pts[li][1]));o.kind='riv';o.t=t}RIVEL.push({n:nm,p,o})});
function showRivers(i){const titles=new Set(byFrame[i].map(e=>e.t));RIVEL.forEach(r=>{const on=false;r.p.classList.toggle('off',!on);if(r.o){r.o.g.classList.toggle('off',!on);r.o.off=!on}})}
(function mt(){const g=el('g',{class:'mt'},G.ovl);el('path',{d:'M0,-7L6,3H-6Z'},g);const t=el('text',{x:8,y:3},g);t.textContent='백두산';const o=ovItem(g,X(128.08),Y(42.0));o.kind='mt';o.t=t})();

const capG=el('g',{},G.ovl), nbG=el('g',{},G.ovl), labG=el('g',{},G.ovl), headG=el('g',{},G.ovl);
let capItems=[],nbItems=[];

/* ───────── 영토 (모양 바꾸기 애니메이션) ───────── */
let revealN=0;const shapes=new Map(); let morphRAF=0, morphTasks=[];
function styleTerr(path,s){
  path.setAttribute('class','terr'+(s.hatch?' hatch':''));
  const fc=`color-mix(in srgb,var(--c-${s.c}) 66%,var(--land))`;path.style.fill=s.hatch?`url(#${s.hatch})`:fc;path.style.setProperty('--tbc',s.hatch?'none':fc);path.style.stroke='';
}
function makeLabel(s){const g=el('g',{class:'slab'},labG);const ln=el('line',{class:'lead',x1:0,y1:0,x2:0,y2:0},g);el('circle',{class:'ldot',r:2.6},g);const t=el('text',{},g);const o=ovItem(g,s.lab[0],s.lab[1]);o.slab=true;o.t=t;o.ln=ln;const L={g,t,o};labStyle(L,s);return L}
function labStyle(L,s){if(/ /.test(s.name)){L.t.textContent='';(()=>{const W=s.name.replace(/ →/g,'\u00a0→').split(' ');let bi=1,bm=1e9;for(let i=1;i<W.length;i++){const m=Math.max(W.slice(0,i).join(' ').length,W.slice(i).join(' ').length);if(m<bm){bm=m;bi=i}}return [W.slice(0,bi).join(' '),W.slice(bi).join(' ')]})().forEach((w,i)=>{const sp=document.createElementNS('http://www.w3.org/2000/svg','tspan');sp.textContent=w;sp.setAttribute('dy',i?'1.12em':'-.56em');L.t.appendChild(sp)})}else L.t.textContent=s.name;L.o.area=s.area;L.t.style.fill=`color-mix(in srgb,var(--c-${s.c}) 52%,var(--ink))`;L.t.style.stroke=s.hatch?'var(--land)':`color-mix(in srgb,var(--c-${s.c}) 66%,var(--land))`}
function finishMorph(){cancelAnimationFrame(morphRAF);morphTasks.forEach(k=>{k.cur.el.setAttribute('d',k.to);k.cur.lab.o.x=k.l1[0];k.cur.lab.o.y=k.l1[1]});morphTasks=[];}
function applyFrame(i,anim){
  finishMorph();showRivers(i);
  const F=FRAMES[i],seen=new Set(),tasks=[];
  const ids=new Set(F.st.map(s=>s.id));
  for(const s of F.st){
    let cur=shapes.get(s.id);
    if(!cur&&s.from&&shapes.has(s.from)&&!ids.has(s.from)&&!EVENTS.some(e=>e.found&&e.f===i&&e.t.replace(/^[^,]*,\s*/,'').startsWith(s.name))){cur=shapes.get(s.from);shapes.delete(s.from);shapes.set(s.id,cur)}
    if(cur){
      styleTerr(cur.el,s);labStyle(cur.lab,s);
      if(cur.d!==s.d||cur.lab.o.x!==s.lab[0]||cur.lab.o.y!==s.lab[1]){
        if(anim)tasks.push({cur,from:cur.d,to:s.d,l0:[cur.lab.o.x,cur.lab.o.y],l1:s.lab});
        else{cur.el.setAttribute('d',s.d);cur.lab.o.x=s.lab[0];cur.lab.o.y=s.lab[1]}
      }
      cur.d=s.d;
    }else{
      const p=el('path',{d:s.d},G.terr);styleTerr(p,s);
      cur={el:p,d:s.d,lab:makeLabel(s)};cur.lab.o.terr=p;shapes.set(s.id,cur);
      if(anim&&!(typeof STATE_STEPS!=='undefined'&&STATE_STEPS[s.id]&&STATE_STEPS[s.id].pre)){cur.lab.g.style.opacity=0;
        if(!reduceMotion){const cid='rv'+(++revealN);const cp=el('clipPath',{id:cid},$('defs'));const fe=EVENTS.find(e=>e.found&&e.ll&&e.f===i&&e.t.replace(/^[^,]*,\s*/,'').startsWith(s.name));const o0=fe?[X(fe.ll[0]),Y(fe.ll[1])]:s.lab;const ci=el('circle',{cx:o0[0],cy:o0[1],r:0},cp);p.setAttribute('clip-path',`url(#${cid})`);
          let R=Math.max(400,(s.area||400)*1.6);try{const bb=p.getBBox();R=Math.max(...[[bb.x,bb.y],[bb.x+bb.width,bb.y],[bb.x,bb.y+bb.height],[bb.x+bb.width,bb.y+bb.height]].map(([x,y])=>Math.hypot(x-o0[0],y-o0[1])))+10}catch(_){}const t0=performance.now();const grow=now=>{const u=Math.min(1,(now-t0)/2000),k=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;ci.setAttribute('r',(R*k).toFixed(1));if(u<1)requestAnimationFrame(grow);else{p.removeAttribute('clip-path');cp.remove()}};requestAnimationFrame(grow);
          setTimeout(()=>{cur.lab.g.style.opacity=''},500)}
        else requestAnimationFrame(()=>{cur.lab.g.style.opacity=''})}
    }
    seen.add(s.id);
  }
  for(const [id,cur] of [...shapes]){if(seen.has(id))continue;shapes.delete(id);
    if(anim){cur.el.classList.add('out');cur.lab.g.style.opacity=0;setTimeout(()=>{cur.el.remove();cur.lab.g.remove();dropOV(cur.lab.o)},650)}
    else{cur.el.remove();cur.lab.g.remove();dropOV(cur.lab.o)}}
  F.st.forEach(s=>{const c=shapes.get(s.id);if(c)G.terr.appendChild(c.el)});
  if(tasks.length){
    const canMorph=typeof flubber!=='undefined'&&!reduceMotion;
    tasks.forEach(k=>{try{k.f=canMorph?flubber.interpolate(k.from,k.to,{maxSegmentLength:7}):null}catch(e){k.f=null}});
    morphTasks=tasks;const t0=performance.now(),D=2000;
    const stepM=now=>{let u=Math.min(1,(now-t0)/D);const e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
      for(const k of tasks){k.cur.el.setAttribute('d',k.f?(u>=1?k.to:k.f(e)):(e<.5?k.from:k.to));k.cur.lab.o.x=k.l0[0]+(k.l1[0]-k.l0[0])*e;k.cur.lab.o.y=k.l0[1]+(k.l1[1]-k.l0[1])*e}
      placeOV();if(u<1)morphRAF=requestAnimationFrame(stepM);else{morphTasks=[];placeLabels()}};
    morphRAF=requestAnimationFrame(stepM);
  }
  [...capItems,...nbItems].forEach(o=>{if(anim&&!reduceMotion){o.g.classList.add('fadeout');setTimeout(()=>{o.g.remove();dropOV(o)},620)}else{o.g.remove();dropOV(o)}});capItems=[];nbItems=[];
  F.caps.forEach(([n,lo,la])=>{const g=el('g',{class:'cap'},capG);el('rect',{x:-4,y:-4,width:8,height:8,transform:'rotate(45)'},g);const t=el('text',{x:8,y:-6},g);t.textContent=n;const o=ovItem(g,X(lo),Y(la));o.cap=true;o.t=t;capItems.push(o)});
  F.nb.forEach(([n,lo,la])=>{const g=el('g',{class:'nb'},nbG);const t=el('text',{},g);t.textContent=n;const o=ovItem(g,X(lo),Y(la));o.kind='nb';o.t=t;nbItems.push(o)});
  placeOV();
}
function dropOV(o){const i=OV.indexOf(o);if(i>=0)OV.splice(i,1)}

/* ───────── 화살표 ───────── */
const arrOf=new Map();
const acol=c=>({japan:'var(--a-jp)',han:'var(--a-cn)',us:'var(--a-west)',ussr:'var(--a-north)',north:'var(--a-north)',south:'var(--a-south)'}[c]||`color-mix(in srgb,var(--c-${c}) 70%,var(--ink))`);
EVENTS.forEach(e=>{if(!e.ar)return;const parts=[];
  e.ar.forEach(([c,pts,dash])=>{const sm=pts.length>2?chaikin(pts,3,false):pts;
    const inv=!dash&&(e.tp.includes('war')||/침입|침략|전투|전쟁|정벌|원정|공격|남침|진공|상륙|참전|대첩/.test(e.t));const g=el('g',{class:'arw hide'+(dash?' dash':'')+(inv?' inv':'')},G.arr);
    el('path',{class:'ab',d:'M'+sm.map(xy).join('L')},g);
    const p=el('path',{class:'af',d:'M'+sm.map(xy).join('L'),pathLength:1,style:`stroke:${acol(c)}`},g);el('path',{class:'aflow',d:'M'+sm.map(xy).join('L'),pathLength:1},g);
    const a=sm[sm.length-2],b=sm[sm.length-1];const ang=Math.atan2(Y(b[1])-Y(a[1]),X(b[0])-X(a[0]))*180/Math.PI;
    const hg=el('g',{class:'ahd hide'+(inv?' inv':'')},headG);{const d=inv?'M-15,-7.2Q-6,-2.6 5,0Q-6,2.6 -15,7.2L-11,0Z':'M-12.5,-6Q-5,-2.2 4,0Q-5,2.2 -12.5,6L-9,0Z';el('path',{class:'ahf',d,style:`fill:${acol(c)}`},hg)}
    const o=ovItem(hg,X(b[0]),Y(b[1]),ang);const xs=sm.map(q=>X(q[0])),ys=sm.map(q=>Y(q[1]));parts.push({g,hg,o,c,dash:!!dash,inv,bb:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)]})});
  arrOf.set(e.id,parts)});
function setArrows(e,state){const ps=arrOf.get(e.id);if(!ps)return;ps.forEach(p=>{
  p.g.classList.toggle('hide',state==='hide');p.hg.classList.toggle('hide',state==='hide');
  p.g.classList.toggle('dim',state==='dim');p.hg.classList.toggle('dim',state==='dim');
  if(state==='draw'){p.g.classList.remove('draw');void p.g.getBoundingClientRect();p.g.classList.add('draw');p.hg.classList.remove('draw');void p.hg.getBoundingClientRect();p.hg.classList.add('draw')}})}

/* ───────── 사건 핀 ───────── */
const pinOf=new Map();
const star=(n,R,r,rot,jit)=>{let d='';for(let i=0;i<n*2;i++){const a=rot+i*Math.PI/n,rr=(i%2?r:R)*(1+(i%2?0:jit*Math.sin(i*2.3)));d+=(i?'L':'M')+(Math.cos(a)*rr).toFixed(2)+','+(Math.sin(a)*rr).toFixed(2)}return d+'Z'};
const BURST=star(8,10.5,5.9,-Math.PI/2,0),BURST2='M0,-2.5A2.5,2.5 0 1 1 -0.01,-2.5Z';
function stateColor(e){const n=['후백제','후고구려','고구려','백제','신라','발해','고려','조선','금관가야','가야'].find(n=>e.t.includes(n));const c={'후백제':'baekje','후고구려':'goguryeo','고구려':'goguryeo','백제':'baekje','신라':'silla','발해':'balhae','고려':'goryeo','조선':'joseon','금관가야':'gaya','가야':'gaya'}[n];return c?`color-mix(in srgb,var(--c-${c}) 80%,var(--ink))`:null}
const GLYPH={crown:['M-5,3.4L-5.4,-3L-2.4,-0.4L0,-4.6L2.4,-0.4L5.4,-3L5,3.4Z',1],war:['M-1.6,1.6L5.4,-5.4L5.6,-3.4M5.4,-5.4L3.4,-5.6M1.6,1.6L-5.4,-5.4L-5.6,-3.4M-5.4,-5.4L-3.4,-5.6M-4.2,0.4L-0.4,4.2M4.2,0.4L0.4,4.2M-2.2,2.2L-4.8,4.8M2.2,2.2L4.8,4.8'],
 pol:['M-3.6,-4.8H1.8L3.8,-2.8V4.8H-3.6ZM-1.6,-1.4H1.8M-1.6,0.9H1.8M-1.6,3.1H0.6'],
 eco:['M0,-4.6A4.6,4.6 0 1 1 -0.01,-4.6M0,-2.4V2.4M-1.6,-1.2H1.6M-1.6,1.2H1.6'],
 soc:['M0,5C-3.4,5,-4.2,1.6,-2.2,-1C-1.8,0.4,-0.6,0.6,-0.2,-0.8C-0.4,-2.8,0.8,-4.4,2,-5C1.8,-2.2,4,-0.4,3.4,2.4C2.9,4.2,1.7,5,0,5Z',1],
 cul:['M0,-5.2L1.4,-1.4L5.2,0L1.4,1.4L0,5.2L-1.4,1.4L-5.2,0L-1.4,-1.4Z',1],
 ind:['M-3.2,5V-5M-3.2,-4.6C-1,-5.6,1,-3.4,4.2,-4.4V0.4C1,1.4,-1,-0.8,-3.2,0.2',0],
 mod:['M0,5C-3.4,5,-4.2,1.6,-2.2,-1C-1.8,0.4,-0.6,0.6,-0.2,-0.8C-0.4,-2.8,0.8,-4.4,2,-5C1.8,-2.2,4,-0.4,3.4,2.4C2.9,4.2,1.7,5,0,5Z',1],
 wld:['M0,-4.6A4.6,4.6 0 1 1 -0.01,-4.6M-4.6,0H4.6M0,-4.6C-2.6,-2,-2.6,2,0,4.6C2.6,2,2.6,-2,0,-4.6']};
EVENTS.forEach(e=>{if(!e.ll)return;
  const g=el('g',{class:'pin hide'},G.pins);if(e.tp[0]==='wld')G.pins.insertBefore(g,G.pins.firstChild);
  e.found=/건국|수립$/.test(e.t)&&!/임시 정부|정부 수립/.test(e.t);
  e.fall=/멸망|병합$|국권 피탈|복속/.test(e.t)&&!/건국/.test(e.t);
  el('circle',{class:'hit',r:16},g);el('ellipse',{class:'psh',cx:0,cy:8.6,rx:6,ry:2},g);el('circle',{class:'ring',r:10,style:`stroke:var(--t-${e.tp[0]})`},g);
  const kind=e.tp[0];g.classList.add('k-'+kind);if(e.found)g.classList.add('found');if(e.fall)g.classList.add('fall');
  const sc=e.found?stateColor(e):null;
  const gl=el('g',{class:'gl'},g);
  if(!e.found&&!e.fall&&!e.treaty&&!e.icon&&(kind==='pol'||kind==='ind')){g.classList.add('flagpin');el('path',{class:'pole',d:'M0,1.5V-26'},gl);el('path',{class:'flg',d:'M0.8,-25.5C5,-28.5,9.5,-22,15,-25.2V-14.8C9.5,-11.6,5,-18.1,0.8,-15.1Z',style:`fill:var(--t-${kind})`},gl);el('circle',{class:'knob',cx:0,cy:-26.6,r:1.7},gl)}
  else{el('circle',{class:'dot',r:8,style:`fill:${sc||`var(--t-${kind})`}`},gl);if(e.fall){gl.querySelector('.dot').style.fill='color-mix(in srgb,var(--ink) 80%,var(--seal))';el('path',{class:'gp',d:'M-3.6,-3.6L3.6,3.6M3.6,-3.6L-3.6,3.6'},gl)}else if(e.icon&&e.icon!=='hit'&&ICON_GL[e.icon]){const I=ICON_GL[e.icon];const dt=gl.querySelector('.dot');if(I[2])dt.style.fill=I[2];g.classList.add('ic-'+e.icon);el('path',{class:'gp'+(I[1]?' f':'')+(e.icon==='inc'?' bold':''),d:I[0]},gl)}else if(e.treaty){g.classList.add('treaty');const dt=gl.querySelector('.dot');dt.remove();el('circle',{class:'seal',r:8.5},gl);const st=el('text',{class:'sealt',x:0,y:3.6},gl);st.textContent='조'}else if(!e.found&&(kind==='war'||e.icon==='hit')){gl.querySelector('.dot').remove();el('path',{class:'burst',d:BURST},gl);el('path',{class:'burst2',d:BURST2},gl)}else{const G2=e.found?GLYPH.crown:(GLYPH[kind]||GLYPH.pol);el('path',{class:'gp'+(G2[1]?' f':''),d:G2[0]},gl)}}
  const t=el('text',{x:(kind==='war'&&!e.icon||e.icon==='hit')&&!e.found&&!e.fall&&!e.treaty?14:12,y:4},g);t.textContent=e.s||e.t;
  g.addEventListener('click',ev=>{ev.stopPropagation();if(dragMoved)return;tapPin(e)});
  const o=ovItem(g,X(e.ll[0]),Y(e.ll[1]));o.pin=e;o.t=t;pinOf.set(e.id,o);
});

/* ───────── 보기 범위 (확대·이동) ───────── */
let vb={x:0,y:0,w:1000,h:1000};
const BOUND={x:X(111.5),y:Y(52.5),w:X(143)-X(111.5),h:Y(24.5)-Y(52.5)};
function box(v){return {x:X(v[0]),y:Y(v[3]),w:X(v[2])-X(v[0]),h:Y(v[1])-Y(v[3])}}
function safeArea(){const r=svg.getBoundingClientRect();const card=$('fcard').getBoundingClientRect();const dock=$('dock').getBoundingClientRect();
  let top=10,left=10;const narrow=r.width<600;
  if(narrow)top=Math.min(card.bottom-r.top+6,r.height*.42);else left=Math.min(card.right-r.left+8,r.width*.4);
  const right=narrow?10:56;return {cw:r.width,ch:r.height,l:left,t:top,w:Math.max(80,r.width-left-right),h:Math.max(80,(dock.top-r.top)-top-(r.height>r.width?54:34))}}
function fitBox(b){const a=safeArea();const s=Math.max(b.w/a.w,b.h/a.h);return {w:a.cw*s,h:a.ch*s,x:b.x+b.w/2-(a.l+a.w/2)*s,y:b.y+b.h/2-(a.t+a.h/2)*s}}
const fitVB=v=>fitBox(box(v));
/* 세계 지도: 위아래는 막고, 옆으로는 한 바퀴 돌아간다(한반도 쪽이 늘 가운데 사본) */
const WRAPW=360*78.801,YTOP=Y(84),YBOT=Y(-58);
function clampVB(n){let {x,y,w,h}=n;const r=w/h,HH=YBOT-YTOP;const maxW=Math.min(WRAPW,HH*r);if(w>maxW){const cx=x+w/2,cy=y+h/2;w=maxW;h=w/r;x=cx-w/2;y=cy-h/2}
  y=h>=HH-1?YTOP+(HH-h)/2:Math.max(YTOP,Math.min(YBOT-h,y));const k=Math.round((x+w/2-X(127))/WRAPW);x-=k*WRAPW;return {x,y,w,h}}
function setVB(n){vb=clampVB(n);svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);placeOV();schedLabels()}
let vbRAF=0;
function animVB(n,D=700){cancelAnimationFrame(vbRAF);if(reduceMotion||!D){setVB(n);return}const a={...vb},t0=performance.now();{const d=(n.x+n.w/2)-(a.x+a.w/2);const k=Math.round(d/WRAPW);if(k)n={...n,x:n.x-k*WRAPW}}
  const stepV=now=>{const u=Math.min(1,(now-t0)/D),e=1-Math.pow(1-u,3);
    const w=a.w*Math.pow(n.w/a.w,e);const cx=(a.x+a.w/2)+((n.x+n.w/2)-(a.x+a.w/2))*e,cy=(a.y+a.h/2)+((n.y+n.h/2)-(a.y+a.h/2))*e;const hh=w*(n.h/n.w);
    setVB({x:cx-w/2,y:cy-hh/2,w,h:hh});if(u<1)vbRAF=requestAnimationFrame(stepV)};vbRAF=requestAnimationFrame(stepV)}
let svgCW=0;function kNow(){if(!svgCW){svgCW=svg.clientWidth;if(window.ResizeObserver&&!kNow.ro){kNow.ro=new ResizeObserver(()=>{svgCW=svg.clientWidth});kNow.ro.observe(svg)}}return vb.w/(svgCW||1)}
function placeOV(){const k=kNow();$('lshg').setAttribute('transform',`translate(${(1.2*k).toFixed(2)},${(2.2*k).toFixed(2)})`);for(const o of OV)o.g.setAttribute('transform',`translate(${o.x.toFixed(1)},${o.y.toFixed(1)})${o.rot!=null?` rotate(${o.rot.toFixed(1)})`:''} scale(${k.toFixed(4)})`);placeBubble()}

/* 겹치는 글자 숨기기 */
let labT=0;function schedLabels(){if(labT)return;labT=requestAnimationFrame(()=>{labT=0;placeLabels()})}
/* 땅 위인지 빠르게 판정: 해안선을 한 번 작은 그림으로 그려 두고 점을 찍어 봄 */
let LMASK=null;function landAt(x,y){if(!LMASK){try{const S=.5;const P=new Path2D((LAND.korHi||LAND.kor)+' '+LAND.ctx);const tmp=document.createElementNS('http://www.w3.org/2000/svg','path');tmp.setAttribute('d',LAND.ctx);svg.appendChild(tmp);const b1=tmp.getBBox();tmp.setAttribute('d',LAND.kor);const b2=tmp.getBBox();tmp.remove();
  const x0=Math.min(b1.x,b2.x),y0=Math.min(b1.y,b2.y),x1=Math.max(b1.x+b1.width,b2.x+b2.width),y1=Math.max(b1.y+b1.height,b2.y+b2.height);const W=Math.ceil((x1-x0)*S),H=Math.ceil((y1-y0)*S);
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');g.setTransform(S,0,0,S,-x0*S,-y0*S);g.fill(P);g.lineWidth=3;g.stroke(P);LMASK={x0,y0,S,W,H,d:g.getImageData(0,0,W,H).data}}catch(_){LMASK={fail:1}}}
 if(LMASK.fail)return true;const i=Math.floor((x-LMASK.x0)*LMASK.S),j=Math.floor((y-LMASK.y0)*LMASK.S);if(i<0||j<0||i>=LMASK.W||j>=LMASK.H)return false;return LMASK.d[(j*LMASK.W+i)*4+3]>40}
function placeLabels(){
  const k=kNow(),boxes=[];
  const toS=(x,y)=>[(x-vb.x)/k,(y-vb.y)/k];
  const hit=b=>boxes.some(c=>b[0]<c[2]&&b[2]>c[0]&&b[1]<c[3]&&b[3]>c[1]);
  const vis=o=>!o.g.classList.contains('hide')&&!o.g.classList.contains('wait')&&o.g.style.opacity!=='0';
  // 1) 나라 이름: 땅 크기에 맞춘 글씨, 서로 겹치면 위아래로 비켜 놓기
  // 2) 보이는 핀과 도읍 표시 자리
  // 겹친 핀은 오래된 것부터 흐리게 (새 사건·고른 사건이 위)
  const all=OV.filter(o=>o.pin&&!o.g.classList.contains('hide')&&!o.g.classList.contains('wait')&&!o.g.classList.contains('stale'));
  all.sort((a,b)=>(b.pin.id===selId)-(a.pin.id===selId)||(b.g.classList.contains('fresh'))-(a.g.classList.contains('fresh'))||(a.pin.tp[0]==='wld')-(b.pin.tp[0]==='wld')||(isMajor(b.pin)-isMajor(a.pin))||(Math.abs(a.pin.T-curT())-Math.abs(b.pin.T-curT())));
  const kept=[];all.forEach(o=>{const [sx,sy]=toS(o.x,o.y);let near=0,tight=false;for(const q of kept){const d=Math.hypot(q[0]-sx,q[1]-sy);if(d<12)tight=true;if(d<30)near++}
    const bur=o.pin.id!==selId&&(tight||(o.pin.tp[0]==='wld'&&near>0));o.g.classList.toggle('buried',bur);if(!bur)kept.push([sx,sy])});
  const isW=o=>o.pin.tp[0]==='wld';
  const pins=OV.filter(o=>o.pin&&vis(o)&&!o.g.classList.contains('buried')&&!o.g.classList.contains('stale'));
  // 해외 작은 지도·확대 버튼·시대 카드 자리는 비워 둔다
  {const s=svg.getBoundingClientRect();['.zoom','#fcard','#topban.on'].forEach(q=>{const z=document.querySelector(q);if(z&&z.offsetParent){const r=z.getBoundingClientRect();if(r.width)boxes.push([r.left-s.left-6,r.top-s.top-6,r.right-s.left+6,r.bottom-s.top+6])}})}
  {const ins=$('inset');if(ins&&!ins.hidden){const r=ins.getBoundingClientRect(),s=svg.getBoundingClientRect();boxes.push([r.left-s.left-4,r.top-s.top-4,r.right-s.left+4,r.bottom-s.top+4])}}
  pins.filter(o=>!isW(o)).forEach(o=>{const [sx,sy]=toS(o.x,o.y);const r=o.pin.tp[0]==='war'?11:9;boxes.push([sx-r,sy-r,sx+r,sy+r])});
  capItems.forEach(o=>{const [sx,sy]=toS(o.x,o.y);boxes.push([sx-5,sy-5,sx+5,sy+5])});
  const aPts=[];for(const ps of arrOf.values())for(const p of ps){const c=p.g.classList;if(c.contains('hide')||c.contains('gone')||c.contains('stale')||c.contains('dim'))continue;
    if(!p.sp){const pa=p.g.querySelector('.af');p.sp=[];try{const L=pa.getTotalLength();for(let t=0;t<=L;t+=Math.max(6,L/60)){const q=pa.getPointAtLength(t);p.sp.push([q.x,q.y])}}catch(_){}}
    p.sp.forEach(([x,y])=>aPts.push(toS(x,y)))}
  const arrHitN=b=>{let n=0;for(const [x,y] of aPts)if(x>b[0]-3&&x<b[2]+3&&y>b[1]-3&&y<b[3]+3)n++;return n};
  const slabs=OV.filter(o=>o.slab).sort((a,b)=>(b.area||0)-(a.area||0));
  for(const o of slabs){let [sx,sy]=toS(o.x,o.y);const tsp=[...o.t.children].filter(c=>c.tagName==='tspan');const n=tsp.length?Math.max(...tsp.map(c=>c.textContent.length)):o.t.textContent.length,nl=tsp.length||1;const setX=x=>{o.t.setAttribute('x',x);tsp.forEach(c=>c.setAttribute('x',x))};const size=(o.area||300)/k;
    let fs=Math.max(11,Math.min(19,size/7));
    let ox=0,oy=0;{const W=svg.clientWidth,H=svg.clientHeight,m=40;if(o.terr&&o.terr.isPointInFill&&(sx<m||sy<m||sx>W-m||sy>H-m)){
      const ck2=[Math.round(vb.x/8),Math.round(vb.y/8),Math.round(vb.w/8),Math.round(o.x),Math.round(o.y)].join('|');
      if(!o.vc||o.vc.k!==ck2){let best=null,bd=1e18;const LKk=$('landk'),LCc=$('landc');
        for(let i=1;i<10;i++)for(let j=1;j<7;j++){const px=W*i/10,py=H*j/7,q=new DOMPoint(vb.x+px*k,vb.y+py*k);if(!landAt(q.x,q.y))continue;let ok=false;try{ok=o.terr.isPointInFill(q)}catch(_){}if(!ok)continue;const dd=(px-sx)**2+(py-sy)**2;if(dd<bd){bd=dd;best=[px,py]}}
        o.vc={k:ck2,v:best}}
      if(o.vc.v){ox=o.vc.v[0]-sx;oy=o.vc.v[1]-sy;sx+=ox;sy+=oy}}}
    if(size>=n*11*.98*1.15){ // 영토 안에: 자리가 없으면 글씨를 줄이거나 조금 비켜서라도 안에 둔다
      while(fs>11&&size<n*fs*.98*1.15)fs-=1;
      const LK=$('landk'),LC=$('landc');const outN=bx=>{const P=o.terr;if(!P||!P.isPointInFill)return 0;let c=0;for(let i=0;i<=3;i++)for(let j=0;j<=2;j++){const x=vb.x+(bx[0]+(bx[2]-bx[0])*i/3)*k,y=vb.y+(bx[1]+(bx[3]-bx[1])*j/2)*k;try{if(!landAt(x,y)){c++;continue}const q=new DOMPoint(x,y);if(!P.isPointInFill(q))c++}catch(_){}}return c};
      const ck=[pos.i,Math.round(vb.x),Math.round(vb.y),Math.round(vb.w),Math.round(sx),Math.round(sy),aPts.length,boxes.length,fs].join('|');
      let dy=0,dx=0,bs=1e9,w=0,hh=0,bfs=fs;
      const nowT=performance.now();if(o.lc&&(o.lc.k===ck||(o.lc.i===pos.i&&o.lc.nb===boxes.length&&nowT-o.lc.t<900&&Math.abs(o.lc.w-vb.w)<vb.w*.04&&Math.hypot(o.lc.sx-sx,o.lc.sy-sy)<14))){[dy,dx,w,hh,bfs]=o.lc.v;bs=0}
      const CAND=placeLabels.C||(placeLabels.C=(()=>{const r=[];for(const d of [0,1.1,-1.1,2.1,-2.1,3.1,-3.1,4.2,-4.2])for(const e of [0,.5,-.5,1,-1,1.6,-1.6])r.push([d,e,Math.abs(d)+Math.abs(e)*1.5]);return r.sort((p,q)=>p[2]-q[2])})());
      for(let f=fs;f>=10&&bs>=60;f-=1.5){const ww=n*f*.98/2+2,h2=f*.6*nl,fp=(fs-f)*2;
        for(const [d,e,c0] of CAND){if(c0+fp>=bs)break;const b=[sx+e*ww-ww,sy+d*f-h2,sx+e*ww+ww,sy+d*f+h2];let sc=c0+fp+(hit(b)?2000:0);if(sc>=bs)continue;sc+=arrHitN(b)*10;if(sc>=bs)continue;sc+=outN(b)*60;if(sc<bs){bs=sc;dy=d*f;dx=e*ww;w=ww;hh=h2;bfs=f}}}
      if(bs)o.lc={k:ck,v:[dy,dx,w,hh,bfs],t:performance.now(),i:pos.i,nb:boxes.length,w:vb.w,sx,sy};fs=bfs;
      boxes.push([sx+dx-w,sy+dy-hh,sx+dx+w,sy+dy+hh]);
      o.t.style.fontSize=fs+'px';setX((dx+ox).toFixed(1));o.t.setAttribute('y',(dy+oy).toFixed(1));o.t.setAttribute('text-anchor','middle');o.g.classList.remove('out');continue}
    // 영토가 작으면 밖으로 빼고 선으로 잇기
    fs=13;const w=n*fs*.98+4,hh=9*nl;let pick=null;
    for(const [dx,dy] of [[48,26],[48,-26],[-48,26],[-48,-26],[0,44],[0,-44],[70,0],[-70,0]]){const x0=dx>0?sx+dx:dx<0?sx+dx-w:sx-w/2;const b=[x0,sy+dy-hh,x0+w,sy+dy+hh];if(!hit(b)){pick=[dx,dy,b];break}}
    if(!pick){const x0=sx+48;pick=[48,26,[x0,sy+26-hh,x0+w,sy+26+hh]]}
    const [dx,dy,b]=pick;boxes.push(b);
    o.t.style.fontSize=fs+'px';o.t.setAttribute('text-anchor',dx>0?'start':dx<0?'end':'middle');setX(dx>0?dx+2:dx<0?dx-2:0);o.t.setAttribute('y',dy);
    const L=Math.hypot(dx,dy),sh=(L-6)/L;o.ln.setAttribute('x2',(dx*sh).toFixed(1));o.ln.setAttribute('y2',(dy*sh).toFixed(1));o.g.classList.add('out')}
  // 3) 글씨: 중요한 것부터, 오른쪽이 막히면 왼쪽에
  const cand=[];
  pins.forEach(o=>cand.push({o,pr:o.pin.id===selId?9:(isW(o)?0.5:(o.g.classList.contains('fresh')?8:(isMajor(o.pin)?6:(o.pin.tp[0]==='war'?4:3))))}));
  capItems.forEach(o=>cand.push({o,pr:5}));
  nbItems.forEach(o=>cand.push({o,pr:2}));if(typeof chItems!=='undefined'&&chItems)chItems.forEach(o=>cand.push({o,pr:1.2}));
  OV.forEach(o=>{if((o.kind==='riv'&&!o.off)||o.kind==='mt')cand.push({o,pr:o.kind==='mt'?1.5:1})});
  cand.sort((a,b)=>b.pr-a.pr);
  for(const {o} of cand){const [sx,sy]=toS(o.x,o.y);const n=o.t.textContent.length;
    if(o.kind==='nb'){const w=n*12.5;const b=[sx-w/2,sy-11,sx+w/2,sy+4];const ok=!hit(b);o.t.classList.toggle('nolab',!ok);if(ok)boxes.push(b);continue}
    if(o.kind==='riv'){const w=n*10.5;const b=[sx+5,sy-14,sx+5+w,sy-1];const ok=!hit(b);o.t.classList.toggle('nolab',!ok);if(ok)boxes.push(b);continue}
    if(o.kind==='mt'){const w=n*10.5;const b=[sx+8,sy-8,sx+8+w,sy+5];const ok=!hit(b);o.t.classList.toggle('nolab',!ok);if(ok)boxes.push(b);continue}
    const fs=11.5,w=n*fs+2,po=o.pin&&o.pin.tp[0]==='war'&&!o.pin.found&&!o.pin.fall?14:12;const right=o.cap?[sx+7,sy-18,sx+8+w,sy-3]:[sx+po-1,sy-8,sx+po+w,sy+8];const left=o.cap?[sx-8-w,sy-18,sx-7,sy-3]:[sx-po-w,sy-8,sx-po+1,sy+8];
    const below=[sx-w/2,sy+10,sx+w/2,sy+26],above=[sx-w/2,sy-(o.pin&&o.g.classList.contains('flagpin')?44:30),sx+w/2,sy-(o.pin&&o.g.classList.contains('flagpin')?28:14)];
    if(o.t.dataset.y0==null)o.t.dataset.y0=o.t.getAttribute('y')||'';
    let side=null;if(!hit(right))side='r';else if(!hit(left))side='l';else if(o.pin&&!hit(below))side='b';else if(o.pin&&!hit(above))side='a';
    o.t.classList.toggle('nolab',!side);
    if(side==='b'||side==='a'){boxes.push(side==='b'?below:above);o.t.setAttribute('x',0);o.t.setAttribute('y',side==='b'?22:(above[3]-sy-3));o.t.setAttribute('text-anchor','middle')}
    else if(side){boxes.push(side==='r'?right:left);if(o.t.dataset.y0)o.t.setAttribute('y',o.t.dataset.y0);else o.t.removeAttribute('y');o.t.setAttribute('x',side==='r'?(o.cap?8:po):(o.cap?-8:-po));o.t.setAttribute('text-anchor',side==='r'?'start':'end')}}
}

/* 끌기·집기 확대 */
const ptrs=new Map();let dragMoved=false,pinch=null,userMoved=false,downPt=null;
svg.addEventListener('pointerdown',e=>{ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});dragMoved=false;downPt={x:e.clientX,y:e.clientY};if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),vb:{...vb},mx:(a.x+b.x)/2,my:(a.y+b.y)/2}}});
window.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;const p=ptrs.get(e.pointerId);const dx=e.clientX-p.x,dy=e.clientY-p.y;
  if(downPt&&Math.hypot(e.clientX-downPt.x,e.clientY-downPt.y)>6){dragMoved=true;svg.classList.add('drag')}
  p.x=e.clientX;p.y=e.clientY;
  if(ptrs.size===2&&pinch){const [a,b]=[...ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y);const s=pinch.d/d;const r=svg.getBoundingClientRect();
    const mx=(a.x+b.x)/2-r.left,my=(a.y+b.y)/2-r.top;const k0=pinch.vb.w/r.width;const ux=pinch.vb.x+(pinch.mx-r.left)*k0,uy=pinch.vb.y+(pinch.my-r.top)*k0;
    const w=clampW(pinch.vb.w*s),k=w/r.width;cancelAnimationFrame(vbRAF);setVB({x:ux-mx*k,y:uy-my*k,w,h:w*r.height/r.width});userMoved=true}
  else if(ptrs.size===1&&dragMoved){const k=kNow();cancelAnimationFrame(vbRAF);setVB({...vb,x:vb.x-dx*k,y:vb.y-dy*k});userMoved=true}});
function endPtr(e){if(ptrs.has(e.pointerId))schedRecenter();ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;if(!ptrs.size){svg.classList.remove('drag');setTimeout(()=>dragMoved=false,0)}}
window.addEventListener('pointerup',endPtr);window.addEventListener('pointercancel',endPtr);
/* 지도를 많이 벗어나면 잠시 뒤 제자리로 */
let recT=0;function schedRecenter(){clearTimeout(recT);recT=setTimeout(recenterIfLost,4000)}
function recenterIfLost(){if(ptrs.size||bubId!=null||$('v-map').hidden)return;
  const b=abroad&&outPins.length?box(outBox()):box(FRAMES[pos.i].view);
  const ix=Math.max(0,Math.min(vb.x+vb.w,b.x+b.w)-Math.max(vb.x,b.x)),iy=Math.max(0,Math.min(vb.y+vb.h,b.y+b.h)-Math.max(vb.y,b.y));
  const seen=ix*iy/(vb.w*vb.h),cover=ix*iy/(b.w*b.h);
  const f=fitBox(b),zoomedIn=vb.w<f.w*.75;
  const off=Math.hypot((vb.x+vb.w/2)-(f.x+f.w/2),(vb.y+vb.h/2)-(f.y+f.h/2))/Math.min(vb.w,vb.h);
  if(zoomedIn?seen<.4:(off>.12||cover<.8)){userMoved=false;animVB(f,900)}}
const clampW=w=>Math.max(70,Math.min(3000,w));
function zoomAt(f,cx,cy){const r=svg.getBoundingClientRect();if(cx==null){cx=r.width/2;cy=r.height/2}const k=kNow();const ux=vb.x+cx*k,uy=vb.y+cy*k;const w=clampW(vb.w*f),k2=w/r.width;return {x:ux-cx*k2,y:uy-cy*k2,w,h:w*r.height/r.width}}
svg.addEventListener('wheel',e=>{e.preventDefault();schedRecenter();const r=svg.getBoundingClientRect();cancelAnimationFrame(vbRAF);setVB(zoomAt(Math.exp(e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top));userMoved=true},{passive:false});
const zoomSel=f=>{const e=selId!=null?EVENTS.find(x=>x.id===selId):null;const o=e&&pinOf.get(e.id);if(!o||!e.ll)return zoomAt(f);const a=safeArea();const w=clampW(vb.w*f),h=w*a.ch/a.cw;const k=w/a.cw;return {w,h,x:o.x-(a.l+a.w/2)*k,y:o.y-(a.t+a.h/2)*k}};
$('zin').onclick=()=>{animVB(zoomSel(1/1.6),300);userMoved=true};
$('zout').onclick=()=>{animVB(zoomSel(1.6),300);userMoved=true};
$('zfit').onclick=()=>{userMoved=false;abroad=false;animVB(fitVB(FRAMES[pos.i].view));updateInset()};
svg.addEventListener('click',()=>{if(!dragMoved&&bubId!=null)closeBubble()});

/* ───────── 해외 사건 작은 지도 ───────── */
let abroad=false,outPins=[];
const inset=$('inset'),insvg=$('insvg');
function inMain(e){const v=FRAMES[e.f].view;return e.ll[0]>=v[0]&&e.ll[0]<=v[2]&&e.ll[1]>=v[1]&&e.ll[1]<=v[3]}
function outBox(){let a=1e9,b=1e9,c=-1e9,d=-1e9;outPins.forEach(e=>{a=Math.min(a,e.ll[0]);c=Math.max(c,e.ll[0]);b=Math.min(b,e.ll[1]);d=Math.max(d,e.ll[1])});const pw=Math.max(2.2,(c-a)*.25),ph=Math.max(1.6,(d-b)*.25);return [a-pw,b-ph,c+pw,d+ph]}
function updateInset(){
  const t=curT();const seen=e=>{const x=X(e.ll[0]),y=Y(e.ll[1]);return x>=vb.x&&x<=vb.x+vb.w&&y>=vb.y&&y<=vb.y+vb.h};outPins=byFrame[pos.i].filter(e=>e.ll&&!inMain(e)&&!(abroad?false:seen(e))&&(!playing||e.T<=t+1e-9));
  if(!outPins.length){inset.hidden=true;if(abroad){abroad=false;animVB(fitVB(FRAMES[pos.i].view))}return}
  inset.hidden=false;
  {const mx=Math.max(0,...outPins.map(e=>(e.s||e.t).length));const narrow=innerWidth<560;const want=Math.round(Math.min(narrow?220:260,Math.max(narrow?128:156,mx*11+44)));inset.style.width=abroad?'':want+'px'}
  const v=abroad?FRAMES[pos.i].view:outBox(),b=box(v);const W=Math.max(60,inset.clientWidth||150),H=Math.max(40,(inset.clientHeight||120)-20);const s=Math.max(b.w/W,b.h/H);
  insvg.setAttribute('viewBox',`${b.x+b.w/2-W*s/2} ${b.y+b.h/2-H*s/2} ${W*s} ${H*s}`);
  const g=$('inpins');g.innerHTML='';
  if(!abroad){const vbx=b.x+b.w/2-W*s/2,cx0=b.x+b.w/2;outPins.forEach(e=>{const px=X(e.ll[0]),py=Y(e.ll[1]);el('circle',{cx:px,cy:py,r:4.5*s,style:`fill:var(--t-${e.tp[0]});stroke:var(--panel);stroke-width:${1.5*s}`},g);const right=px>cx0;const tx=el('text',{x:px+(right?-6:6)*s,y:py+4*s,'text-anchor':right?'end':'start',style:`font-size:${10.5*s}px;stroke-width:${2.5*s}px`},g);tx.textContent=e.s||e.t;
    try{const bb=tx.getBBox();const L=vbx+2*s,Rr=vbx+W*s-2*s;if(bb.x<L)tx.setAttribute('x',+tx.getAttribute('x')+(L-bb.x));else if(bb.x+bb.width>Rr)tx.setAttribute('x',+tx.getAttribute('x')-(bb.x+bb.width-Rr))}catch(_){}});
    /* 작은 지도 안에서 이름끼리 겹치면 나중 것은 숨김 */
    {const kept=[];[...g.querySelectorAll('text')].forEach(t=>{try{const b=t.getBBox();const pad=1.5*s;const hitK=kept.some(c=>b.x<c.x+c.width+pad&&b.x+b.width+pad>c.x&&b.y<c.y+c.height&&b.y+b.height>c.y);if(hitK)t.style.display='none';else kept.push(b)}catch(_){}})}}
  placeInset();
  const nm0=[...new Set(outPins.map(e=>placeName(e)).filter(Boolean))];const names=nm0.length?nm0[0]+(nm0.length>1?` 외 ${nm0.length-1}곳`:''):'';
  $('inlab').textContent=abroad?'한반도로 돌아가기':names;
}
/* 해외 작은 지도: 기본 지도의 사건·이름을 가리지 않는 구석으로 */
let insetCorner='br';
function placeInset(){const wrap=svg.getBoundingClientRect();if(!wrap.width)return;const iw=inset.offsetWidth||150,ih=inset.offsetHeight||124;
  const dock=$('dock')?$('dock').getBoundingClientRect():{top:wrap.bottom};const card=$('fcard')?$('fcard').getBoundingClientRect():{bottom:wrap.top+90,right:wrap.left+280};
  const bottomY=Math.min(wrap.height,dock.top-wrap.top)-ih-52,topY=Math.max(12,card.bottom-wrap.top+10);
  const hb=document.querySelector('header.top').getBoundingClientRect().bottom-wrap.top;const C={br:[wrap.width-iw-12,bottomY],bl:[12,bottomY],tr:[wrap.width-iw-60,Math.max(12,hb+10)],tl:[12,Math.max(topY,hb+10)]};
  const pts=[];document.querySelectorAll('#pins .pin:not(.hide):not(.wait):not(.stale):not(.buried):not(.gone), #ovl text:not(.hide), #arrleg:not([hidden])').forEach(g=>{const r=g.getBoundingClientRect();if(r.width){const lab=g.matches('.pin')?110:0;pts.push([r.left-wrap.left-(lab?40:0),r.top-wrap.top,r.right-wrap.left+lab,r.bottom-wrap.top])}});
  const score=k=>{const [x,y]=C[k];if(y<0||x<0)return 1e9;let s=0;pts.forEach(([a,b,c,d])=>{if(c>x-4&&a<x+iw+4&&d>y-4&&b<y+ih+4)s++});return s};
  let best=insetCorner,bs=score(insetCorner);['br','bl','tr','tl'].forEach(k=>{const s=score(k);if(s<bs){bs=s;best=k}});insetCorner=best;
  const [x,y]=C[best];inset.style.left=x+'px';inset.style.top=y+'px';inset.style.right='auto';inset.style.bottom='auto'}
/* 해외 작은 지도를 누르면 지구본 돌듯이: 멀리 빠졌다가 날아가서 내려앉기 */
function flyVB(n,D=1300){const a={...vb};const ux=Math.min(a.x,n.x),uy=Math.min(a.y,n.y),uw=Math.max(a.x+a.w,n.x+n.w)-ux,uh=Math.max(a.y+a.h,n.y+n.h)-uy;const r=a.w/a.h;let mw=Math.max(uw,uh*r)*1.12;const mid={w:mw,h:mw/r,x:ux+uw/2-mw/2,y:uy+uh/2-mw/r/2};
  if(reduceMotion){setVB(n);return}cancelAnimationFrame(vbRAF);const t0=performance.now();const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const lerp=(p,q,k)=>({x:p.x+(q.x-p.x)*k,y:p.y+(q.y-p.y)*k,w:p.w+(q.w-p.w)*k,h:p.h+(q.h-p.h)*k});
  const step=now=>{const t=Math.min(1,(now-t0)/D);const k=ease(t);const c1=lerp(a,mid,Math.sin(Math.PI*k/1)*0+Math.min(1,k*2)),pos2=lerp(a,n,k);const z=Math.sin(Math.PI*k);const v={x:pos2.x+(mid.x+mid.w/2-(pos2.x+pos2.w/2))*0,y:pos2.y,w:pos2.w+(mid.w-pos2.w)*z,h:pos2.h+(mid.h-pos2.h)*z};v.x=pos2.x+pos2.w/2-v.w/2;v.y=pos2.y+pos2.h/2-v.h/2;setVB(v);if(t<1)vbRAF=requestAnimationFrame(step);else{setVB(n);schedLabels&&schedLabels()}};vbRAF=requestAnimationFrame(step)}
inset.addEventListener('click',()=>{abroad=!abroad;userMoved=true;flyVB(abroad?fitVB(outBox()):fitVB(FRAMES[pos.i].view));updateInset()});

/* ───────── 시간 위치 ───────── */
const N=FRAMES.length;
let pos={i:Math.min(store.get('frame',0),N-1),f:0},playing=false,speed=1,curFrame=-1,lastT=null,holdUntil=0;
const cum=[];{let s=0;FRAMES.forEach(f=>{cum.push(s);s+=f.w});var TOT=s}
const curT=()=>tOfF(pos.i,pos.f);
function sOfPos(){return (cum[pos.i]+FRAMES[pos.i].w*pos.f)/TOT}
function posOfS(s){s=Math.max(0,Math.min(1,s))*TOT;let i=0;for(let j=0;j<N;j++)if(cum[j]<=s)i=j;return {i,f:Math.min(.9999,(s-cum[i])/FRAMES[i].w)}}

function fmtNow(t,F){
  if(t<-10000)return `<small>약</small>${Math.round(-t/10000)}<small>만 년 전</small>`;
  if(t<0)return `<small>기원전</small>${-Math.floor(t)}`;
  const y=Math.floor(t);
  if(F.y>=1945&&F.y<1954){const m=Math.min(12,Math.floor((t-y)*12)+1);return `${y}<small>년</small> ${m}<small>월</small>`}
  return `${y}<small>년</small>`;
}

/* 재생 막대 */
(function buildSlider(){
  const trk=$('trk'),tk=$('sticks');
  const segCol={prehist:'dongye',pre:'gojoseon',early:'buyeo',three:'goguryeo',nsk:'silla',hsk:'baekje',goryeo:'goryeo',joseon1:'joseon',joseon2:'joseon',modern1:'han',colonial:'japan',contemp:'south'};
  FRAMES.forEach((f,i)=>{const s=cum[i]/TOT*100;const w=f.w/TOT*100;const sg=h('div','seg');sg.style.left=s+'%';sg.style.width=w+'%';sg.style.background=`var(--c-${segCol[f.era]})`;sg.style.opacity=i%2?.55:.8;trk.insertBefore(sg,trk.firstChild);
    if(i){const t=h('div','tick');t.style.left=s+'%';tk.appendChild(t)}});
  const labs=[[0,'선사'],[2,'고조선'],[4,'삼국'],[8,'남북국'],[11,'고려'],[16,'조선'],[20,'근대'],[23,'일제'],[24,'현대']];
  const add=()=>{tk.querySelectorAll('.elab').forEach(x=>x.remove());const W=$('slider').clientWidth||300;let last=-99;
    labs.forEach(([i,n])=>{const px=cum[i]/TOT*W+(FRAMES[i].w/TOT*W)/2;const x=i===0?Math.max(px,16):px;if(x-last<40)return;last=x;const l=h('div','elab',n);l.style.left=x+'px';tk.appendChild(l)})};
  add();new ResizeObserver(add).observe($('slider'));
})();
function drawSlider(){const s=sOfPos()*100;$('sfill').style.width=s+'%';$('thumb').style.left=s+'%';$('slider').setAttribute('aria-valuenow',Math.round(s));$('slider').setAttribute('aria-valuetext',FRAMES[pos.i].title)}
(function sliderDrag(){const sl=$('slider');let on=false;const go=e=>{const r=sl.getBoundingClientRect();const p=posOfS((e.clientX-r.left)/r.width);setPos(p.i,p.f,{scrub:true})};
  sl.addEventListener('pointerdown',e=>{on=true;sl.setPointerCapture(e.pointerId);pause();go(e)});
  sl.addEventListener('pointermove',e=>{if(on)go(e)});
  sl.addEventListener('pointerup',()=>{on=false;if(!userMoved)animVB(fitVB(FRAMES[pos.i].view))});
  sl.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault();step(1)}else if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault();step(-1)}else if(e.key===' '){e.preventDefault();toggle()}});
})();

function setPos(i,f,opt={}){
  const changed=i!==curFrame;pos={i,f};
  if(changed){applyFrame(i,curFrame>=0&&!opt.instant);curFrame=i;renderCard();store.set('frame',i);abroad=false;closeBubble();
    if(opt.fit||(!userMoved&&!opt.scrub))animVB(fitVB(FRAMES[i].view),opt.instant?0:900);
    if(panelMode==='list'||panelMode==='era')renderPanel()}
  updateTime(changed);drawSlider();
}
let lastRH=null,lastRG=null;
function updateTime(changed){
  const t=curT(),F=FRAMES[pos.i];
  $('yr').innerHTML=fmtNow(t,F);
  const rg=regimeAt(t);const rgk=rg?rg.n:F.title;
  if(rgk!==lastRG){lastRG=rgk;$('yr-ft').innerHTML=rg?`<span class="rgm" style="--gc:var(--g${rg.c})">${esc(rg.n)}</span>`:esc(F.title);$('yrbox').style.setProperty('--gc',rg?`var(--g${rg.c})`:'var(--rule)')}
  const rh=reignHTML(t)+ongHTML(t);if(rh!==lastRH){$('reign').innerHTML=rh;lastRH=rh;relayout()}
  const evs=byFrame[pos.i];
  for(const o of OV){if(!o.pin)continue;const e=o.pin;const g=o.g;
    if(e.f!==pos.i){if(changed&&!g.classList.contains('hide')&&!g.classList.contains('wait')&&!reduceMotion){g.classList.add('fadeout');g.classList.remove('fresh','sel');clearTimeout(o.fo);o.fo=setTimeout(()=>{g.classList.remove('fadeout');if(o.pin.f!==pos.i)g.classList.add('hide')},620)}else if(!g.classList.contains('fadeout')){g.classList.add('hide');g.classList.remove('wait','fresh')}continue}
    g.classList.remove('hide');
    const due=e.T<=t+1e-9||e.id===selId;
    if(e.found){if(!playing)g.classList.toggle('gone',e.id!==selId);else if(!due)g.classList.remove('gone')}
    if(playing&&due&&g.classList.contains('wait')&&!changed){g.classList.remove('wait');popPin(o)}
    else if(playing&&due&&changed&&Math.abs(e.T-F.t)<0.6){g.classList.remove('wait');clearTimeout(o.pz);o.pz=setTimeout(()=>{if(pos.i===e.f)popPin(o)},450)}
    else g.classList.toggle('wait',!due);
  }
  for(const e of EVENTS){if(!arrOf.has(e.id))continue;
    if(e.f!==pos.i){const ps=arrOf.get(e.id);if(changed&&!ps[0].g.classList.contains('hide')&&!reduceMotion){ps.forEach(p=>{p.g.classList.add('fadeout');p.hg.classList.add('fadeout')});clearTimeout(ps.fo);ps.fo=setTimeout(()=>{ps.forEach(p=>{p.g.classList.remove('fadeout');p.hg.classList.remove('fadeout')});if(e.f!==pos.i)setArrows(e,'hide')},620)}else if(!ps[0].g.classList.contains('fadeout'))setArrows(e,'hide');continue}
    const due=e.T<=t+1e-9||e.id===selId;const ps=arrOf.get(e.id);const wasHidden=ps[0].g.classList.contains('hide');
    if(!due)setArrows(e,'hide');
    else if(playing&&wasHidden&&!changed)setArrows(e,'draw');
    else setArrows(e,(e.id===selId||e.id===freshId)?'on':'dim');
  }
  markStale(t,F);arrowOverlap();if(typeof chG!=='undefined'&&chG)updateChina(t);
  if(playing){for(const e of evs){if(!e.ll&&e.T<=t&&(lastT==null||e.T>lastT))ticker(e)}}
  lastT=t;
  $('listn').textContent='사건 '+evs.length;
  if(panelMode==='list')markListTime();
  updateInset();
  schedLabels();
}
let freshId=null,freshT=0;
function popPin(o){const g=o.g;if(o.pin.found)foundAnim(o);g.classList.remove('pop');void g.getBoundingClientRect();g.classList.add('pop','fresh');ticker(o.pin);clearTimeout(o.ft);o.ft=setTimeout(()=>{g.classList.remove('fresh');schedLabels()},2800)}
/* 나라를 세우는 순간: 물결이 퍼지고 왕관이 떴다가 사라진다 */
function foundAnim(o){const g=o.g,e=o.pin,c=stateColor(e)||'var(--seal)';
  g.classList.remove('gone','fadeout');
  [0,350,700].forEach(d=>{const rp=el('circle',{class:'rip',r:9,style:`stroke:${c};animation-delay:${d}ms`},g);g.insertBefore(rp,g.firstChild.nextSibling);setTimeout(()=>rp.remove(),1900+d)});
  clearTimeout(o.gt);o.gt=setTimeout(()=>{if(selId===e.id||!playing)return;g.classList.add('fadeout');setTimeout(()=>{g.classList.remove('fadeout');if(playing&&selId!==e.id)g.classList.add('gone')},620)},8000)}
let tickT=0;function ticker(e){freshId=e.id;clearTimeout(freshT);freshT=setTimeout(()=>{freshId=null},2800);if(isDecree(e)){topBanner(e);return}const tk=$('ticker');
  tk.innerHTML=`<b>${esc(shortYear(e).replace('BC ','기원전 '))}</b>${esc(e.t)}${e.vs?`<span class="tvs">${esc(e.vs)}</span>`:''}`;tk.classList.add('on');clearTimeout(tickT);tickT=setTimeout(()=>tk.classList.remove('on'),2600)}

/* 재생: 사건 수에 맞춰 장면 길이를 정하고, 나라가 바뀌면 잠깐 쉰다 */
const PER_EVENT=1700,MIN_FRAME=5500;let raf=0,tPrev=0;
const frameDur=i=>Math.max(MIN_FRAME*(FRAMES[i].w<1?.8:1),(FRAMES[i].A.length-1)*PER_EVENT)/speed;
const stateKey=i=>FRAMES[i].st.map(s=>s.id).sort().join();
function play(){if(pos.i===N-1&&pos.f>.98)setPos(0,0,{fit:true});playing=true;userMoved=false;abroad=false;closeBubble();lastT=curT();
  for(const o of OV)if(o.pin&&o.pin.f===pos.i&&o.pin.T>curT()+1e-9)o.g.classList.add('wait');
  $('playic').innerHTML='<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>';$('play').setAttribute('aria-label','멈춤');tPrev=performance.now();holdUntil=0;updateTime(false);raf=requestAnimationFrame(loop)}
function pause(){if(!playing)return;playing=false;cancelAnimationFrame(raf);$('playic').innerHTML='<path d="M8 5.5v13l11-6.5z"/>';$('play').setAttribute('aria-label','재생');updateTime(false)}
function toggle(){playing?pause():play()}
function loop(now){const dt=now-tPrev;tPrev=now;if(now<holdUntil){raf=requestAnimationFrame(loop);return}
  let f=pos.f+dt/frameDur(pos.i)*(typeof rzCur!=="undefined"&&rzCur?.6:1),i=pos.i;
  if(f>=1){if(i===N-1){setPos(i,.9999);pause();return}
    const big=stateKey(i)!==stateKey(i+1)||FRAMES[i].era!==FRAMES[i+1].era;i++;f=0;setPos(i,f,{fit:true});holdUntil=now+(big?750:300)/Math.sqrt(speed)}
  else setPos(i,f);raf=requestAnimationFrame(loop)}
function step(d){pause();const i=Math.max(0,Math.min(N-1,pos.i+d));userMoved=false;setPos(i,0,{fit:true})}
$('play').onclick=toggle;$('prev').onclick=()=>step(-1);$('next').onclick=()=>step(1);
$('spd').onclick=()=>{const S=[.5,1,1.5,2,3];speed=S[(S.indexOf(speed)+1)%S.length]||1;$('spd').textContent=speed+'×'};

/* ───────── 시대 카드 ───────── */
function renderCard(){const F=FRAMES[pos.i];$('f-era').textContent=ERA[F.era].n;$('f-per').textContent=F.per;$('f-title').textContent=F.title;$('f-cap').textContent=F.cap;
  $('f-leg').innerHTML=F.st.map(s=>`<span><i class="${s.hatch?'h':''}" style="${s.hatch?`color:var(--c-${s.c});background:transparent`:`background:color-mix(in srgb,var(--c-${s.c}) 66%,var(--land))`}"></i>${esc(s.name)}</span>`).join('');}
$('f-cap').addEventListener('click',()=>$('fcard').classList.toggle('open'));$('f-title').addEventListener('click',()=>{$('fcard').classList.toggle('open');if(!userMoved)setTimeout(()=>animVB(fitVB(FRAMES[pos.i].view),400),50)});
$('f-sum').onclick=()=>{pause();openPanel('era')};


/* ───────── 지도 위 말풍선 ───────── */
let bubId=null;
function tapPin(e){if(playing)pause();selId=e.id;refreshSel();bubId=e.id;
  const b=$('bubble');b.innerHTML=`<button class="bx" type="button" aria-label="닫기">×</button><div class="bdt">${esc(yearLabel(e))}</div><div class="hrow"><h4>${esc(e.t)}</h4>${hbtn(e)}</div>${vsHTML(e)}${whoHTML(e)}<p>${glx(e.x)}</p><div class="bft"><button class="btn" type="button" data-more>자세히</button>${e.p?`<span>${esc(e.p)}</span>`:''}</div>`;
  b.hidden=false;b.querySelector('.bx').onclick=ev=>{ev.stopPropagation();closeBubble()};b.querySelector('[data-more]').onclick=()=>{closeBubble(true);selectEvent(e,{pan:false})};
  setArrowsAll();placeBubble();if(wide()){panelMode='event';renderPanel()}}
function closeBubble(keepSel){bubId=null;const b=$('bubble');if(b)b.hidden=true;if(!keepSel&&!wide()){selId=null;refreshSel()}}
function placeBubble(){if(bubId==null)return;const o=pinOf.get(bubId);if(!o)return;const b=$('bubble'),wrap=$('mapwrap').getBoundingClientRect();const k=kNow();
  const sx=(o.x-vb.x)/k,sy=(o.y-vb.y)/k;const bw=b.offsetWidth,bh=b.offsetHeight;
  let x=sx-bw/2,y=sy-bh-16;let below=false;if(y<8){y=sy+16;below=true}
  x=Math.max(8,Math.min(wrap.width-bw-8,x));y=Math.max(8,Math.min(wrap.height-bh-8,y));
  b.style.left=x+'px';b.style.top=y+'px';b.style.setProperty('--tx',Math.max(14,Math.min(bw-14,sx-x))+'px');b.classList.toggle('below',below)}
/* 재생 중: 오래전에 끝난 사건은 흐려지다 사라지고, 이어지는 일(전쟁·정권 등)은 끝날 때까지 남는다 */
function keepFor(e,W){const o=ONGOING.find(o=>Math.abs(o[0]-e.T)<1.2&&e.t.slice(0,2)===o[2].slice(0,2));return o?o[1]-e.T:W}
const PIN_HOLD=11000,PIN_MIN=5000; /* 사람이 보기에: 최소 5초, 보통 11초는 남아 있게 (겹치면 그 전에 사라짐) */
function markStale(t,F){const evs=byFrame[pos.i].filter(e=>e.ll);
  if(!playing){evs.forEach(e=>{const o=pinOf.get(e.id);if(o){o.g.classList.remove('stale');o.stl=0}if(arrOf.has(e.id))arrOf.get(e.id).forEach(p=>{p.g.classList.remove('stale');p.hg.classList.remove('stale')})});return}
  const W=Math.max(.4,(F.t2-F.t)/6);const due=evs.filter(e=>e.T<=t+1e-9).sort((a,b)=>b.T-a.T);const keep=new Set(due.slice(0,2).map(e=>e.id));
  const reignChanged=e=>{const R=kingRef(e);if(!R)return false;const now=R.D.r.find(x=>x.s<=t+1e-9&&t<x.e);return now&&now!==R.r&&!(now.name.replace(/\(.*\)/,'')===R.r.name.replace(/\(.*\)/,''))};
  const now=performance.now();
  const stM=new Map();
  evs.forEach(e=>{const o=pinOf.get(e.id);let st=false;if(e.T<=t+1e-9&&e.id!==selId){if(o&&!o.seen)o.seen=now;const age=o?now-o.seen:1e9;const ong=ONGOING.find(q=>Math.abs(q[0]-e.T)<1.2&&e.t.slice(0,2)===q[2].slice(0,2));const ongoing=ong&&t<ong[1];
    st=!!(!ongoing&&!keep.has(e.id)&&(age>PIN_HOLD||(age>PIN_MIN&&reignChanged(e))));if(o){if(st)o.stl=1;else if(o.stl&&!ongoing&&!keep.has(e.id))st=true}}else if(o){o.seen=0;o.stl=0}if(o){const m=stM.get(o);stM.set(o,m===undefined?st:(m&&st))}if(arrOf.has(e.id))arrOf.get(e.id).forEach(p=>{p.g.classList.toggle('stale',st);p.hg.classList.toggle('stale',st)})});stM.forEach((v,o)=>o.g.classList.toggle('stale',v))}
/* 화살표가 겹치면 예전 것은 흐려지다 사라진다 */
function arrowOverlap(){const list=byFrame[pos.i].filter(e=>arrOf.has(e.id)&&!arrOf.get(e.id)[0].g.classList.contains('hide')).sort((a,b)=>(b.id===selId)-(a.id===selId)||b.T-a.T);
  const kept=[];const ov=(a,b)=>{const w=Math.min(a[2],b[2])-Math.max(a[0],b[0]),h=Math.min(a[3],b[3])-Math.max(a[1],b[1]);if(w<=0||h<=0)return 0;const A=Math.max(30,(a[2]-a[0]))*Math.max(30,(a[3]-a[1])),B=Math.max(30,(b[2]-b[0]))*Math.max(30,(b[3]-b[1]));return w*h/Math.min(A,B)};
  list.forEach(e=>{const ps=arrOf.get(e.id);const gone=e.id!==selId&&ps.some(p=>kept.some(q=>ov(p.bb,q)>.3));ps.forEach(p=>{p.g.classList.toggle('gone',gone);p.hg.classList.toggle('gone',gone)});if(!gone)ps.forEach(p=>kept.push(p.bb))})}
function setArrowsAll(){for(const e of byFrame[pos.i])if(arrOf.has(e.id)&&!arrOf.get(e.id)[0].g.classList.contains('hide'))setArrows(e,(e.id===selId)?'on':'dim');arrowOverlap()}

/* ───────── 사건 패널 ───────── */
let panelMode='list',selId=null;
const wide=()=>matchMedia('(min-width:900px)').matches;
function openPanel(mode){panelMode=mode;renderPanel();$('panel').classList.add('open')}
function closePanel(){$('panel').classList.remove('open');if(!wide()){selId=null;refreshSel()}}
$('pclose').onclick=closePanel;$('pprev').onclick=()=>step(-1);$('pnow').onclick=()=>{if(panelMode!=='list'){panelMode='list';renderPanel()}const pb=$('pbody');const cur=pb.querySelector('li.now')||[...pb.querySelectorAll('li.cur:not(.yet)')].pop()||pb.querySelector('li.fh.cur');if(cur){pb.scrollTo({top:Math.max(0,cur.offsetTop-pb.clientHeight*.35),behavior:'smooth'});cur.classList.remove('hit');void cur.offsetWidth;cur.classList.add('hit')}};$('pnext').onclick=()=>step(1);$('listbtn').onclick=()=>{$('panel').classList.contains('open')&&panelMode==='list'?closePanel():openPanel('list')};
$('pback').onclick=()=>{clearSel()};
function clearSel(){selId=null;refreshSel();panelMode='list';renderPanel()}
function refreshSel(){for(const o of OV)if(o.pin){o.g.classList.toggle('sel',o.pin.id===selId);if(o.pin.id===selId)o.g.classList.remove('gone')}setArrowsAll();schedLabels()}
function evDetailHTML(e){return `<div class="dt">${esc(yearLabel(e))}</div>${e.yl?'':`<div class="reign">${reignHTML(e.T)}</div>`}<div class="hrow"><h2>${esc(e.t)}</h2>${hbtn(e)}</div>${vsHTML(e)}${e.p?`<div class="pl"><svg class="ic" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>${esc(e.p)}</div>`:''}${whoHTML(e)}
      <div class="tags">${e.tp.map(tg).join('')}</div><p class="ds">${glx(e.x)}</p>`}
function renderPanel(){
  const b=$('pbody'),F=FRAMES[pos.i];$('pback').hidden=panelMode==='list';$('pfr').hidden=true;b.onclick=null;
  if(panelMode==='event'){const e=EVENTS.find(x=>x.id===selId);if(!e){panelMode='list';return renderPanel()}
    $('ptitle').textContent=F.title;
    const list=byFrame[e.f],k=list.indexOf(e);
    b.innerHTML=`<div class="evd">${evDetailHTML(e)}<div class="nav"><button class="btn" id="e-prev" ${k<=0?'disabled':''}>← 이전 사건</button><button class="btn" id="e-next" ${k>=list.length-1?'disabled':''}>다음 사건 →</button><button class="btn" id="e-tl">연표에서 보기</button></div></div>`;
    $('e-prev').onclick=()=>selectEvent(list[k-1],{pan:true});$('e-next').onclick=()=>selectEvent(list[k+1],{pan:true});
    $('e-tl').onclick=()=>gotoTimeline(e);b.scrollTop=0;return}
  if(panelMode==='era'){const E=ERA[F.era];$('ptitle').textContent='시대 정리';
    b.innerHTML=`<div class="esum"><h2>${esc(E.n)}</h2><div class="rg">${esc(E.rg)}</div>${sumHTML(E)}<div style="margin-top:14px;display:flex;gap:6px;flex-wrap:wrap"><button class="btn" id="era-ov">연표 한눈에 보기</button><button class="btn" id="era-tl">이 시대 연표 보기</button></div></div>`;
    $('era-tl').onclick=()=>{showView('tl');$('era-'+E.k).scrollIntoView({block:'start'})};$('era-ov').onclick=()=>{showView('ov');ovShow(E.k)};b.scrollTop=0;return}
  $('ptitle').innerHTML=`<span class="pt1">${esc(F.title)}</span><span class="pt2">사건 ${byFrame[pos.i].length}</span>`;
  $('pfr').hidden=false;$('pprev').disabled=pos.i<=0;$('pnext').disabled=pos.i>=N-1;
  const row=e=>{const k=eventKing(e);return `<li data-id="${e.id}" class="${e.f>pos.i?'fut':''}${e.f===pos.i?' cur':''}${e.top?' bin':''}"><button type="button"><span class="d">${esc(shortYear(e))}${e.m&&!e.yl&&e.y>=1880?'.'+e.m:''}</span><span class="t">${e.treaty?'<i class="tseal">조</i>':''}${esc(e.t)}</span><span class="p">${e.tp.map(tg).join('')}${e.vs?`<span class="lvs">${esc(e.vs)}</span>`:''}${k&&!e.vs?`<span>${esc(k.txt)}</span>`:''}</span></button></li>`};
  b.innerHTML=`<ul class="elist all">${FRAMES.map((Fr,i)=>`<li class="fh${i===pos.i?' cur':''}" data-fr="${i}"><button type="button"><b>${esc(Fr.per)}</b>${esc(Fr.title)}</button></li>`+byFrame[i].map(row).join('')).join('')}</ul>`;
  b.onclick=ev=>{const li=ev.target.closest('li');if(!li)return;if(li.dataset.fr!=null){pause();userMoved=false;setPos(+li.dataset.fr,0,{fit:true});return}selectEvent(EVENTS.find(x=>x.id===+li.dataset.id),{pan:true})};
  lastScrolled=null;curLis=[...b.querySelectorAll('li.cur[data-id]')];
  const head=b.querySelector('li.fh.cur');if(head&&!playing)b.scrollTop=Math.max(0,head.offsetTop-4);
  markListTime(true);
}
let lastScrolled=null,curLis=[];const EVID=new Map(EVENTS.map(e=>[e.id,e]));
function markListTime(force){if(panelMode!=='list')return;const t=curT();let cur=null;$('pbody').classList.toggle('playing',playing);
  curLis.forEach(li=>{const e=EVID.get(+li.dataset.id);const yet=playing&&e.T>t+1e-9;li.classList.toggle('yet',yet);if(!yet)cur=li;li.classList.toggle('on',e.id===selId)});
  if(!cur&&playing)cur=$('pbody').querySelector('li.fh.cur');
  if(playing&&cur&&cur!==lastScrolled){lastScrolled=cur;$('pbody').querySelectorAll('li.now').forEach(x=>x.classList.remove('now'));cur.classList.add('now');const pb=$('pbody');pb.scrollTo({top:Math.max(0,cur.offsetTop-pb.clientHeight*.35),behavior:reduceMotion?'auto':'smooth'})}}
function sumHTML(E){return `<div class="sumgrid">${TOPICS.filter(t=>E.s[t.k]).map(t=>`<div class="sumblk" style="--tc:var(--t-${t.k})"><h4>${t.n}</h4><ul>${E.s[t.k].map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>`}

function selectEvent(e,opt={}){
  if(!e)return;pause();
  if(e.f!==pos.i)setPos(e.f,fOfT(e.f,e.T),{scrub:!opt.pan});
  else updateTime(false);
  selId=e.id;refreshSel();openPanel('event');
  const o=pinOf.get(e.id);
  if(o&&opt.pan){if(!inMain(e)&&!abroad){abroad=true;updateInset()}const a=safeArea();let w=vb.w;const tw=a.cw*(220/Math.min(a.w,a.h));if(w>tw*2.2)w=tw*1.4;const k=w/a.cw,hh=w*a.ch/a.cw;
    const n={w,h:hh,x:o.x-(a.l+a.w/2)*k,y:o.y-(a.t+a.h*(wide()?.5:.3))*k};animVB(n,600);userMoved=true}
}

/* ───────── 화면 전환 ───────── */
const VIEWS=['map','ov','tl','tp','kg','tr','pp','dc','rl'];
function showView(v){if(v==='tp')v='tr';{const ap=document.querySelector('.app');ap.classList.toggle('onmap',v==='map');ap.style.setProperty('--toph',document.querySelector('.top').offsetHeight+'px')}VIEWS.forEach(k=>{$('v-'+k).hidden=k!==v;const tb=$('tab-'+k);if(tb)tb.setAttribute('aria-selected',k===v)});document.querySelectorAll('.vmode button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));if(v==='tl'||v==='ov'||v==='kg')store.set('tlmode',v);if(v==='kg')kgShow(kgSel,false);if(v==='tr')trShow();if(v==='pp')ppShow();store.set('view',v);if(v==='map'){requestAnimationFrame(()=>{placeOV();placeLabels()})}else pause();if(v==='ov'&&(!ovBuilt||(ovDirty&&ovSel==='heart')))ovShow(store.get('overa',FRAMES[pos.i].era))}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{if(b.dataset.v==='tl'&&tlHeart){tlHeart=false;renderTLFilter()}showView(b.dataset.v)});
document.querySelectorAll('.vmode button').forEach(b=>b.onclick=()=>{if(b.dataset.v==='bm'){tlHeart=true;showView('tl');renderTLFilter();$('tlread').scrollTop=0}else{if(b.dataset.v==='tl'&&tlHeart){tlHeart=false;renderTLFilter()}showView(b.dataset.v)}syncVmode()});
function syncVmode(){const v=store.get('view','map');document.querySelectorAll('.vmode button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==='bm'?(v==='tl'&&tlHeart):(b.dataset.v===v&&!(v==='tl'&&tlHeart))))}
function gotoTimeline(e){showView('tl');if(tlHeart){tlHeart=false;renderTLFilter()}const li=document.querySelector(`#tlbody li[data-id="${e.id}"]`)||[...document.querySelectorAll('#tlbody li[data-ids]')].find(x=>x.dataset.ids.split(',').includes(String(e.id)));if(li){if(li.hidden){tlFilter=new Set();$('q').value='';renderTLFilter()}li.scrollIntoView({block:'center'});li.classList.remove('hit');void li.offsetWidth;li.classList.add('hit')}}
function gotoMap(e){showView('map');requestAnimationFrame(()=>selectEvent(e,{pan:true}))}

/* ───────── 연표 ───────── */
let tlFilter=new Set();
const PIN_IC='<svg class="ic" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
const isSiteEv=e=>(e.era==='prehist'||e.era==='pre')&&/유적|동굴|패총|암각화|고인돌/.test(e.t);
/* 유적은 시기별로 한 칸에 모은다 */
function rowsHTML(evs){const out=[];const done=new Set();
  evs.forEach(e=>{if(done.has(e.id))return;if(!isSiteEv(e)){out.push(rowHTML(e));return}
    const grp=evs.filter(x=>isSiteEv(x)&&x.f===e.f);grp.forEach(x=>done.add(x.id));const F=FRAMES[e.f];const nm=F.title.replace(' 시대','').replace(/의 성립과 발전$/,'');
    out.push(`<li data-ids="${grp.map(x=>x.id).join(',')}" class="sgrp"><div class="d">${esc(nm)}<small>유적</small></div><div><h3>${esc(nm)} 유적</h3><p class="sline">${grp.map(x=>esc(x.t.replace(/ 유적| · .*$/g,''))).join(' - ')}</p><ul class="sites">${grp.map(x=>`<li data-sid="${x.id}"><div class="sh"><b>${esc(x.t)}</b><span>${esc(x.p||'')}${x.yl?' · '+esc(x.yl):''}</span>${x.ll?`<button class="go" data-go="${x.id}" type="button">${PIN_IC}지도</button>`:''}</div><p>${glx(x.x)}</p></li>`).join('')}</ul></div></li>`)});
  return out.join('')}
function rowHTML(e){return `<li data-id="${e.id}" class="${e.top?'hlt':''}" style="--tc:var(--t-${e.tp[0]})"><div class="d">${esc(e.yl?e.yl:(e.y<0?(-e.y):e.y))}${e.yl?'':`<small>${e.y<0?'기원전':(e.m&&e.y>=1880?e.m+'월'+(e.d&&e.y>=1945?' '+e.d+'일':''):'')}</small>`}</div><div><h3>${esc(e.t)}</h3>${e.vs?`<div class="rvs">${e.treaty?'<i class="tseal">조</i>'+esc(e.vs.replace(' vs ',' · ')):esc(e.vs)}</div>`:''}<p>${glx(e.x)}</p>${whoHTML(e,'who sm')}<div class="m">${e.tp.map(tg).join('')}${e.p?`<span>${esc(e.p)}</span>`:''}${e.ll?`<button class="go" data-go="${e.id}" type="button">${PIN_IC}지도</button>`:''}${hbtn(e,1)}</div></div></li>`}
function buildTL(){
  const chips=$('tlchips');chips.innerHTML=`<button class="chip" data-k="" aria-pressed="true">전체</button>`+TOPICS.map(t=>`<button class="chip" data-k="${t.k}" aria-pressed="false" style="--tc:var(--t-${t.k})"><i></i>${t.n}</button>`).join('');
  chips.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{if(c.hasAttribute('data-heart')){tlHeart=!tlHeart;renderTLFilter();return}const k=c.dataset.k;if(!k)tlFilter.clear();else tlFilter.has(k)?tlFilter.delete(k):tlFilter.add(k);renderTLFilter()});
  $('tljump').innerHTML=ERAS.map(E=>`<button data-e="${E.k}" type="button">${E.n}</button>`).join('');
  $('tljump').querySelectorAll('button').forEach(b=>b.onclick=()=>{const s=$('era-'+b.dataset.e);$('tlread').scrollTop=s.offsetTop-$('tlread').querySelector('.rhead').offsetHeight+4});
  const body=$('tlbody');const open=store.get('sumopen',true);
  body.innerHTML=ERAS.map(E=>{const evs=EVENTS.filter(e=>e.era===E.k);return `<section class="era" id="era-${E.k}"><header><h2>${E.n}</h2><span class="rg">${E.rg}</span><button class="btn sumtog" type="button" aria-expanded="${open}">${open?'요약 접기':'요약 펼치기'}</button></header><div class="sumbox"${open?'':' hidden'}>${sumHTML(E)}</div><ol class="tl">${rowsHTML(evs)}</ol></section>`}).join('')+`<p class="noresult" id="tlnone" hidden>찾는 사건이 없습니다. 다른 낱말로 찾아보세요.</p><p class="foot">지도의 영토는 교과서 지도를 바탕으로 단순화한 범위입니다. 연도는 『삼국사기』 등 기록과 일반적인 교과서 서술을 따랐습니다.</p>`;
  body.querySelectorAll('.sumtog').forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';body.querySelectorAll('.sumtog').forEach(x=>{x.setAttribute('aria-expanded',o);x.textContent=o?'요약 접기':'요약 펼치기';x.closest('section').querySelector('.sumbox').hidden=!o});store.set('sumopen',o)});
  body.addEventListener('click',ev=>{const g=ev.target.closest('[data-go]');if(g)gotoMap(EVENTS.find(x=>x.id===+g.dataset.go))});
  $('q').addEventListener('input',renderTLFilter);
}
function renderTLFilter(){
  $('tlchips').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.hasAttribute('data-heart')?tlHeart:(c.dataset.k?tlFilter.has(c.dataset.k):!tlFilter.size&&!tlHeart)));
  const q=$('q').value.trim().toLowerCase();let any=0;
  $('tlbody').querySelectorAll('section.era').forEach(sec=>{let n=0;sec.querySelectorAll('ol.tl > li').forEach(li=>{const ids=(li.dataset.ids||li.dataset.id).split(',').map(Number);const ok=ids.some(id=>{const e=EVENTS.find(x=>x.id===id);
    const okT=!tlFilter.size||e.tp.some(k=>tlFilter.has(k));const okQ=!q||(e.t+' '+e.x+' '+(e.p||'')+' '+(e.pp||'')+' '+(e.vs||'')+' '+yearLabel(e)).toLowerCase().includes(q);return okT&&okQ&&(!tlHeart||(tlHeart==='b'?BOOKS:HEARTS).has(e.t))});li.hidden=!ok;if(!li.hidden)n++});
    sec.hidden=(q||tlFilter.size||tlHeart)&&!n;any+=n});
  $('tlnone').hidden=!!any;if(typeof syncVmode==='function')syncVmode();$('tlnone').textContent=tlHeart&&!q&&!tlFilter.size?(tlHeart==='b'?'아직 책갈피한 사건이 없어요. 연표에서 사건 아래 책갈피를 누르면 여기에 모여요.':'아직 하트한 사건이 없어요. 지도에서 사건을 눌러 ♡를 누르면 여기에 모여요.'):'찾는 사건이 없습니다. 다른 낱말로 찾아보세요.';
}

/* ───────── 주제별 ───────── */
let tpSel=store.get('topic','pol');
function buildTP(){
  const chips=$('tpchips');chips.innerHTML=TOPICS.map(t=>`<button class="chip" data-k="${t.k}" style="--tc:var(--t-${t.k})"><i></i>${t.n}</button>`).join('');
  chips.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{tpSel=c.dataset.k;store.set('topic',tpSel);renderTP();$('tpread').scrollTop=0});
  $('tpbody').addEventListener('click',ev=>{const g=ev.target.closest('[data-go]');if(g)gotoMap(EVENTS.find(x=>x.id===+g.dataset.go))});
  renderTP();
}
function renderTP(){
  $('tpchips').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===tpSel));
  const T=TOPIC[tpSel];const eras=ERAS.filter(E=>E.s[tpSel]||EVENTS.some(e=>e.era===E.k&&e.tp.includes(tpSel)));
  $('tpjump').innerHTML=eras.map(E=>`<button data-e="${E.k}" type="button">${E.n}</button>`).join('');
  $('tpjump').querySelectorAll('button').forEach(b=>b.onclick=()=>{const s=$('tp-'+b.dataset.e);$('tpread').scrollTop=s.offsetTop-$('tpread').querySelector('.rhead').offsetHeight+4});
  const n=EVENTS.filter(e=>e.tp.includes(tpSel)).length;
  $('tpbody').innerHTML=`<p class="tintro"><b style="color:var(--t-${tpSel})">${T.n}</b> 흐름을 시대 순서대로 모았습니다. 시대마다 요약을 먼저 보고, 아래 연표에서 사건 ${n}개를 연도순으로 확인하세요.</p>`+
   eras.map(E=>{const evs=EVENTS.filter(e=>e.era===E.k&&e.tp.includes(tpSel));return `<section class="era" id="tp-${E.k}"><header><h2>${E.n}</h2><span class="rg">${E.rg}</span></header>${E.s[tpSel]?`<div class="tsum" style="--tc:var(--t-${tpSel})"><ul>${E.s[tpSel].map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}${evs.length?`<ol class="tl">${rowsHTML(evs)}</ol>`:''}</section>`}).join('')+'<p class="foot">한 사건이 여러 주제에 걸치면 각 주제에 모두 나옵니다.</p>';
}

/* 끝까지 다 보면 '다시 보기' */
{const rb=document.createElement('button');rb.id='replay';rb.type='button';rb.hidden=true;rb.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/></svg>다시 보기';$('v-map').appendChild(rb);
 rb.onclick=()=>{rb.hidden=true;play()};const pz=pause;pause=function(){const was=playing;pz.apply(this,arguments);if(was&&pos.i===N-1&&pos.f>.98)rb.hidden=false};
 const pl=play;play=function(){rb.hidden=true;return pl.apply(this,arguments)};$('play').addEventListener('click',()=>{rb.hidden=true},true)}
