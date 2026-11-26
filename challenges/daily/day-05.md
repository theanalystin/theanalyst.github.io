---
layout: default
title: Day 5 — Challenge Misleading Metrics
description: Stress-test business KPIs for denominator shifts, mix effects, averages, timing, and data quality.
date: 2026-11-26
permalink: /challenges/daily/day-05/
---

# Day 5 — Challenge Misleading Metrics

## Scenario

A subscription-commerce leadership team sees three positive signals: average order value is up, revenue per active customer is up, and the number of “active customers” is growing. Yet customer support complaints and cancellations are also rising. The CEO asks whether performance is genuinely improving.

You have access to order-level sales, customer activity, subscription status, refunds, support tickets, and event timestamps. Some definitions were created by different teams and may not align.

## Objectives

- Identify how a KPI can improve while the underlying business weakens.
- Audit numerator, denominator, grain, time window, and population.
- Propose more decision-useful companion metrics.
- Design validation checks before communicating a conclusion.

## Your mission

Audit these five potentially misleading measures:

1. Average order value (AOV)
2. Revenue per active customer
3. Active customer count
4. Cancellation rate
5. Support complaint rate

For each measure:

- Write its exact numerator, denominator, grain, population, and time window.
- Give one realistic way it could improve or deteriorate without reflecting a genuine business improvement.
- Identify a companion metric or segmentation that would expose the issue.
- State a validation check.

Then select the two highest-risk metrics for the CEO’s decision and write a short recommendation.

## Required deliverables

1. **Metric audit table:** five metrics with definition, failure mode, companion metric, and validation.
2. **Example calculations:** at least two small, clearly labeled illustrative examples showing how interpretation can change.
3. **Decision recommendation:** two metrics to redefine or pair with another measure, and why.
4. **Governance note:** proposed owners, refresh cadence, and definition controls.

## Submission format

Submit the metric audit table first, followed by calculations, recommendation, and governance note. Include SQL, DAX, or spreadsheet logic for at least one validation check. Label all illustrative data as hypothetical.

## Quality rules

- Never use “average” without stating what is being averaged and at what grain.
- Define active customers consistently and distinguish activity from paying status.
- Use equivalent time windows and cohorts for comparisons.
- Separate gross sales, net sales, refunds, and recognized revenue.
- Do not claim a metric is wrong until you have checked its intended business definition.

**Day 5 standard:** A KPI is not trustworthy just because its formula is simple. Explain who is counted, what is counted, when it is counted, and what decision it can safely support.

## Sample Answer — Click to Reveal

<details class="answer-reveal"><summary>Show Day 5 sample audit and answer</summary><div class="answer-content" markdown="1">

**This is a sample framework.** No source dataset is supplied, so the numerical examples below are hypothetical and are used only to demonstrate the mechanics.

### 1. Metric audit

| Metric | Definition to lock down | How it can mislead | Companion metric / validation |
|---|---|---|---|
| AOV | Net merchandise sales after discounts and refunds ÷ completed, non-cancelled orders; order grain; calendar month | Low-value orders disappear or customers shift toward a few expensive purchases, lifting the average while order volume falls | Orders, median order value, units/order; reconcile order totals to finance |
| Revenue per active customer | Net revenue in period ÷ distinct customers meeting a documented activity rule in the same period | Denominator includes browsers or one-time visitors, or excludes churned customers inconsistently | Revenue per paying customer, paying-customer count, cohort retention; compare numerator and denominator populations |
| Active customer count | Distinct customer IDs with a qualifying event in the period | A login or support visit counts as activity even if customer has stopped purchasing | Active paying customers and purchasers; audit event types and deduplicate IDs |
| Cancellation rate | Subscriptions cancelled during period ÷ subscriptions eligible to cancel at period start (or another explicitly chosen exposure denominator) | Using end-of-period subscribers as denominator, or mixing cancellation requests with completed cancellations | Logo churn, revenue churn, renewal rate; reconcile cancellation events and subscription states |
| Support complaint rate | Unique customers with a qualifying complaint ÷ active customers, or complaints ÷ orders; choose one | Ticket volume rises because one customer opens many tickets, or denominator expands with low-engagement users | Complaining-customer rate, tickets per 1,000 orders, repeat-contact rate; deduplicate and classify tickets |

Do not mix denominator conventions across periods. If the business chooses a different valid definition, document it and restate historical periods where practical.

### 2. Illustrative calculation A — AOV rises while sales fall

Hypothetical period 1: net sales = 100,000; completed orders = 2,000.

- AOV = 100,000 ÷ 2,000 = 50

Hypothetical period 2: net sales = 90,000; completed orders = 1,500.

- AOV = 90,000 ÷ 1,500 = 60

AOV increased by 20%, but net sales fell by 10% and orders fell by 25%. Reporting AOV alone would create an overly positive impression. Pair it with order volume, total net sales, and median order value.

### 3. Illustrative calculation B — complaint rate depends on the denominator

Hypothetical period 1: 100 complaining customers ÷ 2,000 active customers = 5%.

Hypothetical period 2: 120 complaining customers ÷ 3,000 active customers = 4%.

The rate improved, but the number of complaining customers increased by 20%. Check whether the active-customer population expanded because of low-intent activity. Also report complaints per 1,000 orders and repeat-contact rate.

### 4. Example validation SQL

Assume `orders` contains one row per order with `order_id`, `customer_id`, `order_date`, `status`, `net_sales`. This query checks monthly AOV alongside order count and customer count; adapt status and refund rules to the documented business definition.

```sql
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(net_sales) AS net_sales,
    COUNT(DISTINCT order_id) AS completed_orders,
    COUNT(DISTINCT customer_id) AS purchasing_customers,
    SUM(net_sales) / NULLIF(COUNT(DISTINCT order_id), 0) AS aov
FROM orders
WHERE status = 'completed'
GROUP BY 1
ORDER BY 1;
```

A separate reconciliation should compare the query's net sales with the finance-approved monthly figure and explain timing, tax, shipping, cancellation, and refund differences.

### 5. Recommended CEO view

Pair AOV with completed orders and net sales. Redefine “active customer” around a business-relevant qualifying event, and show active paying customers separately from merely engaged users. For customer experience, report both the proportion of customers raising a complaint and complaints per 1,000 orders, including repeat contacts.

### 6. Governance note

- **Metric owner:** Finance owns revenue and AOV definitions; Product/CRM owns activity definitions; Customer Experience owns complaint classification; Subscription Operations owns cancellation events.
- **Cadence:** review definitions quarterly and whenever source systems or business rules change.
- **Controls:** maintain a versioned metric dictionary, effective dates, named owner, SQL logic, exclusions, and reconciliation checks.
- **Change management:** do not silently change a definition. Publish the change and restate historical comparisons where feasible.

**Decision:** Do not declare performance improved from AOV or active-customer growth alone. First validate the population and denominator, then review total net sales, order/payer volume, retention, cancellations, and customer-experience measures together.

</div></details>
