/* ───────── 세계 지도 (가로로 한 바퀴 돌아간다) ───────── */
const WW=360*78.801;
/* 동아시아 상세 지도 범위 바깥만 세계 지도로 채운다 */
const CTXB=(()=>{const n=LAND.ctx.match(/-?\d+(\.\d+)?/g).map(Number);let a=1e9,b=1e9,c=-1e9,d=-1e9;for(let i=0;i+1<n.length;i+=2){a=Math.min(a,n[i]);c=Math.max(c,n[i]);b=Math.min(b,n[i+1]);d=Math.max(d,n[i+1])}return {x:a,y:b,width:c-a,height:d-b}})();
function outsideCtx(){if(!CTXB)return '';const b=CTXB,i=2;return `M-120000,-20000H120000V30000H-120000ZM${b.x+i},${b.y+i}V${b.y+b.height-i}H${b.x+b.width-i}V${b.y+i}Z`}
{const defs=$('defs'),NS='http://www.w3.org/2000/svg';
  const cp=document.createElementNS(NS,'clipPath');cp.id='outctx';cp.setAttribute('clipPathUnits','userSpaceOnUse');const cpp=document.createElementNS(NS,'path');cpp.setAttribute('d',outsideCtx());cpp.setAttribute('clip-rule','evenodd');cp.appendChild(cpp);defs.appendChild(cp);
  // 해안선 마스크: 상세 지도 바깥에서는 상세 해안선을 감춘다(잘린 가장자리 선 방지)
  const sm=$('seamask');const blk=document.createElementNS(NS,'path');blk.setAttribute('d',outsideCtx());blk.setAttribute('fill-rule','evenodd');blk.style.fill='#000';sm.appendChild(blk);
  [sm,$('landmask')].forEach(m=>{m.setAttribute('x',-120000);m.setAttribute('y',-20000);m.setAttribute('width',240000);m.setAttribute('height',50000)});
  sm.querySelector('rect').setAttribute('x',-120000);sm.querySelector('rect').setAttribute('width',240000);sm.querySelector('rect').setAttribute('y',-20000);sm.querySelector('rect').setAttribute('height',50000);
  // 영토 색칠 마스크에도 세계 땅 추가
  const lu=document.createElementNS(NS,'use');lu.setAttribute('href','#wl');lu.setAttribute('clip-path','url(#outctx)');lu.style.fill='#fff';$('landmask').appendChild(lu);
}
function decodeEc(g){if(!g.UTF8Encoding)return g;const sc=g.UTF8Scale||1024;
  const dec=(s,off)=>{const r=[];let px=off[0],py=off[1];for(let i=0;i<s.length;i+=2){let x=s.charCodeAt(i)-64,y=s.charCodeAt(i+1)-64;x=(x>>1)^(-(x&1));y=(y>>1)^(-(y&1));x+=px;y+=py;px=x;py=y;r.push([x/sc,y/sc])}return r};
  g.features.forEach(f=>{const G=f.geometry,E=G.encodeOffsets;if(G.type==='Polygon')G.coordinates=G.coordinates.map((c,i)=>typeof c==='string'?dec(c,E[i]):c);else if(G.type==='MultiPolygon')G.coordinates=G.coordinates.map((p,i)=>p.map((c,j)=>typeof c==='string'?dec(c,E[i][j]):c))});return g}
function buildWorld(g){g=decodeEc(g);let d='';
  const ring=r=>{if(r.length<3)return;if(r.every(p=>p[1]<-58))return;let off=0,prev=r[0][0];const pts=r.map(([lo,la],i)=>{if(i){if(lo-prev>180)off-=360;else if(prev-lo>180)off+=360}prev=lo;return [lo+off,la]});
    let last='';d+='M'+pts.map(p=>{const s=X(p[0]).toFixed(0)+','+Y(p[1]).toFixed(0);if(s===last)return null;last=s;return s}).filter(Boolean).join('L')+'Z'};
  g.features.forEach(f=>{const G=f.geometry;if(!G)return;if(G.type==='Polygon')G.coordinates.forEach(ring);else if(G.type==='MultiPolygon')G.coordinates.forEach(p=>p.forEach(ring))});
  if(!d)return;$('wl').setAttribute('d',d);$('world').classList.add('on');const fk=$('fakeland');if(fk)fk.style.display='none'}
window.echarts={registerMap(n,g){try{buildWorld(g)}catch(e){console.warn('world',e)}}};
{const SRC=['https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/js/world.js','https://unpkg.com/echarts@4.9.0/map/js/world.js'];let i=0;const ok=()=>$('world').classList.contains('on');const load=()=>{if(ok()||i>=SRC.length)return;const s=document.createElement('script');s.src=SRC[i++];s.async=true;s.onerror=()=>setTimeout(load,300);s.onload=()=>setTimeout(()=>{if(!ok())load()},500);document.head.appendChild(s)};load();setTimeout(()=>{if(!ok())load()},8000)}

