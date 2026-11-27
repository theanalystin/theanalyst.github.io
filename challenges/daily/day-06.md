---
layout: default
title: Day 6 — Design a Reliable Star Schema
description: Model an order-to-cash analytics dataset with a clear fact grain, conformed dimensions, and testable relationships.
date: 2026-11-27
permalink: /challenges/daily/day-06/
---

# Day 6 — Design a Reliable Star Schema

## Scenario

A growing retailer has sales data in separate systems: orders, order lines, customers, products, stores, promotions, and returns. Analysts have built reports by joining these tables directly. Revenue totals sometimes duplicate, customer counts vary between reports, and returns are difficult to attribute to the original sale.

The Head of Analytics asks you to propose a Power BI-ready model that supports sales, customer, product, store, and returns analysis without double-counting.

## Objectives

- Define the grain of each fact table before choosing relationships.
- Separate measurable business events from descriptive attributes.
- Design dimensions with reusable keys and clear date roles.
- Handle returns without multiplying sales rows.
- Specify model tests that protect report accuracy.

## Your mission

Design a star schema for the retailer. Your model must support:

1. Net sales, gross sales, discounts, order count, units, and AOV.
2. Sales by customer, product, store, promotion, and order date.
3. Returns by return date and original sale date.
4. Customer and product analysis without joining fact tables directly.

State the grain of every fact table, identify dimensions and keys, define relationships and cardinality, and explain how you will handle dates and slowly changing customer attributes.

## Required deliverables

1. **Model diagram:** facts, dimensions, keys, and relationship direction.
2. **Grain statement:** one sentence for every fact table.
3. **Metric map:** identify which fact supports each core measure.
4. **Risk register:** at least three modeling risks and their controls.
5. **Validation plan:** at least five tests, including reconciliation to source totals.

## Submission format

Provide a compact schema table, a text or drawn relationship diagram, then your grain statements, metric map, and validation checks. Include sample SQL or DAX for one measure or test. State assumptions where the source design is incomplete.

## Quality rules

- Never join two fact tables at raw transaction grain without first understanding their relationship.
- Every fact table must have an explicit, consistent grain.
- Use one-to-many dimension-to-fact relationships wherever possible.
- Keep dimension filtering single-direction unless a documented requirement justifies otherwise.
- Do not store descriptive attributes redundantly in fact tables when a dimension key will do.
- Treat order count as a distinct order measure, not a count of order-line rows.

## Sample Answer — Click to Reveal

<details class="answer-reveal"><summary>Show Day 6 sample data model and answer</summary><div class="answer-content" markdown="1">

**This is a sample model, not a claim about the retailer's actual source data.** It assumes order lines are the lowest sales grain and returns can be linked to an original order line. Confirm these assumptions with source-system owners before implementation.

### 1. Proposed star schema

    DimDate (Order Date) ──┐
    DimCustomer ───────────┤
    DimProduct ────────────┤
    DimStore ──────────────┼── FactSales (one row per order line)
    DimPromotion ──────────┘

    DimDate (Return Date) ─┐
    DimCustomer ───────────┤
    DimProduct ────────────┼── FactReturns (one row per return line/event)
    DimReturnReason ───────┘

In Power BI, use a single physical DimDate table with an active relationship to FactSales[OrderDateKey] and an active relationship to FactReturns[ReturnDateKey]. For analysis by original sale date on returns, add an inactive relationship to FactReturns[OriginalOrderDateKey] and activate it in a measure with USERELATIONSHIP, or create a clearly named role-playing date dimension if users need both date roles simultaneously in visuals.

### 2. Table design and grain

| Table | Grain | Primary key | Important foreign keys / fields |
|---|---|---|---|
| FactSales | One row per order line | SalesLineKey | OrderID, OrderDateKey, CustomerKey, ProductKey, StoreKey, PromotionKey, Quantity, UnitPrice, DiscountAmount, GrossSales, NetSales |
| FactReturns | One row per return line/event | ReturnLineKey | OriginalSalesLineKey, ReturnDateKey, OriginalOrderDateKey, CustomerKey, ProductKey, ReturnedQuantity, RefundAmount, ReturnReasonKey |
| DimDate | One row per calendar date | DateKey | Date, month, quarter, year, fiscal attributes |
| DimCustomer | One row per customer version | CustomerKey | CustomerID (business key), segment, acquisition channel, geography, effective dates |
| DimProduct | One row per product version | ProductKey | ProductID, product name, category, brand |
| DimStore | One row per store | StoreKey | StoreID, store name, region, format |
| DimPromotion | One row per promotion | PromotionKey | PromotionID, campaign, offer type |
| DimReturnReason | One row per return reason | ReturnReasonKey | Reason group, reason description |

If the source has multiple return events for one sales line, retain each event at return-event grain or aggregate to one row per original sales line and return date. Do not force a one-to-one relationship if the business process permits partial returns.

### 3. Relationships

