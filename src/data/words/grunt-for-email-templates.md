---
layout: post
title: Using Grunt to build email templates
description: Take the pain out of building email templates using Grunt Email Boilerplate.
date: 2014-01-21
category: words
tags: [development, email design, javascript]
---

Take the pain out of building email templates using [Grunt Email Boilerplate](https://github.com/dwightjack/grunt-email-boilerplate).

### Why?

#### 1. Simple email templates often require complex/messy HTML
 Markup for Email templates can get complex and messy, making debugging and adjusting templates painful. Often regions are shared between different templates (e.g. header and footer), or areas are repeated in the same email (e.g. a product item or news article layout).

 *Couldn't templating help reduce the complexity of layouts and support DRY (don't repeat yourself)?*

#### 2. Simple email templates often require complex CSS
Email templates require a mixture of inline and embedded CSS. Using an method of inlining styles, such as [Premailer](https://github.com/premailer/premailer), is pretty much essential for keeping your HTML files clean. CSS pre-processors, such as SASS, can also help speed up development time. If we want to look at templating out sections of the email (suggested above) SASS helps us keep our CSS modular in separate files. Previously I would run `sass watch`, then run Premailer when the email was built / every time a template needing updating.

*Couldn't this workflow be better automated?*

#### 3. Testing email templates can be time consuming
Previously, I would build a template then upload it to an email platform from which I'd send out test emails to myself and [Litmus](https://litmus.com). I'd then make adjustments, upload, send tests... adjustments, upload, send tests, adjustments, upload send tests... you get the picture.

*Couldn't we speed up this process?*

#### 4. Manually updating email templates is often a dull, repetitive and painful task
While some email templates are hooked up to CMS/ecommerce solutions that populate email templates, this level of integration isn't always feasible for some people. Updating a typical product/sales email template each month might involve updating the product name, product price, product URL and product image (resized, optimised and re-uploaded) for each product in the email - a dull, time-consuming task. Doing this task through a WYSIWYG editor commonly found in email platforms is prone to breaking layouts (editing wrong regions or incorrectly sized images).

*Couldn't this task be automated? And couldn't we better protect the layout from mistakes?*

### Grunt Email Boilerplate to the rescue!
[Grunt Email Boilerplate](https://github.com/dwightjack/grunt-email-boilerplate) is a vanilla email template that takes advantage of task-runner [Grunt](http://gruntjs.com) and it's many plugins/tasks. Out of the box it:

* Provides templating via EJS
* Watches and builds your SASS
* Runs your content through Premailer
* Optimises images
* Optionally, sends the email via Nodemailer

...which solves most of our problems outlined above:

1. We can use EJS templating to separate out header/footer elements and share between different email templates. We can also use EJS to iterate through JSON arrays of content, populating our HTML templates. For example, in a recent product email template I used [this JSON file](https://github.com/jonjhiggins/clubline-emails/blob/9891fa2e5163289a9edec5db87513dfe06b31df0/src/data/data.json) to populate the products section - only requiring me to write the HTML for one product.

2. SASS/Compass and Premailer are run every time the content is changed, two less things to think about so you can concentrate on building your template.

3. Nodemailer allows you to send yourself or others versions of the emails for testing. I didn't explore this option until after I'd built my most recent email template, so currently there's no images in the emails it sends on my setup. But I'm sure with a bit of digging that can be sorted. Support for Litmus [appears to be on its way](https://github.com/dwightjack/grunt-email-boilerplate/issues/8).

4. Using EJS templating to iterate through arrays of data is really powerful. For me, the JSON file containing email content is easy to edit manually if elements of the email change. However, as the file is JSON you can see how this process could easily be hooked up to a UI for less technical users or integrated into a back-office system that spits out JSON.

## In summary

While template building and testing can be painful, Grunt Email Boilerplate does a great job of speeding up development right out of the box. It's also straightforward to customise to fit your requirements.

The next time you're building email templates I suggest you check out [Grunt Email Boilerplate](https://github.com/dwightjack/grunt-email-boilerplate). You can also [check out the source of a HTML template](https://github.com/jonjhiggins/clubline-emails) I built using Grunt Email Boilerplate - including customisations I've made to the workflow.
