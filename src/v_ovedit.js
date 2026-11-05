
/* ───────── 연대표: 고치기 모드에서 옮기기 · 형광펜 길이 · 세로줄 길이 ───────── */
{
const $=id=>document.getElementById(id);
const TRM=()=>window.__ME&&window.__ME.tr;
const can=()=>document.body.classList.contains('medit')&&window.__MEX&&window.__MEX.own&&window.__MEX.own()&&!$('v-ov').hidden;
const keyOf=el=>{if(el.matches('.hzn'))return 'n'+el.dataset.ev;if(el.matches('.hznt')){const b=el.querySelector('[data-ev]');return b?'t'+b.dataset.ev:'t'+(el.textContent||'').trim().slice(0,20)}if(el.matches('.hzrg'))return 'r'+el.dataset.rg;if(el.matches('.hzld')){const n=el.nextElementSibling;return n&&n.dataset.ev?'l'+n.dataset.ev:null}return null};
const get=k=>{const M=TRM();return (M&&M.get('@ov:'+k))||null};
const put=(k,v)=>{const M=TRM();if(!M)return;M.set('@ov:'+k,v);try{window.__MEX.save('T:@ov:'+k,v)}catch(_){}};
const SEL='#v-ov .hzn,#v-ov .hznt,#v-ov .hzrg,#v-ov .hzld';
function applyAll(){const ed=can();document.querySelectorAll(SEL).forEach(el=>{const k=keyOf(el);if(!k)return;const v=get(k);
  if(el.dataset.ow==null)el.dataset.ow=el.style.width||'';if(el.dataset.oh==null)el.dataset.oh=el.style.height||'';
  el.style.translate=v&&(v.x||v.y)?`${v.x||0}px ${v.y||0}px`:'';
  if(el.matches('.hzrg'))el.style.width=v&&v.w?v.w+'px':el.dataset.ow;
  if(el.matches('.hzld'))el.style.height=v&&v.h?v.h+'px':el.dataset.oh;
  let g=el.querySelector(':scope>.ovgrip');if(ed&&!g&&(el.matches('.hzrg')||el.matches('.hzld'))){el.insertAdjacentHTML('beforeend',`<ovg class="ovgrip ${el.matches('.hzld')?'ovgv':'ovgh'}" title="${el.matches('.hzld')?'세로줄 길이':'길이'}"></ovg>`)}else if(!ed&&g)g.remove()});
  document.body.classList.toggle('ovedit',ed)}
let t=0;const sched=()=>{clearTimeout(t);t=setTimeout(applyAll,80)};
new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&!n.classList.contains('ovgrip'))))sched()}).observe(document.body,{childList:true,subtree:true});
new MutationObserver(sched).observe(document.body,{attributes:true,attributeFilter:['class']});
setTimeout(applyAll,500);
/* 끌기 */
document.addEventListener('pointerdown',e=>{if(!can())return;const t=e.target;if(!t.closest||t.closest('[contenteditable]'))return;const grip=t.closest('.ovgrip');const el=t.closest(SEL);if(!el)return;if(e.button!==0&&e.pointerType==='mouse')return;const k=keyOf(el);if(!k)return;
  const v0=Object.assign({},get(k)||{});const x0=e.clientX,y0=e.clientY;let st=false;const w0=el.offsetWidth,h0=el.offsetHeight;
  if(grip){e.preventDefault();e.stopPropagation()}
  const mv=ev=>{const dx=ev.clientX-x0,dy=ev.clientY-y0;if(!st){if(!grip&&Math.abs(dx)+Math.abs(dy)<6)return;st=true;el.classList.add('ovdrag');try{getSelection().removeAllRanges()}catch(_){}}ev.preventDefault();
    if(grip&&el.matches('.hzld')){const h=Math.max(4,Math.round(h0+dy));el.style.height=h+'px';v0.h=h}
    else if(grip){const w=Math.max(20,Math.round(w0+dx));el.style.width=w+'px';v0.w=w}
    else{const nx=Math.round((get(k)||{}).x||0)+Math.round(dx),ny=Math.round((get(k)||{}).y||0)+Math.round(dy);el.style.translate=`${nx}px ${ny}px`;v0.x=nx;v0.y=ny}};
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);if(!st)return;el.classList.remove('ovdrag');put(k,v0);const kill=ev=>{ev.preventDefault();ev.stopImmediatePropagation();removeEventListener('click',kill,true)};addEventListener('click',kill,true);setTimeout(()=>removeEventListener('click',kill,true),60)};
  addEventListener('pointermove',mv,{passive:false});addEventListener('pointerup',up);addEventListener('pointercancel',up)},true);
/* 고치기 모드에서는 눌러도 다른 곳으로 가지 않음 (글씨 고치기만) */
window.addEventListener('click',e=>{if(!can())return;const b=e.target.closest&&e.target.closest('#v-ov [data-ev],#v-ov [data-grp],#v-ov [data-tip],#v-ov .hzrg');if(!b)return;if(e.target.closest('[contenteditable],.hzn>span,.hznt button,.hznt span,.hzrg>span'))return;e.preventDefault();e.stopImmediatePropagation()},true);
}

/* 고치는 중 Tab = 띄어쓰기 4칸 */
document.addEventListener('keydown',e=>{if(e.key!=='Tab'||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey)return;const a=document.activeElement;if(!a||!a.isContentEditable||a.closest('.hadd'))return;e.preventDefault();e.stopPropagation();try{document.execCommand('insertText',false,'    ')}catch(_){}},true);
