/* ───────── 왕 상세 페이지 ───────── */
/* a: 업적(사건 목록 외에 덧붙임), d: 최후·왕위를 잃은 사정 */
const KINFO={
 '고조선|우거왕(위만의 손자)':{a:['한과 진국 사이 중계 무역으로 이익을 얻음'],d:'한 무제의 침략 중 내부 분열로 신하에게 살해됨(기원전 108년 왕검성 함락)'},
 '고구려|동명성왕':{a:['부여에서 내려와 졸본에 고구려 건국'],d:''},
 '고구려|태조왕':{a:['옥저 정복, 계루부 고씨 왕위 세습'],d:''},
 '고구려|고국천왕':{a:['을파소 등용, 진대법 실시','부족적 5부를 행정적 5부로 개편, 왕위 부자 상속'],d:''},
 '고구려|미천왕':{a:['서안평 점령, 낙랑군 축출(313)'],d:''},
 '고구려|고국원왕':{a:['전연의 침입으로 수도 함락(342)'],d:'백제 근초고왕의 평양성 공격 때 전사(371)'},
 '고구려|소수림왕':{a:['불교 수용(372), 태학 설립, 율령 반포(373)'],d:''},
 '고구려|광개토 대왕':{a:['"영락" 연호 사용','후연·거란 격파, 요동 확보','신라에 침입한 왜를 물리침(400)'],d:''},
 '고구려|장수왕':{a:['평양 천도(427)','한성 함락(475), 한강 유역 장악','충주 고구려비 건립'],d:''},
 '고구려|영양왕':{a:['수 문제·양제의 침입 격퇴(살수 대첩 612, 을지문덕)'],d:''},
 '고구려|영류왕':{a:['천리장성 축조 시작'],d:'연개소문의 정변으로 살해됨(642)'},
 '고구려|보장왕':{a:['연개소문 집권기, 당 태종 침입 격퇴(안시성 645)'],d:'나당 연합군에 평양성이 함락되어 당으로 끌려감(668)'},
 '백제|고이왕':{a:['6좌평·16관등제, 관복 제정','한강 유역 장악'],d:''},
 '백제|근초고왕':{a:['마한 정복, 가야에 영향력','고구려 평양성 공격(고국원왕 전사)','요서·산둥·규슈 진출, 칠지도 하사','고흥의 『서기』 편찬'],d:''},
 '백제|침류왕':{a:['동진의 마라난타가 불교 전래(384)'],d:''},
 '백제|비유왕':{a:['신라 눌지왕과 나제 동맹(433)'],d:''},
 '백제|개로왕':{a:['북위에 국서를 보내 고구려 공격 요청(472)'],d:'고구려 장수왕의 공격으로 한성이 함락되어 아차산성에서 죽음(475)'},
 '백제|문주왕':{a:['웅진(공주)으로 천도(475)'],d:'귀족 해구에게 살해됨'},
 '백제|동성왕':{a:['신라 소지 마립간과 결혼 동맹(493)'],d:'귀족 백가에게 살해됨'},
 '백제|무령왕':{a:['22담로에 왕족 파견, 지방 통제 강화','양과 교류(무령왕릉, 벽돌무덤)'],d:''},
 '백제|성왕':{a:['사비(부여) 천도, 국호 "남부여"','22부 실무 관청, 5부 5방 정비','일본에 불교 전파(노리사치계)','신라와 함께 한강 하류 일시 회복'],d:'신라 진흥왕에게 한강 유역을 빼앗긴 뒤 관산성 전투에서 전사(554)'},
 '백제|무왕':{a:['익산 미륵사 건립'],d:''},
 '백제|의자왕':{a:['신라 대야성 등 40여 성 함락(642)'],d:'나당 연합군에 사비성이 함락되어 당으로 끌려감(660)'},
 '신라|내물 마립간':{a:['"마립간" 칭호, 김씨 왕위 세습','광개토 대왕의 도움으로 왜 격퇴(400)'],d:''},
 '신라|눌지 마립간':{a:['나제 동맹(433), 왕위 부자 상속'],d:''},
 '신라|지증왕':{a:['국호 "신라", 왕 칭호 사용','우산국 복속(이사부, 512)','우경 장려, 동시전 설치'],d:''},
 '신라|법흥왕':{a:['율령 반포, 병부 설치, 백관 공복 제정','불교 공인(이차돈 순교, 527)','"건원" 연호, 금관가야 병합(532)'],d:''},
 '신라|진흥왕':{a:['화랑도 국가 조직화, "개국" 연호','한강 유역 차지, 대가야 정복(562)','단양 적성비·4개 순수비 건립, 『국사』 편찬(거칠부)'],d:''},
 '신라|선덕 여왕':{a:['첨성대·분황사·황룡사 9층 목탑 건립'],d:'비담의 난 중 사망'},
 '신라|태종 무열왕':{a:['최초의 진골 출신 왕','나당 연합으로 백제 멸망(660)'],d:''},
 '신라|문무왕':{a:['고구려 멸망(668), 매소성·기벌포 승리로 삼국 통일(676)'],d:'유언에 따라 동해 대왕암에 장사 지냄'},
 '신라|신문왕':{a:['김흠돌의 난 진압','국학 설립, 9주 5소경, 9서당 10정','관료전 지급, 녹읍 폐지'],d:''},
 '신라|혜공왕':{a:['성덕 대왕 신종 완성'],d:'김지정의 난 중 살해됨(780), 이후 신라 하대 시작'},
 '신라|원성왕':{a:['독서삼품과 실시(788)'],d:''},
 '신라|헌덕왕':{a:['김헌창의 난(822) 진압'],d:''},
 '신라|흥덕왕':{a:['장보고의 청해진 설치(828)'],d:''},
 '신라|진성 여왕':{a:['원종·애노의 난(889), 최치원 시무 10여 조'],d:''},
 '신라|경애왕':{a:[],d:'포석정에서 후백제 견훤의 습격으로 죽음(927)'},
 '신라|경순왕':{a:[],d:'고려 왕건에게 나라를 바쳐 항복함(935)'},
 '발해|고왕(대조영)':{a:['동모산에서 발해 건국(698), "천통" 연호'],d:''},
 '발해|무왕':{a:['"인안" 연호, 장문휴로 당 등주 공격','일본과 교류, 돌궐과 연결해 당·신라 견제'],d:''},
 '발해|문왕':{a:['"대흥" 연호, 상경 천도','당과 친선, 3성 6부 정비, 신라도 개설'],d:''},
 '발해|선왕':{a:['최대 영토, 5경 15부 62주','"해동성국"이라 불림'],d:''},
 '발해|대인선':{a:[],d:'거란의 침입으로 수도 상경이 함락되어 멸망(926)'},
 '후백제|견훤':{a:['완산주에서 후백제 건국(900)','신라 금성 침입, 경애왕 죽임'],d:'아들 신검에게 금산사에 유폐되었다가 탈출해 고려에 귀순(935)'},
 '후고구려|궁예':{a:['송악에서 후고구려 건국(901), 국호 마진→태봉','광평성 등 관제 정비, 미륵 신앙'],d:'신하들이 왕건을 왕으로 추대해 쫓겨남(918)'},
 '고려|태조(왕건)':{a:['고려 건국(918), 후삼국 통일(936)','북진 정책(서경 중시), 호족 혼인 정책·사성 정책','기인 제도·사심관 제도, 「훈요 10조」','흑창 설치, 세율 1/10'],d:''},
 '고려|광종':{a:['노비안검법(956), 과거제(958, 쌍기)','백관 공복 제정, "광덕·준풍" 연호'],d:''},
 '고려|성종':{a:['최승로 시무 28조 수용','2성 6부, 12목에 지방관 파견','국자감 설치, 서희의 외교 담판(993)'],d:''},
 '고려|목종':{a:['개정 전시과'],d:'강조의 정변으로 폐위·살해됨(1009)'},
 '고려|현종':{a:['거란 2·3차 침입(귀주 대첩 1019)','5도 양계, 초조대장경 조판 시작'],d:''},
 '고려|숙종':{a:['별무반 조직(윤관), 해동통보 발행'],d:''},
 '고려|예종':{a:['윤관의 동북 9성 축조(1107)'],d:''},
 '고려|인종':{a:['이자겸의 난(1126), 묘청의 서경 천도 운동(1135)','김부식 『삼국사기』 편찬(1145)'],d:''},
 '고려|의종':{a:[],d:'무신 정변(1170)으로 폐위되어 거제로 쫓겨난 뒤 이의민에게 살해됨'},
 '고려|고종':{a:['몽골 침입, 강화도 천도(1232)','팔만대장경 조판(1236~1251)'],d:''},
 '고려|원종':{a:['개경 환도(1270), 무신 정권 종식'],d:''},
 '고려|충렬왕':{a:['원의 부마국, 정동행성 설치','여·원 연합군 일본 원정'],d:''},
 '고려|공민왕':{a:['기철 등 친원 세력 숙청, 정동행성 이문소 폐지','쌍성총관부 수복(1356), 몽골풍 폐지','신돈 등용, 전민변정도감 설치, 성균관 정비'],d:'홍륜·최만생 등에게 시해됨(1374)'},
 '고려|우왕':{a:['진포 대첩(최무선)·황산 대첩(이성계)','요동 정벌 추진 → 위화도 회군(1388)'],d:'위화도 회군 뒤 이성계 일파에게 폐위되어 죽음'},
 '고려|창왕':{a:[],d:'이성계 일파에게 폐위되어 죽음'},
 '고려|공양왕':{a:['과전법 실시(1391)'],d:'이성계에게 왕위를 넘기고 폐위됨(1392), 고려 멸망'},
 '조선|태조(이성계)':{a:['조선 건국(1392), 한양 천도(1394)','정도전 『조선경국전』'],d:'1·2차 왕자의 난 뒤 왕위를 물려줌'},
 '조선|태종':{a:['6조 직계제, 사간원 독립, 사병 혁파','호패법 실시, 신문고 설치','양전 사업, 주자소 설치(계미자)'],d:''},
 '조선|세종':{a:['집현전 확대, 의정부 서사제','훈민정음 창제(1443)·반포(1446)','4군 6진 개척, 쓰시마 정벌(이종무)','측우기·자격루·앙부일구, 『농사직설』, 공법'],d:''},
 '조선|단종':{a:[],d:'계유정난(1453)으로 숙부 수양 대군에게 왕위를 빼앗기고 영월로 쫓겨나 죽음'},
 '조선|세조':{a:['계유정난으로 즉위, 6조 직계제 부활, 집현전 폐지','직전법 실시, 『경국대전』 편찬 시작','이시애의 난 진압'],d:''},
 '조선|성종':{a:['『경국대전』 완성·반포, 홍문관 설치','사림 등용, 관수관급제'],d:''},
 '조선|연산군':{a:['무오사화(1498)·갑자사화(1504)'],d:'중종반정(1506)으로 폐위되어 강화 교동도로 쫓겨남'},
 '조선|중종':{a:['조광조 등용(현량과, 소격서 폐지)','기묘사화(1519), 3포 왜란(1510)'],d:''},
 '조선|명종':{a:['을사사화(1545), 을묘왜변(1555), 임꺽정의 난'],d:''},
 '조선|선조':{a:['사림 집권, 동인·서인 분당(1575)','임진왜란(1592)·정유재란(1597)'],d:''},
 '조선|광해군':{a:['대동법 실시(경기, 1608), 『동의보감』','명·후금 사이 중립 외교'],d:'인조반정(1623)으로 폐위되어 제주로 유배됨'},
 '조선|인조':{a:['친명배금 정책, 이괄의 난','정묘호란(1627)·병자호란(1636), 삼전도 굴욕'],d:''},
 '조선|효종':{a:['북벌 추진(송시열·이완), 나선 정벌'],d:''},
 '조선|현종':{a:['기해예송(1659)·갑인예송(1674)'],d:''},
 '조선|숙종':{a:['환국(경신·기사·갑술), 상평통보 전국 유통','백두산정계비(1712), 안용복 활동'],d:''},
 '조선|영조':{a:['탕평책(탕평비), 균역법(1750)','신문고 부활, 『속대전』','사도 세자의 죽음(1762)'],d:''},
 '조선|정조':{a:['규장각·장용영 설치, 초계문신제','수원 화성 건설, 신해통공(1791)','『대전통편』'],d:''},
 '조선|순조':{a:['세도 정치 시작, 신유박해(1801)','공노비 해방, 홍경래의 난(1811)'],d:''},
 '조선|철종':{a:['임술 농민 봉기(1862), 삼정이정청 설치','최제우 동학 창시(1860)'],d:''},
 '조선|고종':{a:['흥선 대원군 집권 → 개항(1876)','임오군란·갑신정변·동학 농민 운동·갑오개혁'],d:''},
 '대한제국|고종(광무 황제)':{a:['대한 제국 선포(1897), 광무개혁','헤이그 특사 파견(1907)'],d:'헤이그 특사를 구실로 일제에 의해 강제로 퇴위당함(1907)'},
 '대한제국|순종(융희 황제)':{a:['한일 신협약, 군대 해산(1907)'],d:'한국 병합 조약(1910)으로 나라를 잃음'},
 '남한|대통령 이승만':{a:['정부 수립(1948), 농지 개혁','발췌 개헌·사사오입 개헌'],d:'3·15 부정 선거에 맞선 4·19 혁명으로 하야(1960)'},
 '남한|대통령 윤보선':{a:['내각 책임제(장면 내각)'],d:'5·16 군사 정변 뒤 사임'},
 '남한|대통령 박정희':{a:['경제 개발 5개년 계획, 한일 기본 조약, 베트남 파병','유신 헌법(1972), 새마을 운동'],d:'10·26 사태로 김재규에게 피살됨(1979)'},
 '남한|대통령 전두환':{a:['12·12 사태로 권력 장악, 5·18 민주화 운동 진압'],d:'6월 민주 항쟁 뒤 6·29 선언으로 직선제 수용'},
 '남한|대통령 김영삼':{a:['금융 실명제, 지방 자치제 전면 실시'],d:'임기 말 외환 위기(1997)'},
 '남한|대통령 김대중':{a:['외환 위기 극복, 6·15 남북 공동 선언'],d:''}
};
const KHEARTS=new Set(store.get('kh',[]));
const kkey=(D,r)=>D.n+'|'+r.name;
function ordOf2(D,r){let n=0,prev='';for(const x of D.r){const b=x.name.replace(/\(.*\)/,'');if(!(x.name.includes('복위')||b===prev))n++;prev=b;if(x===r)return n}return ''}
const LIFE=(()=>{const m={};const S=(d,s)=>s.split(';').forEach(x=>{const [k,v]=x.split('=');m[d+'|'+k.trim()]=v.trim()});
 S('고구려','동명성왕=BC 58 ~ BC 19;미천왕=? ~ 331;고국원왕=? ~ 371;소수림왕=? ~ 384;광개토 대왕=374 ~ 413;장수왕=394 ~ 491;영류왕=? ~ 642;보장왕=? ~ 682');
 S('백제','근초고왕=? ~ 375;개로왕=? ~ 475;무령왕=462 ~ 523;성왕=? ~ 554;무왕=? ~ 641;의자왕=? ~ 660');
 S('신라','내물 마립간=? ~ 402;지증왕=437 ~ 514;법흥왕=? ~ 540;진흥왕=534 ~ 576;선덕 여왕=? ~ 647;진덕 여왕=? ~ 654;태종 무열왕=603 ~ 661;문무왕=626 ~ 681;신문왕=? ~ 692;경순왕=? ~ 978');
 S('발해','고왕=? ~ 719;무왕=? ~ 737;문왕=? ~ 793');S('후백제','견훤=867 ~ 936');S('후고구려','궁예=? ~ 918');
 S('고려','태조=877 ~ 943;혜종=912 ~ 945;정종#3=923 ~ 949;광종=925 ~ 975;경종=955 ~ 981;성종=960 ~ 997;목종=980 ~ 1009;현종=992 ~ 1031;덕종=1016 ~ 1034;정종#10=1018 ~ 1046;문종=1019 ~ 1083;순종=1047 ~ 1083;선종=1049 ~ 1094;헌종=1084 ~ 1097;숙종=1054 ~ 1105;예종=1079 ~ 1122;인종=1109 ~ 1146;의종=1127 ~ 1173;명종=1131 ~ 1202;신종=1144 ~ 1204;희종=1181 ~ 1237;강종=1152 ~ 1213;고종=1192 ~ 1259;원종=1219 ~ 1274;충렬왕=1236 ~ 1308;충선왕=1275 ~ 1325;충숙왕=1294 ~ 1339;충혜왕=1315 ~ 1344;충목왕=1337 ~ 1348;충정왕=1338 ~ 1352;공민왕=1330 ~ 1374;우왕=1365 ~ 1389;창왕=1380 ~ 1389;공양왕=1345 ~ 1394');
 S('조선','태조=1335 ~ 1408;정종=1357 ~ 1419;태종=1367 ~ 1422;세종=1397 ~ 1450;문종=1414 ~ 1452;단종=1441 ~ 1457;세조=1417 ~ 1468;예종=1450 ~ 1469;성종=1457 ~ 1494;연산군=1476 ~ 1506;중종=1488 ~ 1544;인종=1515 ~ 1545;명종=1534 ~ 1567;선조=1552 ~ 1608;광해군=1575 ~ 1641;인조=1595 ~ 1649;효종=1619 ~ 1659;현종=1641 ~ 1674;숙종=1661 ~ 1720;경종=1688 ~ 1724;영조=1694 ~ 1776;정조=1752 ~ 1800;순조=1790 ~ 1834;헌종=1827 ~ 1849;철종=1831 ~ 1863;고종=1852 ~ 1919;순종=1874 ~ 1926');
 S('북한','김일성=1912 ~ 1994;김정일=1941 ~ 2011;김정은=1984 ~');S('대한제국','고종=1852 ~ 1919;순종=1874 ~ 1926');S('남한','이승만=1875 ~ 1965;윤보선=1897 ~ 1990;박정희=1917 ~ 1979;최규하=1919 ~ 2006;전두환=1931 ~ 2021;노태우=1932 ~ 2021;김영삼=1927 ~ 2015;김대중=1924 ~ 2009;노무현=1946 ~ 2009;이명박=1941 ~;박근혜=1952 ~;문재인=1953 ~;윤석열=1960 ~;이재명=1963 ~');return m})();
