---
layout: default
title: Beginner Data Analytics Lessons
description: Days 1–30: data thinking, spreadsheets, cleaning, charts, statistics, and SQL basics.
permalink: /beginner/
---
<p class="eyebrow">Days 1–30</p><h1>Beginner</h1><p class="dek">Build strong foundations in data thinking, spreadsheets, charts, statistics, and SQL.</p><div class="post-list">{% assign lessons = site.posts | where: "category", "beginner" | sort: "day" %}{% for post in lessons %}<a class="post-row" href="{{ post.url | relative_url }}"><span>Day {{ post.day }}</span><strong>{{ post.title }}</strong><span>{{ post.date | date: "%b %-d" }} ↗</span></a>{% endfor %}</div>