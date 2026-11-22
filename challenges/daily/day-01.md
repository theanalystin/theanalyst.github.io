---
layout: default
title: Day 1 — Diagnose a Slowing Business
description: A practical analytics challenge to investigate why revenue can look healthy while the business weakens.
permalink: /challenges/daily/day-01/
---

# Day 1 — Diagnose a Slowing Business


## Scenario

An e-commerce CEO says revenue looks fine, but the business feels slower and less healthy. You have orders, revenue, profit, customers, product categories, regions, dates, discounts, and returns. There is no dashboard yet.


## Your tasks

1. Define **10 KPIs** that would help assess business health. For each, give the formula and why leadership should care.
2. Choose **3 analyses** that could reveal why the business is slowing.
3. Identify the **dimensions** you would use to investigate (e.g., time, region, category, customer cohort).
4. List **5 ways revenue can appear healthy while the underlying business deteriorates**.
5. Write a **one-slide CEO response**: what you would investigate first, what signals you would monitor, and what decision your analysis should support.


## Deliverables

- KPI table: metric, formula, business purpose.
- Three analysis questions.
- Dimension list with rationale.
- Five revenue-masking risks.
- One-slide executive brief (text is acceptable).


## Rules

- No dashboard on Day 1.
- No tutorials or copied solutions.
- Explain why each KPI matters.
- Distinguish correlation from causation.
- Use synthetic or public data only; never use confidential employer data.


## Explanation

Revenue alone does not tell you whether the business is healthy. Break revenue into its drivers:

- **Revenue = Orders × Average Order Value (AOV)**
- **Orders = Customers × Purchase Frequency**

A slowdown can hide behind stable revenue if order volume falls but AOV rises, discounts increase, returns grow, or repeat customers become less active. Investigate trends over time and segment them by product, region, and customer cohort before recommending action.

## Click to reveal: Sample Answer

<details>
<summary><strong>Show Day 1 answer</strong></summary>

### 1. Ten business KPIs

| KPI | Formula | Why it matters |
|---|---|---|
| Revenue Growth % | (Current revenue − Previous revenue) ÷ Previous revenue | Shows revenue momentum |
| Order Growth % | (Current orders − Previous orders) ÷ Previous orders | Tracks demand/volume |
| Average Order Value (AOV) | Revenue ÷ Orders | Detects changes in basket value |
| Gross Profit | Revenue − Cost of Goods Sold | Measures money earned after product costs |
| Gross Profit Margin % | Gross Profit ÷ Revenue | Shows profitability per revenue unit |
| New Customers | Count of first-time customers | Measures acquisition |
| Repeat Customer Rate | Repeat customers ÷ Total customers | Signals retention/loyalty |
| Purchase Frequency | Orders ÷ Unique customers | Measures buying activity |
| Discount Rate | Discounts ÷ Gross sales before discounts | Tracks reliance on promotions |
| Return Rate | Returned orders ÷ Total orders | Flags revenue quality and customer/product issues |

### 2. Three analyses to run

1. **Revenue decomposition:** Compare revenue, order volume, and AOV to identify what is masking the slowdown.
2. **Customer health:** Track new vs. repeat customers, repeat rate, and purchase frequency over time.
3. **Profit and revenue quality:** Compare gross margin, discount rate, and return rate by product category and region.

### 3. Investigation dimensions

- **Date:** trend, seasonality, and period-over-period changes.
- **Region:** identify geographic performance differences.
- **Product category / product:** locate growth, decline, and margin drivers.
- **Customer segment / cohort:** compare new, repeat, and retained customers.
- **Discount band:** assess promotion dependency.
- **Return status / reason:** identify return patterns.

### 4. Five reasons revenue can look healthy while the business deteriorates

1. Order volume falls while AOV increases.
2. Discounts grow, reducing margins despite sales.
3. Returns increase after orders are booked.
4. Repeat customers decline while new customer acquisition temporarily offsets it.
5. Revenue becomes concentrated in fewer products, customers, or regions, increasing risk.

### 5. One-slide CEO response

**What we know:** Revenue alone is not enough to conclude the business is healthy.

**First investigation:** Decompose revenue into order volume and AOV, then segment by time, region, product, and customer cohort.

**Signals to monitor:** Revenue and order growth, gross margin, repeat customer rate, purchase frequency, discount rate, and return rate.

**Decision supported:** Determine whether the slowdown is driven by demand, customer retention, pricing/promotions, product mix, or returns—and prioritize the corrective action with the largest measurable impact.

</details>

## Submission format

Reply with your answers numbered **1–5**. Be ready to defend the KPI choices and the first analysis you would run.
