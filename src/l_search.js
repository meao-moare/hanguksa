/* ───────── 어디서나 검색 ───────── */
function openSearch(){const p=$('srch');p.hidden=false;$('srdim').hidden=false;const i=$('srq');i.value='';$('srres').innerHTML=srHint();setTimeout(()=>i.focus(),30)}
function closeSearch(){$('srch').hidden=true;$('srdim').hidden=true}
const srHint=()=>`<p class="srh">사건, 인물, 장소, 왕, 낱말, 구조도에 설명·내 메모 속 글까지 한 번에 찾아요. 예: 이순신, 강화도, 세종, 붕당</p>`;
function srRun(q0){const q=q0.trim().toLowerCase();if(!q){$('srres').innerHTML=srHint();return}
  const hit=s=>(s||'').toLowerCase().includes(q);
  const rk=s=>{s=(s||'').toLowerCase();if(s===q)return 0;if(s.startsWith(q))return 1;const i=s.indexOf(q);if(i<0)return 9;return /[\s,·(]/.test(s[i-1]||'')?2:3};
  /* 찾은 말 앞뒤만 잘라 보여 주기 */
  const snip=(t,w=46)=>{t=String(t||'').replace(/\s+/g,' ');const i=t.toLowerCase().indexOf(q);if(i<0)return esc(t.slice(0,w));const a=Math.max(0,i-16),b=Math.min(t.length,i+q.length+w-16);return (a?'…':'')+esc(t.slice(a,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length,b))+(b<t.length?'…':'')};
  const G=[];
  const ppl=[...PEOPLE.values()].filter(P=>hit(P.n)&&!NOT_PERSON.has(P.n)&&!kingOfName(P.n,P.evs[0]&&P.evs[0].T)).sort((a,b)=>rk(a.n)-rk(b.n)||a.n.length-b.n.length);
  G.push({k:'pp',n:'인물',L:ppl.map(P=>`<button class="sri" data-person="${esc(P.n)}"><b>${snip(P.n,30)}</b><span>${esc(PINFO[P.n]||('관련 사건 '+P.evs.length+'개'))}</span></button>`)});
  const kings=[];REIGNS.forEach(D=>D.r.forEach(r=>{if(hit(r.name))kings.push({D,r})}));kings.sort((a,b)=>rk(a.r.name.replace('대통령 ',''))-rk(b.r.name.replace('대통령 ','')));
  G.push({k:'kg',n:'왕 · 대통령',L:kings.map(({D,r})=>`<button class="sri" data-king="${esc(D.n)}|${D.r.indexOf(r)}" data-sk="${esc(D.n)}"><b>${snip(r.name,30)}</b><span>${D.n==='남한'?'대한민국':esc(D.n)} · ${yrTxt(r.s)}~${r.e>=2026?'':yrTxt(r.e)}</span></button>`)});
  const gl=Object.keys(GLOSS).filter(k=>hit(k)).sort((a,b)=>rk(a)-rk(b)||a.length-b.length);
  G.push({k:'gl',n:'낱말',L:gl.map(k=>`<button class="sri gl" data-term="${esc(k)}"><b>${snip(k,30)}</b><span>${esc(GLOSS[k])}</span></button>`)});
  const tr=Object.entries(TREES).filter(([k,T])=>hit(T.title)).sort((a,b)=>rk(a[1].title)-rk(b[1].title));
  G.push({k:'tr',n:'구조도',L:tr.map(([k,T])=>`<button class="sri" data-tree="${k}"><b>${snip(T.title,30)}</b><span>${esc(T.sub)}</span></button>`)});
  const evT=EVENTS.filter(e=>hit(e.t)).sort((a,b)=>(rk(a.t)-rk(b.t))||a.T-b.T);
  G.push({k:'ev',n:'사건',L:evT.map(e=>`<button class="sri" data-se="${e.id}"><b><em>${esc(shortYear(e))}</em>${snip(e.t,40)}</b><span>${esc([e.pp,e.p].filter(Boolean).join(' · ')||String(e.x||'').slice(0,40))}</span></button>`)});
  /* 내용(설명) 속에서 찾은 것 */
  const C=[];
  EVENTS.forEach(e=>{if(hit(e.t))return;const f=[e.x,e.pp,e.p,e.vs].find(hit);if(f)C.push({r:2,h:`<button class="sri" data-se="${e.id}"><b><em>${esc(shortYear(e))}</em>${esc(e.t)}</b><span>${snip(f)}</span></button>`})});
  Object.keys(GLOSS).forEach(k=>{if(!hit(k)&&hit(GLOSS[k]))C.push({r:3,h:`<button class="sri gl" data-term="${esc(k)}"><b><i class="srk">낱말</i>${esc(k)}</b><span>${snip(GLOSS[k])}</span></button>`})});
  try{Object.keys(PINFO).forEach(n=>{if(!hit(n)&&hit(PINFO[n])&&PEOPLE.has&&PEOPLE.has(n))C.push({r:3,h:`<button class="sri" data-person="${esc(n)}"><b><i class="srk">인물</i>${esc(n)}</b><span>${snip(PINFO[n])}</span></button>`})})}catch(_){}
  try{REIGNS.forEach(D=>D.r.forEach(r=>{if(hit(r.name))return;const a=(typeof kAch==='function'?kAch(D,r):[]).find(hit);if(a)C.push({r:3,h:`<button class="sri" data-king="${esc(D.n)}|${D.r.indexOf(r)}" data-sk="${esc(D.n)}"><b><i class="srk">업적</i>${esc(r.name)}</b><span>${snip(a)}</span></button>`})}))}catch(_){}
  try{const M=window.__ME;if(M&&M.c)M.c.forEach((L,item)=>{(L||[]).forEach(c=>{const t=[c.h,c.v].find(hit);if(!t)return;const nm=String(item).replace(/^[a-z]+:/,'');const at=/^k:/.test(item)?`data-person="${esc(nm)}"`:(/^e:/.test(item)?`data-se="${esc(nm)}"`:'');C.push({r:1,h:`<button class="sri" ${at}><b><i class="srk me">내 메모</i>${esc(c.h||nm)}</b><span>${snip(t)}</span></button>`})})})}catch(_){}
  C.sort((a,b)=>a.r-b.r);G.push({k:'in',n:'내용 속',L:C.map(x=>x.h)});
  const NG=G.filter(g=>g.L.length);if(!NG.length){$('srres').innerHTML=`<p class="srh">"${esc(q0.trim())}"에 맞는 결과가 없어요.</p>`;return}
  const N=5;$('srres').innerHTML=`<div class="srtabs">${NG.length>1?`<button type="button" class="on" data-srf="">전체</button>`:''}${NG.map(g=>`<button type="button" data-srf="${g.k}">${g.n}<i>${g.L.length}</i></button>`).join('')}</div>`+NG.map(g=>`<section class="srgrp srg" data-g="${g.k}"><h4>${g.n}<i>${g.L.length}</i></h4>${g.L.slice(0,N).join('')}${g.L.length>N?`<div class="srmore" hidden>${g.L.slice(N,200).join('')}</div><button type="button" class="srmb" data-srm>${g.L.length-N}개 더 보기</button>`:''}</section>`).join('');setTimeout(()=>{const R=$('srres');R.querySelectorAll('.srtabs [data-srf]').forEach(b=>{const k=b.dataset.srf;if(!k)return;const g=R.querySelector(`.srg[data-g="${k}"]`);if(!g){b.remove();return}const n=g.querySelectorAll('.sri').length;b.querySelector('i').textContent=n;const h=g.querySelector('h4>i');if(h)h.textContent=n;const mo=g.querySelector('.srmore'),mb=g.querySelector('[data-srm]');if(mo&&!mo.children.length){mo.remove();if(mb)mb.remove()}else if(mb)mb.textContent=`${mo.children.length}개 더 보기`});const T=R.querySelector('.srtabs');if(T&&T.querySelectorAll('[data-srf]').length<=2)T.remove();else if(T&&R.firstElementChild!==T){R.prepend(T)}},0)}
$('srres').addEventListener('click',e=>{const m=e.target.closest('[data-srm]');if(m){e.stopPropagation();const box=m.previousElementSibling;box.hidden=!box.hidden;m.textContent=box.hidden?`${box.children.length}개 더 보기`:'접기';return}const f=e.target.closest('[data-srf]');if(f){e.stopPropagation();const k=f.dataset.srf;$('srres').querySelectorAll('[data-srf]').forEach(b=>b.classList.toggle('on',b===f));$('srres').querySelectorAll('.srg').forEach(g=>{g.hidden=!!k&&g.dataset.g!==k;const mo=g.querySelector('.srmore'),mb=g.querySelector('[data-srm]');if(mo&&k){mo.hidden=false;if(mb)mb.hidden=true}else if(mo&&!k){mo.hidden=true;if(mb){mb.hidden=false;mb.textContent=`${mo.children.length}개 더 보기`}}});$('srres').scrollTop=0}},true);
$('srq').addEventListener('input',e=>srRun(e.target.value));
$('srdim').onclick=closeSearch;$('srx').onclick=closeSearch;$('srbtn').onclick=openSearch;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('srch').hidden)closeSearch();if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openSearch()}});
$('srres').addEventListener('click',ev=>{if(ev.target.closest('[data-person],[data-king],[data-term]')){closeSearch();return}const s=ev.target.closest('[data-se]');if(s){const e=EVENTS.find(x=>x.id===+s.dataset.se);closeSearch();
    const p=$('trpop');p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>${PIN_IC}지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button>${hbtn(e,1)}</div></div>`;
    p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();gotoTimeline(e)};return}
  
  const t=ev.target.closest('[data-tree]');if(t){closeSearch()}});
