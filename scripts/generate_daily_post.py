#!/usr/bin/env python3
"""Create a daily lesson from the curriculum and a reusable teaching scaffold."""
import datetime as dt, json, os, re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
START=dt.date(2026,10,18)
CURRICULUM=json.loads((ROOT/"_data"/"curriculum.json").read_text(encoding="utf-8"))
def slug(s): return re.sub(r"-+","-",re.sub(r"[^a-z0-9]+","-",s.lower().replace("&","and"))).strip("-")
def main():
 today=dt.date.fromisoformat(os.environ.get("PUBLISH_DATE") or dt.date.today().isoformat())
 n=(today-START).days+1
 if n<1 or n>len(CURRICULUM): print("No lesson scheduled for this date."); return
 item=CURRICULUM[n-1]; out=ROOT/"_posts"/f"{item['date']}-{slug(item['title'])}.md"
 if out.exists(): print("Article already exists; leaving it unchanged."); return
 prev=CURRICULUM[n-2] if n>1 else None; nxt=CURRICULUM[n] if n<len(CURRICULUM) else None
 prev_url=f"/{prev['category']}/{slug(prev['title'])}/" if prev else ""
 next_url=f"/{nxt['category']}/{slug(nxt['title'])}/" if nxt else ""
 body=f"""## What you will learn

Today we will explore **{item['title']}**. The goal is practical: {item['objective']} You do not need to memorise every term. Focus on the question being answered, the evidence used, and the decision that the evidence can support.

Analytics is a way of making a decision less dependent on guesswork. A useful analysis starts with a clear question, checks whether the data can answer it, performs a transparent calculation, and explains the limits. Tools help with the work, but they cannot rescue a poorly framed question or unreliable data.

## Real-life analogy

Imagine running a small neighbourhood café. You want to know whether to prepare more sandwiches on Fridays. You could rely on a memory of the busiest day, but memory tends to emphasise unusual events. A simple record of daily orders gives you a more dependable starting point. You still need context: a local event, a public holiday, or a temporary closure might make one Friday unusual.

Think of **{item['title']}** as one part of this decision-making routine. The technique is useful when it helps you make a fair comparison, see a pattern, or test an assumption. It is not a magic answer: the quality of the conclusion depends on how the records were collected and how the question was defined.

## Step-by-step example

Suppose a café records orders for three days. This small, invented dataset is only for learning.

| Day | Sandwiches sold | Revenue (₹) | Promotion |
|---|---:|---:|---|
| Monday | 18 | 1,800 | No |
| Tuesday | 24 | 2,400 | Yes |
| Wednesday | 21 | 2,100 | No |

**Step 1 — State the question.** Instead of saying “analyse sales,” ask a specific question: “How many sandwiches were sold each day, and what should we check before changing Friday preparation?”

**Step 2 — Check the data.** Confirm that each row represents one day, the units are consistent, and no day is missing. Here, revenue is exactly ₹100 per sandwich in all three rows. That consistency is useful, but it is not proof that every real-world cost or discount has been recorded.

**Step 3 — Calculate a baseline.** Total sandwiches are 18 + 24 + 21 = 63. The daily average is 63 ÷ 3 = 21 sandwiches. Tuesday is 3 sandwiches above that average; Monday is 3 below it. These figures describe this three-day sample only.

**Step 4 — Connect the result to the topic.** Apply **{item['title']}** to the question by writing down what the technique assumes, what it measures, and what evidence would change the decision. For a comparison, keep the period and units consistent. For a model, inspect its inputs and output. For a statistical conclusion, describe uncertainty instead of treating an estimate as an absolute truth.

**Step 5 — Decide what to do next.** Do not immediately prepare 24 sandwiches every Friday just because Tuesday had 24 sales. Collect several weeks of data, compare similar weekdays, note promotions and holidays, and track unsold stock as well as sales. A useful analysis includes the cost of being wrong.

## Common mistakes

- **Starting with a tool instead of a question.** A chart, formula, or query is only useful if it answers a decision-relevant question.
- **Ignoring the unit and grain.** Daily sales, order-level sales, and customer-level sales are different things. Combining them carelessly can double-count.
- **Treating a small sample as a universal rule.** Three days are not enough to establish a stable weekly pattern.
- **Confusing association with cause.** Tuesday had a promotion and higher sales, but one observation cannot prove the promotion caused the difference.
- **Hiding missing or unusual records.** Document exclusions and investigate unexpected values rather than silently removing them.
- **Reporting a number without context.** Include the time period, definition, comparison, and any important limitation.

## Practice exercise

A second café records 12, 16, and 20 cups of tea sold on three consecutive days.

1. Calculate the total and average number of cups sold per day.
2. Name one additional field that would help explain why sales changed.
3. Explain why the average alone is not enough to decide how much tea to prepare every day.

### Answer

The total is 12 + 16 + 20 = 48 cups. The average is 48 ÷ 3 = 16 cups per day. Useful additional fields might include weekday, weather, foot traffic, a nearby event, or whether a promotion ran. The average summarises the observed days but hides variation and may not represent weekends or future demand. A sensible decision uses more observations and considers the cost of running out versus wasting stock.

## Quick quiz

**1. What should come first: a business question or a chart?**  
**Answer:** The business question. It determines which data and comparison are relevant.

**2. The average is 16 cups. Does that mean exactly 16 cups will sell tomorrow?**  
**Answer:** No. An average describes the sample; future demand varies and should be forecast with appropriate context.

**3. What should you do when a value looks unusual?**  
**Answer:** Check its source, definition, and context. Correct or exclude it only with a documented reason.

## Key takeaways

- Start with a decision and a specific question.
- Check the data's meaning, completeness, units, and grain before calculating.
- Show the steps so another person can reproduce the result.
- Separate what the data shows from what you infer.
- Communicate limitations and collect better evidence when a decision is important.

A strong analyst is not the person who produces the most complicated output. It is the person who helps others make a better-informed decision and can explain how the evidence supports it.
"""
 front=f'''---
layout: post
title: {json.dumps(item["title"],ensure_ascii=False)}
date: {item["date"]} 07:00:00 +0530
categories: [{item["category"]}]
category: {item["category"]}
level: {json.dumps(item["level"])}
day: {item["day"]}
objective: {json.dumps(item["objective"],ensure_ascii=False)}
description: {json.dumps(item["objective"],ensure_ascii=False)}
previous_url: {json.dumps(prev_url)}
next_url: {json.dumps(next_url)}
---
'''
 out.parent.mkdir(parents=True,exist_ok=True); out.write_text(front+body+"\n",encoding="utf-8")
 print(f"Generated {out.name}")
if __name__=="__main__": main()
