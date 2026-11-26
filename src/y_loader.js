/* ───────── 화면 넘어갈 때: 캐릭터 + 한 줄 역사 이야기 (사료·교과서에 있는 내용만) ───────── */
const TMI=[
['1404 · 태종 4년','태종이 사냥하다 말에서 떨어지자 "사관이 알게 하지 말라"고 했는데, 사관은 그 말까지 실록에 적었다. (『태종실록』)'],
['1422 · 세종 4년','태종은 세상을 떠나며 "주상은 고기가 없으면 수라를 들지 못하니, 상중에도 고기를 들게 하라"는 말을 남겼다. (『세종실록』)'],
['1443 · 세종 25년','세종이 훈민정음 28자를 만들었다. 반포는 3년 뒤인 1446년이다.'],
['1441 · 세종 23년','측우기를 만들어 비 온 양을 쟀다. 이탈리아 카스텔리의 우량계(1639)보다 약 200년 앞선다.'],
['1434 · 세종 16년','장영실 등이 정해진 시각에 저절로 종·북·징을 울리는 물시계 자격루를 만들었다.'],
['1442 · 세종 24년','장영실은 관노 출신으로 대호군까지 올랐지만, 감독해 만든 왕의 가마가 부서진 일로 벌을 받은 뒤 기록에서 사라진다.'],
['1413 · 태종 13년','『태종실록』에 "거북선"이라는 이름이 처음 나온다. 태종이 임진강에서 거북선과 왜선이 싸우는 연습을 구경했다.'],
['1380 · 고려 우왕 6년','황산 대첩에서 이성계가 활로 왜구 장수 아지발도의 투구를 쏘아 떨어뜨리고, 이지란이 이어 쏘아 쓰러뜨렸다고 전한다.'],
['918~943 · 고려 태조','왕건은 지방 호족 세력과 손잡으려고 혼인을 많이 해서 부인이 29명이었다.'],
['958 · 고려 광종 9년','후주에서 온 쌍기의 건의로 처음 과거 시험을 치렀다.'],
['1123 · 고려 인종 1년','송나라 사신 서긍은 『고려도경』에 고려 사람들이 청자의 빛깔을 "비색(翡色)"이라 부른다고 적었다.'],
['1145 · 고려 인종 23년','김부식 등이 『삼국사기』 50권을 펴냈다. 지금 남아 있는 우리나라에서 가장 오래된 역사책이다.'],
['1377 · 고려 우왕 3년','청주 흥덕사에서 금속 활자로 『직지』를 찍었다. 지금 남아 있는 가장 오래된 금속 활자본이다.'],
['1236~1251','몽골의 침입을 부처의 힘으로 막으려고 새긴 팔만대장경판은 8만 1천 장이 넘는다.'],
['고려 시대','고려에서는 재산을 아들딸 구별 없이 나누어 물려주었고, 호적에도 태어난 순서대로 올렸다.'],
['612 · 고구려 영양왕 23년','을지문덕은 수나라 장수 우중문에게 "공이 이미 높으니 만족하고 그만두라"는 시를 보내 놀린 뒤 살수에서 크게 이겼다.'],
['414 · 고구려 장수왕 2년','광개토 대왕릉비는 높이가 약 6.4m이고 1,700자가 넘는 글자가 새겨져 있다.'],
['고구려','평강 공주는 어릴 때 잘 울어서 아버지 평원왕이 "바보 온달에게 시집보내겠다"고 놀렸는데, 커서 정말 온달을 찾아갔다. (『삼국사기』)'],
['신라 선덕 여왕','당 태종이 보낸 모란 그림에 나비가 없는 것을 보고 선덕 여왕은 꽃에 향기가 없을 것이라 알아맞혔다고 한다. (『삼국유사』)'],
['신라 선덕 여왕','첨성대는 362개 남짓한 돌로 쌓았는데, 이를 1년 날수와 연결해 보는 해석도 있다.'],
['868 · 신라 경문왕','최치원은 12살에 당나라로 유학을 가서 18살에 외국인 과거인 빈공과에 붙었다.'],
['828 · 신라 흥덕왕 3년','장보고가 완도에 청해진을 세우고 해적을 몰아낸 뒤 당·신라·일본을 잇는 바닷길 무역을 이끌었다.'],
['676 · 신라 문무왕 16년','의상이 영주에 부석사를 세웠다. "떠 있는 돌(浮石)"이라는 이름에는 의상을 돕던 선묘의 전설이 얽혀 있다.'],
['해동성국','발해는 9세기 선왕 때 전성기를 맞아 중국에서 "바다 동쪽의 융성한 나라(해동성국)"라 불렸다.'],
['1971','공주 송산리 고분군의 물길을 내는 공사를 하다가 도굴되지 않은 무령왕릉이 우연히 발견되었다.'],
['1504 · 연산군 10년','연산군은 신하들에게 "입은 화를 부르는 문"이라는 글을 새긴 신언패를 차게 했다.'],
['1457 · 세조 3년','단종은 영월 청령포로 유배되었다가 17살에 죽었다.'],
['1636~1637 · 인조','병자호란 때 인조는 남한산성에서 47일 동안 버티다가 삼전도에서 항복했다.'],
['숙종','숙종이 아끼던 고양이 "금손"은 숙종이 세상을 떠나자 먹지 않다가 따라 죽었다고 전한다.'],
['1724~1776 · 영조','영조는 52년 동안 왕위에 있었고 83살까지 살아, 조선 왕 가운데 가장 오래 재위하고 가장 오래 살았다.'],
['1796 · 정조 20년','담배를 즐긴 정조는 초계문신들에게 담배(남령초)의 쓰임을 논하라는 문제를 냈다.'],
['1794~1796 · 정조','수원 화성은 거중기 등을 써서 약 2년 반 만에 다 쌓았고, 공사 과정이 『화성성역의궤』에 자세히 남아 있다.'],
['1801~1818 · 순조','정약용은 18년 동안 강진에서 유배 생활을 하며 『목민심서』 등 500권이 넘는 책을 썼다.'],
['1780 · 정조 4년','박지원은 청 건륭제의 칠순 잔치에 가는 사절단을 따라가 『열하일기』를 썼다.'],
['1610 · 광해군 2년','허준이 『동의보감』을 완성했다. 2009년 유네스코 세계기록유산이 되었다.'],
['18세기 · 김홍도','김홍도의 그림 「씨름」에는 왼손과 오른손이 바뀌어 그려진 구경꾼이 있다.'],
['16세기 · 신사임당','신사임당이 그린 풀벌레 그림을 마당에 말리자 닭이 진짜 벌레인 줄 알고 쪼았다는 이야기가 전한다.'],
['1844 · 헌종 10년','김정희는 제주 유배 중에도 귀한 책을 보내 준 제자 이상적에게 고마움을 담아 「세한도」를 그려 주었다.'],
['1861 · 철종 12년','김정호의 대동여지도는 22첩으로 나뉘어 접고 펼칠 수 있게 만든 목판 지도다.'],
['18세기 · 홍대용','홍대용은 지구가 하루에 한 번 돈다는 지전설을 주장했다.'],
['1883','최초의 근대 신문 『한성순보』는 열흘에 한 번, 순 한문으로 나왔다.'],
['1887','경복궁 건청궁에 처음 전등이 켜졌다.'],
['1896','『독립신문』은 한글판과 영문판을 함께 냈다.'],
['1899','노량진과 제물포를 잇는 우리나라 첫 철도 경인선이 개통되었다.'],
['1907','고종은 이준·이상설·이위종을 네덜란드 헤이그 만국 평화 회의에 특사로 보냈다.'],
['1909','안중근이 하얼빈역에서 이토 히로부미를 쏘았다.'],
['1919','유관순은 고향 천안 아우내 장터에서 만세 운동을 이끌었다.'],
['1945 · 1948','8월 15일은 광복(1945)과 대한민국 정부 수립(1948)이 겹친 날이다.']
];
(function(){try{const pi=new Image();pi.src='assets/loading_sprite.png';window.__sprImg=pi}catch(_){}const ov=document.createElement('div');ov.id='trld';ov.hidden=true;ov.innerHTML='<div class="trld-c"><div class="sprb"><div class="spr" aria-hidden="true"><i></i></div></div><div class="trld-y"></div><div class="trld-t"></div><div class="trld-x">눌러서 바로 넘어가기</div></div>';document.body.appendChild(ov);
 let last=-1,shownAt=0,hideT=0;const pick=()=>{let i;do{i=Math.floor(Math.random()*TMI.length)}while(i===last&&TMI.length>1);last=i;return TMI[i]};
 const show=()=>{const [y,t]=pick();ov.querySelector('.trld-y').textContent=y;ov.querySelector('.trld-t').textContent=t;clearTimeout(hideT);ov.hidden=false;ov.classList.remove('out');shownAt=performance.now()};
 const hide=()=>{const wait=Math.max(0,1600-(performance.now()-shownAt));hideT=setTimeout(()=>{ov.classList.add('out');setTimeout(()=>{ov.hidden=true;ov.classList.remove('out')},120)},wait)};
 ov.addEventListener('click',()=>{clearTimeout(hideT);ov.hidden=true});
 window.__trLoad=fn=>{show();/* 캐릭터 움직임이 먼저 돌기 시작한 뒤에 무거운 화면 계산 */setTimeout(()=>{try{fn()}finally{hide()}},220)};
 let bypass=false;
 document.addEventListener('click',e=>{if(bypass)return;const b=e.target.closest&&e.target.closest('nav.tabs button[data-v], .tabmenu.tdrop button, .tabmenu.tdrop a');if(!b)return;
   if(b.matches('nav.tabs button[data-v]')){const full=b.dataset.full||b.textContent;if(/▾/.test(full))return;if(b.getAttribute('aria-selected')==='true')return}
   if(document.body.classList.contains('medit'))return;
   e.preventDefault();e.stopImmediatePropagation();window.__trLoad(()=>{bypass=true;try{b.click()}finally{bypass=false}})},true);
})();
/* 처음 여는 불러오기 화면에도 한 줄 이야기 */
(function(){const m=document.getElementById('mewait');if(!m||typeof TMI==='undefined')return;const [y,t]=TMI[Math.floor(Math.random()*TMI.length)];const box=m.querySelector('div');if(!box)return;const d=document.createElement('div');d.style.cssText="max-width:300px;text-align:center;font:500 14px/1.6 'Noto Sans KR',sans-serif;color:#44403c;word-break:keep-all";d.innerHTML='<span style="display:inline-block;font-weight:800;font-size:12px;color:#b45309;background:#fef3c7;padding:2px 9px;border-radius:999px;margin-bottom:6px"></span><br><span></span>';d.children[0].textContent=y;d.children[2].textContent=t;box.appendChild(d)})();
