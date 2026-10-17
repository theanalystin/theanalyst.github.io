---
layout: post
title: What Data Analytics Really Is
date: 2026-10-18 07:00:00 +0530
categories: [beginner]
level: Beginner
day: 1
objective: Learn how analytics turns a business question into evidence, an interpretation and a next action.
description: Start data analytics with a clear question, a small synthetic dataset, a worked example, an exercise and limitations.
previous_url: ""
next_url: /day-02.html
last_modified_at: 2026-10-17
---
Data analytics is a repeatable way to turn a question into evidence that supports a decision. It includes understanding the problem, checking the data, choosing a suitable method, interpreting results and communicating both findings and uncertainty.

It is not simply making a chart or running a query. A technically correct calculation can still be unhelpful if it answers the wrong question or relies on incomplete data.

## 1. Start with a question

Imagine an operations manager asks: "Why did we complete fewer orders this week?" A useful analyst clarifies the time period, what counts as a completed order, whether the target changed, and what decision the result will support.

Then define what evidence is needed: daily order volume, staffing, order complexity, processing time and any known system interruptions. These are possible explanatory variables, not proof of a cause.

## 2. A small synthetic example

The following values are fictional and created only for practice.

| Week | Target orders | Actual orders | Variance |
|---|---:|---:|---:|
| Week 1 | 2,000 | 1,940 | -60 |
| Week 2 | 2,000 | 1,860 | -140 |
| Week 3 | 2,100 | 1,990 | -110 |

Absolute variance is actual minus target. In Week 2 the variance is 1,860 - 2,000 = -140 orders. Relative variance is -140 / 2,000 × 100 = -7%. That identifies a gap, but doesn't explain its cause.

## 3. An analysis workflow

1. Define the decision and metric.
2. Check the dataset for missing values, duplicates, and period mismatches.
3. Calculate a suitable comparison.
4. Segment the result to locate where it occurs.
5. Test hypotheses against evidence.
6. Explain the finding, limitation and next action.

## 4. Practice exercise

A team targets 1,500 completed orders and records 1,425.

1. Calculate the absolute variance.
2. Calculate the relative variance.
3. Name one useful follow-up question.

**Answer:** The absolute variance is -75 orders; relative variance is -5%. Next, segment by day, team or order type to learn where the gap is concentrated. The data must support any explanation.

## Takeaways

Good analytics connects a well-framed question with reliable data, a suitable calculation and a decision. Be explicit about the difference between an observed gap and a hypothesis about why it happened.

