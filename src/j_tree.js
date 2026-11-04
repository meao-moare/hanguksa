/* ───────── 구조도 (세력이 갈라지고 이어지는 흐름) ───────── */
const N_=(n,d,p,c,t)=>({n,d,p,c,t});
const TREES={
 hungu:{title:'훈구와 사림',sub:'15~16세기, 사화를 거쳐 사림이 정권을 잡기까지',root:
  N_('15세기 후반 양반 지배층','성종 때 사림이 중앙에 진출하면서 두 세력이 맞섬','',[
   N_('훈구','세조 즉위를 도운 공신 세력. 고위 관직을 차지하고 대토지를 소유. 중앙 집권과 부국강병 추구, 관학파 계승','정인지, 신숙주, 한명회',[]),
   N_('사림','정몽주·길재의 학통을 이은 지방 중소 지주 출신 성리학자. 왕도 정치와 향촌 자치 강조. 성종 때 3사(언론 기관)에 진출해 훈구를 비판','김종직, 김굉필, 조광조',[
    N_('무오사화','연산군. 김종직의 「조의제문」을 김일손이 사초에 실은 것이 빌미','김일손',[],'1498'),
    N_('갑자사화','연산군. 생모 폐비 윤씨가 죽은 일을 문제 삼아 훈구·사림 모두 피해','',[],'1504'),
    N_('기묘사화','중종. 조광조의 개혁(현량과, 위훈 삭제, 소격서 폐지)에 훈구가 반발','조광조',[],'1519'),
    N_('을사사화','명종. 외척 대윤(윤임)과 소윤(윤원형)의 다툼','윤원형',[],'1545')])]),
  flow:['성종: 김종직 등 사림을 등용해 훈구를 견제','연산군: 무오사화(1498) · 갑자사화(1504)','중종: 조광조의 개혁 → 기묘사화(1519)','명종: 을사사화(1545) → 사림은 서원·향약을 바탕으로 향촌에서 세력을 키움','선조: 사림이 정권 장악 → 동서 분당(1575)으로 붕당 정치 시작']},
 bungdang2:{title:'붕당 정치의 전개',sub:'선조 ~ 순조, 사림이 갈라지고 예송·환국을 거쳐 세도 정치로',root:
  N_('사림','선조 때 훈구를 누르고 정권을 잡은 성리학자 세력','',[
   N_('동인','이황·조식·서경덕 학파. 척신 정치 청산에 적극적','김효원',[
    N_('남인','이황 학파, 온건파. 예송에서 서인과 대립해 갑인예송(1674)으로 집권, 기사환국(1689)으로 재집권했다가 갑술환국(1694) 뒤 몰락. 정조 때 일부 등용','유성룡, 허목, 윤휴, 채제공',[],'1591 분열'),
    N_('북인','조식·서경덕 학파, 강경파. 임진왜란 때 의병장 다수 배출. 인조반정(1623) 뒤 정치 세력으로서 사실상 사라짐','정인홍, 이산해',[
     N_('대북','광해군을 지지하며 집권(중립 외교). 인조반정(1623)으로 몰락','정인홍, 이이첨',[]),
     N_('소북','영창 대군을 지지. 광해군 때 대북에 밀려남','유영경',[])],'1591 분열')],'1575 동서 분당'),
   N_('서인','이이·성혼 학파. 인조반정(1623)으로 집권하고 남인과 공존','심의겸, 정철',[
    N_('예송','현종. 효종·효종 비가 죽었을 때 자의 대비의 상복 기간을 두고 남인과 다툼. 기해예송(1659) 서인 승리 → 갑인예송(1674) 남인 승리','송시열 ↔ 허목, 윤휴',[
     N_('환국','숙종. 집권 붕당을 한꺼번에 바꿈. 경신환국(1680) 서인 집권 → 기사환국(1689) 남인 집권 → 갑술환국(1694) 서인 집권, 남인 몰락','숙종',[
      N_('노론','대의명분·민생 안정 강조. 영조 즉위를 도와 우세','송시열, 김수항',[
       N_('사도 세자','영조 때 뒤주에 갇혀 죽음(임오화변). 이 일을 두고 노론이 갈라짐','',[
        N_('벽파','사도 세자의 죽음이 옳았다는 쪽. 정조의 정책에 반대','김종수, 심환지',[]),
        N_('시파','사도 세자를 동정하며 정조를 지지(남인 일부 포함)','김조순',[
         N_('세도 정치','순조·헌종·철종 60여 년 동안 안동 김씨·풍양 조씨 등 외척 가문이 권력 독점 → 삼정 문란','김조순',[],'1800~1863')])],'1762')],'1683 분열'),
      N_('소론','실리·적극적 북방 개척 주장. 경종을 지지','윤증, 최석정',[
       N_('소론 강경파 (준소)','영조 즉위에 반발 → 이인좌의 난(1728)을 일으켰다가 몰락','이인좌',[],'1728'),
       N_('소론 온건파 (완소)','영조의 탕평책에 참여해 노론과 함께 등용','',[],'영조')],'1683 분열')],'1680~1694')],'1659·1674')],'1575 동서 분당')],'16세기 후반'),
  flow:['1575 이조 전랑 자리 다툼 → 동서 분당','1589 정여립 모반 사건(기축옥사) · 1591 건저의 사건 → 남북 분당','1623 인조반정 → 서인 집권, 남인과 공존','1659·1674 예송(기해·갑인)','1680 경신환국 → 서인 집권, 노론·소론으로 분열','1689 기사환국 → 남인 집권 · 1694 갑술환국 → 서인 집권','영조·정조 탕평책','1800~ 세도 정치(안동 김씨·풍양 조씨)']},
 yesong:{title:'예송',sub:'현종, 왕실 상복 기간을 두고 서인과 남인이 다투다',root:
  N_('효종의 정통성 문제','효종은 인조의 둘째 아들(형 소현 세자가 일찍 죽음). 계모 자의 대비가 상복을 얼마나 입을지가 쟁점','',[
   N_('기해예송','효종이 죽었을 때 자의 대비의 상복','',[
    N_('서인 · 1년 (기년복) → 채택','효종을 둘째 아들로 봄. 왕도 사대부와 같은 예(신권 강조)','송시열, 송준길',[]),
    N_('남인 · 3년','왕위를 이었으니 맏아들로 대우. 왕실 예는 다르다(왕권 강조)','허목, 윤휴',[])],'1659'),
   N_('갑인예송','효종 비 인선 왕후가 죽었을 때 자의 대비의 상복','',[
    N_('서인 · 9개월 (대공복)','둘째 며느리 기준','송시열',[]),
    N_('남인 · 1년 (기년복) → 채택','맏며느리 기준 → 남인 집권','허목',[])],'1674')]),
  flow:['1659 기해예송 → 서인 우세','1674 갑인예송 → 남인 집권','1680 숙종 경신환국 → 서인 재집권, 환국 정치 시작']},
 tangpyeong:{title:'탕평 정치',sub:'숙종 ~ 정조, 붕당의 다툼을 누르고 왕권을 세우다',chain:[
   N_('숙종 · 환국 정치','잦은 환국(경신 1680 · 기사 1689 · 갑술 1694)으로 한 붕당이 정권을 독점하고 상대를 숙청 → 일당 전제화. 탕평론이 처음 나옴','숙종',[],'17세기 후반'),
   N_('영조 · 완론 탕평','온건한 인물 중심으로 탕평파 육성, 성균관에 탕평비 건립, 이조 전랑 권한 약화, 서원 대폭 정리, 균역법 실시','영조',[],'1724~1776'),
   N_('정조 · 준론 탕평','옳고 그름을 분명히 가려 적극 등용. 남인·소론도 중용(채제공), 규장각·장용영 설치, 초계문신제, 수원 화성 축조','정조, 채제공',[],'1776~1800'),
   N_('세도 정치','정조가 죽은 뒤 순조·헌종·철종 60여 년 동안 안동 김씨·풍양 조씨 등 외척 가문이 권력 독점 → 삼정 문란','',[],'1800~1863')],
  flow:['숙종: 환국으로 붕당 정치가 무너짐 → 탕평론 등장','영조: 탕평비, 이조 전랑 권한 축소, 서원 정리 → 붕당 약화','정조: 시파 중용, 규장각·장용영으로 왕권 강화','순조 이후: 탕평이 무너지고 세도 정치']},
 gaehwa:{title:'개화파의 분화',sub:'1880년대, 개화를 어떻게 할 것인가',root:
  N_('북학파','청의 문물을 배우자는 실학자들','박지원, 홍대용, 박제가, 이덕무',[
   N_('통상 개화파','문호를 열고 통상하자','박규수(사신), 오경석(역관), 유홍기(의사)',[
    Object.assign(N_('온건 개화파','점진적 개혁, 청과의 관계 유지 → 갑오개혁 주도','김홍집, 김윤식, 어윤중',[]),{a:['청','양무운동 → 동도서기론 / 전제 군주제','#4a7bc8']}),
    Object.assign(N_('급진 개화파','급진적 개혁, 청의 간섭 반대 → 갑신정변(1884)','김옥균, 박영효, 서광범, 홍영식',[]),{a:['일','메이지 유신 → 문명개화론 / 입헌 군주제','#e0607e']})],'문호 개방 주장 (통상 수교론)')])},
 wijeong:{title:'위정척사 운동의 흐름',sub:'성리학을 지키고 서양·일본을 물리치자',chain:[
  N_('1860년대 · 통상 반대','척화주전론. 흥선 대원군의 통상 수교 거부 정책을 지지','이항로, 기정진'),
  N_('1870년대 · 개항 반대','왜양일체론: 일본도 서양 오랑캐와 같다. 강화도 조약 반대','최익현'),
  N_('1880년대 · 개화 반대','『조선책략』 유포와 미국 수교 반대, 영남 만인소','이만손, 홍재학'),
  N_('1890년대 · 항일 의병','을미사변·단발령에 맞서 을미의병','유인석, 이소응')]},
 bukbeol:{title:'북벌론과 북학론',sub:'병자호란 뒤 청을 어떻게 볼 것인가',root:
  N_('병자호란(1636)과 삼전도 굴욕','청에 대한 복수심과 소중화 의식','',[
   N_('북벌론 (17세기)','청을 쳐서 치욕을 씻자. 군대를 기르고 성곽을 고쳤으나 효종이 죽어 좌절. 나선 정벌(1654·1658)에 조총 부대를 보냄','효종, 송시열, 이완',[]),
   N_('북학론 (18세기 후반)','청의 앞선 문물과 기술을 배우자. 상공업 진흥 주장(중상학파)','홍대용, 박지원, 박제가, 유득공',[])])},
 silhak:{title:'실학의 두 갈래',sub:'조선 후기, 현실 문제를 해결하려는 학문',root:
  N_('실학','성리학의 한계를 비판하고 실제 생활에 도움이 되는 학문을 추구','',[
   N_('중농학파 (경세치용)','토지 제도 개혁으로 자영농을 기르자','유형원(균전론 『반계수록』), 이익(한전론 『성호사설』), 정약용(여전론 『목민심서』)',[]),
   N_('중상학파 · 북학파 (이용후생)','상공업 진흥과 기술 혁신, 청 문물 수용','유수원(『우서』), 홍대용(『의산문답』), 박지원(『열하일기』), 박제가(『북학의』)',[]),
   N_('국학 연구','우리 역사·지리·언어 연구','안정복(『동사강목』), 유득공(『발해고』), 이중환(『택리지』), 김정호(대동여지도)',[])])},
 goryeo:{title:'고려 지배층의 변화',sub:'고려 건국부터 조선 건국까지',chain:[
  N_('호족','신라 말 지방에서 성장. 왕건도 송악의 호족 출신','왕건, 견훤'),
  N_('문벌 귀족','여러 대에 걸쳐 고위 관직 독점, 음서·공음전으로 특권 유지. 이자겸의 난·묘청의 난으로 흔들림','이자겸, 김부식'),
  N_('무신','무신 정변(1170)으로 권력 장악. 최씨 정권 60여 년','정중부, 최충헌, 최우'),
  N_('권문세족','원 간섭기 친원 세력. 도평의사사 장악, 대농장 소유','기철'),
  N_('신진 사대부 · 신흥 무인','성리학을 익힌 개혁 세력과 홍건적·왜구를 물리친 무인이 손잡고 조선 건국','정도전, 정몽주, 이성계')]},
 musin:{title:'무신 정권의 집권자',sub:'1170 무신 정변 ~ 1270 개경 환도',chain:[
  N_('이의방 · 정중부','중방 중심 정치. 정중부가 집권','이의방, 정중부'),N_('경대승','도방을 설치해 신변 보호',''),N_('이의민','천민 출신 집권자',''),
  N_('최충헌','교정도감 설치, 봉사 10조. 최씨 정권 시작',''),N_('최우','정방(인사)·서방(문신), 삼별초 조직. 강화도 천도',''),N_('최항 → 최의','1258 최의가 살해되어 최씨 정권 붕괴',''),
  N_('김준 → 임연 · 임유무','1270 개경 환도로 무신 정권 끝, 삼별초 항쟁','')]},
 donghak:{title:'동학의 계보',sub:'동학 창시부터 천도교까지',chain:[
  N_('최제우 (1860 창시)','인내천, 시천주. 1864 혹세무민 죄로 처형',''),N_('최시형 (2대 교주)','『동경대전』·『용담유사』 편찬, 교단 정비. 교조 신원 운동','최시형'),
  N_('남접 · 북접','남접(전봉준·손화중·김개남): 적극 봉기 / 북접(최시형·손병희): 처음엔 신중, 2차 봉기 때 연합',''),N_('손병희 (3대 교주)','1905 천도교로 이름을 바꿈. 3·1 운동 민족 대표','손병희')]},
 uibyeong:{title:'의병 운동의 발전',sub:'유생 의병에서 의병 전쟁으로',chain:[
  N_('을미의병 (1895)','을미사변·단발령에 반발. 유생 중심, 아관 파천 뒤 고종의 해산 권고로 해산','유인석, 이소응'),
  N_('을사의병 (1905)','을사늑약에 반발. 평민 의병장 등장','민종식, 최익현, 신돌석'),
  N_('정미의병 (1907)','고종 강제 퇴위·군대 해산에 반발. 해산 군인 합류로 전투력 강화, 13도 창의군의 서울 진공 작전','이인영, 허위'),
  N_('남한 대토벌 (1909) 이후','일제의 대토벌로 국내 활동이 어려워져 만주·연해주로 옮겨 독립군이 됨','홍범도, 이범윤')]},
 gyemong:{title:'개항기 · 애국 계몽 단체',sub:'1896 ~ 1910, 근대 의식과 실력 양성으로 국권을 지키자',chain:[
  N_('독립 협회 (1896)','서재필, 『독립신문』·독립문. 만민 공동회·관민 공동회 → 헌의 6조. 황국 협회의 방해로 해산(1898)','서재필, 이상재, 윤치호'),
  N_('보안회 (1904)','일본의 황무지 개간권 요구를 막아 냄','송수만'),
  N_('헌정 연구회 (1905)','입헌 군주제 주장, 일진회에 맞섬','윤효정'),
  N_('대한 자강회 (1906)','교육·산업 진흥, 고종 강제 퇴위 반대 운동 → 해산','장지연, 윤치호'),
  N_('신민회 (1907)','비밀 결사, 공화정 목표. 대성 학교·오산 학교, 자기 회사·태극 서관, 남만주 삼원보 기지 건설 → 105인 사건(1911)으로 해체','안창호, 양기탁, 이승훈')]},
 org1910:{title:'1910년대 국내 비밀 결사',sub:'무단 통치 아래 몰래 조직한 독립운동 단체',root:
  N_('국내 비밀 결사','헌병 경찰의 감시를 피해 비밀리에 조직','',[
    N_('독립 의군부','고종의 밀명, 복벽주의(왕조 부활)','임병찬',[],'1912'),
    N_('대한 광복회','공화정 목표, 군대식 조직, 친일 부호 처단','박상진, 김좌진',[],'1915'),
    N_('조선 국권 회복단','대구, 단군 숭배·국권 회복','',[],'1915'),
    N_('송죽회','평양, 여성 비밀 결사','',[])])},
 abroad:{title:'1910년대 국외 독립운동 기지',sub:'나라 밖에 독립운동의 터전을 마련하다',root:
  N_('국외 독립운동 기지','독립군 양성·민족 교육·망명 정부','',[
    N_('서간도 (삼원보)','','',[
     N_('경학사 → 부민단','한인 자치 단체','이회영, 이상룡',[],'1911'),
     N_('신흥 강습소 → 신흥 무관 학교','독립군 양성','이회영',[],'1911')]),
    N_('북간도 (용정·명동촌)','','',[
     N_('서전서숙 · 명동 학교','민족 교육','이상설, 김약연',[]),
     N_('중광단 → 북로 군정서','대종교 계열 무장 단체 → 청산리 전투','서일, 김좌진',[])]),
    N_('연해주 (신한촌)','','',[
     N_('권업회','『권업신문』, 한인 자치·실업 장려','이상설',[],'1911'),
     N_('대한 광복군 정부','최초의 망명 정부','이상설, 이동휘',[],'1914'),
     N_('대한 국민 의회','3·1 운동 뒤 수립, 임시 정부로 통합','',[],'1919')]),
    N_('미주','','',[
     N_('대한인 국민회','미주 한인 통합 단체, 독립운동 자금','안창호',[],'1910'),
     N_('흥사단','인재 양성, 실력 양성 운동','안창호',[],'1913'),
     N_('대조선 국민 군단','하와이, 군사 훈련','박용만',[],'1914')]),
    N_('일본 (도쿄)','','',[
     N_('조선 청년 독립단','2·8 독립 선언 → 3·1 운동에 영향','',[],'1919')]),
    N_('상하이','','',[
     N_('동제사','중국 혁명 세력과 연대','신규식',[],'1912'),
     N_('신한 청년당','파리 강화 회의에 김규식 파견','여운형, 김규식',[],'1918')])])},

 armed1920:{title:'만주 무장 독립 투쟁',sub:'1920년대 독립군의 승리와 시련, 통합',root:
  N_('만주 독립군','3·1 운동 뒤 만주·연해주에서 무장 투쟁','',[
   N_('대한 독립군','봉오동 전투(1920) 승리','홍범도',[],'1920'),
   N_('북로 군정서','청산리 전투(1920) 대승','김좌진',[],'1920'),
   N_('간도 참변 → 대한 독립 군단','밀산에서 통합, 자유시로 이동 → 자유시 참변(1921)','서일',[],'1920~21'),
   N_('3부 성립','참의부(임시 정부 직할)·정의부·신민부. 미쓰야 협정(1925)으로 위축','',[
    N_('국민부','조선 혁명당 · 조선 혁명군 → 영릉가·흥경성 전투(한중 연합)','양세봉',[]),
    N_('혁신 의회','한국 독립당 · 한국 독립군 → 쌍성보·대전자령 전투(한중 연합)','지청천',[])],'1920년대 중반')])},
 uiyeol:{title:'의열 투쟁',sub:'개인·소수의 폭탄·암살로 일제에 타격',root:
  N_('의열 투쟁','적의 기관 파괴, 요인 암살','',[
   N_('의열단','신채호 「조선 혁명 선언」을 행동 지침으로. 김익상(조선 총독부), 김상옥(종로 경찰서), 나석주(동양 척식 주식회사)','김원봉',[
    N_('방향 전환','개인 폭력의 한계 → 황푸 군관 학교 입교, 조선 혁명 간부 학교, 민족 혁명당 결성','김원봉',[])],'1919 만주 길림'),
   N_('한인 애국단','침체된 임시 정부에 활기. 이봉창(일왕 저격), 윤봉길(훙커우 공원) → 중국 국민당의 임시 정부 지원','김구',[],'1931 상하이')])},
 society1920:{title:'1920년대 국내 단체',sub:'실력 양성 · 사회 운동 · 민족 협동 전선 · 학술',root:
  N_('1920년대 국내 단체','문화 통치 아래 여러 갈래의 단체 활동','',[
   N_('실력 양성','','',[
    N_('조선 물산 장려회','"조선 사람 조선 것", 토산품 애용','조만식',[],'1920 평양'),
    N_('조선 민립 대학 기성회','"한민족 1천만이 한 사람 1원씩" → 일제 방해, 경성 제국 대학 설립','이상재',[],'1923')]),
   N_('사회 운동','','',[
    N_('천도교 소년회','어린이날 제정, 잡지 『어린이』','방정환',[]),
    N_('조선 형평사','백정 차별 철폐(형평 운동)','',[],'1923 진주'),
    N_('조선 노농 총동맹','노동 쟁의·소작 쟁의 → 노동·농민 총동맹으로 분리','',[],'1924'),
    N_('조선 공산당','6·10 만세 운동 준비, 치안 유지법으로 탄압','',[],'1925')]),
   N_('민족 협동 전선','','',[
    N_('신간회','비타협적 민족주의 + 사회주의(정우회 선언). 광주 학생 항일 운동 진상 조사단','이상재, 안재홍',[],'1927'),
    N_('근우회','신간회 자매 여성 단체','',[],'1927')]),
   N_('학술 · 국학','','',[
    N_('조선어 연구회 → 조선어 학회','가갸날(한글날), 한글 맞춤법 통일안, 『우리말 큰사전』 → 조선어 학회 사건(1942)','이윤재, 최현배',[],'1921 → 1931'),
    N_('진단 학회','실증 사학, 『진단 학보』','이병도, 손진태',[],'1934')])])},
 china1930:{title:'1930~40년대 중국 관내 · 국내 단체',sub:'민족 유일당 운동에서 광복 직전까지',root:
  N_('1930~40년대 독립운동','중일 전쟁·태평양 전쟁 속 무장 세력 정비','',[
   N_('김원봉 계열','','',[
    N_('민족 혁명당','의열단·한국 독립당 등 통합한 정당','김원봉, 지청천, 조소앙',[],'1935'),
    N_('조선 의용대','중국 관내 최초 한인 무장 부대(중국 국민당 지원)','김원봉',[
     N_('일부 → 화북 이동','조선 의용대 화북 지대 → 조선 의용군','',[]),
     N_('나머지 → 한국 광복군 합류','1942, 김원봉 광복군 부사령관','',[])],'1938')]),
   N_('대한민국 임시 정부 (충칭)','','',[
    N_('한국 독립당','임시 정부 여당','김구, 조소앙',[],'1940'),
    N_('한국 광복군','임시 정부 정규군. 대일 선전 포고, 인도·미얀마 전선, 국내 진공 작전 준비(OSS)','지청천, 이범석',[],'1940'),
    N_('대한민국 건국 강령','조소앙의 삼균주의','조소앙',[],'1941')]),
   N_('화북 (옌안)','','',[
    N_('조선 독립 동맹 · 조선 의용군','중국 공산당과 함께 항일 전투','김두봉, 김무정',[],'1942')]),
   N_('국내','','',[
    N_('조선 건국 동맹','비밀 결사 → 광복 후 조선 건국 준비 위원회','여운형',[],'1944')])])},
 minjok1920:{title:'1920년대 민족 운동의 분화',sub:'문화 통치 아래에서 갈라진 노선과 신간회',root:
  N_('국내 민족 운동','3·1 운동 뒤 다양한 노선으로 나뉨','',[
   N_('민족주의','','',[
    N_('타협적 민족주의 (자치론)','일제의 지배를 인정하고 자치를 얻자','이광수(「민족적 경륜」), 최린',[]),
    N_('비타협적 민족주의','완전한 독립을 주장','이상재, 안재홍, 홍명희',[N_('신간회 (1927)','비타협적 민족주의 + 사회주의의 민족 협동 전선. 광주 학생 항일 운동 진상 조사단 파견, 1931 해소','',[])])]),
   N_('사회주의','노동·농민·청년 운동으로 확산. 치안 유지법(1925)으로 탄압. 정우회 선언으로 협동 전선 제의','',[])])},
 dongnip:{title:'독립운동의 노선',sub:'어떤 방법으로 독립을 이룰 것인가',root:
  N_('독립운동','1910년대 이후 국내외에서 여러 방법으로 전개','',[
   N_('무장 투쟁론','독립군·의열 투쟁으로 일제와 싸우자','홍범도, 김좌진, 이동휘, 김원봉(의열단), 지청천(한국광복군)',[]),
   N_('외교 독립론','열강에 독립을 호소하자. 파리 강화 회의, 위임 통치 청원','이승만, 김규식',[]),
   N_('실력 양성론','교육·산업으로 실력을 길러 독립을 준비하자. 물산 장려·민립 대학 설립 운동','안창호, 조만식',[])])},
 haebang:{title:'광복 직후의 정치 세력',sub:'1945 ~ 1948, 통일 정부냐 단독 정부냐',root:
  N_('광복 직후 정치 세력','신탁 통치 문제를 두고 좌우가 대립','',[
   N_('좌익','조선 공산당 → 남조선 노동당. 모스크바 3국 외상 회의 결정 지지','박헌영',[]),
   N_('중도 좌파','조선 건국 준비 위원회 조직, 좌우 합작 운동','여운형',[]),
   N_('중도 우파','좌우 합작 운동, 남북 협상','김규식',[]),
   N_('우익','신탁 통치 반대','',[N_('이승만','정읍 발언(1946)으로 남한 단독 정부 수립 주장','이승만',[]),N_('김구','한국 독립당, 단독 정부 반대 → 남북 협상(1948)','김구',[])])])}
};
/* 구조도는 시대 순서로 */
{const ORD=['goryeo','musin','bungdang2','bukbeol','silhak','wijeong','donghak','gaehwa','uibyeong','gyemong','abroad','org1910','armed1920','uiyeol','dongnip','minjok1920','society1920','china1930','haebang'];const cp={...TREES};Object.keys(TREES).forEach(k=>delete TREES[k]);[...ORD.filter(k=>cp[k]),...Object.keys(cp).filter(k=>!ORD.includes(k))].forEach(k=>TREES[k]=cp[k])}
function treeNode(n){const kids=n.c&&n.c.length;
  const lab=`<div class="hn">${n.t?`<i class="ht">${esc(n.t)}</i>`:''}<b>${esc(n.n)}</b>${n.p?`<em>${esc(n.p)}</em>`:''}${n.d?`<small>${glx(n.d)}</small>`:''}${n.a?(()=>{const [h,...r]=n.a[1].split(/\s*→\s*/);const sub=r.join(' → ').split(/\s*\/\s*/).filter(Boolean);return `<span class="ha" style="--ac:${n.a[2]}"><i>${esc(n.a[0])}</i><span class="hab"><span>${esc(h)}${sub.length?' →':''}</span>${sub.length?`<span class="hasw">${sub.map(x=>`<span class="has">${esc(x)}</span>`).join('')}</span>`:''}</span></span>`})():''}</div>`;
  return `<div class="hrow">${lab}${kids?`<span class="hlink"></span><div class="hkids${n.c.length===1?' one':''}${n.c.every(c=>c.c&&c.c.length)?' grp':''}">${n.c.map(c=>`<div class="hkid">${treeNode(c)}</div>`).join('')}</div>`:''}</div>`}