function lifeOf(D,r){const b=pbase(r.name.replace('대통령 ',''));const v=LIFE[`${D.n}|${b}#${ordOf2(D,r)}`]||LIFE[`${D.n}|${b}`];return v?v.replace(/ ~$/,' ~ '):''}
function openKing(dn,idx){const D=DYN[dn];const r=D.r[idx];if(!r)return;const p=$('kpage');
  const evs=EVENTS.filter(e=>{if(e.tp[0]==='wld')return false;const R=kingRef(e);return R&&R.D===D&&R.r===r});
  const info=KINFO[kkey(D,r)]||{};const lab=D.n==='남한'?'대한민국':D.n;const pres=D.n==='남한'||D.n==='북한';
  const yrs=`${yrTxt(r.s)} ~ ${r.e>=2026?'':yrTxt(r.e)}`,len=r.e<2026?Math.max(1,Math.round(r.e-r.s)):null;
  const peers=[];REIGNS.forEach(D2=>{if(D2===D)return;D2.r.forEach((r2,i2)=>{if(Math.min(r2.e,r.e)-Math.max(r2.s,r.s)>.2)peers.push({D2,r2,i2})})});
  const names=new Set();evs.forEach(e=>(e.pp||'').split(/,\s*/).forEach(n=>{n=n.trim();const base=r.name.replace(/\(.*\)|대통령 /g,'');if(n&&!n.includes(base)&&!base.includes(n.replace(/\(.*\)/,'')))names.add(n)}));
  const nb=NEIGH.filter(o=>o[0]<r.e&&o[1]>r.s).map(o=>o[2]);
  const nm=r.name.replace('대통령 ','');const on=KHEARTS.has(kkey(D,r));
  p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>${esc(lab)} 왕계표</span></div>
   <div class="kpin" style="--kc:var(--c-${D.c})">
    <div class="kph"><h1>${esc(nm)}</h1><button class="hrt" type="button" data-kh="${esc(kkey(D,r))}" aria-pressed="${on}" aria-label="하트">${HEART_IC}</button></div>
    <div class="kpsub kpsub2">${lifeOf(D,r)?`<span class="kplife">${lifeOf(D,r)}</span>`:''}<span class="kpord"><b>${esc(lab)}</b> ${pres?`${ordOf2(D,r)}번째 정부`:`${ordOf2(D,r)}대 ${D.n==='대한제국'?'황제':'왕'}`}</span><span>재위 ${yrs}${len?` · ${len}년`:''}</span></div>
    ${info.a&&info.a.length?`<section class="kpach"><h3>업적</h3><ul class="kpl kpal">${info.a.map(x=>`<li>${glx(x)}</li>`).join('')}</ul></section>`:''}
    ${evs.length?`<section><h3>관련 사건</h3><ul class="kpl">${evs.map(e=>`<li class="ev"><button data-kpe="${e.id}" style="--tc:var(--t-${e.tp[0]})"><em>${esc(shortYear(e))}</em>${e.treaty?'<i class="tseal">조</i>':''}${esc(e.t)}</button></li>`).join('')}</ul></section>`:''}
    ${info.d?`<section><h3>${pres?'물러남':'최후'}</h3><p class="kpd">${glx(info.d)}</p></section>`:''}
    ${peers.length?`<section><h3>동시대 ${pres?'':'왕'}</h3><div class="kpp">${peers.map(({D2,r2,i2})=>`<button data-kpk="${esc(D2.n)}|${i2}" style="--kc:var(--c-${D2.c})"><i></i><span>${D2.n==='남한'?'대한민국':esc(D2.n)}</span>${esc(r2.name.replace('대통령 ',''))}</button>`).join('')}</div></section>`:''}
    ${names.size?`<section><h3>동시대 인물</h3>${natHTML([...names],'',r.s)}</section>`:''}
    ${nb.length?`<section><h3>주변국</h3><p class="kpn">${nb.map(esc).join(' · ')}</p></section>`:''}
   </div>`;
  p.hidden=false;p.scrollTop=0;
  p.querySelector('[data-kx]').onclick=()=>{p.hidden=true}}
$('kpage').addEventListener('click',ev=>{const h=ev.target.closest('[data-kh]');if(h){const k=h.dataset.kh;KHEARTS.has(k)?KHEARTS.delete(k):KHEARTS.add(k);store.set('kh',[...KHEARTS]);h.setAttribute('aria-pressed',KHEARTS.has(k));if(KHEARTS.has(k))sfx('heart',true);return}
  const k=ev.target.closest('[data-kpk]');if(k){const [dn,i]=k.dataset.kpk.split('|');openKing(dn,+i);return}
  const e=ev.target.closest('[data-kpe]');if(e){const x=EVENTS.find(y=>y.id===+e.dataset.kpe);const p=$('trpop');
    p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="evd">${evDetailHTML(x)}<div class="nav">${x.ll?`<button class="btn" data-km>${PIN_IC}지도에서 보기</button>`:''}<button class="btn" data-kt>연표에서 보기</button>${hbtn(x,1)}</div></div>`;
    p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;p.querySelector('.trx').onclick=closeTree;const m=p.querySelector('[data-km]');if(m)m.onclick=()=>{closeTree();$('kpage').hidden=true;gotoMap(x)};p.querySelector('[data-kt]').onclick=()=>{closeTree();$('kpage').hidden=true;gotoTimeline(x)}}});
