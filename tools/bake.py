# 주인이 고친 내용(Firestore)을 사이트 파일로 굳힌다: mine.json(사진 포함 전체) + baked.js(처음 화면에 바로 쓰는 글 자료)
# 사이트를 열 때 예전 자료 → 고친 자료로 바뀌는 일이 없게, 처음부터 최신 자료로 그린다.
import json, os, urllib.request, urllib.parse
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY='AIzaSyAPHs56cX-nqgmU9tR3eVGu8cJo5MqalQY';PROJ='hanguksa-dbb5e'
def dec(v):
    if v is None: return None
    if 'stringValue' in v: return v['stringValue']
    if 'integerValue' in v: return int(v['integerValue'])
    if 'doubleValue' in v: return v['doubleValue']
    if 'booleanValue' in v: return v['booleanValue']
    if 'nullValue' in v: return None
    if 'timestampValue' in v: return v['timestampValue']
    if 'mapValue' in v: return {k:dec(x) for k,x in (v['mapValue'].get('fields') or {}).items()}
    if 'arrayValue' in v: return [dec(x) for x in (v['arrayValue'].get('values') or [])]
    return None
def query(col,after):
    body=json.dumps({'structuredQuery':{'from':[{'collectionId':col}],'where':{'fieldFilter':{'field':{'fieldPath':'at'},'op':'GREATER_THAN','value':{'doubleValue':after}}}}}).encode()
    req=urllib.request.Request(f'https://firestore.googleapis.com/v1/projects/{PROJ}/databases/(default)/documents:runQuery?key={KEY}',data=body,headers={'Content-Type':'application/json'})
    out={}
    for x in json.loads(urllib.request.urlopen(req,timeout=60).read()):
        d=x.get('document')
        if not d: continue
        o={k:dec(v) for k,v in (d.get('fields') or {}).items()}
        if isinstance(o.get('vj'),str):
            try: o['v']=json.loads(o['vj'])
            except Exception: pass
            o.pop('vj',None)
        out[d['name'].split('/')[-1]]=o
    return out
def fetch_since(col,after):
    return query(col,after) if after else fetch(col)
def fetch(col):
    out={};tok=''
    while True:
        u=f'https://firestore.googleapis.com/v1/projects/{PROJ}/databases/(default)/documents/{col}?pageSize=300&key={KEY}'+('&pageToken='+urllib.parse.quote(tok) if tok else '')
        j=json.loads(urllib.request.urlopen(u,timeout=60).read())
        for d in j.get('documents',[]):
            o={k:dec(x) for k,x in (d.get('fields') or {}).items()}
            if isinstance(o.get('vj'),str):
                try: o['v']=json.loads(o['vj'])
                except Exception: pass
                o.pop('vj',None)
            out[d['name'].split('/')[-1]]=o
        tok=j.get('nextPageToken')
        if not tok: return out
hid=lambda k:k.encode('utf-8').hex()[:190]
def merge(base,fs):
    m={hid(d['k']):d for d in base if d and d.get('k')}
    for i,d in fs.items():
        b=m.get(i);at=float(d.get('at') or 0);bt=float((b or {}).get('at') or 0)
        if d.get('del'):
            if not b or at>bt: m.pop(i,None)
        elif d.get('k') and (not b or at>=bt): m[i]=d
    return [d for d in m.values() if not d.get('del') and d.get('k')!='_']
import traceback,sys
LOGP=os.path.join(ROOT,'tools','bake_log.txt')
try:
  MJ=os.path.join(ROOT,'mine.json')
  old=json.load(open(MJ,encoding='utf-8')) if os.path.exists(MJ) else {'mine':[],'sanon':{}}
  A=old.get('_at') or {}
  fm=fetch_since('mine',A.get('mine',0));mine=merge(old.get('mine',[]),fm)
  mine.sort(key=lambda d:d['k'])
  sb=[{'k':k,'v':v} for k,v in (old.get('sanon') or {}).items()]
  fsn=fetch_since('sanon',A.get('sanon',0));sl=merge(sb,fsn)
  sanon={}
  for d in sorted(sl,key=lambda d:d['k']):
      v=d.get('v');v=(v.get('v') or v.get('t') or '') if isinstance(v,dict) else v
      if v: sanon[d['k']]=str(v)
  mx=lambda D,prev:max([prev]+[float(d.get('at') or 0) for d in D.values()])
  json.dump({'_at':{'mine':mx(fm,A.get('mine',0)),'sanon':mx(fsn,A.get('sanon',0))},'sanon':sanon,'mine':mine},open(MJ,'w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
  # 사진(p:)은 글자 데이터(dataURL) 대신 파일로 빼서 mine.json을 가볍게 → 사이트가 빨리 열림
  import base64,re as _re
  PD=os.path.join(ROOT,'assets','pimg');os.makedirs(PD,exist_ok=True)
  keep=set()
  for d in mine:
      if not d['k'].startswith('p:'): continue
      v=d.get('v')
      if isinstance(v,str) and v.startswith('data:image'):
          m=_re.match(r'data:image/(\w+);base64,(.*)$',v,_re.S)
          if not m: continue
          ext={'jpeg':'jpg'}.get(m.group(1),m.group(1));fn='assets/pimg/'+_re.sub(r'[^\w-]','_',d['k'][2:])+'.'+ext
          open(os.path.join(ROOT,fn),'wb').write(base64.b64decode(m.group(2)));d['v']=fn
      if isinstance(d.get('v'),str) and d['v'].startswith('assets/pimg/'): keep.add(os.path.basename(d['v']))
  for f in os.listdir(PD):
      if f not in keep: os.remove(os.path.join(PD,f))
  txt=mine
  open(os.path.join(ROOT,'baked.js'),'w',encoding='utf-8').write('window.__BAKED='+json.dumps({'mine':txt,'sanon':sanon},ensure_ascii=False,separators=(',',':'))+';\n')
  print('mine',len(mine),'text',len(txt),'sanon',len(sanon))

  open(LOGP,'w',encoding='utf-8').write('OK mine=%d text=%d sanon=%d\n'%(len(mine),len(txt),len(sanon)))
except Exception as e:
  open(LOGP,'w',encoding='utf-8').write('ERROR\n'+traceback.format_exc());print(traceback.format_exc())
