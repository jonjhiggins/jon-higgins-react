---
layout: work-item
category: work
title: Land Rover visual identity refresh
class: land-rover-visual-identity-refresh
date: 2015-03-01
type: web
skills: [build]
images: [work-hero--land-rover-visual-identity@2x.png, work-hero--land-rover-visual-identity--large.png]
heroImages:
  -
    image: work-hero--land-rover-visual-identity--before.jpg
    caption: Before
  -
    image: work-hero--land-rover-visual-identity--after.jpg
    caption: After
content_url: http://www.landrover.co.uk
description: Applying Land Rover's refreshed identity to every part of their global marketing websites.
archive: false

---

## The problem
Land Rover's refreshed visual identity (VI) needed to be rolled out across all its global marketing sites. The VI had been designed for print, so needed translating to screen format.

Also, there were visual inconsistencies through out the site which broke VI/brand guidelines.

## The solution
As part of the Land Rover Agile team I collaborated with other developers and designers to implement the new VI. This included new colour palettes, fonts and grids. We worked hard on visual consistency, particularly on grids and typography, with minute attention to detail.

My colleague [Pete Williams](http://www.petewritescode.com) and I re-worked the SASS codebase to make it more modular and documented the new VI guidelines for future maintainability.

#### Improving typographic and layout consistency

* Contributed to both the design of and implementation of a baseline grid system based on the x-height of titles
* Limited the range of font sizes used, with sets for different break points
* Re-worked every component within the site to use uniform margins specified by the VI's grid system

#### Improving codebase

* SASS: replaced manually inputted values with variables for consistency
* SASS: pulled out shared styles from components and moved to partials for consistency
* Documented new VI guidelines in [Assemble](http://assemble.io)-based styleguide

#### Improving content

* Worked with content authors to clean-up content that broke VI guidelines. Introduced new components / layout options based on author's feedback.
