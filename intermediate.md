---
layout: default
title: Intermediate Data Analytics Lessons
description: Days 31–60: SQL, dashboards, cohorts, experiments, regression, and forecasting.
permalink: /intermediate/
---
<p class="eyebrow">Days 31–60</p><h1>Intermediate</h1><p class="dek">Turn one-off analysis into repeatable, decision-ready work.</p><div class="post-list">{% assign lessons = site.posts | where: "category", "intermediate" | sort: "day" %}{% for post in lessons %}<a class="post-row" href="{{ post.url | relative_url }}"><span>Day {{ post.day }}</span><strong>{{ post.title }}</strong><span>{{ post.date | date: "%b %-d" }} ↗</span></a>{% endfor %}</div>