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
OWN=set()
try:
    MJ=json.load(open(os.path.join(ROOT,'mine.json'),encoding='utf-8'))
    for d in MJ.get('mine',[]):
        k=d.get('k','')
        if k.startswith('T:@rlimg:') and isinstance(d.get('v'),dict) and (d['v'].get('img') or d['v'].get('u')): OWN.add(k[9:])
except Exception: pass
OWN.add('주먹도끼')
TG={}
for line in open(os.path.join(ROOT,'tools','rl_targets.tsv'),encoding='utf-8'):
    line=line.rstrip('\n')
    if '\t' in line:
        a,b=line.split('\t',1);TG[a]=[x.strip() for x in b.split('|') if x.strip()]
# 목록에 없는 것은 지우고, 이름이 정확히 맞지 않던 기존 사진도 지움
for k in list(DB):
    if DB[k].get('s','').startswith('국립중앙박물관'): continue
    if k not in TG or sq(DB[k].get('n',''))not in [sq(x) for x in TG[k]]:
        try: os.remove(os.path.join(ROOT,DB[k]['f']))
        except Exception: pass
        LOG.append(f'{k}: 맞지 않아 지움 ({DB[k].get("n")})');del DB[k]
for k in list(DB):
    if k in OWN:
        try: os.remove(os.path.join(ROOT,DB[k]['f']))
        except Exception: pass
        LOG.append(f'{k}: 주인 사진이 있어 자동 사진 지움');del DB[k]
for name,targets in TG.items():
    if name in OWN: continue
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
# 국립중앙박물관 e뮤지엄: 국가유산청에서 못 찾은 것만 (열쇠 없이 되는지 먼저 확인)
def emu(path):
    for h in ['https://www.emuseum.go.kr/openapi/','http://www.emuseum.go.kr/openapi/']:
        try:
            d=get(h+path,30);return ET.fromstring(d),d[:300]
        except Exception as e: last=e
    raise last
try:
    x,head=emu('relic/list?numOfRows=1&name='+urllib.parse.quote('빗살무늬토기'))
    LOG.append('e뮤지엄 응답: '+head.decode('utf-8','replace').replace('\n',' '))
    EMU_OK=any(True for _ in x.iter('data')) or any(True for _ in x.iter('item'))
except Exception as e:
    LOG.append('e뮤지엄 연결 실패: '+repr(e));EMU_OK=False
ALL=[l.split('\t')[0] for l in open(os.path.join(ROOT,'tools','rl_names.tsv'),encoding='utf-8') if l.strip()]+list(TG)
if EMU_OK:
    for name in dict.fromkeys(ALL):
        if name in DB: continue
        base=re.sub(r'\s*\(.*?\)\s*',' ',name);base=re.sub(r'[『』]','',base).split('·')[0].strip()
        try:
            x,_=emu('relic/list?numOfRows=20&name='+urllib.parse.quote(sq(base)))
            rows=[]
            for it in list(x.iter('data'))+list(x.iter('item')):
                f={}
                for c in it:
                    k=c.get('key') or c.tag;f[k]=(c.get('value') or c.text or '').strip()
                rows.append(f)
            rows=[r for r in rows if sq(base) in sq(r.get('nameKr','')) and (r.get('imgUri') or r.get('imgThumUriL'))]
            rows.sort(key=lambda r:(0 if '국립중앙박물관' in r.get('museumName2','')+r.get('museumName1','') else 1,len(r.get('nameKr',''))))
            for r in rows[:3]:
                u=r.get('imgUri') or r.get('imgThumUriL')
                try:
                    im=Image.open(io.BytesIO(get(u,60))).convert('RGB')
                    if im.width<300: continue
                    if im.width>1600: im=im.resize((1600,round(im.height*1600/im.width)))
                    fn='assets/rl/emu_%s.jpg'%re.sub(r'\W','',r.get('id','x'))
                    im.save(os.path.join(ROOT,fn),'JPEG',quality=85,optimize=True)
                    DB[name]=dict(f=fn,s='국립중앙박물관 e뮤지엄',n=r.get('nameKr',''),y=r.get('nationalityName2','') or r.get('nationalityName1',''),h='https://www.emuseum.go.kr/detail?relicId='+r.get('id',''))
                    LOG.append(f'{name}: e뮤지엄 OK {DB[name]["n"]}');break
                except Exception as e: LOG.append(f'{name}: e뮤지엄 사진 실패 {e}')
            if name not in DB: LOG.append(f'{name}: e뮤지엄 못 찾음')
        except Exception as e: LOG.append(f'{name}: e뮤지엄 오류 {e}')
        time.sleep(1)
json.dump(DB,open(JP,'w',encoding='utf-8'),ensure_ascii=False,indent=0)
open(os.path.join(ROOT,'tools','rl_fetch_log.txt'),'w',encoding='utf-8').write('\n'.join(LOG)+'\n')
print('\n'.join(LOG))
