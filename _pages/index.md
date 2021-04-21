---
layout: defaults/page
permalink: index.html
narrow: true
title: Welcome to Jeffrey Blog
---

## What is it?

{% include components/intro.md %}

hello blog

## How to use it
Hello world

<hr />

### Recent Posts

{% for post in site.posts limit:3 %}
{% include components/post-card.html %}
{% endfor %}


