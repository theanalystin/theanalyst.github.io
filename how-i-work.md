---
layout: default
title: How I Work
description: Learn how The Analyst creates synthetic data, checks calculations and labels illustrative versus verified findings.
permalink: /how-i-work/
last_modified_at: 2026-10-17
---
<section class="page-intro"><p class="eyebrow">Methodology</p><h1>Show the method. <em>Label the evidence.</em></h1><p class="dek">A reader guide to how examples are built, checked and communicated on The Analyst.</p></section>

## Data labels

**Synthetic / illustrative** means values were created or adjusted for teaching. They can demonstrate formulas, SQL patterns and interpretation, but they are not observations from a real company or proof of business impact.

**Public data** means the dataset comes from a named public source. A finished project should link to the original source, describe its licence and identify any transformations.

**Verified result** means the calculation was reproduced against the stated source and the relevant checks passed. Verification of a calculation does not, by itself, prove causation or that a recommendation will improve business outcomes.

## How synthetic examples are made

Synthetic datasets on this site are small, manually specified teaching examples designed to show a concept—such as target versus actual, missing values, duplicate keys or revenue and cost aggregation. Their values are intentionally transparent and simple to calculate. Unless a project explicitly says otherwise, they are not generated from employer information, client records or private operational data.

These examples are not statistically representative samples. They should not be used to estimate market size, forecast actual performance or claim a real-world outcome.

## How calculations are checked

For a completed analytical case study, the intended review is to:
1. Confirm the question, unit, reporting period and metric definition.
2. Recalculate example values independently.
3. Check denominators, null handling, duplicates and directionality.
4. Compare SQL logic with the stated formulas and source schema.
5. Document what was not tested and what the available data cannot prove.
6. Link inputs and code when they exist, so readers can reproduce the work.

A published illustration can still have limitations. A clear label is not a substitute for testing, and a query in a page is not evidence that it has run against a production system.

## What "verified" does not mean

A reproducible arithmetic result is not proof of a business cause. Correlation does not establish causality; incomplete data can bias conclusions; and model or dashboard correctness depends on definitions, refresh logic and source quality.

## Corrections and contact

If you find a calculation error or broken example, please use the public contact details on the [About page]({{ '/about/' | relative_url }}). Contact details are placeholders until the site owner replaces them.

<p class="updated">Last updated: 17 October 2026</p>
