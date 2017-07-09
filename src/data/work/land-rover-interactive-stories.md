---
layout: work-item
category: work
title: Land Rover interactive stories
class: land-rover-interactive-stories
date: 2015-09-01
type: web
skills: [build]
images: [work-hero--land-rover-interactive-story@2x.jpg]
heroVideos: [interactive-story-video-short]
content_url: http://www.landrover.co.uk/above-and-beyond/featured-articles/index.html
description: Provide immersive, magazine-style articles for global premium brand.
archive: false

---

## The problem
Land Rover's design agency [OgilvyOne](https://www.ogilvyone.com/) produced a concept video demonstrating immersive, magazine-style articles on the web.

Our Agile team was tasked with developing the concept into a set of fully-functional, responsive components that were authorable via CMS. As the concept was created in After Effects we were unsure all of the concept's effects were possible on the web.

## The solution
To achieve the effects we sketched out different solutions in code and iterated with the designers to find a balance between interactivity/motion and performance.

<p class="p--pullquote" data-pullquote="we iterated to find a balance between interactivity and performance" markdown="1">We worked with new / experimental technologies, such as <a href="https://developer.mozilla.org/en/docs/Web/CSS/clip-path">clip-path</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion">accelerometer</a>, as such we were always considering fallbacks - using a tiered approach to support basic and advanced devices/browsers.
</p>

Performance was a major concern due to the combination of effects and the number of interactive components that could be on the same page. We kept an eye on the FPS monitor, refactoring as required - in particular compositing layers and avoiding re-draws.

Creative solutions were sometimes required to get the best performance. On hovering the gallery component, images were slowly scaled, their opacity was adjusted and their borders grew via clip-path. Firefox and Safari couldn't cope with this combination of effects, after much experimentation we found they could animate clipPaths of SVGs smoothly, so we re-wrote the whole component to nest the images within SVGs!
