---
layout: default
title: Business Performance Intelligence
description: An illustrative KPI variance case study with transparent calculations and management recommendations.
permalink: /projects/business-performance-intelligence/
---
<p class="eyebrow">Case study 01 · Performance analytics</p>

# Business Performance Intelligence

**Business question:** Which performance gaps deserve attention first, and what should a management team investigate next?

This illustrative case demonstrates a disciplined workflow for reviewing a monthly business scorecard. All values are synthetic and are included to explain the method, not to represent a real employer or client.

## 1. Sample data

| KPI | Target | Actual | Variance | Variance % |
|---|---:|---:|---:|---:|
| Orders processed | 10,000 | 9,200 | -800 | -8.0% |
| On-time completion | 95% | 91% | -4 percentage points | — |
| Average handling cost | ₹120 | ₹126 | +₹6 | +5.0% |
| Customer satisfaction | 4.5/5 | 4.3/5 | -0.2 | — |

For count and cost measures, variance percentage is (actual minus target) divided by target, multiplied by 100. For rate measures, report the percentage-point difference separately so readers do not confuse percentage points with relative percentage change.

## 2. Step-by-step analysis

1. **Validate definitions.** Confirm the period, unit, numerator, denominator and source for each metric.
2. **Compare actuals with targets.** Identify gaps by size, direction and business importance.
3. **Segment the gaps.** Break order processing down by region, product, team or time period where data supports it.
4. **Test explanations.** Check whether volume mix, capacity, rework, downtime or input quality plausibly explains the variance.
5. **Prioritise investigation.** Rank opportunities by estimated impact, confidence in evidence and effort required.
6. **Assign action and follow-up.** Give each action an owner, due date, expected result and a metric to monitor.

## 3. Example SQL

The query assumes a table named monthly_kpis with columns kpi_name, target_value and actual_value. The schema is illustrative.

~~~sql
SELECT
  kpi_name,
  target_value,
  actual_value,
  actual_value - target_value AS variance,
  100.0 * (actual_value - target_value)
    / NULLIF(target_value, 0) AS variance_pct
FROM monthly_kpis
ORDER BY ABS(actual_value - target_value) DESC;
~~~

This query ranks absolute variances, which is useful for triage but not sufficient for prioritisation. A small gap in a critical service metric may matter more than a large gap in a low-impact measure. Rate metrics and costs also need direction-aware interpretation.

## 4. What the analyst should conclude

The sample shows missed order volume, weaker on-time completion, higher handling cost and lower satisfaction. These metrics may be connected, but the table alone does not prove a cause. The next step is to segment and test the relationships rather than claim that one metric caused another.

A management-ready summary should state the gap, the evidence, the leading hypotheses, the data needed to confirm them, and the recommended next action.

## 5. Common mistakes

- Comparing metrics with inconsistent definitions or reporting periods.
- Ranking every KPI by percentage variance without considering business impact.
- Treating correlation as proof of causation.
- Presenting a dashboard without a clear action or owner.
- Reporting synthetic examples as observed business outcomes.

## 6. Practice exercise

**Question:** Handling cost increased from a target of ₹120 to an actual of ₹126. What is the absolute and relative variance?

**Answer:** The absolute variance is ₹6 per unit. The relative variance is 6 divided by 120, multiplied by 100: 5% above target.

## 7. Takeaways

- Establish trusted definitions before comparing performance.
- Separate the observed gap from the explanation for that gap.
- Use SQL to make calculations reproducible.
- Prioritise by impact and evidence, not variance alone.
- Close the loop with an owner and a follow-up measure.

**Next step:** add a CSV sample, validate the query in a database, and attach a dashboard screenshot before presenting this as a completed technical project.
