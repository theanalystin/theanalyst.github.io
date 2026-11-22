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

## Sample Answer

<details class="answer-reveal">
<summary>Show Day 1 answer</summary>
<div class="answer-content">

<h3>1. Ten business KPIs</h3>
<div class="table-wrap"><table>
<thead><tr><th>KPI</th><th>Formula</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Revenue Growth %</td><td>(Current revenue − Previous revenue) ÷ Previous revenue</td><td>Shows revenue momentum</td></tr>
<tr><td>Order Growth %</td><td>(Current orders − Previous orders) ÷ Previous orders</td><td>Tracks demand and volume</td></tr>
<tr><td>Average Order Value (AOV)</td><td>Revenue ÷ Orders</td><td>Detects changes in basket value</td></tr>
<tr><td>Gross Profit</td><td>Revenue − Cost of Goods Sold</td><td>Measures earnings after product costs</td></tr>
<tr><td>Gross Profit Margin %</td><td>Gross Profit ÷ Revenue</td><td>Shows profitability per revenue unit</td></tr>
<tr><td>New Customers</td><td>Count of first-time customers</td><td>Measures acquisition</td></tr>
<tr><td>Repeat Customer Rate</td><td>Repeat customers ÷ Total customers</td><td>Signals retention and loyalty</td></tr>
<tr><td>Purchase Frequency</td><td>Orders ÷ Unique customers</td><td>Measures buying activity</td></tr>
<tr><td>Discount Rate</td><td>Discounts ÷ Gross sales before discounts</td><td>Tracks reliance on promotions</td></tr>
<tr><td>Return Rate</td><td>Returned orders ÷ Total orders</td><td>Flags revenue quality and customer/product issues</td></tr>
</tbody></table></div>

<h3>2. Three analyses to run</h3>
<ol>
<li><strong>Revenue decomposition:</strong> Compare revenue, order volume, and AOV to identify what is masking the slowdown.</li>
<li><strong>Customer health:</strong> Track new vs. repeat customers, repeat rate, and purchase frequency over time.</li>
<li><strong>Profit and revenue quality:</strong> Compare gross margin, discount rate, and return rate by product category and region.</li>
</ol>

<h3>3. Investigation dimensions</h3>
<ul>
<li><strong>Date:</strong> trends, seasonality, and period-over-period changes.</li>
<li><strong>Region:</strong> geographic performance differences.</li>
<li><strong>Product category/product:</strong> growth, decline, and margin drivers.</li>
<li><strong>Customer segment/cohort:</strong> new, repeat, and retained customers.</li>
<li><strong>Discount band:</strong> promotion dependency.</li>
<li><strong>Return status/reason:</strong> return patterns.</li>
</ul>

<h3>4. Five reasons revenue can look healthy while the business deteriorates</h3>
<ol>
<li>Order volume falls while AOV increases.</li>
<li>Discounts grow, reducing margins despite sales.</li>
<li>Returns increase after orders are booked.</li>
<li>Repeat customers decline while new customer acquisition temporarily offsets it.</li>
<li>Revenue becomes concentrated in fewer products, customers, or regions, increasing risk.</li>
</ol>

<h3>5. One-slide CEO response</h3>
<p><strong>What we know:</strong> Revenue alone is not enough to conclude the business is healthy.</p>
<p><strong>First investigation:</strong> Decompose revenue into order volume and AOV, then segment by time, region, product, and customer cohort.</p>
<p><strong>Signals to monitor:</strong> Revenue and order growth, gross margin, repeat customer rate, purchase frequency, discount rate, and return rate.</p>
<p><strong>Decision supported:</strong> Determine whether the slowdown is driven by demand, retention, pricing/promotions, product mix, or returns—and prioritize the corrective action with the largest measurable impact.</p>
</div>
</details>
## Submission format

Reply with your answers numbered **1–5**. Be ready to defend the KPI choices and the first analysis you would run.