- DimCustomer[CustomerKey] 1 → * FactSales[CustomerKey]
- DimProduct[ProductKey] 1 → * FactSales[ProductKey]
- DimStore[StoreKey] 1 → * FactSales[StoreKey]
- DimPromotion[PromotionKey] 1 → * FactSales[PromotionKey]
- DimDate[DateKey] 1 → * FactSales[OrderDateKey]
- Corresponding dimension keys filter FactReturns in the same one-to-many pattern.

Use single-direction filtering from dimensions to facts. Avoid a direct relationship between FactSales and FactReturns; connect both through conformed dimensions and the original sales-line key for drill-through or controlled allocation. If returns have no store or promotion attribution, do not fabricate those keys—use an Unknown/Not Applicable member or leave the relationship out, according to the reporting requirement.

### 4. Metric map and example DAX

| Metric | Source | Definition |
|---|---|---|
| Gross sales | FactSales | Quantity × unit price before discounts |
| Discounts | FactSales | Discount amount at line grain |
| Net sales | FactSales | Gross sales less discounts, adjusted for the agreed sales policy |
| Orders | FactSales | Distinct OrderID |
| Units | FactSales | Sum of Quantity |
| AOV | FactSales | Net sales ÷ distinct orders |
| Refunds | FactReturns | Sum of RefundAmount |
| Return rate | Both facts or pre-aggregated return metrics | Returned quantity ÷ sold quantity, with aligned product and date logic |

    Gross Sales =
    SUM ( FactSales[GrossSales] )

    Net Sales =
    SUM ( FactSales[NetSales] )

    Orders =
    DISTINCTCOUNT ( FactSales[OrderID] )

    Units Sold =
    SUM ( FactSales[Quantity] )

    AOV =
    DIVIDE ( [Net Sales], [Orders] )

    Refund Amount =
    SUM ( FactReturns[RefundAmount] )

Do not calculate net sales by subtracting all refunds from a sales total unless the reporting definition explicitly aligns refund timing and sale cohorts. A refund booked this month may relate to a sale from an earlier month. For cohort-based return rates, attribute returns to the original sale line/date; for cash or accounting views, analyze refunds by return/refund date.

### 5. Slowly changing dimensions

For customer attributes that change over time—such as segment or region—decide whether historical sales should retain the attribute as it was at the time of sale. If yes, use a Type 2 dimension: create a new CustomerKey version when tracked attributes change, retain the stable CustomerID business key, and maintain effective start/end timestamps plus a current-row flag. Resolve the correct surrogate key during fact loading.

For attributes where only the latest value matters, a Type 1 overwrite may be acceptable. Document the choice per attribute; do not apply Type 2 indiscriminately.

### 6. Example SQL validation

Check that the sales fact has no duplicate business order-line identifiers. Adjust the key names to match the warehouse.

    SELECT
        order_id,
        order_line_id,
        COUNT(*) AS row_count
    FROM fact_sales
    GROUP BY order_id, order_line_id
    HAVING COUNT(*) > 1;

Expected result: zero rows, if the declared grain is one row per order line. Also test for orphaned dimension keys:

    SELECT COUNT(*) AS orphan_customer_rows
    FROM fact_sales f
    LEFT JOIN dim_customer d
      ON f.customer_key = d.customer_key
    WHERE d.customer_key IS NULL;

Expected result: zero, except where a documented Unknown key is intentionally used.

### 7. Validation checklist

1. Reconcile sales fact gross sales, discounts, and net sales to source control totals for a closed period.
2. Confirm (OrderID, OrderLineID) is unique at the sales fact grain.
3. Confirm all non-Unknown foreign keys resolve to exactly one dimension row.
4. Check that dimension keys are unique and date keys cover the reporting period.
5. Compare distinct order counts from the model with the source order header table; investigate cancelled, test, and duplicate orders.
6. Reconcile return quantities and refunds separately by return date and original sale date.
7. Test slicers across dimensions and confirm totals do not change unexpectedly when adding descriptive fields.

### 8. Main risks and controls

| Risk | Why it matters | Control |
|---|---|---|
| Joining order headers to order lines before aggregation | Header amounts repeat on every line and inflate sales | Keep line-grain sales fact; aggregate headers separately when needed |
| Joining sales directly to multiple return rows | Sales lines multiply when a line has multiple returns | Separate return fact; use explicit allocation or aggregate to common grain |
| Using customer name as key | Names change and are not unique | Use stable business ID and warehouse surrogate key |
| Overwriting historical customer segment | Past performance is reclassified using today's attributes | Type 2 history when historical attribution is required |
| Counting fact rows as orders | Multi-line orders are counted multiple times | Use distinct OrderID |

**Recommendation:** Build the model around a line-level sales fact and a separate return-event fact, with shared conformed dimensions. Agree the date attribution rules and net-sales definition with Finance before publishing measures. A reliable model makes the correct analysis easy and the double-counting mistakes difficult.

</div></details>
