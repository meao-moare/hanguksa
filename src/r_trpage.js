
/* ───────── 구조도: 목차 → 묶음별로 가로 넘기기, 한 화면에 통째로 ───────── */
{
const TRG=[
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
const $=id=>document.getElementById(id);
const title=k=>{if(k==='orgs')return '단체 · 조직';try{return TREES[k]?TREES[k].title:k}catch(_){return k}};
const has=k=>{try{return k==='orgs'||!!TREES[k]}catch(_){return false}};
TRG.forEach(g=>g.k=g.k.filter(has));
{const seen=new Set(TRG.flatMap(g=>g.k));let rest=[];try{rest=Object.keys(TREES).filter(k=>!seen.has(k))}catch(_){}if(rest.length)TRG.splice(TRG.length-1,0,{t:'더 보기',s:'',c:'#475569',k:rest})}
let G=-1,PAGE=0;
const groupOf=k=>TRG.findIndex(g=>g.k.includes(k));
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const relX=(tb,c)=>c.getBoundingClientRect().left-tb.getBoundingClientRect().left+tb.scrollLeft;
/* 목차 */
function ensureUI(){const rd=$('trread');if(!rd)return false;
  if(!$('trindex')){const d=document.createElement('div');d.id='trindex';d.className='rin';rd.querySelector('.rhead').after(d);
    d.innerHTML=`<div class="trih"><h2>구조도</h2><span>보고 싶은 묶음이나 구조도를 고르세요. 같은 묶음은 옆으로 넘겨 봐요.</span></div><div class="trig">${TRG.map((g,i)=>`<section class="trgc" style="--gc:${g.c}"><button type="button" class="trgh" data-trg="${i}"><b>${esc2(g.t)}</b><i>${esc2(g.s)}</i><em>${g.k.length}개</em></button><ol>${g.k.map(k=>`<li><button type="button" data-trg="${i}" data-trk="${k}">${esc2(title(k))}</button></li>`).join('')}</ol></section>`).join('')}</div>`;
    d.addEventListener('click',e=>{const b=e.target.closest('[data-trg]');if(!b)return;openG(+b.dataset.trg,b.dataset.trk||null)})}
  if(!$('trpbar')){const r=rd.querySelector('.rhead .rin');const d=document.createElement('div');d.id='trpbar';d.innerHTML='';r.appendChild(d);
    d.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.tpx!=null)return toIndex();if(b.dataset.tpg!=null)return openG(+b.dataset.tpg);if(b.dataset.tpk!=null)return goPage(+b.dataset.tpk)})}
  if(!$('trnavl')){['l','r'].forEach(s=>{const b=document.createElement('button');b.type='button';b.id='trnav'+s;b.className='trnav';b.setAttribute('aria-label',s==='l'?'이전 구조도':'다음 구조도');b.innerHTML=s==='l'?'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>':'<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';b.onclick=()=>goPage(PAGE+(s==='l'?-1:1));rd.appendChild(b)})}
  return true}
function bar(){const d=$('trpbar');if(!d)return;if(G<0){d.innerHTML='';return}const g=TRG[G];
  d.innerHTML=`<button type="button" class="tpx" data-tpx><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>목차</button><span class="tpg" style="--gc:${g.c}">${esc2(g.t)}</span><span class="tpks">${g.k.map((k,i)=>`<button type="button" data-tpk="${i}" aria-pressed="${i===PAGE}">${esc2(title(k))}</button>`).join('')}</span><span class="tpgo">${G>0?`<button type="button" data-tpg="${G-1}" title="${esc2(TRG[G-1].t)}">← 이전 묶음</button>`:''}${G<TRG.length-1?`<button type="button" data-tpg="${G+1}" title="${esc2(TRG[G+1].t)}">다음 묶음 →</button>`:''}</span>`}
