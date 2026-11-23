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
