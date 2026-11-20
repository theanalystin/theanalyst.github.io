#!/usr/bin/env python3
"""Build a source-linked hourly market snapshot for TheAnalyst.in."""
import json, os, urllib.request, urllib.parse, datetime, zoneinfo

SYMBOLS = {
 "NIFTY 50":"^NSEI", "SENSEX":"^BSESN", "BANK NIFTY":"^NSEBANK",
 "INDIA VIX":"^INDIAVIX", "USD/INR":"INR=X",
 "S&P 500":"^GSPC", "NASDAQ Composite":"^IXIC", "DOW JONES":"^DJI",
 "US VIX":"^VIX", "US 10Y yield":"^TNX", "Dollar index":"DX-Y.NYB"
}
def get_quote(symbol):
    url="https://query1.finance.yahoo.com/v8/finance/chart/"+urllib.parse.quote(symbol,safe="")+"?range=1d&interval=1h"
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 TheAnalystMarketRadar/1.0"})
    with urllib.request.urlopen(req,timeout=20) as response:
        data=json.loads(response.read())
    result=data.get("chart",{}).get("result")
    if not result: return None
    r=result[0]; meta=r.get("meta",{}); quote=(r.get("indicators",{}).get("quote") or [{}])[0]
    closes=[x for x in (quote.get("close") or []) if isinstance(x,(int,float))]
    current=meta.get("regularMarketPrice") or (closes[-1] if closes else None)
    previous=meta.get("chartPreviousClose") or meta.get("previousClose")
    if current is None or previous is None: return None
    change=current-previous
    pct=change/previous*100 if previous else None
    ts=meta.get("regularMarketTime") or (r.get("timestamp") or [None])[-1]
    return {"symbol":symbol,"price":current,"previous_close":previous,"change":change,"change_pct":pct,"currency":meta.get("currency"),"timestamp_utc":datetime.datetime.fromtimestamp(ts,datetime.timezone.utc).isoformat() if ts else None}

def main():
    tz=zoneinfo.ZoneInfo("Asia/Kolkata")
    now=datetime.datetime.now(datetime.timezone.utc)
    quotes={}
    errors=[]
    for label,symbol in SYMBOLS.items():
        try:
            q=get_quote(symbol)
            if q: quotes[label]=q
            else: errors.append(label+": no quote")
        except Exception as e: errors.append(label+": "+str(e)[:150])
    data={"updated_utc":now.isoformat(),"updated_ist":now.astimezone(tz).isoformat(),"provider":"Yahoo Finance chart endpoint","source_url":"https://finance.yahoo.com/","quotes":quotes,"errors":errors,"commentary":""}
    key=os.getenv("OPENAI_API_KEY")
    if key and quotes:
        try:
            summary="\n".join(f'{k}: {v["price"]} {v.get("currency") or ""} ({v["change_pct"]:+.2f}%)' for k,v in quotes.items() if v.get("change_pct") is not None)
            payload={"model":"gpt-4o-mini","messages":[{"role":"system","content":"Write a concise 3-5 sentence factual market desk note for The Analyst website. Interpret the supplied quote snapshot cautiously. Do not invent news or causal explanations; identify cross-market observations only. Mention the data may be delayed and that source timestamps differ. Avoid investment advice."},{"role":"user","content":"Market snapshot:\n"+summary+"\nWrite a brief neutral observation, no fabricated news."}],"temperature":0.3}
            req=urllib.request.Request("https://api.openai.com/v1/chat/completions",data=json.dumps(payload).encode(),headers={"Authorization":"Bearer "+key,"Content-Type":"application/json"})
            with urllib.request.urlopen(req,timeout=35) as response:
                data["commentary"]=json.loads(response.read())["choices"][0]["message"]["content"].strip()
        except Exception as e:
            data["commentary"]="AI note unavailable this hour. Compare index moves, volatility and currency/yield signals; do not infer a cause from price moves alone."
    else:
        data["commentary"]="Automated quote snapshot. Review relative moves across indices, volatility, currencies and yields; this snapshot alone does not explain the cause of a move."
    os.makedirs("markets/data",exist_ok=True)
    with open("markets/data/latest.json","w",encoding="utf-8") as f: json.dump(data,f,ensure_ascii=False,indent=2)
    print(f"Saved snapshot: {len(quotes)} quotes; {len(errors)} errors")
    if errors: print("\n".join(errors))
if __name__=="__main__": main()