function apply(){const tb=$('trbody'),rd=$('trread');if(!tb||!ensureUI())return;tb.classList.add('trpg');document.body.classList.toggle('trix',G<0);document.body.classList.add('trpgon');
  const ks=G<0?[]:TRG[G].k;[...tb.children].forEach(c=>{if(!c.classList||!c.classList.contains('trcard'))return;const k=c.id.replace(/^tree-/,'');const on=ks.includes(k);c.classList.toggle('trpon',on);if(on)c.dataset.po=ks.indexOf(k);else delete c.dataset.po});
  bar();fit();nav()}
function nav(){const l=$('trnavl'),r=$('trnavr');if(!l)return;const n=G<0?0:TRG[G].k.length;l.hidden=G<0||PAGE<=0;r.hidden=G<0||PAGE>=n-1}
function cur(){const tb=$('trbody');if(!tb||G<0)return null;return tb.querySelector('#tree-'+TRG[G].k[PAGE])}
const vis=all=>{const tb=$('trbody');if(!tb||G<0)return;TRG[G].k.forEach((k,i)=>{const c=tb.querySelector('#tree-'+k);if(c)c.style.visibility=all||i===PAGE?'':'hidden'})};
let PROG=0;function goPage(i,instant){if(G<0)return;PROG=Date.now()+(instant?0:500);const n=TRG[G].k.length;PAGE=Math.max(0,Math.min(n-1,i));const tb=$('trbody');const c=cur();if(tb&&c)(vis(true),tb.scrollTo({left:relX(tb,c),behavior:instant?'auto':'smooth'}),instant&&vis(false));$('trpbar')&&$('trpbar').querySelectorAll('[data-tpk]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.tpk===PAGE));nav()}
function openG(i,k){if(store&&store.get('view','map')!=='tr'){try{showView('tr')}catch(_){}}G=i;PAGE=k?Math.max(0,TRG[i].k.indexOf(k)):0;apply();requestAnimationFrame(()=>{goPage(PAGE,true);const rd=$('trread');if(rd)rd.scrollTop=0})}
function toIndex(){G=-1;PAGE=0;apply();const rd=$('trread');if(rd)rd.scrollTop=0}
window.__TROPEN=(k)=>{const i=groupOf(k);if(i>=0)openG(i,k)};

/* 한 화면에 맞추기: 카드마다 zoom */
let FITTING=false;
function fit(){const tb=$('trbody'),rd=$('trread');if(!tb||G<0||!tb.offsetParent)return;FITTING=true;
  const top=tb.getBoundingClientRect().top-rd.getBoundingClientRect().top;const W=tb.clientWidth,H=Math.max(260,rd.clientHeight-top-12);tb.style.height=H+'px';
  const mul=Math.max(1,(window.__TRS&&window.__TRS())||1);const MINZ=0.72,MAXZ=1.25;
  tb.querySelectorAll(':scope>.trcard.trpon').forEach(c=>{c.style.zoom=1;c.style.height='';c.style.margin='';c.classList.remove('trscr');
    const PW=W,PH=H-4;
    const m=w=>{c.style.width=w;const iw=c.scrollWidth+Math.max(0,...[...c.querySelectorAll('.htree,.hchain')].map(x=>x.scrollWidth-x.clientWidth));return [iw,c.scrollHeight]};
    const best=()=>{let [aw,ah]=m('max-content');let zA=Math.min(MAXZ,PW/aw,PH/ah);
      let w=PW,zB=1;for(let it=0;it<4;it++){const [iw,ih]=m(w+'px');const nz=Math.min(MAXZ,PW/Math.max(iw,1),PH/Math.max(ih,1));if(Math.abs(nz-zB)<0.01&&it){zB=nz;break}zB=nz;w=Math.max(PW,Math.round(PW/Math.min(1,zB)))}
      return Math.max(zA,zB)};
    const LC=['vtr','vfit','vauto','uv','uh','ut'];
    if(c.querySelector('.htree')&&!c.querySelector('.tfin')){const cand=[['vtr'],['ut'],[]];let bz=-1,bc=null;cand.forEach(cl=>{c.classList.remove(...LC);cl.forEach(x=>c.classList.add(x));const z=best();if(z>bz+0.02){bz=z;bc=cl}});c.classList.remove(...LC);bc.forEach(x=>c.classList.add(x));c.dataset.pgl=bc.join('')}
    let z=best();
    const base=Math.max(MINZ,z);c.dataset.fz=base;let zz=Math.max(MINZ,base*mul);
    const set=zz=>{c.style.width=Math.round(PW/zz)+'px';c.style.zoom=zz;c.style.height=Math.round(PH/zz)+'px';c.style.margin='0'};set(zz);
    for(let k=0;k<6&&zz>MINZ;k++){const ih=c.scrollHeight,iw=c.scrollWidth+Math.max(0,...[...c.querySelectorAll('.htree,.hchain')].map(x=>x.scrollWidth-x.clientWidth));if(ih<=c.clientHeight+2&&iw<=c.clientWidth+2)break;zz=Math.max(MINZ,zz*0.94);set(zz)}
    c.classList.toggle('trscr',c.scrollHeight>c.clientHeight+2||c.scrollWidth>c.clientWidth+2)});
  FITTING=false;requestAnimationFrame(()=>goPage(PAGE,true))}
window.__TRFIT=()=>fit();
let LASTC=null;window.addEventListener('pointerdown',e=>{LASTC=e.target.closest&&e.target.closest('#trbody .trcard')},true);
window.__TRZC=()=>{const c=LASTC;return c&&c.style.zoom?(+c.style.zoom||1):1};

/* 스크롤로 넘기면 쪽 번호 따라가기 */
{let st=0;document.addEventListener('scroll',e=>{const tb=$('trbody');if(e.target!==tb||G<0)return;vis(true);clearTimeout(st);st=setTimeout(()=>{if(Date.now()-PROG<350){vis(false);return}const x=tb.scrollLeft;let best=0,bd=1e9;TRG[G].k.forEach((k,i)=>{const c=tb.querySelector('#tree-'+k);if(!c)return;const d=Math.abs(relX(tb,c)-x);if(d<bd){bd=d;best=i}});if(best!==PAGE){PAGE=best;$('trpbar').querySelectorAll('[data-tpk]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.tpk===PAGE));nav()};vis(false)},120)},true)}
window.addEventListener('keydown',e=>{if(G<0||$('v-tr').hidden)return;if(e.target.closest&&e.target.closest('input,textarea,[contenteditable]'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const t=PAGE+(e.key==='ArrowRight'?1:-1);e.preventDefault();goPage(t,true)}else if(e.key==='Escape')toIndex();else return;e.stopImmediatePropagation()},true);

/* 기존 함수에 연결 */
{const t0=trPack;trPack=function(){const r=t0.apply(this,arguments);try{if(store.get('view','map')==='tr'){apply()}}catch(_){}return r}}
{const sv=showView;showView=function(v){const r=sv.apply(this,arguments);if(v==='tr'||v==='tp'){requestAnimationFrame(()=>{try{apply()}catch(_){}})}else{document.body.classList.remove('trpgon','trix')}return r}}
let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(G>=0)fit()},250)});

/* 표·구조 메뉴에서 쓰는 것 */
window.__TRINDEX=()=>toIndex();window.__TROPENG=(i,k)=>openG(i,k);
{const m=document.createElement('div');m.id='trmenu';m.hidden=true;m.innerHTML=TRG.map((g,i)=>`<div class="trmg" style="--gc:${g.c}"><button type="button" class="trmh" data-trg="${i}">${esc2(g.t)}</button>${g.k.map(k=>`<button type="button" class="trmk" data-trg="${i}" data-trk="${k}">${esc2(title(k))}</button>`).join('')}</div>`).join('');document.body.appendChild(m)}
/* 낱말 → 구조도 열기도 묶음으로 */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-tj]');if(!b||!document.body.classList.contains('trpgon'))return;const k=b.dataset.tj;if(groupOf(k)>=0){e.preventDefault();e.stopImmediatePropagation();window.__TROPEN(k)}},true);
if(store.get('view','map')==='tr')setTimeout(()=>{try{apply()}catch(_){}},50);
}
