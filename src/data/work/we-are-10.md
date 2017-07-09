---
layout: work-item
category: work
title: We are 10 - brand and microsite
class: we-are-10
date: 2014-05-10
type: web
skills: [brand, plan, design, build]
images: [article-image.jpg]
content_url: http://weare10.neteffekt.com
description: Utilise Givey API and Assemble to generate donations and buzz for charity project
archive: true
---

#### The problem
Web app developers Neteffekt were marking their 10th year in business by aiming to raise £10k for Birmingham Children's Hospital over a 6 month period. They asked me to help them achieve their target, together we outlined the requirements as:

* A visual identity: generate buzz and galvanise the team
* Utilise a donation service (e.g. Just Giving): must be easy to use and positively contribute to project
* A microsite: generate donations and allow donors to track the project's progress


#### The solution

##### Clean, friendly visual identity
* Selected fonts and colours to co-brand well with Neteffekt.
* Clean design reflected Neteffekt's focus on ease-of-use.
* Extra dimension of friendliness/personality through slightly playful visuals (amplified by interactions/animations on the microsite) - required to encourage people to donate to or support the project.

##### A better donation service
* Researched a number of donation services: most (including Just Giving) did not provide the visual aesthetic or donation user experience to match the rest of the project.
* [Givey](http://givey.com), was a much closer fit and had the added bonus of all monies going directly to charity **(did you know [Just Giving currently takes an 5% cut](https://www.justgiving.com/fees/)?)**

##### A dynamic, fun microsite
* Broke down the site into sections of: What is it? How is it going? How can I contribute?
* Simple animations encourage users to interact with project.

##### Highlight dynamic aspect of project
* Live totals raised and donations pulled from [Givey API](). Encourages repeat visits/donations and galvanises the team towards achieving their target.
* Countdown to next challenges and tweets of support.
* I utilised static-site generator [Assemble](), it's use of [Handlebars]() meant I could serve static HTML (fast) and re-render it in JS when data was available from the Givey API


#### The outcome
* Assemble's use of YML/JSON as data source meant it was simple for Neteffekt to update descriptions / text within the site after I'd finished my work.
* At the time of writing: Neteffekt are 59% towards hitting their target - with 5 more challenges to run and 101 days left it looks like they should smash it!
