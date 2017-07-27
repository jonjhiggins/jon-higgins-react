---
layout: post
title: 'Animated letters: DOM vs Canvas performance'
description: Optimising the performance of a GreenSock-based continuous scaling animation using Paper.js and canvas.
date: 2016-05-11
category: words
tags: [development, css, javascript, greensock]
---

The goal is to create a continuous animation of letters "A" to "B" using a web browser. It should look something like this:

![A to B animation!](a-to-b.gif)

### Version 1: HTML / CSS and GreenSock

Start with the simplest option: a GreenSock timeline to control HTML elements. Each letter is scaled from 0 to a "mid" size, then scaled up to a "big" size that either causes the letter to be clipped outside the canvas (A) or covers the canvas background (B).

[View on Codepen](http://codepen.io/jonjhiggins/full/EKMEvd/)

<p class="p--pullquote" data-pullquote="in Chrome there are jagged edges as the letter is scaled up">For the most part this seems to work fine, however in Chrome desktop and Android there are jagged edges as the letter is scaled up.</p>

Some might argue this isn't that noticeable on fast transitions, but it bothered me. I tried forcing hardware acceleration (via GreenSock's `force3D` option and specifying scales individually), `-webkit-filter:blur(0)` switching the elements out for SVGs but the issue persisted.

### Version 2: Scaling up HTML elements

[Stackoverflow](http://stackoverflow.com/a/8038694/1980357) provided the following suggestion:

> Webkit treats 3d transformed elements as textures instead of vectors in order to provide hardware 3d acceleration. The only solution to this would be to increase the size of the text and downscaling the element, in essence creating a higher res texture.

So I forked the first Codepen and tried this out. It did indeed fix the jagged edges, but the performance was terrible:

[View on Codepen](http://codepen.io/jonjhiggins/full/PNLRmZ/)

### Version 3: Canvas

As I've previously had success with better performance with `<canvas>` element this was my next port of call. Using vanilla canvas was very time consuming and awkward to get to work on retina screens. I soon abandoned this as it was clear a JS library was needed to work with the canvas for this purpose.

### Version 4: Paper.js, canvas and GreenSock

There are a few canvas JS libraries out there and I'd not previously used any of them, but I really liked the look of [Paper.js](http://paperjs.org) - it had all the features I needed, was well documented and I was excited by the possibilities it provided.

#### Retina-ready
First of, Paper.js deals with the retina-screen issue out of the box. Just make sure you use `paper.view.size` to get the canvas's width and height.

#### Using Paper.js outside of text/paperscript script blocks
Paper.js is designed to be used in `<script type="text/paperscript">` blocks, but I like to work with CommonJS modules so I needed to go down the "use javascript directly" route. Essentially this involved adding the following to the JS:

    paper.install(window);
    paper.setup('canvas');

`paper.install(window)` adds the `paper` object to the global namespace and `paper.setup('canvas')` creates an empty project and view, where `canvas` is the ID of your canvas element.

You also have to manually tell Paper.js to render the view via either `paper.view.draw()` (single draw) or `view.onFrame` (animation loop). Failing to do so means nothing will be drawn, as I found out!

As well as the documentation I found Paper.js Codepens useful for this, e.g. [PaperJS Diamond hover by LegoMushroom](http://codepen.io/sol0mka/pen/yvaJw).


#### Layout
Laying out the text was simple once I got used to Paper.js. Where it comes in to it's own is modifying existing elements (position, scale, colour etc), a painful process with the vanilla canvas but incredibly simple with Paper.js.

#### Animation
Paper.js offers animation via its `view.onFrame` method. However there's no timeline or timing controls, so we'll still need GreenSock to control the animation. GreenSock's flexibility really shines through here - it can animate JS objects as well as DOM elements. So for each tween's animation frame:

1. GreenSock updates specific properties (e.g. `x`/`y`) on the Paper.js object we've called the tween on (e.g. `textA`)
2. We tell Paper.js to re-draw the canvas
3. Paper.js re-draws the canvas with the new properties from GreenSock

To get the Paper.js to re-draw on each frame I ran `paper.view.draw()` on the GreenSock timeline's `onUpdate` event, I'm not sure if this is the "right" way for the two to work together, but it worked for me.

As an example, here's a line from the GreenSock DOM animation:

    // Scale "A" up and out of view
    .to($a, duration, {scale: textScaleBig})

the same line converted to work with Paper.js object

    // Scale "A" up and out of view
    .to(textA.scaling, duration, {
      x: textScaleBig,
      y: textScaleBig
    })

<p class="p--pullquote" data-pullquote="I noticed the object needed to be stored in a variable, or GreenSock doesn't increment from previous value">When using GreenSock on JS objects I noticed the object needed to be stored in a variable, or GreenSock doesn't seem to increment from previous value, e.g:</p>

    var textAScaling = textA.scaling;

    tl.set(textAScaling, {
      x: textScaleMid,
      y: textScaleMid,
    })

#### The result
No jagged edges! The animation was smooth all the way through and had none of the occasional flickers / layout bugs the HTML version suffered from.

The performance didn't seem much different on my MacBook (the HTML version ran fine), however on a VM IE10 rendering improved on the canvas version from 50-58FPS up to a steady 66FPS, while my iPad 2 improved from 40-55FPS up to 55-59FPS. This suggests that for complex animations or lower powered devices a canvas solution would be best, though case-by-case testing would be needed.

<iframe height='400' scrolling='no' src='//codepen.io/jonjhiggins/embed/ZWPgqg/?height=400&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/jonjhiggins/pen/ZWPgqg/'>A to B: Paper.js / Canvas</a> by Jon Higgins (<a href='http://codepen.io/jonjhiggins'>@jonjhiggins</a>) on <a href='http://codepen.io'>CodePen</a>.
