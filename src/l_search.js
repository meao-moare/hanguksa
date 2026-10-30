/* ───────── 어디서나 검색 ───────── */
function openSearch(){const p=$('srch');p.hidden=false;$('srdim').hidden=false;const i=$('srq');i.value='';$('srres').innerHTML=srHint();setTimeout(()=>i.focus(),30)}
function closeSearch(){$('srch').hidden=true;$('srdim').hidden=true}
const srHint=()=>`<p class="srh">사건, 인물, 장소, 왕, 낱말, 구조도를 한 번에 찾아요. 예: 이순신, 강화도, 세종, 붕당</p>`;
function srRun(q){q=q.trim().toLowerCase();if(!q){$('srres').innerHTML=srHint();return}
  const hit=s=>(s||'').toLowerCase().includes(q);
  /* 글자가 똑같은 것 → 그 글자로 시작 → 앞에 다른 말이 붙은 것 → 뒤에만 겹치는 것 순서 */
  const rk=s=>{s=(s||'').toLowerCase();if(s===q)return 0;if(s.startsWith(q))return 1;const i=s.indexOf(q);if(i<0)return 9;return /[\s,·(]/.test(s[i-1]||'')?2:3};
  const ev=EVENTS.filter(e=>hit(e.t)||hit(e.pp)||hit(e.p)||hit(e.vs)||hit(e.x)).sort((a,b)=>(rk(a.t)-rk(b.t))||(hit(b.pp)-hit(a.pp))||a.T-b.T).slice(0,40);
  const kings=[];REIGNS.forEach(D=>D.r.forEach(r=>{if(hit(r.name))kings.push({D,r})}));kings.sort((a,b)=>rk(a.r.name.replace('대통령 ',''))-rk(b.r.name.replace('대통령 ','')));
  const gl=Object.keys(GLOSS).filter(k=>hit(k)).sort((a,b)=>rk(a)-rk(b)||a.length-b.length).slice(0,8);
  const tr=Object.entries(TREES).filter(([k,T])=>hit(T.title)||JSON.stringify(T).toLowerCase().includes(q)).sort((a,b)=>rk(a[1].title)-rk(b[1].title)).slice(0,6);
  let h='';
  const ppl=[...PEOPLE.values()].filter(P=>hit(P.n)&&!NOT_PERSON.has(P.n)&&!kingOfName(P.n,P.evs[0]&&P.evs[0].T)).sort((a,b)=>rk(a.n)-rk(b.n)||a.n.length-b.n.length).slice(0,10);
  if(ppl.length)h+=`<h4>인물</h4>`+ppl.map(P=>`<button class="sri" data-person="${esc(P.n)}"><b>${esc(P.n)}</b><span>${esc(PINFO[P.n]||('관련 사건 '+P.evs.length+'개'))}</span></button>`).join('');
  if(kings.length)h+=`<h4>왕 · 대통령</h4>`+kings.slice(0,8).map(({D,r})=>`<button class="sri" data-king="${esc(D.n)}|${D.r.indexOf(r)}" data-sk="${esc(D.n)}"><b>${esc(r.name)}</b><span>${D.n==='남한'?'대한민국':esc(D.n)} · ${yrTxt(r.s)}~${r.e>=2026?'':yrTxt(r.e)}</span></button>`).join('');
  if(gl.length)h+=`<h4>낱말 풀이</h4>`+gl.map(k=>`<button class="sri gl" data-term="${esc(k)}"><b>${esc(k)}</b><span>${esc(GLOSS[k])}</span></button>`).join('');
  if(tr.length)h+=`<h4>구조도</h4>`+tr.map(([k,T])=>`<button class="sri" data-tree="${k}"><b>${esc(T.title)}</b><span>${esc(T.sub)}</span></button>`).join('');
  if(ev.length)h+=`<h4>사건 ${ev.length>=40?'40+':ev.length}</h4>`+ev.map(e=>`<button class="sri" data-se="${e.id}"><b><em>${esc(shortYear(e))}</em>${esc(e.t)}</b><span>${esc([e.pp,e.p].filter(Boolean).join(' · ')||e.x.slice(0,40))}</span></button>`).join('');
  $('srres').innerHTML=h||`<p class="srh">"${esc(q)}"에 맞는 결과가 없어요.</p>`}
$('srq').addEventListener('input',e=>srRun(e.target.value));
$('srdim').onclick=closeSearch;$('srx').onclick=closeSearch;$('srbtn').onclick=openSearch;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('srch').hidden)closeSearch();if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openSearch()}});
$('srres').addEventListener('click',ev=>{if(ev.target.closest('[data-person],[data-king],[data-term]')){closeSearch();return}const s=ev.target.closest('[data-se]');if(s){const e=EVENTS.find(x=>x.id===+s.dataset.se);closeSearch();
    const p=$('trpop');p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(e)}<div class="nav">${e.ll?`<button class="btn" data-km>${PIN_IC}지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button>${hbtn(e,1)}</div></div>`;
    p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();gotoMap(e)};p.querySelector('[data-kt]').onclick=()=>{closeTree();gotoTimeline(e)};return}
  
  const t=ev.target.closest('[data-tree]');if(t){closeSearch()}});
