---
layout: default
title: Advanced Data Analytics Lessons
description: Days 61–90: causal inference, forecasting, data platforms, governance, monitoring, and capstone work.
permalink: /advanced/
---
<p class="eyebrow">Days 61–90</p><h1>Advanced</h1><p class="dek">Make sound decisions with complex data, uncertainty, and production constraints.</p><div class="post-list">{% assign lessons = site.posts | where: "category", "advanced" | sort: "day" %}{% for post in lessons %}<a class="post-row" href="{{ post.url | relative_url }}"><span>Day {{ post.day }}</span><strong>{{ post.title }}</strong><span>{{ post.date | date: "%b %-d" }} ↗</span></a>{% endfor %}</div>