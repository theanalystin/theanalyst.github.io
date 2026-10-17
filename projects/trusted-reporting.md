---
layout: default
title: Trusted Reporting Workflow
description: An illustrative quality-control design for reliable and repeatable business reporting.
permalink: /projects/trusted-reporting/
---
<p class="eyebrow">Case study 03 · Reporting governance</p>

# Trusted Reporting Workflow

**Business question:** How can a team make recurring reports more reliable and easier to audit?

This design uses synthetic examples. It describes a workflow to implement and test, not an already deployed production pipeline.

## 1. Define the control framework

A recurring report should have an agreed source, owner, refresh time, metric definition, validation checks and escalation path. A useful quality checklist covers:

- Completeness: expected files, dates and records arrived.
- Uniqueness: business keys are not duplicated.
- Validity: values fit allowed ranges and categories.
- Consistency: totals reconcile across source and output.
- Timeliness: refresh completed within the agreed window.
- Traceability: report version and transformation logic can be identified.

## 2. Sample validation queries

Check duplicate order identifiers:

~~~sql
SELECT order_id, COUNT(*) AS row_count
FROM orders
GROUP BY order_id
HAVING COUNT(*) > 1;
~~~

Check missing keys and invalid amounts:

~~~sql
SELECT *
FROM orders
WHERE order_id IS NULL
   OR order_date IS NULL
   OR net_amount < 0;
~~~

These checks require business-specific rules. A negative amount may be valid for a refund table, for example, so rules should match the dataset and reporting purpose.

## 3. A practical reporting workflow

1. Receive the source file or refresh the source table.
2. Validate schema, row count, date coverage and business keys.
3. Stop or flag the run when critical checks fail.
4. Apply documented transformations and metric definitions.
5. Reconcile important totals against the source.
6. Generate the report and record its refresh timestamp.
7. Log failures, notify the owner and retain an audit trail.

## 4. Example quality summary

| Check | Expected outcome | Response when failed |
|---|---|---|
| Required columns | All columns present | Stop run and notify owner |
| Duplicate business key | Zero unexpected duplicates | Quarantine or investigate |
| Date coverage | Full expected reporting period | Flag incomplete period |
| Total reconciliation | Within defined tolerance | Investigate transformation |
| Refresh time | Before reporting deadline | Escalate delayed refresh |

## 5. Practice exercise

**Question:** A daily file is expected to contain 1,000 orders, but it contains 940. Should the report be published?

**Answer:** Do not silently treat it as complete. Check whether 60 orders are legitimately absent, delayed or lost. Depending on the criticality and agreed policy, stop publication or publish with a clear incomplete-data warning and owner-approved exception.

## 6. Common mistakes

- Writing checks without assigning an owner to failures.
- Treating every anomaly as invalid without business context.
- Failing to preserve source totals and refresh timestamps.
- Allowing a dashboard to refresh after a critical validation failure.
- Documenting metric definitions separately from the code that implements them.

## Takeaways

Reliable reporting is a process, not a dashboard feature. Define the rules, automate repeatable checks, document exceptions and ensure someone owns the resolution. A completed implementation should include tested code, sample input, expected outputs and evidence of successful and failing test cases.