/* ───────── 중국 쪽 나라 (연하게) ───────── */
const CH_SH={
 CORE:[[94,40],[96,42],[110,42.3],[117,41.8],[120,41.8],[122,42.2],[122,40.6],[123.3,38],[123.8,30],[122,25],[117,21],[108,17],[104,21],[100,22],[98,25],[98,30],[101,33],[97,36],[94,38]],
 SONG:[[96,37],[104,38.5],[110,39.2],[114,39],[117,38.7],[119,39.3],[121,39.6],[123.3,38],[123.8,30],[122,25],[117,21],[108,17],[104,21],[100,22],[98,25],[98,30],[101,33]],
 SOUTH:[[104,33.2],[110,33.5],[117,33.8],[121,33.6],[123.8,32],[123.8,30],[122,25],[117,21],[108,17],[104,21],[100,22],[98,25],[98,30],[101,33]],
 BIG:[[74,37],[73,40],[80,45],[87,49],[97,52],[110,50],[118,53],[127,53.5],[134,48.5],[131.2,43],[130.6,42.4],[129,42.4],[128.1,41.9],[126.8,41.7],[125.5,40.6],[124.4,40],[123.3,38],[123.8,30],[122,25],[117,21],[108,17],[100,21],[97,24],[92,27],[85,28],[78,32]],
 LIAO:[[106,41],[105,45],[110,48],[118,50],[126,49],[131,46],[131,43],[129,42.5],[128,42],[126.8,41.7],[125.5,40.6],[124.4,40],[122,40.5],[119,39.3],[116,38.8],[113,39.2],[110,40]],
 JIN:[[106,41],[105,45],[110,48],[118,50],[126,49],[131,46],[131,43],[129,42.5],[128,42],[126.8,41.7],[125.5,40.6],[124.4,40],[123.3,38],[123.8,33.6],[117,33.8],[110,33.5],[104,34],[104,37]],
 MANCHU:[[120,43],[118,47],[124,49],[131,47],[131,43],[129,42.5],[128,42],[126.8,41.7],[125.5,40.6],[124.4,40],[122.2,40.6],[121,41.8]]};
const CH_LAB={CORE:[112,33],SONG:[113,31],SOUTH:[114,28],BIG:[108,36],LIAO:[118,45],JIN:[118,44],MANCHU:[125,45.5]};
const CHN=[[-221,-206,'진','CORE'],[-206,220,'한','CORE'],[220,589,'위진 남북조','CORE'],[589,618,'수','CORE'],[618,907,'당','CORE'],[907,960,'5대 10국','CORE'],[960,1127,'송','SONG'],[1127,1279,'남송','SOUTH'],[1271,1368,'원','BIG'],[1368,1644,'명','CORE'],[1644,1912,'청','BIG'],[1912,1949.75,'중화민국','BIG'],[1949.75,3000,'중국','BIG'],
 [916,1125,'거란(요)','LIAO','n'],[1115,1234,'금','JIN','n'],[1616,1644,'후금','MANCHU','n']];
var chG=$('chn'),chKey='',chItems=[];
function updateChina(t){const act=CHN.filter(c=>c[0]<=t&&t<c[1]&&!(c[3]==='SOUTH'&&t>=1271)).filter((c,i,a)=>!(c[2]==='남송'&&a.some(x=>x[2]==='원')));
  const key=pos.i+':'+act.map(c=>c[2]).join();if(key===chKey)return;chKey=key;
  chG.innerHTML='';chItems.forEach(o=>{o.g.remove();dropOV(o)});chItems=[];
  {const cur=act.find(c=>!c[4]);try{nbItems.forEach(o=>{if(!o.t)return;if(o.orig==null)o.orig=o.t.textContent;if(o.orig==='중국')o.t.textContent=cur?cur[2]:'중국'})}catch(_){}}
  const nbNames=FRAMES[pos.i].nb.map(n=>n[0]==='중국'?((act.find(c=>!c[4])||[0,0,'중국'])[2]):n[0]).join(' ');
  act.forEach(c=>{const p=el('path',{class:'chf'+(c[4]?' n':''),d:P(CH_SH[c[3]])},chG);
    const short=c[2].replace(/\(.*\)/,'');if(nbNames.includes(short))return;
    const g=el('g',{class:'nb chl'},$('ovl'));const tx=el('text',{},g);tx.textContent=c[2];const L=CH_LAB[c[3]];const o=ovItem(g,X(L[0]),Y(L[1]));o.kind='nb';o.t=tx;chItems.push(o)});
  placeOV();schedLabels()}

updateChina(curT());
