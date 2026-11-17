# 국가유산청 공개 API(OpenAPI)로 문화유산 대표 사진을 받아 assets/rl 에 저장하고 assets/rlimg.json 을 만든다.
# 앱 주인 요청으로 GitHub Actions에서 실행. 사진에는 출처(국가유산청)와 원래 이름·시대를 함께 기록한다.
import json, os, re, time, urllib.parse, urllib.request, io
import xml.etree.ElementTree as ET
from PIL import Image
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=os.path.join(ROOT,'assets','rl'); os.makedirs(OUT,exist_ok=True)
JP=os.path.join(ROOT,'assets','rlimg.json')
DB=json.load(open(JP,encoding='utf-8')) if os.path.exists(JP) else {}
LOG=[]
HOSTS=['https://www.khs.go.kr/cha/','http://www.khs.go.kr/cha/','https://www.cha.go.kr/cha/','http://www.cha.go.kr/cha/']
UA={'User-Agent':'Mozilla/5.0 (hanguksa study app)'}
def get(u,t=20):
    last=None
    for k in range(4):
        try: return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=t).read()
        except Exception as e:
            last=e;time.sleep(2+k*3)
    raise last
BASE=None
def api(path):
    global BASE
    last=None
    for h in ([BASE] if BASE else HOSTS):
        try:
            x=ET.fromstring(get(h+path));BASE=h;return x
        except Exception as e:
            last=e
    raise last
def tx(n,k):
    e=n.find('.//'+k);return (e.text or '').strip() if e is not None and e.text else ''
ERAK={'prehist':'선사|구석기|신석기','pre':'선사|신석기|청동기|철기|고조선|초기','early':'삼한|원삼국|철기|초기|삼국|가야|백제|고구려|신라','three':'삼국|고구려|백제|신라|가야','nsk':'통일신라|통일 신라|발해|남북국|신라','goryeo':'고려','joseon1':'조선','joseon2':'조선','modern1':'조선|대한제국|근대|개항','colonial':'일제|근대|대한제국'}
sq=lambda s:re.sub(r'\s','',s)
try:
    api('SearchKindOpenapiList.do?pageUnit=1&ccbaMnm1='+urllib.parse.quote('석굴암'))
    LOG.append('API 연결 OK: '+BASE)
except Exception as e:
    LOG.append('API 연결 실패: '+repr(e))
    os.makedirs(os.path.join(ROOT,'assets'),exist_ok=True)
    open(os.path.join(ROOT,'tools','rl_fetch_log.txt'),'w',encoding='utf-8').write('\n'.join(LOG)+'\n');print('\n'.join(LOG));raise SystemExit(0)
TG={}
for line in open(os.path.join(ROOT,'tools','rl_targets.tsv'),encoding='utf-8'):
    line=line.rstrip('\n')
    if '\t' in line:
        a,b=line.split('\t',1);TG[a]=[x.strip() for x in b.split('|') if x.strip()]
# 목록에 없는 것은 지우고, 이름이 정확히 맞지 않던 기존 사진도 지움
for k in list(DB):
    if k not in TG or sq(DB[k].get('n',''))not in [sq(x) for x in TG[k]]:
        try: os.remove(os.path.join(ROOT,DB[k]['f']))
        except Exception: pass
        LOG.append(f'{k}: 맞지 않아 지움 ({DB[k].get("n")})');del DB[k]
for name,targets in TG.items():
    if name in DB and os.path.exists(os.path.join(ROOT,DB[name].get('f',''))): continue
    found=None
    for tg in targets:
        try:
            L=api('SearchKindOpenapiList.do?pageUnit=30&ccbaMnm1='+urllib.parse.quote(tg))
            its=[dict(n=tx(i,'ccbaMnm1'),k=tx(i,'ccbaKdcd'),a=tx(i,'ccbaAsno'),c=tx(i,'ccbaCtcd')) for i in L.iter('item')]
            its=[i for i in its if i['k'] and i['a'] and sq(i['n'])==sq(tg)]
            for it in its[:2]:
                ps='ccbaKdcd=%s&ccbaAsno=%s&ccbaCtcd=%s'%(it['k'],it['a'],it['c'])
                D=api('SearchKindOpenapiDt.do?'+ps);y=tx(D,'ccceName')
                us=[]
                try: us=[(e.text or '').strip() for e in api('SearchImageOpenapi.do?'+ps).iter('imageUrl') if e.text]
                except Exception: pass
                if tx(D,'imageUrl'): us.insert(0,tx(D,'imageUrl'))
                for u in us:
                    try:
                        im=Image.open(io.BytesIO(get(u,60))).convert('RGB')
                        if im.width<300: continue
                        if im.width>1600: im=im.resize((1600,round(im.height*1600/im.width)))
                        fn='assets/rl/%s_%s_%s.jpg'%(it['k'],it['a'],it['c'])
                        im.save(os.path.join(ROOT,fn),'JPEG',quality=85,optimize=True)
                        found=dict(f=fn,s='국가유산청',n=it['n'],y=y,h='https://www.heritage.go.kr/heri/cul/culSelectDetail.do?'+ps);break
                    except Exception as e:
                        LOG.append(f'{name}: 사진 실패 {u} {e}')
                if found: break
        except Exception as e:
            LOG.append(f'{name}: API 오류 {tg} {e}')
        if found: break
        time.sleep(1.2)
    if found: DB[name]=found;LOG.append(f'{name}: OK {found["n"]} ({found["y"]})')
    else: LOG.append(f'{name}: 못 찾음 {targets}')
json.dump(DB,open(JP,'w',encoding='utf-8'),ensure_ascii=False,indent=0)
open(os.path.join(ROOT,'tools','rl_fetch_log.txt'),'w',encoding='utf-8').write('\n'.join(LOG)+'\n')
print('\n'.join(LOG))
