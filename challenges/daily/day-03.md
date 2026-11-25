---
layout: default
title: Day 3 — Answer Five Business Questions with SQL
description: Use SQL to investigate sales trends, order value, customer retention, and product returns.
date: 2026-11-24
permalink: /challenges/daily/day-03/
---

# Day 3 — Answer Five Business Questions with SQL

## Scenario

The e-commerce leadership team has agreed on KPI definitions, but the monthly business review still raises unanswered questions. Revenue has moved unevenly across regions, order volume is unclear, repeat purchasing may be weakening, and some product categories have rising returns.

You have been asked to produce a reliable SQL analysis before the next review. Your job is not just to make queries run: every result must have a clear grain, correct joins, and a business interpretation.

## Dataset contract

Use a public or synthetic e-commerce dataset and map it to the following logical tables. If your source uses different names, document the mapping.

| Table | Expected grain | Required fields |
|---|---|---|
| `orders` | One row per order | `order_id` (PK), `customer_id`, `order_date`, `order_status`, `region_id` |
| `order_items` | One row per order line | `order_item_id` (PK), `order_id`, `product_id`, `quantity`, `unit_price`, `discount_amount`, `unit_cost` |
| `customers` | One row per customer | `customer_id` (PK), `signup_date`, `acquisition_channel` |
| `products` | One row per product | `product_id` (PK), `product_name`, `category` |
| `regions` | One row per region | `region_id` (PK), `region_name` |
| `returns` | One row per return event | `return_id` (PK), `order_item_id`, `return_date`, `quantity_returned`, `refund_amount`, `return_reason` |

**Analysis rules**

- Use completed orders only. Exclude cancelled and pending orders.
- Gross sales = `quantity × unit_price`.
- Net sales = gross sales − line-level `discount_amount`.
- Treat refunds as a separate measure. Do not silently subtract refunds from net sales.
- A return can have multiple events for one order line. Aggregate returns to the order-line grain before joining them to sales.
- Define any additional assumptions and keep currency and date treatment consistent.
- Use PostgreSQL or clearly state another SQL dialect.

## Your mission

Answer these five business questions with SQL.

### 1. Is sales performance improving?

Create a monthly trend showing:

- Gross sales
- Discounts
- Net sales
- Month-over-month net sales growth

State how you handle months with zero or missing sales.

### 2. What is happening to order volume and basket value?

For each month and region, calculate:

- Completed order count
- Unique purchasing customers
- Net sales
- Average order value (AOV)

Make sure an order with multiple line items is counted once.

### 3. Are customer cohorts coming back?

Build a monthly cohort-retention table.

- Assign each customer to the month of their first completed order.
- Calculate the number of customers from each cohort who placed at least one completed order in each subsequent month.
- Show cohort size, retained customers, month number since acquisition, and retention percentage.

Use first purchase month—not signup month—as the cohort definition. Explain how you treat incomplete or partial months.

### 4. Which product categories have a returns problem?

By product category, calculate:

- Units sold
- Units returned
- Unit return rate
- Refund value

Avoid inflating sales or return totals when joining order lines to multiple return events. State whether your return rate is unit-based or order-based.

### 5. Where should leadership investigate first?

Create a monthly region-by-category view containing net sales, order count, and unit return rate. Compare each segment with the previous month.

Identify **two region/category combinations** that deserve investigation. For each one, state whether the evidence points more strongly to a sales-volume decline, weaker basket value, or worsening returns. Do not claim causation from a descriptive query alone.

## Required deliverables

1. **One SQL file** containing all five numbered queries, with comments and readable CTEs.
2. **Five result extracts** (CSV or screenshots), one for each question.
3. **Data and grain notes** describing table keys, join paths, filters, and any source-to-schema mapping.
4. **Validation checks** for duplicate keys, order counts, sales totals, and return quantities. Explain any reconciliation differences.
5. **Five business interpretations**—one per query—plus a short executive summary (maximum 150 words) naming the two segments you would investigate first.

## Submission format

Submit in this order:

- SQL file or repository link
- Dataset source and SQL dialect
- Table-grain and join notes
- Results for Questions 1–5
- Validation checks and caveats
- Executive summary (150 words maximum)

## Constraints

- Do not copy a finished query or dashboard.
- Do not hide join duplication with `DISTINCT`; fix the grain and join logic.
- Do not use confidential employer or customer data.
- Keep the SQL reproducible: another analyst should be able to run it and understand the assumptions.

**Quality bar:** Correct totals matter more than clever syntax. Every query must answer a business question, preserve the intended grain, and support a defensible interpretation.


## Sample Answer — Click to Reveal

<details class="answer-reveal"><summary>Show Day 3 answer and SQL pattern</summary><div class="answer-content">

**Assumptions:** PostgreSQL; completed status is exactly `'completed'`; amounts share one currency; `discount_amount` is a line-level amount. This is a reference pattern—validate names and business rules against your dataset.

### Shared sales and return base

