
/* ───────── 같은 뜻 다른 이름 (러시아 = 노서아 = 아라사 = 로국) ───────── */
{
const ALIAS0={
 '러시아':['노서아(露西亞)','아라사(俄羅斯)','로국(露國)'],
 '미국':['미리견(美利堅)','합중국(合衆國)'],
 '영국':['영길리(英吉利)'],
 '프랑스':['불란서(佛蘭西)','법국(法國)'],
 '독일':['덕국(德國)','도이칠란트'],
 '이탈리아':['이태리(伊太利)'],
 '네덜란드':['화란(和蘭)'],
 '오스트리아':['오지리(墺地利)'],
 '스페인':['서반아(西班牙)'],
 '포르투갈':['포도아(葡萄牙)'],
 '벨기에':['백이의(白耳義)'],
 '일본':['왜(倭)'],
 '청':['청나라','대청(大淸)'],
 '몽골':['몽고(蒙古)'],
 '베트남':['월남(越南)'],
 '소련':['소비에트 연방']
};
const $=id=>document.getElementById(id);
const esc4=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const base=a=>String(a).replace(/\s*\(.*\)\s*$/,'').trim();
const TRM=()=>window.__ME&&window.__ME.tr;
let AL={},OF={},SIG='',ADDED=new Set();
function build(){const M=TRM();const sig=M?JSON.stringify([...M.keys()].filter(k=>k.startsWith('@al:')).map(k=>[k,M.get(k)])):'';if(sig===SIG&&Object.keys(AL).length)return;SIG=sig;
  AL=JSON.parse(JSON.stringify(ALIAS0));if(M)M.forEach((v,k)=>{if(!k.startsWith('@al:')||!v||typeof v!=='object')return;const main=k.slice(4);const cur=AL[main]||[];(v.add||[]).forEach(a=>{if(!cur.some(x=>base(x)===base(a)))cur.push(a)});const rm=new Set((v.rm||[]).map(base));AL[main]=cur.filter(x=>!rm.has(base(x)))});
  OF={};Object.entries(AL).forEach(([m,L])=>L.forEach(a=>{OF[base(a)]=m}));
  try{ADDED.forEach(k=>{delete GLOSS[k]});ADDED=new Set();Object.entries(OF).forEach(([b,m])=>{if(b.length<2||GLOSS[b])return;const full=(AL[m]||[]).find(x=>base(x)===b)||b;const hj=(full.match(/\((.*)\)/)||[])[1];GLOSS[b]=`= ${m}${hj?`  ${hj}`:''}`;ADDED.add(b)});GLRE_SET()}catch(_){}}
build();
window.__ALIAS=()=>{build();return {AL,OF}};

/* 사전 페이지: 다른 이름 줄 */
const canEd=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own();
function line(main){const L=AL[main]||[];const ed=canEd();if(!L.length&&!ed)return '';return `<div class="kpalias" data-almain="${esc4(main)}"><em>같은 단어</em>${L.map(a=>`<span class="kpal">${esc4(a)}${ed?`<i data-alrm="${esc4(a)}" title="빼기">×</i>`:''}</span>`).join('')}${ed?'<button type="button" class="kpaladd" data-aladd>+ 같은 단어</button>':''}</div>`}
function decorTerm(){const p=$('kpage');if(!p||p.hidden)return;const h=p.querySelector('.kpin .kph h1');if(!h)return;const bar=p.querySelector('.kpbar span');if(bar&&!/용어|낱말|사전/.test(bar.textContent))return;const main=(h.dataset.xo||h.textContent).trim();const old=p.querySelector('.kpalias');const html=line(main);if(old){if(old.outerHTML!==html)old.outerHTML=html||''}else if(html)h.insertAdjacentHTML('afterend',html)}
{const ot=openTerm;openTerm=function(k){build();if(OF[k]&&!(AL[k]))k=OF[k];const r=ot.call(this,k);setTimeout(decorTerm,0);return r}}
new MutationObserver(()=>{clearTimeout(window.__alT);window.__alT=setTimeout(decorTerm,120)}).observe(document.body,{attributes:true,attributeFilter:['class']});
function saveAl(main,fn){const M=TRM();if(!M)return;const k='@al:'+main;const v=Object.assign({add:[],rm:[]},JSON.parse(JSON.stringify(M.get(k)||{})));fn(v);M.set(k,v);try{window.__MEX.save('T:'+k,v)}catch(_){}SIG='';build();decorTerm()}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;const rm=t.closest('[data-alrm]');const ad=t.closest('[data-aladd]');if(!rm&&!ad)return;e.preventDefault();e.stopImmediatePropagation();const box=t.closest('.kpalias');const main=box.dataset.almain;
  if(rm){const a=rm.dataset.alrm;saveAl(main,v=>{v.add=v.add.filter(x=>base(x)!==base(a));if(!v.rm.includes(base(a)))v.rm.push(base(a))});return}
  const i=document.createElement('input');i.className='kpalin';i.placeholder='같은 단어 (예: 노서아(露西亞))';ad.replaceWith(i);i.focus();
  const done=ok=>{const vs=i.value.split(/[,·]/).map(x=>x.trim()).filter(Boolean);i.onblur=null;if(ok&&vs.length)saveAl(main,v=>{vs.forEach(a=>{v.rm=v.rm.filter(x=>x!==base(a));if(!v.add.some(x=>base(x)===base(a)))v.add.push(a)})});else decorTerm()};
  i.onkeydown=k=>{k.stopPropagation();if(k.key==='Enter'&&!k.isComposing){k.preventDefault();done(true)}else if(k.key==='Escape')done(false)};i.onblur=()=>done(true)},true);

/* 검색: 대표 이름이나 다른 이름으로 찾으면 묶음을 보여 줌 */
{const sr=srRun;srRun=function(q){sr(q);build();const qq=String(q||'').trim().toLowerCase();if(!qq)return;const box=$('srres');if(!box)return;
  const hits=Object.entries(AL).filter(([m,L])=>[m,...L.map(base),...L].some(x=>x.toLowerCase().includes(qq))).slice(0,6);if(!hits.length)return;
  hits.forEach(([m,L])=>{box.querySelectorAll('.sri[data-term]').forEach(b=>{if(b.dataset.term===m||OF[b.dataset.term]===m)b.remove()})});
  const html=`<div class="srgrp sralias" style="--sc:#0e7490"><h4>같은 단어</h4>${hits.map(([m,L])=>`<button class="sri gl" data-term="${esc4(m)}"><b>${esc4(m)}<span class="sralc">${L.map(x=>`<i>${esc4(x)}</i>`).join('')}</span></b>${GLOSS[m]&&!ADDED.has(m)?`<span>${esc4(GLOSS[m])}</span>`:''}</button>`).join('')}</div>`;
  if(box.querySelector('.srh'))box.innerHTML='';const st=box.querySelector('.srstart,.srrecent');if(st&&st.nextElementSibling)st.after(document.createRange().createContextualFragment(html));else box.insertAdjacentHTML('afterbegin',html)}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#srres .sralias [data-term]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{closeSearch()}catch(_){}openTerm(b.dataset.term)},true);
/* 데이터가 바뀌면 다시 */
setInterval(()=>{const M=TRM();if(!M)return;const sig=JSON.stringify([...M.keys()].filter(k=>k.startsWith('@al:')).map(k=>[k,M.get(k)]));if(sig!==SIG){build();decorTerm()}},3000);
}
