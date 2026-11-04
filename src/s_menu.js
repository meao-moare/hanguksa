
/* ───────── 메뉴 정리: 조약·개혁안 ▾ / 사절단·조직·단체 / 표·구조 ▾ ───────── */
{
const $=id=>document.getElementById(id);
const esc3=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MISSIONS=[
 {y:'1607~1811',n:'조선 통신사',to:'일본 (에도 막부)',by:'',d:'임진왜란 뒤 국교를 다시 열고 12차례 일본에 보낸 외교 사절. 조선의 학문과 예술을 일본에 전하였다.'},
 {y:'17~19세기',n:'연행사',to:'청 (베이징)',by:'박지원, 홍대용',d:'해마다 청에 보낸 사절. 서양 문물과 청의 발전을 보고 돌아와 북학 사상이 싹텄다.'},
 {y:'1876',n:'제1차 수신사',to:'일본',by:'김기수',d:'강화도 조약 뒤 일본에 파견. 『일동기유』를 남겼다.',ev:'제1차 수신사'},
 {y:'1880',n:'제2차 수신사',to:'일본',by:'김홍집',d:'황준헌의 『조선책략』을 들여와 미국과 수교 논의가 일어났다.',ev:'제2차 수신사'},
 {y:'1881',n:'조사 시찰단',to:'일본',by:'박정양, 어윤중, 홍영식',d:'신사 유람단이라고도 한다. 일본의 근대 시설과 제도를 비밀리에 시찰하였다.',ev:'조사 시찰단'},
 {y:'1881',n:'영선사',to:'청 (톈진)',by:'김윤식',d:'근대 무기 제조 기술을 배우러 감. 돌아와 기기창(1883)을 세웠다.',ev:'영선사'},
 {y:'1883',n:'보빙사',to:'미국',by:'민영익, 홍영식, 유길준',d:'조미 수호 통상 조약 뒤 미국에 간 최초의 서양 사절단. 유길준은 『서유견문』을 썼다.',ev:'보빙사'},
 {y:'1907',n:'헤이그 특사',to:'네덜란드 (만국 평화 회의)',by:'이상설, 이준, 이위종',d:'을사늑약이 무효임을 알리려 하였으나 회의 참석을 거부당함. 일제는 이를 구실로 고종을 강제 퇴위시켰다.',ev:'헤이그 특사'}
];
const evId=t=>{try{const e=EVENTS.find(x=>x.t&&x.t.includes(t));return e?e.id:null}catch(_){return null}};

/* 1. 사절단·조직·단체 화면 */
{const sec=document.createElement('section');sec.className='view';sec.id='v-og';sec.hidden=true;
 sec.innerHTML='<div class="read" id="ogread"><div class="rhead"><div class="rin"><div class="ogjump" id="ogjump"><button type="button" data-ogj="ms">사절단</button><button type="button" data-ogj="or">조직 · 단체</button></div></div></div><div class="rin" id="ogbody"></div></div>';
 const ref=$('v-ty')||$('v-rl');ref.after(sec);try{VIEWS.push('og')}catch(_){}
 const tab=document.createElement('button');tab.id='tab-og';tab.type='button';tab.setAttribute('role','tab');tab.setAttribute('aria-selected','false');tab.dataset.v='og';tab.textContent='사절단·조직·단체';
 const ty=$('tab-ty');(ty||$('tab-tr')).after(tab);tab.textContent='사절단·조직·단체 ▾'}
function ogShow(){const b=$('ogbody');if(!b||b.dataset.built)return;b.dataset.built=1;
  let orgs='';try{orgs=orgsHTML()}catch(_){}
  b.innerHTML=`<section class="ogsec" id="og-ms"><h2 class="ogh"><span>사절단</span><small>${MISSIONS.length}개</small></h2><ol class="ogml">${MISSIONS.map(m=>{const id=m.ev?evId(m.ev):null;return `<li${id?` data-evpage="${id}" class="oglink"`:''}><span class="ogy">${esc3(m.y)}</span><div><b>${esc3(m.n)}</b><i class="ogto">${esc3(m.to)}</i>${m.by?`<em>${esc3(m.by)}</em>`:''}<p>${typeof glx==='function'?glx(m.d):esc3(m.d)}</p></div></li>`}).join('')}</ol></section><section class="ogsec" id="og-or"><h2 class="ogh"><span>조직 · 단체</span></h2><div class="ogorgs">${orgs}</div></section>`;
  b.querySelectorAll('li[data-evpage]').forEach(li=>li.onclick=ev=>{if(ev.target.closest('[data-gl],[data-person],button'))return;try{openEvPage(li.dataset.evpage)}catch(_){}});
  try{linkPeople&&linkPeople(b)}catch(_){}try{glossify&&glossify(b)}catch(_){}}
$('ogjump')&&$('ogjump').addEventListener('click',e=>{const x=e.target.closest('[data-ogj]');if(!x)return;const s=$('og-'+x.dataset.ogj),rd=$('ogread');if(s&&rd)rd.scrollTo({top:s.offsetTop-rd.querySelector('.rhead').offsetHeight-6,behavior:'smooth'})});

/* 드롭다운 공용 */
function dropdown(tab,items,id){const m=document.createElement('div');m.id=id;m.className='tabmenu tdrop';m.hidden=true;document.body.appendChild(m);let ht=0;
  const place=()=>{const r=tab.getBoundingClientRect();m.hidden=false;const mw=m.offsetWidth;m.style.left=Math.max(8,Math.min(innerWidth-mw-8,r.left+r.width/2-mw/2))+'px';m.style.top=(r.bottom+6)+'px'};
  const show=()=>{clearTimeout(ht);m.innerHTML=items();place()};const hide=()=>{clearTimeout(ht);ht=setTimeout(()=>{m.hidden=true},180)};
  const hov=()=>matchMedia('(hover:hover)').matches;
  tab.addEventListener('mouseenter',()=>{if(hov())show()});tab.addEventListener('mouseleave',()=>{if(hov())hide()});m.addEventListener('mouseenter',()=>clearTimeout(ht));m.addEventListener('mouseleave',()=>{if(hov())hide()});
  document.addEventListener('click',e=>{if(!m.hidden&&!e.target.closest('#'+id)&&e.target!==tab&&!tab.contains(e.target))m.hidden=true});
  return {m,show,hide:()=>{m.hidden=true}}}

/* 2. 조약·개혁안 ▾ */
{const ty=$('tab-ty');if(ty){ty.textContent='조약·개혁안 ▾';
  const setSec=s=>{document.body.dataset.tysec=s||'';try{const h=document.querySelector('#v-ty .rlhd h2');if(h)h.textContent=s==='ref'?'개혁안':s==='tr'?'조약':'조약·개혁안'}catch(_){}};
  const dd=dropdown(ty,()=>{const v=store.get('view','map')==='ty',s=document.body.dataset.tysec||'';return `<button type="button" data-tys="tr" aria-pressed="${v&&s==='tr'}">조약</button><button type="button" data-tys="ref" aria-pressed="${v&&s==='ref'}">개혁안</button>`},'tymenu');
  ty.onclick=e=>{e.preventDefault();e.stopPropagation();if(!dd.m.hidden&&!matchMedia('(hover:hover)').matches){dd.hide();return}if(matchMedia('(hover:hover)').matches){setSec(document.body.dataset.tysec||'tr');try{$('kpage').hidden=true}catch(_){}showView('ty');dd.hide();return}dd.show()};
  dd.m.addEventListener('click',e=>{const b=e.target.closest('[data-tys]');if(!b)return;dd.hide();setSec(b.dataset.tys);try{$('kpage').hidden=true}catch(_){}showView('ty');const rd=$('tyread');if(rd)rd.scrollTop=0});
  if(!document.body.dataset.tysec)setSec('tr')}}


/* 2-1. 사절단·조직·단체 ▾ */
{const tab=$('tab-og');if(tab){
  const setSec=x=>{document.body.dataset.ogsec=x||'ms'};
  const dd=dropdown(tab,()=>{const v=store.get('view','map')==='og',x=document.body.dataset.ogsec||'ms';return `<button type="button" data-ogs="ms" aria-pressed="${v&&x==='ms'}">사절단</button><button type="button" data-ogs="or" aria-pressed="${v&&x==='or'}">조직 · 단체</button>`},'ogmenu');
  tab.onclick=e=>{e.preventDefault();e.stopPropagation();const hov=matchMedia('(hover:hover)').matches;if(hov){setSec(document.body.dataset.ogsec);try{$('kpage').hidden=true}catch(_){}showView('og');dd.hide();return}if(!dd.m.hidden){dd.hide();return}dd.show()};
  dd.m.addEventListener('click',e=>{const b=e.target.closest('[data-ogs]');if(!b)return;dd.hide();setSec(b.dataset.ogs);try{$('kpage').hidden=true}catch(_){}showView('og');const rd=$('ogread');if(rd)rd.scrollTop=0});
  setSec(document.body.dataset.ogsec)}}
/* 3. 표·구조 ▾ (왕계표 + 구조도) */
{const tr=$('tab-tr'),kg=$('tab-kg');if(tr){if(kg)kg.style.display='none';tr.textContent='표·구조 ▾';
  const old=$('trmenu');
  const items=()=>{const v=store.get('view','map');const grp=old?old.innerHTML:'';return `<div class="tdtop"><button type="button" class="tdbig" data-tdv="kg" aria-pressed="${v==='kg'}">왕계표</button><button type="button" class="tdbig" data-tdv="tr" aria-pressed="${v==='tr'}">구조도 <i>목차</i></button></div>${grp?`<div class="tdsub">구조도 바로 가기</div><div class="trmenu tdgrid">${grp}</div>`:''}`};
  if(old){old.remove();old.id='trmenu-src'}
  const dd=dropdown(tr,items,'tsmenu');
  /* 기존 구조도 탭 동작(목차 열기)보다 먼저 */
  tr.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(matchMedia('(hover:hover)').matches){const v=store.get('view','map');if(v!=='kg'&&v!=='tr'){dd.hide();showView(store.get('tsview','kg')==='tr'?'tr':'kg')}else dd.show();return}if(!dd.m.hidden){dd.hide();return}dd.show()},true);
  dd.m.addEventListener('click',e=>{const b=e.target.closest('[data-tdv],[data-trg]');if(!b)return;dd.hide();try{$('kpage').hidden=true}catch(_){}
    if(b.dataset.tdv==='kg'){store.set('tsview','kg');showView('kg');return}
    store.set('tsview','tr');if(b.dataset.tdv==='tr'){showView('tr');setTimeout(()=>{try{window.__TRINDEX&&window.__TRINDEX()}catch(_){}},0);return}
    showView('tr');setTimeout(()=>{try{window.__TROPENG&&window.__TROPENG(+b.dataset.trg,b.dataset.trk||null)}catch(_){}},0)});
  /* 선택 표시: 왕계표·구조도 중 하나면 이 탭이 켜짐 */
  const mark=()=>{const v=store.get('view','map');tr.setAttribute('aria-selected',v==='kg'||v==='tr')};
  const sv=showView;showView=function(v){const r=sv.apply(this,arguments);mark();if(v==='og')try{ogShow()}catch(_){}{const t=$('tab-og');if(t)t.setAttribute('aria-selected',v==='og')}{const t=$('tab-ty');if(t)t.setAttribute('aria-selected',v==='ty')}return r};mark()}}
/* ▾ 메뉴는 한 번에 하나만 */
{const ids=['dcmenu','tlmenu','tymenu','tsmenu','ogmenu'];const TAB={dcmenu:'tab-dc',tlmenu:'tab-tl',tymenu:'tab-ty',tsmenu:'tab-tr',ogmenu:'tab-og'};const mo=new MutationObserver(ms=>{ms.forEach(m=>{const t=m.target;const tb=$(TAB[t.id]);if(tb)tb.classList.toggle('tabopen',!t.hidden);if(t.hidden)return;ids.forEach(id=>{const o=$(id);if(o&&o!==t&&!o.hidden)o.hidden=true})})});setTimeout(()=>ids.forEach(id=>{const o=$(id);if(o)mo.observe(o,{attributes:true,attributeFilter:['hidden']})}),300)}
if(store.get('view','map')==='og')setTimeout(()=>{showView('og')},0);
}
