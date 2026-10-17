---
layout: default
title: 90-Day Data Analytics Curriculum
description: Daily learning plan from beginner to advanced analytics, starting 18 October 2026.
permalink: /curriculum/
---
<p class="eyebrow">Your roadmap</p><h1>The 90-day curriculum</h1><p class="dek">New lessons are generated and published automatically at 7:00 AM India Standard Time.</p>{% assign groups = "Beginner,Intermediate,Advanced" | split: "," %}{% for group in groups %}<section class="curriculum-group"><h2>{{ group }}</h2><ol>{% for lesson in site.data.curriculum %}{% if lesson.level == group %}<li><span class="curriculum-day">Day {{ lesson.day }} · {{ lesson.date }}</span><strong>{{ lesson.title }}</strong><p>{{ lesson.objective }}</p></li>{% endif %}{% endfor %}</ol></section>{% endfor %}