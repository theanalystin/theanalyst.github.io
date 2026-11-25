---
layout: default
title: Day 2 — Design a KPI Dictionary
description: Define trustworthy, decision-ready business KPIs before building reports.
date: 2026-11-23
permalink: /challenges/daily/day-02/
---

# Day 2 — Design a KPI Dictionary

## Scenario

Sales says revenue is growing. Finance says profitability is weakening. Marketing reports more customers, while Operations says returns are rising. Everyone uses the same dataset, but their KPI definitions may not match.

Use the Day 1 e-commerce context: orders, revenue, profit, customers, products/categories, regions, dates, discounts, and returns.

## Your mission

Create a **10-metric KPI dictionary** that makes reporting consistent and helps leaders understand performance.

For every KPI, document:

1. **Name and business definition** — what it measures, in plain language.
2. **Formula** — specify the numerator, denominator, and treatment of exclusions.
3. **Grain** — order, order line, customer-period, or another clearly defined level.
4. **Owner** — the business role accountable for the metric.
5. **Filters and caveats** — time window, returns, cancellations, discounts, currency, or other conditions that could change the result.
6. **Target direction** — whether higher, lower, or a range is generally desirable, and why.

Then:

- Select 3 KPIs that should appear on a CEO overview and justify the selection.
- Identify **3 definition conflicts** that could cause two teams to report different numbers for the same KPI.
- Write a short memo explaining how you would establish one trusted definition across teams.

## Required deliverables

- KPI dictionary with 10 rows and all six definition fields.
- CEO KPI shortlist (3) with justification.
- Three KPI definition conflicts and how to resolve them.
- A concise governance memo (150 words maximum).

## Submission format

Use a table with these columns:

`KPI | Definition | Formula | Grain | Owner | Filters / Caveats | Target Direction`

Finish with the CEO shortlist and governance memo.

## Constraints

- Do not build a dashboard today.
- Do not copy KPI definitions from the internet; make and defend your choices.
- State assumptions when the dataset does not support a metric precisely.
- Use public or synthetic data only; never include confidential employer or customer information.

**Quality bar:** A KPI should be clear enough that two analysts can calculate it independently and reach the same result.


## Sample Answer — Click to Reveal

<details class="answer-reveal"><summary>Show Day 2 answer</summary><div class="answer-content">

### 1. Example KPI dictionary

| KPI | Definition / Formula | Grain | Owner | Filters / caveats | Direction |
|---|---|---|---|---|---|
| Net Sales | Gross sales − discounts | Order line, aggregated | Sales | Completed orders; exclude cancellations | Higher |
| Revenue Growth % | (Current net sales − prior net sales) ÷ prior net sales | Month | Finance | Compare equivalent periods | Higher |
| Completed Orders | Count of distinct completed order IDs | Order | Operations | Exclude pending/cancelled | Higher, if profitable |
| AOV | Net sales ÷ completed orders | Order-period | Sales | Count each order once | Context-dependent |
| Gross Profit | Net sales − cost of goods sold | Order line, aggregated | Finance | Cost coverage and timing must be consistent | Higher |
| Gross Margin % | Gross profit ÷ net sales | Period | Finance | Define cost basis | Higher |
| Active Customers | Distinct customers with a completed order | Customer-period | Marketing | Define activity window | Higher, with retention |
| Repeat Customer Rate | Customers with 2+ completed orders in period ÷ active customers | Customer-period | CRM/Marketing | Define repeat window consistently | Higher |
| Discount Rate | Discounts ÷ gross sales | Order line, aggregated | Sales/Finance | Define pre-discount gross sales | Lower, subject to strategy |
| Unit Return Rate | Returned units ÷ units sold | Order line, aggregated | Operations | Aggregate return events before joining | Lower |

### 2. CEO shortlist

1. **Net Sales Growth:** establishes commercial momentum.
2. **Gross Margin %:** ensures growth is economically healthy.
3. **Repeat Customer Rate:** indicates customer relationship strength beyond one-time acquisition.

### 3. Common definition conflicts

- **Revenue:** Sales uses gross sales while Finance uses net sales after discounts. Resolve by publishing both with explicit names.
- **Orders:** Operations includes all orders while Finance excludes pending and cancelled orders. Define completed-order status centrally.
- **Returns:** Teams count return events, returned units, or returned orders. Publish separate event, unit, and order return measures with explicit denominators.

### 4. Governance memo (sample)

Create a centrally owned KPI dictionary with a named business owner and data steward for every metric. Agree on formula, grain, exclusions, refresh timing, and approved dimensions before publishing reports. Store definitions in one shared location, version changes, and require Finance plus the relevant operational owner to approve material changes. Reconcile critical KPIs across source systems monthly and document known limitations. Reports should use certified measures rather than locally recreated formulas.

**Note:** Owners and target directions are illustrative; adapt them to the organization's accountability model and business strategy.
</div></details>
