---
layout: post
title: Modifying 'max-device-width' with Javascript
description: Changing CSS media queries on the client side.
date: 2012-11-30
category: words
tags: [development, javascript, media queries, responsive]
---

I recently had the requirement to swap out all occurrences of the CSS media query ``max-device-width`` with ``max-width`` in Javascript. I wasn't able to find any resources on how to go about this, so this may be of use for anyone needing to modify media queries on the client side.

### Why would you need to mess with 'max-device-width'?

My scenario was needing to give an indication of how HTML email content would display on mobile devices. Using IFrame-based tests (e.g. [Matt Kersley's Responsive Design Tests](http://mattkersley.com/responsive/)) worked well in most instances, but many responsive email designs use CSS media queries that included ``max-device-width``. As my IFrames were being viewed on desktop devices with high resolution displays these rules were not being triggered. As it isn't possible to fake ``max-device-width`` the only alternative was switch it for ``max-width``.

### Getting hold of the media queries

First we need to get hold of all the stylesheets that the document has loaded and loop through each of them. In turn, we need to loop through every CSS rule and check if any have their type property set to [4 (MEDIA_RULE)](https://developer.mozilla.org/en-US/docs/DOM/cssRule). This is shown in this function, which returns an array of all the media rules found:

``` javascript
function getCSSMediaRules(doc) {
	var stylesheets = doc.styleSheets;
	var mediaRules = new Array();

	// loop through all CSS files
	for (var i in stylesheets) {
		if (stylesheets.hasOwnProperty(i)) {
			var stylesheets = stylesheets[i];
			var stylesheetRules = stylesheets.cssRules;
			// for every CSS file, loop through all CSS rules
			for (var i in stylesheetRules) {
				if (stylesheetRules.hasOwnProperty(i)) {
					var stylesheetRule = stylesheetRules[i];
					// check CSS rule is a type 4 'MEDIA_RULE'
					if (stylesheetRule.type == 4) {
					        mediaRules.push(stylesheetRule);
					}
				}
			}
		}
	}

	return mediaRules;
}
```

### Editing media queries

The DOM only provides methods to add and remove CSS media rules. In my instance I needed to preserve the width value, so removing and adding wasn't an option. Instead I found editing the rule's ``mediaText`` property had the desired effect:  

``` javascript		
function replaceMaxDeviceWidth(rule) {
	rule.media.mediaText = rule.media.mediaText.replace('max-device-width', 'max-width');
}
```

### console.debug(everythingAllTheTime)

Many of the properties such as ``mediaText`` have pretty sparse documentation so it's sometimes easier to debug the rules and mess with them in the console.