/* 왕 이름을 누르면 (왕계표 · 연대표 · 재생바 · 검색) */
document.addEventListener('click',ev=>{const k=ev.target.closest('[data-king]');if(!k)return;ev.preventDefault();ev.stopPropagation();const [dn,i]=k.dataset.king.split('|');openKing(dn,+i)},true);

/* ───────── 인물 사전 ───────── */
const PINFO={'을지문덕':'고구려 장군. 수 양제의 30만 별동대를 살수에서 크게 물리쳤다(612).','연개소문':'고구려 말 대막리지. 정변으로 영류왕을 죽이고 보장왕을 세웠으며 당의 침입을 막았다.','김유신':'금관가야 왕족 출신 신라 장군. 황산벌에서 계백을 물리치고 삼국 통일을 이끌었다.','계백':'백제 장군. 5천 결사대로 황산벌에서 신라군과 싸우다 전사하였다(660).','김춘추':'신라 태종 무열왕. 당과 동맹을 맺어 백제를 멸망시켰다.','장보고':'통일 신라 하대 무역가. 완도에 청해진을 두고 해상 무역을 장악하였다.','최치원':'6두품 출신 학자. 당 빈공과에 합격하고 진성 여왕에게 시무 10여 조를 올렸다.','이차돈':'신라 법흥왕 때 불교 공인을 위해 순교하였다(527).','서희':'고려 성종 때 외교 담판으로 거란을 물리고 강동 6주를 얻었다(993).','강감찬':'고려 현종 때 거란의 3차 침입을 귀주에서 크게 물리쳤다(1019).','윤관':'별무반을 이끌고 여진을 정벌해 동북 9성을 쌓았다(1107).','김부식':'고려 인종 때 묘청의 난을 진압하고 『삼국사기』를 편찬하였다.','묘청':'서경 천도와 금 정벌, 칭제 건원을 주장하다 난을 일으켰다(1135).','최충헌':'최씨 무신 정권을 연 인물. 교정도감을 설치하였다.','최우':'최충헌의 아들. 정방·서방을 두고 삼별초를 조직, 강화 천도를 단행하였다.','배중손':'삼별초를 이끌고 진도에서 몽골에 항쟁하였다.','김통정':'진도 함락 뒤 제주에서 삼별초 항쟁을 이끌었다.','최무선':'화통도감을 두고 화약 무기를 만들어 진포에서 왜구를 물리쳤다(1380).','정몽주':'고려 말 온건 개혁파 신진 사대부. 이방원 세력에게 선죽교에서 살해되었다.','정도전':'조선 건국의 핵심 설계자. 『조선경국전』을 지었으나 1차 왕자의 난 때 죽었다.','이순신':'임진왜란 때 수군을 이끌고 옥포·한산도·명량·노량에서 승리하였다.','권율':'임진왜란 때 행주산성에서 일본군을 크게 물리쳤다(1593).','곽재우':'임진왜란 때 경상도에서 일어난 의병장(홍의장군).','김시민':'임진왜란 1차 진주성 전투에서 승리하였다.','송시열':'서인(노론)의 영수. 효종의 북벌을 추진하였다.','정약용':'실학자. 『목민심서』·『경세유표』를 짓고 거중기를 만들었다.','박지원':'북학파 실학자. 『열하일기』·『양반전』을 지었다.','박제가':'북학파 실학자. 『북학의』를 지어 소비와 상공업 진흥을 주장하였다.','김정호':'대동여지도를 만든 지리학자.','흥선 대원군':'고종의 아버지. 서원 정리, 경복궁 중건, 통상 수교 거부 정책을 폈다.','김옥균':'급진 개화파. 갑신정변을 일으켰다(1884).','김홍집':'온건 개화파. 『조선책략』을 들여오고 갑오개혁을 이끌었다.','전봉준':'동학 농민 운동의 지도자(녹두 장군).','서재필':'갑신정변에 참여했고, 독립 협회를 세우고 독립신문을 발행하였다.','안중근':'하얼빈에서 이토 히로부미를 처단하였다(1909). 『동양평화론』.','안창호':'신민회·흥사단을 조직한 독립운동가.','김구':'한인 애국단을 조직하고 대한민국 임시 정부를 이끌었다.','윤봉길':'상하이 훙커우 공원 의거(1932).','이봉창':'도쿄에서 일왕에게 폭탄을 던진 의거(1932).','홍범도':'봉오동 전투를 승리로 이끈 독립군 장군(1920).','김좌진':'북로 군정서를 이끌고 청산리 대첩에서 승리하였다(1920).','유관순':'3·1 운동 때 천안 아우내 장터 만세 시위를 이끌었다.','신채호':'민족주의 역사학자. 「조선 혁명 선언」(의열단)을 썼다.','여운형':'조선 건국 동맹·건국 준비 위원회를 이끌고 좌우 합작 운동을 폈다.','김규식':'파리 강화 회의에 대표로 갔고, 좌우 합작·남북 협상에 참여하였다.','이승만':'대한민국 초대 대통령.','박정희':'5·16 군사 정변 뒤 대통령이 되어 유신 체제를 세웠다.'};
const PEOPLE=new Map();
const pbase=n=>n.replace(/\(.*?\)/g,'').trim();
EVENTS.forEach(e=>(e.pp||'').split(/,\s*/).forEach(n=>{n=n.trim();if(!n)return;const b=pbase(n);if(!b||b.length<2)return;if(!PEOPLE.has(b))PEOPLE.set(b,{n:b,evs:[]});PEOPLE.get(b).evs.push(e)}));
function kingOfName(n,T){const b=pbase(n);let best=null;REIGNS.forEach(D=>D.r.forEach((r,i)=>{const nm=r.name.replace('대통령 ','');const inner=(nm.match(/\((.*?)\)/)||[])[1]||'';const keys=[pbase(nm),inner,pbase(nm)+' '+inner].filter(Boolean);
  if(keys.includes(b)||keys.includes(n)){const d=T==null?0:(T>=r.s-1&&T<=r.e+1?0:Math.min(Math.abs(T-r.s),Math.abs(T-r.e)));if(!best||d<best.d)best={D,i,d}}}));return best&&best.d<30?best:null}
