---
layout: default
title: Articles on Business Analytics
description: Published articles on business performance, SQL, BI dashboards, data quality and practical analytical methods.
permalink: /articles/
---
<section class="page-intro"><p class="eyebrow">Articles</p><h1>Practical ideas, <em>clearly explained.</em></h1><p class="dek">Published lessons and notes on analytics, KPI reporting and decision-making.</p></section>
<ul class="post-list">
{% assign posts = site.posts | sort: "date" | reverse %}
{% for post in posts %}
<li><span>{{ post.date | date: "%d %b %Y" }}</span><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{% else %}
<li>New articles are being prepared. Start with the <a href="{{ '/projects/' | relative_url }}">worked case study</a> or <a href="{{ '/beginner/' | relative_url }}">beginner course</a>.</li>
{% endfor %}
</ul>
{% include newsletter.html %}
