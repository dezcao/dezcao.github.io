---
layout: defaults/page
permalink: about.html
narrow: true
title: More info about Friday Theme
images:
  - https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b1016b885e7438c4633109d77368d4d&auto=format&fit=crop&w=1651&q=80
  - https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=468a8c18f5d811cf03c654b653b5089e&auto=format&fit=crop&w=1650&q=80
  - https://images.unsplash.com/photo-1504626835342-6b01071d182e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=975855d515c9d56352ee3bfe74287f2b&auto=format&fit=crop&w=1651&q=80
---

## What is it?

{% include components/intro.md %}

## Full Feature List

- Installation
  - Designed for Jekyll 3.8
  - Compatible with GitHub Pages
- Configuration
  - Useful data files to quickly generate the profile sidebar and site navigation
  - Easy to configure, minimal options, sensible defaults
- Styling
  - Styled with Bootstrap, proven to work cross-platform
  - Minimal additional SCSS to get in the way
  - Entirely customisable by tweaking the Boostrap SCSS variables
- Layout
  - 2 column layout
  - Context-sensitive sidebars for blogs, documentation pages and normal content
  - Narrow/wide page options
  - Responsive layout built in
  - Lots of helpful includes and components to build out your site
- JavaScript and Components
  - jQuery and Bootstrap JS included
  - Use all the Bootstrap components
- Other goodies
  - Entypo SVG icons included
  - Syntax highlighting for code fragments using Rougify for over 100 different languages
- Blog
  - A collection layout to build a blog with full support for tagging
  - Interactive tag filtering for the blog
- Projects
  - A layout to list your projects, with a documentation-like layout for each project
  - Table of contents generation for documentation pages
- Permalinks
  - Permalinks using baseurl throughout for deployment under a subdir or on GitHub pages
  - Permalinks using .html throughout for deployment to environments not using default directory indexes

## Examples

Here's some quick examples of what it can do.

### Code Highlighting

{% highlight javascript %}
var modulePattern = (function() {
    // your module code goes here
    var sum = 0 ;

    return {
        add:function() {
            sum = sum + 1;
            return sum;
        },
        reset:function() {
            return sum = 0;
        }
    }
}());
{% endhighlight %}

### Bootstrap Components

Timeline

<div class="row d-flex justify-content-center mt-70 mb-70">
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">User Timeline</h5>
                <div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-success"></i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title">Meeting with client</h4>
                                <p>Meeting with USA Client, today at <a href="javascript:void(0);" data-abc="true">12:00 PM</a></p> <span class="vertical-timeline-element-date">9:30 AM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <p>Another meeting with UK client today, at <b class="text-danger">3:00 PM</b></p>
                                <p>Yet another one, at <span class="text-success">5:00 PM</span></p> <span class="vertical-timeline-element-date">12:25 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-danger"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title">Discussion with team about new product launch</h4>
                                <p>meeting with team mates about the launch of new product. and tell them about new features</p> <span class="vertical-timeline-element-date">6:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-primary"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title text-success">Discussion with marketing team</h4>
                                <p>Discussion with marketing team about the popularity of last product</p> <span class="vertical-timeline-element-date">9:00 AM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-success"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title">Purchase new hosting plan</h4>
                                <p>Purchase new hosting plan as discussed with development team, today at <a href="javascript:void(0);" data-abc="true">10:00 AM</a></p> <span class="vertical-timeline-element-date">10:30 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <p>Another conference call today, at <b class="text-danger">11:00 AM</b></p>
                                <p>Yet another one, at <span class="text-success">1:00 PM</span></p> <span class="vertical-timeline-element-date">12:25 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <p>Another meeting with UK client today, at <b class="text-danger">3:00 PM</b></p>
                                <p>Yet another one, at <span class="text-success">5:00 PM</span></p> <span class="vertical-timeline-element-date">12:25 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-danger"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title">Discussion with team about new product launch</h4>
                                <p>meeting with team mates about the launch of new product. and tell them about new features</p> <span class="vertical-timeline-element-date">6:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-primary"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title text-success">Discussion with marketing team</h4>
                                <p>Discussion with marketing team about the popularity of last product</p> <span class="vertical-timeline-element-date">9:00 AM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-success"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <h4 class="timeline-title">Purchase new hosting plan</h4>
                                <p>Purchase new hosting plan as discussed with development team, today at <a href="javascript:void(0);" data-abc="true">10:00 AM</a></p> <span class="vertical-timeline-element-date">10:30 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-timeline-item vertical-timeline-element">
                        <div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                            <div class="vertical-timeline-element-content bounce-in">
                                <p>Another conference call today, at <b class="text-danger">11:00 AM</b></p>
                                <p>Yet another one, at <span class="text-success">1:00 PM</span></p> <span class="vertical-timeline-element-date">12:25 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Here's a CSS component, it's an alert box with the info color:

<div class="alert alert-info">
    A simple info alert!
</div>

And this is a more sophisticated example, using the JS to include a carousel of images:

<div id="carouselExampleControls" class="carousel slide mb-4" data-ride="carousel">
    <div class="carousel-inner">
        {% for img in page.images %}
            <div class="carousel-item {% if forloop.first %}active{% endif %}">
                <img src="{{ img }}" class="d-block w-100" alt="">
            </div>
        {% endfor %}
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>

The spinner.

<div class="spinner-border text-dark mb-4" role="status">
  <span class="sr-only">Loading...</span>
</div>

### Icons

There's a suite of hundreds of Entypo icons included, here's just a few.

<div class="d-flex align-items-center mb-4">
    <span class="icon grey mr-2">
        {% include entypo/clock.svg %}
    </span>
    <span class="icon grey mr-2">
        {% include entypo/cycle.svg %}
    </span>
    <span class="icon grey mr-2">
        {% include entypo/chevron-up.svg %}
    </span>
    <span class="icon grey mr-2">
        {% include entypo/new-message.svg %}
    </span>
    <span class="icon grey mr-2">
        {% include entypo/shopping-cart.svg %}
    </span>
</div>


<style>
.mt-70 {
    margin-top: 70px
}

.mb-70 {
    margin-bottom: 70px
}

.card {
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    border-width: 0;
    transition: all .2s
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(26, 54, 126, 0.125);
    border-radius: .25rem
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem
}

.vertical-timeline {
    width: 100%;
    position: relative;
    padding: 1.5rem 0 1rem
}

.vertical-timeline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 67px;
    height: 100%;
    width: 4px;
    background: #e9ecef;
    border-radius: .25rem
}

.vertical-timeline-element {
    position: relative;
    margin: 0 0 1rem
}

.vertical-timeline--animate .vertical-timeline-element-icon.bounce-in {
    visibility: visible;
    animation: cd-bounce-1 .8s
}

.vertical-timeline-element-icon {
    position: absolute;
    top: 0;
    left: 60px
}

.vertical-timeline-element-icon .badge-dot-xl {
    box-shadow: 0 0 0 5px #fff
}

.badge-dot-xl {
    width: 18px;
    height: 18px;
    position: relative
}

.badge:empty {
    display: none
}

.badge-dot-xl::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: .25rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -5px 0 0 -5px;
    background: #fff
}

.vertical-timeline-element-content {
    position: relative;
    margin-left: 90px;
    font-size: .8rem
}

.vertical-timeline-element-content .timeline-title {
    font-size: .8rem;
    text-transform: uppercase;
    margin: 0 0 .5rem;
    padding: 2px 0 0;
    font-weight: bold
}

.vertical-timeline-element-content .vertical-timeline-element-date {
    display: block;
    position: absolute;
    left: -90px;
    top: 0;
    padding-right: 10px;
    text-align: right;
    color: #adb5bd;
    font-size: .7619rem;
    white-space: nowrap
}

.vertical-timeline-element-content:after {
    content: "";
    display: table;
    clear: both
}
</style>