function treeHTML(k){const T=TREES[k];return `<div class="tree"><div class="trh"><h3>${esc(T.title)}</h3><span>${esc(T.sub)}</span></div>
  ${T.root?`<div class="htree">${treeNode(T.root)}</div>`:''}${T.chain?`<div class="hchain">${T.chain.map(n=>`<div class="hn">${n.t?`<i class="ht">${esc(n.t)}</i>`:''}<b>${esc(n.n)}</b>${n.p?`<em>${esc(n.p)}</em>`:''}${n.d?`<small>${glx(n.d)}</small>`:''}</div>`).join('<span class="harr">→</span>')}</div>`:''}
  ${T.flow?`<div class="trflow"><h4>흐름</h4><ol>${T.flow.map(f=>`<li>${glx(f)}</li>`).join('')}</ol></div>`:''}</div>`}
function openTree(k){const p=$('trpop');p.innerHTML=`<button class="ib trx" type="button" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>${treeHTML(k)}`;p.hidden=false;$('trdim').hidden=false;p.scrollTop=0;$('glpop').hidden=true;
  p.querySelector('.trx').onclick=closeTree}
function closeTree(){$('trpop').hidden=true;$('trdim').hidden=true}
$('trdim').onclick=closeTree;
/* 낱말 풀이 창에 '구조도 보기' 단추 */
document.addEventListener('click',ev=>{const w=ev.target.closest('[data-gl]');if(!w)return;const k=TREE_OF[w.dataset.gl];if(!k)return;setTimeout(()=>{const gp=$('glpop');if(gp.hidden)return;
  gp.insertAdjacentHTML('beforeend',`<button class="trbtn" type="button" data-tree="${k}">구조도 보기 →</button>`);const top=parseFloat(gp.style.top),r=w.getBoundingClientRect();if(top<r.top){gp.style.top=Math.max(8,r.top-gp.offsetHeight-8)+'px'}},0)});
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-tree]');if(!b)return;ev.preventDefault();ev.stopPropagation();openTree(b.dataset.tree)},true);
/* 주제별에 '구조도' 모아 보기 */
{const ch=$('tpchips');ch.insertAdjacentHTML('afterbegin',`<button class="chip trchip" data-k="laws"><i></i>개혁안·정강</button>`);ch.querySelector('[data-k="laws"]').onclick=()=>{tpSel='laws';store.set('topic','laws');renderTP();$('tpread').scrollTop=0};if(tpSel==='tree')tpSel='laws';
 const rt=renderTP;renderTP=function(){if(tpSel!=='tree'&&tpSel!=='laws')return rt();$('tpchips').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===tpSel));$('tpjump').innerHTML='';if(tpSel==='laws'){$('tpbody').innerHTML=lawsHTML();$('tpbody').querySelectorAll('[data-tl]').forEach(li=>li.onclick=ev=>{if(ev.target.closest('[data-gl]'))return;gotoTimeline(EVENTS.find(x=>x.id===+li.dataset.tl))});return}
  $('tpbody').innerHTML=`<p class="trintro">세력이 갈라지고 이어지는 흐름을 한눈에 볼 수 있어요. 설명 글에서 <span class="gw tr">밑줄 친 낱말</span>을 눌러도 열려요.</p>`+Object.keys(TREES).map(treeHTML).join('')};
 if(tpSel==='tree'||tpSel==='laws')renderTP()}

