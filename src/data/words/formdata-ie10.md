---
layout: post
title: FormData only works in IE10 if you append name/value pairs
description: Passing a form element to the FormData object in Internet Explorer 10.
date: 2013-01-04
category: words
tags: [development, javascript, internet explorer, formdata]
---

I've recently been working with the XHR [FormData](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/FormData) object to build an upload management tool. When testing in IE10 (which supports FormData) I ran into a bizarre error ("SCRIPT5 'Access Denied") on this line:

``` javascript
var upload_form = new FormData(form);
```

A rather useful [Stack Overflow discussion](http://stackoverflow.com/questions/13123537/formdata-of-existing-form-fails-in-ie10-by-triggering-via-js) suggested appending the data. Indeed Microsoft's [MSDN article](http://msdn.microsoft.com/en-us/library/ie/hh772723%28v=vs.85%29.aspx) doesn't seem to mention the element ('form' in my example) argument for FormData that other modern browsers support.

### Appending lots of things

The Stack Overflow method works well for appending multiple files from one file input, but I had the requirement of submitting quite a bit of form data (text inputs and checkboxes) with the files… all at the same time. For this I needed to automate the appending, for which I used MooTools' [Element.toQueryString()](http://mootools.net/docs/core/Element/Element#Element:toQueryString) and [String.parseQueryString()](http://mootools.net/docs/more/Types/String.QueryString#String:parseQueryString) methods:

``` javascript
try {
	// other modern browsers
	var upload_form = new FormData(form);
} catch(e) {
	// IE10 MUST have all form items appended as individual form key / value pairs
	var upload_form = new FormData();
	var form_serialise = form.toQueryString().parseQueryString();
		Object.each(form_serialise, function(item, key) {
			upload_form.append(key, item);
		});
}
```