```sql
WITH completed_orders AS (
  SELECT order_id, customer_id, order_date, region_id
  FROM orders
  WHERE order_status = 'completed'
),
returns_by_line AS (
  SELECT order_item_id,
         SUM(quantity_returned) AS units_returned,
         SUM(refund_amount) AS refund_value
  FROM returns
  GROUP BY order_item_id
),
line_facts AS (
  SELECT o.order_id, o.customer_id, o.order_date, o.region_id,
         oi.order_item_id, oi.product_id, oi.quantity,
         oi.quantity * oi.unit_price AS gross_sales,
         oi.discount_amount,
         oi.quantity * oi.unit_price - oi.discount_amount AS net_sales,
         COALESCE(r.units_returned, 0) AS units_returned,
         COALESCE(r.refund_value, 0) AS refund_value
  FROM completed_orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  LEFT JOIN returns_by_line r ON r.order_item_id = oi.order_item_id
)
SELECT * FROM line_facts;
```

### 1. Monthly sales trend

```sql
WITH monthly AS (
  SELECT date_trunc('month', order_date)::date AS month,
         SUM(gross_sales) AS gross_sales,
         SUM(discount_amount) AS discounts,
         SUM(net_sales) AS net_sales
  FROM line_facts
  GROUP BY 1
)
SELECT *,
       (net_sales - LAG(net_sales) OVER (ORDER BY month))
       / NULLIF(LAG(net_sales) OVER (ORDER BY month), 0) AS mom_growth
FROM monthly
ORDER BY month;
```

### 2. Orders, customers and AOV by month and region

```sql
SELECT date_trunc('month', order_date)::date AS month,
       region_id, COUNT(DISTINCT order_id) AS completed_orders,
       COUNT(DISTINCT customer_id) AS customers,
       SUM(net_sales) AS net_sales,
       SUM(net_sales) / NULLIF(COUNT(DISTINCT order_id), 0) AS aov
FROM line_facts
GROUP BY 1, 2 ORDER BY 1, 2;
```

### 3. Monthly customer cohort retention

```sql
WITH customer_months AS (
  SELECT DISTINCT customer_id,
         date_trunc('month', order_date)::date AS activity_month
  FROM line_facts
),
cohorts AS (
  SELECT customer_id, MIN(activity_month) AS cohort_month
  FROM customer_months GROUP BY customer_id
),
cohort_activity AS (
  SELECT c.cohort_month, a.activity_month,
         ((EXTRACT(YEAR FROM a.activity_month) - EXTRACT(YEAR FROM c.cohort_month)) * 12
          + EXTRACT(MONTH FROM a.activity_month) - EXTRACT(MONTH FROM c.cohort_month))::int AS month_number,
         COUNT(DISTINCT a.customer_id) AS retained_customers
  FROM customer_months a JOIN cohorts c USING (customer_id)
  GROUP BY 1, 2, 3
),
cohort_sizes AS (
  SELECT cohort_month, COUNT(*) AS cohort_size FROM cohorts GROUP BY 1
)
SELECT a.cohort_month, a.month_number, s.cohort_size,
       a.retained_customers,
       a.retained_customers::numeric / NULLIF(s.cohort_size, 0) AS retention_rate
FROM cohort_activity a JOIN cohort_sizes s USING (cohort_month)
ORDER BY 1, 2;
```

### 4. Returns by product category

```sql
SELECT p.category, SUM(f.quantity) AS units_sold,
       SUM(f.units_returned) AS units_returned,
       SUM(f.units_returned)::numeric / NULLIF(SUM(f.quantity), 0) AS unit_return_rate,
       SUM(f.refund_value) AS refund_value
FROM line_facts f JOIN products p USING (product_id)
GROUP BY p.category ORDER BY unit_return_rate DESC;
```

### 5. Region/category monthly comparison

```sql
WITH segment_month AS (
  SELECT date_trunc('month', f.order_date)::date AS month,
         f.region_id, p.category,
         SUM(f.net_sales) AS net_sales,
         COUNT(DISTINCT f.order_id) AS orders,
         SUM(f.units_returned)::numeric / NULLIF(SUM(f.quantity), 0) AS unit_return_rate
  FROM line_facts f JOIN products p USING (product_id)
  GROUP BY 1, 2, 3
)
SELECT *,
       net_sales - LAG(net_sales) OVER
         (PARTITION BY region_id, category ORDER BY month) AS sales_change,
       unit_return_rate - LAG(unit_return_rate) OVER
         (PARTITION BY region_id, category ORDER BY month) AS return_rate_change
FROM segment_month ORDER BY month, region_id, category;
```

### Validation checks

- Confirm `orders.order_id` and `order_items.order_item_id` are unique.
- Check that return events are aggregated to one row per order line before joining.
- Reconcile total completed order count against a direct count from `orders`.
- Reconcile gross sales, discounts, and net sales to a separately calculated order-line total.
- Flag returned units greater than sold units for review; do not silently cap them.

**Interpretation:** SQL patterns produce metrics, not findings by themselves. Your two priority segments must be selected from your actual result set; no region or category can be named without data.
</div></details>
