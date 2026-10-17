---
layout: default
title: Beginner Data Analytics Course
description: A week-by-week beginner course covering analytics thinking, spreadsheets, data cleaning, charts, statistics, SQL and a retail capstone.
permalink: /beginner/
last_modified_at: 2026-10-17
---
<section class="page-intro"><p class="eyebrow">Days 1–30 · Beginner course</p><h1>Build your analytics <em>foundations.</em></h1><p class="dek">Start from the business question, practise with small examples, then build toward a KPI report. Suggested pace: 4–6 hours per week. No prior coding experience required.</p></section>

<p class="note"><strong>Sample data and exercises:</strong> all example metrics are synthetic and for practice only. The linked lesson outline gives a concrete daily objective, sample dataset and exercise for every beginner day.</p>
<p><a class="button" href="{{ '/data/beginner-lessons.csv' | relative_url }}">Download the 30-day lesson outline (CSV)</a> <a class="text-link" href="{{ '/data/performance_kpis.csv' | relative_url }}">Download sample KPI data →</a></p>

{% assign lessons = site.data.curriculum | where: "level", "Beginner" %}
{% assign weeks = "1,2,3,4,5" | split: "," %}
{% for week in weeks %}
<section class="lesson-week">
<h2>Week {{ week }}{% case week %}{% when "1" %}: Questions and data basics{% when "2" %}: Spreadsheet skills{% when "3" %}: Summaries and statistics{% when "4" %}: Start using SQL{% when "5" %}: Reporting and capstone{% endcase %}</h2>
<ul class="lesson-list">
{% for lesson in lessons %}
{% assign lesson_week = lesson.day | minus: 1 | divided_by: 7 | plus: 1 | append: "" %}
{% if lesson_week == week %}
<li><div><strong>Day {{ lesson.day }} · {{ lesson.title }}</strong><p>{{ lesson.objective }}</p><p class="lesson-meta">Sample data: <a href="{{ '/data/performance_kpis.csv' | relative_url }}">synthetic KPI CSV</a>. Exercise: write one finding and one follow-up question; use the downloaded outline for the day-specific task.</p></div><a class="lesson-link" href="{% if lesson.day == 1 %}{{ '/beginner/what-data-analytics-really-is/' | relative_url }}{% elsif lesson.day == 2 %}{{ '/day-02.html' | relative_url }}{% elsif lesson.day == 30 %}{{ '/day-30.html' | relative_url }}{% else %}{{ '/day-' | append: lesson.day | prepend: '' | relative_url }}{% endif %}">Lesson ↗</a></li>
{% endif %}
{% endfor %}
</ul>
</section>
{% endfor %}

## After Day 30: Days 31–90

Days 31–60 extend SQL, data modelling, Power Query, dashboard design and intermediate analysis. Days 61–90 move into advanced SQL, analytical methods, automation, case studies and portfolio work. See the [full curriculum]({{ '/curriculum/' | relative_url }}) and [performance analyst roadmap]({{ '/career-roadmap/' | relative_url }}).

<p class="updated">Last updated: 17 October 2026</p>