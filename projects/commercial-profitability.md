---
layout: default
title: Commercial Profitability Analysis
description: A practical illustrative analysis of revenue, discounts, costs and contribution margin.
permalink: /projects/commercial-profitability/
---
<p class="eyebrow">Case study 02 · Commercial analytics</p>

# Commercial Profitability Analysis

**Business question:** Which product or category may be creating revenue without contributing enough margin?

All figures below are synthetic. This example demonstrates an analytical method and does not claim a real business result.

## 1. Example dataset

| Category | Units | Net revenue per unit | Variable cost per unit |
|---|---:|---:|---:|
| A | 1,000 | ₹500 | ₹320 |
| B | 800 | ₹700 | ₹560 |
| C | 1,500 | ₹250 | ₹170 |

Contribution per unit is net revenue per unit minus variable cost per unit. Total contribution is contribution per unit multiplied by units.

| Category | Revenue | Total variable cost | Contribution | Contribution margin |
|---|---:|---:|---:|---:|
| A | ₹500,000 | ₹320,000 | ₹180,000 | 36.0% |
| B | ₹560,000 | ₹448,000 | ₹112,000 | 20.0% |
| C | ₹375,000 | ₹255,000 | ₹120,000 | 32.0% |

Category B has the highest revenue in this sample but the lowest contribution margin. That is a signal for investigation, not proof that its pricing or costs are wrong.

## 2. Analysis workflow

1. Reconcile units and revenue to the source records.
2. Confirm whether revenue is net of discounts, refunds and taxes.
3. Separate fixed costs from variable costs and document what is included.
4. Calculate contribution per unit, total contribution and margin percentage.
5. Segment by product, channel, customer cohort and period.
6. Run sensitivity scenarios for price, discount, volume and unit cost.
7. Recommend an experiment or investigation, then define how the result will be measured.

## 3. SQL example

Assume an illustrative sales table with category, units, net_revenue and variable_cost.

~~~sql
SELECT
  category,
  SUM(net_revenue) AS revenue,
  SUM(variable_cost) AS variable_cost,
  SUM(net_revenue) - SUM(variable_cost) AS contribution,
  100.0 * (SUM(net_revenue) - SUM(variable_cost))
    / NULLIF(SUM(net_revenue), 0) AS contribution_margin_pct
FROM sales
GROUP BY category
ORDER BY contribution DESC;
~~~

## 4. Interpretation and limitations

A margin comparison is only as reliable as the cost allocation and revenue definitions. The analysis does not include fixed overhead, customer lifetime value, capacity constraints or strategic reasons for carrying a low-margin category. Those factors may change the recommendation.

A good next step is to investigate Category B's discount mix, supplier costs and channel fees, then estimate the effect of feasible changes. Do not assume that raising prices will preserve demand.

## 5. Practice exercise

**Question:** Category A generates ₹500,000 in net revenue and ₹320,000 in variable cost. What is its contribution margin?

**Answer:** Contribution is ₹180,000. Contribution margin is 180,000 divided by 500,000, multiplied by 100: 36%.

## 6. Common mistakes and takeaways

- Confusing revenue with profit.
- Comparing categories with inconsistent cost definitions.
- Ignoring discounts, refunds and channel fees.
- Treating an association as a proven cause.
- Recommending price changes without considering demand response.

Use margin analysis to find the next question to test. Combine the financial result with operational context before recommending action.