/* ───────── 같은 흐름의 사건이 자리를 옮기면 이동 경로 선 ───────── */
const routeG=el('g',{class:'routes'},G.arr);G.arr.insertBefore(routeG,G.arr.firstChild);
const ROUTES=[];
EVENTS.forEach(a=>(a.fx||[]).forEach(b=>{if(!a.ll||!b.ll||a.f!==b.f)return;const tps=new Set([...a.tp,...b.tp]);if(!(tps.has('war')||tps.has('soc')||tps.has('ind')))return;if(a.treaty||b.treaty||tps.has('wld')||Math.hypot(a.ll[0]-b.ll[0],a.ll[1]-b.ll[1])>7)return;
  const x1=X(a.ll[0]),y1=Y(a.ll[1]),x2=X(b.ll[0]),y2=Y(b.ll[1]),L=Math.hypot(x2-x1,y2-y1);if(L<25)return;
  const mx=(x1+x2)/2-(y2-y1)*.18,my=(y1+y2)/2+(x2-x1)*.18;
  const g=el('g',{class:'route'},routeG);el('path',{class:'rb',d:`M${x1},${y1}Q${mx},${my} ${x2},${y2}`},g);el('path',{class:'rf',d:`M${x1},${y1}Q${mx},${my} ${x2},${y2}`,pathLength:1},g);
  ROUTES.push({a,b,g})}));
