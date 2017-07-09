---
layout: post
title: Animated rotating cursor over carousel
description: Apply CSS3 transforms, transitions and animations to cursors.
date: 2015-03-20
category: words
tags: [development, css, javascript]
---

Apply CSS3 transforms, transitions and animations to cursors.

### Why

In order to slide forwards or backwards in carousels, a common design pattern is to use arrow buttons either side of the carousel, overlaying the carousel content.

<p class="p--pullquote" data-pullquote="Making the clickable area larger and reducing the distance the user needs to travel keeps in mind Fitt's Law"> However, these buttons can encroach on content and add clutter. To avoid these issues we could:</p>

* **Make whole carousel clickable** - clicking on left portion will page user back one slide, clicking the right portion will page user forward one slide. Making the clickable area larger and reducing the distance the user needs to travel keeps in mind [Fitt's Law](http://en.wikipedia.org/wiki/Fitts%27s_law).
* **Switch the users cursor over to an arrow** the arrow will indicate the direction the carousel will slide in when the user clicks. This takes up less room than two permanent arrows.



Note that this effect will only be seen on desktop - there's no cursor on touch devices. As space is usually limited on touch devices we could look at adding arrow buttons in below the content.



### How
Now that we have a UX justification for this design pattern we need to look at a clean and reliable frontend implementation.

### 1. Setup parent layout: add a carousel, with mousemove and click events.

Mousemove checks if the cursor is in the left or right portion of the carousel, and adds a "left" or "right" class accordingly. Click event checks if the target is a link (either within the content or carousel pagination), if not it will page to next or previous slide, depending on whether the cursor is in the left or right portion of the carousel.

<p data-height="432" data-theme-id="0" data-slug-hash="pvxYYa" data-default-tab="result" data-user="jonjhiggins" class='codepen'>See the Pen <a href='http://codepen.io/jonjhiggins/pen/pvxYYa/'>pvxYYa</a> by Jon Higgins (<a href='http://codepen.io/jonjhiggins'>@jonjhiggins</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


### 2. Replace cursor with div, apply transforms

To enhance carousel interactions, we can transition the cursor when switching from left to right. CSS transforms can't be applied to cursors, so we will have to replace our cursor with a `<div>` that can be styled as a cursor. In the next Codepen we set up mousemove event listeners that move the `.cursor` `<div>` in place of the browser's cursor and add a rotation transition. It's important to note we are using CSS transforms to move the cursor (rather than "left" / "top" properties) for performance as these don't [trigger a repaint/composite](http://csstriggers.com/).

<p data-height="461" data-theme-id="0" data-slug-hash="KwJYZq" data-default-tab="result" data-user="jonjhiggins" class='codepen'>See the Pen <a href='http://codepen.io/jonjhiggins/pen/KwJYZq/'>KwJYZq</a> by Jon Higgins (<a href='http://codepen.io/jonjhiggins'>@jonjhiggins</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### 3. Make sure buttons still show pointer

The only issue with the above example is that the pointer button does not show when we hover over the CTA button or the carousel navigation. To get around this we can add mouseenter/mouseleave events to elements we want to show the pointer when hovering (e.g. `<a>`, `<button>`). We also need to add `pointer-events: none` to `.cursor`'s CSS. This prevents the `.cursor` element getting in the way of browser's cursor when hovering `<a>` tags and `<buttons>`.

<p data-height="436" data-theme-id="0" data-slug-hash="LEqKKr" data-default-tab="result" data-user="jonjhiggins" class='codepen'>See the Pen <a href='http://codepen.io/jonjhiggins/pen/LEqKKr/'>LEqKKr</a> by Jon Higgins (<a href='http://codepen.io/jonjhiggins'>@jonjhiggins</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Bonus! Try different transitions and animations

Interactions contribute to the character of a website. Think carefully about which is the best fit for your project.

<p data-height="131" data-theme-id="0" data-slug-hash="ByMXWo" data-default-tab="result" data-user="jonjhiggins" class='codepen'>See the Pen <a href='http://codepen.io/jonjhiggins/pen/ByMXWo/'>ByMXWo</a> by Jon Higgins (<a href='http://codepen.io/jonjhiggins'>@jonjhiggins</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
