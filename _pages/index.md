---
layout: defaults/page
permalink: index.html
narrow: true
title: Jeffrey
---

## Greeting

{% include components/intro.md %}

## Contact
dezcao@gmail.com

<hr />

### Recent Posts

{% for post in site.posts limit:3 %}
{% include components/post-card.html %}
{% endfor %}