function updateRoutes(){const t=curT();ROUTES.forEach(r=>{const oa=pinOf.get(r.a.id),ob=pinOf.get(r.b.id);
  const vis=o=>o&&!o.g.classList.contains('hide')&&!o.g.classList.contains('wait')&&!o.g.classList.contains('stale');const on=r.a.f===pos.i&&vis(oa)&&vis(ob);
  if(on&&!r.g.classList.contains('on')){r.g.classList.add('on');if(playing){r.g.classList.remove('draw');void r.g.getBoundingClientRect();r.g.classList.add('draw')}}else if(!on)r.g.classList.remove('on','draw')})}
{const ut=updateTime;updateTime=function(ch){ut(ch);updateRoutes()}}
updateRoutes();

/* ───────── 38도선 · 휴전선 (붉은 점선, 이름은 바다 쪽) ───────── */
const LINES=[{n:'38도선',s:1945.62,e:1953.57,pts:[[124.3,38],[125,38],[126,38],[127,38],[128,38],[128.75,38]],lab:[129.55,38.05]},
 {n:'휴전선',s:1953.57,e:3000,pts:[[125.9,37.7],[126.2,37.75],[126.7,37.95],[127.1,38.25],[127.6,38.3],[128.1,38.35],[128.37,38.62]],lab:[129.2,38.7]}];
