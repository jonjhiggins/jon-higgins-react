import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Transition } from 'react-transition-group'
import HomeShapes from '../HomeShapes'
import anime from 'animejs'

class Home extends Component {
  constructor (props, options) {
    super(props)

    const DEFAULTS = {
      fadeInDuration: 400
    }

    this.settings = Object.assign(DEFAULTS, options)
    this.state = {
      homeTextAnimationIn: false
    }

    // Disable 3d animation if transform-style: preserve-3d is not available
    this.preserve3dClass = this.detectPreserve3d() ? '' : 'js--preserve-3d-off'
  }

  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/transformstylepreserve3d.js
  detectPreserve3d () {
    const docElement = document.documentElement
    const outerDiv = document.createElement('div')
    const innerDiv = document.createElement('div')

    outerDiv.style.cssText = 'transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);'
    innerDiv.style.cssText = 'width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);'

    outerDiv.appendChild(innerDiv)
    docElement.appendChild(outerDiv)

    const result = innerDiv.getBoundingClientRect()
    docElement.removeChild(outerDiv)

    return result.width && result.width < 4
  }

  componentDidMount () {
    // Hide content to it can be faded in
    this.homeTextAnimation = findDOMNode(this.refs.homeTextAnimation)
    this.homeTextAnimation.style.opacity = 0

    this.setState({homeTextAnimationIn: true})
  }

  onEnter (element) {
    // Fade in
    anime({
      targets: element,
      opacity: 1,
      duration: this.settings.fadeInDuration,
      easing: 'linear'
    })
  }

  render () {
    return (
      <section className={`home body-text ${this.preserve3dClass}`}>
        <div className="container">
          <div className="home__content home__content--sr">
            <h1>Jon Higgins - a front-end developer based in Melbourne, Australia</h1>
          </div>
          <div className="home__content home__content--animation">
            <Transition
              in={this.state.homeTextAnimationIn}
              timeout={this.settings.fadeInDuration}
              onEnter={this.onEnter.bind(this)}
            >
              <HomeShapes ref="homeTextAnimation"/>
            </Transition>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