function openPerson(n,T){const K=kingOfName(n,T);if(K){openKing(K.D.n,K.i);return}
  const b=pbase(n);const P=PEOPLE.get(b)||{n:b,evs:[]};const ids=new Set(P.evs.map(e=>e.id));const nre=b.length>=3?new RegExp('(^|[^가-힣])'+b.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![가-힣]*(하|한|했|된|되|함|적))'):null;const evs=[...P.evs,...EVENTS.filter(e=>!ids.has(e.id)&&nre&&(nre.test(e.t)||nre.test(e.x||'')))].sort((a,c)=>a.T-c.T);const p=$('kpage');
  const t0=evs.length?evs[0].T:null,t1=evs.length?evs[evs.length-1].T:null;
  const co=new Map();evs.forEach(e=>(e.pp||'').split(/,\s*/).forEach(x=>{x=pbase(x);if(x&&x!==b&&x.length>1)co.set(x,(co.get(x)||0)+1)}));
  const coL=[...co.entries()].sort((a,c)=>c[1]-a[1]).slice(0,14).map(x=>x[0]);
  const same=t0==null?[]:[...PEOPLE.values()].filter(q=>q.n!==b&&!co.has(q.n)&&q.evs.some(e=>e.T>=t0-8&&e.T<=t1+8)).slice(0,14).map(q=>q.n);
  const kings=t0==null?[]:reignsAt((t0+t1)/2).map(r=>`${r.n} ${r.name.replace('대통령 ','')}`);
  const on=KHEARTS.has('p|'+b);
  p.innerHTML=`<div class="kpbar"><button class="ib" data-kx aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>인물 사전</span></div>
   <div class="kpin" style="--kc:var(--seal)">
    <div class="kph"><h1>${esc(b)}</h1><button class="hrt" type="button" data-kh="p|${esc(b)}" aria-pressed="${on}" aria-label="하트">${HEART_IC}</button></div>
    <div class="kpsub">${t0!=null?`<span>${yrTxt(t0)}${t1>t0+.5?' ~ '+yrTxt(t1):''}</span>`:''}${kings.length?`<span>${kings.map(esc).join(' · ')}</span>`:''}</div>
    ${PINFO[b]?`<section><h3>어떤 사람</h3><p class="kpd">${glx(PINFO[b])}</p></section>`:''}
    ${evs.length?`<section><h3>관련 사건</h3><ul class="kpl">${evs.map(e=>`<li class="ev"><button data-kpe="${e.id}" style="--tc:var(--t-${e.tp[0]})"><em>${esc(shortYear(e))}</em>${e.treaty?'<i class="tseal">조</i>':''}${esc(e.t)}</button><p>${glx(e.x)}</p></li>`).join('')}</ul></section>`:''}
    ${coL.length?`<section><h3>함께 나오는 인물</h3><div class="kpp">${coL.map(x=>`<button data-person="${esc(x)}" data-pt="${t0}"><i></i>${esc(x)}</button>`).join('')}</div></section>`:''}
    ${same.length?`<section><h3>같은 시기 인물</h3><div class="kpp">${same.map(x=>`<button data-person="${esc(x)}" data-pt="${t0}"><i></i>${esc(x)}</button>`).join('')}</div></section>`:''}
   </div>`;
  p.hidden=false;p.scrollTop=0;p.querySelector('[data-kx]').onclick=()=>{p.hidden=true}}
