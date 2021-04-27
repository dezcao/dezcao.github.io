---
layout: defaults/page
permalink: index.html
narrow: true
title: Jeffrey
---

## Greeting

{% include components/intro.md %}

## Contact
<a href="mailto:dezcao@gmail.com">Email Me</a>

<hr />

### Recent Posts

{% for post in site.posts limit:3 %}
{% include components/post-card.html %}
{% endfor %}