const lineG=el('g',{class:'dmz'},G.arr);
LINES.forEach(L=>{L.p=el('path',{class:'dml',d:'M'+L.pts.map(xy).join('L')},lineG);const g=el('g',{class:'dmlab'},$('ovl'));const t=el('text',{},g);t.textContent=L.n;L.o=ovItem(g,X(L.lab[0]),Y(L.lab[1]));L.g=g});
function updateLines(){const t=curT();LINES.forEach(L=>{const on=t>=L.s&&t<L.e;L.p.classList.toggle('on',on);L.g.classList.toggle('on',on)})}
{const ut2=updateTime;updateTime=function(ch){ut2(ch);updateLines()}}
updateLines();placeOV();

/* 구조도 탭 */
const TRCOL=['#c2410c','#1d4ed8','#047857','#7c3aed','#b45309','#0e7490','#be185d','#4d7c0f','#9f1239','#4338ca','#0f766e','#a16207'];
const CHO='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ',CHO_M={'ㄲ':'ㄱ','ㄸ':'ㄷ','ㅃ':'ㅂ','ㅆ':'ㅅ','ㅉ':'ㅈ'};
function choOf(s){const c=s.charCodeAt(0)-0xAC00;if(c<0||c>11171)return '#';const j=CHO[Math.floor(c/588)];return CHO_M[j]||j}
function glossBookHTML(PP){const PN=PP?Object.keys(PP).filter(k=>!GLOSS[k]):[];const isP=new Set(PN);const ks=[...Object.keys(GLOSS),...PN].sort((a,b)=>a.localeCompare(b,'ko'));const g={};ks.forEach(k=>{(g[choOf(k)]=g[choOf(k)]||[]).push(k)});Object.values(g).forEach(a=>a.sort((x,y)=>(isP.has(x)-isP.has(y))||x.localeCompare(y,'ko')));const heads=Object.keys(g).sort((a,b)=>(a==='#')-(b==='#'));
  return `<section class="gbook"><div class="trh"><h3>낱말 사전</h3><span>낱말 ${ks.length-PN.length}개${PN.length?` · 주요 인물 ${PN.length}명`:''} · 글 속 <span class="gw">점선 낱말</span>은 뜻, <span class="gw tr">밑줄 낱말</span>은 뜻 + 구조도</span></div>
  <div class="gidx">${heads.map(h=>`<button type="button" data-gi="${h}">${h}</button>`).join('')}</div>
  ${heads.map(h=>`<h4 class="gh" id="gh-${h}">${h}</h4><dl class="gl2">${g[h].map(k=>isP.has(k)?`<div class="gp"><dt><button type="button" class="gpn" data-person="${esc(k)}">${esc(k)}</button><i class="gptag">인물</i><button type="button" class="gtr gpd" data-pdeep="${esc(k)}">자세히 →</button></dt><dd>${glx(PP[k])}</dd></div>`:`<div><dt>${esc(k)}${TREE_OF[k]?`<button type="button" class="gtr" data-tj="${TREE_OF[k]}">구조도 →</button>`:''}</dt><dd>${glx(GLOSS[k],[k])}</dd></div>`).join('')}</dl>`).join('')}</section>`}
