/**
 * Base component with standard animation in
 * (to be extended by other components)
 */

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import anime from 'animejs'

class BaseCommponent extends Component {
  constructor () {
    super()
    this.settings = {
      baseAnimationFadeInDuration: 400
    }
    this.state = {
      baseAnimationIn: false
    }
  }

  componentDidMount () {
    // Hide content to it can be faded in
    this.baseAnimationWrapper = findDOMNode(this.refs.baseAnimationWrapper)
    this.baseAnimationWrapper.style.opacity = 0

    this.setState({baseAnimationIn: true})
  }

  componentWillUnmount () {
    this.setState({baseAnimationIn: false})
  }

  handleExit () {

  }

  handleEnter (element) {
    // Fade in
    anime({
      targets: element,
      opacity: 1,
      duration: this.settings.baseAnimationFadeInDuration,
      easing: 'linear'
    })
  }
}

export default BaseCommponent