document.addEventListener('click',ev=>{const k=ev.target.closest('[data-person]');if(!k)return;if(k.classList.contains('gpn')&&document.body.classList.contains('medit')){if(window.__dcEdit)return;ev.preventDefault();ev.stopPropagation();clearTimeout(window.__dcT);const nm=k.dataset.person,pt=k.dataset.pt?+k.dataset.pt:null;window.__dcT=setTimeout(()=>openPerson(nm,pt),280);return}ev.preventDefault();ev.stopPropagation();try{if(!$('srch').hidden)closeSearch()}catch(_){}closeTree&&$('trpop')&&!$('trpop').hidden&&closeTree();openPerson(k.dataset.person,k.dataset.pt?+k.dataset.pt:null)},true);

/* ───────── 인물 탭: 시대마다 같은 시대 인물, 나라별 색 ───────── */
function personColor(P){const cnt=new Map();P.evs.forEach(e=>{const R=kingRef(e);const c=R?R.D.c:(e.tp.includes('wld')?'wld':(e.era==='colonial'?'ind':null));if(c)cnt.set(c,(cnt.get(c)||0)+1)});let best=null,bn=0;cnt.forEach((v,k)=>{if(v>bn){bn=v;best=k}});
  return best==='wld'?'var(--t-wld)':best==='ind'?'var(--t-ind)':best?`color-mix(in srgb,var(--c-${best}) 70%,var(--ink))`:'var(--ink)'}