function trShow(){const b=$('trbody');if(b.dataset.built)return;try{TREES}catch(e){return}b.dataset.built=1;
  $('trjump').innerHTML=Object.entries(TREES).map(([k,T],i)=>`<button type="button" data-tj="${k}" style="--trc:${TRCOL[i%TRCOL.length]}">${esc(T.title)}</button>`).join('')+`<button type="button" data-tj="orgs" style="--trc:#0f766e">단체·조직</button>`;
  b.innerHTML=Object.keys(TREES).map((k,i)=>`<div id="tree-${k}" class="trcard" style="--trc:${TRCOL[i%TRCOL.length]}">${treeHTML(k)}</div>`).join('')+`<div id="tree-orgs" class="trcard" style="--trc:#0f766e">${orgsHTML()}</div>`;b.querySelectorAll('[data-tl]').forEach(li=>li.onclick=ev=>{if(ev.target.closest('[data-gl]'))return;gotoTimeline(EVENTS.find(x=>x.id===+li.dataset.tl))});
  b.addEventListener('click',ev=>{const gi=ev.target.closest('[data-gi]');const t=ev.target.closest('.gtr');const rd=$('trread');const go=el=>el&&rd.scrollTo({top:el.getBoundingClientRect().top-rd.getBoundingClientRect().top+rd.scrollTop-rd.querySelector('.rhead').offsetHeight-18,behavior:'smooth'});if(gi)go(document.getElementById('gh-'+gi.dataset.gi));if(t)go(document.getElementById('tree-'+t.dataset.tj))});
  $('trjump').querySelectorAll('[data-tj]').forEach(x=>x.onclick=()=>{const s=document.getElementById('tree-'+x.dataset.tj);const rd=$('trread');rd.scrollTo({top:s.getBoundingClientRect().top-rd.getBoundingClientRect().top+rd.scrollTop-rd.querySelector('.rhead').offsetHeight-8,behavior:'smooth'})})}
if(store.get('view','map')==='tr')trShow();
