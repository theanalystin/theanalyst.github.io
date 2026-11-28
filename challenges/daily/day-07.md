---
layout: default
title: Day 7 — Deliver a Five-Minute Executive Briefing
description: Turn an analysis into a concise, evidence-led recommendation for business leaders.
date: 2026-11-28
permalink: /challenges/daily/day-07/
---

# Day 7 — Deliver a Five-Minute Executive Briefing

## Scenario

You are supporting the leadership team of a multi-region retailer. The latest performance review contains sales, order, customer, margin, and returns metrics. Leaders have limited time and want to know what changed, why it matters, and what decision they should make.

Your analysis is not yet a decision. Your job is to turn it into a clear five-minute briefing without overstating what the data proves.

## Objectives

- Lead with the business implication rather than a tour of charts.
- Separate observed facts, interpretations, and untested hypotheses.
- Select a small set of decision-relevant metrics.
- Quantify impact only when the underlying data supports it.
- End with a specific action, owner, and follow-up measure.

## Your mission

Prepare a five-minute executive briefing about a business performance issue. Use the Day 4 investigation structure as a starting point: compare a current period with a valid baseline, identify the largest contributing segments, and state what still needs validation.

You may use a real, public, or synthetic dataset. If no dataset is available, provide a briefing framework with clearly marked placeholders rather than inventing findings.

Your briefing must answer:

1. What changed, over what period, and compared with which baseline?
2. How material is the change to the business?
3. Which two or three drivers have the strongest evidence?
4. What is known, what is only a hypothesis, and what is unknown?
5. What decision or action do you recommend now?

## Required deliverables

1. **One-slide executive summary:** headline, three evidence points, recommendation, and next step.
2. **Five-minute talk track:** approximately 400–600 words, organized for spoken delivery.
3. **Evidence notes:** metric definitions, comparison period, source, and key caveats.
4. **Decision log:** action, accountable owner, success measure, and review date.
5. **Likely challenge questions:** three questions a skeptical executive may ask, with evidence-led responses.

## Submission format

Submit one slide or a one-page memo, followed by the talk track and evidence notes. Use no more than three primary metrics. Put detailed segment tables and methodology in an appendix, not in the opening narrative.

## Quality rules

- Use a like-for-like comparison and disclose the period and baseline.
- Distinguish percentage change from percentage-point change.
- Do not describe correlation as causation.
- Do not report a financial impact unless its calculation and assumptions are visible.
- Every recommendation must have an owner and a measurable follow-up.
- If evidence is incomplete, say so and propose the next test.

## Sample Answer — Click to Reveal

<details class="answer-reveal"><summary>Show Day 7 sample briefing and answer</summary><div class="answer-content" markdown="1">

**This is a sample framework, not a report of actual retailer performance.** No dataset was supplied, so bracketed values are placeholders. Replace them only after validating the source data and metric definitions.

### 1. Executive slide

**Headline:** Net sales performance requires a driver-level review before leadership changes the growth plan.

| Slide element | Sample content |
|---|---|
| Business question | Is the current-period sales movement broad-based or concentrated in a few segments? |
| Evidence 1 | Net sales changed by **[X%]** versus **[baseline period]**, using the approved net-sales definition. |
| Evidence 2 | Orders changed by **[Y%]** and average order value changed by **[Z%]**; reconcile their combined effect to the sales movement. |
| Evidence 3 | **[Region/category]** accounts for **[share]** of the absolute sales change; validate this contribution against the full segment total. |
| Recommendation | Protect segments with stable profitable demand; investigate the largest negative contributor before applying a broad discount. |
| Decision requested | Approve a one-week segment-level investigation and a targeted action test, with Finance and Commercial sign-off. |

The slide headline should state the conclusion, not merely label the chart “Sales Overview.” If the analysis does not yet support a conclusion, use a neutral headline such as “Sales declined; the largest driver is not yet validated.”

### 2. Metric logic and worked example

Use consistent definitions:

`Net Sales = Gross Sales - Discounts - Refunds`

`AOV = Net Sales / Distinct Completed Orders`

For a simple decomposition where net sales are represented by orders multiplied by AOV:

`Volume effect = (Orders_1 - Orders_0) × AOV_0`

`AOV effect = Orders_1 × (AOV_1 - AOV_0)`

The two effects sum to the total change under this sequential convention. State whether cancelled orders and refunds are included and ensure the order population matches the sales numerator.

**Illustrative arithmetic only:** if a hypothetical baseline has 1,000 orders and AOV of $50, while the comparison period has 900 orders and AOV of $52:

- Baseline sales = 1,000 × $50 = $50,000.
- Comparison sales = 900 × $52 = $46,800.
- Total change = -$3,200.
- Volume effect = (900 - 1,000) × $50 = -$5,000.
- AOV effect = 900 × ($52 - $50) = +$1,800.
- Reconciliation = -$5,000 + $1,800 = -$3,200.

This example demonstrates the calculation only; it is not a finding about the retailer.

### 3. Five-minute talk track

**0:00–0:45 — Decision context**

“Today I will focus on whether the sales movement is broad-based and what action is justified. We compare [current period] with [baseline], using the approved net-sales definition. The decision requested is whether to investigate and test a targeted intervention, not whether to launch a blanket promotion.”

**0:45–1:45 — What changed**

“Net sales moved by [X%]. Orders moved by [Y%], while AOV moved by [Z%]. These measures help distinguish a demand or volume issue from a basket-value issue. The comparison uses [like-for-like dates and scope].”

**1:45–3:00 — Where to investigate**

“The largest absolute contribution to the movement comes from [segment], representing [share] of the total change. We checked [relevant comparison segments] and found [validated observation]. This identifies where to focus; it does not by itself explain why the change occurred.”

**3:00–4:00 — Confidence and caveats**

“We have validated [checks completed]. We have not yet established whether [possible cause] explains the movement. The main limitations are [data freshness, missing cost/return attribution, small sample, or other actual caveat]. We will not treat the segment association as causal evidence.”

**4:00–5:00 — Recommendation and ask**

“I recommend [specific next action] for [segment], owned by [role]. Success will be measured using [primary KPI], with [guardrail KPI] to ensure we do not improve sales at the expense of margin or customer experience. I am asking for approval to complete the validation by [date] and return with a test recommendation.”

### 4. Evidence notes and validation checklist

Before presenting, document:

- Metric definition and numerator/denominator.
- Current period, baseline period, timezone, and data refresh timestamp.
- Included order statuses, channels, regions, and currencies.
- Whether returns and refunds are attributed by return date or original order date.
- Whether segment contributions reconcile to the total change.
- Whether the sample size is sufficient for the claim.
- Any data-quality issue that could change the conclusion.

A segment contribution can be calculated as:

`Segment contribution % = Segment sales change / Total sales change`

Use this ratio carefully when the total change is near zero or segment movements offset each other. In those cases, show absolute currency contributions as well.

### 5. Decision log

| Action | Accountable owner | Success measure | Review |
|---|---|---|---|
| Validate the largest segment movement and reconcile source totals | Analytics lead | Reconciled segment bridge; exceptions documented | [Date] |
| Review pricing, availability, and campaign changes in that segment | Commercial lead | Evidence-backed driver assessment | [Date] |
| Design a targeted intervention only if a driver is validated | Segment owner | Incremental net sales with gross-margin and return-rate guardrails | [Date] |

### 6. Three executive questions

**“How do we know this is not seasonality?”**  
Show the matched prior-year period or another appropriate seasonal baseline. If unavailable, disclose that limitation and avoid claiming the decline is unusual.

**“Can we recover the entire gap with a promotion?”**  
Not from the current evidence alone. Estimate unit economics, margin impact, likely incrementality, and customer pull-forward risk; test a targeted intervention before scaling.

**“What would change your recommendation?”**  
A reconciliation failure, a different dominant segment after consistent filtering, evidence that the movement is a calendar or data-refresh artifact, or a test showing negative incremental margin would change the action.

### Final self-review

A strong executive briefing can be understood in 30 seconds from its headline and slide, defended in five minutes from its evidence, and acted on because it names an owner and a success measure. If any of those are missing, revise before presenting.

</div></details>