function personNation(P){const R=P.evs.map(kingRef).find(Boolean);return R?(R.D.n==='남한'?'대한민국':R.D.n):(P.evs.some(e=>e.tp.includes('wld'))?'외국':'')}
function ppShow(){const b=$('ppbody');if(b.dataset.built)return;b.dataset.built=1;
  const list=[...PEOPLE.values()].filter(P=>!kingOfName(P.n,P.evs[0].T)).map(P=>({P,t:Math.min(...P.evs.map(e=>e.T)),era:P.evs[0].era}));
  $('ppjump').innerHTML=ERAS.filter(E=>list.some(x=>x.era===E.k)).map(E=>`<button type="button" data-pj="${E.k}">${E.n}</button>`).join('');
  b.innerHTML=ERAS.map(E=>{const ps=list.filter(x=>x.era===E.k&&!(typeof NOT_PERSON!=='undefined'&&NOT_PERSON.has(x.P.n)));if(!ps.length)return '';
    const ord=n=>{const k=NAT_ORDER.indexOf(n);return k<0?80:k};const g=new Map();ps.sort((a,c)=>a.t-c.t).forEach(x=>{const n=personNation(x.P)||'기타';if(!g.has(n))g.set(n,[]);g.get(n).push(x)});
    const rows=[...g.entries()].sort((a,c)=>ord(a[0])-ord(c[0]));const FOR=new Set(['중국','북방 민족','일본','미국','러시아·소련','영국','프랑스','독일','캐나다','인도','외국']);let sep=false;
    return `<section class="ppera" id="pp-${E.k}"><h2>${E.n}<span>${esc(E.rg)}</span></h2><div class="ppgrid">${rows.map(([n,xs])=>{const s=FOR.has(n)&&!sep&&rows.some(r=>!FOR.has(r[0]));if(FOR.has(n))sep=true;const col=NAT_COL[n]||'#64748b';return `${s?'<div class="ppsep">외국</div>':''}<div class="pprow"><b style="--nc:${col}">${esc(n)}</b><div class="ppnames">${xs.map(({P,t})=>`<button type="button" data-person="${esc(P.n)}" data-pt="${t}" style="color:${col}">${esc(P.n)}</button>`).join('')}</div></div>`}).join('')}</div></section>`}).join('');
  $('ppjump').querySelectorAll('[data-pj]').forEach(x=>x.onclick=()=>{const s=document.getElementById('pp-'+x.dataset.pj);const rd=$('ppread');rd.scrollTo({top:s.offsetTop-rd.querySelector('.rhead').offsetHeight-4,behavior:'smooth'})})}
if(store.get('view','map')==='pp')setTimeout(ppShow,0);

/* ───────── 이전 · 다음 (어디서나 떠 있는 버튼) ───────── */
const HIST=[];let hIdx=-1,hLock=false;
function hPush(en){if(hLock)return;const cur=HIST[hIdx];if(cur&&JSON.stringify(cur)===JSON.stringify(en))return;HIST.splice(hIdx+1);HIST.push(en);if(HIST.length>60)HIST.shift();hIdx=HIST.length-1;hSync()}
function hApply(en){hLock=true;try{if(en.v){$('kpage').hidden=true;showView(en.v)}else if(en.k)openKing(en.k[0],en.k[1]);else if(en.p)openPerson(en.p[0],en.p[1])}finally{hLock=false}hSync()}
function hSync(){$('hback').disabled=hIdx<=0;$('hfwd').disabled=hIdx>=HIST.length-1;}
{const sv=showView;showView=function(v){sv(v);hPush({v:store.get('view',v)});hSync()};
 const ok=openKing;openKing=function(dn,i){ok(dn,i);hPush({k:[dn,i]})};
 const op=openPerson;openPerson=function(n,T){const K=kingOfName(n,T);if(K){openKing(K.D.n,K.i);return}op(n,T);hPush({p:[n,T]})};}
$('hback').onclick=()=>{if(hIdx>0){hIdx--;hApply(HIST[hIdx])}};
$('hfwd').onclick=()=>{if(hIdx<HIST.length-1){hIdx++;hApply(HIST[hIdx])}};
document.addEventListener('click',ev=>{if(ev.target.closest('[data-kx]')){setTimeout(()=>{hPush({v:store.get('view','map')});hSync()},0)}});
hPush({v:store.get('view','map')});

