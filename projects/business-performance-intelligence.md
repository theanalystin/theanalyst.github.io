---
layout: default
title: Business Performance Intelligence — Worked Case Study
description: An end-to-end illustrative KPI variance case with synthetic CSV data, SQL, an accessible visual, assumptions and limitations.
permalink: /projects/business-performance-intelligence/
last_modified_at: 2026-10-17
---
<p class="eyebrow">Case study 01 · Worked illustrative example</p>
<h1>Business Performance Intelligence</h1>

**Business question:** Which monthly performance gaps deserve attention first, and what should a management team investigate next?

<p class="note"><strong>Data status: synthetic and illustrative.</strong> All rows and values are created for this example. The result demonstrates a calculation and analysis workflow; it is not a verified result from a company, client or employer.</p>

## 1. Download the sample data

The [CSV sample dataset]({{ '/data/performance_kpis.csv' | relative_url }}) contains the KPI, target, actual, unit and whether a higher value is favourable. Use it to reproduce the calculations below.

## 2. Results from the synthetic sample

<figure class="chart-figure">
<img src="{{ '/assets/img/performance-kpi-chart.svg' | relative_url }}" alt="Indexed bar chart comparing target and actual for four synthetic KPIs: order volume is 8 percent below target, on-time completion is 4 percentage points below target, handling cost is 5 percent higher than target where lower is favourable, and satisfaction is 0.2 points below target." loading="lazy">
<figcaption>Illustrative target and actual values. Bars are indexed to each KPI's target; original values and units are written alongside. Cost above target is unfavourable.</figcaption>
</figure>

| KPI | Target | Actual | Absolute variance | Interpretation |
|---|---:|---:|---:|---|
| Orders processed | 10,000 | 9,200 | -800 | 8% below target |
| On-time completion | 95% | 91% | -4 percentage points | Below target |
| Handling cost per order | ₹120 | ₹126 | +₹6 | 5% above target; higher cost is unfavourable |
| Customer satisfaction | 4.5/5 | 4.3/5 | -0.2 points | Below target |

For count and cost measures, relative variance is (actual − target) / target × 100. Rate changes are shown in percentage points, and rating changes in rating points. The unit and direction matter: a positive cost variance is not a favourable result.

## 3. Reproduce the analysis with SQL

The query assumes a table named `monthly_kpis` with columns `kpi_name`, `target_value`, `actual_value` and `favourable_direction`. The schema is illustrative; load the CSV into a table with these columns first.

~~~sql
SELECT
  kpi_name,
  target_value,
  actual_value,
  actual_value - target_value AS variance,
  CASE
    WHEN target_value = 0 THEN NULL
    ELSE ROUND(100.0 * (actual_value - target_value) / target_value, 2)
  END AS relative_variance_pct,
  favourable_direction
FROM monthly_kpis
ORDER BY ABS(actual_value - target_value) DESC;
~~~

The query ranks absolute numerical differences. This is useful for triage, but not sufficient for priority-setting because units differ. A rigorous priority model also considers business impact, risk, confidence in evidence, and effort.

## 4. What this sample tells us

The sample shows four misses against target. It does **not** explain why they occurred. The next useful step is to segment orders and on-time completion by region, day, order complexity or team, then test whether the same segments also have higher costs or lower satisfaction. These are hypotheses to test, not established causes.

## 5. Assumptions and limitations

- The data are fictional and small; values are manually chosen for teaching.
- Targets are treated as agreed and comparable with actuals for the same period.
- There is no row-level transaction data to verify the figures or perform a true driver decomposition.
- The example does not prove a causal relationship between throughput, cost, timing and satisfaction.
- The chart is a static teaching visual; no live data or dashboard refresh is connected.
- Relative variance can be misleading across units, so the analysis shows percentage points for rates and rating points for customer satisfaction.

## 6. Suggested management follow-up

1. Validate metric definitions, data completeness and reporting period.
2. Locate the largest operational gaps by meaningful segments.
3. Test potential drivers rather than assume causes.
4. Assign an owner, due date and follow-up metric to each investigation.
5. Revisit the scorecard after actions are taken and record whether the gap changed.

## 7. Practice exercise

Orders target 10,000 and actual 9,200. Calculate absolute and relative variance.

**Answer:** Absolute variance = 9,200 − 10,000 = −800 orders. Relative variance = −800 / 10,000 × 100 = −8%.

{% include newsletter.html %}
<p class="updated">Last updated: 17 October 2026</p>
