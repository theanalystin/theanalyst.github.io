---
layout: default
title: Day 4 — Investigate a Performance Decline
description: Decompose a business slowdown, isolate its largest contributors, and turn evidence into a focused investigation.
date: 2026-11-25
permalink: /challenges/daily/day-04/
---

# Day 4 — Investigate a Performance Decline

## Scenario

An e-commerce business reports that net sales have declined for two consecutive months. Leadership wants to know what changed and where to act first. The overall number does not explain whether the decline came from fewer orders, lower basket value, product mix, customer behavior, or regional performance.

You have access to orders, order lines, customers, products, regions, discounts, and returns.

## Objectives

- Decompose the overall performance change into measurable drivers.
- Identify the segments contributing most to the decline.
- Separate observed facts from possible explanations.
- Recommend the next investigation and a business action.

## Your mission

### 1. Establish the baseline

Compare the latest complete month with the previous month and the same month last year, where available.

Report net sales, completed orders, unique customers, average order value (AOV), gross profit or margin (if cost data exists), discount rate, and unit return rate.

State the date range, filters, currency, and any incomplete-period limitations.

### 2. Decompose the change

Use the relationship:

- **Net sales = Completed orders × Average net sales per order**

Quantify how much of the net sales movement is associated with order volume versus average order value. If you use a more detailed decomposition, explain the method and avoid double-counting interaction effects.

### 3. Find the largest contributors

Break the change down by:

- Region
- Product category
- New vs. repeat customers
- Acquisition channel, if available

Rank segments by their absolute contribution to the net sales decline. Show both value change and percentage change; do not rank by percentage alone when segment sizes differ greatly.

### 4. Test plausible drivers

Investigate at least three of these hypotheses:

- Fewer active or purchasing customers
- Lower purchase frequency
- Lower AOV or units per order
- Higher discounting
- Unfavorable product/category mix
- Higher returns or refunds
- A regional or channel-specific decline

For each hypothesis, show the supporting metric, comparison, and evidence that would weaken or disprove it.

### 5. Recommend what leadership should do next

Choose the two highest-priority segments for further investigation. Recommend one immediate action and one additional analysis needed before making a larger decision. State the expected impact direction and the key uncertainty.

## Required deliverables

1. **Performance scorecard:** baseline and comparison periods for the KPIs in Task 1.
2. **Driver decomposition:** a calculation or table showing order-volume and AOV contributions to the net sales change.
3. **Segment contribution table:** ranked region, category, customer, or channel contributors.
4. **Hypothesis log:** at least three hypotheses, evidence for/against, and confidence level.
5. **Executive brief:** maximum 200 words with the main finding, two priority segments, recommended next action, and caveat.
6. **Evidence file:** SQL queries, Power BI screenshots, spreadsheet calculations, or a reproducible notebook.

## Submission format

Submit in this order:

- Dataset source and analysis period
- KPI scorecard
- Driver decomposition and method
- Ranked segment contribution table
- Three or more tested hypotheses
- Two priority segments and recommended next action
- Executive brief (200 words maximum)
- Link to your SQL, Power BI, or notebook evidence

## Quality rules

- Compare equivalent, complete periods.
- Show absolute and percentage changes.
- Validate totals against the source before interpreting drivers.
- Do not claim causation from descriptive analysis.
- If a required field is unavailable, state the limitation and use a clearly labeled proxy.
- Use synthetic or public data only. Never publish confidential employer or customer information.

**Day 4 standard:** Do not stop at “sales declined.” Explain how much changed, where the change came from, what evidence supports the explanation, and what should happen next.