/* 왕계표 맨 위: 삼국 세기별 한눈에 (노트형 표) */
function samgukTable(){const cols=[['1~3세기',-100,300],['4세기',300,400],['5세기',400,500],['6세기',500,600],['7세기',600,700]];
  const rows=['고구려','백제','신라'];
  const cell=(D,a,b)=>D.r.map((r,i)=>({r,i})).filter(({r})=>r.s>=a&&r.s<b).map(({r,i})=>{const inf=KINFO[D.n+'|'+r.name];const evs=EVENTS.filter(e=>{if(e.tp[0]==='wld')return false;const R=kingRef(e);return R&&R.D===D&&R.r===r});
    const items=(inf&&inf.a&&inf.a.length?inf.a:evs.map(e=>e.t)).slice(0,3);if(!items.length)return '';
    return `<div class="stk"><b data-king="${esc(D.n)}|${i}">${esc(r.name)}</b><span>${items.map(esc).join(' · ')}</span></div>`}).join('');
  return `<section class="samguk"><div class="kghd"><h2>삼국 한눈에</h2><span>세기별 왕과 업적</span></div><div class="stscroll"><table class="stab"><thead><tr><th></th>${cols.map(c=>`<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${rows.map(n=>{const D=DYN[n];return `<tr style="--kc:var(--c-${D.c})"><th>${n}</th>${cols.map(c=>`<td>${cell(D,c[1],c[2])}</td>`).join('')}</tr>`}).join('')}</tbody></table></div></section>`}
{const ks=kgShow;kgShow=function(n,go){const first=!kgBuilt;ks(n,go);if(first&&!document.querySelector('#kgbody .samguk'))$('kgbody').insertAdjacentHTML('afterbegin',samgukTable())}}
/* 구조도 속 인물 이름 → 누르면 인물 사전 */
const PARTYW=new Set(['동인','서인','남인','북인','대북','소북','노론','소론','벽파','시파','사림','훈구','준소','완소']);
function linkPeople(root){if(!root)return;const btn=(n,lab)=>`<button type="button" class="pl" data-person="${esc(n)}">${esc(lab||n)}</button>`;
  root.querySelectorAll('.hn em:not([data-pl])').forEach(em=>{em.dataset.pl=1;let t=em.textContent.trim();const wrap=/^\(.*\)$/.test(t);if(wrap)t=t.slice(1,-1);
    em.innerHTML=(wrap?'(':'')+t.split(/\s*,\s*/).map(part=>{const m=part.match(/^([^()]+?)(\s*\(.*\))?$/);const W=x=>`<span class="plw">${x}</span>`;if(!m)return W(esc(part));const nm=m[1].trim();if(nm.length<2||/[0-9]|등$|세력|파$/.test(nm))return W(esc(part));return W(btn(nm)+esc((m[2]||'').trim()))}).join(', ')+(wrap?')':'')});
  const known=new Set([...PEOPLE.keys(),...Object.keys(PINFO||{}),...REIGNS.flatMap(D=>D.r.map(r=>pbase(r.name.replace('대통령 ',''))))].filter(n=>n.length>=2&&!PARTYW.has(n)));
  root.querySelectorAll('.hn>b:not([data-pl])').forEach(b=>{b.dataset.pl=1;const t=b.textContent.trim();if(b.querySelector('.gw')||PARTYW.has(t))return;if(known.has(t)||kingOfName(t))b.innerHTML=btn(t)});
  const names=[...known].sort((a,b)=>b.length-a.length).map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));if(!names.length)return;const RE=new RegExp(names.join('|'),'g');
  root.querySelectorAll('.hn small,.trflow li,.hchain small,.orgl em,.orgl p').forEach(el=>{const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.gw,button,.pl')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const ns=[];while(w.nextNode())ns.push(w.currentNode);
    ns.forEach(tn=>{const s=tn.nodeValue;RE.lastIndex=0;if(!RE.test(s))return;RE.lastIndex=0;const span=document.createElement('span');span.innerHTML=esc(s).replace(RE,m=>btn(m));tn.replaceWith(...span.childNodes)})})}
{const t0=trShow;trShow=function(){t0.apply(this,arguments);linkPeople($('trbody'))};if($('trbody')&&$('trbody').dataset.built)linkPeople($('trbody'));
 const tp=$('trpop');if(tp)new MutationObserver(()=>linkPeople(tp)).observe(tp,{childList:true,subtree:true})}

{const hd=document.querySelector('header.top');const setH=()=>{if(hd)document.documentElement.style.setProperty('--hdrH',hd.getBoundingClientRect().bottom+'px')};setH();addEventListener('resize',setH);if(hd&&window.ResizeObserver)new ResizeObserver(setH).observe(hd);
 document.querySelectorAll('.tabs [data-view],.tabs button').forEach(b=>b.addEventListener('click',()=>{const k=$('kpage');if(k)k.hidden=true}))}
/* 인물 국적 바로잡기 + 인물 페이지에서 나라별로 묶어 쉼표로 */
const NAT_FIX=(()=>{const m={};const add=(n,l)=>l.split(',').forEach(x=>m[x.trim()]=n);
 add('고조선','부왕,준왕,위만,우거왕');add('가야','김수로');add('고구려','고국원왕,검모잠,고연무,안승,연남생');
 add('백제','비유왕,개로왕,계백,복신,도침,흑치상지,부여풍');add('신라','눌지 마립간,김무력,김품석,김춘추,김인문');add('후백제','신검');add('고려','신숭겸,정몽주,쌍기');
 add('중국','진개,진시황,한 무제,수 문제,수 양제,당 고조,당 태종,소정방,이세적,조광윤,주원장,이여송,진린,이자성,순치제,청 태종,누르하치,목극등,임칙서,홍수전,이홍장,증국번,좌종당,황쭌셴,캉유웨이,량치차오,광서제,쑨원,천두슈,리다자오,장제스,마오쩌둥,펑더화이');
 add('북방 민족','야율아보기,소손녕,소배압,아구다,칭기즈 칸,살리타,쿠빌라이');
 add('일본','나카노오에 황자,아지발도,도요토미 히데요시,고니시 유키나가,와키자카 야스하루,도쿠가와 이에야스,메이지 천황,사이고 다카모리,이노우에 요시카,구로다 기요타카,미야모토 고이치,하나부사,이노우에 가오루,이토 히로부미,미우라 고로,하야시 곤스케,메가타,가쓰라 다로,데라우치,데라우치 마사타케,사이토 마코토,미나미 지로,고노에 후미마로,도조 히데키,요시다 시게루,오히라 마사요시');
 add('미국','페리,슈펠트,알렌,헐버트,아펜젤러,스크랜턴,모스,스티븐스,시어도어 루스벨트,태프트,윌슨,루스벨트,하지,번스,맥아더,트루먼,리지웨이,조이,덜레스,클라크');
 add('러시아·소련','베베르,치스차코프,몰로토프');add('영국','처칠,베빈');add('프랑스','로즈 제독');add('독일','오페르트');add('캐나다','스코필드');add('인도','메논');
 add('북한','김일성,김정일,김정은,남일,김영주');return m})();
const NOT_PERSON=new Set(['서인','남인','을사오적','조선 청년 독립단','민족 대표 33인','대한 독립 군단','신간회','조선어 학회(이윤재','최현배 등)','에디슨 전기 회사','허목·윤휴','이자춘·이성계']);
{const pn=personNation;personNation=function(P){if(NAT_FIX[P.n])return NAT_FIX[P.n];const v=pn(P);if(v==='대한민국')return '한국';if(v)return v;return P.evs.some(e=>e.era==='colonial')?'한국':''}}
const NAT_ORDER=['고조선','고구려','백제','신라','가야','발해','후고구려','후백제','고려','조선','대한제국','한국','북한','중국','북방 민족','일본','미국','러시아·소련','영국','프랑스','독일','캐나다','인도','외국',''];
function natGroups(names,self,t0){const g=new Map();names.filter(n=>!NOT_PERSON.has(n)&&!NOT_PERSON.has(pbase(n))).forEach(full=>{const n=pbase(full);const P=PEOPLE.get(n)||{n,evs:[]};const K=kingOfName(n,t0!=null&&t0!==''&&t0!=='null'?+t0:undefined);let nat=NAT_FIX[n]||(K?(K.D.n==='남한'?'한국':K.D.n):personNation(P))||'기타';if(!g.has(nat))g.set(nat,[]);g.get(nat).push(full)});
  const ord=k=>{const i=NAT_ORDER.indexOf(k);return i<0?90:i};const mine=self?(NAT_FIX[self]||personNation(PEOPLE.get(self)||{n:self,evs:[]})):'';
  return [...g.entries()].sort((a,b)=>(b[0]===mine)-(a[0]===mine)||ord(a[0])-ord(b[0]))}
function natHTML(names,self,t0){const gs=natGroups(names,self,t0);if(!gs.length)return '';
  return `<div class="kpng">${gs.map(([nat,ns])=>`<p><b>${esc(nat)}</b><span>${ns.map(n=>`<button type="button" class="kpn" data-person="${esc(pbase(n))}" data-pt="${t0}">${esc(n)}</button>`).join(', ')}</span></p>`).join('')}</div>`}
{const op=openPerson;openPerson=function(n,T){op(n,T);const p=$('kpage');if(p.hidden)return;
  p.querySelectorAll('.kpp').forEach(box=>{const bs=[...box.querySelectorAll('[data-person]')];if(!bs.length)return;const t0=bs[0].dataset.pt;const self=p.querySelector('.kph h1')?.textContent||'';
    const names=bs.map(b=>b.dataset.person);const html=natHTML(names,self,t0);if(html)box.outerHTML=html;else box.closest('section')?.remove()})}}

/* 사전 탭 (인물 옆): 낱말 ㄱ~ㅎ */
function dcShow(){const b=$('dcbody');if(b.dataset.built)return;try{GLOSS;TREE_OF}catch(e){return}b.dataset.built=1;
  b.innerHTML=`<div class="trcard dccard" style="--trc:#6d28d9">${glossBookHTML((()=>{const o=Object.assign({},PINFO);PEOPLE.forEach(P=>{if(o[P.n]||GLOSS[P.n]||(typeof NOT_PERSON!=='undefined'&&NOT_PERSON.has(P.n))||kingOfName(P.n,P.evs[0]&&P.evs[0].T))return;o[P.n]=P.evs.slice().sort((a,c)=>a.T-c.T).slice(0,2).map(e=>`${shortYear(e)} ${e.t}`).join(' · ')});return o})())}</div>`;
  const heads=[...b.querySelectorAll('.gh')].map(h=>h.id.slice(3));const hl=h=>h==='#'?'#숫자':'#'+h;$('dcjump').innerHTML=heads.map(h=>`<button type="button" data-gi="${h}">${hl(h)}</button>`).join('');b.querySelectorAll('.gh').forEach(x=>x.textContent=hl(x.id.slice(3)));
  const rd=$('dcread');const go=el=>el&&rd.scrollTo({top:el.getBoundingClientRect().top-rd.getBoundingClientRect().top+rd.scrollTop-rd.querySelector('.rhead').offsetHeight-10,behavior:'smooth'});
  const onClick=ev=>{const gi=ev.target.closest('[data-gi]');if(gi){go(document.getElementById('gh-'+gi.dataset.gi));return}const t=ev.target.closest('.gtr');if(t){showView('tr');setTimeout(()=>{const s=document.getElementById('tree-'+t.dataset.tj);const r2=$('trread');if(s)r2.scrollTo({top:s.getBoundingClientRect().top-r2.getBoundingClientRect().top+r2.scrollTop-r2.querySelector('.rhead').offsetHeight-8,behavior:'smooth'})},60)}};
  b.addEventListener('click',onClick);$('dcjump').addEventListener('click',onClick);linkPeople(b)}
{const sv=showView;showView=function(v){sv(v);if(v==='dc')dcShow()};if(store.get('view','map')==='dc')setTimeout(dcShow,0)}

{const pc=personColor;personColor=function(P){try{const c=NAT_COL[personNation(P)];if(c)return c}catch(e){}return pc(P)}}
/* 낱말 북마크 (사전) */
const WORDS=new Set(store.get('words',[]));let dcOnlyBk=false;
const wbBtn=k=>`<button type="button" class="wbk" data-wb="${esc(k)}" aria-pressed="${WORDS.has(k)}" aria-label="낱말 북마크">${BOOK_IC}</button>`;
function toggleWord(k){WORDS.has(k)?WORDS.delete(k):WORDS.add(k);store.set('words',[...WORDS]);document.querySelectorAll(`[data-wb="${CSS.escape(k)}"]`).forEach(b=>b.setAttribute('aria-pressed',WORDS.has(k)));if(dcOnlyBk)dcFilter()}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-wb]');if(!b)return;ev.preventDefault();ev.stopPropagation();toggleWord(b.dataset.wb)},true);
function dcFilter(){const b=$('dcbody');if(!b||!b.dataset.built)return;b.classList.toggle('onlybk',dcOnlyBk);let n=0;b.querySelectorAll('.gl2>div').forEach(c=>{const k=c.dataset.k;const show=!dcOnlyBk||WORDS.has(k);c.hidden=!show;if(show)n++});b.querySelectorAll('.gh').forEach(h=>{const dl=h.nextElementSibling;h.hidden=dl&&![...dl.children].some(c=>!c.hidden);if(dl)dl.hidden=h.hidden});
  const bt=$('dcbk');if(bt)bt.setAttribute('aria-pressed',dcOnlyBk);let em=b.querySelector('.dcempty');if(dcOnlyBk&&!n){if(!em){em=document.createElement('p');em.className='dcempty';b.prepend(em)}em.textContent='아직 북마크한 낱말이 없어요. 낱말 카드의 🔖를 누르면 여기 모여요.';em.hidden=false}else if(em)em.hidden=true}
{const ds=dcShow;dcShow=function(){const b=$('dcbody');const first=!b.dataset.built;ds();if(!b.dataset.built)return;if(first){b.querySelectorAll('.gl2>div').forEach(c=>{const k=(c.querySelector('dt .gpn')||c.querySelector('dt'))?.childNodes[0]?.textContent?.trim();c.dataset.k=k;if(!c.classList.contains('gp')){const dt=c.querySelector('dt');dt.insertAdjacentHTML('beforeend',wbBtn(k))}});
   $('dcjump').insertAdjacentHTML('afterbegin',`<button type="button" id="dcbk" aria-pressed="false">🔖 북마크만</button>`);$('dcbk').onclick=()=>{dcOnlyBk=!dcOnlyBk;dcFilter()}}dcFilter()}}
/* 탭으로 사전에 들어오면 전체 보기 */
document.querySelectorAll('.tabs [data-v="dc"]').forEach(b=>b.addEventListener('click',()=>{dcOnlyBk=false;setTimeout(dcFilter,0)},true));
/* 낱말 뜻 창에도 북마크 버튼 */
{const gp=$('glpop');if(gp)new MutationObserver(()=>{const b=gp.querySelector('b');if(b&&!gp.querySelector('.wbk')){b.insertAdjacentHTML('beforeend',' '+wbBtn(b.textContent.trim()))}}).observe(gp,{childList:true})}
/* 하트 목록(연표)에 하트한 왕·인물도 같이 */
{const rt=renderTLFilter;renderTLFilter=function(){rt.apply(this,arguments);const body=$('tlbody');if(!body)return;let box=$('tlkh');if(!tlHeart){if(box)box.remove();return}
  if(!box){box=document.createElement('section');box.id='tlkh';box.className='tlkh';body.prepend(box)}const ks=[...KHEARTS];
  box.innerHTML=`<h3>하트한 왕·인물 <small>${ks.length}</small></h3>${ks.length?`<div class="kpp">${ks.map(k=>{const [d,n]=k.split('|');if(d==='p')return `<button data-person="${esc(n)}"><i></i>${esc(n)}</button>`;const D=DYN[d];const i=D?D.r.findIndex(r=>r.name===n):-1;return i<0?'':`<button data-kpk="${esc(d)}|${i}" style="--kc:var(--c-${D.c})"><i></i><span>${d==='남한'?'대한민국':esc(d)}</span>${esc(n.replace('대통령 ',''))}</button>`}).join('')}</div>`:'<p class="dcempty">왕이나 인물 페이지에서 ♡를 누르면 여기 모여요.</p>'}<h3>하트한 사건</h3>`}}
document.addEventListener('click',ev=>{const k=ev.target.closest('#tlkh [data-kpk]');if(!k)return;ev.preventDefault();ev.stopPropagation();const [d,i]=k.dataset.kpk.split('|');openKing(d,+i)},true);
