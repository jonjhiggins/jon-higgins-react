/**
 * Section that extends SiteSection
 * Work/who/words are separate components so that they trigger a
 * componentWillUnmount for on switching between them (for animations etc)
 */

import React from 'react'
import SiteSection from '../../components/SiteSection/' // @TODO improve path or pass from index.js

class Work extends SiteSection {
  constructor (props) {
    super(props, 'work')
  }
}

export default Work
